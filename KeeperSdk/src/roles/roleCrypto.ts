import {
    getPublicKeysMessage,
    shareKey,
    shareKeyEC,
    normal64Bytes,
    platform,
    type Auth,
    type Authentication,
    type RoleManagedNodeTreeKey,
    type ManagedNodeRoleKey,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, logger } from '../utils'

export const ENCRYPTED_BY_PUBLIC_KEY = 'encrypted_by_public_key'
export const ENCRYPTED_BY_PUBLIC_KEY_ECC = 'encrypted_by_public_key_ecc'

export type UserPublicKeys = {
    rsaPublicKey: Uint8Array | null
    eccPublicKey: Uint8Array | null
}

export type EncryptedForUser = {
    ciphertext: string
    keyType: typeof ENCRYPTED_BY_PUBLIC_KEY | typeof ENCRYPTED_BY_PUBLIC_KEY_ECC
}

export type SessionUnwrapKeys = {
    dataKey?: Uint8Array | null
    privateKey?: Uint8Array | null
    eccPrivateKey?: Uint8Array | null
}

export type MissingPublicKeysMap = Record<string, string>

export async function decryptByKeyType(
    encrypted: Uint8Array | string,
    keyType: number | null | undefined,
    keys: SessionUnwrapKeys
): Promise<Uint8Array | null> {
    const data = typeof encrypted === 'string' ? normal64Bytes(encrypted) : encrypted
    switch (keyType) {
        case 1:
            if (!keys.dataKey) return null
            return platform.aesCbcDecrypt(data, keys.dataKey, true)
        case 2:
            if (!keys.privateKey) return null
            return platform.privateDecrypt(data, keys.privateKey)
        case 3:
            if (!keys.dataKey) return null
            return platform.aesGcmDecrypt(data, keys.dataKey)
        case 4:
            if (!keys.eccPrivateKey) return null
            return platform.privateDecryptEC(data, keys.eccPrivateKey)
        default:
            return null
    }
}

export async function fetchUserPublicKeys(auth: Auth, emails: string[]): Promise<Map<string, UserPublicKeys>> {
    const result = new Map<string, UserPublicKeys>()
    if (emails.length === 0) return result

    let response: Authentication.IGetPublicKeysResponse
    try {
        response = await auth.executeRest(getPublicKeysMessage({ usernames: emails }))
    } catch (err) {
        logger.warn(`Failed to fetch public keys: ${extractErrorMessage(err)}`)
        return result
    }

    for (const entry of response.keyResponses || []) {
        const username = (entry.username || '').toLowerCase()
        if (!username || entry.errorCode) continue
        result.set(username, {
            rsaPublicKey: entry.publicKey && entry.publicKey.length > 0 ? entry.publicKey : null,
            eccPublicKey: entry.publicEccKey && entry.publicEccKey.length > 0 ? entry.publicEccKey : null,
        })
    }
    return result
}

export async function encryptForUserPublicKey(
    plaintext: Uint8Array,
    publicKeys: UserPublicKeys
): Promise<EncryptedForUser | null> {
    if (publicKeys.eccPublicKey && publicKeys.eccPublicKey.length > 0) {
        return {
            ciphertext: await shareKeyEC(plaintext, publicKeys.eccPublicKey),
            keyType: ENCRYPTED_BY_PUBLIC_KEY_ECC,
        }
    }
    if (publicKeys.rsaPublicKey && publicKeys.rsaPublicKey.length > 0) {
        return {
            ciphertext: shareKey(plaintext, platform.bytesToBase64(publicKeys.rsaPublicKey)),
            keyType: ENCRYPTED_BY_PUBLIC_KEY,
        }
    }
    return null
}

export function isCommandFailure(err: unknown): err is Record<string, unknown> {
    return typeof err === 'object' && err !== null && 'result_code' in err
}

export function getResultCode(err: unknown): string {
    if (!isCommandFailure(err)) return ''
    return String(err.result_code || '').toLowerCase()
}

export function getMissingTreeKeyMaps(err: unknown): {
    rsa?: MissingPublicKeysMap
    ecc?: MissingPublicKeysMap
} | null {
    if (!isCommandFailure(err)) return null
    const code = getResultCode(err)
    if (code !== 'missing_keys' && code !== 'missing_ecc_keys') return null
    const rsa = err.missing_tree_keys as MissingPublicKeysMap | undefined
    const ecc = err.missing_ecc_tree_keys as MissingPublicKeysMap | undefined
    if (!rsa && !ecc) return null
    return { rsa, ecc }
}

export function getMissingRoleKeyMaps(err: unknown): {
    rsa?: MissingPublicKeysMap
    ecc?: MissingPublicKeysMap
} | null {
    if (!isCommandFailure(err)) return null
    const code = getResultCode(err)
    if (code !== 'missing_keys' && code !== 'missing_ecc_keys') return null
    const status = err.status as
        | { missing_keys?: MissingPublicKeysMap; missing_ecc_keys?: MissingPublicKeysMap }
        | undefined
    const rsa = status?.missing_keys
    const ecc = status?.missing_ecc_keys
    if (!rsa && !ecc) return null
    return { rsa, ecc }
}

export async function buildTreeKeysFromProvidedPublicKeys(
    treeKey: Uint8Array,
    rsaKeys?: MissingPublicKeysMap,
    eccKeys?: MissingPublicKeysMap
): Promise<RoleManagedNodeTreeKey[]> {
    const treeKeys: RoleManagedNodeTreeKey[] = []
    for (const [userId, publicKey] of Object.entries(rsaKeys || {})) {
        const id = Number(userId)
        if (!Number.isFinite(id) || !publicKey) continue
        treeKeys.push({
            enterprise_user_id: id,
            tree_key: shareKey(treeKey, publicKey),
            tree_key_type: ENCRYPTED_BY_PUBLIC_KEY,
        })
    }
    for (const [userId, publicKey] of Object.entries(eccKeys || {})) {
        const id = Number(userId)
        if (!Number.isFinite(id) || !publicKey) continue
        const eccPub = normal64Bytes(publicKey)
        treeKeys.push({
            enterprise_user_id: id,
            tree_key: await shareKeyEC(treeKey, eccPub),
            tree_key_type: ENCRYPTED_BY_PUBLIC_KEY_ECC,
        })
    }
    return treeKeys
}

function isLikelyEccPublicKey(publicKey: string): boolean {
    try {
        const len = normal64Bytes(publicKey).length
        return len === 33 || len === 65
    } catch {
        return false
    }
}

export async function buildRoleKeysFromProvidedPublicKeys(
    roleKey: Uint8Array,
    rsaKeys?: MissingPublicKeysMap,
    eccKeys?: MissingPublicKeysMap
): Promise<ManagedNodeRoleKey[]> {
    const roleKeys: ManagedNodeRoleKey[] = []
    const handled = new Set<number>()

    for (const [userId, publicKey] of Object.entries(eccKeys || {})) {
        const id = Number(userId)
        if (!Number.isFinite(id) || !publicKey) continue
        handled.add(id)
        roleKeys.push({
            enterprise_user_id: id,
            role_key: await shareKeyEC(roleKey, normal64Bytes(publicKey)),
            tree_key_type: ENCRYPTED_BY_PUBLIC_KEY_ECC,
        })
    }

    for (const [userId, publicKey] of Object.entries(rsaKeys || {})) {
        const id = Number(userId)
        if (!Number.isFinite(id) || !publicKey || handled.has(id)) continue
        if (isLikelyEccPublicKey(publicKey)) {
            roleKeys.push({
                enterprise_user_id: id,
                role_key: await shareKeyEC(roleKey, normal64Bytes(publicKey)),
                tree_key_type: ENCRYPTED_BY_PUBLIC_KEY_ECC,
            })
        } else {
            roleKeys.push({
                enterprise_user_id: id,
                role_key: shareKey(roleKey, publicKey),
                tree_key_type: ENCRYPTED_BY_PUBLIC_KEY,
            })
        }
    }
    return roleKeys
}

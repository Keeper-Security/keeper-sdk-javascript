import type { Auth } from '@keeper-security/keeperapi'
import {
    Folder,
    normal64Bytes,
    platform,
    recordsShareV3Message,
    folderAccessUpdateMessage,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { getRecordTitle } from '../records/RecordUtils'
import {
    buildNsfRecordSharePermission,
    buildNsfRevokePermissionFromKeys,
    loadUserShareKeys,
    loadUserShareKeysOrInvite,
    parseRecordSharingStatus,
} from './nsfShareKeys'
import { KeeperSdkError, ResultCodes, extractErrorMessage } from '../utils'
import { collectNsfRecordUidsInFolder } from './nsfRecordPermission'
import { resolveRecordKeyBytes } from './nsfRecordCrypto'
import { transferNestedShareRecordOwnership } from './nsfTransferRecord'
import { getFolderPermissionsForRole, NSFShareRoleName, NsfShareCommandName } from './nsfConstants'
import {
    checkFolderSharePermission,
    checkRecordChangeOwnershipPermission,
    checkRecordSharePermission,
    collectExistingFolderShareTargets,
    ensureNestedShareFolder,
    ensureNestedShareRecord,
    fetchLiveRecordAccessesV3,
    findDirectUserRecordShare,
    findUserRecordShareEntry,
    findFolderAccessEntryOrLive,
    loadShareUserMap,
    getKeeperDriveRecord,
    getNsfRecordPermissionRoleLabel,
    isShareExpirationNoop,
    parseShareExpiration,
    requireAuthAccountUid,
    resolveNsfFolderIdentifier,
    resolveNsfRecordIdentifier,
    resolveNsfRoleName,
} from './nsfHelpers'
import { encryptNsfFolderKeyForTeam, fetchNsfTeamPublicKeys, resolveNsfShareRecipient } from './nsfTeamShare'
import type {
    NsfDirectUserRecordShare,
    NsfFolderAccessOperationResult,
    NsfFolderShareActionInput,
    NsfFolderShareResultItem,
    NsfRecordShareActionInput,
    NsfRecordSharePlanItem,
    NsfRecordShareResultItem,
    NsfResolvedShareRecipient,
    ShareNestedShareFolderInput,
    ShareNestedShareFolderResult,
    ShareNestedShareRecordInput,
    ShareNestedShareRecordResult,
} from './nsfTypes'
import {
    NsfFolderShareAction,
    NsfFolderShareActionTaken,
    NsfRecordShareAction,
    NsfRecordShareActionTaken,
    NsfResultStatus,
} from './nsfTypes'

const SHARE_ERROR = ResultCodes.NSF_SHARE_FAILED

function normalizeFolderAction(action: NsfFolderShareActionInput = NsfFolderShareAction.Grant): NsfFolderShareAction {
    const value = action as NsfFolderShareAction
    if (value === NsfFolderShareAction.Grant || value === NsfFolderShareAction.Remove) return value
    throw new KeeperSdkError(`Invalid action '${action}'. Use: grant, remove.`, SHARE_ERROR)
}

function normalizeRecordAction(action: NsfRecordShareActionInput = NsfRecordShareAction.Grant): NsfRecordShareAction {
    const value = action as NsfRecordShareAction
    if (
        value === NsfRecordShareAction.Grant ||
        value === NsfRecordShareAction.Revoke ||
        value === NsfRecordShareAction.Owner
    ) {
        return value
    }
    throw new KeeperSdkError(`Invalid action '${action}'. Use: grant, revoke, owner.`, SHARE_ERROR)
}

function parseFolderAccessResult(
    result: Folder.IFolderAccessResult | null | undefined,
    folderUid: string,
    recipient: string
): NsfFolderAccessOperationResult {
    if (!result) {
        return {
            folderUid,
            recipient,
            success: false,
            message: 'No folder access result returned',
        }
    }
    const status = result.status ?? Folder.FolderModifyStatus.SUCCESS
    const statusName = Folder.FolderModifyStatus[status] ?? String(status)
    return {
        folderUid,
        recipient,
        success: status === Folder.FolderModifyStatus.SUCCESS,
        message: result.message || statusName,
    }
}

function buildFolderAccessRemoveData(
    folderUid: string,
    accessTypeUid: Uint8Array,
    accessType: Folder.AccessType
): Folder.IFolderAccessData {
    return Folder.FolderAccessData.create({
        folderUid: normal64Bytes(folderUid),
        accessTypeUid,
        accessType,
    })
}

async function buildEncryptedFolderKeyForUser(
    auth: Auth,
    folderKey: Uint8Array,
    email: string
): Promise<Folder.IEncryptedDataKey> {
    const userKeys = await loadUserShareKeysOrInvite(auth, email, SHARE_ERROR)
    if (userKeys.rsaPublicKey?.length) {
        const rsaKeyBase64 = platform.bytesToBase64(userKeys.rsaPublicKey)
        return Folder.EncryptedDataKey.create({
            encryptedKey: platform.publicEncrypt(folderKey, rsaKeyBase64),
            encryptedKeyType: Folder.EncryptedKeyType.encrypted_by_public_key,
        })
    }
    if (userKeys.eccPublicKey?.length) {
        return Folder.EncryptedDataKey.create({
            encryptedKey: await platform.publicEncryptEC(folderKey, userKeys.eccPublicKey),
            encryptedKeyType: Folder.EncryptedKeyType.encrypted_by_public_key_ecc,
        })
    }
    throw new KeeperSdkError(`No usable public key available for ${email}`, SHARE_ERROR)
}

async function buildFolderAccessGrantData(
    auth: Auth,
    storage: InMemoryStorage,
    folderUid: string,
    target: NsfResolvedShareRecipient,
    accessRoleType: Folder.AccessRoleType,
    expirationTimestamp?: number
): Promise<Folder.IFolderAccessData> {
    const folderKey = await storage.getKeyBytes(folderUid)
    if (!folderKey) {
        throw new KeeperSdkError(
            `Folder key not available for ${folderUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }

    const accessType = target.isTeam ? Folder.AccessType.AT_TEAM : Folder.AccessType.AT_USER
    let accessTypeUid: Uint8Array
    let encryptedFolderKey: Folder.IEncryptedDataKey

    if (target.isTeam) {
        if (!target.accountUid?.length) {
            throw new KeeperSdkError(`Team ${target.recipient} not found`, ResultCodes.TEAM_NOT_FOUND)
        }
        accessTypeUid = target.accountUid
        const teamKeys = await fetchNsfTeamPublicKeys(auth, target.recipient, storage)
        encryptedFolderKey = await encryptNsfFolderKeyForTeam(folderKey, teamKeys)
    } else {
        const userKeys = await loadUserShareKeysOrInvite(auth, target.recipient, SHARE_ERROR)
        accessTypeUid = userKeys.accountUid
        encryptedFolderKey = await buildEncryptedFolderKeyForUser(auth, folderKey, target.recipient)
    }

    const data = Folder.FolderAccessData.create({
        folderUid: normal64Bytes(folderUid),
        accessTypeUid,
        accessType,
        accessRoleType,
        permissions: getFolderPermissionsForRole(accessRoleType),
        folderKey: encryptedFolderKey,
    })

    if (expirationTimestamp != null) {
        data.tlaProperties = { expiration: expirationTimestamp }
    }

    return data
}

function buildFolderAccessUpdateData(
    folderUid: string,
    target: NsfResolvedShareRecipient,
    accessRoleType: Folder.AccessRoleType,
    expirationTimestamp?: number
): Folder.IFolderAccessData {
    if (!target.accountUid?.length) {
        throw new KeeperSdkError(
            target.isTeam ? `Team ${target.recipient} not found` : `User ${target.recipient} not found`,
            target.isTeam ? ResultCodes.TEAM_NOT_FOUND : SHARE_ERROR
        )
    }

    const data = Folder.FolderAccessData.create({
        folderUid: normal64Bytes(folderUid),
        accessTypeUid: target.accountUid,
        accessType: target.isTeam ? Folder.AccessType.AT_TEAM : Folder.AccessType.AT_USER,
        accessRoleType,
        permissions: getFolderPermissionsForRole(accessRoleType),
    })
    if (expirationTimestamp != null) {
        data.tlaProperties = { expiration: expirationTimestamp }
    }
    return data
}

async function resolveFolderShareTargets(
    auth: Auth,
    storage: InMemoryStorage,
    folderUid: string,
    recipients: string[],
    currentUsername: string
): Promise<NsfResolvedShareRecipient[]> {
    const targets: NsfResolvedShareRecipient[] = []
    const seen = new Set<string>()

    for (const raw of recipients) {
        const trimmed = raw.trim()
        if (!trimmed) continue

        if (trimmed === '@existing' || trimmed === '@current') {
            for (const entry of collectExistingFolderShareTargets(storage, folderUid, currentUsername)) {
                const key = `${entry.isTeam ? 'team' : 'user'}:${entry.recipient.toLowerCase()}`
                if (seen.has(key)) continue
                seen.add(key)
                targets.push({
                    recipient: entry.recipient,
                    isTeam: entry.isTeam,
                    accountUid: entry.accountUid ? normal64Bytes(entry.accountUid) : undefined,
                })
            }
            continue
        }

        const classified = await resolveNsfShareRecipient(auth, trimmed)
        if (!classified) continue
        const key = `${classified.isTeam ? 'team' : 'user'}:${classified.recipient.toLowerCase()}`
        if (seen.has(key)) continue
        seen.add(key)

        if (!classified.isTeam) {
            const userKeys = await loadUserShareKeysOrInvite(auth, classified.recipient, SHARE_ERROR)
            targets.push({
                recipient: classified.recipient,
                isTeam: false,
                accountUid: userKeys.accountUid,
            })
        } else {
            targets.push(classified)
        }
    }

    return targets
}

async function grantFolderAccess(
    storage: InMemoryStorage,
    auth: Auth,
    folderUid: string,
    target: NsfResolvedShareRecipient,
    accessRoleType: Folder.AccessRoleType,
    expirationTimestamp?: number
): Promise<NsfFolderShareResultItem> {
    const accessType = target.isTeam ? Folder.AccessType.AT_TEAM : Folder.AccessType.AT_USER
    const accessTypeUid = target.accountUid ? webSafe64FromBytes(target.accountUid) : target.recipient

    const existing = await findFolderAccessEntryOrLive(storage, auth, folderUid, accessTypeUid, accessType)
    if (existing && existing.accessRoleType === accessRoleType && expirationTimestamp == null) {
        return {
            folderUid,
            recipient: target.recipient,
            isTeam: target.isTeam,
            success: true,
            actionTaken: NsfFolderShareActionTaken.AlreadyHadAccess,
            message: `Already has ${getNsfRecordPermissionRoleLabel(accessRoleType)} access`,
        }
    }

    const request =
        existing != null
            ? buildFolderAccessUpdateData(folderUid, target, accessRoleType, expirationTimestamp)
            : await buildFolderAccessGrantData(auth, storage, folderUid, target, accessRoleType, expirationTimestamp)

    const response = await auth.executeRest(
        folderAccessUpdateMessage({
            [existing != null ? 'folderAccessUpdates' : 'folderAccessAdds']: [request],
        })
    )

    const parsed = parseFolderAccessResult(response.folderAccessResults?.[0], folderUid, target.recipient)
    return {
        folderUid,
        recipient: target.recipient,
        isTeam: target.isTeam,
        success: parsed.success,
        actionTaken: existing != null ? NsfFolderShareActionTaken.Updated : NsfFolderShareActionTaken.Granted,
        message: parsed.message,
    }
}

async function removeFolderAccess(
    auth: Auth,
    folderUid: string,
    target: NsfResolvedShareRecipient
): Promise<NsfFolderShareResultItem> {
    const accessType = target.isTeam ? Folder.AccessType.AT_TEAM : Folder.AccessType.AT_USER
    const accountUid =
        target.accountUid ??
        (target.isTeam
            ? normal64Bytes(target.recipient)
            : (await loadUserShareKeysOrInvite(auth, target.recipient, SHARE_ERROR)).accountUid)

    const response = await auth.executeRest(
        folderAccessUpdateMessage({
            folderAccessRemoves: [buildFolderAccessRemoveData(folderUid, accountUid, accessType)],
        })
    )

    const parsed = parseFolderAccessResult(response.folderAccessResults?.[0], folderUid, target.recipient)
    return {
        folderUid,
        recipient: target.recipient,
        isTeam: target.isTeam,
        success: parsed.success,
        actionTaken: NsfFolderShareActionTaken.Removed,
        message: parsed.message,
    }
}

export async function shareNestedShareFolder(
    storage: InMemoryStorage,
    auth: Auth,
    input: ShareNestedShareFolderInput
): Promise<ShareNestedShareFolderResult> {
    const action = normalizeFolderAction(input.action)
    const folders = input.folders.map((folder) => folder.trim()).filter(Boolean)
    const recipients = input.recipients.map((recipient) => recipient.trim()).filter(Boolean)

    if (folders.length === 0) {
        throw new KeeperSdkError('Folder path or UID is required.', SHARE_ERROR)
    }
    if (recipients.length === 0) {
        throw new KeeperSdkError('Recipient is required (email, team name/UID, or @existing).', SHARE_ERROR)
    }

    const role = input.role?.trim() || NSFShareRoleName.Viewer
    const accessRoleType = action === NsfFolderShareAction.Grant ? resolveNsfRoleName(role) : undefined

    const expirationTimestamp =
        action === NsfFolderShareAction.Grant
            ? parseShareExpiration({
                  expireAt: input.expireAt,
                  expireIn: input.expireIn,
                  expirationTimestamp: input.expirationTimestamp,
                  cmdName: NsfShareCommandName.FolderShare,
              })
            : undefined

    const accountUid = requireAuthAccountUid(auth)
    const results: NsfFolderShareResultItem[] = []

    try {
        for (const folderArg of folders) {
            const folderUid = resolveNsfFolderIdentifier(storage, folderArg)
            if (!folderUid) {
                throw new KeeperSdkError(`No such folder: ${folderArg}`, ResultCodes.NSF_NOT_FOUND)
            }
            ensureNestedShareFolder(storage, folderUid, folderArg)
            checkFolderSharePermission(storage, folderUid, auth.username, accountUid)

            const targets = await resolveFolderShareTargets(auth, storage, folderUid, recipients, auth.username)
            if (targets.length === 0) {
                throw new KeeperSdkError(`No share targets resolved for folder '${folderArg}'.`, SHARE_ERROR)
            }

            for (const target of targets) {
                if (action === NsfFolderShareAction.Remove) {
                    results.push(await removeFolderAccess(auth, folderUid, target))
                } else {
                    results.push(
                        await grantFolderAccess(storage, auth, folderUid, target, accessRoleType!, expirationTimestamp)
                    )
                }
            }
        }

        return { results }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(`Failed to share nested share folder: ${extractErrorMessage(err)}`, SHARE_ERROR)
    }
}

function resolveRecordUids(storage: InMemoryStorage, recordArg: string, recursive: boolean): string[] {
    const trimmed = recordArg.trim()
    if (!trimmed) {
        throw new KeeperSdkError('Record path or UID is required.', SHARE_ERROR)
    }

    if (getKeeperDriveRecord(storage, trimmed)) {
        ensureNestedShareRecord(storage, trimmed, trimmed)
        return [trimmed]
    }

    const recordUid = resolveNsfRecordIdentifier(storage, trimmed)
    if (recordUid) {
        ensureNestedShareRecord(storage, recordUid, trimmed)
        return [recordUid]
    }

    const folderUid = resolveNsfFolderIdentifier(storage, trimmed)
    if (folderUid) {
        ensureNestedShareFolder(storage, folderUid, trimmed)
        const recordUids = collectNsfRecordUidsInFolder(storage, folderUid, recursive)
        if (recordUids.size === 0) {
            throw new KeeperSdkError('No records found in the specified folder.', ResultCodes.NSF_NOT_FOUND)
        }
        return [...recordUids]
    }

    throw new KeeperSdkError(`Record or folder '${trimmed}' not found`, ResultCodes.NSF_NOT_FOUND)
}

function isShareUpdateNoop(
    existing: NsfDirectUserRecordShare,
    accessRoleType: Folder.AccessRoleType,
    expirationTimestamp?: number
): boolean {
    if (existing.accessRoleType !== accessRoleType) return false
    return isShareExpirationNoop(existing.expiration, expirationTimestamp)
}

async function requireRecordKey(storage: InMemoryStorage, auth: Auth, recordUid: string): Promise<Uint8Array> {
    const recordKey = await resolveRecordKeyBytes(storage, auth, recordUid)
    if (!recordKey) {
        throw new KeeperSdkError(
            `Record key not available for ${recordUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }
    return recordKey
}

async function transferRecordOwnership(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string,
    email: string
): Promise<NsfRecordShareResultItem> {
    const result = await transferNestedShareRecordOwnership(storage, auth, recordUid, email)
    return {
        recordUid,
        email,
        success: result.success,
        actionTaken: NsfRecordShareActionTaken.Owner,
        message: result.message,
    }
}

async function resolveUserRecordShareForRevoke(
    auth: Auth,
    storage: InMemoryStorage,
    recordUid: string,
    email: string
): Promise<{
    hasDirectShare: boolean
    inherited: boolean
    userKeys: Awaited<ReturnType<typeof loadUserShareKeys>>
}> {
    const userKeys = await loadUserShareKeys(auth, email)
    const accountUidStr = webSafe64FromBytes(userKeys.accountUid)
    const shareUsers = await loadShareUserMap(auth, storage)

    const storageEntry = findUserRecordShareEntry(storage, recordUid, email, accountUidStr, shareUsers)
    if (storageEntry) {
        return {
            hasDirectShare: !storageEntry.inherited,
            inherited: !!storageEntry.inherited,
            userKeys,
        }
    }

    const { recordAccesses } = await fetchLiveRecordAccessesV3(auth, storage, [recordUid])
    const liveEntry = recordAccesses.find(
        (access) =>
            access.recordUid === recordUid &&
            !access.owner &&
            (access.accessTypeUid === accountUidStr || access.accessorName.toLowerCase() === email.toLowerCase())
    )
    if (!liveEntry) {
        return { hasDirectShare: false, inherited: false, userKeys }
    }
    return {
        hasDirectShare: !liveEntry.inherited,
        inherited: !!liveEntry.inherited,
        userKeys,
    }
}

async function revokeRecordShare(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string,
    email: string
): Promise<NsfRecordShareResultItem> {
    const shareState = await resolveUserRecordShareForRevoke(auth, storage, recordUid, email)
    if (!shareState.hasDirectShare && !shareState.inherited) {
        return {
            recordUid,
            email,
            success: true,
            actionTaken: NsfRecordShareActionTaken.NoAccess,
            message: 'User does not have access to this record',
        }
    }
    if (shareState.inherited) {
        return {
            recordUid,
            email,
            success: true,
            actionTaken: NsfRecordShareActionTaken.Skipped,
            message: 'Access is inherited from a shared folder — revoke at the parent folder',
        }
    }

    const permission = buildNsfRevokePermissionFromKeys(recordUid, shareState.userKeys)
    const response = await auth.executeRest(recordsShareV3Message({ revokeSharingPermissions: [permission] }))
    const parsed = parseRecordSharingStatus(response.revokedSharingStatus?.[0])
    return {
        recordUid,
        email,
        success: parsed.success,
        actionTaken: NsfRecordShareActionTaken.Revoke,
        message: parsed.message,
    }
}

async function grantRecordShare(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string,
    email: string,
    accessRoleType: Folder.AccessRoleType,
    expirationTimestamp?: number
): Promise<NsfRecordShareResultItem> {
    const existing = findDirectUserRecordShare(storage, recordUid, email)
    if (existing && isShareUpdateNoop(existing, accessRoleType, expirationTimestamp)) {
        return {
            recordUid,
            email,
            success: true,
            actionTaken: NsfRecordShareActionTaken.Update,
            message: 'Already has requested access',
        }
    }

    if (existing && expirationTimestamp != null && expirationTimestamp > 0) {
        const revokeResult = await revokeRecordShare(storage, auth, recordUid, email)
        if (!revokeResult.success) {
            return { ...revokeResult, actionTaken: NsfRecordShareActionTaken.Update }
        }
        const recordKey = await requireRecordKey(storage, auth, recordUid)
        const permission = await buildNsfRecordSharePermission(
            auth,
            recordUid,
            recordKey,
            email,
            accessRoleType,
            expirationTimestamp,
            SHARE_ERROR
        )
        const response = await auth.executeRest(recordsShareV3Message({ createSharingPermissions: [permission] }))
        const parsed = parseRecordSharingStatus(response.createdSharingStatus?.[0])
        return {
            recordUid,
            email,
            success: parsed.success,
            actionTaken: NsfRecordShareActionTaken.Grant,
            message: parsed.message,
        }
    }

    const recordKey = await requireRecordKey(storage, auth, recordUid)
    const permission = await buildNsfRecordSharePermission(
        auth,
        recordUid,
        recordKey,
        email,
        accessRoleType,
        expirationTimestamp,
        SHARE_ERROR
    )

    const field = existing ? 'updateSharingPermissions' : 'createSharingPermissions'
    const response = await auth.executeRest(recordsShareV3Message({ [field]: [permission] }))
    const statusField = existing ? 'updatedSharingStatus' : 'createdSharingStatus'
    const parsed = parseRecordSharingStatus(response[statusField]?.[0])

    return {
        recordUid,
        email,
        success: parsed.success,
        actionTaken: existing ? NsfRecordShareActionTaken.Update : NsfRecordShareActionTaken.Grant,
        message: parsed.message,
    }
}

function recordTitle(storage: InMemoryStorage, recordUid: string): string {
    const recordEntry = getKeeperDriveRecord(storage, recordUid)
    if (!recordEntry) return ''
    return getRecordTitle(recordEntry).slice(0, 32)
}

export function formatNsfRecordSharePlan(plan: NsfRecordSharePlanItem[], dryRun = false): string {
    if (plan.length === 0) return 'No record share changes planned.'
    const lines = ['Record share plan']
    for (const item of plan) {
        let line = `  ${item.recordUid}  ${item.title || '—'}  ${item.email}  ${item.action}${item.role ? `  ${item.role}` : ''}`
        if (dryRun && item.expirationTimestamp != null) {
            line += `  expires=${item.expirationTimestamp} ms`
        }
        lines.push(line)
    }
    return lines.join('\n')
}

export function formatNsfRecordShareResults(results: NsfRecordShareResultItem[]): string {
    if (results.length === 0) return ''
    const lines: string[] = []
    for (const item of results) {
        lines.push(
            `${item.recordUid}  ${item.email}  ${item.actionTaken}  ${item.success ? NsfResultStatus.Success : NsfResultStatus.Failed}  ${item.message || ''}`
        )
    }
    return lines.join('\n')
}

export function formatNsfFolderShareResults(results: NsfFolderShareResultItem[]): string {
    if (results.length === 0) return ''
    const lines: string[] = []
    for (const item of results) {
        lines.push(
            `${item.folderUid}  ${item.recipient}  ${item.actionTaken}  ${item.success ? NsfResultStatus.Success : NsfResultStatus.Failed}  ${item.message || ''}`
        )
    }
    return lines.join('\n')
}

export async function shareNestedShareRecord(
    storage: InMemoryStorage,
    auth: Auth,
    input: ShareNestedShareRecordInput
): Promise<ShareNestedShareRecordResult> {
    const action = normalizeRecordAction(input.action)
    const emails = input.emails.map((email) => email.trim()).filter(Boolean)
    const dryRun = input.dryRun ?? false

    if (!input.record?.trim()) {
        throw new KeeperSdkError('Record path or UID is required.', SHARE_ERROR)
    }
    if (emails.length === 0) {
        throw new KeeperSdkError('Recipient email is required.', SHARE_ERROR)
    }
    if (action === NsfRecordShareAction.Owner && emails.length > 1) {
        throw new KeeperSdkError('Ownership can only be transferred to a single account.', SHARE_ERROR)
    }
    if (action === NsfRecordShareAction.Grant && !input.role?.trim()) {
        throw new KeeperSdkError('Role is required for grant action.', SHARE_ERROR)
    }

    const role = input.role?.trim() || NSFShareRoleName.Viewer
    const accessRoleType = action === NsfRecordShareAction.Grant ? resolveNsfRoleName(role) : undefined

    const expirationTimestamp =
        action === NsfRecordShareAction.Grant
            ? parseShareExpiration({
                  expireAt: input.expireAt,
                  expireIn: input.expireIn,
                  expirationTimestamp: input.expirationTimestamp,
                  cmdName: NsfShareCommandName.RecordShare,
              })
            : undefined

    const recordUids = resolveRecordUids(storage, input.record, input.recursive ?? false)
    const accountUid = requireAuthAccountUid(auth)

    for (const recordUid of recordUids) {
        checkRecordSharePermission(storage, recordUid, auth.username, accountUid)
        if (action === NsfRecordShareAction.Owner) {
            checkRecordChangeOwnershipPermission(storage, recordUid, auth.username, accountUid)
        }
    }

    const plan: NsfRecordSharePlanItem[] = []
    for (const email of emails) {
        for (const recordUid of recordUids) {
            plan.push({
                recordUid,
                title: recordTitle(storage, recordUid),
                email,
                action,
                role: action === NsfRecordShareAction.Grant ? role : undefined,
                expirationTimestamp,
            })
        }
    }

    if (dryRun) {
        return { dryRun: true, plan, results: [] }
    }

    const results: NsfRecordShareResultItem[] = []

    try {
        for (const email of emails) {
            for (const recordUid of recordUids) {
                if (action === NsfRecordShareAction.Owner) {
                    results.push(await transferRecordOwnership(storage, auth, recordUid, email))
                } else if (action === NsfRecordShareAction.Revoke) {
                    results.push(await revokeRecordShare(storage, auth, recordUid, email))
                } else {
                    results.push(
                        await grantRecordShare(storage, auth, recordUid, email, accessRoleType!, expirationTimestamp)
                    )
                }
            }
        }

        return { dryRun: false, plan, results }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(`Failed to share nested share record: ${extractErrorMessage(err)}`, SHARE_ERROR)
    }
}

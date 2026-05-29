import { Auth } from './auth'
import { NN, syncDownMessage } from './restMessages'
import { CryptoWorkerOptions, EncryptionType, KeyStorage, platform } from './platform'
import { Folder, record, Records, Tokens, Vault } from './proto'
import { formatTimeDiff, isNil, toOptional, webSafe64FromBytes } from './utils'
import { logger } from './log'
import CacheStatus = Vault.CacheStatus
import RecordKeyType = Records.RecordKeyType
import IRecordMetaData = Vault.IRecordMetaData
import IRecord = Vault.IRecord
import INonSharedData = Vault.INonSharedData
import ISharedFolder = Vault.ISharedFolder
import ISharedFolderUser = Vault.ISharedFolderUser
import ISharedFolderTeam = Vault.ISharedFolderTeam
import ISharedFolderRecord = Vault.ISharedFolderRecord
import IRecordLink = Vault.IRecordLink
import IUserFolder = Vault.IUserFolder
import ITeam = Vault.ITeam
import ISharedFolderKey = Vault.ISharedFolderKey
import ISharedFolderFolder = Vault.ISharedFolderFolder
import IUserFolderRecord = Vault.IUserFolderRecord
import ISharedFolderFolderRecord = Vault.ISharedFolderFolderRecord
import IUserFolderSharedFolder = Vault.IUserFolderSharedFolder
import IReusedPasswords = Vault.IReusedPasswords
import IProfile = Vault.IProfile
import IBreachWatchRecord = Vault.IBreachWatchRecord
import IBreachWatchSecurityData = Vault.IBreachWatchSecurityData
import type { UnwrapKeyMap } from './platform'
import {
    createKdRecordAccessCompositeKey,
    DKdFolderRecord,
    DKdRecordAccess,
    DKdRecordSharingState,
    DKdFolder,
    DKdFolderAccess,
    DKdFolderSharingState,
    mapTeamKeyType,
    DKdRecordLink,
    createKdFolderAccessCompositeKey,
} from './syncDown'

export type VaultStorageDeleteOption =
    | { kind: 'keeper_drive_record_access'; actorUid: string; recordUid: string }
    | { kind: 'keeper_drive_folder_access'; folderUid: string; actorUid: string }

export type VaultStorage = KeyStorage & {
    put(data: VaultStorageData): Promise<void>
    getDependencies(uid: string): Promise<Dependency[] | undefined>
    addDependencies(dependencies: Dependencies): Promise<void>
    removeDependencies(dependencies: RemovedDependencies): Promise<void>
    clear(): Promise<void>
    get<T extends VaultStorageKind>(kind: T, uid?: string): Promise<VaultStorageResult<T>>
    delete(kind: VaultStorageKind, uid: string | Uint8Array, option?: VaultStorageDeleteOption): Promise<void>
}

export type VaultStorageData =
    | DProfilePic
    | DContinuationToken
    | DRecord
    | DRecordMetadata
    | DRecordNonSharedData
    | DTeam
    | DSharedFolder
    | DSharedFolderUser
    | DSharedFolderTeam
    | DSharedFolderRecord
    | DSharedFolderFolder
    | DUserFolder
    | DProfile
    | DReusedPasswords
    | DBWRecord
    | DBWSecurityData
    | DSecurityScoreData
    | DUser
    | DRecordRotation
    | DKdFolderRecord
    | DKdRecordAccess
    | DKdRecordSharingState
    | DKdFolder
    | DKdFolderSharingState
    | DKdFolderAccess
    | DKdRecordLink

export type VaultStorageKind = VaultStorageData['kind']

export type VaultStorageResult<T extends VaultStorageKind> =
    | (T extends 'continuationToken' ? DContinuationToken : T extends 'record' ? DRecord : never)
    | undefined

type MappedCounts<Type> = {
    [Property in keyof Type]: number
}

type SyncResponseCounts = Partial<
    MappedCounts<Omit<Vault.ISyncDownResponse, 'keeperDriveData'> & Vault.IKeeperDriveData>
>

export type SyncResult = {
    started: Date
    username: string
    pageCount: number
    counts: SyncResponseCounts
    totalTime?: string
    networkTime?: string
    error?: string
    continuationToken?: string
    fullSync?: boolean
}

export type Udata = {
    file_ids?: string[]
}

export type DRecord = {
    kind: 'record'
    uid: string
    data: any
    version: number
    revision: number
    shared: boolean
    clientModifiedTime: number
    extra?: any
    udata?: Udata
    isKeeperDriveData?: boolean
}

export type DRecordMetadata = {
    kind: 'metadata'
    uid: string
    owner: boolean
    canShare: boolean
    canEdit: boolean
    recordKeyType: Records.RecordKeyType
    ownerAccountUid?: string
    ownerUsername?: string
}

export type DTeam = {
    kind: 'team'
    uid: string
    name: string
    restrictEdit: boolean
    restrictShare: boolean
    restrictView: boolean
}

export type DRecordNonSharedData = {
    kind: 'non_shared_data'
    uid: string
    data: { [key: string]: any }
}

export type DSharedFolder = {
    kind: 'shared_folder'
    uid: string
    data: any
    name?: string
    ownerAccountUid?: string
    ownerUsername?: string
    revision: number
    defaultCanEdit: boolean
    defaultCanShare: boolean
    defaultManageRecords: boolean
    defaultManageUsers: boolean
}

export type DSharedFolderUser = {
    kind: 'shared_folder_user'
    sharedFolderUid: string
    accountUid?: string
    accountUsername?: string
    manageRecords: boolean
    manageUsers: boolean
}

export type DSharedFolderTeam = {
    kind: 'shared_folder_team'
    sharedFolderUid: string
    teamUid: string
    name: string
    manageRecords: boolean
    manageUsers: boolean
}

export type DSharedFolderRecord = {
    kind: 'shared_folder_record'
    sharedFolderUid: string
    recordUid: string
    // ownerAccountUid?: Uint8Array
    ownerUid: string
    owner: boolean
    canShare: boolean
    canEdit: boolean
    ownerUsername?: string
}

export type DSharedFolderFolder = {
    kind: 'shared_folder_folder'
    uid: string
    data: any
    revision: number
    sharedFolderUid: string
}

export type DUserFolder = {
    kind: 'user_folder'
    uid: string
    data: any
    revision: number
}

export type DReusedPasswords = {
    kind: 'reused_passwords'
    count: number
    revision: number
}

export type DProfile = {
    kind: 'profile'
    profileName: string
    data: any
    revision: number
}

export type DProfilePic = {
    kind: 'profilePic'
    data: {
        url: string
        revision: number
    }
}

export type DBWRecord = {
    kind: 'bw_record'
    uid: string
    data: any
    scannedBy?: string
    scannedByAccountUid?: string
    type: string
    revision: number
}

export type DBWSecurityData = {
    kind: 'bw_security_data'
    uid: string
    revision: number
}

export type DSecurityScoreData = {
    kind: 'security_score_data'
    uid: string
    data: any
    revision: number
}

export type DUser = {
    kind: 'user'
    accountUid: Uint8Array
    username: string
}

export type DPwdComplexity = {
    length: number
    caps: number
    lowercase: number
    digits: number
    special: number
    specialChars?: string
}

export type DRecordRotation = {
    kind: 'record_rotation'
    uid: string
    revision: number
    configurationUid: string
    resourceUid: string
    schedule: string
    lastRotation?: number
    lastRotationStatus?: Vault.RecordRotationStatus
    pwdComplexity?: DPwdComplexity
    disabled: boolean
}

export type DContinuationToken = {
    kind?: 'continuationToken'
    token: string
    isSecurityDataFieldEmptyInFullSync?: boolean
}

export type Dependency = {
    kind: VaultStorageKind
    parentUid: string
    uid: string
}
export type RemovedDependency = {
    parentKind: VaultStorageKind
    childKind: VaultStorageKind
    childUid: string
}
export type DependencyMap = Record<string, Dependency>
export type Dependencies = Record<string, Set<Dependency>>
export type RemovedDependencies = Record<string, Set<string | RemovedDependency> | '*'>

const addDependencies = (dependencies: Dependencies, parentUid: string, childUid: string, kind: VaultStorageKind) => {
    let children = dependencies[parentUid]
    if (!children) {
        children = new Set<Dependency>()
        dependencies[parentUid] = children
    }
    children.add({
        kind: kind,
        uid: childUid,
        parentUid: parentUid,
    })
}

const addRemovedDependencies = (
    dependencies: RemovedDependencies,
    parentUid: string,
    childUid: string | RemovedDependency
) => {
    let children = dependencies[parentUid]
    if (children === '*') {
        return
    }
    if (!children) {
        children = new Set<string | RemovedDependency>()
        dependencies[parentUid] = children
    }
    children.add(childUid)
}

const getDependencies = async (folderUid: string, storage: VaultStorage, results: DependencyMap) => {
    const storageGetDependencies = await storage.getDependencies(folderUid)
    for await (const dependency of storageGetDependencies || []) {
        switch (dependency.kind) {
            case 'record':
                results[dependency.parentUid] = dependency
                break
            case 'user_folder':
                results[dependency.parentUid] = dependency
                await getDependencies(dependency.uid, storage, results)
                break
            default:
                throw Error('Unexpected dependency: ' + dependency.kind)
        }
    }
}

const mapKeyType = (
    keyType: Records.RecordKeyType | Folder.EncryptedKeyType
): { keyId: string; encryptionType: EncryptionType } | null => {
    let keyId: string
    let encryptionType: EncryptionType
    switch (keyType) {
        case RecordKeyType.NO_KEY:
        case Folder.EncryptedKeyType.no_key:
            return null
        case RecordKeyType.ENCRYPTED_BY_DATA_KEY:
        case Folder.EncryptedKeyType.encrypted_by_data_key:
            keyId = 'data'
            encryptionType = 'cbc'
            break
        case RecordKeyType.ENCRYPTED_BY_DATA_KEY_GCM:
        case Folder.EncryptedKeyType.encrypted_by_data_key_gcm:
            keyId = 'data'
            encryptionType = 'gcm'
            break
        // RSA TAGGED - might have to fallback to ecc or force ecc - dont make a change here, rely on keeperapp to provide the correct keyType
        case RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY:
        case Folder.EncryptedKeyType.encrypted_by_public_key:
            keyId = 'pk_rsa'
            encryptionType = 'rsa'
            break
        case RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY_ECC:
        case Folder.EncryptedKeyType.encrypted_by_public_key_ecc:
            keyId = 'pk_ecc'
            encryptionType = 'ecc'
            break
        default:
            logger.error('Unknown record key type: ' + keyType)
            return null
    }
    return { keyId, encryptionType }
}

export const processUsers = async (users: Vault.IUser[], storage: VaultStorage) => {
    for (const user of users as NN<Vault.IUser>[]) {
        await storage.put({
            kind: 'user',
            accountUid: user.accountUid,
            username: user.username,
        })
    }
}

export const processTeams = async (teams: NN<ITeam>[], storage: VaultStorage, dependencies: Dependencies) => {
    const teamKeys: UnwrapKeyMap = {}
    const teamPrivateKeys: UnwrapKeyMap = {}
    const teamSharedFolderKeys: UnwrapKeyMap = {}

    for (const team of Object.values(teams)) {
        const teamUid = webSafe64FromBytes(team.teamUid)

        const keyInfo = mapKeyType(team.teamKeyType)
        if (keyInfo) {
            const { keyId, encryptionType } = keyInfo
            teamKeys[teamUid] = {
                data: team.teamKey,
                dataId: teamUid,
                keyId,
                encryptionType,
                unwrappedType: 'aes',
            }
        }

        if (team.teamPrivateKey?.length) {
            teamPrivateKeys[teamUid + '_priv'] = {
                data: team.teamPrivateKey,
                dataId: teamUid + '_priv',
                keyId: teamUid,
                encryptionType: 'cbc',
                unwrappedType: 'rsa',
            }
        }

        if (team.teamEccPublicKey?.length && team.teamEccPrivateKey?.length) {
            teamPrivateKeys[teamUid + '_ecc'] = {
                data: new Uint8Array([...team.teamEccPublicKey, ...team.teamEccPrivateKey]),
                dataId: teamUid + '_ecc',
                keyId: teamUid,
                encryptionType: 'gcm',
                unwrappedType: 'ecc',
            }
        }

        if (!team.teamPrivateKey?.length && (!team.teamEccPublicKey?.length || !team.teamEccPrivateKey?.length)) {
            logger.error(
                `Key ${team.teamKeyType} type for team folder private key ${teamUid} is not supported for team folder decryption`
            )
        }

        for (const folderKey of team.sharedFolderKeys as NN<ISharedFolderKey>[]) {
            // Empty if team being removed from shared folder
            if (!folderKey.sharedFolderKey.byteLength) continue

            // Shared folder already going to be decrypted for a different team
            const folderUid = webSafe64FromBytes(folderKey.sharedFolderUid)
            if (teamSharedFolderKeys[folderUid]) continue

            switch (folderKey.keyType) {
                case Records.RecordKeyType.ENCRYPTED_BY_DATA_KEY:
                    teamSharedFolderKeys[folderUid] = {
                        data: folderKey.sharedFolderKey,
                        dataId: folderUid,
                        keyId: teamUid,
                        encryptionType: 'cbc',
                        unwrappedType: 'aes',
                    }
                    break
                case Records.RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY:
                    teamSharedFolderKeys[folderUid] = {
                        data: folderKey.sharedFolderKey,
                        dataId: folderUid,
                        keyId: teamUid + '_priv',
                        encryptionType: 'rsa',
                        unwrappedType: 'aes',
                    }
                    break
                case Records.RecordKeyType.ENCRYPTED_BY_PUBLIC_KEY_ECC:
                    teamSharedFolderKeys[folderUid] = {
                        data: folderKey.sharedFolderKey,
                        dataId: folderUid,
                        keyId: teamUid + '_ecc',
                        encryptionType: 'ecc',
                        unwrappedType: 'aes',
                    }
                    break
                default:
                    logger.error(
                        `Key ${folderKey.keyType} type for team folder key ${teamUid}/${folderUid} is not supported for team folder decryption`
                    )
                    break
            }

            addDependencies(dependencies, teamUid, folderUid, 'shared_folder')
        }

        await storage.put({
            kind: 'team',
            uid: teamUid,
            name: team.name,
            restrictEdit: team.restrictEdit,
            restrictShare: team.restrictShare,
            restrictView: team.restrictView,
        })
    }

    // Unwrap in order of dependency
    await platform.unwrapKeys(teamKeys, storage)
    await platform.unwrapKeys(teamPrivateKeys, storage)
    await platform.unwrapKeys(teamSharedFolderKeys, storage)
}

const processFolder = async (
    folderUid: string,
    fData: Uint8Array,
    shared: boolean,
    storage: VaultStorage
): Promise<any | undefined> => {
    try {
        const decryptedData = await platform.decrypt(fData, folderUid, 'cbc', storage)
        return JSON.parse(platform.bytesToString(decryptedData))
    } catch (e: any) {
        logger.error(`The ${shared ? 'shared ' : ''}folder ${folderUid} data cannot be decrypted (${e.message})`)
    }
}

const processUserFolders = async (folders: IUserFolder[], storage: VaultStorage, dependencies: Dependencies) => {
    const folderKeys: UnwrapKeyMap = {}

    for (const folder of folders as NN<IUserFolder>[]) {
        const { userFolderKey, keyType } = folder
        const folderUid = webSafe64FromBytes(folder.folderUid)

        const keyInfo = mapKeyType(keyType)
        if (keyInfo) {
            const { keyId, encryptionType } = keyInfo
            folderKeys[folderUid] = {
                data: userFolderKey,
                dataId: folderUid,
                keyId,
                encryptionType,
                unwrappedType: 'aes',
            }
        }
    }

    await platform.unwrapKeys(folderKeys, storage)

    for (const folder of folders as NN<IUserFolder>[]) {
        const folderUid = webSafe64FromBytes(folder.folderUid)
        const folderData = await processFolder(folderUid, folder.data, false, storage)
        if (!folderData) {
            continue
        }
        await storage.put({
            kind: 'user_folder',
            uid: folderUid,
            data: folderData,
            revision: <number>folder.revision,
        })
        if (folder.parentUid.length > 0) {
            addDependencies(dependencies, webSafe64FromBytes(folder.parentUid), folderUid, 'user_folder')
        }
    }
}

const processUserFolderRecords = async (folderRecords: IUserFolderRecord[], dependencies: Dependencies) => {
    for (const folderRecord of folderRecords as NN<IUserFolderRecord>[]) {
        const recUid = webSafe64FromBytes(folderRecord.recordUid)
        if (folderRecord.folderUid?.length > 0) {
            addDependencies(dependencies, webSafe64FromBytes(folderRecord.folderUid), recUid, 'record')
        } else {
            // Root user folder
            addDependencies(dependencies, '', recUid, 'record')
        }
    }
}

const processSharedFolders = async (folders: ISharedFolder[], storage: VaultStorage) => {
    const sharedFolderKeys: UnwrapKeyMap = {}

    for (const folder of folders as NN<ISharedFolder>[]) {
        const { sharedFolderKey, keyType } = folder
        const sharedFolderUid = webSafe64FromBytes(folder.sharedFolderUid)

        const keyInfo = mapKeyType(keyType)
        if (keyInfo) {
            const { keyId, encryptionType } = keyInfo
            sharedFolderKeys[sharedFolderUid] = {
                data: sharedFolderKey,
                dataId: sharedFolderUid,
                keyId,
                encryptionType,
                unwrappedType: 'aes',
            }
        }
    }

    await platform.unwrapKeys(sharedFolderKeys, storage)

    for (const folder of folders as NN<ISharedFolder>[]) {
        const folderUid = webSafe64FromBytes(folder.sharedFolderUid)

        // name
        let folderName: string | undefined
        if (folder.name.length) {
            try {
                const folderNameBytes = await platform.decrypt(folder.name, folderUid, 'cbc', storage)
                folderName = platform.bytesToString(folderNameBytes)
            } catch (e: any) {
                logger.error(`The shared folder ${folderUid} name cannot be decrypted (${e.message})`)
            }
        }

        // data
        let folderData = await processFolder(folderUid, folder.data, true, storage)
        if (!folderName && !folderData) {
            continue
        }
        const ownerUid = folder.ownerAccountUid ? webSafe64FromBytes(folder.ownerAccountUid) : undefined
        await storage.put({
            kind: 'shared_folder',
            uid: folderUid,
            data: folderData,
            name: folderName,
            revision: <number>folder.revision,
            defaultCanEdit: folder.defaultCanEdit,
            defaultCanShare: folder.defaultCanReshare,
            defaultManageUsers: folder.defaultManageUsers,
            defaultManageRecords: folder.defaultManageRecords,
            ownerAccountUid: ownerUid,
            ownerUsername: folder.owner,
        })
    }
}

const processSharedFolderUsers = async (users: ISharedFolderUser[], storage: VaultStorage) => {
    for (const user of users as NN<ISharedFolderUser>[]) {
        await storage.put({
            kind: 'shared_folder_user',
            sharedFolderUid: webSafe64FromBytes(user.sharedFolderUid),
            accountUid: webSafe64FromBytes(user.accountUid),
            accountUsername: user.username,
            manageRecords: user.manageRecords,
            manageUsers: user.manageUsers,
        })
    }
}

const processSharedFolderTeams = async (sharedFolderTeams: ISharedFolderTeam[], storage: VaultStorage) => {
    for (const sharedFolderTeam of sharedFolderTeams as NN<ISharedFolderTeam>[]) {
        const teamUid = webSafe64FromBytes(sharedFolderTeam.teamUid)
        const sharedFolderUid = webSafe64FromBytes(sharedFolderTeam.sharedFolderUid)

        await storage.put({
            kind: 'shared_folder_team',
            teamUid,
            sharedFolderUid,
            name: sharedFolderTeam.name,
            manageRecords: sharedFolderTeam.manageRecords,
            manageUsers: sharedFolderTeam.manageUsers,
        })
    }
}

const processSharedFolderRecords = async (records: ISharedFolderRecord[], storage: VaultStorage) => {
    for (const rec of records as NN<ISharedFolderRecord>[]) {
        const recUid = webSafe64FromBytes(rec.recordUid)

        let encryptionType: EncryptionType | undefined
        switch (rec.recordKey.length) {
            case 60:
                encryptionType = 'gcm'
                break
            case 64:
                encryptionType = 'cbc'
                break
            default:
                logger.error('Unable to detect the shared folder key encryption type')
        }
        try {
            const sharedFolderUid = webSafe64FromBytes(rec.sharedFolderUid)

            if (encryptionType) {
                await platform.unwrapKey(rec.recordKey, recUid, sharedFolderUid, encryptionType, 'aes', storage)
            }

            const ownerUid = webSafe64FromBytes(rec.ownerAccountUid)
            await storage.put({
                kind: 'shared_folder_record',
                recordUid: recUid,
                sharedFolderUid,
                owner: rec.owner,
                ownerUid,
                canEdit: rec.owner ? true : rec.canEdit,
                canShare: rec.owner ? true : rec.canShare,
                ownerUsername: rec.ownerUsername,
            })
        } catch (e: any) {
            logger.error(`The shared folder record ${recUid} cannot be decrypted (${e.message})`)
        }
    }
}

const processSharedFolderFolderRecords = async (records: ISharedFolderFolderRecord[], dependencies: Dependencies) => {
    for (const rec of records as NN<ISharedFolderFolderRecord>[]) {
        const parentUid =
            rec.folderUid.length > 0 ? webSafe64FromBytes(rec.folderUid) : webSafe64FromBytes(rec.sharedFolderUid)
        addDependencies(dependencies, parentUid, webSafe64FromBytes(rec.recordUid), 'record')
    }
}

const processUserFolderSharedFolders = async (folders: IUserFolderSharedFolder[], dependencies: Dependencies) => {
    for (const folder of folders as NN<IUserFolderSharedFolder>[]) {
        const folderUid = webSafe64FromBytes(folder.folderUid)
        const sharedFolderUid = webSafe64FromBytes(folder.sharedFolderUid)

        if (folderUid.length > 0) {
            addDependencies(dependencies, folderUid, sharedFolderUid, 'shared_folder')
        }
    }
}

const processRecordLinks = async (links: IRecordLink[], storage: VaultStorage) => {
    for (const link of links as NN<IRecordLink>[]) {
        const recUid = webSafe64FromBytes(link.childRecordUid)
        try {
            await platform.unwrapKey(
                link.recordKey,
                recUid,
                webSafe64FromBytes(link.parentRecordUid),
                'gcm',
                'aes',
                storage,
                true
            )
        } catch (e: any) {
            logger.error(`The record link for ${recUid} cannot be decrypted (${e.message})`)
        }
    }
}

const processRecords = async (records: IRecord[], storage: VaultStorage) => {
    for (const rec of records as NN<IRecord>[]) {
        const recUid = webSafe64FromBytes(rec.recordUid)
        const encryptionType: EncryptionType = rec.version >= 3 ? 'gcm' : 'cbc'

        let extra: any
        let udata: Udata | undefined
        try {
            if (rec.extra.byteLength > 0) {
                const decryptedExtra = await platform.decrypt(rec.extra, recUid, encryptionType, storage)
                extra = JSON.parse(platform.bytesToString(decryptedExtra))
            }
        } catch (e: any) {
            logger.error(`The record extra data ${recUid} cannot be decrypted (${e.message})`)
        }
        try {
            if (!!rec.udata) {
                udata = JSON.parse(rec.udata)
            }
        } catch {
            logger.error('failed to parse the udata')
        }
        try {
            const decryptedData = await platform.decrypt(rec.data, recUid, encryptionType, storage)
            const recordData = JSON.parse(platform.bytesToString(decryptedData))
            await storage.put({
                kind: 'record',
                uid: recUid,
                data: recordData,
                version: rec.version,
                revision: <number>rec.revision,
                shared: rec.shared,
                extra,
                clientModifiedTime: <number>rec.clientModifiedTime,
                udata,
            })
        } catch (e: any) {
            logger.error(`The record ${recUid} cannot be decrypted (${e.message})`)
        }
    }
}

const processNonSharedData = async (storage: VaultStorage, nonSharedData?: Vault.INonSharedData[] | null) => {
    if (!nonSharedData) return
    for (const nsData of nonSharedData as NN<INonSharedData>[]) {
        const recUid = webSafe64FromBytes(nsData.recordUid)
        try {
            if (!nsData.data.byteLength) {
                await storage.put({
                    kind: 'non_shared_data',
                    uid: recUid,
                    data: {},
                })
                continue
            }

            const rec = await storage.get('record', recUid)
            if (!rec) throw new Error('Missing record in storage')

            // While generally v3 nsData will be gcm encrypted, and v2 will be cbc encrypted, there's a case
            // where a record that has been shared to you has been converted from v2 to v3, leaving the nsData
            // still cbc encrypted. So, we fallback to cbc if gcm fails.
            const encryptionTypes: EncryptionType[] = rec.version >= 3 ? ['gcm', 'cbc'] : ['cbc']
            let decryptedNsData: Uint8Array | undefined
            const errorMessages: string[] = []
            for (const encryptionType of encryptionTypes) {
                try {
                    decryptedNsData = await platform.decrypt(nsData.data, 'data', encryptionType, storage)
                    break // exit on successful decryption
                } catch (e) {
                    const message = e instanceof Error ? e.message : String(e)
                    errorMessages.push(message)
                }
            }
            if (!decryptedNsData) throw new Error(errorMessages.join('\n'))

            const data = JSON.parse(platform.bytesToString(decryptedNsData))
            await storage.put({
                kind: 'non_shared_data',
                uid: recUid,
                data: data,
            })
        } catch (e: any) {
            logger.error(`The non shared data ${recUid} cannot be decrypted (${e.message})`)
        }
    }
}

const processReusedPasswords = async (reusedPasswords: IReusedPasswords | null | undefined, storage: VaultStorage) => {
    try {
        if (!reusedPasswords) return

        await storage.put({
            kind: 'reused_passwords',
            count: <number>reusedPasswords.count,
            revision: <number>reusedPasswords.revision,
        })
    } catch (e: any) {
        logger.error(`Could not process reusedPasswords (${e.message})`)
    }
}

const processProfile = async (profile: IProfile | null | undefined, storage: VaultStorage) => {
    try {
        if (!profile) return

        const prof = profile as NN<IProfile>
        const decryptedProfileData = await platform.decrypt(prof.data, 'data', 'cbc', storage)
        const profileData = JSON.parse(platform.bytesToString(decryptedProfileData))
        await storage.put({
            kind: 'profile',
            profileName: prof.profileName,
            data: profileData,
            revision: <number>prof.revision,
        })
    } catch (e: any) {
        logger.error(`Profile cannot be decrypted (${e.message})`)
    }
}

const processProfilePic = async (profilePic, storage) => {
    try {
        if (!profilePic) return
        await storage.put({
            kind: 'profilePic',
            data: profilePic,
        })
    } catch (e: any) {
        logger.error(`Profile picture cannot be decrypted (${e.message})`)
    }
}

const processSharedFolderFolders = async (
    folders: ISharedFolderFolder[],
    storage: VaultStorage,
    dependencies: Dependencies
) => {
    for (const folder of folders as NN<ISharedFolderFolder>[]) {
        const sharedFolderUid = webSafe64FromBytes(folder.sharedFolderUid)
        const folderUid = webSafe64FromBytes(folder.folderUid)

        const keyInfo = mapKeyType(folder.keyType)
        if (!keyInfo) continue

        try {
            const { encryptionType } = keyInfo
            await platform.unwrapKey(
                folder.sharedFolderFolderKey,
                folderUid,
                sharedFolderUid,
                encryptionType,
                'aes',
                storage
            )
        } catch (e: any) {
            logger.error(`The shared folder folder key for ${folderUid} cannot be decrypted (${e.message})`)
        }
        try {
            const decryptedData = await platform.decrypt(folder.data, folderUid, 'cbc', storage)
            const folderData = JSON.parse(platform.bytesToString(decryptedData))
            await storage.put({
                kind: 'shared_folder_folder',
                uid: folderUid,
                data: folderData,
                revision: <number>folder.revision,
                sharedFolderUid,
            })
            if (folder.parentUid.length > 0) {
                addDependencies(dependencies, webSafe64FromBytes(folder.parentUid), folderUid, 'shared_folder_folder')
            }
        } catch (e: any) {
            logger.error(`The folder folder ${folderUid} cannot be decrypted (${e.message})`)
        }
    }
}

const processRemovedUserFolderRecords = (records: IUserFolderRecord[], dependencies: RemovedDependencies) => {
    for (const record of records as Vault.UserFolderRecord[]) {
        const folderUid = webSafe64FromBytes(record.folderUid)
        const recordUid = webSafe64FromBytes(record.recordUid)
        addRemovedDependencies(dependencies, folderUid, recordUid)
    }
}

const processRemovedSharedFolderFolders = async (
    folders: Vault.ISharedFolderFolder[],
    storage: VaultStorage,
    dependencies: RemovedDependencies
) => {
    for (const folder of folders as NN<ISharedFolderFolder>[]) {
        const sharedFolderUid = webSafe64FromBytes(folder.sharedFolderUid)
        const folderUid = webSafe64FromBytes(folder.folderUid)
        await storage.delete('user_folder', folderUid)
        dependencies[folderUid] = '*'
        addRemovedDependencies(dependencies, sharedFolderUid, folderUid)
        if (folder.parentUid.length > 0) {
            addRemovedDependencies(dependencies, webSafe64FromBytes(folder.parentUid), folderUid)
        }
    }
}

const processRemovedSharedFolderTeams = async (
    sharedFolderTeams: ISharedFolderTeam[],
    dependencies: RemovedDependencies
) => {
    for (const sharedFolderTeam of sharedFolderTeams as NN<ISharedFolderTeam>[]) {
        const sharedFolderUid = webSafe64FromBytes(sharedFolderTeam.sharedFolderUid)
        const teamUid = webSafe64FromBytes(sharedFolderTeam.teamUid)
        addRemovedDependencies(dependencies, sharedFolderUid, teamUid)
    }
}

const processRemovedSharedFolderUsers = (users: ISharedFolderUser[], dependencies: RemovedDependencies) => {
    for (const user of users as NN<ISharedFolderUser>[]) {
        const sharedFolderUid = webSafe64FromBytes(user.sharedFolderUid)
        addRemovedDependencies(dependencies, sharedFolderUid, webSafe64FromBytes(user.accountUid))
    }
}

const processRemovedSharedFolderRecords = async (
    records: ISharedFolderRecord[],
    storage: VaultStorage,
    dependencies: RemovedDependencies
) => {
    for (const record of records as NN<ISharedFolderRecord>[]) {
        const sharedFolderUid = webSafe64FromBytes(record.sharedFolderUid)
        const recordUid = webSafe64FromBytes(record.recordUid)
        addRemovedDependencies(dependencies, sharedFolderUid, recordUid)
    }
}

const processRemovedSharedFolderFolderRecords = async (
    records: ISharedFolderFolderRecord[],
    storage: VaultStorage,
    dependencies: RemovedDependencies
) => {
    for (const record of records as NN<ISharedFolderFolderRecord>[]) {
        const sharedFolderFolderUid = webSafe64FromBytes(record.folderUid)
        const recordUid = webSafe64FromBytes(record.recordUid)
        addRemovedDependencies(dependencies, sharedFolderFolderUid, recordUid)
    }
}

const processMetadata = async (recordMetaData: IRecordMetaData[], storage: VaultStorage) => {
    const recordKeys: UnwrapKeyMap = {}

    for (const mData of recordMetaData as NN<IRecordMetaData>[]) {
        const recUid = webSafe64FromBytes(mData.recordUid)
        try {
            const keyInfo = mapKeyType(mData.recordKeyType)
            if (keyInfo) {
                const { keyId, encryptionType } = keyInfo
                recordKeys[recUid] = {
                    data: mData.recordKey,
                    dataId: recUid,
                    keyId,
                    encryptionType,
                    unwrappedType: 'aes',
                }
            }

            const ownerUid = mData.ownerAccountUid ? webSafe64FromBytes(mData.ownerAccountUid) : undefined
            await storage.put({
                kind: 'metadata',
                uid: recUid,
                canEdit: mData.canEdit,
                canShare: mData.canShare,
                owner: mData.owner,
                recordKeyType: mData.recordKeyType,
                ownerAccountUid: ownerUid,
                ownerUsername: mData.ownerUsername,
            })
        } catch (e: any) {
            logger.error(`The record metadata ${recUid} cannot be decrypted (${e.message})`)
        }
    }

    await platform.unwrapKeys(recordKeys, storage)
}

const processBreachWatchRecords = async (storage: VaultStorage, bwRecords?: IBreachWatchRecord[] | null) => {
    if (!bwRecords) return
    for (const bwRecord of bwRecords as NN<IBreachWatchRecord>[]) {
        if (!bwRecord.recordUid) continue

        const recUid = webSafe64FromBytes(bwRecord.recordUid)
        try {
            const { data } = bwRecord
            const decrypted = await platform.decrypt(data, recUid, 'gcm', storage)
            const decoded = Tokens.BreachWatchData.decode(decrypted)
            const obj = Tokens.BreachWatchData.toObject(decoded)

            await storage.put({
                kind: 'bw_record',
                uid: recUid,
                data: obj,
                scannedBy: bwRecord.scannedBy ? bwRecord.scannedBy : undefined,
                scannedByAccountUid: bwRecord.scannedByAccountUid
                    ? webSafe64FromBytes(bwRecord.scannedByAccountUid)
                    : undefined,
                type: 'RECORD',
                revision: bwRecord.revision as number,
            })
        } catch (e: any) {
            logger.error(`Breach watch record ${recUid} cannot be decrypted (${e.message})`)
        }
    }
}

const processBreachWatchSecurityData = async (
    storage: VaultStorage,
    securityData?: IBreachWatchSecurityData[] | null
) => {
    if (!securityData) return
    for (const bwSecurityData of securityData as NN<IBreachWatchSecurityData>[]) {
        const uid = webSafe64FromBytes(bwSecurityData.recordUid)

        try {
            await storage.put({
                kind: 'bw_security_data',
                uid,
                revision: bwSecurityData.revision as number,
            })
        } catch (e: any) {
            logger.error(`Breach watch security data ${uid} cannot be processed (${e.message})`)
        }
    }
}

const processSecurityScoreData = async (
    storage: VaultStorage,
    securityScoreDataList?: Vault.ISecurityScoreData[] | null
) => {
    if (!securityScoreDataList) return
    for (const securityScoreData of securityScoreDataList) {
        if (!securityScoreData.recordUid || typeof securityScoreData.revision !== 'number') continue

        const recUid = webSafe64FromBytes(securityScoreData.recordUid)

        if (!securityScoreData.data || securityScoreData.data.length === 0) {
            await storage.delete('security_score_data', recUid)
            continue
        }

        try {
            const decrypted = await platform.decrypt(securityScoreData.data, recUid, 'gcm', storage)
            const securityScoreDataObj = JSON.parse(platform.bytesToString(decrypted))
            await storage.put({
                kind: 'security_score_data',
                uid: recUid,
                revision: securityScoreData.revision,
                data: securityScoreDataObj,
            })
        } catch (e: any) {
            logger.error(`The security score data ${recUid} cannot be decrypted (${e.message})`)
        }
    }
}

// Keeper Drive Processors Start

const processKdRemovedRecordLinks = async (
    removedDependencies: RemovedDependencies,
    keeperDriveRemovedRecordLinks?: Vault.IRecordLink[] | null
) => {
    if (!keeperDriveRemovedRecordLinks) return
    for (const link of keeperDriveRemovedRecordLinks) {
        if (!link.childRecordUid || !link.parentRecordUid) continue
        const childRecordUid = webSafe64FromBytes(link.childRecordUid)
        const parentRecordUid = webSafe64FromBytes(link.parentRecordUid)
        addRemovedDependencies(removedDependencies, parentRecordUid, childRecordUid)
    }
}

const processKdRecordLinks = async (storage: VaultStorage, keeperDriveRecordLinks?: Vault.IRecordLink[] | null) => {
    if (!keeperDriveRecordLinks) return
    for (const link of keeperDriveRecordLinks) {
        if (!link.childRecordUid || !link.parentRecordUid || !link.recordKey) continue
        const childRecordUid = webSafe64FromBytes(link.childRecordUid)
        const parentRecordUid = webSafe64FromBytes(link.parentRecordUid)

        try {
            await platform.unwrapKey(link.recordKey, childRecordUid, parentRecordUid, 'gcm', 'aes', storage, true)
            await storage.put({
                kind: 'keeper_drive_record_link',
                childRecordUid,
                parentRecordUid,
            })
        } catch (e: any) {
            console.error(
                `[ks] The record link for ${childRecordUid} cannot be decrypted by ${parentRecordUid} (${e.message})`
            )
        }
    }
}

const processKdRevokedFolderAccesses = async (
    storage: VaultStorage,
    keeperDriveRevokedFolderAccesses?: Folder.IRevokedAccess[] | null
) => {
    if (!keeperDriveRevokedFolderAccesses) return
    for (const revokedAccess of keeperDriveRevokedFolderAccesses) {
        if (!revokedAccess.actorUid || !revokedAccess.folderUid) continue
        const actorUid = webSafe64FromBytes(revokedAccess.actorUid)
        const folderUid = webSafe64FromBytes(revokedAccess.folderUid)
        await storage.delete('keeper_drive_folder_access', createKdFolderAccessCompositeKey(actorUid, folderUid), {
            kind: 'keeper_drive_folder_access',
            actorUid,
            folderUid,
        })
    }
}

const processKdRemovedFolders = async (
    storage: VaultStorage,
    keeperDriveRemovedFolders?: Folder.IFolderRemoved[] | null
) => {
    if (!keeperDriveRemovedFolders) return
    for (const removedFolder of keeperDriveRemovedFolders) {
        if (!removedFolder.folderUid) continue
        const folderUid = webSafe64FromBytes(removedFolder.folderUid)
        await storage.delete('keeper_drive_folder', folderUid)
    }
}

const processKdFolderKeys = async (storage: VaultStorage, folderKeys?: Folder.IFolderKey[] | null) => {
    if (!folderKeys) return
    const encryptedByDataKeyMap: UnwrapKeyMap = {}
    const encryptedByParentKeyMap: UnwrapKeyMap = {}
    const encryptedByDataKey = folderKeys.filter(
        (key) => key.encryptedBy === Folder.FolderKeyEncryptionType.ENCRYPTED_BY_USER_KEY
    )
    const encryptedByParentKey = folderKeys.filter(
        (key) => key.encryptedBy === Folder.FolderKeyEncryptionType.ENCRYPTED_BY_PARENT_KEY
    )
    for (const key of encryptedByDataKey) {
        if (!key.folderUid || !key.folderKey || !key.parentUid || isNil(key.encryptedBy)) continue
        const folderUid = webSafe64FromBytes(key.folderUid)
        const parentUid = webSafe64FromBytes(key.parentUid)
        encryptedByDataKeyMap[folderUid] = {
            data: key.folderKey,
            dataId: folderUid,
            keyId: 'data',
            encryptionType: 'gcm',
            unwrappedType: 'aes',
        }
    }
    await platform.unwrapKeys(encryptedByDataKeyMap, storage)
    for (const key of encryptedByParentKey) {
        if (!key.folderUid || !key.folderKey || !key.parentUid || isNil(key.encryptedBy)) continue
        const folderUid = webSafe64FromBytes(key.folderUid)
        const parentUid = webSafe64FromBytes(key.parentUid)
        encryptedByParentKeyMap[folderUid] = {
            data: key.folderKey,
            dataId: folderUid,
            keyId: parentUid,
            encryptionType: 'gcm',
            unwrappedType: 'aes',
        }
    }
    await platform.unwrapKeys(encryptedByParentKeyMap, storage)
}

const processKdFolderAccesses = async (
    storage: VaultStorage,
    keeperDriveFolderAccesses?: Folder.IFolderAccessData[] | null
) => {
    if (!keeperDriveFolderAccesses) return
    const folderKeyMap: UnwrapKeyMap = {}
    for (const folderAccess of keeperDriveFolderAccesses) {
        const folderUid = webSafe64FromBytes(folderAccess.folderUid!)
        if (
            !folderAccess.folderUid ||
            !folderAccess.accessTypeUid ||
            !folderAccess.accessRoleType ||
            !folderAccess.accessType ||
            !folderAccess.permissions
        )
            continue
        const accessTypeUid = webSafe64FromBytes(folderAccess.accessTypeUid)
        const permission = folderAccess.permissions
        // for child folders, they're only encrypted by their parent folder key
        if (
            folderAccess.folderKey &&
            folderAccess.folderKey.encryptedKey &&
            !isNil(folderAccess.folderKey.encryptedKeyType)
        ) {
            const keyInfo =
                folderAccess.accessType === Folder.AccessType.AT_USER
                    ? mapKeyType(folderAccess.folderKey.encryptedKeyType)
                    : folderAccess.accessType === Folder.AccessType.AT_TEAM
                      ? mapTeamKeyType(folderAccess.folderKey.encryptedKeyType, accessTypeUid)
                      : null
            if (!keyInfo) continue
            folderKeyMap[folderUid] = {
                data: folderAccess.folderKey.encryptedKey,
                dataId: folderUid,
                keyId: keyInfo.keyId,
                encryptionType: keyInfo.encryptionType,
                unwrappedType: 'aes',
            }
        }
        await storage.put({
            kind: 'keeper_drive_folder_access',
            accessUid: createKdFolderAccessCompositeKey(accessTypeUid, folderUid),
            folderUid,
            accessTypeUid,
            accessType: folderAccess.accessType,
            accessRoleType: folderAccess.accessRoleType,
            permission,
        })
    }
    await platform.unwrapKeys(folderKeyMap, storage)
}

const processKdFolderSharingState = async (
    storage: VaultStorage,
    keeperDriveFolderSharingStates?: Vault.IFolderSharingState[] | null
) => {
    if (!keeperDriveFolderSharingStates) return
    for (const folderSharingState of keeperDriveFolderSharingStates) {
        if (!folderSharingState.folderUid) continue
        await storage.put({
            kind: 'keeper_drive_folder_sharing_state',
            folderUid: webSafe64FromBytes(folderSharingState.folderUid),
            shared: toOptional(folderSharingState.shared),
            count: toOptional(folderSharingState.count),
        })
    }
}

const processKdFolders = async (storage: VaultStorage, keeperDriveFolders?: Folder.IFolderData[] | null) => {
    if (!keeperDriveFolders) return
    for (const folder of keeperDriveFolders || []) {
        if (
            !folder.folderUid ||
            !folder.folderKey ||
            !folder.data ||
            !folder.ownerInfo ||
            folder.type !== Folder.FolderUsageType.UT_NORMAL
        )
            continue
        const folderUid = webSafe64FromBytes(folder.folderUid)
        const parentUid =
            folder.parentUid && folder.parentUid.length > 0 ? webSafe64FromBytes(folder.parentUid) : undefined
        try {
            const folderData = JSON.parse(
                platform.bytesToString(await platform.decrypt(folder.data, folderUid, 'gcm', storage))
            )
            await storage.put({
                kind: 'keeper_drive_folder',
                uid: folderUid,
                data: folderData,
                parentUid,
                ownerInfo: {
                    accountUid: folder.ownerInfo.accountUid
                        ? webSafe64FromBytes(folder.ownerInfo.accountUid)
                        : undefined,
                    username: toOptional(folder.ownerInfo.username),
                },
                lastModified: <number>toOptional(folder.lastModified),
                type: toOptional(folder.type),
                inheritUserPermissions: toOptional(folder.inheritUserPermissions),
            })
        } catch (err: any) {
            console.error(`[ks] folder ${folderUid} cannot be decrypted (${err.message})`)
        }
    }
}

const processKdRecordAccess = async (storage: VaultStorage, kdRecordAccesses?: Folder.IRecordAccessData[] | null) => {
    if (!kdRecordAccesses) return
    for (const recordAccess of kdRecordAccesses) {
        if (
            !recordAccess.recordUid ||
            !recordAccess.accessTypeUid ||
            isNil(recordAccess.accessType) ||
            isNil(recordAccess.accessRoleType)
        )
            continue
        const recordUid = webSafe64FromBytes(recordAccess.recordUid)
        const accessTypeUid = webSafe64FromBytes(recordAccess.accessTypeUid)
        await storage.put({
            kind: 'keeper_drive_record_access',
            accessUid: createKdRecordAccessCompositeKey(accessTypeUid, recordUid),
            accessTypeUid,
            accessType: recordAccess.accessType,
            recordUid,
            accessRoleType: recordAccess.accessRoleType,
            owner: toOptional(recordAccess.owner),
            inherited: toOptional(recordAccess.inherited),
            hidden: toOptional(recordAccess.hidden),
            deniedAccess: toOptional(recordAccess.deniedAccess),
            canEdit: toOptional(recordAccess.canEdit),
            canView: toOptional(recordAccess.canView),
            canListAccess: toOptional(recordAccess.canListAccess),
            canUpdateAccess: toOptional(recordAccess.canUpdateAccess),
            canDelete: toOptional(recordAccess.canDelete),
            canChangeOwnership: toOptional(recordAccess.canChangeOwnership),
            canRequestAccess: toOptional(recordAccess.canRequestAccess),
            canApproveAccess: toOptional(recordAccess.canApproveAccess),
            dateCreated: <number | undefined>toOptional(recordAccess.dateCreated),
            lastModified: <number | undefined>toOptional(recordAccess.lastModified),
            tlaProperties: toOptional(recordAccess.tlaProperties),
        })
    }
}

const processKdFolderRecords = async (
    storage: VaultStorage,
    dependencies: Dependencies,
    kdFolderRecords?: Folder.IFolderRecord[] | null
) => {
    if (!kdFolderRecords) return
    const recordKeyMap: UnwrapKeyMap = {}
    for (const folderRecord of kdFolderRecords) {
        if (
            !folderRecord.folderUid ||
            !folderRecord.recordMetadata ||
            !folderRecord.recordMetadata.recordUid ||
            !folderRecord.recordMetadata.encryptedRecordKey ||
            isNil(folderRecord.recordMetadata.encryptedRecordKeyType) ||
            isNil(folderRecord.folderKeyEncryptionType)
        )
            continue
        const folderUid = webSafe64FromBytes(folderRecord.folderUid)
        const recordUid = webSafe64FromBytes(folderRecord.recordMetadata.recordUid)
        const keyInfo = mapKeyType(folderRecord.recordMetadata.encryptedRecordKeyType)
        if (!keyInfo) continue
        recordKeyMap[recordUid] = {
            data: folderRecord.recordMetadata.encryptedRecordKey,
            dataId: recordUid,
            keyId:
                folderRecord.folderKeyEncryptionType === Folder.FolderKeyEncryptionType.ENCRYPTED_BY_PARENT_KEY
                    ? folderUid
                    : keyInfo.keyId,
            encryptionType: keyInfo?.encryptionType,
            unwrappedType: 'aes',
        }
        if (folderUid) {
            addDependencies(dependencies, folderUid, recordUid, 'record')
            await storage.put({
                kind: 'keeper_drive_folder_record',
                folderUid,
                recordUid,
            })
        }
    }
    await platform.unwrapKeys(recordKeyMap, storage)
}

const processKdRecordSharingStates = async (
    storage: VaultStorage,
    kdRecordSharingStates?: record.v3.sharing.IRecordSharingState[] | null
) => {
    if (!kdRecordSharingStates) return
    for (const sharingState of kdRecordSharingStates) {
        if (!sharingState.recordUid) continue
        await storage.put({
            kind: 'keeper_drive_record_sharing_state',
            recordUid: webSafe64FromBytes(sharingState.recordUid),
            isDirectlyShared: toOptional(sharingState.isDirectlyShared),
            isIndirectlyShared: toOptional(sharingState.isIndirectlyShared),
            isShared: toOptional(sharingState.isShared),
        })
    }
}

const processKdRecords = async (
    storage: VaultStorage,
    kdRecordData?: Folder.IRecordData[] | null,
    kdRecords?: Vault.IDriveRecord[] | null
) => {
    if (!kdRecordData || !kdRecords) return
    const kdRecordMap: {
        [key in string]: Vault.IDriveRecord
    } = {}
    for (const record of kdRecords) {
        if (!record.recordUid || !record.revision) continue
        kdRecordMap[webSafe64FromBytes(record.recordUid)] = record
    }
    for (const record of kdRecordData) {
        if (!record.recordUid || !record.data) continue
        const recordUid = webSafe64FromBytes(record.recordUid)
        const metadata = kdRecordMap[recordUid] || {}
        if (!metadata.version) continue
        try {
            const decryptedData = await platform.decrypt(record.data, recordUid, 'gcm', storage)
            const recordData = JSON.parse(platform.bytesToString(decryptedData))
            await storage.put({
                kind: 'record',
                uid: recordUid,
                data: recordData,
                version: metadata.version,
                revision: metadata.revision as number,
                shared: !!metadata.shared,
                clientModifiedTime: metadata.clientModifiedTime as number,
                isKeeperDriveData: true,
            })
        } catch (err: any) {
            console.error(`[kd] record ${recordUid} cannot be decrypted: ${err.message}`)
        }
    }
}

const processKdRemovedFolderRecords = (
    removedDependencies: RemovedDependencies,
    keeperDriveRemovedFolderRecords?: Records.IFolderRecordKey[] | null
) => {
    if (!keeperDriveRemovedFolderRecords) return
    for (const folderRecord of keeperDriveRemovedFolderRecords) {
        if (!folderRecord.recordUid || !folderRecord.folderUid) continue
        const recordUid = webSafe64FromBytes(folderRecord.recordUid)
        const folderUid = webSafe64FromBytes(folderRecord.folderUid)
        addRemovedDependencies(removedDependencies, folderUid, {
            parentKind: 'keeper_drive_folder',
            childKind: 'record',
            childUid: recordUid,
        })
    }
}

const processKdRevokedRecordAccesses = async (
    storage: VaultStorage,
    kdRevokedAccesses?: record.v3.sharing.IRevokedAccess[] | null
) => {
    if (!kdRevokedAccesses) return
    for (const revokedAccess of kdRevokedAccesses) {
        if (!revokedAccess.actorUid || !revokedAccess.recordUid) continue
        const actorUid = webSafe64FromBytes(revokedAccess.actorUid)
        const recordUid = webSafe64FromBytes(revokedAccess.recordUid)
        await storage.delete('keeper_drive_record_access', createKdRecordAccessCompositeKey(actorUid, recordUid), {
            kind: 'keeper_drive_record_access',
            actorUid,
            recordUid,
        })
    }
}

// Keeper Drive Processors End

export type SyncLogFormat = '!' | 'raw' | 'obj' | 'str' | 'cnt' | 'cnt_t'

const logProtobuf = (data: any, format: SyncLogFormat, seqNo: number, counts: any) => {
    switch (format) {
        case '!':
            return
        case 'raw':
            logger.debug(data)
            break
        case 'obj':
            logger.debug(JSON.parse(JSON.stringify(data)))
            break
        case 'str':
            logger.debug(JSON.stringify(data))
            break
        case 'cnt_t':
        case 'cnt':
            if (format === 'cnt_t') {
                logger.debug('continuationToken: ', platform.bytesToBase64(data.continuationToken))
            }
            logger.debug({
                seq: seqNo,
                ...counts,
            })
            break
    }
}

const getCounts = (obj: Vault.ISyncDownResponse): SyncResponseCounts => {
    const results: Record<string, number> = {}
    const collect = (source: any) => {
        if (!source) return
        for (const prop in source) {
            if (['continuationToken', 'constructor', 'keeperDriveData'].includes(prop)) {
                continue
            }
            if (source[prop]?.length) {
                results[prop] = (results[prop] || 0) + source[prop].length
            }
        }
    }
    collect(obj)
    collect(obj.keeperDriveData)
    return results
}

const addCounts = (totalCounts: SyncResponseCounts, counts: SyncResponseCounts) => {
    for (const prop in counts) {
        totalCounts[prop] = (totalCounts[prop] || 0) + counts[prop]
    }
}

export type SyncDownOptions = {
    auth: Auth
    storage: VaultStorage
    maxCalls?: number
    logFormat?: SyncLogFormat
    /**
     * Only supported in browser platform
     */
    useWorkers?: boolean
    workerOptions?: CryptoWorkerOptions
    controller?: SyncController
}

const processRecordRotations = async (rotations: Vault.IRecordRotation[] | null | undefined, storage: VaultStorage) => {
    if (!rotations?.length) return
    for (const r of rotations) {
        if (!r.recordUid) continue
        const uid = webSafe64FromBytes(r.recordUid)
        try {
            const pwdComplexityData = r.pwdComplexity?.byteLength
                ? await platform.decrypt(r.pwdComplexity, uid, 'gcm', storage)
                : undefined
            const pwdComplexity = pwdComplexityData ? JSON.parse(platform.bytesToString(pwdComplexityData)) : undefined
            await storage.put({
                kind: 'record_rotation',
                uid,
                revision: r.revision ? Number(r.revision) : 0,
                configurationUid: r.configurationUid ? webSafe64FromBytes(r.configurationUid) : '',
                resourceUid: r.resourceUid ? webSafe64FromBytes(r.resourceUid) : '',
                schedule: r.schedule || '',
                lastRotation: r.lastRotation ? Number(r.lastRotation) : undefined,
                lastRotationStatus: r.lastRotationStatus ?? undefined,
                pwdComplexity,
                disabled: r.disabled === true,
            })
        } catch {
            logger.error(`The record rotation ${uid} could not be processed`)
        }
    }
}

export class SyncController {
    aborted: boolean = false

    abort() {
        this.aborted = true
    }

    throwIfAborted() {
        if (this.aborted) {
            throw new Error('sync_aborted')
        }
    }
}

// Intercepts all property access to given object abort execution if needed
function wrapObjWithProxy<T extends object>(obj: T, controller?: SyncController): T {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            controller?.throwIfAborted()
            return Reflect.get(target, prop, receiver)
        },
    })
}

export const syncDown = async (options: SyncDownOptions): Promise<SyncResult> => {
    const { auth, useWorkers, controller } = options
    const totalCounts = {}
    let result: SyncResult = {
        started: new Date(),
        username: auth.username,
        counts: totalCounts,
        pageCount: 0,
    }
    let networkTime = 0

    try {
        const storage = wrapObjWithProxy(options.storage, controller)
        const dToken = await storage.get('continuationToken')
        let continuationToken = dToken ? platform.base64ToBytes(dToken.token) : undefined

        await platform.importKey('data', auth.dataKey!, undefined, true)
        await platform.importKeyEC(
            'pk_ecc',
            new Uint8Array(auth.eccPrivateKey!),
            new Uint8Array(auth.eccPublicKey!),
            undefined,
            true
        )
        await platform.importKeyRSA('pk_rsa', auth.privateKey!, undefined, true)

        while (true) {
            const msg = syncDownMessage({
                continuationToken,
            })
            let requestTime = Date.now()
            const resp = wrapObjWithProxy(await auth.executeRest(msg), controller)
            requestTime = Date.now() - requestTime
            const counts = getCounts(resp)
            addCounts(totalCounts, counts)
            logProtobuf(resp, options.logFormat || '!', result.pageCount, counts)
            if (resp.cacheStatus == CacheStatus.CLEAR) {
                platform.unloadNonUserKeys()
                await storage.clear()
                result.fullSync = true
            }
            if (result.pageCount === 0 && useWorkers && platform.supportsConcurrency && resp.hasMore) {
                try {
                    const workerOptions = options.workerOptions || {}
                    await platform.createCryptoWorker(storage, workerOptions)
                } catch (e) {
                    logger.error(e)
                }
            }
            result.pageCount += 1
            networkTime += requestTime
            const keeperDriveData = resp.keeperDriveData ?? {}
            const dependencies = {}

            await processUsers(resp.users, storage)

            await processTeams(resp.teams as NN<ITeam>[], storage, dependencies)

            await processUserFolders(resp.userFolders, storage, dependencies)

            await processUserFolderRecords(resp.userFolderRecords, dependencies)

            await processSharedFolders(resp.sharedFolders, storage)

            await processSharedFolderUsers(resp.sharedFolderUsers, storage)

            await processSharedFolderTeams(resp.sharedFolderTeams, storage)

            await processSharedFolderRecords(resp.sharedFolderRecords, storage)

            await processSharedFolderFolderRecords(resp.sharedFolderFolderRecords, dependencies)

            await processUserFolderSharedFolders(resp.userFolderSharedFolders, dependencies)

            await processMetadata(resp.recordMetaData, storage)

            await processRecordLinks(resp.recordLinks, storage)

            await processRecords(resp.records, storage)

            await processRecordRotations(resp.recordRotations, storage)

            await processNonSharedData(storage, resp.nonSharedData)

            await processSharedFolderFolders(resp.sharedFolderFolders, storage, dependencies)

            await processReusedPasswords(resp.reusedPasswords, storage)

            await processProfile(resp.profile, storage)

            await processProfilePic(resp.profilePic, storage)

            await processBreachWatchRecords(storage, resp.breachWatchRecords)

            await processBreachWatchSecurityData(storage, resp.breachWatchSecurityData)

            await processSecurityScoreData(storage, resp.securityScoreData)

            await processKdFolderAccesses(storage, keeperDriveData.folderAccesses)

            await processKdFolderKeys(storage, keeperDriveData.folderKeys)

            await processKdFolders(storage, keeperDriveData.folders)

            await processKdFolderSharingState(storage, keeperDriveData.folderSharingState)

            await processKdRecordAccess(storage, keeperDriveData.recordAccesses)

            await processKdFolderRecords(storage, dependencies, keeperDriveData.folderRecords)

            await processKdRecordLinks(storage, keeperDriveData.recordLinks)

            await processKdRecords(storage, keeperDriveData.recordData, keeperDriveData.records)

            await processNonSharedData(storage, keeperDriveData.nonSharedData)

            await processKdRecordSharingStates(storage, keeperDriveData.recordSharingStates)

            await processBreachWatchRecords(storage, keeperDriveData.breachWatchRecords)

            await processBreachWatchSecurityData(storage, keeperDriveData.breachWatchSecurityData)

            await processSecurityScoreData(storage, keeperDriveData.securityScoreData)

            await storage.addDependencies(dependencies)

            const removedDependencies = {}
            for await (let teamUid of resp.removedTeams) {
                await storage.delete('team', webSafe64FromBytes(teamUid))
            }
            for await (const recUid of resp.removedRecords) {
                await storage.delete('record', webSafe64FromBytes(recUid))
            }
            for (const recordLink of resp.removedRecordLinks as Vault.RecordLink[]) {
                const parentUid = webSafe64FromBytes(recordLink.parentRecordUid)
                const childUid = webSafe64FromBytes(recordLink.childRecordUid)
                addRemovedDependencies(removedDependencies, parentUid, childUid)
            }
            for await (const folder of resp.removedUserFolders) {
                const folderUid = webSafe64FromBytes(folder)
                removedDependencies[folderUid] = '*'
                await storage.delete('user_folder', folderUid)
            }
            processRemovedUserFolderRecords(resp.removedUserFolderRecords, removedDependencies)
            await processRemovedSharedFolderFolders(resp.removedSharedFolderFolders, storage, removedDependencies)
            await processRemovedSharedFolderTeams(resp.removedSharedFolderTeams, removedDependencies)
            processRemovedSharedFolderUsers(resp.removedSharedFolderUsers, removedDependencies)
            await processRemovedSharedFolderRecords(resp.removedSharedFolderRecords, storage, removedDependencies)
            await processRemovedSharedFolderFolderRecords(
                resp.removedSharedFolderFolderRecords,
                storage,
                removedDependencies
            )

            const removedSFDependencies: DependencyMap = {}
            for await (const folder of resp.removedSharedFolders) {
                const folderUid = webSafe64FromBytes(folder)
                await getDependencies(folderUid, storage, removedSFDependencies)
                if (!removedDependencies[folderUid] && !removedSFDependencies[folderUid]) {
                    removedDependencies[folderUid] = '*'
                }
                await storage.delete('shared_folder', folderUid)
            }
            for await (const removedSFDependency of Object.values(removedSFDependencies)) {
                switch (removedSFDependency.kind) {
                    case 'record':
                        addRemovedDependencies(
                            removedDependencies,
                            removedSFDependency.parentUid,
                            removedSFDependency.uid
                        )
                        break
                    case 'user_folder':
                        removedDependencies[removedSFDependency.uid] = '*'
                        await storage.delete('user_folder', removedSFDependency.uid)
                        break
                }
            }
            for await (const user of resp.removedUsers) {
                await storage.delete('user', user)
            }

            await processKdRemovedFolders(storage, keeperDriveData.removedFolders)

            await processKdRevokedFolderAccesses(storage, keeperDriveData.revokedFolderAccesses)

            processKdRemovedFolderRecords(removedDependencies, keeperDriveData.removedFolderRecords)

            await processKdRevokedRecordAccesses(storage, keeperDriveData.revokedRecordAccesses)

            await processKdRemovedRecordLinks(removedDependencies, keeperDriveData.removedRecordLinks)

            await storage.removeDependencies(removedDependencies)

            continuationToken = resp.continuationToken || undefined
            const respContinuationToken = platform.bytesToBase64(continuationToken)
            result.continuationToken = respContinuationToken
            await storage.put({
                kind: 'continuationToken',
                token: respContinuationToken,
                isSecurityDataFieldEmptyInFullSync:
                    resp.cacheStatus === CacheStatus.CLEAR && resp.breachWatchSecurityData.length === 0,
            })
            if (!resp.hasMore || (options.maxCalls && result.pageCount >= options.maxCalls)) {
                break
            }
        }
    } catch (e: any) {
        logger.error(e)
        result.error = e.message
    }
    await platform.closeCryptoWorker()
    result.networkTime = formatTimeDiff(new Date(networkTime))
    result.totalTime = formatTimeDiff(new Date(Date.now() - result.started.getTime()))
    return result
}

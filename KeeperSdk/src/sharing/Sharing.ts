import type {
    DRecord,
    DRecordMetadata,
    DSharedFolder,
    DSharedFolderUser,
    DSharedFolderTeam,
    DSharedFolderRecord,
    DTeam,
} from '@keeper-security/keeperapi'
import {
    Auth,
    Records,
    Authentication,
    platform,
    getPublicKeysMessage,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import { getRecordTitle } from '../records/RecordUtils'
import { extractErrorMessage, KeeperSdkError } from '../utils/errors'
import { InMemoryStorage } from '../storage/InMemoryStorage'

enum ShareStatus {
    Success = 'success',
    PendingAccept = 'pending_accept',
    MissingPublicKey = 'missing_public_key',
    Error = 'error',
    Unknown = 'unknown',
}

enum PermissionLabel {
    ManageUsersAndRecords = 'Can Manage Users & Records',
    ManageRecords = 'Can Manage Records',
    ManageUsers = 'Can Manage Users',
    None = 'No Management Permissions',
}

enum StorageType {
    Record = 'record',
    Metadata = 'metadata',
    SharedFolder = 'shared_folder',
    SharedFolderUser = 'shared_folder_user',
    SharedFolderTeam = 'shared_folder_team',
    SharedFolderRecord = 'shared_folder_record',
    Team = 'team',
}

const SHARE_UPDATE_PATH = 'vault/records_share_update'

export type ShareReportEntry = {
    recordUid: string
    recordTitle: string
    recordOwner: string
    sharedWithCount: number
    sharedWith: string[]
}

export type SharedFolderReportEntry = {
    folderUid: string
    folderName: string
    sharedTo: string
    permissions: string
}

export type ShareSummaryEntry = {
    sharedTo: string
    recordCount: number
    sharedFolderCount: number
}

export type ShareRecordInput = {
    recordUid: string
    email: string
    canEdit?: boolean
    canShare?: boolean
}

export type ShareRecordResult = {
    recordUid: string
    email: string
    success: boolean
    status: string
    message: string
}

export type RemoveShareInput = {
    recordUid: string
    email: string
}

export type RemoveShareResult = {
    recordUid: string
    email: string
    success: boolean
    status: string
    message: string
}

export class ShareReportGenerator {
    private records: DRecord[]
    private metadata: DRecordMetadata[]
    private sharedFolders: DSharedFolder[]
    private sharedFolderUsers: DSharedFolderUser[]
    private sharedFolderTeams: DSharedFolderTeam[]
    private sharedFolderRecords: DSharedFolderRecord[]
    private teams: DTeam[]
    private currentUser: string

    constructor(storage: InMemoryStorage, currentUser: string) {
        this.records = storage.getAll<DRecord>(StorageType.Record)
        this.metadata = storage.getAll<DRecordMetadata>(StorageType.Metadata)
        this.sharedFolders = storage.getAll<DSharedFolder>(StorageType.SharedFolder)
        this.sharedFolderUsers = storage.getAll<DSharedFolderUser>(StorageType.SharedFolderUser)
        this.sharedFolderTeams = storage.getAll<DSharedFolderTeam>(StorageType.SharedFolderTeam)
        this.sharedFolderRecords = storage.getAll<DSharedFolderRecord>(StorageType.SharedFolderRecord)
        this.teams = storage.getAll<DTeam>(StorageType.Team)
        this.currentUser = currentUser
    }

    public generateRecordsReport(): ShareReportEntry[] {
        const report: ShareReportEntry[] = []
        const metaMap = new Map(this.metadata.map((m) => [m.uid, m]))

        const sfRecordsByRecord = new Map<string, DSharedFolderRecord[]>()
        for (const sfr of this.sharedFolderRecords) {
            const list = sfRecordsByRecord.get(sfr.recordUid) || []
            list.push(sfr)
            sfRecordsByRecord.set(sfr.recordUid, list)
        }

        const sfUserMap = new Map<string, DSharedFolderUser[]>()
        for (const sfu of this.sharedFolderUsers) {
            const list = sfUserMap.get(sfu.sharedFolderUid) || []
            list.push(sfu)
            sfUserMap.set(sfu.sharedFolderUid, list)
        }

        const sfTeamMap = new Map<string, DSharedFolderTeam[]>()
        for (const sft of this.sharedFolderTeams) {
            const list = sfTeamMap.get(sft.sharedFolderUid) || []
            list.push(sft)
            sfTeamMap.set(sft.sharedFolderUid, list)
        }

        for (const record of this.records) {
            if (!record.shared) continue

            const meta = metaMap.get(record.uid)
            const owner = meta?.ownerUsername || (meta?.owner ? this.currentUser : '')
            const sharedWith: string[] = []

            const sfRecords = sfRecordsByRecord.get(record.uid) || []
            const seenFolders = new Set<string>()

            for (const sfr of sfRecords) {
                if (seenFolders.has(sfr.sharedFolderUid)) continue
                seenFolders.add(sfr.sharedFolderUid)

                const users = sfUserMap.get(sfr.sharedFolderUid) || []
                for (const u of users) {
                    const name = u.accountUsername || u.accountUid || ''
                    if (name && name !== this.currentUser && !sharedWith.includes(name)) {
                        sharedWith.push(name)
                    }
                }

                const teams = sfTeamMap.get(sfr.sharedFolderUid) || []
                for (const t of teams) {
                    const teamLabel = `(Team) ${t.name}`
                    if (!sharedWith.includes(teamLabel)) {
                        sharedWith.push(teamLabel)
                    }
                }
            }

            if (sharedWith.length > 0 || sfRecords.length > 0) {
                report.push({
                    recordUid: record.uid,
                    recordTitle: getRecordTitle(record),
                    recordOwner: owner,
                    sharedWithCount: sharedWith.length,
                    sharedWith,
                })
            }
        }

        return report
    }

    public generateSharedFoldersReport(): SharedFolderReportEntry[] {
        const report: SharedFolderReportEntry[] = []

        for (const sf of this.sharedFolders) {
            const users = this.sharedFolderUsers.filter(
                (u) => u.sharedFolderUid === sf.uid
            )
            const teams = this.sharedFolderTeams.filter(
                (t) => t.sharedFolderUid === sf.uid
            )

            const folderName = sf.name || sf.data?.name || sf.uid

            for (const u of users) {
                report.push({
                    folderUid: sf.uid,
                    folderName,
                    sharedTo: u.accountUsername || u.accountUid || '',
                    permissions: formatFolderPermissions(u.manageUsers, u.manageRecords),
                })
            }

            for (const t of teams) {
                report.push({
                    folderUid: sf.uid,
                    folderName,
                    sharedTo: `(Team) ${t.name}`,
                    permissions: formatFolderPermissions(t.manageUsers, t.manageRecords),
                })
            }
        }

        return report
    }

    public generateSummaryReport(): ShareSummaryEntry[] {
        const recordShares = new Map<string, Set<string>>()
        const folderShares = new Map<string, Set<string>>()

        const sfRecordMap = new Map<string, string[]>()
        for (const sfr of this.sharedFolderRecords) {
            const list = sfRecordMap.get(sfr.sharedFolderUid) || []
            list.push(sfr.recordUid)
            sfRecordMap.set(sfr.sharedFolderUid, list)
        }

        for (const sfu of this.sharedFolderUsers) {
            const name = sfu.accountUsername || sfu.accountUid || ''
            if (!name || name === this.currentUser) continue

            if (!folderShares.has(name)) folderShares.set(name, new Set())
            folderShares.get(name)!.add(sfu.sharedFolderUid)

            if (!recordShares.has(name)) recordShares.set(name, new Set())
            const recs = sfRecordMap.get(sfu.sharedFolderUid) || []
            for (const r of recs) recordShares.get(name)!.add(r)
        }

        for (const sft of this.sharedFolderTeams) {
            const name = `(Team) ${sft.name}`

            if (!folderShares.has(name)) folderShares.set(name, new Set())
            folderShares.get(name)!.add(sft.sharedFolderUid)

            if (!recordShares.has(name)) recordShares.set(name, new Set())
            const recs = sfRecordMap.get(sft.sharedFolderUid) || []
            for (const r of recs) recordShares.get(name)!.add(r)
        }

        const allTargets = new Set([...recordShares.keys(), ...folderShares.keys()])
        const entries: ShareSummaryEntry[] = []

        for (const target of allTargets) {
            entries.push({
                sharedTo: target,
                recordCount: recordShares.get(target)?.size || 0,
                sharedFolderCount: folderShares.get(target)?.size || 0,
            })
        }

        entries.sort((a, b) => (b.recordCount + b.sharedFolderCount) - (a.recordCount + a.sharedFolderCount))
        return entries
    }
}

function formatFolderPermissions(manageUsers: boolean, manageRecords: boolean): string {
    if (manageUsers && manageRecords) return PermissionLabel.ManageUsersAndRecords
    if (manageRecords) return PermissionLabel.ManageRecords
    if (manageUsers) return PermissionLabel.ManageUsers
    return PermissionLabel.None
}

function recordsShareUpdateMessage(data: Records.IRecordShareUpdateRequest) {
    return {
        path: SHARE_UPDATE_PATH,
        toBytes(): Uint8Array {
            return Records.RecordShareUpdateRequest.encode(
                Records.RecordShareUpdateRequest.create(data)
            ).finish()
        },
        fromBytes(resp: Uint8Array): Records.IRecordShareUpdateResponse {
            return Records.RecordShareUpdateResponse.decode(resp)
        },
    }
}

type UserKeys = {
    username: string
    rsaPublicKey: Uint8Array | null
    eccPublicKey: Uint8Array | null
    errorCode: string | null
}

async function loadUserPublicKey(auth: Auth, email: string): Promise<UserKeys> {
    const msg = getPublicKeysMessage({ usernames: [email] })
    let response: Authentication.IGetPublicKeysResponse

    try {
        response = await auth.executeRest(msg)
    } catch (err) {
        throw new KeeperSdkError(`Failed to fetch public key for ${email}: ${extractErrorMessage(err)}`)
    }

    const keyResponses = response.keyResponses || []
    if (keyResponses.length === 0) {
        throw new KeeperSdkError(`No public key returned for ${email}`, 'missing_public_key')
    }

    const entry = keyResponses[0]
    if (entry.errorCode) {
        throw new KeeperSdkError(
            `Public key lookup failed for ${email}: ${entry.errorCode} - ${entry.message || ''}`,
            entry.errorCode
        )
    }

    return {
        username: entry.username || email,
        rsaPublicKey: entry.publicKey && entry.publicKey.length > 0
            ? entry.publicKey as Uint8Array
            : null,
        eccPublicKey: entry.publicEccKey && entry.publicEccKey.length > 0
            ? entry.publicEccKey as Uint8Array
            : null,
        errorCode: entry.errorCode || null,
    }
}

function uidToBytes(uid: string): Uint8Array {
    return platform.base64ToBytes(
        uid.replace(/-/g, '+').replace(/_/g, '/')
            + '=='.substring(0, (3 * uid.length) % 4)
    )
}

// Encrypts the record key with the recipient's public key (ECC preferred, RSA fallback).
export async function shareRecord(
    auth: Auth,
    recordKey: Uint8Array,
    input: ShareRecordInput
): Promise<ShareRecordResult> {
    const { recordUid, email, canEdit = false, canShare = false } = input

    const userKeys = await loadUserPublicKey(auth, email)

    let encryptedRecordKey: Uint8Array
    let useEccKey = false

    if (userKeys.eccPublicKey) {
        encryptedRecordKey = await platform.publicEncryptEC(recordKey, userKeys.eccPublicKey)
        useEccKey = true
    } else if (userKeys.rsaPublicKey) {
        const rsaKeyBase64 = platform.bytesToBase64(userKeys.rsaPublicKey)
        encryptedRecordKey = platform.publicEncrypt(recordKey, rsaKeyBase64)
        useEccKey = false
    } else {
        return {
            recordUid,
            email,
            success: false,
            status: ShareStatus.MissingPublicKey,
            message: `No usable public key available for ${email}`,
        }
    }

    const sharedRecord: Records.ISharedRecord = {
        toUsername: email,
        recordUid: uidToBytes(recordUid),
        recordKey: encryptedRecordKey,
        editable: canEdit,
        shareable: canShare,
        useEccKey,
    }

    const msg = recordsShareUpdateMessage({ addSharedRecord: [sharedRecord] })

    let response: Records.IRecordShareUpdateResponse
    try {
        response = await auth.executeRest(msg)
    } catch (err) {
        return { recordUid, email, success: false, status: ShareStatus.Error, message: extractErrorMessage(err) }
    }

    const addStatuses = response.addSharedRecordStatus || []
    if (addStatuses.length > 0) {
        const st = addStatuses[0]
        const isSuccess = st.status === ShareStatus.Success || st.status === ShareStatus.PendingAccept
        return {
            recordUid,
            email: st.username || email,
            success: isSuccess,
            status: st.status || ShareStatus.Unknown,
            message: st.message || st.status || '',
        }
    }

    return { recordUid, email, success: true, status: ShareStatus.Success, message: 'Record shared successfully' }
}

export async function removeRecordShare(
    auth: Auth,
    input: RemoveShareInput
): Promise<RemoveShareResult> {
    const { recordUid, email } = input

    const msg = recordsShareUpdateMessage({
        removeSharedRecord: [{
            toUsername: email,
            recordUid: uidToBytes(recordUid),
        }],
    })

    let response: Records.IRecordShareUpdateResponse
    try {
        response = await auth.executeRest(msg)
    } catch (err) {
        return { recordUid, email, success: false, status: ShareStatus.Error, message: extractErrorMessage(err) }
    }

    const removeStatuses = response.removeSharedRecordStatus || []
    if (removeStatuses.length > 0) {
        const st = removeStatuses[0]
        return {
            recordUid,
            email: st.username || email,
            success: st.status === ShareStatus.Success,
            status: st.status || ShareStatus.Unknown,
            message: st.message || st.status || '',
        }
    }

    return { recordUid, email, success: true, status: ShareStatus.Success, message: 'Share removed successfully' }
}

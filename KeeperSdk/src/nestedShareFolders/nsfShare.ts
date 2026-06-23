import type { Auth } from '@keeper-security/keeperapi'
import {
    Folder,
    getShareObjectsMessage,
    normal64Bytes,
    recordAccessDetailsMessage,
    recordsShareV3Message,
    folderAccessUpdateMessage,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { getRecordTitle } from '../records/RecordUtils'
import {
    buildNsfRecordRevokePermission,
    buildNsfRecordSharePermission,
    encryptKeyForRecipient,
    loadUserShareKeysOrInvite,
    parseRecordSharingStatus,
} from '../sharing/Sharing'
import { KeeperSdkError, ResultCodes, extractErrorMessage, isValidEmail } from '../utils'
import { collectNsfRecordUidsInFolder } from './nsfRecordPermission'
import { resolveRecordKeyBytes } from './nsfRecordCrypto'
import { transferNestedShareRecordOwnership } from './nsfTransferRecord'
import { getFolderPermissionsForRole } from './nsfConstants'
import {
    checkFolderSharePermission,
    checkRecordSharePermission,
    collectExistingFolderShareTargets,
    ensureNestedShareFolder,
    ensureNestedShareRecord,
    findFolderAccessEntry,
    getKeeperDriveRecord,
    getNsfRecordPermissionRoleLabel,
    requireAuthAccountUid,
    resolveNsfFolderIdentifier,
    resolveNsfRecordIdentifier,
    resolveNsfRoleName,
} from './nsfHelpers'

// --- Folder share ---

export enum NsfFolderShareAction {
    Grant = 'grant',
    Remove = 'remove',
}

export type NsfFolderShareActionInput = NsfFolderShareAction | `${NsfFolderShareAction}`

export type ShareNestedShareFolderInput = {
    folders: string[]
    recipients: string[]
    action?: NsfFolderShareActionInput
    role?: string
    expirationTimestamp?: number
}

export type NsfFolderShareResultItem = {
    folderUid: string
    recipient: string
    isTeam: boolean
    success: boolean
    actionTaken: string
    message?: string
}

export type ShareNestedShareFolderResult = {
    results: NsfFolderShareResultItem[]
}

// --- Record share ---

export enum NsfRecordShareAction {
    Grant = 'grant',
    Revoke = 'revoke',
    Owner = 'owner',
}

export type NsfRecordShareActionInput = NsfRecordShareAction | `${NsfRecordShareAction}`

export type ShareNestedShareRecordInput = {
    record: string
    emails: string[]
    action?: NsfRecordShareActionInput
    role?: string
    recursive?: boolean
    dryRun?: boolean
    expirationTimestamp?: number
}

export type NsfRecordSharePlanItem = {
    recordUid: string
    title: string
    email: string
    action: string
    role?: string
}

export type NsfRecordShareResultItem = {
    recordUid: string
    email: string
    success: boolean
    actionTaken: string
    message?: string
}

export type ShareNestedShareRecordResult = {
    dryRun: boolean
    plan: NsfRecordSharePlanItem[]
    results: NsfRecordShareResultItem[]
}

type ShareRecipientTarget = {
    recipient: string
    isTeam: boolean
    accountUid?: Uint8Array
}

type DirectUserShare = {
    recordUid: string
    email: string
    accessRoleType: number
    expiration?: number
}

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
): { folderUid: string; recipient: string; success: boolean; message: string } {
    if (!result) {
        return { folderUid, recipient, success: false, message: 'No folder access result returned' }
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

async function classifyShareRecipient(auth: Auth, recipient: string): Promise<ShareRecipientTarget | null> {
    const trimmed = recipient.trim()
    if (!trimmed) return null

    if (isValidEmail(trimmed)) {
        return { recipient: trimmed.toLowerCase(), isTeam: false }
    }

    const response = await auth.executeRest(getShareObjectsMessage({}))
    const teams = [...(response.shareTeams ?? []), ...(response.shareMCTeams ?? [])]
    const lower = trimmed.toLowerCase()
    const matches = teams.filter((team) => {
        const uid = team.teamUid?.length ? webSafe64FromBytes(team.teamUid) : ''
        const name = team.teamname?.trim() ?? ''
        return uid === trimmed || name.toLowerCase() === lower
    })

    if (matches.length === 1) {
        const teamUid = webSafe64FromBytes(matches[0].teamUid!)
        return { recipient: teamUid, isTeam: true, accountUid: matches[0].teamUid as Uint8Array }
    }
    if (matches.length > 1) {
        throw new KeeperSdkError(
            `Multiple teams match '${trimmed}'. Use the team UID instead.`,
            ResultCodes.MULTIPLE_NSF_MATCHES
        )
    }

    throw new KeeperSdkError(
        `Recipient '${trimmed}' could not be resolved as an email or team.`,
        SHARE_ERROR
    )
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
    const { encryptedKey, useEccKey } = await encryptKeyForRecipient(folderKey, userKeys)
    return Folder.EncryptedDataKey.create({
        encryptedKey,
        encryptedKeyType: useEccKey
            ? Folder.EncryptedKeyType.encrypted_by_public_key_ecc
            : Folder.EncryptedKeyType.encrypted_by_public_key,
    })
}

async function buildFolderAccessGrantData(
    auth: Auth,
    storage: InMemoryStorage,
    folderUid: string,
    target: ShareRecipientTarget,
    accessRoleType: Folder.AccessRoleType,
    expirationTimestamp?: number
): Promise<Folder.IFolderAccessData> {
    if (target.isTeam) {
        throw new KeeperSdkError(
            'Team folder sharing is not yet supported in this SDK version.',
            SHARE_ERROR
        )
    }

    const folderKey = await storage.getKeyBytes(folderUid)
    if (!folderKey) {
        throw new KeeperSdkError(
            `Folder key not available for ${folderUid}. Run sync() first.`,
            ResultCodes.NSF_MISSING_KEY
        )
    }

    const userKeys = await loadUserShareKeysOrInvite(auth, target.recipient, SHARE_ERROR)
    const encryptedFolderKey = await buildEncryptedFolderKeyForUser(auth, folderKey, target.recipient)

    const data = Folder.FolderAccessData.create({
        folderUid: normal64Bytes(folderUid),
        accessTypeUid: userKeys.accountUid,
        accessType: Folder.AccessType.AT_USER,
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
    target: ShareRecipientTarget,
    accessRoleType: Folder.AccessRoleType,
    expirationTimestamp?: number
): Folder.IFolderAccessData {
    if (target.isTeam) {
        throw new KeeperSdkError(
            'Team folder sharing is not yet supported in this SDK version.',
            SHARE_ERROR
        )
    }

    if (!target.accountUid?.length) {
        throw new KeeperSdkError(`User ${target.recipient} not found`, SHARE_ERROR)
    }

    const data = Folder.FolderAccessData.create({
        folderUid: normal64Bytes(folderUid),
        accessTypeUid: target.accountUid,
        accessType: Folder.AccessType.AT_USER,
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
): Promise<ShareRecipientTarget[]> {
    const targets: ShareRecipientTarget[] = []
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

        const classified = await classifyShareRecipient(auth, trimmed)
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
    target: ShareRecipientTarget,
    accessRoleType: Folder.AccessRoleType,
    expirationTimestamp?: number
): Promise<NsfFolderShareResultItem> {
    const accessType = target.isTeam ? Folder.AccessType.AT_TEAM : Folder.AccessType.AT_USER
    const accessTypeUid = target.accountUid ? webSafe64FromBytes(target.accountUid) : target.recipient

    const existing = findFolderAccessEntry(storage, folderUid, accessTypeUid, accessType)
    if (existing && existing.accessRoleType === accessRoleType && expirationTimestamp == null) {
        return {
            folderUid,
            recipient: target.recipient,
            isTeam: target.isTeam,
            success: true,
            actionTaken: 'already_had_access',
            message: `Already has ${getNsfRecordPermissionRoleLabel(accessRoleType)} access`,
        }
    }

    const request =
        existing != null
            ? buildFolderAccessUpdateData(folderUid, target, accessRoleType, expirationTimestamp)
            : await buildFolderAccessGrantData(
                  auth,
                  storage,
                  folderUid,
                  target,
                  accessRoleType,
                  expirationTimestamp
              )

    const response = await auth.executeRest(
        folderAccessUpdateMessage({
            [existing != null ? 'folderAccessUpdates' : 'folderAccessAdds']: [request],
        })
    )

    const parsed = parseFolderAccessResult(
        response.folderAccessResults?.[0],
        folderUid,
        target.recipient
    )
    return {
        folderUid,
        recipient: target.recipient,
        isTeam: target.isTeam,
        success: parsed.success,
        actionTaken: existing != null ? 'updated' : 'granted',
        message: parsed.message,
    }
}

async function removeFolderAccess(
    auth: Auth,
    folderUid: string,
    target: ShareRecipientTarget
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

    const parsed = parseFolderAccessResult(
        response.folderAccessResults?.[0],
        folderUid,
        target.recipient
    )
    return {
        folderUid,
        recipient: target.recipient,
        isTeam: target.isTeam,
        success: parsed.success,
        actionTaken: 'removed',
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
        throw new KeeperSdkError(
            'Recipient is required (email, team name/UID, or @existing).',
            SHARE_ERROR
        )
    }

    const role = input.role?.trim() || 'viewer'
    const accessRoleType =
        action === NsfFolderShareAction.Grant ? resolveNsfRoleName(role) : undefined

    if (action === NsfFolderShareAction.Grant) {
        resolveNsfRoleName(role)
    }

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

            const targets = await resolveFolderShareTargets(
                auth,
                storage,
                folderUid,
                recipients,
                auth.username
            )
            if (targets.length === 0) {
                throw new KeeperSdkError(
                    `No share targets resolved for folder '${folderArg}'.`,
                    SHARE_ERROR
                )
            }

            for (const target of targets) {
                if (action === NsfFolderShareAction.Remove) {
                    results.push(await removeFolderAccess(auth, folderUid, target))
                } else {
                    results.push(
                        await grantFolderAccess(
                            storage,
                            auth,
                            folderUid,
                            target,
                            accessRoleType!,
                            input.expirationTimestamp
                        )
                    )
                }
            }
        }

        return { results }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to share nested share folder: ${extractErrorMessage(err)}`,
            SHARE_ERROR
        )
    }
}

// --- Record share ---

function resolveRecordUids(
    storage: InMemoryStorage,
    recordArg: string,
    recursive: boolean
): string[] {
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

async function findDirectUserShare(
    auth: Auth,
    recordUid: string,
    email: string
): Promise<DirectUserShare | undefined> {
    const response = await auth.executeRest(
        recordAccessDetailsMessage({
            recordUids: [normal64Bytes(recordUid)],
        })
    )

    for (const entry of response.recordAccesses ?? []) {
        const data = entry.data
        if (!data?.recordUid?.length || data.inherited || data.owner) continue
        if (data.accessType !== Folder.AccessType.AT_USER) continue
        if ((entry.accessorInfo?.name || '').toLowerCase() !== email.toLowerCase()) continue

        return {
            recordUid,
            email,
            accessRoleType: data.accessRoleType ?? Folder.AccessRoleType.UNRESOLVED,
            expiration: data.tlaProperties?.expiration ?? undefined,
        }
    }
    return undefined
}

function isShareUpdateNoop(
    existing: DirectUserShare,
    accessRoleType: Folder.AccessRoleType,
    expirationTimestamp?: number
): boolean {
    if (existing.accessRoleType !== accessRoleType) return false
    if (expirationTimestamp == null) return true
    return existing.expiration === expirationTimestamp
}

async function requireRecordKey(
    storage: InMemoryStorage,
    auth: Auth,
    recordUid: string
): Promise<Uint8Array> {
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
        actionTaken: 'owner',
        message: result.message,
    }
}

async function revokeRecordShare(
    auth: Auth,
    recordUid: string,
    email: string
): Promise<NsfRecordShareResultItem> {
    const permission = await buildNsfRecordRevokePermission(auth, recordUid, email, SHARE_ERROR)
    const response = await auth.executeRest(
        recordsShareV3Message({ revokeSharingPermissions: [permission] })
    )
    const parsed = parseRecordSharingStatus(response.revokedSharingStatus?.[0])
    return {
        recordUid,
        email,
        success: parsed.success,
        actionTaken: 'revoke',
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
    const existing = await findDirectUserShare(auth, recordUid, email)
    if (existing && isShareUpdateNoop(existing, accessRoleType, expirationTimestamp)) {
        return {
            recordUid,
            email,
            success: true,
            actionTaken: 'update',
            message: 'Already has requested access',
        }
    }

    if (existing && expirationTimestamp != null && expirationTimestamp > 0) {
        const revokeResult = await revokeRecordShare(auth, recordUid, email)
        if (!revokeResult.success) {
            return { ...revokeResult, actionTaken: 'update' }
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
        const response = await auth.executeRest(
            recordsShareV3Message({ createSharingPermissions: [permission] })
        )
        const parsed = parseRecordSharingStatus(response.createdSharingStatus?.[0])
        return {
            recordUid,
            email,
            success: parsed.success,
            actionTaken: 'grant',
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
        actionTaken: existing ? 'update' : 'grant',
        message: parsed.message,
    }
}

function recordTitle(storage: InMemoryStorage, recordUid: string): string {
    const recordEntry = getKeeperDriveRecord(storage, recordUid)
    if (!recordEntry) return ''
    return getRecordTitle(recordEntry).slice(0, 32)
}

export function formatNsfRecordSharePlan(plan: NsfRecordSharePlanItem[]): string {
    if (plan.length === 0) return 'No record share changes planned.'
    const lines = ['Record share plan']
    for (const item of plan) {
        lines.push(
            `  ${item.recordUid}  ${item.title || '—'}  ${item.email}  ${item.action}${item.role ? `  ${item.role}` : ''}`
        )
    }
    return lines.join('\n')
}

export function formatNsfRecordShareResults(results: NsfRecordShareResultItem[]): string {
    if (results.length === 0) return ''
    const lines: string[] = []
    for (const item of results) {
        lines.push(
            `${item.recordUid}  ${item.email}  ${item.actionTaken}  ${item.success ? 'success' : 'failed'}  ${item.message || ''}`
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
        throw new KeeperSdkError(
            'Ownership can only be transferred to a single account.',
            SHARE_ERROR
        )
    }
    if (action === NsfRecordShareAction.Grant && !input.role?.trim()) {
        throw new KeeperSdkError('Role is required for grant action.', SHARE_ERROR)
    }

    const role = input.role?.trim() || 'viewer'
    const accessRoleType =
        action === NsfRecordShareAction.Grant ? resolveNsfRoleName(role) : undefined

    const recordUids = resolveRecordUids(storage, input.record, input.recursive ?? false)
    const accountUid = requireAuthAccountUid(auth)

    for (const recordUid of recordUids) {
        checkRecordSharePermission(storage, recordUid, auth.username, accountUid)
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
                    results.push(await revokeRecordShare(auth, recordUid, email))
                } else {
                    results.push(
                        await grantRecordShare(
                            storage,
                            auth,
                            recordUid,
                            email,
                            accessRoleType!,
                            input.expirationTimestamp
                        )
                    )
                }
            }
        }

        return { dryRun: false, plan, results }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to share nested share record: ${extractErrorMessage(err)}`,
            SHARE_ERROR
        )
    }
}

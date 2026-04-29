import type {
    DRecord,
    DRecordMetadata,
    DSharedFolder,
    DSharedFolderFolder,
    DUserFolder,
    VaultStorageData,
    VaultStorageKind,
} from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError } from '../utils'
import { getRecordTitle, getRecordType } from '../records/RecordUtils'
import {
    FolderKind,
    getUserFolderParentMap,
    globToRegex,
    sharedFolderFolderName,
    sharedFolderName,
    userFolderName,
} from './folderHelpers'

export type ListFolderOptions = {
    folderUid?: string | null
    pattern?: string | null
    showFolders?: boolean
    showRecords?: boolean
    detail?: boolean
}

export type ListFolderFolderSimple = {
    uid: string
    name: string
    folderKind: FolderKind
}

export type ListFolderRecordSimple = {
    uid: string
    name: string
    type: string
}

export type ListFolderFolderDetail = ListFolderFolderSimple & {
    flags: string
    recordCount: number
    subfolderCount: number
}

export type ListFolderRecordDetail = ListFolderRecordSimple & {
    flags: string
    version: number
    isOwner: boolean
    hasAttachments: boolean
    isShared: boolean
}

export type ListFolderResult =
    | {
          detail: true
          folders: ListFolderFolderDetail[]
          records: ListFolderRecordDetail[]
      }
    | {
          detail: false
          folders: ListFolderFolderSimple[]
          records: ListFolderRecordSimple[]
      }

function recordHasAttachments(record: DRecord): boolean {
    const fileIds = record.udata?.file_ids
    if (Array.isArray(fileIds) && fileIds.length > 0) return true
    const files = (record.extra as { files?: unknown[] } | undefined)?.files
    return Array.isArray(files) && files.length > 0
}

function buildFolderFlags(folderKind: ListFolderFolderSimple['folderKind']): string {
    const isShared = folderKind !== FolderKind.UserFolder
    return `f--${isShared ? 'S' : '-'}`
}

function buildRecordFlags(record: DRecord, metadata: DRecordMetadata | undefined): string {
    const isOwner = metadata?.owner === true
    const hasAttachments = recordHasAttachments(record)
    const isShared = !!record.shared
    return `r${isOwner ? 'O' : '-'}${hasAttachments ? 'A' : '-'}${isShared ? 'S' : '-'}`
}

export async function listRootUserFolders(storage: InMemoryStorage): Promise<DUserFolder[]> {
    const userFolders = storage.getAll<DUserFolder>(FolderKind.UserFolder)
    const childToParent = await getUserFolderParentMap(storage)
    return userFolders.filter((userFolder) => !childToParent.has(userFolder.uid))
}

async function buildFolderParentMap(
    storage: InMemoryStorage
): Promise<Map<string, { uid: string; kind: VaultStorageKind }>> {
    const childToParent = new Map<string, { uid: string; kind: VaultStorageKind }>()
    const parentKinds: VaultStorageKind[] = [
        FolderKind.UserFolder,
        FolderKind.SharedFolder,
        FolderKind.SharedFolderFolder,
    ]
    for (const kind of parentKinds) {
        for (const candidate of storage.getAll<{ uid: string } & VaultStorageData>(kind)) {
            const candidateUid = (candidate as { uid: string }).uid
            if (!candidateUid) continue
            const dependencies = (await storage.getDependencies(candidateUid)) || []
            for (const dependency of dependencies) {
                if (
                    dependency.kind === FolderKind.UserFolder ||
                    dependency.kind === FolderKind.SharedFolder ||
                    dependency.kind === FolderKind.SharedFolderFolder
                ) {
                    if (!childToParent.has(dependency.uid)) {
                        childToParent.set(dependency.uid, { uid: candidateUid, kind })
                    }
                }
            }
        }
    }
    return childToParent
}

export async function listVaultRootFolders(storage: InMemoryStorage): Promise<{
    rows: ListFolderFolderSimple[]
    promotedRootSharedUids: Set<string>
}> {
    const rows: ListFolderFolderSimple[] = []
    const seen = new Set<string>()
    const promotedRootSharedUids = new Set<string>()

    for (const userFolder of await listRootUserFolders(storage)) {
        if (seen.has(userFolder.uid)) continue
        seen.add(userFolder.uid)
        rows.push({
            uid: userFolder.uid,
            name: userFolderName(userFolder),
            folderKind: FolderKind.UserFolder,
        })
    }

    const rootDependencies = (await storage.getDependencies('')) || []
    for (const dependency of rootDependencies) {
        if (dependency.kind === FolderKind.SharedFolder) {
            const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, dependency.uid)
            if (!sharedFolder || seen.has(sharedFolder.uid)) continue
            seen.add(sharedFolder.uid)
            rows.push({
                uid: sharedFolder.uid,
                name: sharedFolderName(sharedFolder),
                folderKind: FolderKind.SharedFolder,
            })
        } else if (dependency.kind === FolderKind.SharedFolderFolder) {
            const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(
                FolderKind.SharedFolderFolder,
                dependency.uid
            )
            if (!sharedFolderFolder || seen.has(sharedFolderFolder.uid)) continue
            seen.add(sharedFolderFolder.uid)
            rows.push({
                uid: sharedFolderFolder.uid,
                name: sharedFolderFolderName(sharedFolderFolder),
                folderKind: FolderKind.SharedFolderFolder,
            })
        }
    }

    const parentMap = await buildFolderParentMap(storage)
    for (const sharedFolder of storage.getAll<DSharedFolder>(FolderKind.SharedFolder)) {
        if (seen.has(sharedFolder.uid)) continue
        const parent = parentMap.get(sharedFolder.uid)
        if (parent && (parent.kind === FolderKind.SharedFolder || parent.kind === FolderKind.SharedFolderFolder)) {
            continue
        }
        seen.add(sharedFolder.uid)
        promotedRootSharedUids.add(sharedFolder.uid)
        rows.push({
            uid: sharedFolder.uid,
            name: sharedFolderName(sharedFolder),
            folderKind: FolderKind.SharedFolder,
        })
    }

    rows.sort((rowA, rowB) => rowA.name.localeCompare(rowB.name, undefined, { sensitivity: 'base' }))

    return { rows, promotedRootSharedUids }
}

function resolveFolderContainer(storage: InMemoryStorage, folderUid: string): { kind: VaultStorageKind; uid: string } {
    if (storage.getByUid<DUserFolder>(FolderKind.UserFolder, folderUid)) {
        return { kind: FolderKind.UserFolder, uid: folderUid }
    }
    if (storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, folderUid)) {
        return { kind: FolderKind.SharedFolder, uid: folderUid }
    }
    if (storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, folderUid)) {
        return { kind: FolderKind.SharedFolderFolder, uid: folderUid }
    }
    throw new KeeperSdkError(`Folder "${folderUid}" not found`, 'folder_not_found')
}

function getRecordMetadata(storage: InMemoryStorage, recordUid: string): DRecordMetadata | undefined {
    return storage.getByUid<DRecordMetadata>('metadata', recordUid)
}

export function findFolderUidByNameOrUid(storage: InMemoryStorage, needle: string): string | undefined {
    const trimmed = needle.trim()
    if (!trimmed) return undefined

    if (
        storage.getByUid<DUserFolder>(FolderKind.UserFolder, trimmed) ||
        storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, trimmed) ||
        storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, trimmed)
    ) {
        return trimmed
    }

    const lowerNeedle = trimmed.toLowerCase()
    for (const userFolder of storage.getAll<DUserFolder>(FolderKind.UserFolder)) {
        if (userFolderName(userFolder).toLowerCase() === lowerNeedle) return userFolder.uid
    }
    for (const sharedFolder of storage.getAll<DSharedFolder>(FolderKind.SharedFolder)) {
        if (sharedFolderName(sharedFolder).toLowerCase() === lowerNeedle) return sharedFolder.uid
    }
    for (const sharedFolderFolder of storage.getAll<DSharedFolderFolder>(FolderKind.SharedFolderFolder)) {
        if (sharedFolderFolderName(sharedFolderFolder).toLowerCase() === lowerNeedle) return sharedFolderFolder.uid
    }
    return undefined
}

async function countFolderChildren(
    storage: InMemoryStorage,
    uid: string
): Promise<{ records: number; subfolders: number }> {
    const dependencies = (await storage.getDependencies(uid)) || []
    let records = 0
    let subfolders = 0
    for (const dependency of dependencies) {
        if (dependency.kind === 'record') records++
        else if (
            dependency.kind === FolderKind.UserFolder ||
            dependency.kind === FolderKind.SharedFolder ||
            dependency.kind === FolderKind.SharedFolderFolder
        ) {
            subfolders++
        }
    }
    return { records, subfolders }
}

export async function listFolder(storage: InMemoryStorage, options: ListFolderOptions = {}): Promise<ListFolderResult> {
    const showFolders = options.showFolders !== false
    const showRecords = options.showRecords !== false
    const detail = options.detail === true
    const patternRaw = options.pattern?.trim() || null
    const regex = patternRaw ? globToRegex(patternRaw) : null

    const folderUidOpt = options.folderUid
    let parentKey: string | null = null

    if (folderUidOpt !== undefined && folderUidOpt !== null && folderUidOpt !== '') {
        parentKey = resolveFolderContainer(storage, folderUidOpt).uid
    }

    const deps =
        parentKey === null
            ? (await storage.getDependencies('')) || []
            : (await storage.getDependencies(parentKey)) || []

    const folderRows: ListFolderFolderSimple[] = []
    const recordRows: ListFolderRecordSimple[] = []

    const matches = (name: string, uid: string): boolean => {
        if (!regex) return true
        return regex.test(name) || regex.test(uid)
    }

    if (showFolders && parentKey === null) {
        const { rows } = await listVaultRootFolders(storage)
        for (const row of rows) {
            if (!matches(row.name, row.uid)) continue
            folderRows.push(row)
        }
    }

    for (const dependency of deps) {
        if (dependency.kind === FolderKind.UserFolder && showFolders && parentKey !== null) {
            const userFolder = storage.getByUid<DUserFolder>(FolderKind.UserFolder, dependency.uid)
            if (!userFolder) continue
            const name = userFolderName(userFolder)
            if (!matches(name, userFolder.uid)) continue
            folderRows.push({ uid: userFolder.uid, name, folderKind: FolderKind.UserFolder })
        } else if (dependency.kind === FolderKind.SharedFolder && showFolders && parentKey !== null) {
            const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, dependency.uid)
            if (!sharedFolder) continue
            const name = sharedFolderName(sharedFolder)
            if (!matches(name, sharedFolder.uid)) continue
            folderRows.push({ uid: sharedFolder.uid, name, folderKind: FolderKind.SharedFolder })
        } else if (dependency.kind === FolderKind.SharedFolderFolder && showFolders && parentKey !== null) {
            const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(
                FolderKind.SharedFolderFolder,
                dependency.uid
            )
            if (!sharedFolderFolder) continue
            const name = sharedFolderFolderName(sharedFolderFolder)
            if (!matches(name, sharedFolderFolder.uid)) continue
            folderRows.push({
                uid: sharedFolderFolder.uid,
                name,
                folderKind: FolderKind.SharedFolderFolder,
            })
        } else if (dependency.kind === 'record' && showRecords) {
            const record = storage.getByUid<DRecord>('record', dependency.uid)
            if (!record || (record.version !== 2 && record.version !== 3)) continue
            const title = getRecordTitle(record)
            if (!matches(title, record.uid)) continue
            recordRows.push({
                uid: record.uid,
                name: title,
                type: getRecordType(record),
            })
        }
    }

    folderRows.sort((rowA, rowB) => rowA.name.localeCompare(rowB.name, undefined, { sensitivity: 'base' }))
    recordRows.sort((rowA, rowB) => rowA.name.localeCompare(rowB.name, undefined, { sensitivity: 'base' }))

    if (!detail) {
        return { detail: false, folders: folderRows, records: recordRows }
    }

    const folderDetails: ListFolderFolderDetail[] = await Promise.all(
        folderRows.map(async (row) => {
            const counts = await countFolderChildren(storage, row.uid)
            return {
                ...row,
                flags: buildFolderFlags(row.folderKind),
                recordCount: counts.records,
                subfolderCount: counts.subfolders,
            }
        })
    )

    const recordDetails: ListFolderRecordDetail[] = recordRows.map((row) => {
        const record = storage.getByUid<DRecord>('record', row.uid)!
        const metadata = getRecordMetadata(storage, row.uid)
        return {
            ...row,
            flags: buildRecordFlags(record, metadata),
            version: record.version,
            isOwner: metadata?.owner === true,
            hasAttachments: recordHasAttachments(record),
            isShared: !!record.shared,
        }
    })

    return { detail: true, folders: folderDetails, records: recordDetails }
}

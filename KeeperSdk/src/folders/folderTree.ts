import type {
    DRecord,
    DSharedFolder,
    DSharedFolderFolder,
    DSharedFolderTeam,
    DSharedFolderUser,
    DUser,
    DUserFolder,
} from '@keeper-security/keeperapi'
import { webSafe64FromBytes } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { getRecordTitle } from '../records/RecordUtils'
import { listFolder, listVaultRootFolders } from './listFolder'
import { resolveSingleFolder, type VaultFolderSession } from './changeDirectory'
import { FolderKind, VaultObjectKind, sharedFolderFolderName, sharedFolderName, userFolderName } from './folderHelpers'

enum TreeItemKind {
    Permission = 'perm',
    Record = 'record',
    Folder = 'folder',
}

const TREE_TAG = {
    folder: '[folder]',
    sharedFolder: '[shared folder]',
    record: '[record]',
} as const

export type FolderTreeBuildOptions = {
    folderPath?: string | null
    verbose?: boolean
    showRecords?: boolean
    showShares?: boolean
    hideSharesKey?: boolean
    title?: string | null
}

export type FolderTreeNode = {
    displayName: string
    children: FolderTreeNode[]
    permissions?: { display: string }[]
    records?: { display: string }[]
}

export type FolderTreeResult = {
    title?: string | null
    root: FolderTreeNode
}

export function userPermissionToText(manageUsers: boolean, manageRecords: boolean): string {
    if (manageUsers && manageRecords) return 'Can Manage Users & Records'
    if (manageUsers) return 'Can Manage Users'
    if (manageRecords) return 'Can Manage Records'
    return 'No User Permissions'
}

export function recordPermissionToText(canEdit: boolean, canShare: boolean): string {
    if (canEdit && canShare) return 'Can Edit & Share'
    if (canEdit) return 'Can Edit'
    if (canShare) return 'Can Share'
    return 'View Only'
}

function buildAccountUidEmailMap(storage: InMemoryStorage): Map<string, string> {
    const accountUidToEmail = new Map<string, string>()
    for (const user of storage.getAll<DUser>(VaultObjectKind.User)) {
        const uid = user.accountUid ? webSafe64FromBytes(user.accountUid) : ''
        const email = (user.username || '').trim()
        if (uid && email) accountUidToEmail.set(uid, email)
    }
    return accountUidToEmail
}

function resolveUserDisplayName(
    accountUid: string | undefined,
    accountUsername: string | undefined,
    emailMap: Map<string, string>
): string {
    const explicit = (accountUsername || '').trim()
    if (explicit) return explicit
    if (accountUid) {
        const fromMap = emailMap.get(accountUid)
        if (fromMap) return fromMap
        return accountUid
    }
    return 'unknown'
}

async function collectSharedFolderPermissions(
    storage: InMemoryStorage,
    sharedFolder: DSharedFolder,
    verbose: boolean,
    hideSharesKey: boolean,
    emailMap: Map<string, string>
): Promise<{ display: string }[]> {
    const rows: { display: string; sortKey: string }[] = []
    const seenUserUids = new Set<string>()

    for (const sharedUser of storage.getAll<DSharedFolderUser>(VaultObjectKind.SharedFolderUser)) {
        if (sharedUser.sharedFolderUid !== sharedFolder.uid) continue
        if (sharedUser.accountUid) seenUserUids.add(sharedUser.accountUid)
        const permissionText = userPermissionToText(sharedUser.manageUsers, sharedUser.manageRecords)
        let name = resolveUserDisplayName(sharedUser.accountUid, sharedUser.accountUsername, emailMap)
        if (verbose && sharedUser.accountUid) name += ` (${sharedUser.accountUid})`
        const suffix = hideSharesKey ? '' : ` [User]`
        rows.push({
            display: `${name}: ${permissionText}${suffix}`,
            sortKey: name.toLowerCase(),
        })
    }

    if (sharedFolder.ownerAccountUid && !seenUserUids.has(sharedFolder.ownerAccountUid)) {
        const ownerName = resolveUserDisplayName(sharedFolder.ownerAccountUid, sharedFolder.ownerUsername, emailMap)
        let display = ownerName
        if (verbose) display += ` (${sharedFolder.ownerAccountUid})`
        const suffix = hideSharesKey ? '' : ` [User]`
        rows.push({
            display: `${display}: ${userPermissionToText(true, true)}${suffix}`,
            sortKey: ownerName.toLowerCase(),
        })
    }

    for (const sharedTeam of storage.getAll<DSharedFolderTeam>(VaultObjectKind.SharedFolderTeam)) {
        if (sharedTeam.sharedFolderUid !== sharedFolder.uid) continue
        const permissionText = userPermissionToText(sharedTeam.manageUsers, sharedTeam.manageRecords)
        let name = sharedTeam.name || `(${sharedTeam.teamUid})`
        if (verbose && sharedTeam.teamUid) name += ` (${sharedTeam.teamUid})`
        const suffix = hideSharesKey ? '' : ` [Team]`
        rows.push({
            display: `${name}: ${permissionText}${suffix}`,
            sortKey: name.toLowerCase(),
        })
    }

    rows.sort((rowA, rowB) => rowA.sortKey.localeCompare(rowB.sortKey))
    return rows.map((row) => ({ display: row.display }))
}

function folderTreeTag(
    userFolder: DUserFolder | undefined,
    sharedFolder: DSharedFolder | undefined,
    _sharedFolderFolder: DSharedFolderFolder | undefined
): string {
    if (sharedFolder) return TREE_TAG.sharedFolder
    if (userFolder) return TREE_TAG.folder
    return TREE_TAG.folder
}

function formatTreeNodeName(baseName: string, tag: string, verbose: boolean, uid?: string): string {
    const name = verbose && uid ? `${baseName} (${uid})` : baseName
    return `${name} ${tag}`
}

function formatTreeRecordName(title: string, verbose: boolean, recordUid?: string): string {
    const name = verbose && recordUid ? `${title} (${recordUid})` : title
    return `${name} ${TREE_TAG.record}`
}

type BuildOpts = Required<Pick<FolderTreeBuildOptions, 'verbose' | 'showRecords' | 'showShares' | 'hideSharesKey'>> & {
    promotedRootSharedUids?: Set<string>
    accountUidEmailMap: Map<string, string>
}

async function buildFolderSubtree(
    storage: InMemoryStorage,
    folderUid: string,
    opts: BuildOpts
): Promise<FolderTreeNode> {
    const userFolder = storage.getByUid<DUserFolder>(FolderKind.UserFolder, folderUid)
    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, folderUid)
    const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, folderUid)
    if (!userFolder && !sharedFolder && !sharedFolderFolder) {
        return { displayName: `(missing folder ${folderUid})`, children: [] }
    }

    let baseName: string
    if (userFolder) baseName = userFolderName(userFolder)
    else if (sharedFolder) baseName = sharedFolderName(sharedFolder)
    else baseName = sharedFolderFolderName(sharedFolderFolder!)

    let displayName = formatTreeNodeName(
        baseName,
        folderTreeTag(userFolder, sharedFolder, sharedFolderFolder),
        opts.verbose,
        folderUid
    )

    const node: FolderTreeNode = { displayName, children: [] }

    if (opts.showShares && sharedFolder) {
        node.permissions = await collectSharedFolderPermissions(
            storage,
            sharedFolder,
            opts.verbose,
            opts.hideSharesKey,
            opts.accountUidEmailMap
        )
    }

    const listed = await listFolder(storage, {
        folderUid: folderUid,
        showFolders: true,
        showRecords: opts.showRecords,
    })

    for (const childFolder of listed.folders) {
        if (opts.promotedRootSharedUids?.has(childFolder.uid)) continue
        node.children.push(await buildFolderSubtree(storage, childFolder.uid, opts))
    }

    if (opts.showRecords && 'records' in listed) {
        const records = listed.records
        node.records = records.map((recordRow) => {
            const record = storage.getByUid<DRecord>(VaultObjectKind.Record, recordRow.uid)
            const title = record ? getRecordTitle(record) : recordRow.name
            return { display: formatTreeRecordName(title, opts.verbose, recordRow.uid) }
        })
    }

    return node
}

async function buildVaultRootTree(storage: InMemoryStorage, opts: BuildOpts): Promise<FolderTreeNode> {
    const node: FolderTreeNode = { displayName: '', children: [] }
    const { rows, promotedRootSharedUids } = await listVaultRootFolders(storage)
    const optsWithPromoted: BuildOpts = { ...opts, promotedRootSharedUids }
    for (const folderRow of rows) {
        node.children.push(await buildFolderSubtree(storage, folderRow.uid, optsWithPromoted))
    }
    const listed = await listFolder(storage, {
        folderUid: undefined,
        showFolders: true,
        showRecords: opts.showRecords,
    })
    if (opts.showRecords && listed.records?.length) {
        node.records = listed.records.map((recordRow) => {
            const record = storage.getByUid<DRecord>(VaultObjectKind.Record, recordRow.uid)
            const title = record ? getRecordTitle(record) : recordRow.name
            return { display: formatTreeRecordName(title, opts.verbose, recordRow.uid) }
        })
    }
    return node
}

async function resolveTreeStart(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    folderPath?: string | null
): Promise<{ folderUid: string | null }> {
    const trimmedPath = folderPath?.trim()
    if (trimmedPath) {
        const resolved = await resolveSingleFolder(storage, session, trimmedPath)
        return { folderUid: resolved.folderUid }
    }
    return { folderUid: session.currentFolderUid || null }
}

export async function buildFolderTree(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    options: FolderTreeBuildOptions = {}
): Promise<FolderTreeResult> {
    const opts: BuildOpts = {
        verbose: options.verbose === true,
        showRecords: options.showRecords === true,
        showShares: options.showShares === true,
        hideSharesKey: options.hideSharesKey === true,
        accountUidEmailMap: buildAccountUidEmailMap(storage),
    }

    const { folderUid } = await resolveTreeStart(storage, session, options.folderPath)

    const root =
        folderUid === null
            ? await buildVaultRootTree(storage, opts)
            : await buildFolderSubtree(storage, folderUid, opts)

    return { title: options.title || undefined, root }
}

type TreeItem =
    | { kind: TreeItemKind.Permission; display: string }
    | { kind: TreeItemKind.Record; display: string }
    | { kind: TreeItemKind.Folder; node: FolderTreeNode }

function gatherItems(node: FolderTreeNode): TreeItem[] {
    const items: TreeItem[] = []
    if (node.permissions) {
        for (const permission of node.permissions) {
            items.push({ kind: TreeItemKind.Permission, display: permission.display })
        }
    }
    for (const child of node.children) {
        items.push({ kind: TreeItemKind.Folder, node: child })
    }
    if (node.records) {
        for (const record of node.records) {
            items.push({ kind: TreeItemKind.Record, display: record.display })
        }
    }
    return items
}

export function renderFolderTreeAscii(result: FolderTreeResult): string {
    const lines: string[] = []
    if (result.title) {
        lines.push(result.title)
    }
    renderNode(result.root, lines, true, '', true)
    return lines.join('\n')
}

function renderNode(node: FolderTreeNode, lines: string[], isRoot: boolean, prefix: string, isLast: boolean): void {
    if (isRoot) {
        if (node.displayName) {
            lines.push(node.displayName)
        }
    } else {
        const connector = isLast ? '\\-- ' : '+-- '
        lines.push(prefix + connector + node.displayName)
    }

    const childBase = isRoot ? ' ' : prefix + (isLast ? '    ' : '|   ')
    const items = gatherItems(node)
    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
        const isLastItem = itemIndex === items.length - 1
        const item = items[itemIndex]
        if (item.kind === TreeItemKind.Permission || item.kind === TreeItemKind.Record) {
            const connector = isLastItem ? '\\-- ' : '+-- '
            lines.push(childBase + connector + item.display)
        } else {
            renderNode(item.node, lines, false, childBase, isLastItem)
        }
    }
}

export async function folderTreeAscii(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    options?: FolderTreeBuildOptions
): Promise<string> {
    const built = await buildFolderTree(storage, session, options || {})
    return renderFolderTreeAscii(built)
}

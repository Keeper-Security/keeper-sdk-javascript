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
import { sharedFolderFolderName, sharedFolderName, userFolderName } from './folderHelpers'

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
    const map = new Map<string, string>()
    for (const u of storage.getAll<DUser>('user')) {
        const uid = u.accountUid ? webSafe64FromBytes(u.accountUid) : ''
        const email = (u.username || '').trim()
        if (uid && email) map.set(uid, email)
    }
    return map
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

    for (const u of storage.getAll<DSharedFolderUser>('shared_folder_user')) {
        if (u.sharedFolderUid !== sharedFolder.uid) continue
        if (u.accountUid) seenUserUids.add(u.accountUid)
        const permText = userPermissionToText(u.manageUsers, u.manageRecords)
        let name = resolveUserDisplayName(u.accountUid, u.accountUsername, emailMap)
        if (verbose && u.accountUid) name += ` (${u.accountUid})`
        const suffix = hideSharesKey ? '' : ` [User]`
        rows.push({
            display: `${name}: ${permText}${suffix}`,
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

    for (const t of storage.getAll<DSharedFolderTeam>('shared_folder_team')) {
        if (t.sharedFolderUid !== sharedFolder.uid) continue
        const permText = userPermissionToText(t.manageUsers, t.manageRecords)
        let name = t.name || `(${t.teamUid})`
        if (verbose && t.teamUid) name += ` (${t.teamUid})`
        const suffix = hideSharesKey ? '' : ` [Team]`
        rows.push({
            display: `${name}: ${permText}${suffix}`,
            sortKey: name.toLowerCase(),
        })
    }

    rows.sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    return rows.map((r) => ({ display: r.display }))
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
    const uf = storage.getByUid<DUserFolder>('user_folder', folderUid)
    const sf = storage.getByUid<DSharedFolder>('shared_folder', folderUid)
    const sff = storage.getByUid<DSharedFolderFolder>('shared_folder_folder', folderUid)
    if (!uf && !sf && !sff) {
        return { displayName: `(missing folder ${folderUid})`, children: [] }
    }

    let baseName: string
    if (uf) baseName = userFolderName(uf)
    else if (sf) baseName = sharedFolderName(sf)
    else baseName = sharedFolderFolderName(sff!)

    let displayName = baseName
    if (opts.verbose) {
        displayName = `${baseName} (${folderUid})`
    }
    if (sf) {
        displayName += ' [Shared]'
    }

    const node: FolderTreeNode = { displayName, children: [] }

    if (opts.showShares && sf) {
        node.permissions = await collectSharedFolderPermissions(
            storage,
            sf,
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

    for (const f of listed.folders) {
        if (opts.promotedRootSharedUids?.has(f.uid)) continue
        node.children.push(await buildFolderSubtree(storage, f.uid, opts))
    }

    if (opts.showRecords && 'records' in listed) {
        const recs = listed.records
        node.records = recs.map((r) => {
            const rec = storage.getByUid<DRecord>('record', r.uid)
            const title = rec ? getRecordTitle(rec) : r.name
            const suffix = opts.verbose && rec ? `${title} (${r.uid}) [Record]` : `${title} [Record]`
            return { display: suffix }
        })
    }

    return node
}

async function buildVaultRootTree(storage: InMemoryStorage, opts: BuildOpts): Promise<FolderTreeNode> {
    const node: FolderTreeNode = { displayName: '', children: [] }
    const { rows, promotedRootSharedUids } = await listVaultRootFolders(storage)
    const optsWithPromoted: BuildOpts = { ...opts, promotedRootSharedUids }
    for (const f of rows) {
        node.children.push(await buildFolderSubtree(storage, f.uid, optsWithPromoted))
    }
    const listed = await listFolder(storage, {
        folderUid: undefined,
        showFolders: true,
        showRecords: opts.showRecords,
    })
    if (opts.showRecords && listed.records?.length) {
        node.records = listed.records.map((r) => {
            const rec = storage.getByUid<DRecord>('record', r.uid)
            const title = rec ? getRecordTitle(rec) : r.name
            const suffix = opts.verbose && rec ? `${title} (${r.uid}) [Record]` : `${title} [Record]`
            return { display: suffix }
        })
    }
    return node
}

async function resolveTreeStart(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    folderPath?: string | null
): Promise<{ folderUid: string | null }> {
    const fp = folderPath?.trim()
    if (fp) {
        const r = await resolveSingleFolder(storage, session, fp)
        return { folderUid: r.folderUid }
    }
    return { folderUid: session.currentFolderUid ?? null }
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

    return { title: options.title ?? undefined, root }
}

type Item =
    | { kind: 'perm'; display: string }
    | { kind: 'record'; display: string }
    | { kind: 'folder'; node: FolderTreeNode }

function gatherItems(node: FolderTreeNode): Item[] {
    const items: Item[] = []
    if (node.permissions) {
        for (const p of node.permissions) {
            items.push({ kind: 'perm', display: p.display })
        }
    }
    for (const c of node.children) {
        items.push({ kind: 'folder', node: c })
    }
    if (node.records) {
        for (const r of node.records) {
            items.push({ kind: 'record', display: r.display })
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
    for (let i = 0; i < items.length; i++) {
        const last = i === items.length - 1
        const item = items[i]
        if (item.kind === 'perm' || item.kind === 'record') {
            const conn = last ? '\\-- ' : '+-- '
            lines.push(childBase + conn + item.display)
        } else {
            renderNode(item.node, lines, false, childBase, last)
        }
    }
}

export async function folderTreeAscii(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    options?: FolderTreeBuildOptions
): Promise<string> {
    const built = await buildFolderTree(storage, session, options ?? {})
    return renderFolderTreeAscii(built)
}

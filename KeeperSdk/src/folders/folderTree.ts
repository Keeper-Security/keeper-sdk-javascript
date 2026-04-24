import type { DRecord, DSharedFolder, DSharedFolderFolder, DSharedFolderTeam, DSharedFolderUser, DUserFolder } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { getRecordTitle } from '../records/RecordUtils'
import { listFolder, listRootUserFolders } from './listFolder'
import type { ListFolderFolderSimple } from './listFolder'
import { findParentFolderUid, resolveSingleFolder, type VaultFolderSession } from './changeDirectory'

export type FolderTreeBuildOptions = {
    /** Starting folder path, name, or UID; omit to use `session.currentFolderUid`, or vault root when that is null. */
    folderPath?: string | null
    verbose?: boolean
    showRecords?: boolean
    showShares?: boolean
    /** Omit `[User]` / `[Team]` suffixes on share lines when `showShares` is true. */
    hideSharesKey?: boolean
    /** Printed on its own line above the tree. */
    title?: string | null
}

export type FolderTreeNode = {
    displayName: string
    children: FolderTreeNode[]
    /** Only when `showShares` on a shared folder. */
    permissions?: { display: string }[]
    /** Only when `showRecords`. */
    records?: { display: string }[]
}

export type FolderTreeResult = {
    title?: string | null
    root: FolderTreeNode
}

function userFolderName(folder: DUserFolder): string {
    const d = folder.data as { title?: string; name?: string } | undefined
    return (d?.title || d?.name || folder.uid).trim() || folder.uid
}

function sharedFolderFolderName(folder: DSharedFolderFolder): string {
    const d = folder.data as { title?: string; name?: string } | undefined
    return (d?.title || d?.name || folder.uid).trim() || folder.uid
}

function sharedFolderName(folder: DSharedFolder): string {
    return (folder.name || folder.uid).trim() || folder.uid
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

async function collectSharedFolderPermissions(
    storage: InMemoryStorage,
    sharedFolderUid: string,
    verbose: boolean,
    hideSharesKey: boolean
): Promise<{ display: string }[]> {
    const rows: { display: string; sortKey: string }[] = []

    for (const u of storage.getAll<DSharedFolderUser>('shared_folder_user')) {
        if (u.sharedFolderUid !== sharedFolderUid) continue
        const permText = userPermissionToText(u.manageUsers, u.manageRecords)
        let name = u.accountUsername || u.accountUid || 'unknown'
        if (verbose && u.accountUid) name += ` (${u.accountUid})`
        const type = 'User'
        const suffix = hideSharesKey ? '' : ` [${type}]`
        rows.push({
            display: `${name}: ${permText}${suffix}`,
            sortKey: name.toLowerCase(),
        })
    }

    for (const t of storage.getAll<DSharedFolderTeam>('shared_folder_team')) {
        if (t.sharedFolderUid !== sharedFolderUid) continue
        const permText = userPermissionToText(t.manageUsers, t.manageRecords)
        let name = t.name || `(${t.teamUid})`
        if (verbose && t.teamUid) name += ` (${t.teamUid})`
        const type = 'Team'
        const suffix = hideSharesKey ? '' : ` [${type}]`
        rows.push({
            display: `${name}: ${permText}${suffix}`,
            sortKey: name.toLowerCase(),
        })
    }

    rows.sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    return rows.map((r) => ({ display: r.display }))
}

type BuildOpts = Required<Pick<FolderTreeBuildOptions, 'verbose' | 'showRecords' | 'showShares' | 'hideSharesKey'>> & {
    /** Folder UIDs shown at vault root but omitted when listing their previous parent (matches CLI `tree`). */
    promotedRootSharedUids?: Set<string>
}

/**
 * Vault root listing: same sources as `listFolder` at `''`, plus shared folders linked from root user folders,
 * plus every `shared_folder` whose parent is not inside another shared folder / shared-folder-folder (so nested
 * shared folders like `Gear-5th` under `StrawHatz` stay in the subtree, while folders linked only under nested
 * user folders still appear at the vault root like the Python CLI).
 */
async function collectVaultRootFolderRows(storage: InMemoryStorage): Promise<{
    rows: ListFolderFolderSimple[]
    promotedRootSharedUids: Set<string>
}> {
    const listed = await listFolder(storage, {
        folderUid: undefined,
        showFolders: true,
        showRecords: false,
    })
    const seen = new Set<string>()
    const rows: ListFolderFolderSimple[] = []
    for (const f of listed.folders) {
        if (seen.has(f.uid)) continue
        seen.add(f.uid)
        rows.push(f)
    }

    const promotedRootSharedUids = new Set<string>()
    const roots = await listRootUserFolders(storage)
    for (const uf of roots) {
        const deps = (await storage.getDependencies(uf.uid)) || []
        for (const d of deps) {
            if (d.kind !== 'shared_folder' && d.kind !== 'shared_folder_folder') continue
            if (d.kind === 'shared_folder') {
                const sf = storage.getByUid<DSharedFolder>('shared_folder', d.uid)
                if (!sf) continue
                const row: ListFolderFolderSimple = {
                    uid: sf.uid,
                    name: sharedFolderName(sf),
                    folderKind: 'shared_folder',
                }
                if (seen.has(row.uid)) continue
                seen.add(row.uid)
                promotedRootSharedUids.add(row.uid)
                rows.push(row)
            } else {
                const sff = storage.getByUid<DSharedFolderFolder>('shared_folder_folder', d.uid)
                if (!sff) continue
                const row: ListFolderFolderSimple = {
                    uid: sff.uid,
                    name: sharedFolderFolderName(sff),
                    folderKind: 'shared_folder_folder',
                }
                if (seen.has(row.uid)) continue
                seen.add(row.uid)
                promotedRootSharedUids.add(row.uid)
                rows.push(row)
            }
        }
    }

    for (const sf of storage.getAll<DSharedFolder>('shared_folder')) {
        if (seen.has(sf.uid)) continue
        const parentUid = await findParentFolderUid(storage, sf.uid)
        if (parentUid !== null) {
            const underSharedHierarchy =
                !!storage.getByUid<DSharedFolder>('shared_folder', parentUid)
                || !!storage.getByUid<DSharedFolderFolder>('shared_folder_folder', parentUid)
            if (underSharedHierarchy) {
                continue
            }
        }
        seen.add(sf.uid)
        promotedRootSharedUids.add(sf.uid)
        rows.push({
            uid: sf.uid,
            name: sharedFolderName(sf),
            folderKind: 'shared_folder',
        })
    }

    rows.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
    return { rows, promotedRootSharedUids }
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
        node.permissions = await collectSharedFolderPermissions(storage, sf.uid, opts.verbose, opts.hideSharesKey)
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
    const node: FolderTreeNode = { displayName: 'My Vault', children: [] }
    const { rows, promotedRootSharedUids } = await collectVaultRootFolderRows(storage)
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

/**
 * Build a folder tree from synced local storage (no API calls).
 */
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

/**
 * Render a folder tree as ASCII (similar to Python `asciitree` LeftAligned).
 */
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
        lines.push(node.displayName)
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

/**
 * Build and render in one step.
 */
export async function folderTreeAscii(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    options?: FolderTreeBuildOptions
): Promise<string> {
    const built = await buildFolderTree(storage, session, options ?? {})
    return renderFolderTreeAscii(built)
}

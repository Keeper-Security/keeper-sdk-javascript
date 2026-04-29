import type { DSharedFolder, DSharedFolderFolder, DUserFolder } from '@keeper-security/keeperapi'
import { InMemoryStorage } from '../storage/InMemoryStorage'
import { KeeperSdkError } from '../utils'
import { listFolder, listRootUserFolders } from './listFolder'
import type { ListFolderFolderSimple } from './listFolder'
import { FolderKind, sharedFolderFolderName, sharedFolderName, userFolderName } from './folderHelpers'

const VAULT_ROOT_DISPLAY_NAME = 'My Vault'

const ESCAPED_SEPARATOR_PLACEHOLDER = '\x00'

export type VaultFolderSession = {
    currentFolderUid: string | null
}

export type ChangeDirectoryResult = {
    folderUid: string | null
    name: string
}

export function createVaultFolderSession(): VaultFolderSession {
    return { currentFolderUid: null }
}

function getFolderEntryByUid(storage: InMemoryStorage, uid: string): ListFolderFolderSimple | undefined {
    const userFolder = storage.getByUid<DUserFolder>(FolderKind.UserFolder, uid)
    if (userFolder) {
        return { uid: userFolder.uid, name: userFolderName(userFolder), folderKind: FolderKind.UserFolder }
    }
    const sharedFolder = storage.getByUid<DSharedFolder>(FolderKind.SharedFolder, uid)
    if (sharedFolder) {
        return {
            uid: sharedFolder.uid,
            name: sharedFolderName(sharedFolder),
            folderKind: FolderKind.SharedFolder,
        }
    }
    const sharedFolderFolder = storage.getByUid<DSharedFolderFolder>(FolderKind.SharedFolderFolder, uid)
    if (sharedFolderFolder) {
        return {
            uid: sharedFolderFolder.uid,
            name: sharedFolderFolderName(sharedFolderFolder),
            folderKind: FolderKind.SharedFolderFolder,
        }
    }
    return undefined
}

export async function findParentFolderUid(storage: InMemoryStorage, folderUid: string): Promise<string | null> {
    const rootFolderUids = new Set((await listRootUserFolders(storage)).map((folder) => folder.uid))
    if (rootFolderUids.has(folderUid)) return null

    const parentKinds = [
        FolderKind.UserFolder,
        FolderKind.SharedFolder,
        FolderKind.SharedFolderFolder,
        'team',
    ] as const
    for (const kind of parentKinds) {
        for (const candidate of storage.getAll(kind)) {
            const candidateUid = (candidate as { uid: string }).uid
            const dependencies = (await storage.getDependencies(candidateUid)) || []
            for (const dependency of dependencies) {
                if (dependency.uid !== folderUid) continue
                if (
                    dependency.kind === FolderKind.UserFolder ||
                    dependency.kind === FolderKind.SharedFolder ||
                    dependency.kind === FolderKind.SharedFolderFolder
                ) {
                    return candidateUid
                }
            }
        }
    }

    return null
}

async function listFolderChildrenForCd(
    storage: InMemoryStorage,
    parentUid: string | null
): Promise<ListFolderFolderSimple[]> {
    const result = await listFolder(storage, {
        folderUid: parentUid === null ? undefined : parentUid,
        showFolders: true,
        showRecords: false,
    })
    return result.folders
}

function findChildFolder(
    children: ListFolderFolderSimple[],
    component: string
): ListFolderFolderSimple | undefined {
    const trimmedComponent = component.trim()
    if (!trimmedComponent) return undefined
    const matchByUid = children.find((child) => child.uid === trimmedComponent)
    if (matchByUid) return matchByUid
    const exactNameMatch = children.find((child) => child.name.trim() === trimmedComponent)
    if (exactNameMatch) return exactNameMatch
    const lowerComponent = trimmedComponent.toLowerCase()
    return children.find((child) => child.name.trim().toLowerCase() === lowerComponent)
}

export function splitPathComponents(path: string): string[] {
    const escaped = path.replace(/\/\//g, ESCAPED_SEPARATOR_PLACEHOLDER)
    return escaped.split('/').map((segment) => segment.replace(/\x00/g, '/'))
}

export type TryResolvePathResult = {
    folderUid: string | null
    remaining: string
}

export async function tryResolvePath(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    path: string
): Promise<TryResolvePathResult> {
    const trimmed = path.trim()
    if (!trimmed) {
        return { folderUid: session.currentFolderUid, remaining: '' }
    }

    const direct = getFolderEntryByUid(storage, trimmed)
    if (direct) {
        return { folderUid: direct.uid, remaining: '' }
    }

    const absolute = trimmed.startsWith('/') && !trimmed.startsWith('//')
    const pathToWalk = absolute ? trimmed.slice(1) : trimmed
    const components = splitPathComponents(pathToWalk)

    let folderUid: string | null = absolute ? null : session.currentFolderUid || null

    if (!absolute && folderUid !== null) {
        if (!getFolderEntryByUid(storage, folderUid)) {
            folderUid = null
        }
    }

    let componentIndex = 0
    while (componentIndex < components.length) {
        const component = components[componentIndex]
        componentIndex++

        if (component === '' || component === '.') {
            continue
        }

        if (component === '..') {
            if (folderUid === null) {
                continue
            }
            folderUid = await findParentFolderUid(storage, folderUid)
            continue
        }

        const children = await listFolderChildrenForCd(storage, folderUid)
        const match = findChildFolder(children, component)
        if (match) {
            folderUid = match.uid
        } else {
            const remaining = [component, ...components.slice(componentIndex)].join('/')
            return { folderUid, remaining }
        }
    }

    return { folderUid, remaining: '' }
}

export async function resolveSingleFolder(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    folderName: string
): Promise<ChangeDirectoryResult> {
    const trimmed = folderName.trim()
    if (!trimmed) {
        throw new KeeperSdkError('Folder cannot be empty.', 'folder_required')
    }

    const direct = getFolderEntryByUid(storage, trimmed)
    if (direct) {
        return { folderUid: direct.uid, name: direct.name }
    }

    const { folderUid, remaining } = await tryResolvePath(storage, session, trimmed)
    if (remaining) {
        throw new KeeperSdkError(`Folder "${folderName}" not found`, 'folder_not_found')
    }

    if (folderUid === null) {
        return { folderUid: null, name: VAULT_ROOT_DISPLAY_NAME }
    }

    const entry = getFolderEntryByUid(storage, folderUid)
    if (!entry) {
        throw new KeeperSdkError(`Folder "${folderName}" not found`, 'folder_not_found')
    }
    return { folderUid: entry.uid, name: entry.name }
}

export async function changeDirectory(
    storage: InMemoryStorage,
    session: VaultFolderSession,
    path: string
): Promise<ChangeDirectoryResult> {
    const resolved = await resolveSingleFolder(storage, session, path)
    session.currentFolderUid = resolved.folderUid
    return resolved
}

export function getWorkingFolderDisplayName(storage: InMemoryStorage, currentFolderUid: string | null): string {
    if (currentFolderUid === null) return VAULT_ROOT_DISPLAY_NAME
    const entry = getFolderEntryByUid(storage, currentFolderUid)
    return entry?.name || VAULT_ROOT_DISPLAY_NAME
}

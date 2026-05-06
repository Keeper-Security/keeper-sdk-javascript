import {
    decryptFromStorage,
    decryptObjectFromStorage,
    Enterprise,
    getEnterpriseDataForUserMessage,
    normal64Bytes,
    platform,
    webSafe64FromBytes,
    type Auth,
    type RestCommand,
} from '@keeper-security/keeperapi'
import {isNumber, isString } from '../utils'

const DEFAULT_NODE_PATH_SEPARATOR = '\\'
const MAX_CONTINUATIONS = 50
const LEGACY_ENTERPRISE_DATA_COMMAND = 'get_enterprise_data'
const FALLBACK_CLIENT_VERSIONS = ['c16.4.0', 'c16.0.0']

export enum EnterpriseDataInclude {
    Nodes = 'nodes',
    Users = 'users',
    Roles = 'roles',
    RoleUsers = 'role_users',
    RoleTeams = 'role_teams',
    Teams = 'teams',
    TeamUsers = 'team_users',
}

enum LegacyEnterpriseKeyType {
    EncryptedByDataKey = 1,
    EncryptedByPublicKey = 2,
}

const INCLUDE_TO_ENTITY: Record<EnterpriseDataInclude, Enterprise.EnterpriseDataEntity> = {
    [EnterpriseDataInclude.Nodes]: Enterprise.EnterpriseDataEntity.NODES,
    [EnterpriseDataInclude.Users]: Enterprise.EnterpriseDataEntity.USERS,
    [EnterpriseDataInclude.Roles]: Enterprise.EnterpriseDataEntity.ROLES,
    [EnterpriseDataInclude.RoleUsers]: Enterprise.EnterpriseDataEntity.ROLE_USERS,
    [EnterpriseDataInclude.RoleTeams]: Enterprise.EnterpriseDataEntity.ROLE_TEAMS,
    [EnterpriseDataInclude.Teams]: Enterprise.EnterpriseDataEntity.TEAMS,
    [EnterpriseDataInclude.TeamUsers]: Enterprise.EnterpriseDataEntity.TEAM_USERS,
}

export type EnterpriseNode = {
    node_id: number
    parent_id?: number
    encrypted_data?: string
    displayName?: string
}

export type EnterpriseUser = {
    enterprise_user_id: number
    username: string
    status?: string
    node_id?: number
    encrypted_data?: string
    full_name?: string
    job_title?: string
}

export type EnterpriseRole = {
    role_id: number
    node_id?: number
    encrypted_data?: string
    displayName?: string
}

export type EnterpriseTeamRecord = {
    team_uid: string
    name: string
    node_id: number
    restrict_view?: boolean
    restrict_edit?: boolean
    restrict_share?: boolean
    restrict_sharing?: boolean
    encrypted_data?: string
}

export type EnterpriseTeamUserLink = {
    team_uid: string
    enterprise_user_id: number
    user_type?: string
}

export type EnterpriseRoleUserLink = {
    role_id: number
    enterprise_user_id: number
}

export type EnterpriseRoleTeamLink = {
    role_id: number
    team_uid: string
}

export type GetEnterpriseDataResponse = {
    enterprise_name?: string
    nodes?: EnterpriseNode[]
    users?: EnterpriseUser[]
    roles?: EnterpriseRole[]
    teams?: EnterpriseTeamRecord[]
    team_users?: EnterpriseTeamUserLink[]
    role_users?: EnterpriseRoleUserLink[]
    role_teams?: EnterpriseRoleTeamLink[]
}

export type NodePathOptions = {
    omitRoot?: boolean
    separator?: string
}

export type DecryptedNodeNames = Map<number, string>
export type DecryptedRoleNames = Map<number, string>
export type EnterpriseDisplayNames = {
    nodes: DecryptedNodeNames
    roles: DecryptedRoleNames
}

type LongLike = number | { toNumber: () => number; toString: () => string } | undefined | null

type LegacyEnterpriseDataNode = {
    node_id: number
    parent_id?: number
    encrypted_data?: string
}

type LegacyEnterpriseDataRole = {
    role_id: number
    encrypted_data?: string
}

type LegacyEnterpriseDataResponse = {
    tree_key?: string
    /** See {@link LegacyEnterpriseKeyType}. */
    key_type_id?: LegacyEnterpriseKeyType
    nodes?: LegacyEnterpriseDataNode[]
    roles?: LegacyEnterpriseDataRole[]
}

type EndpointWithVersion = { clientVersion: string }

export function getNodePath(
    nodes: EnterpriseNode[],
    nodeId: number,
    options: NodePathOptions = {}
): string {
    const { omitRoot = true, separator = DEFAULT_NODE_PATH_SEPARATOR } = options
    const byId = new Map<number, EnterpriseNode>()
    for (const node of nodes) byId.set(node.node_id, node)

    const visited = new Set<number>()
    const segments: string[] = []
    let currentId: number | undefined = nodeId
    while (isNumber(currentId) && currentId > 0 && !visited.has(currentId)) {
        visited.add(currentId)
        const node = byId.get(currentId)
        if (!node) break
        const parentId = node.parent_id || 0
        const isRoot = parentId === 0
        if (!isRoot || !omitRoot) {
            const segmentName = (node.displayName || '').trim()
            if (segmentName) segments.push(segmentName)
        }
        currentId = parentId
    }
    segments.reverse()
    return segments.join(separator)
}

function toNumber(value: LongLike): number {
    if (value == null) return 0
    if (isNumber(value)) return value
    if (typeof value.toNumber === 'function') return value.toNumber()
    const parsed = Number(value.toString())
    return Number.isFinite(parsed) ? parsed : 0
}

function toUid(bytes: Uint8Array | null | undefined): string {
    return bytes && bytes.length > 0 ? webSafe64FromBytes(bytes) : ''
}

function decodeChunk<T>(
    chunkData: Uint8Array[] | null | undefined,
    decoder: (bytes: Uint8Array) => T
): T[] {
    if (!chunkData || chunkData.length === 0) return []
    const results: T[] = []
    for (const bytes of chunkData) {
        try {
            results.push(decoder(bytes))
        } catch {
        
        }
    }
    return results
}

function decodeNodeChunk(bytes: Uint8Array): EnterpriseNode {
    const message = Enterprise.Node.decode(bytes)
    const out: EnterpriseNode = { node_id: toNumber(message.nodeId) }
    if (message.parentId != null) out.parent_id = toNumber(message.parentId)
    if (message.encryptedData) out.encrypted_data = message.encryptedData
    return out
}

function decodeUserChunk(bytes: Uint8Array): EnterpriseUser {
    const message = Enterprise.User.decode(bytes)
    const out: EnterpriseUser = {
        enterprise_user_id: toNumber(message.enterpriseUserId),
        username: message.username || '',
    }
    if (message.status) out.status = message.status
    if (message.nodeId != null) out.node_id = toNumber(message.nodeId)
    if (message.encryptedData) out.encrypted_data = message.encryptedData
    if (message.fullName) out.full_name = message.fullName
    if (message.jobTitle) out.job_title = message.jobTitle
    return out
}

function decodeRoleChunk(bytes: Uint8Array): EnterpriseRole {
    const message = Enterprise.Role.decode(bytes)
    const out: EnterpriseRole = { role_id: toNumber(message.roleId) }
    if (message.nodeId != null) out.node_id = toNumber(message.nodeId)
    if (message.encryptedData) out.encrypted_data = message.encryptedData
    return out
}

function decodeTeamChunk(bytes: Uint8Array): EnterpriseTeamRecord {
    const message = Enterprise.Team.decode(bytes)
    const out: EnterpriseTeamRecord = {
        team_uid: toUid(message.teamUid),
        name: message.name || '',
        node_id: toNumber(message.nodeId),
        restrict_view: message.restrictView === true,
        restrict_edit: message.restrictEdit === true,
        restrict_share: message.restrictShare === true,
    }
    if (message.encryptedData) out.encrypted_data = message.encryptedData
    return out
}

function decodeTeamUserChunk(bytes: Uint8Array): EnterpriseTeamUserLink {
    const message = Enterprise.TeamUser.decode(bytes)
    const out: EnterpriseTeamUserLink = {
        team_uid: toUid(message.teamUid),
        enterprise_user_id: toNumber(message.enterpriseUserId),
    }
    if (message.userType) out.user_type = message.userType
    return out
}

function decodeRoleUserChunk(bytes: Uint8Array): EnterpriseRoleUserLink {
    const message = Enterprise.RoleUser.decode(bytes)
    return {
        role_id: toNumber(message.roleId),
        enterprise_user_id: toNumber(message.enterpriseUserId),
    }
}

function decodeRoleTeamChunk(bytes: Uint8Array): EnterpriseRoleTeamLink {
    const message = Enterprise.RoleTeam.decode(bytes)
    return {
        role_id: toNumber(message.roleId),
        team_uid: toUid(message.teamUid),
    }
}

function applyChunk(chunk: Enterprise.IEnterpriseData, target: GetEnterpriseDataResponse): void {
    const entity = chunk.entity ?? Enterprise.EnterpriseDataEntity.UNKNOWN
    const data = chunk.data || []

    switch (entity) {
        case Enterprise.EnterpriseDataEntity.NODES:
            target.nodes = (target.nodes || []).concat(decodeChunk(data, decodeNodeChunk))
            break
        case Enterprise.EnterpriseDataEntity.USERS:
            target.users = (target.users || []).concat(decodeChunk(data, decodeUserChunk))
            break
        case Enterprise.EnterpriseDataEntity.ROLES:
            target.roles = (target.roles || []).concat(decodeChunk(data, decodeRoleChunk))
            break
        case Enterprise.EnterpriseDataEntity.TEAMS:
            target.teams = (target.teams || []).concat(decodeChunk(data, decodeTeamChunk))
            break
        case Enterprise.EnterpriseDataEntity.TEAM_USERS:
            target.team_users = (target.team_users || []).concat(decodeChunk(data, decodeTeamUserChunk))
            break
        case Enterprise.EnterpriseDataEntity.ROLE_USERS:
            target.role_users = (target.role_users || []).concat(decodeChunk(data, decodeRoleUserChunk))
            break
        case Enterprise.EnterpriseDataEntity.ROLE_TEAMS:
            target.role_teams = (target.role_teams || []).concat(decodeChunk(data, decodeRoleTeamChunk))
            break
        default:
            break
    }
}

export async function getEnterpriseData(
    auth: Auth,
    includes: EnterpriseDataInclude[]
): Promise<GetEnterpriseDataResponse> {
    const interesting = new Set<Enterprise.EnterpriseDataEntity>(includes.map((key) => INCLUDE_TO_ENTITY[key]))
    const aggregate: GetEnterpriseDataResponse = {}
    let continuationToken: Uint8Array | undefined

    for (let iteration = 0; iteration < MAX_CONTINUATIONS; iteration += 1) {
        const request: Enterprise.IEnterpriseDataRequest = {}
        if (continuationToken) request.continuationToken = continuationToken

        const response = await auth.executeRest(getEnterpriseDataForUserMessage(request))

        if (response.generalData?.enterpriseName) {
            aggregate.enterprise_name = response.generalData.enterpriseName
        }

        for (const chunk of response.data || []) {
            const entity = chunk.entity ?? Enterprise.EnterpriseDataEntity.UNKNOWN
            if (!interesting.has(entity)) continue
            applyChunk(chunk, aggregate)
        }

        if (!response.hasMore) break
        if (!response.continuationToken || response.continuationToken.length === 0) break
        continuationToken = response.continuationToken
    }

    return aggregate
}

async function fetchLegacyEnterpriseData(auth: Auth): Promise<LegacyEnterpriseDataResponse | null> {
    const endpoint = (auth as unknown as { _endpoint?: EndpointWithVersion })._endpoint
    if (!endpoint || !isString(endpoint.clientVersion)) return null

    const command: RestCommand<{ include: string[] }, LegacyEnterpriseDataResponse> = {
        baseRequest: { command: LEGACY_ENTERPRISE_DATA_COMMAND },
        request: { include: [EnterpriseDataInclude.Nodes, EnterpriseDataInclude.Roles] },
        authorization: {},
    }

    const previousVersion = endpoint.clientVersion
    for (const candidate of FALLBACK_CLIENT_VERSIONS) {
        try {
            endpoint.clientVersion = candidate
            const response = await auth.executeRestCommand(command)
            if (response && (response.tree_key || response.nodes || response.roles)) return response
        } catch {
         
        } finally {
            endpoint.clientVersion = previousVersion
        }
    }
    return null
}

async function decryptTreeKey(response: LegacyEnterpriseDataResponse, auth: Auth): Promise<Uint8Array | null> {
    const treeKey = response.tree_key
    if (!treeKey) return null

    try {
        if (response.key_type_id === LegacyEnterpriseKeyType.EncryptedByDataKey) {
            const dataKey = (auth as unknown as { dataKey?: Uint8Array }).dataKey
            if (!dataKey) return null
            return await decryptFromStorage(treeKey, dataKey)
        }
        
        const privateKey = (auth as unknown as { privateKey?: Uint8Array }).privateKey
        if (!privateKey) return null
        return platform.privateDecrypt(normal64Bytes(treeKey), privateKey)
    } catch {
        return null
    }
}

async function decryptDisplayName(encrypted: string, treeKey: Uint8Array): Promise<string> {
    try {
        const decrypted = await decryptObjectFromStorage<{ displayname?: string }>(encrypted, treeKey)
        return (decrypted?.displayname || '').trim()
    } catch {
        return ''
    }
}

export async function getEnterpriseDisplayNames(auth: Auth): Promise<EnterpriseDisplayNames> {
    const empty: EnterpriseDisplayNames = { nodes: new Map(), roles: new Map() }
    const response = await fetchLegacyEnterpriseData(auth)
    if (!response) return empty

    const treeKey = await decryptTreeKey(response, auth)
    if (!treeKey) return empty

    const nodes: DecryptedNodeNames = new Map()
    for (const node of response.nodes || []) {
        if (!isNumber(node.node_id)) continue
        if (!node.encrypted_data) continue
        const display = await decryptDisplayName(node.encrypted_data, treeKey)
        if (display) nodes.set(node.node_id, display)
    }

    const roles: DecryptedRoleNames = new Map()
    for (const role of response.roles || []) {
        if (!isNumber(role.role_id)) continue
        if (!role.encrypted_data) continue
        const display = await decryptDisplayName(role.encrypted_data, treeKey)
        if (display) roles.set(role.role_id, display)
    }

    return { nodes, roles }
}

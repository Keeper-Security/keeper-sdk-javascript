import {
    decryptObjectFromStorage,
    Enterprise,
    getEnterpriseDataForUserMessage,
    getEnterpriseDataKeysMessage,
    normal64Bytes,
    platform,
    webSafe64FromBytes,
    type Auth,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, isNumber, logger } from '../utils'

const DEFAULT_NODE_PATH_SEPARATOR = '\\'
const MAX_CONTINUATIONS = 50


export enum EnterpriseDataInclude {
    Nodes = 'nodes',
    Users = 'users',
    Roles = 'roles',
    RoleUsers = 'role_users',
    RoleTeams = 'role_teams',
    Teams = 'teams',
    TeamUsers = 'team_users',
    QueuedTeams = 'queued_teams',
}

const INCLUDE_TO_ENTITY: Record<EnterpriseDataInclude, Enterprise.EnterpriseDataEntity> = {
    [EnterpriseDataInclude.Nodes]: Enterprise.EnterpriseDataEntity.NODES,
    [EnterpriseDataInclude.Users]: Enterprise.EnterpriseDataEntity.USERS,
    [EnterpriseDataInclude.Roles]: Enterprise.EnterpriseDataEntity.ROLES,
    [EnterpriseDataInclude.RoleUsers]: Enterprise.EnterpriseDataEntity.ROLE_USERS,
    [EnterpriseDataInclude.RoleTeams]: Enterprise.EnterpriseDataEntity.ROLE_TEAMS,
    [EnterpriseDataInclude.Teams]: Enterprise.EnterpriseDataEntity.TEAMS,
    [EnterpriseDataInclude.TeamUsers]: Enterprise.EnterpriseDataEntity.TEAM_USERS,
    [EnterpriseDataInclude.QueuedTeams]: Enterprise.EnterpriseDataEntity.QUEUED_TEAMS,
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

export type EnterpriseQueuedTeamRecord = {
    team_uid: string
    name: string
    node_id: number
    encrypted_data?: string
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
    queued_teams?: EnterpriseQueuedTeamRecord[]
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

export interface EnterpriseDataManagerApi {
    getData(includes: EnterpriseDataInclude[]): Promise<GetEnterpriseDataResponse>
    getDisplayNames(): Promise<EnterpriseDisplayNames>
    getTreeKey(): Promise<Uint8Array | null>
    decryptNodeNames(nodes: EnterpriseNode[]): Promise<number>
    clearCache(): void
}

export class EnterpriseDataManager implements EnterpriseDataManagerApi {
    private readonly auth: Auth
    private displayNamesPromise: Promise<EnterpriseDisplayNames> | null = null
    private treeKeyPromise: Promise<Uint8Array | null> | null = null
    private readonly dataCache = new Map<string, Promise<GetEnterpriseDataResponse>>()

    constructor(auth: Auth) {
        this.auth = auth
    }

    public async getData(includes: EnterpriseDataInclude[]): Promise<GetEnterpriseDataResponse> {
        const key = EnterpriseDataManager.cacheKeyForIncludes(includes)
        let promise = this.dataCache.get(key)
        if (!promise) {
            promise = this.fetchEnterpriseData(includes)
            this.dataCache.set(key, promise)
        }
        return promise
    }

    public async getDisplayNames(): Promise<EnterpriseDisplayNames> {
        if (!this.displayNamesPromise) {
            this.displayNamesPromise = this.fetchDisplayNames()
        }
        return this.displayNamesPromise
    }

    public async decryptNodeNames(nodes: EnterpriseNode[]): Promise<number> {
        if (!nodes || nodes.length === 0) return 0

        const needsDecrypt = nodes.some(
            (node) => !!node.encrypted_data && !(node.displayName || '').trim()
        )
        if (!needsDecrypt) return 0

        const displayNames = await this.getDisplayNames()
        if (displayNames.nodes.size > 0) {
            for (const node of nodes) {
                if ((node.displayName || '').trim()) continue
                const cached = displayNames.nodes.get(node.node_id)
                if (cached) node.displayName = cached
            }
        }

        const treeKey = await this.getTreeKey()
        if (!treeKey) {
            logger.warn(
                'Enterprise node names unavailable: could not decrypt enterprise tree key. ' +
                    'Use numeric node IDs (visible in error listings).'
            )
            return 0
        }

        let decryptedCount = 0
        for (const node of nodes) {
            if ((node.displayName || '').trim()) continue
            if (!node.encrypted_data) continue
            const display = await EnterpriseDataManager.decryptDisplayName(node.encrypted_data, treeKey)
            if (display) {
                node.displayName = display
                decryptedCount++
            }
        }
        if (decryptedCount > 0) {
            logger.debug(`Decrypted ${decryptedCount} enterprise node name(s) using tree key.`)
        }
        return decryptedCount
    }

    public clearCache(): void {
        this.dataCache.clear()
        this.displayNamesPromise = null
        this.treeKeyPromise = null
    }

    public static getNodePath(
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

    private static cacheKeyForIncludes(includes: EnterpriseDataInclude[]): string {
        return [...includes].sort().join(',')
    }

    private async fetchEnterpriseData(
        includes: EnterpriseDataInclude[]
    ): Promise<GetEnterpriseDataResponse> {
        const interesting = new Set<Enterprise.EnterpriseDataEntity>(
            includes.map((key) => INCLUDE_TO_ENTITY[key])
        )
        const aggregate: GetEnterpriseDataResponse = {}
        let continuationToken: Uint8Array | undefined

        for (let iteration = 0; iteration < MAX_CONTINUATIONS; iteration += 1) {
            const request: Enterprise.IEnterpriseDataRequest = {}
            if (continuationToken) request.continuationToken = continuationToken

            const response = await this.auth.executeRest(getEnterpriseDataForUserMessage(request))

            if (response.generalData?.enterpriseName) {
                aggregate.enterprise_name = response.generalData.enterpriseName
            }

            for (const chunk of response.data || []) {
                const entity = chunk.entity ?? Enterprise.EnterpriseDataEntity.UNKNOWN
                if (!interesting.has(entity)) continue
                EnterpriseDataManager.applyChunk(chunk, aggregate)
            }

            if (!response.hasMore) break
            if (!response.continuationToken || response.continuationToken.length === 0) break
            continuationToken = response.continuationToken
        }

        return aggregate
    }

    private async fetchDisplayNames(): Promise<EnterpriseDisplayNames> {
        const empty: EnterpriseDisplayNames = { nodes: new Map(), roles: new Map() }

        const treeKey = await this.getTreeKey()
        if (!treeKey) return empty

        const data = await this.getData([EnterpriseDataInclude.Nodes, EnterpriseDataInclude.Roles])

        const nodes: DecryptedNodeNames = new Map()
        for (const node of data.nodes || []) {
            if (!isNumber(node.node_id)) continue
            if (!node.encrypted_data) continue
            const display = await EnterpriseDataManager.decryptDisplayName(node.encrypted_data, treeKey)
            if (display) nodes.set(node.node_id, display)
        }

        const roles: DecryptedRoleNames = new Map()
        for (const role of data.roles || []) {
            if (!isNumber(role.role_id)) continue
            if (!role.encrypted_data) continue
            const display = await EnterpriseDataManager.decryptDisplayName(role.encrypted_data, treeKey)
            if (display) roles.set(role.role_id, display)
        }

        return { nodes, roles }
    }

    public async getTreeKey(): Promise<Uint8Array | null> {
        if (!this.treeKeyPromise) {
            this.treeKeyPromise = this.fetchAndDecryptTreeKey()
        }
        return this.treeKeyPromise
    }

    private async fetchAndDecryptTreeKey(): Promise<Uint8Array | null> {
        let response: Enterprise.IGetEnterpriseDataKeysResponse
        try {
            response = await this.auth.executeRest(getEnterpriseDataKeysMessage())
        } catch (err) {
            logger.debug(`enterprise/get_enterprise_data_keys failed: ${extractErrorMessage(err)}`)
            return null
        }

        const treeKey = response.treeKey
        if (!treeKey || !treeKey.treeKey) {
            logger.debug(
                `enterprise/get_enterprise_data_keys: no tree key returned (user is likely not an enterprise admin)`
            )
            return null
        }

        return this.decryptTreeKey(treeKey)
    }

    private async decryptTreeKey(treeKey: Enterprise.ITreeKey): Promise<Uint8Array | null> {
        if (!treeKey.treeKey) return null
        const encrypted = normal64Bytes(treeKey.treeKey)
        const keyType = (treeKey.keyTypeId ?? 0) as Enterprise.BackupKeyType

        try {
            switch (keyType) {
                case Enterprise.BackupKeyType.ENCRYPTED_BY_DATA_KEY: {
                    if (!this.auth.dataKey) return null
                    return await platform.aesCbcDecrypt(encrypted, this.auth.dataKey, true)
                }
                case Enterprise.BackupKeyType.ENCRYPTED_BY_DATA_KEY_GCM: {
                    if (!this.auth.dataKey) return null
                    return await platform.aesGcmDecrypt(encrypted, this.auth.dataKey)
                }
                case Enterprise.BackupKeyType.ENCRYPTED_BY_PUBLIC_KEY: {
                    if (!this.auth.privateKey) return null
                    return platform.privateDecrypt(encrypted, this.auth.privateKey)
                }
                case Enterprise.BackupKeyType.ENCRYPTED_BY_PUBLIC_KEY_ECC: {
                    if (!this.auth.eccPrivateKey) return null
                    return await platform.privateDecryptEC(encrypted, this.auth.eccPrivateKey)
                }
                default:
                    logger.debug(`Unsupported tree-key keyTypeId=${keyType}`)
                    return null
            }
        } catch (err) {
            logger.debug(
                `Tree-key decryption failed (keyTypeId=${keyType}): ${extractErrorMessage(err)}`
            )
            return null
        }
    }

    private static async decryptDisplayName(encrypted: string, treeKey: Uint8Array): Promise<string> {
        try {
            const decrypted = await decryptObjectFromStorage<{ displayname?: string }>(encrypted, treeKey)
            return (decrypted?.displayname || '').trim()
        } catch {
            return ''
        }
    }

    private static toNumber(value: LongLike): number {
        if (value == null) return 0
        if (isNumber(value)) return value
        if (typeof value.toNumber === 'function') return value.toNumber()
        const parsed = Number(value.toString())
        return Number.isFinite(parsed) ? parsed : 0
    }

    private static toUid(bytes: Uint8Array | null | undefined): string {
        return bytes && bytes.length > 0 ? webSafe64FromBytes(bytes) : ''
    }

    private static decodeChunk<T>(
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

    private static decodeNodeChunk(bytes: Uint8Array): EnterpriseNode {
        const message = Enterprise.Node.decode(bytes)
        const out: EnterpriseNode = { node_id: EnterpriseDataManager.toNumber(message.nodeId) }
        if (message.parentId != null) out.parent_id = EnterpriseDataManager.toNumber(message.parentId)
        if (message.encryptedData) out.encrypted_data = message.encryptedData
        return out
    }

    private static decodeUserChunk(bytes: Uint8Array): EnterpriseUser {
        const message = Enterprise.User.decode(bytes)
        const out: EnterpriseUser = {
            enterprise_user_id: EnterpriseDataManager.toNumber(message.enterpriseUserId),
            username: message.username || '',
        }
        if (message.status) out.status = message.status
        if (message.nodeId != null) out.node_id = EnterpriseDataManager.toNumber(message.nodeId)
        if (message.encryptedData) out.encrypted_data = message.encryptedData
        if (message.fullName) out.full_name = message.fullName
        if (message.jobTitle) out.job_title = message.jobTitle
        return out
    }

    private static decodeRoleChunk(bytes: Uint8Array): EnterpriseRole {
        const message = Enterprise.Role.decode(bytes)
        const out: EnterpriseRole = { role_id: EnterpriseDataManager.toNumber(message.roleId) }
        if (message.nodeId != null) out.node_id = EnterpriseDataManager.toNumber(message.nodeId)
        if (message.encryptedData) out.encrypted_data = message.encryptedData
        return out
    }

    private static decodeTeamChunk(bytes: Uint8Array): EnterpriseTeamRecord {
        const message = Enterprise.Team.decode(bytes)
        const out: EnterpriseTeamRecord = {
            team_uid: EnterpriseDataManager.toUid(message.teamUid),
            name: message.name || '',
            node_id: EnterpriseDataManager.toNumber(message.nodeId),
            restrict_view: message.restrictView === true,
            restrict_edit: message.restrictEdit === true,
            restrict_share: message.restrictShare === true,
        }
        if (message.encryptedData) out.encrypted_data = message.encryptedData
        return out
    }

    private static decodeTeamUserChunk(bytes: Uint8Array): EnterpriseTeamUserLink {
        const message = Enterprise.TeamUser.decode(bytes)
        const out: EnterpriseTeamUserLink = {
            team_uid: EnterpriseDataManager.toUid(message.teamUid),
            enterprise_user_id: EnterpriseDataManager.toNumber(message.enterpriseUserId),
        }
        if (message.userType) out.user_type = message.userType
        return out
    }

    private static decodeRoleUserChunk(bytes: Uint8Array): EnterpriseRoleUserLink {
        const message = Enterprise.RoleUser.decode(bytes)
        return {
            role_id: EnterpriseDataManager.toNumber(message.roleId),
            enterprise_user_id: EnterpriseDataManager.toNumber(message.enterpriseUserId),
        }
    }

    private static decodeRoleTeamChunk(bytes: Uint8Array): EnterpriseRoleTeamLink {
        const message = Enterprise.RoleTeam.decode(bytes)
        return {
            role_id: EnterpriseDataManager.toNumber(message.roleId),
            team_uid: EnterpriseDataManager.toUid(message.teamUid),
        }
    }

    private static applyChunk(
        chunk: Enterprise.IEnterpriseData,
        target: GetEnterpriseDataResponse
    ): void {
        const entity = chunk.entity ?? Enterprise.EnterpriseDataEntity.UNKNOWN
        const data = chunk.data || []

        switch (entity) {
            case Enterprise.EnterpriseDataEntity.NODES:
                target.nodes = (target.nodes || []).concat(
                    EnterpriseDataManager.decodeChunk(data, EnterpriseDataManager.decodeNodeChunk)
                )
                break
            case Enterprise.EnterpriseDataEntity.USERS:
                target.users = (target.users || []).concat(
                    EnterpriseDataManager.decodeChunk(data, EnterpriseDataManager.decodeUserChunk)
                )
                break
            case Enterprise.EnterpriseDataEntity.ROLES:
                target.roles = (target.roles || []).concat(
                    EnterpriseDataManager.decodeChunk(data, EnterpriseDataManager.decodeRoleChunk)
                )
                break
            case Enterprise.EnterpriseDataEntity.TEAMS:
                target.teams = (target.teams || []).concat(
                    EnterpriseDataManager.decodeChunk(data, EnterpriseDataManager.decodeTeamChunk)
                )
                break
            case Enterprise.EnterpriseDataEntity.TEAM_USERS:
                target.team_users = (target.team_users || []).concat(
                    EnterpriseDataManager.decodeChunk(data, EnterpriseDataManager.decodeTeamUserChunk)
                )
                break
            case Enterprise.EnterpriseDataEntity.ROLE_USERS:
                target.role_users = (target.role_users || []).concat(
                    EnterpriseDataManager.decodeChunk(data, EnterpriseDataManager.decodeRoleUserChunk)
                )
                break
            case Enterprise.EnterpriseDataEntity.ROLE_TEAMS:
                target.role_teams = (target.role_teams || []).concat(
                    EnterpriseDataManager.decodeChunk(data, EnterpriseDataManager.decodeRoleTeamChunk)
                )
                break
            default:
                break
        }
    }
}
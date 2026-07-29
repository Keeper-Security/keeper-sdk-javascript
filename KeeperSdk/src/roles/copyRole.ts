import {
    createInMessage,
    encryptObjectForStorage,
    Enterprise,
    enterpriseAllocateIdsCommand,
    normal64Bytes,
    roleAddCommand,
    roleEnforcementAddCommand,
    roleUserAddCommand,
    type Auth,
    type RoleEditRequest,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import { EnterpriseDataInclude, EnterpriseDataManager } from '../teams/enterpriseData'
import {
    applyDecryptedNodeNames,
    applyEnterpriseNameToRoot,
    parentNeedsNameLookup,
    resolveParentNode,
} from '../teams/teamUtils'
import {
    applyDecryptedRoleNames,
    assertCommandSucceeded,
    nodePathOrFallback,
    resolveExistingRoles,
    validateRoleName,
} from './roleUtils'

const COPY_ROLE_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.RoleEnforcements,
    EnterpriseDataInclude.RoleUsers,
    EnterpriseDataInclude.RoleTeams,
]

export type CopyRoleInput = {
    source: string
    name?: string
    parent?: string | number | null
    clone?: boolean
}

export type CopyRoleResult = {
    success: boolean
    sourceRoleId: number
    sourceRoleName: string
    newRoleId: number
    newRoleName: string
    nodeId: number
    nodeName: string
    enforcementsCopied: number
    enforcementsFailed: number
    usersCopied: number
    usersFailed: number
    teamsCopied: number
    teamsFailed: number
    message?: string
}

export type FormattedCopyRoleTable = {
    rows: Array<{ label: string; value: string }>
}

export async function copyRoles(auth: Auth, input: CopyRoleInput): Promise<CopyRoleResult> {
    const sourceIdentifier = (input.source ?? '').trim()
    if (!sourceIdentifier) {
        throw new KeeperSdkError('Source role is required.', ResultCodes.ROLE_SOURCE_REQUIRED)
    }

    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(COPY_ROLE_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])

    const nodes = response.nodes || []
    applyDecryptedNodeNames(nodes, displayNames.nodes)
    applyEnterpriseNameToRoot(nodes, response.enterprise_name)
    if (parentNeedsNameLookup(input.parent ?? null)) await enterpriseData.decryptNodeNames(nodes)

    const roles = response.roles || []
    applyDecryptedRoleNames(roles, displayNames.roles)
    const [sourceRole] = resolveExistingRoles(roles, [sourceIdentifier])
    const sourceRoleName = (sourceRole.displayName || '').trim() || String(sourceRole.role_id)

    const targetNode =
        input.parent !== undefined && input.parent !== null && input.parent !== ''
            ? resolveParentNode(nodes, input.parent)
            : resolveParentNode(nodes, sourceRole.node_id ?? null)
    const nodeName = nodePathOrFallback(nodes, targetNode)

    const newName = (input.name || `${sourceRoleName} Copy`).trim()
    validateRoleName(newName)

    const treeKey = await enterpriseData.getTreeKey()
    if (!treeKey) {
        throw new KeeperSdkError(
            'Enterprise tree key is unavailable. The current user may not have permission to administer roles.',
            ResultCodes.ENTERPRISE_TREE_KEY_UNAVAILABLE
        )
    }

    const newRoleId = await allocateRoleId(auth)
    const encryptedData = await encryptObjectForStorage({ displayname: newName }, treeKey)

    try {
        await sendRoleAdd(auth, {
            role_id: newRoleId,
            node_id: targetNode.node_id,
            encrypted_data: encryptedData,
            visible_below: sourceRole.visible_below ?? false,
            new_user_inherit: sourceRole.new_user_inherit ?? false,
        })
    } catch (err) {
        return {
            success: false,
            sourceRoleId: sourceRole.role_id,
            sourceRoleName,
            newRoleId,
            newRoleName: newName,
            nodeId: targetNode.node_id,
            nodeName,
            enforcementsCopied: 0,
            enforcementsFailed: 0,
            usersCopied: 0,
            usersFailed: 0,
            teamsCopied: 0,
            teamsFailed: 0,
            message: extractErrorMessage(err),
        }
    }

    const { copied: enforcementsCopied, failed: enforcementsFailed } = await copyEnforcements(
        auth,
        sourceRole.role_id,
        newRoleId,
        response.role_enforcements || []
    )

    let usersCopied = 0
    let usersFailed = 0
    let teamsCopied = 0
    let teamsFailed = 0

    if (input.clone === true) {
        const userResult = await copyRoleUsers(auth, sourceRole.role_id, newRoleId, response.role_users || [])
        usersCopied = userResult.copied
        usersFailed = userResult.failed

        const teamResult = await copyRoleTeams(
            auth,
            newRoleId,
            (response.role_teams || [])
                .filter((link) => link.role_id === sourceRole.role_id)
                .map((link) => link.team_uid)
        )
        teamsCopied = teamResult.copied
        teamsFailed = teamResult.failed
    }

    const partialFailed = enforcementsFailed > 0 || usersFailed > 0 || teamsFailed > 0
    return {
        success: !partialFailed,
        sourceRoleId: sourceRole.role_id,
        sourceRoleName,
        newRoleId,
        newRoleName: newName,
        nodeId: targetNode.node_id,
        nodeName,
        enforcementsCopied,
        enforcementsFailed,
        usersCopied,
        usersFailed,
        teamsCopied,
        teamsFailed,
        message: partialFailed
            ? 'Role created, but some enforcements, users, and/or teams failed to copy.'
            : undefined,
    }
}

export function formatCopyRoleResult(result: CopyRoleResult): FormattedCopyRoleTable {
    const rows: Array<{ label: string; value: string }> = [
        { label: 'Source Role', value: `${result.sourceRoleName} (${result.sourceRoleId})` },
        { label: 'New Role', value: `${result.newRoleName} (${result.newRoleId})` },
        { label: 'Node', value: `${result.nodeName} (${result.nodeId})` },
        { label: 'Status', value: result.success ? 'success' : 'failed' },
        {
            label: 'Enforcements Copied',
            value: `${result.enforcementsCopied} (failed: ${result.enforcementsFailed})`,
        },
    ]
    if (result.usersCopied > 0 || result.usersFailed > 0) {
        rows.push({
            label: 'Users Copied',
            value: `${result.usersCopied} (failed: ${result.usersFailed})`,
        })
    }
    if (result.teamsCopied > 0 || result.teamsFailed > 0) {
        rows.push({
            label: 'Teams Copied',
            value: `${result.teamsCopied} (failed: ${result.teamsFailed})`,
        })
    }
    if (result.message) rows.push({ label: 'Detail', value: result.message })
    return { rows }
}

export function renderCopyRoleAsciiTable(table: FormattedCopyRoleTable): string {
    const labelWidth = Math.max(...table.rows.map((r) => r.label.length))
    return table.rows.map((row) => `${row.label.padEnd(labelWidth)}  ${row.value}`).join('\n')
}

async function allocateRoleId(auth: Auth): Promise<number> {
    const response = await auth.executeRestCommand(enterpriseAllocateIdsCommand({ number_requested: 1 }))
    if (!response.base_id) {
        throw new KeeperSdkError(
            'Failed to allocate enterprise ID for new role.',
            ResultCodes.ROLE_ID_ALLOCATION_FAILED
        )
    }
    return response.base_id
}

async function sendRoleAdd(auth: Auth, payload: RoleEditRequest): Promise<void> {
    const response = await auth.executeRestCommand(roleAddCommand(payload))
    assertCommandSucceeded(response, `role_add failed for role_id=${payload.role_id}`, ResultCodes.ROLE_ADD_FAILED)
}

async function copyEnforcements(
    auth: Auth,
    sourceRoleId: number,
    newRoleId: number,
    links: ReadonlyArray<{ role_id: number; enforcement_type: string; value?: string }>
): Promise<{ copied: number; failed: number }> {
    let copied = 0
    let failed = 0
    for (const link of links) {
        if (link.role_id !== sourceRoleId) continue
        try {
            const response = await auth.executeRestCommand(
                roleEnforcementAddCommand({
                    role_id: newRoleId,
                    enforcement: link.enforcement_type,
                    value: link.value,
                })
            )
            assertCommandSucceeded(
                response,
                `role_enforcement_add failed for ${link.enforcement_type}`,
                ResultCodes.ROLE_ENFORCEMENT_FAILED
            )
            copied++
        } catch {
            failed++
        }
    }
    return { copied, failed }
}

async function copyRoleUsers(
    auth: Auth,
    sourceRoleId: number,
    newRoleId: number,
    links: ReadonlyArray<{ role_id: number; enterprise_user_id: number }>
): Promise<{ copied: number; failed: number }> {
    let copied = 0
    let failed = 0
    for (const link of links) {
        if (link.role_id !== sourceRoleId) continue
        try {
            const response = await auth.executeRestCommand(
                roleUserAddCommand({
                    role_id: newRoleId,
                    enterprise_user_id: link.enterprise_user_id,
                })
            )
            assertCommandSucceeded(
                response,
                `role_user_add failed for enterprise_user_id=${link.enterprise_user_id}`,
                ResultCodes.ROLE_USER_ADD_FAILED
            )
            copied++
        } catch {
            failed++
        }
    }
    return { copied, failed }
}

async function copyRoleTeams(
    auth: Auth,
    newRoleId: number,
    teamUids: string[]
): Promise<{ copied: number; failed: number }> {
    if (teamUids.length === 0) return { copied: 0, failed: 0 }
    try {
        const payload = Enterprise.RoleTeams.create({
            roleTeam: teamUids.map((teamUid) =>
                Enterprise.RoleTeam.create({
                    roleId: newRoleId,
                    teamUid: normal64Bytes(teamUid),
                })
            ),
        })
        const message = createInMessage(payload, 'enterprise/role_team_add', Enterprise.RoleTeams)
        await auth.executeRestAction(message)
        return { copied: teamUids.length, failed: 0 }
    } catch {
        return { copied: 0, failed: teamUids.length }
    }
}

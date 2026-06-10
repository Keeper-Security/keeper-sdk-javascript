import type { Auth } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseDisplayNames,
    type EnterpriseNode,
    type EnterpriseRole,
    type EnterpriseRoleEnforcementLink,
    type EnterpriseRoleManagedNodeLink,
    type EnterpriseRolePrivilegeLink,
    type EnterpriseRoleTeamLink,
    type EnterpriseRoleUserLink,
    type EnterpriseTeamRecord,
    type EnterpriseUser,
} from '../teams/enterpriseData'

const NODE_PATH_SEPARATOR = '\\'

const VIEW_ROLE_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.Nodes,
    EnterpriseDataInclude.Teams,
    EnterpriseDataInclude.Users,
    EnterpriseDataInclude.RoleUsers,
    EnterpriseDataInclude.RoleTeams,
    EnterpriseDataInclude.RolePrivileges,
    EnterpriseDataInclude.ManagedNodes,
    EnterpriseDataInclude.RoleEnforcements,
]

export type RoleTeamInfo = {
    team_uid: string
    team_name: string
}

export type RoleUserInfo = {
    enterprise_user_id: number
    username: string
}

export type RoleManagedNodeInfo = {
    node_id: number
    node_name: string
    cascade: boolean
    privileges: string[]
}

export type RoleEnforcementInfo = {
    name: string
    value: string
}

export type RoleView = {
    role_id: number
    role_name: string
    node_id: number
    node_name: string
    default_role: boolean
    visible_below: boolean
    role_teams?: RoleTeamInfo[]
    role_users?: RoleUserInfo[]
    managed_nodes?: RoleManagedNodeInfo[]
    role_enforcements: RoleEnforcementInfo[]
}

export type FormatRoleViewOptions = {
    verbose?: boolean
}

export type RoleViewTableRow = {
    label: string
    value: string | string[]
    id?: number | number[]
}

export type FormattedRoleViewTable = {
    mainRows: RoleViewTableRow[]
    enforcementRows: RoleEnforcementInfo[]
    managedNodeTable: FormattedManagedNodePrivilegeTable | null
    hasIdColumn: boolean
}

export type FormattedManagedNodePrivilegeTable = {
    nodeHeaders: string[]
    privilegeRows: Array<{ privilege: string; granted: boolean[] }>
    cascadeRow: boolean[]
}

export async function viewRole(auth: Auth, identifier: string): Promise<RoleView> {
    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(VIEW_ROLE_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])

    const role = resolveRole(response.roles || [], displayNames.roles, identifier)
    const nodePath = resolveNodePath(response.nodes || [], displayNames, role.node_id ?? 0)

    const roleTeams = buildRoleTeams(response.role_teams || [], response.teams || [], role.role_id)
    const roleUsers = buildRoleUsers(response.role_users || [], response.users || [], role.role_id)
    const managedNodes = buildManagedNodes(
        response.managed_nodes || [],
        response.role_privileges || [],
        response.nodes || [],
        displayNames,
        role.role_id,
        response.enterprise_name
    )
    const enforcements = buildEnforcements(response.role_enforcements || [], role.role_id)

    const view: RoleView = {
        role_id: role.role_id,
        role_name: (role.displayName || '').trim() || String(role.role_id),
        node_id: role.node_id ?? 0,
        node_name: nodePath,
        default_role: role.new_user_inherit ?? false,
        visible_below: role.visible_below ?? false,
        role_enforcements: enforcements,
    }
    if (roleTeams.length > 0) view.role_teams = roleTeams
    if (roleUsers.length > 0) view.role_users = roleUsers
    if (managedNodes.length > 0) view.managed_nodes = managedNodes

    return view
}

export function formatRoleView(
    view: RoleView,
    options: FormatRoleViewOptions = {}
): FormattedRoleViewTable {
    const verbose = options.verbose === true

    const mainRows: RoleViewTableRow[] = [
        { label: 'Role ID', value: String(view.role_id) },
        { label: 'Role Name', value: view.role_name },
        {
            label: 'Node Name',
            value: view.node_name,
            id: verbose ? view.node_id : undefined,
        },
        { label: 'Default Role', value: boolText(view.default_role) },
        { label: 'Visible Below', value: boolText(view.visible_below) },
    ]

    if (view.role_users && view.role_users.length > 0) {
        mainRows.push({
            label: 'User(s)',
            value: view.role_users.map((u) => u.username),
            id: verbose ? view.role_users.map((u) => u.enterprise_user_id) : undefined,
        })
    }

    if (view.role_teams && view.role_teams.length > 0) {
        mainRows.push({
            label: 'Team(s)',
            value: view.role_teams.map((t) => t.team_name),
        })
    }

    const managedNodeTable = buildFormattedManagedNodeTable(view.managed_nodes ?? [])

    return {
        mainRows,
        enforcementRows: view.role_enforcements,
        managedNodeTable,
        hasIdColumn: verbose,
    }
}

export function roleViewTable(table: FormattedRoleViewTable): string {
    const sections: string[] = []

    sections.push(renderMainSection(table))

    sections.push(renderEnforcementsSection(table.enforcementRows))

    if (table.managedNodeTable) {
        sections.push(renderManagedNodesSection(table.managedNodeTable))
    }

    return sections.join('\n\n')
}

function resolveRole(
    roles: EnterpriseRole[],
    decryptedNames: Map<number, string>,
    identifier: string
): EnterpriseRole {
    const trimmed = (identifier ?? '').trim()
    if (!trimmed) {
        throw new KeeperSdkError('Role name or ID is required.', ResultCodes.ROLE_REQUIRED)
    }

    for (const role of roles) {
        const display = decryptedNames.get(role.role_id)
        if (display) role.displayName = display
    }

    const numeric = Number(trimmed)
    if (Number.isFinite(numeric) && Number.isInteger(numeric)) {
        const byId = roles.find((r) => r.role_id === numeric)
        if (byId) return byId
    }

    const lowered = trimmed.toLowerCase()
    const nameMatches = roles.filter(
        (r) => (r.displayName || '').trim().toLowerCase() === lowered
    )
    if (nameMatches.length === 1) return nameMatches[0]
    if (nameMatches.length > 1) {
        throw new KeeperSdkError(
            `Multiple roles match name "${trimmed}". Specify the role ID instead.`,
            ResultCodes.MULTIPLE_ROLE_MATCHES
        )
    }
    throw new KeeperSdkError(`Role "${trimmed}" does not exist.`, ResultCodes.ROLE_NOT_FOUND)
}

function resolveNodePath(
    nodes: EnterpriseNode[],
    displayNames: EnterpriseDisplayNames,
    nodeId: number
): string {
    for (const node of nodes) {
        const display = displayNames.nodes.get(node.node_id)
        if (display) node.displayName = display
    }
    return EnterpriseDataManager.getNodePath(nodes, nodeId, {
        omitRoot: false,
        separator: NODE_PATH_SEPARATOR,
    })
}

function buildRoleTeams(
    roleTeamLinks: EnterpriseRoleTeamLink[],
    teams: EnterpriseTeamRecord[],
    roleId: number
): RoleTeamInfo[] {
    const teamByUid = new Map<string, EnterpriseTeamRecord>()
    for (const team of teams) teamByUid.set(team.team_uid, team)

    const result: RoleTeamInfo[] = []
    for (const link of roleTeamLinks) {
        if (link.role_id !== roleId) continue
        const team = teamByUid.get(link.team_uid)
        if (team) result.push({ team_uid: team.team_uid, team_name: (team.name || team.team_uid).trim() })
    }
    result.sort((a, b) => a.team_name.localeCompare(b.team_name, undefined, { sensitivity: 'base' }))
    return result
}

function buildRoleUsers(
    roleUserLinks: EnterpriseRoleUserLink[],
    users: EnterpriseUser[],
    roleId: number
): RoleUserInfo[] {
    const userById = new Map<number, EnterpriseUser>()
    for (const user of users) userById.set(user.enterprise_user_id, user)

    const result: RoleUserInfo[] = []
    for (const link of roleUserLinks) {
        if (link.role_id !== roleId) continue
        const user = userById.get(link.enterprise_user_id)
        if (user?.username) {
            result.push({ enterprise_user_id: link.enterprise_user_id, username: user.username })
        }
    }
    result.sort((a, b) => a.username.localeCompare(b.username, undefined, { sensitivity: 'base' }))
    return result
}

function buildManagedNodes(
    managedNodeLinks: EnterpriseRoleManagedNodeLink[],
    privileges: EnterpriseRolePrivilegeLink[],
    nodes: EnterpriseNode[],
    displayNames: EnterpriseDisplayNames,
    roleId: number,
    enterpriseName?: string
): RoleManagedNodeInfo[] {
    const nodeById = new Map<number, EnterpriseNode>()
    for (const node of nodes) {
        const display = displayNames.nodes.get(node.node_id)
        if (display) node.displayName = display
        nodeById.set(node.node_id, node)
    }

    const privilegesByNode = new Map<number, string[]>()
    for (const p of privileges) {
        if (p.role_id !== roleId || !p.privilege_type) continue
        const list = privilegesByNode.get(p.managed_node_id)
        if (list) list.push(p.privilege_type)
        else privilegesByNode.set(p.managed_node_id, [p.privilege_type])
    }

    const result: RoleManagedNodeInfo[] = []
    for (const link of managedNodeLinks) {
        if (link.role_id !== roleId) continue
        const node = nodeById.get(link.managed_node_id)
        let nodeName = (node?.displayName || '').trim()
        if (!nodeName && node && !node.parent_id && enterpriseName) nodeName = enterpriseName
        if (!nodeName) nodeName = String(link.managed_node_id)
        const nodePrivileges = (privilegesByNode.get(link.managed_node_id) ?? []).sort()
        result.push({
            node_id: link.managed_node_id,
            node_name: nodeName,
            cascade: link.cascade_node_management,
            privileges: nodePrivileges,
        })
    }
    result.sort((a, b) => a.node_name.localeCompare(b.node_name, undefined, { sensitivity: 'base' }))
    return result
}

function buildEnforcements(
    links: EnterpriseRoleEnforcementLink[],
    roleId: number
): RoleEnforcementInfo[] {
    const result: RoleEnforcementInfo[] = []
    for (const link of links) {
        if (link.role_id !== roleId || !link.value) continue
        result.push({ name: link.enforcement_type, value: link.value })
    }
    result.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
    return result
}

function buildFormattedManagedNodeTable(
    managedNodes: RoleManagedNodeInfo[]
): FormattedManagedNodePrivilegeTable | null {
    if (managedNodes.length === 0) return null

    const allPrivileges = new Set<string>()
    for (const mn of managedNodes) {
        for (const p of mn.privileges) allPrivileges.add(p)
    }

    const privileges = [...allPrivileges].sort()
    const privilegeRows = privileges.map((privilege) => ({
        privilege,
        granted: managedNodes.map((mn) => mn.privileges.includes(privilege)),
    }))

    return {
        nodeHeaders: managedNodes.map((mn) => mn.node_name),
        privilegeRows,
        cascadeRow: managedNodes.map((mn) => mn.cascade),
    }
}

function renderMainSection(table: FormattedRoleViewTable): string {
    const { mainRows, hasIdColumn } = table

    const labelWidth = mainRows.reduce((max, row) => Math.max(max, row.label.length), 0)
    const expandedRows = mainRows.map((row) => ({
        label: row.label,
        valueLines: asLines(row.value),
        idLines: hasIdColumn ? asIdLines(row.id) : [],
    }))

    const valueWidth = expandedRows.reduce(
        (max, row) => Math.max(max, ...row.valueLines.map((l) => l.length)),
        0
    )
    const idWidth = hasIdColumn
        ? expandedRows.reduce((max, row) => Math.max(max, ...row.idLines.map((l) => l.length)), 0)
        : 0

    const columnWidths = hasIdColumn ? [labelWidth, valueWidth, idWidth] : [labelWidth, valueWidth]
    const lines: string[] = []
    for (const row of expandedRows) {
        const lineCount = Math.max(row.valueLines.length, hasIdColumn ? row.idLines.length : 0, 1)
        for (let li = 0; li < lineCount; li++) {
            const cells = [
                li === 0 ? row.label : '',
                row.valueLines[li] ?? '',
                ...(hasIdColumn ? [row.idLines[li] ?? ''] : []),
            ]
            lines.push(formatAsciiRow(cells, columnWidths))
        }
    }
    return lines.join('\n')
}

function renderEnforcementsSection(rows: RoleEnforcementInfo[]): string {
    const title = 'Role Enforcements'
    if (rows.length === 0) return `${title}\n  (none)`

    const nameWidth = Math.max('Name'.length, ...rows.map((r) => r.name.length))
    const valWidth = Math.max('Value'.length, ...rows.map((r) => r.value.length))
    const columnWidths = [nameWidth, valWidth]

    const lines: string[] = [
        title,
        formatAsciiRow(['Name', 'Value'], columnWidths),
        formatAsciiRow(['-'.repeat(nameWidth), '-'.repeat(valWidth)], columnWidths),
        ...rows.map((r) => formatAsciiRow([r.name, r.value], columnWidths)),
    ]
    return lines.join('\n')
}

function renderManagedNodesSection(table: FormattedManagedNodePrivilegeTable): string {
    const title = 'Managed Node Privileges'
    const colHeaders = ['Privilege', ...table.nodeHeaders]

    const colWidths = colHeaders.map((h) => h.length)
    for (const row of table.privilegeRows) {
        colWidths[0] = Math.max(colWidths[0], row.privilege.length)
        row.granted.forEach((_, i) => {
            colWidths[i + 1] = Math.max(colWidths[i + 1], 1)
        })
    }
    colWidths[0] = Math.max(colWidths[0], 'Cascade Node Permissions'.length)

    const formatRow = (cells: string[]) => formatAsciiRow(cells, colWidths)

    const rule = formatRow(colWidths.map((w) => '-'.repeat(w)))
    const lines: string[] = [
        title,
        formatRow(colHeaders),
        rule,
        ...table.privilegeRows.map((row) =>
            formatRow([row.privilege, ...row.granted.map((g) => (g ? 'X' : ''))])
        ),
        rule,
        formatRow(['Cascade Node Permissions', ...table.cascadeRow.map((c) => (c ? 'X' : ''))]),
    ]
    return lines.join('\n')
}

function boolText(value: boolean): string {
    return value ? 'True' : 'False'
}

function asLines(value: string | string[]): string[] {
    if (Array.isArray(value)) return value.length > 0 ? value : ['']
    return [value]
}

function asIdLines(id: number | number[] | undefined): string[] {
    if (id == null) return []
    if (Array.isArray(id)) return id.length > 0 ? id.map(String) : ['']
    return [String(id)]
}

function formatAsciiRow(cells: string[], widths: number[]): string {
    return cells.map((cell, index) => cell + ' '.repeat(Math.max(0, widths[index] - cell.length))).join('  ')
}
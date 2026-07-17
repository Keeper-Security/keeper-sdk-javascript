import type { EnterpriseDataManagerApi } from '../teams/enterpriseData'

export enum RoleColumn {
    VisibleBelow = 'visible_below',
    DefaultRole = 'default_role',
    Admin = 'admin',
    Node = 'node',
    UserCount = 'user_count',
    Users = 'users',
    TeamCount = 'team_count',
    Teams = 'teams',
}

export type RoleColumnInput = RoleColumn | `${RoleColumn}`

export const SUPPORTED_ROLE_COLUMNS: readonly RoleColumn[] = Object.values(RoleColumn)

export const DEFAULT_ROLE_COLUMNS: readonly RoleColumn[] = [
    RoleColumn.DefaultRole,
    RoleColumn.Admin,
    RoleColumn.Node,
    RoleColumn.UserCount,
]

export const ALL_COLUMNS_WILDCARD = '*' as const

export type ListRolesOptions = {
    pattern?: string | null
    columns?: RoleColumnInput[] | typeof ALL_COLUMNS_WILDCARD | string | null
    enterpriseData?: EnterpriseDataManagerApi
}

export type ListRoleRow = {
    role_id: number
    name: string
    visible_below?: boolean
    default_role?: boolean
    admin?: boolean
    node?: string
    user_count?: number
    users?: string[]
    team_count?: number
    teams?: string[]
}

export type FormattedRolesTable = {
    headers: string[]
    rows: string[][]
}

export type FormatRolesTableOptions = {
    columns?: ListRolesOptions['columns']
}

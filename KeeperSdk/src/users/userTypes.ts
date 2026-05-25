import { KeeperSdkError, ResultCodes } from '../utils'
import type { EnterpriseUser } from '../teams/enterpriseData'

export enum UserColumn {
    Name = 'name',
    Status = 'status',
    TransferStatus = 'transfer_status',
    Node = 'node',
    TeamCount = 'team_count',
    Teams = 'teams',
    QueuedTeamCount = 'queued_team_count',
    QueuedTeams = 'queued_teams',
    RoleCount = 'role_count',
    Roles = 'roles',
    Alias = 'alias',
    TwoFaEnabled = '2fa_enabled',
}

export enum AddUserStatus {
    Added = 'added',
    Reinvited = 'reinvited',
    Skipped = 'skipped',
    Failed = 'failed',
}

export enum AddUserSkipReason {
    AlreadyExists = 'already_exists',
    InvalidEmail = 'invalid_email',
}

export enum UpdateUserStatus {
    Updated = 'updated',
    Failed = 'failed',
}

export enum DeleteUserStatus {
    Deleted = 'deleted',
    Failed = 'failed',
}

export enum UserAction {
    Lock = 'lock',
    Unlock = 'unlock',
    ExpirePassword = 'expire_password',
}

export enum UserActionStatus {
    Success = 'success',
    Skipped = 'skipped',
    Failed = 'failed',
}

export enum UserActionSkipReason {
    Inactive = 'inactive',
}

export type UserColumnInput = UserColumn | `${UserColumn}`

export type UserTeamInfo = {
    team_uid: string
    name: string
}

export type UserRoleInfo = {
    role_id: number
    role_name: string
}

export type ListUsersOptions = {
    pattern?: string | null
    columns?: UserColumnInput[] | '*' | string | null
}

export type ListUserRow = {
    enterprise_user_id: number
    username: string
    name?: string
    status?: string
    transfer_status?: string
    node?: string
    team_count?: number
    teams?: string[]
    queued_team_count?: number
    queued_teams?: string[]
    role_count?: number
    roles?: string[]
    alias?: string[]
    tfa_enabled?: boolean
}

export type FormattedUsersTable = {
    headers: string[]
    rows: string[][]
}

export type FormatUsersTableOptions = {
    columns?: ListUsersOptions['columns']
}

export type UserView = {
    enterprise_user_id: number
    username: string
    node_id: number
    node_name: string
    full_name: string
    status: string
    tfa_enabled: boolean
    transfer_status: string
    aliases?: string[]
    teams?: UserTeamInfo[]
    queued_teams?: UserTeamInfo[]
    roles?: UserRoleInfo[]
    share_admins?: string[]
}

export type FormatUserViewOptions = {
    verbose?: boolean
}

export type UserViewTableRow = {
    label: string
    value: string | string[]
    id?: string | string[]
}

export type FormattedUserViewTable = {
    rows: UserViewTableRow[]
    hasIdColumn: boolean
}

export type AddUserInput = {
    emails: string[]
    parent?: string | number | null
    fullName?: string
    jobTitle?: string
}

export type AddUserItemResult = {
    username: string
    enterpriseUserId?: number
    nodeId?: number
    status: AddUserStatus
    skipReason?: AddUserSkipReason
    message?: string
}

export type AddUserResult = {
    success: boolean
    parentNodeId: number
    parentNodeName: string
    items: AddUserItemResult[]
    added: number
    reinvited: number
    skipped: number
    failed: number
}

export type FormatAddUserResultOptions = {
    showSkipped?: boolean
}

export type FormattedAddUserTable = {
    headers: string[]
    rows: string[][]
    parentNodeName: string
    summary: string
}

export type UpdateUserInput = {
    emails: string[]
    parent?: string | number | null
    fullName?: string
    jobTitle?: string
    removeTeam?: string[]
    removeRole?: string[]
}

export type UpdateUserItemResult = {
    username: string
    enterpriseUserId: number
    nodeId: number
    status: UpdateUserStatus
    message?: string
}

export type UpdateUserResult = {
    success: boolean
    items: UpdateUserItemResult[]
    updated: number
    failed: number
}

export type FormattedUpdateUserTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

export type DeleteUserInput = {
    emails: string[]
}

export type DeleteUserItemResult = {
    username: string
    enterpriseUserId: number
    status: DeleteUserStatus
    message?: string
}

export type DeleteUserResult = {
    success: boolean
    items: DeleteUserItemResult[]
    deleted: number
    failed: number
}

export type FormattedDeleteUserTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

export type UserActionInput = {
    emails: string[]
    action: UserAction
}

export type UserActionItemResult = {
    username: string
    enterpriseUserId: number
    status: UserActionStatus
    skipReason?: UserActionSkipReason
    message?: string
}

export type UserActionResult = {
    success: boolean
    items: UserActionItemResult[]
    succeeded: number
    skipped: number
    failed: number
}

export type FormattedUserActionTable = {
    headers: string[]
    rows: string[][]
    summary: string
}

export enum AliasOperation {
    Add = 'add',
    Remove = 'remove',
}

export type AliasUserInput = {
    email: string
    operation: AliasOperation
    alias: string
}

export type AliasUserResult = {
    success: boolean
    username: string
    enterpriseUserId: number
    alias: string
    operation: AliasOperation
    detail: string
}

export const MAX_FULL_NAME_LENGTH = 255
export const MAX_JOB_TITLE_LENGTH = 255

export function normalizeEmailInputs(emails: string[] | undefined): string[] {
    return (emails || []).map((e) => e.trim()).filter((e) => e.length > 0)
}

export function validateUserProfileFields(fullName: string | undefined, jobTitle: string | undefined): void {
    if (fullName !== undefined && fullName.length > MAX_FULL_NAME_LENGTH) {
        throw new KeeperSdkError(
            `Full name exceeds ${MAX_FULL_NAME_LENGTH} characters.`,
            ResultCodes.USER_UPDATE_FAILED
        )
    }
    if (jobTitle !== undefined && jobTitle.length > MAX_JOB_TITLE_LENGTH) {
        throw new KeeperSdkError(
            `Job title exceeds ${MAX_JOB_TITLE_LENGTH} characters.`,
            ResultCodes.USER_UPDATE_FAILED
        )
    }
}

export function resolveExistingUsers(users: EnterpriseUser[], identifiers: string[]): EnterpriseUser[] {
    const byEmail = new Map<string, EnterpriseUser>()
    const byId = new Map<number, EnterpriseUser>()
    for (const u of users) {
        if (u.username) byEmail.set(u.username.toLowerCase(), u)
        byId.set(u.enterprise_user_id, u)
    }

    const result: EnterpriseUser[] = []
    const seen = new Set<number>()

    for (const identifier of identifiers) {
        const trimmed = identifier.trim()
        const numericId = Number(trimmed)
        let user: EnterpriseUser | undefined

        if (Number.isInteger(numericId)) {
            user = byId.get(numericId)
        }
        if (!user) {
            user = byEmail.get(trimmed.toLowerCase())
        }
        if (!user) {
            throw new KeeperSdkError(`User "${trimmed}" does not exist.`, ResultCodes.USER_NOT_FOUND)
        }
        if (!seen.has(user.enterprise_user_id)) {
            seen.add(user.enterprise_user_id)
            result.push(user)
        }
    }

    return result
}

export function formatUserStatus(user: EnterpriseUser): string {
    if (user.status === 'invited') return 'Invited'
    if (user.lock === 1) return 'Locked'
    if ((user.lock ?? 0) > 1) return 'Disabled'
    return 'Active'
}

export function formatTransferStatus(user: EnterpriseUser): string {
    const exp = user.account_share_expiration
    if (exp != null && exp > 0) {
        return new Date(exp) < new Date() ? 'Blocked' : 'Pending Transfer'
    }
    return ''
}
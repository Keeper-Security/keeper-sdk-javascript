import {
    type Auth,
    Enterprise,
    normal64Bytes,
    roleTeamAddMessage,
    roleTeamRemoveMessage,
} from '@keeper-security/keeperapi'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataInclude,
    EnterpriseDataManager,
    type EnterpriseRole,
    type EnterpriseRoleTeamLink,
} from './enterpriseData'
import { applyDecryptedRoleNames, resolveExistingRoles } from '../roles/roleUtils'
import { resolveExistingTeams } from './teamUtils'

const ROLE_TEAM_BATCH_SIZE = 100

const TEAM_ROLE_INCLUDES: EnterpriseDataInclude[] = [
    EnterpriseDataInclude.Teams,
    EnterpriseDataInclude.Roles,
    EnterpriseDataInclude.RoleTeams,
]

export type ChangeTeamRolesInput = {
    teams: string[]
    addRoles?: string[]
    removeRoles?: string[]
}

export enum TeamRoleStatus {
    Added = 'added',
    Removed = 'removed',
    Skipped = 'skipped',
    Failed = 'failed',
}

export type TeamRoleItemResult = {
    status: TeamRoleStatus
    roleName: string
    roleId: number
    teamName: string
    teamUid: string
    message?: string
}

export type TeamRoleResult = {
    success: boolean
    items: TeamRoleItemResult[]
    succeeded: number
    failed: number
    skipped: number
}

type ResolvedTeam = { team_uid: string; name: string }

type RoleTeamLink = { roleId: number; teamUid: string }

async function loadTeamRoleContext(auth: Auth, teamIds: string[]) {
    const enterpriseData = new EnterpriseDataManager(auth)
    const [response, displayNames] = await Promise.all([
        enterpriseData.getData(TEAM_ROLE_INCLUDES),
        enterpriseData.getDisplayNames(),
    ])
    const roles = response.roles || []
    applyDecryptedRoleNames(roles, displayNames.roles)
    const teams = resolveExistingTeams(response.teams || [], teamIds)
    return { teams, allRoles: roles, roleTeams: response.role_teams || [] }
}

function existingRoleTeamLinks(roleTeams: EnterpriseRoleTeamLink[], teamUid: string): Set<number> {
    const ids = new Set<number>()
    for (const link of roleTeams) {
        if (link.team_uid === teamUid) ids.add(link.role_id)
    }
    return ids
}

function expandRemoveRoles(
    removeRoles: string[],
    roleTeams: EnterpriseRoleTeamLink[],
    teamUid: string,
    allRoles: EnterpriseRole[]
): EnterpriseRole[] {
    if (removeRoles.some((role) => role.trim().toLowerCase() === '@all')) {
        const ids = existingRoleTeamLinks(roleTeams, teamUid)
        return allRoles.filter((role) => ids.has(role.role_id))
    }
    return resolveExistingRoles(allRoles, removeRoles)
}

function linkKey(link: RoleTeamLink): string {
    return `${link.roleId}:${link.teamUid}`
}

function markPendingFailed(
    items: TeamRoleItemResult[],
    pendingStatus: TeamRoleStatus.Added | TeamRoleStatus.Removed,
    failedKeys: Set<string>,
    message: string
): void {
    for (const item of items) {
        if (item.status !== pendingStatus) continue
        if (!failedKeys.has(linkKey({ roleId: item.roleId, teamUid: item.teamUid }))) continue
        item.status = TeamRoleStatus.Failed
        item.message = message
    }
}

async function sendRoleTeamBatches(
    auth: Auth,
    items: TeamRoleItemResult[],
    links: RoleTeamLink[],
    pendingStatus: TeamRoleStatus.Added | TeamRoleStatus.Removed,
    add: boolean
): Promise<void> {
    if (links.length === 0) return

    const toMessage = add ? roleTeamAddMessage : roleTeamRemoveMessage

    for (let index = 0; index < links.length; index += ROLE_TEAM_BATCH_SIZE) {
        const chunk = links.slice(index, index + ROLE_TEAM_BATCH_SIZE)
        try {
            const payload = Enterprise.RoleTeams.create({
                roleTeam: chunk.map((link) =>
                    Enterprise.RoleTeam.create({
                        roleId: link.roleId,
                        teamUid: normal64Bytes(link.teamUid),
                    })
                ),
            })
            await auth.executeRestAction(toMessage(payload))
        } catch (err) {
            const message = extractErrorMessage(err)
            const failedKeys = new Set(links.slice(index).map(linkKey))
            markPendingFailed(items, pendingStatus, failedKeys, message)
            return
        }
    }
}

function roleDisplayName(role: { role_id: number; displayName?: string }): string {
    return (role.displayName || '').trim() || String(role.role_id)
}

export async function changeTeamRoles(auth: Auth, input: ChangeTeamRolesInput): Promise<TeamRoleResult> {
    const teamIds = (input.teams || []).map((t) => t.trim()).filter(Boolean)
    const addRoleIds = (input.addRoles || []).map((r) => r.trim()).filter(Boolean)
    const removeRoleIds = (input.removeRoles || []).map((r) => r.trim()).filter(Boolean)

    if (teamIds.length === 0) {
        throw new KeeperSdkError('No teams specified.', ResultCodes.NO_TEAMS_TO_UPDATE)
    }
    if (addRoleIds.length === 0 && removeRoleIds.length === 0) {
        throw new KeeperSdkError('No roles specified.', ResultCodes.ROLE_NOT_FOUND)
    }

    const ctx = await loadTeamRoleContext(auth, teamIds)
    const items: TeamRoleItemResult[] = []
    const toAdd: RoleTeamLink[] = []
    const toRemove: RoleTeamLink[] = []

    for (const team of ctx.teams as ResolvedTeam[]) {
        const teamName = team.name || team.team_uid
        const linkedRoleIds = existingRoleTeamLinks(ctx.roleTeams, team.team_uid)

        if (addRoleIds.length > 0) {
            const rolesToAdd = resolveExistingRoles(ctx.allRoles, addRoleIds)
            for (const role of rolesToAdd) {
                const base = {
                    roleName: roleDisplayName(role),
                    roleId: role.role_id,
                    teamName,
                    teamUid: team.team_uid,
                }
                if (linkedRoleIds.has(role.role_id)) {
                    items.push({
                        ...base,
                        status: TeamRoleStatus.Skipped,
                        message: 'Role is already assigned to team',
                    })
                    continue
                }
                toAdd.push({ roleId: role.role_id, teamUid: team.team_uid })
                items.push({ ...base, status: TeamRoleStatus.Added })
            }
        }

        if (removeRoleIds.length > 0) {
            const rolesToRemove = expandRemoveRoles(removeRoleIds, ctx.roleTeams, team.team_uid, ctx.allRoles)
            for (const role of rolesToRemove) {
                const base = {
                    roleName: roleDisplayName(role),
                    roleId: role.role_id,
                    teamName,
                    teamUid: team.team_uid,
                }
                if (!linkedRoleIds.has(role.role_id)) {
                    items.push({
                        ...base,
                        status: TeamRoleStatus.Skipped,
                        message: 'Role is not assigned to team',
                    })
                    continue
                }
                toRemove.push({ roleId: role.role_id, teamUid: team.team_uid })
                items.push({ ...base, status: TeamRoleStatus.Removed })
            }
        }
    }

    await sendRoleTeamBatches(auth, items, toRemove, TeamRoleStatus.Removed, false)
    await sendRoleTeamBatches(auth, items, toAdd, TeamRoleStatus.Added, true)

    let succeeded = 0
    let skipped = 0
    let failed = 0
    for (const item of items) {
        if (item.status === TeamRoleStatus.Added || item.status === TeamRoleStatus.Removed) succeeded++
        else if (item.status === TeamRoleStatus.Skipped) skipped++
        else failed++
    }

    return {
        success: failed === 0 && succeeded > 0,
        items,
        succeeded,
        skipped,
        failed,
    }
}

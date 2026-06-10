import {
    roleEnforcementAddCommand,
    roleEnforcementRemoveCommand,
    roleEnforcementUpdateCommand,
    type Auth,
    type KeeperResponse,
} from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    EnterpriseDataManager,
    type EnterpriseNode,
    type EnterpriseRole,
    type EnterpriseRoleEnforcementLink,
} from '../teams/enterpriseData'

export const ROLE_TABLE_HEADERS = ['#', 'Status', 'Role Name', 'Role ID', 'Node ID', 'Detail'] as const
export const NODE_PATH_SEPARATOR = '\\'

export type RoleToggle = 'on' | 'off'
export type RoleToggleInput = RoleToggle | `${RoleToggle}` | null | undefined
export type EnforcementPair = { key: string; value: string }

type RoleResultRow = { status: string; roleName: string; roleId: number; nodeId: number }

export function normalizeIdentifiers(values: ReadonlyArray<unknown> | null | undefined): string[] {
    return (values || [])
        .map((value) => (typeof value === 'string' ? value.trim() : ''))
        .filter((value) => value.length > 0)
}

export function validateRoleName(name: string): void {
    if (!name.trim()) {
        throw new KeeperSdkError('Role name cannot be empty.', ResultCodes.ROLE_NAME_EMPTY)
    }
}

export function buildRolesByLowerName(roles: EnterpriseRole[]): Map<string, EnterpriseRole[]> {
    const map = new Map<string, EnterpriseRole[]>()
    for (const role of roles) {
        const key = (role.displayName || '').trim().toLowerCase()
        if (!key) continue
        const bucket = map.get(key)
        if (bucket) bucket.push(role)
        else map.set(key, [role])
    }
    return map
}

export function resolveExistingRoles(roles: EnterpriseRole[], identifiers: string[]): EnterpriseRole[] {
    const byId = new Map<number, EnterpriseRole>(roles.map((role) => [role.role_id, role]))
    const byLowerName = buildRolesByLowerName(roles)

    const found = new Map<number, EnterpriseRole>()
    const missing: string[] = []
    for (const identifier of identifiers) {
        const trimmed = identifier.trim()
        const numeric = Number(trimmed)
        if (Number.isInteger(numeric) && byId.has(numeric)) {
            const match = byId.get(numeric)!
            found.set(match.role_id, match)
            continue
        }
        const nameMatches = byLowerName.get(trimmed.toLowerCase())
        if (!nameMatches || nameMatches.length === 0) {
            missing.push(trimmed)
            continue
        }
        if (nameMatches.length > 1) {
            throw new KeeperSdkError(
                `Role name "${trimmed}" is not unique. Use Role ID instead.`,
                ResultCodes.MULTIPLE_ROLE_MATCHES
            )
        }
        found.set(nameMatches[0].role_id, nameMatches[0])
    }

    if (missing.length > 0) {
        throw new KeeperSdkError(
            `Role(s) "${missing.join(', ')}" could not be resolved.`,
            ResultCodes.ROLE_NOT_FOUND
        )
    }
    return Array.from(found.values())
}

export function parseEnforcements(rawList: string[]): EnforcementPair[] {
    return rawList
        .map((raw) => {
            const sep = raw.indexOf(':')
            if (sep < 1) return null
            const key = raw.slice(0, sep).trim()
            const value = raw.slice(sep + 1).trim()
            return key && value ? ({ key, value } as EnforcementPair) : null
        })
        .filter((entry): entry is EnforcementPair => entry !== null)
}

export function resolveToggle(input: RoleToggleInput): boolean | undefined {
    if (input === 'on') return true
    if (input === 'off') return false
    return undefined
}

export function applyDecryptedRoleNames(roles: EnterpriseRole[], decrypted: Map<number, string>): void {
    if (decrypted.size === 0) return
    for (const role of roles) {
        const display = decrypted.get(role.role_id)
        if (display) role.displayName = display
    }
}

export function nodePathOrFallback(nodes: EnterpriseNode[], node: EnterpriseNode): string {
    const path = EnterpriseDataManager.getNodePath(nodes, node.node_id, {
        omitRoot: false,
        separator: NODE_PATH_SEPARATOR,
    })
    return path || (node.displayName || '').trim() || String(node.node_id)
}

export function assertCommandSucceeded(response: KeeperResponse, fallbackMessage: string, fallbackCode: string): void {
    if ((response.result || '').toLowerCase() === 'fail') {
        throw new KeeperSdkError(
            response.message || response.result_code || fallbackMessage,
            response.result_code || fallbackCode
        )
    }
}

const ENFORCEMENT_FALSE = new Set(['false', 'f', '0', 'off', 'no', 'n'])
const ENFORCEMENT_TRUE = new Set(['true', 't', '1', 'on', 'yes', 'y'])

function normalizeEnforcementKey(key: string): string {
    return key.trim().toLowerCase().replace(/-/g, '_')
}

function roleHasEnforcement(
    roleId: number,
    enforcement: string,
    links: readonly EnterpriseRoleEnforcementLink[]
): boolean {
    return links.some(
        (link) =>
            link.role_id === roleId && normalizeEnforcementKey(link.enforcement_type) === enforcement
    )
}

export async function applyRoleEnforcements(
    auth: Auth,
    roleId: number,
    pairs: EnforcementPair[],
    existingLinks: readonly EnterpriseRoleEnforcementLink[] = []
): Promise<void> {
    for (const { key, value } of pairs) {
        const enforcement = normalizeEnforcementKey(key)
        const lower = value.trim().toLowerCase()

        if (ENFORCEMENT_FALSE.has(lower)) {
            if (!roleHasEnforcement(roleId, enforcement, existingLinks)) continue
            const response = await auth.executeRestCommand(
                roleEnforcementRemoveCommand({ role_id: roleId, enforcement })
            )
            assertCommandSucceeded(
                response,
                `role_enforcement_remove failed: ${enforcement}`,
                ResultCodes.ROLE_ENFORCEMENT_FAILED
            )
            continue
        }

        if (ENFORCEMENT_TRUE.has(lower)) {
            const exists = roleHasEnforcement(roleId, enforcement, existingLinks)
            const response = await auth.executeRestCommand(
                exists
                    ? roleEnforcementUpdateCommand({ role_id: roleId, enforcement })
                    : roleEnforcementAddCommand({ role_id: roleId, enforcement })
            )
            assertCommandSucceeded(
                response,
                `role_enforcement_${exists ? 'update' : 'add'} failed: ${enforcement}`,
                ResultCodes.ROLE_ENFORCEMENT_FAILED
            )
            continue
        }

        const exists = roleHasEnforcement(roleId, enforcement, existingLinks)
        const response = await auth.executeRestCommand(
            exists
                ? roleEnforcementUpdateCommand({ role_id: roleId, enforcement, value })
                : roleEnforcementAddCommand({ role_id: roleId, enforcement, value })
        )
        assertCommandSucceeded(
            response,
            `role_enforcement_${exists ? 'update' : 'add'} failed: ${enforcement}`,
            ResultCodes.ROLE_ENFORCEMENT_FAILED
        )
    }
}

export function buildRoleResultRows<T extends RoleResultRow>(
    items: ReadonlyArray<T>,
    detailFor: (item: T) => string
): string[][] {
    return items.map((item, index) => [
        String(index + 1),
        item.status,
        item.roleName,
        String(item.roleId),
        String(item.nodeId),
        detailFor(item),
    ])
}

export function renderRoleResultTable(
    headers: ReadonlyArray<string>,
    rows: string[][],
    summary: string,
    prefixLines: ReadonlyArray<string> = []
): string {
    const widths = headers.map((header, i) => Math.max(header.length, ...rows.map((row) => (row[i] || '').length)))
    const pad = (cell: string, i: number) => cell + ' '.repeat(Math.max(0, widths[i] - cell.length))
    const formatRow = (cells: ReadonlyArray<string>) => cells.map((cell, i) => pad(cell, i)).join('  ')
    return [
        ...prefixLines,
        formatRow(headers),
        formatRow(widths.map((width) => '-'.repeat(width))),
        ...rows.map(formatRow),
        summary,
    ].join('\n')
}

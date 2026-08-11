import type { Auth } from '@keeper-security/keeperapi'
import { normal64Bytes, pamConfigureNetworkGraphMessage } from '@keeper-security/keeperapi'
import { extractErrorMessage } from '../../utils'
import {
    PAM_CONFIG_PERMISSION_DAG_KEYS,
    PAM_CONFIG_PERMISSION_FLAGS,
    PAM_CONFIG_PERMISSION_VALUES,
    type PamConfigPermissionFlag,
    type PamNetworkAllowedSettings,
} from './configConstants'
import type {
    ApplyPamConfigurationPermissionsOptions,
    PamConfigurationPermissionValue,
    PamConfigurationPermissionsInput,
    PamPermissionBuildResult,
} from './configTypes'

export function hasPermissionsInput(permissions?: PamConfigurationPermissionsInput | null): boolean {
    if (!permissions) return false
    return PAM_CONFIG_PERMISSION_FLAGS.some((flag) => {
        const value = permissions[flag]
        return value != null && String(value).trim() !== ''
    })
}

export function convertPermissionValue(value: unknown): boolean | null | undefined {
    if (value == null) return undefined
    if (typeof value === 'boolean') return value
    const normalized = String(value).trim().toLowerCase()
    if (!normalized) return undefined
    if (normalized === 'on' || normalized === 'true' || normalized === '1') return true
    if (normalized === 'off' || normalized === 'false' || normalized === '0') return false
    if (normalized === 'default') return null
    return undefined
}

export function normalizePermissionValue(value: unknown): PamConfigurationPermissionValue | undefined {
    if (value == null) return undefined
    const normalized = String(value).trim().toLowerCase()
    if ((PAM_CONFIG_PERMISSION_VALUES as readonly string[]).includes(normalized)) {
        return normalized as PamConfigurationPermissionValue
    }
    const converted = convertPermissionValue(value)
    if (converted === true) return 'on'
    if (converted === false) return 'off'
    if (converted === null) return 'default'
    return undefined
}

export function buildAllowedSettingsFromPermissions(
    permissions: PamConfigurationPermissionsInput
): PamPermissionBuildResult {
    const allowedSettings: PamNetworkAllowedSettings = {}
    const applied: Partial<Record<PamConfigPermissionFlag, PamConfigurationPermissionValue>> = {}
    const defaultResets: PamConfigPermissionFlag[] = []
    const invalid: Array<{ flag: PamConfigPermissionFlag; value: unknown }> = []

    for (const flag of PAM_CONFIG_PERMISSION_FLAGS) {
        const raw = permissions[flag]
        if (raw == null || String(raw).trim() === '') continue

        const permissionValue = normalizePermissionValue(raw)
        const converted = convertPermissionValue(raw)
        if (permissionValue == null || converted === undefined) {
            invalid.push({ flag, value: raw })
            continue
        }

        applied[flag] = permissionValue
        if (converted === null) {
            defaultResets.push(flag)
            continue
        }

        const dagKey = PAM_CONFIG_PERMISSION_DAG_KEYS[flag]
        allowedSettings[dagKey] = converted
    }

    return { allowedSettings, applied, defaultResets, invalid }
}

export async function applyPamConfigurationPermissions(
    auth: Auth,
    configurationUid: string,
    permissions: PamConfigurationPermissionsInput,
    warnings: string[],
    options: ApplyPamConfigurationPermissionsOptions = {}
): Promise<boolean> {
    if (!hasPermissionsInput(permissions)) return false

    const warnOnDefaultReset = options.warnOnDefaultReset !== false
    const { allowedSettings, defaultResets, invalid } = buildAllowedSettingsFromPermissions(permissions)

    for (const entry of invalid) {
        warnings.push(`Invalid permission value for "${entry.flag}": ${String(entry.value)}. Use on, off, or default.`)
    }

    if (warnOnDefaultReset && defaultResets.length > 0) {
        warnings.push(
            `Permission reset to default is not applied for: ${defaultResets.join(', ')} ` +
                `(requires DAG key removal; use on/off, or Commander for default).`
        )
    }

    if (Object.keys(allowedSettings).length === 0) return false

    const allowedSettingsBytes = new TextEncoder().encode(JSON.stringify(allowedSettings))

    try {
        await auth.executeRouterRestAction(
            pamConfigureNetworkGraphMessage({
                recordUid: normal64Bytes(configurationUid),
                networkSettings: {
                    allowedSettings: allowedSettingsBytes,
                },
            })
        )
        return true
    } catch (err) {
        warnings.push(`Failed to apply configuration permissions: ${extractErrorMessage(err)}`)
        return false
    }
}

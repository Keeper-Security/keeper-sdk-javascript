import {
    logger,
    prompt,
    PAM_CONFIG_ENVIRONMENTS,
    type PamConfigEnvironment,
    type PamConfigurationPermissionValue,
    type PamConfigurationPermissionsInput,
    type PamConfigurationRecordFieldInput,
} from '@keeper-security/keeper-sdk-javascript'
import { isYes } from '../../utils/format'

export { PAM_CONFIG_ENVIRONMENTS }
export type { PamConfigEnvironment }

export type PamConfigFieldsPromptResult = {
    fields: PamConfigurationRecordFieldInput[]
    adminCredentialUid?: string
}

export type PamConfigFieldsPromptOptions = {
    includeSchedulePrompt?: boolean
}

type PamConfigLabeledFieldType = 'text' | 'secret' | 'multiline' | 'json' | 'email' | 'checkbox'

type PermissionPromptDefinition = {
    key: keyof PamConfigurationPermissionsInput
    label: string
}

const PERMISSION_PROMPT_DEFINITIONS: readonly PermissionPromptDefinition[] = [
    { key: 'connections', label: 'Connections (-c)' },
    { key: 'tunneling', label: 'Tunneling (-u)' },
    { key: 'rotation', label: 'Rotation (-r)' },
    { key: 'remoteBrowserIsolation', label: 'Remote browser isolation (-rbi)' },
    { key: 'connectionsRecording', label: 'Connections recording (-cr)' },
    { key: 'typescriptRecording', label: 'Typescript recording (-tr)' },
    { key: 'aiThreatDetection', label: 'AI threat detection' },
    { key: 'aiTerminateSessionOnDetection', label: 'AI terminate session on detection' },
]

async function promptOptionalText(label: string): Promise<string> {
    return (await prompt(`${label} (optional): `)).trim()
}

async function promptOptionalBoolean(label: string): Promise<boolean | undefined> {
    const raw = (await prompt(`${label} [y/N, Enter to skip]: `)).trim()
    if (!raw) return undefined
    return isYes(raw)
}

function splitCommaSeparatedList(raw: string): string[] {
    return raw
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean)
}

function appendLabeledField(
    fields: PamConfigurationRecordFieldInput[],
    type: PamConfigLabeledFieldType,
    label: string,
    value: string | boolean | undefined
): void {
    if (value == null) return
    if (typeof value === 'string' && value.length === 0) return
    fields.push({ type, label, value: [value] })
}

function appendMultilineField(
    fields: PamConfigurationRecordFieldInput[],
    label: string,
    values: string[]
): void {
    if (values.length === 0) return
    fields.push({ type: 'multiline', label, value: [values.join('\n')] })
}

async function promptPermissionFlagValue(label: string): Promise<PamConfigurationPermissionValue | undefined> {
    const raw = (await prompt(`${label} [on|off|default, Enter to skip]: `)).trim().toLowerCase()
    if (!raw) return undefined
    if (raw === 'on' || raw === 'off' || raw === 'default') return raw
    logger.info(`  Invalid "${raw}". Skipping (use on, off, or default).`)
    return undefined
}

export async function promptPamConfigurationPermissions(): Promise<
    PamConfigurationPermissionsInput | undefined
> {
    const wantPermissions = isYes(await prompt('Set additional permissions? [y/N]: '))
    if (!wantPermissions) return undefined

    const permissions: PamConfigurationPermissionsInput = {}
    let anySet = false
    for (const entry of PERMISSION_PROMPT_DEFINITIONS) {
        const value = await promptPermissionFlagValue(entry.label)
        if (value) {
            permissions[entry.key] = value
            anySet = true
        }
    }
    return anySet ? permissions : undefined
}

async function promptAwsConfigurationFields(fields: PamConfigurationRecordFieldInput[]): Promise<void> {
    appendLabeledField(fields, 'text', 'awsId', await promptOptionalText('AWS ID (--aws-id)'))
    appendLabeledField(fields, 'secret', 'accessKeyId', await promptOptionalText('Access Key ID (--access-key-id)'))
    appendLabeledField(
        fields,
        'secret',
        'accessSecretKey',
        await promptOptionalText('Access Secret Key (--access-secret-key)')
    )
    appendMultilineField(
        fields,
        'regionNames',
        splitCommaSeparatedList(await promptOptionalText('Region names, comma-separated (--region-name)'))
    )
}

async function promptAzureConfigurationFields(fields: PamConfigurationRecordFieldInput[]): Promise<void> {
    appendLabeledField(fields, 'text', 'azureId', await promptOptionalText('Azure ID (--azure-id)'))
    appendLabeledField(fields, 'secret', 'clientId', await promptOptionalText('Client ID (--client-id)'))
    appendLabeledField(fields, 'secret', 'clientSecret', await promptOptionalText('Client Secret (--client-secret)'))
    appendLabeledField(
        fields,
        'secret',
        'subscriptionId',
        await promptOptionalText('Subscription ID (--subscription_id)')
    )
    appendLabeledField(fields, 'secret', 'tenantId', await promptOptionalText('Tenant ID (--tenant-id)'))
    appendMultilineField(
        fields,
        'resourceGroups',
        splitCommaSeparatedList(await promptOptionalText('Resource groups, comma-separated (--resource-group)'))
    )
}

async function promptGcpConfigurationFields(fields: PamConfigurationRecordFieldInput[]): Promise<void> {
    appendLabeledField(fields, 'text', 'pamGcpId', await promptOptionalText('GCP ID (--gcp-id)'))
    appendLabeledField(
        fields,
        'json',
        'pamServiceAccountKey',
        await promptOptionalText('Service Account Key JSON (--service-account-key)')
    )
    appendLabeledField(
        fields,
        'email',
        'pamGoogleAdminEmail',
        await promptOptionalText('Google Admin Email (--google-admin-email)')
    )
    appendMultilineField(
        fields,
        'pamGcpRegionName',
        splitCommaSeparatedList(await promptOptionalText('GCP regions, comma-separated (--gcp-region)'))
    )
}

async function promptGitHubConfigurationFields(fields: PamConfigurationRecordFieldInput[]): Promise<void> {
    appendLabeledField(fields, 'text', 'pamGitHubId', await promptOptionalText('GitHub ID (--github-id)'))
    appendLabeledField(
        fields,
        'secret',
        'personalAccessToken',
        await promptOptionalText('Personal Access Token (--personal-access-token)')
    )
    appendLabeledField(
        fields,
        'text',
        'pamGitHubBaseUrl',
        await promptOptionalText('GitHub Base URL (--github-base-url)')
    )
}

async function promptDomainConfigurationFields(
    fields: PamConfigurationRecordFieldInput[]
): Promise<string | undefined> {
    appendLabeledField(fields, 'text', 'pamDomainId', await promptOptionalText('Domain ID (--domain-id)'))
    const hostname = await promptOptionalText('Domain hostname (--domain-hostname)')
    const port = await promptOptionalText('Domain port (--domain-port)')
    if (hostname || port) {
        fields.push({
            type: 'pamHostname',
            value: [{ hostName: hostname || '', port: port || '' }],
        })
    }
    const useSsl = await promptOptionalBoolean('Use SSL (--domain-use-ssl)')
    if (useSsl != null) appendLabeledField(fields, 'checkbox', 'useSSL', useSsl)
    const scanDcCidr = await promptOptionalBoolean('Scan DC CIDR (--domain-scan-dc-cidr)')
    if (scanDcCidr != null) appendLabeledField(fields, 'checkbox', 'scanDCCIDR', scanDcCidr)
    appendLabeledField(
        fields,
        'text',
        'networkCIDR',
        await promptOptionalText('Domain network CIDR (--domain-network-cidr)')
    )
    appendLabeledField(
        fields,
        'text',
        'userMatch',
        await promptOptionalText('Domain user match (--domain-user-match)')
    )
    const domainAdmin = await promptOptionalText('Domain admin pamUser UID/title (--domain-admin)')
    return domainAdmin || undefined
}

async function promptOciConfigurationFields(fields: PamConfigurationRecordFieldInput[]): Promise<void> {
    appendLabeledField(fields, 'text', 'pamOciId', await promptOptionalText('OCI ID (--oci-id)'))
    appendLabeledField(fields, 'secret', 'adminOcid', await promptOptionalText('OCI Admin OCID (--oci-admin-id)'))
    appendLabeledField(
        fields,
        'secret',
        'adminPublicKey',
        await promptOptionalText('OCI Admin Public Key (--oci-admin-public-key)')
    )
    appendLabeledField(
        fields,
        'secret',
        'adminPrivateKey',
        await promptOptionalText('OCI Admin Private Key (--oci-admin-private-key)')
    )
    appendLabeledField(fields, 'text', 'tenancyOci', await promptOptionalText('OCI Tenancy (--oci-tenancy)'))
    appendLabeledField(fields, 'text', 'regionOci', await promptOptionalText('OCI Region (--oci-region)'))
}

async function promptLocalConfigurationFields(fields: PamConfigurationRecordFieldInput[]): Promise<void> {
    appendLabeledField(fields, 'text', 'networkId', await promptOptionalText('Network ID (--network-id)'))
    appendLabeledField(fields, 'text', 'networkCIDR', await promptOptionalText('Network CIDR (--network-cidr)'))
}

async function promptCommonOptionalFields(
    fields: PamConfigurationRecordFieldInput[],
    options: PamConfigFieldsPromptOptions
): Promise<void> {
    appendLabeledField(
        fields,
        'text',
        'identityProviderUid',
        await promptOptionalText('Identity Provider UID (--identity-provider)')
    )

    if (options.includeSchedulePrompt !== false) {
        const scheduleCron = (await prompt('Default rotation CRON (--schedule, Enter to skip): ')).trim()
        if (scheduleCron) {
            fields.push({
                type: 'schedule',
                label: 'defaultRotationSchedule',
                value: [{ type: 'CRON', cron: scheduleCron, tz: 'Etc/UTC' }],
            })
        }
    }

    const portMappingsRaw = await promptOptionalText(
        'Port mappings, comma-separated port=protocol (--port-mapping)'
    )
    if (!portMappingsRaw) return

    const portMappingLines = portMappingsRaw
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean)
        .map((entry) => {
            if (entry.includes('=')) return entry
            const [port, protocol] = entry.split(':')
            return protocol ? `${port.trim()}=${protocol.trim()}` : port.trim()
        })
        .filter(Boolean)
    appendMultilineField(fields, 'portMapping', portMappingLines)
}

export async function promptPamConfigurationFields(
    environment: string,
    options: PamConfigFieldsPromptOptions = {}
): Promise<PamConfigFieldsPromptResult> {
    const fields: PamConfigurationRecordFieldInput[] = []
    let adminCredentialUid: string | undefined

    switch (environment) {
        case 'aws':
            await promptAwsConfigurationFields(fields)
            break
        case 'azure':
            await promptAzureConfigurationFields(fields)
            break
        case 'gcp':
            await promptGcpConfigurationFields(fields)
            break
        case 'github':
            await promptGitHubConfigurationFields(fields)
            break
        case 'domain':
            adminCredentialUid = await promptDomainConfigurationFields(fields)
            break
        case 'oci':
            await promptOciConfigurationFields(fields)
            break
        case 'local':
        default:
            await promptLocalConfigurationFields(fields)
            break
    }

    await promptCommonOptionalFields(fields, options)
    return { fields, adminCredentialUid }
}

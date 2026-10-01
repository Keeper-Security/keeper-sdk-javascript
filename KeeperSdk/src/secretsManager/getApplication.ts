import type { Auth } from '@keeper-security/keeperapi'
import { getAppInfoMessage } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../storage/InMemoryStorage'
import { getRecordTitle } from '../records/RecordUtils'
import { formatTimestampMs } from '../pam/gateway/gatewayHelpers'
import { KeeperSdkError, ResultCodes } from '../utils'
import {
    SECRETS_MANAGER_APP_DETAILS_TITLE,
    SECRETS_MANAGER_APP_NO_CLIENTS_MESSAGE,
    SECRETS_MANAGER_APP_NO_SHARES_MESSAGE,
} from './constants'
import {
    getApplicationUsers,
    resolveApplicationUid,
    resolveSecretsManagerApplication,
    toClientDevices,
    toSharedSecrets,
} from './helpers'
import type {
    SecretsManagerAppDetails,
    SecretsManagerApplicationUser,
    SecretsManagerClientDevice,
    SecretsManagerSharedSecret,
} from './types'

export async function getSecretsManagerApp(
    auth: Auth,
    storage: InMemoryStorage,
    identifier: string
): Promise<SecretsManagerAppDetails> {
    const application = resolveSecretsManagerApplication(storage, identifier)
    const response = await auth.executeRest(
        getAppInfoMessage({
            appRecordUid: [resolveApplicationUid(application.uid)],
        })
    )
    const appInfo = response.appInfo?.[0]
    if (!appInfo) {
        throw new KeeperSdkError(
            `No application information returned for UID: ${application.uid}`,
            ResultCodes.PAM_KSM_APP_NOT_FOUND
        )
    }
    const clientDevices = toClientDevices(appInfo?.clients ?? [])
    const sharedSecrets = toSharedSecrets(storage, application, appInfo?.shares ?? [])
    const applicationUsers = getApplicationUsers(auth, storage, application.uid)

    return {
        name: getRecordTitle(application),
        uid: application.uid,
        records: sharedSecrets.filter((share): boolean => share.type === 'RECORD').length,
        folders: sharedSecrets.filter((share): boolean => share.type === 'FOLDER').length,
        devices: clientDevices.length,
        last_access: null,
        application_users: applicationUsers,
        client_devices: clientDevices,
        shared_secrets: sharedSecrets,
    }
}

export function formatSecretsManagerAppDetails(app: SecretsManagerAppDetails): string {
    const lines: string[] = [SECRETS_MANAGER_APP_DETAILS_TITLE, `App Name: ${app.name}`, `App UID: ${app.uid}`]

    if (app.client_devices.length === 0) {
        lines.push('', SECRETS_MANAGER_APP_NO_CLIENTS_MESSAGE)
    } else {
        app.client_devices.forEach((client: SecretsManagerClientDevice, index: number): void => {
            lines.push(
                '',
                `Client Device ${index + 1}`,
                '=============================',
                `  Device Name: ${client.name}`,
                `  Short ID: ${client.short_id}`,
                `  Created On: ${formatTimestampMs(client.created_on) || 'Never'}`,
                `  Expires On: ${formatTimestampMs(client.expires_on) || 'Never'}`,
                `  First Access: ${formatTimestampMs(client.first_access) || 'Never'}`,
                `  Last Access: ${formatTimestampMs(client.last_access) || 'Never'}`,
                `  IP Lock: ${client.ip_lock ? 'Enabled' : 'Disabled'}`,
                `  IP Address: ${client.ip_address || '--'}`
            )
        })
    }

    lines.push('', 'Application Users', '', formatApplicationUsersTable(app.application_users))

    if (app.shared_secrets.length === 0) {
        lines.push('', 'Application Access', '', SECRETS_MANAGER_APP_NO_SHARES_MESSAGE)
    } else {
        lines.push('', 'Application Access', '', formatSharedSecretsTable(app.shared_secrets))
    }

    return lines.join('\n')
}

function formatApplicationUsersTable(users: readonly SecretsManagerApplicationUser[]): string {
    const headers = ['Username', 'Role', 'Editable', 'Shareable']
    const rows = users.map((user: SecretsManagerApplicationUser): string[] => [
        user.username,
        user.role,
        user.editable ? 'Yes' : 'No',
        user.shareable ? 'Yes' : 'No',
    ])
    return formatTable(headers, rows)
}

function formatSharedSecretsTable(shares: readonly SecretsManagerSharedSecret[]): string {
    const headers = ['Share Type', 'UID', 'Title', 'Permissions']
    const rows = shares.map((share: SecretsManagerSharedSecret): string[] => [
        share.type,
        share.uid,
        share.name,
        share.permissions ? 'Editable' : 'Read Only',
    ])
    return formatTable(headers, rows)
}

function formatTable(headers: string[], rows: string[][]): string {
    const widths = headers.map((header: string, index: number): number => {
        const rowWidth = rows.reduce((width: number, row: string[]): number => {
            return Math.max(width, row[index]?.length ?? 0)
        }, 0)
        return Math.max(header.length, rowWidth)
    })
    const formatRow = (row: string[]): string =>
        row.map((cell: string, index: number): string => cell.padEnd(widths[index])).join('  ')

    return [
        formatRow(headers),
        widths.map((width: number): string => '-'.repeat(width)).join('  '),
        ...rows.map(formatRow),
    ].join('\n')
}

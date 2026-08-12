import { formatTimestampMs } from '@keeper-security/keeper-sdk-javascript'
import type {
    CreateGatewayResult,
    CreatePamConfigurationResult,
    EditGatewayResult,
    EditPamConfigurationResult,
    RemoveGatewayResult,
    RemovePamConfigurationResult,
    SetGatewayMaxInstancesResult,
} from '@keeper-security/keeper-sdk-javascript'

export function formatCreateGatewayOutput(result: CreateGatewayResult): string {
    const appLabel = result.applicationTitle || result.applicationUid
    const message = result.isInitializedConfig
        ? `The one-time token was created in application [${appLabel}]. Use the initialized config in the Gateway. The new Gateway named ${result.gatewayName} will show up in the gateway list once it is initialized.`
        : `The one-time token was created in application [${appLabel}]. The new Gateway named ${result.gatewayName} will show up in the gateway list once it is initialized. Token expires in ${result.tokenExpiresInMin} minutes.`

    const lines = [
        message,
        '',
        result.isInitializedConfig ? 'Use the following initialized config in the Gateway:' : 'One-time token:',
        '-----------------------------------------------',
        result.tokenOrConfig,
        '-----------------------------------------------',
        `Token expires on: ${formatTimestampMs(result.tokenExpiresOn)}`,
    ]
    for (const warning of result.warnings) {
        lines.push(`Warning: ${warning}`)
    }
    return lines.join('\n')
}

export function formatEditGatewayOutput(result: EditGatewayResult): string {
    const unchanged = !result.nameChanged && !result.nodeChanged
    const message = unchanged
        ? `Gateway ${result.gatewayUid} is unchanged.`
        : `Gateway ${result.gatewayUid} has been edited.`
    return [
        message,
        result.nameChanged
            ? `Name: ${result.previousName || '(none)'} → ${result.gatewayName}`
            : `Name: ${result.gatewayName}`,
        result.nodeChanged ? `Node ID: ${result.previousNodeId} → ${result.nodeId}` : `Node ID: ${result.nodeId}`,
    ].join('\n')
}

export function formatRemoveGatewayOutput(result: RemoveGatewayResult): string {
    return `Gateway ${result.gatewayName} has been removed.`
}

export function formatSetGatewayMaxInstancesOutput(result: SetGatewayMaxInstancesResult): string {
    return `${result.gatewayName}: max instance count set to ${result.maxInstances}`
}

export function formatCreatePamConfigurationOutput(result: CreatePamConfigurationResult): string {
    const lines = [
        `PAM Configuration "${result.title}" created (${result.configurationUid}).`,
        `UID: ${result.configurationUid}`,
        `Type: ${result.configType}`,
        `Shared Folder: ${result.sharedFolderUid}`,
        `Gateway UID: ${result.gatewayUid || '(none)'}`,
        `Gateway Linked: ${result.gatewayLinked ? 'yes' : 'no'}`,
        `Permissions Applied: ${result.permissionsApplied ? 'yes' : 'no'}`,
    ]
    for (const warning of result.warnings) {
        lines.push(`Warning: ${warning}`)
    }
    return lines.join('\n')
}

export function formatEditPamConfigurationOutput(result: EditPamConfigurationResult): string {
    const lines = [
        `PAM Configuration "${result.title}" updated (${result.configurationUid}).`,
        `UID: ${result.configurationUid}`,
        result.typeChanged ? `Type: ${result.previousConfigType} → ${result.configType}` : `Type: ${result.configType}`,
        result.titleChanged ? `Title changed: yes` : `Title: ${result.title}`,
        result.folderChanged
            ? `Shared Folder: ${result.previousSharedFolderUid || '(none)'} → ${result.sharedFolderUid}`
            : `Shared Folder: ${result.sharedFolderUid || '(none)'}`,
        result.gatewayChanged
            ? `Gateway UID: ${result.previousGatewayUid || '(none)'} → ${result.gatewayUid || '(none)'}`
            : `Gateway UID: ${result.gatewayUid || '(none)'}`,
        `Permissions Applied: ${result.permissionsApplied ? 'yes' : 'no'}`,
    ]
    if (result.removedResourceRecordUids.length) {
        lines.push(`Removed Resource UIDs: ${result.removedResourceRecordUids.join(', ')}`)
    }
    for (const warning of result.warnings) {
        lines.push(`Warning: ${warning}`)
    }
    return lines.join('\n')
}

export function formatRemovePamConfigurationOutput(
    result: RemovePamConfigurationResult,
    configurationUidOrTitle?: string
): string {
    if (!result.found) {
        return `PAM Configuration ${configurationUidOrTitle || ''} not found`.trim()
    }
    const lines = ['PAM Configuration was removed successfully.']
    if (result.configurationUid) lines.push(`UID: ${result.configurationUid}`)
    if (result.title) lines.push(`Title: ${result.title}`)
    if (result.configType) lines.push(`Type: ${result.configType}`)
    return lines.join('\n')
}

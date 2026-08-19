import type { Auth } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { applyPamConfigurationPermissions, hasPermissionsInput } from './applyConfigPermissions'
import { isPamConfigurationRecordType, resolvePamConfigurationRecordType } from './configHelpers'
import {
    findPamConfigurationByUidOrTitle,
    linkConfigurationController,
    mergeRecordFields,
    parsePamResourcesFromRecord,
    readTypedRecordPayload,
    resolveGatewayUidSoft,
    resolveResourceRecordUidsToRemove,
    seedPamConfigurationFieldsFromRecordTypeSoft,
    upsertPamResourcesField,
} from './configMutationHelpers'
import {
    findPamConfigFolderForRecord,
    placePamConfigurationInFolder,
    resolvePamConfigFolder,
    updatePamConfigurationRecordData,
    type PamConfigFolderTarget,
} from './pamConfigFolder'
import { isNestedShareRecord } from '../../nestedShareFolders/nsfHelpers'
import type { EditPamConfigurationInput, EditPamConfigurationResult } from './configTypes'

function hasRecordEditWork(input: EditPamConfigurationInput): boolean {
    return (
        input.title != null ||
        input.configType != null ||
        input.sharedFolder != null ||
        input.gateway != null ||
        (input.fields != null && input.fields.length > 0) ||
        (input.custom != null && input.custom.length > 0) ||
        input.notes != null ||
        input.adminCredentialUid != null ||
        (input.removeResourceRecords != null && input.removeResourceRecords.length > 0)
    )
}

export async function editPamConfiguration(
    auth: Auth,
    storage: InMemoryStorage,
    input: EditPamConfigurationInput
): Promise<EditPamConfigurationResult> {
    const configurationUidOrTitle = input.configurationUidOrTitle?.trim() || ''
    if (!configurationUidOrTitle) {
        throw new KeeperSdkError('PAM Configuration UID or title is required.', ResultCodes.PAM_CONFIG_REQUIRED)
    }

    const recordWork = hasRecordEditWork(input)
    const permissionsWork = hasPermissionsInput(input.permissions)
    if (!recordWork && !permissionsWork) {
        throw new KeeperSdkError(
            'Nothing to do. Provide at least one of title, configType, sharedFolder, gateway, fields, custom, notes, removeResourceRecords, or permissions.',
            ResultCodes.PAM_CONFIG_EDIT_NOTHING_TO_DO
        )
    }

    const record = findPamConfigurationByUidOrTitle(storage, configurationUidOrTitle)
    const configurationUid = record.uid
    const existing = readTypedRecordPayload(record)
    const existingResources = parsePamResourcesFromRecord(record)

    const warnings: string[] = []

    let title = existing.title
    let titleChanged = false
    let configType = existing.configType
    let typeChanged = false
    const previousFolder: PamConfigFolderTarget | undefined =
        findPamConfigFolderForRecord(storage, configurationUid) ||
        (existingResources.sharedFolderUid
            ? {
                  kind: isNestedShareRecord(storage, configurationUid) ? 'nsf' : 'shared_folder',
                  uid: existingResources.sharedFolderUid,
              }
            : undefined)
    const previousSharedFolderUid = previousFolder?.uid || existingResources.sharedFolderUid
    let sharedFolderUid = previousSharedFolderUid
    let folderTarget: PamConfigFolderTarget | undefined = previousFolder
    let folderChanged = false
    const previousGatewayUid = existingResources.gatewayUid
    let gatewayUid = previousGatewayUid
    let gatewayChanged = false
    let removedResourceRecordUids: string[] = []

    if (recordWork) {
        if (input.title != null) {
            const nextTitle = String(input.title).trim()
            if (!nextTitle) {
                throw new KeeperSdkError(
                    'PAM Configuration title cannot be empty.',
                    ResultCodes.PAM_CONFIG_TITLE_REQUIRED
                )
            }
            titleChanged = nextTitle !== existing.title
            title = nextTitle
        }

        if (input.configType != null && String(input.configType).trim()) {
            const resolved = resolvePamConfigurationRecordType(String(input.configType).trim())
            if (!resolved || !isPamConfigurationRecordType(resolved)) {
                throw new KeeperSdkError(
                    `Invalid PAM Configuration type "${input.configType}". Use a known type or environment (aws, azure, gcp, domain, local, oci, github).`,
                    ResultCodes.PAM_CONFIG_TYPE_INVALID
                )
            }
            typeChanged = resolved !== existing.configType
            configType = resolved
        }

        if (input.sharedFolder != null && String(input.sharedFolder).trim()) {
            folderTarget = resolvePamConfigFolder(storage, String(input.sharedFolder), { required: true })
            sharedFolderUid = folderTarget.uid
            folderChanged = sharedFolderUid !== previousSharedFolderUid
        }

        if (input.gateway != null) {
            const resolvedGatewayUid = await resolveGatewayUidSoft(auth, input.gateway, warnings, {
                failureResultCode: ResultCodes.PAM_CONFIG_EDIT_FAILED,
                notFoundWarning: (gateway) =>
                    `Gateway "${gateway}" not found. Gateway controller link was left unchanged.`,
                resolveFailedWarning: (gateway, error) =>
                    `Failed to resolve gateway "${gateway}": ${error}. Gateway controller link was left unchanged.`,
            })
            if (resolvedGatewayUid) {
                gatewayChanged = resolvedGatewayUid !== previousGatewayUid
                gatewayUid = resolvedGatewayUid
            } else if (String(input.gateway).trim() === '') {
                gatewayChanged = previousGatewayUid !== ''
                gatewayUid = ''
            }
        }

        removedResourceRecordUids = resolveResourceRecordUidsToRemove(
            storage,
            input.removeResourceRecords,
            existingResources.resourceRecordUids,
            warnings
        )
        const removedSet = new Set(removedResourceRecordUids)
        const resourceRecordUids = existingResources.resourceRecordUids.filter((uid) => !removedSet.has(uid))

        let adminCredentialUid = existingResources.adminCredentialUid
        if (input.adminCredentialUid != null) {
            const trimmed = String(input.adminCredentialUid).trim()
            adminCredentialUid = trimmed || undefined
        }

        let fields = mergeRecordFields(existing.fields, input.fields)
        if (typeChanged) {
            const seededFields = await seedPamConfigurationFieldsFromRecordTypeSoft(auth, configType, (warning) =>
                warnings.push(warning)
            )
            fields = mergeRecordFields(seededFields, fields)
        }
        fields = upsertPamResourcesField(fields, {
            gatewayUid,
            sharedFolderUid,
            resourceRecordUids,
            adminCredentialUid,
        })
        const custom = mergeRecordFields(existing.custom, input.custom)
        const notes = input.notes != null ? String(input.notes) : existing.notes

        const recordKey = await storage.getKeyBytes(configurationUid)
        if (!recordKey) {
            throw new KeeperSdkError(
                `Record key not found for PAM Configuration "${configurationUid}". Sync the vault and try again.`,
                ResultCodes.PAM_CONFIG_EDIT_FAILED
            )
        }

        try {
            await updatePamConfigurationRecordData(
                auth,
                storage,
                configurationUid,
                {
                    type: configType,
                    title,
                    fields,
                    custom,
                    notes,
                },
                record.revision,
                recordKey
            )
        } catch (err) {
            if (err instanceof KeeperSdkError) throw err
            throw new KeeperSdkError(
                `Failed to update PAM Configuration: ${extractErrorMessage(err)}`,
                ResultCodes.PAM_CONFIG_EDIT_FAILED
            )
        }

        if (gatewayChanged && gatewayUid) {
            try {
                await linkConfigurationController(auth, configurationUid, gatewayUid)
            } catch (err) {
                warnings.push(
                    `Updated configuration ${configurationUid} but failed to link gateway ${gatewayUid}: ${extractErrorMessage(err)}`
                )
            }
        }

        if (folderChanged && folderTarget) {
            const moveResult = await placePamConfigurationInFolder(auth, storage, configurationUid, folderTarget, {
                previous: previousFolder,
            })
            if (!moveResult.success) {
                throw new KeeperSdkError(
                    `Updated configuration ${configurationUid} but failed to move into folder: ${moveResult.message || 'unknown error'}`,
                    ResultCodes.PAM_CONFIG_MOVE_FAILED
                )
            }
        }
    }

    let permissionsApplied = false
    if (permissionsWork) {
        permissionsApplied = await applyPamConfigurationPermissions(
            auth,
            configurationUid,
            input.permissions!,
            warnings
        )
    }

    return {
        success: true,
        configurationUid,
        title,
        configType,
        previousConfigType: existing.configType,
        sharedFolderUid,
        previousSharedFolderUid,
        gatewayUid,
        previousGatewayUid,
        gatewayChanged,
        folderChanged,
        titleChanged,
        typeChanged,
        removedResourceRecordUids,
        permissionsApplied,
        warnings,
    }
}

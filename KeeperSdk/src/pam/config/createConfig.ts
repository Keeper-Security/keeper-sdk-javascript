import type { Auth } from '@keeper-security/keeperapi'
import {
    addConfigurationRecordMessage,
    generateEncryptionKey,
    generateUidBytes,
    platform,
    syncDown,
    webSafe64FromBytes,
} from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { applyPamConfigurationPermissions, hasPermissionsInput } from './applyConfigPermissions'
import { isPamConfigurationRecordType, resolvePamConfigurationRecordType } from './configHelpers'
import {
    ensureScheduleField,
    getPaddedJsonBytes,
    linkConfigurationController,
    normalizeFields,
    resolveGatewayUidSoft,
    upsertPamResourcesField,
} from './configMutationHelpers'
import {
    createPamConfigurationInNsfFolder,
    isPamConfigurationInFolder,
    placePamConfigurationInFolder,
    resolvePamConfigFolder,
} from './pamConfigFolder'
import type { CreatePamConfigurationInput, CreatePamConfigurationResult } from './configTypes'

export async function createPamConfiguration(
    auth: Auth,
    storage: InMemoryStorage,
    input: CreatePamConfigurationInput
): Promise<CreatePamConfigurationResult> {
    const title = input.title?.trim() || ''
    if (!title) {
        throw new KeeperSdkError('PAM Configuration title is required.', ResultCodes.PAM_CONFIG_TITLE_REQUIRED)
    }

    const configTypeRaw = input.configType?.trim() || ''
    if (!configTypeRaw) {
        throw new KeeperSdkError(
            'PAM Configuration type is required (e.g. pamAwsConfiguration or environment aws).',
            ResultCodes.PAM_CONFIG_TYPE_REQUIRED
        )
    }

    const configType = resolvePamConfigurationRecordType(configTypeRaw)
    if (!configType || !isPamConfigurationRecordType(configType)) {
        throw new KeeperSdkError(
            `Invalid PAM Configuration type "${configTypeRaw}". Use a known type or environment (aws, azure, gcp, domain, local, oci, github).`,
            ResultCodes.PAM_CONFIG_TYPE_INVALID
        )
    }

    const folderTarget = resolvePamConfigFolder(storage, input.sharedFolder)
    const sharedFolderUid = folderTarget.uid
    const warnings: string[] = []
    const gatewayUid = await resolveGatewayUidSoft(auth, input.gateway, warnings, {
        failureResultCode: ResultCodes.PAM_CONFIG_CREATE_FAILED,
        missingWarning: 'No gateway provided. Configuration will be created without a gateway controller link.',
        notFoundWarning: (gateway) =>
            `Gateway "${gateway}" not found. Configuration will be created without a gateway controller link.`,
        resolveFailedWarning: (gateway, error) =>
            `Failed to resolve gateway "${gateway}": ${error}. Configuration will be created without a gateway controller link.`,
    })

    const fields = upsertPamResourcesField(ensureScheduleField(normalizeFields(input.fields)), {
        gatewayUid,
        sharedFolderUid,
        resourceRecordUids: [],
        adminCredentialUid: input.adminCredentialUid?.trim() || undefined,
    })
    const custom = normalizeFields(input.custom)

    const configurationUidBytes = generateUidBytes()
    const recordKey = generateEncryptionKey()
    const configurationUid = webSafe64FromBytes(configurationUidBytes)

    const recordPayload = {
        type: configType,
        title,
        fields,
        custom,
        notes: input.notes || '',
    }

    try {
        if (folderTarget.kind === 'nsf') {
            await createPamConfigurationInNsfFolder(auth, storage, {
                configurationUid,
                configurationUidBytes,
                recordKey,
                recordPayload,
                folderUid: sharedFolderUid,
            })
        } else {
            await auth.executeRestAction(
                addConfigurationRecordMessage({
                    configurationUid: configurationUidBytes,
                    recordKey: await platform.aesGcmEncrypt(recordKey, auth.dataKey!),
                    data: await platform.aesGcmEncrypt(getPaddedJsonBytes(recordPayload), recordKey),
                })
            )
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to create PAM Configuration: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_CONFIG_CREATE_FAILED
        )
    }

    await storage.saveKeyBytes(configurationUid, recordKey)

    try {
        await syncDown({ auth, storage })
    } catch (err) {
        warnings.push(`Created configuration ${configurationUid} but vault sync failed: ${extractErrorMessage(err)}`)
    }

    if (folderTarget.kind === 'shared_folder') {
        const moveResult = await placePamConfigurationInFolder(auth, storage, configurationUid, folderTarget, {
            srcFolderUid: '',
        })
        if (!moveResult.success) {
            warnings.push(
                `Created configuration ${configurationUid} but failed to move into shared folder: ${
                    moveResult.message || 'unknown error'
                }`
            )
        } else {
            try {
                await syncDown({ auth, storage })
            } catch (err) {
                warnings.push(
                    `Moved configuration ${configurationUid} but post-move sync failed: ${extractErrorMessage(err)}`
                )
            }
        }
    }

    if (!isPamConfigurationInFolder(storage, configurationUid, folderTarget)) {
        warnings.push(
            `Created configuration ${configurationUid} but it is still not linked to folder ${sharedFolderUid}.`
        )
    }

    let gatewayLinked = false
    if (gatewayUid) {
        try {
            await linkConfigurationController(auth, configurationUid, gatewayUid)
            gatewayLinked = true
        } catch (err) {
            warnings.push(
                `Created configuration ${configurationUid} but failed to link gateway ${gatewayUid}: ${extractErrorMessage(err)}`
            )
        }
    }

    let permissionsApplied = false
    if (hasPermissionsInput(input.permissions)) {
        permissionsApplied = await applyPamConfigurationPermissions(
            auth,
            configurationUid,
            input.permissions!,
            warnings,
            { warnOnDefaultReset: false }
        )
    }

    return {
        success: true,
        configurationUid,
        title,
        configType,
        sharedFolderUid,
        gatewayUid,
        gatewayLinked,
        permissionsApplied,
        warnings,
    }
}

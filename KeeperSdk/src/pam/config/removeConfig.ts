import type { Auth, DRecordMetadata } from '@keeper-security/keeperapi'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { isNestedShareRecord } from '../../nestedShareFolders/nsfHelpers'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { getPamConfigurationDisplayName } from './configHelpers'
import { findPamConfigurationByUidOrTitle, readTypedRecordPayload } from './configMutationHelpers'
import { removePamConfigurationRecord } from './pamConfigFolder'
import type { RemovePamConfigurationInput, RemovePamConfigurationResult } from './configTypes'

export async function removePamConfiguration(
    auth: Auth,
    storage: InMemoryStorage,
    input: RemovePamConfigurationInput
): Promise<RemovePamConfigurationResult> {
    const configurationUidOrTitle = input.configurationUidOrTitle?.trim() || ''
    if (!configurationUidOrTitle) {
        throw new KeeperSdkError('PAM Configuration UID or title is required.', ResultCodes.PAM_CONFIG_REQUIRED)
    }

    let record
    try {
        record = findPamConfigurationByUidOrTitle(storage, configurationUidOrTitle)
    } catch (err) {
        if (err instanceof KeeperSdkError && err.resultCode === ResultCodes.PAM_CONFIG_NOT_FOUND) {
            return {
                success: false,
                found: false,
            }
        }
        throw err
    }

    const configurationUid = record.uid
    const title = getPamConfigurationDisplayName(record)
    const configType = readTypedRecordPayload(record).configType

    if (!isNestedShareRecord(storage, configurationUid)) {
        const metadata = storage.getByUid<DRecordMetadata>(VaultObjectKind.Metadata, configurationUid)
        if (metadata && !metadata.owner && !metadata.canEdit) {
            throw new KeeperSdkError(
                `Permission denied: you need edit rights to remove PAM Configuration ${configurationUid} from its shared folder.`,
                ResultCodes.PAM_CONFIG_REMOVE_FAILED
            )
        }
    }

    try {
        const deleteResult = await removePamConfigurationRecord(auth, storage, configurationUid)
        if (!deleteResult.success) {
            throw new KeeperSdkError(
                deleteResult.message || `Failed to remove PAM Configuration ${configurationUid}.`,
                ResultCodes.PAM_CONFIG_REMOVE_FAILED
            )
        }
    } catch (err) {
        if (err instanceof KeeperSdkError) throw err
        throw new KeeperSdkError(
            `Failed to remove PAM Configuration: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_CONFIG_REMOVE_FAILED
        )
    }

    return {
        success: true,
        found: true,
        configurationUid,
        title,
        configType,
    }
}

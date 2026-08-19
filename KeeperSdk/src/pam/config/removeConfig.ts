import type { Auth, DRecord, DRecordMetadata } from '@keeper-security/keeperapi'
import { VaultObjectKind } from '../../folders/folderHelpers'
import { isNestedShareRecord } from '../../nestedShareFolders/nsfHelpers'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { getPamConfigurationDisplayName } from './configHelpers'
import { findPamConfigurationByUidOrTitle, readTypedRecordPayload } from './configMutationHelpers'
import { removePamConfigurationRecord } from './pamConfigFolder'
import type { RemovePamConfigurationInput, RemovePamConfigurationResult, RemovedPamConfiguration } from './configTypes'

function collectConfigurationUidOrTitles(input: RemovePamConfigurationInput): string[] {
    const raw = input.configurationUidOrTitle
    const values = Array.isArray(raw) ? raw : raw != null ? [raw] : []
    const seen = new Set<string>()
    const collected: string[] = []
    for (const value of values) {
        if (typeof value !== 'string') continue
        const parts = value.includes(',')
            ? value
                  .split(',')
                  .map((entry) => entry.trim())
                  .filter(Boolean)
            : [value.trim()].filter(Boolean)
        for (const trimmed of parts) {
            const key = trimmed
            if (seen.has(key)) continue
            seen.add(key)
            collected.push(trimmed)
        }
    }
    return collected
}

function toRemovedPamConfiguration(record: DRecord): RemovedPamConfiguration {
    return {
        configurationUid: record.uid,
        title: getPamConfigurationDisplayName(record),
        configType: readTypedRecordPayload(record).configType,
    }
}

export async function removePamConfiguration(
    auth: Auth,
    storage: InMemoryStorage,
    input: RemovePamConfigurationInput
): Promise<RemovePamConfigurationResult> {
    const identifiers = collectConfigurationUidOrTitles(input)
    if (!identifiers.length) {
        throw new KeeperSdkError('PAM Configuration UID or title is required.', ResultCodes.PAM_CONFIG_REQUIRED)
    }

    const records: DRecord[] = []
    const resolved: RemovedPamConfiguration[] = []
    const seenUids = new Set<string>()
    const notFound: string[] = []

    for (const identifier of identifiers) {
        try {
            const record = findPamConfigurationByUidOrTitle(storage, identifier)
            if (seenUids.has(record.uid)) continue
            seenUids.add(record.uid)
            records.push(record)
            resolved.push(toRemovedPamConfiguration(record))
        } catch (err) {
            if (err instanceof KeeperSdkError && err.resultCode === ResultCodes.PAM_CONFIG_NOT_FOUND) {
                notFound.push(identifier)
                continue
            }
            throw err
        }
    }

    if (!records.length) {
        return {
            success: false,
            found: false,
            configurations: [],
            notFound,
        }
    }

    if (notFound.length) {
        throw new KeeperSdkError(
            `PAM Configuration(s) not found: ${notFound.map((name) => `"${name}"`).join(', ')}.`,
            ResultCodes.PAM_CONFIG_NOT_FOUND
        )
    }

    const removed: string[] = []
    const failures: string[] = []
    for (const record of records) {
        const configurationUid = record.uid
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
                failures.push(deleteResult.message || `Failed to remove PAM Configuration ${configurationUid}.`)
                continue
            }
            removed.push(configurationUid)
        } catch (err) {
            failures.push(`Failed to remove PAM Configuration ${configurationUid}: ${extractErrorMessage(err)}`)
        }
    }

    if (failures.length) {
        const removedSuffix = removed.length ? ` Removed: ${removed.join(', ')}.` : ''
        throw new KeeperSdkError(
            `Failed to remove one or more PAM Configurations: ${failures.join(' ')}${removedSuffix}`,
            ResultCodes.PAM_CONFIG_REMOVE_FAILED
        )
    }

    if (removed.length !== resolved.length) {
        throw new KeeperSdkError(
            'Internal error: remove operation completed with inconsistent result counts.',
            ResultCodes.PAM_CONFIG_REMOVE_FAILED
        )
    }

    const removedSet = new Set(removed)
    const finalRemoved = resolved.filter((entry) => removedSet.has(entry.configurationUid))
    if (!finalRemoved.length) {
        return {
            success: false,
            found: false,
            configurations: [],
            notFound,
        }
    }

    return {
        success: true,
        found: true,
        configurationUid: finalRemoved[0].configurationUid,
        title: finalRemoved[0].title,
        configType: finalRemoved[0].configType,
        configurations: finalRemoved,
        notFound: [],
    }
}

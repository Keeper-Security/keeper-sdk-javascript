import type { Auth, DRecordRotation } from '@keeper-security/keeperapi'
import { normal64Bytes, platform, Router, setRecordRotationMessage } from '@keeper-security/keeperapi'
import type { InMemoryStorage } from '../../storage/InMemoryStorage'
import { extractErrorMessage, KeeperSdkError, ResultCodes } from '../../utils'
import { getRecordTitle } from '../../records/RecordUtils'
import {
    EditRotationInput,
    EditRotationResult,
    PasswordComplexityInput,
    RotationProfile,
    ScheduleData,
} from './rotationTypes'
import { getVaultRecord, recordExistsInVault, getVaultRecordTitleType } from './rotationHelpers'
import { RECORD_ROTATION_KIND } from './rotationConstants'

const DEFAULT_PAM_SPECIAL_CHAR = '!@#$%^&*()_+-=[]{}|;:,.<>?'

export async function editRotation(
    auth: Auth,
    storage: InMemoryStorage,
    input: EditRotationInput
): Promise<EditRotationResult> {
    const recordUid = input.recordUid?.trim() || ''
    if (!recordUid) {
        throw new KeeperSdkError(
            'Record UID is required for PAM rotation edit.',
            ResultCodes.PAM_ROTATION_RECORD_REQUIRED
        )
    }

    let recordUidBytes: Uint8Array
    try {
        recordUidBytes = normal64Bytes(recordUid)
    } catch (err) {
        throw new KeeperSdkError(
            `Invalid record UID "${recordUid}": ${extractErrorMessage(err)}`,
            ResultCodes.PAM_ROTATION_RECORD_REQUIRED
        )
    }

    const record = getVaultRecord(storage, recordUid)
    if (!record) {
        throw new KeeperSdkError(
            `Record UID "${recordUid}" not found in vault.`,
            ResultCodes.PAM_ROTATION_RECORD_REQUIRED
        )
    }

    const validRecords: EditRotationResult['validRecords'] = []
    const skippedRecords: EditRotationResult['skippedRecords'] = []

    try {
        const currentRotation = storage.getByUid<DRecordRotation>(RECORD_ROTATION_KIND, recordUid)

        if (!currentRotation && !input.configUid && !input.iamAadConfigUid && !input.saasConfigUid) {
            throw new KeeperSdkError(
                `Record "${recordUid}" does not have rotation configured yet. ` +
                    `You must provide a PAM Configuration UID (--config) to configure rotation for this record.`,
                ResultCodes.PAM_ROTATION_RECORD_REQUIRED
            )
        }

        let configUid = input.configUid?.trim()
        if (!configUid && currentRotation?.configurationUid) {
            configUid = currentRotation.configurationUid
        }

        if (!configUid && !currentRotation) {
            throw new KeeperSdkError(
                `PAM Configuration UID is required when setting up rotation for the first time. ` +
                    `Provide it with --config, --iam-aad-config, or --saas-config.`,
                ResultCodes.PAM_ROTATION_RECORD_REQUIRED
            )
        }

        let resourceUid = input.resourceUid?.trim()
        if (!resourceUid && currentRotation?.resourceUid) {
            resourceUid = currentRotation.resourceUid
        }

        let currentRotationRevision = 0
        if (currentRotation?.revision) {
            currentRotationRevision = currentRotation.revision
        }

        let scheduleData = validateAndBuildScheduleData(input)
        if (!scheduleData && currentRotation?.schedule) {
            try {
                scheduleData =
                    typeof currentRotation.schedule === 'string'
                        ? JSON.parse(currentRotation.schedule)
                        : currentRotation.schedule
            } catch (e) {
                scheduleData = null
            }
        }

        let currentSchedule = ''
        let currentComplexity = new Uint8Array()
        let currentDisabled = false
        let currentResourceUid = new Uint8Array()

        if (currentRotation) {
            if (currentRotation.schedule) {
                try {
                    currentSchedule =
                        typeof currentRotation.schedule === 'string'
                            ? currentRotation.schedule
                            : JSON.stringify(currentRotation.schedule)
                } catch (e) {
                    currentSchedule = ''
                }
            }

            if (currentRotation.pwdComplexity) {
                if (typeof currentRotation.pwdComplexity === 'string') {
                    try {
                        currentComplexity = platform.base64ToBytes(currentRotation.pwdComplexity)
                    } catch (e) {
                        currentComplexity = new Uint8Array()
                    }
                } else if (currentRotation.pwdComplexity instanceof Uint8Array) {
                    currentComplexity = currentRotation.pwdComplexity
                } else if (typeof currentRotation.pwdComplexity === 'object') {
                    const reencrypted = await encryptPasswordComplexity(
                        storage,
                        recordUid,
                        currentRotation.pwdComplexity as any
                    )
                    if (reencrypted) {
                        currentComplexity = platform.base64ToBytes(reencrypted)
                    }
                }
            }

            currentDisabled = currentRotation.disabled === true

            if (currentRotation.resourceUid) {
                try {
                    currentResourceUid = normal64Bytes(currentRotation.resourceUid)
                } catch (e) {
                    currentResourceUid = new Uint8Array()
                }
            }
        }

        let passwordComplexityEncrypted = currentComplexity
        if (input.passwordComplexity) {
            const encrypted = await encryptPasswordComplexity(storage, recordUid, input.passwordComplexity)
            if (encrypted) {
                passwordComplexityEncrypted = platform.base64ToBytes(encrypted)
            }
        }

        let finalScheduleData = scheduleData
        if (!finalScheduleData && currentSchedule) {
            try {
                finalScheduleData = typeof currentSchedule === 'string' ? JSON.parse(currentSchedule) : currentSchedule
            } catch (e) {
                finalScheduleData = null
            }
        }

        let finalDisabled = currentDisabled
        if (input.enable === true) {
            finalDisabled = false
        } else if (input.disable === true) {
            finalDisabled = true
        }

        let finalResourceUidBytes = currentResourceUid
        if (input.resourceUid?.trim()) {
            finalResourceUidBytes = normal64Bytes(input.resourceUid)
        }

        let schedule = finalScheduleData ? formatScheduleType(finalScheduleData) : 'On-Demand'
        let complexity = input.passwordComplexity ? formatComplexity(input.passwordComplexity) : ''

        const configUidBytes = configUid ? normal64Bytes(configUid) : new Uint8Array()

        const rotationRequest: Router.IRouterRecordRotationRequest = {
            revision: currentRotationRevision,
            recordUid: recordUidBytes,
            configurationUid: configUidBytes,
            resourceUid: finalResourceUidBytes,
            schedule: finalScheduleData ? JSON.stringify(finalScheduleData) : currentSchedule,
            pwdComplexity: passwordComplexityEncrypted,
            disabled: finalDisabled,
            noop: input.scheduleOnly ? true : false,
        }

        const message = setRecordRotationMessage(rotationRequest)
        await auth.executeRouterRestAction(message)

        const finalEnabled = !finalDisabled

        validRecords.push({
            recordUid,
            recordTitle: getRecordTitle(record) || '[untitled]',
            enabled: finalEnabled,
            configUid: configUid || '',
            resourceUid: resourceUid,
            schedule,
            complexity,
        })

        return {
            successful: true,
            validRecords,
            skippedRecords,
            message:
                skippedRecords.length > 0
                    ? `Updated ${validRecords.length} record(s), skipped ${skippedRecords.length} record(s)`
                    : `Successfully updated ${validRecords.length} record(s)`,
        }
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to update rotation: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_ROTATION_INFO_FAILED
        )
    }
}

function validateAndBuildScheduleData(input: EditRotationInput): ScheduleData[] | null {
    if (input.onDemand) {
        return []
    }

    if (input.scheduleJson && input.scheduleJson.length > 0) {
        return input.scheduleJson
    }

    if (input.scheduleCron) {
        return [
            {
                type: 'CRON',
                expression: input.scheduleCron,
            },
        ]
    }

    if (input.scheduleConfig) {
        return null
    }

    return null
}

function formatScheduleType(scheduleData: ScheduleData[] | null): string {
    if (!scheduleData || scheduleData.length === 0) {
        return 'On-Demand'
    }
    return (scheduleData[0] as any).type || 'Scheduled'
}

function formatComplexity(complexity: PasswordComplexityInput): string {
    const specialChars = complexity.specialChars || DEFAULT_PAM_SPECIAL_CHAR
    return `${complexity.length},${complexity.caps},${complexity.lowercase},${complexity.digits},${complexity.special},${specialChars}`
}

async function encryptPasswordComplexity(
    storage: InMemoryStorage,
    recordUid: string,
    complexity: PasswordComplexityInput | undefined
): Promise<string | null> {
    if (!complexity) {
        return null
    }

    const recordKey = await storage.getKeyBytes(recordUid)
    if (!recordKey) {
        return null
    }

    try {
        const specialChars = complexity.specialChars || DEFAULT_PAM_SPECIAL_CHAR
        const complexityData = {
            length: complexity.length,
            caps: complexity.caps,
            lowercase: complexity.lowercase,
            digits: complexity.digits,
            special: complexity.special,
            specialChars,
        }

        const plainText = JSON.stringify(complexityData)
        const encrypted = await platform.aesGcmEncrypt(platform.stringToBytes(plainText), recordKey)
        return platform.bytesToBase64(encrypted)
    } catch (err) {
        throw new KeeperSdkError(
            `Failed to encrypt password complexity: ${extractErrorMessage(err)}`,
            ResultCodes.PAM_ROTATION_INFO_FAILED
        )
    }
}

function validateRotationProfile(input: EditRotationInput): string[] {
    const errors: string[] = []
    const profile = input.rotationProfile

    if (profile === 'general') {
        if (!input.resourceUid) {
            errors.push('General rotation profile requires resourceUid')
        }
    } else if (profile === 'iam_user') {
        if (!input.iamAadConfigUid && !input.configUid) {
            errors.push('IAM user rotation requires iamAadConfigUid or configUid')
        }
    } else if (profile === 'scripts_only') {
        if (!input.configUid) {
            errors.push('Scripts-only rotation requires configUid')
        }
    } else if (profile === 'saas') {
        if (!input.saasConfigUid) {
            errors.push('SaaS rotation requires saasConfigUid')
        }
    }

    return errors
}

export function validateRotationInput(input: EditRotationInput): string[] {
    const errors: string[] = []

    if (!input.recordUid && !input.folderUid) {
        errors.push('Either recordUid or folderUid is required')
    }

    if (input.recordUid && input.folderUid) {
        errors.push('Cannot specify both recordUid and folderUid')
    }

    if (input.enable && input.disable) {
        errors.push('Cannot enable and disable rotation at the same time')
    }

    const scheduleCount =
        (input.onDemand ? 1 : 0) +
        (input.scheduleJson ? 1 : 0) +
        (input.scheduleCron ? 1 : 0) +
        (input.scheduleConfig ? 1 : 0)

    if (scheduleCount > 1) {
        errors.push('Only one schedule option can be specified')
    }

    if (input.passwordComplexity) {
        if (
            input.passwordComplexity.length < 1 ||
            input.passwordComplexity.caps < 0 ||
            input.passwordComplexity.lowercase < 0 ||
            input.passwordComplexity.digits < 0 ||
            input.passwordComplexity.special < 0
        ) {
            errors.push('Password complexity values must be non-negative')
        }
    }

    return errors
}

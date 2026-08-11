import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    resolvePamConfigurationRecordType,
    suppressLogs,
    type EditPamConfigurationInput,
    type EditPamConfigurationResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'
import { isYes } from '../../utils/format'
import {
    PAM_CONFIG_ENVIRONMENTS,
    promptPamConfigurationFields,
    promptPamConfigurationPermissions,
} from './configFieldPrompts'

async function editPamConfigurationExample() {
    const vault = await login()

    try {
        const configurationUidOrTitle = (await prompt('PAM Configuration UID or title: ')).trim()
        if (!configurationUidOrTitle) {
            logger.info('Configuration UID or title is required.')
            return
        }

        const titleRaw = (await prompt('New title (Enter to keep): ')).trim()
        const title = titleRaw || undefined

        const environmentRaw = (
            await prompt(`New environment (${PAM_CONFIG_ENVIRONMENTS.join('|')}, Enter to keep): `)
        )
            .trim()
            .toLowerCase()
        let configType: string | undefined
        let environmentForFields = ''
        if (environmentRaw) {
            configType = resolvePamConfigurationRecordType(environmentRaw)
            if (!configType) {
                logger.info(`Invalid environment. Choose one of: ${PAM_CONFIG_ENVIRONMENTS.join(', ')}`)
                return
            }
            environmentForFields = environmentRaw
        }

        const sharedFolderRaw = (
            await prompt('Shared folder or Nested Share Folder UID or name (Enter to keep): ')
        ).trim()
        const sharedFolder = sharedFolderRaw || undefined

        const gatewayPrompt = (await prompt('Gateway UID or name (Enter to keep, "-" to clear): ')).trim()
        let gateway: string | undefined
        if (gatewayPrompt === '-') gateway = ''
        else if (gatewayPrompt) gateway = gatewayPrompt

        const updateFields = isYes(await prompt('Update environment / schedule / port-mapping fields? [y/N]: '))
        if (updateFields && !environmentForFields) {
            environmentForFields = (
                await prompt(`Environment for field prompts (${PAM_CONFIG_ENVIRONMENTS.join('|')}): `)
            )
                .trim()
                .toLowerCase()
            if (!resolvePamConfigurationRecordType(environmentForFields)) {
                logger.info(`Invalid environment. Choose one of: ${PAM_CONFIG_ENVIRONMENTS.join(', ')}`)
                return
            }
        }

        const fieldPrompt = updateFields ? await promptPamConfigurationFields(environmentForFields) : undefined
        const fields = fieldPrompt?.fields
        const adminCredentialUid = fieldPrompt?.adminCredentialUid

        const removeRaw = (await prompt('Remove resource record UIDs/titles (comma-separated, optional): ')).trim()
        const removeResourceRecords = removeRaw
            ? removeRaw
                  .split(',')
                  .map((entry) => entry.trim())
                  .filter(Boolean)
            : undefined

        const permissions = await promptPamConfigurationPermissions()

        const input: EditPamConfigurationInput = {
            configurationUidOrTitle,
            title,
            configType,
            sharedFolder,
            gateway,
            fields,
            adminCredentialUid,
            removeResourceRecords,
            permissions,
        }

        let result: EditPamConfigurationResult
        const restore = suppressLogs()
        try {
            result = await vault.editPamConfiguration(input)
        } finally {
            restore()
        }

        logger.info('')
        logger.info(vault.formatEditPamConfigurationOutput(result))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(editPamConfigurationExample)

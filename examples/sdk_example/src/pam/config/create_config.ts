import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    resolvePamConfigurationRecordType,
    suppressLogs,
    type CreatePamConfigurationResult,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'
import { isYes } from '../../utils/format'
import {
    PAM_CONFIG_ENVIRONMENTS,
    promptPamConfigurationFields,
    promptPamConfigurationPermissions,
} from './configFieldPrompts'

async function createPamConfigurationExample() {
    const vault = await login()

    try {
        const environment = (await prompt(`Environment (${PAM_CONFIG_ENVIRONMENTS.join('|')}): `)).trim().toLowerCase()
        if (!environment) {
            logger.info('Environment is required.')
            return
        }
        const configType = resolvePamConfigurationRecordType(environment)
        if (!configType) {
            logger.info(`Invalid environment. Choose one of: ${PAM_CONFIG_ENVIRONMENTS.join(', ')}`)
            return
        }

        const title = (await prompt('Configuration title: ')).trim()
        if (!title) {
            logger.info('Title is required.')
            return
        }

        const sharedFolder = (await prompt('Shared folder or Nested Share Folder UID or name: ')).trim()
        if (!sharedFolder) {
            logger.info('Shared folder or Nested Share Folder is required.')
            return
        }

        const gateway = (await prompt('Gateway UID or name (optional): ')).trim() || undefined
        const { fields, adminCredentialUid } = await promptPamConfigurationFields(environment)
        const permissions = await promptPamConfigurationPermissions()
        const returnValue = isYes(await prompt('Return value only (automation / -r)? [y/N]: '))

        let result: CreatePamConfigurationResult | string
        const restore = suppressLogs()
        try {
            result = await vault.createPamConfiguration({
                title,
                configType,
                sharedFolder,
                gateway,
                fields,
                adminCredentialUid,
                permissions,
                returnValue,
            })
        } finally {
            restore()
        }

        if (returnValue) {
            logger.info(result as string)
            return
        }

        logger.info('')
        logger.info(vault.formatCreatePamConfigurationOutput(result as CreatePamConfigurationResult))
        logger.info('')
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(createPamConfigurationExample)

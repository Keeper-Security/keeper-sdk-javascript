import {
    cleanup,
    extractErrorMessage,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../../utils/runner'

const optional = async (label: string): Promise<string | undefined> => {
    const value = (await prompt(label)).trim()
    return value || undefined
}

async function editPamConnectionExample() {
    const vault = await login()
    try {
        const record = (await prompt('PAM resource or configuration UID/title: ')).trim()
        const configuration = await optional('Configuration UID/title (Enter to auto-resolve): ')
        const adminUser = await optional('Admin PAM User UID/title (Enter to skip): ')
        const launchUser = await optional('Launch PAM User UID/title (Enter to skip): ')
        const protocol = await optional('Protocol (Enter to keep current): ')
        const connections = await optional('Connections [on/off/default] (Enter to skip): ')
        const connectionsRecording = await optional('Connections recording [on/off/default] (Enter to skip): ')
        const typescriptRecording = await optional('Typescript recording [on/off/default] (Enter to skip): ')
        const portText = await optional('Connection override port (Enter to skip): ')
        const keyEvents = await optional('Key events [on/off/default] (Enter to skip): ')
        const silent = (await prompt('Suppress output? [y/N]: ')).trim().toLowerCase() === 'y'

        const restore = suppressLogs()
        let result
        try {
            result = await vault.editPamConnection({
                record,
                configuration,
                adminUser,
                launchUser,
                protocol,
                connections: connections as 'on' | 'off' | 'default' | undefined,
                connectionsRecording: connectionsRecording as 'on' | 'off' | 'default' | undefined,
                typescriptRecording: typescriptRecording as 'on' | 'off' | 'default' | undefined,
                connectionsOverridePort: portText ? Number(portText) : undefined,
                keyEvents: keyEvents as 'on' | 'off' | 'default' | undefined,
                silent,
            })
        } finally {
            restore()
        }

        logger.info(`Record: ${result.recordUid}`)
        logger.info(`Type: ${result.recordType}`)
        logger.info(`Configuration: ${result.configurationUid || '(none)'}`)
        logger.info(`Changed: ${result.changed}`)
        logger.info(`Record updated: ${result.recordUpdated}`)
        logger.info(`DAG updated: ${result.dagUpdated}`)
        for (const warning of result.warnings) logger.warn(warning)
    } catch (err) {
        logger.error(`Operation failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(editPamConnectionExample)

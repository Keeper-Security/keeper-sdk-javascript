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

async function editRbiExample() {
    const vault = await login()
    try {
        const record = (await prompt('RBI record UID/title: ')).trim()
        const configuration = await optional('Configuration UID/title (Enter to auto-resolve): ')
        const remoteBrowserIsolation = await optional('Remote browser isolation [on/off/default]: ')
        const connectionsRecording = await optional('Connections recording [on/off/default]: ')
        const keyEvents = await optional('Key events [on/off/default]: ')
        const allowUrlNavigation = await optional('Allow URL navigation [on/off/default]: ')
        const ignoreServerCert = await optional('Ignore server certificate [on/off/default]: ')
        const allowedUrls = await optional('Allowed URLs (newline separated, Enter to skip): ')
        const allowedResourceUrls = await optional('Allowed resource URLs (newline separated, Enter to skip): ')
        const autofillCredentials = await optional('Autofill credentials UID/title (Enter to skip): ')
        const autofillTargets = await optional('Autofill targets (newline separated, Enter to skip): ')
        const allowCopy = await optional('Allow copy [on/off/default]: ')
        const allowPaste = await optional('Allow paste [on/off/default]: ')
        const disableAudio = await optional('Disable audio [on/off/default]: ')
        const audioChannels = await optional('Audio channels (Enter to skip): ')
        const audioBitDepth = await optional('Audio bit depth [8/16] (Enter to skip): ')
        const audioSampleRate = await optional('Audio sample rate (Enter to skip): ')

        const restore = suppressLogs()
        let result
        try {
            result = await vault.editPamRbi({
                record,
                configuration,
                remoteBrowserIsolation: remoteBrowserIsolation as 'on' | 'off' | 'default' | undefined,
                connectionsRecording: connectionsRecording as 'on' | 'off' | 'default' | undefined,
                keyEvents: keyEvents as 'on' | 'off' | 'default' | undefined,
                allowUrlNavigation: allowUrlNavigation as 'on' | 'off' | 'default' | undefined,
                ignoreServerCert: ignoreServerCert as 'on' | 'off' | 'default' | undefined,
                allowedUrls: allowedUrls?.split(/\r?\n/).map((value) => value.trim()).filter(Boolean),
                allowedResourceUrls: allowedResourceUrls?.split(/\r?\n/).map((value) => value.trim()).filter(Boolean),
                autofillCredentials,
                autofillTargets: autofillTargets?.split(/\r?\n/).map((value) => value.trim()).filter(Boolean),
                allowCopy: allowCopy as 'on' | 'off' | 'default' | undefined,
                allowPaste: allowPaste as 'on' | 'off' | 'default' | undefined,
                disableAudio: disableAudio as 'on' | 'off' | 'default' | undefined,
                audioChannels: audioChannels ? Number(audioChannels) : undefined,
                audioBitDepth: audioBitDepth ? Number(audioBitDepth) : undefined,
                audioSampleRate: audioSampleRate ? Number(audioSampleRate) : undefined,
            })
        } finally {
            restore()
        }

        logger.info(`Record: ${result.recordUid}`)
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

runExample(editRbiExample)

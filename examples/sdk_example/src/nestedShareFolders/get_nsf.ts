import {
    cleanup,
    extractErrorMessage,
    GetNsfFormat,
    login,
    logger,
    prompt,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { isYes } from '../utils/format'

async function getNsf() {
    const vault = await login()

    try {
        const identifier = (await prompt('Record UID, folder UID, or title: ')).trim()
        if (!identifier) {
            logger.info('No UID or title given.')
            return
        }

        const asJson = isYes(await prompt('Output as JSON? [y/N]: '))
        const verbose = isYes(await prompt('Verbose permissions? [y/N]: '))
        const unmask = isYes(await prompt('Unmask secrets? [y/N]: '))

        const restore = suppressLogs()
        let result
        try {
            result = await vault.getNestedShareFolder(identifier, {
                format: asJson ? GetNsfFormat.JSON : GetNsfFormat.Detail,
                verbose,
                unmask,
            })
        } finally {
            restore()
        }

        logger.info('')
        const output = asJson ? JSON.stringify(result.view, null, 2) : vault.formatNsfDetail(result, verbose)
        process.stdout.write(`${output}\n`)
        logger.info('')
    } catch (err) {
        logger.error(`Lookup failed: ${extractErrorMessage(err)}`)
        process.exitCode = 1
    } finally {
        cleanup(vault)
    }
}

runExample(getNsf)

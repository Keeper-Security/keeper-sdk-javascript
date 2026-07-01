import {
    cleanup,
    extractErrorMessage,
    GetNsfFormat,
    login,
    logger,
    suppressLogs,
} from '@keeper-security/keeper-sdk-javascript'
import { runExample } from '../utils/runner'
import { promptRequired, promptYesNo, yesNoPrompt } from '../utils/promptCommands'

async function getNsf() {
    const vault = await login()

    try {
        const identifier = await promptRequired('Record UID, folder UID, or title: ', 'No UID or title given.')

        const asJson = await promptYesNo(yesNoPrompt('Output as JSON?'))
        const verbose = await promptYesNo(yesNoPrompt('Verbose permissions?'))
        const unmask = await promptYesNo(yesNoPrompt('Unmask secrets?'))

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
        const output = asJson ? vault.formatNsfJson(result) : vault.formatNsfDetail(result, verbose)
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

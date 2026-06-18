import type { CliCommandDefinition } from '../types'
import { wantsCliHelp } from '../parse'
import { formatDetailedHelpForCommand } from '../help'
import { executeGet } from './getCore'

export const getCommand: CliCommandDefinition = {
    name: 'get',
    order: 10,
    aliases: ['g'],
    description: 'Get details of a record or folder by UID or title.',
    usage: 'get <uid|title> [--format {detail,json,password,fields}] [--unmask]',
    flagOptions: ['--format', '--unmask', '--detail', '--json'],
    help: {
        description: 'Get the details of a record/folder/team by UID or title',
        usage: '[-h] [--unmask] [--format {detail,json,password,fields}] uid',
        positionals: [{ name: 'uid', help: 'UID or title to search for' }],
        options: [
            { flags: '--unmask', help: 'display hidden field values (records)' },
            {
                flags: '--format',
                choices: 'detail,json,password,fields',
                help: 'output format (default: detail)',
            },
        ],
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) {
            return { code: 0, out: formatDetailedHelpForCommand(getCommand), err: '' }
        }
        try {
            return await executeGet(host, parsed, 'get')
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('get', e) }
        }
    },
}

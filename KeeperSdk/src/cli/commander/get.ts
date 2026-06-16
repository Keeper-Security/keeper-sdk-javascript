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
        title: 'get — record/folder details (Keeper Commander)',
        synopsis: 'usage: get [--unmask] [--format {detail,json,password,fields}] uid',
        description:
            '  Resolves a vault object by UID or title. Records support all output formats; folders and shared folders support detail/json.\n' +
            '  Prefer get for exact UID lookup; search is for text in titles and fields.',
        arguments: '  uid    Record, folder, or shared-folder UID or title.',
        options: `  --format {detail,json,password,fields}
                 detail (default): human-readable output.
                 json: JSON object.
                 password: password field only (records).
                 fields: JSON array of {name, value} (records).
  --unmask         Show sensitive field values (records).
  --help, -h       Show this help.`,
        examples: `  get "Amazon"
  get AbCdEf123456 --format json --unmask
  get MyFolderUid --format json`,
        seeAlso: '  ls, search, list',
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

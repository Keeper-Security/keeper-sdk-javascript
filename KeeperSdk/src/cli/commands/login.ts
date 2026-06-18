import type { CliCommandDefinition, CliResult, KeeperCliHost, ParsedCli } from '../types'
import { getOpt, hasOpt, rejectUnknownOptions, wantsCliHelp } from '../parse'
import { formatDetailedHelpForCommand } from '../help'
import { utf8ToBase64Url } from '../utils'

const LOGIN_ALLOWED = new Set([
    'username',
    'user',
    'session-token',
    'token',
    'st',
    'session-token-plain',
])

export async function runLoginCommand(host: KeeperCliHost, parsed?: ParsedCli): Promise<CliResult> {
    const opts = parsed?.opts ?? new Map<string, string | true>()
    if (parsed && wantsCliHelp(parsed)) {
        return { code: 0, out: formatDetailedHelpForCommand(loginCommand), err: '' }
    }
    if (parsed) {
        for (const secretFlag of ['password', 'pass', 'pwd'] as const) {
            if (opts.has(secretFlag)) {
                return {
                    code: 1,
                    out: '',
                    err:
                        'login: do not pass --password on the command line (it is logged and visible). ' +
                        'Use KEEPER_PASSWORD for automation, or run `login --username …` in the shell and enter the password when prompted (masked).\n',
                }
            }
        }
        const bad = rejectUnknownOptions(parsed, LOGIN_ALLOWED, 'login')
        if (bad) return bad
    }

    const username = getOpt(opts, 'username', 'user') ?? host.envString('KEEPER_USERNAME')
    const passwordEnv = host.envString('KEEPER_PASSWORD')
    const sessionRaw = getOpt(opts, 'session-token', 'token', 'st') ?? host.envString('KEEPER_SESSION_TOKEN')
    const sessionPlain = parsed && hasOpt(opts, 'session-token-plain')

    if (parsed) {
        const stPlainVal = opts.get('session-token-plain')
        if (stPlainVal !== undefined && stPlainVal !== true) {
            return {
                code: 1,
                out: '',
                err: 'login: --session-token-plain is a boolean flag (no value)\n',
            }
        }
    }

    if (!username) {
        return {
            code: 1,
            out: '',
            err: 'login: provide --username or KEEPER_USERNAME.\n',
        }
    }

    const sessionTrimmed = typeof sessionRaw === 'string' ? sessionRaw.trim() : ''
    if (sessionTrimmed.length > 0) {
        return loginWithSessionToken(host, username, sessionTrimmed, { plainToken: !!sessionPlain })
    }

    if (!passwordEnv) {
        return {
            code: 1,
            needPassword: true,
            loginUsername: username,
            out: '',
            err: '',
        }
    }

    return loginWithCredentials(host, username, passwordEnv)
}

export async function loginWithCredentials(
    host: KeeperCliHost,
    username: string,
    password: string
): Promise<CliResult> {
    try {
        const v = host.getVault()
        if (v.isLoggedIn) {
            await v.logout()
        }
        await v.login(username, password)
        await v.sync()
        return { code: 0, out: `keeper: logged in as ${username}.\n`, err: '' }
    } catch (e) {
        return { code: 1, out: '', err: host.formatError('keeper', e) }
    }
}

export async function loginWithSessionToken(
    host: KeeperCliHost,
    username: string,
    sessionToken: string,
    options?: { plainToken?: boolean }
): Promise<CliResult> {
    let token = sessionToken.trim()
    if (options?.plainToken && token.length > 0) {
        token = utf8ToBase64Url(token)
    }
    try {
        const v = host.getVault()
        if (v.isLoggedIn) {
            await v.logout()
        }
        await v.loginWithSessionToken(username, token)
        await v.sync()
        return { code: 0, out: `keeper: logged in as ${username} (session token).\n`, err: '' }
    } catch (e) {
        return { code: 1, out: '', err: host.formatError('keeper', e) }
    }
}

/** Pass-through if logged in; auto-login when `KEEPER_USERNAME` is set; otherwise "not logged in". */
export async function ensureLoggedIn(host: KeeperCliHost): Promise<CliResult> {
    if (host.getVault().isLoggedIn) {
        return { code: 0, out: '', err: '' }
    }
    if (host.envString('KEEPER_USERNAME')) {
        return runLoginCommand(host, { positional: [], opts: new Map(), repeatedOpts: new Map() })
    }
    return { code: 1, out: '', err: 'not logged in\n' }
}

export const loginCommand: CliCommandDefinition = {
    name: 'login',
    order: 10,
    description:
        'Log in with password (env / masked prompt) or session token (flag or KEEPER_SESSION_TOKEN). Password never on CLI line.',
    usage:
        'login [--username|--user <u>] [--session-token|--token|--st <t>] [--session-token-plain] [--help|-h]',
    flagOptions: [
        '--user',
        '--username',
        '--session-token',
        '--token',
        '--st',
        '--session-token-plain',
    ],
    allowedOptions: LOGIN_ALLOWED,
    help: {
        description:
            'Log in with password (env / masked prompt) or session token (flag or KEEPER_SESSION_TOKEN).',
        usage:
            '[-h] [--username USER] [--session-token TOKEN] [--session-token-plain]',
        options: [
            { flags: '--username, --user', metavar: 'USER', help: 'account identifier (often email)' },
            {
                flags: '--session-token, --token, --st',
                metavar: 'TOKEN',
                help: 'session token string (or use KEEPER_SESSION_TOKEN)',
            },
            {
                flags: '--session-token-plain',
                help: 'treat --session-token value as plain UTF-8 and encode base64url',
            },
        ],
        epilog: `Password MUST NOT appear on the CLI line. Use KEEPER_PASSWORD for automation, or run
login with only a username and enter the password when prompted (masked).

environment variables:
  KEEPER_USERNAME          default username if not passed on the command line
  KEEPER_PASSWORD          password for non-interactive login (no session token)
  KEEPER_SESSION_TOKEN     session token when not passed as a flag
  KEEPER_HOST              optional vault host / region`,
    },
    run: (host, parsed) => runLoginCommand(host, parsed),
}

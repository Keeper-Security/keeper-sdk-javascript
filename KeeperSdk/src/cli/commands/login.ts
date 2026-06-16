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
        return runLoginCommand(host, { positional: [], opts: new Map() })
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
        title: 'login — authenticate to Keeper (vault session)',
        synopsis: `  login [--username|--user EMAIL_OR_NAME]
  login [--username|--user U] [--session-token|--token|--st TOKEN]
  login [--username|--user U] [--session-token TOKEN] [--session-token-plain]`,
        description: `  Establishes a Keeper session.

  Username comes from --username / --user or KEEPER_USERNAME.

  Password MUST NOT appear on the CLI line (logging, proxies, browser history).
  Automation: set KEEPER_PASSWORD in the environment when embedding in Node.
  Web shell: run login with only a username; the UI prompts for a masked password
  and sends it through the login transport, not in "line".

  Session token login: pass the token on the command line or via
  KEEPER_SESSION_TOKEN (sensitive — same caveats as any secret on argv).

  --session-token-plain treats the value as plain UTF-8 and encodes base64url
  before login (same idea as the session_token_login example).

  Device registration: session token login requires deviceToken + privateKey for
  this host in session storage (e.g. ~/.keeper/config.json) or a prior password
  login in this shell.`,
        options: `  --username, --user           Account identifier (often email).
  --session-token, --token, --st   Session token string (or use KEEPER_SESSION_TOKEN).
  --session-token-plain        Treat --session-token value as plain UTF-8 and encode base64url.`,
        environment: `  KEEPER_USERNAME          Default username if not passed on the command line.
  KEEPER_PASSWORD          Password for non-interactive login (no session token).
  KEEPER_SESSION_TOKEN     Session token when not passed as a flag.
  KEEPER_HOST              Optional vault host / region (also: keeper-host attribute).`,
    },
    run: (host, parsed) => runLoginCommand(host, parsed),
}

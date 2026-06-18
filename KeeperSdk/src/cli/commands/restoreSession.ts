import type { CliCommandDefinition, KeeperCliHost, ParsedCli } from '../types'
import {
    resolveSessionRestorePayload,
    validateSessionRestoreInput,
    type SessionRestoreInput,
} from '../../auth/sessionRestore'
import { getOpt, hasOpt, rejectUnknownOptions, wantsCliHelp } from '../parse'
import { formatDetailedHelpForCommand } from '../help'
import { runVaultSync } from './sync'

export const RESTORE_SESSION_TRAILING_OPTS = [
    'sync',
    'account-uid',
    'client-key',
    'data-key',
    'ecc-private-key',
    'ecc-public-key',
    'message-session-uid',
    'private-key',
    'session-token',
    'st',
    'session-token-type',
    'username',
    'user',
    'user-type',
    'sso-logout-url',
    'sso-session-id',
    'enterprise-public-key',
    'enterprise-ecc-public-key',
] as const

const RESTORE_ALLOWED = new Set([
    'sync',
    'from-json',
    'account-uid',
    'client-key',
    'data-key',
    'ecc-private-key',
    'ecc-public-key',
    'message-session-uid',
    'private-key',
    'session-token',
    'st',
    'session-token-type',
    'username',
    'user',
    'user-type',
    'sso-logout-url',
    'sso-session-id',
    'enterprise-public-key',
    'enterprise-ecc-public-key',
])

const ENV_PREFIX = 'RESTORE_SESSION_'

const FIELD_ENV: Record<string, keyof SessionRestoreInput> = {
    ACCOUNT_UID: 'accountUid',
    CLIENT_KEY: 'clientKey',
    DATA_KEY: 'dataKey',
    ECC_PRIVATE_KEY: 'eccPrivateKey',
    ECC_PUBLIC_KEY: 'eccPublicKey',
    MESSAGE_SESSION_UID: 'messageSessionUid',
    PRIVATE_KEY: 'privateKey',
    SESSION_TOKEN: 'sessionToken',
    SESSION_TOKEN_TYPE: 'sessionTokenType',
    USERNAME: 'username',
    USER_TYPE: 'userType',
    SSO_LOGOUT_URL: 'ssoLogoutUrl',
    SSO_SESSION_ID: 'ssoSessionId',
    ENTERPRISE_PUBLIC_KEY: 'enterprisePublicKey',
    ENTERPRISE_ECC_PUBLIC_KEY: 'enterpriseEccPublicKey',
}

const OPT_TO_FIELD: Record<string, keyof SessionRestoreInput> = {
    'account-uid': 'accountUid',
    'client-key': 'clientKey',
    'data-key': 'dataKey',
    'ecc-private-key': 'eccPrivateKey',
    'ecc-public-key': 'eccPublicKey',
    'message-session-uid': 'messageSessionUid',
    'private-key': 'privateKey',
    'session-token': 'sessionToken',
    st: 'sessionToken',
    'session-token-type': 'sessionTokenType',
    username: 'username',
    user: 'username',
    'user-type': 'userType',
    'sso-logout-url': 'ssoLogoutUrl',
    'sso-session-id': 'ssoSessionId',
    'enterprise-public-key': 'enterprisePublicKey',
    'enterprise-ecc-public-key': 'enterpriseEccPublicKey',
}

function envField(host: KeeperCliHost, key: keyof SessionRestoreInput): string | undefined {
    const envKey = Object.entries(FIELD_ENV).find(([, v]) => v === key)?.[0]
    return envKey ? host.envString(`${ENV_PREFIX}${envKey}`) : undefined
}

function buildInputFromFlags(host: KeeperCliHost, parsed: ParsedCli): SessionRestoreInput {
    const partial: Partial<SessionRestoreInput> = {}

    for (const [opt, field] of Object.entries(OPT_TO_FIELD)) {
        const fromFlag = getOpt(parsed.opts, opt)
        if (fromFlag !== undefined) {
            ;(partial as Record<string, string>)[field] = fromFlag
            continue
        }
        const fromEnv = envField(host, field)
        if (fromEnv !== undefined) {
            ;(partial as Record<string, string>)[field] = fromEnv
        }
    }

    return validateSessionRestoreInput(partial)
}

export const restoreSessionCommand: CliCommandDefinition = {
    name: 'restore-session',
    order: 12,
    description:
        'Restore a logged-in session from extension SessionParams (continueSession; no device keys required).',
    usage:
        'restore-session --from-json FILE|JSON [--sync]  OR  restore-session --session-token … (see --help)',
    flagOptions: [
        '--sync',
        '--from-json',
        '--account-uid',
        '--client-key',
        '--data-key',
        '--ecc-private-key',
        '--ecc-public-key',
        '--message-session-uid',
        '--private-key',
        '--session-token',
        '--session-token-type',
        '--username',
        '--user-type',
        '--sso-logout-url',
        '--sso-session-id',
        '--enterprise-public-key',
        '--enterprise-ecc-public-key',
    ],
    allowedOptions: RESTORE_ALLOWED,
    help: {
        description:
            'Restore a logged-in session from extension SessionParams (continueSession; no device keys required).',
        usage: '[-h] [--from-json JSON] [--sync] [session fields as flags]',
        options: [
            {
                flags: '--from-json',
                metavar: 'JSON',
                help: 'inline JSON object/string or path to a session JSON file',
            },
            { flags: '--account-uid', metavar: 'B64', help: 'account UID (base64)' },
            { flags: '--client-key', metavar: 'B64', help: 'client key (base64)' },
            { flags: '--data-key', metavar: 'B64', help: 'data key (base64)' },
            { flags: '--ecc-private-key', metavar: 'B64', help: 'ECC private key (base64)' },
            { flags: '--ecc-public-key', metavar: 'B64', help: 'ECC public key (base64)' },
            { flags: '--message-session-uid', metavar: 'B64', help: 'message session UID (base64)' },
            { flags: '--private-key', metavar: 'B64', help: 'RSA private key (base64)' },
            {
                flags: '--session-token, --st',
                metavar: 'TOKEN',
                help: 'session token string (as stored; often base64url)',
            },
            { flags: '--session-token-type', metavar: 'N', help: 'numeric SessionTokenType enum' },
            { flags: '--username, --user', metavar: 'USER', help: 'account username' },
            { flags: '--user-type', metavar: 'TYPE', help: '0=normal, 1=cloud_sso, 2=onsite_sso' },
            { flags: '--sso-logout-url', metavar: 'URL', help: 'SSO logout URL' },
            { flags: '--sso-session-id', metavar: 'ID', help: 'SSO session ID' },
            { flags: '--enterprise-public-key', metavar: 'B64', help: 'enterprise public key (optional)' },
            { flags: '--enterprise-ecc-public-key', metavar: 'B64', help: 'enterprise ECC public key (optional)' },
            { flags: '--sync', help: 'run syncDown after restoring the session' },
        ],
        epilog: `Provide parameters either as one JSON object (--from-json) or as flags / env.
Binary fields are base64 or base64url. sessionToken expires; region must match keeper-host / KEEPER_HOST.

environment variables:
  RESTORE_SESSION_JSON              same as --from-json
  RESTORE_SESSION_<FIELD>           per-field overrides (see flags above)`,
    },
    async run(host, parsed) {
        if (wantsCliHelp(parsed)) {
            return { code: 0, out: formatDetailedHelpForCommand(restoreSessionCommand), err: '' }
        }
        const bad = rejectUnknownOptions(parsed, RESTORE_ALLOWED, 'restore-session')
        if (bad) return bad
        if (parsed.positional.length > 0) {
            return { code: 1, out: '', err: 'restore-session: unexpected positional arguments\n' }
        }

        try {
            let input: SessionRestoreInput
            const jsonRaw = getOpt(parsed.opts, 'from-json') ?? host.envString('RESTORE_SESSION_JSON')
            if (jsonRaw) {
                const readFile =
                    host.readTextFile ??
                    (typeof document === 'undefined'
                        ? async (path: string) => (await import('fs/promises')).readFile(path, 'utf8')
                        : undefined)
                input = await resolveSessionRestorePayload(jsonRaw, readFile)
            } else {
                input = buildInputFromFlags(host, parsed)
            }

            await host.getVault().restoreSession(input)
            let out = `keeper: session restored for ${input.username}.\n`
            if (hasOpt(parsed.opts, 'sync')) {
                const syncResult = await runVaultSync(host)
                if (syncResult.code !== 0) {
                    return syncResult
                }
                out += syncResult.out
            }
            return { code: 0, out, err: '' }
        } catch (e) {
            return { code: 1, out: '', err: host.formatError('restore-session', e) }
        }
    },
}

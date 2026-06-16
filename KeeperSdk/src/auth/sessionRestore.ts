import { Authentication, normal64Bytes, type SessionParams } from '@keeper-security/keeperapi'
import { KeeperSdkError, ResultCodes } from '../utils'

type UserType = SessionParams['userType']

const UserTypeValues = {
    normal: 'normal' as UserType,
    cloudSso: 'cloud_sso' as UserType,
    onsiteSso: 'onsite_sso' as UserType,
}

/** String form of {@link SessionParams} as exported from extension / vault storage. */
export type SessionRestoreInput = {
    accountUid: string
    clientKey: string
    dataKey: string
    eccPrivateKey: string
    eccPublicKey: string
    messageSessionUid: string
    privateKey: string
    sessionToken: string
    sessionTokenType: number | string
    username: string
    userType: number | string
    ssoLogoutUrl?: string
    ssoSessionId?: string
    enterprisePublicKey?: string
    enterpriseEccPublicKey?: string
}

const REQUIRED_KEYS: (keyof SessionRestoreInput)[] = [
    'accountUid',
    'clientKey',
    'dataKey',
    'eccPrivateKey',
    'eccPublicKey',
    'messageSessionUid',
    'privateKey',
    'sessionToken',
    'sessionTokenType',
    'username',
    'userType',
]

function decodeBytes(label: string, value: string | undefined, required: boolean): Uint8Array | undefined {
    const trimmed = typeof value === 'string' ? value.trim() : ''
    if (!trimmed) {
        if (required) {
            throw new KeeperSdkError(`restore-session: missing required field: ${label}`, ResultCodes.MISSING_USERNAME)
        }
        return undefined
    }
    try {
        return normal64Bytes(trimmed)
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        throw new KeeperSdkError(`restore-session: invalid base64 for ${label}: ${msg}`, ResultCodes.INVALID_CREDENTIALS)
    }
}

function parseUserType(value: number | string): UserType {
    if (typeof value === 'number') {
        switch (value) {
            case 0:
                return UserTypeValues.normal
            case 1:
                return UserTypeValues.cloudSso
            case 2:
                return UserTypeValues.onsiteSso
            default:
                break
        }
    }
    const s = String(value).toLowerCase()
    if (s === 'normal' || s === '0') return UserTypeValues.normal
    if (s === 'cloud_sso' || s === 'cloudsso' || s === '1') return UserTypeValues.cloudSso
    if (s === 'onsite_sso' || s === 'onsitesso' || s === '2') return UserTypeValues.onsiteSso
    throw new KeeperSdkError(`restore-session: unknown userType: ${value}`, ResultCodes.INVALID_CREDENTIALS)
}

function parseSessionTokenType(value: number | string): Authentication.SessionTokenType {
    const n = typeof value === 'number' ? value : Number(value)
    if (!Number.isFinite(n)) {
        throw new KeeperSdkError(`restore-session: invalid sessionTokenType: ${value}`, ResultCodes.INVALID_CREDENTIALS)
    }
    return n as Authentication.SessionTokenType
}

export function validateSessionRestoreInput(input: Partial<SessionRestoreInput>): SessionRestoreInput {
    const missing = REQUIRED_KEYS.filter((k) => {
        const v = input[k]
        return v === undefined || v === null || (typeof v === 'string' && !v.trim())
    })
    if (missing.length > 0) {
        throw new KeeperSdkError(
            `restore-session: missing required field(s): ${missing.join(', ')}`,
            ResultCodes.MISSING_USERNAME
        )
    }
    return input as SessionRestoreInput
}

/** Build keeperapi {@link SessionParams} from extension-style strings. */
export function toSessionParams(input: SessionRestoreInput): SessionParams {
    const enterprisePublicKey = decodeBytes('enterprisePublicKey', input.enterprisePublicKey, false)
    const enterpriseEccPublicKey = decodeBytes('enterpriseEccPublicKey', input.enterpriseEccPublicKey, false)

    return {
        accountUid: decodeBytes('accountUid', input.accountUid, true)!,
        clientKey: decodeBytes('clientKey', input.clientKey, true)!,
        dataKey: decodeBytes('dataKey', input.dataKey, true)!,
        eccPrivateKey: decodeBytes('eccPrivateKey', input.eccPrivateKey, true)!,
        eccPublicKey: decodeBytes('eccPublicKey', input.eccPublicKey, true)!,
        messageSessionUid: decodeBytes('messageSessionUid', input.messageSessionUid, true)!,
        privateKey: decodeBytes('privateKey', input.privateKey, true)!,
        sessionToken: input.sessionToken.trim(),
        sessionTokenType: parseSessionTokenType(input.sessionTokenType),
        username: input.username.trim(),
        userType: parseUserType(input.userType),
        ssoLogoutUrl: input.ssoLogoutUrl?.trim() ?? '',
        ssoSessionId: input.ssoSessionId?.trim() ?? '',
        ...(enterprisePublicKey ? { enterprisePublicKey } : {}),
        ...(enterpriseEccPublicKey ? { enterpriseEccPublicKey } : {}),
    }
}

function assertBodyIsJsonNotHtml(body: string, source: string): void {
    const head = body.trimStart().slice(0, 32).toLowerCase()
    if (head.startsWith('<!') || head.startsWith('<html') || head.startsWith('<?xml')) {
        throw new KeeperSdkError(
            `restore-session: ${source} returned HTML, not JSON. ` +
                'Check the path, run `npm run dev` in shellcomponent, or use /dev/keeper-session.json.',
            ResultCodes.INVALID_CREDENTIALS
        )
    }
}

function looksLikeInlineJson(text: string): boolean {
    const t = text.trimStart()
    return t.startsWith('{') || t.startsWith('[') || t.startsWith('"')
}

/** File path / URL — not inline JSON (avoid JSON.parse on `/path/to/conf.json`). */
function looksLikeFilePath(text: string): boolean {
    const t = text.trim()
    if (/^https?:\/\//i.test(t)) return true
    if (t.startsWith('./') || t.startsWith('../') || t.startsWith('@')) return true
    if (t.startsWith('/') && !looksLikeInlineJson(t)) return true
    if (/\.json$/i.test(t) && !looksLikeInlineJson(t)) return true
    return false
}

/**
 * Parse session JSON. One JSON.parse when the payload is an object; two when the CLI
 * value is a JSON-encoded string (e.g. JSON.stringify(conf) wrapped in quotes).
 */
export function sessionRestoreFromJson(json: string): SessionRestoreInput {
    const text = json.trim().replace(/^\uFEFF/, '')
    let parsed: unknown
    try {
        parsed = JSON.parse(text)
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        throw new KeeperSdkError(`restore-session: invalid JSON: ${msg}`, ResultCodes.INVALID_CREDENTIALS)
    }
    if (typeof parsed === 'string') {
        try {
            parsed = JSON.parse(parsed)
        } catch (e) {
            const msg = e instanceof Error ? e.message : String(e)
            throw new KeeperSdkError(`restore-session: invalid JSON: ${msg}`, ResultCodes.INVALID_CREDENTIALS)
        }
    }
    if (typeof parsed !== 'object' || parsed === null) {
        throw new KeeperSdkError('restore-session: JSON must be an object', ResultCodes.INVALID_CREDENTIALS)
    }
    return validateSessionRestoreInput(parsed as Partial<SessionRestoreInput>)
}

/** Parse `--from-json` payload, or read a file when the value is not JSON. */
export async function resolveSessionRestorePayload(
    raw: string,
    readFile?: (path: string) => Promise<string>
): Promise<SessionRestoreInput> {
    const text = raw.trim()
    if (readFile && looksLikeFilePath(text)) {
        const body = await readFile(text)
        assertBodyIsJsonNotHtml(body, text)
        return sessionRestoreFromJson(body)
    }
    try {
        return sessionRestoreFromJson(text)
    } catch (e) {
        if (looksLikeInlineJson(text) || !readFile) {
            throw e
        }
        const body = await readFile(text)
        assertBodyIsJsonNotHtml(body, text)
        return sessionRestoreFromJson(body)
    }
}

import {
    webSafe64,
    normal64,
    getKeeperUrl,
    getKeeperRouterUrl,
    getKeeperSAMLUrl,
    getKeeperSsoConfigUrl,
    getKeeperAutomatorAdminUrl,
    isTwoFactorResultCode,
    formatTimeDiff,
    isNil,
    toOptional,
} from '../utils'

describe('utils', () => {
    describe('webSafe64', () => {
        it('replaces + with -', () => {
            expect(webSafe64('a+b')).toBe('a-b')
        })

        it('replaces / with _', () => {
            expect(webSafe64('a/b')).toBe('a_b')
        })

        it('strips trailing = padding', () => {
            expect(webSafe64('abc=')).toBe('abc')
            expect(webSafe64('ab==')).toBe('ab')
        })

        it('handles multiple replacements in a single string', () => {
            expect(webSafe64('a+b/c+d==')).toBe('a-b_c-d')
        })

        it('returns the same string when no unsafe characters are present', () => {
            expect(webSafe64('abcdef')).toBe('abcdef')
        })

        it('handles an empty string', () => {
            expect(webSafe64('')).toBe('')
        })
    })

    describe('normal64', () => {
        it('replaces - with +', () => {
            // 'a-b' has length 3 → (3 * 3) % 4 = 1 → appends '='
            expect(normal64('a-b')).toBe('a+b=')
        })

        it('replaces _ with /', () => {
            // 'a_b' has length 3 → (3 * 3) % 4 = 1 → appends '='
            expect(normal64('a_b')).toBe('a/b=')
        })

        it('adds correct = padding for length % 4 === 2', () => {
            // length 2 → (3 * 2) % 4 = 2 → append '=='
            expect(normal64('ab')).toBe('ab==')
        })

        it('adds correct = padding for length % 4 === 3', () => {
            // length 3 → (3 * 3) % 4 = 1 → append '='
            expect(normal64('abc')).toBe('abc=')
        })

        it('adds no padding when length % 4 === 0', () => {
            // length 4 → (3 * 4) % 4 = 0 → append ''
            expect(normal64('abcd')).toBe('abcd')
        })

        it('handles an empty string', () => {
            expect(normal64('')).toBe('')
        })

        it('round-trips with webSafe64', () => {
            const original = 'SGVsbG8gV29ybGQ='
            const safe = webSafe64(original)
            // normal64(safe) should restore the padding
            expect(normal64(safe)).toBe(original)
        })
    })

    describe('getKeeperUrl', () => {
        it('prepends api/rest/ for standard paths', () => {
            expect(getKeeperUrl('keepersecurity.com', 'login')).toBe('https://keepersecurity.com/api/rest/login')
        })

        it('omits api/rest/ prefix for bi_api paths', () => {
            expect(getKeeperUrl('keepersecurity.com', 'bi_api/some_endpoint')).toBe(
                'https://keepersecurity.com/bi_api/some_endpoint'
            )
        })

        it('works with EU host', () => {
            expect(getKeeperUrl('keepersecurity.eu', 'vault/sync_down')).toBe(
                'https://keepersecurity.eu/api/rest/vault/sync_down'
            )
        })

        it('works with govcloud host', () => {
            expect(getKeeperUrl('govcloud.keepersecurity.us', 'login')).toBe(
                'https://govcloud.keepersecurity.us/api/rest/login'
            )
        })
    })

    describe('getKeeperRouterUrl', () => {
        it('uses connect subdomain for standard hosts', () => {
            expect(getKeeperRouterUrl('keepersecurity.com', 'api/health')).toBe(
                'https://connect.keepersecurity.com/api/health'
            )
        })

        it('uses the special govcloud router URL', () => {
            expect(getKeeperRouterUrl('govcloud.keepersecurity.us', 'api/health')).toBe(
                'https://connect.keepersecurity.us/api/health'
            )
        })

        it('uses connect subdomain for EU host', () => {
            expect(getKeeperRouterUrl('keepersecurity.eu', 'status')).toBe('https://connect.keepersecurity.eu/status')
        })
    })

    describe('getKeeperSAMLUrl', () => {
        it('builds SAML URL without serviceProviderId', () => {
            expect(getKeeperSAMLUrl('keepersecurity.com', 'login')).toBe(
                'https://keepersecurity.com/api/rest/sso/saml/login'
            )
        })

        it('builds SAML URL with serviceProviderId', () => {
            expect(getKeeperSAMLUrl('keepersecurity.com', 'login', 42)).toBe(
                'https://keepersecurity.com/api/rest/sso/saml/login/42'
            )
        })
    })

    describe('getKeeperSsoConfigUrl', () => {
        it('builds SSO config URL without serviceProviderId', () => {
            expect(getKeeperSsoConfigUrl('keepersecurity.com', 'setup')).toBe(
                'https://keepersecurity.com/api/rest/sso/config/setup'
            )
        })

        it('builds SSO config URL with serviceProviderId', () => {
            expect(getKeeperSsoConfigUrl('keepersecurity.com', 'setup', 7)).toBe(
                'https://keepersecurity.com/api/rest/sso/config/setup/7'
            )
        })
    })

    describe('getKeeperAutomatorAdminUrl', () => {
        it('builds automator URL without automatorId', () => {
            expect(getKeeperAutomatorAdminUrl('keepersecurity.com', 'status')).toBe(
                'https://keepersecurity.com/api/rest/automator/status'
            )
        })

        it('builds automator URL with automatorId', () => {
            expect(getKeeperAutomatorAdminUrl('keepersecurity.com', 'status', 99)).toBe(
                'https://keepersecurity.com/api/rest/automator/status/99'
            )
        })
    })

    describe('isTwoFactorResultCode', () => {
        it('returns true for need_totp', () => {
            expect(isTwoFactorResultCode('need_totp')).toBe(true)
        })

        it('returns true for invalid_device_token', () => {
            expect(isTwoFactorResultCode('invalid_device_token')).toBe(true)
        })

        it('returns true for invalid_totp', () => {
            expect(isTwoFactorResultCode('invalid_totp')).toBe(true)
        })

        it('returns false for unrelated result codes', () => {
            expect(isTwoFactorResultCode('success')).toBe(false)
            expect(isTwoFactorResultCode('auth_failed')).toBe(false)
            expect(isTwoFactorResultCode('')).toBe(false)
        })
    })

    describe('formatTimeDiff', () => {
        // formatTimeDiff reads getMinutes(), getSeconds(), getMilliseconds() from the
        // Date — all local-time methods.  We build dates from an explicit local-time
        // baseline so tests pass regardless of the runner's timezone.
        function makeDate(minutes: number, seconds: number, ms: number): Date {
            const d = new Date(2000, 0, 1, 0, minutes, seconds, ms)
            return d
        }

        it('formats seconds and milliseconds when minutes are zero', () => {
            expect(formatTimeDiff(makeDate(0, 5, 123))).toBe('05.123')
        })

        it('formats minutes, seconds, and milliseconds', () => {
            expect(formatTimeDiff(makeDate(2, 30, 42))).toBe('02:30.42')
        })

        it('formats zero time', () => {
            expect(formatTimeDiff(makeDate(0, 0, 0))).toBe('00.0')
        })

        it('pads seconds to two digits', () => {
            expect(formatTimeDiff(makeDate(0, 3, 7))).toBe('03.7')
        })
    })

    describe('isNil', () => {
        it('returns true for null', () => {
            expect(isNil(null)).toBe(true)
        })

        it('returns true for undefined', () => {
            expect(isNil(undefined)).toBe(true)
        })

        it('returns false for zero', () => {
            expect(isNil(0)).toBe(false)
        })

        it('returns false for empty string', () => {
            expect(isNil('')).toBe(false)
        })

        it('returns false for false', () => {
            expect(isNil(false)).toBe(false)
        })

        it('returns false for an object', () => {
            expect(isNil({})).toBe(false)
        })
    })

    describe('toOptional', () => {
        it('converts null to undefined', () => {
            expect(toOptional(null)).toBeUndefined()
        })

        it('converts undefined to undefined', () => {
            expect(toOptional(undefined)).toBeUndefined()
        })

        it('passes through a truthy value', () => {
            expect(toOptional('hello')).toBe('hello')
        })

        it('passes through zero', () => {
            expect(toOptional(0)).toBe(0)
        })

        it('passes through empty string', () => {
            expect(toOptional('')).toBe('')
        })

        it('passes through false', () => {
            expect(toOptional(false)).toBe(false)
        })
    })
})

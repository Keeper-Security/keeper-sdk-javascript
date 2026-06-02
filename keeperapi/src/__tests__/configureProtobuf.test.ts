/**
 * @jest-environment jsdom
 */

import { Authentication } from '../browser'

// Behavioral guard for the protobuf Long fix. We exercise the real SDK entry
// (../browser) — the same module a consumer / the browser extension loads — and
// assert the observable behavior: decoded 64-bit fields (int64/uint64/...) come back
// as JS numbers, never Long objects (which are non-serializable and break the Redux
// store). No reaching into how the fix is wired.
describe('64-bit proto fields decode as numbers, not Long', () => {
    const PasskeyInfo = Authentication.PasskeyInfo

    it('decodes a 64-bit field present on the wire as a number', () => {
        const decoded = PasskeyInfo.decode(
            PasskeyInfo.encode(PasskeyInfo.create({createdAtMillis: 1774559752014})).finish()
        )
        expect(typeof decoded.createdAtMillis).toBe('number')
        expect(decoded.createdAtMillis).toBe(1774559752014)
    })

    it('decodes a 64-bit field absent on the wire as a numeric default, not Long{0,0}', () => {
        // Ordering guard: proto.js bakes its 64-bit prototype defaults the first time
        // it is evaluated, so if Long support isn't disabled before that point, a
        // field left off the wire comes back as Long{0,0}. Decoding through the entry
        // and asserting a number catches that regression behaviorally.
        const decoded = PasskeyInfo.decode(
            PasskeyInfo.encode(PasskeyInfo.create({createdAtMillis: 1})).finish()
        )
        expect(typeof decoded.disabledAtMillis).toBe('number')
        expect(decoded.disabledAtMillis).toBe(0)
    })
})

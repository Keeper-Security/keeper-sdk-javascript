/**
 * @jest-environment jsdom
 */

import { Auth, InvalidKdfParametersError, LoginV3ResultEnum, validateKdfParameters } from '../auth'
import { browserPlatform } from '../browser/platform'
import { KeeperEnvironment } from '../endpoint'
import { nodePlatform } from '../node/platform'
import { connectPlatform, platform } from '../platform'
import { Authentication } from '../proto'
import { wrapPassword } from '../utils'

function loginResponse(salt: Authentication.ISalt) {
    return Object.assign(
        new Authentication.LoginResponse({
            loginState: Authentication.LoginState.REQUIRES_AUTH_HASH,
            encryptedLoginToken: new Uint8Array([1, 2, 3]),
            salt: [salt],
        }),
        { keysInfo: new Authentication.KeysInfo() }
    )
}

describe.each([
    ['node', nodePlatform],
    ['browser', browserPlatform],
] as const)('authentication KDF policy (%s)', (_name, implementation) => {
    let auth: Auth
    let deriveKey: jest.SpyInstance
    let executeRest: jest.SpyInstance
    let loginSuccess: jest.SpyInstance

    beforeEach(() => {
        connectPlatform(implementation)
        auth = new Auth({
            host: KeeperEnvironment.DEV,
            deviceConfig: { deviceToken: new Uint8Array([1]) },
        })
        deriveKey = jest.spyOn(platform, 'deriveKey')
        executeRest = jest.spyOn(auth, 'executeRest').mockResolvedValue(new Authentication.LoginResponse())
        loginSuccess = jest.spyOn(auth, 'loginSuccess').mockResolvedValue(undefined)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it.each([
        ['missing salt', undefined, 100000],
        ['null salt', null, 100000],
        ['empty salt and one iteration', new Uint8Array(), 1],
        ['empty salt', new Uint8Array(), 100000],
        ['short salt', new Uint8Array(15), 100000],
        ['long salt', new Uint8Array(17), 100000],
        ['missing iterations', new Uint8Array(16), undefined],
        ['null iterations', new Uint8Array(16), null],
        ['zero iterations', new Uint8Array(16), 0],
        ['negative iterations', new Uint8Array(16), -1],
        ['one iteration', new Uint8Array(16), 1],
        ['below-minimum iterations', new Uint8Array(16), 99999],
        ['fractional iterations', new Uint8Array(16), 100000.5],
        ['NaN iterations', new Uint8Array(16), NaN],
        ['infinite iterations', new Uint8Array(16), Infinity],
        ['unsafe iterations', new Uint8Array(16), Number.MAX_SAFE_INTEGER + 1],
    ])('rejects %s before deriving, storing, or submitting', async (_label, salt, iterations) => {
        const response = loginResponse({ salt, iterations })

        expect(() => validateKdfParameters(response.salt[0])).toThrow(InvalidKdfParametersError)
        await expect(auth.authHashLogin(response, 'test', wrapPassword('test-password'))).rejects.toMatchObject({
            name: 'InvalidKdfParametersError',
            code: 'invalid_kdf_parameters',
        })

        expect(deriveKey).not.toHaveBeenCalled()
        expect(executeRest).not.toHaveBeenCalled()
        expect(loginSuccess).not.toHaveBeenCalled()
        expect(auth.options.salt).toBeUndefined()
        expect(auth.options.iterations).toBeUndefined()
    })

    it.each([
        [100000, false],
        [100001, false],
        [100000, true],
    ])('allows %i iterations with a 16-byte salt (alternate: %s)', async (iterations, useAlternate) => {
        const salt = new Uint8Array(16).fill(7)
        const response = loginResponse({ salt, iterations })
        if (useAlternate) {
            response.salt = [
                { salt: new Uint8Array(), iterations: 1 },
                { name: 'alternate', salt, iterations },
            ]
        }
        const password = wrapPassword('test-password')

        expect(() => validateKdfParameters({ salt, iterations })).not.toThrow()
        await auth.authHashLogin(response, 'test', password, useAlternate)

        expect(deriveKey).toHaveBeenCalledWith(password, salt, iterations)
        expect(executeRest).toHaveBeenCalledTimes(1)
        expect(executeRest.mock.calls[0][0]).toMatchObject({
            path: 'authentication/validate_auth_hash',
            data: {
                authResponse: expect.objectContaining({ length: 32 }),
                encryptedLoginToken: response.encryptedLoginToken,
            },
        })
        expect(loginSuccess).toHaveBeenCalledTimes(1)
        expect(auth.options.salt).toBe(salt)
        expect(auth.options.iterations).toBe(iterations)
    })

    it('validates the selected alternate salt rather than the primary salt', async () => {
        const response = loginResponse({ salt: new Uint8Array(16), iterations: 100000 })
        response.salt.push({ name: 'alternate', salt: new Uint8Array(), iterations: 1 })

        await expect(auth.authHashLogin(response, 'test', wrapPassword('test-password'), true)).rejects.toBeInstanceOf(
            InvalidKdfParametersError
        )
        expect(deriveKey).not.toHaveBeenCalled()
        expect(executeRest).not.toHaveBeenCalled()
    })

    it.each([false, true])('stops login on invalid KDF parameters (failure handler: %s)', async (withHandler) => {
        const onCommandFailure = jest.fn()
        const getPassword = jest.fn().mockResolvedValue('test-password')
        auth.options.authUI3 = {
            getPassword,
            waitForDeviceApproval: jest.fn(),
            waitForTwoFactorCode: jest.fn(),
        }
        if (withHandler) {
            auth.options.onCommandFailure = onCommandFailure
        }
        jest.spyOn(auth, 'connect').mockResolvedValue(undefined)
        executeRest.mockResolvedValueOnce(loginResponse({ salt: new Uint8Array(), iterations: 1 }))

        const login = auth.loginV3({ username: 'test' })
        if (withHandler) {
            await expect(login).resolves.toEqual({ result: LoginV3ResultEnum.NOT_LOGGED_IN })
            expect(onCommandFailure).toHaveBeenCalledWith(
                expect.objectContaining({ result_code: 'invalid_kdf_parameters' })
            )
        } else {
            await expect(login).rejects.toBeInstanceOf(InvalidKdfParametersError)
        }

        expect(getPassword).toHaveBeenCalledTimes(1)
        expect(deriveKey).not.toHaveBeenCalled()
        expect(executeRest).toHaveBeenCalledTimes(1)
        expect(loginSuccess).not.toHaveBeenCalled()
    })
})

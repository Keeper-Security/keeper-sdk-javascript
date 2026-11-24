/**
 * @jest-environment jsdom
 */

import {
    Auth,
    createEncryptionParams,
    decryptEncryptionParams,
    InvalidKdfParametersError,
    LoginV3ResultEnum,
    validateKdfParameters,
} from '../auth'
import { browserPlatform } from '../browser/platform'
import { KeeperEnvironment } from '../endpoint'
import { logger } from '../log'
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
        ['empty salt', new Uint8Array(), 100000],
        ['short salt', new Uint8Array(15), 100000],
        ['long salt', new Uint8Array(17), 100000],
        ['missing iterations', new Uint8Array(16), undefined],
        ['null iterations', new Uint8Array(16), null],
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
        [10000, false, true],
        [999999, false, true],
        [1000000, false, false],
        [1000001, false, false],
        [1000000, true, false],
    ])(
        'handles %i iterations (alternate: %s, approval required: %s)',
        async (iterations, useAlternate, needsApproval) => {
            const approve = jest.fn().mockResolvedValue(true)
            configureApproval(approve)
            const salt = new Uint8Array(16).fill(7)
            const response = loginResponse({ salt, iterations })
            if (useAlternate) {
                response.salt = [
                    { salt: new Uint8Array(), iterations: 1 },
                    { name: 'alternate', salt, iterations },
                ]
            }
            const password = wrapPassword('test-password')

            await auth.authHashLogin(response, 'test', password, useAlternate)

            expect(approve.mock.calls).toEqual(needsApproval ? [[iterations]] : [])
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
            expect(auth.options.salt).toEqual(salt)
            expect(auth.options.iterations).toBe(iterations)
        }
    )

    it('validates the selected alternate salt rather than the primary salt', async () => {
        const response = loginResponse({ salt: new Uint8Array(16), iterations: 100000 })
        response.salt.push({ name: 'alternate', salt: new Uint8Array(), iterations: 1 })

        await expect(auth.authHashLogin(response, 'test', wrapPassword('test-password'), true)).rejects.toMatchObject({
            code: 'kdf_iterations_below_minimum',
        })
        expect(deriveKey).not.toHaveBeenCalled()
        expect(executeRest).not.toHaveBeenCalled()
    })

    it.each([false, true])('reports the security concern (failure handler: %s)', async (withHandler) => {
        const onCommandFailure = jest.fn()
        const getPassword = jest.fn().mockResolvedValue('test-password')
        const approve = jest.fn().mockResolvedValue(true)
        auth.options.enableLowKdfIterationUpgrade = withHandler
        auth.options.authUI3 = {
            getPassword,
            approveLowKdfIterations: approve,
            waitForDeviceApproval: jest.fn(),
            waitForTwoFactorCode: jest.fn(),
        }
        if (withHandler) {
            auth.options.onCommandFailure = onCommandFailure
        }
        jest.spyOn(auth, 'connect').mockResolvedValue(undefined)
        executeRest.mockResolvedValueOnce(loginResponse({ salt: new Uint8Array(16), iterations: 9999 }))

        const login = auth.loginV3({ username: 'test' })
        if (withHandler) {
            await expect(login).resolves.toEqual({ result: LoginV3ResultEnum.NOT_LOGGED_IN })
            expect(onCommandFailure).toHaveBeenCalledWith(
                expect.objectContaining({
                    result_code: 'kdf_iterations_below_minimum',
                    message: expect.stringContaining('Security concern'),
                })
            )
        } else {
            await expect(login).rejects.toMatchObject({ code: 'kdf_iterations_below_minimum' })
        }

        expect(getPassword).toHaveBeenCalledTimes(1)
        expect(approve).not.toHaveBeenCalled()
        expect(deriveKey).not.toHaveBeenCalled()
        expect(executeRest).toHaveBeenCalledTimes(1)
        expect(loginSuccess).not.toHaveBeenCalled()
    })

    it.each(['missing', 'declined', 'failed'])('stops login when approval is %s', async (approval) => {
        auth.options.enableLowKdfIterationUpgrade = true
        if (approval !== 'missing') {
            configureApproval(async () => {
                if (approval === 'failed') throw new Error('UI closed')
                return false
            })
        }
        jest.spyOn(auth, 'connect').mockResolvedValue(undefined)
        executeRest.mockResolvedValueOnce(loginResponse({ salt: new Uint8Array(16), iterations: 10000 }))
        await expect(auth.loginV3({ username: 'test', password: 'test-password' })).rejects.toMatchObject({
            code: 'kdf_iterations_approval_required',
        })
        expect(deriveKey).not.toHaveBeenCalled()
        expect(executeRest).toHaveBeenCalledTimes(1)
    })

    it('does not derive or submit while approval is pending', async () => {
        let approve!: (approved: boolean) => void
        const approval = new Promise<boolean>((resolve) => {
            approve = resolve
        })
        configureApproval(() => approval)
        const response = loginResponse({ salt: new Uint8Array(16), iterations: 10000 })
        const login = auth.authHashLogin(response, 'test', wrapPassword('test-password'))

        expect(deriveKey).not.toHaveBeenCalled()
        expect(executeRest).not.toHaveBeenCalled()
        approve(true)
        await login
        expect(deriveKey).toHaveBeenCalledTimes(1)
        expect(executeRest).toHaveBeenCalledTimes(1)
    })

    it.each(['upgraded', 'failed', 'restricted', 'alternate', 'default', 'disabled'])(
        'handles post-login upgrade: %s',
        async (outcome) => {
            const password = wrapPassword('test-password')
            const dataKey = new Uint8Array(32).fill(42)
            const encryptedDataKey = await createEncryptionParams(password, dataKey, 10000)
            const useAlternate = outcome === 'alternate'
            const registerLogin = jest.fn()
            const saveSessionParameters = jest.fn().mockResolvedValue(undefined)
            Object.assign(auth, { socket: { getIsConnected: () => true, registerLogin, onOpen: jest.fn() } })
            Object.assign(auth.options.sessionStorage!, { saveSessionParameters })
            const loadSummary = jest.spyOn(auth, 'loadAccountSummary').mockResolvedValue(undefined)
            const warn = jest.spyOn(logger, 'warn').mockImplementation(() => {})
            loginSuccess.mockRestore()
            const approve = jest.fn().mockResolvedValue(true)
            configureApproval(approve)
            if (outcome === 'default' || outcome === 'disabled') {
                auth.options.enableLowKdfIterationUpgrade = outcome === 'default' ? undefined : false
            }
            executeRest.mockResolvedValueOnce(
                new Authentication.LoginResponse({
                    loginState: Authentication.LoginState.LOGGED_IN,
                    sessionTokenType:
                        outcome === 'restricted'
                            ? Authentication.SessionTokenType.RESTRICT
                            : Authentication.SessionTokenType.NO_RESTRICTION,
                    encryptedSessionToken: new Uint8Array([1]),
                    encryptedDataKey,
                    encryptedDataKeyType: Authentication.EncryptedDataKeyType.BY_PASSWORD,
                })
            )
            const upgraded = outcome === 'upgraded'
            const atUpgrade = jest.fn()
            if (upgraded || outcome === 'failed') {
                executeRest.mockImplementationOnce(async () => {
                    atUpgrade(loadSummary.mock.calls.length, Array.from(auth.dataKey ?? []), auth.sessionToken)
                    if (outcome === 'failed') throw new Error('Server error')
                    return { encryptedSessionToken: new Uint8Array([2]) }
                })
            }

            const response = loginResponse({
                name: useAlternate ? 'alternate' : undefined,
                salt: new Uint8Array(16),
                iterations: 10000,
            })
            await auth.authHashLogin(response, 'test', password, useAlternate)

            expect(approve.mock.calls).toEqual(outcome === 'default' || outcome === 'disabled' ? [] : [[10000]])
            expect(executeRest).toHaveBeenCalledTimes(upgraded || outcome === 'failed' ? 2 : 1)
            expect(auth.options.iterations).toBe(upgraded ? 1000000 : 10000)
            expect(saveSessionParameters).toHaveBeenCalledTimes(1)
            expect(saveSessionParameters).toHaveBeenCalledWith(
                expect.objectContaining({ sessionToken: upgraded ? 'Ag' : 'AQ' })
            )
            if (upgraded) {
                expect(atUpgrade).toHaveBeenCalledWith(1, Array.from(dataKey), 'AQ')
                const { path, data } = executeRest.mock.calls[1][0]
                expect(path).toBe('authentication/change_master_password')
                expect(data.iterationsChange).toBe(true)
                expect(new DataView(data.authVerifier.buffer, data.authVerifier.byteOffset).getUint32(0)).toBe(
                    0x01000000 + 1000000
                )
                expect(Array.from(await decryptEncryptionParams(password, data.encryptionParams))).toEqual(
                    Array.from(dataKey)
                )
                expect(registerLogin).toHaveBeenLastCalledWith('Ag')
            }
            expect(warn).toHaveBeenCalledTimes(outcome === 'failed' ? 1 : 0)
        }
    )

    function configureApproval(approveLowKdfIterations: (iterations: number) => Promise<boolean>) {
        auth.options.enableLowKdfIterationUpgrade = true
        auth.options.authUI3 = {
            approveLowKdfIterations,
            waitForDeviceApproval: jest.fn(),
            waitForTwoFactorCode: jest.fn(),
        }
    }
})

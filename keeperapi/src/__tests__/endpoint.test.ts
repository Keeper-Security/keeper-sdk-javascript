/**
 * @jest-environment jsdom
 */

import { KeeperEndpoint } from '../endpoint'
import { platform, connectPlatform } from '../platform'
import { browserPlatform } from '../browser/platform'
import { ClientConfigurationInternal, TransmissionKey } from '../configuration'
import { AllowedMlKemKeyIds, isAllowedEcKeyId, isAllowedMlKemKeyId } from '../transmissionKeys'
import { KeeperError } from '../configuration'
import { Authentication, Router, GraphSync } from '../proto'
import { startLoginMessage, pamGetLeafsMessage } from '../restMessages'
import { HPKE_ECDH_KYBER, Ciphersuite, MlKemVariant, mlKemKeygen, encodeMlKemPublicKeyToPem } from '../qrc'
import { getKeeperMlKemKeyVariant } from '../transmissionKeys'
import { KeeperHttpResponse } from '../commands'
import { generateTransmissionKey } from '../utils'

// Mock server key configuration
interface MockServerKeys {
    ecKeyId: number
    mlKemKeyId?: number  // Optional: when undefined, server doesn't support HPKE
}

// Store test server keys (generated in beforeAll)
const testServerKeys: {
    [keyId: number]: {
        publicKey: Uint8Array
        privateKey: Uint8Array  // EC private key as raw bytes
    }
} = {}

const testServerMlKemKeys: {
    [keyId: number]: {
        publicKey: Uint8Array
        privateKey: Uint8Array  // ML-KEM private key
    }
} = {}

let mockServerKeys: MockServerKeys

describe('KeeperEndpoint - Transmission Key ID Rotation', () => {
    let endpoint: KeeperEndpoint
    let mockConfig: ClientConfigurationInternal
    let onDeviceConfigMock = jest.fn()
    let postSpy: jest.SpyInstance
    const defaultEcKeyId = 10
    const defaultMlKemKeyId = 136

    const startLoginRequest = startLoginMessage({
        clientVersion: '17.0.0',
        username: 'test@example.com',
        encryptedDeviceToken: new Uint8Array([1, 2, 3, 4, 5]),
        loginType: Authentication.LoginType.NORMAL,
        loginMethod: Authentication.LoginMethod.EXISTING_ACCOUNT,
    })

    beforeAll(async () => {
        connectPlatform(browserPlatform)

        // Generate our own EC key pairs for testing, since we need private keys
        const ecKeyIds = Object.keys(platform.keys)
            .map(Number)
            .filter(id => !isNaN(id) && isAllowedEcKeyId(id))
        for (const keyId of ecKeyIds) {
            const ecdh = await platform.generateECKeyPair()
            testServerKeys[keyId] = {
                publicKey: ecdh.publicKey,
                privateKey: ecdh.privateKey
            }
            platform.keys[keyId] = ecdh.publicKey
        }

        // Generate our own ML-KEM key pairs for testing
        const mlKemKeyIds = Object.keys(platform.mlKemKeys)
            .map(Number)
            .filter(id => !isNaN(id) && isAllowedMlKemKeyId(id))
        for (const keyId of mlKemKeyIds) {
            const variant = getKeeperMlKemKeyVariant(keyId as AllowedMlKemKeyIds)
            const mlKemKeyPair = mlKemKeygen(variant)
            testServerMlKemKeys[keyId] = {
                publicKey: mlKemKeyPair.publicKey,
                privateKey: mlKemKeyPair.privateKey
            }
            const pemPublicKey = encodeMlKemPublicKeyToPem(mlKemKeyPair.publicKey, variant)
            platform.mlKemKeys[keyId] = pemPublicKey
        }
    })

    beforeEach(async () => {
        jest.clearAllMocks()

        // Generate real keys for testing
        const ecdh = await platform.generateECKeyPair()

        mockConfig = {
            host: 'test.keepersecurity.com',
            deviceConfig: {
                deviceToken: new Uint8Array([1, 2, 3, 4, 5]),
                privateKey: ecdh.privateKey,
                publicKey: ecdh.publicKey,
                deviceName: 'Test Device',
                transmissionKeyId: defaultEcKeyId,
                mlKemPublicKeyId: defaultMlKemKeyId,
            },
            clientVersion: 'ec17.6.0',
            onDeviceConfig: onDeviceConfigMock,
        }

        endpoint = new KeeperEndpoint(mockConfig)

        // Default mock server keys match client config
        mockServerKeys = {
            ecKeyId: mockConfig.deviceConfig.transmissionKeyId!,
            mlKemKeyId: mockConfig.deviceConfig.mlKemPublicKeyId!,
        }

        // Single mock implementation for platform.post
        postSpy = jest.spyOn(platform, 'post').mockImplementation(mockPlatformPost)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    it('should rotate both EC and ML-KEM keys when using HPKE', async () => {
        const newEcKeyId = 11
        const newMlKemKeyId = 124

        // Enable HPKE for this test
        mockConfig.useHpkeForTransmissionKey = true
        mockConfig.deviceConfig.useHpkeTransmission = true
        endpoint = new KeeperEndpoint(mockConfig)

        // Configure mock server to expect new key IDs
        mockServerKeys.ecKeyId = newEcKeyId
        mockServerKeys.mlKemKeyId = newMlKemKeyId

        // Ensure keys are different before rotation
        expect(mockConfig.deviceConfig.transmissionKeyId).not.toBe(newEcKeyId)
        expect(mockConfig.deviceConfig.mlKemPublicKeyId).not.toBe(newMlKemKeyId)

        // Execute startLogin which should trigger key rotation
        await endpoint.executeRest(startLoginRequest)

        // Verify that updateTransmissionKey was called with correct parameters
        expect(mockConfig.deviceConfig.transmissionKeyId).toBe(newEcKeyId)
        expect(mockConfig.deviceConfig.mlKemPublicKeyId).toBe(newMlKemKeyId)
        expect(onDeviceConfigMock).toHaveBeenCalledTimes(1)
        expect(postSpy).toHaveBeenCalledTimes(2) // First fails, second succeeds

        // Check that both calls supplied a qrcMessageKey (HPKE),
        // and updated keys were used in the second call
        const firstCallArgs = postSpy.mock.calls[0]
        const firstRequest = Authentication.ApiRequest.decode(firstCallArgs[1])
        expect(firstRequest.qrcMessageKey).toBeDefined()
        expect(firstRequest.qrcMessageKey!.ecKeyId).toBe(defaultEcKeyId)
        expect(firstRequest.publicKeyId).toBe(defaultMlKemKeyId)
        const secondCallArgs = postSpy.mock.calls[1]
        const secondRequest = Authentication.ApiRequest.decode(secondCallArgs[1])
        expect(secondRequest.qrcMessageKey).toBeDefined()
        expect(secondRequest.qrcMessageKey!.ecKeyId).toBe(newEcKeyId)
        expect(secondRequest.publicKeyId).toBe(newMlKemKeyId)
    })

    it('should rotate just EC key when using EC (not HPKE)', async () => {
        const newEcKeyId = 11
        const newMlKemKeyId = 124

        // Configure mock server to expect new key IDs
        mockServerKeys.ecKeyId = newEcKeyId
        mockServerKeys.mlKemKeyId = newMlKemKeyId

        // Ensure keys are different before rotation
        expect(mockConfig.deviceConfig.transmissionKeyId).not.toBe(newEcKeyId)
        expect(mockConfig.deviceConfig.mlKemPublicKeyId).not.toBe(newMlKemKeyId)

        // Execute startLogin which should trigger key rotation
        await endpoint.executeRest(startLoginRequest)

        // Verify that EC key was updated and ML-KEM wasn't (since we only used EC)
        expect(mockConfig.deviceConfig.transmissionKeyId).toBe(newEcKeyId)
        expect(mockConfig.deviceConfig.mlKemPublicKeyId).toBe(defaultMlKemKeyId)
        expect(onDeviceConfigMock).toHaveBeenCalledTimes(1)
        expect(postSpy).toHaveBeenCalledTimes(2) // First fails, second succeeds

        // Check that first call used qrcMessageKey (HPKE),
        // and second call did not (non-HPKE)
        const firstCallArgs = postSpy.mock.calls[0]
        const firstRequest = Authentication.ApiRequest.decode(firstCallArgs[1])
        expect(firstRequest.qrcMessageKey).toBeNull()
        expect(firstRequest.publicKeyId).toBe(defaultEcKeyId)
        const secondCallArgs = postSpy.mock.calls[1]
        const secondRequest = Authentication.ApiRequest.decode(secondCallArgs[1])
        expect(secondRequest.qrcMessageKey).toBeNull()
        expect(secondRequest.publicKeyId).toBe(newEcKeyId)
    })

    it('should use default keys when device config has no keys set (EC)', async () => {
        const newEcKeyId = 11
        const newMlKemKeyId = 124

        // Clear device config keys to simulate newly registered device
        mockConfig.deviceConfig.transmissionKeyId = undefined
        mockConfig.deviceConfig.mlKemPublicKeyId = undefined
        endpoint = new KeeperEndpoint(mockConfig)

        // Configure mock server to expect new key IDs
        mockServerKeys.ecKeyId = newEcKeyId
        mockServerKeys.mlKemKeyId = newMlKemKeyId

        // Execute startLogin which should trigger key rotation
        await endpoint.executeRest(startLoginRequest)

        // Verify that EC key was updated and ML-KEM wasn't (since we only used EC)
        expect(mockConfig.deviceConfig.transmissionKeyId).toBe(newEcKeyId)
        expect(mockConfig.deviceConfig.mlKemPublicKeyId).toBe(defaultMlKemKeyId)
        expect(onDeviceConfigMock).toHaveBeenCalledTimes(1)
        expect(postSpy).toHaveBeenCalledTimes(2) // First fails, second succeeds

        // Check that the first call used the default EC key, and second used the new EC key
        const firstCallArgs = postSpy.mock.calls[0]
        const firstRequest = Authentication.ApiRequest.decode(firstCallArgs[1])
        expect(firstRequest.qrcMessageKey).toBeNull()
        expect(firstRequest.publicKeyId).toBe(defaultEcKeyId)
        const secondCallArgs = postSpy.mock.calls[1]
        const secondRequest = Authentication.ApiRequest.decode(secondCallArgs[1])
        expect(secondRequest.qrcMessageKey).toBeNull()
        expect(secondRequest.publicKeyId).toBe(newEcKeyId)
    })

    it('should use default keys when device config has no keys set (HPKE)', async () => {
        const newEcKeyId = 11
        const newMlKemKeyId = 124

        // Clear device config keys to simulate newly registered device
        mockConfig.deviceConfig.transmissionKeyId = undefined
        mockConfig.deviceConfig.mlKemPublicKeyId = undefined
        mockConfig.useHpkeForTransmissionKey = true
        endpoint = new KeeperEndpoint(mockConfig)

        // Configure mock server to expect new key IDs
        mockServerKeys.ecKeyId = newEcKeyId
        mockServerKeys.mlKemKeyId = newMlKemKeyId

        // Execute startLogin which should trigger key rotation
        await endpoint.executeRest(startLoginRequest)

        // Verify that both keys were updated
        expect(mockConfig.deviceConfig.transmissionKeyId).toBe(newEcKeyId)
        expect(mockConfig.deviceConfig.mlKemPublicKeyId).toBe(newMlKemKeyId)
        expect(onDeviceConfigMock).toHaveBeenCalledTimes(1)
        expect(postSpy).toHaveBeenCalledTimes(2) // First fails, second succeeds

        // Check that the first call used the default keys, and second used the new keys
        const firstCallArgs = postSpy.mock.calls[0]
        const firstRequest = Authentication.ApiRequest.decode(firstCallArgs[1])
        expect(firstRequest.qrcMessageKey).toBeDefined()
        expect(firstRequest.qrcMessageKey!.ecKeyId).toBe(defaultEcKeyId)
        expect(firstRequest.publicKeyId).toBe(defaultMlKemKeyId)
        const secondCallArgs = postSpy.mock.calls[1]
        const secondRequest = Authentication.ApiRequest.decode(secondCallArgs[1])
        expect(secondRequest.qrcMessageKey).toBeDefined()
        expect(secondRequest.qrcMessageKey!.ecKeyId).toBe(newEcKeyId)
        expect(secondRequest.publicKeyId).toBe(newMlKemKeyId)
    })

    it("should switch from HPKE to non-HPKE when server doesn't support HPKE", async () => {
        const newEcKeyId = 11

        // Enable HPKE for client
        mockConfig.useHpkeForTransmissionKey = true
        mockConfig.deviceConfig.useHpkeTransmission = true
        endpoint = new KeeperEndpoint(mockConfig)

        // Configure mock server to not support HPKE (no ML-KEM key)
        mockServerKeys = {
            ecKeyId: newEcKeyId,
            mlKemKeyId: undefined,  // Server doesn't support HPKE
        }

        // Execute startLogin
        await endpoint.executeRest(startLoginRequest)

        // Verify client switched to non-HPKE and updated EC key only
        expect(mockConfig.deviceConfig.transmissionKeyId).toBe(newEcKeyId)
        expect(mockConfig.deviceConfig.useHpkeTransmission).toBe(false)
        expect(mockConfig.deviceConfig.mlKemPublicKeyId).toBe(defaultMlKemKeyId)  // ML-KEM key unchanged
        // onDeviceConfig called twice: once to disable HPKE, once to update EC key
        expect(onDeviceConfigMock).toHaveBeenCalledTimes(2)
        expect(postSpy).toHaveBeenCalledTimes(2)  // First HPKE fails, second non-HPKE succeeds

        // Verify first call used HPKE and second used non-HPKE
        const firstCallArgs = postSpy.mock.calls[0]
        const firstRequest = Authentication.ApiRequest.decode(firstCallArgs[1])
        expect(firstRequest.qrcMessageKey).toBeDefined()

        const secondCallArgs = postSpy.mock.calls[1]
        const secondRequest = Authentication.ApiRequest.decode(secondCallArgs[1])
        expect(secondRequest.qrcMessageKey).toBeNull()
        expect(secondRequest.publicKeyId).toBe(newEcKeyId)
    })

    it('should switch from HPKE to non-HPKE when returned qrc_ec_key_id is unknown to client', async () => {
        const validEcKeyId = 11
        const unknownMlKemKeyId = 999  // ML-KEM key ID not in testServerMlKemKeys

        // Enable HPKE for client
        mockConfig.useHpkeForTransmissionKey = true
        mockConfig.deviceConfig.useHpkeTransmission = true
        endpoint = new KeeperEndpoint(mockConfig)

        // Configure server with unknown ML-KEM key ID but valid EC key ID
        mockServerKeys = {
            ecKeyId: validEcKeyId,
            mlKemKeyId: unknownMlKemKeyId,  // Unknown to client - will trigger fallback
        }

        // Execute startLogin - client will try HPKE first, get unknown ML-KEM key, fall back to non-HPKE
        await endpoint.executeRest(startLoginRequest)

        // Verify client switched to non-HPKE and uses valid EC key
        expect(mockConfig.deviceConfig.transmissionKeyId).toBe(validEcKeyId)
        expect(mockConfig.deviceConfig.useHpkeTransmission).toBe(false)
        // onDeviceConfig called twice: once to disable HPKE, once to update EC key
        expect(onDeviceConfigMock).toHaveBeenCalledTimes(2)
        expect(postSpy).toHaveBeenCalledTimes(2)

        // Verify first call used HPKE and second used non-HPKE
        const firstCallArgs = postSpy.mock.calls[0]
        const firstRequest = Authentication.ApiRequest.decode(firstCallArgs[1])
        expect(firstRequest.qrcMessageKey).toBeDefined()

        const secondCallArgs = postSpy.mock.calls[1]
        const secondRequest = Authentication.ApiRequest.decode(secondCallArgs[1])
        expect(secondRequest.qrcMessageKey).toBeNull()
        expect(secondRequest.publicKeyId).toBe(validEcKeyId)
    })

    it('should give device config precedence over global config for HPKE usage', async () => {
        const newEcKeyId = 11
        const newMlKemKeyId = 124

        // Global config says use HPKE, but device config says don't
        // (e.g., server previously told us it doesn't support HPKE,
        // or the server told us to use an unknown ML-KEM key ID)
        mockConfig.useHpkeForTransmissionKey = true  // Client: use/allow HPKE
        mockConfig.deviceConfig.useHpkeTransmission = false  // Device: don't use HPKE
        endpoint = new KeeperEndpoint(mockConfig)

        // Configure mock server for non-HPKE (device config should take precedence)
        mockServerKeys = {
            ecKeyId: newEcKeyId,
            mlKemKeyId: newMlKemKeyId,
        }

        // Execute startLogin
        await endpoint.executeRest(startLoginRequest)

        // Verify device config took precedence - client used non-HPKE
        expect(mockConfig.deviceConfig.transmissionKeyId).toBe(newEcKeyId)
        expect(mockConfig.deviceConfig.useHpkeTransmission).toBe(false)
        expect(mockConfig.deviceConfig.mlKemPublicKeyId).toBe(defaultMlKemKeyId)  // ML-KEM key unchanged
        expect(postSpy).toHaveBeenCalledTimes(2)

        // Verify non-HPKE was used (no qrcMessageKey)
        const firstCallArgs = postSpy.mock.calls[0]
        const firstRequest = Authentication.ApiRequest.decode(firstCallArgs[1])
        expect(firstRequest.qrcMessageKey).toBeNull()
        expect(firstRequest.publicKeyId).toBe(defaultEcKeyId)

        const secondCallArgs = postSpy.mock.calls[1]
        const secondRequest = Authentication.ApiRequest.decode(secondCallArgs[1])
        expect(secondRequest.qrcMessageKey).toBeNull()
        expect(secondRequest.publicKeyId).toBe(newEcKeyId)
    })

    it('should throw an error if server returns unknown EC key ID (EC mode)', async () => {
        const unknownEcKeyId = 999  // EC key ID not in testServerKeys

        // Configure mock server to return unknown EC key ID
        mockServerKeys.ecKeyId = unknownEcKeyId
        mockServerKeys.mlKemKeyId = defaultMlKemKeyId

        // Execute startLogin and expect error
        await expect(endpoint.executeRest(startLoginRequest))
            .rejects
            .toThrow()
    })

    it('should throw an error if server returns unknown EC key ID (HPKE mode)', async () => {
        const unknownEcKeyId = 999  // EC key ID not in testServerKeys
        const newMlKemKeyId = 124

        // Clear device config keys to simulate newly registered device
        mockConfig.deviceConfig.transmissionKeyId = undefined
        mockConfig.deviceConfig.mlKemPublicKeyId = undefined
        mockConfig.useHpkeForTransmissionKey = true
        endpoint = new KeeperEndpoint(mockConfig)

        // Configure mock server to expect new key IDs
        mockServerKeys.ecKeyId = unknownEcKeyId
        mockServerKeys.mlKemKeyId = newMlKemKeyId

        // Execute startLogin and expect error
        await expect(endpoint.executeRest(startLoginRequest))
            .rejects
            .toThrow()
    })
})

describe('executeRouterRest', () => {
    let endpoint: KeeperEndpoint
    let mockConfig: ClientConfigurationInternal
    let knownTransmissionKey: TransmissionKey
    const sessionToken = 'dGVzdC1zZXNzaW9uLXRva2Vu' // base64 "test-session-token"

    beforeAll(async () => {
        connectPlatform(browserPlatform)
    })

    beforeEach(async () => {
        jest.clearAllMocks()

        const ecdh = await platform.generateECKeyPair()
        mockConfig = {
            host: 'test.keepersecurity.com',
            deviceConfig: {
                deviceToken: new Uint8Array([1, 2, 3, 4, 5]),
                privateKey: ecdh.privateKey,
                publicKey: ecdh.publicKey,
                deviceName: 'Test Device',
                transmissionKeyId: 10,
                mlKemPublicKeyId: 136,
            },
            clientVersion: 'ec17.6.0',
            onDeviceConfig: jest.fn(),
        }

        endpoint = new KeeperEndpoint(mockConfig)

        // Use a known transmission key so we can encrypt mock responses
        knownTransmissionKey = await generateTransmissionKey(10, 136)
        jest.spyOn(endpoint, 'getTransmissionKey').mockResolvedValue(knownTransmissionKey)
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    // Builds a valid RouterResponse with the given payload encrypted under knownTransmissionKey
    async function makeSuccessResponse(responsePayloadBytes: Uint8Array): Promise<KeeperHttpResponse> {
        const encryptedPayload = await platform.aesGcmEncrypt(responsePayloadBytes, knownTransmissionKey.key)
        const routerResponseBytes = Router.RouterResponse.encode({
            encryptedPayload,
        }).finish()
        return { data: routerResponseBytes, statusCode: 200, headers: new Headers() }
    }

    it('sets transmissionKey and Authorization headers correctly', async () => {
        const message = pamGetLeafsMessage({ vertices: [] })
        const responseBytes = GraphSync.GraphSyncRefsResult.encode({ refs: [] }).finish()
        const postSpy = jest.spyOn(platform, 'post').mockResolvedValue(await makeSuccessResponse(responseBytes))

        await endpoint.executeRouterRest(message, sessionToken)

        expect(postSpy).toHaveBeenCalledTimes(1)
        const [url, , headers] = postSpy.mock.calls[0]

        // URL should use the router base URL
        expect(url).toBe(`https://connect.test.keepersecurity.com/${message.path}`)

        // TransmissionKey header should be the base64-encoded EC-encrypted key
        expect(headers['TransmissionKey']).toBe(platform.bytesToBase64(knownTransmissionKey.ecEncryptedKey))

        // Authorization header should be KeeperUser <base64>
        expect(headers['Authorization']).toMatch(/^KeeperUser [A-Za-z0-9+/=_-]+$/)
    })

    it('encrypts payload with the configured transmissionKey', async () => {
        const message = pamGetLeafsMessage({ vertices: [new Uint8Array([1, 2, 3])] })
        const responseBytes = GraphSync.GraphSyncRefsResult.encode({ refs: [] }).finish()
        const postSpy = jest.spyOn(platform, 'post').mockResolvedValue(await makeSuccessResponse(responseBytes))

        await endpoint.executeRouterRest(message, sessionToken)

        const [, requestBody] = postSpy.mock.calls[0]
        const rawPayload = message.toBytes()

        // The body posted should not be the raw plaintext
        expect(Buffer.from(requestBody).toString('hex')).not.toBe(Buffer.from(rawPayload).toString('hex'))

        // Decrypting with the transmission key should yield the original payload
        const decrypted = await platform.aesGcmDecrypt(requestBody, knownTransmissionKey.key)
        expect(decrypted).toEqual(new Uint8Array(rawPayload))
    })

    it('encodes and decodes protobufs message correctly', async () => {
        const expectedRef: GraphSync.IGraphSyncRef = { value: new Uint8Array([2, 3]), name: 'test-ref' }
        const responseBytes = GraphSync.GraphSyncRefsResult.encode({ refs: [expectedRef] }).finish()
        jest.spyOn(platform, 'post').mockResolvedValue(await makeSuccessResponse(responseBytes))

        const result = await endpoint.executeRouterRest(pamGetLeafsMessage({ vertices: [] }), sessionToken)

        expect(result.refs).toHaveLength(1)
        expect(result.refs![0].name).toBe(expectedRef.name)
        expect(result.refs![0].value).toEqual(expectedRef.value)
    })

    it('throws JSON errors', async () => {
        const errorObj: KeeperError = {
            "path": "https://dev.keepersecurity.com/api/rest/router/user_auth, POST",
            "additional_info": "",
            "location": "default exception manager - api validation exception",
            "error": "access_denied",
            "message": "You do not have the required privilege to perform this operation."
        }
        jest.spyOn(platform, 'post').mockResolvedValue({
            data: platform.stringToBytes(JSON.stringify(errorObj)),
            statusCode: 401,
            headers: new Headers(),
        })

        const message = pamGetLeafsMessage({ vertices: [] })
        await expect(endpoint.executeRouterRest(message, sessionToken))
            .rejects
            .toMatchObject({ error: 'access_denied', message: 'You do not have the required privilege to perform this operation.' })
    })

    it('throws on empty response', async () => {
        jest.spyOn(platform, 'post').mockResolvedValue({
            data: new Uint8Array(0),
            statusCode: 200,
            headers: new Headers(),
        })

        const message = pamGetLeafsMessage({ vertices: [] })
        await expect(endpoint.executeRouterRest(message, sessionToken))
            .rejects
            .toThrow(`Empty response from router for ${message.path}`)
    })

    it('throws KeeperError when RouterResponse has no encryptedPayload', async () => {
        const routerResponseBytes = Router.RouterResponse.encode({
            responseCode: Router.RouterResponseCode.RRC_CONTROLLER_DOWN,
            errorMessage: 'controller unavailable',
        }).finish()
        jest.spyOn(platform, 'post').mockResolvedValue({
            data: routerResponseBytes,
            statusCode: 200,
            headers: new Headers(),
        })

        const message = pamGetLeafsMessage({ vertices: [] })
        await expect(endpoint.executeRouterRest(message, sessionToken))
            .rejects
            .toMatchObject({
                response_code: Router.RouterResponseCode.RRC_CONTROLLER_DOWN,
                path: message.path,
                message: 'controller unavailable',
            })
    })

    it('throws on string response (such as "no credentials included")', async () => {
        const errorString = 'No credentials provided'
        jest.spyOn(platform, 'post').mockResolvedValue({
            data: platform.stringToBytes(errorString),
            statusCode: 401,
            headers: new Headers(),
        })

        const message = pamGetLeafsMessage({ vertices: [] })
        await expect(endpoint.executeRouterRest(message, sessionToken))
            .rejects
            .toThrow(errorString)
    })
})

async function mockPlatformPost(_, requestBody): Promise<KeeperHttpResponse> {
    const apiRequest = Authentication.ApiRequest.decode(requestBody)
    if (apiRequest.qrcMessageKey) {
        // Client is using HPKE mode
        const ecKeyId = apiRequest.qrcMessageKey.ecKeyId!
        const mlKemKeyId = apiRequest.publicKeyId!

        // Check if server doesn't support HPKE (no mlKemKeyId configured)
        if (mockServerKeys.mlKemKeyId === undefined) {
            // Server doesn't support HPKE - return error without qrc_ec_key_id
            const errorObj: KeeperError = {
                key_id: mockServerKeys.ecKeyId,
                // No qrc_ec_key_id or mlKemKeyId - server doesn't support HPKE
                location: 'encrypted_rest_filter',
                error: 'key',
                message: 'key',
            }
            return {
                data: platform.stringToBytes(JSON.stringify(errorObj)),
                statusCode: 401,
                headers: new Headers(),
            }
        }

        // Server supports HPKE - check both EC and ML-KEM key IDs
        if (
            mlKemKeyId !== mockServerKeys.mlKemKeyId ||
            ecKeyId !== mockServerKeys.ecKeyId
        ) {
            const errorObj: KeeperError = {
                key_id: mockServerKeys.mlKemKeyId,
                qrc_ec_key_id: mockServerKeys.ecKeyId,
                location: 'encrypted_rest_filter',
                error: 'key',
                message: 'key',
            }
            return {
                data: platform.stringToBytes(JSON.stringify(errorObj)),
                statusCode: 401,
                headers: new Headers(),
            }
        }

        // Keys match - check if they exist in our test keys
        if (!isAllowedEcKeyId(ecKeyId) || !testServerKeys[ecKeyId]) {
            throw new Error(`Unknown EC Key ID: ${ecKeyId}`)
        }
        if (!isAllowedMlKemKeyId(mlKemKeyId) || !testServerMlKemKeys[mlKemKeyId]) {
            throw new Error(`Unknown ML-KEM Key ID: ${mlKemKeyId}`)
        }
    } else {
        // Non-HPKE mode: check only EC key ID
        const ecKeyId = apiRequest.publicKeyId!

        if (ecKeyId !== mockServerKeys.ecKeyId) {
            const errorObj: KeeperError = {
                key_id: mockServerKeys.ecKeyId,
                location: 'encrypted_rest_filter',
                error: 'key',
                message: 'key',
            }
            return {
                data: platform.stringToBytes(JSON.stringify(errorObj)),
                statusCode: 401,
                headers: new Headers(),
            }
        }

        // Key matches - check if it exists in our test keys
        if (!isAllowedEcKeyId(ecKeyId) || !testServerKeys[ecKeyId]) {
            throw new Error(`Unknown EC Key ID: ${ecKeyId}`)
        }
    }

    // Keys match and exist - decrypt the transmission key from the request
    const transmissionKey = await decryptApiRequestPayload(apiRequest)

    // Return success response (assume start_login for sake of test)
    const loginResponse = Authentication.LoginResponse.encode({
        loginState: Authentication.LoginState.LOGGED_IN,
        encryptedSessionToken: platform.getRandomBytes(64),
        encryptedDataKey: platform.getRandomBytes(64),
    }).finish()
    const encryptedResponse = await platform.aesGcmEncrypt(loginResponse, transmissionKey)
    return {
        data: encryptedResponse,
        statusCode: 200,
        headers: new Headers(),
    }
}

// Helper function to decrypt API request payload
async function decryptApiRequestPayload(request: Authentication.ApiRequest) {
    if (request.qrcMessageKey) {
        const qrcMessageKey = request.qrcMessageKey
        const ecKeyId = qrcMessageKey.ecKeyId!
        const mlKemKeyId = request.publicKeyId!

        // Get the correct variant for this ML-KEM key ID
        const variant = getKeeperMlKemKeyVariant(mlKemKeyId as AllowedMlKemKeyIds)
        const ciphersuite = variant === MlKemVariant.ML_KEM_768
            ? Ciphersuite.HPKE_MLKEM768_ECDHP256_HKDFSHA256_AESGCM256
            : Ciphersuite.HPKE_MLKEM1024_ECDHP256_HKDFSHA256_AESGCM256
        const hpke = new HPKE_ECDH_KYBER(ciphersuite)

        // Ensure all buffers are proper Uint8Arrays (protobuf may return Buffer objects)
        const clientEcPublicKey = new Uint8Array(qrcMessageKey.clientEcPublicKey!)
        const mlKemEncapsulatedKey = new Uint8Array(qrcMessageKey.mlKemEncapsulatedKey!)
        const data = new Uint8Array(qrcMessageKey.data!)
        const optionalData = request.encryptedTransmissionKey ? new Uint8Array(request.encryptedTransmissionKey) : undefined

        // Decrypt the transmission key using HPKE
        const transmissionKey = await hpke.decrypt(
            clientEcPublicKey,
            mlKemEncapsulatedKey,
            data,
            qrcMessageKey.msgVersion as number,
            testServerKeys[ecKeyId].privateKey,      // EC private key (raw bytes)
            testServerKeys[ecKeyId].publicKey,        // EC public key
            testServerMlKemKeys[mlKemKeyId].privateKey, // ML-KEM private key
            optionalData          // optionalData
        )

        return transmissionKey
    } else {
        // Non-HPKE mode: decrypt using EC key
        const ecKeyId = request.publicKeyId!
        const transmissionKey = await platform.privateDecryptEC(
            request.encryptedTransmissionKey!,
            testServerKeys[ecKeyId].privateKey,
            testServerKeys[ecKeyId].publicKey  // Public key is required for EC decryption
        )

        return transmissionKey
    }
}


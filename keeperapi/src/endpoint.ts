import {KeeperError} from './configuration'
import {Authentication, Push, SsoCloud} from './proto'
import {platform} from './platform'
import {
    formatTimeDiff,
    generateTransmissionKey,
    getKeeperUrl,
    isTwoFactorResultCode, log,
    normal64Bytes,
    webSafe64FromBytes
} from './utils'
import {
    RestMessage, RestInMessage, RestOutMessage, RestActionMessage,
    deviceMessage,
    preLoginMessage,
    registerDeviceMessage,
    registerDeviceInRegionMessage,
    updateDeviceMessage
} from './restMessages'
import {ClientConfigurationInternal, TransmissionKey} from './configuration';
import ApiRequestPayload = Authentication.ApiRequestPayload;
import ApiRequest = Authentication.ApiRequest;
import IDeviceResponse = Authentication.IDeviceResponse;
import IPreLoginResponse = Authentication.IPreLoginResponse;
import WssClientResponse = Push.WssClientResponse;
import WssConnectionRequest = Push.WssConnectionRequest;
import SsoCloudResponse = SsoCloud.SsoCloudResponse;
import {KeeperHttpResponse, RestCommand} from './commands'
import { AllowedNumbers, isAllowedNumber } from './transmissionKeys'

export class KeeperEndpoint {
    private _transmissionKey?: TransmissionKey
    public deviceToken?: Uint8Array | null
    public clientVersion

    private onsitePrivateKey: Uint8Array | null = null
    private onsitePublicKey: Uint8Array | null = null

    constructor(private options: ClientConfigurationInternal) {       
        if (options.deviceToken) {
            this.deviceToken = options.deviceToken
        } 
    }

    async getTransmissionKey():Promise<TransmissionKey> {
        const deviceConfigTransmissionKeyId = this.options.deviceConfig.transmissionKeyId || 7
        if(!this._transmissionKey && isAllowedNumber(deviceConfigTransmissionKeyId)){
            this._transmissionKey = await generateTransmissionKey(deviceConfigTransmissionKeyId)
        } else if(!this._transmissionKey){
            this._transmissionKey = await generateTransmissionKey(7)
        }

        return this._transmissionKey
    }

    getUrl(forPath: string): string {
        return getKeeperUrl(this.options.host, forPath)
    }

    async getDeviceToken(): Promise<IDeviceResponse> {
        return this.executeRest(deviceMessage({
            clientVersion: this.clientVersion,
            deviceName: 'JS Keeper API'
        }))
    }

    async getPreLogin(username: string): Promise<IPreLoginResponse> {

        if (!this.deviceToken) {
            console.log('Obtaining device token...')
            let deviceResponse = await this.getDeviceToken()
            if (!deviceResponse.encryptedDeviceToken) {
                throw Error(`Device token was not created. Status: ${deviceResponse.status}`)
            }
            this.deviceToken = deviceResponse.encryptedDeviceToken
            if (this.options.onDeviceToken) {
                this.options.onDeviceToken(this.deviceToken)
            }
        }

        while (true) {
            try {
                return await this.executeRest(preLoginMessage({
                    authRequest: {
                        clientVersion: this.clientVersion,
                        username: username,
                        encryptedDeviceToken: this.deviceToken
                    },
                    loginType: Authentication.LoginType.NORMAL
                }))
            } catch (e) {
                if (!(e instanceof Error))
                    throw(e)
                let errorObj = JSON.parse(e.message)
                if (errorObj.error === 'region_redirect') {
                    this.options.host = errorObj.region_host
                    console.log(`Redirecting to ${this.options.host}`)
                } else {
                    throw(e)
                }
            }
        }
    }

    async registerDevice() {
        // Case 1 new device, no edt no keys - call registration with pub key
        // Case 2 existing device on 14, edt but no keys - call device update
        // Case 3 existing device on 15+, has edt and keys - skip registration

        const deviceConfig = this.options.deviceConfig

        if (deviceConfig.deviceToken && deviceConfig.privateKey && deviceConfig.publicKey) {  // Case 1
            return
        }

        const ecdh = await platform.generateECKeyPair()
        deviceConfig.publicKey = ecdh.publicKey
        deviceConfig.privateKey = ecdh.privateKey
        if (deviceConfig.deviceToken) {
            const devUpdMsg = updateDeviceMessage({
                encryptedDeviceToken: deviceConfig.deviceToken,
                clientVersion: this.options.clientVersion,
                deviceName: deviceConfig.deviceName,
                devicePublicKey: deviceConfig.publicKey,
            })
            await this.executeRestAction(devUpdMsg)
        } else {
            const devRegMsg = registerDeviceMessage({
                clientVersion: this.options.clientVersion,
                deviceName: deviceConfig.deviceName,
                devicePublicKey: deviceConfig.publicKey,
            })
            const devRegResp = await this.executeRest(devRegMsg)
            if (!devRegResp.encryptedDeviceToken) {
                throw Error('Device token was not created')
            }
            deviceConfig.deviceToken = devRegResp.encryptedDeviceToken
        }
        if (this.options.onDeviceConfig) {
            await this.options.onDeviceConfig(deviceConfig, this.options.host);
        }
    }

    async executeRest<TIn, TOut>(message: RestOutMessage<TOut> | RestMessage<TIn, TOut>, sessionToken?: string): Promise<TOut> {
        // @ts-ignore
        return this.executeRestInternal(message, sessionToken)
    }

    async executeRestAction<TIn>(message: RestInMessage<TIn> | RestActionMessage, sessionToken?: string): Promise<void> {
        return this.executeRestInternal(message, sessionToken)
    }

    private async executeRestInternal<TIn, TOut>(message: RestInMessage<TIn> | RestOutMessage<TOut> | RestMessage<TIn, TOut> | RestActionMessage, sessionToken?: string): Promise<TOut | void> {
        this._transmissionKey = await this.getTransmissionKey()
        while (true) {
            const payload = 'toBytes' in message ? message.toBytes() : new Uint8Array()
            const request = await this.prepareRequest(payload, sessionToken)
            log(`Calling REST URL: ${this.getUrl(message.path)}`, 'noCR');
            const startTime = Date.now()
            const response = await platform.post(this.getUrl(message.path), request)
            log(` (${formatTimeDiff(new Date(Date.now() - startTime))})`, 'CR')
            if (!response.data || response.data.length === 0 && response.statusCode === 200) {
                if ('fromBytes' in message) {
                    throw Error(`Missing expected a response for ${message.path}`)
                }
                return
            }
            if (response.statusCode != 200) {
                console.log("Response code:", response.statusCode);
            }
            try {
                const decrypted = await platform.aesGcmDecrypt(response.data, this._transmissionKey.key)
                if ('fromBytes' in message) return message.fromBytes(decrypted)
                return
            } catch {
                const errorMessage = platform.bytesToString(response.data.slice(0, 1000))
                try {
                    const errorObj: KeeperError = JSON.parse(errorMessage)
                    switch (errorObj.error) {
                        case 'key':
                            if(isAllowedNumber(errorObj.key_id!)){
                                await this.updateTransmissionKey(errorObj.key_id!)
                            } else {
                                throw new Error('Incorrect Transmission Key ID being used.')
                            }
                            continue
                        case 'region_redirect':
                            this.options.host = errorObj.region_host!
                            if (this.options.onRegionChanged) {
                                await this.options.onRegionChanged(this.options.host);
                            }
                            continue
                        case 'device_not_registered': {
                            if (this.options.deviceConfig.deviceToken) {
                                await this.executeRestInternal(registerDeviceInRegionMessage({
                                    clientVersion: this.options.clientVersion,
                                    deviceName: this.options.deviceConfig.deviceName,
                                    devicePublicKey: this.options.deviceConfig.publicKey,
                                    encryptedDeviceToken: this.options.deviceConfig.deviceToken
                                }))
                                continue
                            }
                        }
                    }
                    if (this.options.onCommandFailure) {
                        this.options.onCommandFailure({ ...errorObj, ...{ path: message.path } })
                    }
                } catch {
                }
                throw(new Error(errorMessage))
            }
        }
    }

    async executeRestCommand<Request, Response>(command: RestCommand<Request, Response>): Promise<Response> {
        this._transmissionKey = await this.getTransmissionKey()
        command.baseRequest.client_version = this.clientVersion
        const payload = {
            ...command.baseRequest,
            ...command.authorization,
            ...command.request
        }
        const requestBytes = await this.prepareRequest(payload)
        const response = await platform.post(this.getUrl('vault/execute_v2_command'), requestBytes)
        let decrypted
        try {
            decrypted = await platform.aesGcmDecrypt(response.data, this._transmissionKey.key)
        } catch (e) {
            const error = platform.bytesToString(response.data)
            throw(`Unable to decrypt response: ${error}`)
        }
        const json = JSON.parse(platform.bytesToString(decrypted))
        if (json.result !== 'success' && !isTwoFactorResultCode(json.result_code)) {
            throw(json)
        }
        return json as Response
    }

    async get(path: string): Promise<KeeperHttpResponse> {
        return platform.get(this.getUrl(path), {})
    }

    public async updateTransmissionKey(keyNumber: AllowedNumbers) {
        this._transmissionKey = await generateTransmissionKey(keyNumber)

        this.options.deviceConfig.transmissionKeyId = keyNumber
        if (this.options.onDeviceConfig) {
            await this.options.onDeviceConfig(this.options.deviceConfig, this.options.host);
        }
    }

    public async prepareRequest(payload: Uint8Array | unknown, sessionToken?: string): Promise<Uint8Array> {
        this._transmissionKey = await this.getTransmissionKey()
        return prepareApiRequest(payload, this._transmissionKey, sessionToken)
    }

    async decryptPushMessage(pushMessageData: Uint8Array): Promise<WssClientResponse> {
        this._transmissionKey = await this.getTransmissionKey()
        const decryptedPushMessage = await platform.aesGcmDecrypt(pushMessageData, this._transmissionKey.key)
        return WssClientResponse.decode(decryptedPushMessage)
    }

    async getPushConnectionRequest(messageSessionUid: Uint8Array) {
        this._transmissionKey = await this.getTransmissionKey()
        return getPushConnectionRequest(messageSessionUid, this._transmissionKey, this.options.deviceConfig.deviceToken)
    }

    public async prepareSsoPayload(messageSessionUid: Uint8Array, username: string = '', idpSessionId = ''): Promise<string> {
        this._transmissionKey = await this.getTransmissionKey()
        const payload: SsoCloud.ISsoCloudRequest = {
            "embedded": true,
            "clientVersion": this.clientVersion,
            "dest": "vault",
            "forceLogin": false,
            "messageSessionUid": messageSessionUid,
            "idpSessionId": idpSessionId,
            "username": username
        }
        const request = await prepareApiRequest(SsoCloud.SsoCloudRequest.encode(payload).finish(), this._transmissionKey)
        return webSafe64FromBytes(request)
    }

    public async decryptCloudSsoResponse(token: string): Promise<SsoCloudResponse> {
        this._transmissionKey = await this.getTransmissionKey()
        return decryptCloudSsoResponse(token, this._transmissionKey.key)
    }

    public async getOnsitePublicKey(): Promise<string> {
        if (!this.onsitePublicKey || !this.onsitePrivateKey) {
            const {privateKey, publicKey} = await platform.generateRSAKeyPair()

            this.onsitePrivateKey = privateKey
            this.onsitePublicKey = publicKey
        }

        return webSafe64FromBytes(this.onsitePublicKey)
    }

    public decryptOnsiteSsoPassword(password: string): string {
        const encryptedPasswordBytes = normal64Bytes(password)
        if (!this.onsitePrivateKey) {
            throw Error('onsitePrivateKey is missing')
        }
        const decryptedPassword = platform.privateDecrypt(encryptedPasswordBytes, this.onsitePrivateKey)
        return platform.bytesToString(decryptedPassword)
    }
}

export async function getPushConnectionRequest(messageSessionUid: Uint8Array, transmissionKey: TransmissionKey, encryptedDeviceToken?: Uint8Array) {
    const connectionRequest = WssConnectionRequest.create({
        messageSessionUid: messageSessionUid,
        encryptedDeviceToken: encryptedDeviceToken,
        deviceTimeStamp: new Date().getTime()
    })
    const connectionRequestBytes = WssConnectionRequest.encode(connectionRequest).finish()
    const apiRequest = await prepareApiRequest(connectionRequestBytes, transmissionKey)
    return webSafe64FromBytes(apiRequest)
}

export async function prepareApiRequest(payload: Uint8Array | unknown, transmissionKey: TransmissionKey, sessionToken?: string): Promise<Uint8Array> {
    const requestPayload = ApiRequestPayload.create()
    if (payload) {
        requestPayload.payload = payload instanceof Uint8Array
            ? payload
            : platform.stringToBytes(JSON.stringify(payload))
    }
    if (sessionToken) {
        requestPayload.encryptedSessionToken = normal64Bytes(sessionToken);
    }
    let requestPayloadBytes = ApiRequestPayload.encode(requestPayload).finish()
    let encryptedRequestPayload = await platform.aesGcmEncrypt(requestPayloadBytes, transmissionKey.key)
    let apiRequest = ApiRequest.create({
        encryptedTransmissionKey: transmissionKey.encryptedKey,
        encryptedPayload: encryptedRequestPayload,
        publicKeyId: transmissionKey.publicKeyId,
        locale: 'en_US'
    })
    return ApiRequest.encode(apiRequest).finish()
}

export async function decryptCloudSsoResponse(cloudResponseToken: string, key: Uint8Array): Promise<SsoCloudResponse> {
    const decryptedData = await platform.aesGcmDecrypt(normal64Bytes(cloudResponseToken), key);
    return SsoCloudResponse.decode(decryptedData);
}

export enum KeeperEnvironment {
    Prod = 'keepersecurity.com',
    QA = 'qa.keepersecurity.com',
    DEV = 'dev.keepersecurity.com',
    DEV2 = 'dev2.keepersecurity.com',
    LOCAL = 'local.keepersecurity.com',
    Prod_EU = 'keepersecurity.eu',
    QA_EU = 'qa.keepersecurity.eu',
    DEV_EU = 'dev.keepersecurity.eu',
}



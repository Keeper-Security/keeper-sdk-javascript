import {KeeperCommand, KeeperHttpResponse} from './commands'
import {Authentication} from './proto'
import {platform} from './platform'
import {isTwoFactorResultCode, normal64, normal64Bytes} from './utils'
import {deviceMessage, preLoginMessage, RestMessage} from './restMessages'
import ApiRequestPayload = Authentication.ApiRequestPayload;
import ApiRequest = Authentication.ApiRequest;
import IDeviceResponse = Authentication.IDeviceResponse;
import IPreLoginResponse = Authentication.IPreLoginResponse;
import IApiRequestPayload = Authentication.IApiRequestPayload;

export class KeeperEndpoint {
    private transmissionKey: Uint8Array
    private publicKeyId: number
    private encryptedTransmissionKey: Uint8Array
    private deviceToken: Uint8Array
    public clientVersion

    constructor(private host: KeeperEnvironment | string) {
        this.generateTransmissionKey(1)
    }

    private getUrl(forPath: string): string {
        return `https://${this.host}/api/rest/${forPath}`
    }

    async getDeviceToken(): Promise<IDeviceResponse> {
        while (true) {
            try {
                return await this.executeRest(deviceMessage({
                    clientVersion: this.clientVersion,
                    deviceName: 'JS Keeper API'
                }))
            } catch (e) {
                if (!(e instanceof Error))
                    throw(e)
                let errorObj = JSON.parse(e.message)
                if ((errorObj.error === 'key') && (this.publicKeyId <= 6)) {
                    this.generateTransmissionKey(this.publicKeyId + 1)
                } else {
                    throw(e)
                }
            }
        }
    }

    async getPreLogin(username: string): Promise<IPreLoginResponse> {

        if (!this.deviceToken) {
            let deviceResponse = await this.getDeviceToken()
            this.deviceToken = deviceResponse.encryptedDeviceToken
        }

        return this.executeRest(preLoginMessage({
            authRequest: {
                clientVersion: this.clientVersion,
                username: username,
                encryptedDeviceToken: this.deviceToken
            },
            loginType: Authentication.LoginType.NORMAL
        }))
    }

    async executeRest<TIn, TOut>(message: RestMessage<TIn, TOut>, sessionToken?: string): Promise<TOut> {
        let request = await this.prepareRequest(message.toBytes(), sessionToken)
        let response = await platform.post(this.getUrl(message.path), request)
        if (!response.data || response.data.length === 0 && response.statusCode === 200) {
            return
        }
        try {
            let decrypted = await platform.aesGcmDecrypt(response.data, this.transmissionKey)
            return message.fromBytes(decrypted)
        } catch {
            throw(new Error(platform.bytesToString(response.data)))
        }
    }

    async executeV2Command<T>(command: KeeperCommand): Promise<T> {
        command.client_version = this.clientVersion
        let requestBytes = await this.prepareRequest(command)
        let response = await platform.post(this.getUrl('vault/execute_v2_command'), requestBytes)
        let decrypted
        try {
            decrypted = await platform.aesGcmDecrypt(response.data, this.transmissionKey)
        } catch (e) {
            let error = platform.bytesToString(response.data)
            throw(`Unable to decrypt response: ${error}`)
        }
        let json = JSON.parse(platform.bytesToString(decrypted))
        if (json.result !== 'success' && !isTwoFactorResultCode(json.result_code)) {
            throw(json)
        }
        return json as T
    }

    async executeVendorRequest<T>(vendorPath: string, privateKey: string, payload?: any): Promise<T> {
        let url = this.getUrl(`msp/v1/${vendorPath}`)
        let urlBytes = platform.stringToBytes(url.slice(url.indexOf('/rest/msp/v1/')))
        while (true) {
            let encryptedPayloadBytes = payload
                ? await platform.aesGcmEncrypt(Buffer.from(JSON.stringify(payload)), this.transmissionKey)
                : new Uint8Array()
            let signatureBase = Uint8Array.of(...urlBytes, ...this.encryptedTransmissionKey, ...encryptedPayloadBytes)
            let signature = await platform.privateSign(signatureBase, privateKey)
            let response
            try {
                let headers = {
                    Authorization: `Signature ${platform.bytesToBase64(signature)}`,
                    TransmissionKey: platform.bytesToBase64(this.encryptedTransmissionKey),
                    PublicKeyId: this.publicKeyId,
                }
                response = payload
                    ? await platform.post(url, encryptedPayloadBytes, headers)
                    : await platform.get(url, headers)
            } catch (e) {
                console.log('ERR:' + e)
            }
            let decrypted
            try {
                decrypted = await platform.aesGcmDecrypt(response.data, this.transmissionKey)
                let json = JSON.parse(platform.bytesToString(decrypted))
                return json as T
            } catch (e) {
                let error = platform.bytesToString(response.data)
                let errorObj = JSON.parse(error)
                if ((errorObj.error === 'key') && (this.publicKeyId <= 6)) {
                    this.generateTransmissionKey(this.publicKeyId + 1)
                } else {
                    throw(`Unable to decrypt response: ${error}`)
                }
            }
        }
    }

    async get(path: string): Promise<KeeperHttpResponse> {
        return platform.get(this.getUrl(path), {})
    }

    private generateTransmissionKey(keyNumber: number) {
        this.publicKeyId = keyNumber
        this.transmissionKey = platform.getRandomBytes(32)
        let key = platform.keys[keyNumber - 1]
        this.encryptedTransmissionKey = platform.publicEncrypt(this.transmissionKey, key)
    }

    private async prepareRequest(payload: Uint8Array | KeeperCommand, sessionToken?: string): Promise<Uint8Array> {
        let requestPayload: IApiRequestPayload = {}
        if (payload) {
            requestPayload.payload = payload instanceof Uint8Array
                ? payload
                : Buffer.from(JSON.stringify(payload))
        }
        if (sessionToken) {
            requestPayload.encryptedSessionToken = normal64Bytes(sessionToken);
        }
        let requestPayloadBytes = ApiRequestPayload.encode(requestPayload).finish()
        let encryptedRequestPayload = await platform.aesGcmEncrypt(requestPayloadBytes, this.transmissionKey)
        let apiRequest = ApiRequest.create({
            encryptedTransmissionKey: this.encryptedTransmissionKey,
            encryptedPayload: encryptedRequestPayload,
            publicKeyId: this.publicKeyId,
            locale: 'en_US'
        })
        return ApiRequest.encode(apiRequest).finish()
    }
}

export enum KeeperEnvironment {
    Prod = 'keepersecurity.com',
    QA = 'qa.keepersecurity.com',
    DEV = 'dev.keepersecurity.com'
}

interface KeeperKeys {
    der: string[],
    pem: string[]
}

let keys =
    {
        der: {
            key1: 'MIIBCgKCAQEA9Z/CZzxiNUz8+npqI4V10+zW3AL7+M4UQDdd/17759Xzm0MOEfHOOsOgZxxNK1DEsbyCTCE05fd3Hz1mn1uGjXvm5HnN2mL/3TOVxyLU6VwH9EDInnj4DNMFifs69il3KlviT3llRgPCcjF4xrF8d4SR0/N3eqS1f9CBJPNEKEH+am5Xb/FqAlOUoXkILF0UYxA/jNLoWBSq+1W58e4xDI0p0GuP0lN8f97HBtfB7ijbtF+VxIXtxRy+4jA49zK+CQrGmWqIm5DzZcBvUtVGZ3UXd6LeMXMJOifvuCneGC2T2uB6G2g5yD54+onmKIETyNX0LtpR1MsZmKLgru5ugwIDAQAB',
            key2: 'MIIBCgKCAQEAkOpym7xC3sSysw5DAidLoVF7JUgnvXejbieDWmEiD-DQOKxzfQqYHoFfeeix__bx3wMW3I8cAc8zwZ1JO8hyB2ON732JE2Zp301GAUMnAK_rBhQWmYKP_-uXSKeTJPiuaW9PVG0oRJ4MEdS-t1vIA4eDPhI1EexHaY3P2wHKoV8twcGvdWUZB5gxEpMbx5CuvEXptnXEJlxKou3TZu9uwJIo0pgqVLUgRpW1RSRipgutpUslBnQ72Bdbsry0KKVTlcPsudAnnWUtsMJNgmyQbESPm-aVv-GzdVUFvWKpKkAxDpNArPMf0xt8VL2frw2LDe5_n9IMFogUiSYt156_mQIDAQAB',
            key3: 'MIIBCgKCAQEAyvxCWbLvtMRmq57oFg3mY4DWfkb1dir7b29E8UcwcKDcCsGTqoIhubU2pO46TVUXmFgC4E-Zlxt-9F-YA-MY7i_5GrDvySwAy4nbDhRL6Z0kz-rqUirgm9WWsP9v-X_BwzARqq83HNBuzAjf3UHgYDsKmCCarVAzRplZdT3Q5rnNiYPYSHzwfUhKEAyXk71UdtleD-bsMAmwnuYHLhDHiT279An_Ta93c9MTqa_Tq2Eirl_NXn1RdtbNohmMXldAH-C8uIh3Sz8erS4hZFSdUG1WlDsKpyRouNPQ3diorbO88wEAgpHjXkOLj63d1fYJBFG0yfu73U80aEZehQkSawIDAQAB',
            key4: 'MIIBCgKCAQEA0TVoXLpgluaqw3P011zFPSIzWhUMBqXT-Ocjy8NKjJbdrbs53eRFKk1waeB3hNn5JEKNVSNbUIe-MjacB9P34iCfKtdnrdDB8JXx0nIbIPzLtcJC4HCYASpjX_TVXrU9BgeCE3NUtnIxjHDy8PCbJyAS_Pv299Q_wpLWnkkjq70ZJ2_fX-ObbQaZHwsWKbRZ_5sD6rLfxNACTGI_jo9-vVug6AdNq96J7nUdYV1cG-INQwJJKMcAbKQcLrml8CMPc2mmf0KQ5MbS_KSbLXHUF-81AsZVHfQRSuigOStQKxgSGL5osY4NrEcODbEXtkuDrKNMsZYhijKiUHBj9vvgKwIDAQAB',
            key5: 'MIIBCgKCAQEAueOWC26w-HlOLW7s88WeWkXpjxK4mkjqngIzwbjnsU9145R51HvsILvjXJNdAuueVDHj3OOtQjfUM6eMMLr-3kaPv68y4FNusvB49uKc5ETI0HtHmHFSn9qAZvC7dQHSpYqC2TeCus-xKeUciQ5AmSfwpNtwzM6Oh2TO45zAqSA-QBSk_uv9TJu0e1W1AlNmizQtHX6je-mvqZCVHkzGFSQWQ8DBL9dHjviI2mmWfL_egAVVhBgTFXRHg5OmJbbPoHj217Yh-kHYA8IWEAHylboH6CVBdrNL4Na0fracQVTm-nOWdM95dKk3fH-KJYk_SmwB47ndWACLLi5epLl9vwIDAQAB',
            key6: 'MIIBCgKCAQEA2PJRM7-4R97rHwY_zCkFA8B3llawb6gF7oAZCpxprl6KB5z2cqLAvUfEOBtnr7RIturX04p3ThnwaFnAR7ADVZWBGOYuAyaLzGHDI5mvs8D-NewG9vw8qRkTT7Mb8fuOHC6-_lTp9AF2OA2H4QYiT1vt43KbuD0Y2CCVrOTKzDMXG8msl_JvAKt4axY9RGUtBbv0NmpkBCjLZri5AaTMgjLdu8XBXCqoLx7qZL-Bwiv4njw-ZAI4jIszJTdGzMtoQ0zL7LBj_TDUBI4Qhf2bZTZlUSL3xeDWOKmd8Frksw3oKyJ17oCQK-EGau6EaJRGyasBXl8uOEWmYYgqOWirNwIDAQAB'
        },
        pem: {
            key1: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9Z/CZzxiNUz8+npqI4V1\n0+zW3AL7+M4UQDdd/17759Xzm0MOEfHOOsOgZxxNK1DEsbyCTCE05fd3Hz1mn1uG\njXvm5HnN2mL/3TOVxyLU6VwH9EDInnj4DNMFifs69il3KlviT3llRgPCcjF4xrF8\nd4SR0/N3eqS1f9CBJPNEKEH+am5Xb/FqAlOUoXkILF0UYxA/jNLoWBSq+1W58e4x\nDI0p0GuP0lN8f97HBtfB7ijbtF+VxIXtxRy+4jA49zK+CQrGmWqIm5DzZcBvUtVG\nZ3UXd6LeMXMJOifvuCneGC2T2uB6G2g5yD54+onmKIETyNX0LtpR1MsZmKLgru5u\ngwIDAQAB\n-----END PUBLIC KEY-----\n',
            key2: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkOpym7xC3sSysw5DAidL\noVF7JUgnvXejbieDWmEiD+DQOKxzfQqYHoFfeeix//bx3wMW3I8cAc8zwZ1JO8hy\nB2ON732JE2Zp301GAUMnAK/rBhQWmYKP/+uXSKeTJPiuaW9PVG0oRJ4MEdS+t1vI\nA4eDPhI1EexHaY3P2wHKoV8twcGvdWUZB5gxEpMbx5CuvEXptnXEJlxKou3TZu9u\nwJIo0pgqVLUgRpW1RSRipgutpUslBnQ72Bdbsry0KKVTlcPsudAnnWUtsMJNgmyQ\nbESPm+aVv+GzdVUFvWKpKkAxDpNArPMf0xt8VL2frw2LDe5/n9IMFogUiSYt156/\nmQIDAQAB\n-----END PUBLIC KEY-----\n',
            key3: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyvxCWbLvtMRmq57oFg3m\nY4DWfkb1dir7b29E8UcwcKDcCsGTqoIhubU2pO46TVUXmFgC4E+Zlxt+9F+YA+MY\n7i/5GrDvySwAy4nbDhRL6Z0kz+rqUirgm9WWsP9v+X/BwzARqq83HNBuzAjf3UHg\nYDsKmCCarVAzRplZdT3Q5rnNiYPYSHzwfUhKEAyXk71UdtleD+bsMAmwnuYHLhDH\niT279An/Ta93c9MTqa/Tq2Eirl/NXn1RdtbNohmMXldAH+C8uIh3Sz8erS4hZFSd\nUG1WlDsKpyRouNPQ3diorbO88wEAgpHjXkOLj63d1fYJBFG0yfu73U80aEZehQkS\nawIDAQAB\n-----END PUBLIC KEY-----\n',
            key4: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0TVoXLpgluaqw3P011zF\nPSIzWhUMBqXT+Ocjy8NKjJbdrbs53eRFKk1waeB3hNn5JEKNVSNbUIe+MjacB9P3\n4iCfKtdnrdDB8JXx0nIbIPzLtcJC4HCYASpjX/TVXrU9BgeCE3NUtnIxjHDy8PCb\nJyAS/Pv299Q/wpLWnkkjq70ZJ2/fX+ObbQaZHwsWKbRZ/5sD6rLfxNACTGI/jo9+\nvVug6AdNq96J7nUdYV1cG+INQwJJKMcAbKQcLrml8CMPc2mmf0KQ5MbS/KSbLXHU\nF+81AsZVHfQRSuigOStQKxgSGL5osY4NrEcODbEXtkuDrKNMsZYhijKiUHBj9vvg\nKwIDAQAB\n-----END PUBLIC KEY-----\n',
            key5: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAueOWC26w+HlOLW7s88We\nWkXpjxK4mkjqngIzwbjnsU9145R51HvsILvjXJNdAuueVDHj3OOtQjfUM6eMMLr+\n3kaPv68y4FNusvB49uKc5ETI0HtHmHFSn9qAZvC7dQHSpYqC2TeCus+xKeUciQ5A\nmSfwpNtwzM6Oh2TO45zAqSA+QBSk/uv9TJu0e1W1AlNmizQtHX6je+mvqZCVHkzG\nFSQWQ8DBL9dHjviI2mmWfL/egAVVhBgTFXRHg5OmJbbPoHj217Yh+kHYA8IWEAHy\nlboH6CVBdrNL4Na0fracQVTm+nOWdM95dKk3fH+KJYk/SmwB47ndWACLLi5epLl9\nvwIDAQAB\n-----END PUBLIC KEY-----\n',
            key6: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2PJRM7+4R97rHwY/zCkF\nA8B3llawb6gF7oAZCpxprl6KB5z2cqLAvUfEOBtnr7RIturX04p3ThnwaFnAR7AD\nVZWBGOYuAyaLzGHDI5mvs8D+NewG9vw8qRkTT7Mb8fuOHC6+/lTp9AF2OA2H4QYi\nT1vt43KbuD0Y2CCVrOTKzDMXG8msl/JvAKt4axY9RGUtBbv0NmpkBCjLZri5AaTM\ngjLdu8XBXCqoLx7qZL+Bwiv4njw+ZAI4jIszJTdGzMtoQ0zL7LBj/TDUBI4Qhf2b\nZTZlUSL3xeDWOKmd8Frksw3oKyJ17oCQK+EGau6EaJRGyasBXl8uOEWmYYgqOWir\nNwIDAQAB\n-----END PUBLIC KEY-----\n'
        }
    }

let _keeperKeys: KeeperKeys = {
    der: [], pem: []
}

for (let key in keys.der) {
    _keeperKeys.der.push(normal64(keys.der[key]))
}
for (let key in keys.pem) {
    _keeperKeys.pem.push(keys.pem[key])
}

export const keeperKeys: KeeperKeys = _keeperKeys

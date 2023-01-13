import {MSPEnterprise, EnterpriseBase, LicenseAdjustment} from "./vendorModel";
import {TransmissionKey, VendorConfiguration} from "./configuration";
import {platform} from './platform';
import {generateTransmissionKey, getKeeperUrl} from './utils';
import { isAllowedNumber } from "./transmissionKeys";

export class VendorContext {

    private configuration: VendorConfiguration
    private _transmissionKey?:TransmissionKey

    constructor(configuration: VendorConfiguration) {
        this.configuration = configuration
    }

    async getTransmissionKey():Promise<TransmissionKey> {
        if(!this._transmissionKey){
            this._transmissionKey = await generateTransmissionKey(7)
        }

        return this._transmissionKey
    }

    async getEnterprise(enterpriseID: number): Promise<MSPEnterprise> {
        return this.executeVendorRequest<MSPEnterprise>(`${this.configuration.vendorId}/enterprise/${enterpriseID}`, this.configuration.privateKey);
    }

    async postEnterprise(enterprise: EnterpriseBase): Promise<MSPEnterprise> {
        return this.executeVendorRequest<MSPEnterprise>(`${this.configuration.vendorId}/enterprise/`, this.configuration.privateKey, enterprise);
    }

    async postLicenseAdjustment(enterpriseID: number, adjustment: LicenseAdjustment): Promise<MSPEnterprise> {
        return this.executeVendorRequest<MSPEnterprise>(`${this.configuration.vendorId}/license/${enterpriseID}`, this.configuration.privateKey, adjustment);
    }

    async executeVendorRequest<T>(vendorPath: string, privateKey: string, payload?: any): Promise<T> {
        this._transmissionKey = await this.getTransmissionKey()        
        let url = getKeeperUrl(this.configuration.host, `msp/v1/${vendorPath}`)
        let urlBytes = platform.stringToBytes(url.slice(url.indexOf('/rest/msp/v1/')))
        while (true) {
            let encryptedPayloadBytes = payload
                ? await platform.aesGcmEncrypt(Buffer.from(JSON.stringify(payload)), this._transmissionKey.key)
                : new Uint8Array()
            let signatureBase = Uint8Array.of(...urlBytes, ...this._transmissionKey.encryptedKey, ...encryptedPayloadBytes)
            let signature = await platform.privateSign(signatureBase, privateKey)
            let response
            try {
                let headers = {
                    Authorization: `Signature ${platform.bytesToBase64(signature)}`,
                    TransmissionKey: platform.bytesToBase64(this._transmissionKey.encryptedKey),
                    PublicKeyId: this._transmissionKey.publicKeyId,
                }
                response = payload
                    ? await platform.post(url, encryptedPayloadBytes, headers)
                    : await platform.get(url, headers)
            } catch (e) {
                console.log('ERR:' + e)
            }
            let decrypted
            try {
                decrypted = await platform.aesGcmDecrypt(response.data, this._transmissionKey.key)
                let json = JSON.parse(platform.bytesToString(decrypted))
                return json as T
            } catch (e) {
                let error = platform.bytesToString(response.data)
                let errorObj = JSON.parse(error)
                if (errorObj.error === 'key') {
                    if(isAllowedNumber(errorObj.key_id)){
                        this._transmissionKey = await generateTransmissionKey(errorObj.key_id)
                    } else {
                        throw new Error('Incorrect Transmission Key ID being used.')
                    }
                } else {
                    throw(`Unable to decrypt response: ${error}`)
                }
            }
        }
    }
}
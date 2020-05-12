import {KeeperEndpoint} from "./endpoint";
import {MSPEnterprise, EnterpriseBase, LicenseAdjustment} from "./vendorModel";
import {TransmissionKey, VendorConfiguration} from "./configuration";
import {platform} from './platform';
import {generateTransmissionKey, getKeeperUrl} from './utils';

export class VendorContext {

    private transmissionKey: TransmissionKey

    constructor(private configuration: VendorConfiguration) {
        this.updateTransmissionKey(1)
    }

    private updateTransmissionKey(keyNumber: number) {
        this.transmissionKey = generateTransmissionKey(keyNumber)
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
        let url = getKeeperUrl(this.configuration.host, `msp/v1/${vendorPath}`)
        let urlBytes = platform.stringToBytes(url.slice(url.indexOf('/rest/msp/v1/')))
        while (true) {
            let encryptedPayloadBytes = payload
                ? await platform.aesGcmEncrypt(Buffer.from(JSON.stringify(payload)), this.transmissionKey.key)
                : new Uint8Array()
            let signatureBase = Uint8Array.of(...urlBytes, ...this.transmissionKey.encryptedKey, ...encryptedPayloadBytes)
            let signature = await platform.privateSign(signatureBase, privateKey)
            let response
            try {
                let headers = {
                    Authorization: `Signature ${platform.bytesToBase64(signature)}`,
                    TransmissionKey: platform.bytesToBase64(this.transmissionKey.encryptedKey),
                    PublicKeyId: this.transmissionKey.publicKeyId,
                }
                response = payload
                    ? await platform.post(url, encryptedPayloadBytes, headers)
                    : await platform.get(url, headers)
            } catch (e) {
                console.log('ERR:' + e)
            }
            let decrypted
            try {
                decrypted = await platform.aesGcmDecrypt(response.data, this.transmissionKey.key)
                let json = JSON.parse(platform.bytesToString(decrypted))
                return json as T
            } catch (e) {
                let error = platform.bytesToString(response.data)
                let errorObj = JSON.parse(error)
                if ((errorObj.error === 'key') && (this.transmissionKey.publicKeyId <= 6)) {
                    this.updateTransmissionKey(this.transmissionKey.publicKeyId + 1)
                } else {
                    throw(`Unable to decrypt response: ${error}`)
                }
            }
        }
    }
}

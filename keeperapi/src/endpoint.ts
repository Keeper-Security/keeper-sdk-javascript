import {KeeperCommand} from "./commands";
// @ts-ignore
import {Writer} from "protobufjs";
import {Authentication} from "./APIRequest";
import IDeviceResponse = Authentication.IDeviceResponse;
import IDeviceRequest = Authentication.IDeviceRequest;
import DeviceRequest = Authentication.DeviceRequest;
import DeviceResponse = Authentication.DeviceResponse;
import ApiRequestPayload = Authentication.ApiRequestPayload;
import ApiRequest = Authentication.ApiRequest;
import PreLoginResponse = Authentication.PreLoginResponse;
import IPreLoginRequest = Authentication.IPreLoginRequest;
import PreLoginRequest = Authentication.PreLoginRequest;
import {platform} from "./platform";
import {KeeperEnvironment} from "./keeperSettings";

export class KeeperEndpoint {
    private transmissionKey: Uint8Array;
    private publicKeyId: number;
    private encryptedTransmissionKey: Uint8Array;
    private deviceToken: Uint8Array;

    constructor(private host: KeeperEnvironment | string) {
        this.generateTransmissionKey(1);
    }

    private getUrl(forPath: string): string {
        return `https://${this.host}/api/rest/${forPath}`;
    }

    async getDeviceToken(): Promise<IDeviceResponse> {
        let requestBytes = await this.prepareProtobufRequest<IDeviceRequest>(DeviceRequest, {
            clientVersion: "c14.0.0",
            deviceName: "JS Keeper API"
        });
        return await this.executeRest(DeviceResponse, this.getUrl("authentication/get_device_token"), requestBytes);
    }

    async getPreLogin(): Promise<PreLoginResponse> {

        if (!this.deviceToken) {
            let deviceResponse = await this.getDeviceToken();
            this.deviceToken = deviceResponse.encryptedDeviceToken;
        }

        let requestBytes = await this.prepareProtobufRequest<IPreLoginRequest>(PreLoginRequest, {
            authRequest: {
                clientVersion: "c14.0.0",
                username: "saldoukhov@gmail.com",
                encryptedDeviceToken: this.deviceToken
            },
            loginType: Authentication.LoginType.NORMAL
        });
        return await this.executeRest(PreLoginResponse, this.getUrl("authentication/pre_login"), requestBytes);
    }

    private async executeRest<T>(classRef: Decodable<T>, url: string, request: Uint8Array): Promise<T> {
        let response = await platform.post(url, request);
        try {
            let decrypted = await platform.aesGcmDecrypt(response, this.transmissionKey);
            return classRef.decode(decrypted);
        } catch {
            let error = platform.bytesToString(response);
            throw(`Unable to decrypt response: ${error}`);
        }
    }

    async executeV2Command<T>(command: KeeperCommand): Promise<T> {
        let requestBytes = await this.prepareRequest(command);
        let response = await platform.post(this.getUrl("vault/execute_v2_command"), requestBytes);
        let decrypted;
        try {
            decrypted = await platform.aesGcmDecrypt(response, this.transmissionKey);
        } catch (e) {
            let error = platform.bytesToString(response);
            throw(`Unable to decrypt response: ${error}`);
        }
        let json = JSON.parse(platform.bytesToString(decrypted));
        if (json.result !== "success") {
            throw(json.result_code);
        }
        return json as T;
    }

    async executeVendorRequest<T>(vendorPath: string, privateKey: string, payload?: any): Promise<T> {
        let url = this.getUrl(`msp/v1/${vendorPath}`);
        let urlBytes = platform.stringToBytes(url.slice(url.indexOf("/rest/msp/v1/")));
        let encryptedPayloadBytes = payload
            ? await platform.aesGcmEncrypt(Buffer.from(JSON.stringify(payload)), this.transmissionKey)
            : new Uint8Array();
        let signatureBase = Uint8Array.of(...urlBytes, ...this.encryptedTransmissionKey, ...encryptedPayloadBytes);
        let signature = await platform.privateSign(signatureBase, privateKey);
        let response;
        try {
            let headers = {
                Authorization: `Signature ${platform.bytesToBase64(signature)}`,
                TransmissionKey: platform.bytesToBase64(this.encryptedTransmissionKey),
                PublicKeyId: this.publicKeyId,
            };
            response = payload
                ? await platform.post(url, encryptedPayloadBytes, headers)
                : await platform.get(url, headers);
        } catch (e) {
            console.log("ERR:" + e);
        }
        let decrypted;
        try {
            decrypted = await platform.aesGcmDecrypt(response, this.transmissionKey);
        } catch (e) {
            let error = platform.bytesToString(response);
            throw(`Unable to decrypt response: ${error}`);
        }
        let json = JSON.parse(platform.bytesToString(decrypted));
        return json as T;
    }

    private generateTransmissionKey(keyNumber: number) {
        this.publicKeyId = keyNumber;
        this.transmissionKey = platform.getRandomBytes(32);
        let key = platform.keys[keyNumber - 1];
        this.encryptedTransmissionKey = platform.publicEncrypt(this.transmissionKey, key);
    }

    private prepareProtobufRequest<T>(classRef: Encodable<T>, message: T): Promise<Uint8Array> {
        return this.prepareRequest(classRef.encode(message).finish());
    }

    private async prepareRequest(payload: (Uint8Array | KeeperCommand)): Promise<Uint8Array> {
        let payloadBytes = payload instanceof Uint8Array
            ? payload
            : Buffer.from(JSON.stringify(payload));
        let requestPayload = ApiRequestPayload.create({
            payload: payloadBytes
        });
        let requestPayloadBytes = ApiRequestPayload.encode(requestPayload).finish();
        let encryptedRequestPayload = await platform.aesGcmEncrypt(requestPayloadBytes, this.transmissionKey);
        let apiRequest = ApiRequest.create({
            encryptedTransmissionKey: this.encryptedTransmissionKey,
            encryptedPayload: encryptedRequestPayload,
            publicKeyId: this.publicKeyId,
            locale: 'en_US'
        });
        return ApiRequest.encode(apiRequest).finish();
    }
}

interface Encodable<T> {
    encode<T>(message: T, writer?: Writer): Writer;
}

interface Decodable<T> {
    decode(reader: Uint8Array, length?: number): T;
}


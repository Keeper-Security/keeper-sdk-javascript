import {ClientConfiguration} from "./configuration";
import {KeeperEndpoint} from "./endpoint";
import {platform} from "./platform";
import {AuthorizedCommand, LoginCommand, LoginResponse} from "./commands";
import {normal64, webSafe64} from "./utils";

// ApiContext - login and session
// KeeperEndpoint - device and server


// transmission key - ephemeral
// device token - per user per environmement
// username
// password
// environment

// lastusers

export class AuthContext {

    endpoint: KeeperEndpoint;
    private sessionToken: string;
    dataKey: Uint8Array;

    constructor(private options: ClientConfiguration) {
        this.endpoint = new KeeperEndpoint(this.options.host);
    }

    async login() {
        let preLoginResponse = await this.endpoint.getPreLogin();
        let salt = preLoginResponse.salt[0];
        let authHashKey = await platform.deriveKey(this.options.password, salt.salt, salt.iterations);
        let authHash = await platform.calcAutoResponse(authHashKey);
        let loginCommand: LoginCommand = {
            command: "login",
            username: this.options.username,
            auth_response: webSafe64(authHash),
            include: ["keys"], //["license","settings","group","sync_log","keys","enforcements","client_key","images","is_enterprise_admin","security_keys"]
            client_version: "c14.0.0"
        };
        let loginResponse = await this.endpoint.executeV2Command<LoginResponse>(loginCommand);
        this.sessionToken = loginResponse.session_token;
        this.dataKey = await decryptEncryptionParams(this.options.password, loginResponse.keys.encryption_params);
    }

    createCommand<T extends AuthorizedCommand>(commandType: {new():  T}): T {
        let command = new commandType();
        command.command = command.constructor.name.split(/(?=[A-Z])/).slice(0, -1).join('_').toLowerCase();
        command.username = this.options.username;
        command.client_version = "c14.0.0";
        command.device_id = "JS Keeper API";
        command.session_token = this.sessionToken;
        return command;
    }
}

async function decryptEncryptionParams(password: string, encryptionParams: string): Promise<Uint8Array> {
    let corruptedEncryptionParametersMessage = "Corrupted encryption parameters";
    let eParams = platform.base64ToBytes(normal64(encryptionParams));
    if (eParams[0] !== 1)
        throw new Error(corruptedEncryptionParametersMessage);
    let iterations = (eParams[1] << 16) + (eParams[2] << 8) + eParams[3];
    let saltBytes = eParams.subarray(4, 20);
    let masterKey = await platform.deriveKey(password, saltBytes, iterations);
    let encryptedDoubledDataKey = eParams.subarray(20);
    let doubledDataKey = await platform.aesCbcDecrypt(encryptedDoubledDataKey, masterKey, false);
    for (let i = 0; i < 32; i++) {
        if (doubledDataKey[i] !== doubledDataKey[i + 32]) {
            throw new Error(corruptedEncryptionParametersMessage);
        }
    }
    return doubledDataKey.slice(0, 32);
}

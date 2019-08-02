import {ClientConfiguration} from "./configuration";
import {KeeperEndpoint} from "./endpoint";
import {platform} from "./platform";
import {AuthorizedCommand, LoginCommand, LoginResponse} from "./commands";
import {isTwoFactorResultCode, normal64, webSafe64} from "./utils";

export interface AuthUI {
    getTwoFactorCode(): Promise<string>;
    displayDialog(): Promise<boolean>;
}

export class AuthContext {
    endpoint: KeeperEndpoint;
    private _sessionToken: string;
    dataKey: Uint8Array;

    constructor(private options: ClientConfiguration, private authUI?: AuthUI) {
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
            version: 2,
            auth_response: webSafe64(authHash),
            include: ["keys"], //["license","settings","group","sync_log","keys","enforcements","client_key","images","is_enterprise_admin","security_keys"]
            client_version: "c14.0.0"
        };
        let loginResponse: LoginResponse;
        while (true) {
            loginResponse = await this.endpoint.executeV2Command<LoginResponse>(loginCommand);
            if (loginResponse.result_code === "auth_success")
                break;
            if (isTwoFactorResultCode(loginResponse.result_code)) {
                if (!this.authUI)
                    break;
                let token = await this.authUI.getTwoFactorCode();
                if (!token)
                    break;
                loginCommand["2fa_token"] = token;
                loginCommand["2fa_type"] = "one_time";
                loginCommand["device_token_expire_days"] = 9999;
            }
        }
        this._sessionToken = loginResponse.session_token;
        this.dataKey = await decryptEncryptionParams(this.options.password, loginResponse.keys.encryption_params);
    }

    createCommand<T extends AuthorizedCommand>(commandType: { new(): T }): T {
        let command = new commandType();
        command.command = command.constructor.name.split(/(?=[A-Z])/).slice(0, -1).join('_').toLowerCase();
        command.username = this.options.username;
        command.client_version = "c14.0.0";
        command.device_id = "JS Keeper API";
        command.session_token = this._sessionToken;
        return command;
    }

    get sessionToken(): string {
        return this._sessionToken;
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

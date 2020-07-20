import {ClientConfiguration, DeviceVerificationMethods, LoginError, TransmissionKey} from "./configuration";
import {KeeperEndpoint, keeperKeys} from "./endpoint";
import {platform} from "./platform";
import {AuthorizedCommand, KeeperCommand, LoginCommand, LoginResponse, LoginResponseResultCode} from "./commands";
import {
    decryptFromStorage,
    generateTransmissionKey,
    generateUidBytes,
    isTwoFactorResultCode,
    normal64,
    webSafe64,
    webSafe64FromBytes
} from "./utils";
import {
    approveDeviceMessage,
    requestDeviceVerificationMessage,
    RestMessage,
    ssoSamlMessage,
    startLoginMessage,
    twoFactorSend2FAPushMessage,
    twoFactorValidateMessage,
    validateAuthHashMessage, validateDeviceVerificationCodeMessage
} from './restMessages'
import {Authentication} from './proto';
import IStartLoginRequest = Authentication.IStartLoginRequest;
import ITwoFactorSendPushRequest = Authentication.ITwoFactorSendPushRequest;
import TwoFactorPushType = Authentication.TwoFactorPushType;

function unifyLoginError(e: any): LoginError {
    if (e instanceof Error) {
        try {
            return JSON.parse(e.message);
        } catch (jsonError) {
            return {
                error: "unknown",
                message: e.message
            }
        }
    } else {
        return {
            error: e.result_code,
            message: e.result_code
        }
    }
}

type SocketMessage = {
    event: 'received_totp'
    type: 'dna'
    passcode: string
}

type SocketResponseData = {
    event: 'received_totp',
    encryptedLoginToken: string
}

export type SocketProxy = {
    close: () => void
    onClose: (callback: () => void) => void
    onError: (callback: (e: Event | Error) => void) => void
    onMessage: (callback: (e: MessageEvent) => void) => void
    send: (message: any) => void
}

export class SocketListener {
    private socket: SocketProxy;
    // Listeners that receive all messages
    private messageListeners: Array<(data: any) => void>
    // Listeners that receive a single message
    private singleMessageListeners: Array<{
        resolve: (data: any) => void,
        reject: (errorMessage: string) => void
    }>

    constructor(url: string) {
        console.log('Connecting to ' + url)

        this.messageListeners = []
        this.singleMessageListeners = []
        this.socket = platform.createWebsocket(url)

        this.socket.onClose(() => {
            console.log('socket closed')
        })
        this.socket.onError((e: Event | Error) => {
            console.log('socket error: ' + e)
        })
        this.socket.onMessage(e => {
            this.handleMessage(e)
        })
    }

    registerLogin(sessionToken: string) {
        this.socket.send(sessionToken)
    }

    onClose(callback: () => void): void {
        this.socket.onClose(callback)
    }

    onError(callback: () => void): void {
        this.socket.onError(callback)
    }

    private handleMessage(msgEvent: MessageEvent): void {
        for (let callback of this.messageListeners) {
            callback(msgEvent.data)
        }

        for (let {resolve} of this.singleMessageListeners) {
            resolve(msgEvent.data)
        }
        this.singleMessageListeners.length = 0
    }

    onPushMessage(callback: (data: any) => void): void {
        this.messageListeners.push(callback)
    }

    async getPushMessage(): Promise<any> {
        console.log('Awaiting web socket message')

        return new Promise<any>((resolve, reject) => {
            this.singleMessageListeners.push({resolve, reject})
        })
    }

    disconnect() {
        this.socket.close();
        this.socket = null
        this.messageListeners.length = 0

        for (let {reject} of this.singleMessageListeners) {
            reject('Socket disconnected')
        }
        this.singleMessageListeners.length = 0
    }
}

export class Auth {
    private endpoint: KeeperEndpoint;
    private _sessionToken: string;
    dataKey: Uint8Array;
    privateKey: Uint8Array;
    private _username: string;
    private managedCompanyId?: number;
    private socket: SocketListener;
    private messageSessionUid: Uint8Array;
    private _accountUid: Uint8Array;

    constructor(private options: ClientConfiguration) {
        this.endpoint = new KeeperEndpoint(this.options);
        this.endpoint.clientVersion = options.clientVersion || "c14.0.0";
        this.messageSessionUid = generateUidBytes()
    }

    getMessageSessionUid(): Uint8Array {
        return this.messageSessionUid;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
            delete this.socket
        }
    }

    /**
     * useAlternate is to pass to the next function to use an alternate method, for testing a different path.
     */
    async loginV3(username: string, password: string, useAlternate: boolean = false) {

        if (!this.options.deviceConfig.deviceToken) {
            await this.endpoint.registerDevice()
        }

        if (!this.socket) {
            const connectionRequest = await this.endpoint.getPushConnectionRequest(this.messageSessionUid)
            this.socket = new SocketListener(`wss://push.services.${this.options.host}/wss_open_connection/${connectionRequest}`)
            console.log("Socket connected")
        }

        let loginToken: Uint8Array;
        let previousLoginState = 0;

        while (true) {
            const startLoginRequest: IStartLoginRequest = {
                clientVersion: this.endpoint.clientVersion,
                encryptedDeviceToken: this.options.deviceConfig.deviceToken,
                messageSessionUid: this.messageSessionUid,
                loginType: Authentication.LoginType.NORMAL,
                // forceNewLogin: true
            }
            if (loginToken) {
                startLoginRequest.encryptedLoginToken = loginToken
            } else {
                startLoginRequest.username = username
            }
            const loginResponse = await this.executeRest(startLoginMessage(startLoginRequest))
            console.log(loginResponse)
            if (! loginResponse.loginState) {
                console.log("loginState is null");
                loginResponse.loginState = 99;
            }
            console.log("login state =", loginResponse.loginState);

            if (previousLoginState === 13) {
                return;  // hack to stop infinite loop
            }
            previousLoginState = loginResponse.loginState;

            switch (loginResponse.loginState) {
                case Authentication.LoginState.INVALID_LOGINSTATE:
                    break;
                case Authentication.LoginState.LOGGED_OUT:
                    break;
                case Authentication.LoginState.DEVICE_APPROVAL_REQUIRED:
                    loginToken = await this.verifyDevice(username, loginResponse.encryptedLoginToken)
                    break;
                case Authentication.LoginState.DEVICE_LOCKED:
                    break;
                case Authentication.LoginState.ACCOUNT_LOCKED:
                    break;
                case Authentication.LoginState.DEVICE_ACCOUNT_LOCKED:
                    break;
                case Authentication.LoginState.UPGRADE:
                    break;
                case Authentication.LoginState.LICENSE_EXPIRED:
                    throw new Error('License expired')
                case Authentication.LoginState.REGION_REDIRECT:
                    const url = new URL(loginResponse.url)
                    this.options.host = url.host
                    break;
                case Authentication.LoginState.REDIRECT_CLOUD_SSO:
                    console.log("Cloud SSO Connect login");
                    await this.cloudSsoLogin(loginResponse.url, this.messageSessionUid, useAlternate);
                    return;
                case Authentication.LoginState.REDIRECT_ONSITE_SSO:
                    console.log("SSO Connect login");
                    await this.cloudSsoLogin(loginResponse.url, this.messageSessionUid, useAlternate);
                    return;
                case Authentication.LoginState.REQUIRES_2FA:
                    if (!this.options.authUI3) {
                        throw new Error('Unhandled prompt for second factor')
                    }
                    loginToken = await this.handleTwoFactor(loginResponse)
                    break
                case Authentication.LoginState.REQUIRES_AUTH_HASH:
                    await this.authHashLogin(loginResponse, username, password)
                    return;
                case Authentication.LoginState.REQUIRES_USERNAME:
                    break;
                case Authentication.LoginState.LOGGED_IN:
                    this.setLoginParameters(username, webSafe64FromBytes(loginResponse.encryptedSessionToken), loginResponse.accountUid)
                    console.log("Exiting on loginState = LOGGED_IN");
                    return;
                    //break;
            }
        }
    }

    async verifyDevice(username: string, loginToken: Uint8Array): Promise<Uint8Array> {
        if (!this.options.authUI3) {
            throw new Error('Unhandled prompt for device verification')
        }

        const deviceConfig = this.options.deviceConfig

        const verifyMethod = await this.options.authUI3.getDeviceVerificationMethod()

        switch (verifyMethod) {
            case DeviceVerificationMethods.Email:
                await this.executeRest(requestDeviceVerificationMessage({
                    username: username,
                    encryptedDeviceToken: deviceConfig.deviceToken,
                    clientVersion: this.endpoint.clientVersion,
                    messageSessionUid: this.messageSessionUid
                }))
                const token = await this.options.authUI3.getDeviceVerificationCode()
                if (!!token) {
                    await this.executeRest(validateDeviceVerificationCodeMessage({
                        verificationCode: token,
                        username: username
                    }))
                    // const resp = await this.get(`validate_device_verification_code/${token}`)
                    // console.log(platform.bytesToString(resp.data))
                }
                return undefined
            case DeviceVerificationMethods.TFACode:
                return this.handleTwoFactorCode(loginToken)
            case DeviceVerificationMethods.TFAPush:
                await this.executeRest(twoFactorSend2FAPushMessage({
                    encryptedLoginToken: loginToken,
                }))
                const pushMessage = await this.socket.getPushMessage()
                const wssClientResponse = await this.endpoint.decryptPushMessage(pushMessage)
                const socketResponseData: SocketResponseData = JSON.parse(wssClientResponse.message)
                console.log(socketResponseData)
                return platform.base64ToBytes(socketResponseData.encryptedLoginToken)
            case DeviceVerificationMethods.SMS:
                await this.executeRest(twoFactorSend2FAPushMessage({
                    encryptedLoginToken: loginToken,
                }))
                return this.handleTwoFactorCode(loginToken)
            case DeviceVerificationMethods.KeeperPush:
                while (true) {
                    await this.executeRest(twoFactorSend2FAPushMessage({
                        encryptedLoginToken: loginToken,
                        pushType: TwoFactorPushType.TWO_FA_PUSH_KEEPER
                    }))
                    const msg = await this.getPushMessage()
                    if (msg.approved && msg.message === 'device_approved') {
                        return undefined
                    }
                }
            default:
                throw new Error('Invalid choice for device verification')
        }
    }

    private async handleTwoFactor(loginResponse: Authentication.ILoginResponse): Promise<Uint8Array> {
        let pushType = TwoFactorPushType.TWO_FA_PUSH_NONE
        switch (loginResponse.channels[0].channelType) {
            case Authentication.TwoFactorChannelType.TWO_FA_CT_TOTP:
                break;
            case Authentication.TwoFactorChannelType.TWO_FA_CT_SMS:
                pushType = TwoFactorPushType.TWO_FA_PUSH_SMS
                break;
            case Authentication.TwoFactorChannelType.TWO_FA_CT_DUO:
                pushType = TwoFactorPushType.TWO_FA_PUSH_DUO_PUSH // potentially ask for duo push type
                // pushType = TwoFactorPushType.TWO_FA_PUSH_DUO_TEXT
                // pushType = TwoFactorPushType.TWO_FA_PUSH_DUO_CALL
                break;
            case Authentication.TwoFactorChannelType.TWO_FA_CT_RSA:
                break;
            // case Authentication.TwoFactorChannelType.TWO_FA_CT_BACKUP:
            //     break;
            case Authentication.TwoFactorChannelType.TWO_FA_CT_U2F:
                break;
            case Authentication.TwoFactorChannelType.TWO_FA_CT_WEBAUTHN:
                break;
            case Authentication.TwoFactorChannelType.TWO_FA_CT_KEEPER:
                pushType = TwoFactorPushType.TWO_FA_PUSH_KEEPER
                break;
            case Authentication.TwoFactorChannelType.TWO_FA_CT_DNA:
                pushType = TwoFactorPushType.TWO_FA_PUSH_DNA
                break;
        }
        const codeLessPush = [
            TwoFactorPushType.TWO_FA_PUSH_DUO_PUSH,
            TwoFactorPushType.TWO_FA_PUSH_DUO_CALL,
            TwoFactorPushType.TWO_FA_PUSH_KEEPER
        ].includes(pushType)
        if (pushType !== TwoFactorPushType.TWO_FA_PUSH_NONE) {
            const sendPushRequest: ITwoFactorSendPushRequest = {
                encryptedLoginToken: loginResponse.encryptedLoginToken,
                pushType: pushType
            }
            if (codeLessPush) {
                sendPushRequest.expireIn = await this.options.authUI3.getTwoFactorExpiration()
            }
            await this.executeRest(twoFactorSend2FAPushMessage(sendPushRequest))
        }
        if (codeLessPush) {
            const pushMessage = await this.socket.getPushMessage()
            const wssClientResponse = await this.endpoint.decryptPushMessage(pushMessage)
            const socketResponseData: SocketResponseData = JSON.parse(wssClientResponse.message)
            console.log(socketResponseData)
            return platform.base64ToBytes(socketResponseData.encryptedLoginToken)
        } else {
            return this.handleTwoFactorCode(loginResponse.encryptedLoginToken)
        }
    }

    private async handleTwoFactorCode(loginToken: Uint8Array): Promise<Uint8Array> {
        while (true) {
            try {
                const twoFactorInput = await this.options.authUI3.getTwoFactorCode()
                const twoFactorValidateMsg = twoFactorValidateMessage({
                    encryptedLoginToken: loginToken,
                    value: twoFactorInput.twoFactorCode,
                    expireIn: twoFactorInput.desiredExpiration
                })
                const twoFactorValidateResp = await this.executeRest(twoFactorValidateMsg)
                return twoFactorValidateResp.encryptedLoginToken
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    async authHashLogin(loginResponse: Authentication.ILoginResponse, username: string, password: string) {
        // TODO test for account transfer and account recovery
        const salt = loginResponse.salt[0]
        const authHashKey = await platform.deriveKey(password, salt.salt, salt.iterations);
        let authHash = await platform.calcAuthVerifier(authHashKey);

        const loginMsg = validateAuthHashMessage({
            authResponse: authHash,
            encryptedLoginToken: loginResponse.encryptedLoginToken
        })
        const loginResp = await this.executeRest(loginMsg)
        console.log(loginResp)

        this.setLoginParameters(username, webSafe64FromBytes(loginResp.encryptedSessionToken), loginResp.accountUid)
        this.dataKey = await decryptEncryptionParams(password, loginResp.encryptedDataKey);
        this.socket.registerLogin(this._sessionToken)
    }

    async cloudSsoLogin(ssoLoginUrl: string, messageSessionUid: Uint8Array, useGet: boolean = false) : Promise<any> {
        let keyPair : any = await platform.generateRSAKeyPair2();
        let publicKey : Buffer = keyPair.exportKey('pkcs1-public-der');
        let encodedPublicKey : string = webSafe64FromBytes(publicKey);

        console.log("public key length is " + encodedPublicKey.length);

        try {
            console.log("\n*** cloudSsoLogin at " + ssoLoginUrl + " ***");

            // We have full URL but the library wants to recreate it so we let it.
            let pos = ssoLoginUrl.indexOf("login");
            ssoLoginUrl = ssoLoginUrl.substring(pos);

            // This should return HTML
            let ssoLoginResp = await this.executeRestToHTML(ssoSamlMessage(ssoLoginUrl), this._sessionToken,
                                                            { "message_session_uid": webSafe64FromBytes(messageSessionUid),
                                                              "key": encodedPublicKey,
                                                              "device_id": 2141430350,  //"TarD2lczSTI4ZJx1bG0F8aAc0HrK5JoLpOqH53sRFg0=",
                                                            }, useGet);

            console.log("\n---------- HTML ---------------\n" + ssoLoginResp + "-----------------------------------\n");
            return ssoLoginResp;

        } catch (e) {
            console.log(e)
        }
        return {};
    }

    /**
     * This is the more secure version of login that uses an encrypted protobuf.
     * July 2020
     */
    async cloudSsoLogin2(ssoLoginUrl: string, encodedPayload: string, useGet: boolean = false) : Promise<any> {
        const encryptionKey : TransmissionKey = generateTransmissionKey(this.endpoint.getTransmissionKey().publicKeyId);
        const encodedEncryptionKey: string = webSafe64FromBytes(encryptionKey.encryptedKey);
        let keyPair : any = await platform.generateRSAKeyPair2();
        let publicKey : Buffer = keyPair.exportKey('pkcs1-public-der');
        let encodedPublicKey : string = webSafe64FromBytes(publicKey);

        console.log("encodedEncryptionKey = " + encodedEncryptionKey);

        try {
            console.log("\n*** cloudSsoLogin2 at " + ssoLoginUrl + " ***");

            // We have full URL but the library wants to recreate it so we let it.
            let pos = ssoLoginUrl.indexOf("login");
            ssoLoginUrl = ssoLoginUrl.substring(pos);

            // This should return HTML
            let ssoLoginResp = await this.executeRestToHTML(ssoSamlMessage(ssoLoginUrl), this._sessionToken,
                                                            { "key": encodedEncryptionKey,
                                                              "payload": encodedPayload
                                                            }, useGet);

            console.log("\n---------- HTML ---------------\n" + ssoLoginResp + "-----------------------------------\n");
            return ssoLoginResp;

        } catch (e) {
            console.log(e)
        }
        return {};
    }

    async cloudSsoLogout(ssoLogoutUrl: string, messageSessionUid: Uint8Array, useGet: boolean = false) : Promise<any> {
        let keyPair : any = await platform.generateRSAKeyPair2();
        let publicKey : Buffer = keyPair.exportKey('pkcs1-public-der');
        let encodedPublicKey : string = webSafe64FromBytes(publicKey);

        try {
            console.log("\n*** cloudSsoLogout at " + ssoLogoutUrl + " ***");

            // We have full URL but the library wants to recreate it so we let it.
            let pos = ssoLogoutUrl.indexOf("logout");
            ssoLogoutUrl = ssoLogoutUrl.substring(pos);

            // This should return HTML
            let ssoLogoutResp = await this.executeRestToHTML(ssoSamlMessage(ssoLogoutUrl), this._sessionToken,
                                                            { "message_session_uid": webSafe64FromBytes(messageSessionUid),
                                                              "key": encodedPublicKey
                                                            }, useGet);

            console.log("\n---------- HTML ---------------\n" + ssoLogoutResp + "-----------------------------------\n");
            return ssoLogoutResp;

        } catch (e) {
            console.log(e)
        }
        return {};
    }

    /**
     * This is the more secure version of logout that uses an encrypted protobuf.
     * July 2020
     */
    async cloudSsoLogout2(ssoLogoutUrl: string, encodedPayload: string, useGet: boolean = false) : Promise<any> {
        const encryptionKey : TransmissionKey = generateTransmissionKey(this.endpoint.getTransmissionKey().publicKeyId);
        const encodedEncryptionKey: string = webSafe64FromBytes(encryptionKey.encryptedKey);
        let keyPair : any = await platform.generateRSAKeyPair2();
        let publicKey : Buffer = keyPair.exportKey('pkcs1-public-der');
        let encodedPublicKey : string = webSafe64FromBytes(publicKey);

        console.log("encodedEncryptionKey = " + encodedEncryptionKey);

        try {
            console.log("\n*** cloudSsoLogout2 at " + ssoLogoutUrl + " ***");

            // We have full URL but the library wants to recreate it so we let it.
            let pos = ssoLogoutUrl.indexOf("logout");
            ssoLogoutUrl = ssoLogoutUrl.substring(pos);

            // This should return HTML
            let ssoLogoutResp = await this.executeRestToHTML(ssoSamlMessage(ssoLogoutUrl), this._sessionToken,
                                                            { "key": encodedEncryptionKey,
                                                              "payload": encodedPayload
                                                            }, useGet);

            console.log("\n---------- HTML ---------------\n" + ssoLogoutResp + "-----------------------------------\n");
            return ssoLogoutResp;

        } catch (e) {
            console.log(e)
        }
        return {};
    }

    async login(username: string, password: string) {
        try {
            let preLoginResponse = await this.endpoint.getPreLogin(username);
            let salt = preLoginResponse.salt[0];
            let authHashKey = await platform.deriveKey(password, salt.salt, salt.iterations);
            let authHash = platform.bytesToBase64(await platform.calcAuthVerifier(authHashKey));

            let loginCommand = new LoginCommand();
            loginCommand.command = "login";
            loginCommand.username = username;
            loginCommand.version = 2;
            loginCommand.auth_response = webSafe64(authHash);
            loginCommand.platform_device_token = webSafe64FromBytes(this.endpoint.deviceToken);
            loginCommand.include = ["keys"]; //["license","settings","group","sync_log","keys","enforcements","client_key","images","is_enterprise_admin","security_keys"]
            if (this.managedCompanyId) {
                loginCommand.enterprise_id = this.managedCompanyId
            }
            let loginResponse: LoginResponse;
            let socketListener: SocketListener;
            while (true) {
                loginResponse = await this.endpoint.executeV2Command<LoginResponse>(loginCommand);
                if (loginResponse.result_code === "auth_success")
                    break;
                console.log(loginResponse)
                if (isTwoFactorResultCode(loginResponse.result_code)) {
                    if (!!loginResponse.u2f_challenge) {
                        loginResponse.u2f_challenge = JSON.parse(loginResponse.u2f_challenge as string);
                    }
                    if (!this.options.authUI)
                        break;
                    let errorMessage = loginResponse.result_code === LoginResponseResultCode.InvalidTOTP
                        ? loginResponse.message
                        : undefined;
                    if (loginResponse.channel === 'two_factor_channel_duo' && loginResponse.url) {
                        loginCommand['2fa_mode'] = 'push'
                        socketListener = new SocketListener(loginResponse.url)
                    } else {
                        let token: string
                        if (socketListener) {
                            const pushMessage: SocketMessage = JSON.parse(await socketListener.getPushMessage())
                            socketListener.disconnect()
                            console.log(pushMessage)
                            token = pushMessage.passcode
                        } else {
                            token = await this.options.authUI.getTwoFactorCode(errorMessage)
                        }
                        if (!token)
                            break;
                        loginCommand["2fa_token"] = token;
                    }
                    loginCommand['2fa_type'] = 'one_time';
                    loginCommand["device_token_expire_days"] = 9999;
                }
            }
            this._sessionToken = loginResponse.session_token;
            this._username = username;
            this.dataKey = await decryptEncryptionParamsString(password, loginResponse.keys.encryption_params);
            if (loginResponse.keys.encrypted_private_key) {
                this.privateKey = decryptFromStorage(loginResponse.keys.encrypted_private_key, this.dataKey);
            }
        } catch (e) {
            throw unifyLoginError(e);
        }
    }

    async managedCompanyLogin(username: string, password: string, companyId: number) {
        this.managedCompanyId = companyId;
        await this.login(username, password);
    }

    async executeCommand<Command extends KeeperCommand>(command: Command): Promise<Command["response"]> {
        command.username = this._username;
        if (command instanceof AuthorizedCommand) {
            command.device_id = "JS Keeper API";
            command.session_token = this._sessionToken;
        }
        return this.endpoint.executeV2Command(command);
    }

    async executeRest<TIn, TOut>(message: RestMessage<TIn, TOut>): Promise<TOut> {
        return this.endpoint.executeRest(message, this._sessionToken);
    }

    async executeRestToHTML<TIn, TOut>(message: RestMessage<TIn, TOut>, sessionToken?: string, formParams?: any, useGet?: boolean): Promise<string> {
        return this.endpoint.executeRestToHTML(message, sessionToken, formParams, useGet);
    }

    public get sessionToken(): string {
        return this._sessionToken;
    }

    get username(): string {
        return this._username;
    }

    get clientVersion(): string {
        return this.endpoint.clientVersion;
    }

    get _endpoint(): KeeperEndpoint {
        return this.endpoint;
    }

    async get(path: string) {
        return this.endpoint.get(path)
    }

    setLoginParameters(userName: string, sessionToken: string, accountUid: Uint8Array) {
        this._username = userName;
        this._sessionToken = sessionToken;
        this._accountUid = accountUid;
    }

    async registerDevice() {
        await this.endpoint.registerDevice()
    }

    onClose(callback: () => void): void {
        this.socket.onClose(callback)
    }

    onError(callback: () => void): void {
        this.socket.onError(callback)
    }

    onPushMessage(callback: (data: any) => void): void {
        this.socket.onPushMessage(callback)
    }

    async getPushMessage(): Promise<any> {
        const pushMessage = await this.socket.getPushMessage()
        const wssClientResponse = await this.endpoint.decryptPushMessage(pushMessage)
        console.log(wssClientResponse.message)
        return JSON.parse(wssClientResponse.message)
    }

    async approveDevice(encryptedDeviceToken: Uint8Array) {
        const approveDevMsg = approveDeviceMessage({
            accountUid: this._accountUid,
            encryptedDeviceToken: encryptedDeviceToken
        })
        const resp = await this.executeRest(approveDevMsg)
        console.log(resp)
    }
}

const iterationsToBytes = (iterations: number): Uint8Array => {
    const iterationBytes = new ArrayBuffer(4)
    new DataView(iterationBytes).setUint32(0, iterations)
    const bytes = new Uint8Array(iterationBytes)
    bytes[0] = 1 // version
    return bytes
};

export async function createAuthVerifier(password: string, iterations: number): Promise<Uint8Array> {
    const salt = platform.getRandomBytes(16);
    const authHashKey = await platform.deriveKey(password, salt, iterations);
    return Uint8Array.of(...iterationsToBytes(iterations), ...salt, ...authHashKey)
}

export async function createEncryptionParams(password: string, dataKey: Uint8Array, iterations: number): Promise<Uint8Array> {
    const salt = platform.getRandomBytes(16);
    const authHashKey = await platform.deriveKey(password, salt, iterations);
    const doubledDataKey = Uint8Array.of(...dataKey, ...dataKey)
    const encryptedDoubledKey = await platform.aesCbcEncrypt(doubledDataKey, authHashKey, false)
    return Uint8Array.of(...iterationsToBytes(iterations), ...salt, ...encryptedDoubledKey)
}

async function decryptEncryptionParamsString(password: string, encryptionParams: string): Promise<Uint8Array> {
    return decryptEncryptionParams(password, platform.base64ToBytes(normal64(encryptionParams)))
}

export async function decryptEncryptionParams(password: string, encryptionParams: Uint8Array): Promise<Uint8Array> {
    let corruptedEncryptionParametersMessage = "Corrupted encryption parameters";
    if (encryptionParams[0] !== 1)
        throw new Error(corruptedEncryptionParametersMessage);
    let iterations = (encryptionParams[1] << 16) + (encryptionParams[2] << 8) + encryptionParams[3];
    let saltBytes = encryptionParams.subarray(4, 20);
    let masterKey = await platform.deriveKey(password, saltBytes, iterations);
    let encryptedDoubledDataKey = encryptionParams.subarray(20);
    let doubledDataKey = await platform.aesCbcDecrypt(encryptedDoubledDataKey, masterKey, false);
    for (let i = 0; i < 32; i++) {
        if (doubledDataKey[i] !== doubledDataKey[i + 32]) {
            throw new Error(corruptedEncryptionParametersMessage);
        }
    }
    return doubledDataKey.slice(0, 32);
}

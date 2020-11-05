import {
    ClientConfiguration,
    ClientConfigurationInternal,
    DeviceApprovalChannel,
    DeviceVerificationMethods,
    LoginError,
    TwoFactorChannelData
} from './configuration'
import {KeeperEndpoint, KeeperEnvironment} from "./endpoint";
import {platform} from "./platform";
import {AuthorizedCommand, KeeperCommand, LoginCommand, LoginResponse, LoginResponseResultCode} from "./commands";
import {
    chooseErrorMessage,
    decryptFromStorage,
    generateEncryptionKey,
    generateUidBytes,
    isTwoFactorResultCode,
    normal64,
    normal64Bytes,
    resolvablePromise,
    webSafe64,
    webSafe64FromBytes
} from "./utils";
import {
    accountSummaryMessage,
    logoutV3Message,
    requestCreateUserMessage,
    requestDeviceAdminApprovalMessage,
    requestDeviceVerificationMessage,
    RestMessage,
    ssoServiceProviderRequestMessage,
    startLoginMessage,
    twoFactorSend2FAPushMessage,
    twoFactorValidateMessage,
    validateAuthHashMessage,
    validateDeviceVerificationCodeMessage
} from './restMessages'
import {AccountSummary, Authentication} from './proto';
import IStartLoginRequest = Authentication.IStartLoginRequest;
import ITwoFactorSendPushRequest = Authentication.ITwoFactorSendPushRequest;
import TwoFactorExpiration = Authentication.TwoFactorExpiration;
import TwoFactorPushType = Authentication.TwoFactorPushType;
import TwoFactorChannelType = Authentication.TwoFactorChannelType;
import ISsoServiceProviderRequest = Authentication.ISsoServiceProviderRequest;
import LoginType = Authentication.LoginType;
import LoginMethod = Authentication.LoginMethod;
import IAccountSummaryElements = AccountSummary.IAccountSummaryElements;

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

export type SocketProxy = {
    onOpen: (callback: () => void) => void
    close: () => void
    onClose: (callback: () => void) => void
    onError: (callback: (e: Event | Error) => void) => void
    onMessage: (callback: (e: Uint8Array) => void) => void
    send: (message: any) => void
    messageQueue: any[] // Since messages are type any here, make this an any array
}

export class SocketListener {
    private socket: SocketProxy | null;
    private url: string
    private getConnectionRequest?: () => Promise<string>
    // Listeners that receive all messages
    private messageListeners: Array<(data: any) => void>
    // Listeners that receive a single message
    private singleMessageListeners: Array<{
        resolve: (data: any) => void,
        reject: (errorMessage: string) => void
    }>
    // Listeners that signal a re-connected socket
    private onOpenListeners: Array<() => void>

    private reconnectTimeout: ReturnType<typeof setTimeout>
    private currentBackoffSeconds: number
    private isClosedByClient: boolean

    constructor(url: string, getConnectionRequest?: () => Promise<string>) {
        console.log('Connecting to ' + url)

        this.url = url
        this.messageListeners = []
        this.singleMessageListeners = []
        this.onOpenListeners = []
        this.currentBackoffSeconds = SocketListener.getBaseReconnectionInterval()
        this.isClosedByClient = false
        if (getConnectionRequest) this.getConnectionRequest = getConnectionRequest

        this.createWebsocket()
    }

    async createWebsocket() {
        if (this.getConnectionRequest) {
            const connectionRequest = await this.getConnectionRequest()
            this.socket = platform.createWebsocket(`${this.url}/${connectionRequest}`)
        } else {
            this.socket = platform.createWebsocket(this.url)
        }

        this.socket.onOpen(() => {
            console.log('socket opened')
            clearTimeout(this.reconnectTimeout)
            this.currentBackoffSeconds = SocketListener.getBaseReconnectionInterval()
            this.handleOnOpen()
        })

        this.socket.onClose(() => {
            console.log('socket closed')

            if (!this.isClosedByClient) {
                this.reconnect()
            }
        })
        this.socket.onError((e: Event | Error) => {
            console.log('socket error: ' + e)
        })
        this.socket.onMessage(e => {
            this.handleMessage(e)
        })
    }

    registerLogin(sessionToken: string) {
        if (!this.socket) throw new Error('Socket not available')
        this.socket.send(sessionToken)
    }

    onOpen(callback: () => void): void {
        this.onOpenListeners.push(callback)
    }

    onClose(callback: () => void): void {
        if (!this.socket) throw new Error('Socket not available')
        this.socket.onClose(callback)
    }

    onError(callback: () => void): void {
        if (!this.socket) throw new Error('Socket not available')
        this.socket.onError(callback)
    }

    private handleOnOpen() {
        for (let callback of this.onOpenListeners) {
            callback()
        }
    }

    private handleMessage(messageData: Uint8Array): void {
        for (let callback of this.messageListeners) {
            callback(messageData)
        }

        for (let {resolve} of this.singleMessageListeners) {
            resolve(messageData)
        }
        this.singleMessageListeners.length = 0
    }

    onPushMessage(callback: (data: any) => void): void {
        this.messageListeners.push(callback)
    }

    async getPushMessage(): Promise<any> {
        console.log('Awaiting web socket message...')
        return new Promise<any>((resolve, reject) => {
            this.singleMessageListeners.push({resolve, reject})
        })
    }

    private static getBaseReconnectionInterval(): number {
        return Math.random() * 5
    }

    private reconnect() {
        console.log(`Reconnecting websocket in ${this.currentBackoffSeconds.toFixed(2)} seconds...`)

        // schedule next reconnect attempt
        this.reconnectTimeout = setTimeout(() => {
            this.socket?.close()
        }, this.currentBackoffSeconds * 1000)

        this.createWebsocket()

        this.currentBackoffSeconds = Math.min(this.currentBackoffSeconds * 2, 60) // Cap at 1 min, as suggested by docs
    }

    disconnect() {
        this.isClosedByClient = true
        this.socket?.close();
        this.socket = null
        this.messageListeners.length = 0

        this.currentBackoffSeconds = Math.random() * 5
        clearTimeout(this.reconnectTimeout)

        this.singleMessageListeners.length = 0
    }
}

export function socketSendMessage(message: any, socket: WebSocket, createdSocket:any){
    switch (socket.readyState) {
        case 0:// CONNECTING
            if (createdSocket.messageQueue.indexOf(message) === -1) createdSocket.messageQueue.push(message)
            break;
        case 1:// OPEN
            if (createdSocket.messageQueue.indexOf(message) === -1) createdSocket.messageQueue.push(message)

            if (createdSocket.messageQueue.length > 0) {
                for (let counter = 0; counter < createdSocket.messageQueue.length; counter++) {
                    socket.send(createdSocket.messageQueue[counter])
                }
            }

            createdSocket.messageQueue.length = 0
            break;
        case 2:// CLOSING
        case 3:// CLOSED
            createdSocket.messageQueue.length = 0
            console.error('Trying to send a message while in the CLOSING or CLOSED state')
            break;
    }
}

export type LoginPayload = {
    username: string,
    password?: string,
    loginToken?: Uint8Array
    loginType?: Authentication.LoginType
    loginMethod?: Authentication.LoginMethod,
    v2TwoFactorToken?: string
    resumeSessionOnly?: boolean
}

export enum UserType {
    normal = "normal",
    onsiteSso = "onsite_sso",
    cloudSso = "cloud_sso"
}

export class Auth {
    ssoLogoutUrl: string = ''
    userType: UserType = UserType.normal
    ssoSessionId: string = ''
    dataKey: Uint8Array;
    privateKey: Uint8Array;
    private _accountUid: Uint8Array;
    private _sessionToken: string = '';
    private _sessionTokenType: Authentication.SessionTokenType | null;
    private _username: string = '';
    private endpoint: KeeperEndpoint;
    private managedCompanyId?: number;
    private messageSessionUid: Uint8Array;
    options: ClientConfigurationInternal;
    private socket: SocketListener | undefined;
    public clientKey: Uint8Array;
    private accountSummary: IAccountSummaryElements;

    constructor(options: ClientConfiguration) {
        if (options.deviceConfig && options.deviceToken) {
            throw new Error('Both loginV2 and loginV3 token strategies supplied')
        }

        this.options = options as ClientConfigurationInternal

        if (!this.options.deviceConfig) {
            this.options.deviceConfig = {
                deviceName: null,
                deviceToken: null,
                privateKey: null,
                publicKey: null,
                transmissionKeyId: null,
            }
        }

        if (!this.options.sessionStorage) {
            this.options.sessionStorage = {
                lastUsername: null,
                getCloneCode: () => null,
                saveCloneCode: () => {
                }
            }
        }

        this.endpoint = new KeeperEndpoint(this.options);
        this.endpoint.clientVersion = this.options.clientVersion || "c14.0.0";
        this.messageSessionUid = generateUidBytes()
    }

    get _endpoint(): KeeperEndpoint {
        return this.endpoint;
    }

    get accountUid(): Uint8Array {
        return this._accountUid;
    }

    get clientVersion(): string {
        return this.endpoint.clientVersion;
    }

    get sessionToken(): string {
        return this._sessionToken;
    }

    get sessionTokenType(): Authentication.SessionTokenType | null {
        return this._sessionTokenType
    }

    get username(): string {
        return this._username;
    }

    getMessageSessionUid(): Uint8Array {
        return this.messageSessionUid;
    }

    async idpLogout() {
        if (this.userType == UserType.cloudSso) {
            const payload = await this.endpoint.prepareSsoPayload(this.messageSessionUid, this.username, this.ssoSessionId)

            const params = new URLSearchParams({
                'payload': payload,
            })

            const url = `${this.ssoLogoutUrl}?${String(params)}`
            this.options.authUI3.redirectCallback(url);

        } else if (this.userType == UserType.onsiteSso) {
            const params = new URLSearchParams({
                'embedded': 'true',
                'email': this.username,
                'session_id': this.ssoSessionId,
                'dest': 'vault'
            })

            const url = `${this.ssoLogoutUrl}?${String(params)}`
            this.options.authUI3.redirectCallback(url)
        }
    }

    async logout() {
        await this.executeRest(logoutV3Message())
        await this.idpLogout()
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
    async loginV3(
        {
            username = '',
            password = '',
            loginToken = null,
            loginType = Authentication.LoginType.NORMAL,
            loginMethod = Authentication.LoginMethod.EXISTING_ACCOUNT,
            v2TwoFactorToken = null,
            resumeSessionOnly = false,
        }: LoginPayload
    ) {
        this._username = username || this.options.sessionStorage.lastUsername

        let needUserName: boolean

        const handleError = (resultCode: string, loginResponse: Authentication.ILoginResponse, error: any) => {
            if (this.options.onCommandFailure) {
                this.options.onCommandFailure({
                    result_code: resultCode,
                    message: chooseErrorMessage(loginResponse.loginState)
                })
            } else {
                throw error;
            }
        };

        while (true) {

            if (!this.options.deviceConfig.deviceToken) {
                await this.endpoint.registerDevice()
            }

            if (!this.socket) {
                const url = `wss://push.services.${this.options.host}/wss_open_connection`
                const getConnectionRequest = () => this.endpoint.getPushConnectionRequest(this.messageSessionUid)

                this.socket = new SocketListener(url, getConnectionRequest)
                console.log("Socket connected")
            }

            const startLoginRequest: IStartLoginRequest = {
                clientVersion: this.endpoint.clientVersion,
                encryptedDeviceToken: this.options.deviceConfig.deviceToken ?? null,
                messageSessionUid: this.messageSessionUid,
                loginType: loginType,
                loginMethod: loginMethod,
                cloneCode: this.options.sessionStorage.getCloneCode(this.options.host as KeeperEnvironment, this._username),
                v2TwoFactorToken: v2TwoFactorToken
            }
            if (loginToken) {
                startLoginRequest.encryptedLoginToken = loginToken
            }
            if (needUserName || !this.options.useSessionResumption) {
                startLoginRequest.username = this._username
                needUserName = false
            }
            const loginResponse = await this.executeRest(startLoginMessage(startLoginRequest))
            if (loginResponse.cloneCode && loginResponse.cloneCode.length > 0) {
                this.options.sessionStorage.saveCloneCode(this.options.host as KeeperEnvironment, this._username, loginResponse.cloneCode)
            }
            if (resumeSessionOnly && loginResponse && (loginResponse.loginState != Authentication.LoginState.LOGGED_IN)) {
                return {
                    result: 'notLoggedin'
                }
            }
            console.log(loginResponse)
            console.log("login state =", loginResponse.loginState);

            switch (loginResponse.loginState) {
                case Authentication.LoginState.ACCOUNT_LOCKED:
                case Authentication.LoginState.INVALID_LOGINSTATE:
                case Authentication.LoginState.LOGGED_OUT:
                case Authentication.LoginState.AFTER_CLOUD_SSO_LOGIN:
                case Authentication.LoginState.LOGIN_TOKEN_EXPIRED:
                case Authentication.LoginState.DEVICE_ACCOUNT_LOCKED:
                case Authentication.LoginState.DEVICE_LOCKED:
                    handleError('generic_error', loginResponse, new Error(`Unable to login, login state = ${loginResponse.loginState}`))
                    return
                case Authentication.LoginState.REQUIRES_ACCOUNT_CREATION:
                    await this.createSsoUser(loginResponse.encryptedLoginToken)
                    break;
                case Authentication.LoginState.UPGRADE:
                    handleError('generic_error', loginResponse, new Error(`Unable to login, login state = ${loginResponse.loginState}`))
                    return;
                case Authentication.LoginState.REQUIRES_USERNAME:
                    if (!this._username) {
                        handleError('generic_error', loginResponse, new Error(`No username supplied, login state = ${loginResponse.loginState}`));
                        return
                    }
                    needUserName = true
                    break;
                case Authentication.LoginState.DEVICE_APPROVAL_REQUIRED:
                case Authentication.LoginState.REQUIRES_DEVICE_ENCRYPTED_DATA_KEY:
                    if (!loginResponse.encryptedLoginToken) {
                        throw new Error('Login token missing from API response')
                    }
                    try {
                        loginToken = await this.verifyDevice(username, loginResponse.encryptedLoginToken, loginResponse.loginState == Authentication.LoginState.REQUIRES_DEVICE_ENCRYPTED_DATA_KEY)
                    } catch (e) {
                        handleError('auth_failed', loginResponse, e)
                        return
                    }
                    break;
                case Authentication.LoginState.LICENSE_EXPIRED:
                    throw new Error('License expired')
                case Authentication.LoginState.REGION_REDIRECT:
                    // TODO: put region_redirect in its own loop since
                    // its unique to the other states.
                    this.options.host = loginResponse.stateSpecificValue
                    loginToken = undefined
                    if (this.options.onRegionChanged) {
                        this.options.onRegionChanged(loginResponse.stateSpecificValue)
                    }
                    // Current socket no longer pointing to the right region
                    this.socket.disconnect()
                    this.socket = null
                    break;
                case Authentication.LoginState.REDIRECT_CLOUD_SSO:
                    console.log("Cloud SSO Connect login");
                    if (!loginResponse.url) {
                        throw new Error('URL missing from API response')
                    }
                    this.ssoLogoutUrl = loginResponse.url.replace('login', 'logout')
                    this.userType = UserType.cloudSso
                    let payload = await this._endpoint.prepareSsoPayload(this.messageSessionUid)
                    let cloudSsoLoginUrl = loginResponse.url + "?payload=" + payload;
                    if (this.options.authUI3.redirectCallback) {
                        this.options.authUI3.redirectCallback(cloudSsoLoginUrl)
                        return
                    } else {
                        const token = await platform.ssoLogin(cloudSsoLoginUrl)
                        const cloudResp = await this.endpoint.decryptCloudSsoResponse(token)
                        console.log(cloudResp)
                        this._username = cloudResp.email
                        loginToken = cloudResp.encryptedLoginToken
                        break;
                    }
                case Authentication.LoginState.REDIRECT_ONSITE_SSO:
                    console.log("SSO Connect login");
                    if (!loginResponse.url) {
                        throw new Error('URL missing from API response')
                    }
                    this.ssoLogoutUrl = loginResponse.url.replace('login', 'logout')
                    this.userType = UserType.onsiteSso
                    let onsiteSsoLoginUrl = loginResponse.url + '?embedded'
                    if (this.options.authUI3.redirectCallback) {
                        this.options.authUI3.redirectCallback(onsiteSsoLoginUrl)
                        return
                    } else {
                        const onsiteResp = await platform.ssoLogin(onsiteSsoLoginUrl)
                        console.log(onsiteResp)
                        this._username = onsiteResp.email
                        password = onsiteResp.password
                        loginType = LoginType.SSO
                        loginMethod = LoginMethod.AFTER_SSO
                        break;
                    }
                case Authentication.LoginState.REQUIRES_2FA:
                    loginToken = await this.handleTwoFactor(loginResponse)
                    break

                case Authentication.LoginState.REQUIRES_AUTH_HASH:
                    // TODO: loop in authHashLogin until successful or get into
                    // some other state other than Authentication.LoginState.REQUIRES_AUTH_HASH
                    if (!password && this.options.authUI3?.getPassword) {
                        password = await this.options.authUI3.getPassword()
                    }
                    if (!password) {
                        throw new Error('User password required and not provided')
                    }

                    try {
                        await this.authHashLogin(loginResponse, username, password, loginType === Authentication.LoginType.ALTERNATE)
                        return;
                    } catch (e) {
                        password = ''
                        handleError('auth_failed', loginResponse, e)
                        break;
                    }
                case Authentication.LoginState.LOGGED_IN:
                    try {
                        await this.loginSuccess(loginResponse, null)
                        console.log("Exiting on loginState = LOGGED_IN");
                        return;
                    } catch (e) {
                        console.log('Error in Authentication.LoginState.LOGGED_IN: ', e)
                        break;
                    }
            }
        }
    }

    async getSsoProvider(ssoDomain: string, locale?: string) {
        let domainRequest: ISsoServiceProviderRequest = {
            name: ssoDomain.trim(),
            locale: locale,
            clientVersion: this.endpoint.clientVersion,
        }
        const domainResponse = await this.executeRest(ssoServiceProviderRequestMessage(domainRequest))
        const params = domainResponse.isCloud
            ? '?payload=' + await this._endpoint.prepareSsoPayload(this.messageSessionUid)
            : '?embedded'

        this.userType = domainResponse.isCloud ? UserType.cloudSso : UserType.onsiteSso
        this.ssoLogoutUrl = domainResponse.spUrl.replace('login', 'logout')

        return {
            url: domainResponse.spUrl + params,
            name: domainResponse.name,
        }
    }

    verifyDevice(username: string, loginToken: Uint8Array, isCloud: boolean = false): Promise<Uint8Array> {
        return new Promise<Uint8Array>((resolve, reject) => {
            if (!this.options.authUI3) {
                reject(new Error('No authUI3 provided. authUI3 required to verify devices'))
                return
            }

            let emailSent = false
            let tfaExpiration = TwoFactorExpiration.TWO_FA_EXP_IMMEDIATELY
            const deviceConfig = this.options.deviceConfig
            let channels: DeviceApprovalChannel[]
            if (!isCloud) {
                channels = [
                    {
                        channel: DeviceVerificationMethods.Email,
                        sendApprovalRequest: async () => {
                            await this.executeRest(requestDeviceVerificationMessage({
                                username: username,
                                verificationChannel: emailSent ? 'email_resend' : 'email',
                                encryptedDeviceToken: deviceConfig.deviceToken,
                                clientVersion: this.endpoint.clientVersion,
                                messageSessionUid: this.messageSessionUid
                            }))
                            emailSent = true
                        },
                        validateCode: async (code) => {
                            await this.executeRest(validateDeviceVerificationCodeMessage({
                                verificationCode: code,
                                username: username,
                            }))
                            resumeWithToken(loginToken)
                        }
                    },
                    {
                        channel: DeviceVerificationMethods.KeeperPush,
                        sendApprovalRequest: async () => {
                            await this.executeRest(twoFactorSend2FAPushMessage({
                                encryptedLoginToken: loginToken,
                                pushType: TwoFactorPushType.TWO_FA_PUSH_KEEPER
                            }))
                        }
                    },
                    {
                        channel: DeviceVerificationMethods.TFA,
                        sendApprovalRequest: async () => {
                            await this.executeRest(twoFactorSend2FAPushMessage({
                                encryptedLoginToken: loginToken,
                            }))
                        },
                        validateCode: async (code) => {
                            const twoFactorValidateMsg = twoFactorValidateMessage({
                                encryptedLoginToken: loginToken,
                                value: code,
                                expireIn: tfaExpiration
                            })
                            const twoFactorValidateResp = await this.executeRest(twoFactorValidateMsg)
                            if (twoFactorValidateResp.encryptedLoginToken) {
                                const wssRs: Record<string, any> = {
                                    event: 'received_totp',
                                    encryptedLoginToken: platform.bytesToBase64(twoFactorValidateResp.encryptedLoginToken)
                                }
                                processPushNotification(wssRs)
                            }
                        },
                        setExpiration: expiration => {
                            tfaExpiration = expiration
                        }
                    }
                ];
            } else {
                channels = [
                    {
                        channel: DeviceVerificationMethods.KeeperPush,
                        sendApprovalRequest: async () => {
                            await this.executeRest(twoFactorSend2FAPushMessage({
                                encryptedLoginToken: loginToken,
                                pushType: TwoFactorPushType.TWO_FA_PUSH_KEEPER
                            }))
                        }
                    },
                    {
                        channel: DeviceVerificationMethods.AdminApproval,
                        sendApprovalRequest: async () => {
                            await this.executeRest(requestDeviceAdminApprovalMessage({
                                username: username,
                                verificationChannel: emailSent ? 'email_resend' : 'email',
                                encryptedDeviceToken: deviceConfig.deviceToken,
                                clientVersion: this.endpoint.clientVersion,
                                messageSessionUid: this.messageSessionUid
                            }))
                        }
                    }
                ]
            }

            let done = false
            const resumeWithToken = (token: Uint8Array) => {
                done = true
                resolve(token)
            }
            const rejectWithError = (error: Error) => {
                done = true
                reject(error)
            }

            const processPushNotification = (wssRs: Record<string, any>) => {
                if (wssRs.event === 'received_totp') {
                    const token = wssRs.encryptedLoginToken ? normal64Bytes(wssRs.encryptedLoginToken) : loginToken
                    resumeWithToken(token)
                } else if (wssRs.message === 'device_approved') {
                    if (wssRs.approved) {
                        resumeWithToken(loginToken)
                    } else {
                        rejectWithError(new Error('Rejected'))
                    }
                } else if (wssRs.command === 'device_verified') {
                    if (this.options.onDeviceVerified) {
                        this.options.onDeviceVerified(true)
                    }
                    resumeWithToken(loginToken)
                }
            }

            // response from the client true - try again, false - cancel
            this.options.authUI3.waitForDeviceApproval(channels, isCloud)
                .then((ok) => {
                    if (ok) {
                        resumeWithToken(loginToken)
                    } else {
                        rejectWithError(new Error('Canceled'))
                    }
                })
                .catch(reason => rejectWithError(reason))

            // receive push notification
            ;(async () => {
                while (!done) {
                    const pushMessage = await this.socket.getPushMessage()
                    const wssClientResponse = await this.endpoint.decryptPushMessage(pushMessage)
                    if (!done) {
                        const wssRs = JSON.parse(wssClientResponse.message)
                        console.log(wssRs)
                        processPushNotification(wssRs)
                    }
                }
            })();
        })
    }

    private handleTwoFactor(loginResponse: Authentication.ILoginResponse): Promise<Uint8Array> {
        return new Promise<Uint8Array>((resolve, reject) => {
            if (!loginResponse.channels) {
                reject(new Error('Channels not provided by API'))
                return
            }

            const loginToken = loginResponse.encryptedLoginToken

            let done = false
            let twoFactorWaitCancel = resolvablePromise();
            const resumeWithToken = (token: Uint8Array) => {
                done = true
                twoFactorWaitCancel.resolve()
                resolve(token)
            }
            const rejectWithError = (error: Error) => {
                done = true
                twoFactorWaitCancel.resolve()
                reject(error)
            }

            let tfaExpiration = TwoFactorExpiration.TWO_FA_EXP_IMMEDIATELY
            const submitCode = async (channel: Authentication.TwoFactorChannelType, code: string) => {
                const channelInfo = loginResponse.channels.find(x => x.channelType === channel)
                const twoFactorValidateMsg = twoFactorValidateMessage({
                    channelUid: channelInfo ? channelInfo.channelUid : undefined,
                    encryptedLoginToken: loginToken,
                    value: code,
                    expireIn: tfaExpiration
                })
                const twoFactorValidateResp = await this.executeRest(twoFactorValidateMsg)
                if (twoFactorValidateResp.encryptedLoginToken) {
                    resumeWithToken(twoFactorValidateResp.encryptedLoginToken)
                }
            }

            let lastPushChannel = TwoFactorChannelType.TWO_FA_CT_NONE
            const submitPush = async (channel: TwoFactorChannelType, pushType: TwoFactorPushType) => {
                const sendPushRequest: ITwoFactorSendPushRequest = {
                    encryptedLoginToken: loginResponse.encryptedLoginToken,
                    pushType: pushType,
                    expireIn: tfaExpiration
                }
                await this.executeRest(twoFactorSend2FAPushMessage(sendPushRequest))
                lastPushChannel = channel
            }

            const channels: TwoFactorChannelData[] = loginResponse.channels
                .map((ch) => {
                    const tfachannelData: TwoFactorChannelData = {
                        channel: ch,
                        setExpiration: (exp) => {
                            tfaExpiration = exp
                        },
                        sendCode: async (code) => {
                            await submitCode(ch.channelType, code)
                        }
                    }
                    switch (ch.channelType) {
                        case TwoFactorChannelType.TWO_FA_CT_U2F:
                        case TwoFactorChannelType.TWO_FA_CT_WEBAUTHN:
                            // add support for security key as push
                            break;
                        case TwoFactorChannelType.TWO_FA_CT_TOTP:
                        case TwoFactorChannelType.TWO_FA_CT_RSA:
                            break
                        case TwoFactorChannelType.TWO_FA_CT_SMS:
                            tfachannelData.availablePushes = [TwoFactorPushType.TWO_FA_PUSH_SMS]
                            break
                        case TwoFactorChannelType.TWO_FA_CT_DNA:
                            tfachannelData.availablePushes = [TwoFactorPushType.TWO_FA_PUSH_DNA]
                            break
                        case TwoFactorChannelType.TWO_FA_CT_KEEPER:
                        case TwoFactorChannelType.TWO_FA_CT_DUO:
                            if (ch.capabilities) {
                                tfachannelData.availablePushes = ch.capabilities
                                    .map(cap => {
                                        switch (cap) {
                                            case 'push':
                                                return TwoFactorPushType.TWO_FA_PUSH_DUO_PUSH
                                            case 'sms':
                                                return TwoFactorPushType.TWO_FA_PUSH_DUO_TEXT
                                            case 'phone':
                                                return TwoFactorPushType.TWO_FA_PUSH_DUO_CALL
                                            default:
                                                return undefined
                                        }
                                    }).filter(cap => !!cap).map(cap => cap!)
                            }
                            break
                    }
                    if (tfachannelData.availablePushes) {
                        tfachannelData.sendPush = async (pushType: TwoFactorPushType) => {
                            submitPush(ch.channelType, pushType)
                        }
                    }
                    return tfachannelData
                }).filter((chd: TwoFactorChannelData | undefined) => !!chd).map(chd => chd!)

            const processPushNotification = (wssRs: Record<string, any>) => {
                if (wssRs.event === 'received_totp') {
                    if (wssRs.encryptedLoginToken) {
                        const token = normal64Bytes(wssRs.encryptedLoginToken)
                        resumeWithToken(token)
                    } else if (wssRs.passcode) {
                        (async () => {
                            await submitCode(lastPushChannel, wssRs.passcode)
                        })()
                    } else {
                        rejectWithError(new Error('push_declined'))
                    }
                }
            }

            this.options.authUI3.waitForTwoFactorCode(channels, twoFactorWaitCancel.promise)
                .then(ok => {
                    if (ok) {
                        resumeWithToken(loginToken)
                    } else {
                        rejectWithError(new Error('Canceled'))
                    }
                })
                .catch(reason => rejectWithError(reason))

            // receive push notification
            ;(async () => {
                while (!done) {
                    const pushMessage = await this.socket.getPushMessage()
                    const wssClientResponse = await this.endpoint.decryptPushMessage(pushMessage)
                    if (!done) {
                        const wssRs = JSON.parse(wssClientResponse.message)
                        console.log(wssRs)
                        processPushNotification(wssRs)
                    }
                }
            })();
        })
    }

    async authHashLogin(loginResponse: Authentication.ILoginResponse, username: string, password: string, useAlternate: boolean = false) {
        // TODO test for account transfer and account recovery
        if (!loginResponse.salt) {
            throw new Error('Salt missing from API response')
        }

        const salt = useAlternate ? loginResponse.salt.find(s => s.name === 'alternate') : loginResponse.salt[0]
        if (!salt.salt || !salt.iterations) {
            throw new Error('Salt missing from API response')
        }

        this.options.salt = salt.salt
        this.options.iterations = salt.iterations

        const authHashKey = await platform.deriveKey(password, salt.salt, salt.iterations);
        let authHash = await platform.calcAuthVerifier(authHashKey);

        const loginMsg = validateAuthHashMessage({
            authResponse: authHash,
            encryptedLoginToken: loginResponse.encryptedLoginToken
        })
        const loginResp = await this.executeRest(loginMsg)
        console.log(loginResp)
        if (loginResp.cloneCode && loginResp.cloneCode.length > 0) {
            this.options.sessionStorage.saveCloneCode(this.options.host as KeeperEnvironment, this._username, loginResp.cloneCode)
        }
        await this.loginSuccess(loginResp, password, salt)
    }

    async loginSuccess(loginResponse: Authentication.ILoginResponse, password: string, salt: Authentication.ISalt | undefined = undefined) {
        this._username = loginResponse.primaryUsername || this._username
        if (!loginResponse.encryptedSessionToken || !loginResponse.encryptedDataKey || !loginResponse.accountUid) {
            return
        }
        this.setLoginParameters(webSafe64FromBytes(loginResponse.encryptedSessionToken), loginResponse.sessionTokenType, loginResponse.accountUid)
        switch (loginResponse.encryptedDataKeyType) {
            case Authentication.EncryptedDataKeyType.BY_DEVICE_PUBLIC_KEY:
                this.dataKey = await platform.privateDecryptEC(loginResponse.encryptedDataKey, this.options.deviceConfig.privateKey, this.options.deviceConfig.publicKey)
                break;
            case Authentication.EncryptedDataKeyType.BY_PASSWORD:
                this.dataKey = await decryptEncryptionParams(password, loginResponse.encryptedDataKey);
                break;
            case Authentication.EncryptedDataKeyType.BY_ALTERNATE:
                if (salt) {
                    const encKey = await platform.deriveKeyV2('data_key', password, salt.salt, salt.iterations)
                    this.dataKey = await platform.aesGcmDecrypt(loginResponse.encryptedDataKey, encKey)
                }
                break;
            case Authentication.EncryptedDataKeyType.NO_KEY:
            case Authentication.EncryptedDataKeyType.BY_BIO:
                throw new Error(`Data Key type ${loginResponse.encryptedDataKeyType} decryption not implemented`)
        }
        let encryptedPrivateKey: Uint8Array
        if (this.options.kvs) {
            const encryptedPrivateKeyString = this.options.kvs.getValue(`${this._username}/private_key`)
            if (encryptedPrivateKeyString) {
                encryptedPrivateKey = platform.base64ToBytes(encryptedPrivateKeyString)
            }
        }
        if (!encryptedPrivateKey) {
            await this.loadAccountSummary()
            encryptedPrivateKey = this.accountSummary.keysInfo.encryptedPrivateKey
            if (this.options.kvs) {
                this.options.kvs.saveValue(`${this._username}/private_key`, platform.bytesToBase64(encryptedPrivateKey))
            }
        }
        this.privateKey = platform.aesCbcDecrypt(encryptedPrivateKey, this.dataKey, true)
    }

    async loadAccountSummary() {
        this.accountSummary = await this.executeRest(accountSummaryMessage({
            summaryVersion: 1
        }));
    }

    async login(username: string, password: string) {
        try {
            let preLoginResponse = await this.endpoint.getPreLogin(username);
            if (!preLoginResponse.salt) {
                throw new Error('Salt missing from API response')
            }

            let salt = preLoginResponse.salt[0];
            if (!salt.salt || !salt.iterations) {
                throw new Error('Salt missing from API response')
            }

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
            let socketListener: SocketListener | null = null;
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
        if (!command.username) {
            command.username = this._username;
        }
        if (command instanceof AuthorizedCommand) {
            command.device_id = "JS Keeper API";
            command.session_token = this._sessionToken;
        }
        return this.endpoint.executeV2Command(command);
    }

    async executeRest<TIn, TOut>(message: RestMessage<TIn, TOut>): Promise<TOut> {
        return this.endpoint.executeRest(message, this._sessionToken);
    }

    async get(path: string) {
        return this.endpoint.get(path)
    }

    setLoginParameters(sessionToken: string, sessionTokenType: Authentication.SessionTokenType, accountUid: Uint8Array) {
        this._sessionToken = sessionToken;
        this._sessionTokenType = sessionTokenType
        this._accountUid = accountUid;
        if (!this.socket) {
            throw new Error('No socket available')
        }
        this.socket.registerLogin(this._sessionToken)
        this.socket.onOpen(() => {
            this.socket.registerLogin(this._sessionToken)
        })
    }

    async registerDevice() {
        await this.endpoint.registerDevice()
    }

    onClose(callback: () => void): void {
        if (!this.socket) {
            throw new Error('No socket available')
        }
        this.socket.onClose(callback)
    }

    onError(callback: () => void): void {
        if (!this.socket) {
            throw new Error('No socket available')
        }
        this.socket.onError(callback)
    }

    onPushMessage(callback: (data: any) => void): void {
        if (!this.socket) {
            throw new Error('No socket available')
        }
        this.socket.onPushMessage(callback)
    }

    async getPushMessage(): Promise<any> {
        if (!this.socket) {
            throw new Error('No socket available')
        }
        const pushMessage = await this.socket.getPushMessage()
        const wssClientResponse = await this.endpoint.decryptPushMessage(pushMessage)
        console.log(wssClientResponse.message)
        return JSON.parse(wssClientResponse.message)
    }

    private async createUserRequest(dataKey: Uint8Array): Promise<Authentication.ICreateUserRequest> {
        const rsaKeys = await platform.generateRSAKeyPair()
        const rsaEncryptedPrivateKey = await platform.aesCbcEncrypt(rsaKeys.privateKey, dataKey, true)

        const ecKeys = await platform.generateECKeyPair()
        const eccEncryptedPrivateKey = await platform.aesGcmEncrypt(ecKeys.privateKey, dataKey)

        const encryptedClientKey = await platform.aesCbcEncrypt(generateEncryptionKey(), dataKey, true)

        return {
            rsaPublicKey: rsaKeys.publicKey,
            rsaEncryptedPrivateKey: rsaEncryptedPrivateKey,
            eccPublicKey: ecKeys.publicKey,
            eccEncryptedPrivateKey: eccEncryptedPrivateKey,
            encryptedDeviceToken: this.options.deviceConfig.deviceToken,
            encryptedClientKey: encryptedClientKey,
            clientVersion: this.options.clientVersion,
        }
    }

    public async createUser(username: string, password: string) {
        const iterations = 100000
        const dataKey = generateEncryptionKey()
        const authVerifier = await createAuthVerifier(password, iterations)
        const encryptionParams = await createEncryptionParams(password, dataKey, iterations)
        const request = await this.createUserRequest(dataKey)
        const regUserMsg = requestCreateUserMessage({
            ...request,
            username: username,
            authVerifier: authVerifier,
            encryptionParams: encryptionParams,
        }, false)
        await this.executeRest(regUserMsg)
    }

    private async createSsoUser(loginToken: Uint8Array) {
        const dataKey = generateEncryptionKey()
        const encryptedDeviceDataKey = await platform.publicEncryptEC(dataKey, this.options.deviceConfig.publicKey)
        const request = await this.createUserRequest(dataKey)
        const regUserMsg = requestCreateUserMessage({
            ...request,
            username: this._username,
            encryptedLoginToken: loginToken,
            encryptedDeviceDataKey: encryptedDeviceDataKey
        }, true)
        await this.executeRest(regUserMsg)
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

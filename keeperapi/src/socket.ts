import { platform } from "./platform"

export type CloseReason = {
    code: number,
    reason: CloseReasonMessage
}

enum CloseReasonCode {
    CANNOT_ACCEPT = 1003,
    NOT_CONSISTENT = 1007,
    VIOLATED_POLICY = 1008,
    TRY_AGAIN_LATER = 1013,
}

type CloseReasonMessage = {
    close_reason:string
    key_id?:number
}

type SocketMessage = {
    event: 'received_totp'
    type: 'dna'
    passcode: string
}

export type SocketProxy = {
    onOpen: (callback: () => void) => void
    close: () => void
    onClose: (callback: (e:Event) => void) => void
    onError: (callback: (e: Event | Error) => void) => void
    onMessage: (callback: (e: Uint8Array) => void) => void
    send: (message: any) => void
    messageQueue: any[] // Since messages are type any here, make this an any array
}

export class SocketListener {
    private socket?: SocketProxy;
    private url: string
    private getConnectionRequest?: (Uint8Array) => Promise<string>
    // Listeners that receive all messages
    private messageListeners: Array<(data: any) => void>
    // Listeners that receive a single message
    private singleMessageListeners: Array<{
        resolve: (data: any) => void,
        reject: (errorMessage: string) => void
    }>
    // Listeners that receive all messages
    private closeListeners: Array<(data: any) => void>
    // Listeners that receive a single message
    private singleCloseListeners: Array<{
        resolve: (data: any) => void,
        reject: (errorMessage: string) => void
    }>
    // Listeners that signal a re-connected socket
    private onOpenListeners: Array<() => void>
    // The messageSessionUid
    private messageSessionUid?: Uint8Array

    private isConnected: boolean
    private reconnectTimeout?: ReturnType<typeof setTimeout>
    private currentBackoffSeconds: number
    private isClosedByClient: boolean

    constructor(url: string, messageSessionUid?: Uint8Array, getConnectionRequest?: (messageSessionUid:Uint8Array) => Promise<string>) {
        console.log('Connecting to ' + url)

        this.url = url
        this.closeListeners = []
        this.singleCloseListeners = []
        this.messageListeners = []
        this.singleMessageListeners = []
        this.onOpenListeners = []
        this.currentBackoffSeconds = SocketListener.getBaseReconnectionInterval()
        this.isClosedByClient = false
        this.isConnected = false
        if (getConnectionRequest) this.getConnectionRequest = getConnectionRequest

        if (messageSessionUid){
            this.messageSessionUid = messageSessionUid
            this.createWebsocket(this.messageSessionUid)
        } else {
            this.createWebsocket()
        }
    }

    async createWebsocket(messageSessionUid?:Uint8Array) {
        if (this.getConnectionRequest && messageSessionUid) {
            const connectionRequest = await this.getConnectionRequest(messageSessionUid)
            this.socket = platform.createWebsocket(`${this.url}/${connectionRequest}`)
        } else {
            this.socket = platform.createWebsocket(this.url)
        }

        this.socket!.onOpen(() => {
            console.log('socket opened')
            if (this.reconnectTimeout) {
                clearTimeout(this.reconnectTimeout)
            }
            this.currentBackoffSeconds = SocketListener.getBaseReconnectionInterval()
            this.handleOnOpen()
        })

        this.socket!.onClose(async (event: Event) => {
            if (this.isClosedByClient) {
                return
            }

            let reason
            this.isConnected = false

            try {
                reason = JSON.parse(event['reason'])
            } catch {
                console.log('Connection closed - no close reason.')
                this.reconnect()
                return
            }

            switch (event['code']){
                case CloseReasonCode.CANNOT_ACCEPT:
                    // Exact messages that can come from CANNOT_ACCEPT:
                    // - Push server is in progress of shutting down
                    // - Push server is not registered with KA
                    // - Cannot process encrypted message.xxxx

                    if(reason && reason.close_reason.includes('Push server')){
                        // Tell User to try again
                        this.handleClose({code:event['code'], reason})
                    } else {
                        // this would be an internal error and shouldnt reach here in production
                        console.error('Incorrect internal error: ', reason.close_reason)
                    }
                    break
                case CloseReasonCode.NOT_CONSISTENT:
                    // Error Message: device timestamp: {time} is off by {off_time}
                    //Tell User to adjust their system clock
                    this.handleClose({ code: event['code'], reason })
                    break
                case CloseReasonCode.VIOLATED_POLICY:
                    // Error Message: duplicate messageSessionUid=${messageSessionUid}
                    // Relogin if this happens
                    this.handleClose({ code: event['code'], reason })
                    break
                case CloseReasonCode.TRY_AGAIN_LATER:
                    // Error Message: throttled messageSessionUid=${messageSessionUid}
                    //Tell User to try again in 1 minute
                    this.handleClose({ code: event['code'], reason })
                    break
                default:
                    if (!this.isClosedByClient) {
                        this.reconnect()
                    }
            }
        })
        this.socket!.onError((e: Event | Error) => {
            console.log('socket error: ' + e)
        })
        this.socket!.onMessage(e => {
            this.handleMessage(e)
        })

        this.isConnected = true
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

    private handleClose(messageData: {code: number, reason:CloseReasonMessage}): void {
        for (let callback of this.closeListeners) {
            callback(messageData)
        }

        for (let { resolve } of this.singleCloseListeners) {
            resolve(messageData)
        }
        this.singleCloseListeners.length = 0
    }

    onPushMessage(callback: (data: any) => void): void {
        this.messageListeners.push(callback)
    }

    onCloseMessage(callback: (data: any) => void): void {
        this.closeListeners.push(callback)
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
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout)
        }
        this.reconnectTimeout = setTimeout(() => {
            this.createWebsocket(this.messageSessionUid)
        }, this.currentBackoffSeconds * 1000)

        this.currentBackoffSeconds = Math.min(this.currentBackoffSeconds * 2, 60) // Cap at 1 min, as suggested by docs
    }

    disconnect() {
        this.isConnected = false
        this.isClosedByClient = true
        this.socket?.close()
        this.socket = undefined
        this.messageListeners.length = 0

        this.currentBackoffSeconds = Math.random() * 5
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout)
        }
        this.singleMessageListeners.length = 0
    }

    getIsConnected(){
        return this.isConnected
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

import {Writer} from 'protobufjs'
import {Authentication, Enterprise} from './proto'

type RestEncoder<T> = (message: T, writer?: Writer) => Writer;
type RestDecoder<T> = (reader: Uint8Array, length?: number) => T;

export class RestMessage<TIn, TOut> {
    data: TIn
    path: string
    private readonly encoder: RestEncoder<TIn>
    private readonly decoder: RestDecoder<TOut>

    constructor(data: TIn, path: string, encoderClass: any, decoderClass: any) {
        this.data = data
        this.path = path
        this.encoder = encoderClass.encode.bind(encoderClass)
        this.decoder = decoderClass.decode.bind(decoderClass)
    }

    toBytes(): Uint8Array {
        return this.encoder(this.data).finish()
    }

    fromBytes(data: Uint8Array): TOut {
        return this.decoder(data)
    }
}

export class DeviceMessage extends RestMessage<Authentication.IDeviceRequest, Authentication.IDeviceResponse> {
    constructor(data: Authentication.IDeviceRequest) {
        super(data, 'authentication/get_device_token', Authentication.DeviceRequest, Authentication.DeviceResponse)
    }
}

export class PreLoginMessage extends RestMessage<Authentication.IPreLoginRequest, Authentication.IPreLoginResponse> {
    constructor(data: Authentication.IPreLoginRequest) {
        super(data, 'authentication/pre_login', Authentication.PreLoginRequest, Authentication.PreLoginResponse)
    }
}

export class SecurityReportMessage extends RestMessage<Authentication.ISecurityReportRequest, Authentication.ISecurityReportResponse> {
    constructor(data: Authentication.ISecurityReportRequest) {
        super(data, 'enterprise/get_security_report_data', Authentication.SecurityReportRequest, Authentication.SecurityReportResponse)
    }
}

export class EnterpriseNodeToManagedCompanyMessage extends RestMessage<Enterprise.INodeToManagedCompanyRequest, {}> {
    constructor(data: Enterprise.INodeToManagedCompanyRequest) {
        super(data, 'enterprise/node_to_managed_company',
            Enterprise.NodeToManagedCompanyRequest,
            null)
    }
}

import {Writer} from 'protobufjs'
import {Authentication, Enterprise} from './proto'

type RestEncoder<T> = (message: T, writer?: Writer) => Writer;
type RestDecoder<T> = (reader: Uint8Array, length?: number) => T;

export class RestMessage<TIn, TOut> {
    data: TIn
    path: string
    private readonly encoder: RestEncoder<TIn>
    private readonly decoder: RestDecoder<TOut>

    constructor(data: TIn, path: string, encoder: RestEncoder<TIn>, decoder: RestDecoder<TOut>) {
        this.data = data
        this.path = path
        this.encoder = encoder
        this.decoder = decoder
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
        super(data, 'authentication/get_device_token', Authentication.DeviceRequest.encode, Authentication.DeviceResponse.decode)
    }
}

export class PreLoginMessage extends RestMessage<Authentication.IPreLoginRequest, Authentication.IPreLoginResponse> {
    constructor(data: Authentication.IPreLoginRequest) {
        super(data, 'authentication/pre_login', Authentication.PreLoginRequest.encode, Authentication.PreLoginResponse.decode)
    }
}

export class SecurityReportMessage extends RestMessage<Authentication.ISecurityReportRequest, Authentication.ISecurityReportResponse> {
    constructor(data: Authentication.ISecurityReportRequest) {
        super(data, 'enterprise/get_security_report_data', Authentication.SecurityReportRequest.encode, Authentication.SecurityReportResponse.decode)
    }
}

export class EnterpriseNodeToManagedCompanyMessage extends RestMessage<Enterprise.INodeToManagedCompanyRequest, {}> {
    constructor(data: Enterprise.INodeToManagedCompanyRequest) {
        super(data, 'enterprise/node_to_managed_company', Enterprise.NodeToManagedCompanyRequest.encode, null)
    }
}

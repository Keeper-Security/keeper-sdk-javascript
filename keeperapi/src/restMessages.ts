// noinspection JSUnusedGlobalSymbols

import {Writer} from 'protobufjs'
import {
    AccountSummary,
    Authentication,
    BreachWatch,
    Automator,
    Enterprise,
    Records,
    ServiceLogger,
    SsoCloud,
    Vault
} from './proto'

// generated protobuf has all properties optional and nullable, while this is not an issue for KeeperApp, this type fixes it
export type NN<T> = Required<{ [prop in keyof T]: NonNullable<T[prop]> }>

export type RestInMessage<TIn> = {
    path: string
    toBytes(): Uint8Array
}

export type RestOutMessage<TOut> = {
    path: string
    fromBytes(data: Uint8Array): TOut
}

export type RestMessage<TIn, TOut> = RestInMessage<TIn> & RestOutMessage<TOut>

export type RestActionMessage = {
    path: string
}

type encoderClass<T> = {
    encode: (message: T, writer?: Writer) => Writer
}

type decoderClass<T> = {
    decode: (reader: Uint8Array, length?: number) => T
}

const createInMessage = <TIn>(data: TIn, path: string, encoder: encoderClass<TIn>): RestInMessage<TIn> => ({
    path: path,
    toBytes(): Uint8Array {
        return encoder.encode(data).finish()
    }
})

const createOutMessage = <TOut>(path: string, decoder: decoderClass<TOut>): RestOutMessage<TOut> => ({
    path: path,
    fromBytes(data: Uint8Array): TOut {
        return decoder.decode(data)
    }
})

const createMessage = <TIn, TOut>(data: TIn, path: string, encoder: encoderClass<TIn>, decoder: decoderClass<TOut>): RestMessage<TIn, NN<TOut>> => ({
    path: path,
    toBytes(): Uint8Array {
        return encoder.encode(data).finish()
    },
    fromBytes(data: Uint8Array): NN<TOut> {
        return <NN<TOut>>decoder.decode(data)
    }
})

const createActionMessage = (path: string): RestActionMessage => ({
    path: path
})

// new login

export const registerDeviceMessage = (data: Authentication.IDeviceRegistrationRequest): RestMessage<Authentication.IDeviceRegistrationRequest, Authentication.IDevice> =>
    createMessage(data, 'authentication/register_device', Authentication.DeviceRegistrationRequest, Authentication.Device)

export const registerDeviceInRegionMessage = (data: Authentication.IRegisterDeviceInRegionRequest): RestInMessage<Authentication.IRegisterDeviceInRegionRequest> =>
    createInMessage(data, 'authentication/register_device_in_region', Authentication.RegisterDeviceInRegionRequest)

export const updateDeviceMessage = (data: Authentication.IDeviceUpdateRequest): RestInMessage<Authentication.IDeviceUpdateRequest> =>
    createInMessage(data, 'authentication/update_device', Authentication.DeviceUpdateRequest)

export const requestDeviceVerificationMessage = (data: Authentication.IDeviceVerificationRequest): RestInMessage<Authentication.IDeviceVerificationRequest> =>
    createInMessage(data, 'authentication/request_device_verification', Authentication.DeviceVerificationRequest)

export const requestCreateUserMessage = (data: Authentication.ICreateUserRequest, isSso: boolean): RestInMessage<Authentication.ICreateUserRequest> =>
    createInMessage(data, isSso ? 'authentication/create_user_sso' : 'authentication/request_create_user', Authentication.CreateUserRequest)

export const startLoginMessage = (data: Authentication.IStartLoginRequest): RestMessage<Authentication.IStartLoginRequest, NN<Authentication.ILoginResponse>> =>
    createMessage(data, 'authentication/start_login', Authentication.StartLoginRequest, Authentication.LoginResponse)

export const validateAuthHashMessage = (data: Authentication.IValidateAuthHashRequest): RestMessage<Authentication.IValidateAuthHashRequest, NN<Authentication.ILoginResponse>> =>
    createMessage(data, 'authentication/validate_auth_hash', Authentication.ValidateAuthHashRequest, Authentication.LoginResponse)

export const twoFactorValidateMessage = (data: Authentication.ITwoFactorValidateRequest): RestMessage<Authentication.ITwoFactorValidateRequest, Authentication.ITwoFactorValidateResponse> =>
    createMessage(data, 'authentication/2fa_validate', Authentication.TwoFactorValidateRequest, Authentication.TwoFactorValidateResponse)

export const twoFactorSend2FAPushMessage = (data: Authentication.ITwoFactorSendPushRequest): RestInMessage<Authentication.ITwoFactorSendPushRequest> =>
    createInMessage(data, 'authentication/2fa_send_push', Authentication.TwoFactorSendPushRequest)

export const twoFactorAdd = (data: Authentication.ITwoFactorAddRequest): RestMessage<Authentication.ITwoFactorAddRequest, Authentication.ITwoFactorAddResponse> =>
    createMessage(data, 'authentication/2fa_add', Authentication.TwoFactorAddRequest, Authentication.TwoFactorAddResponse)

export const twoFactorAddValidate = (data: Authentication.ITwoFactorValidateRequest): RestMessage<Authentication.ITwoFactorValidateRequest, Authentication.ITwoFactorAddResponse> =>
    createMessage(data, 'authentication/2fa_add_validate', Authentication.TwoFactorValidateRequest, Authentication.TwoFactorAddResponse)

export const twoFactorList = (data: Authentication.ITwoFactorChannelInfo): RestMessage<Authentication.ITwoFactorChannelInfo, Authentication.ITwoFactorListResponse> =>
    createMessage(data, 'authentication/2fa_list', Authentication.TwoFactorChannelInfo, Authentication.TwoFactorListResponse)

export const twoFactorRename = (data: Authentication.ITwoFactorRenameRequest): RestInMessage<Authentication.ITwoFactorRenameRequest> =>
    createInMessage(data, 'authentication/2fa_rename', Authentication.TwoFactorRenameRequest)

export const twoFactorDelete = (data: Authentication.ITwoFactorDeleteRequest): RestInMessage<Authentication.ITwoFactorDeleteRequest> =>
    createInMessage(data, 'authentication/2fa_delete', Authentication.TwoFactorDeleteRequest)

export const twoFactorDuoStatus = (data: Authentication.ITwoFactorDuoStatus): RestInMessage<Authentication.ITwoFactorDuoStatus> =>
    createInMessage(data, 'authentication/2fa_duo_status', Authentication.TwoFactorDuoStatus)

export const approveDeviceMessage = (data: Authentication.IApproveDeviceRequest): RestInMessage<Authentication.IApproveDeviceRequest> =>
    createInMessage(data, 'authentication/approve_device', Authentication.ApproveDeviceRequest)

export const approveDeviceInstantMessage = (data: Authentication.IApproveDeviceRequest): RestInMessage<Authentication.IApproveDeviceRequest> =>
    createInMessage(data, 'authentication/approve_device_instant', Authentication.ApproveDeviceRequest)

export const validateDeviceVerificationCodeMessage = (data: Authentication.IValidateDeviceVerificationCodeRequest): RestInMessage<Authentication.IValidateDeviceVerificationCodeRequest> =>
    createInMessage(data, 'authentication/validate_device_verification_code', Authentication.ValidateDeviceVerificationCodeRequest)

export const validateCreateUserVerificationCodeMessage = (data: Authentication.IValidateCreateUserVerificationCodeRequest): RestInMessage<Authentication.IValidateCreateUserVerificationCodeRequest> =>
    createInMessage(data, 'authentication/validate_create_user_verification_code', Authentication.ValidateCreateUserVerificationCodeRequest)

export const approveUserDevicesMessage = (data: Enterprise.IApproveUserDevicesRequest): RestMessage<Enterprise.IApproveUserDevicesRequest, Enterprise.IApproveUserDevicesResponse> =>
    createMessage(data, 'enterprise/approve_user_devices', Enterprise.ApproveUserDevicesRequest, Enterprise.ApproveUserDevicesResponse)

export const registerEncryptedDataKeyForDeviceMessage = (data: Authentication.IRegisterDeviceDataKeyRequest): RestInMessage<Authentication.IRegisterDeviceDataKeyRequest> =>
    createInMessage(data, 'authentication/register_encrypted_data_key_for_device', Authentication.RegisterDeviceDataKeyRequest)

export const setUserSettingMessage = (data: Authentication.IUserSettingRequest): RestInMessage<Authentication.IUserSettingRequest> =>
    createInMessage(data, 'setting/set_user_setting', Authentication.UserSettingRequest)

export const requestDeviceAdminApprovalMessage = (data: Authentication.IDeviceVerificationRequest): RestInMessage<Authentication.IDeviceVerificationRequest> =>
    createInMessage(data, 'authentication/request_device_admin_approval', Authentication.DeviceVerificationRequest)

export const requestSaltAndIterations = (): RestOutMessage<Authentication.Salt> =>
    createOutMessage('authentication/get_salt_and_iterations', Authentication.Salt)

export const validateMasterPasswordMessage = (data: Authentication.IMasterPasswordReentryRequest): RestInMessage<Authentication.IMasterPasswordReentryRequest> =>
    createInMessage(data, 'authentication/validate_master_password', Authentication.MasterPasswordReentryRequest)

export const startLoginMessageFromSessionToken = (data: Authentication.IStartLoginRequest): RestMessage<Authentication.IStartLoginRequest, NN<Authentication.ILoginResponse>> =>
    createMessage(data, 'authentication/login_from_existing_session_token', Authentication.StartLoginRequest, Authentication.LoginResponse)

export const syncDownMessage = (data: Vault.ISyncDownRequest): RestMessage<Vault.ISyncDownRequest, NN<Vault.ISyncDownResponse>> =>
    createMessage(data, 'vault/sync_down', Vault.SyncDownRequest, Vault.SyncDownResponse)

export const keepAliveMessage = (): RestActionMessage => createActionMessage('keep_alive')

export const logoutV3Message = (): RestActionMessage => createActionMessage('vault/logout_v3')

// end new login

export const deviceMessage = (data: Authentication.IDeviceRequest): RestMessage<Authentication.IDeviceRequest, Authentication.IDeviceResponse> =>
    createMessage(data, 'authentication/get_device_token', Authentication.DeviceRequest, Authentication.DeviceResponse)

export const preLoginMessage = (data: Authentication.IPreLoginRequest): RestMessage<Authentication.IPreLoginRequest, Authentication.IPreLoginResponse> =>
    createMessage(data, 'authentication/pre_login', Authentication.PreLoginRequest, Authentication.PreLoginResponse)

export const securityReportMessage = (data: Authentication.ISecurityReportRequest): RestMessage<Authentication.ISecurityReportRequest, Authentication.ISecurityReportResponse> =>
    createMessage(data, 'enterprise/get_security_report_data', Authentication.SecurityReportRequest, Authentication.SecurityReportResponse)

export const enterpriseNodeToManagedCompanyMessage = (data: Enterprise.INodeToManagedCompanyRequest): RestInMessage<Enterprise.INodeToManagedCompanyRequest> =>
    createInMessage(data, 'enterprise/node_to_managed_company', Enterprise.NodeToManagedCompanyRequest)

export const recordTypesGetMessage = (data: Records.IRecordTypesRequest): RestMessage<Records.IRecordTypesRequest, Records.IRecordTypesResponse> =>
    createMessage(data, 'vault/get_record_types', Records.RecordTypesRequest, Records.RecordTypesResponse)

export const recordTypeAddMessage = (data: Records.IRecordType): RestMessage<Records.IRecordType, Records.IRecordTypeModifyResponse> =>
    createMessage(data, 'vault/record_type_add', Records.RecordType, Records.RecordTypeModifyResponse)

export const recordTypeUpdateMessage = (data: Records.IRecordType): RestMessage<Records.IRecordType, Records.IRecordTypeModifyResponse> =>
    createMessage(data, 'vault/record_type_update', Records.RecordType, Records.RecordTypeModifyResponse)

export const recordTypeDeleteMessage = (data: Records.IRecordType): RestMessage<Records.IRecordType, Records.IRecordTypeModifyResponse> =>
    createMessage(data, 'vault/record_type_delete', Records.RecordType, Records.RecordTypeModifyResponse)

export const recordsGetMessage = (data: Records.IRecordsGetRequest): RestMessage<Records.IRecordsGetRequest, Records.IRecordsGetResponse> =>
    createMessage(data, 'vault/records_get', Records.RecordsGetRequest, Records.RecordsGetResponse)

export const recordsAddMessage = (data: Records.IRecordsAddRequest): RestMessage<Records.IRecordsAddRequest, Records.IRecordsModifyResponse> =>
    createMessage(data, 'vault/records_add', Records.RecordsAddRequest, Records.RecordsModifyResponse)

export const recordsUpdateMessage = (data: Records.IRecordsUpdateRequest): RestMessage<Records.IRecordsUpdateRequest, Records.IRecordsModifyResponse> =>
    createMessage(data, 'vault/records_update', Records.RecordsUpdateRequest, Records.RecordsModifyResponse)

export const recordsRevertMessage = (data: Records.IRecordsRevertRequest): RestMessage<Records.IRecordsRevertRequest, Records.IRecordsModifyResponse> =>
    createMessage(data, 'vault/records_revert', Records.RecordsRevertRequest, Records.RecordsModifyResponse)

export const fileDownloadMessage = (data: Records.IFilesGetRequest): RestMessage<Records.IFilesGetRequest, Records.IFilesGetResponse> =>
    createMessage(data, 'vault/files_download', Records.FilesGetRequest, Records.FilesGetResponse)

export const fileAddMessage = (data: Records.IFilesAddRequest): RestMessage<Records.IFilesAddRequest, Records.IFilesAddResponse> =>
    createMessage(data, 'vault/files_add', Records.FilesAddRequest, Records.FilesAddResponse)

export const recordsConvert3Message = (data: Records.RecordsConvertToV3Request): RestMessage<Records.IRecordsConvertToV3Request, Records.RecordsModifyResponse> =>
    createMessage(data, 'vault/records_convert3', Records.RecordsConvertToV3Request, Records.RecordsModifyResponse)

export const recordAddAuditData = (data: Records.AddAuditDataRequest): RestInMessage<Records.IAddAuditDataRequest> =>
    createInMessage(data, 'vault/record_add_audit_data', Records.AddAuditDataRequest)

export const accountSummaryMessage = (data: AccountSummary.IAccountSummaryRequest): RestMessage<AccountSummary.IAccountSummaryRequest, AccountSummary.IAccountSummaryElements> =>
    createMessage(data, 'login/account_summary', AccountSummary.AccountSummaryRequest, AccountSummary.AccountSummaryElements)

export const sendSessionMessage = (data: Authentication.ISendSessionMessageRequest): RestInMessage<Authentication.ISendSessionMessageRequest> =>
    createInMessage(data, 'pushserver/send_session_message', Authentication.SendSessionMessageRequest)

export const setEncryptedTeamKeyMessage = (data: Enterprise.IEncryptedTeamKeyRequest): RestInMessage<Enterprise.IEncryptedTeamKeyRequest> =>
    createInMessage(data, 'enterprise/set_encrypted_team_key', Enterprise.EncryptedTeamKeyRequest)

export const getBackupMessage = (data: Enterprise.IBackupRequest): RestMessage<Enterprise.IBackupRequest, Enterprise.IBackupResponse> =>
    createMessage(data, 'enterprise/get_backup', Enterprise.BackupRequest, Enterprise.BackupResponse)

export const getEnterprisePublicKeyMessage = (): RestOutMessage<BreachWatch.IEnterprisePublicKeyResponse> =>
    createOutMessage('enterprise/get_enterprise_public_key', BreachWatch.EnterprisePublicKeyResponse)

export const getEnterpriseDataForUserMessage = (data: Enterprise.IEnterpriseDataRequest): RestMessage<Enterprise.IEnterpriseDataRequest, Enterprise.IEnterpriseDataResponse> =>
    createMessage(data, 'enterprise/get_enterprise_data_for_user', Enterprise.EnterpriseDataRequest, Enterprise.EnterpriseDataResponse)

export const setEnterpriseDataKeyMessage = (data: Enterprise.IEnterpriseUserDataKey): RestInMessage<Enterprise.IEnterpriseUserDataKey> =>
    createInMessage(data, 'enterprise/set_enterprise_user_data_key', Enterprise.EnterpriseUserDataKey)

export const setV2AlternatePasswordMessage = (data: Authentication.IUserAuthRequest): RestInMessage<Authentication.IUserAuthRequest> =>
    createInMessage(data, 'authentication/set_v2_alternate_password', Authentication.UserAuthRequest)

export const getMasterPasswordSaltMessage = (): RestOutMessage<Authentication.ISalt> =>
    createOutMessage('setting/get_master_password_salt', Authentication.Salt)

export const getPublicKeysMessage = (data: Authentication.IGetPublicKeysRequest): RestMessage<Authentication.IGetPublicKeysRequest, Authentication.IGetPublicKeysResponse> =>
    createMessage(data, 'vault/get_public_keys', Authentication.GetPublicKeysRequest, Authentication.GetPublicKeysResponse)

export const setEccKeyPairMessage = (data: Authentication.ISetEccKeyPairRequest): RestInMessage<Authentication.ISetEccKeyPairRequest> =>
    createInMessage(data, 'vault/set_ecc_key_pair', Authentication.SetEccKeyPairRequest)

export const applicationAddMessage = (data: Records.IApplicationAddRequest): RestInMessage<Records.IApplicationAddRequest> =>
    createInMessage(data, 'vault/application_add', Records.ApplicationAddRequest)

export const addAppShareMessage = (data: Authentication.IAddAppSharesRequest): RestInMessage<Authentication.IAddAppSharesRequest> =>
    createInMessage(data, 'vault/app_share_add', Authentication.AddAppSharesRequest)

export const removeAppShareMessage = (data: Authentication.IRemoveAppSharesRequest): RestInMessage<Authentication.IRemoveAppSharesRequest> =>
    createInMessage(data, 'vault/app_share_remove', Authentication.RemoveAppSharesRequest)

export const addAppClientMessage = (data: Authentication.IAddAppClientRequest): RestMessage<Authentication.IAddAppClientRequest, Authentication.IDevice> =>
    createMessage(data, 'vault/app_client_add', Authentication.AddAppClientRequest, Authentication.Device)

export const addExternalShareMessage = (data: Authentication.IAddExternalShareRequest): RestMessage<Authentication.IAddExternalShareRequest, Authentication.IDevice> =>
    createMessage(data, 'vault/external_share_add', Authentication.AddExternalShareRequest, Authentication.Device)

export const removeExternalShareMessage = (data: Authentication.IRemoveAppClientsRequest): RestInMessage<Authentication.IRemoveAppClientsRequest> =>
    createInMessage(data, 'vault/external_share_remove', Authentication.RemoveAppClientsRequest)

export const removeAppClientMessage = (data: Authentication.IRemoveAppClientsRequest): RestInMessage<Authentication.IRemoveAppClientsRequest> =>
    createInMessage(data, 'vault/app_client_remove', Authentication.RemoveAppClientsRequest)

export const getAppInfoMessage = (data: Authentication.IGetAppInfoRequest): RestMessage<Authentication.IGetAppInfoRequest, Authentication.IGetAppInfoResponse> =>
    createMessage(data, 'vault/get_app_info', Authentication.GetAppInfoRequest, Authentication.GetAppInfoResponse)

export const getApplicationsSummaryMessage = (): RestOutMessage<Authentication.IGetApplicationsSummaryResponse> =>
    createOutMessage('vault/get_applications_summary', Authentication.GetApplicationsSummaryResponse)

export const sendShareInviteMessage = (data: Authentication.ISendShareInviteRequest): RestInMessage<Authentication.ISendShareInviteRequest> =>
    createInMessage(data, 'vault/send_share_invite', Authentication.SendShareInviteRequest)

export const updateSecurityData = (data: Authentication.ISecurityDataRequest): RestMessage<Authentication.ISecurityDataRequest, Authentication.RevisionResponse> =>
    createMessage(data, 'enterprise/update_security_data', Authentication.SecurityDataRequest, Authentication.RevisionResponse)

export const setReusedPasswords = (data: Authentication.IReusedPasswordsRequest): RestInMessage<Authentication.IReusedPasswordsRequest> =>
    createInMessage(data, 'enterprise/set_reused_passwords', Authentication.ReusedPasswordsRequest)

/* -- SERVICE LOGGER -- */

export const serviceLoggerGetMessage = (data: ServiceLogger.IServiceLogGetRequest): RestMessage<ServiceLogger.IServiceLogGetRequest, ServiceLogger.IServiceLogResponse> =>
    createMessage(data, 'logger/get', ServiceLogger.ServiceLogGetRequest, ServiceLogger.ServiceLogResponse)


/* -- Cloud SSO Connect -- */

export const ssoSamlMessage = (endpoint: string): RestActionMessage =>
    createActionMessage('sso/saml/' + endpoint)

export const ssoConfigMessage = (endpoint: string): RestActionMessage =>
    createActionMessage('sso/config/' + endpoint)

export const ssoLoginMessageWithUrl = (url): RestActionMessage =>
    createActionMessage(url)

export const ssoLogoutMessage = (serviceProviderId): RestActionMessage =>
    createActionMessage('sso/saml/logout/' + serviceProviderId)

export const ssoGetMetadataMessage = (serviceProviderId): RestActionMessage =>
    createActionMessage('sso/saml/metadata/' + serviceProviderId)

export const ssoUploadIdpMetadataMessage = (data: SsoCloud.ISsoCloudIdpMetadataRequest): RestMessage<SsoCloud.ISsoCloudIdpMetadataRequest, SsoCloud.ISsoCloudConfigurationValidationResponse> =>
    createMessage(data, 'sso/config/sso_cloud_upload_idp_metadata', SsoCloud.SsoCloudIdpMetadataRequest, SsoCloud.SsoCloudConfigurationValidationResponse)

export const ssoCloudServiceProviderUpdateRequestMessage = (data: SsoCloud.ISsoCloudServiceProviderUpdateRequest): RestMessage<SsoCloud.ISsoCloudServiceProviderUpdateRequest, SsoCloud.ISsoCloudConfigurationResponse> =>
    createMessage(data, 'sso/config/sso_cloud_sp_configuration_set', SsoCloud.SsoCloudServiceProviderUpdateRequest, SsoCloud.SsoCloudConfigurationResponse)

export const ssoCloudConfigurationRequestMessage = (data: SsoCloud.ISsoCloudConfigurationRequest, url: string): RestMessage<SsoCloud.ISsoCloudConfigurationRequest, SsoCloud.ISsoCloudConfigurationResponse> =>
    createMessage(data, url, SsoCloud.SsoCloudConfigurationRequest, SsoCloud.SsoCloudConfigurationResponse)

export const ssoCloudLogRequestMessage = (data: SsoCloud.ISsoCloudLogRequest, url: string): RestMessage<SsoCloud.ISsoCloudLogRequest, ServiceLogger.IServiceLogResponse> =>
    createMessage(data, url, SsoCloud.SsoCloudLogRequest, ServiceLogger.ServiceLogResponse)

export const ssoCloudSAMLLogRequestMessage = (data: SsoCloud.ISsoCloudSAMLLogRequest, url: string): RestMessage<SsoCloud.ISsoCloudSAMLLogRequest, SsoCloud.ISsoCloudSAMLLogResponse> =>
    createMessage(data, url, SsoCloud.SsoCloudSAMLLogRequest, SsoCloud.SsoCloudSAMLLogResponse)

export const ssoCloudServiceProviderConfigurationListRequestMessage = (data: SsoCloud.ISsoCloudServiceProviderConfigurationListRequest): RestMessage<SsoCloud.ISsoCloudServiceProviderConfigurationListRequest, SsoCloud.ISsoCloudServiceProviderConfigurationListResponse> =>
    createMessage(data, 'sso/config/sso_cloud_sp_configuration_get', SsoCloud.SsoCloudServiceProviderConfigurationListRequest, SsoCloud.SsoCloudServiceProviderConfigurationListResponse)

export const ssoServiceProviderRequestMessage = (data: Authentication.ISsoServiceProviderRequest): RestMessage<Authentication.ISsoServiceProviderRequest, NN<Authentication.ISsoServiceProviderResponse>> =>
    createMessage(data, 'enterprise/get_sso_service_provider', Authentication.SsoServiceProviderRequest, Authentication.SsoServiceProviderResponse)

export const ssoCloudValidationRequestMessage = (data: SsoCloud.ISsoCloudConfigurationValidationRequest, url: string): RestMessage<SsoCloud.ISsoCloudConfigurationValidationRequest, SsoCloud.ISsoCloudConfigurationValidationResponse> =>
    createMessage(data, url, SsoCloud.SsoCloudConfigurationValidationRequest, SsoCloud.SsoCloudConfigurationValidationResponse)


/* -- Keeper Automator -- */


export const automatorApproveDeviceMessage = (data: Automator.ApproveDeviceRequest, url: string): RestMessage<Automator.IApproveDeviceRequest, Automator.IAutomatorResponse> =>
    createMessage(data, url, Automator.ApproveDeviceRequest, Automator.AutomatorResponse)

export const automatorAdminCreateMessage = (data: Automator.AdminCreateAutomatorRequest, url: string): RestMessage<Automator.IAdminCreateAutomatorRequest, Automator.IAdminResponse> =>
    createMessage(data, url, Automator.AdminCreateAutomatorRequest, Automator.AdminResponse)

export const automatorAdminDeleteMessage = (data: Automator.AdminDeleteAutomatorRequest, url: string): RestMessage<Automator.IAdminDeleteAutomatorRequest, Automator.IAdminResponse> =>
    createMessage(data, url, Automator.AdminDeleteAutomatorRequest, Automator.AdminResponse)

export const automatorAdminEditMessage = (data: Automator.AdminEditAutomatorRequest, url: string): RestMessage<Automator.IAdminEditAutomatorRequest, Automator.IAdminResponse> =>
    createMessage(data, url, Automator.AdminEditAutomatorRequest, Automator.AdminResponse)

export const automatorAdminEnableMessage = (data: Automator.AdminEnableAutomatorRequest, url: string): RestMessage<Automator.IAdminEnableAutomatorRequest, Automator.IAdminResponse> =>
    createMessage(data, url, Automator.AdminEnableAutomatorRequest, Automator.AdminResponse)

export const automatorAdminGetMessage = (data: Automator.AdminGetAutomatorRequest, url: string): RestMessage<Automator.IAdminGetAutomatorRequest, Automator.IAdminResponse> =>
    createMessage(data, url, Automator.AdminGetAutomatorRequest, Automator.AdminResponse)

export const automatorAdminGetAllOnNodeMessage = (data: Automator.AdminGetAutomatorsOnNodeRequest, url: string): RestMessage<Automator.IAdminGetAutomatorsOnNodeRequest, Automator.IAdminResponse> =>
    createMessage(data, url, Automator.AdminGetAutomatorsOnNodeRequest, Automator.AdminResponse)

export const automatorAdminGetAllForEnterpriseMessage = (data: Automator.AdminGetAutomatorsForEnterpriseRequest, url: string): RestMessage<Automator.IAdminGetAutomatorsForEnterpriseRequest, Automator.IAdminResponse> =>
    createMessage(data, url, Automator.AdminGetAutomatorsForEnterpriseRequest, Automator.AdminResponse)

export const automatorAdminInitializeMessage = (data: Automator.AdminInitializeAutomatorRequest, url: string): RestMessage<Automator.IAdminInitializeAutomatorRequest, Automator.IAdminResponse> =>
    createMessage(data, url, Automator.AdminInitializeAutomatorRequest, Automator.AdminResponse)

export const automatorAdminResetMessage = (data: Automator.AdminResetAutomatorRequest, url: string): RestMessage<Automator.IAdminResetAutomatorRequest, Automator.IAdminResponse> =>
    createMessage(data, url, Automator.AdminResetAutomatorRequest, Automator.AdminResponse)

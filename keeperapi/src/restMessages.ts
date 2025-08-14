// noinspection JSUnusedGlobalSymbols

import {Writer} from 'protobufjs'
import {
    AccountSummary,
    Authentication,
    BI,
    BreachWatch,
    Automator,
    Enterprise,
    Records,
    ServiceLogger,
    SsoCloud,
    Vault,
    Tokens,
    NotificationCenter,
    Folder,
    record,
    records
} from './proto'

// generated protobuf has all properties optional and nullable, while this is not an issue for KeeperApp, this type fixes it
export type NN<T> = Required<{ [prop in keyof T]: NonNullable<T[prop]> }>

export type RestInMessage<TIn> = {
    path: string
    toBytes(): Uint8Array
    apiVersion?: number
}

export type RestOutMessage<TOut> = {
    path: string
    fromBytes(data: Uint8Array): TOut
    apiVersion?: number
}

export type RestMessage<TIn, TOut> = RestInMessage<TIn> & RestOutMessage<TOut>

export type RestActionMessage = {
    path: string
    apiVersion?: number
}

type encoderClass<T> = {
    encode: (message: T, writer?: Writer) => Writer
}

type decoderClass<T> = {
    decode: (reader: Uint8Array, length?: number) => T
}

const createInMessage = <TIn>(data: TIn, path: string, encoder: encoderClass<TIn>, apiVersion?: number): RestInMessage<TIn> => ({
    path: path,
    toBytes(): Uint8Array {
        return encoder.encode(data).finish()
    },
    apiVersion
})

const createOutMessage = <TOut>(path: string, decoder: decoderClass<TOut>, apiVersion?: number): RestOutMessage<TOut> => ({
    path: path,
    fromBytes(data: Uint8Array): TOut {
        return decoder.decode(data)
    },
    apiVersion
})

const createMessage = <TIn, TOut>(data: TIn, path: string, encoder: encoderClass<TIn>, decoder: decoderClass<TOut>, apiVersion?: number): RestMessage<TIn, NN<TOut>> => ({
    path: path,
    toBytes(): Uint8Array {
        return encoder.encode(data).finish()
    },
    fromBytes(data: Uint8Array): NN<TOut> {
        return <NN<TOut>>decoder.decode(data)
    },
    apiVersion
})

const createActionMessage = (path: string, apiVersion?: number): RestActionMessage => ({
    path: path,
    apiVersion
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

export const validateMasterPasswordMessage = (data: Authentication.IMasterPasswordReentryRequest): RestMessage<Authentication.IMasterPasswordReentryRequest, Authentication.IMasterPasswordReentryResponse> =>
    createMessage(data, 'authentication/validate_master_password', Authentication.MasterPasswordReentryRequest, Authentication.MasterPasswordReentryResponse, 1)

export const startLoginMessageFromSessionToken = (data: Authentication.IStartLoginRequest): RestMessage<Authentication.IStartLoginRequest, NN<Authentication.ILoginResponse>> =>
    createMessage(data, 'authentication/login_from_existing_session_token', Authentication.StartLoginRequest, Authentication.LoginResponse)

export const twoFASendDuoMessage = (data: Authentication.ITwoFactorSendPushRequest): RestMessage<Authentication.ITwoFactorSendPushRequest, Authentication.TwoFactorValidateResponse> =>
    createMessage(data, 'authentication/2fa_send_duo', Authentication.TwoFactorSendPushRequest, Authentication.TwoFactorValidateResponse)

export const syncDownMessage = (data: Vault.ISyncDownRequest): RestMessage<Vault.ISyncDownRequest, NN<Vault.ISyncDownResponse>> =>
    createMessage(data, 'vault/sync_down', Vault.SyncDownRequest, Vault.SyncDownResponse)

export const getSyncData = (data: Vault.IBreachWatchGetSyncDataRequest): RestMessage<Vault.IBreachWatchGetSyncDataRequest, Vault.IBreachWatchGetSyncDataResponse> => 
    createMessage(data, 'breachwatch/get_sync_data', Vault.BreachWatchGetSyncDataRequest, Vault.BreachWatchGetSyncDataResponse)

export const generatePasskeyRegistration = (data: Authentication.IPasskeyRegistrationRequest): RestMessage<Authentication.IPasskeyRegistrationRequest, Authentication.IPasskeyRegistrationResponse> => 
    createMessage(data, 'authentication/passkey/generate_registration', Authentication.PasskeyRegistrationRequest, Authentication.PasskeyRegistrationResponse)

export const verifyPasskeyRegistration = (data: Authentication.IPasskeyRegistrationFinalization): RestInMessage<Authentication.IPasskeyRegistrationFinalization> =>
    createInMessage(data, 'authentication/passkey/verify_registration', Authentication.PasskeyRegistrationFinalization)

export const generatePasskeyAuthentication = (data: Authentication.IPasskeyAuthenticationRequest): RestMessage<Authentication.IPasskeyAuthenticationRequest, Authentication.IPasskeyAuthenticationResponse> =>
    createMessage(data, 'authentication/passkey/generate_authentication', Authentication.PasskeyAuthenticationRequest, Authentication.PasskeyAuthenticationResponse)

export const verifyPasskeyAuthentication = (data: Authentication.IPasskeyValidationRequest): RestMessage<Authentication.IPasskeyValidationRequest, Authentication.IPasskeyValidationResponse> =>
    createMessage(data, 'authentication/passkey/verify_authentication', Authentication.PasskeyValidationRequest, Authentication.PasskeyValidationResponse)

export const getAvailablePasskeys = (data: Authentication.IPasskeyListRequest): RestMessage<Authentication.IPasskeyListRequest, Authentication.IPasskeyListResponse> =>
    createMessage(data, 'authentication/passkey/get_available_keys', Authentication.PasskeyListRequest, Authentication.PasskeyListResponse)

export const disablePasskey = (data: Authentication.IUpdatePasskeyRequest): RestInMessage<Authentication.IUpdatePasskeyRequest> =>
    createInMessage(data, 'authentication/passkey/disable', Authentication.UpdatePasskeyRequest)

export const updatePasskeyName = (data: Authentication.IUpdatePasskeyRequest): RestInMessage<Authentication.IUpdatePasskeyRequest> =>
    createInMessage(data, 'authentication/passkey/update_friendly_name', Authentication.UpdatePasskeyRequest)

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

export const getRecordsDetailsMessage = (data: Records.IGetRecordDataWithAccessInfoRequest): RestMessage<Records.IGetRecordDataWithAccessInfoRequest, Records.IGetRecordDataWithAccessInfoResponse> =>
  createMessage(data, 'vault/get_records_details', Records.GetRecordDataWithAccessInfoRequest, Records.GetRecordDataWithAccessInfoResponse)

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

export const supportSendNotifications = (data: NotificationCenter.INotificationsSendRequest): RestInMessage<NotificationCenter.INotificationsSendRequest> =>
    createInMessage(data, 'support/send_notifications', NotificationCenter.NotificationsSendRequest)

export const teamsEnterpriseUsersAdd = (data: Enterprise.ITeamsEnterpriseUsersAddRequest): RestMessage<Enterprise.ITeamsEnterpriseUsersAddRequest, Enterprise.ITeamsEnterpriseUsersAddResponse> =>
    createMessage(data, 'enterprise/teams_enterprise_users_add', Enterprise.TeamsEnterpriseUsersAddRequest, Enterprise.TeamsEnterpriseUsersAddResponse)

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

export const changeToKeyTypeOne = (data: Authentication.IChangeToKeyTypeOne): RestInMessage<Authentication.IChangeToKeyTypeOne> =>
    createInMessage(data, 'vault/change_to_key_type_one', Authentication.ChangeToKeyTypeOne)

/* -- BI -- */
export const customerCapture = (data: BI.ICustomerCaptureRequest): RestMessage<BI.ICustomerCaptureRequest, BI.ICustomerCaptureResponse> => 
    createMessage(data, 'bi_api/rest/browser_extension/customer_capture', BI.CustomerCaptureRequest, BI.CustomerCaptureResponse)

/* -- BreachWatch -- */

export const breachWatchInitialize = (): RestOutMessage<BreachWatch.IBreachWatchTokenRequest> =>
    createOutMessage('breachwatch/initialize', BreachWatch.BreachWatchTokenResponse)

export const breachWatchSaveToken = (data: BreachWatch.IBreachWatchTokenRequest): RestInMessage<BreachWatch.IBreachWatchTokenRequest> =>
    createInMessage(data,'breachwatch/save_token', BreachWatch.BreachWatchTokenRequest)

export const breachWatchAnonymizeToken = (data: BreachWatch.IBreachWatchTokenRequest): RestMessage<BreachWatch.IBreachWatchTokenRequest, BreachWatch.IAnonymizedTokenResponse> =>
    createMessage(data, 'breachwatch/anonymize_token', BreachWatch.BreachWatchTokenRequest, BreachWatch.AnonymizedTokenResponse)

export const breachWatchStatus = (data: BreachWatch.IBreachWatchStatusRequest): RestMessage<BreachWatch.IBreachWatchStatusRequest, BreachWatch.IBreachWatchStatusResponse> =>
    createMessage(data, 'breachwatch/status', BreachWatch.BreachWatchStatusRequest, BreachWatch.BreachWatchStatusResponse)

export const breachWatchUpdateRecordData = (data: BreachWatch.IBreachWatchUpdateRequest): RestMessage<BreachWatch.IBreachWatchUpdateRequest, BreachWatch.IBreachWatchUpdateResponse> =>
    createMessage(data, 'breachwatch/update_record_data', BreachWatch.BreachWatchUpdateRequest, BreachWatch.BreachWatchUpdateResponse)

export const getCheckoutTokenMessage = (): RestOutMessage<Tokens.ICheckOutTokenResponse> =>
    createOutMessage('checkouttoken/get_checkout_token', Tokens.CheckOutTokenResponse)


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

// begin shared folder change
export const folderAddMessage = (data: Folder.FolderAddRequest): RestMessage<Folder.IFolderAddRequest, Folder.IFolderAddResponse> =>
    createMessage(data, 'vault/folders/v3/add', Folder.FolderAddRequest, Folder.FolderAddResponse)

export const folderUpdateMessage = (data: Folder.FolderUpdateRequest): RestMessage<Folder.IFolderUpdateRequest, Folder.IFolderUpdateResponse> =>
    createMessage(data, 'vault/folders/v3/update', Folder.FolderUpdateRequest, Folder.FolderUpdateResponse)

export const folderRecordUpdateMessage = (data: Folder.FolderRecordUpdateRequest): RestMessage<Folder.IFolderRecordUpdateRequest, Folder.IFolderRecordUpdateResponse> =>
    createMessage(data, 'vault/folders/v3/record_update', Folder.FolderRecordUpdateRequest, Folder.FolderRecordUpdateResponse)

export const folderAccessUpdateMessage = (data: Folder.FolderAccessRequest): RestMessage<Folder.IFolderAccessRequest, Folder.IFolderAccessResponse> =>
    createMessage(data, 'vault/folders/v3/access_update', Folder.FolderAccessRequest, Folder.FolderAccessResponse)

export const V3RecordAddMessage = (data: record.v3.RecordsAddRequest): RestMessage<record.v3.RecordsAddRequest, Records.IRecordsModifyResponse> =>
    createMessage(data, 'vault/records/v3/add', record.v3.RecordsAddRequest, Records.RecordsModifyResponse)

export const V3RecordUpdateMessage = (data: Records.RecordsUpdateRequest): RestMessage<Records.IRecordsUpdateRequest, Records.IRecordsModifyResponse> =>
    createMessage(data, 'vault/records/v3/update', Records.RecordsUpdateRequest, Records.RecordsModifyResponse)

export const V3RecordShareMessage = (data: records.share.v3.Request): RestMessage<records.share.v3.IRequest, records.share.v3.IResponse> =>
    createMessage(data, 'vault/records/v3/share', records.share.v3.Request, records.share.v3.Response)

export const V3RecordDetailsMessage = (data: record.v3.details.RecordDataRequest): RestMessage<record.v3.details.IRecordDataRequest, record.v3.details.IRecordDataResponse> =>
    createMessage(data, 'vault/records/v3/details/data', record.v3.details.RecordDataRequest, record.v3.details.RecordDataResponse)

export const V3RecordAccessMessage = (data: record.v3.details.RecordAccessRequest): RestMessage<record.v3.details.IRecordAccessRequest, record.v3.details.IRecordAccessResponse> =>
    createMessage(data, 'vault/records/v3/details/access', record.v3.details.RecordAccessRequest, record.v3.details.RecordAccessResponse)

export const RecordOwnershipTransferMessage = (data: Records.RecordsOnwershipTransferRequest): RestMessage<Records.IRecordsOnwershipTransferRequest, Records.IRecordsOnwershipTransferResponse> =>
    createMessage(data, 'vault/records/v3/transfer', Records.RecordsOnwershipTransferRequest, Records.RecordsOnwershipTransferResponse)
// end shared folder change
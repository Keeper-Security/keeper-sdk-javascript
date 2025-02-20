export type BaseRequest = {
    command: string
    username?: string
    client_version?: string
}

type AuthorizedRequest = {
    session_token?: string
    device_id?: string
}

export type SyncDataInclude =
    | "record"               //*
    | "typed_record"
    | "app_record"
    | "shared_folder"       //*
    | "sfheaders"           //*
    | "sfusers"
    | "sfrecords"
    | "folders"
    | "teams"                //*
    | "sharing_changes"     //*
    | "non_shared_data"     //*
    | "pending_shares"      //*
    | "profile"
    | "pending_team_users"
    | "user_auth"
    | "reused_passwords"
    | "explicit"

type SyncDownRequest = {
    revision: number
    client_time?: number
    include: SyncDataInclude[];
}

export type KeeperResponse = {
    command: string
    result: string
    result_code: string
    message?: string
}

export type KeeperHttpResponse = {
    statusCode: number
    headers: unknown
    data: Uint8Array
}

export type RestCommand<Request, Response> = {
    baseRequest: BaseRequest
    request: Request
    authorization?: AuthorizedRequest
}

function createCommand<Request, Response>(request: Request, command: string, noAuth: boolean = false): RestCommand<Request, Response> {
    const restCommand: RestCommand<Request, Response> = {
        baseRequest: {
            command: command,
        },
        request
    }
    if (!noAuth) {
        restCommand.authorization = {}
    }
    return restCommand
}

type NonSharedData = {
    record_uid: string;
    data: string;
}

type UserPermission = {
    owner: boolean;
    shareable: boolean;
    editable: boolean;
    awaiting_approval: boolean;
    username: string;
}

export type RecordData = {
    record_uid: string;
    version: number;
    revision?: number;
    client_modified_time?: number;
    data?: string;
    extra?: string;
    udata?: { file_ids: string[] };
    shared?: boolean;
    user_permissions?: UserPermission[];
    owner_uid?: string;
    link_key?: string;
}

export type RecordMetaData = {
    record_uid: string;
    owner: boolean;
    record_key: string;
    can_share: boolean;
    can_edit: boolean;
    record_key_type: number;
}

type SharedFolderRecord = {
    record_uid: string;
    record_key: string;
    can_share: boolean;
    can_edit: boolean;
}

export type SharedFolder = {
    default_can_edit: boolean;
    full_sync: boolean;
    name: string;
    data: string;
    key_type: number;
    records: SharedFolderRecord[];
    default_can_share: boolean;
    default_manage_records: boolean;
    default_manage_users: boolean;
    shared_folder_uid: string;
    revision: number;
    manage_users: boolean;
    manage_records: boolean;
    shared_folder_key: string;
}

type TeamSharedFolderKey = {
    key_type: number;
    shared_folder_key: string;
    shared_folder_uid: string;
}

type Team = {
    restrict_edit: boolean;
    team_private_key: string;
    name: string;
    team_key_type: number;
    restrict_view: boolean;
    team_key: string;
    shared_folder_keys: TeamSharedFolderKey[];
    team_uid: string;
    restrict_share: boolean;
}

type SyncDownResponse = KeeperResponse & {
    full_sync: boolean;
    non_shared_data: NonSharedData[];
    records: RecordData[];
    record_meta_data: RecordMetaData[];
    removed_records: string[];
    result_code: string;
    revision: number;
    shared_folders: SharedFolder[];
    shared_folder_folder_records: {
        record_uid: string,
        folder_uid: string,
        shared_folder_uid: string,
        revision: number
    }[]
    teams: Team[];
    user_folder_shared_folders: {
        shared_folder_uid: string,
        revision: number
    }[]
}

export const syncDownCommand = (request: SyncDownRequest): RestCommand<SyncDownRequest, SyncDownResponse> =>
    createCommand({
        ...request,
        client_time: new Date().getTime()
    }, 'sync_down')

export type RoleEnforcementAddRequest = {
    role_id: number,
    enforcement: string,
    value?: unknown
}

export const roleEnforcementAddCommand = (request: RoleEnforcementAddRequest): RestCommand<RoleEnforcementAddRequest, KeeperResponse> =>
    createCommand(request, 'role_enforcement_add')

export type MoveRequest = {
    to_type: 'user_folder' | 'shared_folder' | 'shared_folder_folder'
    to_uid?: string
    link: boolean
    move: MoveObject[]
    transition_keys: TransitionKeyObject[]
}

export type MoveObject = {
    type: 'record' | 'user_folder' | 'shared_folder' | 'shared_folder_folder'
    uid: string
    from_type: 'user_folder' | 'shared_folder' | 'shared_folder_folder'
    from_uid?: string
    can_edit?: boolean
    can_reshare?: boolean
    cascade: boolean
}

export type TransitionKeyObject = {
    uid: string
    key: string
}

export const moveCommand = (request: MoveRequest): RestCommand<MoveRequest, KeeperResponse> => createCommand(request, 'move')

export type ShareAccountRequest = {
    to_role_id: number
    // do not include transfer key for EC only https://keeper.atlassian.net/wiki/x/OYCoAg
    transfer_key?: string
}

export const shareAccountCommand = (request: ShareAccountRequest): RestCommand<ShareAccountRequest, KeeperResponse> => createCommand(request, 'share_account')

export type RecordAddRequest = {
    record_uid: string
    record_key: string
    record_type: string
    folder_type: string
    how_long_ago: number
    folder_uid: string
    folder_key: string
    data: string
    extra: string
    non_shared_data: string
    file_ids: string[]
}

export const recordAddCommand = (request: RecordAddRequest): RestCommand<RecordAddRequest, KeeperResponse> => createCommand(request, 'record_add')

export type RecordPreDeleteObject = {
    object_uid: string
    object_type: 'record'
    from_uid: string
    from_type: string
    delete_resolution: 'unlink'
}
export type RecordPreDeleteRequest = {
    objects: RecordPreDeleteObject[]
}
export type DeletionSummary = {
    deletion_summary: string[]
}
export type PreDeleteResponse = {
    pre_delete_token: string
    would_delete: DeletionSummary
}
export type KeeperPreDeleteResponse = {
    result: string
    result_code: string
    message?: string
    pre_delete_response: PreDeleteResponse
}
export type RecordDeleteRequest = {
    pre_delete_token: string
}

export const recordPreDeleteCommand = (request: RecordPreDeleteRequest): RestCommand<RecordPreDeleteRequest, KeeperPreDeleteResponse> => createCommand(request, 'pre_delete')
export const recordDeleteCommand = (request: RecordDeleteRequest): RestCommand<RecordDeleteRequest, KeeperResponse> => createCommand(request, 'delete')

export type EnterpriseSettingInclude =
    | "AuditSyncConfig"
    | "AuditSyncContext"
    | "AuditAlertsConfig"
    | "BackupConfig"
    | "AuditReportFilter"
    | "AuditAlertFilter"
    | "AuditAlertContext"
    | "RDControllerConfig"

export type PutEnterpriseSettingRequest = {
    type: EnterpriseSettingInclude
    settings: any
}

export const putEnterpriseSettingCommand = (request: PutEnterpriseSettingRequest): RestCommand<PutEnterpriseSettingRequest, KeeperResponse> => createCommand(request, 'put_enterprise_setting')

/**
export class KeeperCommand<Response extends KeeperResponse = KeeperResponse> {
    command?: string;
    username?: string;
    client_version?: string;
    response?: Response
}

export type AccountDataInclude =
    | "license"
    | "settings"
    | "group"
    | "sync_log"
    | "keys"
    | "enforcements"
    | "client_key"
    | "images"
    | "is_enterprise_admin"
    | "security_keys"
    | "personal_license"

export class LoginCommand extends KeeperCommand<LoginResponse> {
    version?: number;
    auth_response?: string;
    include?: AccountDataInclude[];
    enterprise_id?: number; // for logging into managed company
    platform_device_token?: string;
    "2fa_type": "device_token" | "one_time" | "backup" | "u2f";
    "2fa_mode": "auto" | "passcode" | "phone" | "push" | "sms";
    "2fa_token": string;
}

export class RegisterCommand extends KeeperCommand<LoginResponse> {

    constructor() {
        super()
        this.command = "register"
    }

    email?: string;
    auth_verifier?: string;
    encryption_params?: string;
    public_key?: string;
    encrypted_private_key?: string;
}

export class AuthorizedCommand<Response extends KeeperResponse = KeeperResponse> extends KeeperCommand<Response> {
    session_token: string;
    device_id: string
}

export class AccountSummaryCommand extends AuthorizedCommand<KeeperResponse> {

    constructor() {
        super()
        this.command = "account_summary"
    }

    include: AccountDataInclude[]
}

// Currently the * items are included by default. If the item explicit is included, then only the items listed will be included.
export type SyncDataInclude =
    | "record"               //*
    | "typed_record"
    | "app_record"
    | "shared_folder"       //*
    | "sfheaders"           //*
    | "sfusers"
    | "sfrecords"
    | "folders"
    | "teams"                //*
    | "sharing_changes"     //*
    | "non_shared_data"     //*
    | "pending_shares"      //*
    | "profile"
    | "pending_team_users"
    | "user_auth"
    | "reused_passwords"
    | "explicit"

export class SyncDownCommand extends AuthorizedCommand<SyncResponse> {

    private revision: number;
    private client_time: number
    include: SyncDataInclude[];

    constructor(revision: number) {
        super()
        this.command = 'sync_down'
        this.revision = revision
        this.client_time = new Date().getTime()
    }
}

export class RecordUpdateCommand extends AuthorizedCommand {

    constructor() {
        super()
        this.command = "record_update"
    }

    pt: string;
    client_time: number;
    add_records: RecordUpdateRecord[];
    update_records: RecordUpdateRecord[];
    remove_records: string[];
    delete_records: string[];
}

export interface RecordUpdateRecord {
    record_uid: string;
    record_key?: string;
    data: string;
    extra?: string;
    udata?: any;
    non_shared_data?: any;
    revision: number;
    version: number;
    client_modified_time: number;
    shared_folder_id?: string;
    team_uid?: string;
}

export class RequestDownloadCommand extends AuthorizedCommand<RequestDownloadResponse> {
    constructor() {
        super()
        this.command = 'request_download'
    }

    record_uid: string
    file_ids: string[]
    shared_folder_uid: string
    team_uid: string
}

export interface RequestDownloadResponse extends KeeperResponse {
    downloads: {
        success_status_code: number
        url: string
    }[]
}

export class RequestUploadCommand extends AuthorizedCommand<RequestUploadResponse> {
    constructor() {
        super()
        this.command = 'request_upload'
    }

    file_count: number
    thumbnail_count: number
}

export interface RequestUploadResponse extends KeeperResponse {
    file_uploads: FileUpload[]
    thumbnail_uploads: FileUpload[]
}

export interface FileUpload {
    file_parameter: 'file'
    file_id: string
    success_status_code: number
    parameters: {
        signature: string
        success_action_status: number
        AWSAccessKeyId: string
        acl: 'private'
        'x-amz-security-token': string
        key: string
        policy: string
    }
    max_size: number
    url: string
}

export class PreDeleteCommand extends AuthorizedCommand<PreDeleteResponse> {
    constructor() {
        super()
        this.command = 'pre_delete'
    }
    objects: DeleteObject[]
}

export interface DeleteObject {
    object_uid: string,
    object_type: 'record' | 'user_folder' | 'shared_folder' | 'shared_folder_folder'
    from_uid?: string,
    from_type: 'user_folder' | 'shared_folder' | 'shared_folder_folder',
    delete_resolution: 'unlink'
}

export interface PreDeleteResponse extends KeeperResponse {
    pre_delete_response: {
        pre_delete_token: string,
        would_delete: {
            deletion_summary: string[]
        }
    }
}

export class DeleteCommand extends AuthorizedCommand<DeleteResponse> {
    constructor() {
        super()
        this.command = 'delete'
    }
    pre_delete_token: string
}

export interface DeleteResponse extends KeeperResponse {
    revision: number
}

export class UndeleteRecordCommand extends AuthorizedCommand {
    constructor() {
        super()
        this.command = 'undelete_record'
    }
    record_uid: string
    revision: number
}

export class GetDeletedRecordsCommand extends AuthorizedCommand<GetDeletedRecordsResponse> {

    private client_time: number;

    constructor() {
        super()
        this.command = 'get_deleted_records'
        this.client_time = new Date().getTime()
    }
}

export interface DeletedRecord {
    record_uid: string
    revision: number
    client_modified_time: number
    data: string
    record_key: string
    record_key_type: number
    date_deleted: number
    breach_watch_data?: string
}

export interface GetDeletedRecordsResponse extends KeeperResponse {
    records: DeletedRecord[]
}

export class PurgeDeletedRecordsCommand extends AuthorizedCommand {

    constructor() {
        super()
        this.command = 'purge_deleted_records'
    }
}

export class RecordShareUpdateCommand extends AuthorizedCommand<RecordShareUpdateResponse> {
    constructor() {
        super()
        this.command = 'record_share_update'
    }

    pt: string
    add_shares: ShareObject[]
    update_shares: ShareObject[]
    remove_shares: ShareObject[]
}

export interface ShareObject {
    record_uid: string
    to_username?: string
    record_key?: string // for new shares, url safe base 64 encoded record key encrypted with the sharee's public key
    use_ecc_key?: boolean
    editable?: boolean
    shareable?: boolean
    transfer?: boolean
    shared_folder_uid?: string
    team_uid?: string
}

export interface RecordShareUpdateResponse extends KeeperResponse {
    add_statuses: ShareStatus[]
    update_statuses: ShareStatus[]
    remove_statuses: ShareStatus[]
}

export interface ShareStatus {
    record_uid: string
    status: 'success' | 'pending_accept' | 'user_not_found' | 'already_shared' | 'not_allowed_to_share' | 'access_denied' | 'not_allowed_to_set_permission'
    message: string
    username: string
}

export class FolderAddCommand extends AuthorizedCommand<FolderAddResponse> {
    constructor() {
        super()
        this.command = 'folder_add'
    }

    folder_uid: string
    folder_type: 'user_folder' | 'shared_folder' | 'shared_folder_folder'
    key: string
    parent_uid: string
    shared_folder_uid: string
    name: string
    data: string
    manage_users: boolean
    manage_records: boolean
    can_edit: boolean
    can_share: boolean
    link: boolean
}

export interface FolderAddResponse extends KeeperResponse {
    revision: number
}

export class SharedFolderUpdateCommand extends AuthorizedCommand<SharedFolderUpdateResponse> {
    constructor() {
        super()
        this.command = 'shared_folder_update'
    }

    pt: string
    operation: 'add' | 'delete' | 'update'
    shared_folder_uid: string
    from_team_uid: string
    name: string // encrypted with the shared folder key
    revision: number
    add_users: UserObject[]
    add_teams: TeamObject[]
    add_records: RecordObject[]
    update_users: UserObject[]
    update_teams: TeamObject[]
    update_records: RecordObject[]
    remove_users: UserObject[]
    remove_teams: TeamObject[]
    remove_records: RecordObject[]
    force_update: boolean
    default_manage_users: boolean
    default_manage_records: boolean
    default_can_edit: boolean
    default_can_share: boolean
}

export interface UserObject {
    username: string
    manage_users: boolean
    manage_records: boolean
    shared_folder_key: string
}

export interface TeamObject {
    team_uid: string
    manage_users: boolean
    manage_records: boolean
    shared_folder_key: string
}

export interface RecordObject {
    record_uid: string
    shared_folder_uid: string
    team_uid: string
    can_edit: boolean
    can_share_boolean
}

export interface SharedFolderUpdateResponse extends KeeperResponse {
    add_users: SharedFolderUpdateUserStatus[]
    update_users: SharedFolderUpdateUserStatus[]
    remove_users: SharedFolderUpdateUserStatus[]
    add_records: SharedFolderUpdateRecordStatus[]
    update_records: SharedFolderUpdateRecordStatus[]
    remove_records: SharedFolderUpdateRecordStatus[]
}

export interface SharedFolderUpdateUserStatus {
    username: string
    status: 'success' | 'invited' | 'invalid_user' | 'non_group_member'
}

export interface SharedFolderUpdateRecordStatus {
    username: string
    status: 'success' | 'access_denied'
}

export class PublicKeysCommand extends AuthorizedCommand<PublicKeysResponse> {
    constructor() {
        super()
        this.command = 'public_keys'
    }

    key_owners: string[]
}

export interface PublicKeysResponse extends KeeperResponse {
    public_keys: {
        key_owner: string
        public_key: string
        result_code?: 'bad_inputs_key_owners' | 'Email_not_valid' | 'Failed_to_find_user' | 'missing_public_key' | 'cross_region_sharing_error'
        message: string
    }[]
}

export class GetRecordsCommand extends AuthorizedCommand<GetRecordsResponse> {
    constructor() {
        super()
        this.command = 'get_records'
    }
    include: GetRecordsInclude[]
    records: GetRecordsRecord[]
    client_time: number
}

export type GetRecordsInclude = 'data' | 'shares'

export type GetRecordsRecord = {
    record_uid?: string
    shared_folder_uid?: string
    team_uid?: string
}

export interface GetRecordsResponse extends KeeperResponse {
    records: RecordData[]
}

export class EditUserCommand extends AuthorizedCommand {
    constructor() {
        super()
        this.command = 'edit_user'
    }
    email: string
}

export class SendKeyVerificationCodeCommand extends KeeperCommand {
    constructor() {
        super()
        this.command = 'send_key_verification_code'
    }
    device_id: string
    email: string;
}

export class SetTwoFactorAuthCommand extends AuthorizedCommand<SetTwoFactorAuthResponse> {
    constructor() {
        super()
        this.command = 'set_two_factor_auth'
    }

    version: number;
    channel: TwoFactorChannel;
    channel_value: string;
    device_token_expire_days: number
}

export interface SetTwoFactorAuthResponse extends KeeperResponse {
    device_token: string;
    backup_codes: string[];
    dt_scope: string
}

export class TwoFactorSettingsCommand extends AuthorizedCommand {
    constructor() {
        super()
        this.command = 'two_factor_settings'
    }
}

export class GetPushInfoCommand extends AuthorizedCommand<GetPushInfoResponse> {
    constructor() {
        super()
        this.command = 'get_push_info'
    }

    type: 'USER' | 'DNA' | 'CHAT'
}

export interface GetPushInfoResponse extends KeeperResponse {
    urk: string;
}

export class VerifyUserCommand extends KeeperCommand {
    constructor() {
        super()
        this.command = 'verify_user'
    }

    username: string
    code: string
    requestor: string
}

export type EnterpriseDataInclude =
    | "nodes"
    | "users"
    | "roles"
    | "role_enforcements"
    | "role_privileges"
    | "role_users"
    | "managed_nodes"
    | "managed_companies"
    | "licenses"
    | "team_users"
    | "teams"
    | "role_keys"
    | "role_keys2"
    | "queued_teams"
    | "queued_team_users"
    | "bridges"
    | "scims"
    | "email_provision"
    | "sso_services"
    | "user_privileges"

export type KeyType = "encrypted_by_data_key" | "encrypted_by_public_key" | "no_key"

export class GetEnterpriseDataCommand extends AuthorizedCommand<GetEnterpriseDataResponse> {

    constructor() {
        super()
        this.command = "get_enterprise_data"
    }

    include: EnterpriseDataInclude[];
}

export class GetEnterpriseSettingCommand extends AuthorizedCommand<GetEnterpriseSettingsResponse> {

    constructor() {
        super()
        this.command = "get_enterprise_setting"
    }

    include: EnterpriseSettingInclude[];
}

export interface GetEnterpriseSettingsResponse extends KeeperResponse {
    AuditSyncConfig: any[]
    AuditSyncContext: any[]
    AuditAlertsConfig: any[]
    BackupConfig: any[]
    AuditReportFilter: any[]
    AuditAlertFilter: any[]
    AuditAlertContext: any[]
}

export class EnterpriseUserLockCommand extends AuthorizedCommand {

    constructor() {
        super()
        this.command = "enterprise_user_lock"
    }

    enterprise_user_id: number;
    lock: "locked" | "disabled" | "unlocked";
}

export class EnterpriseNodeToManagedCompanyCommand extends AuthorizedCommand {

    constructor() {
        super()
        this.command = "enterprise_node_to_managed_company"
    }

    managed_company_id: number;
    nodes: Pick<Node, "encrypted_data" | "node_id" | "displayName">[];
    roles: Pick<Role, "encrypted_data" | "role_id" | "displayName">[];
    users: Pick<User, "encrypted_data" | "enterprise_user_id" | "displayName">[];
}

export class EnterpriseAllocateIdsCommand extends AuthorizedCommand<EnterpriseAllocateIdsResponse> {

    constructor() {
        super()
        this.command = "enterprise_allocate_ids"
    }

    number_requested: number = 1;
}

export interface EnterpriseAllocateIdsResponse extends KeeperResponse {
    base_id: number;
    number_allocated: number;
}

export class NodeAddCommand extends AuthorizedCommand {

    constructor(nodeId: number, parentId: number, encryptedData: string) {
        super();
        this.command = "node_add"
        this.node_id = nodeId;
        this.parent_id = parentId;
        this.encrypted_data = encryptedData;
    }

    private node_id: number;
    private parent_id: number;
    private encrypted_data: string;
}

export class RoleAddCommand extends AuthorizedCommand {

    constructor(roleId: number, nodeId: number, encryptedData: string) {
        super();
        this.command = "role_add"
        this.role_id = roleId;
        this.node_id = nodeId;
        this.encrypted_data = encryptedData;
    }

    private role_id: number;
    private node_id: number;
    private encrypted_data: string;

    visible_below: boolean;
    new_user_inherit: boolean;
}

export class TeamAddCommand extends AuthorizedCommand {

    constructor(team_uid: string,
                team_name: string,
                node_id: number,
                public_key: string,
                private_key: string,
                team_key: string,
                encrypted_team_key: string) {
        super();
        this.command = "team_add"
        this.team_uid = team_uid;
        this.team_name = team_name;
        this.node_id = node_id;
        this.public_key = public_key;
        this.private_key = private_key;
        this.team_key = team_key;
        this.encrypted_team_key = encrypted_team_key;
    }

    team_uid: string;
    team_name: string;
    node_id: number;
    public_key: string;
    private_key: string;
    team_key: string;
    encrypted_team_key: string;
    restrict_edit: boolean = false;
    restrict_share: boolean = false;
    restrict_view: boolean = false;
    manage_only: boolean = true;
}

export class EnterpriseUserAddCommand extends AuthorizedCommand<EnterpriseUserAddResponse> {

    constructor(enterprise_user_id: number, email: string, nodeId: number, encryptedData: string) {
        super();
        this.command = "enterprise_user_add"
        this.enterprise_user_id = enterprise_user_id;
        this.enterprise_user_username = email;
        this.node_id = nodeId;
        this.encrypted_data = encryptedData;
    }

    private enterprise_user_id: number;
    private node_id: number;
    private encrypted_data: string;
    private enterprise_user_username: string;
}

export interface EnterpriseUserAddResponse extends KeeperResponse {
    verification_code: string;
}

export class TeamEnterpriseUserAddCommand extends AuthorizedCommand {

    constructor(user_type: number, enterprise_user_id: number, team_uid: string, team_key: string) {
        super();
        this.command = "team_enterprise_user_add"
        this.user_type = user_type;
        this.enterprise_user_id = enterprise_user_id;
        this.team_uid = team_uid;
        this.team_key = team_key;
    }

    private user_type: number;
    private enterprise_user_id: number;
    private team_uid: string;
    private team_key: string;
}

export class TeamEnterpriseUserRemoveCommand extends AuthorizedCommand {

    constructor(enterprise_user_id: number, team_uid: string) {
        super();
        this.command = "team_enterprise_user_remove"
        this.enterprise_user_id = enterprise_user_id;
        this.team_uid = team_uid;
    }

    private enterprise_user_id: number;
    private team_uid: string;
}

export class TeamQueueUserCommand extends AuthorizedCommand {

    constructor(enterprise_user_id: number, team_uid: string) {
        super();
        this.command = "team_queue_user"
        this.enterprise_user_id = enterprise_user_id;
        this.team_uid = team_uid;
    }

    private enterprise_user_id: number;
    private team_uid: string;
}

export class EnterpriseRegistrationByMspCommand extends AuthorizedCommand<EnterpriseRegistrationByMspResponse> {

    constructor() {
        super()
        this.command = "enterprise_registration_by_msp"
    }

    root_node: string;
    role_data: string;
    product_id: string;
    enterprise_name: string;
    node_id: number;
    seats: number;
    encrypted_tree_key: string;
}

export interface EnterpriseRegistrationByMspResponse extends KeeperResponse {
    enterprise_id: number;
}

export class SendInviteCommand extends AuthorizedCommand {

    constructor() {
        super()
        this.command = "send_invite"
    }

    to_email: string[];
}

export class AcceptEnterpriseInviteCommand extends AuthorizedCommand {

    constructor() {
        super()
        this.command = "accept_enterprise_invite"
    }

    verification_code: string;
}

export class ResendEnterpriseInviteCommand extends AuthorizedCommand {

    constructor() {
        super()
        this.command = "resend_enterprise_invite"
    }

    enterprise_user_id: number;
}

export class SsoServiceProviderAddCommand extends AuthorizedCommand {

    constructor() {
        super()
        this.command = "sso_service_provider_add";
    }

    sso_service_provider_id: number;
    node_id: number;
    sp_data_key: string;
    name: string;
    invite_new_users: true;
    is_cloud: true;
}

export class SsoServiceProviderUpdateCommand extends AuthorizedCommand {

    constructor() {
        super()
        this.command = "sso_service_provider_update";
    }

    sso_service_provider_id: number;
    node_id: number;
    sp_data_key: string;
    name: string;
    invite_new_users: true;
    is_cloud: true;
}

export class SsoServiceProviderDeleteCommand extends AuthorizedCommand {

    constructor() {
        super()
        this.command = "sso_service_provider_delete";
    }

    sso_service_provider_id: number;
}

export class GetAuditEventReportsCommand extends AuthorizedCommand<GetAuditEventReportsResponse> {

    constructor() {
        super()
        this.command = "get_audit_event_reports";
    }

    filter: {
        created?: 'today' | 'yesterday' | 'last_7_days' | 'last_30_days' | 'month_to_date' | 'last_month' | 'year_to_date' | 'last_year',
        audit_event_type?: string[]
    }
    limit: number
    order: 'descending' | 'ascending'
    report_type: 'raw' | 'hour' | 'day' | 'week' | 'month' | 'span'
    scope: 'enterprise' | 'user'
    timezone: string
}

export interface GetAuditEventReportsResponse extends KeeperResponse {
    timezone: string;
    audit_event_overview_report_rows: AuditEventOverviewReportRow[];
}

interface AuditEventOverviewReportRow {
    geo_location: string;
    keeper_version_category: string;
    audit_event_type: string;
    created: number;
    keeper_version: string;
    id: number;
    ip_address?: string;
    username: string;
    node_id: number;
    node?: string;
    role_id?: string;
    enforcement?: string;
    value?: string;
}

// *************************
// Responses
// *************************

export interface KeeperHttpResponse {
    statusCode: number;
    headers: any;
    data: Uint8Array;
}

export interface KeeperResponse {
    command: string,
    result: string,
    result_code: string,
    message: string
}

export interface SyncLog {
    countryCode: string;
    ipAddress: string;
    deviceUID: string;
    countryName: string;
    secondsAgo: number;
    deviceName: string;
}

export interface Keys {
    data_key_backup_date: number;
    encrypted_private_key: string;
    encryption_params: string;
    encrypted_data_key: string;
}

export interface License {
    breach_watch_date_created: number;
    account_type: number;
    seconds_until_storage_expiration: number;
    storage_expiration_date: string;
    breach_watch_enabled: boolean;
    breach_watch_scanned: boolean;
    chat_enabled: boolean;
    product_type_id: number;
    bytes_total: number;
    expiration_date: string;
    breach_watch_expiration: number;
    audit_and_reporting_enabled: boolean;
    subscription_code: string;
    breach_watch_feature_disable: boolean;
    max_devices: number;
    bytes_used: number;
    product_type_name: string;
    file_plan_type: number;
    seconds_until_expiration: number;
    has_auto_renewable_appstore_subscriptions: boolean;
}

export interface PasswordRule {
    rule_type: string;
    match: boolean;
    pattern: string;
    description: string;
    minimum: number;
}

export interface Settings {
    security_keys: any[];
    rsa_configured: boolean;
    audit: boolean;
    password_rules: PasswordRule[];
    password_rules_intro: string;
    channel: string;
    theme: string;
    master_password_last_modified: number;
}

export enum LoginResponseResultCode {
    Success = "auth_success",
    AuthExpired = "auth_expired", // session token exists but valid only to change the master password
    AuthExpiredTransfer = "auth_expired_transfer", // session token exists but valid only to accept account transfer
    AuthFailed = "auth_failed",
    RegionRedirect = "region_redirect", // region_host contains the data center to redirect to
    NeedTOTP = "need_totp",
    InvalidTOTP = "invalid_totp",
    InvalidDeviceToken = "invalid_device_token",
    InvalidBackupCode = "invalid_backup_code",
    FailedSending = "failed_sending",  // Keeper server failed to send the 2fa
    NotEnrolled = "not_enrolled",      // not enrolled in the set two factor channel
    Throttled = "throttled",   // too many requests per minute
    AccountLocked = "account_locked",
    NotAuthorized = "not_authorized", // trying to perform admin operations as a regular user
    VersionIncompatible = "version_incompatible", // client version is incompatible with the command
    IPAddressNotAllowed = "ip_address_not_allowed",
    RestrictedClientType = "restricted_client_type"
    // there are a few more obscure ones, see https://keeper.atlassian.net/wiki/spaces/KA/pages/8028335/login
}

type TwoFactorChannel = "two_factor_disabled" | "two_factor_channel_sms" | "two_factor_channel_voice" | "two_factor_channel_email"
    | "two_factor_channel_google" | "two_factor_channel_rsa" | "two_factor_channel_push" | "two_factor_channel_duo"
    | "two_factor_channel_u2f" | "two_factor_channel_security_keys"

export interface LoginResponse extends KeeperResponse {
    session_token: string
    client_key: string;
    settings: Settings;
    is_enterprise_admin: boolean;
    license: License;
    result_code: LoginResponseResultCode;
    region_host?: string;
    keys: Keys;
    sync_log: SyncLog[];
    enforcements: any;
    capabilities: string[];
    phone: string;
    channel: TwoFactorChannel;
    url: string;
    u2f_challenge?: string | U2FChallenge;
}

export interface U2FChallenge {
    authenticateRequests: AuthenticateRequest[]
}

export interface AuthenticateRequest {
    challenge: string;
    appId: string;
    keyHandle: string;
    version: string;
}

export interface GetEnterpriseDataResponse extends KeeperResponse {
    enterprise_name: string;
    tree_key: string;
    key_type_id: number;
    nodes: Node[];
    roles: Role[];
    users: User[];
    teams: CompanyTeam[];
    team_users: TeamUser[];
    role_users: RoleUser[];
    managed_nodes: ManagedNode[];
    role_privileges: RolePrivilege[];
    user_privileges: UserPrivileges;
    role_enforcements: RoleEnforcement[];
    licenses: EnterpriseLicense[];
    role_keys: RoleKey[];
    role_keys2: RoleKeys2[];
    sso_services: SsoService[];
    queued_team_users: QueuedTeamUser[];
    bridges: Bridge[];
    scims?: SCIM[];
    email_provision?: EmailProvision[];
    msp_key?: MSPKey;
    managed_companies?: ManagedCompany[];
}

export interface UserPrivileges {
    enterprise_user_id: number;
    managed_nodes: ManagedNode[];
    encrypted_data: string;
}

export interface ManagedNode {
    node: number;
    privileges: string[];
    cascade_management: boolean;
    role_id: number;
    cascade_node_management: boolean;
    managed_node_id: number;
}

export interface User {
    displayName?: string;
    key_type: KeyType;
    user_id?: number;
    lock: number;
    enterprise_user_id: number;
    node_id: number;
    encrypted_data: string;
    username: string;
    status: "active" | "invited";
    account_share_expiration?: number;
    roles?: Role[];
    teams?: CompanyTeam[];
}

export interface Role {
    displayName?: string;
    visible_below: boolean;
    new_user_inherit: boolean;
    role_id: number;
    node_id: number;
    encrypted_data: string;
    key_type: KeyType;
    role_type: "pool_manager" | undefined
}

export interface Node {
    rsa_enabled: boolean;
    duo_enabled: boolean;
    license_id: number;
    node_id: number;
    encrypted_data: string;
    parent_id?: number;
    sso_service_provider_id?: number;
    scim_id?: number;

    displayName?: string;
    nodes?: Node[];
    roles?: Role[];
    teams?: CompanyTeam[];
    users?: User[];
}

export interface ManagedCompany {
    mc_enterprise_name: string;
    mc_enterprise_id: number;
    msp_node_id: number;
    tree_key: string;
    product_id: string;
    number_of_users: number;
    number_of_seats: number;
    paused: boolean;
}

export interface RolePrivilege {
    role_id: number;
    managed_node_id: number;
    privilege: string;
}

export interface RoleEnforcement {
    enforcements: Enforcements;
    role_id: number;
}

export interface Enforcements {
    restrict_two_factor_channel_dna?: boolean;
    master_password_minimum_lower?: number;
    master_password_minimum_upper?: number;
    restrict_android_fingerprint?: boolean;
    restrict_two_factor_channel_text?: boolean;
    require_account_share?: number;
    master_password_minimum_length: number;
    master_password_minimum_special?: number;
    master_password_minimum_digits?: number;
}

export interface RoleUser {
    role_id: number;
    enterprise_user_id: number;
}

export interface RoleKey {
    key_type: KeyType;
    role_id: number;
    encrypted_key: string;
}

export interface EnterpriseLicense {
    file_plan: number;
    storage_expiration_date: string;
    product_type_id: number;
    license_key_id: number;
    tier: number;
    lic_status: 'business' | 'business_trial' | 'enterprise' | 'msp' | 'msp_trial' | 'mc_business' | 'mc_business_plus' | 'mc_enterprise' | 'mc_enterprise_plus';
    paid: boolean;
    name: string;
    seats_pending: number;
    max_gb: number;
    add_ons: AddOn[];
    expiration: string;
    seats_allocated: number;
    number_of_seats: number;
    enterprise_license_id: number;
    msp_pool? : MSPProductLicense[];
}

export interface MSPProductLicense {
    product_id: "business" | "businessPlus" | "enterprise" | "enterprisePlus";
    seats: number;
    availableSeats: number;
}

export interface AddOn {
    chat_isTrial?: boolean;
    chat_enabled?: boolean;
    chat_expiration?: number;
    chat_created?: number;
    enterprise_audit_and_reporting_isTrial?: boolean;
    enterprise_audit_and_reporting_expiration?: number;
    enterprise_audit_and_reporting_created?: number;
    enterprise_audit_and_reporting_enabled?: boolean;
    onboarding_and_certificate_isTrial?: boolean;
    onboarding_and_certificate_created?: number;
    onboarding_and_certificate_expiration?: number;
    onboarding_and_certificate_enabled?: boolean;
}

export interface TeamUser {
    user_type: number;
    enterprise_user_id: number;
    team_uid: string;
}

export interface CompanyTeam {
    restrict_sharing: boolean;
    restrict_edit: boolean;
    name: string;
    encrypted_team_key: string;
    restrict_view: boolean;
    team_uid: string;
    node_id: number;
    encrypted_data?: string;
}

export interface Bridge {
    bridge_id: number;
    node_id: number;
    status: string;
}

export interface SCIM {
    scim_id: number;
    node_id: number;
    status: string;
    last_synced: number;
}

export interface EmailProvision {
    id: number;
    node_id: number;
    domain: string;
    method: string;
}

export interface QueuedTeamUser {
    team_uid: string;
    users: number[];
}

export interface SsoService {
    invite_new_users: boolean;
    sso_service_provider_id: number;
    name: string;
    sp_url: string;
    active: boolean;
    node_id: number;
}

export interface RoleKeys2 {
    role_id: number;
    role_key: string;
}

export interface MSPKey {
    encrypted_msp_tree_key: string;
    encrypted_msp_tree_key_type: KeyType;
}
*/

export class KeeperCommand<Response extends KeeperResponse = KeeperResponse> {
    command: string;
    username: string;
    client_version: string;
    response: Response
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
    version: number;
    auth_response: string;
    include: AccountDataInclude[];
    enterprise_id?: number; // for logging into managed company
}

export class AuthorizedCommand<Response extends KeeperResponse = KeeperResponse> extends KeeperCommand<Response> {
    session_token: string;
    device_id: string
}

export class AccountSummaryCommand extends AuthorizedCommand<KeeperResponse> {
    include: AccountDataInclude[]
}

// Currently the * items are included by default. If the item explicit is included, then only the items listed will be included.
type SyncDataInclude =
    | "record"               //*
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
    revision: number;
    include: SyncDataInclude[];
    client_time: number
}

export class RecordAddCommand extends AuthorizedCommand {
    record_uid: string;
    record_key: string;
    record_type: string;
    folder_type: string;
    how_long_ago: number;
    folder_uid: string;
    folder_key: string;
    data: string;
    extra: string;
    non_shared_data: string;
    file_ids: string[];
}

export class RecordUpdateCommand extends AuthorizedCommand {
    pt: string;
    client_time: number;
    add_records: RecordUpdateRecord[];
    update_records: RecordUpdateRecord[];
    remove_records: string[];
    delete_records: string[];
}

export interface RecordUpdateRecord {
    record_uid: string;
    record_key: string;
    data: string;
    extra: string;
    udata: any;
    revision: number;
    version: number;
    client_modified_time: number;
    shared_folder_id: string;
    team_uid: string;
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
    include: EnterpriseDataInclude[];
}

export class EnterpriseUserLockCommand extends AuthorizedCommand {
    enterprise_user_id: number;
    lock: "locked" | "disabled" | "unlocked";
}

export class EnterpriseNodeToManagedCompanyCommand extends AuthorizedCommand {
    managed_company_id: number;
    nodes: Pick<Node, "encrypted_data" | "node_id" | "displayName">[];
    roles: Pick<Role, "encrypted_data" | "role_id" | "displayName">[];
    users: Pick<User, "encrypted_data" | "enterprise_user_id" | "displayName">[];
}

export class EnterpriseAllocateIdsCommand extends AuthorizedCommand<EnterpriseAllocateIdsResponse> {
    number_requested: number = 1;
}

export interface EnterpriseAllocateIdsResponse extends KeeperResponse {
    base_id: number;
    number_allocated: number;
}

export class NodeAddCommand extends AuthorizedCommand {

    constructor(nodeId: number, parentId: number, encryptedData: string) {
        super();
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

export class EnterpriseRegistrationByMspCommand extends AuthorizedCommand<EnterpriseRegistrationByMspResponse> {
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

export class AcceptEnterpriseInviteCommand extends AuthorizedCommand {
    verification_code: string;
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

export interface SharedFolder {
    default_can_edit: boolean;
    full_sync: boolean;
    default_can_share: boolean;
    default_manage_records: boolean;
    default_manage_users: boolean;
    shared_folder_uid: string;
    revision: number;
}

export interface Team {
    restrict_edit: boolean;
    team_private_key: string;
    name: string;
    team_key_type: number;
    restrict_view: boolean;
    team_key: string;
    shared_folder_keys: any[];
    team_uid: string;
    restrict_share: boolean;
}

export interface Record {
    record_uid: string;
    shared: boolean;
    data: string;
    client_modified_time: number;
    version: number;
    revision: number;
}

export interface RecordMetaData {
    record_uid: string;
    owner: boolean;
    record_key: string;
    can_share: boolean;
    can_edit: boolean;
    record_key_type: number;
}

export interface SyncResponse extends KeeperResponse {
    full_sync: boolean;
    teams: Team[];
    shared_folders: SharedFolder[];
    records: Record[];
    record_meta_data: RecordMetaData[];
    result_code: string;
    revision: number;
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
    managed_companies?: ManagedCompany[];
    msp_key?: MSPKey;
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
    lic_status: string;
    paid: boolean;
    name: string;
    seats_pending: number;
    max_gb: number;
    add_ons: AddOn[];
    expiration: string;
    seats_allocated: number;
    number_of_seats: number;
    enterprise_license_id: number;
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

export class KeeperCommand {
    command: string;
    username: string;
    client_version: string;
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

export class LoginCommand extends KeeperCommand {
    version: number;
    auth_response: string;
    include: AccountDataInclude[];
}

export class AuthorizedCommand extends KeeperCommand {
    session_token: string;
    device_id: string
}

export class AccountSummaryCommand extends AuthorizedCommand {
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

export class SyncDownCommand extends AuthorizedCommand {
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

export class GetEnterpriseDataCommand extends AuthorizedCommand {
    include: EnterpriseDataInclude[];
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

export interface LoginResponse extends KeeperResponse {
    session_token: string
    client_key: string;
    settings: Settings;
    is_enterprise_admin: boolean;
    license: License;
    keys: Keys;
    sync_log: SyncLog[];
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
    scims: SCIM[];
}

interface UserPrivileges {
    enterprise_user_id: number;
    managed_nodes: ManagedNode[];
    encrypted_data: string;
}

interface ManagedNode {
    node: number;
    privileges: string[];
    cascade_management: boolean;
    role_id: number;
    cascade_node_management: boolean;
    managed_node_id: number;
}

interface User {
    key_type: string;
    user_id?: number;
    lock: number;
    enterprise_user_id: number;
    node_id: number;
    encrypted_data: string;
    username: string;
    status: string;
    account_share_expiration?: number;
}

interface Role {
    visible_below: boolean;
    new_user_inherit: boolean;
    role_id: number;
    node_id: number;
    encrypted_data: string;
}

interface Node {
    rsa_enabled: boolean;
    duo_enabled: boolean;
    license_id: number;
    node_id: number;
    encrypted_data: string;
    parent_id?: number;
    sso_service_provider_id?: number;
    scim_id?: number;
}

interface RolePrivilege {
    role_id: number;
    managed_node_id: number;
    privilege: string;
}

interface RoleEnforcement {
    enforcements: Enforcements;
    role_id: number;
}

interface Enforcements {
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

interface RoleUser {
    role_id: number;
    enterprise_user_id: number;
}

interface RoleKey {
    key_type: string;
    role_id: number;
    encrypted_key: string;
}

interface EnterpriseLicense {
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


interface AddOn {
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

interface TeamUser {
    user_type: number;
    enterprise_user_id: number;
    team_uid: string;
}

interface CompanyTeam {
    restrict_sharing: boolean;
    restrict_edit: boolean;
    name: string;
    encrypted_team_key: string;
    restrict_view: boolean;
    team_uid: string;
    node_id: number;
    encrypted_data?: string;
}

interface SCIM {
    scim_id: number;
    last_synced: number;
    node_id: number;
    status: string;
}

interface QueuedTeamUser {
    team_uid: string;
    users: number[];
}

interface SsoService {
    invite_new_users: boolean;
    sso_service_provider_id: number;
    name: string;
    sp_url: string;
    active: boolean;
    node_id: number;
}

interface RoleKeys2 {
    role_id: number;
    role_key: string;
}

interface Userprivileges {
    enterprise_user_id: number;
    managed_nodes: Managednode[];
    encrypted_data: string;
}

interface Managednode {
    node: number;
    privileges: string[];
    cascade_management: boolean;
}

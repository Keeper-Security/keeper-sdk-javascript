export class KeeperCommand {
    public command: string;
    public username: string;
    public client_version: string;
}

export class LoginCommand extends KeeperCommand {
    version: number;
    auth_response: string;
    include: string[];
}

export class AuthorizedCommand extends KeeperCommand {
    session_token: string;
    device_id: string
}

export class SyncDownCommand extends AuthorizedCommand {
    revision: number;
    include: string[];
    client_time: number
}

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
    result_code: string;
    message: string;
    sync_log: SyncLog[];
    command: string;
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
    result: string;
    full_sync: boolean;
    teams: Team[];
    shared_folders: SharedFolder[];
    records: Record[];
    record_meta_data: RecordMetaData[];
    result_code: string;
    message: string;
    command: string;
    revision: number;
}

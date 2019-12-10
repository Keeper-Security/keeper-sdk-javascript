import {Auth} from "./auth";
import {
    EnterpriseAllocateIdsCommand,
    EnterpriseDataInclude,
    GetEnterpriseDataCommand,
    GetEnterpriseDataResponse,
    NodeAddCommand,
    RoleAddCommand,
    TeamAddCommand,
    EnterpriseUserAddCommand
} from "./commands";
import {
    decryptFromStorage,
    decryptObjectFromStorage,
    encryptForStorage,
    encryptObjectForStorage,
    encryptKey,
    decryptKey,
    generateUid,
    generateEncryptionKey,
    webSafe64FromBytes
} from "./utils";
import {platform} from "./platform";

export class Company {

    private _data: GetEnterpriseDataResponse;
    private treeKey: Uint8Array;

    constructor(private auth: Auth) {
    }

    async load(include: EnterpriseDataInclude[]) {
        let getEnterpriseDataCommand = new GetEnterpriseDataCommand();
        getEnterpriseDataCommand.include = include;

        this._data = await this.auth.executeCommand(getEnterpriseDataCommand);

        if (this._data.msp_key) {
            let key4TreeKey = decryptFromStorage(this._data.msp_key.encrypted_msp_tree_key, this.auth.dataKey);
            this.treeKey = await decryptKey(this._data.tree_key, key4TreeKey);
        } else {
            this.treeKey = decryptFromStorage(this._data.tree_key, this.auth.dataKey);
        }

        if (!this._data.roles)
            this._data.roles = [];
        if (!this._data.teams)
            this._data.teams = [];
        if (!this._data.users)
            this._data.users = [];

        for (let node of this._data.nodes) {
            node.displayName = decryptObjectFromStorage<EncryptedData>(node.encrypted_data, this.treeKey).displayname;
            if (node.parent_id) {
                let parent = this._data.nodes.find(x => x.node_id == node.parent_id);
                if (!parent.nodes) {
                    parent.nodes = []
                }
                parent.nodes.push(node);
            }
        }

        for (let role of this._data.roles) {
            role.displayName = role.role_type === "pool_manager"
                ? "License Purchaser"
                : decryptObjectFromStorage<EncryptedData>(role.encrypted_data, this.treeKey).displayname;
            let node = this._data.nodes.find(x => x.node_id == role.node_id);
            if (!node.roles) {
                node.roles = []
            }
            node.roles.push(role);
        }

        for (let team of this._data.teams) {
            let node = this._data.nodes.find(x => x.node_id == team.node_id);
            if (!node.teams) {
                node.teams = []
            }
            node.teams.push(team);
        }

        for (let user of this._data.users) {
            switch (user.key_type) {
                case "encrypted_by_data_key":
                    user.displayName = decryptObjectFromStorage<EncryptedData>(user.encrypted_data, this.treeKey).displayname;
                    break;
                case "encrypted_by_public_key":
                    throw "Not Implemented";
                case "no_key":
                    user.displayName = user.encrypted_data;
                    break;
            }
            let node = this._data.nodes.find(x => x.node_id == user.node_id);
            if (!node.users) {
                node.users = []
            }
            for (let user_role of this._data.role_users) {
                if (user_role.enterprise_user_id == user.enterprise_user_id) {
                    if (!user.roles) {
                        user.roles = []
                    }
                    user.roles.push(this._data.roles.find(x => x.role_id === user_role.role_id))
                }
            }
            for (let user_team of this._data.team_users || []) {
                if (user_team.enterprise_user_id == user.enterprise_user_id) {
                    if (!user.teams) {
                        user.teams = []
                    }
                    user.teams.push(this._data.teams.find(x => x.team_uid === user_team.team_uid))
                }
            }
            node.users.push(user);
        }
    }

    get data(): GetEnterpriseDataResponse {
        return this._data;
    }

    encryptDisplayName(displayName: string): string {
        return encryptObjectForStorage<EncryptedData>({
            displayname: displayName
        }, this.treeKey);
    }

    encryptForStorage(data: Uint8Array): string {
        return encryptForStorage(data, this.treeKey);
    }

    async encryptKey(key: Uint8Array): Promise<string> {
        return encryptKey(key, this.treeKey);
    }

    async decryptKey(encryptedKey: string): Promise<Uint8Array> {
        return decryptKey(encryptedKey, this.treeKey);
    }

    async allocateIDs(count: number): Promise<number> {
        let allocateCommand = new EnterpriseAllocateIdsCommand();
        allocateCommand.number_requested = count;
        let response = await this.auth.executeCommand(allocateCommand);
        return response.base_id;
    }

    async addNode(parentNodeId: number, nodeName: string): Promise<number> {
        let nodeId = await this.allocateIDs(1);
        let nodeAddCommand = new NodeAddCommand(nodeId, parentNodeId, this.encryptDisplayName(nodeName));
        let response = await this.auth.executeCommand(nodeAddCommand);
        return nodeId;
    }

    async addRole(nodeId: number, roleName: string): Promise<number> {
        let roleId = await this.allocateIDs(1);
        let roleAddCommand = new RoleAddCommand(roleId, nodeId, this.encryptDisplayName(roleName));
        let response = await this.auth.executeCommand(roleAddCommand);
        return roleId;
    }

    async addTeam(nodeId: number, teamName: string) {
        let teamUid = generateUid();
        let teamKeyBytes = generateEncryptionKey();
        let {privateKey, publicKey} = await platform.generateRSAKeyPair();
        let publicKey64 = webSafe64FromBytes(publicKey);
        let encryptedPrivateKey = encryptForStorage(privateKey, teamKeyBytes);
        let teamKey = encryptForStorage(teamKeyBytes, this.auth.dataKey);
        let encryptedTeamKey = await this.encryptKey(teamKeyBytes);
        let teamAddCommand = new TeamAddCommand(teamUid, teamName, nodeId, publicKey64, encryptedPrivateKey, teamKey, encryptedTeamKey);
        let response = await this.auth.executeCommand(teamAddCommand);
    }

    async addUser(nodeId: number, email: string, userName: string): Promise<{userId: number; verification_code: string}> {
        let userId = await this.allocateIDs(1);
        let userAddCommand = new EnterpriseUserAddCommand(userId, email, nodeId, this.encryptDisplayName(userName));
        let response = await this.auth.executeCommand(userAddCommand);
        let verification_code = response.verification_code;
        return {userId, verification_code};
    }
}

export type EncryptedData = {displayname: string}

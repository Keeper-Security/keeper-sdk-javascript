import {
    Auth,
    Vault,
    Company,
    Node,
    Role,
    User,
    EnterpriseNodeToManagedCompanyCommand,
    EnterpriseRegistrationByMspCommand,
    encryptObjectForStorage,
    EncryptedData,
    generateEncryptionKey,
} from "keeperapi";

export function flatMap<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U[]): U[] {
    return Array.prototype.concat(...array.map(callbackfn));
}

function getNodes(node: Node): Node[] {
    return [node, ...node.nodes ? flatMap(node.nodes!, getNodes) : []];
}

function getNodeRoles(node: Node): Role[] {
    return [...(node.roles || []), ...node.nodes ? flatMap(node.nodes!, getNodeRoles) : []];
}

function getNodeUsers(node: Node): User[] {
    return [...(node.users || []), ...node.nodes ? flatMap(node.nodes!, getNodeUsers) : []];
}

export class Keeper {

    static auth: Auth;
    private static authPassword: string;

    static async login(user: string, password: string) {
        this.auth = new Auth({
            host: "local.keepersecurity.com"
        });
        await this.auth.login(user, password);
        this.authPassword = password;
    }

    static async fetchVault(): Promise<Vault> {
        let vault = new Vault(this.auth);
        await vault.syncDown();
        return vault;
    }

    static async fetchCompany(): Promise<Company> {
        let company = new Company(this.auth);
        await company.load(["nodes", "users", "roles", "teams", "managed_companies"]);
        return company;
    }

    static encryptDisplayName(displayName: string, key: Uint8Array): string {
        return encryptObjectForStorage<EncryptedData>({
            displayname: displayName
        }, key);
    }

    static async convertNode(node: Node, company: Company): Promise<string> {
        let nodes = getNodes(node);
        let roles = getNodeRoles(node);
        let users = getNodeUsers(node);

        let pendingUsers = users.filter(x => x.status === "invited");
        if (pendingUsers.length > 0)
            throw `Pending users must be removed: ${pendingUsers.map(x => x.username).join()}`;

        // let {companyId, treeKey} = await this.addManagedCompany(node.displayName!, company);
        let managedCompany = company.data.managed_companies![0];
        let companyId = managedCompany.mc_enterprise_id;
        let treeKey = await company.decryptKey(managedCompany.tree_key);

        let command = new EnterpriseNodeToManagedCompanyCommand();

        command.managed_company_id = companyId;

        command.nodes = nodes.map(x => {
            return {
                displayName: x.displayName,
                encrypted_data: this.encryptDisplayName(x.displayName || "?", treeKey),
                node_id: x.node_id
            }
        });
        command.roles = roles.map(x => {
            return {
                displayName: x.displayName,
                encrypted_data: this.encryptDisplayName(x.displayName || "?", treeKey),
                role_id: x.role_id
            }
        });
        command.users = users.map(x => {
            let displayName = x.displayName || "?";
            let encryptedData = x.key_type === "no_key"
                ? displayName
                : this.encryptDisplayName(displayName, treeKey);
            return {
                displayName: x.displayName,
                encrypted_data: encryptedData,
                enterprise_user_id: x.enterprise_user_id
            }
        });
        let resp = await this.auth.executeCommand(command);
        console.log(resp);
        return "done";
    }

    static async addTestNodeNode(nodeName: string, company: Company) {
        let nodeId = await company.addNode(company.data.nodes[0].node_id, nodeName);
        let subNode1 = await company.addNode(nodeId, nodeName + "_1");
        let subNode2 = await company.addNode(nodeId, nodeName + "_2");
        await company.addRole(nodeId, "Role " + nodeName);
        await company.addRole(subNode1, "Role " + nodeName + "_1");
        await company.addRole(subNode2, "Role " + nodeName + "_2");
        await company.addUser(nodeId, `admin+${nodeName.toLowerCase()}u1@yozik.us`, "User 1");
        await company.addUser(subNode1, `admin+${nodeName.toLowerCase()}u2@yozik.us`, "User 2");
        await company.addUser(subNode2, `admin+${nodeName.toLowerCase()}u3@yozik.us`, "User 3");
    }

    static async addManagedCompany(companyName: string, company: Company): Promise<{companyId: number; treeKey: Uint8Array}> {

        let command = new EnterpriseRegistrationByMspCommand();

        let treeKey = generateEncryptionKey();

        command.encrypted_tree_key = await company.encryptKey(treeKey);
        command.enterprise_name = companyName;
        command.root_node = this.encryptDisplayName("root", treeKey);
        command.role_data = this.encryptDisplayName("Keeper Administrator", treeKey);
        command.product_id = "business"; // TODO select plan
        command.node_id = company.data.nodes[0].node_id; // TODO select node
        command.seats = 0;

        let resp = await this.auth.executeCommand(command);
        return {
            companyId: resp.enterprise_id,
            treeKey: treeKey
        };
    }

    static async loadManagedCompany(managedCompanyId: number, company: Company) {
        let auth = new Auth({
            host: "local.keepersecurity.com"
        });
        await auth.managedCompanyLogin(this.auth.username, this.authPassword, managedCompanyId);
        let mc = new Company(auth);
        debugger
        await mc.load(["nodes", "users", "roles", "teams"]);
        console.log(mc);
    }
}



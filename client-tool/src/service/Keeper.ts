import {Auth, KeeperEnvironment, Vault, Company, Node, Role, User, EnterpriseNodeToManagedCompanyCommand, KeeperResponse} from "keeperapi";

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

    static async login(user: string, password: string) {
        this.auth = new Auth({
            host: "local.keepersecurity.com"
        });
        await this.auth.login(user, password);
    }

    static async fetchVault(): Promise<Vault> {
        let vault = new Vault(this.auth);
        await vault.syncDown();
        return vault;
    }

    static async fetchCompany(): Promise<Company> {
        let company = new Company(this.auth);
        await company.load(["nodes", "users", "roles", "teams"]);
        return company;
    }

    static async convertNode(node: Node, company: Company): Promise<string> {

        let targetAuth = new Auth({
            host: "local.keepersecurity.com"
        });
        await targetAuth.login("admin+mc@yozik.us", "111111");
        let targetCompany = new Company(targetAuth);
        await targetCompany.load(["nodes", "users", "roles", "teams"]);
        console.log(targetCompany);

        let nodes = getNodes(node);
        let roles = getNodeRoles(node);
        let users = getNodeUsers(node);
        console.log(nodes);
        console.log(roles);

        let command = new EnterpriseNodeToManagedCompanyCommand();
        command.managed_company_id = 2395;
        command.nodes = nodes.map(x => {
            return {
                displayName: x.displayName,
                encrypted_data: targetCompany.encryptDisplayName(x.displayName || "?"),
                node_id: x.node_id
            }
        });
        command.roles = roles.map(x => {
            return {
                displayName: x.displayName,
                encrypted_data: targetCompany.encryptDisplayName(x.displayName || "?"),
                role_id: x.role_id
            }
        });
        command.users = users.map(x => {
            let displayName = x.displayName || "?";
            let encryptedData = x.key_type === "no_key"
                ? displayName
                : targetCompany.encryptDisplayName(displayName);
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

    static async addTestNodeNode(company: Company) {
        console.log("TEST")
    }
}



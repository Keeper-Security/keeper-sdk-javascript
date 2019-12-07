import {
    Auth,
    AuthUI,
    Company,
    CompanyTeam,
    EncryptedData,
    encryptObjectForStorage,
    EnterpriseNodeToManagedCompanyCommand,
    EnterpriseRegistrationByMspCommand,
    generateEncryptionKey,
    KeeperEnvironment,
    Node,
    Role,
    User,
    Vault
} from "keeperapi";
import {Subject} from "rxjs";
import {take} from "rxjs/operators";

export function flatMap<T, U>(array: T[] | undefined, callbackfn: (value: T, index: number, array: T[]) => U[]): U[] {
    return array ? Array.prototype.concat(...array.map(callbackfn)) : [];
}

export function getNodes(node: Node): Node[] {
    return [node, ...flatMap(node.nodes, getNodes)];
}

export function getNodeRoles(node: Node): Role[] {
    return [...(node.roles || []), ...flatMap(node.nodes, getNodeRoles)];
}

export function getNodeUsers(node: Node): User[] {
    return [...(node.users || []), ...flatMap(node.nodes, getNodeUsers)];
}

export function getNodeTeams(node: Node): CompanyTeam[] {
    return [...(node.teams || []), ...flatMap(node.nodes, getNodeTeams)];
}

class AuthUIConnect implements AuthUI {

    secondFactor: Subject<string> = new Subject<string>();

    authComponent?: AuthUIComponent;

    async displayDialog(): Promise<boolean> {
        return true;
    }

    getTwoFactorCode(errorMessage?: string): Promise<string> {
        if (this.authComponent) {
            this.authComponent.prompt2FA(errorMessage);
            return this.secondFactor.pipe(take(1)).toPromise();
        }
        else
            throw "UI callback for 2fa is not registered";
    }
}

export interface AuthUIComponent {
    prompt2FA(errorMessage?: string): void
}

export class Keeper {

    static auth: Auth;
    private static authPassword: string;
    private static authUIConnect: AuthUIConnect = new AuthUIConnect();

    static registerAuthComponent(authComponent: AuthUIComponent) {
        this.authUIConnect.authComponent = authComponent;
    }

    static unRegisterAuthComponent() {
        this.authUIConnect.authComponent = undefined;
    }

    static submitSecondFactor(code: string) {
        this.authUIConnect.secondFactor.next(code);
    }

    static async login(user: string, password: string) {
        this.auth = new Auth({
            host: KeeperEnvironment.DEV
            // host: "local.keepersecurity.com",
        }, this.authUIConnect);
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
        await company.load(["nodes", "users", "roles", "teams", "role_users", "team_users",
            "managed_nodes", "managed_companies", "bridges", "scims", "email_provision", "sso_services"
        ]);
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
        let teams = getNodeTeams(node);
        let users = getNodeUsers(node);

        // perform validations
        let allNodes = getNodes(company.data.nodes[0]);
        let outsideNodes = allNodes.filter(x => !nodes.includes(x));
        let allRoles = getNodeRoles(company.data.nodes[0]);
        let outsideRoles = allRoles.filter(x => !roles.includes(x));
        let allTeams = getNodeTeams(company.data.nodes[0]);
        let outsideTeams = allTeams.filter(x => !teams.includes(x));
        let allUsers = getNodeUsers(company.data.nodes[0]);
        let outsideUsers = allUsers.filter(x => !users.includes(x));

        let errors = [];

        for (let node of nodes) {
            if (company.data.bridges && company.data.bridges.find(x => x.node_id === node.node_id)) {
                errors.push("Remove bridge provisioning before conversion");
            }
            if (company.data.scims && company.data.scims.find(x => x.node_id === node.node_id)) {
                errors.push("Remove SCIM provisioning before conversion");
            }
            if (company.data.email_provision && company.data.email_provision.find(x => x.node_id === node.node_id)) {
                errors.push("Remove email provisioning before conversion");
            }
            if (company.data.managed_companies && company.data.managed_companies.find(x => x.msp_node_id === node.node_id)) {
                errors.push("Remove managed companies before conversion");
            }
        }

        let pendingUsers = users.filter(x => x.status === "invited");
        if (pendingUsers.length > 0)
            errors.push(`Pending users must be removed: ${pendingUsers.map(x => x.username).join()}`);

        for (let user of users) {
            if (user.roles) {
                let outRoles = user.roles!.filter(x => outsideRoles.includes(x));
                if (outRoles.length > 0) {
                    errors.push(`User ${user.username} belongs to the following outside roles: ${outRoles.map(x => x.displayName).join()}`);
                }
            }
            if (user.teams) {
                let outTeams = user.teams!.filter(x => outsideTeams.includes(x));
                if (outTeams.length > 0) {
                    errors.push(`User ${user.username} belongs to the following outside teams: ${outTeams.map(x => x.name).join()}`);
                }
            }
        }

        function userIsInRole(user: User, role: Role) {
            return user.roles && user.roles.includes(role);
        }

        function nodeIsManagedBy(node: Node, role: Role) {
            return company.data.managed_nodes.find(x => x.managed_node_id === node.node_id && x.role_id === role.role_id);
        }

        for (let role of roles) {
            let outUsers = outsideUsers.filter(x => userIsInRole(x, role));
            if (outUsers.length > 0) {
                errors.push(`Role ${role.displayName} contains the following outside users: ${outUsers.map(x => x.username).join()}`);
            }

            let outNodes = outsideNodes.filter(x => nodeIsManagedBy(x, role));
            if (outUsers.length > 0) {
                errors.push(`Role ${role.displayName} manages the following outside nodes: ${outNodes.map(x => x.displayName).join()}`);
            }
        }

        function userIsInTeam(user: User, team: CompanyTeam) {
            return user.teams && user.teams.includes(team);
        }

        for (let team of teams) {
            let outUsers = outsideUsers.filter(x => userIsInTeam(x, team));
            if (outUsers.length > 0) {
                errors.push(`Team ${team.name} contains the following outside users: ${outUsers.map(x => x.username).join()}`);
            }
        }

        if (errors.length > 0)
            throw errors.join("<br/>");

        let {companyId, treeKey} = await this.addManagedCompany(node.displayName!, company);
        // let managedCompany = company.data.managed_companies![company.data.managed_companies!.length - 1];
        // let companyId = managedCompany.mc_enterprise_id;
        // let treeKey = await company.decryptKey(managedCompany.tree_key);

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

        await company.addTeam(nodeId, "Team " + nodeName);
        await company.addTeam(subNode1, "Team " + nodeName + "_1");
        await company.addTeam(subNode2, "Team " + nodeName + "_2");

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
        await mc.load(["nodes", "users", "roles", "teams"]);
        console.log(mc);
    }
}



import {AuthContext, KeeperEnvironment, Vault} from "keeperapi";

export class Keeper {

    static auth: AuthContext;

    static async login(user: string, password: string) {
        this.auth = new AuthContext({
            username: user,
            password: password,
            host: KeeperEnvironment.DEV
        });
        await this.auth.login();
    }

    static async fetchVault(): Promise<Vault> {
        let vault = new Vault(this.auth);
        await vault.syncDown();
        return vault;
    }
}



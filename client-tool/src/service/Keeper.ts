import {Auth, KeeperEnvironment, Vault} from "keeperapi";

export class Keeper {

    static auth: Auth;

    static async login(user: string, password: string) {
        this.auth = new Auth({
            host: KeeperEnvironment.DEV
        });
        await this.auth.login(user, password);
    }

    static async fetchVault(): Promise<Vault> {
        let vault = new Vault(this.auth);
        await vault.syncDown();
        return vault;
    }
}



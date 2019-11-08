import {AuthContext, KeeperEnvironment} from "keeperapi";

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
}



import {Auth, AuthUI, KeeperEnvironment, Vault} from "keeperapi";
import * as readline from "readline";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let authUI: AuthUI = {
    displayDialog(): Promise<boolean> {
        return null
    },
    getTwoFactorCode(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question("Enter Code: ", code => {
                resolve(code);
                rl.close();
            });
        });
    }
};

async function printVault(username: string, password: string) {
    try {
        let auth = new Auth({
            host: KeeperEnvironment.DEV
        }, authUI);
        await auth.login(username, password);
        console.log("login successful");
        let vault = new Vault(auth);
        await vault.syncDown();
        vault.records.forEach(x => console.log(JSON.stringify(x)));
    } catch (e) {
        console.log(e);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Username:", username => {
    rl.question("Password:", password => {
        printVault(username, password).finally();
        rl.close();
    });
});





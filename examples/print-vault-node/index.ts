import {AuthContext, KeeperEnvironment, Vault} from "keeperapi";
import * as readline from "readline";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function printVault(username: string, password: string) {
    try {
        let auth = new AuthContext({
            username: username,
            password: password,
            host: KeeperEnvironment.DEV
        });
        await auth.login();
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





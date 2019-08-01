import {AuthContext, AuthUI} from "../src/authContext";
import {Vault} from "../src/vault";
import {connectPlatform} from "../src/platform";
import {nodePlatform} from "../src/node/platform";
import * as readline from "readline";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

connectPlatform(nodePlatform);


async function printVault() {

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

    try {
        let auth = new AuthContext({
            username: "saldoukhov@gmail.com",
            password: "111111",
            host: "local.keepersecurity.com"
        }, authUI);
        await auth.login();
        console.log("login successful");
        let vault = new Vault(auth);
        await vault.syncDown();
        let record = vault.records[0];
        console.log(record);
    } catch (e) {
        console.log(e);
    }
}

printVault().finally();




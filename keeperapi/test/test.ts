import {AuthContext, AuthUI} from "../src/authContext";
import {Vault} from "../src/vault";
import {connectPlatform} from "../src/platform";
import {nodePlatform} from "../src/node/platform";
import * as readline from "readline";
import {KeeperEnvironment} from "../src/keeperSettings";

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
            username: "saldoukhov@keepersecurity.com",
            password: "222222",
            host: KeeperEnvironment.DEV
        }, authUI);
        await auth.login();
        console.log("login successful");
        let vault = new Vault(auth);
        await vault.syncDown();
        let rec = vault.records[1].data;
        rec.title = "changed";
        await vault.saveRecord(rec);
        // await vault.addRecord({
        //     title: "testadd",
        //     notes: "note",
        //     secret1: "s1",
        //     secret2: "s2",
        //     custom: [{
        //         name: "custom1",
        //         value: "val1"
        //     }]
        // });
        // await vault.syncDown();
    } catch (e) {
        console.log(e);
    }
}

printVault().finally();




import {AuthContext} from "../src/authContext";
import {Vault} from "../src/vault";
import {connectPlatform} from "../src/platform";
import {nodePlatform} from "../src/node/platform";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

connectPlatform(nodePlatform);

async function printVault() {

    try {
        let auth = new AuthContext({
            username: "saldoukhov@gmail.com",
            password: "111111",
            host: "local.keepersecurity.com"
        });
        await auth.login();
        console.log("login successful");
        let vault = new Vault(auth);
        await vault.syncDown();
        let record = vault.records[0];
        console.log(record);
    }
    catch (e) {
        console.log(e);
    }
}

printVault().finally();



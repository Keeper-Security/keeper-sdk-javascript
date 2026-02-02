import {Auth, KeeperEnvironment, syncDown, VaultStorage, DRecord, Authentication} from '@keeper-security/keeperapi'
import * as readline from 'readline'
import LoginType = Authentication.LoginType;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const clientVersion = 'w17.5.0'

async function printVault(username: string, password: string) {
    try {
        let auth = new Auth({
            host: KeeperEnvironment.DEV,
            clientVersion: clientVersion,
            deviceConfig: { deviceName: "JS SDK Example" },
        })
        await auth.loginV3({username, password, loginType: LoginType.NORMAL})

        const storage: VaultStorage = {
           async put(data) {
                if (data.kind === 'record') {
                    console.log(JSON.stringify(data, null, 2))
                }
           },
           // remaing methods are no-ops
           async getDependencies(uid) { return undefined },
           async addDependencies() { return },
           async removeDependencies() { return },
           async clear() { return },
           async get(kind, uid) { return undefined },
           async delete(kind, uid) { return },
           async getKeyBytes() { return undefined },
           async saveKeyBytes() {}
        }
        await syncDown({
          auth,
          storage,
        })
        process.exit(0)
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Username:', username => {
    rl.question('Password:', password => {
        printVault(username, password).finally()
        rl.close()
    })
})






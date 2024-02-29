import {Auth, KeeperEnvironment, syncDown, VaultStorage, DRecord, Authentication} from '@keeper-security/keeperapi'
import * as readline from 'readline'
import LoginType = Authentication.LoginType;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const clientVersion = 'w16.4.0'

async function printVault(username: string, password: string) {
    try {
        let auth = new Auth({
            host: KeeperEnvironment.DEV,
            clientVersion: clientVersion
        })
        await auth.loginV3({username, password, loginType: LoginType.NORMAL})
        console.log('login successful')

        const records = [] as DRecord[]
        const storage = {} as VaultStorage
        await syncDown({
          auth,
          storage,
        })
        records.forEach(x => console.log(JSON.stringify(x)))
    } catch (e) {
        console.log(e)
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






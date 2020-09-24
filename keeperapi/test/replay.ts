import {connectPlatform, platform} from '../src/platform';
import {nodePlatform} from '../src/node/platform';
import {normal64Bytes} from '../src/utils';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

connectPlatform(nodePlatform)

async function replay() {
    // replace path and payload with your values
    const path = 'authentication/start_login'
    const payload = 'bla bla'

    const response = await platform.post(`https://local.keepersecurity.com/api/rest/${path}`, normal64Bytes(payload))
    console.log(response)
}

replay().finally()

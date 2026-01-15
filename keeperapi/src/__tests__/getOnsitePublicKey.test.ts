/**
 * @jest-environment jsdom
 */

// @ts-ignore
import crypto from 'crypto'
import { browserPlatform } from '../browser/platform';
import {KeeperEndpoint} from '../endpoint'
import { nodePlatform } from '../node/platform'
import { connectPlatform } from '../platform'
// import NodeRSA from 'node-rsa';

describe('getOnsitePublicKey', () => {

    let endpoint = new KeeperEndpoint({
        host: 'testUrl',
        deviceConfig: {
            deviceName: 'test',
            deviceToken: new Uint8Array(),
            privateKey: new Uint8Array(),
            publicKey: new Uint8Array(),
            transmissionKeyId: 1,
        },        
    })

    beforeEach(() => {
        endpoint = new KeeperEndpoint({
            host: 'testUrl',
            deviceConfig: {
                deviceName: 'test',
                deviceToken: new Uint8Array(),
                privateKey: new Uint8Array(),
                publicKey: new Uint8Array(),
                transmissionKeyId: 1,
            },        
        })
    })
    
    // NODE PLATFORM
    it('(node) should return the rsa public key of the onsite keeper', async () => {
        connectPlatform(nodePlatform)
        const key = await endpoint.getOnsitePublicKey(false)

        checkRSAKey(key)
        // should node platform have a different length from browser?
        expect(key).toHaveLength(392);
    })

    // NODE PLATFORM
    it('(node) should return the ecc public key of the onsite keeper', async () => {
        connectPlatform(nodePlatform)

        const key = await endpoint.getOnsitePublicKey(true)        
        checkECCKey(key)
    })

    // BROWSER PLATFORM
    it('(browser) should return the rsa public key of the onsite keeper', async () => {
        connectPlatform(browserPlatform)

        const key = await endpoint.getOnsitePublicKey(false)
        
        checkRSAKey(key)
        // should browser platform have a different length from node?
        expect(key).toHaveLength(360);
    })

    // BROWSER PLATFORM
    it('(browser) should return the ecc public key of the onsite keeper', async () => {
        connectPlatform(browserPlatform)

        const key = await endpoint.getOnsitePublicKey(true)
        checkECCKey(key)
    })
})

function checkRSAKey(key:string){
    const beginningPart = key.match(/^MIIB/i)
    const endingPart = key.match(/IDAQAB$/i)
    expect(beginningPart).toBeTruthy();
    expect(endingPart).toBeTruthy();
}

function checkECCKey(key:string){
    expect(key).toHaveLength(87);
}
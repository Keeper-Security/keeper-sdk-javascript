### Keeper Javascript SDK

This SDK allows to interact with Keeper backend service (KeeperApp) - login, sync Vault, manipulate enterprise data etc.

This SDK can be used from Node or from browser

[![NPM](https://img.shields.io/npm/v/@keeper-security/keeperapi?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@keeper-security/keeperapi)

Usage:

```bash
npm install keeperapi
```

```typescript
    try {
        let auth = new Auth({
            host: KeeperEnvironment.DEV
        });
        await auth.login(username, password);
        console.log("login successful");
        let vault = new Vault(auth);
        await vault.syncDown();
        vault.records.forEach(x => console.log(JSON.stringify(x)));
    } catch (e) {
        console.log(e);
    }
```

For local development, 

```bash
npm run build
```
 from "keeperapi" folder, then
 
```bash
npm link ../../keeperapi
```

from your client folder

How to add an api command to this sdk:

Prerequisites: 
- Have the keeperapp-protobuf repo alongside this repo (eg: /home/keeper-sdk-javascript and /home/keeperapp-protobuf)
- Make sure that the protobuf that you want is in the branch of the keeperapp-protobuf project you have loaded
- In the update-proto:cjs and update-proto:es6 commands in keeperapi/package.json, ensure that the proto files from keeperapp-protobuf that you want are listed there

Steps:
1. Navigate to the keeperapi folder in your terminal (eg: /home/keeper-sdk-javascript/keeperapi)
2. Run command ```npm run update-proto:cjs``` then command ```npm run update-proto:es6```
3. Open the file ```keeperapi/src/restMessages.ts```
4. There are 4 messages we handle with each of their differences:
    a. createInMessage - This expects data to be sent
    b. createOutMessage - This expects data to be received
    c. createMessage - This expects data to be sent and received
    d. createActionMessage - This expects no data sent or received, just make the call

5. In the file, you will see various examples of each of those 4 messages being used. Their typical layout is as follows:
    a. createInMessage: export const name = (data: requestType): RestInMessage<requestType> =>
    createInMessage(data, 'api/call', requestType)
    b. createOutMessage: export const name = (): RestOutMessage<responseType> =>
    createOutMessage('api/call', responseType)
    c. createMessage: export const name = (data: requestType): RestMessage<requestType, responseType> =>
    createMessage(data, 'api/call', requestType, responseType)
    d. createActionMessage: export const name = (): RestActionMessage => createActionMessage('api/call')

6. From the examples, here are the variables and where you can get them:
- name: This is from the api url mostly. This can be named whatever as long as it makes sense
- requestType: This will be given from the loaded protobuf
- responseType: Same with requestType
- 'api/call': This is the path of the api url in string form. This needs to be a string

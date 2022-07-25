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

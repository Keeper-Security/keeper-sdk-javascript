![Keeper Javascript SDK Header](https://github.com/user-attachments/assets/45eba9d8-9afc-49e6-b05b-fd1600bd495a)

### Keeper Javascript SDK

This Javascript SDK allows you to interact with the Keeper backend API service - login, sync Vault, manage data etc.

This SDK can be used from Node or from the browser

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

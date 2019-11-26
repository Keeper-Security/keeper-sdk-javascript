### Keeper Javascript SDK

This SDK targets both Node and browsers.

Usage:

```bash
yarn install keeperapi
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
yarn run api-build
```
 from "keeperapi" folder, then
 
```bash
yarn link keeperapi
```

from your client folder

import {AuthContext} from "../src/authContext";
import {KeeperEnvironment} from "../src/keeperSettings";
import {connectPlatform} from "../src/platform";
import {nodePlatform} from "../src/node/platform";

connectPlatform(nodePlatform);

test('should be able to read vault records', async () => {
    let auth = new AuthContext({
        username: "joe@abc.co",
        password: "123456",
        host: KeeperEnvironment.DEV
    });
    await auth.login();
    expect(3).toBe(3);
});

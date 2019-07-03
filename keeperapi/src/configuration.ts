import {KeeperEnvironment} from "./keeperSettings";

export interface ClientConfiguration {
    username: string;
    password: string;
    host: KeeperEnvironment | string;
}

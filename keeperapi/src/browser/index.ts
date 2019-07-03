export * from "../endpoint";
export * from "../authContext";
export * from "../vault";
export * from "../configuration";
export * from "../keeperSettings";
export * from "../APIRequest";
import {connectPlatform} from "../platform";
import {browserPlatform} from "./platform";

connectPlatform(browserPlatform);


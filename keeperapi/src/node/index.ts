export * from "../endpoint";
export * from "../authContext";
export * from "../vendorContext";
export * from "../vendorModel";
export * from "../vault";
export * from "../configuration";
export * from "../keeperSettings";
export * from "../APIRequest";
import {connectPlatform} from "../platform";
import {nodePlatform} from "./platform";

connectPlatform(nodePlatform);


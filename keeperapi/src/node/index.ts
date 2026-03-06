export * from "../endpoint";
export * from "../auth";
export * from "../vendorModel";
export * from "../vault";
export * from "../company";
export * from "../configuration";
export * from "../commands";
export * from "../restMessages";
export * from "../utils";
export * from "../platform";
export * from "../proto";
export * from "../cryptoWorker";
export * from "../qrc";
import {connectPlatform} from "../platform";
import {nodePlatform} from "./platform";

connectPlatform(nodePlatform);


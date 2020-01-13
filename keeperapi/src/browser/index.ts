export * from "../endpoint";
export * from "../auth";
export * from "../vendorContext";
export * from "../vendorModel";
export * from "../vault";
export * from "../company";
export * from "../configuration";
export * from "../commands";
export * from "../restMessages";
export * from "../utils";
export * from "../platform";
export * from "../proto";
import {connectPlatform} from "../platform";
import {browserPlatform} from "./platform";

connectPlatform(browserPlatform);


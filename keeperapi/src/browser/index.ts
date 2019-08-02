export * from "../endpoint";
export * from "../authContext";
export * from "../vendorContext";
export * from "../vendorModel";
export * from "../vault";
export * from "../configuration";
export * from "../keeperSettings";
export * from "../commands";
export * from "../APIRequest";
import {connectPlatform} from "../platform";
import {browserPlatform} from "./platform";

connectPlatform(browserPlatform);


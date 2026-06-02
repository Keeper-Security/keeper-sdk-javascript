// Must be the first import: disables protobufjs Long support before ../proto
// (proto.js) is evaluated, so 64-bit fields decode to numbers AND proto.js does not
// bake Long-typed prototype defaults for absent fields. See ../configureProtobuf.
import '../configureProtobuf'
export * from '../endpoint'
export * from '../auth'
export * from '../vendorModel'
export * from '../vault'
export * from '../company'
export * from '../configuration'
export * from '../commands'
export * from '../restMessages'
export * from '../utils'
export * from '../platform'
export * from '../log'
export * from '../proto'
export * from '../cryptoWorker'
export * from '../qrc'
export * from '../pam'
import { connectPlatform } from '../platform'
import { browserPlatform } from './platform'

connectPlatform(browserPlatform)

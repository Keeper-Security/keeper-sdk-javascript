import * as $protobuf from 'protobufjs/minimal'

/**
 * protobufjs >= 7.5.9 resolves the bundled long.js via a plain require("long")
 * (previously a bundler-opaque inquire("long") that webpack/rollup couldn't see,
 * so long was never bundled and 64-bit fields decoded to plain numbers). Now
 * util.Long is set, so int64/uint64/sint64/fixed64/sfixed64 fields decode to Long
 * objects. Keeper treats these as plain numbers, and Long instances are
 * non-serializable (break the Redux store).
 *
 * Disabling util.Long makes the reader bind its 64-bit read methods to
 * LongBits.toNumber(), decoding directly to numbers. configure() rebinds
 * Reader.prototype accordingly; util._configure() does not re-detect Long, so this
 * assignment sticks. This is the documented way to control Long support:
 * https://github.com/protobufjs/protobuf.js#browserify-integration
 *
 * IMPORTANT: this runs as a module-load side effect (not an exported function) and
 * MUST be imported before ./proto. The generated proto.js bakes its per-field
 * prototype defaults once at evaluation time, e.g.
 *   PasskeyInfo.prototype.disabledAtMillis = $util.Long ? $util.Long.fromBits(0,0,false) : 0
 * so if util.Long is still set when proto.js evaluates, absent 64-bit fields default
 * to Long{0,0} even though decoded (present) values are numbers. Importing this
 * first guarantees util.Long is null before proto.js bakes those defaults.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;($protobuf.util as any).Long = null
$protobuf.configure()

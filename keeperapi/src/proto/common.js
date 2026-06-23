/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const common = $root.common = (() => {

    /**
     * Namespace common.
     * @exports common
     * @namespace
     */
    const common = {};

    common.tla = (function() {

        /**
         * Namespace tla.
         * @memberof common
         * @namespace
         */
        const tla = {};

        tla.TLAProperties = (function() {

            /**
             * Properties of a TLAProperties.
             * @memberof common.tla
             * @interface ITLAProperties
             * @property {number|null} [expiration] Expiration time (in milliseconds) for the user's access to the record.
             * @property {common.tla.TimerNotificationType|null} [timerNotificationType] Notification settings for access expiration events.
             * Possible values:
             * - NOTIFICATION_OFF = 0
             * - NOTIFY_OWNER = 1
             * - NOTIFY_PRIVILEGED_USERS = 2
             * @property {boolean|null} [rotateOnExpiration] Indicates whether access should be rotated automatically when it expires.
             */

            /**
             * Constructs a new TLAProperties.
             * @memberof common.tla
             * @classdesc Properties related to time-limited access (TLA) for a record.
             * Includes expiration settings, notification preferences, and rotation behavior.
             * @implements ITLAProperties
             * @constructor
             * @param {common.tla.ITLAProperties=} [properties] Properties to set
             */
            function TLAProperties(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Expiration time (in milliseconds) for the user's access to the record.
             * @member {number} expiration
             * @memberof common.tla.TLAProperties
             * @instance
             */
            TLAProperties.prototype.expiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Notification settings for access expiration events.
             * Possible values:
             * - NOTIFICATION_OFF = 0
             * - NOTIFY_OWNER = 1
             * - NOTIFY_PRIVILEGED_USERS = 2
             * @member {common.tla.TimerNotificationType} timerNotificationType
             * @memberof common.tla.TLAProperties
             * @instance
             */
            TLAProperties.prototype.timerNotificationType = 0;

            /**
             * Indicates whether access should be rotated automatically when it expires.
             * @member {boolean} rotateOnExpiration
             * @memberof common.tla.TLAProperties
             * @instance
             */
            TLAProperties.prototype.rotateOnExpiration = false;

            /**
             * Creates a new TLAProperties instance using the specified properties.
             * @function create
             * @memberof common.tla.TLAProperties
             * @static
             * @param {common.tla.ITLAProperties=} [properties] Properties to set
             * @returns {common.tla.TLAProperties} TLAProperties instance
             */
            TLAProperties.create = function create(properties) {
                return new TLAProperties(properties);
            };

            /**
             * Encodes the specified TLAProperties message. Does not implicitly {@link common.tla.TLAProperties.verify|verify} messages.
             * @function encode
             * @memberof common.tla.TLAProperties
             * @static
             * @param {common.tla.ITLAProperties} message TLAProperties message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TLAProperties.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.expiration);
                if (message.timerNotificationType != null && Object.hasOwnProperty.call(message, "timerNotificationType"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.timerNotificationType);
                if (message.rotateOnExpiration != null && Object.hasOwnProperty.call(message, "rotateOnExpiration"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.rotateOnExpiration);
                return writer;
            };

            /**
             * Encodes the specified TLAProperties message, length delimited. Does not implicitly {@link common.tla.TLAProperties.verify|verify} messages.
             * @function encodeDelimited
             * @memberof common.tla.TLAProperties
             * @static
             * @param {common.tla.ITLAProperties} message TLAProperties message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TLAProperties.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a TLAProperties message from the specified reader or buffer.
             * @function decode
             * @memberof common.tla.TLAProperties
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {common.tla.TLAProperties} TLAProperties
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TLAProperties.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.common.tla.TLAProperties();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.expiration = reader.int64();
                            break;
                        }
                    case 2: {
                            message.timerNotificationType = reader.int32();
                            break;
                        }
                    case 3: {
                            message.rotateOnExpiration = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TLAProperties message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof common.tla.TLAProperties
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {common.tla.TLAProperties} TLAProperties
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TLAProperties.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TLAProperties message.
             * @function verify
             * @memberof common.tla.TLAProperties
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TLAProperties.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                    if (!$util.isInteger(message.expiration) && !(message.expiration && $util.isInteger(message.expiration.low) && $util.isInteger(message.expiration.high)))
                        return "expiration: integer|Long expected";
                if (message.timerNotificationType != null && Object.hasOwnProperty.call(message, "timerNotificationType"))
                    switch (message.timerNotificationType) {
                    default:
                        return "timerNotificationType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.rotateOnExpiration != null && Object.hasOwnProperty.call(message, "rotateOnExpiration"))
                    if (typeof message.rotateOnExpiration !== "boolean")
                        return "rotateOnExpiration: boolean expected";
                return null;
            };

            /**
             * Creates a TLAProperties message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof common.tla.TLAProperties
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {common.tla.TLAProperties} TLAProperties
             */
            TLAProperties.fromObject = function fromObject(object, long) {
                if (object instanceof $root.common.tla.TLAProperties)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".common.tla.TLAProperties: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.common.tla.TLAProperties();
                if (object.expiration != null)
                    if ($util.Long)
                        message.expiration = $util.Long.fromValue(object.expiration, false);
                    else if (typeof object.expiration === "string")
                        message.expiration = parseInt(object.expiration, 10);
                    else if (typeof object.expiration === "number")
                        message.expiration = object.expiration;
                    else if (typeof object.expiration === "object")
                        message.expiration = new $util.LongBits(object.expiration.low >>> 0, object.expiration.high >>> 0).toNumber();
                switch (object.timerNotificationType) {
                default:
                    if (typeof object.timerNotificationType === "number") {
                        message.timerNotificationType = object.timerNotificationType;
                        break;
                    }
                    break;
                case "NOTIFICATION_OFF":
                case 0:
                    message.timerNotificationType = 0;
                    break;
                case "NOTIFY_OWNER":
                case 1:
                    message.timerNotificationType = 1;
                    break;
                case "NOTIFY_PRIVILEGED_USERS":
                case 2:
                    message.timerNotificationType = 2;
                    break;
                }
                if (object.rotateOnExpiration != null)
                    message.rotateOnExpiration = Boolean(object.rotateOnExpiration);
                return message;
            };

            /**
             * Creates a plain object from a TLAProperties message. Also converts values to other types if specified.
             * @function toObject
             * @memberof common.tla.TLAProperties
             * @static
             * @param {common.tla.TLAProperties} message TLAProperties
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TLAProperties.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.expiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.expiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                    object.timerNotificationType = options.enums === String ? "NOTIFICATION_OFF" : 0;
                    object.rotateOnExpiration = false;
                }
                if (message.expiration != null && Object.hasOwnProperty.call(message, "expiration"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.expiration = typeof message.expiration === "number" ? BigInt(message.expiration) : $util.Long.fromBits(message.expiration.low >>> 0, message.expiration.high >>> 0, false).toBigInt();
                    else if (typeof message.expiration === "number")
                        object.expiration = options.longs === String ? String(message.expiration) : message.expiration;
                    else
                        object.expiration = options.longs === String ? $util.Long.prototype.toString.call(message.expiration) : options.longs === Number ? new $util.LongBits(message.expiration.low >>> 0, message.expiration.high >>> 0).toNumber() : message.expiration;
                if (message.timerNotificationType != null && Object.hasOwnProperty.call(message, "timerNotificationType"))
                    object.timerNotificationType = options.enums === String ? $root.common.tla.TimerNotificationType[message.timerNotificationType] === undefined ? message.timerNotificationType : $root.common.tla.TimerNotificationType[message.timerNotificationType] : message.timerNotificationType;
                if (message.rotateOnExpiration != null && Object.hasOwnProperty.call(message, "rotateOnExpiration"))
                    object.rotateOnExpiration = message.rotateOnExpiration;
                return object;
            };

            /**
             * Converts this TLAProperties to JSON.
             * @function toJSON
             * @memberof common.tla.TLAProperties
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TLAProperties.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for TLAProperties
             * @function getTypeUrl
             * @memberof common.tla.TLAProperties
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            TLAProperties.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/common.tla.TLAProperties";
            };

            return TLAProperties;
        })();

        /**
         * Enum representing notification settings for access expiration events.
         * @name common.tla.TimerNotificationType
         * @enum {number}
         * @property {number} NOTIFICATION_OFF=0 Notifications are turned off.
         * @property {number} NOTIFY_OWNER=1 Notify the owner when access expiration occurs.
         * @property {number} NOTIFY_PRIVILEGED_USERS=2 Notify privileged users when access expiration occurs.
         */
        tla.TimerNotificationType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NOTIFICATION_OFF"] = 0;
            values[valuesById[1] = "NOTIFY_OWNER"] = 1;
            values[valuesById[2] = "NOTIFY_PRIVILEGED_USERS"] = 2;
            return values;
        })();

        return tla;
    })();

    return common;
})();

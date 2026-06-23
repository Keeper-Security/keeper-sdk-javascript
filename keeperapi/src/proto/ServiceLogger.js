/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const ServiceLogger = $root.ServiceLogger = (() => {

    /**
     * Namespace ServiceLogger.
     * @exports ServiceLogger
     * @namespace
     */
    const ServiceLogger = {};

    ServiceLogger.IdRange = (function() {

        /**
         * Properties of an IdRange.
         * @memberof ServiceLogger
         * @interface IIdRange
         * @property {number|null} [startingId] IdRange startingId
         * @property {number|null} [endingId] IdRange endingId
         */

        /**
         * Constructs a new IdRange.
         * @memberof ServiceLogger
         * @classdesc Specifies the first and last IDs of a range of IDs so that a Request can ask for information about a range of IDs.
         * @implements IIdRange
         * @constructor
         * @param {ServiceLogger.IIdRange=} [properties] Properties to set
         */
        function IdRange(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * IdRange startingId.
         * @member {number} startingId
         * @memberof ServiceLogger.IdRange
         * @instance
         */
        IdRange.prototype.startingId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * IdRange endingId.
         * @member {number} endingId
         * @memberof ServiceLogger.IdRange
         * @instance
         */
        IdRange.prototype.endingId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new IdRange instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.IdRange
         * @static
         * @param {ServiceLogger.IIdRange=} [properties] Properties to set
         * @returns {ServiceLogger.IdRange} IdRange instance
         */
        IdRange.create = function create(properties) {
            return new IdRange(properties);
        };

        /**
         * Encodes the specified IdRange message. Does not implicitly {@link ServiceLogger.IdRange.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.IdRange
         * @static
         * @param {ServiceLogger.IIdRange} message IdRange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IdRange.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.startingId != null && Object.hasOwnProperty.call(message, "startingId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.startingId);
            if (message.endingId != null && Object.hasOwnProperty.call(message, "endingId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.endingId);
            return writer;
        };

        /**
         * Encodes the specified IdRange message, length delimited. Does not implicitly {@link ServiceLogger.IdRange.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.IdRange
         * @static
         * @param {ServiceLogger.IIdRange} message IdRange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IdRange.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an IdRange message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.IdRange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.IdRange} IdRange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IdRange.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.IdRange();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.startingId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.endingId = reader.uint64();
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
         * Decodes an IdRange message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.IdRange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.IdRange} IdRange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IdRange.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an IdRange message.
         * @function verify
         * @memberof ServiceLogger.IdRange
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        IdRange.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.startingId != null && Object.hasOwnProperty.call(message, "startingId"))
                if (!$util.isInteger(message.startingId) && !(message.startingId && $util.isInteger(message.startingId.low) && $util.isInteger(message.startingId.high)))
                    return "startingId: integer|Long expected";
            if (message.endingId != null && Object.hasOwnProperty.call(message, "endingId"))
                if (!$util.isInteger(message.endingId) && !(message.endingId && $util.isInteger(message.endingId.low) && $util.isInteger(message.endingId.high)))
                    return "endingId: integer|Long expected";
            return null;
        };

        /**
         * Creates an IdRange message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.IdRange
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.IdRange} IdRange
         */
        IdRange.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.IdRange)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.IdRange: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.IdRange();
            if (object.startingId != null)
                if ($util.Long)
                    message.startingId = $util.Long.fromValue(object.startingId, true);
                else if (typeof object.startingId === "string")
                    message.startingId = parseInt(object.startingId, 10);
                else if (typeof object.startingId === "number")
                    message.startingId = object.startingId;
                else if (typeof object.startingId === "object")
                    message.startingId = new $util.LongBits(object.startingId.low >>> 0, object.startingId.high >>> 0).toNumber(true);
            if (object.endingId != null)
                if ($util.Long)
                    message.endingId = $util.Long.fromValue(object.endingId, true);
                else if (typeof object.endingId === "string")
                    message.endingId = parseInt(object.endingId, 10);
                else if (typeof object.endingId === "number")
                    message.endingId = object.endingId;
                else if (typeof object.endingId === "object")
                    message.endingId = new $util.LongBits(object.endingId.low >>> 0, object.endingId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from an IdRange message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.IdRange
         * @static
         * @param {ServiceLogger.IdRange} message IdRange
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        IdRange.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.startingId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.startingId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.endingId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.endingId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.startingId != null && Object.hasOwnProperty.call(message, "startingId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.startingId = typeof message.startingId === "number" ? BigInt(message.startingId) : $util.Long.fromBits(message.startingId.low >>> 0, message.startingId.high >>> 0, true).toBigInt();
                else if (typeof message.startingId === "number")
                    object.startingId = options.longs === String ? String(message.startingId) : message.startingId;
                else
                    object.startingId = options.longs === String ? $util.Long.prototype.toString.call(message.startingId) : options.longs === Number ? new $util.LongBits(message.startingId.low >>> 0, message.startingId.high >>> 0).toNumber(true) : message.startingId;
            if (message.endingId != null && Object.hasOwnProperty.call(message, "endingId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.endingId = typeof message.endingId === "number" ? BigInt(message.endingId) : $util.Long.fromBits(message.endingId.low >>> 0, message.endingId.high >>> 0, true).toBigInt();
                else if (typeof message.endingId === "number")
                    object.endingId = options.longs === String ? String(message.endingId) : message.endingId;
                else
                    object.endingId = options.longs === String ? $util.Long.prototype.toString.call(message.endingId) : options.longs === Number ? new $util.LongBits(message.endingId.low >>> 0, message.endingId.high >>> 0).toNumber(true) : message.endingId;
            return object;
        };

        /**
         * Converts this IdRange to JSON.
         * @function toJSON
         * @memberof ServiceLogger.IdRange
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        IdRange.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for IdRange
         * @function getTypeUrl
         * @memberof ServiceLogger.IdRange
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        IdRange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.IdRange";
        };

        return IdRange;
    })();

    ServiceLogger.ServiceInfoSpecifier = (function() {

        /**
         * Properties of a ServiceInfoSpecifier.
         * @memberof ServiceLogger
         * @interface IServiceInfoSpecifier
         * @property {boolean|null} [all] ServiceInfoSpecifier all
         * @property {number|null} [serviceInfoId] ServiceInfoSpecifier serviceInfoId
         * @property {string|null} [name] ServiceInfoSpecifier name
         */

        /**
         * Constructs a new ServiceInfoSpecifier.
         * @memberof ServiceLogger
         * @classdesc Used in ServiceInfoRequest
         * @implements IServiceInfoSpecifier
         * @constructor
         * @param {ServiceLogger.IServiceInfoSpecifier=} [properties] Properties to set
         */
        function ServiceInfoSpecifier(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceInfoSpecifier all.
         * @member {boolean} all
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @instance
         */
        ServiceInfoSpecifier.prototype.all = false;

        /**
         * ServiceInfoSpecifier serviceInfoId.
         * @member {number} serviceInfoId
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @instance
         */
        ServiceInfoSpecifier.prototype.serviceInfoId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceInfoSpecifier name.
         * @member {string} name
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @instance
         */
        ServiceInfoSpecifier.prototype.name = "";

        /**
         * Creates a new ServiceInfoSpecifier instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @static
         * @param {ServiceLogger.IServiceInfoSpecifier=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceInfoSpecifier} ServiceInfoSpecifier instance
         */
        ServiceInfoSpecifier.create = function create(properties) {
            return new ServiceInfoSpecifier(properties);
        };

        /**
         * Encodes the specified ServiceInfoSpecifier message. Does not implicitly {@link ServiceLogger.ServiceInfoSpecifier.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @static
         * @param {ServiceLogger.IServiceInfoSpecifier} message ServiceInfoSpecifier message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceInfoSpecifier.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.all);
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.serviceInfoId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified ServiceInfoSpecifier message, length delimited. Does not implicitly {@link ServiceLogger.ServiceInfoSpecifier.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @static
         * @param {ServiceLogger.IServiceInfoSpecifier} message ServiceInfoSpecifier message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceInfoSpecifier.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceInfoSpecifier message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceInfoSpecifier} ServiceInfoSpecifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceInfoSpecifier.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceInfoSpecifier();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.all = reader.bool();
                        break;
                    }
                case 2: {
                        message.serviceInfoId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.name = reader.string();
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
         * Decodes a ServiceInfoSpecifier message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceInfoSpecifier} ServiceInfoSpecifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceInfoSpecifier.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceInfoSpecifier message.
         * @function verify
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceInfoSpecifier.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                if (typeof message.all !== "boolean")
                    return "all: boolean expected";
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                if (!$util.isInteger(message.serviceInfoId) && !(message.serviceInfoId && $util.isInteger(message.serviceInfoId.low) && $util.isInteger(message.serviceInfoId.high)))
                    return "serviceInfoId: integer|Long expected";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a ServiceInfoSpecifier message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceInfoSpecifier} ServiceInfoSpecifier
         */
        ServiceInfoSpecifier.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceInfoSpecifier)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceInfoSpecifier: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceInfoSpecifier();
            if (object.all != null)
                message.all = Boolean(object.all);
            if (object.serviceInfoId != null)
                if ($util.Long)
                    message.serviceInfoId = $util.Long.fromValue(object.serviceInfoId, true);
                else if (typeof object.serviceInfoId === "string")
                    message.serviceInfoId = parseInt(object.serviceInfoId, 10);
                else if (typeof object.serviceInfoId === "number")
                    message.serviceInfoId = object.serviceInfoId;
                else if (typeof object.serviceInfoId === "object")
                    message.serviceInfoId = new $util.LongBits(object.serviceInfoId.low >>> 0, object.serviceInfoId.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a ServiceInfoSpecifier message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @static
         * @param {ServiceLogger.ServiceInfoSpecifier} message ServiceInfoSpecifier
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceInfoSpecifier.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.all = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceInfoId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceInfoId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.name = "";
            }
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                object.all = message.all;
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceInfoId = typeof message.serviceInfoId === "number" ? BigInt(message.serviceInfoId) : $util.Long.fromBits(message.serviceInfoId.low >>> 0, message.serviceInfoId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceInfoId === "number")
                    object.serviceInfoId = options.longs === String ? String(message.serviceInfoId) : message.serviceInfoId;
                else
                    object.serviceInfoId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceInfoId) : options.longs === Number ? new $util.LongBits(message.serviceInfoId.low >>> 0, message.serviceInfoId.high >>> 0).toNumber(true) : message.serviceInfoId;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this ServiceInfoSpecifier to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceInfoSpecifier.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceInfoSpecifier
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceInfoSpecifier
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceInfoSpecifier.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceInfoSpecifier";
        };

        return ServiceInfoSpecifier;
    })();

    ServiceLogger.ServiceInfoRequest = (function() {

        /**
         * Properties of a ServiceInfoRequest.
         * @memberof ServiceLogger
         * @interface IServiceInfoRequest
         * @property {Array.<ServiceLogger.IServiceInfoSpecifier>|null} [serviceInfoSpecifier] ServiceInfoRequest serviceInfoSpecifier
         */

        /**
         * Constructs a new ServiceInfoRequest.
         * @memberof ServiceLogger
         * @classdesc Request information about one or more services by ID or name, or retrieve all.
         * @implements IServiceInfoRequest
         * @constructor
         * @param {ServiceLogger.IServiceInfoRequest=} [properties] Properties to set
         */
        function ServiceInfoRequest(properties) {
            this.serviceInfoSpecifier = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceInfoRequest serviceInfoSpecifier.
         * @member {Array.<ServiceLogger.IServiceInfoSpecifier>} serviceInfoSpecifier
         * @memberof ServiceLogger.ServiceInfoRequest
         * @instance
         */
        ServiceInfoRequest.prototype.serviceInfoSpecifier = $util.emptyArray;

        /**
         * Creates a new ServiceInfoRequest instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceInfoRequest
         * @static
         * @param {ServiceLogger.IServiceInfoRequest=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceInfoRequest} ServiceInfoRequest instance
         */
        ServiceInfoRequest.create = function create(properties) {
            return new ServiceInfoRequest(properties);
        };

        /**
         * Encodes the specified ServiceInfoRequest message. Does not implicitly {@link ServiceLogger.ServiceInfoRequest.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceInfoRequest
         * @static
         * @param {ServiceLogger.IServiceInfoRequest} message ServiceInfoRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceInfoRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceInfoSpecifier != null && message.serviceInfoSpecifier.length)
                for (let i = 0; i < message.serviceInfoSpecifier.length; ++i)
                    $root.ServiceLogger.ServiceInfoSpecifier.encode(message.serviceInfoSpecifier[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceInfoRequest message, length delimited. Does not implicitly {@link ServiceLogger.ServiceInfoRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceInfoRequest
         * @static
         * @param {ServiceLogger.IServiceInfoRequest} message ServiceInfoRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceInfoRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceInfoRequest message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceInfoRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceInfoRequest} ServiceInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceInfoRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceInfoRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.serviceInfoSpecifier && message.serviceInfoSpecifier.length))
                            message.serviceInfoSpecifier = [];
                        message.serviceInfoSpecifier.push($root.ServiceLogger.ServiceInfoSpecifier.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceInfoRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceInfoRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceInfoRequest} ServiceInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceInfoRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceInfoRequest message.
         * @function verify
         * @memberof ServiceLogger.ServiceInfoRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceInfoRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceInfoSpecifier != null && Object.hasOwnProperty.call(message, "serviceInfoSpecifier")) {
                if (!Array.isArray(message.serviceInfoSpecifier))
                    return "serviceInfoSpecifier: array expected";
                for (let i = 0; i < message.serviceInfoSpecifier.length; ++i) {
                    let error = $root.ServiceLogger.ServiceInfoSpecifier.verify(message.serviceInfoSpecifier[i], long + 1);
                    if (error)
                        return "serviceInfoSpecifier." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceInfoRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceInfoRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceInfoRequest} ServiceInfoRequest
         */
        ServiceInfoRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceInfoRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceInfoRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceInfoRequest();
            if (object.serviceInfoSpecifier) {
                if (!Array.isArray(object.serviceInfoSpecifier))
                    throw TypeError(".ServiceLogger.ServiceInfoRequest.serviceInfoSpecifier: array expected");
                message.serviceInfoSpecifier = [];
                for (let i = 0; i < object.serviceInfoSpecifier.length; ++i) {
                    if (!$util.isObject(object.serviceInfoSpecifier[i]))
                        throw TypeError(".ServiceLogger.ServiceInfoRequest.serviceInfoSpecifier: object expected");
                    message.serviceInfoSpecifier[i] = $root.ServiceLogger.ServiceInfoSpecifier.fromObject(object.serviceInfoSpecifier[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceInfoRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceInfoRequest
         * @static
         * @param {ServiceLogger.ServiceInfoRequest} message ServiceInfoRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceInfoRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.serviceInfoSpecifier = [];
            if (message.serviceInfoSpecifier && message.serviceInfoSpecifier.length) {
                object.serviceInfoSpecifier = [];
                for (let j = 0; j < message.serviceInfoSpecifier.length; ++j)
                    object.serviceInfoSpecifier[j] = $root.ServiceLogger.ServiceInfoSpecifier.toObject(message.serviceInfoSpecifier[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceInfoRequest to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceInfoRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceInfoRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceInfoRequest
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceInfoRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceInfoRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceInfoRequest";
        };

        return ServiceInfoRequest;
    })();

    ServiceLogger.ServiceInfoRecord = (function() {

        /**
         * Properties of a ServiceInfoRecord.
         * @memberof ServiceLogger
         * @interface IServiceInfoRecord
         * @property {number|null} [serviceInfoId] ServiceInfoRecord serviceInfoId
         * @property {string|null} [name] ServiceInfoRecord name
         * @property {number|null} [deleteAfter] ServiceInfoRecord deleteAfter
         * @property {string|null} [deleteAfterTimeUnits] ServiceInfoRecord deleteAfterTimeUnits
         * @property {boolean|null} [isShortTermLogging] ServiceInfoRecord isShortTermLogging
         */

        /**
         * Constructs a new ServiceInfoRecord.
         * @memberof ServiceLogger
         * @classdesc Used in ServiceInfoResponse
         * @implements IServiceInfoRecord
         * @constructor
         * @param {ServiceLogger.IServiceInfoRecord=} [properties] Properties to set
         */
        function ServiceInfoRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceInfoRecord serviceInfoId.
         * @member {number} serviceInfoId
         * @memberof ServiceLogger.ServiceInfoRecord
         * @instance
         */
        ServiceInfoRecord.prototype.serviceInfoId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceInfoRecord name.
         * @member {string} name
         * @memberof ServiceLogger.ServiceInfoRecord
         * @instance
         */
        ServiceInfoRecord.prototype.name = "";

        /**
         * ServiceInfoRecord deleteAfter.
         * @member {number} deleteAfter
         * @memberof ServiceLogger.ServiceInfoRecord
         * @instance
         */
        ServiceInfoRecord.prototype.deleteAfter = 0;

        /**
         * ServiceInfoRecord deleteAfterTimeUnits.
         * @member {string} deleteAfterTimeUnits
         * @memberof ServiceLogger.ServiceInfoRecord
         * @instance
         */
        ServiceInfoRecord.prototype.deleteAfterTimeUnits = "";

        /**
         * ServiceInfoRecord isShortTermLogging.
         * @member {boolean} isShortTermLogging
         * @memberof ServiceLogger.ServiceInfoRecord
         * @instance
         */
        ServiceInfoRecord.prototype.isShortTermLogging = false;

        /**
         * Creates a new ServiceInfoRecord instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceInfoRecord
         * @static
         * @param {ServiceLogger.IServiceInfoRecord=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceInfoRecord} ServiceInfoRecord instance
         */
        ServiceInfoRecord.create = function create(properties) {
            return new ServiceInfoRecord(properties);
        };

        /**
         * Encodes the specified ServiceInfoRecord message. Does not implicitly {@link ServiceLogger.ServiceInfoRecord.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceInfoRecord
         * @static
         * @param {ServiceLogger.IServiceInfoRecord} message ServiceInfoRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceInfoRecord.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.serviceInfoId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.deleteAfter != null && Object.hasOwnProperty.call(message, "deleteAfter"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.deleteAfter);
            if (message.deleteAfterTimeUnits != null && Object.hasOwnProperty.call(message, "deleteAfterTimeUnits"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.deleteAfterTimeUnits);
            if (message.isShortTermLogging != null && Object.hasOwnProperty.call(message, "isShortTermLogging"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isShortTermLogging);
            return writer;
        };

        /**
         * Encodes the specified ServiceInfoRecord message, length delimited. Does not implicitly {@link ServiceLogger.ServiceInfoRecord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceInfoRecord
         * @static
         * @param {ServiceLogger.IServiceInfoRecord} message ServiceInfoRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceInfoRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceInfoRecord message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceInfoRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceInfoRecord} ServiceInfoRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceInfoRecord.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceInfoRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.serviceInfoId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.deleteAfter = reader.uint32();
                        break;
                    }
                case 4: {
                        message.deleteAfterTimeUnits = reader.string();
                        break;
                    }
                case 5: {
                        message.isShortTermLogging = reader.bool();
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
         * Decodes a ServiceInfoRecord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceInfoRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceInfoRecord} ServiceInfoRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceInfoRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceInfoRecord message.
         * @function verify
         * @memberof ServiceLogger.ServiceInfoRecord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceInfoRecord.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                if (!$util.isInteger(message.serviceInfoId) && !(message.serviceInfoId && $util.isInteger(message.serviceInfoId.low) && $util.isInteger(message.serviceInfoId.high)))
                    return "serviceInfoId: integer|Long expected";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.deleteAfter != null && Object.hasOwnProperty.call(message, "deleteAfter"))
                if (!$util.isInteger(message.deleteAfter))
                    return "deleteAfter: integer expected";
            if (message.deleteAfterTimeUnits != null && Object.hasOwnProperty.call(message, "deleteAfterTimeUnits"))
                if (!$util.isString(message.deleteAfterTimeUnits))
                    return "deleteAfterTimeUnits: string expected";
            if (message.isShortTermLogging != null && Object.hasOwnProperty.call(message, "isShortTermLogging"))
                if (typeof message.isShortTermLogging !== "boolean")
                    return "isShortTermLogging: boolean expected";
            return null;
        };

        /**
         * Creates a ServiceInfoRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceInfoRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceInfoRecord} ServiceInfoRecord
         */
        ServiceInfoRecord.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceInfoRecord)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceInfoRecord: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceInfoRecord();
            if (object.serviceInfoId != null)
                if ($util.Long)
                    message.serviceInfoId = $util.Long.fromValue(object.serviceInfoId, true);
                else if (typeof object.serviceInfoId === "string")
                    message.serviceInfoId = parseInt(object.serviceInfoId, 10);
                else if (typeof object.serviceInfoId === "number")
                    message.serviceInfoId = object.serviceInfoId;
                else if (typeof object.serviceInfoId === "object")
                    message.serviceInfoId = new $util.LongBits(object.serviceInfoId.low >>> 0, object.serviceInfoId.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            if (object.deleteAfter != null)
                message.deleteAfter = object.deleteAfter >>> 0;
            if (object.deleteAfterTimeUnits != null)
                message.deleteAfterTimeUnits = String(object.deleteAfterTimeUnits);
            if (object.isShortTermLogging != null)
                message.isShortTermLogging = Boolean(object.isShortTermLogging);
            return message;
        };

        /**
         * Creates a plain object from a ServiceInfoRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceInfoRecord
         * @static
         * @param {ServiceLogger.ServiceInfoRecord} message ServiceInfoRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceInfoRecord.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceInfoId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceInfoId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.name = "";
                object.deleteAfter = 0;
                object.deleteAfterTimeUnits = "";
                object.isShortTermLogging = false;
            }
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceInfoId = typeof message.serviceInfoId === "number" ? BigInt(message.serviceInfoId) : $util.Long.fromBits(message.serviceInfoId.low >>> 0, message.serviceInfoId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceInfoId === "number")
                    object.serviceInfoId = options.longs === String ? String(message.serviceInfoId) : message.serviceInfoId;
                else
                    object.serviceInfoId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceInfoId) : options.longs === Number ? new $util.LongBits(message.serviceInfoId.low >>> 0, message.serviceInfoId.high >>> 0).toNumber(true) : message.serviceInfoId;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.deleteAfter != null && Object.hasOwnProperty.call(message, "deleteAfter"))
                object.deleteAfter = message.deleteAfter;
            if (message.deleteAfterTimeUnits != null && Object.hasOwnProperty.call(message, "deleteAfterTimeUnits"))
                object.deleteAfterTimeUnits = message.deleteAfterTimeUnits;
            if (message.isShortTermLogging != null && Object.hasOwnProperty.call(message, "isShortTermLogging"))
                object.isShortTermLogging = message.isShortTermLogging;
            return object;
        };

        /**
         * Converts this ServiceInfoRecord to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceInfoRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceInfoRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceInfoRecord
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceInfoRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceInfoRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceInfoRecord";
        };

        return ServiceInfoRecord;
    })();

    ServiceLogger.ServiceInfoResponse = (function() {

        /**
         * Properties of a ServiceInfoResponse.
         * @memberof ServiceLogger
         * @interface IServiceInfoResponse
         * @property {Array.<ServiceLogger.IServiceInfoRecord>|null} [serviceInfoRecord] ServiceInfoResponse serviceInfoRecord
         */

        /**
         * Constructs a new ServiceInfoResponse.
         * @memberof ServiceLogger
         * @classdesc Returns information about Services
         * @implements IServiceInfoResponse
         * @constructor
         * @param {ServiceLogger.IServiceInfoResponse=} [properties] Properties to set
         */
        function ServiceInfoResponse(properties) {
            this.serviceInfoRecord = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceInfoResponse serviceInfoRecord.
         * @member {Array.<ServiceLogger.IServiceInfoRecord>} serviceInfoRecord
         * @memberof ServiceLogger.ServiceInfoResponse
         * @instance
         */
        ServiceInfoResponse.prototype.serviceInfoRecord = $util.emptyArray;

        /**
         * Creates a new ServiceInfoResponse instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceInfoResponse
         * @static
         * @param {ServiceLogger.IServiceInfoResponse=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceInfoResponse} ServiceInfoResponse instance
         */
        ServiceInfoResponse.create = function create(properties) {
            return new ServiceInfoResponse(properties);
        };

        /**
         * Encodes the specified ServiceInfoResponse message. Does not implicitly {@link ServiceLogger.ServiceInfoResponse.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceInfoResponse
         * @static
         * @param {ServiceLogger.IServiceInfoResponse} message ServiceInfoResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceInfoResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceInfoRecord != null && message.serviceInfoRecord.length)
                for (let i = 0; i < message.serviceInfoRecord.length; ++i)
                    $root.ServiceLogger.ServiceInfoRecord.encode(message.serviceInfoRecord[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceInfoResponse message, length delimited. Does not implicitly {@link ServiceLogger.ServiceInfoResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceInfoResponse
         * @static
         * @param {ServiceLogger.IServiceInfoResponse} message ServiceInfoResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceInfoResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceInfoResponse message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceInfoResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceInfoResponse} ServiceInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceInfoResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceInfoResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.serviceInfoRecord && message.serviceInfoRecord.length))
                            message.serviceInfoRecord = [];
                        message.serviceInfoRecord.push($root.ServiceLogger.ServiceInfoRecord.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceInfoResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceInfoResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceInfoResponse} ServiceInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceInfoResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceInfoResponse message.
         * @function verify
         * @memberof ServiceLogger.ServiceInfoResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceInfoResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceInfoRecord != null && Object.hasOwnProperty.call(message, "serviceInfoRecord")) {
                if (!Array.isArray(message.serviceInfoRecord))
                    return "serviceInfoRecord: array expected";
                for (let i = 0; i < message.serviceInfoRecord.length; ++i) {
                    let error = $root.ServiceLogger.ServiceInfoRecord.verify(message.serviceInfoRecord[i], long + 1);
                    if (error)
                        return "serviceInfoRecord." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceInfoResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceInfoResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceInfoResponse} ServiceInfoResponse
         */
        ServiceInfoResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceInfoResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceInfoResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceInfoResponse();
            if (object.serviceInfoRecord) {
                if (!Array.isArray(object.serviceInfoRecord))
                    throw TypeError(".ServiceLogger.ServiceInfoResponse.serviceInfoRecord: array expected");
                message.serviceInfoRecord = [];
                for (let i = 0; i < object.serviceInfoRecord.length; ++i) {
                    if (!$util.isObject(object.serviceInfoRecord[i]))
                        throw TypeError(".ServiceLogger.ServiceInfoResponse.serviceInfoRecord: object expected");
                    message.serviceInfoRecord[i] = $root.ServiceLogger.ServiceInfoRecord.fromObject(object.serviceInfoRecord[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceInfoResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceInfoResponse
         * @static
         * @param {ServiceLogger.ServiceInfoResponse} message ServiceInfoResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceInfoResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.serviceInfoRecord = [];
            if (message.serviceInfoRecord && message.serviceInfoRecord.length) {
                object.serviceInfoRecord = [];
                for (let j = 0; j < message.serviceInfoRecord.length; ++j)
                    object.serviceInfoRecord[j] = $root.ServiceLogger.ServiceInfoRecord.toObject(message.serviceInfoRecord[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceInfoResponse to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceInfoResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceInfoResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceInfoResponse
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceInfoResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceInfoResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceInfoResponse";
        };

        return ServiceInfoResponse;
    })();

    ServiceLogger.ServiceInfoUpdateRequest = (function() {

        /**
         * Properties of a ServiceInfoUpdateRequest.
         * @memberof ServiceLogger
         * @interface IServiceInfoUpdateRequest
         * @property {Array.<ServiceLogger.IServiceInfoRecord>|null} [serviceInfoRecord] ServiceInfoUpdateRequest serviceInfoRecord
         */

        /**
         * Constructs a new ServiceInfoUpdateRequest.
         * @memberof ServiceLogger
         * @classdesc Update one or more ServiceInfo records by their IDs
         * @implements IServiceInfoUpdateRequest
         * @constructor
         * @param {ServiceLogger.IServiceInfoUpdateRequest=} [properties] Properties to set
         */
        function ServiceInfoUpdateRequest(properties) {
            this.serviceInfoRecord = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceInfoUpdateRequest serviceInfoRecord.
         * @member {Array.<ServiceLogger.IServiceInfoRecord>} serviceInfoRecord
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @instance
         */
        ServiceInfoUpdateRequest.prototype.serviceInfoRecord = $util.emptyArray;

        /**
         * Creates a new ServiceInfoUpdateRequest instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @static
         * @param {ServiceLogger.IServiceInfoUpdateRequest=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceInfoUpdateRequest} ServiceInfoUpdateRequest instance
         */
        ServiceInfoUpdateRequest.create = function create(properties) {
            return new ServiceInfoUpdateRequest(properties);
        };

        /**
         * Encodes the specified ServiceInfoUpdateRequest message. Does not implicitly {@link ServiceLogger.ServiceInfoUpdateRequest.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @static
         * @param {ServiceLogger.IServiceInfoUpdateRequest} message ServiceInfoUpdateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceInfoUpdateRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceInfoRecord != null && message.serviceInfoRecord.length)
                for (let i = 0; i < message.serviceInfoRecord.length; ++i)
                    $root.ServiceLogger.ServiceInfoRecord.encode(message.serviceInfoRecord[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceInfoUpdateRequest message, length delimited. Does not implicitly {@link ServiceLogger.ServiceInfoUpdateRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @static
         * @param {ServiceLogger.IServiceInfoUpdateRequest} message ServiceInfoUpdateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceInfoUpdateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceInfoUpdateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceInfoUpdateRequest} ServiceInfoUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceInfoUpdateRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceInfoUpdateRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.serviceInfoRecord && message.serviceInfoRecord.length))
                            message.serviceInfoRecord = [];
                        message.serviceInfoRecord.push($root.ServiceLogger.ServiceInfoRecord.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceInfoUpdateRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceInfoUpdateRequest} ServiceInfoUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceInfoUpdateRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceInfoUpdateRequest message.
         * @function verify
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceInfoUpdateRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceInfoRecord != null && Object.hasOwnProperty.call(message, "serviceInfoRecord")) {
                if (!Array.isArray(message.serviceInfoRecord))
                    return "serviceInfoRecord: array expected";
                for (let i = 0; i < message.serviceInfoRecord.length; ++i) {
                    let error = $root.ServiceLogger.ServiceInfoRecord.verify(message.serviceInfoRecord[i], long + 1);
                    if (error)
                        return "serviceInfoRecord." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceInfoUpdateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceInfoUpdateRequest} ServiceInfoUpdateRequest
         */
        ServiceInfoUpdateRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceInfoUpdateRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceInfoUpdateRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceInfoUpdateRequest();
            if (object.serviceInfoRecord) {
                if (!Array.isArray(object.serviceInfoRecord))
                    throw TypeError(".ServiceLogger.ServiceInfoUpdateRequest.serviceInfoRecord: array expected");
                message.serviceInfoRecord = [];
                for (let i = 0; i < object.serviceInfoRecord.length; ++i) {
                    if (!$util.isObject(object.serviceInfoRecord[i]))
                        throw TypeError(".ServiceLogger.ServiceInfoUpdateRequest.serviceInfoRecord: object expected");
                    message.serviceInfoRecord[i] = $root.ServiceLogger.ServiceInfoRecord.fromObject(object.serviceInfoRecord[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceInfoUpdateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @static
         * @param {ServiceLogger.ServiceInfoUpdateRequest} message ServiceInfoUpdateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceInfoUpdateRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.serviceInfoRecord = [];
            if (message.serviceInfoRecord && message.serviceInfoRecord.length) {
                object.serviceInfoRecord = [];
                for (let j = 0; j < message.serviceInfoRecord.length; ++j)
                    object.serviceInfoRecord[j] = $root.ServiceLogger.ServiceInfoRecord.toObject(message.serviceInfoRecord[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceInfoUpdateRequest to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceInfoUpdateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceInfoUpdateRequest
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceInfoUpdateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceInfoUpdateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceInfoUpdateRequest";
        };

        return ServiceInfoUpdateRequest;
    })();

    ServiceLogger.ServiceRuleSpecifier = (function() {

        /**
         * Properties of a ServiceRuleSpecifier.
         * @memberof ServiceLogger
         * @interface IServiceRuleSpecifier
         * @property {boolean|null} [all] ServiceRuleSpecifier all
         * @property {number|null} [serviceRuleId] ServiceRuleSpecifier serviceRuleId
         * @property {number|null} [serviceInfoId] ServiceRuleSpecifier serviceInfoId
         * @property {Array.<ServiceLogger.IIdRange>|null} [resourceIdRange] ServiceRuleSpecifier resourceIdRange
         */

        /**
         * Constructs a new ServiceRuleSpecifier.
         * @memberof ServiceLogger
         * @classdesc Represents a ServiceRuleSpecifier.
         * @implements IServiceRuleSpecifier
         * @constructor
         * @param {ServiceLogger.IServiceRuleSpecifier=} [properties] Properties to set
         */
        function ServiceRuleSpecifier(properties) {
            this.resourceIdRange = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceRuleSpecifier all.
         * @member {boolean} all
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @instance
         */
        ServiceRuleSpecifier.prototype.all = false;

        /**
         * ServiceRuleSpecifier serviceRuleId.
         * @member {number} serviceRuleId
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @instance
         */
        ServiceRuleSpecifier.prototype.serviceRuleId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceRuleSpecifier serviceInfoId.
         * @member {number} serviceInfoId
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @instance
         */
        ServiceRuleSpecifier.prototype.serviceInfoId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceRuleSpecifier resourceIdRange.
         * @member {Array.<ServiceLogger.IIdRange>} resourceIdRange
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @instance
         */
        ServiceRuleSpecifier.prototype.resourceIdRange = $util.emptyArray;

        /**
         * Creates a new ServiceRuleSpecifier instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @static
         * @param {ServiceLogger.IServiceRuleSpecifier=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceRuleSpecifier} ServiceRuleSpecifier instance
         */
        ServiceRuleSpecifier.create = function create(properties) {
            return new ServiceRuleSpecifier(properties);
        };

        /**
         * Encodes the specified ServiceRuleSpecifier message. Does not implicitly {@link ServiceLogger.ServiceRuleSpecifier.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @static
         * @param {ServiceLogger.IServiceRuleSpecifier} message ServiceRuleSpecifier message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceRuleSpecifier.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.all);
            if (message.serviceRuleId != null && Object.hasOwnProperty.call(message, "serviceRuleId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.serviceRuleId);
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.serviceInfoId);
            if (message.resourceIdRange != null && message.resourceIdRange.length)
                for (let i = 0; i < message.resourceIdRange.length; ++i)
                    $root.ServiceLogger.IdRange.encode(message.resourceIdRange[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceRuleSpecifier message, length delimited. Does not implicitly {@link ServiceLogger.ServiceRuleSpecifier.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @static
         * @param {ServiceLogger.IServiceRuleSpecifier} message ServiceRuleSpecifier message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceRuleSpecifier.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceRuleSpecifier message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceRuleSpecifier} ServiceRuleSpecifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceRuleSpecifier.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceRuleSpecifier();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.all = reader.bool();
                        break;
                    }
                case 2: {
                        message.serviceRuleId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.serviceInfoId = reader.uint64();
                        break;
                    }
                case 4: {
                        if (!(message.resourceIdRange && message.resourceIdRange.length))
                            message.resourceIdRange = [];
                        message.resourceIdRange.push($root.ServiceLogger.IdRange.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceRuleSpecifier message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceRuleSpecifier} ServiceRuleSpecifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceRuleSpecifier.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceRuleSpecifier message.
         * @function verify
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceRuleSpecifier.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                if (typeof message.all !== "boolean")
                    return "all: boolean expected";
            if (message.serviceRuleId != null && Object.hasOwnProperty.call(message, "serviceRuleId"))
                if (!$util.isInteger(message.serviceRuleId) && !(message.serviceRuleId && $util.isInteger(message.serviceRuleId.low) && $util.isInteger(message.serviceRuleId.high)))
                    return "serviceRuleId: integer|Long expected";
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                if (!$util.isInteger(message.serviceInfoId) && !(message.serviceInfoId && $util.isInteger(message.serviceInfoId.low) && $util.isInteger(message.serviceInfoId.high)))
                    return "serviceInfoId: integer|Long expected";
            if (message.resourceIdRange != null && Object.hasOwnProperty.call(message, "resourceIdRange")) {
                if (!Array.isArray(message.resourceIdRange))
                    return "resourceIdRange: array expected";
                for (let i = 0; i < message.resourceIdRange.length; ++i) {
                    let error = $root.ServiceLogger.IdRange.verify(message.resourceIdRange[i], long + 1);
                    if (error)
                        return "resourceIdRange." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceRuleSpecifier message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceRuleSpecifier} ServiceRuleSpecifier
         */
        ServiceRuleSpecifier.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceRuleSpecifier)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceRuleSpecifier: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceRuleSpecifier();
            if (object.all != null)
                message.all = Boolean(object.all);
            if (object.serviceRuleId != null)
                if ($util.Long)
                    message.serviceRuleId = $util.Long.fromValue(object.serviceRuleId, true);
                else if (typeof object.serviceRuleId === "string")
                    message.serviceRuleId = parseInt(object.serviceRuleId, 10);
                else if (typeof object.serviceRuleId === "number")
                    message.serviceRuleId = object.serviceRuleId;
                else if (typeof object.serviceRuleId === "object")
                    message.serviceRuleId = new $util.LongBits(object.serviceRuleId.low >>> 0, object.serviceRuleId.high >>> 0).toNumber(true);
            if (object.serviceInfoId != null)
                if ($util.Long)
                    message.serviceInfoId = $util.Long.fromValue(object.serviceInfoId, true);
                else if (typeof object.serviceInfoId === "string")
                    message.serviceInfoId = parseInt(object.serviceInfoId, 10);
                else if (typeof object.serviceInfoId === "number")
                    message.serviceInfoId = object.serviceInfoId;
                else if (typeof object.serviceInfoId === "object")
                    message.serviceInfoId = new $util.LongBits(object.serviceInfoId.low >>> 0, object.serviceInfoId.high >>> 0).toNumber(true);
            if (object.resourceIdRange) {
                if (!Array.isArray(object.resourceIdRange))
                    throw TypeError(".ServiceLogger.ServiceRuleSpecifier.resourceIdRange: array expected");
                message.resourceIdRange = [];
                for (let i = 0; i < object.resourceIdRange.length; ++i) {
                    if (!$util.isObject(object.resourceIdRange[i]))
                        throw TypeError(".ServiceLogger.ServiceRuleSpecifier.resourceIdRange: object expected");
                    message.resourceIdRange[i] = $root.ServiceLogger.IdRange.fromObject(object.resourceIdRange[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceRuleSpecifier message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @static
         * @param {ServiceLogger.ServiceRuleSpecifier} message ServiceRuleSpecifier
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceRuleSpecifier.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.resourceIdRange = [];
            if (options.defaults) {
                object.all = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceRuleId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceRuleId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceInfoId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceInfoId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                object.all = message.all;
            if (message.serviceRuleId != null && Object.hasOwnProperty.call(message, "serviceRuleId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceRuleId = typeof message.serviceRuleId === "number" ? BigInt(message.serviceRuleId) : $util.Long.fromBits(message.serviceRuleId.low >>> 0, message.serviceRuleId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceRuleId === "number")
                    object.serviceRuleId = options.longs === String ? String(message.serviceRuleId) : message.serviceRuleId;
                else
                    object.serviceRuleId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceRuleId) : options.longs === Number ? new $util.LongBits(message.serviceRuleId.low >>> 0, message.serviceRuleId.high >>> 0).toNumber(true) : message.serviceRuleId;
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceInfoId = typeof message.serviceInfoId === "number" ? BigInt(message.serviceInfoId) : $util.Long.fromBits(message.serviceInfoId.low >>> 0, message.serviceInfoId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceInfoId === "number")
                    object.serviceInfoId = options.longs === String ? String(message.serviceInfoId) : message.serviceInfoId;
                else
                    object.serviceInfoId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceInfoId) : options.longs === Number ? new $util.LongBits(message.serviceInfoId.low >>> 0, message.serviceInfoId.high >>> 0).toNumber(true) : message.serviceInfoId;
            if (message.resourceIdRange && message.resourceIdRange.length) {
                object.resourceIdRange = [];
                for (let j = 0; j < message.resourceIdRange.length; ++j)
                    object.resourceIdRange[j] = $root.ServiceLogger.IdRange.toObject(message.resourceIdRange[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceRuleSpecifier to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceRuleSpecifier.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceRuleSpecifier
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceRuleSpecifier
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceRuleSpecifier.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceRuleSpecifier";
        };

        return ServiceRuleSpecifier;
    })();

    ServiceLogger.ServiceRuleRequest = (function() {

        /**
         * Properties of a ServiceRuleRequest.
         * @memberof ServiceLogger
         * @interface IServiceRuleRequest
         * @property {Array.<ServiceLogger.IServiceRuleSpecifier>|null} [serviceRuleSpecifier] ServiceRuleRequest serviceRuleSpecifier
         */

        /**
         * Constructs a new ServiceRuleRequest.
         * @memberof ServiceLogger
         * @classdesc Represents a ServiceRuleRequest.
         * @implements IServiceRuleRequest
         * @constructor
         * @param {ServiceLogger.IServiceRuleRequest=} [properties] Properties to set
         */
        function ServiceRuleRequest(properties) {
            this.serviceRuleSpecifier = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceRuleRequest serviceRuleSpecifier.
         * @member {Array.<ServiceLogger.IServiceRuleSpecifier>} serviceRuleSpecifier
         * @memberof ServiceLogger.ServiceRuleRequest
         * @instance
         */
        ServiceRuleRequest.prototype.serviceRuleSpecifier = $util.emptyArray;

        /**
         * Creates a new ServiceRuleRequest instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceRuleRequest
         * @static
         * @param {ServiceLogger.IServiceRuleRequest=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceRuleRequest} ServiceRuleRequest instance
         */
        ServiceRuleRequest.create = function create(properties) {
            return new ServiceRuleRequest(properties);
        };

        /**
         * Encodes the specified ServiceRuleRequest message. Does not implicitly {@link ServiceLogger.ServiceRuleRequest.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceRuleRequest
         * @static
         * @param {ServiceLogger.IServiceRuleRequest} message ServiceRuleRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceRuleRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceRuleSpecifier != null && message.serviceRuleSpecifier.length)
                for (let i = 0; i < message.serviceRuleSpecifier.length; ++i)
                    $root.ServiceLogger.ServiceRuleSpecifier.encode(message.serviceRuleSpecifier[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceRuleRequest message, length delimited. Does not implicitly {@link ServiceLogger.ServiceRuleRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceRuleRequest
         * @static
         * @param {ServiceLogger.IServiceRuleRequest} message ServiceRuleRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceRuleRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceRuleRequest message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceRuleRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceRuleRequest} ServiceRuleRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceRuleRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceRuleRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.serviceRuleSpecifier && message.serviceRuleSpecifier.length))
                            message.serviceRuleSpecifier = [];
                        message.serviceRuleSpecifier.push($root.ServiceLogger.ServiceRuleSpecifier.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceRuleRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceRuleRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceRuleRequest} ServiceRuleRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceRuleRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceRuleRequest message.
         * @function verify
         * @memberof ServiceLogger.ServiceRuleRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceRuleRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceRuleSpecifier != null && Object.hasOwnProperty.call(message, "serviceRuleSpecifier")) {
                if (!Array.isArray(message.serviceRuleSpecifier))
                    return "serviceRuleSpecifier: array expected";
                for (let i = 0; i < message.serviceRuleSpecifier.length; ++i) {
                    let error = $root.ServiceLogger.ServiceRuleSpecifier.verify(message.serviceRuleSpecifier[i], long + 1);
                    if (error)
                        return "serviceRuleSpecifier." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceRuleRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceRuleRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceRuleRequest} ServiceRuleRequest
         */
        ServiceRuleRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceRuleRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceRuleRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceRuleRequest();
            if (object.serviceRuleSpecifier) {
                if (!Array.isArray(object.serviceRuleSpecifier))
                    throw TypeError(".ServiceLogger.ServiceRuleRequest.serviceRuleSpecifier: array expected");
                message.serviceRuleSpecifier = [];
                for (let i = 0; i < object.serviceRuleSpecifier.length; ++i) {
                    if (!$util.isObject(object.serviceRuleSpecifier[i]))
                        throw TypeError(".ServiceLogger.ServiceRuleRequest.serviceRuleSpecifier: object expected");
                    message.serviceRuleSpecifier[i] = $root.ServiceLogger.ServiceRuleSpecifier.fromObject(object.serviceRuleSpecifier[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceRuleRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceRuleRequest
         * @static
         * @param {ServiceLogger.ServiceRuleRequest} message ServiceRuleRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceRuleRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.serviceRuleSpecifier = [];
            if (message.serviceRuleSpecifier && message.serviceRuleSpecifier.length) {
                object.serviceRuleSpecifier = [];
                for (let j = 0; j < message.serviceRuleSpecifier.length; ++j)
                    object.serviceRuleSpecifier[j] = $root.ServiceLogger.ServiceRuleSpecifier.toObject(message.serviceRuleSpecifier[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceRuleRequest to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceRuleRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceRuleRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceRuleRequest
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceRuleRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceRuleRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceRuleRequest";
        };

        return ServiceRuleRequest;
    })();

    ServiceLogger.ServiceRuleRecord = (function() {

        /**
         * Properties of a ServiceRuleRecord.
         * @memberof ServiceLogger
         * @interface IServiceRuleRecord
         * @property {number|null} [serviceRuleId] ServiceRuleRecord serviceRuleId
         * @property {number|null} [serviceInfoId] ServiceRuleRecord serviceInfoId
         * @property {number|null} [resourceId] ServiceRuleRecord resourceId
         * @property {boolean|null} [isLoggingEnabled] ServiceRuleRecord isLoggingEnabled
         * @property {string|null} [logLevel] ServiceRuleRecord logLevel
         * @property {string|null} [ruleStart] ServiceRuleRecord ruleStart
         * @property {string|null} [ruleEnd] ServiceRuleRecord ruleEnd
         * @property {string|null} [dateModified] ServiceRuleRecord dateModified
         */

        /**
         * Constructs a new ServiceRuleRecord.
         * @memberof ServiceLogger
         * @classdesc Represents a ServiceRuleRecord.
         * @implements IServiceRuleRecord
         * @constructor
         * @param {ServiceLogger.IServiceRuleRecord=} [properties] Properties to set
         */
        function ServiceRuleRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceRuleRecord serviceRuleId.
         * @member {number} serviceRuleId
         * @memberof ServiceLogger.ServiceRuleRecord
         * @instance
         */
        ServiceRuleRecord.prototype.serviceRuleId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceRuleRecord serviceInfoId.
         * @member {number} serviceInfoId
         * @memberof ServiceLogger.ServiceRuleRecord
         * @instance
         */
        ServiceRuleRecord.prototype.serviceInfoId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceRuleRecord resourceId.
         * @member {number} resourceId
         * @memberof ServiceLogger.ServiceRuleRecord
         * @instance
         */
        ServiceRuleRecord.prototype.resourceId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceRuleRecord isLoggingEnabled.
         * @member {boolean} isLoggingEnabled
         * @memberof ServiceLogger.ServiceRuleRecord
         * @instance
         */
        ServiceRuleRecord.prototype.isLoggingEnabled = false;

        /**
         * ServiceRuleRecord logLevel.
         * @member {string} logLevel
         * @memberof ServiceLogger.ServiceRuleRecord
         * @instance
         */
        ServiceRuleRecord.prototype.logLevel = "";

        /**
         * ServiceRuleRecord ruleStart.
         * @member {string} ruleStart
         * @memberof ServiceLogger.ServiceRuleRecord
         * @instance
         */
        ServiceRuleRecord.prototype.ruleStart = "";

        /**
         * ServiceRuleRecord ruleEnd.
         * @member {string} ruleEnd
         * @memberof ServiceLogger.ServiceRuleRecord
         * @instance
         */
        ServiceRuleRecord.prototype.ruleEnd = "";

        /**
         * ServiceRuleRecord dateModified.
         * @member {string} dateModified
         * @memberof ServiceLogger.ServiceRuleRecord
         * @instance
         */
        ServiceRuleRecord.prototype.dateModified = "";

        /**
         * Creates a new ServiceRuleRecord instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceRuleRecord
         * @static
         * @param {ServiceLogger.IServiceRuleRecord=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceRuleRecord} ServiceRuleRecord instance
         */
        ServiceRuleRecord.create = function create(properties) {
            return new ServiceRuleRecord(properties);
        };

        /**
         * Encodes the specified ServiceRuleRecord message. Does not implicitly {@link ServiceLogger.ServiceRuleRecord.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceRuleRecord
         * @static
         * @param {ServiceLogger.IServiceRuleRecord} message ServiceRuleRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceRuleRecord.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceRuleId != null && Object.hasOwnProperty.call(message, "serviceRuleId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.serviceRuleId);
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.serviceInfoId);
            if (message.resourceId != null && Object.hasOwnProperty.call(message, "resourceId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.resourceId);
            if (message.isLoggingEnabled != null && Object.hasOwnProperty.call(message, "isLoggingEnabled"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isLoggingEnabled);
            if (message.logLevel != null && Object.hasOwnProperty.call(message, "logLevel"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.logLevel);
            if (message.ruleStart != null && Object.hasOwnProperty.call(message, "ruleStart"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.ruleStart);
            if (message.ruleEnd != null && Object.hasOwnProperty.call(message, "ruleEnd"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.ruleEnd);
            if (message.dateModified != null && Object.hasOwnProperty.call(message, "dateModified"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.dateModified);
            return writer;
        };

        /**
         * Encodes the specified ServiceRuleRecord message, length delimited. Does not implicitly {@link ServiceLogger.ServiceRuleRecord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceRuleRecord
         * @static
         * @param {ServiceLogger.IServiceRuleRecord} message ServiceRuleRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceRuleRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceRuleRecord message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceRuleRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceRuleRecord} ServiceRuleRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceRuleRecord.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceRuleRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.serviceRuleId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.serviceInfoId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.resourceId = reader.uint64();
                        break;
                    }
                case 4: {
                        message.isLoggingEnabled = reader.bool();
                        break;
                    }
                case 5: {
                        message.logLevel = reader.string();
                        break;
                    }
                case 6: {
                        message.ruleStart = reader.string();
                        break;
                    }
                case 7: {
                        message.ruleEnd = reader.string();
                        break;
                    }
                case 8: {
                        message.dateModified = reader.string();
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
         * Decodes a ServiceRuleRecord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceRuleRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceRuleRecord} ServiceRuleRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceRuleRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceRuleRecord message.
         * @function verify
         * @memberof ServiceLogger.ServiceRuleRecord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceRuleRecord.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceRuleId != null && Object.hasOwnProperty.call(message, "serviceRuleId"))
                if (!$util.isInteger(message.serviceRuleId) && !(message.serviceRuleId && $util.isInteger(message.serviceRuleId.low) && $util.isInteger(message.serviceRuleId.high)))
                    return "serviceRuleId: integer|Long expected";
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                if (!$util.isInteger(message.serviceInfoId) && !(message.serviceInfoId && $util.isInteger(message.serviceInfoId.low) && $util.isInteger(message.serviceInfoId.high)))
                    return "serviceInfoId: integer|Long expected";
            if (message.resourceId != null && Object.hasOwnProperty.call(message, "resourceId"))
                if (!$util.isInteger(message.resourceId) && !(message.resourceId && $util.isInteger(message.resourceId.low) && $util.isInteger(message.resourceId.high)))
                    return "resourceId: integer|Long expected";
            if (message.isLoggingEnabled != null && Object.hasOwnProperty.call(message, "isLoggingEnabled"))
                if (typeof message.isLoggingEnabled !== "boolean")
                    return "isLoggingEnabled: boolean expected";
            if (message.logLevel != null && Object.hasOwnProperty.call(message, "logLevel"))
                if (!$util.isString(message.logLevel))
                    return "logLevel: string expected";
            if (message.ruleStart != null && Object.hasOwnProperty.call(message, "ruleStart"))
                if (!$util.isString(message.ruleStart))
                    return "ruleStart: string expected";
            if (message.ruleEnd != null && Object.hasOwnProperty.call(message, "ruleEnd"))
                if (!$util.isString(message.ruleEnd))
                    return "ruleEnd: string expected";
            if (message.dateModified != null && Object.hasOwnProperty.call(message, "dateModified"))
                if (!$util.isString(message.dateModified))
                    return "dateModified: string expected";
            return null;
        };

        /**
         * Creates a ServiceRuleRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceRuleRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceRuleRecord} ServiceRuleRecord
         */
        ServiceRuleRecord.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceRuleRecord)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceRuleRecord: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceRuleRecord();
            if (object.serviceRuleId != null)
                if ($util.Long)
                    message.serviceRuleId = $util.Long.fromValue(object.serviceRuleId, true);
                else if (typeof object.serviceRuleId === "string")
                    message.serviceRuleId = parseInt(object.serviceRuleId, 10);
                else if (typeof object.serviceRuleId === "number")
                    message.serviceRuleId = object.serviceRuleId;
                else if (typeof object.serviceRuleId === "object")
                    message.serviceRuleId = new $util.LongBits(object.serviceRuleId.low >>> 0, object.serviceRuleId.high >>> 0).toNumber(true);
            if (object.serviceInfoId != null)
                if ($util.Long)
                    message.serviceInfoId = $util.Long.fromValue(object.serviceInfoId, true);
                else if (typeof object.serviceInfoId === "string")
                    message.serviceInfoId = parseInt(object.serviceInfoId, 10);
                else if (typeof object.serviceInfoId === "number")
                    message.serviceInfoId = object.serviceInfoId;
                else if (typeof object.serviceInfoId === "object")
                    message.serviceInfoId = new $util.LongBits(object.serviceInfoId.low >>> 0, object.serviceInfoId.high >>> 0).toNumber(true);
            if (object.resourceId != null)
                if ($util.Long)
                    message.resourceId = $util.Long.fromValue(object.resourceId, true);
                else if (typeof object.resourceId === "string")
                    message.resourceId = parseInt(object.resourceId, 10);
                else if (typeof object.resourceId === "number")
                    message.resourceId = object.resourceId;
                else if (typeof object.resourceId === "object")
                    message.resourceId = new $util.LongBits(object.resourceId.low >>> 0, object.resourceId.high >>> 0).toNumber(true);
            if (object.isLoggingEnabled != null)
                message.isLoggingEnabled = Boolean(object.isLoggingEnabled);
            if (object.logLevel != null)
                message.logLevel = String(object.logLevel);
            if (object.ruleStart != null)
                message.ruleStart = String(object.ruleStart);
            if (object.ruleEnd != null)
                message.ruleEnd = String(object.ruleEnd);
            if (object.dateModified != null)
                message.dateModified = String(object.dateModified);
            return message;
        };

        /**
         * Creates a plain object from a ServiceRuleRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceRuleRecord
         * @static
         * @param {ServiceLogger.ServiceRuleRecord} message ServiceRuleRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceRuleRecord.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceRuleId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceRuleId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceInfoId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceInfoId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.resourceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.resourceId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.isLoggingEnabled = false;
                object.logLevel = "";
                object.ruleStart = "";
                object.ruleEnd = "";
                object.dateModified = "";
            }
            if (message.serviceRuleId != null && Object.hasOwnProperty.call(message, "serviceRuleId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceRuleId = typeof message.serviceRuleId === "number" ? BigInt(message.serviceRuleId) : $util.Long.fromBits(message.serviceRuleId.low >>> 0, message.serviceRuleId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceRuleId === "number")
                    object.serviceRuleId = options.longs === String ? String(message.serviceRuleId) : message.serviceRuleId;
                else
                    object.serviceRuleId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceRuleId) : options.longs === Number ? new $util.LongBits(message.serviceRuleId.low >>> 0, message.serviceRuleId.high >>> 0).toNumber(true) : message.serviceRuleId;
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceInfoId = typeof message.serviceInfoId === "number" ? BigInt(message.serviceInfoId) : $util.Long.fromBits(message.serviceInfoId.low >>> 0, message.serviceInfoId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceInfoId === "number")
                    object.serviceInfoId = options.longs === String ? String(message.serviceInfoId) : message.serviceInfoId;
                else
                    object.serviceInfoId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceInfoId) : options.longs === Number ? new $util.LongBits(message.serviceInfoId.low >>> 0, message.serviceInfoId.high >>> 0).toNumber(true) : message.serviceInfoId;
            if (message.resourceId != null && Object.hasOwnProperty.call(message, "resourceId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.resourceId = typeof message.resourceId === "number" ? BigInt(message.resourceId) : $util.Long.fromBits(message.resourceId.low >>> 0, message.resourceId.high >>> 0, true).toBigInt();
                else if (typeof message.resourceId === "number")
                    object.resourceId = options.longs === String ? String(message.resourceId) : message.resourceId;
                else
                    object.resourceId = options.longs === String ? $util.Long.prototype.toString.call(message.resourceId) : options.longs === Number ? new $util.LongBits(message.resourceId.low >>> 0, message.resourceId.high >>> 0).toNumber(true) : message.resourceId;
            if (message.isLoggingEnabled != null && Object.hasOwnProperty.call(message, "isLoggingEnabled"))
                object.isLoggingEnabled = message.isLoggingEnabled;
            if (message.logLevel != null && Object.hasOwnProperty.call(message, "logLevel"))
                object.logLevel = message.logLevel;
            if (message.ruleStart != null && Object.hasOwnProperty.call(message, "ruleStart"))
                object.ruleStart = message.ruleStart;
            if (message.ruleEnd != null && Object.hasOwnProperty.call(message, "ruleEnd"))
                object.ruleEnd = message.ruleEnd;
            if (message.dateModified != null && Object.hasOwnProperty.call(message, "dateModified"))
                object.dateModified = message.dateModified;
            return object;
        };

        /**
         * Converts this ServiceRuleRecord to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceRuleRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceRuleRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceRuleRecord
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceRuleRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceRuleRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceRuleRecord";
        };

        return ServiceRuleRecord;
    })();

    ServiceLogger.ServiceRuleResponse = (function() {

        /**
         * Properties of a ServiceRuleResponse.
         * @memberof ServiceLogger
         * @interface IServiceRuleResponse
         * @property {Array.<ServiceLogger.IServiceRuleRecord>|null} [serviceRule] ServiceRuleResponse serviceRule
         */

        /**
         * Constructs a new ServiceRuleResponse.
         * @memberof ServiceLogger
         * @classdesc Represents a ServiceRuleResponse.
         * @implements IServiceRuleResponse
         * @constructor
         * @param {ServiceLogger.IServiceRuleResponse=} [properties] Properties to set
         */
        function ServiceRuleResponse(properties) {
            this.serviceRule = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceRuleResponse serviceRule.
         * @member {Array.<ServiceLogger.IServiceRuleRecord>} serviceRule
         * @memberof ServiceLogger.ServiceRuleResponse
         * @instance
         */
        ServiceRuleResponse.prototype.serviceRule = $util.emptyArray;

        /**
         * Creates a new ServiceRuleResponse instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceRuleResponse
         * @static
         * @param {ServiceLogger.IServiceRuleResponse=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceRuleResponse} ServiceRuleResponse instance
         */
        ServiceRuleResponse.create = function create(properties) {
            return new ServiceRuleResponse(properties);
        };

        /**
         * Encodes the specified ServiceRuleResponse message. Does not implicitly {@link ServiceLogger.ServiceRuleResponse.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceRuleResponse
         * @static
         * @param {ServiceLogger.IServiceRuleResponse} message ServiceRuleResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceRuleResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceRule != null && message.serviceRule.length)
                for (let i = 0; i < message.serviceRule.length; ++i)
                    $root.ServiceLogger.ServiceRuleRecord.encode(message.serviceRule[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceRuleResponse message, length delimited. Does not implicitly {@link ServiceLogger.ServiceRuleResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceRuleResponse
         * @static
         * @param {ServiceLogger.IServiceRuleResponse} message ServiceRuleResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceRuleResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceRuleResponse message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceRuleResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceRuleResponse} ServiceRuleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceRuleResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceRuleResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.serviceRule && message.serviceRule.length))
                            message.serviceRule = [];
                        message.serviceRule.push($root.ServiceLogger.ServiceRuleRecord.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceRuleResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceRuleResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceRuleResponse} ServiceRuleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceRuleResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceRuleResponse message.
         * @function verify
         * @memberof ServiceLogger.ServiceRuleResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceRuleResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceRule != null && Object.hasOwnProperty.call(message, "serviceRule")) {
                if (!Array.isArray(message.serviceRule))
                    return "serviceRule: array expected";
                for (let i = 0; i < message.serviceRule.length; ++i) {
                    let error = $root.ServiceLogger.ServiceRuleRecord.verify(message.serviceRule[i], long + 1);
                    if (error)
                        return "serviceRule." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceRuleResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceRuleResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceRuleResponse} ServiceRuleResponse
         */
        ServiceRuleResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceRuleResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceRuleResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceRuleResponse();
            if (object.serviceRule) {
                if (!Array.isArray(object.serviceRule))
                    throw TypeError(".ServiceLogger.ServiceRuleResponse.serviceRule: array expected");
                message.serviceRule = [];
                for (let i = 0; i < object.serviceRule.length; ++i) {
                    if (!$util.isObject(object.serviceRule[i]))
                        throw TypeError(".ServiceLogger.ServiceRuleResponse.serviceRule: object expected");
                    message.serviceRule[i] = $root.ServiceLogger.ServiceRuleRecord.fromObject(object.serviceRule[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceRuleResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceRuleResponse
         * @static
         * @param {ServiceLogger.ServiceRuleResponse} message ServiceRuleResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceRuleResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.serviceRule = [];
            if (message.serviceRule && message.serviceRule.length) {
                object.serviceRule = [];
                for (let j = 0; j < message.serviceRule.length; ++j)
                    object.serviceRule[j] = $root.ServiceLogger.ServiceRuleRecord.toObject(message.serviceRule[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceRuleResponse to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceRuleResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceRuleResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceRuleResponse
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceRuleResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceRuleResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceRuleResponse";
        };

        return ServiceRuleResponse;
    })();

    ServiceLogger.ServiceRuleUpdateRequest = (function() {

        /**
         * Properties of a ServiceRuleUpdateRequest.
         * @memberof ServiceLogger
         * @interface IServiceRuleUpdateRequest
         * @property {Array.<ServiceLogger.IServiceRuleRecord>|null} [serviceRuleRecord] ServiceRuleUpdateRequest serviceRuleRecord
         */

        /**
         * Constructs a new ServiceRuleUpdateRequest.
         * @memberof ServiceLogger
         * @classdesc Update one or more ServiceRule records by their IDs
         * @implements IServiceRuleUpdateRequest
         * @constructor
         * @param {ServiceLogger.IServiceRuleUpdateRequest=} [properties] Properties to set
         */
        function ServiceRuleUpdateRequest(properties) {
            this.serviceRuleRecord = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceRuleUpdateRequest serviceRuleRecord.
         * @member {Array.<ServiceLogger.IServiceRuleRecord>} serviceRuleRecord
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @instance
         */
        ServiceRuleUpdateRequest.prototype.serviceRuleRecord = $util.emptyArray;

        /**
         * Creates a new ServiceRuleUpdateRequest instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @static
         * @param {ServiceLogger.IServiceRuleUpdateRequest=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceRuleUpdateRequest} ServiceRuleUpdateRequest instance
         */
        ServiceRuleUpdateRequest.create = function create(properties) {
            return new ServiceRuleUpdateRequest(properties);
        };

        /**
         * Encodes the specified ServiceRuleUpdateRequest message. Does not implicitly {@link ServiceLogger.ServiceRuleUpdateRequest.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @static
         * @param {ServiceLogger.IServiceRuleUpdateRequest} message ServiceRuleUpdateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceRuleUpdateRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceRuleRecord != null && message.serviceRuleRecord.length)
                for (let i = 0; i < message.serviceRuleRecord.length; ++i)
                    $root.ServiceLogger.ServiceRuleRecord.encode(message.serviceRuleRecord[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceRuleUpdateRequest message, length delimited. Does not implicitly {@link ServiceLogger.ServiceRuleUpdateRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @static
         * @param {ServiceLogger.IServiceRuleUpdateRequest} message ServiceRuleUpdateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceRuleUpdateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceRuleUpdateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceRuleUpdateRequest} ServiceRuleUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceRuleUpdateRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceRuleUpdateRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.serviceRuleRecord && message.serviceRuleRecord.length))
                            message.serviceRuleRecord = [];
                        message.serviceRuleRecord.push($root.ServiceLogger.ServiceRuleRecord.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceRuleUpdateRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceRuleUpdateRequest} ServiceRuleUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceRuleUpdateRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceRuleUpdateRequest message.
         * @function verify
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceRuleUpdateRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceRuleRecord != null && Object.hasOwnProperty.call(message, "serviceRuleRecord")) {
                if (!Array.isArray(message.serviceRuleRecord))
                    return "serviceRuleRecord: array expected";
                for (let i = 0; i < message.serviceRuleRecord.length; ++i) {
                    let error = $root.ServiceLogger.ServiceRuleRecord.verify(message.serviceRuleRecord[i], long + 1);
                    if (error)
                        return "serviceRuleRecord." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceRuleUpdateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceRuleUpdateRequest} ServiceRuleUpdateRequest
         */
        ServiceRuleUpdateRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceRuleUpdateRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceRuleUpdateRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceRuleUpdateRequest();
            if (object.serviceRuleRecord) {
                if (!Array.isArray(object.serviceRuleRecord))
                    throw TypeError(".ServiceLogger.ServiceRuleUpdateRequest.serviceRuleRecord: array expected");
                message.serviceRuleRecord = [];
                for (let i = 0; i < object.serviceRuleRecord.length; ++i) {
                    if (!$util.isObject(object.serviceRuleRecord[i]))
                        throw TypeError(".ServiceLogger.ServiceRuleUpdateRequest.serviceRuleRecord: object expected");
                    message.serviceRuleRecord[i] = $root.ServiceLogger.ServiceRuleRecord.fromObject(object.serviceRuleRecord[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceRuleUpdateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @static
         * @param {ServiceLogger.ServiceRuleUpdateRequest} message ServiceRuleUpdateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceRuleUpdateRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.serviceRuleRecord = [];
            if (message.serviceRuleRecord && message.serviceRuleRecord.length) {
                object.serviceRuleRecord = [];
                for (let j = 0; j < message.serviceRuleRecord.length; ++j)
                    object.serviceRuleRecord[j] = $root.ServiceLogger.ServiceRuleRecord.toObject(message.serviceRuleRecord[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceRuleUpdateRequest to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceRuleUpdateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceRuleUpdateRequest
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceRuleUpdateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceRuleUpdateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceRuleUpdateRequest";
        };

        return ServiceRuleUpdateRequest;
    })();

    ServiceLogger.ServiceLogSpecifier = (function() {

        /**
         * Properties of a ServiceLogSpecifier.
         * @memberof ServiceLogger
         * @interface IServiceLogSpecifier
         * @property {boolean|null} [all] ServiceLogSpecifier all
         * @property {number|null} [serviceLogId] ServiceLogSpecifier serviceLogId
         * @property {Array.<ServiceLogger.IIdRange>|null} [serviceIdRange] ServiceLogSpecifier serviceIdRange
         * @property {Array.<ServiceLogger.IIdRange>|null} [resourceIdRange] ServiceLogSpecifier resourceIdRange
         * @property {string|null} [startDateTime] ServiceLogSpecifier startDateTime
         * @property {string|null} [endDateTime] ServiceLogSpecifier endDateTime
         */

        /**
         * Constructs a new ServiceLogSpecifier.
         * @memberof ServiceLogger
         * @classdesc Represents a ServiceLogSpecifier.
         * @implements IServiceLogSpecifier
         * @constructor
         * @param {ServiceLogger.IServiceLogSpecifier=} [properties] Properties to set
         */
        function ServiceLogSpecifier(properties) {
            this.serviceIdRange = [];
            this.resourceIdRange = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceLogSpecifier all.
         * @member {boolean} all
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @instance
         */
        ServiceLogSpecifier.prototype.all = false;

        /**
         * ServiceLogSpecifier serviceLogId.
         * @member {number} serviceLogId
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @instance
         */
        ServiceLogSpecifier.prototype.serviceLogId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceLogSpecifier serviceIdRange.
         * @member {Array.<ServiceLogger.IIdRange>} serviceIdRange
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @instance
         */
        ServiceLogSpecifier.prototype.serviceIdRange = $util.emptyArray;

        /**
         * ServiceLogSpecifier resourceIdRange.
         * @member {Array.<ServiceLogger.IIdRange>} resourceIdRange
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @instance
         */
        ServiceLogSpecifier.prototype.resourceIdRange = $util.emptyArray;

        /**
         * ServiceLogSpecifier startDateTime.
         * @member {string} startDateTime
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @instance
         */
        ServiceLogSpecifier.prototype.startDateTime = "";

        /**
         * ServiceLogSpecifier endDateTime.
         * @member {string} endDateTime
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @instance
         */
        ServiceLogSpecifier.prototype.endDateTime = "";

        /**
         * Creates a new ServiceLogSpecifier instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @static
         * @param {ServiceLogger.IServiceLogSpecifier=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceLogSpecifier} ServiceLogSpecifier instance
         */
        ServiceLogSpecifier.create = function create(properties) {
            return new ServiceLogSpecifier(properties);
        };

        /**
         * Encodes the specified ServiceLogSpecifier message. Does not implicitly {@link ServiceLogger.ServiceLogSpecifier.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @static
         * @param {ServiceLogger.IServiceLogSpecifier} message ServiceLogSpecifier message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogSpecifier.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.all);
            if (message.serviceLogId != null && Object.hasOwnProperty.call(message, "serviceLogId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.serviceLogId);
            if (message.serviceIdRange != null && message.serviceIdRange.length)
                for (let i = 0; i < message.serviceIdRange.length; ++i)
                    $root.ServiceLogger.IdRange.encode(message.serviceIdRange[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.resourceIdRange != null && message.resourceIdRange.length)
                for (let i = 0; i < message.resourceIdRange.length; ++i)
                    $root.ServiceLogger.IdRange.encode(message.resourceIdRange[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.startDateTime != null && Object.hasOwnProperty.call(message, "startDateTime"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.startDateTime);
            if (message.endDateTime != null && Object.hasOwnProperty.call(message, "endDateTime"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.endDateTime);
            return writer;
        };

        /**
         * Encodes the specified ServiceLogSpecifier message, length delimited. Does not implicitly {@link ServiceLogger.ServiceLogSpecifier.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @static
         * @param {ServiceLogger.IServiceLogSpecifier} message ServiceLogSpecifier message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogSpecifier.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceLogSpecifier message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceLogSpecifier} ServiceLogSpecifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogSpecifier.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceLogSpecifier();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.all = reader.bool();
                        break;
                    }
                case 2: {
                        message.serviceLogId = reader.uint64();
                        break;
                    }
                case 3: {
                        if (!(message.serviceIdRange && message.serviceIdRange.length))
                            message.serviceIdRange = [];
                        message.serviceIdRange.push($root.ServiceLogger.IdRange.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 4: {
                        if (!(message.resourceIdRange && message.resourceIdRange.length))
                            message.resourceIdRange = [];
                        message.resourceIdRange.push($root.ServiceLogger.IdRange.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        message.startDateTime = reader.string();
                        break;
                    }
                case 6: {
                        message.endDateTime = reader.string();
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
         * Decodes a ServiceLogSpecifier message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceLogSpecifier} ServiceLogSpecifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogSpecifier.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceLogSpecifier message.
         * @function verify
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceLogSpecifier.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                if (typeof message.all !== "boolean")
                    return "all: boolean expected";
            if (message.serviceLogId != null && Object.hasOwnProperty.call(message, "serviceLogId"))
                if (!$util.isInteger(message.serviceLogId) && !(message.serviceLogId && $util.isInteger(message.serviceLogId.low) && $util.isInteger(message.serviceLogId.high)))
                    return "serviceLogId: integer|Long expected";
            if (message.serviceIdRange != null && Object.hasOwnProperty.call(message, "serviceIdRange")) {
                if (!Array.isArray(message.serviceIdRange))
                    return "serviceIdRange: array expected";
                for (let i = 0; i < message.serviceIdRange.length; ++i) {
                    let error = $root.ServiceLogger.IdRange.verify(message.serviceIdRange[i], long + 1);
                    if (error)
                        return "serviceIdRange." + error;
                }
            }
            if (message.resourceIdRange != null && Object.hasOwnProperty.call(message, "resourceIdRange")) {
                if (!Array.isArray(message.resourceIdRange))
                    return "resourceIdRange: array expected";
                for (let i = 0; i < message.resourceIdRange.length; ++i) {
                    let error = $root.ServiceLogger.IdRange.verify(message.resourceIdRange[i], long + 1);
                    if (error)
                        return "resourceIdRange." + error;
                }
            }
            if (message.startDateTime != null && Object.hasOwnProperty.call(message, "startDateTime"))
                if (!$util.isString(message.startDateTime))
                    return "startDateTime: string expected";
            if (message.endDateTime != null && Object.hasOwnProperty.call(message, "endDateTime"))
                if (!$util.isString(message.endDateTime))
                    return "endDateTime: string expected";
            return null;
        };

        /**
         * Creates a ServiceLogSpecifier message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceLogSpecifier} ServiceLogSpecifier
         */
        ServiceLogSpecifier.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceLogSpecifier)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceLogSpecifier: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceLogSpecifier();
            if (object.all != null)
                message.all = Boolean(object.all);
            if (object.serviceLogId != null)
                if ($util.Long)
                    message.serviceLogId = $util.Long.fromValue(object.serviceLogId, true);
                else if (typeof object.serviceLogId === "string")
                    message.serviceLogId = parseInt(object.serviceLogId, 10);
                else if (typeof object.serviceLogId === "number")
                    message.serviceLogId = object.serviceLogId;
                else if (typeof object.serviceLogId === "object")
                    message.serviceLogId = new $util.LongBits(object.serviceLogId.low >>> 0, object.serviceLogId.high >>> 0).toNumber(true);
            if (object.serviceIdRange) {
                if (!Array.isArray(object.serviceIdRange))
                    throw TypeError(".ServiceLogger.ServiceLogSpecifier.serviceIdRange: array expected");
                message.serviceIdRange = [];
                for (let i = 0; i < object.serviceIdRange.length; ++i) {
                    if (!$util.isObject(object.serviceIdRange[i]))
                        throw TypeError(".ServiceLogger.ServiceLogSpecifier.serviceIdRange: object expected");
                    message.serviceIdRange[i] = $root.ServiceLogger.IdRange.fromObject(object.serviceIdRange[i], long + 1);
                }
            }
            if (object.resourceIdRange) {
                if (!Array.isArray(object.resourceIdRange))
                    throw TypeError(".ServiceLogger.ServiceLogSpecifier.resourceIdRange: array expected");
                message.resourceIdRange = [];
                for (let i = 0; i < object.resourceIdRange.length; ++i) {
                    if (!$util.isObject(object.resourceIdRange[i]))
                        throw TypeError(".ServiceLogger.ServiceLogSpecifier.resourceIdRange: object expected");
                    message.resourceIdRange[i] = $root.ServiceLogger.IdRange.fromObject(object.resourceIdRange[i], long + 1);
                }
            }
            if (object.startDateTime != null)
                message.startDateTime = String(object.startDateTime);
            if (object.endDateTime != null)
                message.endDateTime = String(object.endDateTime);
            return message;
        };

        /**
         * Creates a plain object from a ServiceLogSpecifier message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @static
         * @param {ServiceLogger.ServiceLogSpecifier} message ServiceLogSpecifier
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceLogSpecifier.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.serviceIdRange = [];
                object.resourceIdRange = [];
            }
            if (options.defaults) {
                object.all = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceLogId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceLogId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.startDateTime = "";
                object.endDateTime = "";
            }
            if (message.all != null && Object.hasOwnProperty.call(message, "all"))
                object.all = message.all;
            if (message.serviceLogId != null && Object.hasOwnProperty.call(message, "serviceLogId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceLogId = typeof message.serviceLogId === "number" ? BigInt(message.serviceLogId) : $util.Long.fromBits(message.serviceLogId.low >>> 0, message.serviceLogId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceLogId === "number")
                    object.serviceLogId = options.longs === String ? String(message.serviceLogId) : message.serviceLogId;
                else
                    object.serviceLogId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceLogId) : options.longs === Number ? new $util.LongBits(message.serviceLogId.low >>> 0, message.serviceLogId.high >>> 0).toNumber(true) : message.serviceLogId;
            if (message.serviceIdRange && message.serviceIdRange.length) {
                object.serviceIdRange = [];
                for (let j = 0; j < message.serviceIdRange.length; ++j)
                    object.serviceIdRange[j] = $root.ServiceLogger.IdRange.toObject(message.serviceIdRange[j], options, q + 1);
            }
            if (message.resourceIdRange && message.resourceIdRange.length) {
                object.resourceIdRange = [];
                for (let j = 0; j < message.resourceIdRange.length; ++j)
                    object.resourceIdRange[j] = $root.ServiceLogger.IdRange.toObject(message.resourceIdRange[j], options, q + 1);
            }
            if (message.startDateTime != null && Object.hasOwnProperty.call(message, "startDateTime"))
                object.startDateTime = message.startDateTime;
            if (message.endDateTime != null && Object.hasOwnProperty.call(message, "endDateTime"))
                object.endDateTime = message.endDateTime;
            return object;
        };

        /**
         * Converts this ServiceLogSpecifier to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceLogSpecifier.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceLogSpecifier
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceLogSpecifier
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceLogSpecifier.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceLogSpecifier";
        };

        return ServiceLogSpecifier;
    })();

    ServiceLogger.ServiceLogGetRequest = (function() {

        /**
         * Properties of a ServiceLogGetRequest.
         * @memberof ServiceLogger
         * @interface IServiceLogGetRequest
         * @property {Array.<ServiceLogger.IServiceLogSpecifier>|null} [serviceLogSpecifier] ServiceLogGetRequest serviceLogSpecifier
         */

        /**
         * Constructs a new ServiceLogGetRequest.
         * @memberof ServiceLogger
         * @classdesc Represents a ServiceLogGetRequest.
         * @implements IServiceLogGetRequest
         * @constructor
         * @param {ServiceLogger.IServiceLogGetRequest=} [properties] Properties to set
         */
        function ServiceLogGetRequest(properties) {
            this.serviceLogSpecifier = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceLogGetRequest serviceLogSpecifier.
         * @member {Array.<ServiceLogger.IServiceLogSpecifier>} serviceLogSpecifier
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @instance
         */
        ServiceLogGetRequest.prototype.serviceLogSpecifier = $util.emptyArray;

        /**
         * Creates a new ServiceLogGetRequest instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @static
         * @param {ServiceLogger.IServiceLogGetRequest=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceLogGetRequest} ServiceLogGetRequest instance
         */
        ServiceLogGetRequest.create = function create(properties) {
            return new ServiceLogGetRequest(properties);
        };

        /**
         * Encodes the specified ServiceLogGetRequest message. Does not implicitly {@link ServiceLogger.ServiceLogGetRequest.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @static
         * @param {ServiceLogger.IServiceLogGetRequest} message ServiceLogGetRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogGetRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceLogSpecifier != null && message.serviceLogSpecifier.length)
                for (let i = 0; i < message.serviceLogSpecifier.length; ++i)
                    $root.ServiceLogger.ServiceLogSpecifier.encode(message.serviceLogSpecifier[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceLogGetRequest message, length delimited. Does not implicitly {@link ServiceLogger.ServiceLogGetRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @static
         * @param {ServiceLogger.IServiceLogGetRequest} message ServiceLogGetRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogGetRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceLogGetRequest message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceLogGetRequest} ServiceLogGetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogGetRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceLogGetRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.serviceLogSpecifier && message.serviceLogSpecifier.length))
                            message.serviceLogSpecifier = [];
                        message.serviceLogSpecifier.push($root.ServiceLogger.ServiceLogSpecifier.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceLogGetRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceLogGetRequest} ServiceLogGetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogGetRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceLogGetRequest message.
         * @function verify
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceLogGetRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceLogSpecifier != null && Object.hasOwnProperty.call(message, "serviceLogSpecifier")) {
                if (!Array.isArray(message.serviceLogSpecifier))
                    return "serviceLogSpecifier: array expected";
                for (let i = 0; i < message.serviceLogSpecifier.length; ++i) {
                    let error = $root.ServiceLogger.ServiceLogSpecifier.verify(message.serviceLogSpecifier[i], long + 1);
                    if (error)
                        return "serviceLogSpecifier." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceLogGetRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceLogGetRequest} ServiceLogGetRequest
         */
        ServiceLogGetRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceLogGetRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceLogGetRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceLogGetRequest();
            if (object.serviceLogSpecifier) {
                if (!Array.isArray(object.serviceLogSpecifier))
                    throw TypeError(".ServiceLogger.ServiceLogGetRequest.serviceLogSpecifier: array expected");
                message.serviceLogSpecifier = [];
                for (let i = 0; i < object.serviceLogSpecifier.length; ++i) {
                    if (!$util.isObject(object.serviceLogSpecifier[i]))
                        throw TypeError(".ServiceLogger.ServiceLogGetRequest.serviceLogSpecifier: object expected");
                    message.serviceLogSpecifier[i] = $root.ServiceLogger.ServiceLogSpecifier.fromObject(object.serviceLogSpecifier[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceLogGetRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @static
         * @param {ServiceLogger.ServiceLogGetRequest} message ServiceLogGetRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceLogGetRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.serviceLogSpecifier = [];
            if (message.serviceLogSpecifier && message.serviceLogSpecifier.length) {
                object.serviceLogSpecifier = [];
                for (let j = 0; j < message.serviceLogSpecifier.length; ++j)
                    object.serviceLogSpecifier[j] = $root.ServiceLogger.ServiceLogSpecifier.toObject(message.serviceLogSpecifier[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceLogGetRequest to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceLogGetRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceLogGetRequest
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceLogGetRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceLogGetRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceLogGetRequest";
        };

        return ServiceLogGetRequest;
    })();

    ServiceLogger.ServiceLogRecord = (function() {

        /**
         * Properties of a ServiceLogRecord.
         * @memberof ServiceLogger
         * @interface IServiceLogRecord
         * @property {number|null} [serviceLogId] ServiceLogRecord serviceLogId
         * @property {number|null} [serviceInfoId] ServiceLogRecord serviceInfoId
         * @property {number|null} [resourceId] ServiceLogRecord resourceId
         * @property {string|null} [logger] ServiceLogRecord logger
         * @property {string|null} [logLevel] ServiceLogRecord logLevel
         * @property {string|null} [message] ServiceLogRecord message
         * @property {string|null} [exception] ServiceLogRecord exception
         * @property {string|null} [dateCreated] ServiceLogRecord dateCreated
         */

        /**
         * Constructs a new ServiceLogRecord.
         * @memberof ServiceLogger
         * @classdesc Represents a ServiceLogRecord.
         * @implements IServiceLogRecord
         * @constructor
         * @param {ServiceLogger.IServiceLogRecord=} [properties] Properties to set
         */
        function ServiceLogRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceLogRecord serviceLogId.
         * @member {number} serviceLogId
         * @memberof ServiceLogger.ServiceLogRecord
         * @instance
         */
        ServiceLogRecord.prototype.serviceLogId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceLogRecord serviceInfoId.
         * @member {number} serviceInfoId
         * @memberof ServiceLogger.ServiceLogRecord
         * @instance
         */
        ServiceLogRecord.prototype.serviceInfoId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceLogRecord resourceId.
         * @member {number} resourceId
         * @memberof ServiceLogger.ServiceLogRecord
         * @instance
         */
        ServiceLogRecord.prototype.resourceId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceLogRecord logger.
         * @member {string} logger
         * @memberof ServiceLogger.ServiceLogRecord
         * @instance
         */
        ServiceLogRecord.prototype.logger = "";

        /**
         * ServiceLogRecord logLevel.
         * @member {string} logLevel
         * @memberof ServiceLogger.ServiceLogRecord
         * @instance
         */
        ServiceLogRecord.prototype.logLevel = "";

        /**
         * ServiceLogRecord message.
         * @member {string} message
         * @memberof ServiceLogger.ServiceLogRecord
         * @instance
         */
        ServiceLogRecord.prototype.message = "";

        /**
         * ServiceLogRecord exception.
         * @member {string} exception
         * @memberof ServiceLogger.ServiceLogRecord
         * @instance
         */
        ServiceLogRecord.prototype.exception = "";

        /**
         * ServiceLogRecord dateCreated.
         * @member {string} dateCreated
         * @memberof ServiceLogger.ServiceLogRecord
         * @instance
         */
        ServiceLogRecord.prototype.dateCreated = "";

        /**
         * Creates a new ServiceLogRecord instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceLogRecord
         * @static
         * @param {ServiceLogger.IServiceLogRecord=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceLogRecord} ServiceLogRecord instance
         */
        ServiceLogRecord.create = function create(properties) {
            return new ServiceLogRecord(properties);
        };

        /**
         * Encodes the specified ServiceLogRecord message. Does not implicitly {@link ServiceLogger.ServiceLogRecord.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceLogRecord
         * @static
         * @param {ServiceLogger.IServiceLogRecord} message ServiceLogRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogRecord.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceLogId != null && Object.hasOwnProperty.call(message, "serviceLogId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.serviceLogId);
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.serviceInfoId);
            if (message.resourceId != null && Object.hasOwnProperty.call(message, "resourceId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.resourceId);
            if (message.logger != null && Object.hasOwnProperty.call(message, "logger"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.logger);
            if (message.logLevel != null && Object.hasOwnProperty.call(message, "logLevel"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.logLevel);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.message);
            if (message.exception != null && Object.hasOwnProperty.call(message, "exception"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.exception);
            if (message.dateCreated != null && Object.hasOwnProperty.call(message, "dateCreated"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.dateCreated);
            return writer;
        };

        /**
         * Encodes the specified ServiceLogRecord message, length delimited. Does not implicitly {@link ServiceLogger.ServiceLogRecord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceLogRecord
         * @static
         * @param {ServiceLogger.IServiceLogRecord} message ServiceLogRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceLogRecord message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceLogRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceLogRecord} ServiceLogRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogRecord.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceLogRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.serviceLogId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.serviceInfoId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.resourceId = reader.uint64();
                        break;
                    }
                case 4: {
                        message.logger = reader.string();
                        break;
                    }
                case 5: {
                        message.logLevel = reader.string();
                        break;
                    }
                case 6: {
                        message.message = reader.string();
                        break;
                    }
                case 7: {
                        message.exception = reader.string();
                        break;
                    }
                case 8: {
                        message.dateCreated = reader.string();
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
         * Decodes a ServiceLogRecord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceLogRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceLogRecord} ServiceLogRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceLogRecord message.
         * @function verify
         * @memberof ServiceLogger.ServiceLogRecord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceLogRecord.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceLogId != null && Object.hasOwnProperty.call(message, "serviceLogId"))
                if (!$util.isInteger(message.serviceLogId) && !(message.serviceLogId && $util.isInteger(message.serviceLogId.low) && $util.isInteger(message.serviceLogId.high)))
                    return "serviceLogId: integer|Long expected";
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                if (!$util.isInteger(message.serviceInfoId) && !(message.serviceInfoId && $util.isInteger(message.serviceInfoId.low) && $util.isInteger(message.serviceInfoId.high)))
                    return "serviceInfoId: integer|Long expected";
            if (message.resourceId != null && Object.hasOwnProperty.call(message, "resourceId"))
                if (!$util.isInteger(message.resourceId) && !(message.resourceId && $util.isInteger(message.resourceId.low) && $util.isInteger(message.resourceId.high)))
                    return "resourceId: integer|Long expected";
            if (message.logger != null && Object.hasOwnProperty.call(message, "logger"))
                if (!$util.isString(message.logger))
                    return "logger: string expected";
            if (message.logLevel != null && Object.hasOwnProperty.call(message, "logLevel"))
                if (!$util.isString(message.logLevel))
                    return "logLevel: string expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.exception != null && Object.hasOwnProperty.call(message, "exception"))
                if (!$util.isString(message.exception))
                    return "exception: string expected";
            if (message.dateCreated != null && Object.hasOwnProperty.call(message, "dateCreated"))
                if (!$util.isString(message.dateCreated))
                    return "dateCreated: string expected";
            return null;
        };

        /**
         * Creates a ServiceLogRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceLogRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceLogRecord} ServiceLogRecord
         */
        ServiceLogRecord.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceLogRecord)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceLogRecord: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceLogRecord();
            if (object.serviceLogId != null)
                if ($util.Long)
                    message.serviceLogId = $util.Long.fromValue(object.serviceLogId, true);
                else if (typeof object.serviceLogId === "string")
                    message.serviceLogId = parseInt(object.serviceLogId, 10);
                else if (typeof object.serviceLogId === "number")
                    message.serviceLogId = object.serviceLogId;
                else if (typeof object.serviceLogId === "object")
                    message.serviceLogId = new $util.LongBits(object.serviceLogId.low >>> 0, object.serviceLogId.high >>> 0).toNumber(true);
            if (object.serviceInfoId != null)
                if ($util.Long)
                    message.serviceInfoId = $util.Long.fromValue(object.serviceInfoId, true);
                else if (typeof object.serviceInfoId === "string")
                    message.serviceInfoId = parseInt(object.serviceInfoId, 10);
                else if (typeof object.serviceInfoId === "number")
                    message.serviceInfoId = object.serviceInfoId;
                else if (typeof object.serviceInfoId === "object")
                    message.serviceInfoId = new $util.LongBits(object.serviceInfoId.low >>> 0, object.serviceInfoId.high >>> 0).toNumber(true);
            if (object.resourceId != null)
                if ($util.Long)
                    message.resourceId = $util.Long.fromValue(object.resourceId, true);
                else if (typeof object.resourceId === "string")
                    message.resourceId = parseInt(object.resourceId, 10);
                else if (typeof object.resourceId === "number")
                    message.resourceId = object.resourceId;
                else if (typeof object.resourceId === "object")
                    message.resourceId = new $util.LongBits(object.resourceId.low >>> 0, object.resourceId.high >>> 0).toNumber(true);
            if (object.logger != null)
                message.logger = String(object.logger);
            if (object.logLevel != null)
                message.logLevel = String(object.logLevel);
            if (object.message != null)
                message.message = String(object.message);
            if (object.exception != null)
                message.exception = String(object.exception);
            if (object.dateCreated != null)
                message.dateCreated = String(object.dateCreated);
            return message;
        };

        /**
         * Creates a plain object from a ServiceLogRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceLogRecord
         * @static
         * @param {ServiceLogger.ServiceLogRecord} message ServiceLogRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceLogRecord.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceLogId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceLogId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceInfoId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceInfoId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.resourceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.resourceId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.logger = "";
                object.logLevel = "";
                object.message = "";
                object.exception = "";
                object.dateCreated = "";
            }
            if (message.serviceLogId != null && Object.hasOwnProperty.call(message, "serviceLogId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceLogId = typeof message.serviceLogId === "number" ? BigInt(message.serviceLogId) : $util.Long.fromBits(message.serviceLogId.low >>> 0, message.serviceLogId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceLogId === "number")
                    object.serviceLogId = options.longs === String ? String(message.serviceLogId) : message.serviceLogId;
                else
                    object.serviceLogId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceLogId) : options.longs === Number ? new $util.LongBits(message.serviceLogId.low >>> 0, message.serviceLogId.high >>> 0).toNumber(true) : message.serviceLogId;
            if (message.serviceInfoId != null && Object.hasOwnProperty.call(message, "serviceInfoId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceInfoId = typeof message.serviceInfoId === "number" ? BigInt(message.serviceInfoId) : $util.Long.fromBits(message.serviceInfoId.low >>> 0, message.serviceInfoId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceInfoId === "number")
                    object.serviceInfoId = options.longs === String ? String(message.serviceInfoId) : message.serviceInfoId;
                else
                    object.serviceInfoId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceInfoId) : options.longs === Number ? new $util.LongBits(message.serviceInfoId.low >>> 0, message.serviceInfoId.high >>> 0).toNumber(true) : message.serviceInfoId;
            if (message.resourceId != null && Object.hasOwnProperty.call(message, "resourceId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.resourceId = typeof message.resourceId === "number" ? BigInt(message.resourceId) : $util.Long.fromBits(message.resourceId.low >>> 0, message.resourceId.high >>> 0, true).toBigInt();
                else if (typeof message.resourceId === "number")
                    object.resourceId = options.longs === String ? String(message.resourceId) : message.resourceId;
                else
                    object.resourceId = options.longs === String ? $util.Long.prototype.toString.call(message.resourceId) : options.longs === Number ? new $util.LongBits(message.resourceId.low >>> 0, message.resourceId.high >>> 0).toNumber(true) : message.resourceId;
            if (message.logger != null && Object.hasOwnProperty.call(message, "logger"))
                object.logger = message.logger;
            if (message.logLevel != null && Object.hasOwnProperty.call(message, "logLevel"))
                object.logLevel = message.logLevel;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.exception != null && Object.hasOwnProperty.call(message, "exception"))
                object.exception = message.exception;
            if (message.dateCreated != null && Object.hasOwnProperty.call(message, "dateCreated"))
                object.dateCreated = message.dateCreated;
            return object;
        };

        /**
         * Converts this ServiceLogRecord to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceLogRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceLogRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceLogRecord
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceLogRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceLogRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceLogRecord";
        };

        return ServiceLogRecord;
    })();

    ServiceLogger.ServiceLogAddRequest = (function() {

        /**
         * Properties of a ServiceLogAddRequest.
         * @memberof ServiceLogger
         * @interface IServiceLogAddRequest
         * @property {Array.<ServiceLogger.IServiceLogRecord>|null} [entry] ServiceLogAddRequest entry
         */

        /**
         * Constructs a new ServiceLogAddRequest.
         * @memberof ServiceLogger
         * @classdesc Represents a ServiceLogAddRequest.
         * @implements IServiceLogAddRequest
         * @constructor
         * @param {ServiceLogger.IServiceLogAddRequest=} [properties] Properties to set
         */
        function ServiceLogAddRequest(properties) {
            this.entry = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceLogAddRequest entry.
         * @member {Array.<ServiceLogger.IServiceLogRecord>} entry
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @instance
         */
        ServiceLogAddRequest.prototype.entry = $util.emptyArray;

        /**
         * Creates a new ServiceLogAddRequest instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @static
         * @param {ServiceLogger.IServiceLogAddRequest=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceLogAddRequest} ServiceLogAddRequest instance
         */
        ServiceLogAddRequest.create = function create(properties) {
            return new ServiceLogAddRequest(properties);
        };

        /**
         * Encodes the specified ServiceLogAddRequest message. Does not implicitly {@link ServiceLogger.ServiceLogAddRequest.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @static
         * @param {ServiceLogger.IServiceLogAddRequest} message ServiceLogAddRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogAddRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.entry != null && message.entry.length)
                for (let i = 0; i < message.entry.length; ++i)
                    $root.ServiceLogger.ServiceLogRecord.encode(message.entry[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceLogAddRequest message, length delimited. Does not implicitly {@link ServiceLogger.ServiceLogAddRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @static
         * @param {ServiceLogger.IServiceLogAddRequest} message ServiceLogAddRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogAddRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceLogAddRequest message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceLogAddRequest} ServiceLogAddRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogAddRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceLogAddRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.entry && message.entry.length))
                            message.entry = [];
                        message.entry.push($root.ServiceLogger.ServiceLogRecord.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceLogAddRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceLogAddRequest} ServiceLogAddRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogAddRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceLogAddRequest message.
         * @function verify
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceLogAddRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.entry != null && Object.hasOwnProperty.call(message, "entry")) {
                if (!Array.isArray(message.entry))
                    return "entry: array expected";
                for (let i = 0; i < message.entry.length; ++i) {
                    let error = $root.ServiceLogger.ServiceLogRecord.verify(message.entry[i], long + 1);
                    if (error)
                        return "entry." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceLogAddRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceLogAddRequest} ServiceLogAddRequest
         */
        ServiceLogAddRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceLogAddRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceLogAddRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceLogAddRequest();
            if (object.entry) {
                if (!Array.isArray(object.entry))
                    throw TypeError(".ServiceLogger.ServiceLogAddRequest.entry: array expected");
                message.entry = [];
                for (let i = 0; i < object.entry.length; ++i) {
                    if (!$util.isObject(object.entry[i]))
                        throw TypeError(".ServiceLogger.ServiceLogAddRequest.entry: object expected");
                    message.entry[i] = $root.ServiceLogger.ServiceLogRecord.fromObject(object.entry[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceLogAddRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @static
         * @param {ServiceLogger.ServiceLogAddRequest} message ServiceLogAddRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceLogAddRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.entry = [];
            if (message.entry && message.entry.length) {
                object.entry = [];
                for (let j = 0; j < message.entry.length; ++j)
                    object.entry[j] = $root.ServiceLogger.ServiceLogRecord.toObject(message.entry[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceLogAddRequest to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceLogAddRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceLogAddRequest
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceLogAddRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceLogAddRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceLogAddRequest";
        };

        return ServiceLogAddRequest;
    })();

    ServiceLogger.ServiceLogResponse = (function() {

        /**
         * Properties of a ServiceLogResponse.
         * @memberof ServiceLogger
         * @interface IServiceLogResponse
         * @property {Array.<ServiceLogger.IServiceLogRecord>|null} [entry] ServiceLogResponse entry
         */

        /**
         * Constructs a new ServiceLogResponse.
         * @memberof ServiceLogger
         * @classdesc Represents a ServiceLogResponse.
         * @implements IServiceLogResponse
         * @constructor
         * @param {ServiceLogger.IServiceLogResponse=} [properties] Properties to set
         */
        function ServiceLogResponse(properties) {
            this.entry = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceLogResponse entry.
         * @member {Array.<ServiceLogger.IServiceLogRecord>} entry
         * @memberof ServiceLogger.ServiceLogResponse
         * @instance
         */
        ServiceLogResponse.prototype.entry = $util.emptyArray;

        /**
         * Creates a new ServiceLogResponse instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceLogResponse
         * @static
         * @param {ServiceLogger.IServiceLogResponse=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceLogResponse} ServiceLogResponse instance
         */
        ServiceLogResponse.create = function create(properties) {
            return new ServiceLogResponse(properties);
        };

        /**
         * Encodes the specified ServiceLogResponse message. Does not implicitly {@link ServiceLogger.ServiceLogResponse.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceLogResponse
         * @static
         * @param {ServiceLogger.IServiceLogResponse} message ServiceLogResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.entry != null && message.entry.length)
                for (let i = 0; i < message.entry.length; ++i)
                    $root.ServiceLogger.ServiceLogRecord.encode(message.entry[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceLogResponse message, length delimited. Does not implicitly {@link ServiceLogger.ServiceLogResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceLogResponse
         * @static
         * @param {ServiceLogger.IServiceLogResponse} message ServiceLogResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceLogResponse message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceLogResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceLogResponse} ServiceLogResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceLogResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.entry && message.entry.length))
                            message.entry = [];
                        message.entry.push($root.ServiceLogger.ServiceLogRecord.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceLogResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceLogResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceLogResponse} ServiceLogResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceLogResponse message.
         * @function verify
         * @memberof ServiceLogger.ServiceLogResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceLogResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.entry != null && Object.hasOwnProperty.call(message, "entry")) {
                if (!Array.isArray(message.entry))
                    return "entry: array expected";
                for (let i = 0; i < message.entry.length; ++i) {
                    let error = $root.ServiceLogger.ServiceLogRecord.verify(message.entry[i], long + 1);
                    if (error)
                        return "entry." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceLogResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceLogResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceLogResponse} ServiceLogResponse
         */
        ServiceLogResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceLogResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceLogResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceLogResponse();
            if (object.entry) {
                if (!Array.isArray(object.entry))
                    throw TypeError(".ServiceLogger.ServiceLogResponse.entry: array expected");
                message.entry = [];
                for (let i = 0; i < object.entry.length; ++i) {
                    if (!$util.isObject(object.entry[i]))
                        throw TypeError(".ServiceLogger.ServiceLogResponse.entry: object expected");
                    message.entry[i] = $root.ServiceLogger.ServiceLogRecord.fromObject(object.entry[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceLogResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceLogResponse
         * @static
         * @param {ServiceLogger.ServiceLogResponse} message ServiceLogResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceLogResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.entry = [];
            if (message.entry && message.entry.length) {
                object.entry = [];
                for (let j = 0; j < message.entry.length; ++j)
                    object.entry[j] = $root.ServiceLogger.ServiceLogRecord.toObject(message.entry[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceLogResponse to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceLogResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceLogResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceLogResponse
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceLogResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceLogResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceLogResponse";
        };

        return ServiceLogResponse;
    })();

    ServiceLogger.ServiceLogClearRequest = (function() {

        /**
         * Properties of a ServiceLogClearRequest.
         * @memberof ServiceLogger
         * @interface IServiceLogClearRequest
         * @property {boolean|null} [useDefaults] ServiceLogClearRequest useDefaults
         * @property {number|null} [serviceTypeId] ServiceLogClearRequest serviceTypeId
         * @property {number|null} [daysOld] ServiceLogClearRequest daysOld
         * @property {number|null} [hoursOld] ServiceLogClearRequest hoursOld
         * @property {Array.<ServiceLogger.IIdRange>|null} [resourceIdRange] ServiceLogClearRequest resourceIdRange
         */

        /**
         * Constructs a new ServiceLogClearRequest.
         * @memberof ServiceLogger
         * @classdesc This is a request to clear the SSO Service Provider log
         * @implements IServiceLogClearRequest
         * @constructor
         * @param {ServiceLogger.IServiceLogClearRequest=} [properties] Properties to set
         */
        function ServiceLogClearRequest(properties) {
            this.resourceIdRange = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceLogClearRequest useDefaults.
         * @member {boolean} useDefaults
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @instance
         */
        ServiceLogClearRequest.prototype.useDefaults = false;

        /**
         * ServiceLogClearRequest serviceTypeId.
         * @member {number} serviceTypeId
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @instance
         */
        ServiceLogClearRequest.prototype.serviceTypeId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceLogClearRequest daysOld.
         * @member {number} daysOld
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @instance
         */
        ServiceLogClearRequest.prototype.daysOld = 0;

        /**
         * ServiceLogClearRequest hoursOld.
         * @member {number} hoursOld
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @instance
         */
        ServiceLogClearRequest.prototype.hoursOld = 0;

        /**
         * ServiceLogClearRequest resourceIdRange.
         * @member {Array.<ServiceLogger.IIdRange>} resourceIdRange
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @instance
         */
        ServiceLogClearRequest.prototype.resourceIdRange = $util.emptyArray;

        /**
         * Creates a new ServiceLogClearRequest instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @static
         * @param {ServiceLogger.IServiceLogClearRequest=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceLogClearRequest} ServiceLogClearRequest instance
         */
        ServiceLogClearRequest.create = function create(properties) {
            return new ServiceLogClearRequest(properties);
        };

        /**
         * Encodes the specified ServiceLogClearRequest message. Does not implicitly {@link ServiceLogger.ServiceLogClearRequest.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @static
         * @param {ServiceLogger.IServiceLogClearRequest} message ServiceLogClearRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogClearRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.useDefaults != null && Object.hasOwnProperty.call(message, "useDefaults"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.useDefaults);
            if (message.serviceTypeId != null && Object.hasOwnProperty.call(message, "serviceTypeId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.serviceTypeId);
            if (message.daysOld != null && Object.hasOwnProperty.call(message, "daysOld"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.daysOld);
            if (message.hoursOld != null && Object.hasOwnProperty.call(message, "hoursOld"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.hoursOld);
            if (message.resourceIdRange != null && message.resourceIdRange.length)
                for (let i = 0; i < message.resourceIdRange.length; ++i)
                    $root.ServiceLogger.IdRange.encode(message.resourceIdRange[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServiceLogClearRequest message, length delimited. Does not implicitly {@link ServiceLogger.ServiceLogClearRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @static
         * @param {ServiceLogger.IServiceLogClearRequest} message ServiceLogClearRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogClearRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceLogClearRequest message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceLogClearRequest} ServiceLogClearRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogClearRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceLogClearRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.useDefaults = reader.bool();
                        break;
                    }
                case 2: {
                        message.serviceTypeId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.daysOld = reader.uint32();
                        break;
                    }
                case 4: {
                        message.hoursOld = reader.uint32();
                        break;
                    }
                case 5: {
                        if (!(message.resourceIdRange && message.resourceIdRange.length))
                            message.resourceIdRange = [];
                        message.resourceIdRange.push($root.ServiceLogger.IdRange.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ServiceLogClearRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceLogClearRequest} ServiceLogClearRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogClearRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceLogClearRequest message.
         * @function verify
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceLogClearRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.useDefaults != null && Object.hasOwnProperty.call(message, "useDefaults"))
                if (typeof message.useDefaults !== "boolean")
                    return "useDefaults: boolean expected";
            if (message.serviceTypeId != null && Object.hasOwnProperty.call(message, "serviceTypeId"))
                if (!$util.isInteger(message.serviceTypeId) && !(message.serviceTypeId && $util.isInteger(message.serviceTypeId.low) && $util.isInteger(message.serviceTypeId.high)))
                    return "serviceTypeId: integer|Long expected";
            if (message.daysOld != null && Object.hasOwnProperty.call(message, "daysOld"))
                if (!$util.isInteger(message.daysOld))
                    return "daysOld: integer expected";
            if (message.hoursOld != null && Object.hasOwnProperty.call(message, "hoursOld"))
                if (!$util.isInteger(message.hoursOld))
                    return "hoursOld: integer expected";
            if (message.resourceIdRange != null && Object.hasOwnProperty.call(message, "resourceIdRange")) {
                if (!Array.isArray(message.resourceIdRange))
                    return "resourceIdRange: array expected";
                for (let i = 0; i < message.resourceIdRange.length; ++i) {
                    let error = $root.ServiceLogger.IdRange.verify(message.resourceIdRange[i], long + 1);
                    if (error)
                        return "resourceIdRange." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServiceLogClearRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceLogClearRequest} ServiceLogClearRequest
         */
        ServiceLogClearRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceLogClearRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceLogClearRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceLogClearRequest();
            if (object.useDefaults != null)
                message.useDefaults = Boolean(object.useDefaults);
            if (object.serviceTypeId != null)
                if ($util.Long)
                    message.serviceTypeId = $util.Long.fromValue(object.serviceTypeId, true);
                else if (typeof object.serviceTypeId === "string")
                    message.serviceTypeId = parseInt(object.serviceTypeId, 10);
                else if (typeof object.serviceTypeId === "number")
                    message.serviceTypeId = object.serviceTypeId;
                else if (typeof object.serviceTypeId === "object")
                    message.serviceTypeId = new $util.LongBits(object.serviceTypeId.low >>> 0, object.serviceTypeId.high >>> 0).toNumber(true);
            if (object.daysOld != null)
                message.daysOld = object.daysOld >>> 0;
            if (object.hoursOld != null)
                message.hoursOld = object.hoursOld >>> 0;
            if (object.resourceIdRange) {
                if (!Array.isArray(object.resourceIdRange))
                    throw TypeError(".ServiceLogger.ServiceLogClearRequest.resourceIdRange: array expected");
                message.resourceIdRange = [];
                for (let i = 0; i < object.resourceIdRange.length; ++i) {
                    if (!$util.isObject(object.resourceIdRange[i]))
                        throw TypeError(".ServiceLogger.ServiceLogClearRequest.resourceIdRange: object expected");
                    message.resourceIdRange[i] = $root.ServiceLogger.IdRange.fromObject(object.resourceIdRange[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ServiceLogClearRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @static
         * @param {ServiceLogger.ServiceLogClearRequest} message ServiceLogClearRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceLogClearRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.resourceIdRange = [];
            if (options.defaults) {
                object.useDefaults = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceTypeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceTypeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.daysOld = 0;
                object.hoursOld = 0;
            }
            if (message.useDefaults != null && Object.hasOwnProperty.call(message, "useDefaults"))
                object.useDefaults = message.useDefaults;
            if (message.serviceTypeId != null && Object.hasOwnProperty.call(message, "serviceTypeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceTypeId = typeof message.serviceTypeId === "number" ? BigInt(message.serviceTypeId) : $util.Long.fromBits(message.serviceTypeId.low >>> 0, message.serviceTypeId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceTypeId === "number")
                    object.serviceTypeId = options.longs === String ? String(message.serviceTypeId) : message.serviceTypeId;
                else
                    object.serviceTypeId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceTypeId) : options.longs === Number ? new $util.LongBits(message.serviceTypeId.low >>> 0, message.serviceTypeId.high >>> 0).toNumber(true) : message.serviceTypeId;
            if (message.daysOld != null && Object.hasOwnProperty.call(message, "daysOld"))
                object.daysOld = message.daysOld;
            if (message.hoursOld != null && Object.hasOwnProperty.call(message, "hoursOld"))
                object.hoursOld = message.hoursOld;
            if (message.resourceIdRange && message.resourceIdRange.length) {
                object.resourceIdRange = [];
                for (let j = 0; j < message.resourceIdRange.length; ++j)
                    object.resourceIdRange[j] = $root.ServiceLogger.IdRange.toObject(message.resourceIdRange[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ServiceLogClearRequest to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceLogClearRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceLogClearRequest
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceLogClearRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceLogClearRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceLogClearRequest";
        };

        return ServiceLogClearRequest;
    })();

    ServiceLogger.ServiceLogClearResponse = (function() {

        /**
         * Properties of a ServiceLogClearResponse.
         * @memberof ServiceLogger
         * @interface IServiceLogClearResponse
         * @property {number|null} [serviceTypeId] ServiceLogClearResponse serviceTypeId
         * @property {string|null} [serviceName] ServiceLogClearResponse serviceName
         * @property {Array.<ServiceLogger.IIdRange>|null} [resourceIdRange] ServiceLogClearResponse resourceIdRange
         * @property {number|null} [numDeleted] ServiceLogClearResponse numDeleted
         * @property {number|null} [numRemaining] ServiceLogClearResponse numRemaining
         */

        /**
         * Constructs a new ServiceLogClearResponse.
         * @memberof ServiceLogger
         * @classdesc This is the response from the sso_log_clear command
         * @implements IServiceLogClearResponse
         * @constructor
         * @param {ServiceLogger.IServiceLogClearResponse=} [properties] Properties to set
         */
        function ServiceLogClearResponse(properties) {
            this.resourceIdRange = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServiceLogClearResponse serviceTypeId.
         * @member {number} serviceTypeId
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @instance
         */
        ServiceLogClearResponse.prototype.serviceTypeId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ServiceLogClearResponse serviceName.
         * @member {string} serviceName
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @instance
         */
        ServiceLogClearResponse.prototype.serviceName = "";

        /**
         * ServiceLogClearResponse resourceIdRange.
         * @member {Array.<ServiceLogger.IIdRange>} resourceIdRange
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @instance
         */
        ServiceLogClearResponse.prototype.resourceIdRange = $util.emptyArray;

        /**
         * ServiceLogClearResponse numDeleted.
         * @member {number} numDeleted
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @instance
         */
        ServiceLogClearResponse.prototype.numDeleted = 0;

        /**
         * ServiceLogClearResponse numRemaining.
         * @member {number} numRemaining
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @instance
         */
        ServiceLogClearResponse.prototype.numRemaining = 0;

        /**
         * Creates a new ServiceLogClearResponse instance using the specified properties.
         * @function create
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @static
         * @param {ServiceLogger.IServiceLogClearResponse=} [properties] Properties to set
         * @returns {ServiceLogger.ServiceLogClearResponse} ServiceLogClearResponse instance
         */
        ServiceLogClearResponse.create = function create(properties) {
            return new ServiceLogClearResponse(properties);
        };

        /**
         * Encodes the specified ServiceLogClearResponse message. Does not implicitly {@link ServiceLogger.ServiceLogClearResponse.verify|verify} messages.
         * @function encode
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @static
         * @param {ServiceLogger.IServiceLogClearResponse} message ServiceLogClearResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogClearResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serviceTypeId != null && Object.hasOwnProperty.call(message, "serviceTypeId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.serviceTypeId);
            if (message.serviceName != null && Object.hasOwnProperty.call(message, "serviceName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.serviceName);
            if (message.resourceIdRange != null && message.resourceIdRange.length)
                for (let i = 0; i < message.resourceIdRange.length; ++i)
                    $root.ServiceLogger.IdRange.encode(message.resourceIdRange[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.numDeleted != null && Object.hasOwnProperty.call(message, "numDeleted"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.numDeleted);
            if (message.numRemaining != null && Object.hasOwnProperty.call(message, "numRemaining"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.numRemaining);
            return writer;
        };

        /**
         * Encodes the specified ServiceLogClearResponse message, length delimited. Does not implicitly {@link ServiceLogger.ServiceLogClearResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @static
         * @param {ServiceLogger.IServiceLogClearResponse} message ServiceLogClearResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServiceLogClearResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ServiceLogClearResponse message from the specified reader or buffer.
         * @function decode
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ServiceLogger.ServiceLogClearResponse} ServiceLogClearResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogClearResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ServiceLogger.ServiceLogClearResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.serviceTypeId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.serviceName = reader.string();
                        break;
                    }
                case 3: {
                        if (!(message.resourceIdRange && message.resourceIdRange.length))
                            message.resourceIdRange = [];
                        message.resourceIdRange.push($root.ServiceLogger.IdRange.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 4: {
                        message.numDeleted = reader.uint32();
                        break;
                    }
                case 5: {
                        message.numRemaining = reader.uint32();
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
         * Decodes a ServiceLogClearResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ServiceLogger.ServiceLogClearResponse} ServiceLogClearResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServiceLogClearResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServiceLogClearResponse message.
         * @function verify
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServiceLogClearResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serviceTypeId != null && Object.hasOwnProperty.call(message, "serviceTypeId"))
                if (!$util.isInteger(message.serviceTypeId) && !(message.serviceTypeId && $util.isInteger(message.serviceTypeId.low) && $util.isInteger(message.serviceTypeId.high)))
                    return "serviceTypeId: integer|Long expected";
            if (message.serviceName != null && Object.hasOwnProperty.call(message, "serviceName"))
                if (!$util.isString(message.serviceName))
                    return "serviceName: string expected";
            if (message.resourceIdRange != null && Object.hasOwnProperty.call(message, "resourceIdRange")) {
                if (!Array.isArray(message.resourceIdRange))
                    return "resourceIdRange: array expected";
                for (let i = 0; i < message.resourceIdRange.length; ++i) {
                    let error = $root.ServiceLogger.IdRange.verify(message.resourceIdRange[i], long + 1);
                    if (error)
                        return "resourceIdRange." + error;
                }
            }
            if (message.numDeleted != null && Object.hasOwnProperty.call(message, "numDeleted"))
                if (!$util.isInteger(message.numDeleted))
                    return "numDeleted: integer expected";
            if (message.numRemaining != null && Object.hasOwnProperty.call(message, "numRemaining"))
                if (!$util.isInteger(message.numRemaining))
                    return "numRemaining: integer expected";
            return null;
        };

        /**
         * Creates a ServiceLogClearResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ServiceLogger.ServiceLogClearResponse} ServiceLogClearResponse
         */
        ServiceLogClearResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ServiceLogger.ServiceLogClearResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ServiceLogger.ServiceLogClearResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ServiceLogger.ServiceLogClearResponse();
            if (object.serviceTypeId != null)
                if ($util.Long)
                    message.serviceTypeId = $util.Long.fromValue(object.serviceTypeId, true);
                else if (typeof object.serviceTypeId === "string")
                    message.serviceTypeId = parseInt(object.serviceTypeId, 10);
                else if (typeof object.serviceTypeId === "number")
                    message.serviceTypeId = object.serviceTypeId;
                else if (typeof object.serviceTypeId === "object")
                    message.serviceTypeId = new $util.LongBits(object.serviceTypeId.low >>> 0, object.serviceTypeId.high >>> 0).toNumber(true);
            if (object.serviceName != null)
                message.serviceName = String(object.serviceName);
            if (object.resourceIdRange) {
                if (!Array.isArray(object.resourceIdRange))
                    throw TypeError(".ServiceLogger.ServiceLogClearResponse.resourceIdRange: array expected");
                message.resourceIdRange = [];
                for (let i = 0; i < object.resourceIdRange.length; ++i) {
                    if (!$util.isObject(object.resourceIdRange[i]))
                        throw TypeError(".ServiceLogger.ServiceLogClearResponse.resourceIdRange: object expected");
                    message.resourceIdRange[i] = $root.ServiceLogger.IdRange.fromObject(object.resourceIdRange[i], long + 1);
                }
            }
            if (object.numDeleted != null)
                message.numDeleted = object.numDeleted >>> 0;
            if (object.numRemaining != null)
                message.numRemaining = object.numRemaining >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a ServiceLogClearResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @static
         * @param {ServiceLogger.ServiceLogClearResponse} message ServiceLogClearResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServiceLogClearResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.resourceIdRange = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.serviceTypeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serviceTypeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.serviceName = "";
                object.numDeleted = 0;
                object.numRemaining = 0;
            }
            if (message.serviceTypeId != null && Object.hasOwnProperty.call(message, "serviceTypeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serviceTypeId = typeof message.serviceTypeId === "number" ? BigInt(message.serviceTypeId) : $util.Long.fromBits(message.serviceTypeId.low >>> 0, message.serviceTypeId.high >>> 0, true).toBigInt();
                else if (typeof message.serviceTypeId === "number")
                    object.serviceTypeId = options.longs === String ? String(message.serviceTypeId) : message.serviceTypeId;
                else
                    object.serviceTypeId = options.longs === String ? $util.Long.prototype.toString.call(message.serviceTypeId) : options.longs === Number ? new $util.LongBits(message.serviceTypeId.low >>> 0, message.serviceTypeId.high >>> 0).toNumber(true) : message.serviceTypeId;
            if (message.serviceName != null && Object.hasOwnProperty.call(message, "serviceName"))
                object.serviceName = message.serviceName;
            if (message.resourceIdRange && message.resourceIdRange.length) {
                object.resourceIdRange = [];
                for (let j = 0; j < message.resourceIdRange.length; ++j)
                    object.resourceIdRange[j] = $root.ServiceLogger.IdRange.toObject(message.resourceIdRange[j], options, q + 1);
            }
            if (message.numDeleted != null && Object.hasOwnProperty.call(message, "numDeleted"))
                object.numDeleted = message.numDeleted;
            if (message.numRemaining != null && Object.hasOwnProperty.call(message, "numRemaining"))
                object.numRemaining = message.numRemaining;
            return object;
        };

        /**
         * Converts this ServiceLogClearResponse to JSON.
         * @function toJSON
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServiceLogClearResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ServiceLogClearResponse
         * @function getTypeUrl
         * @memberof ServiceLogger.ServiceLogClearResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ServiceLogClearResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ServiceLogger.ServiceLogClearResponse";
        };

        return ServiceLogClearResponse;
    })();

    return ServiceLogger;
})();

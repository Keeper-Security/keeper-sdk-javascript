/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const PAM = $root.PAM = (() => {

    /**
     * Namespace PAM.
     * @exports PAM
     * @namespace
     */
    const PAM = {};

    PAM.PAMRotationSchedule = (function() {

        /**
         * Properties of a PAMRotationSchedule.
         * @memberof PAM
         * @interface IPAMRotationSchedule
         * @property {Uint8Array|null} [recordUid] PAMRotationSchedule recordUid
         * @property {Uint8Array|null} [configurationUid] PAMRotationSchedule configurationUid
         * @property {Uint8Array|null} [controllerUid] PAMRotationSchedule controllerUid
         * @property {string|null} [scheduleData] PAMRotationSchedule scheduleData
         * @property {boolean|null} [noSchedule] PAMRotationSchedule noSchedule
         */

        /**
         * Constructs a new PAMRotationSchedule.
         * @memberof PAM
         * @classdesc Represents a PAMRotationSchedule.
         * @implements IPAMRotationSchedule
         * @constructor
         * @param {PAM.IPAMRotationSchedule=} [properties] Properties to set
         */
        function PAMRotationSchedule(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMRotationSchedule recordUid.
         * @member {Uint8Array} recordUid
         * @memberof PAM.PAMRotationSchedule
         * @instance
         */
        PAMRotationSchedule.prototype.recordUid = $util.newBuffer([]);

        /**
         * PAMRotationSchedule configurationUid.
         * @member {Uint8Array} configurationUid
         * @memberof PAM.PAMRotationSchedule
         * @instance
         */
        PAMRotationSchedule.prototype.configurationUid = $util.newBuffer([]);

        /**
         * PAMRotationSchedule controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof PAM.PAMRotationSchedule
         * @instance
         */
        PAMRotationSchedule.prototype.controllerUid = $util.newBuffer([]);

        /**
         * PAMRotationSchedule scheduleData.
         * @member {string} scheduleData
         * @memberof PAM.PAMRotationSchedule
         * @instance
         */
        PAMRotationSchedule.prototype.scheduleData = "";

        /**
         * PAMRotationSchedule noSchedule.
         * @member {boolean} noSchedule
         * @memberof PAM.PAMRotationSchedule
         * @instance
         */
        PAMRotationSchedule.prototype.noSchedule = false;

        /**
         * Creates a new PAMRotationSchedule instance using the specified properties.
         * @function create
         * @memberof PAM.PAMRotationSchedule
         * @static
         * @param {PAM.IPAMRotationSchedule=} [properties] Properties to set
         * @returns {PAM.PAMRotationSchedule} PAMRotationSchedule instance
         */
        PAMRotationSchedule.create = function create(properties) {
            return new PAMRotationSchedule(properties);
        };

        /**
         * Encodes the specified PAMRotationSchedule message. Does not implicitly {@link PAM.PAMRotationSchedule.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMRotationSchedule
         * @static
         * @param {PAM.IPAMRotationSchedule} message PAMRotationSchedule message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMRotationSchedule.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.configurationUid);
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.controllerUid);
            if (message.scheduleData != null && Object.hasOwnProperty.call(message, "scheduleData"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.scheduleData);
            if (message.noSchedule != null && Object.hasOwnProperty.call(message, "noSchedule"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.noSchedule);
            return writer;
        };

        /**
         * Decodes a PAMRotationSchedule message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMRotationSchedule
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMRotationSchedule} PAMRotationSchedule
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMRotationSchedule.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMRotationSchedule();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.recordUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.configurationUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.scheduleData = reader.string();
                        break;
                    }
                case 5: {
                        message.noSchedule = reader.bool();
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
         * Creates a PAMRotationSchedule message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMRotationSchedule
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMRotationSchedule} PAMRotationSchedule
         */
        PAMRotationSchedule.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMRotationSchedule)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMRotationSchedule: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMRotationSchedule();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.configurationUid != null)
                if (typeof object.configurationUid === "string")
                    $util.base64.decode(object.configurationUid, message.configurationUid = $util.newBuffer($util.base64.length(object.configurationUid)), 0);
                else if (object.configurationUid.length >= 0)
                    message.configurationUid = object.configurationUid;
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            if (object.scheduleData != null)
                message.scheduleData = String(object.scheduleData);
            if (object.noSchedule != null)
                message.noSchedule = Boolean(object.noSchedule);
            return message;
        };

        /**
         * Creates a plain object from a PAMRotationSchedule message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMRotationSchedule
         * @static
         * @param {PAM.PAMRotationSchedule} message PAMRotationSchedule
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMRotationSchedule.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.recordUid = "";
                else {
                    object.recordUid = [];
                    if (options.bytes !== Array)
                        object.recordUid = $util.newBuffer(object.recordUid);
                }
                if (options.bytes === String)
                    object.configurationUid = "";
                else {
                    object.configurationUid = [];
                    if (options.bytes !== Array)
                        object.configurationUid = $util.newBuffer(object.configurationUid);
                }
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
                object.scheduleData = "";
                object.noSchedule = false;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                object.configurationUid = options.bytes === String ? $util.base64.encode(message.configurationUid, 0, message.configurationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.configurationUid) : message.configurationUid;
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.scheduleData != null && Object.hasOwnProperty.call(message, "scheduleData"))
                object.scheduleData = message.scheduleData;
            if (message.noSchedule != null && Object.hasOwnProperty.call(message, "noSchedule"))
                object.noSchedule = message.noSchedule;
            return object;
        };

        /**
         * Converts this PAMRotationSchedule to JSON.
         * @function toJSON
         * @memberof PAM.PAMRotationSchedule
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMRotationSchedule.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMRotationSchedule
         * @function getTypeUrl
         * @memberof PAM.PAMRotationSchedule
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMRotationSchedule.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMRotationSchedule";
        };

        return PAMRotationSchedule;
    })();

    PAM.PAMRotationSchedulesResponse = (function() {

        /**
         * Properties of a PAMRotationSchedulesResponse.
         * @memberof PAM
         * @interface IPAMRotationSchedulesResponse
         * @property {Array.<PAM.IPAMRotationSchedule>|null} [schedules] PAMRotationSchedulesResponse schedules
         */

        /**
         * Constructs a new PAMRotationSchedulesResponse.
         * @memberof PAM
         * @classdesc Represents a PAMRotationSchedulesResponse.
         * @implements IPAMRotationSchedulesResponse
         * @constructor
         * @param {PAM.IPAMRotationSchedulesResponse=} [properties] Properties to set
         */
        function PAMRotationSchedulesResponse(properties) {
            this.schedules = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMRotationSchedulesResponse schedules.
         * @member {Array.<PAM.IPAMRotationSchedule>} schedules
         * @memberof PAM.PAMRotationSchedulesResponse
         * @instance
         */
        PAMRotationSchedulesResponse.prototype.schedules = $util.emptyArray;

        /**
         * Creates a new PAMRotationSchedulesResponse instance using the specified properties.
         * @function create
         * @memberof PAM.PAMRotationSchedulesResponse
         * @static
         * @param {PAM.IPAMRotationSchedulesResponse=} [properties] Properties to set
         * @returns {PAM.PAMRotationSchedulesResponse} PAMRotationSchedulesResponse instance
         */
        PAMRotationSchedulesResponse.create = function create(properties) {
            return new PAMRotationSchedulesResponse(properties);
        };

        /**
         * Encodes the specified PAMRotationSchedulesResponse message. Does not implicitly {@link PAM.PAMRotationSchedulesResponse.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMRotationSchedulesResponse
         * @static
         * @param {PAM.IPAMRotationSchedulesResponse} message PAMRotationSchedulesResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMRotationSchedulesResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.schedules != null && message.schedules.length)
                for (let i = 0; i < message.schedules.length; ++i)
                    $root.PAM.PAMRotationSchedule.encode(message.schedules[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMRotationSchedulesResponse message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMRotationSchedulesResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMRotationSchedulesResponse} PAMRotationSchedulesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMRotationSchedulesResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMRotationSchedulesResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.schedules && message.schedules.length))
                            message.schedules = [];
                        message.schedules.push($root.PAM.PAMRotationSchedule.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMRotationSchedulesResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMRotationSchedulesResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMRotationSchedulesResponse} PAMRotationSchedulesResponse
         */
        PAMRotationSchedulesResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMRotationSchedulesResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMRotationSchedulesResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMRotationSchedulesResponse();
            if (object.schedules) {
                if (!Array.isArray(object.schedules))
                    throw TypeError(".PAM.PAMRotationSchedulesResponse.schedules: array expected");
                message.schedules = [];
                for (let i = 0; i < object.schedules.length; ++i) {
                    if (!$util.isObject(object.schedules[i]))
                        throw TypeError(".PAM.PAMRotationSchedulesResponse.schedules: object expected");
                    message.schedules[i] = $root.PAM.PAMRotationSchedule.fromObject(object.schedules[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMRotationSchedulesResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMRotationSchedulesResponse
         * @static
         * @param {PAM.PAMRotationSchedulesResponse} message PAMRotationSchedulesResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMRotationSchedulesResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.schedules = [];
            if (message.schedules && message.schedules.length) {
                object.schedules = [];
                for (let j = 0; j < message.schedules.length; ++j)
                    object.schedules[j] = $root.PAM.PAMRotationSchedule.toObject(message.schedules[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMRotationSchedulesResponse to JSON.
         * @function toJSON
         * @memberof PAM.PAMRotationSchedulesResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMRotationSchedulesResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMRotationSchedulesResponse
         * @function getTypeUrl
         * @memberof PAM.PAMRotationSchedulesResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMRotationSchedulesResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMRotationSchedulesResponse";
        };

        return PAMRotationSchedulesResponse;
    })();

    PAM.PAMOnlineController = (function() {

        /**
         * Properties of a PAMOnlineController.
         * @memberof PAM
         * @interface IPAMOnlineController
         * @property {Uint8Array|null} [controllerUid] PAMOnlineController controllerUid
         * @property {number|null} [connectedOn] PAMOnlineController connectedOn
         * @property {string|null} [ipAddress] PAMOnlineController ipAddress
         * @property {string|null} [version] PAMOnlineController version
         * @property {Array.<PAM.IPAMWebRtcConnection>|null} [connections] PAMOnlineController connections
         */

        /**
         * Constructs a new PAMOnlineController.
         * @memberof PAM
         * @classdesc Represents a PAMOnlineController.
         * @implements IPAMOnlineController
         * @constructor
         * @param {PAM.IPAMOnlineController=} [properties] Properties to set
         */
        function PAMOnlineController(properties) {
            this.connections = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMOnlineController controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof PAM.PAMOnlineController
         * @instance
         */
        PAMOnlineController.prototype.controllerUid = $util.newBuffer([]);

        /**
         * PAMOnlineController connectedOn.
         * @member {number} connectedOn
         * @memberof PAM.PAMOnlineController
         * @instance
         */
        PAMOnlineController.prototype.connectedOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMOnlineController ipAddress.
         * @member {string} ipAddress
         * @memberof PAM.PAMOnlineController
         * @instance
         */
        PAMOnlineController.prototype.ipAddress = "";

        /**
         * PAMOnlineController version.
         * @member {string} version
         * @memberof PAM.PAMOnlineController
         * @instance
         */
        PAMOnlineController.prototype.version = "";

        /**
         * PAMOnlineController connections.
         * @member {Array.<PAM.IPAMWebRtcConnection>} connections
         * @memberof PAM.PAMOnlineController
         * @instance
         */
        PAMOnlineController.prototype.connections = $util.emptyArray;

        /**
         * Creates a new PAMOnlineController instance using the specified properties.
         * @function create
         * @memberof PAM.PAMOnlineController
         * @static
         * @param {PAM.IPAMOnlineController=} [properties] Properties to set
         * @returns {PAM.PAMOnlineController} PAMOnlineController instance
         */
        PAMOnlineController.create = function create(properties) {
            return new PAMOnlineController(properties);
        };

        /**
         * Encodes the specified PAMOnlineController message. Does not implicitly {@link PAM.PAMOnlineController.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMOnlineController
         * @static
         * @param {PAM.IPAMOnlineController} message PAMOnlineController message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMOnlineController.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.controllerUid);
            if (message.connectedOn != null && Object.hasOwnProperty.call(message, "connectedOn"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.connectedOn);
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.ipAddress);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.version);
            if (message.connections != null && message.connections.length)
                for (let i = 0; i < message.connections.length; ++i)
                    $root.PAM.PAMWebRtcConnection.encode(message.connections[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMOnlineController message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMOnlineController
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMOnlineController} PAMOnlineController
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMOnlineController.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMOnlineController();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.connectedOn = reader.int64();
                        break;
                    }
                case 3: {
                        message.ipAddress = reader.string();
                        break;
                    }
                case 4: {
                        message.version = reader.string();
                        break;
                    }
                case 5: {
                        if (!(message.connections && message.connections.length))
                            message.connections = [];
                        message.connections.push($root.PAM.PAMWebRtcConnection.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMOnlineController message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMOnlineController
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMOnlineController} PAMOnlineController
         */
        PAMOnlineController.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMOnlineController)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMOnlineController: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMOnlineController();
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            if (object.connectedOn != null)
                if ($util.Long)
                    message.connectedOn = $util.Long.fromValue(object.connectedOn, false);
                else if (typeof object.connectedOn === "string")
                    message.connectedOn = parseInt(object.connectedOn, 10);
                else if (typeof object.connectedOn === "number")
                    message.connectedOn = object.connectedOn;
                else if (typeof object.connectedOn === "object")
                    message.connectedOn = new $util.LongBits(object.connectedOn.low >>> 0, object.connectedOn.high >>> 0).toNumber();
            if (object.ipAddress != null)
                message.ipAddress = String(object.ipAddress);
            if (object.version != null)
                message.version = String(object.version);
            if (object.connections) {
                if (!Array.isArray(object.connections))
                    throw TypeError(".PAM.PAMOnlineController.connections: array expected");
                message.connections = [];
                for (let i = 0; i < object.connections.length; ++i) {
                    if (!$util.isObject(object.connections[i]))
                        throw TypeError(".PAM.PAMOnlineController.connections: object expected");
                    message.connections[i] = $root.PAM.PAMWebRtcConnection.fromObject(object.connections[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMOnlineController message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMOnlineController
         * @static
         * @param {PAM.PAMOnlineController} message PAMOnlineController
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMOnlineController.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.connections = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.connectedOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.connectedOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.ipAddress = "";
                object.version = "";
            }
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.connectedOn != null && Object.hasOwnProperty.call(message, "connectedOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.connectedOn = typeof message.connectedOn === "number" ? BigInt(message.connectedOn) : $util.Long.fromBits(message.connectedOn.low >>> 0, message.connectedOn.high >>> 0, false).toBigInt();
                else if (typeof message.connectedOn === "number")
                    object.connectedOn = options.longs === String ? String(message.connectedOn) : message.connectedOn;
                else
                    object.connectedOn = options.longs === String ? $util.Long.prototype.toString.call(message.connectedOn) : options.longs === Number ? new $util.LongBits(message.connectedOn.low >>> 0, message.connectedOn.high >>> 0).toNumber() : message.connectedOn;
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                object.ipAddress = message.ipAddress;
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                object.version = message.version;
            if (message.connections && message.connections.length) {
                object.connections = [];
                for (let j = 0; j < message.connections.length; ++j)
                    object.connections[j] = $root.PAM.PAMWebRtcConnection.toObject(message.connections[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMOnlineController to JSON.
         * @function toJSON
         * @memberof PAM.PAMOnlineController
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMOnlineController.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMOnlineController
         * @function getTypeUrl
         * @memberof PAM.PAMOnlineController
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMOnlineController.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMOnlineController";
        };

        return PAMOnlineController;
    })();

    /**
     * WebRtcConnectionType enum.
     * @name PAM.WebRtcConnectionType
     * @enum {number}
     * @property {number} CONNECTION=0 CONNECTION value
     * @property {number} TUNNEL=1 TUNNEL value
     * @property {number} SSH=2 SSH value
     * @property {number} RDP=3 RDP value
     * @property {number} HTTP=4 HTTP value
     * @property {number} VNC=5 VNC value
     * @property {number} TELNET=6 TELNET value
     * @property {number} MYSQL=7 MYSQL value
     * @property {number} SQL_SERVER=8 SQL_SERVER value
     * @property {number} POSTGRESQL=9 POSTGRESQL value
     * @property {number} KUBERNETES=10 KUBERNETES value
     */
    PAM.WebRtcConnectionType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CONNECTION"] = 0;
        values[valuesById[1] = "TUNNEL"] = 1;
        values[valuesById[2] = "SSH"] = 2;
        values[valuesById[3] = "RDP"] = 3;
        values[valuesById[4] = "HTTP"] = 4;
        values[valuesById[5] = "VNC"] = 5;
        values[valuesById[6] = "TELNET"] = 6;
        values[valuesById[7] = "MYSQL"] = 7;
        values[valuesById[8] = "SQL_SERVER"] = 8;
        values[valuesById[9] = "POSTGRESQL"] = 9;
        values[valuesById[10] = "KUBERNETES"] = 10;
        return values;
    })();

    PAM.PAMWebRtcConnection = (function() {

        /**
         * Properties of a PAMWebRtcConnection.
         * @memberof PAM
         * @interface IPAMWebRtcConnection
         * @property {Uint8Array|null} [connectionUid] PAMWebRtcConnection connectionUid
         * @property {PAM.WebRtcConnectionType|null} [type] PAMWebRtcConnection type
         * @property {Uint8Array|null} [recordUid] PAMWebRtcConnection recordUid
         * @property {string|null} [userName] PAMWebRtcConnection userName
         * @property {number|null} [startedOn] PAMWebRtcConnection startedOn
         * @property {Uint8Array|null} [configurationUid] PAMWebRtcConnection configurationUid
         */

        /**
         * Constructs a new PAMWebRtcConnection.
         * @memberof PAM
         * @classdesc Represents a PAMWebRtcConnection.
         * @implements IPAMWebRtcConnection
         * @constructor
         * @param {PAM.IPAMWebRtcConnection=} [properties] Properties to set
         */
        function PAMWebRtcConnection(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMWebRtcConnection connectionUid.
         * @member {Uint8Array} connectionUid
         * @memberof PAM.PAMWebRtcConnection
         * @instance
         */
        PAMWebRtcConnection.prototype.connectionUid = $util.newBuffer([]);

        /**
         * PAMWebRtcConnection type.
         * @member {PAM.WebRtcConnectionType} type
         * @memberof PAM.PAMWebRtcConnection
         * @instance
         */
        PAMWebRtcConnection.prototype.type = 0;

        /**
         * PAMWebRtcConnection recordUid.
         * @member {Uint8Array} recordUid
         * @memberof PAM.PAMWebRtcConnection
         * @instance
         */
        PAMWebRtcConnection.prototype.recordUid = $util.newBuffer([]);

        /**
         * PAMWebRtcConnection userName.
         * @member {string} userName
         * @memberof PAM.PAMWebRtcConnection
         * @instance
         */
        PAMWebRtcConnection.prototype.userName = "";

        /**
         * PAMWebRtcConnection startedOn.
         * @member {number} startedOn
         * @memberof PAM.PAMWebRtcConnection
         * @instance
         */
        PAMWebRtcConnection.prototype.startedOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMWebRtcConnection configurationUid.
         * @member {Uint8Array} configurationUid
         * @memberof PAM.PAMWebRtcConnection
         * @instance
         */
        PAMWebRtcConnection.prototype.configurationUid = $util.newBuffer([]);

        /**
         * Creates a new PAMWebRtcConnection instance using the specified properties.
         * @function create
         * @memberof PAM.PAMWebRtcConnection
         * @static
         * @param {PAM.IPAMWebRtcConnection=} [properties] Properties to set
         * @returns {PAM.PAMWebRtcConnection} PAMWebRtcConnection instance
         */
        PAMWebRtcConnection.create = function create(properties) {
            return new PAMWebRtcConnection(properties);
        };

        /**
         * Encodes the specified PAMWebRtcConnection message. Does not implicitly {@link PAM.PAMWebRtcConnection.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMWebRtcConnection
         * @static
         * @param {PAM.IPAMWebRtcConnection} message PAMWebRtcConnection message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMWebRtcConnection.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.connectionUid != null && Object.hasOwnProperty.call(message, "connectionUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.connectionUid);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.recordUid);
            if (message.userName != null && Object.hasOwnProperty.call(message, "userName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.userName);
            if (message.startedOn != null && Object.hasOwnProperty.call(message, "startedOn"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.startedOn);
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.configurationUid);
            return writer;
        };

        /**
         * Decodes a PAMWebRtcConnection message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMWebRtcConnection
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMWebRtcConnection} PAMWebRtcConnection
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMWebRtcConnection.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMWebRtcConnection();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.connectionUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.type = reader.int32();
                        break;
                    }
                case 3: {
                        message.recordUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.userName = reader.string();
                        break;
                    }
                case 5: {
                        message.startedOn = reader.int64();
                        break;
                    }
                case 6: {
                        message.configurationUid = reader.bytes();
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
         * Creates a PAMWebRtcConnection message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMWebRtcConnection
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMWebRtcConnection} PAMWebRtcConnection
         */
        PAMWebRtcConnection.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMWebRtcConnection)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMWebRtcConnection: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMWebRtcConnection();
            if (object.connectionUid != null)
                if (typeof object.connectionUid === "string")
                    $util.base64.decode(object.connectionUid, message.connectionUid = $util.newBuffer($util.base64.length(object.connectionUid)), 0);
                else if (object.connectionUid.length >= 0)
                    message.connectionUid = object.connectionUid;
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "CONNECTION":
            case 0:
                message.type = 0;
                break;
            case "TUNNEL":
            case 1:
                message.type = 1;
                break;
            case "SSH":
            case 2:
                message.type = 2;
                break;
            case "RDP":
            case 3:
                message.type = 3;
                break;
            case "HTTP":
            case 4:
                message.type = 4;
                break;
            case "VNC":
            case 5:
                message.type = 5;
                break;
            case "TELNET":
            case 6:
                message.type = 6;
                break;
            case "MYSQL":
            case 7:
                message.type = 7;
                break;
            case "SQL_SERVER":
            case 8:
                message.type = 8;
                break;
            case "POSTGRESQL":
            case 9:
                message.type = 9;
                break;
            case "KUBERNETES":
            case 10:
                message.type = 10;
                break;
            }
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.userName != null)
                message.userName = String(object.userName);
            if (object.startedOn != null)
                if ($util.Long)
                    message.startedOn = $util.Long.fromValue(object.startedOn, false);
                else if (typeof object.startedOn === "string")
                    message.startedOn = parseInt(object.startedOn, 10);
                else if (typeof object.startedOn === "number")
                    message.startedOn = object.startedOn;
                else if (typeof object.startedOn === "object")
                    message.startedOn = new $util.LongBits(object.startedOn.low >>> 0, object.startedOn.high >>> 0).toNumber();
            if (object.configurationUid != null)
                if (typeof object.configurationUid === "string")
                    $util.base64.decode(object.configurationUid, message.configurationUid = $util.newBuffer($util.base64.length(object.configurationUid)), 0);
                else if (object.configurationUid.length >= 0)
                    message.configurationUid = object.configurationUid;
            return message;
        };

        /**
         * Creates a plain object from a PAMWebRtcConnection message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMWebRtcConnection
         * @static
         * @param {PAM.PAMWebRtcConnection} message PAMWebRtcConnection
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMWebRtcConnection.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.connectionUid = "";
                else {
                    object.connectionUid = [];
                    if (options.bytes !== Array)
                        object.connectionUid = $util.newBuffer(object.connectionUid);
                }
                object.type = options.enums === String ? "CONNECTION" : 0;
                if (options.bytes === String)
                    object.recordUid = "";
                else {
                    object.recordUid = [];
                    if (options.bytes !== Array)
                        object.recordUid = $util.newBuffer(object.recordUid);
                }
                object.userName = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.startedOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.startedOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.configurationUid = "";
                else {
                    object.configurationUid = [];
                    if (options.bytes !== Array)
                        object.configurationUid = $util.newBuffer(object.configurationUid);
                }
            }
            if (message.connectionUid != null && Object.hasOwnProperty.call(message, "connectionUid"))
                object.connectionUid = options.bytes === String ? $util.base64.encode(message.connectionUid, 0, message.connectionUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.connectionUid) : message.connectionUid;
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                object.type = options.enums === String ? $root.PAM.WebRtcConnectionType[message.type] === undefined ? message.type : $root.PAM.WebRtcConnectionType[message.type] : message.type;
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.userName != null && Object.hasOwnProperty.call(message, "userName"))
                object.userName = message.userName;
            if (message.startedOn != null && Object.hasOwnProperty.call(message, "startedOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.startedOn = typeof message.startedOn === "number" ? BigInt(message.startedOn) : $util.Long.fromBits(message.startedOn.low >>> 0, message.startedOn.high >>> 0, false).toBigInt();
                else if (typeof message.startedOn === "number")
                    object.startedOn = options.longs === String ? String(message.startedOn) : message.startedOn;
                else
                    object.startedOn = options.longs === String ? $util.Long.prototype.toString.call(message.startedOn) : options.longs === Number ? new $util.LongBits(message.startedOn.low >>> 0, message.startedOn.high >>> 0).toNumber() : message.startedOn;
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                object.configurationUid = options.bytes === String ? $util.base64.encode(message.configurationUid, 0, message.configurationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.configurationUid) : message.configurationUid;
            return object;
        };

        /**
         * Converts this PAMWebRtcConnection to JSON.
         * @function toJSON
         * @memberof PAM.PAMWebRtcConnection
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMWebRtcConnection.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMWebRtcConnection
         * @function getTypeUrl
         * @memberof PAM.PAMWebRtcConnection
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMWebRtcConnection.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMWebRtcConnection";
        };

        return PAMWebRtcConnection;
    })();

    PAM.PAMOnlineControllers = (function() {

        /**
         * Properties of a PAMOnlineControllers.
         * @memberof PAM
         * @interface IPAMOnlineControllers
         * @property {Array.<Uint8Array>|null} [deprecated] PAMOnlineControllers deprecated
         * @property {Array.<PAM.IPAMOnlineController>|null} [controllers] PAMOnlineControllers controllers
         */

        /**
         * Constructs a new PAMOnlineControllers.
         * @memberof PAM
         * @classdesc Represents a PAMOnlineControllers.
         * @implements IPAMOnlineControllers
         * @constructor
         * @param {PAM.IPAMOnlineControllers=} [properties] Properties to set
         */
        function PAMOnlineControllers(properties) {
            this.deprecated = [];
            this.controllers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMOnlineControllers deprecated.
         * @member {Array.<Uint8Array>} deprecated
         * @memberof PAM.PAMOnlineControllers
         * @instance
         */
        PAMOnlineControllers.prototype.deprecated = $util.emptyArray;

        /**
         * PAMOnlineControllers controllers.
         * @member {Array.<PAM.IPAMOnlineController>} controllers
         * @memberof PAM.PAMOnlineControllers
         * @instance
         */
        PAMOnlineControllers.prototype.controllers = $util.emptyArray;

        /**
         * Creates a new PAMOnlineControllers instance using the specified properties.
         * @function create
         * @memberof PAM.PAMOnlineControllers
         * @static
         * @param {PAM.IPAMOnlineControllers=} [properties] Properties to set
         * @returns {PAM.PAMOnlineControllers} PAMOnlineControllers instance
         */
        PAMOnlineControllers.create = function create(properties) {
            return new PAMOnlineControllers(properties);
        };

        /**
         * Encodes the specified PAMOnlineControllers message. Does not implicitly {@link PAM.PAMOnlineControllers.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMOnlineControllers
         * @static
         * @param {PAM.IPAMOnlineControllers} message PAMOnlineControllers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMOnlineControllers.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.deprecated != null && message.deprecated.length)
                for (let i = 0; i < message.deprecated.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.deprecated[i]);
            if (message.controllers != null && message.controllers.length)
                for (let i = 0; i < message.controllers.length; ++i)
                    $root.PAM.PAMOnlineController.encode(message.controllers[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMOnlineControllers message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMOnlineControllers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMOnlineControllers} PAMOnlineControllers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMOnlineControllers.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMOnlineControllers();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.deprecated && message.deprecated.length))
                            message.deprecated = [];
                        message.deprecated.push(reader.bytes());
                        break;
                    }
                case 2: {
                        if (!(message.controllers && message.controllers.length))
                            message.controllers = [];
                        message.controllers.push($root.PAM.PAMOnlineController.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMOnlineControllers message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMOnlineControllers
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMOnlineControllers} PAMOnlineControllers
         */
        PAMOnlineControllers.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMOnlineControllers)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMOnlineControllers: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMOnlineControllers();
            if (object.deprecated) {
                if (!Array.isArray(object.deprecated))
                    throw TypeError(".PAM.PAMOnlineControllers.deprecated: array expected");
                message.deprecated = [];
                for (let i = 0; i < object.deprecated.length; ++i)
                    if (typeof object.deprecated[i] === "string")
                        $util.base64.decode(object.deprecated[i], message.deprecated[i] = $util.newBuffer($util.base64.length(object.deprecated[i])), 0);
                    else if (object.deprecated[i].length >= 0)
                        message.deprecated[i] = object.deprecated[i];
            }
            if (object.controllers) {
                if (!Array.isArray(object.controllers))
                    throw TypeError(".PAM.PAMOnlineControllers.controllers: array expected");
                message.controllers = [];
                for (let i = 0; i < object.controllers.length; ++i) {
                    if (!$util.isObject(object.controllers[i]))
                        throw TypeError(".PAM.PAMOnlineControllers.controllers: object expected");
                    message.controllers[i] = $root.PAM.PAMOnlineController.fromObject(object.controllers[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMOnlineControllers message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMOnlineControllers
         * @static
         * @param {PAM.PAMOnlineControllers} message PAMOnlineControllers
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMOnlineControllers.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.deprecated = [];
                object.controllers = [];
            }
            if (message.deprecated && message.deprecated.length) {
                object.deprecated = [];
                for (let j = 0; j < message.deprecated.length; ++j)
                    object.deprecated[j] = options.bytes === String ? $util.base64.encode(message.deprecated[j], 0, message.deprecated[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.deprecated[j]) : message.deprecated[j];
            }
            if (message.controllers && message.controllers.length) {
                object.controllers = [];
                for (let j = 0; j < message.controllers.length; ++j)
                    object.controllers[j] = $root.PAM.PAMOnlineController.toObject(message.controllers[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMOnlineControllers to JSON.
         * @function toJSON
         * @memberof PAM.PAMOnlineControllers
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMOnlineControllers.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMOnlineControllers
         * @function getTypeUrl
         * @memberof PAM.PAMOnlineControllers
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMOnlineControllers.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMOnlineControllers";
        };

        return PAMOnlineControllers;
    })();

    PAM.PAMRotateRequest = (function() {

        /**
         * Properties of a PAMRotateRequest.
         * @memberof PAM
         * @interface IPAMRotateRequest
         * @property {Uint8Array|null} [requestUid] PAMRotateRequest requestUid
         * @property {Uint8Array|null} [recordUid] PAMRotateRequest recordUid
         */

        /**
         * Constructs a new PAMRotateRequest.
         * @memberof PAM
         * @classdesc Represents a PAMRotateRequest.
         * @implements IPAMRotateRequest
         * @constructor
         * @param {PAM.IPAMRotateRequest=} [properties] Properties to set
         */
        function PAMRotateRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMRotateRequest requestUid.
         * @member {Uint8Array} requestUid
         * @memberof PAM.PAMRotateRequest
         * @instance
         */
        PAMRotateRequest.prototype.requestUid = $util.newBuffer([]);

        /**
         * PAMRotateRequest recordUid.
         * @member {Uint8Array} recordUid
         * @memberof PAM.PAMRotateRequest
         * @instance
         */
        PAMRotateRequest.prototype.recordUid = $util.newBuffer([]);

        /**
         * Creates a new PAMRotateRequest instance using the specified properties.
         * @function create
         * @memberof PAM.PAMRotateRequest
         * @static
         * @param {PAM.IPAMRotateRequest=} [properties] Properties to set
         * @returns {PAM.PAMRotateRequest} PAMRotateRequest instance
         */
        PAMRotateRequest.create = function create(properties) {
            return new PAMRotateRequest(properties);
        };

        /**
         * Encodes the specified PAMRotateRequest message. Does not implicitly {@link PAM.PAMRotateRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMRotateRequest
         * @static
         * @param {PAM.IPAMRotateRequest} message PAMRotateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMRotateRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.requestUid != null && Object.hasOwnProperty.call(message, "requestUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.requestUid);
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recordUid);
            return writer;
        };

        /**
         * Decodes a PAMRotateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMRotateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMRotateRequest} PAMRotateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMRotateRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMRotateRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.requestUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.recordUid = reader.bytes();
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
         * Creates a PAMRotateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMRotateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMRotateRequest} PAMRotateRequest
         */
        PAMRotateRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMRotateRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMRotateRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMRotateRequest();
            if (object.requestUid != null)
                if (typeof object.requestUid === "string")
                    $util.base64.decode(object.requestUid, message.requestUid = $util.newBuffer($util.base64.length(object.requestUid)), 0);
                else if (object.requestUid.length >= 0)
                    message.requestUid = object.requestUid;
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            return message;
        };

        /**
         * Creates a plain object from a PAMRotateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMRotateRequest
         * @static
         * @param {PAM.PAMRotateRequest} message PAMRotateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMRotateRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.requestUid = "";
                else {
                    object.requestUid = [];
                    if (options.bytes !== Array)
                        object.requestUid = $util.newBuffer(object.requestUid);
                }
                if (options.bytes === String)
                    object.recordUid = "";
                else {
                    object.recordUid = [];
                    if (options.bytes !== Array)
                        object.recordUid = $util.newBuffer(object.recordUid);
                }
            }
            if (message.requestUid != null && Object.hasOwnProperty.call(message, "requestUid"))
                object.requestUid = options.bytes === String ? $util.base64.encode(message.requestUid, 0, message.requestUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.requestUid) : message.requestUid;
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            return object;
        };

        /**
         * Converts this PAMRotateRequest to JSON.
         * @function toJSON
         * @memberof PAM.PAMRotateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMRotateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMRotateRequest
         * @function getTypeUrl
         * @memberof PAM.PAMRotateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMRotateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMRotateRequest";
        };

        return PAMRotateRequest;
    })();

    PAM.PAMControllersResponse = (function() {

        /**
         * Properties of a PAMControllersResponse.
         * @memberof PAM
         * @interface IPAMControllersResponse
         * @property {Array.<PAM.IPAMController>|null} [controllers] PAMControllersResponse controllers
         */

        /**
         * Constructs a new PAMControllersResponse.
         * @memberof PAM
         * @classdesc Represents a PAMControllersResponse.
         * @implements IPAMControllersResponse
         * @constructor
         * @param {PAM.IPAMControllersResponse=} [properties] Properties to set
         */
        function PAMControllersResponse(properties) {
            this.controllers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMControllersResponse controllers.
         * @member {Array.<PAM.IPAMController>} controllers
         * @memberof PAM.PAMControllersResponse
         * @instance
         */
        PAMControllersResponse.prototype.controllers = $util.emptyArray;

        /**
         * Creates a new PAMControllersResponse instance using the specified properties.
         * @function create
         * @memberof PAM.PAMControllersResponse
         * @static
         * @param {PAM.IPAMControllersResponse=} [properties] Properties to set
         * @returns {PAM.PAMControllersResponse} PAMControllersResponse instance
         */
        PAMControllersResponse.create = function create(properties) {
            return new PAMControllersResponse(properties);
        };

        /**
         * Encodes the specified PAMControllersResponse message. Does not implicitly {@link PAM.PAMControllersResponse.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMControllersResponse
         * @static
         * @param {PAM.IPAMControllersResponse} message PAMControllersResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMControllersResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.controllers != null && message.controllers.length)
                for (let i = 0; i < message.controllers.length; ++i)
                    $root.PAM.PAMController.encode(message.controllers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMControllersResponse message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMControllersResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMControllersResponse} PAMControllersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMControllersResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMControllersResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.controllers && message.controllers.length))
                            message.controllers = [];
                        message.controllers.push($root.PAM.PAMController.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMControllersResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMControllersResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMControllersResponse} PAMControllersResponse
         */
        PAMControllersResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMControllersResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMControllersResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMControllersResponse();
            if (object.controllers) {
                if (!Array.isArray(object.controllers))
                    throw TypeError(".PAM.PAMControllersResponse.controllers: array expected");
                message.controllers = [];
                for (let i = 0; i < object.controllers.length; ++i) {
                    if (!$util.isObject(object.controllers[i]))
                        throw TypeError(".PAM.PAMControllersResponse.controllers: object expected");
                    message.controllers[i] = $root.PAM.PAMController.fromObject(object.controllers[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMControllersResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMControllersResponse
         * @static
         * @param {PAM.PAMControllersResponse} message PAMControllersResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMControllersResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.controllers = [];
            if (message.controllers && message.controllers.length) {
                object.controllers = [];
                for (let j = 0; j < message.controllers.length; ++j)
                    object.controllers[j] = $root.PAM.PAMController.toObject(message.controllers[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMControllersResponse to JSON.
         * @function toJSON
         * @memberof PAM.PAMControllersResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMControllersResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMControllersResponse
         * @function getTypeUrl
         * @memberof PAM.PAMControllersResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMControllersResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMControllersResponse";
        };

        return PAMControllersResponse;
    })();

    PAM.PAMRemoveController = (function() {

        /**
         * Properties of a PAMRemoveController.
         * @memberof PAM
         * @interface IPAMRemoveController
         * @property {Uint8Array|null} [controllerUid] PAMRemoveController controllerUid
         * @property {string|null} [message] PAMRemoveController message
         */

        /**
         * Constructs a new PAMRemoveController.
         * @memberof PAM
         * @classdesc Represents a PAMRemoveController.
         * @implements IPAMRemoveController
         * @constructor
         * @param {PAM.IPAMRemoveController=} [properties] Properties to set
         */
        function PAMRemoveController(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMRemoveController controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof PAM.PAMRemoveController
         * @instance
         */
        PAMRemoveController.prototype.controllerUid = $util.newBuffer([]);

        /**
         * PAMRemoveController message.
         * @member {string} message
         * @memberof PAM.PAMRemoveController
         * @instance
         */
        PAMRemoveController.prototype.message = "";

        /**
         * Creates a new PAMRemoveController instance using the specified properties.
         * @function create
         * @memberof PAM.PAMRemoveController
         * @static
         * @param {PAM.IPAMRemoveController=} [properties] Properties to set
         * @returns {PAM.PAMRemoveController} PAMRemoveController instance
         */
        PAMRemoveController.create = function create(properties) {
            return new PAMRemoveController(properties);
        };

        /**
         * Encodes the specified PAMRemoveController message. Does not implicitly {@link PAM.PAMRemoveController.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMRemoveController
         * @static
         * @param {PAM.IPAMRemoveController} message PAMRemoveController message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMRemoveController.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.controllerUid);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            return writer;
        };

        /**
         * Decodes a PAMRemoveController message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMRemoveController
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMRemoveController} PAMRemoveController
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMRemoveController.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMRemoveController();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.message = reader.string();
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
         * Creates a PAMRemoveController message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMRemoveController
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMRemoveController} PAMRemoveController
         */
        PAMRemoveController.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMRemoveController)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMRemoveController: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMRemoveController();
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a PAMRemoveController message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMRemoveController
         * @static
         * @param {PAM.PAMRemoveController} message PAMRemoveController
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMRemoveController.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
                object.message = "";
            }
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this PAMRemoveController to JSON.
         * @function toJSON
         * @memberof PAM.PAMRemoveController
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMRemoveController.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMRemoveController
         * @function getTypeUrl
         * @memberof PAM.PAMRemoveController
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMRemoveController.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMRemoveController";
        };

        return PAMRemoveController;
    })();

    PAM.PAMRemoveControllerResponse = (function() {

        /**
         * Properties of a PAMRemoveControllerResponse.
         * @memberof PAM
         * @interface IPAMRemoveControllerResponse
         * @property {Array.<PAM.IPAMRemoveController>|null} [controllers] PAMRemoveControllerResponse controllers
         */

        /**
         * Constructs a new PAMRemoveControllerResponse.
         * @memberof PAM
         * @classdesc Represents a PAMRemoveControllerResponse.
         * @implements IPAMRemoveControllerResponse
         * @constructor
         * @param {PAM.IPAMRemoveControllerResponse=} [properties] Properties to set
         */
        function PAMRemoveControllerResponse(properties) {
            this.controllers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMRemoveControllerResponse controllers.
         * @member {Array.<PAM.IPAMRemoveController>} controllers
         * @memberof PAM.PAMRemoveControllerResponse
         * @instance
         */
        PAMRemoveControllerResponse.prototype.controllers = $util.emptyArray;

        /**
         * Creates a new PAMRemoveControllerResponse instance using the specified properties.
         * @function create
         * @memberof PAM.PAMRemoveControllerResponse
         * @static
         * @param {PAM.IPAMRemoveControllerResponse=} [properties] Properties to set
         * @returns {PAM.PAMRemoveControllerResponse} PAMRemoveControllerResponse instance
         */
        PAMRemoveControllerResponse.create = function create(properties) {
            return new PAMRemoveControllerResponse(properties);
        };

        /**
         * Encodes the specified PAMRemoveControllerResponse message. Does not implicitly {@link PAM.PAMRemoveControllerResponse.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMRemoveControllerResponse
         * @static
         * @param {PAM.IPAMRemoveControllerResponse} message PAMRemoveControllerResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMRemoveControllerResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.controllers != null && message.controllers.length)
                for (let i = 0; i < message.controllers.length; ++i)
                    $root.PAM.PAMRemoveController.encode(message.controllers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMRemoveControllerResponse message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMRemoveControllerResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMRemoveControllerResponse} PAMRemoveControllerResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMRemoveControllerResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMRemoveControllerResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.controllers && message.controllers.length))
                            message.controllers = [];
                        message.controllers.push($root.PAM.PAMRemoveController.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMRemoveControllerResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMRemoveControllerResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMRemoveControllerResponse} PAMRemoveControllerResponse
         */
        PAMRemoveControllerResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMRemoveControllerResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMRemoveControllerResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMRemoveControllerResponse();
            if (object.controllers) {
                if (!Array.isArray(object.controllers))
                    throw TypeError(".PAM.PAMRemoveControllerResponse.controllers: array expected");
                message.controllers = [];
                for (let i = 0; i < object.controllers.length; ++i) {
                    if (!$util.isObject(object.controllers[i]))
                        throw TypeError(".PAM.PAMRemoveControllerResponse.controllers: object expected");
                    message.controllers[i] = $root.PAM.PAMRemoveController.fromObject(object.controllers[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMRemoveControllerResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMRemoveControllerResponse
         * @static
         * @param {PAM.PAMRemoveControllerResponse} message PAMRemoveControllerResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMRemoveControllerResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.controllers = [];
            if (message.controllers && message.controllers.length) {
                object.controllers = [];
                for (let j = 0; j < message.controllers.length; ++j)
                    object.controllers[j] = $root.PAM.PAMRemoveController.toObject(message.controllers[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMRemoveControllerResponse to JSON.
         * @function toJSON
         * @memberof PAM.PAMRemoveControllerResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMRemoveControllerResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMRemoveControllerResponse
         * @function getTypeUrl
         * @memberof PAM.PAMRemoveControllerResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMRemoveControllerResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMRemoveControllerResponse";
        };

        return PAMRemoveControllerResponse;
    })();

    PAM.PAMModifyRequest = (function() {

        /**
         * Properties of a PAMModifyRequest.
         * @memberof PAM
         * @interface IPAMModifyRequest
         * @property {Array.<PAM.IPAMDataOperation>|null} [operations] PAMModifyRequest operations
         */

        /**
         * Constructs a new PAMModifyRequest.
         * @memberof PAM
         * @classdesc Represents a PAMModifyRequest.
         * @implements IPAMModifyRequest
         * @constructor
         * @param {PAM.IPAMModifyRequest=} [properties] Properties to set
         */
        function PAMModifyRequest(properties) {
            this.operations = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMModifyRequest operations.
         * @member {Array.<PAM.IPAMDataOperation>} operations
         * @memberof PAM.PAMModifyRequest
         * @instance
         */
        PAMModifyRequest.prototype.operations = $util.emptyArray;

        /**
         * Creates a new PAMModifyRequest instance using the specified properties.
         * @function create
         * @memberof PAM.PAMModifyRequest
         * @static
         * @param {PAM.IPAMModifyRequest=} [properties] Properties to set
         * @returns {PAM.PAMModifyRequest} PAMModifyRequest instance
         */
        PAMModifyRequest.create = function create(properties) {
            return new PAMModifyRequest(properties);
        };

        /**
         * Encodes the specified PAMModifyRequest message. Does not implicitly {@link PAM.PAMModifyRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMModifyRequest
         * @static
         * @param {PAM.IPAMModifyRequest} message PAMModifyRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMModifyRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.operations != null && message.operations.length)
                for (let i = 0; i < message.operations.length; ++i)
                    $root.PAM.PAMDataOperation.encode(message.operations[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMModifyRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMModifyRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMModifyRequest} PAMModifyRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMModifyRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMModifyRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.operations && message.operations.length))
                            message.operations = [];
                        message.operations.push($root.PAM.PAMDataOperation.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMModifyRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMModifyRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMModifyRequest} PAMModifyRequest
         */
        PAMModifyRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMModifyRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMModifyRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMModifyRequest();
            if (object.operations) {
                if (!Array.isArray(object.operations))
                    throw TypeError(".PAM.PAMModifyRequest.operations: array expected");
                message.operations = [];
                for (let i = 0; i < object.operations.length; ++i) {
                    if (!$util.isObject(object.operations[i]))
                        throw TypeError(".PAM.PAMModifyRequest.operations: object expected");
                    message.operations[i] = $root.PAM.PAMDataOperation.fromObject(object.operations[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMModifyRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMModifyRequest
         * @static
         * @param {PAM.PAMModifyRequest} message PAMModifyRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMModifyRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.operations = [];
            if (message.operations && message.operations.length) {
                object.operations = [];
                for (let j = 0; j < message.operations.length; ++j)
                    object.operations[j] = $root.PAM.PAMDataOperation.toObject(message.operations[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMModifyRequest to JSON.
         * @function toJSON
         * @memberof PAM.PAMModifyRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMModifyRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMModifyRequest
         * @function getTypeUrl
         * @memberof PAM.PAMModifyRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMModifyRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMModifyRequest";
        };

        return PAMModifyRequest;
    })();

    PAM.PAMDataOperation = (function() {

        /**
         * Properties of a PAMDataOperation.
         * @memberof PAM
         * @interface IPAMDataOperation
         * @property {PAM.PAMOperationType|null} [operationType] PAMDataOperation operationType
         * @property {PAM.IPAMConfigurationData|null} [configuration] PAMDataOperation configuration
         * @property {PAM.IPAMElementData|null} [element] PAMDataOperation element
         */

        /**
         * Constructs a new PAMDataOperation.
         * @memberof PAM
         * @classdesc Represents a PAMDataOperation.
         * @implements IPAMDataOperation
         * @constructor
         * @param {PAM.IPAMDataOperation=} [properties] Properties to set
         */
        function PAMDataOperation(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMDataOperation operationType.
         * @member {PAM.PAMOperationType} operationType
         * @memberof PAM.PAMDataOperation
         * @instance
         */
        PAMDataOperation.prototype.operationType = 0;

        /**
         * PAMDataOperation configuration.
         * @member {PAM.IPAMConfigurationData|null|undefined} configuration
         * @memberof PAM.PAMDataOperation
         * @instance
         */
        PAMDataOperation.prototype.configuration = null;

        /**
         * PAMDataOperation element.
         * @member {PAM.IPAMElementData|null|undefined} element
         * @memberof PAM.PAMDataOperation
         * @instance
         */
        PAMDataOperation.prototype.element = null;

        /**
         * Creates a new PAMDataOperation instance using the specified properties.
         * @function create
         * @memberof PAM.PAMDataOperation
         * @static
         * @param {PAM.IPAMDataOperation=} [properties] Properties to set
         * @returns {PAM.PAMDataOperation} PAMDataOperation instance
         */
        PAMDataOperation.create = function create(properties) {
            return new PAMDataOperation(properties);
        };

        /**
         * Encodes the specified PAMDataOperation message. Does not implicitly {@link PAM.PAMDataOperation.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMDataOperation
         * @static
         * @param {PAM.IPAMDataOperation} message PAMDataOperation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMDataOperation.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.operationType);
            if (message.configuration != null && Object.hasOwnProperty.call(message, "configuration"))
                $root.PAM.PAMConfigurationData.encode(message.configuration, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.element != null && Object.hasOwnProperty.call(message, "element"))
                $root.PAM.PAMElementData.encode(message.element, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMDataOperation message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMDataOperation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMDataOperation} PAMDataOperation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMDataOperation.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMDataOperation();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.operationType = reader.int32();
                        break;
                    }
                case 2: {
                        message.configuration = $root.PAM.PAMConfigurationData.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.element = $root.PAM.PAMElementData.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates a PAMDataOperation message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMDataOperation
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMDataOperation} PAMDataOperation
         */
        PAMDataOperation.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMDataOperation)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMDataOperation: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMDataOperation();
            switch (object.operationType) {
            default:
                if (typeof object.operationType === "number") {
                    message.operationType = object.operationType;
                    break;
                }
                break;
            case "ADD":
            case 0:
                message.operationType = 0;
                break;
            case "UPDATE":
            case 1:
                message.operationType = 1;
                break;
            case "REPLACE":
            case 2:
                message.operationType = 2;
                break;
            case "DELETE":
            case 3:
                message.operationType = 3;
                break;
            }
            if (object.configuration != null) {
                if (!$util.isObject(object.configuration))
                    throw TypeError(".PAM.PAMDataOperation.configuration: object expected");
                message.configuration = $root.PAM.PAMConfigurationData.fromObject(object.configuration, long + 1);
            }
            if (object.element != null) {
                if (!$util.isObject(object.element))
                    throw TypeError(".PAM.PAMDataOperation.element: object expected");
                message.element = $root.PAM.PAMElementData.fromObject(object.element, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMDataOperation message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMDataOperation
         * @static
         * @param {PAM.PAMDataOperation} message PAMDataOperation
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMDataOperation.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.operationType = options.enums === String ? "ADD" : 0;
                object.configuration = null;
                object.element = null;
            }
            if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                object.operationType = options.enums === String ? $root.PAM.PAMOperationType[message.operationType] === undefined ? message.operationType : $root.PAM.PAMOperationType[message.operationType] : message.operationType;
            if (message.configuration != null && Object.hasOwnProperty.call(message, "configuration"))
                object.configuration = $root.PAM.PAMConfigurationData.toObject(message.configuration, options, q + 1);
            if (message.element != null && Object.hasOwnProperty.call(message, "element"))
                object.element = $root.PAM.PAMElementData.toObject(message.element, options, q + 1);
            return object;
        };

        /**
         * Converts this PAMDataOperation to JSON.
         * @function toJSON
         * @memberof PAM.PAMDataOperation
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMDataOperation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMDataOperation
         * @function getTypeUrl
         * @memberof PAM.PAMDataOperation
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMDataOperation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMDataOperation";
        };

        return PAMDataOperation;
    })();

    /**
     * PAMOperationType enum.
     * @name PAM.PAMOperationType
     * @enum {number}
     * @property {number} ADD=0 ADD value
     * @property {number} UPDATE=1 UPDATE value
     * @property {number} REPLACE=2 REPLACE value
     * @property {number} DELETE=3 DELETE value
     */
    PAM.PAMOperationType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ADD"] = 0;
        values[valuesById[1] = "UPDATE"] = 1;
        values[valuesById[2] = "REPLACE"] = 2;
        values[valuesById[3] = "DELETE"] = 3;
        return values;
    })();

    PAM.PAMConfigurationData = (function() {

        /**
         * Properties of a PAMConfigurationData.
         * @memberof PAM
         * @interface IPAMConfigurationData
         * @property {Uint8Array|null} [configurationUid] PAMConfigurationData configurationUid
         * @property {number|null} [nodeId] PAMConfigurationData nodeId
         * @property {Uint8Array|null} [controllerUid] PAMConfigurationData controllerUid
         * @property {Uint8Array|null} [data] PAMConfigurationData data
         */

        /**
         * Constructs a new PAMConfigurationData.
         * @memberof PAM
         * @classdesc Represents a PAMConfigurationData.
         * @implements IPAMConfigurationData
         * @constructor
         * @param {PAM.IPAMConfigurationData=} [properties] Properties to set
         */
        function PAMConfigurationData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMConfigurationData configurationUid.
         * @member {Uint8Array} configurationUid
         * @memberof PAM.PAMConfigurationData
         * @instance
         */
        PAMConfigurationData.prototype.configurationUid = $util.newBuffer([]);

        /**
         * PAMConfigurationData nodeId.
         * @member {number} nodeId
         * @memberof PAM.PAMConfigurationData
         * @instance
         */
        PAMConfigurationData.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMConfigurationData controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof PAM.PAMConfigurationData
         * @instance
         */
        PAMConfigurationData.prototype.controllerUid = $util.newBuffer([]);

        /**
         * PAMConfigurationData data.
         * @member {Uint8Array} data
         * @memberof PAM.PAMConfigurationData
         * @instance
         */
        PAMConfigurationData.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new PAMConfigurationData instance using the specified properties.
         * @function create
         * @memberof PAM.PAMConfigurationData
         * @static
         * @param {PAM.IPAMConfigurationData=} [properties] Properties to set
         * @returns {PAM.PAMConfigurationData} PAMConfigurationData instance
         */
        PAMConfigurationData.create = function create(properties) {
            return new PAMConfigurationData(properties);
        };

        /**
         * Encodes the specified PAMConfigurationData message. Does not implicitly {@link PAM.PAMConfigurationData.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMConfigurationData
         * @static
         * @param {PAM.IPAMConfigurationData} message PAMConfigurationData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMConfigurationData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.configurationUid);
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.nodeId);
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.controllerUid);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.data);
            return writer;
        };

        /**
         * Decodes a PAMConfigurationData message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMConfigurationData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMConfigurationData} PAMConfigurationData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMConfigurationData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMConfigurationData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.configurationUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.nodeId = reader.int64();
                        break;
                    }
                case 3: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.data = reader.bytes();
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
         * Creates a PAMConfigurationData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMConfigurationData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMConfigurationData} PAMConfigurationData
         */
        PAMConfigurationData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMConfigurationData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMConfigurationData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMConfigurationData();
            if (object.configurationUid != null)
                if (typeof object.configurationUid === "string")
                    $util.base64.decode(object.configurationUid, message.configurationUid = $util.newBuffer($util.base64.length(object.configurationUid)), 0);
                else if (object.configurationUid.length >= 0)
                    message.configurationUid = object.configurationUid;
            if (object.nodeId != null)
                if ($util.Long)
                    message.nodeId = $util.Long.fromValue(object.nodeId, false);
                else if (typeof object.nodeId === "string")
                    message.nodeId = parseInt(object.nodeId, 10);
                else if (typeof object.nodeId === "number")
                    message.nodeId = object.nodeId;
                else if (typeof object.nodeId === "object")
                    message.nodeId = new $util.LongBits(object.nodeId.low >>> 0, object.nodeId.high >>> 0).toNumber();
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a PAMConfigurationData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMConfigurationData
         * @static
         * @param {PAM.PAMConfigurationData} message PAMConfigurationData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMConfigurationData.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.configurationUid = "";
                else {
                    object.configurationUid = [];
                    if (options.bytes !== Array)
                        object.configurationUid = $util.newBuffer(object.configurationUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.nodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.nodeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                object.configurationUid = options.bytes === String ? $util.base64.encode(message.configurationUid, 0, message.configurationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.configurationUid) : message.configurationUid;
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nodeId = typeof message.nodeId === "number" ? BigInt(message.nodeId) : $util.Long.fromBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0, false).toBigInt();
                else if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber() : message.nodeId;
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this PAMConfigurationData to JSON.
         * @function toJSON
         * @memberof PAM.PAMConfigurationData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMConfigurationData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMConfigurationData
         * @function getTypeUrl
         * @memberof PAM.PAMConfigurationData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMConfigurationData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMConfigurationData";
        };

        return PAMConfigurationData;
    })();

    PAM.PAMElementData = (function() {

        /**
         * Properties of a PAMElementData.
         * @memberof PAM
         * @interface IPAMElementData
         * @property {Uint8Array|null} [elementUid] PAMElementData elementUid
         * @property {Uint8Array|null} [parentUid] PAMElementData parentUid
         * @property {Uint8Array|null} [data] PAMElementData data
         */

        /**
         * Constructs a new PAMElementData.
         * @memberof PAM
         * @classdesc Represents a PAMElementData.
         * @implements IPAMElementData
         * @constructor
         * @param {PAM.IPAMElementData=} [properties] Properties to set
         */
        function PAMElementData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMElementData elementUid.
         * @member {Uint8Array} elementUid
         * @memberof PAM.PAMElementData
         * @instance
         */
        PAMElementData.prototype.elementUid = $util.newBuffer([]);

        /**
         * PAMElementData parentUid.
         * @member {Uint8Array} parentUid
         * @memberof PAM.PAMElementData
         * @instance
         */
        PAMElementData.prototype.parentUid = $util.newBuffer([]);

        /**
         * PAMElementData data.
         * @member {Uint8Array} data
         * @memberof PAM.PAMElementData
         * @instance
         */
        PAMElementData.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new PAMElementData instance using the specified properties.
         * @function create
         * @memberof PAM.PAMElementData
         * @static
         * @param {PAM.IPAMElementData=} [properties] Properties to set
         * @returns {PAM.PAMElementData} PAMElementData instance
         */
        PAMElementData.create = function create(properties) {
            return new PAMElementData(properties);
        };

        /**
         * Encodes the specified PAMElementData message. Does not implicitly {@link PAM.PAMElementData.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMElementData
         * @static
         * @param {PAM.IPAMElementData} message PAMElementData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMElementData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.elementUid != null && Object.hasOwnProperty.call(message, "elementUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.elementUid);
            if (message.parentUid != null && Object.hasOwnProperty.call(message, "parentUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.parentUid);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.data);
            return writer;
        };

        /**
         * Decodes a PAMElementData message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMElementData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMElementData} PAMElementData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMElementData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMElementData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.elementUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.parentUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.data = reader.bytes();
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
         * Creates a PAMElementData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMElementData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMElementData} PAMElementData
         */
        PAMElementData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMElementData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMElementData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMElementData();
            if (object.elementUid != null)
                if (typeof object.elementUid === "string")
                    $util.base64.decode(object.elementUid, message.elementUid = $util.newBuffer($util.base64.length(object.elementUid)), 0);
                else if (object.elementUid.length >= 0)
                    message.elementUid = object.elementUid;
            if (object.parentUid != null)
                if (typeof object.parentUid === "string")
                    $util.base64.decode(object.parentUid, message.parentUid = $util.newBuffer($util.base64.length(object.parentUid)), 0);
                else if (object.parentUid.length >= 0)
                    message.parentUid = object.parentUid;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a PAMElementData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMElementData
         * @static
         * @param {PAM.PAMElementData} message PAMElementData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMElementData.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.elementUid = "";
                else {
                    object.elementUid = [];
                    if (options.bytes !== Array)
                        object.elementUid = $util.newBuffer(object.elementUid);
                }
                if (options.bytes === String)
                    object.parentUid = "";
                else {
                    object.parentUid = [];
                    if (options.bytes !== Array)
                        object.parentUid = $util.newBuffer(object.parentUid);
                }
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.elementUid != null && Object.hasOwnProperty.call(message, "elementUid"))
                object.elementUid = options.bytes === String ? $util.base64.encode(message.elementUid, 0, message.elementUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.elementUid) : message.elementUid;
            if (message.parentUid != null && Object.hasOwnProperty.call(message, "parentUid"))
                object.parentUid = options.bytes === String ? $util.base64.encode(message.parentUid, 0, message.parentUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.parentUid) : message.parentUid;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this PAMElementData to JSON.
         * @function toJSON
         * @memberof PAM.PAMElementData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMElementData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMElementData
         * @function getTypeUrl
         * @memberof PAM.PAMElementData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMElementData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMElementData";
        };

        return PAMElementData;
    })();

    /**
     * PAMOperationResultType enum.
     * @name PAM.PAMOperationResultType
     * @enum {number}
     * @property {number} POT_SUCCESS=0 POT_SUCCESS value
     * @property {number} POT_UNKNOWN_ERROR=1 POT_UNKNOWN_ERROR value
     * @property {number} POT_ALREADY_EXISTS=2 POT_ALREADY_EXISTS value
     * @property {number} POT_DOES_NOT_EXIST=3 POT_DOES_NOT_EXIST value
     */
    PAM.PAMOperationResultType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "POT_SUCCESS"] = 0;
        values[valuesById[1] = "POT_UNKNOWN_ERROR"] = 1;
        values[valuesById[2] = "POT_ALREADY_EXISTS"] = 2;
        values[valuesById[3] = "POT_DOES_NOT_EXIST"] = 3;
        return values;
    })();

    PAM.PAMElementOperationResult = (function() {

        /**
         * Properties of a PAMElementOperationResult.
         * @memberof PAM
         * @interface IPAMElementOperationResult
         * @property {Uint8Array|null} [elementUid] PAMElementOperationResult elementUid
         * @property {PAM.PAMOperationResultType|null} [result] PAMElementOperationResult result
         * @property {string|null} [message] PAMElementOperationResult message
         */

        /**
         * Constructs a new PAMElementOperationResult.
         * @memberof PAM
         * @classdesc Represents a PAMElementOperationResult.
         * @implements IPAMElementOperationResult
         * @constructor
         * @param {PAM.IPAMElementOperationResult=} [properties] Properties to set
         */
        function PAMElementOperationResult(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMElementOperationResult elementUid.
         * @member {Uint8Array} elementUid
         * @memberof PAM.PAMElementOperationResult
         * @instance
         */
        PAMElementOperationResult.prototype.elementUid = $util.newBuffer([]);

        /**
         * PAMElementOperationResult result.
         * @member {PAM.PAMOperationResultType} result
         * @memberof PAM.PAMElementOperationResult
         * @instance
         */
        PAMElementOperationResult.prototype.result = 0;

        /**
         * PAMElementOperationResult message.
         * @member {string} message
         * @memberof PAM.PAMElementOperationResult
         * @instance
         */
        PAMElementOperationResult.prototype.message = "";

        /**
         * Creates a new PAMElementOperationResult instance using the specified properties.
         * @function create
         * @memberof PAM.PAMElementOperationResult
         * @static
         * @param {PAM.IPAMElementOperationResult=} [properties] Properties to set
         * @returns {PAM.PAMElementOperationResult} PAMElementOperationResult instance
         */
        PAMElementOperationResult.create = function create(properties) {
            return new PAMElementOperationResult(properties);
        };

        /**
         * Encodes the specified PAMElementOperationResult message. Does not implicitly {@link PAM.PAMElementOperationResult.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMElementOperationResult
         * @static
         * @param {PAM.IPAMElementOperationResult} message PAMElementOperationResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMElementOperationResult.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.elementUid != null && Object.hasOwnProperty.call(message, "elementUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.elementUid);
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            return writer;
        };

        /**
         * Decodes a PAMElementOperationResult message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMElementOperationResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMElementOperationResult} PAMElementOperationResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMElementOperationResult.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMElementOperationResult();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.elementUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.result = reader.int32();
                        break;
                    }
                case 3: {
                        message.message = reader.string();
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
         * Creates a PAMElementOperationResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMElementOperationResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMElementOperationResult} PAMElementOperationResult
         */
        PAMElementOperationResult.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMElementOperationResult)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMElementOperationResult: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMElementOperationResult();
            if (object.elementUid != null)
                if (typeof object.elementUid === "string")
                    $util.base64.decode(object.elementUid, message.elementUid = $util.newBuffer($util.base64.length(object.elementUid)), 0);
                else if (object.elementUid.length >= 0)
                    message.elementUid = object.elementUid;
            switch (object.result) {
            default:
                if (typeof object.result === "number") {
                    message.result = object.result;
                    break;
                }
                break;
            case "POT_SUCCESS":
            case 0:
                message.result = 0;
                break;
            case "POT_UNKNOWN_ERROR":
            case 1:
                message.result = 1;
                break;
            case "POT_ALREADY_EXISTS":
            case 2:
                message.result = 2;
                break;
            case "POT_DOES_NOT_EXIST":
            case 3:
                message.result = 3;
                break;
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a PAMElementOperationResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMElementOperationResult
         * @static
         * @param {PAM.PAMElementOperationResult} message PAMElementOperationResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMElementOperationResult.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.elementUid = "";
                else {
                    object.elementUid = [];
                    if (options.bytes !== Array)
                        object.elementUid = $util.newBuffer(object.elementUid);
                }
                object.result = options.enums === String ? "POT_SUCCESS" : 0;
                object.message = "";
            }
            if (message.elementUid != null && Object.hasOwnProperty.call(message, "elementUid"))
                object.elementUid = options.bytes === String ? $util.base64.encode(message.elementUid, 0, message.elementUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.elementUid) : message.elementUid;
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                object.result = options.enums === String ? $root.PAM.PAMOperationResultType[message.result] === undefined ? message.result : $root.PAM.PAMOperationResultType[message.result] : message.result;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this PAMElementOperationResult to JSON.
         * @function toJSON
         * @memberof PAM.PAMElementOperationResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMElementOperationResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMElementOperationResult
         * @function getTypeUrl
         * @memberof PAM.PAMElementOperationResult
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMElementOperationResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMElementOperationResult";
        };

        return PAMElementOperationResult;
    })();

    PAM.PAMModifyResult = (function() {

        /**
         * Properties of a PAMModifyResult.
         * @memberof PAM
         * @interface IPAMModifyResult
         * @property {Array.<PAM.IPAMElementOperationResult>|null} [results] PAMModifyResult results
         */

        /**
         * Constructs a new PAMModifyResult.
         * @memberof PAM
         * @classdesc Represents a PAMModifyResult.
         * @implements IPAMModifyResult
         * @constructor
         * @param {PAM.IPAMModifyResult=} [properties] Properties to set
         */
        function PAMModifyResult(properties) {
            this.results = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMModifyResult results.
         * @member {Array.<PAM.IPAMElementOperationResult>} results
         * @memberof PAM.PAMModifyResult
         * @instance
         */
        PAMModifyResult.prototype.results = $util.emptyArray;

        /**
         * Creates a new PAMModifyResult instance using the specified properties.
         * @function create
         * @memberof PAM.PAMModifyResult
         * @static
         * @param {PAM.IPAMModifyResult=} [properties] Properties to set
         * @returns {PAM.PAMModifyResult} PAMModifyResult instance
         */
        PAMModifyResult.create = function create(properties) {
            return new PAMModifyResult(properties);
        };

        /**
         * Encodes the specified PAMModifyResult message. Does not implicitly {@link PAM.PAMModifyResult.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMModifyResult
         * @static
         * @param {PAM.IPAMModifyResult} message PAMModifyResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMModifyResult.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.results != null && message.results.length)
                for (let i = 0; i < message.results.length; ++i)
                    $root.PAM.PAMElementOperationResult.encode(message.results[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMModifyResult message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMModifyResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMModifyResult} PAMModifyResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMModifyResult.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMModifyResult();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.results && message.results.length))
                            message.results = [];
                        message.results.push($root.PAM.PAMElementOperationResult.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMModifyResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMModifyResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMModifyResult} PAMModifyResult
         */
        PAMModifyResult.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMModifyResult)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMModifyResult: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMModifyResult();
            if (object.results) {
                if (!Array.isArray(object.results))
                    throw TypeError(".PAM.PAMModifyResult.results: array expected");
                message.results = [];
                for (let i = 0; i < object.results.length; ++i) {
                    if (!$util.isObject(object.results[i]))
                        throw TypeError(".PAM.PAMModifyResult.results: object expected");
                    message.results[i] = $root.PAM.PAMElementOperationResult.fromObject(object.results[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMModifyResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMModifyResult
         * @static
         * @param {PAM.PAMModifyResult} message PAMModifyResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMModifyResult.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.results = [];
            if (message.results && message.results.length) {
                object.results = [];
                for (let j = 0; j < message.results.length; ++j)
                    object.results[j] = $root.PAM.PAMElementOperationResult.toObject(message.results[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMModifyResult to JSON.
         * @function toJSON
         * @memberof PAM.PAMModifyResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMModifyResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMModifyResult
         * @function getTypeUrl
         * @memberof PAM.PAMModifyResult
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMModifyResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMModifyResult";
        };

        return PAMModifyResult;
    })();

    PAM.PAMElement = (function() {

        /**
         * Properties of a PAMElement.
         * @memberof PAM
         * @interface IPAMElement
         * @property {Uint8Array|null} [elementUid] PAMElement elementUid
         * @property {Uint8Array|null} [data] PAMElement data
         * @property {number|null} [created] PAMElement created
         * @property {number|null} [lastModified] PAMElement lastModified
         * @property {Array.<PAM.IPAMElement>|null} [children] PAMElement children
         */

        /**
         * Constructs a new PAMElement.
         * @memberof PAM
         * @classdesc Represents a PAMElement.
         * @implements IPAMElement
         * @constructor
         * @param {PAM.IPAMElement=} [properties] Properties to set
         */
        function PAMElement(properties) {
            this.children = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMElement elementUid.
         * @member {Uint8Array} elementUid
         * @memberof PAM.PAMElement
         * @instance
         */
        PAMElement.prototype.elementUid = $util.newBuffer([]);

        /**
         * PAMElement data.
         * @member {Uint8Array} data
         * @memberof PAM.PAMElement
         * @instance
         */
        PAMElement.prototype.data = $util.newBuffer([]);

        /**
         * PAMElement created.
         * @member {number} created
         * @memberof PAM.PAMElement
         * @instance
         */
        PAMElement.prototype.created = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMElement lastModified.
         * @member {number} lastModified
         * @memberof PAM.PAMElement
         * @instance
         */
        PAMElement.prototype.lastModified = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMElement children.
         * @member {Array.<PAM.IPAMElement>} children
         * @memberof PAM.PAMElement
         * @instance
         */
        PAMElement.prototype.children = $util.emptyArray;

        /**
         * Creates a new PAMElement instance using the specified properties.
         * @function create
         * @memberof PAM.PAMElement
         * @static
         * @param {PAM.IPAMElement=} [properties] Properties to set
         * @returns {PAM.PAMElement} PAMElement instance
         */
        PAMElement.create = function create(properties) {
            return new PAMElement(properties);
        };

        /**
         * Encodes the specified PAMElement message. Does not implicitly {@link PAM.PAMElement.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMElement
         * @static
         * @param {PAM.IPAMElement} message PAMElement message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMElement.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.elementUid != null && Object.hasOwnProperty.call(message, "elementUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.elementUid);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            if (message.created != null && Object.hasOwnProperty.call(message, "created"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.created);
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.lastModified);
            if (message.children != null && message.children.length)
                for (let i = 0; i < message.children.length; ++i)
                    $root.PAM.PAMElement.encode(message.children[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMElement message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMElement
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMElement} PAMElement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMElement.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMElement();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.elementUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.data = reader.bytes();
                        break;
                    }
                case 3: {
                        message.created = reader.int64();
                        break;
                    }
                case 4: {
                        message.lastModified = reader.int64();
                        break;
                    }
                case 5: {
                        if (!(message.children && message.children.length))
                            message.children = [];
                        message.children.push($root.PAM.PAMElement.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMElement message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMElement
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMElement} PAMElement
         */
        PAMElement.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMElement)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMElement: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMElement();
            if (object.elementUid != null)
                if (typeof object.elementUid === "string")
                    $util.base64.decode(object.elementUid, message.elementUid = $util.newBuffer($util.base64.length(object.elementUid)), 0);
                else if (object.elementUid.length >= 0)
                    message.elementUid = object.elementUid;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            if (object.created != null)
                if ($util.Long)
                    message.created = $util.Long.fromValue(object.created, false);
                else if (typeof object.created === "string")
                    message.created = parseInt(object.created, 10);
                else if (typeof object.created === "number")
                    message.created = object.created;
                else if (typeof object.created === "object")
                    message.created = new $util.LongBits(object.created.low >>> 0, object.created.high >>> 0).toNumber();
            if (object.lastModified != null)
                if ($util.Long)
                    message.lastModified = $util.Long.fromValue(object.lastModified, false);
                else if (typeof object.lastModified === "string")
                    message.lastModified = parseInt(object.lastModified, 10);
                else if (typeof object.lastModified === "number")
                    message.lastModified = object.lastModified;
                else if (typeof object.lastModified === "object")
                    message.lastModified = new $util.LongBits(object.lastModified.low >>> 0, object.lastModified.high >>> 0).toNumber();
            if (object.children) {
                if (!Array.isArray(object.children))
                    throw TypeError(".PAM.PAMElement.children: array expected");
                message.children = [];
                for (let i = 0; i < object.children.length; ++i) {
                    if (!$util.isObject(object.children[i]))
                        throw TypeError(".PAM.PAMElement.children: object expected");
                    message.children[i] = $root.PAM.PAMElement.fromObject(object.children[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMElement message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMElement
         * @static
         * @param {PAM.PAMElement} message PAMElement
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMElement.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.children = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.elementUid = "";
                else {
                    object.elementUid = [];
                    if (options.bytes !== Array)
                        object.elementUid = $util.newBuffer(object.elementUid);
                }
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.created = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.created = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.lastModified = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.lastModified = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.elementUid != null && Object.hasOwnProperty.call(message, "elementUid"))
                object.elementUid = options.bytes === String ? $util.base64.encode(message.elementUid, 0, message.elementUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.elementUid) : message.elementUid;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.created != null && Object.hasOwnProperty.call(message, "created"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.created = typeof message.created === "number" ? BigInt(message.created) : $util.Long.fromBits(message.created.low >>> 0, message.created.high >>> 0, false).toBigInt();
                else if (typeof message.created === "number")
                    object.created = options.longs === String ? String(message.created) : message.created;
                else
                    object.created = options.longs === String ? $util.Long.prototype.toString.call(message.created) : options.longs === Number ? new $util.LongBits(message.created.low >>> 0, message.created.high >>> 0).toNumber() : message.created;
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.lastModified = typeof message.lastModified === "number" ? BigInt(message.lastModified) : $util.Long.fromBits(message.lastModified.low >>> 0, message.lastModified.high >>> 0, false).toBigInt();
                else if (typeof message.lastModified === "number")
                    object.lastModified = options.longs === String ? String(message.lastModified) : message.lastModified;
                else
                    object.lastModified = options.longs === String ? $util.Long.prototype.toString.call(message.lastModified) : options.longs === Number ? new $util.LongBits(message.lastModified.low >>> 0, message.lastModified.high >>> 0).toNumber() : message.lastModified;
            if (message.children && message.children.length) {
                object.children = [];
                for (let j = 0; j < message.children.length; ++j)
                    object.children[j] = $root.PAM.PAMElement.toObject(message.children[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMElement to JSON.
         * @function toJSON
         * @memberof PAM.PAMElement
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMElement.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMElement
         * @function getTypeUrl
         * @memberof PAM.PAMElement
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMElement.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMElement";
        };

        return PAMElement;
    })();

    PAM.PAMGenericUidRequest = (function() {

        /**
         * Properties of a PAMGenericUidRequest.
         * @memberof PAM
         * @interface IPAMGenericUidRequest
         * @property {Uint8Array|null} [uid] PAMGenericUidRequest uid
         */

        /**
         * Constructs a new PAMGenericUidRequest.
         * @memberof PAM
         * @classdesc Represents a PAMGenericUidRequest.
         * @implements IPAMGenericUidRequest
         * @constructor
         * @param {PAM.IPAMGenericUidRequest=} [properties] Properties to set
         */
        function PAMGenericUidRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMGenericUidRequest uid.
         * @member {Uint8Array} uid
         * @memberof PAM.PAMGenericUidRequest
         * @instance
         */
        PAMGenericUidRequest.prototype.uid = $util.newBuffer([]);

        /**
         * Creates a new PAMGenericUidRequest instance using the specified properties.
         * @function create
         * @memberof PAM.PAMGenericUidRequest
         * @static
         * @param {PAM.IPAMGenericUidRequest=} [properties] Properties to set
         * @returns {PAM.PAMGenericUidRequest} PAMGenericUidRequest instance
         */
        PAMGenericUidRequest.create = function create(properties) {
            return new PAMGenericUidRequest(properties);
        };

        /**
         * Encodes the specified PAMGenericUidRequest message. Does not implicitly {@link PAM.PAMGenericUidRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMGenericUidRequest
         * @static
         * @param {PAM.IPAMGenericUidRequest} message PAMGenericUidRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMGenericUidRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.uid);
            return writer;
        };

        /**
         * Decodes a PAMGenericUidRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMGenericUidRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMGenericUidRequest} PAMGenericUidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMGenericUidRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMGenericUidRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.uid = reader.bytes();
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
         * Creates a PAMGenericUidRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMGenericUidRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMGenericUidRequest} PAMGenericUidRequest
         */
        PAMGenericUidRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMGenericUidRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMGenericUidRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMGenericUidRequest();
            if (object.uid != null)
                if (typeof object.uid === "string")
                    $util.base64.decode(object.uid, message.uid = $util.newBuffer($util.base64.length(object.uid)), 0);
                else if (object.uid.length >= 0)
                    message.uid = object.uid;
            return message;
        };

        /**
         * Creates a plain object from a PAMGenericUidRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMGenericUidRequest
         * @static
         * @param {PAM.PAMGenericUidRequest} message PAMGenericUidRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMGenericUidRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.uid = "";
                else {
                    object.uid = [];
                    if (options.bytes !== Array)
                        object.uid = $util.newBuffer(object.uid);
                }
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                object.uid = options.bytes === String ? $util.base64.encode(message.uid, 0, message.uid.length) : options.bytes === Array ? Array.prototype.slice.call(message.uid) : message.uid;
            return object;
        };

        /**
         * Converts this PAMGenericUidRequest to JSON.
         * @function toJSON
         * @memberof PAM.PAMGenericUidRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMGenericUidRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMGenericUidRequest
         * @function getTypeUrl
         * @memberof PAM.PAMGenericUidRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMGenericUidRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMGenericUidRequest";
        };

        return PAMGenericUidRequest;
    })();

    PAM.PAMGenericUidsRequest = (function() {

        /**
         * Properties of a PAMGenericUidsRequest.
         * @memberof PAM
         * @interface IPAMGenericUidsRequest
         * @property {Array.<Uint8Array>|null} [uids] PAMGenericUidsRequest uids
         */

        /**
         * Constructs a new PAMGenericUidsRequest.
         * @memberof PAM
         * @classdesc Represents a PAMGenericUidsRequest.
         * @implements IPAMGenericUidsRequest
         * @constructor
         * @param {PAM.IPAMGenericUidsRequest=} [properties] Properties to set
         */
        function PAMGenericUidsRequest(properties) {
            this.uids = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMGenericUidsRequest uids.
         * @member {Array.<Uint8Array>} uids
         * @memberof PAM.PAMGenericUidsRequest
         * @instance
         */
        PAMGenericUidsRequest.prototype.uids = $util.emptyArray;

        /**
         * Creates a new PAMGenericUidsRequest instance using the specified properties.
         * @function create
         * @memberof PAM.PAMGenericUidsRequest
         * @static
         * @param {PAM.IPAMGenericUidsRequest=} [properties] Properties to set
         * @returns {PAM.PAMGenericUidsRequest} PAMGenericUidsRequest instance
         */
        PAMGenericUidsRequest.create = function create(properties) {
            return new PAMGenericUidsRequest(properties);
        };

        /**
         * Encodes the specified PAMGenericUidsRequest message. Does not implicitly {@link PAM.PAMGenericUidsRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMGenericUidsRequest
         * @static
         * @param {PAM.IPAMGenericUidsRequest} message PAMGenericUidsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMGenericUidsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.uids != null && message.uids.length)
                for (let i = 0; i < message.uids.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.uids[i]);
            return writer;
        };

        /**
         * Decodes a PAMGenericUidsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMGenericUidsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMGenericUidsRequest} PAMGenericUidsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMGenericUidsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMGenericUidsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.uids && message.uids.length))
                            message.uids = [];
                        message.uids.push(reader.bytes());
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
         * Creates a PAMGenericUidsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMGenericUidsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMGenericUidsRequest} PAMGenericUidsRequest
         */
        PAMGenericUidsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMGenericUidsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMGenericUidsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMGenericUidsRequest();
            if (object.uids) {
                if (!Array.isArray(object.uids))
                    throw TypeError(".PAM.PAMGenericUidsRequest.uids: array expected");
                message.uids = [];
                for (let i = 0; i < object.uids.length; ++i)
                    if (typeof object.uids[i] === "string")
                        $util.base64.decode(object.uids[i], message.uids[i] = $util.newBuffer($util.base64.length(object.uids[i])), 0);
                    else if (object.uids[i].length >= 0)
                        message.uids[i] = object.uids[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMGenericUidsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMGenericUidsRequest
         * @static
         * @param {PAM.PAMGenericUidsRequest} message PAMGenericUidsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMGenericUidsRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.uids = [];
            if (message.uids && message.uids.length) {
                object.uids = [];
                for (let j = 0; j < message.uids.length; ++j)
                    object.uids[j] = options.bytes === String ? $util.base64.encode(message.uids[j], 0, message.uids[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.uids[j]) : message.uids[j];
            }
            return object;
        };

        /**
         * Converts this PAMGenericUidsRequest to JSON.
         * @function toJSON
         * @memberof PAM.PAMGenericUidsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMGenericUidsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMGenericUidsRequest
         * @function getTypeUrl
         * @memberof PAM.PAMGenericUidsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMGenericUidsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMGenericUidsRequest";
        };

        return PAMGenericUidsRequest;
    })();

    PAM.PAMConfiguration = (function() {

        /**
         * Properties of a PAMConfiguration.
         * @memberof PAM
         * @interface IPAMConfiguration
         * @property {Uint8Array|null} [configurationUid] PAMConfiguration configurationUid
         * @property {number|null} [nodeId] PAMConfiguration nodeId
         * @property {Uint8Array|null} [controllerUid] PAMConfiguration controllerUid
         * @property {Uint8Array|null} [data] PAMConfiguration data
         * @property {number|null} [created] PAMConfiguration created
         * @property {number|null} [lastModified] PAMConfiguration lastModified
         * @property {Array.<PAM.IPAMElement>|null} [children] PAMConfiguration children
         */

        /**
         * Constructs a new PAMConfiguration.
         * @memberof PAM
         * @classdesc Represents a PAMConfiguration.
         * @implements IPAMConfiguration
         * @constructor
         * @param {PAM.IPAMConfiguration=} [properties] Properties to set
         */
        function PAMConfiguration(properties) {
            this.children = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMConfiguration configurationUid.
         * @member {Uint8Array} configurationUid
         * @memberof PAM.PAMConfiguration
         * @instance
         */
        PAMConfiguration.prototype.configurationUid = $util.newBuffer([]);

        /**
         * PAMConfiguration nodeId.
         * @member {number} nodeId
         * @memberof PAM.PAMConfiguration
         * @instance
         */
        PAMConfiguration.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMConfiguration controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof PAM.PAMConfiguration
         * @instance
         */
        PAMConfiguration.prototype.controllerUid = $util.newBuffer([]);

        /**
         * PAMConfiguration data.
         * @member {Uint8Array} data
         * @memberof PAM.PAMConfiguration
         * @instance
         */
        PAMConfiguration.prototype.data = $util.newBuffer([]);

        /**
         * PAMConfiguration created.
         * @member {number} created
         * @memberof PAM.PAMConfiguration
         * @instance
         */
        PAMConfiguration.prototype.created = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMConfiguration lastModified.
         * @member {number} lastModified
         * @memberof PAM.PAMConfiguration
         * @instance
         */
        PAMConfiguration.prototype.lastModified = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMConfiguration children.
         * @member {Array.<PAM.IPAMElement>} children
         * @memberof PAM.PAMConfiguration
         * @instance
         */
        PAMConfiguration.prototype.children = $util.emptyArray;

        /**
         * Creates a new PAMConfiguration instance using the specified properties.
         * @function create
         * @memberof PAM.PAMConfiguration
         * @static
         * @param {PAM.IPAMConfiguration=} [properties] Properties to set
         * @returns {PAM.PAMConfiguration} PAMConfiguration instance
         */
        PAMConfiguration.create = function create(properties) {
            return new PAMConfiguration(properties);
        };

        /**
         * Encodes the specified PAMConfiguration message. Does not implicitly {@link PAM.PAMConfiguration.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMConfiguration
         * @static
         * @param {PAM.IPAMConfiguration} message PAMConfiguration message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMConfiguration.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.configurationUid);
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.nodeId);
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.controllerUid);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.data);
            if (message.created != null && Object.hasOwnProperty.call(message, "created"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.created);
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.lastModified);
            if (message.children != null && message.children.length)
                for (let i = 0; i < message.children.length; ++i)
                    $root.PAM.PAMElement.encode(message.children[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMConfiguration message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMConfiguration
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMConfiguration} PAMConfiguration
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMConfiguration.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMConfiguration();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.configurationUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.nodeId = reader.int64();
                        break;
                    }
                case 3: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.data = reader.bytes();
                        break;
                    }
                case 5: {
                        message.created = reader.int64();
                        break;
                    }
                case 6: {
                        message.lastModified = reader.int64();
                        break;
                    }
                case 7: {
                        if (!(message.children && message.children.length))
                            message.children = [];
                        message.children.push($root.PAM.PAMElement.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMConfiguration message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMConfiguration
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMConfiguration} PAMConfiguration
         */
        PAMConfiguration.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMConfiguration)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMConfiguration: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMConfiguration();
            if (object.configurationUid != null)
                if (typeof object.configurationUid === "string")
                    $util.base64.decode(object.configurationUid, message.configurationUid = $util.newBuffer($util.base64.length(object.configurationUid)), 0);
                else if (object.configurationUid.length >= 0)
                    message.configurationUid = object.configurationUid;
            if (object.nodeId != null)
                if ($util.Long)
                    message.nodeId = $util.Long.fromValue(object.nodeId, false);
                else if (typeof object.nodeId === "string")
                    message.nodeId = parseInt(object.nodeId, 10);
                else if (typeof object.nodeId === "number")
                    message.nodeId = object.nodeId;
                else if (typeof object.nodeId === "object")
                    message.nodeId = new $util.LongBits(object.nodeId.low >>> 0, object.nodeId.high >>> 0).toNumber();
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            if (object.created != null)
                if ($util.Long)
                    message.created = $util.Long.fromValue(object.created, false);
                else if (typeof object.created === "string")
                    message.created = parseInt(object.created, 10);
                else if (typeof object.created === "number")
                    message.created = object.created;
                else if (typeof object.created === "object")
                    message.created = new $util.LongBits(object.created.low >>> 0, object.created.high >>> 0).toNumber();
            if (object.lastModified != null)
                if ($util.Long)
                    message.lastModified = $util.Long.fromValue(object.lastModified, false);
                else if (typeof object.lastModified === "string")
                    message.lastModified = parseInt(object.lastModified, 10);
                else if (typeof object.lastModified === "number")
                    message.lastModified = object.lastModified;
                else if (typeof object.lastModified === "object")
                    message.lastModified = new $util.LongBits(object.lastModified.low >>> 0, object.lastModified.high >>> 0).toNumber();
            if (object.children) {
                if (!Array.isArray(object.children))
                    throw TypeError(".PAM.PAMConfiguration.children: array expected");
                message.children = [];
                for (let i = 0; i < object.children.length; ++i) {
                    if (!$util.isObject(object.children[i]))
                        throw TypeError(".PAM.PAMConfiguration.children: object expected");
                    message.children[i] = $root.PAM.PAMElement.fromObject(object.children[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMConfiguration message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMConfiguration
         * @static
         * @param {PAM.PAMConfiguration} message PAMConfiguration
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMConfiguration.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.children = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.configurationUid = "";
                else {
                    object.configurationUid = [];
                    if (options.bytes !== Array)
                        object.configurationUid = $util.newBuffer(object.configurationUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.nodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.nodeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.created = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.created = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.lastModified = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.lastModified = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                object.configurationUid = options.bytes === String ? $util.base64.encode(message.configurationUid, 0, message.configurationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.configurationUid) : message.configurationUid;
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nodeId = typeof message.nodeId === "number" ? BigInt(message.nodeId) : $util.Long.fromBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0, false).toBigInt();
                else if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber() : message.nodeId;
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.created != null && Object.hasOwnProperty.call(message, "created"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.created = typeof message.created === "number" ? BigInt(message.created) : $util.Long.fromBits(message.created.low >>> 0, message.created.high >>> 0, false).toBigInt();
                else if (typeof message.created === "number")
                    object.created = options.longs === String ? String(message.created) : message.created;
                else
                    object.created = options.longs === String ? $util.Long.prototype.toString.call(message.created) : options.longs === Number ? new $util.LongBits(message.created.low >>> 0, message.created.high >>> 0).toNumber() : message.created;
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.lastModified = typeof message.lastModified === "number" ? BigInt(message.lastModified) : $util.Long.fromBits(message.lastModified.low >>> 0, message.lastModified.high >>> 0, false).toBigInt();
                else if (typeof message.lastModified === "number")
                    object.lastModified = options.longs === String ? String(message.lastModified) : message.lastModified;
                else
                    object.lastModified = options.longs === String ? $util.Long.prototype.toString.call(message.lastModified) : options.longs === Number ? new $util.LongBits(message.lastModified.low >>> 0, message.lastModified.high >>> 0).toNumber() : message.lastModified;
            if (message.children && message.children.length) {
                object.children = [];
                for (let j = 0; j < message.children.length; ++j)
                    object.children[j] = $root.PAM.PAMElement.toObject(message.children[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMConfiguration to JSON.
         * @function toJSON
         * @memberof PAM.PAMConfiguration
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMConfiguration.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMConfiguration
         * @function getTypeUrl
         * @memberof PAM.PAMConfiguration
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMConfiguration.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMConfiguration";
        };

        return PAMConfiguration;
    })();

    PAM.PAMConfigurations = (function() {

        /**
         * Properties of a PAMConfigurations.
         * @memberof PAM
         * @interface IPAMConfigurations
         * @property {Array.<PAM.IPAMConfiguration>|null} [configurations] PAMConfigurations configurations
         */

        /**
         * Constructs a new PAMConfigurations.
         * @memberof PAM
         * @classdesc Represents a PAMConfigurations.
         * @implements IPAMConfigurations
         * @constructor
         * @param {PAM.IPAMConfigurations=} [properties] Properties to set
         */
        function PAMConfigurations(properties) {
            this.configurations = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMConfigurations configurations.
         * @member {Array.<PAM.IPAMConfiguration>} configurations
         * @memberof PAM.PAMConfigurations
         * @instance
         */
        PAMConfigurations.prototype.configurations = $util.emptyArray;

        /**
         * Creates a new PAMConfigurations instance using the specified properties.
         * @function create
         * @memberof PAM.PAMConfigurations
         * @static
         * @param {PAM.IPAMConfigurations=} [properties] Properties to set
         * @returns {PAM.PAMConfigurations} PAMConfigurations instance
         */
        PAMConfigurations.create = function create(properties) {
            return new PAMConfigurations(properties);
        };

        /**
         * Encodes the specified PAMConfigurations message. Does not implicitly {@link PAM.PAMConfigurations.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMConfigurations
         * @static
         * @param {PAM.IPAMConfigurations} message PAMConfigurations message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMConfigurations.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.configurations != null && message.configurations.length)
                for (let i = 0; i < message.configurations.length; ++i)
                    $root.PAM.PAMConfiguration.encode(message.configurations[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMConfigurations message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMConfigurations
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMConfigurations} PAMConfigurations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMConfigurations.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMConfigurations();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.configurations && message.configurations.length))
                            message.configurations = [];
                        message.configurations.push($root.PAM.PAMConfiguration.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMConfigurations message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMConfigurations
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMConfigurations} PAMConfigurations
         */
        PAMConfigurations.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMConfigurations)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMConfigurations: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMConfigurations();
            if (object.configurations) {
                if (!Array.isArray(object.configurations))
                    throw TypeError(".PAM.PAMConfigurations.configurations: array expected");
                message.configurations = [];
                for (let i = 0; i < object.configurations.length; ++i) {
                    if (!$util.isObject(object.configurations[i]))
                        throw TypeError(".PAM.PAMConfigurations.configurations: object expected");
                    message.configurations[i] = $root.PAM.PAMConfiguration.fromObject(object.configurations[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMConfigurations message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMConfigurations
         * @static
         * @param {PAM.PAMConfigurations} message PAMConfigurations
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMConfigurations.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.configurations = [];
            if (message.configurations && message.configurations.length) {
                object.configurations = [];
                for (let j = 0; j < message.configurations.length; ++j)
                    object.configurations[j] = $root.PAM.PAMConfiguration.toObject(message.configurations[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMConfigurations to JSON.
         * @function toJSON
         * @memberof PAM.PAMConfigurations
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMConfigurations.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMConfigurations
         * @function getTypeUrl
         * @memberof PAM.PAMConfigurations
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMConfigurations.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMConfigurations";
        };

        return PAMConfigurations;
    })();

    PAM.PAMController = (function() {

        /**
         * Properties of a PAMController.
         * @memberof PAM
         * @interface IPAMController
         * @property {Uint8Array|null} [controllerUid] PAMController controllerUid
         * @property {string|null} [controllerName] PAMController controllerName
         * @property {string|null} [deviceToken] PAMController deviceToken
         * @property {string|null} [deviceName] PAMController deviceName
         * @property {number|null} [nodeId] PAMController nodeId
         * @property {number|null} [created] PAMController created
         * @property {number|null} [lastModified] PAMController lastModified
         * @property {Uint8Array|null} [applicationUid] PAMController applicationUid
         * @property {Enterprise.AppClientType|null} [appClientType] PAMController appClientType
         * @property {boolean|null} [isInitialized] PAMController isInitialized
         */

        /**
         * Constructs a new PAMController.
         * @memberof PAM
         * @classdesc Represents a PAMController.
         * @implements IPAMController
         * @constructor
         * @param {PAM.IPAMController=} [properties] Properties to set
         */
        function PAMController(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMController controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof PAM.PAMController
         * @instance
         */
        PAMController.prototype.controllerUid = $util.newBuffer([]);

        /**
         * PAMController controllerName.
         * @member {string} controllerName
         * @memberof PAM.PAMController
         * @instance
         */
        PAMController.prototype.controllerName = "";

        /**
         * PAMController deviceToken.
         * @member {string} deviceToken
         * @memberof PAM.PAMController
         * @instance
         */
        PAMController.prototype.deviceToken = "";

        /**
         * PAMController deviceName.
         * @member {string} deviceName
         * @memberof PAM.PAMController
         * @instance
         */
        PAMController.prototype.deviceName = "";

        /**
         * PAMController nodeId.
         * @member {number} nodeId
         * @memberof PAM.PAMController
         * @instance
         */
        PAMController.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMController created.
         * @member {number} created
         * @memberof PAM.PAMController
         * @instance
         */
        PAMController.prototype.created = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMController lastModified.
         * @member {number} lastModified
         * @memberof PAM.PAMController
         * @instance
         */
        PAMController.prototype.lastModified = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMController applicationUid.
         * @member {Uint8Array} applicationUid
         * @memberof PAM.PAMController
         * @instance
         */
        PAMController.prototype.applicationUid = $util.newBuffer([]);

        /**
         * PAMController appClientType.
         * @member {Enterprise.AppClientType} appClientType
         * @memberof PAM.PAMController
         * @instance
         */
        PAMController.prototype.appClientType = 0;

        /**
         * PAMController isInitialized.
         * @member {boolean} isInitialized
         * @memberof PAM.PAMController
         * @instance
         */
        PAMController.prototype.isInitialized = false;

        /**
         * Creates a new PAMController instance using the specified properties.
         * @function create
         * @memberof PAM.PAMController
         * @static
         * @param {PAM.IPAMController=} [properties] Properties to set
         * @returns {PAM.PAMController} PAMController instance
         */
        PAMController.create = function create(properties) {
            return new PAMController(properties);
        };

        /**
         * Encodes the specified PAMController message. Does not implicitly {@link PAM.PAMController.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMController
         * @static
         * @param {PAM.IPAMController} message PAMController message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMController.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.controllerUid);
            if (message.controllerName != null && Object.hasOwnProperty.call(message, "controllerName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.controllerName);
            if (message.deviceToken != null && Object.hasOwnProperty.call(message, "deviceToken"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.deviceToken);
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.deviceName);
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.nodeId);
            if (message.created != null && Object.hasOwnProperty.call(message, "created"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.created);
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.lastModified);
            if (message.applicationUid != null && Object.hasOwnProperty.call(message, "applicationUid"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.applicationUid);
            if (message.appClientType != null && Object.hasOwnProperty.call(message, "appClientType"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.appClientType);
            if (message.isInitialized != null && Object.hasOwnProperty.call(message, "isInitialized"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.isInitialized);
            return writer;
        };

        /**
         * Decodes a PAMController message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMController
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMController} PAMController
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMController.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMController();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.controllerName = reader.string();
                        break;
                    }
                case 3: {
                        message.deviceToken = reader.string();
                        break;
                    }
                case 4: {
                        message.deviceName = reader.string();
                        break;
                    }
                case 5: {
                        message.nodeId = reader.int64();
                        break;
                    }
                case 6: {
                        message.created = reader.int64();
                        break;
                    }
                case 7: {
                        message.lastModified = reader.int64();
                        break;
                    }
                case 8: {
                        message.applicationUid = reader.bytes();
                        break;
                    }
                case 9: {
                        message.appClientType = reader.int32();
                        break;
                    }
                case 10: {
                        message.isInitialized = reader.bool();
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
         * Creates a PAMController message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMController
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMController} PAMController
         */
        PAMController.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMController)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMController: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMController();
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            if (object.controllerName != null)
                message.controllerName = String(object.controllerName);
            if (object.deviceToken != null)
                message.deviceToken = String(object.deviceToken);
            if (object.deviceName != null)
                message.deviceName = String(object.deviceName);
            if (object.nodeId != null)
                if ($util.Long)
                    message.nodeId = $util.Long.fromValue(object.nodeId, false);
                else if (typeof object.nodeId === "string")
                    message.nodeId = parseInt(object.nodeId, 10);
                else if (typeof object.nodeId === "number")
                    message.nodeId = object.nodeId;
                else if (typeof object.nodeId === "object")
                    message.nodeId = new $util.LongBits(object.nodeId.low >>> 0, object.nodeId.high >>> 0).toNumber();
            if (object.created != null)
                if ($util.Long)
                    message.created = $util.Long.fromValue(object.created, false);
                else if (typeof object.created === "string")
                    message.created = parseInt(object.created, 10);
                else if (typeof object.created === "number")
                    message.created = object.created;
                else if (typeof object.created === "object")
                    message.created = new $util.LongBits(object.created.low >>> 0, object.created.high >>> 0).toNumber();
            if (object.lastModified != null)
                if ($util.Long)
                    message.lastModified = $util.Long.fromValue(object.lastModified, false);
                else if (typeof object.lastModified === "string")
                    message.lastModified = parseInt(object.lastModified, 10);
                else if (typeof object.lastModified === "number")
                    message.lastModified = object.lastModified;
                else if (typeof object.lastModified === "object")
                    message.lastModified = new $util.LongBits(object.lastModified.low >>> 0, object.lastModified.high >>> 0).toNumber();
            if (object.applicationUid != null)
                if (typeof object.applicationUid === "string")
                    $util.base64.decode(object.applicationUid, message.applicationUid = $util.newBuffer($util.base64.length(object.applicationUid)), 0);
                else if (object.applicationUid.length >= 0)
                    message.applicationUid = object.applicationUid;
            switch (object.appClientType) {
            default:
                if (typeof object.appClientType === "number") {
                    message.appClientType = object.appClientType;
                    break;
                }
                break;
            case "NOT_USED":
            case 0:
                message.appClientType = 0;
                break;
            case "GENERAL":
            case 1:
                message.appClientType = 1;
                break;
            case "DISCOVERY_AND_ROTATION_CONTROLLER":
            case 2:
                message.appClientType = 2;
                break;
            case "KCM_CONTROLLER":
            case 3:
                message.appClientType = 3;
                break;
            case "SELF_DESTRUCT":
            case 4:
                message.appClientType = 4;
                break;
            }
            if (object.isInitialized != null)
                message.isInitialized = Boolean(object.isInitialized);
            return message;
        };

        /**
         * Creates a plain object from a PAMController message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMController
         * @static
         * @param {PAM.PAMController} message PAMController
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMController.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
                object.controllerName = "";
                object.deviceToken = "";
                object.deviceName = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.nodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.nodeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.created = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.created = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.lastModified = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.lastModified = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.applicationUid = "";
                else {
                    object.applicationUid = [];
                    if (options.bytes !== Array)
                        object.applicationUid = $util.newBuffer(object.applicationUid);
                }
                object.appClientType = options.enums === String ? "NOT_USED" : 0;
                object.isInitialized = false;
            }
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.controllerName != null && Object.hasOwnProperty.call(message, "controllerName"))
                object.controllerName = message.controllerName;
            if (message.deviceToken != null && Object.hasOwnProperty.call(message, "deviceToken"))
                object.deviceToken = message.deviceToken;
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                object.deviceName = message.deviceName;
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nodeId = typeof message.nodeId === "number" ? BigInt(message.nodeId) : $util.Long.fromBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0, false).toBigInt();
                else if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber() : message.nodeId;
            if (message.created != null && Object.hasOwnProperty.call(message, "created"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.created = typeof message.created === "number" ? BigInt(message.created) : $util.Long.fromBits(message.created.low >>> 0, message.created.high >>> 0, false).toBigInt();
                else if (typeof message.created === "number")
                    object.created = options.longs === String ? String(message.created) : message.created;
                else
                    object.created = options.longs === String ? $util.Long.prototype.toString.call(message.created) : options.longs === Number ? new $util.LongBits(message.created.low >>> 0, message.created.high >>> 0).toNumber() : message.created;
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.lastModified = typeof message.lastModified === "number" ? BigInt(message.lastModified) : $util.Long.fromBits(message.lastModified.low >>> 0, message.lastModified.high >>> 0, false).toBigInt();
                else if (typeof message.lastModified === "number")
                    object.lastModified = options.longs === String ? String(message.lastModified) : message.lastModified;
                else
                    object.lastModified = options.longs === String ? $util.Long.prototype.toString.call(message.lastModified) : options.longs === Number ? new $util.LongBits(message.lastModified.low >>> 0, message.lastModified.high >>> 0).toNumber() : message.lastModified;
            if (message.applicationUid != null && Object.hasOwnProperty.call(message, "applicationUid"))
                object.applicationUid = options.bytes === String ? $util.base64.encode(message.applicationUid, 0, message.applicationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.applicationUid) : message.applicationUid;
            if (message.appClientType != null && Object.hasOwnProperty.call(message, "appClientType"))
                object.appClientType = options.enums === String ? $root.Enterprise.AppClientType[message.appClientType] === undefined ? message.appClientType : $root.Enterprise.AppClientType[message.appClientType] : message.appClientType;
            if (message.isInitialized != null && Object.hasOwnProperty.call(message, "isInitialized"))
                object.isInitialized = message.isInitialized;
            return object;
        };

        /**
         * Converts this PAMController to JSON.
         * @function toJSON
         * @memberof PAM.PAMController
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMController.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMController
         * @function getTypeUrl
         * @memberof PAM.PAMController
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMController.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMController";
        };

        return PAMController;
    })();

    PAM.PAMSetMaxInstanceCountRequest = (function() {

        /**
         * Properties of a PAMSetMaxInstanceCountRequest.
         * @memberof PAM
         * @interface IPAMSetMaxInstanceCountRequest
         * @property {Uint8Array|null} [controllerUid] PAMSetMaxInstanceCountRequest controllerUid
         * @property {number|null} [maxInstanceCount] PAMSetMaxInstanceCountRequest maxInstanceCount
         */

        /**
         * Constructs a new PAMSetMaxInstanceCountRequest.
         * @memberof PAM
         * @classdesc Represents a PAMSetMaxInstanceCountRequest.
         * @implements IPAMSetMaxInstanceCountRequest
         * @constructor
         * @param {PAM.IPAMSetMaxInstanceCountRequest=} [properties] Properties to set
         */
        function PAMSetMaxInstanceCountRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMSetMaxInstanceCountRequest controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof PAM.PAMSetMaxInstanceCountRequest
         * @instance
         */
        PAMSetMaxInstanceCountRequest.prototype.controllerUid = $util.newBuffer([]);

        /**
         * PAMSetMaxInstanceCountRequest maxInstanceCount.
         * @member {number} maxInstanceCount
         * @memberof PAM.PAMSetMaxInstanceCountRequest
         * @instance
         */
        PAMSetMaxInstanceCountRequest.prototype.maxInstanceCount = 0;

        /**
         * Creates a new PAMSetMaxInstanceCountRequest instance using the specified properties.
         * @function create
         * @memberof PAM.PAMSetMaxInstanceCountRequest
         * @static
         * @param {PAM.IPAMSetMaxInstanceCountRequest=} [properties] Properties to set
         * @returns {PAM.PAMSetMaxInstanceCountRequest} PAMSetMaxInstanceCountRequest instance
         */
        PAMSetMaxInstanceCountRequest.create = function create(properties) {
            return new PAMSetMaxInstanceCountRequest(properties);
        };

        /**
         * Encodes the specified PAMSetMaxInstanceCountRequest message. Does not implicitly {@link PAM.PAMSetMaxInstanceCountRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMSetMaxInstanceCountRequest
         * @static
         * @param {PAM.IPAMSetMaxInstanceCountRequest} message PAMSetMaxInstanceCountRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMSetMaxInstanceCountRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.controllerUid);
            if (message.maxInstanceCount != null && Object.hasOwnProperty.call(message, "maxInstanceCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.maxInstanceCount);
            return writer;
        };

        /**
         * Decodes a PAMSetMaxInstanceCountRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMSetMaxInstanceCountRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMSetMaxInstanceCountRequest} PAMSetMaxInstanceCountRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMSetMaxInstanceCountRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMSetMaxInstanceCountRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.maxInstanceCount = reader.int32();
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
         * Creates a PAMSetMaxInstanceCountRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMSetMaxInstanceCountRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMSetMaxInstanceCountRequest} PAMSetMaxInstanceCountRequest
         */
        PAMSetMaxInstanceCountRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMSetMaxInstanceCountRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMSetMaxInstanceCountRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMSetMaxInstanceCountRequest();
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            if (object.maxInstanceCount != null)
                message.maxInstanceCount = object.maxInstanceCount | 0;
            return message;
        };

        /**
         * Creates a plain object from a PAMSetMaxInstanceCountRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMSetMaxInstanceCountRequest
         * @static
         * @param {PAM.PAMSetMaxInstanceCountRequest} message PAMSetMaxInstanceCountRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMSetMaxInstanceCountRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
                object.maxInstanceCount = 0;
            }
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.maxInstanceCount != null && Object.hasOwnProperty.call(message, "maxInstanceCount"))
                object.maxInstanceCount = message.maxInstanceCount;
            return object;
        };

        /**
         * Converts this PAMSetMaxInstanceCountRequest to JSON.
         * @function toJSON
         * @memberof PAM.PAMSetMaxInstanceCountRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMSetMaxInstanceCountRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMSetMaxInstanceCountRequest
         * @function getTypeUrl
         * @memberof PAM.PAMSetMaxInstanceCountRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMSetMaxInstanceCountRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMSetMaxInstanceCountRequest";
        };

        return PAMSetMaxInstanceCountRequest;
    })();

    /**
     * ControllerMessageType enum.
     * @name PAM.ControllerMessageType
     * @enum {number}
     * @property {number} CMT_GENERAL=0 CMT_GENERAL value
     * @property {number} CMT_ROTATE=1 CMT_ROTATE value
     * @property {number} CMT_DISCOVERY=2 CMT_DISCOVERY value
     * @property {number} CMT_CONNECT=3 CMT_CONNECT value
     * @property {number} CMT_ANALYZE_RECORDING=4 CMT_ANALYZE_RECORDING value
     * @property {number} CMT_WORKFLOW_ACCESS_ELEVATION=5 CMT_WORKFLOW_ACCESS_ELEVATION value
     * @property {number} CMT_USS=6 CMT_USS value
     * @property {number} CMT_INFO=7 CMT_INFO value
     * @property {number} CMT_AUTOMATION=8 CMT_AUTOMATION value
     */
    PAM.ControllerMessageType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CMT_GENERAL"] = 0;
        values[valuesById[1] = "CMT_ROTATE"] = 1;
        values[valuesById[2] = "CMT_DISCOVERY"] = 2;
        values[valuesById[3] = "CMT_CONNECT"] = 3;
        values[valuesById[4] = "CMT_ANALYZE_RECORDING"] = 4;
        values[valuesById[5] = "CMT_WORKFLOW_ACCESS_ELEVATION"] = 5;
        values[valuesById[6] = "CMT_USS"] = 6;
        values[valuesById[7] = "CMT_INFO"] = 7;
        values[valuesById[8] = "CMT_AUTOMATION"] = 8;
        return values;
    })();

    PAM.ControllerResponse = (function() {

        /**
         * Properties of a ControllerResponse.
         * @memberof PAM
         * @interface IControllerResponse
         * @property {string|null} [payload] ControllerResponse payload
         */

        /**
         * Constructs a new ControllerResponse.
         * @memberof PAM
         * @classdesc Represents a ControllerResponse.
         * @implements IControllerResponse
         * @constructor
         * @param {PAM.IControllerResponse=} [properties] Properties to set
         */
        function ControllerResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ControllerResponse payload.
         * @member {string} payload
         * @memberof PAM.ControllerResponse
         * @instance
         */
        ControllerResponse.prototype.payload = "";

        /**
         * Creates a new ControllerResponse instance using the specified properties.
         * @function create
         * @memberof PAM.ControllerResponse
         * @static
         * @param {PAM.IControllerResponse=} [properties] Properties to set
         * @returns {PAM.ControllerResponse} ControllerResponse instance
         */
        ControllerResponse.create = function create(properties) {
            return new ControllerResponse(properties);
        };

        /**
         * Encodes the specified ControllerResponse message. Does not implicitly {@link PAM.ControllerResponse.verify|verify} messages.
         * @function encode
         * @memberof PAM.ControllerResponse
         * @static
         * @param {PAM.IControllerResponse} message ControllerResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ControllerResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.payload);
            return writer;
        };

        /**
         * Decodes a ControllerResponse message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.ControllerResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.ControllerResponse} ControllerResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ControllerResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.ControllerResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.payload = reader.string();
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
         * Creates a ControllerResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.ControllerResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.ControllerResponse} ControllerResponse
         */
        ControllerResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.ControllerResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.ControllerResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.ControllerResponse();
            if (object.payload != null)
                message.payload = String(object.payload);
            return message;
        };

        /**
         * Creates a plain object from a ControllerResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.ControllerResponse
         * @static
         * @param {PAM.ControllerResponse} message ControllerResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ControllerResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.payload = "";
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                object.payload = message.payload;
            return object;
        };

        /**
         * Converts this ControllerResponse to JSON.
         * @function toJSON
         * @memberof PAM.ControllerResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ControllerResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ControllerResponse
         * @function getTypeUrl
         * @memberof PAM.ControllerResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ControllerResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.ControllerResponse";
        };

        return ControllerResponse;
    })();

    PAM.PAMConfigurationController = (function() {

        /**
         * Properties of a PAMConfigurationController.
         * @memberof PAM
         * @interface IPAMConfigurationController
         * @property {Uint8Array|null} [configurationUid] PAMConfigurationController configurationUid
         * @property {Uint8Array|null} [controllerUid] PAMConfigurationController controllerUid
         */

        /**
         * Constructs a new PAMConfigurationController.
         * @memberof PAM
         * @classdesc Represents a PAMConfigurationController.
         * @implements IPAMConfigurationController
         * @constructor
         * @param {PAM.IPAMConfigurationController=} [properties] Properties to set
         */
        function PAMConfigurationController(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMConfigurationController configurationUid.
         * @member {Uint8Array} configurationUid
         * @memberof PAM.PAMConfigurationController
         * @instance
         */
        PAMConfigurationController.prototype.configurationUid = $util.newBuffer([]);

        /**
         * PAMConfigurationController controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof PAM.PAMConfigurationController
         * @instance
         */
        PAMConfigurationController.prototype.controllerUid = $util.newBuffer([]);

        /**
         * Creates a new PAMConfigurationController instance using the specified properties.
         * @function create
         * @memberof PAM.PAMConfigurationController
         * @static
         * @param {PAM.IPAMConfigurationController=} [properties] Properties to set
         * @returns {PAM.PAMConfigurationController} PAMConfigurationController instance
         */
        PAMConfigurationController.create = function create(properties) {
            return new PAMConfigurationController(properties);
        };

        /**
         * Encodes the specified PAMConfigurationController message. Does not implicitly {@link PAM.PAMConfigurationController.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMConfigurationController
         * @static
         * @param {PAM.IPAMConfigurationController} message PAMConfigurationController message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMConfigurationController.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.configurationUid);
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.controllerUid);
            return writer;
        };

        /**
         * Decodes a PAMConfigurationController message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMConfigurationController
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMConfigurationController} PAMConfigurationController
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMConfigurationController.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMConfigurationController();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.configurationUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.controllerUid = reader.bytes();
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
         * Creates a PAMConfigurationController message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMConfigurationController
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMConfigurationController} PAMConfigurationController
         */
        PAMConfigurationController.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMConfigurationController)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMConfigurationController: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMConfigurationController();
            if (object.configurationUid != null)
                if (typeof object.configurationUid === "string")
                    $util.base64.decode(object.configurationUid, message.configurationUid = $util.newBuffer($util.base64.length(object.configurationUid)), 0);
                else if (object.configurationUid.length >= 0)
                    message.configurationUid = object.configurationUid;
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            return message;
        };

        /**
         * Creates a plain object from a PAMConfigurationController message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMConfigurationController
         * @static
         * @param {PAM.PAMConfigurationController} message PAMConfigurationController
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMConfigurationController.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.configurationUid = "";
                else {
                    object.configurationUid = [];
                    if (options.bytes !== Array)
                        object.configurationUid = $util.newBuffer(object.configurationUid);
                }
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
            }
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                object.configurationUid = options.bytes === String ? $util.base64.encode(message.configurationUid, 0, message.configurationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.configurationUid) : message.configurationUid;
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            return object;
        };

        /**
         * Converts this PAMConfigurationController to JSON.
         * @function toJSON
         * @memberof PAM.PAMConfigurationController
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMConfigurationController.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMConfigurationController
         * @function getTypeUrl
         * @memberof PAM.PAMConfigurationController
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMConfigurationController.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMConfigurationController";
        };

        return PAMConfigurationController;
    })();

    PAM.ConfigurationAddRequest = (function() {

        /**
         * Properties of a ConfigurationAddRequest.
         * @memberof PAM
         * @interface IConfigurationAddRequest
         * @property {Uint8Array|null} [configurationUid] ConfigurationAddRequest configurationUid
         * @property {Uint8Array|null} [recordKey] ConfigurationAddRequest recordKey
         * @property {Uint8Array|null} [data] ConfigurationAddRequest data
         * @property {Array.<Records.IRecordLink>|null} [recordLinks] ConfigurationAddRequest recordLinks
         * @property {Records.IRecordAudit|null} [audit] ConfigurationAddRequest audit
         */

        /**
         * Constructs a new ConfigurationAddRequest.
         * @memberof PAM
         * @classdesc Represents a ConfigurationAddRequest.
         * @implements IConfigurationAddRequest
         * @constructor
         * @param {PAM.IConfigurationAddRequest=} [properties] Properties to set
         */
        function ConfigurationAddRequest(properties) {
            this.recordLinks = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ConfigurationAddRequest configurationUid.
         * @member {Uint8Array} configurationUid
         * @memberof PAM.ConfigurationAddRequest
         * @instance
         */
        ConfigurationAddRequest.prototype.configurationUid = $util.newBuffer([]);

        /**
         * ConfigurationAddRequest recordKey.
         * @member {Uint8Array} recordKey
         * @memberof PAM.ConfigurationAddRequest
         * @instance
         */
        ConfigurationAddRequest.prototype.recordKey = $util.newBuffer([]);

        /**
         * ConfigurationAddRequest data.
         * @member {Uint8Array} data
         * @memberof PAM.ConfigurationAddRequest
         * @instance
         */
        ConfigurationAddRequest.prototype.data = $util.newBuffer([]);

        /**
         * ConfigurationAddRequest recordLinks.
         * @member {Array.<Records.IRecordLink>} recordLinks
         * @memberof PAM.ConfigurationAddRequest
         * @instance
         */
        ConfigurationAddRequest.prototype.recordLinks = $util.emptyArray;

        /**
         * ConfigurationAddRequest audit.
         * @member {Records.IRecordAudit|null|undefined} audit
         * @memberof PAM.ConfigurationAddRequest
         * @instance
         */
        ConfigurationAddRequest.prototype.audit = null;

        /**
         * Creates a new ConfigurationAddRequest instance using the specified properties.
         * @function create
         * @memberof PAM.ConfigurationAddRequest
         * @static
         * @param {PAM.IConfigurationAddRequest=} [properties] Properties to set
         * @returns {PAM.ConfigurationAddRequest} ConfigurationAddRequest instance
         */
        ConfigurationAddRequest.create = function create(properties) {
            return new ConfigurationAddRequest(properties);
        };

        /**
         * Encodes the specified ConfigurationAddRequest message. Does not implicitly {@link PAM.ConfigurationAddRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.ConfigurationAddRequest
         * @static
         * @param {PAM.IConfigurationAddRequest} message ConfigurationAddRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConfigurationAddRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.configurationUid);
            if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recordKey);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.data);
            if (message.recordLinks != null && message.recordLinks.length)
                for (let i = 0; i < message.recordLinks.length; ++i)
                    $root.Records.RecordLink.encode(message.recordLinks[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.audit != null && Object.hasOwnProperty.call(message, "audit"))
                $root.Records.RecordAudit.encode(message.audit, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a ConfigurationAddRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.ConfigurationAddRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.ConfigurationAddRequest} ConfigurationAddRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConfigurationAddRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.ConfigurationAddRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.configurationUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.recordKey = reader.bytes();
                        break;
                    }
                case 3: {
                        message.data = reader.bytes();
                        break;
                    }
                case 4: {
                        if (!(message.recordLinks && message.recordLinks.length))
                            message.recordLinks = [];
                        message.recordLinks.push($root.Records.RecordLink.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        message.audit = $root.Records.RecordAudit.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates a ConfigurationAddRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.ConfigurationAddRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.ConfigurationAddRequest} ConfigurationAddRequest
         */
        ConfigurationAddRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.ConfigurationAddRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.ConfigurationAddRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.ConfigurationAddRequest();
            if (object.configurationUid != null)
                if (typeof object.configurationUid === "string")
                    $util.base64.decode(object.configurationUid, message.configurationUid = $util.newBuffer($util.base64.length(object.configurationUid)), 0);
                else if (object.configurationUid.length >= 0)
                    message.configurationUid = object.configurationUid;
            if (object.recordKey != null)
                if (typeof object.recordKey === "string")
                    $util.base64.decode(object.recordKey, message.recordKey = $util.newBuffer($util.base64.length(object.recordKey)), 0);
                else if (object.recordKey.length >= 0)
                    message.recordKey = object.recordKey;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            if (object.recordLinks) {
                if (!Array.isArray(object.recordLinks))
                    throw TypeError(".PAM.ConfigurationAddRequest.recordLinks: array expected");
                message.recordLinks = [];
                for (let i = 0; i < object.recordLinks.length; ++i) {
                    if (!$util.isObject(object.recordLinks[i]))
                        throw TypeError(".PAM.ConfigurationAddRequest.recordLinks: object expected");
                    message.recordLinks[i] = $root.Records.RecordLink.fromObject(object.recordLinks[i], long + 1);
                }
            }
            if (object.audit != null) {
                if (!$util.isObject(object.audit))
                    throw TypeError(".PAM.ConfigurationAddRequest.audit: object expected");
                message.audit = $root.Records.RecordAudit.fromObject(object.audit, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a ConfigurationAddRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.ConfigurationAddRequest
         * @static
         * @param {PAM.ConfigurationAddRequest} message ConfigurationAddRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ConfigurationAddRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.recordLinks = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.configurationUid = "";
                else {
                    object.configurationUid = [];
                    if (options.bytes !== Array)
                        object.configurationUid = $util.newBuffer(object.configurationUid);
                }
                if (options.bytes === String)
                    object.recordKey = "";
                else {
                    object.recordKey = [];
                    if (options.bytes !== Array)
                        object.recordKey = $util.newBuffer(object.recordKey);
                }
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
                object.audit = null;
            }
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                object.configurationUid = options.bytes === String ? $util.base64.encode(message.configurationUid, 0, message.configurationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.configurationUid) : message.configurationUid;
            if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                object.recordKey = options.bytes === String ? $util.base64.encode(message.recordKey, 0, message.recordKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordKey) : message.recordKey;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            if (message.recordLinks && message.recordLinks.length) {
                object.recordLinks = [];
                for (let j = 0; j < message.recordLinks.length; ++j)
                    object.recordLinks[j] = $root.Records.RecordLink.toObject(message.recordLinks[j], options, q + 1);
            }
            if (message.audit != null && Object.hasOwnProperty.call(message, "audit"))
                object.audit = $root.Records.RecordAudit.toObject(message.audit, options, q + 1);
            return object;
        };

        /**
         * Converts this ConfigurationAddRequest to JSON.
         * @function toJSON
         * @memberof PAM.ConfigurationAddRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ConfigurationAddRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ConfigurationAddRequest
         * @function getTypeUrl
         * @memberof PAM.ConfigurationAddRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ConfigurationAddRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.ConfigurationAddRequest";
        };

        return ConfigurationAddRequest;
    })();

    PAM.RelayAccessCreds = (function() {

        /**
         * Properties of a RelayAccessCreds.
         * @memberof PAM
         * @interface IRelayAccessCreds
         * @property {string|null} [username] RelayAccessCreds username
         * @property {string|null} [password] RelayAccessCreds password
         * @property {number|null} [serverTime] RelayAccessCreds serverTime
         */

        /**
         * Constructs a new RelayAccessCreds.
         * @memberof PAM
         * @classdesc Represents a RelayAccessCreds.
         * @implements IRelayAccessCreds
         * @constructor
         * @param {PAM.IRelayAccessCreds=} [properties] Properties to set
         */
        function RelayAccessCreds(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RelayAccessCreds username.
         * @member {string} username
         * @memberof PAM.RelayAccessCreds
         * @instance
         */
        RelayAccessCreds.prototype.username = "";

        /**
         * RelayAccessCreds password.
         * @member {string} password
         * @memberof PAM.RelayAccessCreds
         * @instance
         */
        RelayAccessCreds.prototype.password = "";

        /**
         * RelayAccessCreds serverTime.
         * @member {number} serverTime
         * @memberof PAM.RelayAccessCreds
         * @instance
         */
        RelayAccessCreds.prototype.serverTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RelayAccessCreds instance using the specified properties.
         * @function create
         * @memberof PAM.RelayAccessCreds
         * @static
         * @param {PAM.IRelayAccessCreds=} [properties] Properties to set
         * @returns {PAM.RelayAccessCreds} RelayAccessCreds instance
         */
        RelayAccessCreds.create = function create(properties) {
            return new RelayAccessCreds(properties);
        };

        /**
         * Encodes the specified RelayAccessCreds message. Does not implicitly {@link PAM.RelayAccessCreds.verify|verify} messages.
         * @function encode
         * @memberof PAM.RelayAccessCreds
         * @static
         * @param {PAM.IRelayAccessCreds} message RelayAccessCreds message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RelayAccessCreds.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.password);
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.serverTime);
            return writer;
        };

        /**
         * Decodes a RelayAccessCreds message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.RelayAccessCreds
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.RelayAccessCreds} RelayAccessCreds
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RelayAccessCreds.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.RelayAccessCreds();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.username = reader.string();
                        break;
                    }
                case 2: {
                        message.password = reader.string();
                        break;
                    }
                case 3: {
                        message.serverTime = reader.int64();
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
         * Creates a RelayAccessCreds message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.RelayAccessCreds
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.RelayAccessCreds} RelayAccessCreds
         */
        RelayAccessCreds.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.RelayAccessCreds)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.RelayAccessCreds: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.RelayAccessCreds();
            if (object.username != null)
                message.username = String(object.username);
            if (object.password != null)
                message.password = String(object.password);
            if (object.serverTime != null)
                if ($util.Long)
                    message.serverTime = $util.Long.fromValue(object.serverTime, false);
                else if (typeof object.serverTime === "string")
                    message.serverTime = parseInt(object.serverTime, 10);
                else if (typeof object.serverTime === "number")
                    message.serverTime = object.serverTime;
                else if (typeof object.serverTime === "object")
                    message.serverTime = new $util.LongBits(object.serverTime.low >>> 0, object.serverTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RelayAccessCreds message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.RelayAccessCreds
         * @static
         * @param {PAM.RelayAccessCreds} message RelayAccessCreds
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RelayAccessCreds.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.username = "";
                object.password = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.serverTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.serverTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                object.password = message.password;
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.serverTime = typeof message.serverTime === "number" ? BigInt(message.serverTime) : $util.Long.fromBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0, false).toBigInt();
                else if (typeof message.serverTime === "number")
                    object.serverTime = options.longs === String ? String(message.serverTime) : message.serverTime;
                else
                    object.serverTime = options.longs === String ? $util.Long.prototype.toString.call(message.serverTime) : options.longs === Number ? new $util.LongBits(message.serverTime.low >>> 0, message.serverTime.high >>> 0).toNumber() : message.serverTime;
            return object;
        };

        /**
         * Converts this RelayAccessCreds to JSON.
         * @function toJSON
         * @memberof PAM.RelayAccessCreds
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RelayAccessCreds.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RelayAccessCreds
         * @function getTypeUrl
         * @memberof PAM.RelayAccessCreds
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RelayAccessCreds.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.RelayAccessCreds";
        };

        return RelayAccessCreds;
    })();

    /**
     * PAMRecordingType enum.
     * @name PAM.PAMRecordingType
     * @enum {number}
     * @property {number} PRT_SESSION=0 PRT_SESSION value
     * @property {number} PRT_TYPESCRIPT=1 PRT_TYPESCRIPT value
     * @property {number} PRT_TIME=2 PRT_TIME value
     * @property {number} PRT_SUMMARY=3 PRT_SUMMARY value
     */
    PAM.PAMRecordingType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "PRT_SESSION"] = 0;
        values[valuesById[1] = "PRT_TYPESCRIPT"] = 1;
        values[valuesById[2] = "PRT_TIME"] = 2;
        values[valuesById[3] = "PRT_SUMMARY"] = 3;
        return values;
    })();

    /**
     * PAMRecordingRiskLevel enum.
     * @name PAM.PAMRecordingRiskLevel
     * @enum {number}
     * @property {number} PRR_UNSPECIFIED=0 PRR_UNSPECIFIED value
     * @property {number} PRR_LOW=1 PRR_LOW value
     * @property {number} PRR_MEDIUM=2 PRR_MEDIUM value
     * @property {number} PRR_HIGH=3 PRR_HIGH value
     * @property {number} PRR_CRITICAL=4 PRR_CRITICAL value
     */
    PAM.PAMRecordingRiskLevel = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "PRR_UNSPECIFIED"] = 0;
        values[valuesById[1] = "PRR_LOW"] = 1;
        values[valuesById[2] = "PRR_MEDIUM"] = 2;
        values[valuesById[3] = "PRR_HIGH"] = 3;
        values[valuesById[4] = "PRR_CRITICAL"] = 4;
        return values;
    })();

    PAM.PAMRecordingsRequest = (function() {

        /**
         * Properties of a PAMRecordingsRequest.
         * @memberof PAM
         * @interface IPAMRecordingsRequest
         * @property {Uint8Array|null} [recordUid] PAMRecordingsRequest recordUid
         * @property {number|null} [maxCount] PAMRecordingsRequest maxCount
         * @property {number|null} [rangeStart] PAMRecordingsRequest rangeStart
         * @property {number|null} [rangeEnd] PAMRecordingsRequest rangeEnd
         * @property {Array.<PAM.PAMRecordingType>|null} [types] PAMRecordingsRequest types
         * @property {Array.<PAM.PAMRecordingRiskLevel>|null} [risks] PAMRecordingsRequest risks
         * @property {Array.<string>|null} [protocols] PAMRecordingsRequest protocols
         * @property {Array.<number>|null} [closeReasons] PAMRecordingsRequest closeReasons
         */

        /**
         * Constructs a new PAMRecordingsRequest.
         * @memberof PAM
         * @classdesc Represents a PAMRecordingsRequest.
         * @implements IPAMRecordingsRequest
         * @constructor
         * @param {PAM.IPAMRecordingsRequest=} [properties] Properties to set
         */
        function PAMRecordingsRequest(properties) {
            this.types = [];
            this.risks = [];
            this.protocols = [];
            this.closeReasons = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMRecordingsRequest recordUid.
         * @member {Uint8Array} recordUid
         * @memberof PAM.PAMRecordingsRequest
         * @instance
         */
        PAMRecordingsRequest.prototype.recordUid = $util.newBuffer([]);

        /**
         * PAMRecordingsRequest maxCount.
         * @member {number} maxCount
         * @memberof PAM.PAMRecordingsRequest
         * @instance
         */
        PAMRecordingsRequest.prototype.maxCount = 0;

        /**
         * PAMRecordingsRequest rangeStart.
         * @member {number|null|undefined} rangeStart
         * @memberof PAM.PAMRecordingsRequest
         * @instance
         */
        PAMRecordingsRequest.prototype.rangeStart = null;

        /**
         * PAMRecordingsRequest rangeEnd.
         * @member {number|null|undefined} rangeEnd
         * @memberof PAM.PAMRecordingsRequest
         * @instance
         */
        PAMRecordingsRequest.prototype.rangeEnd = null;

        /**
         * PAMRecordingsRequest types.
         * @member {Array.<PAM.PAMRecordingType>} types
         * @memberof PAM.PAMRecordingsRequest
         * @instance
         */
        PAMRecordingsRequest.prototype.types = $util.emptyArray;

        /**
         * PAMRecordingsRequest risks.
         * @member {Array.<PAM.PAMRecordingRiskLevel>} risks
         * @memberof PAM.PAMRecordingsRequest
         * @instance
         */
        PAMRecordingsRequest.prototype.risks = $util.emptyArray;

        /**
         * PAMRecordingsRequest protocols.
         * @member {Array.<string>} protocols
         * @memberof PAM.PAMRecordingsRequest
         * @instance
         */
        PAMRecordingsRequest.prototype.protocols = $util.emptyArray;

        /**
         * PAMRecordingsRequest closeReasons.
         * @member {Array.<number>} closeReasons
         * @memberof PAM.PAMRecordingsRequest
         * @instance
         */
        PAMRecordingsRequest.prototype.closeReasons = $util.emptyArray;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMRecordingsRequest.prototype, "_rangeStart", {
            get: $util.oneOfGetter($oneOfFields = ["rangeStart"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMRecordingsRequest.prototype, "_rangeEnd", {
            get: $util.oneOfGetter($oneOfFields = ["rangeEnd"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new PAMRecordingsRequest instance using the specified properties.
         * @function create
         * @memberof PAM.PAMRecordingsRequest
         * @static
         * @param {PAM.IPAMRecordingsRequest=} [properties] Properties to set
         * @returns {PAM.PAMRecordingsRequest} PAMRecordingsRequest instance
         */
        PAMRecordingsRequest.create = function create(properties) {
            return new PAMRecordingsRequest(properties);
        };

        /**
         * Encodes the specified PAMRecordingsRequest message. Does not implicitly {@link PAM.PAMRecordingsRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMRecordingsRequest
         * @static
         * @param {PAM.IPAMRecordingsRequest} message PAMRecordingsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMRecordingsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.maxCount != null && Object.hasOwnProperty.call(message, "maxCount"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.maxCount);
            if (message.rangeStart != null && Object.hasOwnProperty.call(message, "rangeStart"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.rangeStart);
            if (message.rangeEnd != null && Object.hasOwnProperty.call(message, "rangeEnd"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.rangeEnd);
            if (message.types != null && message.types.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.types.length; ++i)
                    writer.int32(message.types[i]);
                writer.ldelim();
            }
            if (message.risks != null && message.risks.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (let i = 0; i < message.risks.length; ++i)
                    writer.int32(message.risks[i]);
                writer.ldelim();
            }
            if (message.protocols != null && message.protocols.length)
                for (let i = 0; i < message.protocols.length; ++i)
                    writer.uint32(/* id 7, wireType 2 =*/58).string(message.protocols[i]);
            if (message.closeReasons != null && message.closeReasons.length) {
                writer.uint32(/* id 8, wireType 2 =*/66).fork();
                for (let i = 0; i < message.closeReasons.length; ++i)
                    writer.int32(message.closeReasons[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Decodes a PAMRecordingsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMRecordingsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMRecordingsRequest} PAMRecordingsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMRecordingsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMRecordingsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.recordUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.maxCount = reader.int32();
                        break;
                    }
                case 3: {
                        message.rangeStart = reader.int64();
                        break;
                    }
                case 4: {
                        message.rangeEnd = reader.int64();
                        break;
                    }
                case 5: {
                        if (!(message.types && message.types.length))
                            message.types = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.types.push(reader.int32());
                        } else
                            message.types.push(reader.int32());
                        break;
                    }
                case 6: {
                        if (!(message.risks && message.risks.length))
                            message.risks = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.risks.push(reader.int32());
                        } else
                            message.risks.push(reader.int32());
                        break;
                    }
                case 7: {
                        if (!(message.protocols && message.protocols.length))
                            message.protocols = [];
                        message.protocols.push(reader.string());
                        break;
                    }
                case 8: {
                        if (!(message.closeReasons && message.closeReasons.length))
                            message.closeReasons = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.closeReasons.push(reader.int32());
                        } else
                            message.closeReasons.push(reader.int32());
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
         * Creates a PAMRecordingsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMRecordingsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMRecordingsRequest} PAMRecordingsRequest
         */
        PAMRecordingsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMRecordingsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMRecordingsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMRecordingsRequest();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.maxCount != null)
                message.maxCount = object.maxCount | 0;
            if (object.rangeStart != null)
                if ($util.Long)
                    message.rangeStart = $util.Long.fromValue(object.rangeStart, false);
                else if (typeof object.rangeStart === "string")
                    message.rangeStart = parseInt(object.rangeStart, 10);
                else if (typeof object.rangeStart === "number")
                    message.rangeStart = object.rangeStart;
                else if (typeof object.rangeStart === "object")
                    message.rangeStart = new $util.LongBits(object.rangeStart.low >>> 0, object.rangeStart.high >>> 0).toNumber();
            if (object.rangeEnd != null)
                if ($util.Long)
                    message.rangeEnd = $util.Long.fromValue(object.rangeEnd, false);
                else if (typeof object.rangeEnd === "string")
                    message.rangeEnd = parseInt(object.rangeEnd, 10);
                else if (typeof object.rangeEnd === "number")
                    message.rangeEnd = object.rangeEnd;
                else if (typeof object.rangeEnd === "object")
                    message.rangeEnd = new $util.LongBits(object.rangeEnd.low >>> 0, object.rangeEnd.high >>> 0).toNumber();
            if (object.types) {
                if (!Array.isArray(object.types))
                    throw TypeError(".PAM.PAMRecordingsRequest.types: array expected");
                message.types = [];
                for (let i = 0; i < object.types.length; ++i)
                    switch (object.types[i]) {
                    default:
                        if (typeof object.types[i] === "number") {
                            message.types[i] = object.types[i];
                            break;
                        }
                    case "PRT_SESSION":
                    case 0:
                        message.types[i] = 0;
                        break;
                    case "PRT_TYPESCRIPT":
                    case 1:
                        message.types[i] = 1;
                        break;
                    case "PRT_TIME":
                    case 2:
                        message.types[i] = 2;
                        break;
                    case "PRT_SUMMARY":
                    case 3:
                        message.types[i] = 3;
                        break;
                    }
            }
            if (object.risks) {
                if (!Array.isArray(object.risks))
                    throw TypeError(".PAM.PAMRecordingsRequest.risks: array expected");
                message.risks = [];
                for (let i = 0; i < object.risks.length; ++i)
                    switch (object.risks[i]) {
                    default:
                        if (typeof object.risks[i] === "number") {
                            message.risks[i] = object.risks[i];
                            break;
                        }
                    case "PRR_UNSPECIFIED":
                    case 0:
                        message.risks[i] = 0;
                        break;
                    case "PRR_LOW":
                    case 1:
                        message.risks[i] = 1;
                        break;
                    case "PRR_MEDIUM":
                    case 2:
                        message.risks[i] = 2;
                        break;
                    case "PRR_HIGH":
                    case 3:
                        message.risks[i] = 3;
                        break;
                    case "PRR_CRITICAL":
                    case 4:
                        message.risks[i] = 4;
                        break;
                    }
            }
            if (object.protocols) {
                if (!Array.isArray(object.protocols))
                    throw TypeError(".PAM.PAMRecordingsRequest.protocols: array expected");
                message.protocols = [];
                for (let i = 0; i < object.protocols.length; ++i)
                    message.protocols[i] = String(object.protocols[i]);
            }
            if (object.closeReasons) {
                if (!Array.isArray(object.closeReasons))
                    throw TypeError(".PAM.PAMRecordingsRequest.closeReasons: array expected");
                message.closeReasons = [];
                for (let i = 0; i < object.closeReasons.length; ++i)
                    message.closeReasons[i] = object.closeReasons[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMRecordingsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMRecordingsRequest
         * @static
         * @param {PAM.PAMRecordingsRequest} message PAMRecordingsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMRecordingsRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.types = [];
                object.risks = [];
                object.protocols = [];
                object.closeReasons = [];
            }
            if (options.defaults) {
                if (options.bytes === String)
                    object.recordUid = "";
                else {
                    object.recordUid = [];
                    if (options.bytes !== Array)
                        object.recordUid = $util.newBuffer(object.recordUid);
                }
                object.maxCount = 0;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.maxCount != null && Object.hasOwnProperty.call(message, "maxCount"))
                object.maxCount = message.maxCount;
            if (message.rangeStart != null && Object.hasOwnProperty.call(message, "rangeStart")) {
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.rangeStart = typeof message.rangeStart === "number" ? BigInt(message.rangeStart) : $util.Long.fromBits(message.rangeStart.low >>> 0, message.rangeStart.high >>> 0, false).toBigInt();
                else if (typeof message.rangeStart === "number")
                    object.rangeStart = options.longs === String ? String(message.rangeStart) : message.rangeStart;
                else
                    object.rangeStart = options.longs === String ? $util.Long.prototype.toString.call(message.rangeStart) : options.longs === Number ? new $util.LongBits(message.rangeStart.low >>> 0, message.rangeStart.high >>> 0).toNumber() : message.rangeStart;
                if (options.oneofs)
                    object._rangeStart = "rangeStart";
            }
            if (message.rangeEnd != null && Object.hasOwnProperty.call(message, "rangeEnd")) {
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.rangeEnd = typeof message.rangeEnd === "number" ? BigInt(message.rangeEnd) : $util.Long.fromBits(message.rangeEnd.low >>> 0, message.rangeEnd.high >>> 0, false).toBigInt();
                else if (typeof message.rangeEnd === "number")
                    object.rangeEnd = options.longs === String ? String(message.rangeEnd) : message.rangeEnd;
                else
                    object.rangeEnd = options.longs === String ? $util.Long.prototype.toString.call(message.rangeEnd) : options.longs === Number ? new $util.LongBits(message.rangeEnd.low >>> 0, message.rangeEnd.high >>> 0).toNumber() : message.rangeEnd;
                if (options.oneofs)
                    object._rangeEnd = "rangeEnd";
            }
            if (message.types && message.types.length) {
                object.types = [];
                for (let j = 0; j < message.types.length; ++j)
                    object.types[j] = options.enums === String ? $root.PAM.PAMRecordingType[message.types[j]] === undefined ? message.types[j] : $root.PAM.PAMRecordingType[message.types[j]] : message.types[j];
            }
            if (message.risks && message.risks.length) {
                object.risks = [];
                for (let j = 0; j < message.risks.length; ++j)
                    object.risks[j] = options.enums === String ? $root.PAM.PAMRecordingRiskLevel[message.risks[j]] === undefined ? message.risks[j] : $root.PAM.PAMRecordingRiskLevel[message.risks[j]] : message.risks[j];
            }
            if (message.protocols && message.protocols.length) {
                object.protocols = [];
                for (let j = 0; j < message.protocols.length; ++j)
                    object.protocols[j] = message.protocols[j];
            }
            if (message.closeReasons && message.closeReasons.length) {
                object.closeReasons = [];
                for (let j = 0; j < message.closeReasons.length; ++j)
                    object.closeReasons[j] = message.closeReasons[j];
            }
            return object;
        };

        /**
         * Converts this PAMRecordingsRequest to JSON.
         * @function toJSON
         * @memberof PAM.PAMRecordingsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMRecordingsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMRecordingsRequest
         * @function getTypeUrl
         * @memberof PAM.PAMRecordingsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMRecordingsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMRecordingsRequest";
        };

        return PAMRecordingsRequest;
    })();

    PAM.PAMRecording = (function() {

        /**
         * Properties of a PAMRecording.
         * @memberof PAM
         * @interface IPAMRecording
         * @property {Uint8Array|null} [connectionUid] PAMRecording connectionUid
         * @property {PAM.PAMRecordingType|null} [recordingType] PAMRecording recordingType
         * @property {Uint8Array|null} [recordUid] PAMRecording recordUid
         * @property {string|null} [userName] PAMRecording userName
         * @property {number|null} [startedOn] PAMRecording startedOn
         * @property {number|null} [length] PAMRecording length
         * @property {number|null} [fileSize] PAMRecording fileSize
         * @property {number|null} [createdOn] PAMRecording createdOn
         * @property {string|null} [protocol] PAMRecording protocol
         * @property {number|null} [closeReason] PAMRecording closeReason
         * @property {number|null} [recordingDuration] PAMRecording recordingDuration
         * @property {PAM.PAMRecordingRiskLevel|null} [aiOverallRiskLevel] PAMRecording aiOverallRiskLevel
         * @property {Uint8Array|null} [aiOverallSummary] PAMRecording aiOverallSummary
         */

        /**
         * Constructs a new PAMRecording.
         * @memberof PAM
         * @classdesc Represents a PAMRecording.
         * @implements IPAMRecording
         * @constructor
         * @param {PAM.IPAMRecording=} [properties] Properties to set
         */
        function PAMRecording(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMRecording connectionUid.
         * @member {Uint8Array} connectionUid
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.connectionUid = $util.newBuffer([]);

        /**
         * PAMRecording recordingType.
         * @member {PAM.PAMRecordingType} recordingType
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.recordingType = 0;

        /**
         * PAMRecording recordUid.
         * @member {Uint8Array} recordUid
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.recordUid = $util.newBuffer([]);

        /**
         * PAMRecording userName.
         * @member {string} userName
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.userName = "";

        /**
         * PAMRecording startedOn.
         * @member {number} startedOn
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.startedOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMRecording length.
         * @member {number} length
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.length = 0;

        /**
         * PAMRecording fileSize.
         * @member {number} fileSize
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.fileSize = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMRecording createdOn.
         * @member {number} createdOn
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.createdOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PAMRecording protocol.
         * @member {string} protocol
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.protocol = "";

        /**
         * PAMRecording closeReason.
         * @member {number} closeReason
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.closeReason = 0;

        /**
         * PAMRecording recordingDuration.
         * @member {number} recordingDuration
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.recordingDuration = 0;

        /**
         * PAMRecording aiOverallRiskLevel.
         * @member {PAM.PAMRecordingRiskLevel} aiOverallRiskLevel
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.aiOverallRiskLevel = 0;

        /**
         * PAMRecording aiOverallSummary.
         * @member {Uint8Array} aiOverallSummary
         * @memberof PAM.PAMRecording
         * @instance
         */
        PAMRecording.prototype.aiOverallSummary = $util.newBuffer([]);

        /**
         * Creates a new PAMRecording instance using the specified properties.
         * @function create
         * @memberof PAM.PAMRecording
         * @static
         * @param {PAM.IPAMRecording=} [properties] Properties to set
         * @returns {PAM.PAMRecording} PAMRecording instance
         */
        PAMRecording.create = function create(properties) {
            return new PAMRecording(properties);
        };

        /**
         * Encodes the specified PAMRecording message. Does not implicitly {@link PAM.PAMRecording.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMRecording
         * @static
         * @param {PAM.IPAMRecording} message PAMRecording message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMRecording.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.connectionUid != null && Object.hasOwnProperty.call(message, "connectionUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.connectionUid);
            if (message.recordingType != null && Object.hasOwnProperty.call(message, "recordingType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.recordingType);
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.recordUid);
            if (message.userName != null && Object.hasOwnProperty.call(message, "userName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.userName);
            if (message.startedOn != null && Object.hasOwnProperty.call(message, "startedOn"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.startedOn);
            if (message.length != null && Object.hasOwnProperty.call(message, "length"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.length);
            if (message.fileSize != null && Object.hasOwnProperty.call(message, "fileSize"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.fileSize);
            if (message.createdOn != null && Object.hasOwnProperty.call(message, "createdOn"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.createdOn);
            if (message.protocol != null && Object.hasOwnProperty.call(message, "protocol"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.protocol);
            if (message.closeReason != null && Object.hasOwnProperty.call(message, "closeReason"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.closeReason);
            if (message.recordingDuration != null && Object.hasOwnProperty.call(message, "recordingDuration"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.recordingDuration);
            if (message.aiOverallRiskLevel != null && Object.hasOwnProperty.call(message, "aiOverallRiskLevel"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.aiOverallRiskLevel);
            if (message.aiOverallSummary != null && Object.hasOwnProperty.call(message, "aiOverallSummary"))
                writer.uint32(/* id 13, wireType 2 =*/106).bytes(message.aiOverallSummary);
            return writer;
        };

        /**
         * Decodes a PAMRecording message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMRecording
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMRecording} PAMRecording
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMRecording.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMRecording();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.connectionUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.recordingType = reader.int32();
                        break;
                    }
                case 3: {
                        message.recordUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.userName = reader.string();
                        break;
                    }
                case 5: {
                        message.startedOn = reader.int64();
                        break;
                    }
                case 6: {
                        message.length = reader.int32();
                        break;
                    }
                case 7: {
                        message.fileSize = reader.int64();
                        break;
                    }
                case 8: {
                        message.createdOn = reader.int64();
                        break;
                    }
                case 9: {
                        message.protocol = reader.string();
                        break;
                    }
                case 10: {
                        message.closeReason = reader.int32();
                        break;
                    }
                case 11: {
                        message.recordingDuration = reader.int32();
                        break;
                    }
                case 12: {
                        message.aiOverallRiskLevel = reader.int32();
                        break;
                    }
                case 13: {
                        message.aiOverallSummary = reader.bytes();
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
         * Creates a PAMRecording message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMRecording
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMRecording} PAMRecording
         */
        PAMRecording.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMRecording)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMRecording: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMRecording();
            if (object.connectionUid != null)
                if (typeof object.connectionUid === "string")
                    $util.base64.decode(object.connectionUid, message.connectionUid = $util.newBuffer($util.base64.length(object.connectionUid)), 0);
                else if (object.connectionUid.length >= 0)
                    message.connectionUid = object.connectionUid;
            switch (object.recordingType) {
            default:
                if (typeof object.recordingType === "number") {
                    message.recordingType = object.recordingType;
                    break;
                }
                break;
            case "PRT_SESSION":
            case 0:
                message.recordingType = 0;
                break;
            case "PRT_TYPESCRIPT":
            case 1:
                message.recordingType = 1;
                break;
            case "PRT_TIME":
            case 2:
                message.recordingType = 2;
                break;
            case "PRT_SUMMARY":
            case 3:
                message.recordingType = 3;
                break;
            }
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.userName != null)
                message.userName = String(object.userName);
            if (object.startedOn != null)
                if ($util.Long)
                    message.startedOn = $util.Long.fromValue(object.startedOn, false);
                else if (typeof object.startedOn === "string")
                    message.startedOn = parseInt(object.startedOn, 10);
                else if (typeof object.startedOn === "number")
                    message.startedOn = object.startedOn;
                else if (typeof object.startedOn === "object")
                    message.startedOn = new $util.LongBits(object.startedOn.low >>> 0, object.startedOn.high >>> 0).toNumber();
            if (object.length != null)
                message.length = object.length | 0;
            if (object.fileSize != null)
                if ($util.Long)
                    message.fileSize = $util.Long.fromValue(object.fileSize, false);
                else if (typeof object.fileSize === "string")
                    message.fileSize = parseInt(object.fileSize, 10);
                else if (typeof object.fileSize === "number")
                    message.fileSize = object.fileSize;
                else if (typeof object.fileSize === "object")
                    message.fileSize = new $util.LongBits(object.fileSize.low >>> 0, object.fileSize.high >>> 0).toNumber();
            if (object.createdOn != null)
                if ($util.Long)
                    message.createdOn = $util.Long.fromValue(object.createdOn, false);
                else if (typeof object.createdOn === "string")
                    message.createdOn = parseInt(object.createdOn, 10);
                else if (typeof object.createdOn === "number")
                    message.createdOn = object.createdOn;
                else if (typeof object.createdOn === "object")
                    message.createdOn = new $util.LongBits(object.createdOn.low >>> 0, object.createdOn.high >>> 0).toNumber();
            if (object.protocol != null)
                message.protocol = String(object.protocol);
            if (object.closeReason != null)
                message.closeReason = object.closeReason | 0;
            if (object.recordingDuration != null)
                message.recordingDuration = object.recordingDuration | 0;
            switch (object.aiOverallRiskLevel) {
            default:
                if (typeof object.aiOverallRiskLevel === "number") {
                    message.aiOverallRiskLevel = object.aiOverallRiskLevel;
                    break;
                }
                break;
            case "PRR_UNSPECIFIED":
            case 0:
                message.aiOverallRiskLevel = 0;
                break;
            case "PRR_LOW":
            case 1:
                message.aiOverallRiskLevel = 1;
                break;
            case "PRR_MEDIUM":
            case 2:
                message.aiOverallRiskLevel = 2;
                break;
            case "PRR_HIGH":
            case 3:
                message.aiOverallRiskLevel = 3;
                break;
            case "PRR_CRITICAL":
            case 4:
                message.aiOverallRiskLevel = 4;
                break;
            }
            if (object.aiOverallSummary != null)
                if (typeof object.aiOverallSummary === "string")
                    $util.base64.decode(object.aiOverallSummary, message.aiOverallSummary = $util.newBuffer($util.base64.length(object.aiOverallSummary)), 0);
                else if (object.aiOverallSummary.length >= 0)
                    message.aiOverallSummary = object.aiOverallSummary;
            return message;
        };

        /**
         * Creates a plain object from a PAMRecording message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMRecording
         * @static
         * @param {PAM.PAMRecording} message PAMRecording
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMRecording.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.connectionUid = "";
                else {
                    object.connectionUid = [];
                    if (options.bytes !== Array)
                        object.connectionUid = $util.newBuffer(object.connectionUid);
                }
                object.recordingType = options.enums === String ? "PRT_SESSION" : 0;
                if (options.bytes === String)
                    object.recordUid = "";
                else {
                    object.recordUid = [];
                    if (options.bytes !== Array)
                        object.recordUid = $util.newBuffer(object.recordUid);
                }
                object.userName = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.startedOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.startedOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.length = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.fileSize = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.fileSize = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.createdOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.createdOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.protocol = "";
                object.closeReason = 0;
                object.recordingDuration = 0;
                object.aiOverallRiskLevel = options.enums === String ? "PRR_UNSPECIFIED" : 0;
                if (options.bytes === String)
                    object.aiOverallSummary = "";
                else {
                    object.aiOverallSummary = [];
                    if (options.bytes !== Array)
                        object.aiOverallSummary = $util.newBuffer(object.aiOverallSummary);
                }
            }
            if (message.connectionUid != null && Object.hasOwnProperty.call(message, "connectionUid"))
                object.connectionUid = options.bytes === String ? $util.base64.encode(message.connectionUid, 0, message.connectionUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.connectionUid) : message.connectionUid;
            if (message.recordingType != null && Object.hasOwnProperty.call(message, "recordingType"))
                object.recordingType = options.enums === String ? $root.PAM.PAMRecordingType[message.recordingType] === undefined ? message.recordingType : $root.PAM.PAMRecordingType[message.recordingType] : message.recordingType;
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.userName != null && Object.hasOwnProperty.call(message, "userName"))
                object.userName = message.userName;
            if (message.startedOn != null && Object.hasOwnProperty.call(message, "startedOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.startedOn = typeof message.startedOn === "number" ? BigInt(message.startedOn) : $util.Long.fromBits(message.startedOn.low >>> 0, message.startedOn.high >>> 0, false).toBigInt();
                else if (typeof message.startedOn === "number")
                    object.startedOn = options.longs === String ? String(message.startedOn) : message.startedOn;
                else
                    object.startedOn = options.longs === String ? $util.Long.prototype.toString.call(message.startedOn) : options.longs === Number ? new $util.LongBits(message.startedOn.low >>> 0, message.startedOn.high >>> 0).toNumber() : message.startedOn;
            if (message.length != null && Object.hasOwnProperty.call(message, "length"))
                object.length = message.length;
            if (message.fileSize != null && Object.hasOwnProperty.call(message, "fileSize"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.fileSize = typeof message.fileSize === "number" ? BigInt(message.fileSize) : $util.Long.fromBits(message.fileSize.low >>> 0, message.fileSize.high >>> 0, false).toBigInt();
                else if (typeof message.fileSize === "number")
                    object.fileSize = options.longs === String ? String(message.fileSize) : message.fileSize;
                else
                    object.fileSize = options.longs === String ? $util.Long.prototype.toString.call(message.fileSize) : options.longs === Number ? new $util.LongBits(message.fileSize.low >>> 0, message.fileSize.high >>> 0).toNumber() : message.fileSize;
            if (message.createdOn != null && Object.hasOwnProperty.call(message, "createdOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.createdOn = typeof message.createdOn === "number" ? BigInt(message.createdOn) : $util.Long.fromBits(message.createdOn.low >>> 0, message.createdOn.high >>> 0, false).toBigInt();
                else if (typeof message.createdOn === "number")
                    object.createdOn = options.longs === String ? String(message.createdOn) : message.createdOn;
                else
                    object.createdOn = options.longs === String ? $util.Long.prototype.toString.call(message.createdOn) : options.longs === Number ? new $util.LongBits(message.createdOn.low >>> 0, message.createdOn.high >>> 0).toNumber() : message.createdOn;
            if (message.protocol != null && Object.hasOwnProperty.call(message, "protocol"))
                object.protocol = message.protocol;
            if (message.closeReason != null && Object.hasOwnProperty.call(message, "closeReason"))
                object.closeReason = message.closeReason;
            if (message.recordingDuration != null && Object.hasOwnProperty.call(message, "recordingDuration"))
                object.recordingDuration = message.recordingDuration;
            if (message.aiOverallRiskLevel != null && Object.hasOwnProperty.call(message, "aiOverallRiskLevel"))
                object.aiOverallRiskLevel = options.enums === String ? $root.PAM.PAMRecordingRiskLevel[message.aiOverallRiskLevel] === undefined ? message.aiOverallRiskLevel : $root.PAM.PAMRecordingRiskLevel[message.aiOverallRiskLevel] : message.aiOverallRiskLevel;
            if (message.aiOverallSummary != null && Object.hasOwnProperty.call(message, "aiOverallSummary"))
                object.aiOverallSummary = options.bytes === String ? $util.base64.encode(message.aiOverallSummary, 0, message.aiOverallSummary.length) : options.bytes === Array ? Array.prototype.slice.call(message.aiOverallSummary) : message.aiOverallSummary;
            return object;
        };

        /**
         * Converts this PAMRecording to JSON.
         * @function toJSON
         * @memberof PAM.PAMRecording
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMRecording.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMRecording
         * @function getTypeUrl
         * @memberof PAM.PAMRecording
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMRecording.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMRecording";
        };

        return PAMRecording;
    })();

    PAM.PAMRecordingsResponse = (function() {

        /**
         * Properties of a PAMRecordingsResponse.
         * @memberof PAM
         * @interface IPAMRecordingsResponse
         * @property {Array.<PAM.IPAMRecording>|null} [recordings] PAMRecordingsResponse recordings
         * @property {boolean|null} [hasMore] PAMRecordingsResponse hasMore
         */

        /**
         * Constructs a new PAMRecordingsResponse.
         * @memberof PAM
         * @classdesc Represents a PAMRecordingsResponse.
         * @implements IPAMRecordingsResponse
         * @constructor
         * @param {PAM.IPAMRecordingsResponse=} [properties] Properties to set
         */
        function PAMRecordingsResponse(properties) {
            this.recordings = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMRecordingsResponse recordings.
         * @member {Array.<PAM.IPAMRecording>} recordings
         * @memberof PAM.PAMRecordingsResponse
         * @instance
         */
        PAMRecordingsResponse.prototype.recordings = $util.emptyArray;

        /**
         * PAMRecordingsResponse hasMore.
         * @member {boolean} hasMore
         * @memberof PAM.PAMRecordingsResponse
         * @instance
         */
        PAMRecordingsResponse.prototype.hasMore = false;

        /**
         * Creates a new PAMRecordingsResponse instance using the specified properties.
         * @function create
         * @memberof PAM.PAMRecordingsResponse
         * @static
         * @param {PAM.IPAMRecordingsResponse=} [properties] Properties to set
         * @returns {PAM.PAMRecordingsResponse} PAMRecordingsResponse instance
         */
        PAMRecordingsResponse.create = function create(properties) {
            return new PAMRecordingsResponse(properties);
        };

        /**
         * Encodes the specified PAMRecordingsResponse message. Does not implicitly {@link PAM.PAMRecordingsResponse.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMRecordingsResponse
         * @static
         * @param {PAM.IPAMRecordingsResponse} message PAMRecordingsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMRecordingsResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordings != null && message.recordings.length)
                for (let i = 0; i < message.recordings.length; ++i)
                    $root.PAM.PAMRecording.encode(message.recordings[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.hasMore);
            return writer;
        };

        /**
         * Decodes a PAMRecordingsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMRecordingsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMRecordingsResponse} PAMRecordingsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMRecordingsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMRecordingsResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.recordings && message.recordings.length))
                            message.recordings = [];
                        message.recordings.push($root.PAM.PAMRecording.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        message.hasMore = reader.bool();
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
         * Creates a PAMRecordingsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMRecordingsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMRecordingsResponse} PAMRecordingsResponse
         */
        PAMRecordingsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMRecordingsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMRecordingsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMRecordingsResponse();
            if (object.recordings) {
                if (!Array.isArray(object.recordings))
                    throw TypeError(".PAM.PAMRecordingsResponse.recordings: array expected");
                message.recordings = [];
                for (let i = 0; i < object.recordings.length; ++i) {
                    if (!$util.isObject(object.recordings[i]))
                        throw TypeError(".PAM.PAMRecordingsResponse.recordings: object expected");
                    message.recordings[i] = $root.PAM.PAMRecording.fromObject(object.recordings[i], long + 1);
                }
            }
            if (object.hasMore != null)
                message.hasMore = Boolean(object.hasMore);
            return message;
        };

        /**
         * Creates a plain object from a PAMRecordingsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMRecordingsResponse
         * @static
         * @param {PAM.PAMRecordingsResponse} message PAMRecordingsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMRecordingsResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.recordings = [];
            if (options.defaults)
                object.hasMore = false;
            if (message.recordings && message.recordings.length) {
                object.recordings = [];
                for (let j = 0; j < message.recordings.length; ++j)
                    object.recordings[j] = $root.PAM.PAMRecording.toObject(message.recordings[j], options, q + 1);
            }
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                object.hasMore = message.hasMore;
            return object;
        };

        /**
         * Converts this PAMRecordingsResponse to JSON.
         * @function toJSON
         * @memberof PAM.PAMRecordingsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMRecordingsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMRecordingsResponse
         * @function getTypeUrl
         * @memberof PAM.PAMRecordingsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMRecordingsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMRecordingsResponse";
        };

        return PAMRecordingsResponse;
    })();

    PAM.PAMData = (function() {

        /**
         * Properties of a PAMData.
         * @memberof PAM
         * @interface IPAMData
         * @property {Uint8Array|null} [vertex] PAMData vertex
         * @property {Uint8Array|null} [content] PAMData content
         */

        /**
         * Constructs a new PAMData.
         * @memberof PAM
         * @classdesc Represents a PAMData.
         * @implements IPAMData
         * @constructor
         * @param {PAM.IPAMData=} [properties] Properties to set
         */
        function PAMData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMData vertex.
         * @member {Uint8Array} vertex
         * @memberof PAM.PAMData
         * @instance
         */
        PAMData.prototype.vertex = $util.newBuffer([]);

        /**
         * PAMData content.
         * @member {Uint8Array} content
         * @memberof PAM.PAMData
         * @instance
         */
        PAMData.prototype.content = $util.newBuffer([]);

        /**
         * Creates a new PAMData instance using the specified properties.
         * @function create
         * @memberof PAM.PAMData
         * @static
         * @param {PAM.IPAMData=} [properties] Properties to set
         * @returns {PAM.PAMData} PAMData instance
         */
        PAMData.create = function create(properties) {
            return new PAMData(properties);
        };

        /**
         * Encodes the specified PAMData message. Does not implicitly {@link PAM.PAMData.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMData
         * @static
         * @param {PAM.IPAMData} message PAMData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.vertex != null && Object.hasOwnProperty.call(message, "vertex"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.vertex);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.content);
            return writer;
        };

        /**
         * Decodes a PAMData message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMData} PAMData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.vertex = reader.bytes();
                        break;
                    }
                case 2: {
                        message.content = reader.bytes();
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
         * Creates a PAMData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMData} PAMData
         */
        PAMData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMData();
            if (object.vertex != null)
                if (typeof object.vertex === "string")
                    $util.base64.decode(object.vertex, message.vertex = $util.newBuffer($util.base64.length(object.vertex)), 0);
                else if (object.vertex.length >= 0)
                    message.vertex = object.vertex;
            if (object.content != null)
                if (typeof object.content === "string")
                    $util.base64.decode(object.content, message.content = $util.newBuffer($util.base64.length(object.content)), 0);
                else if (object.content.length >= 0)
                    message.content = object.content;
            return message;
        };

        /**
         * Creates a plain object from a PAMData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMData
         * @static
         * @param {PAM.PAMData} message PAMData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMData.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.vertex = "";
                else {
                    object.vertex = [];
                    if (options.bytes !== Array)
                        object.vertex = $util.newBuffer(object.vertex);
                }
                if (options.bytes === String)
                    object.content = "";
                else {
                    object.content = [];
                    if (options.bytes !== Array)
                        object.content = $util.newBuffer(object.content);
                }
            }
            if (message.vertex != null && Object.hasOwnProperty.call(message, "vertex"))
                object.vertex = options.bytes === String ? $util.base64.encode(message.vertex, 0, message.vertex.length) : options.bytes === Array ? Array.prototype.slice.call(message.vertex) : message.vertex;
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                object.content = options.bytes === String ? $util.base64.encode(message.content, 0, message.content.length) : options.bytes === Array ? Array.prototype.slice.call(message.content) : message.content;
            return object;
        };

        /**
         * Converts this PAMData to JSON.
         * @function toJSON
         * @memberof PAM.PAMData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMData
         * @function getTypeUrl
         * @memberof PAM.PAMData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMData";
        };

        return PAMData;
    })();

    PAM.UidList = (function() {

        /**
         * Properties of an UidList.
         * @memberof PAM
         * @interface IUidList
         * @property {Array.<Uint8Array>|null} [uids] UidList uids
         */

        /**
         * Constructs a new UidList.
         * @memberof PAM
         * @classdesc Represents an UidList.
         * @implements IUidList
         * @constructor
         * @param {PAM.IUidList=} [properties] Properties to set
         */
        function UidList(properties) {
            this.uids = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UidList uids.
         * @member {Array.<Uint8Array>} uids
         * @memberof PAM.UidList
         * @instance
         */
        UidList.prototype.uids = $util.emptyArray;

        /**
         * Creates a new UidList instance using the specified properties.
         * @function create
         * @memberof PAM.UidList
         * @static
         * @param {PAM.IUidList=} [properties] Properties to set
         * @returns {PAM.UidList} UidList instance
         */
        UidList.create = function create(properties) {
            return new UidList(properties);
        };

        /**
         * Encodes the specified UidList message. Does not implicitly {@link PAM.UidList.verify|verify} messages.
         * @function encode
         * @memberof PAM.UidList
         * @static
         * @param {PAM.IUidList} message UidList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UidList.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.uids != null && message.uids.length)
                for (let i = 0; i < message.uids.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.uids[i]);
            return writer;
        };

        /**
         * Decodes an UidList message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.UidList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.UidList} UidList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UidList.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.UidList();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.uids && message.uids.length))
                            message.uids = [];
                        message.uids.push(reader.bytes());
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
         * Creates an UidList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.UidList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.UidList} UidList
         */
        UidList.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.UidList)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.UidList: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.UidList();
            if (object.uids) {
                if (!Array.isArray(object.uids))
                    throw TypeError(".PAM.UidList.uids: array expected");
                message.uids = [];
                for (let i = 0; i < object.uids.length; ++i)
                    if (typeof object.uids[i] === "string")
                        $util.base64.decode(object.uids[i], message.uids[i] = $util.newBuffer($util.base64.length(object.uids[i])), 0);
                    else if (object.uids[i].length >= 0)
                        message.uids[i] = object.uids[i];
            }
            return message;
        };

        /**
         * Creates a plain object from an UidList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.UidList
         * @static
         * @param {PAM.UidList} message UidList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UidList.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.uids = [];
            if (message.uids && message.uids.length) {
                object.uids = [];
                for (let j = 0; j < message.uids.length; ++j)
                    object.uids[j] = options.bytes === String ? $util.base64.encode(message.uids[j], 0, message.uids[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.uids[j]) : message.uids[j];
            }
            return object;
        };

        /**
         * Converts this UidList to JSON.
         * @function toJSON
         * @memberof PAM.UidList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UidList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UidList
         * @function getTypeUrl
         * @memberof PAM.UidList
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UidList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.UidList";
        };

        return UidList;
    })();

    PAM.PAMResourceConfig = (function() {

        /**
         * Properties of a PAMResourceConfig.
         * @memberof PAM
         * @interface IPAMResourceConfig
         * @property {Uint8Array|null} [recordUid] PAMResourceConfig recordUid
         * @property {Uint8Array|null} [networkUid] PAMResourceConfig networkUid
         * @property {Uint8Array|null} [adminUid] PAMResourceConfig adminUid
         * @property {Uint8Array|null} [meta] PAMResourceConfig meta
         * @property {Uint8Array|null} [connectionSettings] PAMResourceConfig connectionSettings
         * @property {PAM.IUidList|null} [connectUsers] PAMResourceConfig connectUsers
         * @property {Uint8Array|null} [domainUid] PAMResourceConfig domainUid
         * @property {Uint8Array|null} [jitSettings] PAMResourceConfig jitSettings
         * @property {Uint8Array|null} [keeperAiSettings] PAMResourceConfig keeperAiSettings
         * @property {boolean|null} [updateServices] PAMResourceConfig updateServices
         */

        /**
         * Constructs a new PAMResourceConfig.
         * @memberof PAM
         * @classdesc Represents a PAMResourceConfig.
         * @implements IPAMResourceConfig
         * @constructor
         * @param {PAM.IPAMResourceConfig=} [properties] Properties to set
         */
        function PAMResourceConfig(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMResourceConfig recordUid.
         * @member {Uint8Array} recordUid
         * @memberof PAM.PAMResourceConfig
         * @instance
         */
        PAMResourceConfig.prototype.recordUid = $util.newBuffer([]);

        /**
         * PAMResourceConfig networkUid.
         * @member {Uint8Array|null|undefined} networkUid
         * @memberof PAM.PAMResourceConfig
         * @instance
         */
        PAMResourceConfig.prototype.networkUid = null;

        /**
         * PAMResourceConfig adminUid.
         * @member {Uint8Array|null|undefined} adminUid
         * @memberof PAM.PAMResourceConfig
         * @instance
         */
        PAMResourceConfig.prototype.adminUid = null;

        /**
         * PAMResourceConfig meta.
         * @member {Uint8Array|null|undefined} meta
         * @memberof PAM.PAMResourceConfig
         * @instance
         */
        PAMResourceConfig.prototype.meta = null;

        /**
         * PAMResourceConfig connectionSettings.
         * @member {Uint8Array|null|undefined} connectionSettings
         * @memberof PAM.PAMResourceConfig
         * @instance
         */
        PAMResourceConfig.prototype.connectionSettings = null;

        /**
         * PAMResourceConfig connectUsers.
         * @member {PAM.IUidList|null|undefined} connectUsers
         * @memberof PAM.PAMResourceConfig
         * @instance
         */
        PAMResourceConfig.prototype.connectUsers = null;

        /**
         * PAMResourceConfig domainUid.
         * @member {Uint8Array|null|undefined} domainUid
         * @memberof PAM.PAMResourceConfig
         * @instance
         */
        PAMResourceConfig.prototype.domainUid = null;

        /**
         * PAMResourceConfig jitSettings.
         * @member {Uint8Array|null|undefined} jitSettings
         * @memberof PAM.PAMResourceConfig
         * @instance
         */
        PAMResourceConfig.prototype.jitSettings = null;

        /**
         * PAMResourceConfig keeperAiSettings.
         * @member {Uint8Array|null|undefined} keeperAiSettings
         * @memberof PAM.PAMResourceConfig
         * @instance
         */
        PAMResourceConfig.prototype.keeperAiSettings = null;

        /**
         * PAMResourceConfig updateServices.
         * @member {boolean|null|undefined} updateServices
         * @memberof PAM.PAMResourceConfig
         * @instance
         */
        PAMResourceConfig.prototype.updateServices = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMResourceConfig.prototype, "_networkUid", {
            get: $util.oneOfGetter($oneOfFields = ["networkUid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMResourceConfig.prototype, "_adminUid", {
            get: $util.oneOfGetter($oneOfFields = ["adminUid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMResourceConfig.prototype, "_meta", {
            get: $util.oneOfGetter($oneOfFields = ["meta"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMResourceConfig.prototype, "_connectionSettings", {
            get: $util.oneOfGetter($oneOfFields = ["connectionSettings"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMResourceConfig.prototype, "_connectUsers", {
            get: $util.oneOfGetter($oneOfFields = ["connectUsers"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMResourceConfig.prototype, "_domainUid", {
            get: $util.oneOfGetter($oneOfFields = ["domainUid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMResourceConfig.prototype, "_jitSettings", {
            get: $util.oneOfGetter($oneOfFields = ["jitSettings"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMResourceConfig.prototype, "_keeperAiSettings", {
            get: $util.oneOfGetter($oneOfFields = ["keeperAiSettings"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMResourceConfig.prototype, "_updateServices", {
            get: $util.oneOfGetter($oneOfFields = ["updateServices"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new PAMResourceConfig instance using the specified properties.
         * @function create
         * @memberof PAM.PAMResourceConfig
         * @static
         * @param {PAM.IPAMResourceConfig=} [properties] Properties to set
         * @returns {PAM.PAMResourceConfig} PAMResourceConfig instance
         */
        PAMResourceConfig.create = function create(properties) {
            return new PAMResourceConfig(properties);
        };

        /**
         * Encodes the specified PAMResourceConfig message. Does not implicitly {@link PAM.PAMResourceConfig.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMResourceConfig
         * @static
         * @param {PAM.IPAMResourceConfig} message PAMResourceConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMResourceConfig.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.networkUid != null && Object.hasOwnProperty.call(message, "networkUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.networkUid);
            if (message.adminUid != null && Object.hasOwnProperty.call(message, "adminUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.adminUid);
            if (message.meta != null && Object.hasOwnProperty.call(message, "meta"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.meta);
            if (message.connectionSettings != null && Object.hasOwnProperty.call(message, "connectionSettings"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.connectionSettings);
            if (message.connectUsers != null && Object.hasOwnProperty.call(message, "connectUsers"))
                $root.PAM.UidList.encode(message.connectUsers, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.domainUid != null && Object.hasOwnProperty.call(message, "domainUid"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.domainUid);
            if (message.jitSettings != null && Object.hasOwnProperty.call(message, "jitSettings"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.jitSettings);
            if (message.keeperAiSettings != null && Object.hasOwnProperty.call(message, "keeperAiSettings"))
                writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.keeperAiSettings);
            if (message.updateServices != null && Object.hasOwnProperty.call(message, "updateServices"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.updateServices);
            return writer;
        };

        /**
         * Decodes a PAMResourceConfig message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMResourceConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMResourceConfig} PAMResourceConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMResourceConfig.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMResourceConfig();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.recordUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.networkUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.adminUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.meta = reader.bytes();
                        break;
                    }
                case 5: {
                        message.connectionSettings = reader.bytes();
                        break;
                    }
                case 6: {
                        message.connectUsers = $root.PAM.UidList.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 7: {
                        message.domainUid = reader.bytes();
                        break;
                    }
                case 8: {
                        message.jitSettings = reader.bytes();
                        break;
                    }
                case 9: {
                        message.keeperAiSettings = reader.bytes();
                        break;
                    }
                case 10: {
                        message.updateServices = reader.bool();
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
         * Creates a PAMResourceConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMResourceConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMResourceConfig} PAMResourceConfig
         */
        PAMResourceConfig.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMResourceConfig)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMResourceConfig: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMResourceConfig();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.networkUid != null)
                if (typeof object.networkUid === "string")
                    $util.base64.decode(object.networkUid, message.networkUid = $util.newBuffer($util.base64.length(object.networkUid)), 0);
                else if (object.networkUid.length >= 0)
                    message.networkUid = object.networkUid;
            if (object.adminUid != null)
                if (typeof object.adminUid === "string")
                    $util.base64.decode(object.adminUid, message.adminUid = $util.newBuffer($util.base64.length(object.adminUid)), 0);
                else if (object.adminUid.length >= 0)
                    message.adminUid = object.adminUid;
            if (object.meta != null)
                if (typeof object.meta === "string")
                    $util.base64.decode(object.meta, message.meta = $util.newBuffer($util.base64.length(object.meta)), 0);
                else if (object.meta.length >= 0)
                    message.meta = object.meta;
            if (object.connectionSettings != null)
                if (typeof object.connectionSettings === "string")
                    $util.base64.decode(object.connectionSettings, message.connectionSettings = $util.newBuffer($util.base64.length(object.connectionSettings)), 0);
                else if (object.connectionSettings.length >= 0)
                    message.connectionSettings = object.connectionSettings;
            if (object.connectUsers != null) {
                if (!$util.isObject(object.connectUsers))
                    throw TypeError(".PAM.PAMResourceConfig.connectUsers: object expected");
                message.connectUsers = $root.PAM.UidList.fromObject(object.connectUsers, long + 1);
            }
            if (object.domainUid != null)
                if (typeof object.domainUid === "string")
                    $util.base64.decode(object.domainUid, message.domainUid = $util.newBuffer($util.base64.length(object.domainUid)), 0);
                else if (object.domainUid.length >= 0)
                    message.domainUid = object.domainUid;
            if (object.jitSettings != null)
                if (typeof object.jitSettings === "string")
                    $util.base64.decode(object.jitSettings, message.jitSettings = $util.newBuffer($util.base64.length(object.jitSettings)), 0);
                else if (object.jitSettings.length >= 0)
                    message.jitSettings = object.jitSettings;
            if (object.keeperAiSettings != null)
                if (typeof object.keeperAiSettings === "string")
                    $util.base64.decode(object.keeperAiSettings, message.keeperAiSettings = $util.newBuffer($util.base64.length(object.keeperAiSettings)), 0);
                else if (object.keeperAiSettings.length >= 0)
                    message.keeperAiSettings = object.keeperAiSettings;
            if (object.updateServices != null)
                message.updateServices = Boolean(object.updateServices);
            return message;
        };

        /**
         * Creates a plain object from a PAMResourceConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMResourceConfig
         * @static
         * @param {PAM.PAMResourceConfig} message PAMResourceConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMResourceConfig.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.recordUid = "";
                else {
                    object.recordUid = [];
                    if (options.bytes !== Array)
                        object.recordUid = $util.newBuffer(object.recordUid);
                }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.networkUid != null && Object.hasOwnProperty.call(message, "networkUid")) {
                object.networkUid = options.bytes === String ? $util.base64.encode(message.networkUid, 0, message.networkUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.networkUid) : message.networkUid;
                if (options.oneofs)
                    object._networkUid = "networkUid";
            }
            if (message.adminUid != null && Object.hasOwnProperty.call(message, "adminUid")) {
                object.adminUid = options.bytes === String ? $util.base64.encode(message.adminUid, 0, message.adminUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.adminUid) : message.adminUid;
                if (options.oneofs)
                    object._adminUid = "adminUid";
            }
            if (message.meta != null && Object.hasOwnProperty.call(message, "meta")) {
                object.meta = options.bytes === String ? $util.base64.encode(message.meta, 0, message.meta.length) : options.bytes === Array ? Array.prototype.slice.call(message.meta) : message.meta;
                if (options.oneofs)
                    object._meta = "meta";
            }
            if (message.connectionSettings != null && Object.hasOwnProperty.call(message, "connectionSettings")) {
                object.connectionSettings = options.bytes === String ? $util.base64.encode(message.connectionSettings, 0, message.connectionSettings.length) : options.bytes === Array ? Array.prototype.slice.call(message.connectionSettings) : message.connectionSettings;
                if (options.oneofs)
                    object._connectionSettings = "connectionSettings";
            }
            if (message.connectUsers != null && Object.hasOwnProperty.call(message, "connectUsers")) {
                object.connectUsers = $root.PAM.UidList.toObject(message.connectUsers, options, q + 1);
                if (options.oneofs)
                    object._connectUsers = "connectUsers";
            }
            if (message.domainUid != null && Object.hasOwnProperty.call(message, "domainUid")) {
                object.domainUid = options.bytes === String ? $util.base64.encode(message.domainUid, 0, message.domainUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.domainUid) : message.domainUid;
                if (options.oneofs)
                    object._domainUid = "domainUid";
            }
            if (message.jitSettings != null && Object.hasOwnProperty.call(message, "jitSettings")) {
                object.jitSettings = options.bytes === String ? $util.base64.encode(message.jitSettings, 0, message.jitSettings.length) : options.bytes === Array ? Array.prototype.slice.call(message.jitSettings) : message.jitSettings;
                if (options.oneofs)
                    object._jitSettings = "jitSettings";
            }
            if (message.keeperAiSettings != null && Object.hasOwnProperty.call(message, "keeperAiSettings")) {
                object.keeperAiSettings = options.bytes === String ? $util.base64.encode(message.keeperAiSettings, 0, message.keeperAiSettings.length) : options.bytes === Array ? Array.prototype.slice.call(message.keeperAiSettings) : message.keeperAiSettings;
                if (options.oneofs)
                    object._keeperAiSettings = "keeperAiSettings";
            }
            if (message.updateServices != null && Object.hasOwnProperty.call(message, "updateServices")) {
                object.updateServices = message.updateServices;
                if (options.oneofs)
                    object._updateServices = "updateServices";
            }
            return object;
        };

        /**
         * Converts this PAMResourceConfig to JSON.
         * @function toJSON
         * @memberof PAM.PAMResourceConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMResourceConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMResourceConfig
         * @function getTypeUrl
         * @memberof PAM.PAMResourceConfig
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMResourceConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMResourceConfig";
        };

        return PAMResourceConfig;
    })();

    PAM.PAMUniversalSyncFolder = (function() {

        /**
         * Properties of a PAMUniversalSyncFolder.
         * @memberof PAM
         * @interface IPAMUniversalSyncFolder
         * @property {Uint8Array|null} [uid] PAMUniversalSyncFolder uid
         */

        /**
         * Constructs a new PAMUniversalSyncFolder.
         * @memberof PAM
         * @classdesc Represents a PAMUniversalSyncFolder.
         * @implements IPAMUniversalSyncFolder
         * @constructor
         * @param {PAM.IPAMUniversalSyncFolder=} [properties] Properties to set
         */
        function PAMUniversalSyncFolder(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMUniversalSyncFolder uid.
         * @member {Uint8Array} uid
         * @memberof PAM.PAMUniversalSyncFolder
         * @instance
         */
        PAMUniversalSyncFolder.prototype.uid = $util.newBuffer([]);

        /**
         * Creates a new PAMUniversalSyncFolder instance using the specified properties.
         * @function create
         * @memberof PAM.PAMUniversalSyncFolder
         * @static
         * @param {PAM.IPAMUniversalSyncFolder=} [properties] Properties to set
         * @returns {PAM.PAMUniversalSyncFolder} PAMUniversalSyncFolder instance
         */
        PAMUniversalSyncFolder.create = function create(properties) {
            return new PAMUniversalSyncFolder(properties);
        };

        /**
         * Encodes the specified PAMUniversalSyncFolder message. Does not implicitly {@link PAM.PAMUniversalSyncFolder.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMUniversalSyncFolder
         * @static
         * @param {PAM.IPAMUniversalSyncFolder} message PAMUniversalSyncFolder message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMUniversalSyncFolder.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.uid);
            return writer;
        };

        /**
         * Decodes a PAMUniversalSyncFolder message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMUniversalSyncFolder
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMUniversalSyncFolder} PAMUniversalSyncFolder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMUniversalSyncFolder.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMUniversalSyncFolder();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.uid = reader.bytes();
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
         * Creates a PAMUniversalSyncFolder message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMUniversalSyncFolder
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMUniversalSyncFolder} PAMUniversalSyncFolder
         */
        PAMUniversalSyncFolder.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMUniversalSyncFolder)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMUniversalSyncFolder: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMUniversalSyncFolder();
            if (object.uid != null)
                if (typeof object.uid === "string")
                    $util.base64.decode(object.uid, message.uid = $util.newBuffer($util.base64.length(object.uid)), 0);
                else if (object.uid.length >= 0)
                    message.uid = object.uid;
            return message;
        };

        /**
         * Creates a plain object from a PAMUniversalSyncFolder message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMUniversalSyncFolder
         * @static
         * @param {PAM.PAMUniversalSyncFolder} message PAMUniversalSyncFolder
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMUniversalSyncFolder.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.uid = "";
                else {
                    object.uid = [];
                    if (options.bytes !== Array)
                        object.uid = $util.newBuffer(object.uid);
                }
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                object.uid = options.bytes === String ? $util.base64.encode(message.uid, 0, message.uid.length) : options.bytes === Array ? Array.prototype.slice.call(message.uid) : message.uid;
            return object;
        };

        /**
         * Converts this PAMUniversalSyncFolder to JSON.
         * @function toJSON
         * @memberof PAM.PAMUniversalSyncFolder
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMUniversalSyncFolder.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMUniversalSyncFolder
         * @function getTypeUrl
         * @memberof PAM.PAMUniversalSyncFolder
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMUniversalSyncFolder.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMUniversalSyncFolder";
        };

        return PAMUniversalSyncFolder;
    })();

    PAM.PAMUniversalSyncConfig = (function() {

        /**
         * Properties of a PAMUniversalSyncConfig.
         * @memberof PAM
         * @interface IPAMUniversalSyncConfig
         * @property {Uint8Array|null} [networkUid] PAMUniversalSyncConfig networkUid
         * @property {boolean|null} [enabled] PAMUniversalSyncConfig enabled
         * @property {boolean|null} [dryRunEnabled] PAMUniversalSyncConfig dryRunEnabled
         * @property {Array.<PAM.IPAMUniversalSyncFolder>|null} [folders] PAMUniversalSyncConfig folders
         * @property {Uint8Array|null} [syncIdentity] PAMUniversalSyncConfig syncIdentity
         * @property {Uint8Array|null} [vaultName] PAMUniversalSyncConfig vaultName
         */

        /**
         * Constructs a new PAMUniversalSyncConfig.
         * @memberof PAM
         * @classdesc Represents a PAMUniversalSyncConfig.
         * @implements IPAMUniversalSyncConfig
         * @constructor
         * @param {PAM.IPAMUniversalSyncConfig=} [properties] Properties to set
         */
        function PAMUniversalSyncConfig(properties) {
            this.folders = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMUniversalSyncConfig networkUid.
         * @member {Uint8Array} networkUid
         * @memberof PAM.PAMUniversalSyncConfig
         * @instance
         */
        PAMUniversalSyncConfig.prototype.networkUid = $util.newBuffer([]);

        /**
         * PAMUniversalSyncConfig enabled.
         * @member {boolean|null|undefined} enabled
         * @memberof PAM.PAMUniversalSyncConfig
         * @instance
         */
        PAMUniversalSyncConfig.prototype.enabled = null;

        /**
         * PAMUniversalSyncConfig dryRunEnabled.
         * @member {boolean|null|undefined} dryRunEnabled
         * @memberof PAM.PAMUniversalSyncConfig
         * @instance
         */
        PAMUniversalSyncConfig.prototype.dryRunEnabled = null;

        /**
         * PAMUniversalSyncConfig folders.
         * @member {Array.<PAM.IPAMUniversalSyncFolder>} folders
         * @memberof PAM.PAMUniversalSyncConfig
         * @instance
         */
        PAMUniversalSyncConfig.prototype.folders = $util.emptyArray;

        /**
         * PAMUniversalSyncConfig syncIdentity.
         * @member {Uint8Array|null|undefined} syncIdentity
         * @memberof PAM.PAMUniversalSyncConfig
         * @instance
         */
        PAMUniversalSyncConfig.prototype.syncIdentity = null;

        /**
         * PAMUniversalSyncConfig vaultName.
         * @member {Uint8Array|null|undefined} vaultName
         * @memberof PAM.PAMUniversalSyncConfig
         * @instance
         */
        PAMUniversalSyncConfig.prototype.vaultName = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMUniversalSyncConfig.prototype, "_enabled", {
            get: $util.oneOfGetter($oneOfFields = ["enabled"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMUniversalSyncConfig.prototype, "_dryRunEnabled", {
            get: $util.oneOfGetter($oneOfFields = ["dryRunEnabled"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMUniversalSyncConfig.prototype, "_syncIdentity", {
            get: $util.oneOfGetter($oneOfFields = ["syncIdentity"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMUniversalSyncConfig.prototype, "_vaultName", {
            get: $util.oneOfGetter($oneOfFields = ["vaultName"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new PAMUniversalSyncConfig instance using the specified properties.
         * @function create
         * @memberof PAM.PAMUniversalSyncConfig
         * @static
         * @param {PAM.IPAMUniversalSyncConfig=} [properties] Properties to set
         * @returns {PAM.PAMUniversalSyncConfig} PAMUniversalSyncConfig instance
         */
        PAMUniversalSyncConfig.create = function create(properties) {
            return new PAMUniversalSyncConfig(properties);
        };

        /**
         * Encodes the specified PAMUniversalSyncConfig message. Does not implicitly {@link PAM.PAMUniversalSyncConfig.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMUniversalSyncConfig
         * @static
         * @param {PAM.IPAMUniversalSyncConfig} message PAMUniversalSyncConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMUniversalSyncConfig.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.networkUid != null && Object.hasOwnProperty.call(message, "networkUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.networkUid);
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.enabled);
            if (message.dryRunEnabled != null && Object.hasOwnProperty.call(message, "dryRunEnabled"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.dryRunEnabled);
            if (message.folders != null && message.folders.length)
                for (let i = 0; i < message.folders.length; ++i)
                    $root.PAM.PAMUniversalSyncFolder.encode(message.folders[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.syncIdentity != null && Object.hasOwnProperty.call(message, "syncIdentity"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.syncIdentity);
            if (message.vaultName != null && Object.hasOwnProperty.call(message, "vaultName"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.vaultName);
            return writer;
        };

        /**
         * Decodes a PAMUniversalSyncConfig message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMUniversalSyncConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMUniversalSyncConfig} PAMUniversalSyncConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMUniversalSyncConfig.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMUniversalSyncConfig();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.networkUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.enabled = reader.bool();
                        break;
                    }
                case 3: {
                        message.dryRunEnabled = reader.bool();
                        break;
                    }
                case 4: {
                        if (!(message.folders && message.folders.length))
                            message.folders = [];
                        message.folders.push($root.PAM.PAMUniversalSyncFolder.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 5: {
                        message.syncIdentity = reader.bytes();
                        break;
                    }
                case 6: {
                        message.vaultName = reader.bytes();
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
         * Creates a PAMUniversalSyncConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMUniversalSyncConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMUniversalSyncConfig} PAMUniversalSyncConfig
         */
        PAMUniversalSyncConfig.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMUniversalSyncConfig)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMUniversalSyncConfig: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMUniversalSyncConfig();
            if (object.networkUid != null)
                if (typeof object.networkUid === "string")
                    $util.base64.decode(object.networkUid, message.networkUid = $util.newBuffer($util.base64.length(object.networkUid)), 0);
                else if (object.networkUid.length >= 0)
                    message.networkUid = object.networkUid;
            if (object.enabled != null)
                message.enabled = Boolean(object.enabled);
            if (object.dryRunEnabled != null)
                message.dryRunEnabled = Boolean(object.dryRunEnabled);
            if (object.folders) {
                if (!Array.isArray(object.folders))
                    throw TypeError(".PAM.PAMUniversalSyncConfig.folders: array expected");
                message.folders = [];
                for (let i = 0; i < object.folders.length; ++i) {
                    if (!$util.isObject(object.folders[i]))
                        throw TypeError(".PAM.PAMUniversalSyncConfig.folders: object expected");
                    message.folders[i] = $root.PAM.PAMUniversalSyncFolder.fromObject(object.folders[i], long + 1);
                }
            }
            if (object.syncIdentity != null)
                if (typeof object.syncIdentity === "string")
                    $util.base64.decode(object.syncIdentity, message.syncIdentity = $util.newBuffer($util.base64.length(object.syncIdentity)), 0);
                else if (object.syncIdentity.length >= 0)
                    message.syncIdentity = object.syncIdentity;
            if (object.vaultName != null)
                if (typeof object.vaultName === "string")
                    $util.base64.decode(object.vaultName, message.vaultName = $util.newBuffer($util.base64.length(object.vaultName)), 0);
                else if (object.vaultName.length >= 0)
                    message.vaultName = object.vaultName;
            return message;
        };

        /**
         * Creates a plain object from a PAMUniversalSyncConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMUniversalSyncConfig
         * @static
         * @param {PAM.PAMUniversalSyncConfig} message PAMUniversalSyncConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMUniversalSyncConfig.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.folders = [];
            if (options.defaults)
                if (options.bytes === String)
                    object.networkUid = "";
                else {
                    object.networkUid = [];
                    if (options.bytes !== Array)
                        object.networkUid = $util.newBuffer(object.networkUid);
                }
            if (message.networkUid != null && Object.hasOwnProperty.call(message, "networkUid"))
                object.networkUid = options.bytes === String ? $util.base64.encode(message.networkUid, 0, message.networkUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.networkUid) : message.networkUid;
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled")) {
                object.enabled = message.enabled;
                if (options.oneofs)
                    object._enabled = "enabled";
            }
            if (message.dryRunEnabled != null && Object.hasOwnProperty.call(message, "dryRunEnabled")) {
                object.dryRunEnabled = message.dryRunEnabled;
                if (options.oneofs)
                    object._dryRunEnabled = "dryRunEnabled";
            }
            if (message.folders && message.folders.length) {
                object.folders = [];
                for (let j = 0; j < message.folders.length; ++j)
                    object.folders[j] = $root.PAM.PAMUniversalSyncFolder.toObject(message.folders[j], options, q + 1);
            }
            if (message.syncIdentity != null && Object.hasOwnProperty.call(message, "syncIdentity")) {
                object.syncIdentity = options.bytes === String ? $util.base64.encode(message.syncIdentity, 0, message.syncIdentity.length) : options.bytes === Array ? Array.prototype.slice.call(message.syncIdentity) : message.syncIdentity;
                if (options.oneofs)
                    object._syncIdentity = "syncIdentity";
            }
            if (message.vaultName != null && Object.hasOwnProperty.call(message, "vaultName")) {
                object.vaultName = options.bytes === String ? $util.base64.encode(message.vaultName, 0, message.vaultName.length) : options.bytes === Array ? Array.prototype.slice.call(message.vaultName) : message.vaultName;
                if (options.oneofs)
                    object._vaultName = "vaultName";
            }
            return object;
        };

        /**
         * Converts this PAMUniversalSyncConfig to JSON.
         * @function toJSON
         * @memberof PAM.PAMUniversalSyncConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMUniversalSyncConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMUniversalSyncConfig
         * @function getTypeUrl
         * @memberof PAM.PAMUniversalSyncConfig
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMUniversalSyncConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMUniversalSyncConfig";
        };

        return PAMUniversalSyncConfig;
    })();

    PAM.NhiMetricsRequest = (function() {

        /**
         * Properties of a NhiMetricsRequest.
         * @memberof PAM
         * @interface INhiMetricsRequest
         * @property {number|null} [startTime] NhiMetricsRequest startTime
         * @property {number|null} [endTime] NhiMetricsRequest endTime
         */

        /**
         * Constructs a new NhiMetricsRequest.
         * @memberof PAM
         * @classdesc Represents a NhiMetricsRequest.
         * @implements INhiMetricsRequest
         * @constructor
         * @param {PAM.INhiMetricsRequest=} [properties] Properties to set
         */
        function NhiMetricsRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NhiMetricsRequest startTime.
         * @member {number} startTime
         * @memberof PAM.NhiMetricsRequest
         * @instance
         */
        NhiMetricsRequest.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NhiMetricsRequest endTime.
         * @member {number} endTime
         * @memberof PAM.NhiMetricsRequest
         * @instance
         */
        NhiMetricsRequest.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new NhiMetricsRequest instance using the specified properties.
         * @function create
         * @memberof PAM.NhiMetricsRequest
         * @static
         * @param {PAM.INhiMetricsRequest=} [properties] Properties to set
         * @returns {PAM.NhiMetricsRequest} NhiMetricsRequest instance
         */
        NhiMetricsRequest.create = function create(properties) {
            return new NhiMetricsRequest(properties);
        };

        /**
         * Encodes the specified NhiMetricsRequest message. Does not implicitly {@link PAM.NhiMetricsRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.NhiMetricsRequest
         * @static
         * @param {PAM.INhiMetricsRequest} message NhiMetricsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NhiMetricsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.startTime);
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.endTime);
            return writer;
        };

        /**
         * Decodes a NhiMetricsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.NhiMetricsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.NhiMetricsRequest} NhiMetricsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NhiMetricsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.NhiMetricsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.startTime = reader.int64();
                        break;
                    }
                case 2: {
                        message.endTime = reader.int64();
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
         * Creates a NhiMetricsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.NhiMetricsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.NhiMetricsRequest} NhiMetricsRequest
         */
        NhiMetricsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.NhiMetricsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.NhiMetricsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.NhiMetricsRequest();
            if (object.startTime != null)
                if ($util.Long)
                    message.startTime = $util.Long.fromValue(object.startTime, false);
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
            if (object.endTime != null)
                if ($util.Long)
                    message.endTime = $util.Long.fromValue(object.endTime, false);
                else if (typeof object.endTime === "string")
                    message.endTime = parseInt(object.endTime, 10);
                else if (typeof object.endTime === "number")
                    message.endTime = object.endTime;
                else if (typeof object.endTime === "object")
                    message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a NhiMetricsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.NhiMetricsRequest
         * @static
         * @param {PAM.NhiMetricsRequest} message NhiMetricsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NhiMetricsRequest.toObject = function toObject(message, options, q) {
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
                    object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.startTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.endTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.endTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.startTime = typeof message.startTime === "number" ? BigInt(message.startTime) : $util.Long.fromBits(message.startTime.low >>> 0, message.startTime.high >>> 0, false).toBigInt();
                else if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.endTime = typeof message.endTime === "number" ? BigInt(message.endTime) : $util.Long.fromBits(message.endTime.low >>> 0, message.endTime.high >>> 0, false).toBigInt();
                else if (typeof message.endTime === "number")
                    object.endTime = options.longs === String ? String(message.endTime) : message.endTime;
                else
                    object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber() : message.endTime;
            return object;
        };

        /**
         * Converts this NhiMetricsRequest to JSON.
         * @function toJSON
         * @memberof PAM.NhiMetricsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NhiMetricsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NhiMetricsRequest
         * @function getTypeUrl
         * @memberof PAM.NhiMetricsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NhiMetricsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.NhiMetricsRequest";
        };

        return NhiMetricsRequest;
    })();

    PAM.PamUsageByUser = (function() {

        /**
         * Properties of a PamUsageByUser.
         * @memberof PAM
         * @interface IPamUsageByUser
         * @property {number|null} [userId] PamUsageByUser userId
         * @property {number|null} [recordRotationScheduledOk] PamUsageByUser recordRotationScheduledOk
         * @property {number|null} [pamConnectionStarted] PamUsageByUser pamConnectionStarted
         * @property {number|null} [pamTunnelStarted] PamUsageByUser pamTunnelStarted
         * @property {number|null} [discoveryJobStarted] PamUsageByUser discoveryJobStarted
         * @property {number|null} [recordRotationOnDemandOk] PamUsageByUser recordRotationOnDemandOk
         * @property {number|null} [pamSessionRecordingStarted] PamUsageByUser pamSessionRecordingStarted
         * @property {number|null} [pamRbiStarted] PamUsageByUser pamRbiStarted
         * @property {number|null} [pamSessionRbiRecordingStarted] PamUsageByUser pamSessionRbiRecordingStarted
         */

        /**
         * Constructs a new PamUsageByUser.
         * @memberof PAM
         * @classdesc Represents a PamUsageByUser.
         * @implements IPamUsageByUser
         * @constructor
         * @param {PAM.IPamUsageByUser=} [properties] Properties to set
         */
        function PamUsageByUser(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PamUsageByUser userId.
         * @member {number} userId
         * @memberof PAM.PamUsageByUser
         * @instance
         */
        PamUsageByUser.prototype.userId = 0;

        /**
         * PamUsageByUser recordRotationScheduledOk.
         * @member {number} recordRotationScheduledOk
         * @memberof PAM.PamUsageByUser
         * @instance
         */
        PamUsageByUser.prototype.recordRotationScheduledOk = 0;

        /**
         * PamUsageByUser pamConnectionStarted.
         * @member {number} pamConnectionStarted
         * @memberof PAM.PamUsageByUser
         * @instance
         */
        PamUsageByUser.prototype.pamConnectionStarted = 0;

        /**
         * PamUsageByUser pamTunnelStarted.
         * @member {number} pamTunnelStarted
         * @memberof PAM.PamUsageByUser
         * @instance
         */
        PamUsageByUser.prototype.pamTunnelStarted = 0;

        /**
         * PamUsageByUser discoveryJobStarted.
         * @member {number} discoveryJobStarted
         * @memberof PAM.PamUsageByUser
         * @instance
         */
        PamUsageByUser.prototype.discoveryJobStarted = 0;

        /**
         * PamUsageByUser recordRotationOnDemandOk.
         * @member {number} recordRotationOnDemandOk
         * @memberof PAM.PamUsageByUser
         * @instance
         */
        PamUsageByUser.prototype.recordRotationOnDemandOk = 0;

        /**
         * PamUsageByUser pamSessionRecordingStarted.
         * @member {number} pamSessionRecordingStarted
         * @memberof PAM.PamUsageByUser
         * @instance
         */
        PamUsageByUser.prototype.pamSessionRecordingStarted = 0;

        /**
         * PamUsageByUser pamRbiStarted.
         * @member {number} pamRbiStarted
         * @memberof PAM.PamUsageByUser
         * @instance
         */
        PamUsageByUser.prototype.pamRbiStarted = 0;

        /**
         * PamUsageByUser pamSessionRbiRecordingStarted.
         * @member {number} pamSessionRbiRecordingStarted
         * @memberof PAM.PamUsageByUser
         * @instance
         */
        PamUsageByUser.prototype.pamSessionRbiRecordingStarted = 0;

        /**
         * Creates a new PamUsageByUser instance using the specified properties.
         * @function create
         * @memberof PAM.PamUsageByUser
         * @static
         * @param {PAM.IPamUsageByUser=} [properties] Properties to set
         * @returns {PAM.PamUsageByUser} PamUsageByUser instance
         */
        PamUsageByUser.create = function create(properties) {
            return new PamUsageByUser(properties);
        };

        /**
         * Encodes the specified PamUsageByUser message. Does not implicitly {@link PAM.PamUsageByUser.verify|verify} messages.
         * @function encode
         * @memberof PAM.PamUsageByUser
         * @static
         * @param {PAM.IPamUsageByUser} message PamUsageByUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PamUsageByUser.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.recordRotationScheduledOk != null && Object.hasOwnProperty.call(message, "recordRotationScheduledOk"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.recordRotationScheduledOk);
            if (message.pamConnectionStarted != null && Object.hasOwnProperty.call(message, "pamConnectionStarted"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.pamConnectionStarted);
            if (message.pamTunnelStarted != null && Object.hasOwnProperty.call(message, "pamTunnelStarted"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.pamTunnelStarted);
            if (message.discoveryJobStarted != null && Object.hasOwnProperty.call(message, "discoveryJobStarted"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.discoveryJobStarted);
            if (message.recordRotationOnDemandOk != null && Object.hasOwnProperty.call(message, "recordRotationOnDemandOk"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.recordRotationOnDemandOk);
            if (message.pamSessionRecordingStarted != null && Object.hasOwnProperty.call(message, "pamSessionRecordingStarted"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.pamSessionRecordingStarted);
            if (message.pamRbiStarted != null && Object.hasOwnProperty.call(message, "pamRbiStarted"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.pamRbiStarted);
            if (message.pamSessionRbiRecordingStarted != null && Object.hasOwnProperty.call(message, "pamSessionRbiRecordingStarted"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.pamSessionRbiRecordingStarted);
            return writer;
        };

        /**
         * Decodes a PamUsageByUser message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PamUsageByUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PamUsageByUser} PamUsageByUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PamUsageByUser.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PamUsageByUser();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                case 2: {
                        message.recordRotationScheduledOk = reader.int32();
                        break;
                    }
                case 3: {
                        message.pamConnectionStarted = reader.int32();
                        break;
                    }
                case 4: {
                        message.pamTunnelStarted = reader.int32();
                        break;
                    }
                case 5: {
                        message.discoveryJobStarted = reader.int32();
                        break;
                    }
                case 6: {
                        message.recordRotationOnDemandOk = reader.int32();
                        break;
                    }
                case 7: {
                        message.pamSessionRecordingStarted = reader.int32();
                        break;
                    }
                case 8: {
                        message.pamRbiStarted = reader.int32();
                        break;
                    }
                case 9: {
                        message.pamSessionRbiRecordingStarted = reader.int32();
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
         * Creates a PamUsageByUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PamUsageByUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PamUsageByUser} PamUsageByUser
         */
        PamUsageByUser.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PamUsageByUser)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PamUsageByUser: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PamUsageByUser();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.recordRotationScheduledOk != null)
                message.recordRotationScheduledOk = object.recordRotationScheduledOk | 0;
            if (object.pamConnectionStarted != null)
                message.pamConnectionStarted = object.pamConnectionStarted | 0;
            if (object.pamTunnelStarted != null)
                message.pamTunnelStarted = object.pamTunnelStarted | 0;
            if (object.discoveryJobStarted != null)
                message.discoveryJobStarted = object.discoveryJobStarted | 0;
            if (object.recordRotationOnDemandOk != null)
                message.recordRotationOnDemandOk = object.recordRotationOnDemandOk | 0;
            if (object.pamSessionRecordingStarted != null)
                message.pamSessionRecordingStarted = object.pamSessionRecordingStarted | 0;
            if (object.pamRbiStarted != null)
                message.pamRbiStarted = object.pamRbiStarted | 0;
            if (object.pamSessionRbiRecordingStarted != null)
                message.pamSessionRbiRecordingStarted = object.pamSessionRbiRecordingStarted | 0;
            return message;
        };

        /**
         * Creates a plain object from a PamUsageByUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PamUsageByUser
         * @static
         * @param {PAM.PamUsageByUser} message PamUsageByUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PamUsageByUser.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                object.recordRotationScheduledOk = 0;
                object.pamConnectionStarted = 0;
                object.pamTunnelStarted = 0;
                object.discoveryJobStarted = 0;
                object.recordRotationOnDemandOk = 0;
                object.pamSessionRecordingStarted = 0;
                object.pamRbiStarted = 0;
                object.pamSessionRbiRecordingStarted = 0;
            }
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                object.userId = message.userId;
            if (message.recordRotationScheduledOk != null && Object.hasOwnProperty.call(message, "recordRotationScheduledOk"))
                object.recordRotationScheduledOk = message.recordRotationScheduledOk;
            if (message.pamConnectionStarted != null && Object.hasOwnProperty.call(message, "pamConnectionStarted"))
                object.pamConnectionStarted = message.pamConnectionStarted;
            if (message.pamTunnelStarted != null && Object.hasOwnProperty.call(message, "pamTunnelStarted"))
                object.pamTunnelStarted = message.pamTunnelStarted;
            if (message.discoveryJobStarted != null && Object.hasOwnProperty.call(message, "discoveryJobStarted"))
                object.discoveryJobStarted = message.discoveryJobStarted;
            if (message.recordRotationOnDemandOk != null && Object.hasOwnProperty.call(message, "recordRotationOnDemandOk"))
                object.recordRotationOnDemandOk = message.recordRotationOnDemandOk;
            if (message.pamSessionRecordingStarted != null && Object.hasOwnProperty.call(message, "pamSessionRecordingStarted"))
                object.pamSessionRecordingStarted = message.pamSessionRecordingStarted;
            if (message.pamRbiStarted != null && Object.hasOwnProperty.call(message, "pamRbiStarted"))
                object.pamRbiStarted = message.pamRbiStarted;
            if (message.pamSessionRbiRecordingStarted != null && Object.hasOwnProperty.call(message, "pamSessionRbiRecordingStarted"))
                object.pamSessionRbiRecordingStarted = message.pamSessionRbiRecordingStarted;
            return object;
        };

        /**
         * Converts this PamUsageByUser to JSON.
         * @function toJSON
         * @memberof PAM.PamUsageByUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PamUsageByUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PamUsageByUser
         * @function getTypeUrl
         * @memberof PAM.PamUsageByUser
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PamUsageByUser.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PamUsageByUser";
        };

        return PamUsageByUser;
    })();

    PAM.NhiUsageByUser = (function() {

        /**
         * Properties of a NhiUsageByUser.
         * @memberof PAM
         * @interface INhiUsageByUser
         * @property {number|null} [userId] NhiUsageByUser userId
         * @property {number|null} [rotations] NhiUsageByUser rotations
         * @property {number|null} [tunnels] NhiUsageByUser tunnels
         * @property {number|null} [connections] NhiUsageByUser connections
         * @property {number|null} [discoveryJobs] NhiUsageByUser discoveryJobs
         */

        /**
         * Constructs a new NhiUsageByUser.
         * @memberof PAM
         * @classdesc Represents a NhiUsageByUser.
         * @implements INhiUsageByUser
         * @constructor
         * @param {PAM.INhiUsageByUser=} [properties] Properties to set
         */
        function NhiUsageByUser(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NhiUsageByUser userId.
         * @member {number} userId
         * @memberof PAM.NhiUsageByUser
         * @instance
         */
        NhiUsageByUser.prototype.userId = 0;

        /**
         * NhiUsageByUser rotations.
         * @member {number} rotations
         * @memberof PAM.NhiUsageByUser
         * @instance
         */
        NhiUsageByUser.prototype.rotations = 0;

        /**
         * NhiUsageByUser tunnels.
         * @member {number} tunnels
         * @memberof PAM.NhiUsageByUser
         * @instance
         */
        NhiUsageByUser.prototype.tunnels = 0;

        /**
         * NhiUsageByUser connections.
         * @member {number} connections
         * @memberof PAM.NhiUsageByUser
         * @instance
         */
        NhiUsageByUser.prototype.connections = 0;

        /**
         * NhiUsageByUser discoveryJobs.
         * @member {number} discoveryJobs
         * @memberof PAM.NhiUsageByUser
         * @instance
         */
        NhiUsageByUser.prototype.discoveryJobs = 0;

        /**
         * Creates a new NhiUsageByUser instance using the specified properties.
         * @function create
         * @memberof PAM.NhiUsageByUser
         * @static
         * @param {PAM.INhiUsageByUser=} [properties] Properties to set
         * @returns {PAM.NhiUsageByUser} NhiUsageByUser instance
         */
        NhiUsageByUser.create = function create(properties) {
            return new NhiUsageByUser(properties);
        };

        /**
         * Encodes the specified NhiUsageByUser message. Does not implicitly {@link PAM.NhiUsageByUser.verify|verify} messages.
         * @function encode
         * @memberof PAM.NhiUsageByUser
         * @static
         * @param {PAM.INhiUsageByUser} message NhiUsageByUser message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NhiUsageByUser.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.rotations != null && Object.hasOwnProperty.call(message, "rotations"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rotations);
            if (message.tunnels != null && Object.hasOwnProperty.call(message, "tunnels"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.tunnels);
            if (message.connections != null && Object.hasOwnProperty.call(message, "connections"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.connections);
            if (message.discoveryJobs != null && Object.hasOwnProperty.call(message, "discoveryJobs"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.discoveryJobs);
            return writer;
        };

        /**
         * Decodes a NhiUsageByUser message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.NhiUsageByUser
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.NhiUsageByUser} NhiUsageByUser
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NhiUsageByUser.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.NhiUsageByUser();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int32();
                        break;
                    }
                case 2: {
                        message.rotations = reader.int32();
                        break;
                    }
                case 3: {
                        message.tunnels = reader.int32();
                        break;
                    }
                case 4: {
                        message.connections = reader.int32();
                        break;
                    }
                case 5: {
                        message.discoveryJobs = reader.int32();
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
         * Creates a NhiUsageByUser message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.NhiUsageByUser
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.NhiUsageByUser} NhiUsageByUser
         */
        NhiUsageByUser.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.NhiUsageByUser)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.NhiUsageByUser: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.NhiUsageByUser();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.rotations != null)
                message.rotations = object.rotations | 0;
            if (object.tunnels != null)
                message.tunnels = object.tunnels | 0;
            if (object.connections != null)
                message.connections = object.connections | 0;
            if (object.discoveryJobs != null)
                message.discoveryJobs = object.discoveryJobs | 0;
            return message;
        };

        /**
         * Creates a plain object from a NhiUsageByUser message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.NhiUsageByUser
         * @static
         * @param {PAM.NhiUsageByUser} message NhiUsageByUser
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NhiUsageByUser.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                object.rotations = 0;
                object.tunnels = 0;
                object.connections = 0;
                object.discoveryJobs = 0;
            }
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                object.userId = message.userId;
            if (message.rotations != null && Object.hasOwnProperty.call(message, "rotations"))
                object.rotations = message.rotations;
            if (message.tunnels != null && Object.hasOwnProperty.call(message, "tunnels"))
                object.tunnels = message.tunnels;
            if (message.connections != null && Object.hasOwnProperty.call(message, "connections"))
                object.connections = message.connections;
            if (message.discoveryJobs != null && Object.hasOwnProperty.call(message, "discoveryJobs"))
                object.discoveryJobs = message.discoveryJobs;
            return object;
        };

        /**
         * Converts this NhiUsageByUser to JSON.
         * @function toJSON
         * @memberof PAM.NhiUsageByUser
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NhiUsageByUser.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NhiUsageByUser
         * @function getTypeUrl
         * @memberof PAM.NhiUsageByUser
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NhiUsageByUser.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.NhiUsageByUser";
        };

        return NhiUsageByUser;
    })();

    PAM.NhiMetricsResponse = (function() {

        /**
         * Properties of a NhiMetricsResponse.
         * @memberof PAM
         * @interface INhiMetricsResponse
         * @property {number|null} [enterpriseId] NhiMetricsResponse enterpriseId
         * @property {number|null} [startTime] NhiMetricsResponse startTime
         * @property {number|null} [endTime] NhiMetricsResponse endTime
         * @property {number|null} [uniqueKsmDevices] NhiMetricsResponse uniqueKsmDevices
         * @property {number|null} [pamGatewayOnline] NhiMetricsResponse pamGatewayOnline
         * @property {Array.<PAM.IPamUsageByUser>|null} [pamUsageByUser] NhiMetricsResponse pamUsageByUser
         * @property {number|null} [nhiCount] NhiMetricsResponse nhiCount
         * @property {number|null} [ksmNhiCount] NhiMetricsResponse ksmNhiCount
         * @property {Array.<PAM.INhiUsageByUser>|null} [usageByUser] NhiMetricsResponse usageByUser
         */

        /**
         * Constructs a new NhiMetricsResponse.
         * @memberof PAM
         * @classdesc Represents a NhiMetricsResponse.
         * @implements INhiMetricsResponse
         * @constructor
         * @param {PAM.INhiMetricsResponse=} [properties] Properties to set
         */
        function NhiMetricsResponse(properties) {
            this.pamUsageByUser = [];
            this.usageByUser = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NhiMetricsResponse enterpriseId.
         * @member {number} enterpriseId
         * @memberof PAM.NhiMetricsResponse
         * @instance
         */
        NhiMetricsResponse.prototype.enterpriseId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NhiMetricsResponse startTime.
         * @member {number} startTime
         * @memberof PAM.NhiMetricsResponse
         * @instance
         */
        NhiMetricsResponse.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NhiMetricsResponse endTime.
         * @member {number} endTime
         * @memberof PAM.NhiMetricsResponse
         * @instance
         */
        NhiMetricsResponse.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NhiMetricsResponse uniqueKsmDevices.
         * @member {number} uniqueKsmDevices
         * @memberof PAM.NhiMetricsResponse
         * @instance
         */
        NhiMetricsResponse.prototype.uniqueKsmDevices = 0;

        /**
         * NhiMetricsResponse pamGatewayOnline.
         * @member {number} pamGatewayOnline
         * @memberof PAM.NhiMetricsResponse
         * @instance
         */
        NhiMetricsResponse.prototype.pamGatewayOnline = 0;

        /**
         * NhiMetricsResponse pamUsageByUser.
         * @member {Array.<PAM.IPamUsageByUser>} pamUsageByUser
         * @memberof PAM.NhiMetricsResponse
         * @instance
         */
        NhiMetricsResponse.prototype.pamUsageByUser = $util.emptyArray;

        /**
         * NhiMetricsResponse nhiCount.
         * @member {number} nhiCount
         * @memberof PAM.NhiMetricsResponse
         * @instance
         */
        NhiMetricsResponse.prototype.nhiCount = 0;

        /**
         * NhiMetricsResponse ksmNhiCount.
         * @member {number} ksmNhiCount
         * @memberof PAM.NhiMetricsResponse
         * @instance
         */
        NhiMetricsResponse.prototype.ksmNhiCount = 0;

        /**
         * NhiMetricsResponse usageByUser.
         * @member {Array.<PAM.INhiUsageByUser>} usageByUser
         * @memberof PAM.NhiMetricsResponse
         * @instance
         */
        NhiMetricsResponse.prototype.usageByUser = $util.emptyArray;

        /**
         * Creates a new NhiMetricsResponse instance using the specified properties.
         * @function create
         * @memberof PAM.NhiMetricsResponse
         * @static
         * @param {PAM.INhiMetricsResponse=} [properties] Properties to set
         * @returns {PAM.NhiMetricsResponse} NhiMetricsResponse instance
         */
        NhiMetricsResponse.create = function create(properties) {
            return new NhiMetricsResponse(properties);
        };

        /**
         * Encodes the specified NhiMetricsResponse message. Does not implicitly {@link PAM.NhiMetricsResponse.verify|verify} messages.
         * @function encode
         * @memberof PAM.NhiMetricsResponse
         * @static
         * @param {PAM.INhiMetricsResponse} message NhiMetricsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NhiMetricsResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.enterpriseId);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.startTime);
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.endTime);
            if (message.uniqueKsmDevices != null && Object.hasOwnProperty.call(message, "uniqueKsmDevices"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.uniqueKsmDevices);
            if (message.pamGatewayOnline != null && Object.hasOwnProperty.call(message, "pamGatewayOnline"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.pamGatewayOnline);
            if (message.pamUsageByUser != null && message.pamUsageByUser.length)
                for (let i = 0; i < message.pamUsageByUser.length; ++i)
                    $root.PAM.PamUsageByUser.encode(message.pamUsageByUser[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.nhiCount != null && Object.hasOwnProperty.call(message, "nhiCount"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.nhiCount);
            if (message.ksmNhiCount != null && Object.hasOwnProperty.call(message, "ksmNhiCount"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.ksmNhiCount);
            if (message.usageByUser != null && message.usageByUser.length)
                for (let i = 0; i < message.usageByUser.length; ++i)
                    $root.PAM.NhiUsageByUser.encode(message.usageByUser[i], writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a NhiMetricsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.NhiMetricsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.NhiMetricsResponse} NhiMetricsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NhiMetricsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.NhiMetricsResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.enterpriseId = reader.int64();
                        break;
                    }
                case 2: {
                        message.startTime = reader.int64();
                        break;
                    }
                case 3: {
                        message.endTime = reader.int64();
                        break;
                    }
                case 4: {
                        message.uniqueKsmDevices = reader.int32();
                        break;
                    }
                case 5: {
                        message.pamGatewayOnline = reader.int32();
                        break;
                    }
                case 6: {
                        if (!(message.pamUsageByUser && message.pamUsageByUser.length))
                            message.pamUsageByUser = [];
                        message.pamUsageByUser.push($root.PAM.PamUsageByUser.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        message.nhiCount = reader.int32();
                        break;
                    }
                case 8: {
                        message.ksmNhiCount = reader.int32();
                        break;
                    }
                case 9: {
                        if (!(message.usageByUser && message.usageByUser.length))
                            message.usageByUser = [];
                        message.usageByUser.push($root.PAM.NhiUsageByUser.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a NhiMetricsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.NhiMetricsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.NhiMetricsResponse} NhiMetricsResponse
         */
        NhiMetricsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.NhiMetricsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.NhiMetricsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.NhiMetricsResponse();
            if (object.enterpriseId != null)
                if ($util.Long)
                    message.enterpriseId = $util.Long.fromValue(object.enterpriseId, false);
                else if (typeof object.enterpriseId === "string")
                    message.enterpriseId = parseInt(object.enterpriseId, 10);
                else if (typeof object.enterpriseId === "number")
                    message.enterpriseId = object.enterpriseId;
                else if (typeof object.enterpriseId === "object")
                    message.enterpriseId = new $util.LongBits(object.enterpriseId.low >>> 0, object.enterpriseId.high >>> 0).toNumber();
            if (object.startTime != null)
                if ($util.Long)
                    message.startTime = $util.Long.fromValue(object.startTime, false);
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
            if (object.endTime != null)
                if ($util.Long)
                    message.endTime = $util.Long.fromValue(object.endTime, false);
                else if (typeof object.endTime === "string")
                    message.endTime = parseInt(object.endTime, 10);
                else if (typeof object.endTime === "number")
                    message.endTime = object.endTime;
                else if (typeof object.endTime === "object")
                    message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber();
            if (object.uniqueKsmDevices != null)
                message.uniqueKsmDevices = object.uniqueKsmDevices | 0;
            if (object.pamGatewayOnline != null)
                message.pamGatewayOnline = object.pamGatewayOnline | 0;
            if (object.pamUsageByUser) {
                if (!Array.isArray(object.pamUsageByUser))
                    throw TypeError(".PAM.NhiMetricsResponse.pamUsageByUser: array expected");
                message.pamUsageByUser = [];
                for (let i = 0; i < object.pamUsageByUser.length; ++i) {
                    if (!$util.isObject(object.pamUsageByUser[i]))
                        throw TypeError(".PAM.NhiMetricsResponse.pamUsageByUser: object expected");
                    message.pamUsageByUser[i] = $root.PAM.PamUsageByUser.fromObject(object.pamUsageByUser[i], long + 1);
                }
            }
            if (object.nhiCount != null)
                message.nhiCount = object.nhiCount | 0;
            if (object.ksmNhiCount != null)
                message.ksmNhiCount = object.ksmNhiCount | 0;
            if (object.usageByUser) {
                if (!Array.isArray(object.usageByUser))
                    throw TypeError(".PAM.NhiMetricsResponse.usageByUser: array expected");
                message.usageByUser = [];
                for (let i = 0; i < object.usageByUser.length; ++i) {
                    if (!$util.isObject(object.usageByUser[i]))
                        throw TypeError(".PAM.NhiMetricsResponse.usageByUser: object expected");
                    message.usageByUser[i] = $root.PAM.NhiUsageByUser.fromObject(object.usageByUser[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a NhiMetricsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.NhiMetricsResponse
         * @static
         * @param {PAM.NhiMetricsResponse} message NhiMetricsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NhiMetricsResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.pamUsageByUser = [];
                object.usageByUser = [];
            }
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.enterpriseId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.enterpriseId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.startTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.endTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.endTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.uniqueKsmDevices = 0;
                object.pamGatewayOnline = 0;
                object.nhiCount = 0;
                object.ksmNhiCount = 0;
            }
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.enterpriseId = typeof message.enterpriseId === "number" ? BigInt(message.enterpriseId) : $util.Long.fromBits(message.enterpriseId.low >>> 0, message.enterpriseId.high >>> 0, false).toBigInt();
                else if (typeof message.enterpriseId === "number")
                    object.enterpriseId = options.longs === String ? String(message.enterpriseId) : message.enterpriseId;
                else
                    object.enterpriseId = options.longs === String ? $util.Long.prototype.toString.call(message.enterpriseId) : options.longs === Number ? new $util.LongBits(message.enterpriseId.low >>> 0, message.enterpriseId.high >>> 0).toNumber() : message.enterpriseId;
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.startTime = typeof message.startTime === "number" ? BigInt(message.startTime) : $util.Long.fromBits(message.startTime.low >>> 0, message.startTime.high >>> 0, false).toBigInt();
                else if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.endTime = typeof message.endTime === "number" ? BigInt(message.endTime) : $util.Long.fromBits(message.endTime.low >>> 0, message.endTime.high >>> 0, false).toBigInt();
                else if (typeof message.endTime === "number")
                    object.endTime = options.longs === String ? String(message.endTime) : message.endTime;
                else
                    object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber() : message.endTime;
            if (message.uniqueKsmDevices != null && Object.hasOwnProperty.call(message, "uniqueKsmDevices"))
                object.uniqueKsmDevices = message.uniqueKsmDevices;
            if (message.pamGatewayOnline != null && Object.hasOwnProperty.call(message, "pamGatewayOnline"))
                object.pamGatewayOnline = message.pamGatewayOnline;
            if (message.pamUsageByUser && message.pamUsageByUser.length) {
                object.pamUsageByUser = [];
                for (let j = 0; j < message.pamUsageByUser.length; ++j)
                    object.pamUsageByUser[j] = $root.PAM.PamUsageByUser.toObject(message.pamUsageByUser[j], options, q + 1);
            }
            if (message.nhiCount != null && Object.hasOwnProperty.call(message, "nhiCount"))
                object.nhiCount = message.nhiCount;
            if (message.ksmNhiCount != null && Object.hasOwnProperty.call(message, "ksmNhiCount"))
                object.ksmNhiCount = message.ksmNhiCount;
            if (message.usageByUser && message.usageByUser.length) {
                object.usageByUser = [];
                for (let j = 0; j < message.usageByUser.length; ++j)
                    object.usageByUser[j] = $root.PAM.NhiUsageByUser.toObject(message.usageByUser[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this NhiMetricsResponse to JSON.
         * @function toJSON
         * @memberof PAM.NhiMetricsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NhiMetricsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NhiMetricsResponse
         * @function getTypeUrl
         * @memberof PAM.NhiMetricsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NhiMetricsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.NhiMetricsResponse";
        };

        return NhiMetricsResponse;
    })();

    PAM.NhiBulkMetricsResponse = (function() {

        /**
         * Properties of a NhiBulkMetricsResponse.
         * @memberof PAM
         * @interface INhiBulkMetricsResponse
         * @property {Array.<PAM.INhiMetricsResponse>|null} [responses] NhiBulkMetricsResponse responses
         */

        /**
         * Constructs a new NhiBulkMetricsResponse.
         * @memberof PAM
         * @classdesc Represents a NhiBulkMetricsResponse.
         * @implements INhiBulkMetricsResponse
         * @constructor
         * @param {PAM.INhiBulkMetricsResponse=} [properties] Properties to set
         */
        function NhiBulkMetricsResponse(properties) {
            this.responses = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NhiBulkMetricsResponse responses.
         * @member {Array.<PAM.INhiMetricsResponse>} responses
         * @memberof PAM.NhiBulkMetricsResponse
         * @instance
         */
        NhiBulkMetricsResponse.prototype.responses = $util.emptyArray;

        /**
         * Creates a new NhiBulkMetricsResponse instance using the specified properties.
         * @function create
         * @memberof PAM.NhiBulkMetricsResponse
         * @static
         * @param {PAM.INhiBulkMetricsResponse=} [properties] Properties to set
         * @returns {PAM.NhiBulkMetricsResponse} NhiBulkMetricsResponse instance
         */
        NhiBulkMetricsResponse.create = function create(properties) {
            return new NhiBulkMetricsResponse(properties);
        };

        /**
         * Encodes the specified NhiBulkMetricsResponse message. Does not implicitly {@link PAM.NhiBulkMetricsResponse.verify|verify} messages.
         * @function encode
         * @memberof PAM.NhiBulkMetricsResponse
         * @static
         * @param {PAM.INhiBulkMetricsResponse} message NhiBulkMetricsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NhiBulkMetricsResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.responses != null && message.responses.length)
                for (let i = 0; i < message.responses.length; ++i)
                    $root.PAM.NhiMetricsResponse.encode(message.responses[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a NhiBulkMetricsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.NhiBulkMetricsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.NhiBulkMetricsResponse} NhiBulkMetricsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NhiBulkMetricsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.NhiBulkMetricsResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.responses && message.responses.length))
                            message.responses = [];
                        message.responses.push($root.PAM.NhiMetricsResponse.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a NhiBulkMetricsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.NhiBulkMetricsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.NhiBulkMetricsResponse} NhiBulkMetricsResponse
         */
        NhiBulkMetricsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.NhiBulkMetricsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.NhiBulkMetricsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.NhiBulkMetricsResponse();
            if (object.responses) {
                if (!Array.isArray(object.responses))
                    throw TypeError(".PAM.NhiBulkMetricsResponse.responses: array expected");
                message.responses = [];
                for (let i = 0; i < object.responses.length; ++i) {
                    if (!$util.isObject(object.responses[i]))
                        throw TypeError(".PAM.NhiBulkMetricsResponse.responses: object expected");
                    message.responses[i] = $root.PAM.NhiMetricsResponse.fromObject(object.responses[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a NhiBulkMetricsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.NhiBulkMetricsResponse
         * @static
         * @param {PAM.NhiBulkMetricsResponse} message NhiBulkMetricsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NhiBulkMetricsResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.responses = [];
            if (message.responses && message.responses.length) {
                object.responses = [];
                for (let j = 0; j < message.responses.length; ++j)
                    object.responses[j] = $root.PAM.NhiMetricsResponse.toObject(message.responses[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this NhiBulkMetricsResponse to JSON.
         * @function toJSON
         * @memberof PAM.NhiBulkMetricsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NhiBulkMetricsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NhiBulkMetricsResponse
         * @function getTypeUrl
         * @memberof PAM.NhiBulkMetricsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NhiBulkMetricsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.NhiBulkMetricsResponse";
        };

        return NhiBulkMetricsResponse;
    })();

    /**
     * NhiCategory enum.
     * @name PAM.NhiCategory
     * @enum {number}
     * @property {number} NHI_CATEGORY_UNKNOWN=0 NHI_CATEGORY_UNKNOWN value
     * @property {number} PAM_USER=1 PAM_USER value
     * @property {number} PAM_RESOURCE=2 PAM_RESOURCE value
     * @property {number} GATEWAY=3 GATEWAY value
     * @property {number} DEVICE=4 DEVICE value
     */
    PAM.NhiCategory = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NHI_CATEGORY_UNKNOWN"] = 0;
        values[valuesById[1] = "PAM_USER"] = 1;
        values[valuesById[2] = "PAM_RESOURCE"] = 2;
        values[valuesById[3] = "GATEWAY"] = 3;
        values[valuesById[4] = "DEVICE"] = 4;
        return values;
    })();

    PAM.NhiUidEntry = (function() {

        /**
         * Properties of a NhiUidEntry.
         * @memberof PAM
         * @interface INhiUidEntry
         * @property {string|null} [uid] NhiUidEntry uid
         * @property {PAM.NhiCategory|null} [category] NhiUidEntry category
         * @property {boolean|null} [ksmNhi] NhiUidEntry ksmNhi
         * @property {string|null} [appUid] NhiUidEntry appUid
         */

        /**
         * Constructs a new NhiUidEntry.
         * @memberof PAM
         * @classdesc Represents a NhiUidEntry.
         * @implements INhiUidEntry
         * @constructor
         * @param {PAM.INhiUidEntry=} [properties] Properties to set
         */
        function NhiUidEntry(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NhiUidEntry uid.
         * @member {string} uid
         * @memberof PAM.NhiUidEntry
         * @instance
         */
        NhiUidEntry.prototype.uid = "";

        /**
         * NhiUidEntry category.
         * @member {PAM.NhiCategory} category
         * @memberof PAM.NhiUidEntry
         * @instance
         */
        NhiUidEntry.prototype.category = 0;

        /**
         * NhiUidEntry ksmNhi.
         * @member {boolean} ksmNhi
         * @memberof PAM.NhiUidEntry
         * @instance
         */
        NhiUidEntry.prototype.ksmNhi = false;

        /**
         * NhiUidEntry appUid.
         * @member {string} appUid
         * @memberof PAM.NhiUidEntry
         * @instance
         */
        NhiUidEntry.prototype.appUid = "";

        /**
         * Creates a new NhiUidEntry instance using the specified properties.
         * @function create
         * @memberof PAM.NhiUidEntry
         * @static
         * @param {PAM.INhiUidEntry=} [properties] Properties to set
         * @returns {PAM.NhiUidEntry} NhiUidEntry instance
         */
        NhiUidEntry.create = function create(properties) {
            return new NhiUidEntry(properties);
        };

        /**
         * Encodes the specified NhiUidEntry message. Does not implicitly {@link PAM.NhiUidEntry.verify|verify} messages.
         * @function encode
         * @memberof PAM.NhiUidEntry
         * @static
         * @param {PAM.INhiUidEntry} message NhiUidEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NhiUidEntry.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.uid);
            if (message.category != null && Object.hasOwnProperty.call(message, "category"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.category);
            if (message.ksmNhi != null && Object.hasOwnProperty.call(message, "ksmNhi"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.ksmNhi);
            if (message.appUid != null && Object.hasOwnProperty.call(message, "appUid"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.appUid);
            return writer;
        };

        /**
         * Decodes a NhiUidEntry message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.NhiUidEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.NhiUidEntry} NhiUidEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NhiUidEntry.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.NhiUidEntry();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.uid = reader.string();
                        break;
                    }
                case 2: {
                        message.category = reader.int32();
                        break;
                    }
                case 3: {
                        message.ksmNhi = reader.bool();
                        break;
                    }
                case 4: {
                        message.appUid = reader.string();
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
         * Creates a NhiUidEntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.NhiUidEntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.NhiUidEntry} NhiUidEntry
         */
        NhiUidEntry.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.NhiUidEntry)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.NhiUidEntry: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.NhiUidEntry();
            if (object.uid != null)
                message.uid = String(object.uid);
            switch (object.category) {
            default:
                if (typeof object.category === "number") {
                    message.category = object.category;
                    break;
                }
                break;
            case "NHI_CATEGORY_UNKNOWN":
            case 0:
                message.category = 0;
                break;
            case "PAM_USER":
            case 1:
                message.category = 1;
                break;
            case "PAM_RESOURCE":
            case 2:
                message.category = 2;
                break;
            case "GATEWAY":
            case 3:
                message.category = 3;
                break;
            case "DEVICE":
            case 4:
                message.category = 4;
                break;
            }
            if (object.ksmNhi != null)
                message.ksmNhi = Boolean(object.ksmNhi);
            if (object.appUid != null)
                message.appUid = String(object.appUid);
            return message;
        };

        /**
         * Creates a plain object from a NhiUidEntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.NhiUidEntry
         * @static
         * @param {PAM.NhiUidEntry} message NhiUidEntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NhiUidEntry.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.uid = "";
                object.category = options.enums === String ? "NHI_CATEGORY_UNKNOWN" : 0;
                object.ksmNhi = false;
                object.appUid = "";
            }
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                object.uid = message.uid;
            if (message.category != null && Object.hasOwnProperty.call(message, "category"))
                object.category = options.enums === String ? $root.PAM.NhiCategory[message.category] === undefined ? message.category : $root.PAM.NhiCategory[message.category] : message.category;
            if (message.ksmNhi != null && Object.hasOwnProperty.call(message, "ksmNhi"))
                object.ksmNhi = message.ksmNhi;
            if (message.appUid != null && Object.hasOwnProperty.call(message, "appUid"))
                object.appUid = message.appUid;
            return object;
        };

        /**
         * Converts this NhiUidEntry to JSON.
         * @function toJSON
         * @memberof PAM.NhiUidEntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NhiUidEntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NhiUidEntry
         * @function getTypeUrl
         * @memberof PAM.NhiUidEntry
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NhiUidEntry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.NhiUidEntry";
        };

        return NhiUidEntry;
    })();

    PAM.GetNhiUidsRequest = (function() {

        /**
         * Properties of a GetNhiUidsRequest.
         * @memberof PAM
         * @interface IGetNhiUidsRequest
         * @property {number|null} [startTime] GetNhiUidsRequest startTime
         * @property {number|null} [endTime] GetNhiUidsRequest endTime
         */

        /**
         * Constructs a new GetNhiUidsRequest.
         * @memberof PAM
         * @classdesc Represents a GetNhiUidsRequest.
         * @implements IGetNhiUidsRequest
         * @constructor
         * @param {PAM.IGetNhiUidsRequest=} [properties] Properties to set
         */
        function GetNhiUidsRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetNhiUidsRequest startTime.
         * @member {number} startTime
         * @memberof PAM.GetNhiUidsRequest
         * @instance
         */
        GetNhiUidsRequest.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GetNhiUidsRequest endTime.
         * @member {number} endTime
         * @memberof PAM.GetNhiUidsRequest
         * @instance
         */
        GetNhiUidsRequest.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GetNhiUidsRequest instance using the specified properties.
         * @function create
         * @memberof PAM.GetNhiUidsRequest
         * @static
         * @param {PAM.IGetNhiUidsRequest=} [properties] Properties to set
         * @returns {PAM.GetNhiUidsRequest} GetNhiUidsRequest instance
         */
        GetNhiUidsRequest.create = function create(properties) {
            return new GetNhiUidsRequest(properties);
        };

        /**
         * Encodes the specified GetNhiUidsRequest message. Does not implicitly {@link PAM.GetNhiUidsRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.GetNhiUidsRequest
         * @static
         * @param {PAM.IGetNhiUidsRequest} message GetNhiUidsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetNhiUidsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.startTime);
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.endTime);
            return writer;
        };

        /**
         * Decodes a GetNhiUidsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.GetNhiUidsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.GetNhiUidsRequest} GetNhiUidsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetNhiUidsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.GetNhiUidsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.startTime = reader.int64();
                        break;
                    }
                case 2: {
                        message.endTime = reader.int64();
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
         * Creates a GetNhiUidsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.GetNhiUidsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.GetNhiUidsRequest} GetNhiUidsRequest
         */
        GetNhiUidsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.GetNhiUidsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.GetNhiUidsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.GetNhiUidsRequest();
            if (object.startTime != null)
                if ($util.Long)
                    message.startTime = $util.Long.fromValue(object.startTime, false);
                else if (typeof object.startTime === "string")
                    message.startTime = parseInt(object.startTime, 10);
                else if (typeof object.startTime === "number")
                    message.startTime = object.startTime;
                else if (typeof object.startTime === "object")
                    message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
            if (object.endTime != null)
                if ($util.Long)
                    message.endTime = $util.Long.fromValue(object.endTime, false);
                else if (typeof object.endTime === "string")
                    message.endTime = parseInt(object.endTime, 10);
                else if (typeof object.endTime === "number")
                    message.endTime = object.endTime;
                else if (typeof object.endTime === "object")
                    message.endTime = new $util.LongBits(object.endTime.low >>> 0, object.endTime.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GetNhiUidsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.GetNhiUidsRequest
         * @static
         * @param {PAM.GetNhiUidsRequest} message GetNhiUidsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetNhiUidsRequest.toObject = function toObject(message, options, q) {
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
                    object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.startTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.endTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.endTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.startTime = typeof message.startTime === "number" ? BigInt(message.startTime) : $util.Long.fromBits(message.startTime.low >>> 0, message.startTime.high >>> 0, false).toBigInt();
                else if (typeof message.startTime === "number")
                    object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
                else
                    object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.endTime = typeof message.endTime === "number" ? BigInt(message.endTime) : $util.Long.fromBits(message.endTime.low >>> 0, message.endTime.high >>> 0, false).toBigInt();
                else if (typeof message.endTime === "number")
                    object.endTime = options.longs === String ? String(message.endTime) : message.endTime;
                else
                    object.endTime = options.longs === String ? $util.Long.prototype.toString.call(message.endTime) : options.longs === Number ? new $util.LongBits(message.endTime.low >>> 0, message.endTime.high >>> 0).toNumber() : message.endTime;
            return object;
        };

        /**
         * Converts this GetNhiUidsRequest to JSON.
         * @function toJSON
         * @memberof PAM.GetNhiUidsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetNhiUidsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetNhiUidsRequest
         * @function getTypeUrl
         * @memberof PAM.GetNhiUidsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetNhiUidsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.GetNhiUidsRequest";
        };

        return GetNhiUidsRequest;
    })();

    PAM.GetNhiUidsResponse = (function() {

        /**
         * Properties of a GetNhiUidsResponse.
         * @memberof PAM
         * @interface IGetNhiUidsResponse
         * @property {Array.<PAM.INhiUidEntry>|null} [uids] GetNhiUidsResponse uids
         */

        /**
         * Constructs a new GetNhiUidsResponse.
         * @memberof PAM
         * @classdesc Represents a GetNhiUidsResponse.
         * @implements IGetNhiUidsResponse
         * @constructor
         * @param {PAM.IGetNhiUidsResponse=} [properties] Properties to set
         */
        function GetNhiUidsResponse(properties) {
            this.uids = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetNhiUidsResponse uids.
         * @member {Array.<PAM.INhiUidEntry>} uids
         * @memberof PAM.GetNhiUidsResponse
         * @instance
         */
        GetNhiUidsResponse.prototype.uids = $util.emptyArray;

        /**
         * Creates a new GetNhiUidsResponse instance using the specified properties.
         * @function create
         * @memberof PAM.GetNhiUidsResponse
         * @static
         * @param {PAM.IGetNhiUidsResponse=} [properties] Properties to set
         * @returns {PAM.GetNhiUidsResponse} GetNhiUidsResponse instance
         */
        GetNhiUidsResponse.create = function create(properties) {
            return new GetNhiUidsResponse(properties);
        };

        /**
         * Encodes the specified GetNhiUidsResponse message. Does not implicitly {@link PAM.GetNhiUidsResponse.verify|verify} messages.
         * @function encode
         * @memberof PAM.GetNhiUidsResponse
         * @static
         * @param {PAM.IGetNhiUidsResponse} message GetNhiUidsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetNhiUidsResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.uids != null && message.uids.length)
                for (let i = 0; i < message.uids.length; ++i)
                    $root.PAM.NhiUidEntry.encode(message.uids[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a GetNhiUidsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.GetNhiUidsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.GetNhiUidsResponse} GetNhiUidsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetNhiUidsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.GetNhiUidsResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.uids && message.uids.length))
                            message.uids = [];
                        message.uids.push($root.PAM.NhiUidEntry.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a GetNhiUidsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.GetNhiUidsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.GetNhiUidsResponse} GetNhiUidsResponse
         */
        GetNhiUidsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.GetNhiUidsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.GetNhiUidsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.GetNhiUidsResponse();
            if (object.uids) {
                if (!Array.isArray(object.uids))
                    throw TypeError(".PAM.GetNhiUidsResponse.uids: array expected");
                message.uids = [];
                for (let i = 0; i < object.uids.length; ++i) {
                    if (!$util.isObject(object.uids[i]))
                        throw TypeError(".PAM.GetNhiUidsResponse.uids: object expected");
                    message.uids[i] = $root.PAM.NhiUidEntry.fromObject(object.uids[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetNhiUidsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.GetNhiUidsResponse
         * @static
         * @param {PAM.GetNhiUidsResponse} message GetNhiUidsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetNhiUidsResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.uids = [];
            if (message.uids && message.uids.length) {
                object.uids = [];
                for (let j = 0; j < message.uids.length; ++j)
                    object.uids[j] = $root.PAM.NhiUidEntry.toObject(message.uids[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this GetNhiUidsResponse to JSON.
         * @function toJSON
         * @memberof PAM.GetNhiUidsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetNhiUidsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetNhiUidsResponse
         * @function getTypeUrl
         * @memberof PAM.GetNhiUidsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetNhiUidsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.GetNhiUidsResponse";
        };

        return GetNhiUidsResponse;
    })();

    PAM.SetNhiKsmEffectiveDateRequest = (function() {

        /**
         * Properties of a SetNhiKsmEffectiveDateRequest.
         * @memberof PAM
         * @interface ISetNhiKsmEffectiveDateRequest
         * @property {number|null} [effectiveDate] SetNhiKsmEffectiveDateRequest effectiveDate
         */

        /**
         * Constructs a new SetNhiKsmEffectiveDateRequest.
         * @memberof PAM
         * @classdesc Represents a SetNhiKsmEffectiveDateRequest.
         * @implements ISetNhiKsmEffectiveDateRequest
         * @constructor
         * @param {PAM.ISetNhiKsmEffectiveDateRequest=} [properties] Properties to set
         */
        function SetNhiKsmEffectiveDateRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SetNhiKsmEffectiveDateRequest effectiveDate.
         * @member {number} effectiveDate
         * @memberof PAM.SetNhiKsmEffectiveDateRequest
         * @instance
         */
        SetNhiKsmEffectiveDateRequest.prototype.effectiveDate = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new SetNhiKsmEffectiveDateRequest instance using the specified properties.
         * @function create
         * @memberof PAM.SetNhiKsmEffectiveDateRequest
         * @static
         * @param {PAM.ISetNhiKsmEffectiveDateRequest=} [properties] Properties to set
         * @returns {PAM.SetNhiKsmEffectiveDateRequest} SetNhiKsmEffectiveDateRequest instance
         */
        SetNhiKsmEffectiveDateRequest.create = function create(properties) {
            return new SetNhiKsmEffectiveDateRequest(properties);
        };

        /**
         * Encodes the specified SetNhiKsmEffectiveDateRequest message. Does not implicitly {@link PAM.SetNhiKsmEffectiveDateRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.SetNhiKsmEffectiveDateRequest
         * @static
         * @param {PAM.ISetNhiKsmEffectiveDateRequest} message SetNhiKsmEffectiveDateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetNhiKsmEffectiveDateRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.effectiveDate != null && Object.hasOwnProperty.call(message, "effectiveDate"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.effectiveDate);
            return writer;
        };

        /**
         * Decodes a SetNhiKsmEffectiveDateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.SetNhiKsmEffectiveDateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.SetNhiKsmEffectiveDateRequest} SetNhiKsmEffectiveDateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetNhiKsmEffectiveDateRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.SetNhiKsmEffectiveDateRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.effectiveDate = reader.int64();
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
         * Creates a SetNhiKsmEffectiveDateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.SetNhiKsmEffectiveDateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.SetNhiKsmEffectiveDateRequest} SetNhiKsmEffectiveDateRequest
         */
        SetNhiKsmEffectiveDateRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.SetNhiKsmEffectiveDateRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.SetNhiKsmEffectiveDateRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.SetNhiKsmEffectiveDateRequest();
            if (object.effectiveDate != null)
                if ($util.Long)
                    message.effectiveDate = $util.Long.fromValue(object.effectiveDate, false);
                else if (typeof object.effectiveDate === "string")
                    message.effectiveDate = parseInt(object.effectiveDate, 10);
                else if (typeof object.effectiveDate === "number")
                    message.effectiveDate = object.effectiveDate;
                else if (typeof object.effectiveDate === "object")
                    message.effectiveDate = new $util.LongBits(object.effectiveDate.low >>> 0, object.effectiveDate.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a SetNhiKsmEffectiveDateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.SetNhiKsmEffectiveDateRequest
         * @static
         * @param {PAM.SetNhiKsmEffectiveDateRequest} message SetNhiKsmEffectiveDateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SetNhiKsmEffectiveDateRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.effectiveDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.effectiveDate = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.effectiveDate != null && Object.hasOwnProperty.call(message, "effectiveDate"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.effectiveDate = typeof message.effectiveDate === "number" ? BigInt(message.effectiveDate) : $util.Long.fromBits(message.effectiveDate.low >>> 0, message.effectiveDate.high >>> 0, false).toBigInt();
                else if (typeof message.effectiveDate === "number")
                    object.effectiveDate = options.longs === String ? String(message.effectiveDate) : message.effectiveDate;
                else
                    object.effectiveDate = options.longs === String ? $util.Long.prototype.toString.call(message.effectiveDate) : options.longs === Number ? new $util.LongBits(message.effectiveDate.low >>> 0, message.effectiveDate.high >>> 0).toNumber() : message.effectiveDate;
            return object;
        };

        /**
         * Converts this SetNhiKsmEffectiveDateRequest to JSON.
         * @function toJSON
         * @memberof PAM.SetNhiKsmEffectiveDateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SetNhiKsmEffectiveDateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SetNhiKsmEffectiveDateRequest
         * @function getTypeUrl
         * @memberof PAM.SetNhiKsmEffectiveDateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SetNhiKsmEffectiveDateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.SetNhiKsmEffectiveDateRequest";
        };

        return SetNhiKsmEffectiveDateRequest;
    })();

    PAM.GetNhiKsmEffectiveDateResponse = (function() {

        /**
         * Properties of a GetNhiKsmEffectiveDateResponse.
         * @memberof PAM
         * @interface IGetNhiKsmEffectiveDateResponse
         * @property {number|null} [effectiveDate] GetNhiKsmEffectiveDateResponse effectiveDate
         * @property {number|null} [defaultDate] GetNhiKsmEffectiveDateResponse defaultDate
         */

        /**
         * Constructs a new GetNhiKsmEffectiveDateResponse.
         * @memberof PAM
         * @classdesc Represents a GetNhiKsmEffectiveDateResponse.
         * @implements IGetNhiKsmEffectiveDateResponse
         * @constructor
         * @param {PAM.IGetNhiKsmEffectiveDateResponse=} [properties] Properties to set
         */
        function GetNhiKsmEffectiveDateResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetNhiKsmEffectiveDateResponse effectiveDate.
         * @member {number} effectiveDate
         * @memberof PAM.GetNhiKsmEffectiveDateResponse
         * @instance
         */
        GetNhiKsmEffectiveDateResponse.prototype.effectiveDate = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * GetNhiKsmEffectiveDateResponse defaultDate.
         * @member {number} defaultDate
         * @memberof PAM.GetNhiKsmEffectiveDateResponse
         * @instance
         */
        GetNhiKsmEffectiveDateResponse.prototype.defaultDate = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GetNhiKsmEffectiveDateResponse instance using the specified properties.
         * @function create
         * @memberof PAM.GetNhiKsmEffectiveDateResponse
         * @static
         * @param {PAM.IGetNhiKsmEffectiveDateResponse=} [properties] Properties to set
         * @returns {PAM.GetNhiKsmEffectiveDateResponse} GetNhiKsmEffectiveDateResponse instance
         */
        GetNhiKsmEffectiveDateResponse.create = function create(properties) {
            return new GetNhiKsmEffectiveDateResponse(properties);
        };

        /**
         * Encodes the specified GetNhiKsmEffectiveDateResponse message. Does not implicitly {@link PAM.GetNhiKsmEffectiveDateResponse.verify|verify} messages.
         * @function encode
         * @memberof PAM.GetNhiKsmEffectiveDateResponse
         * @static
         * @param {PAM.IGetNhiKsmEffectiveDateResponse} message GetNhiKsmEffectiveDateResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetNhiKsmEffectiveDateResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.effectiveDate != null && Object.hasOwnProperty.call(message, "effectiveDate"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.effectiveDate);
            if (message.defaultDate != null && Object.hasOwnProperty.call(message, "defaultDate"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.defaultDate);
            return writer;
        };

        /**
         * Decodes a GetNhiKsmEffectiveDateResponse message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.GetNhiKsmEffectiveDateResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.GetNhiKsmEffectiveDateResponse} GetNhiKsmEffectiveDateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetNhiKsmEffectiveDateResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.GetNhiKsmEffectiveDateResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.effectiveDate = reader.int64();
                        break;
                    }
                case 2: {
                        message.defaultDate = reader.int64();
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
         * Creates a GetNhiKsmEffectiveDateResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.GetNhiKsmEffectiveDateResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.GetNhiKsmEffectiveDateResponse} GetNhiKsmEffectiveDateResponse
         */
        GetNhiKsmEffectiveDateResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.GetNhiKsmEffectiveDateResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.GetNhiKsmEffectiveDateResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.GetNhiKsmEffectiveDateResponse();
            if (object.effectiveDate != null)
                if ($util.Long)
                    message.effectiveDate = $util.Long.fromValue(object.effectiveDate, false);
                else if (typeof object.effectiveDate === "string")
                    message.effectiveDate = parseInt(object.effectiveDate, 10);
                else if (typeof object.effectiveDate === "number")
                    message.effectiveDate = object.effectiveDate;
                else if (typeof object.effectiveDate === "object")
                    message.effectiveDate = new $util.LongBits(object.effectiveDate.low >>> 0, object.effectiveDate.high >>> 0).toNumber();
            if (object.defaultDate != null)
                if ($util.Long)
                    message.defaultDate = $util.Long.fromValue(object.defaultDate, false);
                else if (typeof object.defaultDate === "string")
                    message.defaultDate = parseInt(object.defaultDate, 10);
                else if (typeof object.defaultDate === "number")
                    message.defaultDate = object.defaultDate;
                else if (typeof object.defaultDate === "object")
                    message.defaultDate = new $util.LongBits(object.defaultDate.low >>> 0, object.defaultDate.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GetNhiKsmEffectiveDateResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.GetNhiKsmEffectiveDateResponse
         * @static
         * @param {PAM.GetNhiKsmEffectiveDateResponse} message GetNhiKsmEffectiveDateResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetNhiKsmEffectiveDateResponse.toObject = function toObject(message, options, q) {
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
                    object.effectiveDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.effectiveDate = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.defaultDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.defaultDate = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.effectiveDate != null && Object.hasOwnProperty.call(message, "effectiveDate"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.effectiveDate = typeof message.effectiveDate === "number" ? BigInt(message.effectiveDate) : $util.Long.fromBits(message.effectiveDate.low >>> 0, message.effectiveDate.high >>> 0, false).toBigInt();
                else if (typeof message.effectiveDate === "number")
                    object.effectiveDate = options.longs === String ? String(message.effectiveDate) : message.effectiveDate;
                else
                    object.effectiveDate = options.longs === String ? $util.Long.prototype.toString.call(message.effectiveDate) : options.longs === Number ? new $util.LongBits(message.effectiveDate.low >>> 0, message.effectiveDate.high >>> 0).toNumber() : message.effectiveDate;
            if (message.defaultDate != null && Object.hasOwnProperty.call(message, "defaultDate"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.defaultDate = typeof message.defaultDate === "number" ? BigInt(message.defaultDate) : $util.Long.fromBits(message.defaultDate.low >>> 0, message.defaultDate.high >>> 0, false).toBigInt();
                else if (typeof message.defaultDate === "number")
                    object.defaultDate = options.longs === String ? String(message.defaultDate) : message.defaultDate;
                else
                    object.defaultDate = options.longs === String ? $util.Long.prototype.toString.call(message.defaultDate) : options.longs === Number ? new $util.LongBits(message.defaultDate.low >>> 0, message.defaultDate.high >>> 0).toNumber() : message.defaultDate;
            return object;
        };

        /**
         * Converts this GetNhiKsmEffectiveDateResponse to JSON.
         * @function toJSON
         * @memberof PAM.GetNhiKsmEffectiveDateResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetNhiKsmEffectiveDateResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetNhiKsmEffectiveDateResponse
         * @function getTypeUrl
         * @memberof PAM.GetNhiKsmEffectiveDateResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetNhiKsmEffectiveDateResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.GetNhiKsmEffectiveDateResponse";
        };

        return GetNhiKsmEffectiveDateResponse;
    })();

    PAM.PAMUniversalSyncPreCheckRequest = (function() {

        /**
         * Properties of a PAMUniversalSyncPreCheckRequest.
         * @memberof PAM
         * @interface IPAMUniversalSyncPreCheckRequest
         * @property {Uint8Array|null} [networkUid] PAMUniversalSyncPreCheckRequest networkUid
         * @property {Array.<Uint8Array>|null} [folderUids] PAMUniversalSyncPreCheckRequest folderUids
         */

        /**
         * Constructs a new PAMUniversalSyncPreCheckRequest.
         * @memberof PAM
         * @classdesc Represents a PAMUniversalSyncPreCheckRequest.
         * @implements IPAMUniversalSyncPreCheckRequest
         * @constructor
         * @param {PAM.IPAMUniversalSyncPreCheckRequest=} [properties] Properties to set
         */
        function PAMUniversalSyncPreCheckRequest(properties) {
            this.folderUids = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMUniversalSyncPreCheckRequest networkUid.
         * @member {Uint8Array} networkUid
         * @memberof PAM.PAMUniversalSyncPreCheckRequest
         * @instance
         */
        PAMUniversalSyncPreCheckRequest.prototype.networkUid = $util.newBuffer([]);

        /**
         * PAMUniversalSyncPreCheckRequest folderUids.
         * @member {Array.<Uint8Array>} folderUids
         * @memberof PAM.PAMUniversalSyncPreCheckRequest
         * @instance
         */
        PAMUniversalSyncPreCheckRequest.prototype.folderUids = $util.emptyArray;

        /**
         * Creates a new PAMUniversalSyncPreCheckRequest instance using the specified properties.
         * @function create
         * @memberof PAM.PAMUniversalSyncPreCheckRequest
         * @static
         * @param {PAM.IPAMUniversalSyncPreCheckRequest=} [properties] Properties to set
         * @returns {PAM.PAMUniversalSyncPreCheckRequest} PAMUniversalSyncPreCheckRequest instance
         */
        PAMUniversalSyncPreCheckRequest.create = function create(properties) {
            return new PAMUniversalSyncPreCheckRequest(properties);
        };

        /**
         * Encodes the specified PAMUniversalSyncPreCheckRequest message. Does not implicitly {@link PAM.PAMUniversalSyncPreCheckRequest.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMUniversalSyncPreCheckRequest
         * @static
         * @param {PAM.IPAMUniversalSyncPreCheckRequest} message PAMUniversalSyncPreCheckRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMUniversalSyncPreCheckRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.networkUid != null && Object.hasOwnProperty.call(message, "networkUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.networkUid);
            if (message.folderUids != null && message.folderUids.length)
                for (let i = 0; i < message.folderUids.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.folderUids[i]);
            return writer;
        };

        /**
         * Decodes a PAMUniversalSyncPreCheckRequest message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMUniversalSyncPreCheckRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMUniversalSyncPreCheckRequest} PAMUniversalSyncPreCheckRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMUniversalSyncPreCheckRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMUniversalSyncPreCheckRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.networkUid = reader.bytes();
                        break;
                    }
                case 2: {
                        if (!(message.folderUids && message.folderUids.length))
                            message.folderUids = [];
                        message.folderUids.push(reader.bytes());
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
         * Creates a PAMUniversalSyncPreCheckRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMUniversalSyncPreCheckRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMUniversalSyncPreCheckRequest} PAMUniversalSyncPreCheckRequest
         */
        PAMUniversalSyncPreCheckRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMUniversalSyncPreCheckRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMUniversalSyncPreCheckRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMUniversalSyncPreCheckRequest();
            if (object.networkUid != null)
                if (typeof object.networkUid === "string")
                    $util.base64.decode(object.networkUid, message.networkUid = $util.newBuffer($util.base64.length(object.networkUid)), 0);
                else if (object.networkUid.length >= 0)
                    message.networkUid = object.networkUid;
            if (object.folderUids) {
                if (!Array.isArray(object.folderUids))
                    throw TypeError(".PAM.PAMUniversalSyncPreCheckRequest.folderUids: array expected");
                message.folderUids = [];
                for (let i = 0; i < object.folderUids.length; ++i)
                    if (typeof object.folderUids[i] === "string")
                        $util.base64.decode(object.folderUids[i], message.folderUids[i] = $util.newBuffer($util.base64.length(object.folderUids[i])), 0);
                    else if (object.folderUids[i].length >= 0)
                        message.folderUids[i] = object.folderUids[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMUniversalSyncPreCheckRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMUniversalSyncPreCheckRequest
         * @static
         * @param {PAM.PAMUniversalSyncPreCheckRequest} message PAMUniversalSyncPreCheckRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMUniversalSyncPreCheckRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.folderUids = [];
            if (options.defaults)
                if (options.bytes === String)
                    object.networkUid = "";
                else {
                    object.networkUid = [];
                    if (options.bytes !== Array)
                        object.networkUid = $util.newBuffer(object.networkUid);
                }
            if (message.networkUid != null && Object.hasOwnProperty.call(message, "networkUid"))
                object.networkUid = options.bytes === String ? $util.base64.encode(message.networkUid, 0, message.networkUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.networkUid) : message.networkUid;
            if (message.folderUids && message.folderUids.length) {
                object.folderUids = [];
                for (let j = 0; j < message.folderUids.length; ++j)
                    object.folderUids[j] = options.bytes === String ? $util.base64.encode(message.folderUids[j], 0, message.folderUids[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUids[j]) : message.folderUids[j];
            }
            return object;
        };

        /**
         * Converts this PAMUniversalSyncPreCheckRequest to JSON.
         * @function toJSON
         * @memberof PAM.PAMUniversalSyncPreCheckRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMUniversalSyncPreCheckRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMUniversalSyncPreCheckRequest
         * @function getTypeUrl
         * @memberof PAM.PAMUniversalSyncPreCheckRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMUniversalSyncPreCheckRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMUniversalSyncPreCheckRequest";
        };

        return PAMUniversalSyncPreCheckRequest;
    })();

    PAM.PAMUniversalSyncPreCheckResult = (function() {

        /**
         * Properties of a PAMUniversalSyncPreCheckResult.
         * @memberof PAM
         * @interface IPAMUniversalSyncPreCheckResult
         * @property {Uint8Array|null} [folderUid] PAMUniversalSyncPreCheckResult folderUid
         * @property {boolean|null} [isUsed] PAMUniversalSyncPreCheckResult isUsed
         */

        /**
         * Constructs a new PAMUniversalSyncPreCheckResult.
         * @memberof PAM
         * @classdesc Represents a PAMUniversalSyncPreCheckResult.
         * @implements IPAMUniversalSyncPreCheckResult
         * @constructor
         * @param {PAM.IPAMUniversalSyncPreCheckResult=} [properties] Properties to set
         */
        function PAMUniversalSyncPreCheckResult(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMUniversalSyncPreCheckResult folderUid.
         * @member {Uint8Array} folderUid
         * @memberof PAM.PAMUniversalSyncPreCheckResult
         * @instance
         */
        PAMUniversalSyncPreCheckResult.prototype.folderUid = $util.newBuffer([]);

        /**
         * PAMUniversalSyncPreCheckResult isUsed.
         * @member {boolean} isUsed
         * @memberof PAM.PAMUniversalSyncPreCheckResult
         * @instance
         */
        PAMUniversalSyncPreCheckResult.prototype.isUsed = false;

        /**
         * Creates a new PAMUniversalSyncPreCheckResult instance using the specified properties.
         * @function create
         * @memberof PAM.PAMUniversalSyncPreCheckResult
         * @static
         * @param {PAM.IPAMUniversalSyncPreCheckResult=} [properties] Properties to set
         * @returns {PAM.PAMUniversalSyncPreCheckResult} PAMUniversalSyncPreCheckResult instance
         */
        PAMUniversalSyncPreCheckResult.create = function create(properties) {
            return new PAMUniversalSyncPreCheckResult(properties);
        };

        /**
         * Encodes the specified PAMUniversalSyncPreCheckResult message. Does not implicitly {@link PAM.PAMUniversalSyncPreCheckResult.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMUniversalSyncPreCheckResult
         * @static
         * @param {PAM.IPAMUniversalSyncPreCheckResult} message PAMUniversalSyncPreCheckResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMUniversalSyncPreCheckResult.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.folderUid);
            if (message.isUsed != null && Object.hasOwnProperty.call(message, "isUsed"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isUsed);
            return writer;
        };

        /**
         * Decodes a PAMUniversalSyncPreCheckResult message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMUniversalSyncPreCheckResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMUniversalSyncPreCheckResult} PAMUniversalSyncPreCheckResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMUniversalSyncPreCheckResult.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMUniversalSyncPreCheckResult();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.folderUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.isUsed = reader.bool();
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
         * Creates a PAMUniversalSyncPreCheckResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMUniversalSyncPreCheckResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMUniversalSyncPreCheckResult} PAMUniversalSyncPreCheckResult
         */
        PAMUniversalSyncPreCheckResult.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMUniversalSyncPreCheckResult)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMUniversalSyncPreCheckResult: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMUniversalSyncPreCheckResult();
            if (object.folderUid != null)
                if (typeof object.folderUid === "string")
                    $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                else if (object.folderUid.length >= 0)
                    message.folderUid = object.folderUid;
            if (object.isUsed != null)
                message.isUsed = Boolean(object.isUsed);
            return message;
        };

        /**
         * Creates a plain object from a PAMUniversalSyncPreCheckResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMUniversalSyncPreCheckResult
         * @static
         * @param {PAM.PAMUniversalSyncPreCheckResult} message PAMUniversalSyncPreCheckResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMUniversalSyncPreCheckResult.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.folderUid = "";
                else {
                    object.folderUid = [];
                    if (options.bytes !== Array)
                        object.folderUid = $util.newBuffer(object.folderUid);
                }
                object.isUsed = false;
            }
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
            if (message.isUsed != null && Object.hasOwnProperty.call(message, "isUsed"))
                object.isUsed = message.isUsed;
            return object;
        };

        /**
         * Converts this PAMUniversalSyncPreCheckResult to JSON.
         * @function toJSON
         * @memberof PAM.PAMUniversalSyncPreCheckResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMUniversalSyncPreCheckResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMUniversalSyncPreCheckResult
         * @function getTypeUrl
         * @memberof PAM.PAMUniversalSyncPreCheckResult
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMUniversalSyncPreCheckResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMUniversalSyncPreCheckResult";
        };

        return PAMUniversalSyncPreCheckResult;
    })();

    PAM.PAMUniversalSyncPreCheckResponse = (function() {

        /**
         * Properties of a PAMUniversalSyncPreCheckResponse.
         * @memberof PAM
         * @interface IPAMUniversalSyncPreCheckResponse
         * @property {Array.<PAM.IPAMUniversalSyncPreCheckResult>|null} [results] PAMUniversalSyncPreCheckResponse results
         */

        /**
         * Constructs a new PAMUniversalSyncPreCheckResponse.
         * @memberof PAM
         * @classdesc Represents a PAMUniversalSyncPreCheckResponse.
         * @implements IPAMUniversalSyncPreCheckResponse
         * @constructor
         * @param {PAM.IPAMUniversalSyncPreCheckResponse=} [properties] Properties to set
         */
        function PAMUniversalSyncPreCheckResponse(properties) {
            this.results = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMUniversalSyncPreCheckResponse results.
         * @member {Array.<PAM.IPAMUniversalSyncPreCheckResult>} results
         * @memberof PAM.PAMUniversalSyncPreCheckResponse
         * @instance
         */
        PAMUniversalSyncPreCheckResponse.prototype.results = $util.emptyArray;

        /**
         * Creates a new PAMUniversalSyncPreCheckResponse instance using the specified properties.
         * @function create
         * @memberof PAM.PAMUniversalSyncPreCheckResponse
         * @static
         * @param {PAM.IPAMUniversalSyncPreCheckResponse=} [properties] Properties to set
         * @returns {PAM.PAMUniversalSyncPreCheckResponse} PAMUniversalSyncPreCheckResponse instance
         */
        PAMUniversalSyncPreCheckResponse.create = function create(properties) {
            return new PAMUniversalSyncPreCheckResponse(properties);
        };

        /**
         * Encodes the specified PAMUniversalSyncPreCheckResponse message. Does not implicitly {@link PAM.PAMUniversalSyncPreCheckResponse.verify|verify} messages.
         * @function encode
         * @memberof PAM.PAMUniversalSyncPreCheckResponse
         * @static
         * @param {PAM.IPAMUniversalSyncPreCheckResponse} message PAMUniversalSyncPreCheckResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMUniversalSyncPreCheckResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.results != null && message.results.length)
                for (let i = 0; i < message.results.length; ++i)
                    $root.PAM.PAMUniversalSyncPreCheckResult.encode(message.results[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PAMUniversalSyncPreCheckResponse message from the specified reader or buffer.
         * @function decode
         * @memberof PAM.PAMUniversalSyncPreCheckResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {PAM.PAMUniversalSyncPreCheckResponse} PAMUniversalSyncPreCheckResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMUniversalSyncPreCheckResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.PAM.PAMUniversalSyncPreCheckResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.results && message.results.length))
                            message.results = [];
                        message.results.push($root.PAM.PAMUniversalSyncPreCheckResult.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a PAMUniversalSyncPreCheckResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof PAM.PAMUniversalSyncPreCheckResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {PAM.PAMUniversalSyncPreCheckResponse} PAMUniversalSyncPreCheckResponse
         */
        PAMUniversalSyncPreCheckResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.PAM.PAMUniversalSyncPreCheckResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".PAM.PAMUniversalSyncPreCheckResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.PAM.PAMUniversalSyncPreCheckResponse();
            if (object.results) {
                if (!Array.isArray(object.results))
                    throw TypeError(".PAM.PAMUniversalSyncPreCheckResponse.results: array expected");
                message.results = [];
                for (let i = 0; i < object.results.length; ++i) {
                    if (!$util.isObject(object.results[i]))
                        throw TypeError(".PAM.PAMUniversalSyncPreCheckResponse.results: object expected");
                    message.results[i] = $root.PAM.PAMUniversalSyncPreCheckResult.fromObject(object.results[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMUniversalSyncPreCheckResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof PAM.PAMUniversalSyncPreCheckResponse
         * @static
         * @param {PAM.PAMUniversalSyncPreCheckResponse} message PAMUniversalSyncPreCheckResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMUniversalSyncPreCheckResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.results = [];
            if (message.results && message.results.length) {
                object.results = [];
                for (let j = 0; j < message.results.length; ++j)
                    object.results[j] = $root.PAM.PAMUniversalSyncPreCheckResult.toObject(message.results[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMUniversalSyncPreCheckResponse to JSON.
         * @function toJSON
         * @memberof PAM.PAMUniversalSyncPreCheckResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMUniversalSyncPreCheckResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMUniversalSyncPreCheckResponse
         * @function getTypeUrl
         * @memberof PAM.PAMUniversalSyncPreCheckResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMUniversalSyncPreCheckResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/PAM.PAMUniversalSyncPreCheckResponse";
        };

        return PAMUniversalSyncPreCheckResponse;
    })();

    return PAM;
})();

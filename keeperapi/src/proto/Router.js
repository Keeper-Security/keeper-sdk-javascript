/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const Router = $root.Router = (() => {

    /**
     * Namespace Router.
     * @exports Router
     * @namespace
     */
    const Router = {};

    /**
     * RouterResponseCode enum.
     * @name Router.RouterResponseCode
     * @enum {number}
     * @property {number} RRC_OK=0 RRC_OK value
     * @property {number} RRC_GENERAL_ERROR=1 RRC_GENERAL_ERROR value
     * @property {number} RRC_NOT_ALLOWED=2 RRC_NOT_ALLOWED value
     * @property {number} RRC_BAD_REQUEST=3 RRC_BAD_REQUEST value
     * @property {number} RRC_TIMEOUT=4 RRC_TIMEOUT value
     * @property {number} RRC_BAD_STATE=5 RRC_BAD_STATE value
     * @property {number} RRC_CONTROLLER_DOWN=6 RRC_CONTROLLER_DOWN value
     * @property {number} RRC_WRONG_INSTANCE=7 RRC_WRONG_INSTANCE value
     * @property {number} RRC_NOT_ALLOWED_ENFORCEMENT_NOT_ENABLED=8 RRC_NOT_ALLOWED_ENFORCEMENT_NOT_ENABLED value
     * @property {number} RRC_NOT_ALLOWED_PAM_CONFIG_FEATURES_NOT_ENABLED=9 RRC_NOT_ALLOWED_PAM_CONFIG_FEATURES_NOT_ENABLED value
     */
    Router.RouterResponseCode = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RRC_OK"] = 0;
        values[valuesById[1] = "RRC_GENERAL_ERROR"] = 1;
        values[valuesById[2] = "RRC_NOT_ALLOWED"] = 2;
        values[valuesById[3] = "RRC_BAD_REQUEST"] = 3;
        values[valuesById[4] = "RRC_TIMEOUT"] = 4;
        values[valuesById[5] = "RRC_BAD_STATE"] = 5;
        values[valuesById[6] = "RRC_CONTROLLER_DOWN"] = 6;
        values[valuesById[7] = "RRC_WRONG_INSTANCE"] = 7;
        values[valuesById[8] = "RRC_NOT_ALLOWED_ENFORCEMENT_NOT_ENABLED"] = 8;
        values[valuesById[9] = "RRC_NOT_ALLOWED_PAM_CONFIG_FEATURES_NOT_ENABLED"] = 9;
        return values;
    })();

    Router.RouterResponse = (function() {

        /**
         * Properties of a RouterResponse.
         * @memberof Router
         * @interface IRouterResponse
         * @property {Router.RouterResponseCode|null} [responseCode] RouterResponse responseCode
         * @property {string|null} [errorMessage] RouterResponse errorMessage
         * @property {Uint8Array|null} [encryptedPayload] RouterResponse encryptedPayload
         */

        /**
         * Constructs a new RouterResponse.
         * @memberof Router
         * @classdesc Represents a RouterResponse.
         * @implements IRouterResponse
         * @constructor
         * @param {Router.IRouterResponse=} [properties] Properties to set
         */
        function RouterResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterResponse responseCode.
         * @member {Router.RouterResponseCode} responseCode
         * @memberof Router.RouterResponse
         * @instance
         */
        RouterResponse.prototype.responseCode = 0;

        /**
         * RouterResponse errorMessage.
         * @member {string} errorMessage
         * @memberof Router.RouterResponse
         * @instance
         */
        RouterResponse.prototype.errorMessage = "";

        /**
         * RouterResponse encryptedPayload.
         * @member {Uint8Array} encryptedPayload
         * @memberof Router.RouterResponse
         * @instance
         */
        RouterResponse.prototype.encryptedPayload = $util.newBuffer([]);

        /**
         * Creates a new RouterResponse instance using the specified properties.
         * @function create
         * @memberof Router.RouterResponse
         * @static
         * @param {Router.IRouterResponse=} [properties] Properties to set
         * @returns {Router.RouterResponse} RouterResponse instance
         */
        RouterResponse.create = function create(properties) {
            return new RouterResponse(properties);
        };

        /**
         * Encodes the specified RouterResponse message. Does not implicitly {@link Router.RouterResponse.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterResponse
         * @static
         * @param {Router.IRouterResponse} message RouterResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.responseCode != null && Object.hasOwnProperty.call(message, "responseCode"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.responseCode);
            if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.errorMessage);
            if (message.encryptedPayload != null && Object.hasOwnProperty.call(message, "encryptedPayload"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.encryptedPayload);
            return writer;
        };

        /**
         * Encodes the specified RouterResponse message, length delimited. Does not implicitly {@link Router.RouterResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterResponse
         * @static
         * @param {Router.IRouterResponse} message RouterResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterResponse} RouterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.responseCode = reader.int32();
                        break;
                    }
                case 2: {
                        message.errorMessage = reader.string();
                        break;
                    }
                case 3: {
                        message.encryptedPayload = reader.bytes();
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
         * Decodes a RouterResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterResponse} RouterResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterResponse message.
         * @function verify
         * @memberof Router.RouterResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.responseCode != null && Object.hasOwnProperty.call(message, "responseCode"))
                switch (message.responseCode) {
                default:
                    return "responseCode: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    break;
                }
            if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                if (!$util.isString(message.errorMessage))
                    return "errorMessage: string expected";
            if (message.encryptedPayload != null && Object.hasOwnProperty.call(message, "encryptedPayload"))
                if (!(message.encryptedPayload && typeof message.encryptedPayload.length === "number" || $util.isString(message.encryptedPayload)))
                    return "encryptedPayload: buffer expected";
            return null;
        };

        /**
         * Creates a RouterResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterResponse} RouterResponse
         */
        RouterResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterResponse();
            switch (object.responseCode) {
            default:
                if (typeof object.responseCode === "number") {
                    message.responseCode = object.responseCode;
                    break;
                }
                break;
            case "RRC_OK":
            case 0:
                message.responseCode = 0;
                break;
            case "RRC_GENERAL_ERROR":
            case 1:
                message.responseCode = 1;
                break;
            case "RRC_NOT_ALLOWED":
            case 2:
                message.responseCode = 2;
                break;
            case "RRC_BAD_REQUEST":
            case 3:
                message.responseCode = 3;
                break;
            case "RRC_TIMEOUT":
            case 4:
                message.responseCode = 4;
                break;
            case "RRC_BAD_STATE":
            case 5:
                message.responseCode = 5;
                break;
            case "RRC_CONTROLLER_DOWN":
            case 6:
                message.responseCode = 6;
                break;
            case "RRC_WRONG_INSTANCE":
            case 7:
                message.responseCode = 7;
                break;
            case "RRC_NOT_ALLOWED_ENFORCEMENT_NOT_ENABLED":
            case 8:
                message.responseCode = 8;
                break;
            case "RRC_NOT_ALLOWED_PAM_CONFIG_FEATURES_NOT_ENABLED":
            case 9:
                message.responseCode = 9;
                break;
            }
            if (object.errorMessage != null)
                message.errorMessage = String(object.errorMessage);
            if (object.encryptedPayload != null)
                if (typeof object.encryptedPayload === "string")
                    $util.base64.decode(object.encryptedPayload, message.encryptedPayload = $util.newBuffer($util.base64.length(object.encryptedPayload)), 0);
                else if (object.encryptedPayload.length >= 0)
                    message.encryptedPayload = object.encryptedPayload;
            return message;
        };

        /**
         * Creates a plain object from a RouterResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterResponse
         * @static
         * @param {Router.RouterResponse} message RouterResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.responseCode = options.enums === String ? "RRC_OK" : 0;
                object.errorMessage = "";
                if (options.bytes === String)
                    object.encryptedPayload = "";
                else {
                    object.encryptedPayload = [];
                    if (options.bytes !== Array)
                        object.encryptedPayload = $util.newBuffer(object.encryptedPayload);
                }
            }
            if (message.responseCode != null && Object.hasOwnProperty.call(message, "responseCode"))
                object.responseCode = options.enums === String ? $root.Router.RouterResponseCode[message.responseCode] === undefined ? message.responseCode : $root.Router.RouterResponseCode[message.responseCode] : message.responseCode;
            if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                object.errorMessage = message.errorMessage;
            if (message.encryptedPayload != null && Object.hasOwnProperty.call(message, "encryptedPayload"))
                object.encryptedPayload = options.bytes === String ? $util.base64.encode(message.encryptedPayload, 0, message.encryptedPayload.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedPayload) : message.encryptedPayload;
            return object;
        };

        /**
         * Converts this RouterResponse to JSON.
         * @function toJSON
         * @memberof Router.RouterResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterResponse
         * @function getTypeUrl
         * @memberof Router.RouterResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterResponse";
        };

        return RouterResponse;
    })();

    Router.RouterControllerMessage = (function() {

        /**
         * Properties of a RouterControllerMessage.
         * @memberof Router
         * @interface IRouterControllerMessage
         * @property {PAM.ControllerMessageType|null} [messageType] RouterControllerMessage messageType
         * @property {Uint8Array|null} [messageUid] RouterControllerMessage messageUid
         * @property {Uint8Array|null} [controllerUid] RouterControllerMessage controllerUid
         * @property {boolean|null} [streamResponse] RouterControllerMessage streamResponse
         * @property {Uint8Array|null} [payload] RouterControllerMessage payload
         * @property {number|null} [timeout] RouterControllerMessage timeout
         */

        /**
         * Constructs a new RouterControllerMessage.
         * @memberof Router
         * @classdesc Represents a RouterControllerMessage.
         * @implements IRouterControllerMessage
         * @constructor
         * @param {Router.IRouterControllerMessage=} [properties] Properties to set
         */
        function RouterControllerMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterControllerMessage messageType.
         * @member {PAM.ControllerMessageType} messageType
         * @memberof Router.RouterControllerMessage
         * @instance
         */
        RouterControllerMessage.prototype.messageType = 0;

        /**
         * RouterControllerMessage messageUid.
         * @member {Uint8Array} messageUid
         * @memberof Router.RouterControllerMessage
         * @instance
         */
        RouterControllerMessage.prototype.messageUid = $util.newBuffer([]);

        /**
         * RouterControllerMessage controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof Router.RouterControllerMessage
         * @instance
         */
        RouterControllerMessage.prototype.controllerUid = $util.newBuffer([]);

        /**
         * RouterControllerMessage streamResponse.
         * @member {boolean} streamResponse
         * @memberof Router.RouterControllerMessage
         * @instance
         */
        RouterControllerMessage.prototype.streamResponse = false;

        /**
         * RouterControllerMessage payload.
         * @member {Uint8Array} payload
         * @memberof Router.RouterControllerMessage
         * @instance
         */
        RouterControllerMessage.prototype.payload = $util.newBuffer([]);

        /**
         * RouterControllerMessage timeout.
         * @member {number} timeout
         * @memberof Router.RouterControllerMessage
         * @instance
         */
        RouterControllerMessage.prototype.timeout = 0;

        /**
         * Creates a new RouterControllerMessage instance using the specified properties.
         * @function create
         * @memberof Router.RouterControllerMessage
         * @static
         * @param {Router.IRouterControllerMessage=} [properties] Properties to set
         * @returns {Router.RouterControllerMessage} RouterControllerMessage instance
         */
        RouterControllerMessage.create = function create(properties) {
            return new RouterControllerMessage(properties);
        };

        /**
         * Encodes the specified RouterControllerMessage message. Does not implicitly {@link Router.RouterControllerMessage.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterControllerMessage
         * @static
         * @param {Router.IRouterControllerMessage} message RouterControllerMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterControllerMessage.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.messageType);
            if (message.messageUid != null && Object.hasOwnProperty.call(message, "messageUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.messageUid);
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.controllerUid);
            if (message.streamResponse != null && Object.hasOwnProperty.call(message, "streamResponse"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.streamResponse);
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.payload);
            if (message.timeout != null && Object.hasOwnProperty.call(message, "timeout"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.timeout);
            return writer;
        };

        /**
         * Encodes the specified RouterControllerMessage message, length delimited. Does not implicitly {@link Router.RouterControllerMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterControllerMessage
         * @static
         * @param {Router.IRouterControllerMessage} message RouterControllerMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterControllerMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterControllerMessage message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterControllerMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterControllerMessage} RouterControllerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterControllerMessage.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterControllerMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.messageType = reader.int32();
                        break;
                    }
                case 2: {
                        message.messageUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.streamResponse = reader.bool();
                        break;
                    }
                case 5: {
                        message.payload = reader.bytes();
                        break;
                    }
                case 6: {
                        message.timeout = reader.int32();
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
         * Decodes a RouterControllerMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterControllerMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterControllerMessage} RouterControllerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterControllerMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterControllerMessage message.
         * @function verify
         * @memberof Router.RouterControllerMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterControllerMessage.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                switch (message.messageType) {
                default:
                    return "messageType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    break;
                }
            if (message.messageUid != null && Object.hasOwnProperty.call(message, "messageUid"))
                if (!(message.messageUid && typeof message.messageUid.length === "number" || $util.isString(message.messageUid)))
                    return "messageUid: buffer expected";
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                if (!(message.controllerUid && typeof message.controllerUid.length === "number" || $util.isString(message.controllerUid)))
                    return "controllerUid: buffer expected";
            if (message.streamResponse != null && Object.hasOwnProperty.call(message, "streamResponse"))
                if (typeof message.streamResponse !== "boolean")
                    return "streamResponse: boolean expected";
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                    return "payload: buffer expected";
            if (message.timeout != null && Object.hasOwnProperty.call(message, "timeout"))
                if (!$util.isInteger(message.timeout))
                    return "timeout: integer expected";
            return null;
        };

        /**
         * Creates a RouterControllerMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterControllerMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterControllerMessage} RouterControllerMessage
         */
        RouterControllerMessage.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterControllerMessage)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterControllerMessage: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterControllerMessage();
            switch (object.messageType) {
            default:
                if (typeof object.messageType === "number") {
                    message.messageType = object.messageType;
                    break;
                }
                break;
            case "CMT_GENERAL":
            case 0:
                message.messageType = 0;
                break;
            case "CMT_ROTATE":
            case 1:
                message.messageType = 1;
                break;
            case "CMT_DISCOVERY":
            case 2:
                message.messageType = 2;
                break;
            case "CMT_CONNECT":
            case 3:
                message.messageType = 3;
                break;
            case "CMT_ANALYZE_RECORDING":
            case 4:
                message.messageType = 4;
                break;
            case "CMT_WORKFLOW_ACCESS_ELEVATION":
            case 5:
                message.messageType = 5;
                break;
            case "CMT_USS":
            case 6:
                message.messageType = 6;
                break;
            case "CMT_INFO":
            case 7:
                message.messageType = 7;
                break;
            case "CMT_AUTOMATION":
            case 8:
                message.messageType = 8;
                break;
            }
            if (object.messageUid != null)
                if (typeof object.messageUid === "string")
                    $util.base64.decode(object.messageUid, message.messageUid = $util.newBuffer($util.base64.length(object.messageUid)), 0);
                else if (object.messageUid.length >= 0)
                    message.messageUid = object.messageUid;
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            if (object.streamResponse != null)
                message.streamResponse = Boolean(object.streamResponse);
            if (object.payload != null)
                if (typeof object.payload === "string")
                    $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                else if (object.payload.length >= 0)
                    message.payload = object.payload;
            if (object.timeout != null)
                message.timeout = object.timeout | 0;
            return message;
        };

        /**
         * Creates a plain object from a RouterControllerMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterControllerMessage
         * @static
         * @param {Router.RouterControllerMessage} message RouterControllerMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterControllerMessage.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.messageType = options.enums === String ? "CMT_GENERAL" : 0;
                if (options.bytes === String)
                    object.messageUid = "";
                else {
                    object.messageUid = [];
                    if (options.bytes !== Array)
                        object.messageUid = $util.newBuffer(object.messageUid);
                }
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
                object.streamResponse = false;
                if (options.bytes === String)
                    object.payload = "";
                else {
                    object.payload = [];
                    if (options.bytes !== Array)
                        object.payload = $util.newBuffer(object.payload);
                }
                object.timeout = 0;
            }
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                object.messageType = options.enums === String ? $root.PAM.ControllerMessageType[message.messageType] === undefined ? message.messageType : $root.PAM.ControllerMessageType[message.messageType] : message.messageType;
            if (message.messageUid != null && Object.hasOwnProperty.call(message, "messageUid"))
                object.messageUid = options.bytes === String ? $util.base64.encode(message.messageUid, 0, message.messageUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.messageUid) : message.messageUid;
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.streamResponse != null && Object.hasOwnProperty.call(message, "streamResponse"))
                object.streamResponse = message.streamResponse;
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
            if (message.timeout != null && Object.hasOwnProperty.call(message, "timeout"))
                object.timeout = message.timeout;
            return object;
        };

        /**
         * Converts this RouterControllerMessage to JSON.
         * @function toJSON
         * @memberof Router.RouterControllerMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterControllerMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterControllerMessage
         * @function getTypeUrl
         * @memberof Router.RouterControllerMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterControllerMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterControllerMessage";
        };

        return RouterControllerMessage;
    })();

    Router.RouterUserAuth = (function() {

        /**
         * Properties of a RouterUserAuth.
         * @memberof Router
         * @interface IRouterUserAuth
         * @property {Uint8Array|null} [transmissionKey] RouterUserAuth transmissionKey
         * @property {Uint8Array|null} [sessionToken] RouterUserAuth sessionToken
         * @property {number|null} [userId] RouterUserAuth userId
         * @property {number|null} [enterpriseUserId] RouterUserAuth enterpriseUserId
         * @property {string|null} [deviceName] RouterUserAuth deviceName
         * @property {Uint8Array|null} [deviceToken] RouterUserAuth deviceToken
         * @property {number|null} [clientVersionId] RouterUserAuth clientVersionId
         * @property {boolean|null} [needUsername] RouterUserAuth needUsername
         * @property {string|null} [username] RouterUserAuth username
         * @property {number|null} [mspEnterpriseId] RouterUserAuth mspEnterpriseId
         * @property {boolean|null} [isPedmAdmin] RouterUserAuth isPedmAdmin
         * @property {number|null} [mcEnterpriseId] RouterUserAuth mcEnterpriseId
         */

        /**
         * Constructs a new RouterUserAuth.
         * @memberof Router
         * @classdesc Represents a RouterUserAuth.
         * @implements IRouterUserAuth
         * @constructor
         * @param {Router.IRouterUserAuth=} [properties] Properties to set
         */
        function RouterUserAuth(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterUserAuth transmissionKey.
         * @member {Uint8Array} transmissionKey
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.transmissionKey = $util.newBuffer([]);

        /**
         * RouterUserAuth sessionToken.
         * @member {Uint8Array} sessionToken
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.sessionToken = $util.newBuffer([]);

        /**
         * RouterUserAuth userId.
         * @member {number} userId
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.userId = 0;

        /**
         * RouterUserAuth enterpriseUserId.
         * @member {number} enterpriseUserId
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RouterUserAuth deviceName.
         * @member {string} deviceName
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.deviceName = "";

        /**
         * RouterUserAuth deviceToken.
         * @member {Uint8Array} deviceToken
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.deviceToken = $util.newBuffer([]);

        /**
         * RouterUserAuth clientVersionId.
         * @member {number} clientVersionId
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.clientVersionId = 0;

        /**
         * RouterUserAuth needUsername.
         * @member {boolean} needUsername
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.needUsername = false;

        /**
         * RouterUserAuth username.
         * @member {string} username
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.username = "";

        /**
         * RouterUserAuth mspEnterpriseId.
         * @member {number} mspEnterpriseId
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.mspEnterpriseId = 0;

        /**
         * RouterUserAuth isPedmAdmin.
         * @member {boolean} isPedmAdmin
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.isPedmAdmin = false;

        /**
         * RouterUserAuth mcEnterpriseId.
         * @member {number} mcEnterpriseId
         * @memberof Router.RouterUserAuth
         * @instance
         */
        RouterUserAuth.prototype.mcEnterpriseId = 0;

        /**
         * Creates a new RouterUserAuth instance using the specified properties.
         * @function create
         * @memberof Router.RouterUserAuth
         * @static
         * @param {Router.IRouterUserAuth=} [properties] Properties to set
         * @returns {Router.RouterUserAuth} RouterUserAuth instance
         */
        RouterUserAuth.create = function create(properties) {
            return new RouterUserAuth(properties);
        };

        /**
         * Encodes the specified RouterUserAuth message. Does not implicitly {@link Router.RouterUserAuth.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterUserAuth
         * @static
         * @param {Router.IRouterUserAuth} message RouterUserAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterUserAuth.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.transmissionKey);
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.sessionToken);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.userId);
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.enterpriseUserId);
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.deviceName);
            if (message.deviceToken != null && Object.hasOwnProperty.call(message, "deviceToken"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.deviceToken);
            if (message.clientVersionId != null && Object.hasOwnProperty.call(message, "clientVersionId"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.clientVersionId);
            if (message.needUsername != null && Object.hasOwnProperty.call(message, "needUsername"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.needUsername);
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.username);
            if (message.mspEnterpriseId != null && Object.hasOwnProperty.call(message, "mspEnterpriseId"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.mspEnterpriseId);
            if (message.isPedmAdmin != null && Object.hasOwnProperty.call(message, "isPedmAdmin"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.isPedmAdmin);
            if (message.mcEnterpriseId != null && Object.hasOwnProperty.call(message, "mcEnterpriseId"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.mcEnterpriseId);
            return writer;
        };

        /**
         * Encodes the specified RouterUserAuth message, length delimited. Does not implicitly {@link Router.RouterUserAuth.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterUserAuth
         * @static
         * @param {Router.IRouterUserAuth} message RouterUserAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterUserAuth.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterUserAuth message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterUserAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterUserAuth} RouterUserAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterUserAuth.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterUserAuth();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.transmissionKey = reader.bytes();
                        break;
                    }
                case 2: {
                        message.sessionToken = reader.bytes();
                        break;
                    }
                case 3: {
                        message.userId = reader.int32();
                        break;
                    }
                case 4: {
                        message.enterpriseUserId = reader.int64();
                        break;
                    }
                case 5: {
                        message.deviceName = reader.string();
                        break;
                    }
                case 6: {
                        message.deviceToken = reader.bytes();
                        break;
                    }
                case 7: {
                        message.clientVersionId = reader.int32();
                        break;
                    }
                case 8: {
                        message.needUsername = reader.bool();
                        break;
                    }
                case 9: {
                        message.username = reader.string();
                        break;
                    }
                case 10: {
                        message.mspEnterpriseId = reader.int32();
                        break;
                    }
                case 11: {
                        message.isPedmAdmin = reader.bool();
                        break;
                    }
                case 12: {
                        message.mcEnterpriseId = reader.int32();
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
         * Decodes a RouterUserAuth message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterUserAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterUserAuth} RouterUserAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterUserAuth.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterUserAuth message.
         * @function verify
         * @memberof Router.RouterUserAuth
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterUserAuth.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                if (!(message.transmissionKey && typeof message.transmissionKey.length === "number" || $util.isString(message.transmissionKey)))
                    return "transmissionKey: buffer expected";
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                if (!(message.sessionToken && typeof message.sessionToken.length === "number" || $util.isString(message.sessionToken)))
                    return "sessionToken: buffer expected";
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                if (!$util.isInteger(message.enterpriseUserId) && !(message.enterpriseUserId && $util.isInteger(message.enterpriseUserId.low) && $util.isInteger(message.enterpriseUserId.high)))
                    return "enterpriseUserId: integer|Long expected";
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                if (!$util.isString(message.deviceName))
                    return "deviceName: string expected";
            if (message.deviceToken != null && Object.hasOwnProperty.call(message, "deviceToken"))
                if (!(message.deviceToken && typeof message.deviceToken.length === "number" || $util.isString(message.deviceToken)))
                    return "deviceToken: buffer expected";
            if (message.clientVersionId != null && Object.hasOwnProperty.call(message, "clientVersionId"))
                if (!$util.isInteger(message.clientVersionId))
                    return "clientVersionId: integer expected";
            if (message.needUsername != null && Object.hasOwnProperty.call(message, "needUsername"))
                if (typeof message.needUsername !== "boolean")
                    return "needUsername: boolean expected";
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.mspEnterpriseId != null && Object.hasOwnProperty.call(message, "mspEnterpriseId"))
                if (!$util.isInteger(message.mspEnterpriseId))
                    return "mspEnterpriseId: integer expected";
            if (message.isPedmAdmin != null && Object.hasOwnProperty.call(message, "isPedmAdmin"))
                if (typeof message.isPedmAdmin !== "boolean")
                    return "isPedmAdmin: boolean expected";
            if (message.mcEnterpriseId != null && Object.hasOwnProperty.call(message, "mcEnterpriseId"))
                if (!$util.isInteger(message.mcEnterpriseId))
                    return "mcEnterpriseId: integer expected";
            return null;
        };

        /**
         * Creates a RouterUserAuth message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterUserAuth
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterUserAuth} RouterUserAuth
         */
        RouterUserAuth.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterUserAuth)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterUserAuth: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterUserAuth();
            if (object.transmissionKey != null)
                if (typeof object.transmissionKey === "string")
                    $util.base64.decode(object.transmissionKey, message.transmissionKey = $util.newBuffer($util.base64.length(object.transmissionKey)), 0);
                else if (object.transmissionKey.length >= 0)
                    message.transmissionKey = object.transmissionKey;
            if (object.sessionToken != null)
                if (typeof object.sessionToken === "string")
                    $util.base64.decode(object.sessionToken, message.sessionToken = $util.newBuffer($util.base64.length(object.sessionToken)), 0);
                else if (object.sessionToken.length >= 0)
                    message.sessionToken = object.sessionToken;
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.enterpriseUserId != null)
                if ($util.Long)
                    message.enterpriseUserId = $util.Long.fromValue(object.enterpriseUserId, false);
                else if (typeof object.enterpriseUserId === "string")
                    message.enterpriseUserId = parseInt(object.enterpriseUserId, 10);
                else if (typeof object.enterpriseUserId === "number")
                    message.enterpriseUserId = object.enterpriseUserId;
                else if (typeof object.enterpriseUserId === "object")
                    message.enterpriseUserId = new $util.LongBits(object.enterpriseUserId.low >>> 0, object.enterpriseUserId.high >>> 0).toNumber();
            if (object.deviceName != null)
                message.deviceName = String(object.deviceName);
            if (object.deviceToken != null)
                if (typeof object.deviceToken === "string")
                    $util.base64.decode(object.deviceToken, message.deviceToken = $util.newBuffer($util.base64.length(object.deviceToken)), 0);
                else if (object.deviceToken.length >= 0)
                    message.deviceToken = object.deviceToken;
            if (object.clientVersionId != null)
                message.clientVersionId = object.clientVersionId | 0;
            if (object.needUsername != null)
                message.needUsername = Boolean(object.needUsername);
            if (object.username != null)
                message.username = String(object.username);
            if (object.mspEnterpriseId != null)
                message.mspEnterpriseId = object.mspEnterpriseId | 0;
            if (object.isPedmAdmin != null)
                message.isPedmAdmin = Boolean(object.isPedmAdmin);
            if (object.mcEnterpriseId != null)
                message.mcEnterpriseId = object.mcEnterpriseId | 0;
            return message;
        };

        /**
         * Creates a plain object from a RouterUserAuth message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterUserAuth
         * @static
         * @param {Router.RouterUserAuth} message RouterUserAuth
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterUserAuth.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.transmissionKey = "";
                else {
                    object.transmissionKey = [];
                    if (options.bytes !== Array)
                        object.transmissionKey = $util.newBuffer(object.transmissionKey);
                }
                if (options.bytes === String)
                    object.sessionToken = "";
                else {
                    object.sessionToken = [];
                    if (options.bytes !== Array)
                        object.sessionToken = $util.newBuffer(object.sessionToken);
                }
                object.userId = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.enterpriseUserId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.enterpriseUserId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.deviceName = "";
                if (options.bytes === String)
                    object.deviceToken = "";
                else {
                    object.deviceToken = [];
                    if (options.bytes !== Array)
                        object.deviceToken = $util.newBuffer(object.deviceToken);
                }
                object.clientVersionId = 0;
                object.needUsername = false;
                object.username = "";
                object.mspEnterpriseId = 0;
                object.isPedmAdmin = false;
                object.mcEnterpriseId = 0;
            }
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                object.transmissionKey = options.bytes === String ? $util.base64.encode(message.transmissionKey, 0, message.transmissionKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.transmissionKey) : message.transmissionKey;
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                object.sessionToken = options.bytes === String ? $util.base64.encode(message.sessionToken, 0, message.sessionToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.sessionToken) : message.sessionToken;
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                object.userId = message.userId;
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.enterpriseUserId = typeof message.enterpriseUserId === "number" ? BigInt(message.enterpriseUserId) : $util.Long.fromBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0, false).toBigInt();
                else if (typeof message.enterpriseUserId === "number")
                    object.enterpriseUserId = options.longs === String ? String(message.enterpriseUserId) : message.enterpriseUserId;
                else
                    object.enterpriseUserId = options.longs === String ? $util.Long.prototype.toString.call(message.enterpriseUserId) : options.longs === Number ? new $util.LongBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0).toNumber() : message.enterpriseUserId;
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                object.deviceName = message.deviceName;
            if (message.deviceToken != null && Object.hasOwnProperty.call(message, "deviceToken"))
                object.deviceToken = options.bytes === String ? $util.base64.encode(message.deviceToken, 0, message.deviceToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.deviceToken) : message.deviceToken;
            if (message.clientVersionId != null && Object.hasOwnProperty.call(message, "clientVersionId"))
                object.clientVersionId = message.clientVersionId;
            if (message.needUsername != null && Object.hasOwnProperty.call(message, "needUsername"))
                object.needUsername = message.needUsername;
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.mspEnterpriseId != null && Object.hasOwnProperty.call(message, "mspEnterpriseId"))
                object.mspEnterpriseId = message.mspEnterpriseId;
            if (message.isPedmAdmin != null && Object.hasOwnProperty.call(message, "isPedmAdmin"))
                object.isPedmAdmin = message.isPedmAdmin;
            if (message.mcEnterpriseId != null && Object.hasOwnProperty.call(message, "mcEnterpriseId"))
                object.mcEnterpriseId = message.mcEnterpriseId;
            return object;
        };

        /**
         * Converts this RouterUserAuth to JSON.
         * @function toJSON
         * @memberof Router.RouterUserAuth
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterUserAuth.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterUserAuth
         * @function getTypeUrl
         * @memberof Router.RouterUserAuth
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterUserAuth.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterUserAuth";
        };

        return RouterUserAuth;
    })();

    Router.RouterDeviceAuth = (function() {

        /**
         * Properties of a RouterDeviceAuth.
         * @memberof Router
         * @interface IRouterDeviceAuth
         * @property {string|null} [clientId] RouterDeviceAuth clientId
         * @property {string|null} [clientVersion] RouterDeviceAuth clientVersion
         * @property {Uint8Array|null} [signature] RouterDeviceAuth signature
         * @property {number|null} [enterpriseId] RouterDeviceAuth enterpriseId
         * @property {number|null} [nodeId] RouterDeviceAuth nodeId
         * @property {string|null} [deviceName] RouterDeviceAuth deviceName
         * @property {Uint8Array|null} [deviceToken] RouterDeviceAuth deviceToken
         * @property {string|null} [controllerName] RouterDeviceAuth controllerName
         * @property {Uint8Array|null} [controllerUid] RouterDeviceAuth controllerUid
         * @property {string|null} [ownerUser] RouterDeviceAuth ownerUser
         * @property {string|null} [challenge] RouterDeviceAuth challenge
         * @property {number|null} [ownerId] RouterDeviceAuth ownerId
         * @property {number|null} [maxInstanceCount] RouterDeviceAuth maxInstanceCount
         */

        /**
         * Constructs a new RouterDeviceAuth.
         * @memberof Router
         * @classdesc Represents a RouterDeviceAuth.
         * @implements IRouterDeviceAuth
         * @constructor
         * @param {Router.IRouterDeviceAuth=} [properties] Properties to set
         */
        function RouterDeviceAuth(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterDeviceAuth clientId.
         * @member {string} clientId
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.clientId = "";

        /**
         * RouterDeviceAuth clientVersion.
         * @member {string} clientVersion
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.clientVersion = "";

        /**
         * RouterDeviceAuth signature.
         * @member {Uint8Array} signature
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.signature = $util.newBuffer([]);

        /**
         * RouterDeviceAuth enterpriseId.
         * @member {number} enterpriseId
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.enterpriseId = 0;

        /**
         * RouterDeviceAuth nodeId.
         * @member {number} nodeId
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RouterDeviceAuth deviceName.
         * @member {string} deviceName
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.deviceName = "";

        /**
         * RouterDeviceAuth deviceToken.
         * @member {Uint8Array} deviceToken
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.deviceToken = $util.newBuffer([]);

        /**
         * RouterDeviceAuth controllerName.
         * @member {string} controllerName
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.controllerName = "";

        /**
         * RouterDeviceAuth controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.controllerUid = $util.newBuffer([]);

        /**
         * RouterDeviceAuth ownerUser.
         * @member {string} ownerUser
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.ownerUser = "";

        /**
         * RouterDeviceAuth challenge.
         * @member {string} challenge
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.challenge = "";

        /**
         * RouterDeviceAuth ownerId.
         * @member {number} ownerId
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.ownerId = 0;

        /**
         * RouterDeviceAuth maxInstanceCount.
         * @member {number} maxInstanceCount
         * @memberof Router.RouterDeviceAuth
         * @instance
         */
        RouterDeviceAuth.prototype.maxInstanceCount = 0;

        /**
         * Creates a new RouterDeviceAuth instance using the specified properties.
         * @function create
         * @memberof Router.RouterDeviceAuth
         * @static
         * @param {Router.IRouterDeviceAuth=} [properties] Properties to set
         * @returns {Router.RouterDeviceAuth} RouterDeviceAuth instance
         */
        RouterDeviceAuth.create = function create(properties) {
            return new RouterDeviceAuth(properties);
        };

        /**
         * Encodes the specified RouterDeviceAuth message. Does not implicitly {@link Router.RouterDeviceAuth.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterDeviceAuth
         * @static
         * @param {Router.IRouterDeviceAuth} message RouterDeviceAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterDeviceAuth.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientId);
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.clientVersion);
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.signature);
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.enterpriseId);
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.nodeId);
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.deviceName);
            if (message.deviceToken != null && Object.hasOwnProperty.call(message, "deviceToken"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.deviceToken);
            if (message.controllerName != null && Object.hasOwnProperty.call(message, "controllerName"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.controllerName);
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.controllerUid);
            if (message.ownerUser != null && Object.hasOwnProperty.call(message, "ownerUser"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.ownerUser);
            if (message.challenge != null && Object.hasOwnProperty.call(message, "challenge"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.challenge);
            if (message.ownerId != null && Object.hasOwnProperty.call(message, "ownerId"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.ownerId);
            if (message.maxInstanceCount != null && Object.hasOwnProperty.call(message, "maxInstanceCount"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.maxInstanceCount);
            return writer;
        };

        /**
         * Encodes the specified RouterDeviceAuth message, length delimited. Does not implicitly {@link Router.RouterDeviceAuth.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterDeviceAuth
         * @static
         * @param {Router.IRouterDeviceAuth} message RouterDeviceAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterDeviceAuth.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterDeviceAuth message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterDeviceAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterDeviceAuth} RouterDeviceAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterDeviceAuth.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterDeviceAuth();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.clientId = reader.string();
                        break;
                    }
                case 2: {
                        message.clientVersion = reader.string();
                        break;
                    }
                case 3: {
                        message.signature = reader.bytes();
                        break;
                    }
                case 4: {
                        message.enterpriseId = reader.int32();
                        break;
                    }
                case 5: {
                        message.nodeId = reader.int64();
                        break;
                    }
                case 6: {
                        message.deviceName = reader.string();
                        break;
                    }
                case 7: {
                        message.deviceToken = reader.bytes();
                        break;
                    }
                case 8: {
                        message.controllerName = reader.string();
                        break;
                    }
                case 9: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 10: {
                        message.ownerUser = reader.string();
                        break;
                    }
                case 11: {
                        message.challenge = reader.string();
                        break;
                    }
                case 12: {
                        message.ownerId = reader.int32();
                        break;
                    }
                case 13: {
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
         * Decodes a RouterDeviceAuth message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterDeviceAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterDeviceAuth} RouterDeviceAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterDeviceAuth.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterDeviceAuth message.
         * @function verify
         * @memberof Router.RouterDeviceAuth
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterDeviceAuth.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
                if (!$util.isString(message.clientId))
                    return "clientId: string expected";
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                if (!$util.isString(message.clientVersion))
                    return "clientVersion: string expected";
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                    return "signature: buffer expected";
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                if (!$util.isInteger(message.enterpriseId))
                    return "enterpriseId: integer expected";
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (!$util.isInteger(message.nodeId) && !(message.nodeId && $util.isInteger(message.nodeId.low) && $util.isInteger(message.nodeId.high)))
                    return "nodeId: integer|Long expected";
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                if (!$util.isString(message.deviceName))
                    return "deviceName: string expected";
            if (message.deviceToken != null && Object.hasOwnProperty.call(message, "deviceToken"))
                if (!(message.deviceToken && typeof message.deviceToken.length === "number" || $util.isString(message.deviceToken)))
                    return "deviceToken: buffer expected";
            if (message.controllerName != null && Object.hasOwnProperty.call(message, "controllerName"))
                if (!$util.isString(message.controllerName))
                    return "controllerName: string expected";
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                if (!(message.controllerUid && typeof message.controllerUid.length === "number" || $util.isString(message.controllerUid)))
                    return "controllerUid: buffer expected";
            if (message.ownerUser != null && Object.hasOwnProperty.call(message, "ownerUser"))
                if (!$util.isString(message.ownerUser))
                    return "ownerUser: string expected";
            if (message.challenge != null && Object.hasOwnProperty.call(message, "challenge"))
                if (!$util.isString(message.challenge))
                    return "challenge: string expected";
            if (message.ownerId != null && Object.hasOwnProperty.call(message, "ownerId"))
                if (!$util.isInteger(message.ownerId))
                    return "ownerId: integer expected";
            if (message.maxInstanceCount != null && Object.hasOwnProperty.call(message, "maxInstanceCount"))
                if (!$util.isInteger(message.maxInstanceCount))
                    return "maxInstanceCount: integer expected";
            return null;
        };

        /**
         * Creates a RouterDeviceAuth message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterDeviceAuth
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterDeviceAuth} RouterDeviceAuth
         */
        RouterDeviceAuth.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterDeviceAuth)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterDeviceAuth: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterDeviceAuth();
            if (object.clientId != null)
                message.clientId = String(object.clientId);
            if (object.clientVersion != null)
                message.clientVersion = String(object.clientVersion);
            if (object.signature != null)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length >= 0)
                    message.signature = object.signature;
            if (object.enterpriseId != null)
                message.enterpriseId = object.enterpriseId | 0;
            if (object.nodeId != null)
                if ($util.Long)
                    message.nodeId = $util.Long.fromValue(object.nodeId, false);
                else if (typeof object.nodeId === "string")
                    message.nodeId = parseInt(object.nodeId, 10);
                else if (typeof object.nodeId === "number")
                    message.nodeId = object.nodeId;
                else if (typeof object.nodeId === "object")
                    message.nodeId = new $util.LongBits(object.nodeId.low >>> 0, object.nodeId.high >>> 0).toNumber();
            if (object.deviceName != null)
                message.deviceName = String(object.deviceName);
            if (object.deviceToken != null)
                if (typeof object.deviceToken === "string")
                    $util.base64.decode(object.deviceToken, message.deviceToken = $util.newBuffer($util.base64.length(object.deviceToken)), 0);
                else if (object.deviceToken.length >= 0)
                    message.deviceToken = object.deviceToken;
            if (object.controllerName != null)
                message.controllerName = String(object.controllerName);
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            if (object.ownerUser != null)
                message.ownerUser = String(object.ownerUser);
            if (object.challenge != null)
                message.challenge = String(object.challenge);
            if (object.ownerId != null)
                message.ownerId = object.ownerId | 0;
            if (object.maxInstanceCount != null)
                message.maxInstanceCount = object.maxInstanceCount | 0;
            return message;
        };

        /**
         * Creates a plain object from a RouterDeviceAuth message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterDeviceAuth
         * @static
         * @param {Router.RouterDeviceAuth} message RouterDeviceAuth
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterDeviceAuth.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.clientId = "";
                object.clientVersion = "";
                if (options.bytes === String)
                    object.signature = "";
                else {
                    object.signature = [];
                    if (options.bytes !== Array)
                        object.signature = $util.newBuffer(object.signature);
                }
                object.enterpriseId = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.nodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.nodeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.deviceName = "";
                if (options.bytes === String)
                    object.deviceToken = "";
                else {
                    object.deviceToken = [];
                    if (options.bytes !== Array)
                        object.deviceToken = $util.newBuffer(object.deviceToken);
                }
                object.controllerName = "";
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
                object.ownerUser = "";
                object.challenge = "";
                object.ownerId = 0;
                object.maxInstanceCount = 0;
            }
            if (message.clientId != null && Object.hasOwnProperty.call(message, "clientId"))
                object.clientId = message.clientId;
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                object.clientVersion = message.clientVersion;
            if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
                object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                object.enterpriseId = message.enterpriseId;
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nodeId = typeof message.nodeId === "number" ? BigInt(message.nodeId) : $util.Long.fromBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0, false).toBigInt();
                else if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber() : message.nodeId;
            if (message.deviceName != null && Object.hasOwnProperty.call(message, "deviceName"))
                object.deviceName = message.deviceName;
            if (message.deviceToken != null && Object.hasOwnProperty.call(message, "deviceToken"))
                object.deviceToken = options.bytes === String ? $util.base64.encode(message.deviceToken, 0, message.deviceToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.deviceToken) : message.deviceToken;
            if (message.controllerName != null && Object.hasOwnProperty.call(message, "controllerName"))
                object.controllerName = message.controllerName;
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.ownerUser != null && Object.hasOwnProperty.call(message, "ownerUser"))
                object.ownerUser = message.ownerUser;
            if (message.challenge != null && Object.hasOwnProperty.call(message, "challenge"))
                object.challenge = message.challenge;
            if (message.ownerId != null && Object.hasOwnProperty.call(message, "ownerId"))
                object.ownerId = message.ownerId;
            if (message.maxInstanceCount != null && Object.hasOwnProperty.call(message, "maxInstanceCount"))
                object.maxInstanceCount = message.maxInstanceCount;
            return object;
        };

        /**
         * Converts this RouterDeviceAuth to JSON.
         * @function toJSON
         * @memberof Router.RouterDeviceAuth
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterDeviceAuth.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterDeviceAuth
         * @function getTypeUrl
         * @memberof Router.RouterDeviceAuth
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterDeviceAuth.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterDeviceAuth";
        };

        return RouterDeviceAuth;
    })();

    Router.RouterRecordRotation = (function() {

        /**
         * Properties of a RouterRecordRotation.
         * @memberof Router
         * @interface IRouterRecordRotation
         * @property {Uint8Array|null} [recordUid] RouterRecordRotation recordUid
         * @property {Uint8Array|null} [configurationUid] RouterRecordRotation configurationUid
         * @property {Uint8Array|null} [controllerUid] RouterRecordRotation controllerUid
         * @property {Uint8Array|null} [resourceUid] RouterRecordRotation resourceUid
         * @property {boolean|null} [noSchedule] RouterRecordRotation noSchedule
         */

        /**
         * Constructs a new RouterRecordRotation.
         * @memberof Router
         * @classdesc Represents a RouterRecordRotation.
         * @implements IRouterRecordRotation
         * @constructor
         * @param {Router.IRouterRecordRotation=} [properties] Properties to set
         */
        function RouterRecordRotation(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterRecordRotation recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Router.RouterRecordRotation
         * @instance
         */
        RouterRecordRotation.prototype.recordUid = $util.newBuffer([]);

        /**
         * RouterRecordRotation configurationUid.
         * @member {Uint8Array} configurationUid
         * @memberof Router.RouterRecordRotation
         * @instance
         */
        RouterRecordRotation.prototype.configurationUid = $util.newBuffer([]);

        /**
         * RouterRecordRotation controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof Router.RouterRecordRotation
         * @instance
         */
        RouterRecordRotation.prototype.controllerUid = $util.newBuffer([]);

        /**
         * RouterRecordRotation resourceUid.
         * @member {Uint8Array} resourceUid
         * @memberof Router.RouterRecordRotation
         * @instance
         */
        RouterRecordRotation.prototype.resourceUid = $util.newBuffer([]);

        /**
         * RouterRecordRotation noSchedule.
         * @member {boolean} noSchedule
         * @memberof Router.RouterRecordRotation
         * @instance
         */
        RouterRecordRotation.prototype.noSchedule = false;

        /**
         * Creates a new RouterRecordRotation instance using the specified properties.
         * @function create
         * @memberof Router.RouterRecordRotation
         * @static
         * @param {Router.IRouterRecordRotation=} [properties] Properties to set
         * @returns {Router.RouterRecordRotation} RouterRecordRotation instance
         */
        RouterRecordRotation.create = function create(properties) {
            return new RouterRecordRotation(properties);
        };

        /**
         * Encodes the specified RouterRecordRotation message. Does not implicitly {@link Router.RouterRecordRotation.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterRecordRotation
         * @static
         * @param {Router.IRouterRecordRotation} message RouterRecordRotation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRecordRotation.encode = function encode(message, writer, q) {
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
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.resourceUid);
            if (message.noSchedule != null && Object.hasOwnProperty.call(message, "noSchedule"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.noSchedule);
            return writer;
        };

        /**
         * Encodes the specified RouterRecordRotation message, length delimited. Does not implicitly {@link Router.RouterRecordRotation.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterRecordRotation
         * @static
         * @param {Router.IRouterRecordRotation} message RouterRecordRotation message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRecordRotation.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterRecordRotation message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterRecordRotation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterRecordRotation} RouterRecordRotation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRecordRotation.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterRecordRotation();
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
                        message.resourceUid = reader.bytes();
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
         * Decodes a RouterRecordRotation message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterRecordRotation
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterRecordRotation} RouterRecordRotation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRecordRotation.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterRecordRotation message.
         * @function verify
         * @memberof Router.RouterRecordRotation
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterRecordRotation.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                    return "recordUid: buffer expected";
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                if (!(message.configurationUid && typeof message.configurationUid.length === "number" || $util.isString(message.configurationUid)))
                    return "configurationUid: buffer expected";
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                if (!(message.controllerUid && typeof message.controllerUid.length === "number" || $util.isString(message.controllerUid)))
                    return "controllerUid: buffer expected";
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                if (!(message.resourceUid && typeof message.resourceUid.length === "number" || $util.isString(message.resourceUid)))
                    return "resourceUid: buffer expected";
            if (message.noSchedule != null && Object.hasOwnProperty.call(message, "noSchedule"))
                if (typeof message.noSchedule !== "boolean")
                    return "noSchedule: boolean expected";
            return null;
        };

        /**
         * Creates a RouterRecordRotation message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterRecordRotation
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterRecordRotation} RouterRecordRotation
         */
        RouterRecordRotation.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterRecordRotation)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterRecordRotation: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterRecordRotation();
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
            if (object.resourceUid != null)
                if (typeof object.resourceUid === "string")
                    $util.base64.decode(object.resourceUid, message.resourceUid = $util.newBuffer($util.base64.length(object.resourceUid)), 0);
                else if (object.resourceUid.length >= 0)
                    message.resourceUid = object.resourceUid;
            if (object.noSchedule != null)
                message.noSchedule = Boolean(object.noSchedule);
            return message;
        };

        /**
         * Creates a plain object from a RouterRecordRotation message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterRecordRotation
         * @static
         * @param {Router.RouterRecordRotation} message RouterRecordRotation
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterRecordRotation.toObject = function toObject(message, options, q) {
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
                if (options.bytes === String)
                    object.resourceUid = "";
                else {
                    object.resourceUid = [];
                    if (options.bytes !== Array)
                        object.resourceUid = $util.newBuffer(object.resourceUid);
                }
                object.noSchedule = false;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                object.configurationUid = options.bytes === String ? $util.base64.encode(message.configurationUid, 0, message.configurationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.configurationUid) : message.configurationUid;
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                object.resourceUid = options.bytes === String ? $util.base64.encode(message.resourceUid, 0, message.resourceUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.resourceUid) : message.resourceUid;
            if (message.noSchedule != null && Object.hasOwnProperty.call(message, "noSchedule"))
                object.noSchedule = message.noSchedule;
            return object;
        };

        /**
         * Converts this RouterRecordRotation to JSON.
         * @function toJSON
         * @memberof Router.RouterRecordRotation
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterRecordRotation.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterRecordRotation
         * @function getTypeUrl
         * @memberof Router.RouterRecordRotation
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterRecordRotation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterRecordRotation";
        };

        return RouterRecordRotation;
    })();

    Router.RouterRecordRotationsRequest = (function() {

        /**
         * Properties of a RouterRecordRotationsRequest.
         * @memberof Router
         * @interface IRouterRecordRotationsRequest
         * @property {number|null} [enterpriseId] RouterRecordRotationsRequest enterpriseId
         * @property {Array.<Uint8Array>|null} [records] RouterRecordRotationsRequest records
         */

        /**
         * Constructs a new RouterRecordRotationsRequest.
         * @memberof Router
         * @classdesc Represents a RouterRecordRotationsRequest.
         * @implements IRouterRecordRotationsRequest
         * @constructor
         * @param {Router.IRouterRecordRotationsRequest=} [properties] Properties to set
         */
        function RouterRecordRotationsRequest(properties) {
            this.records = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterRecordRotationsRequest enterpriseId.
         * @member {number} enterpriseId
         * @memberof Router.RouterRecordRotationsRequest
         * @instance
         */
        RouterRecordRotationsRequest.prototype.enterpriseId = 0;

        /**
         * RouterRecordRotationsRequest records.
         * @member {Array.<Uint8Array>} records
         * @memberof Router.RouterRecordRotationsRequest
         * @instance
         */
        RouterRecordRotationsRequest.prototype.records = $util.emptyArray;

        /**
         * Creates a new RouterRecordRotationsRequest instance using the specified properties.
         * @function create
         * @memberof Router.RouterRecordRotationsRequest
         * @static
         * @param {Router.IRouterRecordRotationsRequest=} [properties] Properties to set
         * @returns {Router.RouterRecordRotationsRequest} RouterRecordRotationsRequest instance
         */
        RouterRecordRotationsRequest.create = function create(properties) {
            return new RouterRecordRotationsRequest(properties);
        };

        /**
         * Encodes the specified RouterRecordRotationsRequest message. Does not implicitly {@link Router.RouterRecordRotationsRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterRecordRotationsRequest
         * @static
         * @param {Router.IRouterRecordRotationsRequest} message RouterRecordRotationsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRecordRotationsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.enterpriseId);
            if (message.records != null && message.records.length)
                for (let i = 0; i < message.records.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.records[i]);
            return writer;
        };

        /**
         * Encodes the specified RouterRecordRotationsRequest message, length delimited. Does not implicitly {@link Router.RouterRecordRotationsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterRecordRotationsRequest
         * @static
         * @param {Router.IRouterRecordRotationsRequest} message RouterRecordRotationsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRecordRotationsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterRecordRotationsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterRecordRotationsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterRecordRotationsRequest} RouterRecordRotationsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRecordRotationsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterRecordRotationsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.enterpriseId = reader.int32();
                        break;
                    }
                case 2: {
                        if (!(message.records && message.records.length))
                            message.records = [];
                        message.records.push(reader.bytes());
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
         * Decodes a RouterRecordRotationsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterRecordRotationsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterRecordRotationsRequest} RouterRecordRotationsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRecordRotationsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterRecordRotationsRequest message.
         * @function verify
         * @memberof Router.RouterRecordRotationsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterRecordRotationsRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                if (!$util.isInteger(message.enterpriseId))
                    return "enterpriseId: integer expected";
            if (message.records != null && Object.hasOwnProperty.call(message, "records")) {
                if (!Array.isArray(message.records))
                    return "records: array expected";
                for (let i = 0; i < message.records.length; ++i)
                    if (!(message.records[i] && typeof message.records[i].length === "number" || $util.isString(message.records[i])))
                        return "records: buffer[] expected";
            }
            return null;
        };

        /**
         * Creates a RouterRecordRotationsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterRecordRotationsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterRecordRotationsRequest} RouterRecordRotationsRequest
         */
        RouterRecordRotationsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterRecordRotationsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterRecordRotationsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterRecordRotationsRequest();
            if (object.enterpriseId != null)
                message.enterpriseId = object.enterpriseId | 0;
            if (object.records) {
                if (!Array.isArray(object.records))
                    throw TypeError(".Router.RouterRecordRotationsRequest.records: array expected");
                message.records = [];
                for (let i = 0; i < object.records.length; ++i)
                    if (typeof object.records[i] === "string")
                        $util.base64.decode(object.records[i], message.records[i] = $util.newBuffer($util.base64.length(object.records[i])), 0);
                    else if (object.records[i].length >= 0)
                        message.records[i] = object.records[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a RouterRecordRotationsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterRecordRotationsRequest
         * @static
         * @param {Router.RouterRecordRotationsRequest} message RouterRecordRotationsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterRecordRotationsRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.records = [];
            if (options.defaults)
                object.enterpriseId = 0;
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                object.enterpriseId = message.enterpriseId;
            if (message.records && message.records.length) {
                object.records = [];
                for (let j = 0; j < message.records.length; ++j)
                    object.records[j] = options.bytes === String ? $util.base64.encode(message.records[j], 0, message.records[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.records[j]) : message.records[j];
            }
            return object;
        };

        /**
         * Converts this RouterRecordRotationsRequest to JSON.
         * @function toJSON
         * @memberof Router.RouterRecordRotationsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterRecordRotationsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterRecordRotationsRequest
         * @function getTypeUrl
         * @memberof Router.RouterRecordRotationsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterRecordRotationsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterRecordRotationsRequest";
        };

        return RouterRecordRotationsRequest;
    })();

    Router.RouterRecordRotationsResponse = (function() {

        /**
         * Properties of a RouterRecordRotationsResponse.
         * @memberof Router
         * @interface IRouterRecordRotationsResponse
         * @property {Array.<Router.IRouterRecordRotation>|null} [rotations] RouterRecordRotationsResponse rotations
         * @property {boolean|null} [hasMore] RouterRecordRotationsResponse hasMore
         */

        /**
         * Constructs a new RouterRecordRotationsResponse.
         * @memberof Router
         * @classdesc Represents a RouterRecordRotationsResponse.
         * @implements IRouterRecordRotationsResponse
         * @constructor
         * @param {Router.IRouterRecordRotationsResponse=} [properties] Properties to set
         */
        function RouterRecordRotationsResponse(properties) {
            this.rotations = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterRecordRotationsResponse rotations.
         * @member {Array.<Router.IRouterRecordRotation>} rotations
         * @memberof Router.RouterRecordRotationsResponse
         * @instance
         */
        RouterRecordRotationsResponse.prototype.rotations = $util.emptyArray;

        /**
         * RouterRecordRotationsResponse hasMore.
         * @member {boolean} hasMore
         * @memberof Router.RouterRecordRotationsResponse
         * @instance
         */
        RouterRecordRotationsResponse.prototype.hasMore = false;

        /**
         * Creates a new RouterRecordRotationsResponse instance using the specified properties.
         * @function create
         * @memberof Router.RouterRecordRotationsResponse
         * @static
         * @param {Router.IRouterRecordRotationsResponse=} [properties] Properties to set
         * @returns {Router.RouterRecordRotationsResponse} RouterRecordRotationsResponse instance
         */
        RouterRecordRotationsResponse.create = function create(properties) {
            return new RouterRecordRotationsResponse(properties);
        };

        /**
         * Encodes the specified RouterRecordRotationsResponse message. Does not implicitly {@link Router.RouterRecordRotationsResponse.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterRecordRotationsResponse
         * @static
         * @param {Router.IRouterRecordRotationsResponse} message RouterRecordRotationsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRecordRotationsResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.rotations != null && message.rotations.length)
                for (let i = 0; i < message.rotations.length; ++i)
                    $root.Router.RouterRecordRotation.encode(message.rotations[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.hasMore);
            return writer;
        };

        /**
         * Encodes the specified RouterRecordRotationsResponse message, length delimited. Does not implicitly {@link Router.RouterRecordRotationsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterRecordRotationsResponse
         * @static
         * @param {Router.IRouterRecordRotationsResponse} message RouterRecordRotationsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRecordRotationsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterRecordRotationsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterRecordRotationsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterRecordRotationsResponse} RouterRecordRotationsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRecordRotationsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterRecordRotationsResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.rotations && message.rotations.length))
                            message.rotations = [];
                        message.rotations.push($root.Router.RouterRecordRotation.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a RouterRecordRotationsResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterRecordRotationsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterRecordRotationsResponse} RouterRecordRotationsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRecordRotationsResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterRecordRotationsResponse message.
         * @function verify
         * @memberof Router.RouterRecordRotationsResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterRecordRotationsResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.rotations != null && Object.hasOwnProperty.call(message, "rotations")) {
                if (!Array.isArray(message.rotations))
                    return "rotations: array expected";
                for (let i = 0; i < message.rotations.length; ++i) {
                    let error = $root.Router.RouterRecordRotation.verify(message.rotations[i], long + 1);
                    if (error)
                        return "rotations." + error;
                }
            }
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                if (typeof message.hasMore !== "boolean")
                    return "hasMore: boolean expected";
            return null;
        };

        /**
         * Creates a RouterRecordRotationsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterRecordRotationsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterRecordRotationsResponse} RouterRecordRotationsResponse
         */
        RouterRecordRotationsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterRecordRotationsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterRecordRotationsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterRecordRotationsResponse();
            if (object.rotations) {
                if (!Array.isArray(object.rotations))
                    throw TypeError(".Router.RouterRecordRotationsResponse.rotations: array expected");
                message.rotations = [];
                for (let i = 0; i < object.rotations.length; ++i) {
                    if (!$util.isObject(object.rotations[i]))
                        throw TypeError(".Router.RouterRecordRotationsResponse.rotations: object expected");
                    message.rotations[i] = $root.Router.RouterRecordRotation.fromObject(object.rotations[i], long + 1);
                }
            }
            if (object.hasMore != null)
                message.hasMore = Boolean(object.hasMore);
            return message;
        };

        /**
         * Creates a plain object from a RouterRecordRotationsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterRecordRotationsResponse
         * @static
         * @param {Router.RouterRecordRotationsResponse} message RouterRecordRotationsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterRecordRotationsResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.rotations = [];
            if (options.defaults)
                object.hasMore = false;
            if (message.rotations && message.rotations.length) {
                object.rotations = [];
                for (let j = 0; j < message.rotations.length; ++j)
                    object.rotations[j] = $root.Router.RouterRecordRotation.toObject(message.rotations[j], options, q + 1);
            }
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                object.hasMore = message.hasMore;
            return object;
        };

        /**
         * Converts this RouterRecordRotationsResponse to JSON.
         * @function toJSON
         * @memberof Router.RouterRecordRotationsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterRecordRotationsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterRecordRotationsResponse
         * @function getTypeUrl
         * @memberof Router.RouterRecordRotationsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterRecordRotationsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterRecordRotationsResponse";
        };

        return RouterRecordRotationsResponse;
    })();

    /**
     * RouterRotationStatus enum.
     * @name Router.RouterRotationStatus
     * @enum {number}
     * @property {number} RRS_ONLINE=0 RRS_ONLINE value
     * @property {number} RRS_NO_ROTATION=1 RRS_NO_ROTATION value
     * @property {number} RRS_NO_CONTROLLER=2 RRS_NO_CONTROLLER value
     * @property {number} RRS_CONTROLLER_DOWN=3 RRS_CONTROLLER_DOWN value
     */
    Router.RouterRotationStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RRS_ONLINE"] = 0;
        values[valuesById[1] = "RRS_NO_ROTATION"] = 1;
        values[valuesById[2] = "RRS_NO_CONTROLLER"] = 2;
        values[valuesById[3] = "RRS_CONTROLLER_DOWN"] = 3;
        return values;
    })();

    Router.RouterRotationInfo = (function() {

        /**
         * Properties of a RouterRotationInfo.
         * @memberof Router
         * @interface IRouterRotationInfo
         * @property {Router.RouterRotationStatus|null} [status] RouterRotationInfo status
         * @property {Uint8Array|null} [configurationUid] RouterRotationInfo configurationUid
         * @property {Uint8Array|null} [resourceUid] RouterRotationInfo resourceUid
         * @property {number|null} [nodeId] RouterRotationInfo nodeId
         * @property {Uint8Array|null} [controllerUid] RouterRotationInfo controllerUid
         * @property {string|null} [controllerName] RouterRotationInfo controllerName
         * @property {string|null} [scriptName] RouterRotationInfo scriptName
         * @property {string|null} [pwdComplexity] RouterRotationInfo pwdComplexity
         * @property {boolean|null} [disabled] RouterRotationInfo disabled
         */

        /**
         * Constructs a new RouterRotationInfo.
         * @memberof Router
         * @classdesc Represents a RouterRotationInfo.
         * @implements IRouterRotationInfo
         * @constructor
         * @param {Router.IRouterRotationInfo=} [properties] Properties to set
         */
        function RouterRotationInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterRotationInfo status.
         * @member {Router.RouterRotationStatus} status
         * @memberof Router.RouterRotationInfo
         * @instance
         */
        RouterRotationInfo.prototype.status = 0;

        /**
         * RouterRotationInfo configurationUid.
         * @member {Uint8Array} configurationUid
         * @memberof Router.RouterRotationInfo
         * @instance
         */
        RouterRotationInfo.prototype.configurationUid = $util.newBuffer([]);

        /**
         * RouterRotationInfo resourceUid.
         * @member {Uint8Array} resourceUid
         * @memberof Router.RouterRotationInfo
         * @instance
         */
        RouterRotationInfo.prototype.resourceUid = $util.newBuffer([]);

        /**
         * RouterRotationInfo nodeId.
         * @member {number} nodeId
         * @memberof Router.RouterRotationInfo
         * @instance
         */
        RouterRotationInfo.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RouterRotationInfo controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof Router.RouterRotationInfo
         * @instance
         */
        RouterRotationInfo.prototype.controllerUid = $util.newBuffer([]);

        /**
         * RouterRotationInfo controllerName.
         * @member {string} controllerName
         * @memberof Router.RouterRotationInfo
         * @instance
         */
        RouterRotationInfo.prototype.controllerName = "";

        /**
         * RouterRotationInfo scriptName.
         * @member {string} scriptName
         * @memberof Router.RouterRotationInfo
         * @instance
         */
        RouterRotationInfo.prototype.scriptName = "";

        /**
         * RouterRotationInfo pwdComplexity.
         * @member {string} pwdComplexity
         * @memberof Router.RouterRotationInfo
         * @instance
         */
        RouterRotationInfo.prototype.pwdComplexity = "";

        /**
         * RouterRotationInfo disabled.
         * @member {boolean} disabled
         * @memberof Router.RouterRotationInfo
         * @instance
         */
        RouterRotationInfo.prototype.disabled = false;

        /**
         * Creates a new RouterRotationInfo instance using the specified properties.
         * @function create
         * @memberof Router.RouterRotationInfo
         * @static
         * @param {Router.IRouterRotationInfo=} [properties] Properties to set
         * @returns {Router.RouterRotationInfo} RouterRotationInfo instance
         */
        RouterRotationInfo.create = function create(properties) {
            return new RouterRotationInfo(properties);
        };

        /**
         * Encodes the specified RouterRotationInfo message. Does not implicitly {@link Router.RouterRotationInfo.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterRotationInfo
         * @static
         * @param {Router.IRouterRotationInfo} message RouterRotationInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRotationInfo.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.configurationUid);
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.resourceUid);
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.nodeId);
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.controllerUid);
            if (message.controllerName != null && Object.hasOwnProperty.call(message, "controllerName"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.controllerName);
            if (message.scriptName != null && Object.hasOwnProperty.call(message, "scriptName"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.scriptName);
            if (message.pwdComplexity != null && Object.hasOwnProperty.call(message, "pwdComplexity"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.pwdComplexity);
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.disabled);
            return writer;
        };

        /**
         * Encodes the specified RouterRotationInfo message, length delimited. Does not implicitly {@link Router.RouterRotationInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterRotationInfo
         * @static
         * @param {Router.IRouterRotationInfo} message RouterRotationInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRotationInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterRotationInfo message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterRotationInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterRotationInfo} RouterRotationInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRotationInfo.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterRotationInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.status = reader.int32();
                        break;
                    }
                case 2: {
                        message.configurationUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.resourceUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.nodeId = reader.int64();
                        break;
                    }
                case 5: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 6: {
                        message.controllerName = reader.string();
                        break;
                    }
                case 7: {
                        message.scriptName = reader.string();
                        break;
                    }
                case 8: {
                        message.pwdComplexity = reader.string();
                        break;
                    }
                case 9: {
                        message.disabled = reader.bool();
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
         * Decodes a RouterRotationInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterRotationInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterRotationInfo} RouterRotationInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRotationInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterRotationInfo message.
         * @function verify
         * @memberof Router.RouterRotationInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterRotationInfo.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                if (!(message.configurationUid && typeof message.configurationUid.length === "number" || $util.isString(message.configurationUid)))
                    return "configurationUid: buffer expected";
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                if (!(message.resourceUid && typeof message.resourceUid.length === "number" || $util.isString(message.resourceUid)))
                    return "resourceUid: buffer expected";
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (!$util.isInteger(message.nodeId) && !(message.nodeId && $util.isInteger(message.nodeId.low) && $util.isInteger(message.nodeId.high)))
                    return "nodeId: integer|Long expected";
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                if (!(message.controllerUid && typeof message.controllerUid.length === "number" || $util.isString(message.controllerUid)))
                    return "controllerUid: buffer expected";
            if (message.controllerName != null && Object.hasOwnProperty.call(message, "controllerName"))
                if (!$util.isString(message.controllerName))
                    return "controllerName: string expected";
            if (message.scriptName != null && Object.hasOwnProperty.call(message, "scriptName"))
                if (!$util.isString(message.scriptName))
                    return "scriptName: string expected";
            if (message.pwdComplexity != null && Object.hasOwnProperty.call(message, "pwdComplexity"))
                if (!$util.isString(message.pwdComplexity))
                    return "pwdComplexity: string expected";
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                if (typeof message.disabled !== "boolean")
                    return "disabled: boolean expected";
            return null;
        };

        /**
         * Creates a RouterRotationInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterRotationInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterRotationInfo} RouterRotationInfo
         */
        RouterRotationInfo.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterRotationInfo)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterRotationInfo: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterRotationInfo();
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "RRS_ONLINE":
            case 0:
                message.status = 0;
                break;
            case "RRS_NO_ROTATION":
            case 1:
                message.status = 1;
                break;
            case "RRS_NO_CONTROLLER":
            case 2:
                message.status = 2;
                break;
            case "RRS_CONTROLLER_DOWN":
            case 3:
                message.status = 3;
                break;
            }
            if (object.configurationUid != null)
                if (typeof object.configurationUid === "string")
                    $util.base64.decode(object.configurationUid, message.configurationUid = $util.newBuffer($util.base64.length(object.configurationUid)), 0);
                else if (object.configurationUid.length >= 0)
                    message.configurationUid = object.configurationUid;
            if (object.resourceUid != null)
                if (typeof object.resourceUid === "string")
                    $util.base64.decode(object.resourceUid, message.resourceUid = $util.newBuffer($util.base64.length(object.resourceUid)), 0);
                else if (object.resourceUid.length >= 0)
                    message.resourceUid = object.resourceUid;
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
            if (object.controllerName != null)
                message.controllerName = String(object.controllerName);
            if (object.scriptName != null)
                message.scriptName = String(object.scriptName);
            if (object.pwdComplexity != null)
                message.pwdComplexity = String(object.pwdComplexity);
            if (object.disabled != null)
                message.disabled = Boolean(object.disabled);
            return message;
        };

        /**
         * Creates a plain object from a RouterRotationInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterRotationInfo
         * @static
         * @param {Router.RouterRotationInfo} message RouterRotationInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterRotationInfo.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.status = options.enums === String ? "RRS_ONLINE" : 0;
                if (options.bytes === String)
                    object.configurationUid = "";
                else {
                    object.configurationUid = [];
                    if (options.bytes !== Array)
                        object.configurationUid = $util.newBuffer(object.configurationUid);
                }
                if (options.bytes === String)
                    object.resourceUid = "";
                else {
                    object.resourceUid = [];
                    if (options.bytes !== Array)
                        object.resourceUid = $util.newBuffer(object.resourceUid);
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
                object.controllerName = "";
                object.scriptName = "";
                object.pwdComplexity = "";
                object.disabled = false;
            }
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = options.enums === String ? $root.Router.RouterRotationStatus[message.status] === undefined ? message.status : $root.Router.RouterRotationStatus[message.status] : message.status;
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                object.configurationUid = options.bytes === String ? $util.base64.encode(message.configurationUid, 0, message.configurationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.configurationUid) : message.configurationUid;
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                object.resourceUid = options.bytes === String ? $util.base64.encode(message.resourceUid, 0, message.resourceUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.resourceUid) : message.resourceUid;
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nodeId = typeof message.nodeId === "number" ? BigInt(message.nodeId) : $util.Long.fromBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0, false).toBigInt();
                else if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber() : message.nodeId;
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.controllerName != null && Object.hasOwnProperty.call(message, "controllerName"))
                object.controllerName = message.controllerName;
            if (message.scriptName != null && Object.hasOwnProperty.call(message, "scriptName"))
                object.scriptName = message.scriptName;
            if (message.pwdComplexity != null && Object.hasOwnProperty.call(message, "pwdComplexity"))
                object.pwdComplexity = message.pwdComplexity;
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                object.disabled = message.disabled;
            return object;
        };

        /**
         * Converts this RouterRotationInfo to JSON.
         * @function toJSON
         * @memberof Router.RouterRotationInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterRotationInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterRotationInfo
         * @function getTypeUrl
         * @memberof Router.RouterRotationInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterRotationInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterRotationInfo";
        };

        return RouterRotationInfo;
    })();

    Router.RouterRecordRotationRequest = (function() {

        /**
         * Properties of a RouterRecordRotationRequest.
         * @memberof Router
         * @interface IRouterRecordRotationRequest
         * @property {Uint8Array|null} [recordUid] RouterRecordRotationRequest recordUid
         * @property {number|null} [revision] RouterRecordRotationRequest revision
         * @property {Uint8Array|null} [configurationUid] RouterRecordRotationRequest configurationUid
         * @property {Uint8Array|null} [resourceUid] RouterRecordRotationRequest resourceUid
         * @property {string|null} [schedule] RouterRecordRotationRequest schedule
         * @property {number|null} [enterpriseUserId] RouterRecordRotationRequest enterpriseUserId
         * @property {Uint8Array|null} [pwdComplexity] RouterRecordRotationRequest pwdComplexity
         * @property {boolean|null} [disabled] RouterRecordRotationRequest disabled
         * @property {string|null} [remoteAddress] RouterRecordRotationRequest remoteAddress
         * @property {number|null} [clientVersionId] RouterRecordRotationRequest clientVersionId
         * @property {boolean|null} [noop] RouterRecordRotationRequest noop
         * @property {Uint8Array|null} [saasConfiguration] RouterRecordRotationRequest saasConfiguration
         * @property {boolean|null} [updateServices] RouterRecordRotationRequest updateServices
         * @property {PAM.IUidList|null} [serviceResources] RouterRecordRotationRequest serviceResources
         */

        /**
         * Constructs a new RouterRecordRotationRequest.
         * @memberof Router
         * @classdesc Represents a RouterRecordRotationRequest.
         * @implements IRouterRecordRotationRequest
         * @constructor
         * @param {Router.IRouterRecordRotationRequest=} [properties] Properties to set
         */
        function RouterRecordRotationRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterRecordRotationRequest recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.recordUid = $util.newBuffer([]);

        /**
         * RouterRecordRotationRequest revision.
         * @member {number} revision
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RouterRecordRotationRequest configurationUid.
         * @member {Uint8Array} configurationUid
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.configurationUid = $util.newBuffer([]);

        /**
         * RouterRecordRotationRequest resourceUid.
         * @member {Uint8Array} resourceUid
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.resourceUid = $util.newBuffer([]);

        /**
         * RouterRecordRotationRequest schedule.
         * @member {string} schedule
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.schedule = "";

        /**
         * RouterRecordRotationRequest enterpriseUserId.
         * @member {number} enterpriseUserId
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RouterRecordRotationRequest pwdComplexity.
         * @member {Uint8Array} pwdComplexity
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.pwdComplexity = $util.newBuffer([]);

        /**
         * RouterRecordRotationRequest disabled.
         * @member {boolean} disabled
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.disabled = false;

        /**
         * RouterRecordRotationRequest remoteAddress.
         * @member {string} remoteAddress
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.remoteAddress = "";

        /**
         * RouterRecordRotationRequest clientVersionId.
         * @member {number} clientVersionId
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.clientVersionId = 0;

        /**
         * RouterRecordRotationRequest noop.
         * @member {boolean} noop
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.noop = false;

        /**
         * RouterRecordRotationRequest saasConfiguration.
         * @member {Uint8Array|null|undefined} saasConfiguration
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.saasConfiguration = null;

        /**
         * RouterRecordRotationRequest updateServices.
         * @member {boolean|null|undefined} updateServices
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.updateServices = null;

        /**
         * RouterRecordRotationRequest serviceResources.
         * @member {PAM.IUidList|null|undefined} serviceResources
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         */
        RouterRecordRotationRequest.prototype.serviceResources = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(RouterRecordRotationRequest.prototype, "_saasConfiguration", {
            get: $util.oneOfGetter($oneOfFields = ["saasConfiguration"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(RouterRecordRotationRequest.prototype, "_updateServices", {
            get: $util.oneOfGetter($oneOfFields = ["updateServices"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(RouterRecordRotationRequest.prototype, "_serviceResources", {
            get: $util.oneOfGetter($oneOfFields = ["serviceResources"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new RouterRecordRotationRequest instance using the specified properties.
         * @function create
         * @memberof Router.RouterRecordRotationRequest
         * @static
         * @param {Router.IRouterRecordRotationRequest=} [properties] Properties to set
         * @returns {Router.RouterRecordRotationRequest} RouterRecordRotationRequest instance
         */
        RouterRecordRotationRequest.create = function create(properties) {
            return new RouterRecordRotationRequest(properties);
        };

        /**
         * Encodes the specified RouterRecordRotationRequest message. Does not implicitly {@link Router.RouterRecordRotationRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterRecordRotationRequest
         * @static
         * @param {Router.IRouterRecordRotationRequest} message RouterRecordRotationRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRecordRotationRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.revision);
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.configurationUid);
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.resourceUid);
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.schedule);
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.enterpriseUserId);
            if (message.pwdComplexity != null && Object.hasOwnProperty.call(message, "pwdComplexity"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.pwdComplexity);
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.disabled);
            if (message.remoteAddress != null && Object.hasOwnProperty.call(message, "remoteAddress"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.remoteAddress);
            if (message.clientVersionId != null && Object.hasOwnProperty.call(message, "clientVersionId"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.clientVersionId);
            if (message.noop != null && Object.hasOwnProperty.call(message, "noop"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.noop);
            if (message.saasConfiguration != null && Object.hasOwnProperty.call(message, "saasConfiguration"))
                writer.uint32(/* id 12, wireType 2 =*/98).bytes(message.saasConfiguration);
            if (message.updateServices != null && Object.hasOwnProperty.call(message, "updateServices"))
                writer.uint32(/* id 13, wireType 0 =*/104).bool(message.updateServices);
            if (message.serviceResources != null && Object.hasOwnProperty.call(message, "serviceResources"))
                $root.PAM.UidList.encode(message.serviceResources, writer.uint32(/* id 14, wireType 2 =*/114).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RouterRecordRotationRequest message, length delimited. Does not implicitly {@link Router.RouterRecordRotationRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterRecordRotationRequest
         * @static
         * @param {Router.IRouterRecordRotationRequest} message RouterRecordRotationRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRecordRotationRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterRecordRotationRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterRecordRotationRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterRecordRotationRequest} RouterRecordRotationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRecordRotationRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterRecordRotationRequest();
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
                        message.revision = reader.int64();
                        break;
                    }
                case 3: {
                        message.configurationUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.resourceUid = reader.bytes();
                        break;
                    }
                case 5: {
                        message.schedule = reader.string();
                        break;
                    }
                case 6: {
                        message.enterpriseUserId = reader.int64();
                        break;
                    }
                case 7: {
                        message.pwdComplexity = reader.bytes();
                        break;
                    }
                case 8: {
                        message.disabled = reader.bool();
                        break;
                    }
                case 9: {
                        message.remoteAddress = reader.string();
                        break;
                    }
                case 10: {
                        message.clientVersionId = reader.int32();
                        break;
                    }
                case 11: {
                        message.noop = reader.bool();
                        break;
                    }
                case 12: {
                        message.saasConfiguration = reader.bytes();
                        break;
                    }
                case 13: {
                        message.updateServices = reader.bool();
                        break;
                    }
                case 14: {
                        message.serviceResources = $root.PAM.UidList.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Decodes a RouterRecordRotationRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterRecordRotationRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterRecordRotationRequest} RouterRecordRotationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRecordRotationRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterRecordRotationRequest message.
         * @function verify
         * @memberof Router.RouterRecordRotationRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterRecordRotationRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                    return "recordUid: buffer expected";
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (!$util.isInteger(message.revision) && !(message.revision && $util.isInteger(message.revision.low) && $util.isInteger(message.revision.high)))
                    return "revision: integer|Long expected";
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                if (!(message.configurationUid && typeof message.configurationUid.length === "number" || $util.isString(message.configurationUid)))
                    return "configurationUid: buffer expected";
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                if (!(message.resourceUid && typeof message.resourceUid.length === "number" || $util.isString(message.resourceUid)))
                    return "resourceUid: buffer expected";
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                if (!$util.isString(message.schedule))
                    return "schedule: string expected";
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                if (!$util.isInteger(message.enterpriseUserId) && !(message.enterpriseUserId && $util.isInteger(message.enterpriseUserId.low) && $util.isInteger(message.enterpriseUserId.high)))
                    return "enterpriseUserId: integer|Long expected";
            if (message.pwdComplexity != null && Object.hasOwnProperty.call(message, "pwdComplexity"))
                if (!(message.pwdComplexity && typeof message.pwdComplexity.length === "number" || $util.isString(message.pwdComplexity)))
                    return "pwdComplexity: buffer expected";
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                if (typeof message.disabled !== "boolean")
                    return "disabled: boolean expected";
            if (message.remoteAddress != null && Object.hasOwnProperty.call(message, "remoteAddress"))
                if (!$util.isString(message.remoteAddress))
                    return "remoteAddress: string expected";
            if (message.clientVersionId != null && Object.hasOwnProperty.call(message, "clientVersionId"))
                if (!$util.isInteger(message.clientVersionId))
                    return "clientVersionId: integer expected";
            if (message.noop != null && Object.hasOwnProperty.call(message, "noop"))
                if (typeof message.noop !== "boolean")
                    return "noop: boolean expected";
            if (message.saasConfiguration != null && Object.hasOwnProperty.call(message, "saasConfiguration")) {
                properties._saasConfiguration = 1;
                if (!(message.saasConfiguration && typeof message.saasConfiguration.length === "number" || $util.isString(message.saasConfiguration)))
                    return "saasConfiguration: buffer expected";
            }
            if (message.updateServices != null && Object.hasOwnProperty.call(message, "updateServices")) {
                properties._updateServices = 1;
                if (typeof message.updateServices !== "boolean")
                    return "updateServices: boolean expected";
            }
            if (message.serviceResources != null && Object.hasOwnProperty.call(message, "serviceResources")) {
                properties._serviceResources = 1;
                {
                    let error = $root.PAM.UidList.verify(message.serviceResources, long + 1);
                    if (error)
                        return "serviceResources." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RouterRecordRotationRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterRecordRotationRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterRecordRotationRequest} RouterRecordRotationRequest
         */
        RouterRecordRotationRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterRecordRotationRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterRecordRotationRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterRecordRotationRequest();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.revision != null)
                if ($util.Long)
                    message.revision = $util.Long.fromValue(object.revision, false);
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.configurationUid != null)
                if (typeof object.configurationUid === "string")
                    $util.base64.decode(object.configurationUid, message.configurationUid = $util.newBuffer($util.base64.length(object.configurationUid)), 0);
                else if (object.configurationUid.length >= 0)
                    message.configurationUid = object.configurationUid;
            if (object.resourceUid != null)
                if (typeof object.resourceUid === "string")
                    $util.base64.decode(object.resourceUid, message.resourceUid = $util.newBuffer($util.base64.length(object.resourceUid)), 0);
                else if (object.resourceUid.length >= 0)
                    message.resourceUid = object.resourceUid;
            if (object.schedule != null)
                message.schedule = String(object.schedule);
            if (object.enterpriseUserId != null)
                if ($util.Long)
                    message.enterpriseUserId = $util.Long.fromValue(object.enterpriseUserId, false);
                else if (typeof object.enterpriseUserId === "string")
                    message.enterpriseUserId = parseInt(object.enterpriseUserId, 10);
                else if (typeof object.enterpriseUserId === "number")
                    message.enterpriseUserId = object.enterpriseUserId;
                else if (typeof object.enterpriseUserId === "object")
                    message.enterpriseUserId = new $util.LongBits(object.enterpriseUserId.low >>> 0, object.enterpriseUserId.high >>> 0).toNumber();
            if (object.pwdComplexity != null)
                if (typeof object.pwdComplexity === "string")
                    $util.base64.decode(object.pwdComplexity, message.pwdComplexity = $util.newBuffer($util.base64.length(object.pwdComplexity)), 0);
                else if (object.pwdComplexity.length >= 0)
                    message.pwdComplexity = object.pwdComplexity;
            if (object.disabled != null)
                message.disabled = Boolean(object.disabled);
            if (object.remoteAddress != null)
                message.remoteAddress = String(object.remoteAddress);
            if (object.clientVersionId != null)
                message.clientVersionId = object.clientVersionId | 0;
            if (object.noop != null)
                message.noop = Boolean(object.noop);
            if (object.saasConfiguration != null)
                if (typeof object.saasConfiguration === "string")
                    $util.base64.decode(object.saasConfiguration, message.saasConfiguration = $util.newBuffer($util.base64.length(object.saasConfiguration)), 0);
                else if (object.saasConfiguration.length >= 0)
                    message.saasConfiguration = object.saasConfiguration;
            if (object.updateServices != null)
                message.updateServices = Boolean(object.updateServices);
            if (object.serviceResources != null) {
                if (!$util.isObject(object.serviceResources))
                    throw TypeError(".Router.RouterRecordRotationRequest.serviceResources: object expected");
                message.serviceResources = $root.PAM.UidList.fromObject(object.serviceResources, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a RouterRecordRotationRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterRecordRotationRequest
         * @static
         * @param {Router.RouterRecordRotationRequest} message RouterRecordRotationRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterRecordRotationRequest.toObject = function toObject(message, options, q) {
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
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.revision = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.configurationUid = "";
                else {
                    object.configurationUid = [];
                    if (options.bytes !== Array)
                        object.configurationUid = $util.newBuffer(object.configurationUid);
                }
                if (options.bytes === String)
                    object.resourceUid = "";
                else {
                    object.resourceUid = [];
                    if (options.bytes !== Array)
                        object.resourceUid = $util.newBuffer(object.resourceUid);
                }
                object.schedule = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.enterpriseUserId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.enterpriseUserId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.pwdComplexity = "";
                else {
                    object.pwdComplexity = [];
                    if (options.bytes !== Array)
                        object.pwdComplexity = $util.newBuffer(object.pwdComplexity);
                }
                object.disabled = false;
                object.remoteAddress = "";
                object.clientVersionId = 0;
                object.noop = false;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.revision != null && Object.hasOwnProperty.call(message, "revision"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.revision = typeof message.revision === "number" ? BigInt(message.revision) : $util.Long.fromBits(message.revision.low >>> 0, message.revision.high >>> 0, false).toBigInt();
                else if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.configurationUid != null && Object.hasOwnProperty.call(message, "configurationUid"))
                object.configurationUid = options.bytes === String ? $util.base64.encode(message.configurationUid, 0, message.configurationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.configurationUid) : message.configurationUid;
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                object.resourceUid = options.bytes === String ? $util.base64.encode(message.resourceUid, 0, message.resourceUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.resourceUid) : message.resourceUid;
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                object.schedule = message.schedule;
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.enterpriseUserId = typeof message.enterpriseUserId === "number" ? BigInt(message.enterpriseUserId) : $util.Long.fromBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0, false).toBigInt();
                else if (typeof message.enterpriseUserId === "number")
                    object.enterpriseUserId = options.longs === String ? String(message.enterpriseUserId) : message.enterpriseUserId;
                else
                    object.enterpriseUserId = options.longs === String ? $util.Long.prototype.toString.call(message.enterpriseUserId) : options.longs === Number ? new $util.LongBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0).toNumber() : message.enterpriseUserId;
            if (message.pwdComplexity != null && Object.hasOwnProperty.call(message, "pwdComplexity"))
                object.pwdComplexity = options.bytes === String ? $util.base64.encode(message.pwdComplexity, 0, message.pwdComplexity.length) : options.bytes === Array ? Array.prototype.slice.call(message.pwdComplexity) : message.pwdComplexity;
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                object.disabled = message.disabled;
            if (message.remoteAddress != null && Object.hasOwnProperty.call(message, "remoteAddress"))
                object.remoteAddress = message.remoteAddress;
            if (message.clientVersionId != null && Object.hasOwnProperty.call(message, "clientVersionId"))
                object.clientVersionId = message.clientVersionId;
            if (message.noop != null && Object.hasOwnProperty.call(message, "noop"))
                object.noop = message.noop;
            if (message.saasConfiguration != null && Object.hasOwnProperty.call(message, "saasConfiguration")) {
                object.saasConfiguration = options.bytes === String ? $util.base64.encode(message.saasConfiguration, 0, message.saasConfiguration.length) : options.bytes === Array ? Array.prototype.slice.call(message.saasConfiguration) : message.saasConfiguration;
                if (options.oneofs)
                    object._saasConfiguration = "saasConfiguration";
            }
            if (message.updateServices != null && Object.hasOwnProperty.call(message, "updateServices")) {
                object.updateServices = message.updateServices;
                if (options.oneofs)
                    object._updateServices = "updateServices";
            }
            if (message.serviceResources != null && Object.hasOwnProperty.call(message, "serviceResources")) {
                object.serviceResources = $root.PAM.UidList.toObject(message.serviceResources, options, q + 1);
                if (options.oneofs)
                    object._serviceResources = "serviceResources";
            }
            return object;
        };

        /**
         * Converts this RouterRecordRotationRequest to JSON.
         * @function toJSON
         * @memberof Router.RouterRecordRotationRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterRecordRotationRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterRecordRotationRequest
         * @function getTypeUrl
         * @memberof Router.RouterRecordRotationRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterRecordRotationRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterRecordRotationRequest";
        };

        return RouterRecordRotationRequest;
    })();

    Router.UserRecordAccessRequest = (function() {

        /**
         * Properties of a UserRecordAccessRequest.
         * @memberof Router
         * @interface IUserRecordAccessRequest
         * @property {number|null} [userId] UserRecordAccessRequest userId
         * @property {Uint8Array|null} [recordUid] UserRecordAccessRequest recordUid
         */

        /**
         * Constructs a new UserRecordAccessRequest.
         * @memberof Router
         * @classdesc Represents a UserRecordAccessRequest.
         * @implements IUserRecordAccessRequest
         * @constructor
         * @param {Router.IUserRecordAccessRequest=} [properties] Properties to set
         */
        function UserRecordAccessRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRecordAccessRequest userId.
         * @member {number} userId
         * @memberof Router.UserRecordAccessRequest
         * @instance
         */
        UserRecordAccessRequest.prototype.userId = 0;

        /**
         * UserRecordAccessRequest recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Router.UserRecordAccessRequest
         * @instance
         */
        UserRecordAccessRequest.prototype.recordUid = $util.newBuffer([]);

        /**
         * Creates a new UserRecordAccessRequest instance using the specified properties.
         * @function create
         * @memberof Router.UserRecordAccessRequest
         * @static
         * @param {Router.IUserRecordAccessRequest=} [properties] Properties to set
         * @returns {Router.UserRecordAccessRequest} UserRecordAccessRequest instance
         */
        UserRecordAccessRequest.create = function create(properties) {
            return new UserRecordAccessRequest(properties);
        };

        /**
         * Encodes the specified UserRecordAccessRequest message. Does not implicitly {@link Router.UserRecordAccessRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.UserRecordAccessRequest
         * @static
         * @param {Router.IUserRecordAccessRequest} message UserRecordAccessRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRecordAccessRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recordUid);
            return writer;
        };

        /**
         * Encodes the specified UserRecordAccessRequest message, length delimited. Does not implicitly {@link Router.UserRecordAccessRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.UserRecordAccessRequest
         * @static
         * @param {Router.IUserRecordAccessRequest} message UserRecordAccessRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRecordAccessRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a UserRecordAccessRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.UserRecordAccessRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.UserRecordAccessRequest} UserRecordAccessRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRecordAccessRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.UserRecordAccessRequest();
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
         * Decodes a UserRecordAccessRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.UserRecordAccessRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.UserRecordAccessRequest} UserRecordAccessRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRecordAccessRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRecordAccessRequest message.
         * @function verify
         * @memberof Router.UserRecordAccessRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRecordAccessRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                    return "recordUid: buffer expected";
            return null;
        };

        /**
         * Creates a UserRecordAccessRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.UserRecordAccessRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.UserRecordAccessRequest} UserRecordAccessRequest
         */
        UserRecordAccessRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.UserRecordAccessRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.UserRecordAccessRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.UserRecordAccessRequest();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            return message;
        };

        /**
         * Creates a plain object from a UserRecordAccessRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.UserRecordAccessRequest
         * @static
         * @param {Router.UserRecordAccessRequest} message UserRecordAccessRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRecordAccessRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                if (options.bytes === String)
                    object.recordUid = "";
                else {
                    object.recordUid = [];
                    if (options.bytes !== Array)
                        object.recordUid = $util.newBuffer(object.recordUid);
                }
            }
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                object.userId = message.userId;
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            return object;
        };

        /**
         * Converts this UserRecordAccessRequest to JSON.
         * @function toJSON
         * @memberof Router.UserRecordAccessRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRecordAccessRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserRecordAccessRequest
         * @function getTypeUrl
         * @memberof Router.UserRecordAccessRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserRecordAccessRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.UserRecordAccessRequest";
        };

        return UserRecordAccessRequest;
    })();

    /**
     * UserRecordAccessLevel enum.
     * @name Router.UserRecordAccessLevel
     * @enum {number}
     * @property {number} RRAL_NONE=0 RRAL_NONE value
     * @property {number} RRAL_READ=1 RRAL_READ value
     * @property {number} RRAL_SHARE=2 RRAL_SHARE value
     * @property {number} RRAL_EDIT=3 RRAL_EDIT value
     * @property {number} RRAL_EDIT_AND_SHARE=4 RRAL_EDIT_AND_SHARE value
     * @property {number} RRAL_OWNER=5 RRAL_OWNER value
     */
    Router.UserRecordAccessLevel = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "RRAL_NONE"] = 0;
        values[valuesById[1] = "RRAL_READ"] = 1;
        values[valuesById[2] = "RRAL_SHARE"] = 2;
        values[valuesById[3] = "RRAL_EDIT"] = 3;
        values[valuesById[4] = "RRAL_EDIT_AND_SHARE"] = 4;
        values[valuesById[5] = "RRAL_OWNER"] = 5;
        return values;
    })();

    Router.UserRecordAccessResponse = (function() {

        /**
         * Properties of a UserRecordAccessResponse.
         * @memberof Router
         * @interface IUserRecordAccessResponse
         * @property {Uint8Array|null} [recordUid] UserRecordAccessResponse recordUid
         * @property {Router.UserRecordAccessLevel|null} [accessLevel] UserRecordAccessResponse accessLevel
         * @property {boolean|null} [isShareAdmin] UserRecordAccessResponse isShareAdmin
         */

        /**
         * Constructs a new UserRecordAccessResponse.
         * @memberof Router
         * @classdesc Represents a UserRecordAccessResponse.
         * @implements IUserRecordAccessResponse
         * @constructor
         * @param {Router.IUserRecordAccessResponse=} [properties] Properties to set
         */
        function UserRecordAccessResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRecordAccessResponse recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Router.UserRecordAccessResponse
         * @instance
         */
        UserRecordAccessResponse.prototype.recordUid = $util.newBuffer([]);

        /**
         * UserRecordAccessResponse accessLevel.
         * @member {Router.UserRecordAccessLevel} accessLevel
         * @memberof Router.UserRecordAccessResponse
         * @instance
         */
        UserRecordAccessResponse.prototype.accessLevel = 0;

        /**
         * UserRecordAccessResponse isShareAdmin.
         * @member {boolean} isShareAdmin
         * @memberof Router.UserRecordAccessResponse
         * @instance
         */
        UserRecordAccessResponse.prototype.isShareAdmin = false;

        /**
         * Creates a new UserRecordAccessResponse instance using the specified properties.
         * @function create
         * @memberof Router.UserRecordAccessResponse
         * @static
         * @param {Router.IUserRecordAccessResponse=} [properties] Properties to set
         * @returns {Router.UserRecordAccessResponse} UserRecordAccessResponse instance
         */
        UserRecordAccessResponse.create = function create(properties) {
            return new UserRecordAccessResponse(properties);
        };

        /**
         * Encodes the specified UserRecordAccessResponse message. Does not implicitly {@link Router.UserRecordAccessResponse.verify|verify} messages.
         * @function encode
         * @memberof Router.UserRecordAccessResponse
         * @static
         * @param {Router.IUserRecordAccessResponse} message UserRecordAccessResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRecordAccessResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.accessLevel != null && Object.hasOwnProperty.call(message, "accessLevel"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.accessLevel);
            if (message.isShareAdmin != null && Object.hasOwnProperty.call(message, "isShareAdmin"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isShareAdmin);
            return writer;
        };

        /**
         * Encodes the specified UserRecordAccessResponse message, length delimited. Does not implicitly {@link Router.UserRecordAccessResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.UserRecordAccessResponse
         * @static
         * @param {Router.IUserRecordAccessResponse} message UserRecordAccessResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRecordAccessResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a UserRecordAccessResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Router.UserRecordAccessResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.UserRecordAccessResponse} UserRecordAccessResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRecordAccessResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.UserRecordAccessResponse();
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
                        message.accessLevel = reader.int32();
                        break;
                    }
                case 3: {
                        message.isShareAdmin = reader.bool();
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
         * Decodes a UserRecordAccessResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.UserRecordAccessResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.UserRecordAccessResponse} UserRecordAccessResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRecordAccessResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRecordAccessResponse message.
         * @function verify
         * @memberof Router.UserRecordAccessResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRecordAccessResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                    return "recordUid: buffer expected";
            if (message.accessLevel != null && Object.hasOwnProperty.call(message, "accessLevel"))
                switch (message.accessLevel) {
                default:
                    return "accessLevel: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.isShareAdmin != null && Object.hasOwnProperty.call(message, "isShareAdmin"))
                if (typeof message.isShareAdmin !== "boolean")
                    return "isShareAdmin: boolean expected";
            return null;
        };

        /**
         * Creates a UserRecordAccessResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.UserRecordAccessResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.UserRecordAccessResponse} UserRecordAccessResponse
         */
        UserRecordAccessResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.UserRecordAccessResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.UserRecordAccessResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.UserRecordAccessResponse();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            switch (object.accessLevel) {
            default:
                if (typeof object.accessLevel === "number") {
                    message.accessLevel = object.accessLevel;
                    break;
                }
                break;
            case "RRAL_NONE":
            case 0:
                message.accessLevel = 0;
                break;
            case "RRAL_READ":
            case 1:
                message.accessLevel = 1;
                break;
            case "RRAL_SHARE":
            case 2:
                message.accessLevel = 2;
                break;
            case "RRAL_EDIT":
            case 3:
                message.accessLevel = 3;
                break;
            case "RRAL_EDIT_AND_SHARE":
            case 4:
                message.accessLevel = 4;
                break;
            case "RRAL_OWNER":
            case 5:
                message.accessLevel = 5;
                break;
            }
            if (object.isShareAdmin != null)
                message.isShareAdmin = Boolean(object.isShareAdmin);
            return message;
        };

        /**
         * Creates a plain object from a UserRecordAccessResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.UserRecordAccessResponse
         * @static
         * @param {Router.UserRecordAccessResponse} message UserRecordAccessResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRecordAccessResponse.toObject = function toObject(message, options, q) {
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
                object.accessLevel = options.enums === String ? "RRAL_NONE" : 0;
                object.isShareAdmin = false;
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.accessLevel != null && Object.hasOwnProperty.call(message, "accessLevel"))
                object.accessLevel = options.enums === String ? $root.Router.UserRecordAccessLevel[message.accessLevel] === undefined ? message.accessLevel : $root.Router.UserRecordAccessLevel[message.accessLevel] : message.accessLevel;
            if (message.isShareAdmin != null && Object.hasOwnProperty.call(message, "isShareAdmin"))
                object.isShareAdmin = message.isShareAdmin;
            return object;
        };

        /**
         * Converts this UserRecordAccessResponse to JSON.
         * @function toJSON
         * @memberof Router.UserRecordAccessResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRecordAccessResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserRecordAccessResponse
         * @function getTypeUrl
         * @memberof Router.UserRecordAccessResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserRecordAccessResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.UserRecordAccessResponse";
        };

        return UserRecordAccessResponse;
    })();

    Router.UserRecordAccessRequests = (function() {

        /**
         * Properties of a UserRecordAccessRequests.
         * @memberof Router
         * @interface IUserRecordAccessRequests
         * @property {Array.<Router.IUserRecordAccessRequest>|null} [requests] UserRecordAccessRequests requests
         */

        /**
         * Constructs a new UserRecordAccessRequests.
         * @memberof Router
         * @classdesc Represents a UserRecordAccessRequests.
         * @implements IUserRecordAccessRequests
         * @constructor
         * @param {Router.IUserRecordAccessRequests=} [properties] Properties to set
         */
        function UserRecordAccessRequests(properties) {
            this.requests = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRecordAccessRequests requests.
         * @member {Array.<Router.IUserRecordAccessRequest>} requests
         * @memberof Router.UserRecordAccessRequests
         * @instance
         */
        UserRecordAccessRequests.prototype.requests = $util.emptyArray;

        /**
         * Creates a new UserRecordAccessRequests instance using the specified properties.
         * @function create
         * @memberof Router.UserRecordAccessRequests
         * @static
         * @param {Router.IUserRecordAccessRequests=} [properties] Properties to set
         * @returns {Router.UserRecordAccessRequests} UserRecordAccessRequests instance
         */
        UserRecordAccessRequests.create = function create(properties) {
            return new UserRecordAccessRequests(properties);
        };

        /**
         * Encodes the specified UserRecordAccessRequests message. Does not implicitly {@link Router.UserRecordAccessRequests.verify|verify} messages.
         * @function encode
         * @memberof Router.UserRecordAccessRequests
         * @static
         * @param {Router.IUserRecordAccessRequests} message UserRecordAccessRequests message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRecordAccessRequests.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.requests != null && message.requests.length)
                for (let i = 0; i < message.requests.length; ++i)
                    $root.Router.UserRecordAccessRequest.encode(message.requests[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserRecordAccessRequests message, length delimited. Does not implicitly {@link Router.UserRecordAccessRequests.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.UserRecordAccessRequests
         * @static
         * @param {Router.IUserRecordAccessRequests} message UserRecordAccessRequests message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRecordAccessRequests.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a UserRecordAccessRequests message from the specified reader or buffer.
         * @function decode
         * @memberof Router.UserRecordAccessRequests
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.UserRecordAccessRequests} UserRecordAccessRequests
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRecordAccessRequests.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.UserRecordAccessRequests();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.requests && message.requests.length))
                            message.requests = [];
                        message.requests.push($root.Router.UserRecordAccessRequest.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a UserRecordAccessRequests message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.UserRecordAccessRequests
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.UserRecordAccessRequests} UserRecordAccessRequests
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRecordAccessRequests.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRecordAccessRequests message.
         * @function verify
         * @memberof Router.UserRecordAccessRequests
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRecordAccessRequests.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.requests != null && Object.hasOwnProperty.call(message, "requests")) {
                if (!Array.isArray(message.requests))
                    return "requests: array expected";
                for (let i = 0; i < message.requests.length; ++i) {
                    let error = $root.Router.UserRecordAccessRequest.verify(message.requests[i], long + 1);
                    if (error)
                        return "requests." + error;
                }
            }
            return null;
        };

        /**
         * Creates a UserRecordAccessRequests message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.UserRecordAccessRequests
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.UserRecordAccessRequests} UserRecordAccessRequests
         */
        UserRecordAccessRequests.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.UserRecordAccessRequests)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.UserRecordAccessRequests: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.UserRecordAccessRequests();
            if (object.requests) {
                if (!Array.isArray(object.requests))
                    throw TypeError(".Router.UserRecordAccessRequests.requests: array expected");
                message.requests = [];
                for (let i = 0; i < object.requests.length; ++i) {
                    if (!$util.isObject(object.requests[i]))
                        throw TypeError(".Router.UserRecordAccessRequests.requests: object expected");
                    message.requests[i] = $root.Router.UserRecordAccessRequest.fromObject(object.requests[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a UserRecordAccessRequests message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.UserRecordAccessRequests
         * @static
         * @param {Router.UserRecordAccessRequests} message UserRecordAccessRequests
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRecordAccessRequests.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.requests = [];
            if (message.requests && message.requests.length) {
                object.requests = [];
                for (let j = 0; j < message.requests.length; ++j)
                    object.requests[j] = $root.Router.UserRecordAccessRequest.toObject(message.requests[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this UserRecordAccessRequests to JSON.
         * @function toJSON
         * @memberof Router.UserRecordAccessRequests
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRecordAccessRequests.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserRecordAccessRequests
         * @function getTypeUrl
         * @memberof Router.UserRecordAccessRequests
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserRecordAccessRequests.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.UserRecordAccessRequests";
        };

        return UserRecordAccessRequests;
    })();

    Router.UserRecordAccessResponses = (function() {

        /**
         * Properties of a UserRecordAccessResponses.
         * @memberof Router
         * @interface IUserRecordAccessResponses
         * @property {Array.<Router.IUserRecordAccessResponse>|null} [responses] UserRecordAccessResponses responses
         */

        /**
         * Constructs a new UserRecordAccessResponses.
         * @memberof Router
         * @classdesc Represents a UserRecordAccessResponses.
         * @implements IUserRecordAccessResponses
         * @constructor
         * @param {Router.IUserRecordAccessResponses=} [properties] Properties to set
         */
        function UserRecordAccessResponses(properties) {
            this.responses = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRecordAccessResponses responses.
         * @member {Array.<Router.IUserRecordAccessResponse>} responses
         * @memberof Router.UserRecordAccessResponses
         * @instance
         */
        UserRecordAccessResponses.prototype.responses = $util.emptyArray;

        /**
         * Creates a new UserRecordAccessResponses instance using the specified properties.
         * @function create
         * @memberof Router.UserRecordAccessResponses
         * @static
         * @param {Router.IUserRecordAccessResponses=} [properties] Properties to set
         * @returns {Router.UserRecordAccessResponses} UserRecordAccessResponses instance
         */
        UserRecordAccessResponses.create = function create(properties) {
            return new UserRecordAccessResponses(properties);
        };

        /**
         * Encodes the specified UserRecordAccessResponses message. Does not implicitly {@link Router.UserRecordAccessResponses.verify|verify} messages.
         * @function encode
         * @memberof Router.UserRecordAccessResponses
         * @static
         * @param {Router.IUserRecordAccessResponses} message UserRecordAccessResponses message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRecordAccessResponses.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.responses != null && message.responses.length)
                for (let i = 0; i < message.responses.length; ++i)
                    $root.Router.UserRecordAccessResponse.encode(message.responses[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserRecordAccessResponses message, length delimited. Does not implicitly {@link Router.UserRecordAccessResponses.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.UserRecordAccessResponses
         * @static
         * @param {Router.IUserRecordAccessResponses} message UserRecordAccessResponses message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRecordAccessResponses.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a UserRecordAccessResponses message from the specified reader or buffer.
         * @function decode
         * @memberof Router.UserRecordAccessResponses
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.UserRecordAccessResponses} UserRecordAccessResponses
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRecordAccessResponses.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.UserRecordAccessResponses();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.responses && message.responses.length))
                            message.responses = [];
                        message.responses.push($root.Router.UserRecordAccessResponse.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a UserRecordAccessResponses message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.UserRecordAccessResponses
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.UserRecordAccessResponses} UserRecordAccessResponses
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRecordAccessResponses.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRecordAccessResponses message.
         * @function verify
         * @memberof Router.UserRecordAccessResponses
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRecordAccessResponses.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.responses != null && Object.hasOwnProperty.call(message, "responses")) {
                if (!Array.isArray(message.responses))
                    return "responses: array expected";
                for (let i = 0; i < message.responses.length; ++i) {
                    let error = $root.Router.UserRecordAccessResponse.verify(message.responses[i], long + 1);
                    if (error)
                        return "responses." + error;
                }
            }
            return null;
        };

        /**
         * Creates a UserRecordAccessResponses message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.UserRecordAccessResponses
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.UserRecordAccessResponses} UserRecordAccessResponses
         */
        UserRecordAccessResponses.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.UserRecordAccessResponses)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.UserRecordAccessResponses: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.UserRecordAccessResponses();
            if (object.responses) {
                if (!Array.isArray(object.responses))
                    throw TypeError(".Router.UserRecordAccessResponses.responses: array expected");
                message.responses = [];
                for (let i = 0; i < object.responses.length; ++i) {
                    if (!$util.isObject(object.responses[i]))
                        throw TypeError(".Router.UserRecordAccessResponses.responses: object expected");
                    message.responses[i] = $root.Router.UserRecordAccessResponse.fromObject(object.responses[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a UserRecordAccessResponses message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.UserRecordAccessResponses
         * @static
         * @param {Router.UserRecordAccessResponses} message UserRecordAccessResponses
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRecordAccessResponses.toObject = function toObject(message, options, q) {
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
                    object.responses[j] = $root.Router.UserRecordAccessResponse.toObject(message.responses[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this UserRecordAccessResponses to JSON.
         * @function toJSON
         * @memberof Router.UserRecordAccessResponses
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRecordAccessResponses.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserRecordAccessResponses
         * @function getTypeUrl
         * @memberof Router.UserRecordAccessResponses
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserRecordAccessResponses.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.UserRecordAccessResponses";
        };

        return UserRecordAccessResponses;
    })();

    Router.UserSharedFolderAccessRequest = (function() {

        /**
         * Properties of a UserSharedFolderAccessRequest.
         * @memberof Router
         * @interface IUserSharedFolderAccessRequest
         * @property {number|null} [userId] UserSharedFolderAccessRequest userId
         * @property {Array.<Uint8Array>|null} [sharedFolderUid] UserSharedFolderAccessRequest sharedFolderUid
         */

        /**
         * Constructs a new UserSharedFolderAccessRequest.
         * @memberof Router
         * @classdesc Represents a UserSharedFolderAccessRequest.
         * @implements IUserSharedFolderAccessRequest
         * @constructor
         * @param {Router.IUserSharedFolderAccessRequest=} [properties] Properties to set
         */
        function UserSharedFolderAccessRequest(properties) {
            this.sharedFolderUid = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserSharedFolderAccessRequest userId.
         * @member {number} userId
         * @memberof Router.UserSharedFolderAccessRequest
         * @instance
         */
        UserSharedFolderAccessRequest.prototype.userId = 0;

        /**
         * UserSharedFolderAccessRequest sharedFolderUid.
         * @member {Array.<Uint8Array>} sharedFolderUid
         * @memberof Router.UserSharedFolderAccessRequest
         * @instance
         */
        UserSharedFolderAccessRequest.prototype.sharedFolderUid = $util.emptyArray;

        /**
         * Creates a new UserSharedFolderAccessRequest instance using the specified properties.
         * @function create
         * @memberof Router.UserSharedFolderAccessRequest
         * @static
         * @param {Router.IUserSharedFolderAccessRequest=} [properties] Properties to set
         * @returns {Router.UserSharedFolderAccessRequest} UserSharedFolderAccessRequest instance
         */
        UserSharedFolderAccessRequest.create = function create(properties) {
            return new UserSharedFolderAccessRequest(properties);
        };

        /**
         * Encodes the specified UserSharedFolderAccessRequest message. Does not implicitly {@link Router.UserSharedFolderAccessRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.UserSharedFolderAccessRequest
         * @static
         * @param {Router.IUserSharedFolderAccessRequest} message UserSharedFolderAccessRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserSharedFolderAccessRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.sharedFolderUid != null && message.sharedFolderUid.length)
                for (let i = 0; i < message.sharedFolderUid.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.sharedFolderUid[i]);
            return writer;
        };

        /**
         * Encodes the specified UserSharedFolderAccessRequest message, length delimited. Does not implicitly {@link Router.UserSharedFolderAccessRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.UserSharedFolderAccessRequest
         * @static
         * @param {Router.IUserSharedFolderAccessRequest} message UserSharedFolderAccessRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserSharedFolderAccessRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a UserSharedFolderAccessRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.UserSharedFolderAccessRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.UserSharedFolderAccessRequest} UserSharedFolderAccessRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserSharedFolderAccessRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.UserSharedFolderAccessRequest();
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
                        if (!(message.sharedFolderUid && message.sharedFolderUid.length))
                            message.sharedFolderUid = [];
                        message.sharedFolderUid.push(reader.bytes());
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
         * Decodes a UserSharedFolderAccessRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.UserSharedFolderAccessRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.UserSharedFolderAccessRequest} UserSharedFolderAccessRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserSharedFolderAccessRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserSharedFolderAccessRequest message.
         * @function verify
         * @memberof Router.UserSharedFolderAccessRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserSharedFolderAccessRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid")) {
                if (!Array.isArray(message.sharedFolderUid))
                    return "sharedFolderUid: array expected";
                for (let i = 0; i < message.sharedFolderUid.length; ++i)
                    if (!(message.sharedFolderUid[i] && typeof message.sharedFolderUid[i].length === "number" || $util.isString(message.sharedFolderUid[i])))
                        return "sharedFolderUid: buffer[] expected";
            }
            return null;
        };

        /**
         * Creates a UserSharedFolderAccessRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.UserSharedFolderAccessRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.UserSharedFolderAccessRequest} UserSharedFolderAccessRequest
         */
        UserSharedFolderAccessRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.UserSharedFolderAccessRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.UserSharedFolderAccessRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.UserSharedFolderAccessRequest();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.sharedFolderUid) {
                if (!Array.isArray(object.sharedFolderUid))
                    throw TypeError(".Router.UserSharedFolderAccessRequest.sharedFolderUid: array expected");
                message.sharedFolderUid = [];
                for (let i = 0; i < object.sharedFolderUid.length; ++i)
                    if (typeof object.sharedFolderUid[i] === "string")
                        $util.base64.decode(object.sharedFolderUid[i], message.sharedFolderUid[i] = $util.newBuffer($util.base64.length(object.sharedFolderUid[i])), 0);
                    else if (object.sharedFolderUid[i].length >= 0)
                        message.sharedFolderUid[i] = object.sharedFolderUid[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a UserSharedFolderAccessRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.UserSharedFolderAccessRequest
         * @static
         * @param {Router.UserSharedFolderAccessRequest} message UserSharedFolderAccessRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserSharedFolderAccessRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.sharedFolderUid = [];
            if (options.defaults)
                object.userId = 0;
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                object.userId = message.userId;
            if (message.sharedFolderUid && message.sharedFolderUid.length) {
                object.sharedFolderUid = [];
                for (let j = 0; j < message.sharedFolderUid.length; ++j)
                    object.sharedFolderUid[j] = options.bytes === String ? $util.base64.encode(message.sharedFolderUid[j], 0, message.sharedFolderUid[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderUid[j]) : message.sharedFolderUid[j];
            }
            return object;
        };

        /**
         * Converts this UserSharedFolderAccessRequest to JSON.
         * @function toJSON
         * @memberof Router.UserSharedFolderAccessRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserSharedFolderAccessRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserSharedFolderAccessRequest
         * @function getTypeUrl
         * @memberof Router.UserSharedFolderAccessRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserSharedFolderAccessRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.UserSharedFolderAccessRequest";
        };

        return UserSharedFolderAccessRequest;
    })();

    Router.UserSharedFolderAccessResponse = (function() {

        /**
         * Properties of a UserSharedFolderAccessResponse.
         * @memberof Router
         * @interface IUserSharedFolderAccessResponse
         * @property {Uint8Array|null} [sharedFolderUid] UserSharedFolderAccessResponse sharedFolderUid
         * @property {Folder.AccessRoleType|null} [accessRoleType] UserSharedFolderAccessResponse accessRoleType
         */

        /**
         * Constructs a new UserSharedFolderAccessResponse.
         * @memberof Router
         * @classdesc Represents a UserSharedFolderAccessResponse.
         * @implements IUserSharedFolderAccessResponse
         * @constructor
         * @param {Router.IUserSharedFolderAccessResponse=} [properties] Properties to set
         */
        function UserSharedFolderAccessResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserSharedFolderAccessResponse sharedFolderUid.
         * @member {Uint8Array} sharedFolderUid
         * @memberof Router.UserSharedFolderAccessResponse
         * @instance
         */
        UserSharedFolderAccessResponse.prototype.sharedFolderUid = $util.newBuffer([]);

        /**
         * UserSharedFolderAccessResponse accessRoleType.
         * @member {Folder.AccessRoleType} accessRoleType
         * @memberof Router.UserSharedFolderAccessResponse
         * @instance
         */
        UserSharedFolderAccessResponse.prototype.accessRoleType = 0;

        /**
         * Creates a new UserSharedFolderAccessResponse instance using the specified properties.
         * @function create
         * @memberof Router.UserSharedFolderAccessResponse
         * @static
         * @param {Router.IUserSharedFolderAccessResponse=} [properties] Properties to set
         * @returns {Router.UserSharedFolderAccessResponse} UserSharedFolderAccessResponse instance
         */
        UserSharedFolderAccessResponse.create = function create(properties) {
            return new UserSharedFolderAccessResponse(properties);
        };

        /**
         * Encodes the specified UserSharedFolderAccessResponse message. Does not implicitly {@link Router.UserSharedFolderAccessResponse.verify|verify} messages.
         * @function encode
         * @memberof Router.UserSharedFolderAccessResponse
         * @static
         * @param {Router.IUserSharedFolderAccessResponse} message UserSharedFolderAccessResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserSharedFolderAccessResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.sharedFolderUid);
            if (message.accessRoleType != null && Object.hasOwnProperty.call(message, "accessRoleType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.accessRoleType);
            return writer;
        };

        /**
         * Encodes the specified UserSharedFolderAccessResponse message, length delimited. Does not implicitly {@link Router.UserSharedFolderAccessResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.UserSharedFolderAccessResponse
         * @static
         * @param {Router.IUserSharedFolderAccessResponse} message UserSharedFolderAccessResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserSharedFolderAccessResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a UserSharedFolderAccessResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Router.UserSharedFolderAccessResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.UserSharedFolderAccessResponse} UserSharedFolderAccessResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserSharedFolderAccessResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.UserSharedFolderAccessResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.sharedFolderUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.accessRoleType = reader.int32();
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
         * Decodes a UserSharedFolderAccessResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.UserSharedFolderAccessResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.UserSharedFolderAccessResponse} UserSharedFolderAccessResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserSharedFolderAccessResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserSharedFolderAccessResponse message.
         * @function verify
         * @memberof Router.UserSharedFolderAccessResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserSharedFolderAccessResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                if (!(message.sharedFolderUid && typeof message.sharedFolderUid.length === "number" || $util.isString(message.sharedFolderUid)))
                    return "sharedFolderUid: buffer expected";
            if (message.accessRoleType != null && Object.hasOwnProperty.call(message, "accessRoleType"))
                switch (message.accessRoleType) {
                default:
                    return "accessRoleType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    break;
                }
            return null;
        };

        /**
         * Creates a UserSharedFolderAccessResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.UserSharedFolderAccessResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.UserSharedFolderAccessResponse} UserSharedFolderAccessResponse
         */
        UserSharedFolderAccessResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.UserSharedFolderAccessResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.UserSharedFolderAccessResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.UserSharedFolderAccessResponse();
            if (object.sharedFolderUid != null)
                if (typeof object.sharedFolderUid === "string")
                    $util.base64.decode(object.sharedFolderUid, message.sharedFolderUid = $util.newBuffer($util.base64.length(object.sharedFolderUid)), 0);
                else if (object.sharedFolderUid.length >= 0)
                    message.sharedFolderUid = object.sharedFolderUid;
            switch (object.accessRoleType) {
            default:
                if (typeof object.accessRoleType === "number") {
                    message.accessRoleType = object.accessRoleType;
                    break;
                }
                break;
            case "NAVIGATOR":
            case 0:
                message.accessRoleType = 0;
                break;
            case "REQUESTOR":
            case 1:
                message.accessRoleType = 1;
                break;
            case "VIEWER":
            case 2:
                message.accessRoleType = 2;
                break;
            case "SHARED_MANAGER":
            case 3:
                message.accessRoleType = 3;
                break;
            case "CONTENT_MANAGER":
            case 4:
                message.accessRoleType = 4;
                break;
            case "CONTENT_SHARE_MANAGER":
            case 5:
                message.accessRoleType = 5;
                break;
            case "MANAGER":
            case 6:
                message.accessRoleType = 6;
                break;
            case "UNRESOLVED":
            case 7:
                message.accessRoleType = 7;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a UserSharedFolderAccessResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.UserSharedFolderAccessResponse
         * @static
         * @param {Router.UserSharedFolderAccessResponse} message UserSharedFolderAccessResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserSharedFolderAccessResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.sharedFolderUid = "";
                else {
                    object.sharedFolderUid = [];
                    if (options.bytes !== Array)
                        object.sharedFolderUid = $util.newBuffer(object.sharedFolderUid);
                }
                object.accessRoleType = options.enums === String ? "NAVIGATOR" : 0;
            }
            if (message.sharedFolderUid != null && Object.hasOwnProperty.call(message, "sharedFolderUid"))
                object.sharedFolderUid = options.bytes === String ? $util.base64.encode(message.sharedFolderUid, 0, message.sharedFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sharedFolderUid) : message.sharedFolderUid;
            if (message.accessRoleType != null && Object.hasOwnProperty.call(message, "accessRoleType"))
                object.accessRoleType = options.enums === String ? $root.Folder.AccessRoleType[message.accessRoleType] === undefined ? message.accessRoleType : $root.Folder.AccessRoleType[message.accessRoleType] : message.accessRoleType;
            return object;
        };

        /**
         * Converts this UserSharedFolderAccessResponse to JSON.
         * @function toJSON
         * @memberof Router.UserSharedFolderAccessResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserSharedFolderAccessResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserSharedFolderAccessResponse
         * @function getTypeUrl
         * @memberof Router.UserSharedFolderAccessResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserSharedFolderAccessResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.UserSharedFolderAccessResponse";
        };

        return UserSharedFolderAccessResponse;
    })();

    Router.UserSharedFolderAccessResponses = (function() {

        /**
         * Properties of a UserSharedFolderAccessResponses.
         * @memberof Router
         * @interface IUserSharedFolderAccessResponses
         * @property {Array.<Router.IUserSharedFolderAccessResponse>|null} [responses] UserSharedFolderAccessResponses responses
         */

        /**
         * Constructs a new UserSharedFolderAccessResponses.
         * @memberof Router
         * @classdesc Represents a UserSharedFolderAccessResponses.
         * @implements IUserSharedFolderAccessResponses
         * @constructor
         * @param {Router.IUserSharedFolderAccessResponses=} [properties] Properties to set
         */
        function UserSharedFolderAccessResponses(properties) {
            this.responses = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserSharedFolderAccessResponses responses.
         * @member {Array.<Router.IUserSharedFolderAccessResponse>} responses
         * @memberof Router.UserSharedFolderAccessResponses
         * @instance
         */
        UserSharedFolderAccessResponses.prototype.responses = $util.emptyArray;

        /**
         * Creates a new UserSharedFolderAccessResponses instance using the specified properties.
         * @function create
         * @memberof Router.UserSharedFolderAccessResponses
         * @static
         * @param {Router.IUserSharedFolderAccessResponses=} [properties] Properties to set
         * @returns {Router.UserSharedFolderAccessResponses} UserSharedFolderAccessResponses instance
         */
        UserSharedFolderAccessResponses.create = function create(properties) {
            return new UserSharedFolderAccessResponses(properties);
        };

        /**
         * Encodes the specified UserSharedFolderAccessResponses message. Does not implicitly {@link Router.UserSharedFolderAccessResponses.verify|verify} messages.
         * @function encode
         * @memberof Router.UserSharedFolderAccessResponses
         * @static
         * @param {Router.IUserSharedFolderAccessResponses} message UserSharedFolderAccessResponses message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserSharedFolderAccessResponses.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.responses != null && message.responses.length)
                for (let i = 0; i < message.responses.length; ++i)
                    $root.Router.UserSharedFolderAccessResponse.encode(message.responses[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserSharedFolderAccessResponses message, length delimited. Does not implicitly {@link Router.UserSharedFolderAccessResponses.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.UserSharedFolderAccessResponses
         * @static
         * @param {Router.IUserSharedFolderAccessResponses} message UserSharedFolderAccessResponses message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserSharedFolderAccessResponses.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a UserSharedFolderAccessResponses message from the specified reader or buffer.
         * @function decode
         * @memberof Router.UserSharedFolderAccessResponses
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.UserSharedFolderAccessResponses} UserSharedFolderAccessResponses
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserSharedFolderAccessResponses.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.UserSharedFolderAccessResponses();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.responses && message.responses.length))
                            message.responses = [];
                        message.responses.push($root.Router.UserSharedFolderAccessResponse.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a UserSharedFolderAccessResponses message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.UserSharedFolderAccessResponses
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.UserSharedFolderAccessResponses} UserSharedFolderAccessResponses
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserSharedFolderAccessResponses.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserSharedFolderAccessResponses message.
         * @function verify
         * @memberof Router.UserSharedFolderAccessResponses
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserSharedFolderAccessResponses.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.responses != null && Object.hasOwnProperty.call(message, "responses")) {
                if (!Array.isArray(message.responses))
                    return "responses: array expected";
                for (let i = 0; i < message.responses.length; ++i) {
                    let error = $root.Router.UserSharedFolderAccessResponse.verify(message.responses[i], long + 1);
                    if (error)
                        return "responses." + error;
                }
            }
            return null;
        };

        /**
         * Creates a UserSharedFolderAccessResponses message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.UserSharedFolderAccessResponses
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.UserSharedFolderAccessResponses} UserSharedFolderAccessResponses
         */
        UserSharedFolderAccessResponses.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.UserSharedFolderAccessResponses)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.UserSharedFolderAccessResponses: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.UserSharedFolderAccessResponses();
            if (object.responses) {
                if (!Array.isArray(object.responses))
                    throw TypeError(".Router.UserSharedFolderAccessResponses.responses: array expected");
                message.responses = [];
                for (let i = 0; i < object.responses.length; ++i) {
                    if (!$util.isObject(object.responses[i]))
                        throw TypeError(".Router.UserSharedFolderAccessResponses.responses: object expected");
                    message.responses[i] = $root.Router.UserSharedFolderAccessResponse.fromObject(object.responses[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a UserSharedFolderAccessResponses message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.UserSharedFolderAccessResponses
         * @static
         * @param {Router.UserSharedFolderAccessResponses} message UserSharedFolderAccessResponses
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserSharedFolderAccessResponses.toObject = function toObject(message, options, q) {
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
                    object.responses[j] = $root.Router.UserSharedFolderAccessResponse.toObject(message.responses[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this UserSharedFolderAccessResponses to JSON.
         * @function toJSON
         * @memberof Router.UserSharedFolderAccessResponses
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserSharedFolderAccessResponses.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserSharedFolderAccessResponses
         * @function getTypeUrl
         * @memberof Router.UserSharedFolderAccessResponses
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserSharedFolderAccessResponses.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.UserSharedFolderAccessResponses";
        };

        return UserSharedFolderAccessResponses;
    })();

    Router.UserFolderPermissionsRequest = (function() {

        /**
         * Properties of a UserFolderPermissionsRequest.
         * @memberof Router
         * @interface IUserFolderPermissionsRequest
         * @property {number|null} [userId] UserFolderPermissionsRequest userId
         * @property {Array.<Uint8Array>|null} [folderUid] UserFolderPermissionsRequest folderUid
         */

        /**
         * Constructs a new UserFolderPermissionsRequest.
         * @memberof Router
         * @classdesc Represents a UserFolderPermissionsRequest.
         * @implements IUserFolderPermissionsRequest
         * @constructor
         * @param {Router.IUserFolderPermissionsRequest=} [properties] Properties to set
         */
        function UserFolderPermissionsRequest(properties) {
            this.folderUid = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserFolderPermissionsRequest userId.
         * @member {number} userId
         * @memberof Router.UserFolderPermissionsRequest
         * @instance
         */
        UserFolderPermissionsRequest.prototype.userId = 0;

        /**
         * UserFolderPermissionsRequest folderUid.
         * @member {Array.<Uint8Array>} folderUid
         * @memberof Router.UserFolderPermissionsRequest
         * @instance
         */
        UserFolderPermissionsRequest.prototype.folderUid = $util.emptyArray;

        /**
         * Creates a new UserFolderPermissionsRequest instance using the specified properties.
         * @function create
         * @memberof Router.UserFolderPermissionsRequest
         * @static
         * @param {Router.IUserFolderPermissionsRequest=} [properties] Properties to set
         * @returns {Router.UserFolderPermissionsRequest} UserFolderPermissionsRequest instance
         */
        UserFolderPermissionsRequest.create = function create(properties) {
            return new UserFolderPermissionsRequest(properties);
        };

        /**
         * Encodes the specified UserFolderPermissionsRequest message. Does not implicitly {@link Router.UserFolderPermissionsRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.UserFolderPermissionsRequest
         * @static
         * @param {Router.IUserFolderPermissionsRequest} message UserFolderPermissionsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserFolderPermissionsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.userId);
            if (message.folderUid != null && message.folderUid.length)
                for (let i = 0; i < message.folderUid.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.folderUid[i]);
            return writer;
        };

        /**
         * Encodes the specified UserFolderPermissionsRequest message, length delimited. Does not implicitly {@link Router.UserFolderPermissionsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.UserFolderPermissionsRequest
         * @static
         * @param {Router.IUserFolderPermissionsRequest} message UserFolderPermissionsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserFolderPermissionsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a UserFolderPermissionsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.UserFolderPermissionsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.UserFolderPermissionsRequest} UserFolderPermissionsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserFolderPermissionsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.UserFolderPermissionsRequest();
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
                        if (!(message.folderUid && message.folderUid.length))
                            message.folderUid = [];
                        message.folderUid.push(reader.bytes());
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
         * Decodes a UserFolderPermissionsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.UserFolderPermissionsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.UserFolderPermissionsRequest} UserFolderPermissionsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserFolderPermissionsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserFolderPermissionsRequest message.
         * @function verify
         * @memberof Router.UserFolderPermissionsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserFolderPermissionsRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid")) {
                if (!Array.isArray(message.folderUid))
                    return "folderUid: array expected";
                for (let i = 0; i < message.folderUid.length; ++i)
                    if (!(message.folderUid[i] && typeof message.folderUid[i].length === "number" || $util.isString(message.folderUid[i])))
                        return "folderUid: buffer[] expected";
            }
            return null;
        };

        /**
         * Creates a UserFolderPermissionsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.UserFolderPermissionsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.UserFolderPermissionsRequest} UserFolderPermissionsRequest
         */
        UserFolderPermissionsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.UserFolderPermissionsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.UserFolderPermissionsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.UserFolderPermissionsRequest();
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.folderUid) {
                if (!Array.isArray(object.folderUid))
                    throw TypeError(".Router.UserFolderPermissionsRequest.folderUid: array expected");
                message.folderUid = [];
                for (let i = 0; i < object.folderUid.length; ++i)
                    if (typeof object.folderUid[i] === "string")
                        $util.base64.decode(object.folderUid[i], message.folderUid[i] = $util.newBuffer($util.base64.length(object.folderUid[i])), 0);
                    else if (object.folderUid[i].length >= 0)
                        message.folderUid[i] = object.folderUid[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a UserFolderPermissionsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.UserFolderPermissionsRequest
         * @static
         * @param {Router.UserFolderPermissionsRequest} message UserFolderPermissionsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserFolderPermissionsRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.folderUid = [];
            if (options.defaults)
                object.userId = 0;
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                object.userId = message.userId;
            if (message.folderUid && message.folderUid.length) {
                object.folderUid = [];
                for (let j = 0; j < message.folderUid.length; ++j)
                    object.folderUid[j] = options.bytes === String ? $util.base64.encode(message.folderUid[j], 0, message.folderUid[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid[j]) : message.folderUid[j];
            }
            return object;
        };

        /**
         * Converts this UserFolderPermissionsRequest to JSON.
         * @function toJSON
         * @memberof Router.UserFolderPermissionsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserFolderPermissionsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserFolderPermissionsRequest
         * @function getTypeUrl
         * @memberof Router.UserFolderPermissionsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserFolderPermissionsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.UserFolderPermissionsRequest";
        };

        return UserFolderPermissionsRequest;
    })();

    Router.UserFolderPermissionsResponse = (function() {

        /**
         * Properties of a UserFolderPermissionsResponse.
         * @memberof Router
         * @interface IUserFolderPermissionsResponse
         * @property {Uint8Array|null} [folderUid] UserFolderPermissionsResponse folderUid
         * @property {Folder.IFolderPermissions|null} [permissions] UserFolderPermissionsResponse permissions
         */

        /**
         * Constructs a new UserFolderPermissionsResponse.
         * @memberof Router
         * @classdesc Represents a UserFolderPermissionsResponse.
         * @implements IUserFolderPermissionsResponse
         * @constructor
         * @param {Router.IUserFolderPermissionsResponse=} [properties] Properties to set
         */
        function UserFolderPermissionsResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserFolderPermissionsResponse folderUid.
         * @member {Uint8Array} folderUid
         * @memberof Router.UserFolderPermissionsResponse
         * @instance
         */
        UserFolderPermissionsResponse.prototype.folderUid = $util.newBuffer([]);

        /**
         * UserFolderPermissionsResponse permissions.
         * @member {Folder.IFolderPermissions|null|undefined} permissions
         * @memberof Router.UserFolderPermissionsResponse
         * @instance
         */
        UserFolderPermissionsResponse.prototype.permissions = null;

        /**
         * Creates a new UserFolderPermissionsResponse instance using the specified properties.
         * @function create
         * @memberof Router.UserFolderPermissionsResponse
         * @static
         * @param {Router.IUserFolderPermissionsResponse=} [properties] Properties to set
         * @returns {Router.UserFolderPermissionsResponse} UserFolderPermissionsResponse instance
         */
        UserFolderPermissionsResponse.create = function create(properties) {
            return new UserFolderPermissionsResponse(properties);
        };

        /**
         * Encodes the specified UserFolderPermissionsResponse message. Does not implicitly {@link Router.UserFolderPermissionsResponse.verify|verify} messages.
         * @function encode
         * @memberof Router.UserFolderPermissionsResponse
         * @static
         * @param {Router.IUserFolderPermissionsResponse} message UserFolderPermissionsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserFolderPermissionsResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.folderUid);
            if (message.permissions != null && Object.hasOwnProperty.call(message, "permissions"))
                $root.Folder.FolderPermissions.encode(message.permissions, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserFolderPermissionsResponse message, length delimited. Does not implicitly {@link Router.UserFolderPermissionsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.UserFolderPermissionsResponse
         * @static
         * @param {Router.IUserFolderPermissionsResponse} message UserFolderPermissionsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserFolderPermissionsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a UserFolderPermissionsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Router.UserFolderPermissionsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.UserFolderPermissionsResponse} UserFolderPermissionsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserFolderPermissionsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.UserFolderPermissionsResponse();
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
                        message.permissions = $root.Folder.FolderPermissions.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Decodes a UserFolderPermissionsResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.UserFolderPermissionsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.UserFolderPermissionsResponse} UserFolderPermissionsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserFolderPermissionsResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserFolderPermissionsResponse message.
         * @function verify
         * @memberof Router.UserFolderPermissionsResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserFolderPermissionsResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                if (!(message.folderUid && typeof message.folderUid.length === "number" || $util.isString(message.folderUid)))
                    return "folderUid: buffer expected";
            if (message.permissions != null && Object.hasOwnProperty.call(message, "permissions")) {
                let error = $root.Folder.FolderPermissions.verify(message.permissions, long + 1);
                if (error)
                    return "permissions." + error;
            }
            return null;
        };

        /**
         * Creates a UserFolderPermissionsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.UserFolderPermissionsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.UserFolderPermissionsResponse} UserFolderPermissionsResponse
         */
        UserFolderPermissionsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.UserFolderPermissionsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.UserFolderPermissionsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.UserFolderPermissionsResponse();
            if (object.folderUid != null)
                if (typeof object.folderUid === "string")
                    $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                else if (object.folderUid.length >= 0)
                    message.folderUid = object.folderUid;
            if (object.permissions != null) {
                if (!$util.isObject(object.permissions))
                    throw TypeError(".Router.UserFolderPermissionsResponse.permissions: object expected");
                message.permissions = $root.Folder.FolderPermissions.fromObject(object.permissions, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a UserFolderPermissionsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.UserFolderPermissionsResponse
         * @static
         * @param {Router.UserFolderPermissionsResponse} message UserFolderPermissionsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserFolderPermissionsResponse.toObject = function toObject(message, options, q) {
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
                object.permissions = null;
            }
            if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
            if (message.permissions != null && Object.hasOwnProperty.call(message, "permissions"))
                object.permissions = $root.Folder.FolderPermissions.toObject(message.permissions, options, q + 1);
            return object;
        };

        /**
         * Converts this UserFolderPermissionsResponse to JSON.
         * @function toJSON
         * @memberof Router.UserFolderPermissionsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserFolderPermissionsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserFolderPermissionsResponse
         * @function getTypeUrl
         * @memberof Router.UserFolderPermissionsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserFolderPermissionsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.UserFolderPermissionsResponse";
        };

        return UserFolderPermissionsResponse;
    })();

    Router.UserFolderPermissionsResponses = (function() {

        /**
         * Properties of a UserFolderPermissionsResponses.
         * @memberof Router
         * @interface IUserFolderPermissionsResponses
         * @property {Array.<Router.IUserFolderPermissionsResponse>|null} [responses] UserFolderPermissionsResponses responses
         */

        /**
         * Constructs a new UserFolderPermissionsResponses.
         * @memberof Router
         * @classdesc Represents a UserFolderPermissionsResponses.
         * @implements IUserFolderPermissionsResponses
         * @constructor
         * @param {Router.IUserFolderPermissionsResponses=} [properties] Properties to set
         */
        function UserFolderPermissionsResponses(properties) {
            this.responses = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserFolderPermissionsResponses responses.
         * @member {Array.<Router.IUserFolderPermissionsResponse>} responses
         * @memberof Router.UserFolderPermissionsResponses
         * @instance
         */
        UserFolderPermissionsResponses.prototype.responses = $util.emptyArray;

        /**
         * Creates a new UserFolderPermissionsResponses instance using the specified properties.
         * @function create
         * @memberof Router.UserFolderPermissionsResponses
         * @static
         * @param {Router.IUserFolderPermissionsResponses=} [properties] Properties to set
         * @returns {Router.UserFolderPermissionsResponses} UserFolderPermissionsResponses instance
         */
        UserFolderPermissionsResponses.create = function create(properties) {
            return new UserFolderPermissionsResponses(properties);
        };

        /**
         * Encodes the specified UserFolderPermissionsResponses message. Does not implicitly {@link Router.UserFolderPermissionsResponses.verify|verify} messages.
         * @function encode
         * @memberof Router.UserFolderPermissionsResponses
         * @static
         * @param {Router.IUserFolderPermissionsResponses} message UserFolderPermissionsResponses message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserFolderPermissionsResponses.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.responses != null && message.responses.length)
                for (let i = 0; i < message.responses.length; ++i)
                    $root.Router.UserFolderPermissionsResponse.encode(message.responses[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserFolderPermissionsResponses message, length delimited. Does not implicitly {@link Router.UserFolderPermissionsResponses.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.UserFolderPermissionsResponses
         * @static
         * @param {Router.IUserFolderPermissionsResponses} message UserFolderPermissionsResponses message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserFolderPermissionsResponses.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a UserFolderPermissionsResponses message from the specified reader or buffer.
         * @function decode
         * @memberof Router.UserFolderPermissionsResponses
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.UserFolderPermissionsResponses} UserFolderPermissionsResponses
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserFolderPermissionsResponses.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.UserFolderPermissionsResponses();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.responses && message.responses.length))
                            message.responses = [];
                        message.responses.push($root.Router.UserFolderPermissionsResponse.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a UserFolderPermissionsResponses message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.UserFolderPermissionsResponses
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.UserFolderPermissionsResponses} UserFolderPermissionsResponses
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserFolderPermissionsResponses.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserFolderPermissionsResponses message.
         * @function verify
         * @memberof Router.UserFolderPermissionsResponses
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserFolderPermissionsResponses.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.responses != null && Object.hasOwnProperty.call(message, "responses")) {
                if (!Array.isArray(message.responses))
                    return "responses: array expected";
                for (let i = 0; i < message.responses.length; ++i) {
                    let error = $root.Router.UserFolderPermissionsResponse.verify(message.responses[i], long + 1);
                    if (error)
                        return "responses." + error;
                }
            }
            return null;
        };

        /**
         * Creates a UserFolderPermissionsResponses message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.UserFolderPermissionsResponses
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.UserFolderPermissionsResponses} UserFolderPermissionsResponses
         */
        UserFolderPermissionsResponses.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.UserFolderPermissionsResponses)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.UserFolderPermissionsResponses: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.UserFolderPermissionsResponses();
            if (object.responses) {
                if (!Array.isArray(object.responses))
                    throw TypeError(".Router.UserFolderPermissionsResponses.responses: array expected");
                message.responses = [];
                for (let i = 0; i < object.responses.length; ++i) {
                    if (!$util.isObject(object.responses[i]))
                        throw TypeError(".Router.UserFolderPermissionsResponses.responses: object expected");
                    message.responses[i] = $root.Router.UserFolderPermissionsResponse.fromObject(object.responses[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a UserFolderPermissionsResponses message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.UserFolderPermissionsResponses
         * @static
         * @param {Router.UserFolderPermissionsResponses} message UserFolderPermissionsResponses
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserFolderPermissionsResponses.toObject = function toObject(message, options, q) {
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
                    object.responses[j] = $root.Router.UserFolderPermissionsResponse.toObject(message.responses[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this UserFolderPermissionsResponses to JSON.
         * @function toJSON
         * @memberof Router.UserFolderPermissionsResponses
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserFolderPermissionsResponses.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserFolderPermissionsResponses
         * @function getTypeUrl
         * @memberof Router.UserFolderPermissionsResponses
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserFolderPermissionsResponses.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.UserFolderPermissionsResponses";
        };

        return UserFolderPermissionsResponses;
    })();

    Router.RotationSchedule = (function() {

        /**
         * Properties of a RotationSchedule.
         * @memberof Router
         * @interface IRotationSchedule
         * @property {Uint8Array|null} [recordUid] RotationSchedule recordUid
         * @property {string|null} [schedule] RotationSchedule schedule
         */

        /**
         * Constructs a new RotationSchedule.
         * @memberof Router
         * @classdesc Represents a RotationSchedule.
         * @implements IRotationSchedule
         * @constructor
         * @param {Router.IRotationSchedule=} [properties] Properties to set
         */
        function RotationSchedule(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RotationSchedule recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Router.RotationSchedule
         * @instance
         */
        RotationSchedule.prototype.recordUid = $util.newBuffer([]);

        /**
         * RotationSchedule schedule.
         * @member {string} schedule
         * @memberof Router.RotationSchedule
         * @instance
         */
        RotationSchedule.prototype.schedule = "";

        /**
         * Creates a new RotationSchedule instance using the specified properties.
         * @function create
         * @memberof Router.RotationSchedule
         * @static
         * @param {Router.IRotationSchedule=} [properties] Properties to set
         * @returns {Router.RotationSchedule} RotationSchedule instance
         */
        RotationSchedule.create = function create(properties) {
            return new RotationSchedule(properties);
        };

        /**
         * Encodes the specified RotationSchedule message. Does not implicitly {@link Router.RotationSchedule.verify|verify} messages.
         * @function encode
         * @memberof Router.RotationSchedule
         * @static
         * @param {Router.IRotationSchedule} message RotationSchedule message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RotationSchedule.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.schedule);
            return writer;
        };

        /**
         * Encodes the specified RotationSchedule message, length delimited. Does not implicitly {@link Router.RotationSchedule.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RotationSchedule
         * @static
         * @param {Router.IRotationSchedule} message RotationSchedule message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RotationSchedule.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RotationSchedule message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RotationSchedule
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RotationSchedule} RotationSchedule
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RotationSchedule.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RotationSchedule();
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
                        message.schedule = reader.string();
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
         * Decodes a RotationSchedule message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RotationSchedule
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RotationSchedule} RotationSchedule
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RotationSchedule.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RotationSchedule message.
         * @function verify
         * @memberof Router.RotationSchedule
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RotationSchedule.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                    return "recordUid: buffer expected";
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                if (!$util.isString(message.schedule))
                    return "schedule: string expected";
            return null;
        };

        /**
         * Creates a RotationSchedule message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RotationSchedule
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RotationSchedule} RotationSchedule
         */
        RotationSchedule.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RotationSchedule)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RotationSchedule: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RotationSchedule();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.schedule != null)
                message.schedule = String(object.schedule);
            return message;
        };

        /**
         * Creates a plain object from a RotationSchedule message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RotationSchedule
         * @static
         * @param {Router.RotationSchedule} message RotationSchedule
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RotationSchedule.toObject = function toObject(message, options, q) {
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
                object.schedule = "";
            }
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                object.schedule = message.schedule;
            return object;
        };

        /**
         * Converts this RotationSchedule to JSON.
         * @function toJSON
         * @memberof Router.RotationSchedule
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RotationSchedule.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RotationSchedule
         * @function getTypeUrl
         * @memberof Router.RotationSchedule
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RotationSchedule.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RotationSchedule";
        };

        return RotationSchedule;
    })();

    /**
     * ServiceType enum.
     * @name Router.ServiceType
     * @enum {number}
     * @property {number} UNSPECIFIED=0 UNSPECIFIED value
     * @property {number} KA=1 KA value
     * @property {number} BI=2 BI value
     */
    Router.ServiceType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNSPECIFIED"] = 0;
        values[valuesById[1] = "KA"] = 1;
        values[valuesById[2] = "BI"] = 2;
        return values;
    })();

    Router.ApiCallbackRequest = (function() {

        /**
         * Properties of an ApiCallbackRequest.
         * @memberof Router
         * @interface IApiCallbackRequest
         * @property {Uint8Array|null} [resourceUid] ApiCallbackRequest resourceUid
         * @property {Array.<Router.IApiCallbackSchedule>|null} [schedules] ApiCallbackRequest schedules
         * @property {string|null} [url] ApiCallbackRequest url
         * @property {Router.ServiceType|null} [serviceType] ApiCallbackRequest serviceType
         */

        /**
         * Constructs a new ApiCallbackRequest.
         * @memberof Router
         * @classdesc Represents an ApiCallbackRequest.
         * @implements IApiCallbackRequest
         * @constructor
         * @param {Router.IApiCallbackRequest=} [properties] Properties to set
         */
        function ApiCallbackRequest(properties) {
            this.schedules = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApiCallbackRequest resourceUid.
         * @member {Uint8Array} resourceUid
         * @memberof Router.ApiCallbackRequest
         * @instance
         */
        ApiCallbackRequest.prototype.resourceUid = $util.newBuffer([]);

        /**
         * ApiCallbackRequest schedules.
         * @member {Array.<Router.IApiCallbackSchedule>} schedules
         * @memberof Router.ApiCallbackRequest
         * @instance
         */
        ApiCallbackRequest.prototype.schedules = $util.emptyArray;

        /**
         * ApiCallbackRequest url.
         * @member {string} url
         * @memberof Router.ApiCallbackRequest
         * @instance
         */
        ApiCallbackRequest.prototype.url = "";

        /**
         * ApiCallbackRequest serviceType.
         * @member {Router.ServiceType} serviceType
         * @memberof Router.ApiCallbackRequest
         * @instance
         */
        ApiCallbackRequest.prototype.serviceType = 0;

        /**
         * Creates a new ApiCallbackRequest instance using the specified properties.
         * @function create
         * @memberof Router.ApiCallbackRequest
         * @static
         * @param {Router.IApiCallbackRequest=} [properties] Properties to set
         * @returns {Router.ApiCallbackRequest} ApiCallbackRequest instance
         */
        ApiCallbackRequest.create = function create(properties) {
            return new ApiCallbackRequest(properties);
        };

        /**
         * Encodes the specified ApiCallbackRequest message. Does not implicitly {@link Router.ApiCallbackRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.ApiCallbackRequest
         * @static
         * @param {Router.IApiCallbackRequest} message ApiCallbackRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiCallbackRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.resourceUid);
            if (message.schedules != null && message.schedules.length)
                for (let i = 0; i < message.schedules.length; ++i)
                    $root.Router.ApiCallbackSchedule.encode(message.schedules[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.url);
            if (message.serviceType != null && Object.hasOwnProperty.call(message, "serviceType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.serviceType);
            return writer;
        };

        /**
         * Encodes the specified ApiCallbackRequest message, length delimited. Does not implicitly {@link Router.ApiCallbackRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.ApiCallbackRequest
         * @static
         * @param {Router.IApiCallbackRequest} message ApiCallbackRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiCallbackRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApiCallbackRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.ApiCallbackRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.ApiCallbackRequest} ApiCallbackRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiCallbackRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.ApiCallbackRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.resourceUid = reader.bytes();
                        break;
                    }
                case 2: {
                        if (!(message.schedules && message.schedules.length))
                            message.schedules = [];
                        message.schedules.push($root.Router.ApiCallbackSchedule.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        message.url = reader.string();
                        break;
                    }
                case 4: {
                        message.serviceType = reader.int32();
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
         * Decodes an ApiCallbackRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.ApiCallbackRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.ApiCallbackRequest} ApiCallbackRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiCallbackRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApiCallbackRequest message.
         * @function verify
         * @memberof Router.ApiCallbackRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApiCallbackRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                if (!(message.resourceUid && typeof message.resourceUid.length === "number" || $util.isString(message.resourceUid)))
                    return "resourceUid: buffer expected";
            if (message.schedules != null && Object.hasOwnProperty.call(message, "schedules")) {
                if (!Array.isArray(message.schedules))
                    return "schedules: array expected";
                for (let i = 0; i < message.schedules.length; ++i) {
                    let error = $root.Router.ApiCallbackSchedule.verify(message.schedules[i], long + 1);
                    if (error)
                        return "schedules." + error;
                }
            }
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.serviceType != null && Object.hasOwnProperty.call(message, "serviceType"))
                switch (message.serviceType) {
                default:
                    return "serviceType: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        /**
         * Creates an ApiCallbackRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.ApiCallbackRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.ApiCallbackRequest} ApiCallbackRequest
         */
        ApiCallbackRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.ApiCallbackRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.ApiCallbackRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.ApiCallbackRequest();
            if (object.resourceUid != null)
                if (typeof object.resourceUid === "string")
                    $util.base64.decode(object.resourceUid, message.resourceUid = $util.newBuffer($util.base64.length(object.resourceUid)), 0);
                else if (object.resourceUid.length >= 0)
                    message.resourceUid = object.resourceUid;
            if (object.schedules) {
                if (!Array.isArray(object.schedules))
                    throw TypeError(".Router.ApiCallbackRequest.schedules: array expected");
                message.schedules = [];
                for (let i = 0; i < object.schedules.length; ++i) {
                    if (!$util.isObject(object.schedules[i]))
                        throw TypeError(".Router.ApiCallbackRequest.schedules: object expected");
                    message.schedules[i] = $root.Router.ApiCallbackSchedule.fromObject(object.schedules[i], long + 1);
                }
            }
            if (object.url != null)
                message.url = String(object.url);
            switch (object.serviceType) {
            default:
                if (typeof object.serviceType === "number") {
                    message.serviceType = object.serviceType;
                    break;
                }
                break;
            case "UNSPECIFIED":
            case 0:
                message.serviceType = 0;
                break;
            case "KA":
            case 1:
                message.serviceType = 1;
                break;
            case "BI":
            case 2:
                message.serviceType = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an ApiCallbackRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.ApiCallbackRequest
         * @static
         * @param {Router.ApiCallbackRequest} message ApiCallbackRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApiCallbackRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.schedules = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.resourceUid = "";
                else {
                    object.resourceUid = [];
                    if (options.bytes !== Array)
                        object.resourceUid = $util.newBuffer(object.resourceUid);
                }
                object.url = "";
                object.serviceType = options.enums === String ? "UNSPECIFIED" : 0;
            }
            if (message.resourceUid != null && Object.hasOwnProperty.call(message, "resourceUid"))
                object.resourceUid = options.bytes === String ? $util.base64.encode(message.resourceUid, 0, message.resourceUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.resourceUid) : message.resourceUid;
            if (message.schedules && message.schedules.length) {
                object.schedules = [];
                for (let j = 0; j < message.schedules.length; ++j)
                    object.schedules[j] = $root.Router.ApiCallbackSchedule.toObject(message.schedules[j], options, q + 1);
            }
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                object.url = message.url;
            if (message.serviceType != null && Object.hasOwnProperty.call(message, "serviceType"))
                object.serviceType = options.enums === String ? $root.Router.ServiceType[message.serviceType] === undefined ? message.serviceType : $root.Router.ServiceType[message.serviceType] : message.serviceType;
            return object;
        };

        /**
         * Converts this ApiCallbackRequest to JSON.
         * @function toJSON
         * @memberof Router.ApiCallbackRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApiCallbackRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApiCallbackRequest
         * @function getTypeUrl
         * @memberof Router.ApiCallbackRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApiCallbackRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.ApiCallbackRequest";
        };

        return ApiCallbackRequest;
    })();

    Router.ApiCallbackSchedule = (function() {

        /**
         * Properties of an ApiCallbackSchedule.
         * @memberof Router
         * @interface IApiCallbackSchedule
         * @property {string|null} [schedule] ApiCallbackSchedule schedule
         * @property {Uint8Array|null} [data] ApiCallbackSchedule data
         */

        /**
         * Constructs a new ApiCallbackSchedule.
         * @memberof Router
         * @classdesc Represents an ApiCallbackSchedule.
         * @implements IApiCallbackSchedule
         * @constructor
         * @param {Router.IApiCallbackSchedule=} [properties] Properties to set
         */
        function ApiCallbackSchedule(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApiCallbackSchedule schedule.
         * @member {string} schedule
         * @memberof Router.ApiCallbackSchedule
         * @instance
         */
        ApiCallbackSchedule.prototype.schedule = "";

        /**
         * ApiCallbackSchedule data.
         * @member {Uint8Array} data
         * @memberof Router.ApiCallbackSchedule
         * @instance
         */
        ApiCallbackSchedule.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new ApiCallbackSchedule instance using the specified properties.
         * @function create
         * @memberof Router.ApiCallbackSchedule
         * @static
         * @param {Router.IApiCallbackSchedule=} [properties] Properties to set
         * @returns {Router.ApiCallbackSchedule} ApiCallbackSchedule instance
         */
        ApiCallbackSchedule.create = function create(properties) {
            return new ApiCallbackSchedule(properties);
        };

        /**
         * Encodes the specified ApiCallbackSchedule message. Does not implicitly {@link Router.ApiCallbackSchedule.verify|verify} messages.
         * @function encode
         * @memberof Router.ApiCallbackSchedule
         * @static
         * @param {Router.IApiCallbackSchedule} message ApiCallbackSchedule message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiCallbackSchedule.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.schedule);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified ApiCallbackSchedule message, length delimited. Does not implicitly {@link Router.ApiCallbackSchedule.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.ApiCallbackSchedule
         * @static
         * @param {Router.IApiCallbackSchedule} message ApiCallbackSchedule message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiCallbackSchedule.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApiCallbackSchedule message from the specified reader or buffer.
         * @function decode
         * @memberof Router.ApiCallbackSchedule
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.ApiCallbackSchedule} ApiCallbackSchedule
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiCallbackSchedule.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.ApiCallbackSchedule();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.schedule = reader.string();
                        break;
                    }
                case 2: {
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
         * Decodes an ApiCallbackSchedule message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.ApiCallbackSchedule
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.ApiCallbackSchedule} ApiCallbackSchedule
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiCallbackSchedule.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApiCallbackSchedule message.
         * @function verify
         * @memberof Router.ApiCallbackSchedule
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApiCallbackSchedule.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                if (!$util.isString(message.schedule))
                    return "schedule: string expected";
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates an ApiCallbackSchedule message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.ApiCallbackSchedule
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.ApiCallbackSchedule} ApiCallbackSchedule
         */
        ApiCallbackSchedule.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.ApiCallbackSchedule)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.ApiCallbackSchedule: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.ApiCallbackSchedule();
            if (object.schedule != null)
                message.schedule = String(object.schedule);
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from an ApiCallbackSchedule message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.ApiCallbackSchedule
         * @static
         * @param {Router.ApiCallbackSchedule} message ApiCallbackSchedule
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApiCallbackSchedule.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.schedule = "";
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                object.schedule = message.schedule;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this ApiCallbackSchedule to JSON.
         * @function toJSON
         * @memberof Router.ApiCallbackSchedule
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApiCallbackSchedule.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApiCallbackSchedule
         * @function getTypeUrl
         * @memberof Router.ApiCallbackSchedule
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApiCallbackSchedule.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.ApiCallbackSchedule";
        };

        return ApiCallbackSchedule;
    })();

    Router.RouterScheduledActions = (function() {

        /**
         * Properties of a RouterScheduledActions.
         * @memberof Router
         * @interface IRouterScheduledActions
         * @property {string|null} [schedule] RouterScheduledActions schedule
         * @property {Array.<Uint8Array>|null} [resourceUids] RouterScheduledActions resourceUids
         */

        /**
         * Constructs a new RouterScheduledActions.
         * @memberof Router
         * @classdesc Represents a RouterScheduledActions.
         * @implements IRouterScheduledActions
         * @constructor
         * @param {Router.IRouterScheduledActions=} [properties] Properties to set
         */
        function RouterScheduledActions(properties) {
            this.resourceUids = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterScheduledActions schedule.
         * @member {string} schedule
         * @memberof Router.RouterScheduledActions
         * @instance
         */
        RouterScheduledActions.prototype.schedule = "";

        /**
         * RouterScheduledActions resourceUids.
         * @member {Array.<Uint8Array>} resourceUids
         * @memberof Router.RouterScheduledActions
         * @instance
         */
        RouterScheduledActions.prototype.resourceUids = $util.emptyArray;

        /**
         * Creates a new RouterScheduledActions instance using the specified properties.
         * @function create
         * @memberof Router.RouterScheduledActions
         * @static
         * @param {Router.IRouterScheduledActions=} [properties] Properties to set
         * @returns {Router.RouterScheduledActions} RouterScheduledActions instance
         */
        RouterScheduledActions.create = function create(properties) {
            return new RouterScheduledActions(properties);
        };

        /**
         * Encodes the specified RouterScheduledActions message. Does not implicitly {@link Router.RouterScheduledActions.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterScheduledActions
         * @static
         * @param {Router.IRouterScheduledActions} message RouterScheduledActions message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterScheduledActions.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.schedule);
            if (message.resourceUids != null && message.resourceUids.length)
                for (let i = 0; i < message.resourceUids.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.resourceUids[i]);
            return writer;
        };

        /**
         * Encodes the specified RouterScheduledActions message, length delimited. Does not implicitly {@link Router.RouterScheduledActions.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterScheduledActions
         * @static
         * @param {Router.IRouterScheduledActions} message RouterScheduledActions message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterScheduledActions.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterScheduledActions message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterScheduledActions
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterScheduledActions} RouterScheduledActions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterScheduledActions.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterScheduledActions();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.schedule = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.resourceUids && message.resourceUids.length))
                            message.resourceUids = [];
                        message.resourceUids.push(reader.bytes());
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
         * Decodes a RouterScheduledActions message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterScheduledActions
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterScheduledActions} RouterScheduledActions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterScheduledActions.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterScheduledActions message.
         * @function verify
         * @memberof Router.RouterScheduledActions
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterScheduledActions.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                if (!$util.isString(message.schedule))
                    return "schedule: string expected";
            if (message.resourceUids != null && Object.hasOwnProperty.call(message, "resourceUids")) {
                if (!Array.isArray(message.resourceUids))
                    return "resourceUids: array expected";
                for (let i = 0; i < message.resourceUids.length; ++i)
                    if (!(message.resourceUids[i] && typeof message.resourceUids[i].length === "number" || $util.isString(message.resourceUids[i])))
                        return "resourceUids: buffer[] expected";
            }
            return null;
        };

        /**
         * Creates a RouterScheduledActions message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterScheduledActions
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterScheduledActions} RouterScheduledActions
         */
        RouterScheduledActions.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterScheduledActions)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterScheduledActions: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterScheduledActions();
            if (object.schedule != null)
                message.schedule = String(object.schedule);
            if (object.resourceUids) {
                if (!Array.isArray(object.resourceUids))
                    throw TypeError(".Router.RouterScheduledActions.resourceUids: array expected");
                message.resourceUids = [];
                for (let i = 0; i < object.resourceUids.length; ++i)
                    if (typeof object.resourceUids[i] === "string")
                        $util.base64.decode(object.resourceUids[i], message.resourceUids[i] = $util.newBuffer($util.base64.length(object.resourceUids[i])), 0);
                    else if (object.resourceUids[i].length >= 0)
                        message.resourceUids[i] = object.resourceUids[i];
            }
            return message;
        };

        /**
         * Creates a plain object from a RouterScheduledActions message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterScheduledActions
         * @static
         * @param {Router.RouterScheduledActions} message RouterScheduledActions
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterScheduledActions.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.resourceUids = [];
            if (options.defaults)
                object.schedule = "";
            if (message.schedule != null && Object.hasOwnProperty.call(message, "schedule"))
                object.schedule = message.schedule;
            if (message.resourceUids && message.resourceUids.length) {
                object.resourceUids = [];
                for (let j = 0; j < message.resourceUids.length; ++j)
                    object.resourceUids[j] = options.bytes === String ? $util.base64.encode(message.resourceUids[j], 0, message.resourceUids[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.resourceUids[j]) : message.resourceUids[j];
            }
            return object;
        };

        /**
         * Converts this RouterScheduledActions to JSON.
         * @function toJSON
         * @memberof Router.RouterScheduledActions
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterScheduledActions.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterScheduledActions
         * @function getTypeUrl
         * @memberof Router.RouterScheduledActions
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterScheduledActions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterScheduledActions";
        };

        return RouterScheduledActions;
    })();

    Router.RouterRecordsRotationRequest = (function() {

        /**
         * Properties of a RouterRecordsRotationRequest.
         * @memberof Router
         * @interface IRouterRecordsRotationRequest
         * @property {Array.<Router.IRouterScheduledActions>|null} [rotationSchedules] RouterRecordsRotationRequest rotationSchedules
         */

        /**
         * Constructs a new RouterRecordsRotationRequest.
         * @memberof Router
         * @classdesc Represents a RouterRecordsRotationRequest.
         * @implements IRouterRecordsRotationRequest
         * @constructor
         * @param {Router.IRouterRecordsRotationRequest=} [properties] Properties to set
         */
        function RouterRecordsRotationRequest(properties) {
            this.rotationSchedules = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RouterRecordsRotationRequest rotationSchedules.
         * @member {Array.<Router.IRouterScheduledActions>} rotationSchedules
         * @memberof Router.RouterRecordsRotationRequest
         * @instance
         */
        RouterRecordsRotationRequest.prototype.rotationSchedules = $util.emptyArray;

        /**
         * Creates a new RouterRecordsRotationRequest instance using the specified properties.
         * @function create
         * @memberof Router.RouterRecordsRotationRequest
         * @static
         * @param {Router.IRouterRecordsRotationRequest=} [properties] Properties to set
         * @returns {Router.RouterRecordsRotationRequest} RouterRecordsRotationRequest instance
         */
        RouterRecordsRotationRequest.create = function create(properties) {
            return new RouterRecordsRotationRequest(properties);
        };

        /**
         * Encodes the specified RouterRecordsRotationRequest message. Does not implicitly {@link Router.RouterRecordsRotationRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.RouterRecordsRotationRequest
         * @static
         * @param {Router.IRouterRecordsRotationRequest} message RouterRecordsRotationRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRecordsRotationRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.rotationSchedules != null && message.rotationSchedules.length)
                for (let i = 0; i < message.rotationSchedules.length; ++i)
                    $root.Router.RouterScheduledActions.encode(message.rotationSchedules[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RouterRecordsRotationRequest message, length delimited. Does not implicitly {@link Router.RouterRecordsRotationRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.RouterRecordsRotationRequest
         * @static
         * @param {Router.IRouterRecordsRotationRequest} message RouterRecordsRotationRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RouterRecordsRotationRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a RouterRecordsRotationRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.RouterRecordsRotationRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.RouterRecordsRotationRequest} RouterRecordsRotationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRecordsRotationRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.RouterRecordsRotationRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.rotationSchedules && message.rotationSchedules.length))
                            message.rotationSchedules = [];
                        message.rotationSchedules.push($root.Router.RouterScheduledActions.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a RouterRecordsRotationRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.RouterRecordsRotationRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.RouterRecordsRotationRequest} RouterRecordsRotationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RouterRecordsRotationRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RouterRecordsRotationRequest message.
         * @function verify
         * @memberof Router.RouterRecordsRotationRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RouterRecordsRotationRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.rotationSchedules != null && Object.hasOwnProperty.call(message, "rotationSchedules")) {
                if (!Array.isArray(message.rotationSchedules))
                    return "rotationSchedules: array expected";
                for (let i = 0; i < message.rotationSchedules.length; ++i) {
                    let error = $root.Router.RouterScheduledActions.verify(message.rotationSchedules[i], long + 1);
                    if (error)
                        return "rotationSchedules." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RouterRecordsRotationRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.RouterRecordsRotationRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.RouterRecordsRotationRequest} RouterRecordsRotationRequest
         */
        RouterRecordsRotationRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.RouterRecordsRotationRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.RouterRecordsRotationRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.RouterRecordsRotationRequest();
            if (object.rotationSchedules) {
                if (!Array.isArray(object.rotationSchedules))
                    throw TypeError(".Router.RouterRecordsRotationRequest.rotationSchedules: array expected");
                message.rotationSchedules = [];
                for (let i = 0; i < object.rotationSchedules.length; ++i) {
                    if (!$util.isObject(object.rotationSchedules[i]))
                        throw TypeError(".Router.RouterRecordsRotationRequest.rotationSchedules: object expected");
                    message.rotationSchedules[i] = $root.Router.RouterScheduledActions.fromObject(object.rotationSchedules[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a RouterRecordsRotationRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.RouterRecordsRotationRequest
         * @static
         * @param {Router.RouterRecordsRotationRequest} message RouterRecordsRotationRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RouterRecordsRotationRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.rotationSchedules = [];
            if (message.rotationSchedules && message.rotationSchedules.length) {
                object.rotationSchedules = [];
                for (let j = 0; j < message.rotationSchedules.length; ++j)
                    object.rotationSchedules[j] = $root.Router.RouterScheduledActions.toObject(message.rotationSchedules[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this RouterRecordsRotationRequest to JSON.
         * @function toJSON
         * @memberof Router.RouterRecordsRotationRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RouterRecordsRotationRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RouterRecordsRotationRequest
         * @function getTypeUrl
         * @memberof Router.RouterRecordsRotationRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RouterRecordsRotationRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.RouterRecordsRotationRequest";
        };

        return RouterRecordsRotationRequest;
    })();

    Router.ConnectionParameters = (function() {

        /**
         * Properties of a ConnectionParameters.
         * @memberof Router
         * @interface IConnectionParameters
         * @property {Uint8Array|null} [connectionUid] ConnectionParameters connectionUid
         * @property {Uint8Array|null} [recordUid] ConnectionParameters recordUid
         * @property {number|null} [userId] ConnectionParameters userId
         * @property {Uint8Array|null} [controllerUid] ConnectionParameters controllerUid
         * @property {Uint8Array|null} [credentialsRecordUid] ConnectionParameters credentialsRecordUid
         */

        /**
         * Constructs a new ConnectionParameters.
         * @memberof Router
         * @classdesc Represents a ConnectionParameters.
         * @implements IConnectionParameters
         * @constructor
         * @param {Router.IConnectionParameters=} [properties] Properties to set
         */
        function ConnectionParameters(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ConnectionParameters connectionUid.
         * @member {Uint8Array} connectionUid
         * @memberof Router.ConnectionParameters
         * @instance
         */
        ConnectionParameters.prototype.connectionUid = $util.newBuffer([]);

        /**
         * ConnectionParameters recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Router.ConnectionParameters
         * @instance
         */
        ConnectionParameters.prototype.recordUid = $util.newBuffer([]);

        /**
         * ConnectionParameters userId.
         * @member {number} userId
         * @memberof Router.ConnectionParameters
         * @instance
         */
        ConnectionParameters.prototype.userId = 0;

        /**
         * ConnectionParameters controllerUid.
         * @member {Uint8Array} controllerUid
         * @memberof Router.ConnectionParameters
         * @instance
         */
        ConnectionParameters.prototype.controllerUid = $util.newBuffer([]);

        /**
         * ConnectionParameters credentialsRecordUid.
         * @member {Uint8Array} credentialsRecordUid
         * @memberof Router.ConnectionParameters
         * @instance
         */
        ConnectionParameters.prototype.credentialsRecordUid = $util.newBuffer([]);

        /**
         * Creates a new ConnectionParameters instance using the specified properties.
         * @function create
         * @memberof Router.ConnectionParameters
         * @static
         * @param {Router.IConnectionParameters=} [properties] Properties to set
         * @returns {Router.ConnectionParameters} ConnectionParameters instance
         */
        ConnectionParameters.create = function create(properties) {
            return new ConnectionParameters(properties);
        };

        /**
         * Encodes the specified ConnectionParameters message. Does not implicitly {@link Router.ConnectionParameters.verify|verify} messages.
         * @function encode
         * @memberof Router.ConnectionParameters
         * @static
         * @param {Router.IConnectionParameters} message ConnectionParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConnectionParameters.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.connectionUid != null && Object.hasOwnProperty.call(message, "connectionUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.connectionUid);
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recordUid);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.userId);
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.controllerUid);
            if (message.credentialsRecordUid != null && Object.hasOwnProperty.call(message, "credentialsRecordUid"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.credentialsRecordUid);
            return writer;
        };

        /**
         * Encodes the specified ConnectionParameters message, length delimited. Does not implicitly {@link Router.ConnectionParameters.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.ConnectionParameters
         * @static
         * @param {Router.IConnectionParameters} message ConnectionParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConnectionParameters.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ConnectionParameters message from the specified reader or buffer.
         * @function decode
         * @memberof Router.ConnectionParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.ConnectionParameters} ConnectionParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConnectionParameters.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.ConnectionParameters();
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
                        message.recordUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.userId = reader.int32();
                        break;
                    }
                case 4: {
                        message.controllerUid = reader.bytes();
                        break;
                    }
                case 5: {
                        message.credentialsRecordUid = reader.bytes();
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
         * Decodes a ConnectionParameters message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.ConnectionParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.ConnectionParameters} ConnectionParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConnectionParameters.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ConnectionParameters message.
         * @function verify
         * @memberof Router.ConnectionParameters
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ConnectionParameters.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.connectionUid != null && Object.hasOwnProperty.call(message, "connectionUid"))
                if (!(message.connectionUid && typeof message.connectionUid.length === "number" || $util.isString(message.connectionUid)))
                    return "connectionUid: buffer expected";
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                    return "recordUid: buffer expected";
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                if (!$util.isInteger(message.userId))
                    return "userId: integer expected";
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                if (!(message.controllerUid && typeof message.controllerUid.length === "number" || $util.isString(message.controllerUid)))
                    return "controllerUid: buffer expected";
            if (message.credentialsRecordUid != null && Object.hasOwnProperty.call(message, "credentialsRecordUid"))
                if (!(message.credentialsRecordUid && typeof message.credentialsRecordUid.length === "number" || $util.isString(message.credentialsRecordUid)))
                    return "credentialsRecordUid: buffer expected";
            return null;
        };

        /**
         * Creates a ConnectionParameters message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.ConnectionParameters
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.ConnectionParameters} ConnectionParameters
         */
        ConnectionParameters.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.ConnectionParameters)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.ConnectionParameters: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.ConnectionParameters();
            if (object.connectionUid != null)
                if (typeof object.connectionUid === "string")
                    $util.base64.decode(object.connectionUid, message.connectionUid = $util.newBuffer($util.base64.length(object.connectionUid)), 0);
                else if (object.connectionUid.length >= 0)
                    message.connectionUid = object.connectionUid;
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.controllerUid != null)
                if (typeof object.controllerUid === "string")
                    $util.base64.decode(object.controllerUid, message.controllerUid = $util.newBuffer($util.base64.length(object.controllerUid)), 0);
                else if (object.controllerUid.length >= 0)
                    message.controllerUid = object.controllerUid;
            if (object.credentialsRecordUid != null)
                if (typeof object.credentialsRecordUid === "string")
                    $util.base64.decode(object.credentialsRecordUid, message.credentialsRecordUid = $util.newBuffer($util.base64.length(object.credentialsRecordUid)), 0);
                else if (object.credentialsRecordUid.length >= 0)
                    message.credentialsRecordUid = object.credentialsRecordUid;
            return message;
        };

        /**
         * Creates a plain object from a ConnectionParameters message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.ConnectionParameters
         * @static
         * @param {Router.ConnectionParameters} message ConnectionParameters
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ConnectionParameters.toObject = function toObject(message, options, q) {
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
                if (options.bytes === String)
                    object.recordUid = "";
                else {
                    object.recordUid = [];
                    if (options.bytes !== Array)
                        object.recordUid = $util.newBuffer(object.recordUid);
                }
                object.userId = 0;
                if (options.bytes === String)
                    object.controllerUid = "";
                else {
                    object.controllerUid = [];
                    if (options.bytes !== Array)
                        object.controllerUid = $util.newBuffer(object.controllerUid);
                }
                if (options.bytes === String)
                    object.credentialsRecordUid = "";
                else {
                    object.credentialsRecordUid = [];
                    if (options.bytes !== Array)
                        object.credentialsRecordUid = $util.newBuffer(object.credentialsRecordUid);
                }
            }
            if (message.connectionUid != null && Object.hasOwnProperty.call(message, "connectionUid"))
                object.connectionUid = options.bytes === String ? $util.base64.encode(message.connectionUid, 0, message.connectionUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.connectionUid) : message.connectionUid;
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                object.userId = message.userId;
            if (message.controllerUid != null && Object.hasOwnProperty.call(message, "controllerUid"))
                object.controllerUid = options.bytes === String ? $util.base64.encode(message.controllerUid, 0, message.controllerUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.controllerUid) : message.controllerUid;
            if (message.credentialsRecordUid != null && Object.hasOwnProperty.call(message, "credentialsRecordUid"))
                object.credentialsRecordUid = options.bytes === String ? $util.base64.encode(message.credentialsRecordUid, 0, message.credentialsRecordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.credentialsRecordUid) : message.credentialsRecordUid;
            return object;
        };

        /**
         * Converts this ConnectionParameters to JSON.
         * @function toJSON
         * @memberof Router.ConnectionParameters
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ConnectionParameters.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ConnectionParameters
         * @function getTypeUrl
         * @memberof Router.ConnectionParameters
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ConnectionParameters.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.ConnectionParameters";
        };

        return ConnectionParameters;
    })();

    Router.ValidateConnectionsRequest = (function() {

        /**
         * Properties of a ValidateConnectionsRequest.
         * @memberof Router
         * @interface IValidateConnectionsRequest
         * @property {Array.<Router.IConnectionParameters>|null} [connections] ValidateConnectionsRequest connections
         */

        /**
         * Constructs a new ValidateConnectionsRequest.
         * @memberof Router
         * @classdesc Represents a ValidateConnectionsRequest.
         * @implements IValidateConnectionsRequest
         * @constructor
         * @param {Router.IValidateConnectionsRequest=} [properties] Properties to set
         */
        function ValidateConnectionsRequest(properties) {
            this.connections = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidateConnectionsRequest connections.
         * @member {Array.<Router.IConnectionParameters>} connections
         * @memberof Router.ValidateConnectionsRequest
         * @instance
         */
        ValidateConnectionsRequest.prototype.connections = $util.emptyArray;

        /**
         * Creates a new ValidateConnectionsRequest instance using the specified properties.
         * @function create
         * @memberof Router.ValidateConnectionsRequest
         * @static
         * @param {Router.IValidateConnectionsRequest=} [properties] Properties to set
         * @returns {Router.ValidateConnectionsRequest} ValidateConnectionsRequest instance
         */
        ValidateConnectionsRequest.create = function create(properties) {
            return new ValidateConnectionsRequest(properties);
        };

        /**
         * Encodes the specified ValidateConnectionsRequest message. Does not implicitly {@link Router.ValidateConnectionsRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.ValidateConnectionsRequest
         * @static
         * @param {Router.IValidateConnectionsRequest} message ValidateConnectionsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateConnectionsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.connections != null && message.connections.length)
                for (let i = 0; i < message.connections.length; ++i)
                    $root.Router.ConnectionParameters.encode(message.connections[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ValidateConnectionsRequest message, length delimited. Does not implicitly {@link Router.ValidateConnectionsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.ValidateConnectionsRequest
         * @static
         * @param {Router.IValidateConnectionsRequest} message ValidateConnectionsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateConnectionsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ValidateConnectionsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.ValidateConnectionsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.ValidateConnectionsRequest} ValidateConnectionsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateConnectionsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.ValidateConnectionsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.connections && message.connections.length))
                            message.connections = [];
                        message.connections.push($root.Router.ConnectionParameters.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ValidateConnectionsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.ValidateConnectionsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.ValidateConnectionsRequest} ValidateConnectionsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateConnectionsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ValidateConnectionsRequest message.
         * @function verify
         * @memberof Router.ValidateConnectionsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ValidateConnectionsRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.connections != null && Object.hasOwnProperty.call(message, "connections")) {
                if (!Array.isArray(message.connections))
                    return "connections: array expected";
                for (let i = 0; i < message.connections.length; ++i) {
                    let error = $root.Router.ConnectionParameters.verify(message.connections[i], long + 1);
                    if (error)
                        return "connections." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ValidateConnectionsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.ValidateConnectionsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.ValidateConnectionsRequest} ValidateConnectionsRequest
         */
        ValidateConnectionsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.ValidateConnectionsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.ValidateConnectionsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.ValidateConnectionsRequest();
            if (object.connections) {
                if (!Array.isArray(object.connections))
                    throw TypeError(".Router.ValidateConnectionsRequest.connections: array expected");
                message.connections = [];
                for (let i = 0; i < object.connections.length; ++i) {
                    if (!$util.isObject(object.connections[i]))
                        throw TypeError(".Router.ValidateConnectionsRequest.connections: object expected");
                    message.connections[i] = $root.Router.ConnectionParameters.fromObject(object.connections[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ValidateConnectionsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.ValidateConnectionsRequest
         * @static
         * @param {Router.ValidateConnectionsRequest} message ValidateConnectionsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidateConnectionsRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.connections = [];
            if (message.connections && message.connections.length) {
                object.connections = [];
                for (let j = 0; j < message.connections.length; ++j)
                    object.connections[j] = $root.Router.ConnectionParameters.toObject(message.connections[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ValidateConnectionsRequest to JSON.
         * @function toJSON
         * @memberof Router.ValidateConnectionsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidateConnectionsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidateConnectionsRequest
         * @function getTypeUrl
         * @memberof Router.ValidateConnectionsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidateConnectionsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.ValidateConnectionsRequest";
        };

        return ValidateConnectionsRequest;
    })();

    Router.ConnectionValidationFailure = (function() {

        /**
         * Properties of a ConnectionValidationFailure.
         * @memberof Router
         * @interface IConnectionValidationFailure
         * @property {Uint8Array|null} [connectionUid] ConnectionValidationFailure connectionUid
         * @property {string|null} [errorMessage] ConnectionValidationFailure errorMessage
         */

        /**
         * Constructs a new ConnectionValidationFailure.
         * @memberof Router
         * @classdesc Represents a ConnectionValidationFailure.
         * @implements IConnectionValidationFailure
         * @constructor
         * @param {Router.IConnectionValidationFailure=} [properties] Properties to set
         */
        function ConnectionValidationFailure(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ConnectionValidationFailure connectionUid.
         * @member {Uint8Array} connectionUid
         * @memberof Router.ConnectionValidationFailure
         * @instance
         */
        ConnectionValidationFailure.prototype.connectionUid = $util.newBuffer([]);

        /**
         * ConnectionValidationFailure errorMessage.
         * @member {string} errorMessage
         * @memberof Router.ConnectionValidationFailure
         * @instance
         */
        ConnectionValidationFailure.prototype.errorMessage = "";

        /**
         * Creates a new ConnectionValidationFailure instance using the specified properties.
         * @function create
         * @memberof Router.ConnectionValidationFailure
         * @static
         * @param {Router.IConnectionValidationFailure=} [properties] Properties to set
         * @returns {Router.ConnectionValidationFailure} ConnectionValidationFailure instance
         */
        ConnectionValidationFailure.create = function create(properties) {
            return new ConnectionValidationFailure(properties);
        };

        /**
         * Encodes the specified ConnectionValidationFailure message. Does not implicitly {@link Router.ConnectionValidationFailure.verify|verify} messages.
         * @function encode
         * @memberof Router.ConnectionValidationFailure
         * @static
         * @param {Router.IConnectionValidationFailure} message ConnectionValidationFailure message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConnectionValidationFailure.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.connectionUid != null && Object.hasOwnProperty.call(message, "connectionUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.connectionUid);
            if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.errorMessage);
            return writer;
        };

        /**
         * Encodes the specified ConnectionValidationFailure message, length delimited. Does not implicitly {@link Router.ConnectionValidationFailure.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.ConnectionValidationFailure
         * @static
         * @param {Router.IConnectionValidationFailure} message ConnectionValidationFailure message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConnectionValidationFailure.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ConnectionValidationFailure message from the specified reader or buffer.
         * @function decode
         * @memberof Router.ConnectionValidationFailure
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.ConnectionValidationFailure} ConnectionValidationFailure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConnectionValidationFailure.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.ConnectionValidationFailure();
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
                        message.errorMessage = reader.string();
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
         * Decodes a ConnectionValidationFailure message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.ConnectionValidationFailure
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.ConnectionValidationFailure} ConnectionValidationFailure
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConnectionValidationFailure.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ConnectionValidationFailure message.
         * @function verify
         * @memberof Router.ConnectionValidationFailure
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ConnectionValidationFailure.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.connectionUid != null && Object.hasOwnProperty.call(message, "connectionUid"))
                if (!(message.connectionUid && typeof message.connectionUid.length === "number" || $util.isString(message.connectionUid)))
                    return "connectionUid: buffer expected";
            if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                if (!$util.isString(message.errorMessage))
                    return "errorMessage: string expected";
            return null;
        };

        /**
         * Creates a ConnectionValidationFailure message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.ConnectionValidationFailure
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.ConnectionValidationFailure} ConnectionValidationFailure
         */
        ConnectionValidationFailure.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.ConnectionValidationFailure)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.ConnectionValidationFailure: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.ConnectionValidationFailure();
            if (object.connectionUid != null)
                if (typeof object.connectionUid === "string")
                    $util.base64.decode(object.connectionUid, message.connectionUid = $util.newBuffer($util.base64.length(object.connectionUid)), 0);
                else if (object.connectionUid.length >= 0)
                    message.connectionUid = object.connectionUid;
            if (object.errorMessage != null)
                message.errorMessage = String(object.errorMessage);
            return message;
        };

        /**
         * Creates a plain object from a ConnectionValidationFailure message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.ConnectionValidationFailure
         * @static
         * @param {Router.ConnectionValidationFailure} message ConnectionValidationFailure
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ConnectionValidationFailure.toObject = function toObject(message, options, q) {
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
                object.errorMessage = "";
            }
            if (message.connectionUid != null && Object.hasOwnProperty.call(message, "connectionUid"))
                object.connectionUid = options.bytes === String ? $util.base64.encode(message.connectionUid, 0, message.connectionUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.connectionUid) : message.connectionUid;
            if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                object.errorMessage = message.errorMessage;
            return object;
        };

        /**
         * Converts this ConnectionValidationFailure to JSON.
         * @function toJSON
         * @memberof Router.ConnectionValidationFailure
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ConnectionValidationFailure.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ConnectionValidationFailure
         * @function getTypeUrl
         * @memberof Router.ConnectionValidationFailure
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ConnectionValidationFailure.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.ConnectionValidationFailure";
        };

        return ConnectionValidationFailure;
    })();

    Router.ValidateConnectionsResponse = (function() {

        /**
         * Properties of a ValidateConnectionsResponse.
         * @memberof Router
         * @interface IValidateConnectionsResponse
         * @property {Array.<Router.IConnectionValidationFailure>|null} [failedConnections] ValidateConnectionsResponse failedConnections
         */

        /**
         * Constructs a new ValidateConnectionsResponse.
         * @memberof Router
         * @classdesc Represents a ValidateConnectionsResponse.
         * @implements IValidateConnectionsResponse
         * @constructor
         * @param {Router.IValidateConnectionsResponse=} [properties] Properties to set
         */
        function ValidateConnectionsResponse(properties) {
            this.failedConnections = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidateConnectionsResponse failedConnections.
         * @member {Array.<Router.IConnectionValidationFailure>} failedConnections
         * @memberof Router.ValidateConnectionsResponse
         * @instance
         */
        ValidateConnectionsResponse.prototype.failedConnections = $util.emptyArray;

        /**
         * Creates a new ValidateConnectionsResponse instance using the specified properties.
         * @function create
         * @memberof Router.ValidateConnectionsResponse
         * @static
         * @param {Router.IValidateConnectionsResponse=} [properties] Properties to set
         * @returns {Router.ValidateConnectionsResponse} ValidateConnectionsResponse instance
         */
        ValidateConnectionsResponse.create = function create(properties) {
            return new ValidateConnectionsResponse(properties);
        };

        /**
         * Encodes the specified ValidateConnectionsResponse message. Does not implicitly {@link Router.ValidateConnectionsResponse.verify|verify} messages.
         * @function encode
         * @memberof Router.ValidateConnectionsResponse
         * @static
         * @param {Router.IValidateConnectionsResponse} message ValidateConnectionsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateConnectionsResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.failedConnections != null && message.failedConnections.length)
                for (let i = 0; i < message.failedConnections.length; ++i)
                    $root.Router.ConnectionValidationFailure.encode(message.failedConnections[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ValidateConnectionsResponse message, length delimited. Does not implicitly {@link Router.ValidateConnectionsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.ValidateConnectionsResponse
         * @static
         * @param {Router.IValidateConnectionsResponse} message ValidateConnectionsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateConnectionsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ValidateConnectionsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Router.ValidateConnectionsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.ValidateConnectionsResponse} ValidateConnectionsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateConnectionsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.ValidateConnectionsResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.failedConnections && message.failedConnections.length))
                            message.failedConnections = [];
                        message.failedConnections.push($root.Router.ConnectionValidationFailure.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ValidateConnectionsResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.ValidateConnectionsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.ValidateConnectionsResponse} ValidateConnectionsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateConnectionsResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ValidateConnectionsResponse message.
         * @function verify
         * @memberof Router.ValidateConnectionsResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ValidateConnectionsResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.failedConnections != null && Object.hasOwnProperty.call(message, "failedConnections")) {
                if (!Array.isArray(message.failedConnections))
                    return "failedConnections: array expected";
                for (let i = 0; i < message.failedConnections.length; ++i) {
                    let error = $root.Router.ConnectionValidationFailure.verify(message.failedConnections[i], long + 1);
                    if (error)
                        return "failedConnections." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ValidateConnectionsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.ValidateConnectionsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.ValidateConnectionsResponse} ValidateConnectionsResponse
         */
        ValidateConnectionsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.ValidateConnectionsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.ValidateConnectionsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.ValidateConnectionsResponse();
            if (object.failedConnections) {
                if (!Array.isArray(object.failedConnections))
                    throw TypeError(".Router.ValidateConnectionsResponse.failedConnections: array expected");
                message.failedConnections = [];
                for (let i = 0; i < object.failedConnections.length; ++i) {
                    if (!$util.isObject(object.failedConnections[i]))
                        throw TypeError(".Router.ValidateConnectionsResponse.failedConnections: object expected");
                    message.failedConnections[i] = $root.Router.ConnectionValidationFailure.fromObject(object.failedConnections[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ValidateConnectionsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.ValidateConnectionsResponse
         * @static
         * @param {Router.ValidateConnectionsResponse} message ValidateConnectionsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidateConnectionsResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.failedConnections = [];
            if (message.failedConnections && message.failedConnections.length) {
                object.failedConnections = [];
                for (let j = 0; j < message.failedConnections.length; ++j)
                    object.failedConnections[j] = $root.Router.ConnectionValidationFailure.toObject(message.failedConnections[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ValidateConnectionsResponse to JSON.
         * @function toJSON
         * @memberof Router.ValidateConnectionsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidateConnectionsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidateConnectionsResponse
         * @function getTypeUrl
         * @memberof Router.ValidateConnectionsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidateConnectionsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.ValidateConnectionsResponse";
        };

        return ValidateConnectionsResponse;
    })();

    Router.GetEnforcementRequest = (function() {

        /**
         * Properties of a GetEnforcementRequest.
         * @memberof Router
         * @interface IGetEnforcementRequest
         * @property {number|null} [enterpriseUserId] GetEnforcementRequest enterpriseUserId
         */

        /**
         * Constructs a new GetEnforcementRequest.
         * @memberof Router
         * @classdesc Represents a GetEnforcementRequest.
         * @implements IGetEnforcementRequest
         * @constructor
         * @param {Router.IGetEnforcementRequest=} [properties] Properties to set
         */
        function GetEnforcementRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetEnforcementRequest enterpriseUserId.
         * @member {number} enterpriseUserId
         * @memberof Router.GetEnforcementRequest
         * @instance
         */
        GetEnforcementRequest.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GetEnforcementRequest instance using the specified properties.
         * @function create
         * @memberof Router.GetEnforcementRequest
         * @static
         * @param {Router.IGetEnforcementRequest=} [properties] Properties to set
         * @returns {Router.GetEnforcementRequest} GetEnforcementRequest instance
         */
        GetEnforcementRequest.create = function create(properties) {
            return new GetEnforcementRequest(properties);
        };

        /**
         * Encodes the specified GetEnforcementRequest message. Does not implicitly {@link Router.GetEnforcementRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.GetEnforcementRequest
         * @static
         * @param {Router.IGetEnforcementRequest} message GetEnforcementRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetEnforcementRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.enterpriseUserId);
            return writer;
        };

        /**
         * Encodes the specified GetEnforcementRequest message, length delimited. Does not implicitly {@link Router.GetEnforcementRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.GetEnforcementRequest
         * @static
         * @param {Router.IGetEnforcementRequest} message GetEnforcementRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetEnforcementRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a GetEnforcementRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.GetEnforcementRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.GetEnforcementRequest} GetEnforcementRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetEnforcementRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.GetEnforcementRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.enterpriseUserId = reader.int64();
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
         * Decodes a GetEnforcementRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.GetEnforcementRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.GetEnforcementRequest} GetEnforcementRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetEnforcementRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetEnforcementRequest message.
         * @function verify
         * @memberof Router.GetEnforcementRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetEnforcementRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                if (!$util.isInteger(message.enterpriseUserId) && !(message.enterpriseUserId && $util.isInteger(message.enterpriseUserId.low) && $util.isInteger(message.enterpriseUserId.high)))
                    return "enterpriseUserId: integer|Long expected";
            return null;
        };

        /**
         * Creates a GetEnforcementRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.GetEnforcementRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.GetEnforcementRequest} GetEnforcementRequest
         */
        GetEnforcementRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.GetEnforcementRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.GetEnforcementRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.GetEnforcementRequest();
            if (object.enterpriseUserId != null)
                if ($util.Long)
                    message.enterpriseUserId = $util.Long.fromValue(object.enterpriseUserId, false);
                else if (typeof object.enterpriseUserId === "string")
                    message.enterpriseUserId = parseInt(object.enterpriseUserId, 10);
                else if (typeof object.enterpriseUserId === "number")
                    message.enterpriseUserId = object.enterpriseUserId;
                else if (typeof object.enterpriseUserId === "object")
                    message.enterpriseUserId = new $util.LongBits(object.enterpriseUserId.low >>> 0, object.enterpriseUserId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GetEnforcementRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.GetEnforcementRequest
         * @static
         * @param {Router.GetEnforcementRequest} message GetEnforcementRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetEnforcementRequest.toObject = function toObject(message, options, q) {
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
                    object.enterpriseUserId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.enterpriseUserId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.enterpriseUserId = typeof message.enterpriseUserId === "number" ? BigInt(message.enterpriseUserId) : $util.Long.fromBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0, false).toBigInt();
                else if (typeof message.enterpriseUserId === "number")
                    object.enterpriseUserId = options.longs === String ? String(message.enterpriseUserId) : message.enterpriseUserId;
                else
                    object.enterpriseUserId = options.longs === String ? $util.Long.prototype.toString.call(message.enterpriseUserId) : options.longs === Number ? new $util.LongBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0).toNumber() : message.enterpriseUserId;
            return object;
        };

        /**
         * Converts this GetEnforcementRequest to JSON.
         * @function toJSON
         * @memberof Router.GetEnforcementRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetEnforcementRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetEnforcementRequest
         * @function getTypeUrl
         * @memberof Router.GetEnforcementRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetEnforcementRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.GetEnforcementRequest";
        };

        return GetEnforcementRequest;
    })();

    Router.EnforcementType = (function() {

        /**
         * Properties of an EnforcementType.
         * @memberof Router
         * @interface IEnforcementType
         * @property {number|null} [enforcementTypeId] EnforcementType enforcementTypeId
         * @property {string|null} [value] EnforcementType value
         */

        /**
         * Constructs a new EnforcementType.
         * @memberof Router
         * @classdesc Represents an EnforcementType.
         * @implements IEnforcementType
         * @constructor
         * @param {Router.IEnforcementType=} [properties] Properties to set
         */
        function EnforcementType(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnforcementType enforcementTypeId.
         * @member {number} enforcementTypeId
         * @memberof Router.EnforcementType
         * @instance
         */
        EnforcementType.prototype.enforcementTypeId = 0;

        /**
         * EnforcementType value.
         * @member {string} value
         * @memberof Router.EnforcementType
         * @instance
         */
        EnforcementType.prototype.value = "";

        /**
         * Creates a new EnforcementType instance using the specified properties.
         * @function create
         * @memberof Router.EnforcementType
         * @static
         * @param {Router.IEnforcementType=} [properties] Properties to set
         * @returns {Router.EnforcementType} EnforcementType instance
         */
        EnforcementType.create = function create(properties) {
            return new EnforcementType(properties);
        };

        /**
         * Encodes the specified EnforcementType message. Does not implicitly {@link Router.EnforcementType.verify|verify} messages.
         * @function encode
         * @memberof Router.EnforcementType
         * @static
         * @param {Router.IEnforcementType} message EnforcementType message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnforcementType.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.enforcementTypeId != null && Object.hasOwnProperty.call(message, "enforcementTypeId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.enforcementTypeId);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
            return writer;
        };

        /**
         * Encodes the specified EnforcementType message, length delimited. Does not implicitly {@link Router.EnforcementType.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.EnforcementType
         * @static
         * @param {Router.IEnforcementType} message EnforcementType message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnforcementType.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an EnforcementType message from the specified reader or buffer.
         * @function decode
         * @memberof Router.EnforcementType
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.EnforcementType} EnforcementType
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnforcementType.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.EnforcementType();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.enforcementTypeId = reader.int32();
                        break;
                    }
                case 2: {
                        message.value = reader.string();
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
         * Decodes an EnforcementType message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.EnforcementType
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.EnforcementType} EnforcementType
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnforcementType.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnforcementType message.
         * @function verify
         * @memberof Router.EnforcementType
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnforcementType.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.enforcementTypeId != null && Object.hasOwnProperty.call(message, "enforcementTypeId"))
                if (!$util.isInteger(message.enforcementTypeId))
                    return "enforcementTypeId: integer expected";
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates an EnforcementType message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.EnforcementType
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.EnforcementType} EnforcementType
         */
        EnforcementType.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.EnforcementType)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.EnforcementType: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.EnforcementType();
            if (object.enforcementTypeId != null)
                message.enforcementTypeId = object.enforcementTypeId | 0;
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from an EnforcementType message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.EnforcementType
         * @static
         * @param {Router.EnforcementType} message EnforcementType
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnforcementType.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.enforcementTypeId = 0;
                object.value = "";
            }
            if (message.enforcementTypeId != null && Object.hasOwnProperty.call(message, "enforcementTypeId"))
                object.enforcementTypeId = message.enforcementTypeId;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this EnforcementType to JSON.
         * @function toJSON
         * @memberof Router.EnforcementType
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnforcementType.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EnforcementType
         * @function getTypeUrl
         * @memberof Router.EnforcementType
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EnforcementType.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.EnforcementType";
        };

        return EnforcementType;
    })();

    Router.GetEnforcementResponse = (function() {

        /**
         * Properties of a GetEnforcementResponse.
         * @memberof Router
         * @interface IGetEnforcementResponse
         * @property {Array.<Router.IEnforcementType>|null} [enforcementTypes] GetEnforcementResponse enforcementTypes
         * @property {Array.<number>|null} [addOnIds] GetEnforcementResponse addOnIds
         * @property {boolean|null} [isInTrial] GetEnforcementResponse isInTrial
         */

        /**
         * Constructs a new GetEnforcementResponse.
         * @memberof Router
         * @classdesc Represents a GetEnforcementResponse.
         * @implements IGetEnforcementResponse
         * @constructor
         * @param {Router.IGetEnforcementResponse=} [properties] Properties to set
         */
        function GetEnforcementResponse(properties) {
            this.enforcementTypes = [];
            this.addOnIds = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetEnforcementResponse enforcementTypes.
         * @member {Array.<Router.IEnforcementType>} enforcementTypes
         * @memberof Router.GetEnforcementResponse
         * @instance
         */
        GetEnforcementResponse.prototype.enforcementTypes = $util.emptyArray;

        /**
         * GetEnforcementResponse addOnIds.
         * @member {Array.<number>} addOnIds
         * @memberof Router.GetEnforcementResponse
         * @instance
         */
        GetEnforcementResponse.prototype.addOnIds = $util.emptyArray;

        /**
         * GetEnforcementResponse isInTrial.
         * @member {boolean} isInTrial
         * @memberof Router.GetEnforcementResponse
         * @instance
         */
        GetEnforcementResponse.prototype.isInTrial = false;

        /**
         * Creates a new GetEnforcementResponse instance using the specified properties.
         * @function create
         * @memberof Router.GetEnforcementResponse
         * @static
         * @param {Router.IGetEnforcementResponse=} [properties] Properties to set
         * @returns {Router.GetEnforcementResponse} GetEnforcementResponse instance
         */
        GetEnforcementResponse.create = function create(properties) {
            return new GetEnforcementResponse(properties);
        };

        /**
         * Encodes the specified GetEnforcementResponse message. Does not implicitly {@link Router.GetEnforcementResponse.verify|verify} messages.
         * @function encode
         * @memberof Router.GetEnforcementResponse
         * @static
         * @param {Router.IGetEnforcementResponse} message GetEnforcementResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetEnforcementResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.enforcementTypes != null && message.enforcementTypes.length)
                for (let i = 0; i < message.enforcementTypes.length; ++i)
                    $root.Router.EnforcementType.encode(message.enforcementTypes[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.addOnIds != null && message.addOnIds.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.addOnIds.length; ++i)
                    writer.int32(message.addOnIds[i]);
                writer.ldelim();
            }
            if (message.isInTrial != null && Object.hasOwnProperty.call(message, "isInTrial"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isInTrial);
            return writer;
        };

        /**
         * Encodes the specified GetEnforcementResponse message, length delimited. Does not implicitly {@link Router.GetEnforcementResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.GetEnforcementResponse
         * @static
         * @param {Router.IGetEnforcementResponse} message GetEnforcementResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetEnforcementResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a GetEnforcementResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Router.GetEnforcementResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.GetEnforcementResponse} GetEnforcementResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetEnforcementResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.GetEnforcementResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.enforcementTypes && message.enforcementTypes.length))
                            message.enforcementTypes = [];
                        message.enforcementTypes.push($root.Router.EnforcementType.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.addOnIds && message.addOnIds.length))
                            message.addOnIds = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.addOnIds.push(reader.int32());
                        } else
                            message.addOnIds.push(reader.int32());
                        break;
                    }
                case 3: {
                        message.isInTrial = reader.bool();
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
         * Decodes a GetEnforcementResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.GetEnforcementResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.GetEnforcementResponse} GetEnforcementResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetEnforcementResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetEnforcementResponse message.
         * @function verify
         * @memberof Router.GetEnforcementResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetEnforcementResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.enforcementTypes != null && Object.hasOwnProperty.call(message, "enforcementTypes")) {
                if (!Array.isArray(message.enforcementTypes))
                    return "enforcementTypes: array expected";
                for (let i = 0; i < message.enforcementTypes.length; ++i) {
                    let error = $root.Router.EnforcementType.verify(message.enforcementTypes[i], long + 1);
                    if (error)
                        return "enforcementTypes." + error;
                }
            }
            if (message.addOnIds != null && Object.hasOwnProperty.call(message, "addOnIds")) {
                if (!Array.isArray(message.addOnIds))
                    return "addOnIds: array expected";
                for (let i = 0; i < message.addOnIds.length; ++i)
                    if (!$util.isInteger(message.addOnIds[i]))
                        return "addOnIds: integer[] expected";
            }
            if (message.isInTrial != null && Object.hasOwnProperty.call(message, "isInTrial"))
                if (typeof message.isInTrial !== "boolean")
                    return "isInTrial: boolean expected";
            return null;
        };

        /**
         * Creates a GetEnforcementResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.GetEnforcementResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.GetEnforcementResponse} GetEnforcementResponse
         */
        GetEnforcementResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.GetEnforcementResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.GetEnforcementResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.GetEnforcementResponse();
            if (object.enforcementTypes) {
                if (!Array.isArray(object.enforcementTypes))
                    throw TypeError(".Router.GetEnforcementResponse.enforcementTypes: array expected");
                message.enforcementTypes = [];
                for (let i = 0; i < object.enforcementTypes.length; ++i) {
                    if (!$util.isObject(object.enforcementTypes[i]))
                        throw TypeError(".Router.GetEnforcementResponse.enforcementTypes: object expected");
                    message.enforcementTypes[i] = $root.Router.EnforcementType.fromObject(object.enforcementTypes[i], long + 1);
                }
            }
            if (object.addOnIds) {
                if (!Array.isArray(object.addOnIds))
                    throw TypeError(".Router.GetEnforcementResponse.addOnIds: array expected");
                message.addOnIds = [];
                for (let i = 0; i < object.addOnIds.length; ++i)
                    message.addOnIds[i] = object.addOnIds[i] | 0;
            }
            if (object.isInTrial != null)
                message.isInTrial = Boolean(object.isInTrial);
            return message;
        };

        /**
         * Creates a plain object from a GetEnforcementResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.GetEnforcementResponse
         * @static
         * @param {Router.GetEnforcementResponse} message GetEnforcementResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetEnforcementResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.enforcementTypes = [];
                object.addOnIds = [];
            }
            if (options.defaults)
                object.isInTrial = false;
            if (message.enforcementTypes && message.enforcementTypes.length) {
                object.enforcementTypes = [];
                for (let j = 0; j < message.enforcementTypes.length; ++j)
                    object.enforcementTypes[j] = $root.Router.EnforcementType.toObject(message.enforcementTypes[j], options, q + 1);
            }
            if (message.addOnIds && message.addOnIds.length) {
                object.addOnIds = [];
                for (let j = 0; j < message.addOnIds.length; ++j)
                    object.addOnIds[j] = message.addOnIds[j];
            }
            if (message.isInTrial != null && Object.hasOwnProperty.call(message, "isInTrial"))
                object.isInTrial = message.isInTrial;
            return object;
        };

        /**
         * Converts this GetEnforcementResponse to JSON.
         * @function toJSON
         * @memberof Router.GetEnforcementResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetEnforcementResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetEnforcementResponse
         * @function getTypeUrl
         * @memberof Router.GetEnforcementResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetEnforcementResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.GetEnforcementResponse";
        };

        return GetEnforcementResponse;
    })();

    Router.PEDMTOTPValidateRequest = (function() {

        /**
         * Properties of a PEDMTOTPValidateRequest.
         * @memberof Router
         * @interface IPEDMTOTPValidateRequest
         * @property {string|null} [username] PEDMTOTPValidateRequest username
         * @property {number|null} [enterpriseId] PEDMTOTPValidateRequest enterpriseId
         * @property {number|null} [code] PEDMTOTPValidateRequest code
         */

        /**
         * Constructs a new PEDMTOTPValidateRequest.
         * @memberof Router
         * @classdesc Represents a PEDMTOTPValidateRequest.
         * @implements IPEDMTOTPValidateRequest
         * @constructor
         * @param {Router.IPEDMTOTPValidateRequest=} [properties] Properties to set
         */
        function PEDMTOTPValidateRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PEDMTOTPValidateRequest username.
         * @member {string} username
         * @memberof Router.PEDMTOTPValidateRequest
         * @instance
         */
        PEDMTOTPValidateRequest.prototype.username = "";

        /**
         * PEDMTOTPValidateRequest enterpriseId.
         * @member {number} enterpriseId
         * @memberof Router.PEDMTOTPValidateRequest
         * @instance
         */
        PEDMTOTPValidateRequest.prototype.enterpriseId = 0;

        /**
         * PEDMTOTPValidateRequest code.
         * @member {number} code
         * @memberof Router.PEDMTOTPValidateRequest
         * @instance
         */
        PEDMTOTPValidateRequest.prototype.code = 0;

        /**
         * Creates a new PEDMTOTPValidateRequest instance using the specified properties.
         * @function create
         * @memberof Router.PEDMTOTPValidateRequest
         * @static
         * @param {Router.IPEDMTOTPValidateRequest=} [properties] Properties to set
         * @returns {Router.PEDMTOTPValidateRequest} PEDMTOTPValidateRequest instance
         */
        PEDMTOTPValidateRequest.create = function create(properties) {
            return new PEDMTOTPValidateRequest(properties);
        };

        /**
         * Encodes the specified PEDMTOTPValidateRequest message. Does not implicitly {@link Router.PEDMTOTPValidateRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.PEDMTOTPValidateRequest
         * @static
         * @param {Router.IPEDMTOTPValidateRequest} message PEDMTOTPValidateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PEDMTOTPValidateRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.enterpriseId);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.code);
            return writer;
        };

        /**
         * Encodes the specified PEDMTOTPValidateRequest message, length delimited. Does not implicitly {@link Router.PEDMTOTPValidateRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.PEDMTOTPValidateRequest
         * @static
         * @param {Router.IPEDMTOTPValidateRequest} message PEDMTOTPValidateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PEDMTOTPValidateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PEDMTOTPValidateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.PEDMTOTPValidateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.PEDMTOTPValidateRequest} PEDMTOTPValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PEDMTOTPValidateRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.PEDMTOTPValidateRequest();
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
                        message.enterpriseId = reader.int32();
                        break;
                    }
                case 3: {
                        message.code = reader.int32();
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
         * Decodes a PEDMTOTPValidateRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.PEDMTOTPValidateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.PEDMTOTPValidateRequest} PEDMTOTPValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PEDMTOTPValidateRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PEDMTOTPValidateRequest message.
         * @function verify
         * @memberof Router.PEDMTOTPValidateRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PEDMTOTPValidateRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                if (!$util.isInteger(message.enterpriseId))
                    return "enterpriseId: integer expected";
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            return null;
        };

        /**
         * Creates a PEDMTOTPValidateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.PEDMTOTPValidateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.PEDMTOTPValidateRequest} PEDMTOTPValidateRequest
         */
        PEDMTOTPValidateRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.PEDMTOTPValidateRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.PEDMTOTPValidateRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.PEDMTOTPValidateRequest();
            if (object.username != null)
                message.username = String(object.username);
            if (object.enterpriseId != null)
                message.enterpriseId = object.enterpriseId | 0;
            if (object.code != null)
                message.code = object.code | 0;
            return message;
        };

        /**
         * Creates a plain object from a PEDMTOTPValidateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.PEDMTOTPValidateRequest
         * @static
         * @param {Router.PEDMTOTPValidateRequest} message PEDMTOTPValidateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PEDMTOTPValidateRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.username = "";
                object.enterpriseId = 0;
                object.code = 0;
            }
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                object.enterpriseId = message.enterpriseId;
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                object.code = message.code;
            return object;
        };

        /**
         * Converts this PEDMTOTPValidateRequest to JSON.
         * @function toJSON
         * @memberof Router.PEDMTOTPValidateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PEDMTOTPValidateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PEDMTOTPValidateRequest
         * @function getTypeUrl
         * @memberof Router.PEDMTOTPValidateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PEDMTOTPValidateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.PEDMTOTPValidateRequest";
        };

        return PEDMTOTPValidateRequest;
    })();

    Router.GetPEDMAdminInfoResponse = (function() {

        /**
         * Properties of a GetPEDMAdminInfoResponse.
         * @memberof Router
         * @interface IGetPEDMAdminInfoResponse
         * @property {boolean|null} [isPedmAdmin] GetPEDMAdminInfoResponse isPedmAdmin
         * @property {boolean|null} [pedmAddonActive] GetPEDMAdminInfoResponse pedmAddonActive
         */

        /**
         * Constructs a new GetPEDMAdminInfoResponse.
         * @memberof Router
         * @classdesc Represents a GetPEDMAdminInfoResponse.
         * @implements IGetPEDMAdminInfoResponse
         * @constructor
         * @param {Router.IGetPEDMAdminInfoResponse=} [properties] Properties to set
         */
        function GetPEDMAdminInfoResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetPEDMAdminInfoResponse isPedmAdmin.
         * @member {boolean} isPedmAdmin
         * @memberof Router.GetPEDMAdminInfoResponse
         * @instance
         */
        GetPEDMAdminInfoResponse.prototype.isPedmAdmin = false;

        /**
         * GetPEDMAdminInfoResponse pedmAddonActive.
         * @member {boolean} pedmAddonActive
         * @memberof Router.GetPEDMAdminInfoResponse
         * @instance
         */
        GetPEDMAdminInfoResponse.prototype.pedmAddonActive = false;

        /**
         * Creates a new GetPEDMAdminInfoResponse instance using the specified properties.
         * @function create
         * @memberof Router.GetPEDMAdminInfoResponse
         * @static
         * @param {Router.IGetPEDMAdminInfoResponse=} [properties] Properties to set
         * @returns {Router.GetPEDMAdminInfoResponse} GetPEDMAdminInfoResponse instance
         */
        GetPEDMAdminInfoResponse.create = function create(properties) {
            return new GetPEDMAdminInfoResponse(properties);
        };

        /**
         * Encodes the specified GetPEDMAdminInfoResponse message. Does not implicitly {@link Router.GetPEDMAdminInfoResponse.verify|verify} messages.
         * @function encode
         * @memberof Router.GetPEDMAdminInfoResponse
         * @static
         * @param {Router.IGetPEDMAdminInfoResponse} message GetPEDMAdminInfoResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetPEDMAdminInfoResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.isPedmAdmin != null && Object.hasOwnProperty.call(message, "isPedmAdmin"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isPedmAdmin);
            if (message.pedmAddonActive != null && Object.hasOwnProperty.call(message, "pedmAddonActive"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.pedmAddonActive);
            return writer;
        };

        /**
         * Encodes the specified GetPEDMAdminInfoResponse message, length delimited. Does not implicitly {@link Router.GetPEDMAdminInfoResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.GetPEDMAdminInfoResponse
         * @static
         * @param {Router.IGetPEDMAdminInfoResponse} message GetPEDMAdminInfoResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetPEDMAdminInfoResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a GetPEDMAdminInfoResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Router.GetPEDMAdminInfoResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.GetPEDMAdminInfoResponse} GetPEDMAdminInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetPEDMAdminInfoResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.GetPEDMAdminInfoResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.isPedmAdmin = reader.bool();
                        break;
                    }
                case 2: {
                        message.pedmAddonActive = reader.bool();
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
         * Decodes a GetPEDMAdminInfoResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.GetPEDMAdminInfoResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.GetPEDMAdminInfoResponse} GetPEDMAdminInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetPEDMAdminInfoResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetPEDMAdminInfoResponse message.
         * @function verify
         * @memberof Router.GetPEDMAdminInfoResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetPEDMAdminInfoResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.isPedmAdmin != null && Object.hasOwnProperty.call(message, "isPedmAdmin"))
                if (typeof message.isPedmAdmin !== "boolean")
                    return "isPedmAdmin: boolean expected";
            if (message.pedmAddonActive != null && Object.hasOwnProperty.call(message, "pedmAddonActive"))
                if (typeof message.pedmAddonActive !== "boolean")
                    return "pedmAddonActive: boolean expected";
            return null;
        };

        /**
         * Creates a GetPEDMAdminInfoResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.GetPEDMAdminInfoResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.GetPEDMAdminInfoResponse} GetPEDMAdminInfoResponse
         */
        GetPEDMAdminInfoResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.GetPEDMAdminInfoResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.GetPEDMAdminInfoResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.GetPEDMAdminInfoResponse();
            if (object.isPedmAdmin != null)
                message.isPedmAdmin = Boolean(object.isPedmAdmin);
            if (object.pedmAddonActive != null)
                message.pedmAddonActive = Boolean(object.pedmAddonActive);
            return message;
        };

        /**
         * Creates a plain object from a GetPEDMAdminInfoResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.GetPEDMAdminInfoResponse
         * @static
         * @param {Router.GetPEDMAdminInfoResponse} message GetPEDMAdminInfoResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetPEDMAdminInfoResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.isPedmAdmin = false;
                object.pedmAddonActive = false;
            }
            if (message.isPedmAdmin != null && Object.hasOwnProperty.call(message, "isPedmAdmin"))
                object.isPedmAdmin = message.isPedmAdmin;
            if (message.pedmAddonActive != null && Object.hasOwnProperty.call(message, "pedmAddonActive"))
                object.pedmAddonActive = message.pedmAddonActive;
            return object;
        };

        /**
         * Converts this GetPEDMAdminInfoResponse to JSON.
         * @function toJSON
         * @memberof Router.GetPEDMAdminInfoResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetPEDMAdminInfoResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetPEDMAdminInfoResponse
         * @function getTypeUrl
         * @memberof Router.GetPEDMAdminInfoResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetPEDMAdminInfoResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.GetPEDMAdminInfoResponse";
        };

        return GetPEDMAdminInfoResponse;
    })();

    Router.PAMNetworkSettings = (function() {

        /**
         * Properties of a PAMNetworkSettings.
         * @memberof Router
         * @interface IPAMNetworkSettings
         * @property {Uint8Array|null} [allowedSettings] PAMNetworkSettings allowedSettings
         * @property {Uint8Array|null} [idpConfigUid] PAMNetworkSettings idpConfigUid
         * @property {Uint8Array|null} [adminUid] PAMNetworkSettings adminUid
         */

        /**
         * Constructs a new PAMNetworkSettings.
         * @memberof Router
         * @classdesc Represents a PAMNetworkSettings.
         * @implements IPAMNetworkSettings
         * @constructor
         * @param {Router.IPAMNetworkSettings=} [properties] Properties to set
         */
        function PAMNetworkSettings(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMNetworkSettings allowedSettings.
         * @member {Uint8Array} allowedSettings
         * @memberof Router.PAMNetworkSettings
         * @instance
         */
        PAMNetworkSettings.prototype.allowedSettings = $util.newBuffer([]);

        /**
         * PAMNetworkSettings idpConfigUid.
         * @member {Uint8Array|null|undefined} idpConfigUid
         * @memberof Router.PAMNetworkSettings
         * @instance
         */
        PAMNetworkSettings.prototype.idpConfigUid = null;

        /**
         * PAMNetworkSettings adminUid.
         * @member {Uint8Array|null|undefined} adminUid
         * @memberof Router.PAMNetworkSettings
         * @instance
         */
        PAMNetworkSettings.prototype.adminUid = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMNetworkSettings.prototype, "_idpConfigUid", {
            get: $util.oneOfGetter($oneOfFields = ["idpConfigUid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMNetworkSettings.prototype, "_adminUid", {
            get: $util.oneOfGetter($oneOfFields = ["adminUid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new PAMNetworkSettings instance using the specified properties.
         * @function create
         * @memberof Router.PAMNetworkSettings
         * @static
         * @param {Router.IPAMNetworkSettings=} [properties] Properties to set
         * @returns {Router.PAMNetworkSettings} PAMNetworkSettings instance
         */
        PAMNetworkSettings.create = function create(properties) {
            return new PAMNetworkSettings(properties);
        };

        /**
         * Encodes the specified PAMNetworkSettings message. Does not implicitly {@link Router.PAMNetworkSettings.verify|verify} messages.
         * @function encode
         * @memberof Router.PAMNetworkSettings
         * @static
         * @param {Router.IPAMNetworkSettings} message PAMNetworkSettings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMNetworkSettings.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.allowedSettings != null && Object.hasOwnProperty.call(message, "allowedSettings"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.allowedSettings);
            if (message.idpConfigUid != null && Object.hasOwnProperty.call(message, "idpConfigUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.idpConfigUid);
            if (message.adminUid != null && Object.hasOwnProperty.call(message, "adminUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.adminUid);
            return writer;
        };

        /**
         * Encodes the specified PAMNetworkSettings message, length delimited. Does not implicitly {@link Router.PAMNetworkSettings.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.PAMNetworkSettings
         * @static
         * @param {Router.IPAMNetworkSettings} message PAMNetworkSettings message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMNetworkSettings.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PAMNetworkSettings message from the specified reader or buffer.
         * @function decode
         * @memberof Router.PAMNetworkSettings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.PAMNetworkSettings} PAMNetworkSettings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMNetworkSettings.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.PAMNetworkSettings();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.allowedSettings = reader.bytes();
                        break;
                    }
                case 2: {
                        message.idpConfigUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.adminUid = reader.bytes();
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
         * Decodes a PAMNetworkSettings message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.PAMNetworkSettings
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.PAMNetworkSettings} PAMNetworkSettings
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMNetworkSettings.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PAMNetworkSettings message.
         * @function verify
         * @memberof Router.PAMNetworkSettings
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PAMNetworkSettings.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.allowedSettings != null && Object.hasOwnProperty.call(message, "allowedSettings"))
                if (!(message.allowedSettings && typeof message.allowedSettings.length === "number" || $util.isString(message.allowedSettings)))
                    return "allowedSettings: buffer expected";
            if (message.idpConfigUid != null && Object.hasOwnProperty.call(message, "idpConfigUid")) {
                properties._idpConfigUid = 1;
                if (!(message.idpConfigUid && typeof message.idpConfigUid.length === "number" || $util.isString(message.idpConfigUid)))
                    return "idpConfigUid: buffer expected";
            }
            if (message.adminUid != null && Object.hasOwnProperty.call(message, "adminUid")) {
                properties._adminUid = 1;
                if (!(message.adminUid && typeof message.adminUid.length === "number" || $util.isString(message.adminUid)))
                    return "adminUid: buffer expected";
            }
            return null;
        };

        /**
         * Creates a PAMNetworkSettings message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.PAMNetworkSettings
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.PAMNetworkSettings} PAMNetworkSettings
         */
        PAMNetworkSettings.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.PAMNetworkSettings)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.PAMNetworkSettings: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.PAMNetworkSettings();
            if (object.allowedSettings != null)
                if (typeof object.allowedSettings === "string")
                    $util.base64.decode(object.allowedSettings, message.allowedSettings = $util.newBuffer($util.base64.length(object.allowedSettings)), 0);
                else if (object.allowedSettings.length >= 0)
                    message.allowedSettings = object.allowedSettings;
            if (object.idpConfigUid != null)
                if (typeof object.idpConfigUid === "string")
                    $util.base64.decode(object.idpConfigUid, message.idpConfigUid = $util.newBuffer($util.base64.length(object.idpConfigUid)), 0);
                else if (object.idpConfigUid.length >= 0)
                    message.idpConfigUid = object.idpConfigUid;
            if (object.adminUid != null)
                if (typeof object.adminUid === "string")
                    $util.base64.decode(object.adminUid, message.adminUid = $util.newBuffer($util.base64.length(object.adminUid)), 0);
                else if (object.adminUid.length >= 0)
                    message.adminUid = object.adminUid;
            return message;
        };

        /**
         * Creates a plain object from a PAMNetworkSettings message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.PAMNetworkSettings
         * @static
         * @param {Router.PAMNetworkSettings} message PAMNetworkSettings
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMNetworkSettings.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.allowedSettings = "";
                else {
                    object.allowedSettings = [];
                    if (options.bytes !== Array)
                        object.allowedSettings = $util.newBuffer(object.allowedSettings);
                }
            if (message.allowedSettings != null && Object.hasOwnProperty.call(message, "allowedSettings"))
                object.allowedSettings = options.bytes === String ? $util.base64.encode(message.allowedSettings, 0, message.allowedSettings.length) : options.bytes === Array ? Array.prototype.slice.call(message.allowedSettings) : message.allowedSettings;
            if (message.idpConfigUid != null && Object.hasOwnProperty.call(message, "idpConfigUid")) {
                object.idpConfigUid = options.bytes === String ? $util.base64.encode(message.idpConfigUid, 0, message.idpConfigUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.idpConfigUid) : message.idpConfigUid;
                if (options.oneofs)
                    object._idpConfigUid = "idpConfigUid";
            }
            if (message.adminUid != null && Object.hasOwnProperty.call(message, "adminUid")) {
                object.adminUid = options.bytes === String ? $util.base64.encode(message.adminUid, 0, message.adminUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.adminUid) : message.adminUid;
                if (options.oneofs)
                    object._adminUid = "adminUid";
            }
            return object;
        };

        /**
         * Converts this PAMNetworkSettings to JSON.
         * @function toJSON
         * @memberof Router.PAMNetworkSettings
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMNetworkSettings.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMNetworkSettings
         * @function getTypeUrl
         * @memberof Router.PAMNetworkSettings
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMNetworkSettings.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.PAMNetworkSettings";
        };

        return PAMNetworkSettings;
    })();

    Router.PAMNetworkConfigurationRequest = (function() {

        /**
         * Properties of a PAMNetworkConfigurationRequest.
         * @memberof Router
         * @interface IPAMNetworkConfigurationRequest
         * @property {Uint8Array|null} [recordUid] PAMNetworkConfigurationRequest recordUid
         * @property {Router.IPAMNetworkSettings|null} [networkSettings] PAMNetworkConfigurationRequest networkSettings
         * @property {Array.<PAM.IPAMResourceConfig>|null} [resources] PAMNetworkConfigurationRequest resources
         * @property {Array.<Router.IRouterRecordRotationRequest>|null} [rotations] PAMNetworkConfigurationRequest rotations
         */

        /**
         * Constructs a new PAMNetworkConfigurationRequest.
         * @memberof Router
         * @classdesc Represents a PAMNetworkConfigurationRequest.
         * @implements IPAMNetworkConfigurationRequest
         * @constructor
         * @param {Router.IPAMNetworkConfigurationRequest=} [properties] Properties to set
         */
        function PAMNetworkConfigurationRequest(properties) {
            this.resources = [];
            this.rotations = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMNetworkConfigurationRequest recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Router.PAMNetworkConfigurationRequest
         * @instance
         */
        PAMNetworkConfigurationRequest.prototype.recordUid = $util.newBuffer([]);

        /**
         * PAMNetworkConfigurationRequest networkSettings.
         * @member {Router.IPAMNetworkSettings|null|undefined} networkSettings
         * @memberof Router.PAMNetworkConfigurationRequest
         * @instance
         */
        PAMNetworkConfigurationRequest.prototype.networkSettings = null;

        /**
         * PAMNetworkConfigurationRequest resources.
         * @member {Array.<PAM.IPAMResourceConfig>} resources
         * @memberof Router.PAMNetworkConfigurationRequest
         * @instance
         */
        PAMNetworkConfigurationRequest.prototype.resources = $util.emptyArray;

        /**
         * PAMNetworkConfigurationRequest rotations.
         * @member {Array.<Router.IRouterRecordRotationRequest>} rotations
         * @memberof Router.PAMNetworkConfigurationRequest
         * @instance
         */
        PAMNetworkConfigurationRequest.prototype.rotations = $util.emptyArray;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PAMNetworkConfigurationRequest.prototype, "_networkSettings", {
            get: $util.oneOfGetter($oneOfFields = ["networkSettings"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new PAMNetworkConfigurationRequest instance using the specified properties.
         * @function create
         * @memberof Router.PAMNetworkConfigurationRequest
         * @static
         * @param {Router.IPAMNetworkConfigurationRequest=} [properties] Properties to set
         * @returns {Router.PAMNetworkConfigurationRequest} PAMNetworkConfigurationRequest instance
         */
        PAMNetworkConfigurationRequest.create = function create(properties) {
            return new PAMNetworkConfigurationRequest(properties);
        };

        /**
         * Encodes the specified PAMNetworkConfigurationRequest message. Does not implicitly {@link Router.PAMNetworkConfigurationRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.PAMNetworkConfigurationRequest
         * @static
         * @param {Router.IPAMNetworkConfigurationRequest} message PAMNetworkConfigurationRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMNetworkConfigurationRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.networkSettings != null && Object.hasOwnProperty.call(message, "networkSettings"))
                $root.Router.PAMNetworkSettings.encode(message.networkSettings, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.resources != null && message.resources.length)
                for (let i = 0; i < message.resources.length; ++i)
                    $root.PAM.PAMResourceConfig.encode(message.resources[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.rotations != null && message.rotations.length)
                for (let i = 0; i < message.rotations.length; ++i)
                    $root.Router.RouterRecordRotationRequest.encode(message.rotations[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PAMNetworkConfigurationRequest message, length delimited. Does not implicitly {@link Router.PAMNetworkConfigurationRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.PAMNetworkConfigurationRequest
         * @static
         * @param {Router.IPAMNetworkConfigurationRequest} message PAMNetworkConfigurationRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMNetworkConfigurationRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PAMNetworkConfigurationRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.PAMNetworkConfigurationRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.PAMNetworkConfigurationRequest} PAMNetworkConfigurationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMNetworkConfigurationRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.PAMNetworkConfigurationRequest();
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
                        message.networkSettings = $root.Router.PAMNetworkSettings.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        if (!(message.resources && message.resources.length))
                            message.resources = [];
                        message.resources.push($root.PAM.PAMResourceConfig.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 4: {
                        if (!(message.rotations && message.rotations.length))
                            message.rotations = [];
                        message.rotations.push($root.Router.RouterRecordRotationRequest.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a PAMNetworkConfigurationRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.PAMNetworkConfigurationRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.PAMNetworkConfigurationRequest} PAMNetworkConfigurationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMNetworkConfigurationRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PAMNetworkConfigurationRequest message.
         * @function verify
         * @memberof Router.PAMNetworkConfigurationRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PAMNetworkConfigurationRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                    return "recordUid: buffer expected";
            if (message.networkSettings != null && Object.hasOwnProperty.call(message, "networkSettings")) {
                properties._networkSettings = 1;
                {
                    let error = $root.Router.PAMNetworkSettings.verify(message.networkSettings, long + 1);
                    if (error)
                        return "networkSettings." + error;
                }
            }
            if (message.resources != null && Object.hasOwnProperty.call(message, "resources")) {
                if (!Array.isArray(message.resources))
                    return "resources: array expected";
                for (let i = 0; i < message.resources.length; ++i) {
                    let error = $root.PAM.PAMResourceConfig.verify(message.resources[i], long + 1);
                    if (error)
                        return "resources." + error;
                }
            }
            if (message.rotations != null && Object.hasOwnProperty.call(message, "rotations")) {
                if (!Array.isArray(message.rotations))
                    return "rotations: array expected";
                for (let i = 0; i < message.rotations.length; ++i) {
                    let error = $root.Router.RouterRecordRotationRequest.verify(message.rotations[i], long + 1);
                    if (error)
                        return "rotations." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PAMNetworkConfigurationRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.PAMNetworkConfigurationRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.PAMNetworkConfigurationRequest} PAMNetworkConfigurationRequest
         */
        PAMNetworkConfigurationRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.PAMNetworkConfigurationRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.PAMNetworkConfigurationRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.PAMNetworkConfigurationRequest();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length >= 0)
                    message.recordUid = object.recordUid;
            if (object.networkSettings != null) {
                if (!$util.isObject(object.networkSettings))
                    throw TypeError(".Router.PAMNetworkConfigurationRequest.networkSettings: object expected");
                message.networkSettings = $root.Router.PAMNetworkSettings.fromObject(object.networkSettings, long + 1);
            }
            if (object.resources) {
                if (!Array.isArray(object.resources))
                    throw TypeError(".Router.PAMNetworkConfigurationRequest.resources: array expected");
                message.resources = [];
                for (let i = 0; i < object.resources.length; ++i) {
                    if (!$util.isObject(object.resources[i]))
                        throw TypeError(".Router.PAMNetworkConfigurationRequest.resources: object expected");
                    message.resources[i] = $root.PAM.PAMResourceConfig.fromObject(object.resources[i], long + 1);
                }
            }
            if (object.rotations) {
                if (!Array.isArray(object.rotations))
                    throw TypeError(".Router.PAMNetworkConfigurationRequest.rotations: array expected");
                message.rotations = [];
                for (let i = 0; i < object.rotations.length; ++i) {
                    if (!$util.isObject(object.rotations[i]))
                        throw TypeError(".Router.PAMNetworkConfigurationRequest.rotations: object expected");
                    message.rotations[i] = $root.Router.RouterRecordRotationRequest.fromObject(object.rotations[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PAMNetworkConfigurationRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.PAMNetworkConfigurationRequest
         * @static
         * @param {Router.PAMNetworkConfigurationRequest} message PAMNetworkConfigurationRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMNetworkConfigurationRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.resources = [];
                object.rotations = [];
            }
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
            if (message.networkSettings != null && Object.hasOwnProperty.call(message, "networkSettings")) {
                object.networkSettings = $root.Router.PAMNetworkSettings.toObject(message.networkSettings, options, q + 1);
                if (options.oneofs)
                    object._networkSettings = "networkSettings";
            }
            if (message.resources && message.resources.length) {
                object.resources = [];
                for (let j = 0; j < message.resources.length; ++j)
                    object.resources[j] = $root.PAM.PAMResourceConfig.toObject(message.resources[j], options, q + 1);
            }
            if (message.rotations && message.rotations.length) {
                object.rotations = [];
                for (let j = 0; j < message.rotations.length; ++j)
                    object.rotations[j] = $root.Router.RouterRecordRotationRequest.toObject(message.rotations[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this PAMNetworkConfigurationRequest to JSON.
         * @function toJSON
         * @memberof Router.PAMNetworkConfigurationRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMNetworkConfigurationRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMNetworkConfigurationRequest
         * @function getTypeUrl
         * @memberof Router.PAMNetworkConfigurationRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMNetworkConfigurationRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.PAMNetworkConfigurationRequest";
        };

        return PAMNetworkConfigurationRequest;
    })();

    Router.PAMDiscoveryRulesSetRequest = (function() {

        /**
         * Properties of a PAMDiscoveryRulesSetRequest.
         * @memberof Router
         * @interface IPAMDiscoveryRulesSetRequest
         * @property {Uint8Array|null} [networkUid] PAMDiscoveryRulesSetRequest networkUid
         * @property {Uint8Array|null} [rules] PAMDiscoveryRulesSetRequest rules
         * @property {Uint8Array|null} [rulesKey] PAMDiscoveryRulesSetRequest rulesKey
         */

        /**
         * Constructs a new PAMDiscoveryRulesSetRequest.
         * @memberof Router
         * @classdesc Represents a PAMDiscoveryRulesSetRequest.
         * @implements IPAMDiscoveryRulesSetRequest
         * @constructor
         * @param {Router.IPAMDiscoveryRulesSetRequest=} [properties] Properties to set
         */
        function PAMDiscoveryRulesSetRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PAMDiscoveryRulesSetRequest networkUid.
         * @member {Uint8Array} networkUid
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @instance
         */
        PAMDiscoveryRulesSetRequest.prototype.networkUid = $util.newBuffer([]);

        /**
         * PAMDiscoveryRulesSetRequest rules.
         * @member {Uint8Array} rules
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @instance
         */
        PAMDiscoveryRulesSetRequest.prototype.rules = $util.newBuffer([]);

        /**
         * PAMDiscoveryRulesSetRequest rulesKey.
         * @member {Uint8Array} rulesKey
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @instance
         */
        PAMDiscoveryRulesSetRequest.prototype.rulesKey = $util.newBuffer([]);

        /**
         * Creates a new PAMDiscoveryRulesSetRequest instance using the specified properties.
         * @function create
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @static
         * @param {Router.IPAMDiscoveryRulesSetRequest=} [properties] Properties to set
         * @returns {Router.PAMDiscoveryRulesSetRequest} PAMDiscoveryRulesSetRequest instance
         */
        PAMDiscoveryRulesSetRequest.create = function create(properties) {
            return new PAMDiscoveryRulesSetRequest(properties);
        };

        /**
         * Encodes the specified PAMDiscoveryRulesSetRequest message. Does not implicitly {@link Router.PAMDiscoveryRulesSetRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @static
         * @param {Router.IPAMDiscoveryRulesSetRequest} message PAMDiscoveryRulesSetRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMDiscoveryRulesSetRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.networkUid != null && Object.hasOwnProperty.call(message, "networkUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.networkUid);
            if (message.rules != null && Object.hasOwnProperty.call(message, "rules"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.rules);
            if (message.rulesKey != null && Object.hasOwnProperty.call(message, "rulesKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.rulesKey);
            return writer;
        };

        /**
         * Encodes the specified PAMDiscoveryRulesSetRequest message, length delimited. Does not implicitly {@link Router.PAMDiscoveryRulesSetRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @static
         * @param {Router.IPAMDiscoveryRulesSetRequest} message PAMDiscoveryRulesSetRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PAMDiscoveryRulesSetRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a PAMDiscoveryRulesSetRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.PAMDiscoveryRulesSetRequest} PAMDiscoveryRulesSetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMDiscoveryRulesSetRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.PAMDiscoveryRulesSetRequest();
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
                        message.rules = reader.bytes();
                        break;
                    }
                case 3: {
                        message.rulesKey = reader.bytes();
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
         * Decodes a PAMDiscoveryRulesSetRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.PAMDiscoveryRulesSetRequest} PAMDiscoveryRulesSetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PAMDiscoveryRulesSetRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PAMDiscoveryRulesSetRequest message.
         * @function verify
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PAMDiscoveryRulesSetRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.networkUid != null && Object.hasOwnProperty.call(message, "networkUid"))
                if (!(message.networkUid && typeof message.networkUid.length === "number" || $util.isString(message.networkUid)))
                    return "networkUid: buffer expected";
            if (message.rules != null && Object.hasOwnProperty.call(message, "rules"))
                if (!(message.rules && typeof message.rules.length === "number" || $util.isString(message.rules)))
                    return "rules: buffer expected";
            if (message.rulesKey != null && Object.hasOwnProperty.call(message, "rulesKey"))
                if (!(message.rulesKey && typeof message.rulesKey.length === "number" || $util.isString(message.rulesKey)))
                    return "rulesKey: buffer expected";
            return null;
        };

        /**
         * Creates a PAMDiscoveryRulesSetRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.PAMDiscoveryRulesSetRequest} PAMDiscoveryRulesSetRequest
         */
        PAMDiscoveryRulesSetRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.PAMDiscoveryRulesSetRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.PAMDiscoveryRulesSetRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.PAMDiscoveryRulesSetRequest();
            if (object.networkUid != null)
                if (typeof object.networkUid === "string")
                    $util.base64.decode(object.networkUid, message.networkUid = $util.newBuffer($util.base64.length(object.networkUid)), 0);
                else if (object.networkUid.length >= 0)
                    message.networkUid = object.networkUid;
            if (object.rules != null)
                if (typeof object.rules === "string")
                    $util.base64.decode(object.rules, message.rules = $util.newBuffer($util.base64.length(object.rules)), 0);
                else if (object.rules.length >= 0)
                    message.rules = object.rules;
            if (object.rulesKey != null)
                if (typeof object.rulesKey === "string")
                    $util.base64.decode(object.rulesKey, message.rulesKey = $util.newBuffer($util.base64.length(object.rulesKey)), 0);
                else if (object.rulesKey.length >= 0)
                    message.rulesKey = object.rulesKey;
            return message;
        };

        /**
         * Creates a plain object from a PAMDiscoveryRulesSetRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @static
         * @param {Router.PAMDiscoveryRulesSetRequest} message PAMDiscoveryRulesSetRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PAMDiscoveryRulesSetRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.networkUid = "";
                else {
                    object.networkUid = [];
                    if (options.bytes !== Array)
                        object.networkUid = $util.newBuffer(object.networkUid);
                }
                if (options.bytes === String)
                    object.rules = "";
                else {
                    object.rules = [];
                    if (options.bytes !== Array)
                        object.rules = $util.newBuffer(object.rules);
                }
                if (options.bytes === String)
                    object.rulesKey = "";
                else {
                    object.rulesKey = [];
                    if (options.bytes !== Array)
                        object.rulesKey = $util.newBuffer(object.rulesKey);
                }
            }
            if (message.networkUid != null && Object.hasOwnProperty.call(message, "networkUid"))
                object.networkUid = options.bytes === String ? $util.base64.encode(message.networkUid, 0, message.networkUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.networkUid) : message.networkUid;
            if (message.rules != null && Object.hasOwnProperty.call(message, "rules"))
                object.rules = options.bytes === String ? $util.base64.encode(message.rules, 0, message.rules.length) : options.bytes === Array ? Array.prototype.slice.call(message.rules) : message.rules;
            if (message.rulesKey != null && Object.hasOwnProperty.call(message, "rulesKey"))
                object.rulesKey = options.bytes === String ? $util.base64.encode(message.rulesKey, 0, message.rulesKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.rulesKey) : message.rulesKey;
            return object;
        };

        /**
         * Converts this PAMDiscoveryRulesSetRequest to JSON.
         * @function toJSON
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PAMDiscoveryRulesSetRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PAMDiscoveryRulesSetRequest
         * @function getTypeUrl
         * @memberof Router.PAMDiscoveryRulesSetRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PAMDiscoveryRulesSetRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.PAMDiscoveryRulesSetRequest";
        };

        return PAMDiscoveryRulesSetRequest;
    })();

    Router.Router2FAValidateRequest = (function() {

        /**
         * Properties of a Router2FAValidateRequest.
         * @memberof Router
         * @interface IRouter2FAValidateRequest
         * @property {Uint8Array|null} [transmissionKey] Router2FAValidateRequest transmissionKey
         * @property {Uint8Array|null} [sessionToken] Router2FAValidateRequest sessionToken
         * @property {string|null} [value] Router2FAValidateRequest value
         */

        /**
         * Constructs a new Router2FAValidateRequest.
         * @memberof Router
         * @classdesc Represents a Router2FAValidateRequest.
         * @implements IRouter2FAValidateRequest
         * @constructor
         * @param {Router.IRouter2FAValidateRequest=} [properties] Properties to set
         */
        function Router2FAValidateRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Router2FAValidateRequest transmissionKey.
         * @member {Uint8Array} transmissionKey
         * @memberof Router.Router2FAValidateRequest
         * @instance
         */
        Router2FAValidateRequest.prototype.transmissionKey = $util.newBuffer([]);

        /**
         * Router2FAValidateRequest sessionToken.
         * @member {Uint8Array} sessionToken
         * @memberof Router.Router2FAValidateRequest
         * @instance
         */
        Router2FAValidateRequest.prototype.sessionToken = $util.newBuffer([]);

        /**
         * Router2FAValidateRequest value.
         * @member {string} value
         * @memberof Router.Router2FAValidateRequest
         * @instance
         */
        Router2FAValidateRequest.prototype.value = "";

        /**
         * Creates a new Router2FAValidateRequest instance using the specified properties.
         * @function create
         * @memberof Router.Router2FAValidateRequest
         * @static
         * @param {Router.IRouter2FAValidateRequest=} [properties] Properties to set
         * @returns {Router.Router2FAValidateRequest} Router2FAValidateRequest instance
         */
        Router2FAValidateRequest.create = function create(properties) {
            return new Router2FAValidateRequest(properties);
        };

        /**
         * Encodes the specified Router2FAValidateRequest message. Does not implicitly {@link Router.Router2FAValidateRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.Router2FAValidateRequest
         * @static
         * @param {Router.IRouter2FAValidateRequest} message Router2FAValidateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Router2FAValidateRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.transmissionKey);
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.sessionToken);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.value);
            return writer;
        };

        /**
         * Encodes the specified Router2FAValidateRequest message, length delimited. Does not implicitly {@link Router.Router2FAValidateRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.Router2FAValidateRequest
         * @static
         * @param {Router.IRouter2FAValidateRequest} message Router2FAValidateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Router2FAValidateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Router2FAValidateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.Router2FAValidateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.Router2FAValidateRequest} Router2FAValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Router2FAValidateRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.Router2FAValidateRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.transmissionKey = reader.bytes();
                        break;
                    }
                case 2: {
                        message.sessionToken = reader.bytes();
                        break;
                    }
                case 3: {
                        message.value = reader.string();
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
         * Decodes a Router2FAValidateRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.Router2FAValidateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.Router2FAValidateRequest} Router2FAValidateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Router2FAValidateRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Router2FAValidateRequest message.
         * @function verify
         * @memberof Router.Router2FAValidateRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Router2FAValidateRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                if (!(message.transmissionKey && typeof message.transmissionKey.length === "number" || $util.isString(message.transmissionKey)))
                    return "transmissionKey: buffer expected";
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                if (!(message.sessionToken && typeof message.sessionToken.length === "number" || $util.isString(message.sessionToken)))
                    return "sessionToken: buffer expected";
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates a Router2FAValidateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.Router2FAValidateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.Router2FAValidateRequest} Router2FAValidateRequest
         */
        Router2FAValidateRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.Router2FAValidateRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.Router2FAValidateRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.Router2FAValidateRequest();
            if (object.transmissionKey != null)
                if (typeof object.transmissionKey === "string")
                    $util.base64.decode(object.transmissionKey, message.transmissionKey = $util.newBuffer($util.base64.length(object.transmissionKey)), 0);
                else if (object.transmissionKey.length >= 0)
                    message.transmissionKey = object.transmissionKey;
            if (object.sessionToken != null)
                if (typeof object.sessionToken === "string")
                    $util.base64.decode(object.sessionToken, message.sessionToken = $util.newBuffer($util.base64.length(object.sessionToken)), 0);
                else if (object.sessionToken.length >= 0)
                    message.sessionToken = object.sessionToken;
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from a Router2FAValidateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.Router2FAValidateRequest
         * @static
         * @param {Router.Router2FAValidateRequest} message Router2FAValidateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Router2FAValidateRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.transmissionKey = "";
                else {
                    object.transmissionKey = [];
                    if (options.bytes !== Array)
                        object.transmissionKey = $util.newBuffer(object.transmissionKey);
                }
                if (options.bytes === String)
                    object.sessionToken = "";
                else {
                    object.sessionToken = [];
                    if (options.bytes !== Array)
                        object.sessionToken = $util.newBuffer(object.sessionToken);
                }
                object.value = "";
            }
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                object.transmissionKey = options.bytes === String ? $util.base64.encode(message.transmissionKey, 0, message.transmissionKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.transmissionKey) : message.transmissionKey;
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                object.sessionToken = options.bytes === String ? $util.base64.encode(message.sessionToken, 0, message.sessionToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.sessionToken) : message.sessionToken;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this Router2FAValidateRequest to JSON.
         * @function toJSON
         * @memberof Router.Router2FAValidateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Router2FAValidateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Router2FAValidateRequest
         * @function getTypeUrl
         * @memberof Router.Router2FAValidateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Router2FAValidateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.Router2FAValidateRequest";
        };

        return Router2FAValidateRequest;
    })();

    Router.Router2FASendPushRequest = (function() {

        /**
         * Properties of a Router2FASendPushRequest.
         * @memberof Router
         * @interface IRouter2FASendPushRequest
         * @property {Uint8Array|null} [transmissionKey] Router2FASendPushRequest transmissionKey
         * @property {Uint8Array|null} [sessionToken] Router2FASendPushRequest sessionToken
         * @property {Authentication.TwoFactorPushType|null} [pushType] Router2FASendPushRequest pushType
         */

        /**
         * Constructs a new Router2FASendPushRequest.
         * @memberof Router
         * @classdesc Represents a Router2FASendPushRequest.
         * @implements IRouter2FASendPushRequest
         * @constructor
         * @param {Router.IRouter2FASendPushRequest=} [properties] Properties to set
         */
        function Router2FASendPushRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Router2FASendPushRequest transmissionKey.
         * @member {Uint8Array} transmissionKey
         * @memberof Router.Router2FASendPushRequest
         * @instance
         */
        Router2FASendPushRequest.prototype.transmissionKey = $util.newBuffer([]);

        /**
         * Router2FASendPushRequest sessionToken.
         * @member {Uint8Array} sessionToken
         * @memberof Router.Router2FASendPushRequest
         * @instance
         */
        Router2FASendPushRequest.prototype.sessionToken = $util.newBuffer([]);

        /**
         * Router2FASendPushRequest pushType.
         * @member {Authentication.TwoFactorPushType} pushType
         * @memberof Router.Router2FASendPushRequest
         * @instance
         */
        Router2FASendPushRequest.prototype.pushType = 0;

        /**
         * Creates a new Router2FASendPushRequest instance using the specified properties.
         * @function create
         * @memberof Router.Router2FASendPushRequest
         * @static
         * @param {Router.IRouter2FASendPushRequest=} [properties] Properties to set
         * @returns {Router.Router2FASendPushRequest} Router2FASendPushRequest instance
         */
        Router2FASendPushRequest.create = function create(properties) {
            return new Router2FASendPushRequest(properties);
        };

        /**
         * Encodes the specified Router2FASendPushRequest message. Does not implicitly {@link Router.Router2FASendPushRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.Router2FASendPushRequest
         * @static
         * @param {Router.IRouter2FASendPushRequest} message Router2FASendPushRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Router2FASendPushRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.transmissionKey);
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.sessionToken);
            if (message.pushType != null && Object.hasOwnProperty.call(message, "pushType"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.pushType);
            return writer;
        };

        /**
         * Encodes the specified Router2FASendPushRequest message, length delimited. Does not implicitly {@link Router.Router2FASendPushRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.Router2FASendPushRequest
         * @static
         * @param {Router.IRouter2FASendPushRequest} message Router2FASendPushRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Router2FASendPushRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Router2FASendPushRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.Router2FASendPushRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.Router2FASendPushRequest} Router2FASendPushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Router2FASendPushRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.Router2FASendPushRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.transmissionKey = reader.bytes();
                        break;
                    }
                case 2: {
                        message.sessionToken = reader.bytes();
                        break;
                    }
                case 3: {
                        message.pushType = reader.int32();
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
         * Decodes a Router2FASendPushRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.Router2FASendPushRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.Router2FASendPushRequest} Router2FASendPushRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Router2FASendPushRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Router2FASendPushRequest message.
         * @function verify
         * @memberof Router.Router2FASendPushRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Router2FASendPushRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                if (!(message.transmissionKey && typeof message.transmissionKey.length === "number" || $util.isString(message.transmissionKey)))
                    return "transmissionKey: buffer expected";
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                if (!(message.sessionToken && typeof message.sessionToken.length === "number" || $util.isString(message.sessionToken)))
                    return "sessionToken: buffer expected";
            if (message.pushType != null && Object.hasOwnProperty.call(message, "pushType"))
                switch (message.pushType) {
                default:
                    return "pushType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    break;
                }
            return null;
        };

        /**
         * Creates a Router2FASendPushRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.Router2FASendPushRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.Router2FASendPushRequest} Router2FASendPushRequest
         */
        Router2FASendPushRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.Router2FASendPushRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.Router2FASendPushRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.Router2FASendPushRequest();
            if (object.transmissionKey != null)
                if (typeof object.transmissionKey === "string")
                    $util.base64.decode(object.transmissionKey, message.transmissionKey = $util.newBuffer($util.base64.length(object.transmissionKey)), 0);
                else if (object.transmissionKey.length >= 0)
                    message.transmissionKey = object.transmissionKey;
            if (object.sessionToken != null)
                if (typeof object.sessionToken === "string")
                    $util.base64.decode(object.sessionToken, message.sessionToken = $util.newBuffer($util.base64.length(object.sessionToken)), 0);
                else if (object.sessionToken.length >= 0)
                    message.sessionToken = object.sessionToken;
            switch (object.pushType) {
            default:
                if (typeof object.pushType === "number") {
                    message.pushType = object.pushType;
                    break;
                }
                break;
            case "TWO_FA_PUSH_NONE":
            case 0:
                message.pushType = 0;
                break;
            case "TWO_FA_PUSH_SMS":
            case 1:
                message.pushType = 1;
                break;
            case "TWO_FA_PUSH_KEEPER":
            case 2:
                message.pushType = 2;
                break;
            case "TWO_FA_PUSH_DUO_PUSH":
            case 3:
                message.pushType = 3;
                break;
            case "TWO_FA_PUSH_DUO_TEXT":
            case 4:
                message.pushType = 4;
                break;
            case "TWO_FA_PUSH_DUO_CALL":
            case 5:
                message.pushType = 5;
                break;
            case "TWO_FA_PUSH_DNA":
            case 6:
                message.pushType = 6;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Router2FASendPushRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.Router2FASendPushRequest
         * @static
         * @param {Router.Router2FASendPushRequest} message Router2FASendPushRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Router2FASendPushRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.transmissionKey = "";
                else {
                    object.transmissionKey = [];
                    if (options.bytes !== Array)
                        object.transmissionKey = $util.newBuffer(object.transmissionKey);
                }
                if (options.bytes === String)
                    object.sessionToken = "";
                else {
                    object.sessionToken = [];
                    if (options.bytes !== Array)
                        object.sessionToken = $util.newBuffer(object.sessionToken);
                }
                object.pushType = options.enums === String ? "TWO_FA_PUSH_NONE" : 0;
            }
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                object.transmissionKey = options.bytes === String ? $util.base64.encode(message.transmissionKey, 0, message.transmissionKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.transmissionKey) : message.transmissionKey;
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                object.sessionToken = options.bytes === String ? $util.base64.encode(message.sessionToken, 0, message.sessionToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.sessionToken) : message.sessionToken;
            if (message.pushType != null && Object.hasOwnProperty.call(message, "pushType"))
                object.pushType = options.enums === String ? $root.Authentication.TwoFactorPushType[message.pushType] === undefined ? message.pushType : $root.Authentication.TwoFactorPushType[message.pushType] : message.pushType;
            return object;
        };

        /**
         * Converts this Router2FASendPushRequest to JSON.
         * @function toJSON
         * @memberof Router.Router2FASendPushRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Router2FASendPushRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Router2FASendPushRequest
         * @function getTypeUrl
         * @memberof Router.Router2FASendPushRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Router2FASendPushRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.Router2FASendPushRequest";
        };

        return Router2FASendPushRequest;
    })();

    Router.Router2FAGetWebAuthnChallengeRequest = (function() {

        /**
         * Properties of a Router2FAGetWebAuthnChallengeRequest.
         * @memberof Router
         * @interface IRouter2FAGetWebAuthnChallengeRequest
         * @property {Uint8Array|null} [transmissionKey] Router2FAGetWebAuthnChallengeRequest transmissionKey
         * @property {Uint8Array|null} [sessionToken] Router2FAGetWebAuthnChallengeRequest sessionToken
         */

        /**
         * Constructs a new Router2FAGetWebAuthnChallengeRequest.
         * @memberof Router
         * @classdesc Represents a Router2FAGetWebAuthnChallengeRequest.
         * @implements IRouter2FAGetWebAuthnChallengeRequest
         * @constructor
         * @param {Router.IRouter2FAGetWebAuthnChallengeRequest=} [properties] Properties to set
         */
        function Router2FAGetWebAuthnChallengeRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Router2FAGetWebAuthnChallengeRequest transmissionKey.
         * @member {Uint8Array} transmissionKey
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @instance
         */
        Router2FAGetWebAuthnChallengeRequest.prototype.transmissionKey = $util.newBuffer([]);

        /**
         * Router2FAGetWebAuthnChallengeRequest sessionToken.
         * @member {Uint8Array} sessionToken
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @instance
         */
        Router2FAGetWebAuthnChallengeRequest.prototype.sessionToken = $util.newBuffer([]);

        /**
         * Creates a new Router2FAGetWebAuthnChallengeRequest instance using the specified properties.
         * @function create
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @static
         * @param {Router.IRouter2FAGetWebAuthnChallengeRequest=} [properties] Properties to set
         * @returns {Router.Router2FAGetWebAuthnChallengeRequest} Router2FAGetWebAuthnChallengeRequest instance
         */
        Router2FAGetWebAuthnChallengeRequest.create = function create(properties) {
            return new Router2FAGetWebAuthnChallengeRequest(properties);
        };

        /**
         * Encodes the specified Router2FAGetWebAuthnChallengeRequest message. Does not implicitly {@link Router.Router2FAGetWebAuthnChallengeRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @static
         * @param {Router.IRouter2FAGetWebAuthnChallengeRequest} message Router2FAGetWebAuthnChallengeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Router2FAGetWebAuthnChallengeRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.transmissionKey);
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.sessionToken);
            return writer;
        };

        /**
         * Encodes the specified Router2FAGetWebAuthnChallengeRequest message, length delimited. Does not implicitly {@link Router.Router2FAGetWebAuthnChallengeRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @static
         * @param {Router.IRouter2FAGetWebAuthnChallengeRequest} message Router2FAGetWebAuthnChallengeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Router2FAGetWebAuthnChallengeRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Router2FAGetWebAuthnChallengeRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.Router2FAGetWebAuthnChallengeRequest} Router2FAGetWebAuthnChallengeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Router2FAGetWebAuthnChallengeRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.Router2FAGetWebAuthnChallengeRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.transmissionKey = reader.bytes();
                        break;
                    }
                case 2: {
                        message.sessionToken = reader.bytes();
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
         * Decodes a Router2FAGetWebAuthnChallengeRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.Router2FAGetWebAuthnChallengeRequest} Router2FAGetWebAuthnChallengeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Router2FAGetWebAuthnChallengeRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Router2FAGetWebAuthnChallengeRequest message.
         * @function verify
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Router2FAGetWebAuthnChallengeRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                if (!(message.transmissionKey && typeof message.transmissionKey.length === "number" || $util.isString(message.transmissionKey)))
                    return "transmissionKey: buffer expected";
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                if (!(message.sessionToken && typeof message.sessionToken.length === "number" || $util.isString(message.sessionToken)))
                    return "sessionToken: buffer expected";
            return null;
        };

        /**
         * Creates a Router2FAGetWebAuthnChallengeRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.Router2FAGetWebAuthnChallengeRequest} Router2FAGetWebAuthnChallengeRequest
         */
        Router2FAGetWebAuthnChallengeRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.Router2FAGetWebAuthnChallengeRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.Router2FAGetWebAuthnChallengeRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.Router2FAGetWebAuthnChallengeRequest();
            if (object.transmissionKey != null)
                if (typeof object.transmissionKey === "string")
                    $util.base64.decode(object.transmissionKey, message.transmissionKey = $util.newBuffer($util.base64.length(object.transmissionKey)), 0);
                else if (object.transmissionKey.length >= 0)
                    message.transmissionKey = object.transmissionKey;
            if (object.sessionToken != null)
                if (typeof object.sessionToken === "string")
                    $util.base64.decode(object.sessionToken, message.sessionToken = $util.newBuffer($util.base64.length(object.sessionToken)), 0);
                else if (object.sessionToken.length >= 0)
                    message.sessionToken = object.sessionToken;
            return message;
        };

        /**
         * Creates a plain object from a Router2FAGetWebAuthnChallengeRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @static
         * @param {Router.Router2FAGetWebAuthnChallengeRequest} message Router2FAGetWebAuthnChallengeRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Router2FAGetWebAuthnChallengeRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.transmissionKey = "";
                else {
                    object.transmissionKey = [];
                    if (options.bytes !== Array)
                        object.transmissionKey = $util.newBuffer(object.transmissionKey);
                }
                if (options.bytes === String)
                    object.sessionToken = "";
                else {
                    object.sessionToken = [];
                    if (options.bytes !== Array)
                        object.sessionToken = $util.newBuffer(object.sessionToken);
                }
            }
            if (message.transmissionKey != null && Object.hasOwnProperty.call(message, "transmissionKey"))
                object.transmissionKey = options.bytes === String ? $util.base64.encode(message.transmissionKey, 0, message.transmissionKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.transmissionKey) : message.transmissionKey;
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                object.sessionToken = options.bytes === String ? $util.base64.encode(message.sessionToken, 0, message.sessionToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.sessionToken) : message.sessionToken;
            return object;
        };

        /**
         * Converts this Router2FAGetWebAuthnChallengeRequest to JSON.
         * @function toJSON
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Router2FAGetWebAuthnChallengeRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Router2FAGetWebAuthnChallengeRequest
         * @function getTypeUrl
         * @memberof Router.Router2FAGetWebAuthnChallengeRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Router2FAGetWebAuthnChallengeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.Router2FAGetWebAuthnChallengeRequest";
        };

        return Router2FAGetWebAuthnChallengeRequest;
    })();

    Router.Router2FAGetWebAuthnChallengeResponse = (function() {

        /**
         * Properties of a Router2FAGetWebAuthnChallengeResponse.
         * @memberof Router
         * @interface IRouter2FAGetWebAuthnChallengeResponse
         * @property {string|null} [challenge] Router2FAGetWebAuthnChallengeResponse challenge
         * @property {Array.<string>|null} [capabilities] Router2FAGetWebAuthnChallengeResponse capabilities
         */

        /**
         * Constructs a new Router2FAGetWebAuthnChallengeResponse.
         * @memberof Router
         * @classdesc Represents a Router2FAGetWebAuthnChallengeResponse.
         * @implements IRouter2FAGetWebAuthnChallengeResponse
         * @constructor
         * @param {Router.IRouter2FAGetWebAuthnChallengeResponse=} [properties] Properties to set
         */
        function Router2FAGetWebAuthnChallengeResponse(properties) {
            this.capabilities = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Router2FAGetWebAuthnChallengeResponse challenge.
         * @member {string} challenge
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @instance
         */
        Router2FAGetWebAuthnChallengeResponse.prototype.challenge = "";

        /**
         * Router2FAGetWebAuthnChallengeResponse capabilities.
         * @member {Array.<string>} capabilities
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @instance
         */
        Router2FAGetWebAuthnChallengeResponse.prototype.capabilities = $util.emptyArray;

        /**
         * Creates a new Router2FAGetWebAuthnChallengeResponse instance using the specified properties.
         * @function create
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @static
         * @param {Router.IRouter2FAGetWebAuthnChallengeResponse=} [properties] Properties to set
         * @returns {Router.Router2FAGetWebAuthnChallengeResponse} Router2FAGetWebAuthnChallengeResponse instance
         */
        Router2FAGetWebAuthnChallengeResponse.create = function create(properties) {
            return new Router2FAGetWebAuthnChallengeResponse(properties);
        };

        /**
         * Encodes the specified Router2FAGetWebAuthnChallengeResponse message. Does not implicitly {@link Router.Router2FAGetWebAuthnChallengeResponse.verify|verify} messages.
         * @function encode
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @static
         * @param {Router.IRouter2FAGetWebAuthnChallengeResponse} message Router2FAGetWebAuthnChallengeResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Router2FAGetWebAuthnChallengeResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.challenge != null && Object.hasOwnProperty.call(message, "challenge"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.challenge);
            if (message.capabilities != null && message.capabilities.length)
                for (let i = 0; i < message.capabilities.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.capabilities[i]);
            return writer;
        };

        /**
         * Encodes the specified Router2FAGetWebAuthnChallengeResponse message, length delimited. Does not implicitly {@link Router.Router2FAGetWebAuthnChallengeResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @static
         * @param {Router.IRouter2FAGetWebAuthnChallengeResponse} message Router2FAGetWebAuthnChallengeResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Router2FAGetWebAuthnChallengeResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Router2FAGetWebAuthnChallengeResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.Router2FAGetWebAuthnChallengeResponse} Router2FAGetWebAuthnChallengeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Router2FAGetWebAuthnChallengeResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.Router2FAGetWebAuthnChallengeResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.challenge = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.capabilities && message.capabilities.length))
                            message.capabilities = [];
                        message.capabilities.push(reader.string());
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
         * Decodes a Router2FAGetWebAuthnChallengeResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.Router2FAGetWebAuthnChallengeResponse} Router2FAGetWebAuthnChallengeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Router2FAGetWebAuthnChallengeResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Router2FAGetWebAuthnChallengeResponse message.
         * @function verify
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Router2FAGetWebAuthnChallengeResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.challenge != null && Object.hasOwnProperty.call(message, "challenge"))
                if (!$util.isString(message.challenge))
                    return "challenge: string expected";
            if (message.capabilities != null && Object.hasOwnProperty.call(message, "capabilities")) {
                if (!Array.isArray(message.capabilities))
                    return "capabilities: array expected";
                for (let i = 0; i < message.capabilities.length; ++i)
                    if (!$util.isString(message.capabilities[i]))
                        return "capabilities: string[] expected";
            }
            return null;
        };

        /**
         * Creates a Router2FAGetWebAuthnChallengeResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.Router2FAGetWebAuthnChallengeResponse} Router2FAGetWebAuthnChallengeResponse
         */
        Router2FAGetWebAuthnChallengeResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.Router2FAGetWebAuthnChallengeResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.Router2FAGetWebAuthnChallengeResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.Router2FAGetWebAuthnChallengeResponse();
            if (object.challenge != null)
                message.challenge = String(object.challenge);
            if (object.capabilities) {
                if (!Array.isArray(object.capabilities))
                    throw TypeError(".Router.Router2FAGetWebAuthnChallengeResponse.capabilities: array expected");
                message.capabilities = [];
                for (let i = 0; i < object.capabilities.length; ++i)
                    message.capabilities[i] = String(object.capabilities[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a Router2FAGetWebAuthnChallengeResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @static
         * @param {Router.Router2FAGetWebAuthnChallengeResponse} message Router2FAGetWebAuthnChallengeResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Router2FAGetWebAuthnChallengeResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.capabilities = [];
            if (options.defaults)
                object.challenge = "";
            if (message.challenge != null && Object.hasOwnProperty.call(message, "challenge"))
                object.challenge = message.challenge;
            if (message.capabilities && message.capabilities.length) {
                object.capabilities = [];
                for (let j = 0; j < message.capabilities.length; ++j)
                    object.capabilities[j] = message.capabilities[j];
            }
            return object;
        };

        /**
         * Converts this Router2FAGetWebAuthnChallengeResponse to JSON.
         * @function toJSON
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Router2FAGetWebAuthnChallengeResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Router2FAGetWebAuthnChallengeResponse
         * @function getTypeUrl
         * @memberof Router.Router2FAGetWebAuthnChallengeResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Router2FAGetWebAuthnChallengeResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.Router2FAGetWebAuthnChallengeResponse";
        };

        return Router2FAGetWebAuthnChallengeResponse;
    })();

    Router.CreateEphemeralSecretRequest = (function() {

        /**
         * Properties of a CreateEphemeralSecretRequest.
         * @memberof Router
         * @interface ICreateEphemeralSecretRequest
         * @property {Uint8Array|null} [encryptedSecret] CreateEphemeralSecretRequest encryptedSecret
         * @property {Uint8Array|null} [secretKeyHash] CreateEphemeralSecretRequest secretKeyHash
         * @property {number|null} [ttl] CreateEphemeralSecretRequest ttl
         */

        /**
         * Constructs a new CreateEphemeralSecretRequest.
         * @memberof Router
         * @classdesc Represents a CreateEphemeralSecretRequest.
         * @implements ICreateEphemeralSecretRequest
         * @constructor
         * @param {Router.ICreateEphemeralSecretRequest=} [properties] Properties to set
         */
        function CreateEphemeralSecretRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CreateEphemeralSecretRequest encryptedSecret.
         * @member {Uint8Array} encryptedSecret
         * @memberof Router.CreateEphemeralSecretRequest
         * @instance
         */
        CreateEphemeralSecretRequest.prototype.encryptedSecret = $util.newBuffer([]);

        /**
         * CreateEphemeralSecretRequest secretKeyHash.
         * @member {Uint8Array} secretKeyHash
         * @memberof Router.CreateEphemeralSecretRequest
         * @instance
         */
        CreateEphemeralSecretRequest.prototype.secretKeyHash = $util.newBuffer([]);

        /**
         * CreateEphemeralSecretRequest ttl.
         * @member {number} ttl
         * @memberof Router.CreateEphemeralSecretRequest
         * @instance
         */
        CreateEphemeralSecretRequest.prototype.ttl = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new CreateEphemeralSecretRequest instance using the specified properties.
         * @function create
         * @memberof Router.CreateEphemeralSecretRequest
         * @static
         * @param {Router.ICreateEphemeralSecretRequest=} [properties] Properties to set
         * @returns {Router.CreateEphemeralSecretRequest} CreateEphemeralSecretRequest instance
         */
        CreateEphemeralSecretRequest.create = function create(properties) {
            return new CreateEphemeralSecretRequest(properties);
        };

        /**
         * Encodes the specified CreateEphemeralSecretRequest message. Does not implicitly {@link Router.CreateEphemeralSecretRequest.verify|verify} messages.
         * @function encode
         * @memberof Router.CreateEphemeralSecretRequest
         * @static
         * @param {Router.ICreateEphemeralSecretRequest} message CreateEphemeralSecretRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateEphemeralSecretRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.encryptedSecret != null && Object.hasOwnProperty.call(message, "encryptedSecret"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encryptedSecret);
            if (message.secretKeyHash != null && Object.hasOwnProperty.call(message, "secretKeyHash"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.secretKeyHash);
            if (message.ttl != null && Object.hasOwnProperty.call(message, "ttl"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.ttl);
            return writer;
        };

        /**
         * Encodes the specified CreateEphemeralSecretRequest message, length delimited. Does not implicitly {@link Router.CreateEphemeralSecretRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Router.CreateEphemeralSecretRequest
         * @static
         * @param {Router.ICreateEphemeralSecretRequest} message CreateEphemeralSecretRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CreateEphemeralSecretRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a CreateEphemeralSecretRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Router.CreateEphemeralSecretRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Router.CreateEphemeralSecretRequest} CreateEphemeralSecretRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateEphemeralSecretRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Router.CreateEphemeralSecretRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.encryptedSecret = reader.bytes();
                        break;
                    }
                case 2: {
                        message.secretKeyHash = reader.bytes();
                        break;
                    }
                case 3: {
                        message.ttl = reader.int64();
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
         * Decodes a CreateEphemeralSecretRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Router.CreateEphemeralSecretRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Router.CreateEphemeralSecretRequest} CreateEphemeralSecretRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CreateEphemeralSecretRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CreateEphemeralSecretRequest message.
         * @function verify
         * @memberof Router.CreateEphemeralSecretRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CreateEphemeralSecretRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.encryptedSecret != null && Object.hasOwnProperty.call(message, "encryptedSecret"))
                if (!(message.encryptedSecret && typeof message.encryptedSecret.length === "number" || $util.isString(message.encryptedSecret)))
                    return "encryptedSecret: buffer expected";
            if (message.secretKeyHash != null && Object.hasOwnProperty.call(message, "secretKeyHash"))
                if (!(message.secretKeyHash && typeof message.secretKeyHash.length === "number" || $util.isString(message.secretKeyHash)))
                    return "secretKeyHash: buffer expected";
            if (message.ttl != null && Object.hasOwnProperty.call(message, "ttl"))
                if (!$util.isInteger(message.ttl) && !(message.ttl && $util.isInteger(message.ttl.low) && $util.isInteger(message.ttl.high)))
                    return "ttl: integer|Long expected";
            return null;
        };

        /**
         * Creates a CreateEphemeralSecretRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Router.CreateEphemeralSecretRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Router.CreateEphemeralSecretRequest} CreateEphemeralSecretRequest
         */
        CreateEphemeralSecretRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Router.CreateEphemeralSecretRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Router.CreateEphemeralSecretRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Router.CreateEphemeralSecretRequest();
            if (object.encryptedSecret != null)
                if (typeof object.encryptedSecret === "string")
                    $util.base64.decode(object.encryptedSecret, message.encryptedSecret = $util.newBuffer($util.base64.length(object.encryptedSecret)), 0);
                else if (object.encryptedSecret.length >= 0)
                    message.encryptedSecret = object.encryptedSecret;
            if (object.secretKeyHash != null)
                if (typeof object.secretKeyHash === "string")
                    $util.base64.decode(object.secretKeyHash, message.secretKeyHash = $util.newBuffer($util.base64.length(object.secretKeyHash)), 0);
                else if (object.secretKeyHash.length >= 0)
                    message.secretKeyHash = object.secretKeyHash;
            if (object.ttl != null)
                if ($util.Long)
                    message.ttl = $util.Long.fromValue(object.ttl, false);
                else if (typeof object.ttl === "string")
                    message.ttl = parseInt(object.ttl, 10);
                else if (typeof object.ttl === "number")
                    message.ttl = object.ttl;
                else if (typeof object.ttl === "object")
                    message.ttl = new $util.LongBits(object.ttl.low >>> 0, object.ttl.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a CreateEphemeralSecretRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Router.CreateEphemeralSecretRequest
         * @static
         * @param {Router.CreateEphemeralSecretRequest} message CreateEphemeralSecretRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CreateEphemeralSecretRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.encryptedSecret = "";
                else {
                    object.encryptedSecret = [];
                    if (options.bytes !== Array)
                        object.encryptedSecret = $util.newBuffer(object.encryptedSecret);
                }
                if (options.bytes === String)
                    object.secretKeyHash = "";
                else {
                    object.secretKeyHash = [];
                    if (options.bytes !== Array)
                        object.secretKeyHash = $util.newBuffer(object.secretKeyHash);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.ttl = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ttl = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.encryptedSecret != null && Object.hasOwnProperty.call(message, "encryptedSecret"))
                object.encryptedSecret = options.bytes === String ? $util.base64.encode(message.encryptedSecret, 0, message.encryptedSecret.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedSecret) : message.encryptedSecret;
            if (message.secretKeyHash != null && Object.hasOwnProperty.call(message, "secretKeyHash"))
                object.secretKeyHash = options.bytes === String ? $util.base64.encode(message.secretKeyHash, 0, message.secretKeyHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.secretKeyHash) : message.secretKeyHash;
            if (message.ttl != null && Object.hasOwnProperty.call(message, "ttl"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ttl = typeof message.ttl === "number" ? BigInt(message.ttl) : $util.Long.fromBits(message.ttl.low >>> 0, message.ttl.high >>> 0, false).toBigInt();
                else if (typeof message.ttl === "number")
                    object.ttl = options.longs === String ? String(message.ttl) : message.ttl;
                else
                    object.ttl = options.longs === String ? $util.Long.prototype.toString.call(message.ttl) : options.longs === Number ? new $util.LongBits(message.ttl.low >>> 0, message.ttl.high >>> 0).toNumber() : message.ttl;
            return object;
        };

        /**
         * Converts this CreateEphemeralSecretRequest to JSON.
         * @function toJSON
         * @memberof Router.CreateEphemeralSecretRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CreateEphemeralSecretRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CreateEphemeralSecretRequest
         * @function getTypeUrl
         * @memberof Router.CreateEphemeralSecretRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CreateEphemeralSecretRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Router.CreateEphemeralSecretRequest";
        };

        return CreateEphemeralSecretRequest;
    })();

    return Router;
})();

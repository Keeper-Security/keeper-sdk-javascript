/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const BI = $root.BI = (() => {

    /**
     * Namespace BI.
     * @exports BI
     * @namespace
     */
    const BI = {};

    /**
     * Currency enum.
     * @name BI.Currency
     * @enum {number}
     * @property {number} UNKNOWN=0 UNKNOWN value
     * @property {number} USD=1 USD value
     * @property {number} GBP=2 GBP value
     * @property {number} JPY=3 JPY value
     * @property {number} EUR=4 EUR value
     * @property {number} AUD=5 AUD value
     * @property {number} CAD=6 CAD value
     */
    BI.Currency = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN"] = 0;
        values[valuesById[1] = "USD"] = 1;
        values[valuesById[2] = "GBP"] = 2;
        values[valuesById[3] = "JPY"] = 3;
        values[valuesById[4] = "EUR"] = 4;
        values[valuesById[5] = "AUD"] = 5;
        values[valuesById[6] = "CAD"] = 6;
        return values;
    })();

    BI.ValidateSessionTokenRequest = (function() {

        /**
         * Properties of a ValidateSessionTokenRequest.
         * @memberof BI
         * @interface IValidateSessionTokenRequest
         * @property {Uint8Array|null} [encryptedSessionToken] ValidateSessionTokenRequest encryptedSessionToken
         * @property {boolean|null} [returnMcEnterpiseIds] ValidateSessionTokenRequest returnMcEnterpiseIds
         * @property {string|null} [ip] ValidateSessionTokenRequest ip
         */

        /**
         * Constructs a new ValidateSessionTokenRequest.
         * @memberof BI
         * @classdesc Represents a ValidateSessionTokenRequest.
         * @implements IValidateSessionTokenRequest
         * @constructor
         * @param {BI.IValidateSessionTokenRequest=} [properties] Properties to set
         */
        function ValidateSessionTokenRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidateSessionTokenRequest encryptedSessionToken.
         * @member {Uint8Array} encryptedSessionToken
         * @memberof BI.ValidateSessionTokenRequest
         * @instance
         */
        ValidateSessionTokenRequest.prototype.encryptedSessionToken = $util.newBuffer([]);

        /**
         * ValidateSessionTokenRequest returnMcEnterpiseIds.
         * @member {boolean} returnMcEnterpiseIds
         * @memberof BI.ValidateSessionTokenRequest
         * @instance
         */
        ValidateSessionTokenRequest.prototype.returnMcEnterpiseIds = false;

        /**
         * ValidateSessionTokenRequest ip.
         * @member {string} ip
         * @memberof BI.ValidateSessionTokenRequest
         * @instance
         */
        ValidateSessionTokenRequest.prototype.ip = "";

        /**
         * Creates a new ValidateSessionTokenRequest instance using the specified properties.
         * @function create
         * @memberof BI.ValidateSessionTokenRequest
         * @static
         * @param {BI.IValidateSessionTokenRequest=} [properties] Properties to set
         * @returns {BI.ValidateSessionTokenRequest} ValidateSessionTokenRequest instance
         */
        ValidateSessionTokenRequest.create = function create(properties) {
            return new ValidateSessionTokenRequest(properties);
        };

        /**
         * Encodes the specified ValidateSessionTokenRequest message. Does not implicitly {@link BI.ValidateSessionTokenRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.ValidateSessionTokenRequest
         * @static
         * @param {BI.IValidateSessionTokenRequest} message ValidateSessionTokenRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateSessionTokenRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.encryptedSessionToken != null && Object.hasOwnProperty.call(message, "encryptedSessionToken"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encryptedSessionToken);
            if (message.returnMcEnterpiseIds != null && Object.hasOwnProperty.call(message, "returnMcEnterpiseIds"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.returnMcEnterpiseIds);
            if (message.ip != null && Object.hasOwnProperty.call(message, "ip"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.ip);
            return writer;
        };

        /**
         * Decodes a ValidateSessionTokenRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.ValidateSessionTokenRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.ValidateSessionTokenRequest} ValidateSessionTokenRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateSessionTokenRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.ValidateSessionTokenRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.encryptedSessionToken = reader.bytes();
                        break;
                    }
                case 2: {
                        message.returnMcEnterpiseIds = reader.bool();
                        break;
                    }
                case 3: {
                        message.ip = reader.string();
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
         * Creates a ValidateSessionTokenRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.ValidateSessionTokenRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.ValidateSessionTokenRequest} ValidateSessionTokenRequest
         */
        ValidateSessionTokenRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.ValidateSessionTokenRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.ValidateSessionTokenRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.ValidateSessionTokenRequest();
            if (object.encryptedSessionToken != null)
                if (typeof object.encryptedSessionToken === "string")
                    $util.base64.decode(object.encryptedSessionToken, message.encryptedSessionToken = $util.newBuffer($util.base64.length(object.encryptedSessionToken)), 0);
                else if (object.encryptedSessionToken.length >= 0)
                    message.encryptedSessionToken = object.encryptedSessionToken;
            if (object.returnMcEnterpiseIds != null)
                message.returnMcEnterpiseIds = Boolean(object.returnMcEnterpiseIds);
            if (object.ip != null)
                message.ip = String(object.ip);
            return message;
        };

        /**
         * Creates a plain object from a ValidateSessionTokenRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.ValidateSessionTokenRequest
         * @static
         * @param {BI.ValidateSessionTokenRequest} message ValidateSessionTokenRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidateSessionTokenRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.encryptedSessionToken = "";
                else {
                    object.encryptedSessionToken = [];
                    if (options.bytes !== Array)
                        object.encryptedSessionToken = $util.newBuffer(object.encryptedSessionToken);
                }
                object.returnMcEnterpiseIds = false;
                object.ip = "";
            }
            if (message.encryptedSessionToken != null && Object.hasOwnProperty.call(message, "encryptedSessionToken"))
                object.encryptedSessionToken = options.bytes === String ? $util.base64.encode(message.encryptedSessionToken, 0, message.encryptedSessionToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedSessionToken) : message.encryptedSessionToken;
            if (message.returnMcEnterpiseIds != null && Object.hasOwnProperty.call(message, "returnMcEnterpiseIds"))
                object.returnMcEnterpiseIds = message.returnMcEnterpiseIds;
            if (message.ip != null && Object.hasOwnProperty.call(message, "ip"))
                object.ip = message.ip;
            return object;
        };

        /**
         * Converts this ValidateSessionTokenRequest to JSON.
         * @function toJSON
         * @memberof BI.ValidateSessionTokenRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidateSessionTokenRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidateSessionTokenRequest
         * @function getTypeUrl
         * @memberof BI.ValidateSessionTokenRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidateSessionTokenRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.ValidateSessionTokenRequest";
        };

        return ValidateSessionTokenRequest;
    })();

    BI.ValidateSessionTokenResponse = (function() {

        /**
         * Properties of a ValidateSessionTokenResponse.
         * @memberof BI
         * @interface IValidateSessionTokenResponse
         * @property {string|null} [username] ValidateSessionTokenResponse username
         * @property {number|null} [userId] ValidateSessionTokenResponse userId
         * @property {number|null} [enterpriseUserId] ValidateSessionTokenResponse enterpriseUserId
         * @property {BI.ValidateSessionTokenResponse.Status|null} [status] ValidateSessionTokenResponse status
         * @property {string|null} [statusMessage] ValidateSessionTokenResponse statusMessage
         * @property {Array.<number>|null} [mcEnterpriseIds] ValidateSessionTokenResponse mcEnterpriseIds
         * @property {boolean|null} [hasMSPPermission] ValidateSessionTokenResponse hasMSPPermission
         * @property {Array.<number>|null} [deletedMcEnterpriseIds] ValidateSessionTokenResponse deletedMcEnterpriseIds
         */

        /**
         * Constructs a new ValidateSessionTokenResponse.
         * @memberof BI
         * @classdesc Represents a ValidateSessionTokenResponse.
         * @implements IValidateSessionTokenResponse
         * @constructor
         * @param {BI.IValidateSessionTokenResponse=} [properties] Properties to set
         */
        function ValidateSessionTokenResponse(properties) {
            this.mcEnterpriseIds = [];
            this.deletedMcEnterpriseIds = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidateSessionTokenResponse username.
         * @member {string} username
         * @memberof BI.ValidateSessionTokenResponse
         * @instance
         */
        ValidateSessionTokenResponse.prototype.username = "";

        /**
         * ValidateSessionTokenResponse userId.
         * @member {number} userId
         * @memberof BI.ValidateSessionTokenResponse
         * @instance
         */
        ValidateSessionTokenResponse.prototype.userId = 0;

        /**
         * ValidateSessionTokenResponse enterpriseUserId.
         * @member {number} enterpriseUserId
         * @memberof BI.ValidateSessionTokenResponse
         * @instance
         */
        ValidateSessionTokenResponse.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ValidateSessionTokenResponse status.
         * @member {BI.ValidateSessionTokenResponse.Status} status
         * @memberof BI.ValidateSessionTokenResponse
         * @instance
         */
        ValidateSessionTokenResponse.prototype.status = 0;

        /**
         * ValidateSessionTokenResponse statusMessage.
         * @member {string} statusMessage
         * @memberof BI.ValidateSessionTokenResponse
         * @instance
         */
        ValidateSessionTokenResponse.prototype.statusMessage = "";

        /**
         * ValidateSessionTokenResponse mcEnterpriseIds.
         * @member {Array.<number>} mcEnterpriseIds
         * @memberof BI.ValidateSessionTokenResponse
         * @instance
         */
        ValidateSessionTokenResponse.prototype.mcEnterpriseIds = $util.emptyArray;

        /**
         * ValidateSessionTokenResponse hasMSPPermission.
         * @member {boolean} hasMSPPermission
         * @memberof BI.ValidateSessionTokenResponse
         * @instance
         */
        ValidateSessionTokenResponse.prototype.hasMSPPermission = false;

        /**
         * ValidateSessionTokenResponse deletedMcEnterpriseIds.
         * @member {Array.<number>} deletedMcEnterpriseIds
         * @memberof BI.ValidateSessionTokenResponse
         * @instance
         */
        ValidateSessionTokenResponse.prototype.deletedMcEnterpriseIds = $util.emptyArray;

        /**
         * Creates a new ValidateSessionTokenResponse instance using the specified properties.
         * @function create
         * @memberof BI.ValidateSessionTokenResponse
         * @static
         * @param {BI.IValidateSessionTokenResponse=} [properties] Properties to set
         * @returns {BI.ValidateSessionTokenResponse} ValidateSessionTokenResponse instance
         */
        ValidateSessionTokenResponse.create = function create(properties) {
            return new ValidateSessionTokenResponse(properties);
        };

        /**
         * Encodes the specified ValidateSessionTokenResponse message. Does not implicitly {@link BI.ValidateSessionTokenResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.ValidateSessionTokenResponse
         * @static
         * @param {BI.IValidateSessionTokenResponse} message ValidateSessionTokenResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidateSessionTokenResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.userId);
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.enterpriseUserId);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.status);
            if (message.statusMessage != null && Object.hasOwnProperty.call(message, "statusMessage"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.statusMessage);
            if (message.mcEnterpriseIds != null && message.mcEnterpriseIds.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (let i = 0; i < message.mcEnterpriseIds.length; ++i)
                    writer.int32(message.mcEnterpriseIds[i]);
                writer.ldelim();
            }
            if (message.hasMSPPermission != null && Object.hasOwnProperty.call(message, "hasMSPPermission"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.hasMSPPermission);
            if (message.deletedMcEnterpriseIds != null && message.deletedMcEnterpriseIds.length) {
                writer.uint32(/* id 8, wireType 2 =*/66).fork();
                for (let i = 0; i < message.deletedMcEnterpriseIds.length; ++i)
                    writer.int32(message.deletedMcEnterpriseIds[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Decodes a ValidateSessionTokenResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.ValidateSessionTokenResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.ValidateSessionTokenResponse} ValidateSessionTokenResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidateSessionTokenResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.ValidateSessionTokenResponse();
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
                        message.userId = reader.int32();
                        break;
                    }
                case 3: {
                        message.enterpriseUserId = reader.int64();
                        break;
                    }
                case 4: {
                        message.status = reader.int32();
                        break;
                    }
                case 5: {
                        message.statusMessage = reader.string();
                        break;
                    }
                case 6: {
                        if (!(message.mcEnterpriseIds && message.mcEnterpriseIds.length))
                            message.mcEnterpriseIds = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.mcEnterpriseIds.push(reader.int32());
                        } else
                            message.mcEnterpriseIds.push(reader.int32());
                        break;
                    }
                case 7: {
                        message.hasMSPPermission = reader.bool();
                        break;
                    }
                case 8: {
                        if (!(message.deletedMcEnterpriseIds && message.deletedMcEnterpriseIds.length))
                            message.deletedMcEnterpriseIds = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.deletedMcEnterpriseIds.push(reader.int32());
                        } else
                            message.deletedMcEnterpriseIds.push(reader.int32());
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
         * Creates a ValidateSessionTokenResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.ValidateSessionTokenResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.ValidateSessionTokenResponse} ValidateSessionTokenResponse
         */
        ValidateSessionTokenResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.ValidateSessionTokenResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.ValidateSessionTokenResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.ValidateSessionTokenResponse();
            if (object.username != null)
                message.username = String(object.username);
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
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "VALID":
            case 0:
                message.status = 0;
                break;
            case "NOT_VALID":
            case 1:
                message.status = 1;
                break;
            case "EXPIRED":
            case 2:
                message.status = 2;
                break;
            case "IP_BLOCKED":
            case 3:
                message.status = 3;
                break;
            case "INVALID_CLIENT_VERSION":
            case 4:
                message.status = 4;
                break;
            }
            if (object.statusMessage != null)
                message.statusMessage = String(object.statusMessage);
            if (object.mcEnterpriseIds) {
                if (!Array.isArray(object.mcEnterpriseIds))
                    throw TypeError(".BI.ValidateSessionTokenResponse.mcEnterpriseIds: array expected");
                message.mcEnterpriseIds = [];
                for (let i = 0; i < object.mcEnterpriseIds.length; ++i)
                    message.mcEnterpriseIds[i] = object.mcEnterpriseIds[i] | 0;
            }
            if (object.hasMSPPermission != null)
                message.hasMSPPermission = Boolean(object.hasMSPPermission);
            if (object.deletedMcEnterpriseIds) {
                if (!Array.isArray(object.deletedMcEnterpriseIds))
                    throw TypeError(".BI.ValidateSessionTokenResponse.deletedMcEnterpriseIds: array expected");
                message.deletedMcEnterpriseIds = [];
                for (let i = 0; i < object.deletedMcEnterpriseIds.length; ++i)
                    message.deletedMcEnterpriseIds[i] = object.deletedMcEnterpriseIds[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a ValidateSessionTokenResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.ValidateSessionTokenResponse
         * @static
         * @param {BI.ValidateSessionTokenResponse} message ValidateSessionTokenResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidateSessionTokenResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.mcEnterpriseIds = [];
                object.deletedMcEnterpriseIds = [];
            }
            if (options.defaults) {
                object.username = "";
                object.userId = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.enterpriseUserId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.enterpriseUserId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.status = options.enums === String ? "VALID" : 0;
                object.statusMessage = "";
                object.hasMSPPermission = false;
            }
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                object.userId = message.userId;
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.enterpriseUserId = typeof message.enterpriseUserId === "number" ? BigInt(message.enterpriseUserId) : $util.Long.fromBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0, false).toBigInt();
                else if (typeof message.enterpriseUserId === "number")
                    object.enterpriseUserId = options.longs === String ? String(message.enterpriseUserId) : message.enterpriseUserId;
                else
                    object.enterpriseUserId = options.longs === String ? $util.Long.prototype.toString.call(message.enterpriseUserId) : options.longs === Number ? new $util.LongBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0).toNumber() : message.enterpriseUserId;
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = options.enums === String ? $root.BI.ValidateSessionTokenResponse.Status[message.status] === undefined ? message.status : $root.BI.ValidateSessionTokenResponse.Status[message.status] : message.status;
            if (message.statusMessage != null && Object.hasOwnProperty.call(message, "statusMessage"))
                object.statusMessage = message.statusMessage;
            if (message.mcEnterpriseIds && message.mcEnterpriseIds.length) {
                object.mcEnterpriseIds = [];
                for (let j = 0; j < message.mcEnterpriseIds.length; ++j)
                    object.mcEnterpriseIds[j] = message.mcEnterpriseIds[j];
            }
            if (message.hasMSPPermission != null && Object.hasOwnProperty.call(message, "hasMSPPermission"))
                object.hasMSPPermission = message.hasMSPPermission;
            if (message.deletedMcEnterpriseIds && message.deletedMcEnterpriseIds.length) {
                object.deletedMcEnterpriseIds = [];
                for (let j = 0; j < message.deletedMcEnterpriseIds.length; ++j)
                    object.deletedMcEnterpriseIds[j] = message.deletedMcEnterpriseIds[j];
            }
            return object;
        };

        /**
         * Converts this ValidateSessionTokenResponse to JSON.
         * @function toJSON
         * @memberof BI.ValidateSessionTokenResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidateSessionTokenResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidateSessionTokenResponse
         * @function getTypeUrl
         * @memberof BI.ValidateSessionTokenResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidateSessionTokenResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.ValidateSessionTokenResponse";
        };

        /**
         * Status enum.
         * @name BI.ValidateSessionTokenResponse.Status
         * @enum {number}
         * @property {number} VALID=0 VALID value
         * @property {number} NOT_VALID=1 NOT_VALID value
         * @property {number} EXPIRED=2 EXPIRED value
         * @property {number} IP_BLOCKED=3 IP_BLOCKED value
         * @property {number} INVALID_CLIENT_VERSION=4 INVALID_CLIENT_VERSION value
         */
        ValidateSessionTokenResponse.Status = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "VALID"] = 0;
            values[valuesById[1] = "NOT_VALID"] = 1;
            values[valuesById[2] = "EXPIRED"] = 2;
            values[valuesById[3] = "IP_BLOCKED"] = 3;
            values[valuesById[4] = "INVALID_CLIENT_VERSION"] = 4;
            return values;
        })();

        return ValidateSessionTokenResponse;
    })();

    BI.SubscriptionStatusRequest = (function() {

        /**
         * Properties of a SubscriptionStatusRequest.
         * @memberof BI
         * @interface ISubscriptionStatusRequest
         */

        /**
         * Constructs a new SubscriptionStatusRequest.
         * @memberof BI
         * @classdesc Represents a SubscriptionStatusRequest.
         * @implements ISubscriptionStatusRequest
         * @constructor
         * @param {BI.ISubscriptionStatusRequest=} [properties] Properties to set
         */
        function SubscriptionStatusRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SubscriptionStatusRequest instance using the specified properties.
         * @function create
         * @memberof BI.SubscriptionStatusRequest
         * @static
         * @param {BI.ISubscriptionStatusRequest=} [properties] Properties to set
         * @returns {BI.SubscriptionStatusRequest} SubscriptionStatusRequest instance
         */
        SubscriptionStatusRequest.create = function create(properties) {
            return new SubscriptionStatusRequest(properties);
        };

        /**
         * Encodes the specified SubscriptionStatusRequest message. Does not implicitly {@link BI.SubscriptionStatusRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.SubscriptionStatusRequest
         * @static
         * @param {BI.ISubscriptionStatusRequest} message SubscriptionStatusRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscriptionStatusRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a SubscriptionStatusRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SubscriptionStatusRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SubscriptionStatusRequest} SubscriptionStatusRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscriptionStatusRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SubscriptionStatusRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a SubscriptionStatusRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SubscriptionStatusRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SubscriptionStatusRequest} SubscriptionStatusRequest
         */
        SubscriptionStatusRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SubscriptionStatusRequest)
                return object;
            return new $root.BI.SubscriptionStatusRequest();
        };

        /**
         * Creates a plain object from a SubscriptionStatusRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SubscriptionStatusRequest
         * @static
         * @param {BI.SubscriptionStatusRequest} message SubscriptionStatusRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscriptionStatusRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SubscriptionStatusRequest to JSON.
         * @function toJSON
         * @memberof BI.SubscriptionStatusRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscriptionStatusRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubscriptionStatusRequest
         * @function getTypeUrl
         * @memberof BI.SubscriptionStatusRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubscriptionStatusRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SubscriptionStatusRequest";
        };

        return SubscriptionStatusRequest;
    })();

    BI.SubscriptionStatusResponse = (function() {

        /**
         * Properties of a SubscriptionStatusResponse.
         * @memberof BI
         * @interface ISubscriptionStatusResponse
         * @property {BI.IAutoRenewal|null} [autoRenewal] SubscriptionStatusResponse autoRenewal
         * @property {BI.IPaymentMethod|null} [currentPaymentMethod] SubscriptionStatusResponse currentPaymentMethod
         * @property {string|null} [checkoutLink] SubscriptionStatusResponse checkoutLink
         * @property {number|null} [licenseCreateDate] SubscriptionStatusResponse licenseCreateDate
         * @property {boolean|null} [isDistributor] SubscriptionStatusResponse isDistributor
         * @property {boolean|null} [isLegacyMsp] SubscriptionStatusResponse isLegacyMsp
         * @property {Array.<BI.ILicenseStats>|null} [licenseStats] SubscriptionStatusResponse licenseStats
         * @property {BI.GradientIntegrationStatus|null} [gradientStatus] SubscriptionStatusResponse gradientStatus
         * @property {boolean|null} [hideTrialBanner] SubscriptionStatusResponse hideTrialBanner
         * @property {string|null} [gradientLastSyncDate] SubscriptionStatusResponse gradientLastSyncDate
         * @property {string|null} [gradientNextSyncDate] SubscriptionStatusResponse gradientNextSyncDate
         * @property {boolean|null} [isGradientMappingPending] SubscriptionStatusResponse isGradientMappingPending
         * @property {BI.INhiBilling|null} [nhi] SubscriptionStatusResponse nhi
         * @property {number|null} [freeKsmApiCallsCount] SubscriptionStatusResponse freeKsmApiCallsCount
         * @property {BI.IKsmBilling|null} [ksm] SubscriptionStatusResponse ksm
         */

        /**
         * Constructs a new SubscriptionStatusResponse.
         * @memberof BI
         * @classdesc Represents a SubscriptionStatusResponse.
         * @implements ISubscriptionStatusResponse
         * @constructor
         * @param {BI.ISubscriptionStatusResponse=} [properties] Properties to set
         */
        function SubscriptionStatusResponse(properties) {
            this.licenseStats = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SubscriptionStatusResponse autoRenewal.
         * @member {BI.IAutoRenewal|null|undefined} autoRenewal
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.autoRenewal = null;

        /**
         * SubscriptionStatusResponse currentPaymentMethod.
         * @member {BI.IPaymentMethod|null|undefined} currentPaymentMethod
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.currentPaymentMethod = null;

        /**
         * SubscriptionStatusResponse checkoutLink.
         * @member {string} checkoutLink
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.checkoutLink = "";

        /**
         * SubscriptionStatusResponse licenseCreateDate.
         * @member {number} licenseCreateDate
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.licenseCreateDate = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SubscriptionStatusResponse isDistributor.
         * @member {boolean} isDistributor
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.isDistributor = false;

        /**
         * SubscriptionStatusResponse isLegacyMsp.
         * @member {boolean} isLegacyMsp
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.isLegacyMsp = false;

        /**
         * SubscriptionStatusResponse licenseStats.
         * @member {Array.<BI.ILicenseStats>} licenseStats
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.licenseStats = $util.emptyArray;

        /**
         * SubscriptionStatusResponse gradientStatus.
         * @member {BI.GradientIntegrationStatus} gradientStatus
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.gradientStatus = 0;

        /**
         * SubscriptionStatusResponse hideTrialBanner.
         * @member {boolean} hideTrialBanner
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.hideTrialBanner = false;

        /**
         * SubscriptionStatusResponse gradientLastSyncDate.
         * @member {string} gradientLastSyncDate
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.gradientLastSyncDate = "";

        /**
         * SubscriptionStatusResponse gradientNextSyncDate.
         * @member {string} gradientNextSyncDate
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.gradientNextSyncDate = "";

        /**
         * SubscriptionStatusResponse isGradientMappingPending.
         * @member {boolean} isGradientMappingPending
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.isGradientMappingPending = false;

        /**
         * SubscriptionStatusResponse nhi.
         * @member {BI.INhiBilling|null|undefined} nhi
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.nhi = null;

        /**
         * SubscriptionStatusResponse freeKsmApiCallsCount.
         * @member {number} freeKsmApiCallsCount
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.freeKsmApiCallsCount = 0;

        /**
         * SubscriptionStatusResponse ksm.
         * @member {BI.IKsmBilling|null|undefined} ksm
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         */
        SubscriptionStatusResponse.prototype.ksm = null;

        /**
         * Creates a new SubscriptionStatusResponse instance using the specified properties.
         * @function create
         * @memberof BI.SubscriptionStatusResponse
         * @static
         * @param {BI.ISubscriptionStatusResponse=} [properties] Properties to set
         * @returns {BI.SubscriptionStatusResponse} SubscriptionStatusResponse instance
         */
        SubscriptionStatusResponse.create = function create(properties) {
            return new SubscriptionStatusResponse(properties);
        };

        /**
         * Encodes the specified SubscriptionStatusResponse message. Does not implicitly {@link BI.SubscriptionStatusResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.SubscriptionStatusResponse
         * @static
         * @param {BI.ISubscriptionStatusResponse} message SubscriptionStatusResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscriptionStatusResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.autoRenewal != null && Object.hasOwnProperty.call(message, "autoRenewal"))
                $root.BI.AutoRenewal.encode(message.autoRenewal, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.currentPaymentMethod != null && Object.hasOwnProperty.call(message, "currentPaymentMethod"))
                $root.BI.PaymentMethod.encode(message.currentPaymentMethod, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.checkoutLink != null && Object.hasOwnProperty.call(message, "checkoutLink"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.checkoutLink);
            if (message.licenseCreateDate != null && Object.hasOwnProperty.call(message, "licenseCreateDate"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.licenseCreateDate);
            if (message.isDistributor != null && Object.hasOwnProperty.call(message, "isDistributor"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isDistributor);
            if (message.isLegacyMsp != null && Object.hasOwnProperty.call(message, "isLegacyMsp"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isLegacyMsp);
            if (message.licenseStats != null && message.licenseStats.length)
                for (let i = 0; i < message.licenseStats.length; ++i)
                    $root.BI.LicenseStats.encode(message.licenseStats[i], writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            if (message.gradientStatus != null && Object.hasOwnProperty.call(message, "gradientStatus"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.gradientStatus);
            if (message.hideTrialBanner != null && Object.hasOwnProperty.call(message, "hideTrialBanner"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.hideTrialBanner);
            if (message.gradientLastSyncDate != null && Object.hasOwnProperty.call(message, "gradientLastSyncDate"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.gradientLastSyncDate);
            if (message.gradientNextSyncDate != null && Object.hasOwnProperty.call(message, "gradientNextSyncDate"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.gradientNextSyncDate);
            if (message.isGradientMappingPending != null && Object.hasOwnProperty.call(message, "isGradientMappingPending"))
                writer.uint32(/* id 13, wireType 0 =*/104).bool(message.isGradientMappingPending);
            if (message.nhi != null && Object.hasOwnProperty.call(message, "nhi"))
                $root.BI.NhiBilling.encode(message.nhi, writer.uint32(/* id 14, wireType 2 =*/114).fork(), q + 1).ldelim();
            if (message.freeKsmApiCallsCount != null && Object.hasOwnProperty.call(message, "freeKsmApiCallsCount"))
                writer.uint32(/* id 15, wireType 0 =*/120).int32(message.freeKsmApiCallsCount);
            if (message.ksm != null && Object.hasOwnProperty.call(message, "ksm"))
                $root.BI.KsmBilling.encode(message.ksm, writer.uint32(/* id 16, wireType 2 =*/130).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SubscriptionStatusResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SubscriptionStatusResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SubscriptionStatusResponse} SubscriptionStatusResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscriptionStatusResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SubscriptionStatusResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.autoRenewal = $root.BI.AutoRenewal.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        message.currentPaymentMethod = $root.BI.PaymentMethod.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.checkoutLink = reader.string();
                        break;
                    }
                case 4: {
                        message.licenseCreateDate = reader.int64();
                        break;
                    }
                case 5: {
                        message.isDistributor = reader.bool();
                        break;
                    }
                case 6: {
                        message.isLegacyMsp = reader.bool();
                        break;
                    }
                case 8: {
                        if (!(message.licenseStats && message.licenseStats.length))
                            message.licenseStats = [];
                        message.licenseStats.push($root.BI.LicenseStats.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 9: {
                        message.gradientStatus = reader.int32();
                        break;
                    }
                case 10: {
                        message.hideTrialBanner = reader.bool();
                        break;
                    }
                case 11: {
                        message.gradientLastSyncDate = reader.string();
                        break;
                    }
                case 12: {
                        message.gradientNextSyncDate = reader.string();
                        break;
                    }
                case 13: {
                        message.isGradientMappingPending = reader.bool();
                        break;
                    }
                case 14: {
                        message.nhi = $root.BI.NhiBilling.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 15: {
                        message.freeKsmApiCallsCount = reader.int32();
                        break;
                    }
                case 16: {
                        message.ksm = $root.BI.KsmBilling.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates a SubscriptionStatusResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SubscriptionStatusResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SubscriptionStatusResponse} SubscriptionStatusResponse
         */
        SubscriptionStatusResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SubscriptionStatusResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.SubscriptionStatusResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.SubscriptionStatusResponse();
            if (object.autoRenewal != null) {
                if (!$util.isObject(object.autoRenewal))
                    throw TypeError(".BI.SubscriptionStatusResponse.autoRenewal: object expected");
                message.autoRenewal = $root.BI.AutoRenewal.fromObject(object.autoRenewal, long + 1);
            }
            if (object.currentPaymentMethod != null) {
                if (!$util.isObject(object.currentPaymentMethod))
                    throw TypeError(".BI.SubscriptionStatusResponse.currentPaymentMethod: object expected");
                message.currentPaymentMethod = $root.BI.PaymentMethod.fromObject(object.currentPaymentMethod, long + 1);
            }
            if (object.checkoutLink != null)
                message.checkoutLink = String(object.checkoutLink);
            if (object.licenseCreateDate != null)
                if ($util.Long)
                    message.licenseCreateDate = $util.Long.fromValue(object.licenseCreateDate, false);
                else if (typeof object.licenseCreateDate === "string")
                    message.licenseCreateDate = parseInt(object.licenseCreateDate, 10);
                else if (typeof object.licenseCreateDate === "number")
                    message.licenseCreateDate = object.licenseCreateDate;
                else if (typeof object.licenseCreateDate === "object")
                    message.licenseCreateDate = new $util.LongBits(object.licenseCreateDate.low >>> 0, object.licenseCreateDate.high >>> 0).toNumber();
            if (object.isDistributor != null)
                message.isDistributor = Boolean(object.isDistributor);
            if (object.isLegacyMsp != null)
                message.isLegacyMsp = Boolean(object.isLegacyMsp);
            if (object.licenseStats) {
                if (!Array.isArray(object.licenseStats))
                    throw TypeError(".BI.SubscriptionStatusResponse.licenseStats: array expected");
                message.licenseStats = [];
                for (let i = 0; i < object.licenseStats.length; ++i) {
                    if (!$util.isObject(object.licenseStats[i]))
                        throw TypeError(".BI.SubscriptionStatusResponse.licenseStats: object expected");
                    message.licenseStats[i] = $root.BI.LicenseStats.fromObject(object.licenseStats[i], long + 1);
                }
            }
            switch (object.gradientStatus) {
            default:
                if (typeof object.gradientStatus === "number") {
                    message.gradientStatus = object.gradientStatus;
                    break;
                }
                break;
            case "NOTCONNECTED":
            case 0:
                message.gradientStatus = 0;
                break;
            case "PENDING":
            case 1:
                message.gradientStatus = 1;
                break;
            case "CONNECTED":
            case 2:
                message.gradientStatus = 2;
                break;
            case "NONE":
            case 3:
                message.gradientStatus = 3;
                break;
            }
            if (object.hideTrialBanner != null)
                message.hideTrialBanner = Boolean(object.hideTrialBanner);
            if (object.gradientLastSyncDate != null)
                message.gradientLastSyncDate = String(object.gradientLastSyncDate);
            if (object.gradientNextSyncDate != null)
                message.gradientNextSyncDate = String(object.gradientNextSyncDate);
            if (object.isGradientMappingPending != null)
                message.isGradientMappingPending = Boolean(object.isGradientMappingPending);
            if (object.nhi != null) {
                if (!$util.isObject(object.nhi))
                    throw TypeError(".BI.SubscriptionStatusResponse.nhi: object expected");
                message.nhi = $root.BI.NhiBilling.fromObject(object.nhi, long + 1);
            }
            if (object.freeKsmApiCallsCount != null)
                message.freeKsmApiCallsCount = object.freeKsmApiCallsCount | 0;
            if (object.ksm != null) {
                if (!$util.isObject(object.ksm))
                    throw TypeError(".BI.SubscriptionStatusResponse.ksm: object expected");
                message.ksm = $root.BI.KsmBilling.fromObject(object.ksm, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a SubscriptionStatusResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SubscriptionStatusResponse
         * @static
         * @param {BI.SubscriptionStatusResponse} message SubscriptionStatusResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscriptionStatusResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.licenseStats = [];
            if (options.defaults) {
                object.autoRenewal = null;
                object.currentPaymentMethod = null;
                object.checkoutLink = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.licenseCreateDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.licenseCreateDate = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.isDistributor = false;
                object.isLegacyMsp = false;
                object.gradientStatus = options.enums === String ? "NOTCONNECTED" : 0;
                object.hideTrialBanner = false;
                object.gradientLastSyncDate = "";
                object.gradientNextSyncDate = "";
                object.isGradientMappingPending = false;
                object.nhi = null;
                object.freeKsmApiCallsCount = 0;
                object.ksm = null;
            }
            if (message.autoRenewal != null && Object.hasOwnProperty.call(message, "autoRenewal"))
                object.autoRenewal = $root.BI.AutoRenewal.toObject(message.autoRenewal, options, q + 1);
            if (message.currentPaymentMethod != null && Object.hasOwnProperty.call(message, "currentPaymentMethod"))
                object.currentPaymentMethod = $root.BI.PaymentMethod.toObject(message.currentPaymentMethod, options, q + 1);
            if (message.checkoutLink != null && Object.hasOwnProperty.call(message, "checkoutLink"))
                object.checkoutLink = message.checkoutLink;
            if (message.licenseCreateDate != null && Object.hasOwnProperty.call(message, "licenseCreateDate"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.licenseCreateDate = typeof message.licenseCreateDate === "number" ? BigInt(message.licenseCreateDate) : $util.Long.fromBits(message.licenseCreateDate.low >>> 0, message.licenseCreateDate.high >>> 0, false).toBigInt();
                else if (typeof message.licenseCreateDate === "number")
                    object.licenseCreateDate = options.longs === String ? String(message.licenseCreateDate) : message.licenseCreateDate;
                else
                    object.licenseCreateDate = options.longs === String ? $util.Long.prototype.toString.call(message.licenseCreateDate) : options.longs === Number ? new $util.LongBits(message.licenseCreateDate.low >>> 0, message.licenseCreateDate.high >>> 0).toNumber() : message.licenseCreateDate;
            if (message.isDistributor != null && Object.hasOwnProperty.call(message, "isDistributor"))
                object.isDistributor = message.isDistributor;
            if (message.isLegacyMsp != null && Object.hasOwnProperty.call(message, "isLegacyMsp"))
                object.isLegacyMsp = message.isLegacyMsp;
            if (message.licenseStats && message.licenseStats.length) {
                object.licenseStats = [];
                for (let j = 0; j < message.licenseStats.length; ++j)
                    object.licenseStats[j] = $root.BI.LicenseStats.toObject(message.licenseStats[j], options, q + 1);
            }
            if (message.gradientStatus != null && Object.hasOwnProperty.call(message, "gradientStatus"))
                object.gradientStatus = options.enums === String ? $root.BI.GradientIntegrationStatus[message.gradientStatus] === undefined ? message.gradientStatus : $root.BI.GradientIntegrationStatus[message.gradientStatus] : message.gradientStatus;
            if (message.hideTrialBanner != null && Object.hasOwnProperty.call(message, "hideTrialBanner"))
                object.hideTrialBanner = message.hideTrialBanner;
            if (message.gradientLastSyncDate != null && Object.hasOwnProperty.call(message, "gradientLastSyncDate"))
                object.gradientLastSyncDate = message.gradientLastSyncDate;
            if (message.gradientNextSyncDate != null && Object.hasOwnProperty.call(message, "gradientNextSyncDate"))
                object.gradientNextSyncDate = message.gradientNextSyncDate;
            if (message.isGradientMappingPending != null && Object.hasOwnProperty.call(message, "isGradientMappingPending"))
                object.isGradientMappingPending = message.isGradientMappingPending;
            if (message.nhi != null && Object.hasOwnProperty.call(message, "nhi"))
                object.nhi = $root.BI.NhiBilling.toObject(message.nhi, options, q + 1);
            if (message.freeKsmApiCallsCount != null && Object.hasOwnProperty.call(message, "freeKsmApiCallsCount"))
                object.freeKsmApiCallsCount = message.freeKsmApiCallsCount;
            if (message.ksm != null && Object.hasOwnProperty.call(message, "ksm"))
                object.ksm = $root.BI.KsmBilling.toObject(message.ksm, options, q + 1);
            return object;
        };

        /**
         * Converts this SubscriptionStatusResponse to JSON.
         * @function toJSON
         * @memberof BI.SubscriptionStatusResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscriptionStatusResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubscriptionStatusResponse
         * @function getTypeUrl
         * @memberof BI.SubscriptionStatusResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubscriptionStatusResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SubscriptionStatusResponse";
        };

        return SubscriptionStatusResponse;
    })();

    BI.KsmBilling = (function() {

        /**
         * Properties of a KsmBilling.
         * @memberof BI
         * @interface IKsmBilling
         * @property {number|null} [billingStartTimestamp] KsmBilling billingStartTimestamp
         * @property {number|null} [billingEndTimestamp] KsmBilling billingEndTimestamp
         * @property {number|null} [currentTierId] KsmBilling currentTierId
         * @property {number|null} [enterpriseBlocks] KsmBilling enterpriseBlocks
         * @property {number|null} [currentTierCeiling] KsmBilling currentTierCeiling
         */

        /**
         * Constructs a new KsmBilling.
         * @memberof BI
         * @classdesc Represents a KsmBilling.
         * @implements IKsmBilling
         * @constructor
         * @param {BI.IKsmBilling=} [properties] Properties to set
         */
        function KsmBilling(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KsmBilling billingStartTimestamp.
         * @member {number} billingStartTimestamp
         * @memberof BI.KsmBilling
         * @instance
         */
        KsmBilling.prototype.billingStartTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * KsmBilling billingEndTimestamp.
         * @member {number} billingEndTimestamp
         * @memberof BI.KsmBilling
         * @instance
         */
        KsmBilling.prototype.billingEndTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * KsmBilling currentTierId.
         * @member {number} currentTierId
         * @memberof BI.KsmBilling
         * @instance
         */
        KsmBilling.prototype.currentTierId = 0;

        /**
         * KsmBilling enterpriseBlocks.
         * @member {number} enterpriseBlocks
         * @memberof BI.KsmBilling
         * @instance
         */
        KsmBilling.prototype.enterpriseBlocks = 0;

        /**
         * KsmBilling currentTierCeiling.
         * @member {number} currentTierCeiling
         * @memberof BI.KsmBilling
         * @instance
         */
        KsmBilling.prototype.currentTierCeiling = 0;

        /**
         * Creates a new KsmBilling instance using the specified properties.
         * @function create
         * @memberof BI.KsmBilling
         * @static
         * @param {BI.IKsmBilling=} [properties] Properties to set
         * @returns {BI.KsmBilling} KsmBilling instance
         */
        KsmBilling.create = function create(properties) {
            return new KsmBilling(properties);
        };

        /**
         * Encodes the specified KsmBilling message. Does not implicitly {@link BI.KsmBilling.verify|verify} messages.
         * @function encode
         * @memberof BI.KsmBilling
         * @static
         * @param {BI.IKsmBilling} message KsmBilling message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KsmBilling.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.billingStartTimestamp != null && Object.hasOwnProperty.call(message, "billingStartTimestamp"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.billingStartTimestamp);
            if (message.billingEndTimestamp != null && Object.hasOwnProperty.call(message, "billingEndTimestamp"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.billingEndTimestamp);
            if (message.currentTierId != null && Object.hasOwnProperty.call(message, "currentTierId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.currentTierId);
            if (message.enterpriseBlocks != null && Object.hasOwnProperty.call(message, "enterpriseBlocks"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.enterpriseBlocks);
            if (message.currentTierCeiling != null && Object.hasOwnProperty.call(message, "currentTierCeiling"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.currentTierCeiling);
            return writer;
        };

        /**
         * Decodes a KsmBilling message from the specified reader or buffer.
         * @function decode
         * @memberof BI.KsmBilling
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.KsmBilling} KsmBilling
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KsmBilling.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.KsmBilling();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.billingStartTimestamp = reader.int64();
                        break;
                    }
                case 2: {
                        message.billingEndTimestamp = reader.int64();
                        break;
                    }
                case 3: {
                        message.currentTierId = reader.int32();
                        break;
                    }
                case 4: {
                        message.enterpriseBlocks = reader.int32();
                        break;
                    }
                case 5: {
                        message.currentTierCeiling = reader.int32();
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
         * Creates a KsmBilling message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.KsmBilling
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.KsmBilling} KsmBilling
         */
        KsmBilling.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.KsmBilling)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.KsmBilling: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.KsmBilling();
            if (object.billingStartTimestamp != null)
                if ($util.Long)
                    message.billingStartTimestamp = $util.Long.fromValue(object.billingStartTimestamp, false);
                else if (typeof object.billingStartTimestamp === "string")
                    message.billingStartTimestamp = parseInt(object.billingStartTimestamp, 10);
                else if (typeof object.billingStartTimestamp === "number")
                    message.billingStartTimestamp = object.billingStartTimestamp;
                else if (typeof object.billingStartTimestamp === "object")
                    message.billingStartTimestamp = new $util.LongBits(object.billingStartTimestamp.low >>> 0, object.billingStartTimestamp.high >>> 0).toNumber();
            if (object.billingEndTimestamp != null)
                if ($util.Long)
                    message.billingEndTimestamp = $util.Long.fromValue(object.billingEndTimestamp, false);
                else if (typeof object.billingEndTimestamp === "string")
                    message.billingEndTimestamp = parseInt(object.billingEndTimestamp, 10);
                else if (typeof object.billingEndTimestamp === "number")
                    message.billingEndTimestamp = object.billingEndTimestamp;
                else if (typeof object.billingEndTimestamp === "object")
                    message.billingEndTimestamp = new $util.LongBits(object.billingEndTimestamp.low >>> 0, object.billingEndTimestamp.high >>> 0).toNumber();
            if (object.currentTierId != null)
                message.currentTierId = object.currentTierId | 0;
            if (object.enterpriseBlocks != null)
                message.enterpriseBlocks = object.enterpriseBlocks | 0;
            if (object.currentTierCeiling != null)
                message.currentTierCeiling = object.currentTierCeiling | 0;
            return message;
        };

        /**
         * Creates a plain object from a KsmBilling message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.KsmBilling
         * @static
         * @param {BI.KsmBilling} message KsmBilling
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KsmBilling.toObject = function toObject(message, options, q) {
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
                    object.billingStartTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.billingStartTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.billingEndTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.billingEndTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.currentTierId = 0;
                object.enterpriseBlocks = 0;
                object.currentTierCeiling = 0;
            }
            if (message.billingStartTimestamp != null && Object.hasOwnProperty.call(message, "billingStartTimestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.billingStartTimestamp = typeof message.billingStartTimestamp === "number" ? BigInt(message.billingStartTimestamp) : $util.Long.fromBits(message.billingStartTimestamp.low >>> 0, message.billingStartTimestamp.high >>> 0, false).toBigInt();
                else if (typeof message.billingStartTimestamp === "number")
                    object.billingStartTimestamp = options.longs === String ? String(message.billingStartTimestamp) : message.billingStartTimestamp;
                else
                    object.billingStartTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.billingStartTimestamp) : options.longs === Number ? new $util.LongBits(message.billingStartTimestamp.low >>> 0, message.billingStartTimestamp.high >>> 0).toNumber() : message.billingStartTimestamp;
            if (message.billingEndTimestamp != null && Object.hasOwnProperty.call(message, "billingEndTimestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.billingEndTimestamp = typeof message.billingEndTimestamp === "number" ? BigInt(message.billingEndTimestamp) : $util.Long.fromBits(message.billingEndTimestamp.low >>> 0, message.billingEndTimestamp.high >>> 0, false).toBigInt();
                else if (typeof message.billingEndTimestamp === "number")
                    object.billingEndTimestamp = options.longs === String ? String(message.billingEndTimestamp) : message.billingEndTimestamp;
                else
                    object.billingEndTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.billingEndTimestamp) : options.longs === Number ? new $util.LongBits(message.billingEndTimestamp.low >>> 0, message.billingEndTimestamp.high >>> 0).toNumber() : message.billingEndTimestamp;
            if (message.currentTierId != null && Object.hasOwnProperty.call(message, "currentTierId"))
                object.currentTierId = message.currentTierId;
            if (message.enterpriseBlocks != null && Object.hasOwnProperty.call(message, "enterpriseBlocks"))
                object.enterpriseBlocks = message.enterpriseBlocks;
            if (message.currentTierCeiling != null && Object.hasOwnProperty.call(message, "currentTierCeiling"))
                object.currentTierCeiling = message.currentTierCeiling;
            return object;
        };

        /**
         * Converts this KsmBilling to JSON.
         * @function toJSON
         * @memberof BI.KsmBilling
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KsmBilling.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KsmBilling
         * @function getTypeUrl
         * @memberof BI.KsmBilling
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KsmBilling.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.KsmBilling";
        };

        return KsmBilling;
    })();

    BI.NhiBilling = (function() {

        /**
         * Properties of a NhiBilling.
         * @memberof BI
         * @interface INhiBilling
         * @property {number|null} [billingStartTimestamp] NhiBilling billingStartTimestamp
         * @property {number|null} [billingEndTimestamp] NhiBilling billingEndTimestamp
         * @property {number|null} [currentTierId] NhiBilling currentTierId
         * @property {number|null} [enterpriseBlocks] NhiBilling enterpriseBlocks
         * @property {number|null} [currentTierCeiling] NhiBilling currentTierCeiling
         * @property {Array.<BI.INhiBillingPeriod>|null} [billingPeriods] NhiBilling billingPeriods
         */

        /**
         * Constructs a new NhiBilling.
         * @memberof BI
         * @classdesc Represents a NhiBilling.
         * @implements INhiBilling
         * @constructor
         * @param {BI.INhiBilling=} [properties] Properties to set
         */
        function NhiBilling(properties) {
            this.billingPeriods = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NhiBilling billingStartTimestamp.
         * @member {number} billingStartTimestamp
         * @memberof BI.NhiBilling
         * @instance
         */
        NhiBilling.prototype.billingStartTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NhiBilling billingEndTimestamp.
         * @member {number} billingEndTimestamp
         * @memberof BI.NhiBilling
         * @instance
         */
        NhiBilling.prototype.billingEndTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NhiBilling currentTierId.
         * @member {number} currentTierId
         * @memberof BI.NhiBilling
         * @instance
         */
        NhiBilling.prototype.currentTierId = 0;

        /**
         * NhiBilling enterpriseBlocks.
         * @member {number} enterpriseBlocks
         * @memberof BI.NhiBilling
         * @instance
         */
        NhiBilling.prototype.enterpriseBlocks = 0;

        /**
         * NhiBilling currentTierCeiling.
         * @member {number} currentTierCeiling
         * @memberof BI.NhiBilling
         * @instance
         */
        NhiBilling.prototype.currentTierCeiling = 0;

        /**
         * NhiBilling billingPeriods.
         * @member {Array.<BI.INhiBillingPeriod>} billingPeriods
         * @memberof BI.NhiBilling
         * @instance
         */
        NhiBilling.prototype.billingPeriods = $util.emptyArray;

        /**
         * Creates a new NhiBilling instance using the specified properties.
         * @function create
         * @memberof BI.NhiBilling
         * @static
         * @param {BI.INhiBilling=} [properties] Properties to set
         * @returns {BI.NhiBilling} NhiBilling instance
         */
        NhiBilling.create = function create(properties) {
            return new NhiBilling(properties);
        };

        /**
         * Encodes the specified NhiBilling message. Does not implicitly {@link BI.NhiBilling.verify|verify} messages.
         * @function encode
         * @memberof BI.NhiBilling
         * @static
         * @param {BI.INhiBilling} message NhiBilling message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NhiBilling.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.billingStartTimestamp != null && Object.hasOwnProperty.call(message, "billingStartTimestamp"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.billingStartTimestamp);
            if (message.billingEndTimestamp != null && Object.hasOwnProperty.call(message, "billingEndTimestamp"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.billingEndTimestamp);
            if (message.currentTierId != null && Object.hasOwnProperty.call(message, "currentTierId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.currentTierId);
            if (message.enterpriseBlocks != null && Object.hasOwnProperty.call(message, "enterpriseBlocks"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.enterpriseBlocks);
            if (message.currentTierCeiling != null && Object.hasOwnProperty.call(message, "currentTierCeiling"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.currentTierCeiling);
            if (message.billingPeriods != null && message.billingPeriods.length)
                for (let i = 0; i < message.billingPeriods.length; ++i)
                    $root.BI.NhiBillingPeriod.encode(message.billingPeriods[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a NhiBilling message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NhiBilling
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NhiBilling} NhiBilling
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NhiBilling.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NhiBilling();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.billingStartTimestamp = reader.int64();
                        break;
                    }
                case 2: {
                        message.billingEndTimestamp = reader.int64();
                        break;
                    }
                case 3: {
                        message.currentTierId = reader.int32();
                        break;
                    }
                case 4: {
                        message.enterpriseBlocks = reader.int32();
                        break;
                    }
                case 5: {
                        message.currentTierCeiling = reader.int32();
                        break;
                    }
                case 6: {
                        if (!(message.billingPeriods && message.billingPeriods.length))
                            message.billingPeriods = [];
                        message.billingPeriods.push($root.BI.NhiBillingPeriod.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a NhiBilling message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.NhiBilling
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NhiBilling} NhiBilling
         */
        NhiBilling.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NhiBilling)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.NhiBilling: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.NhiBilling();
            if (object.billingStartTimestamp != null)
                if ($util.Long)
                    message.billingStartTimestamp = $util.Long.fromValue(object.billingStartTimestamp, false);
                else if (typeof object.billingStartTimestamp === "string")
                    message.billingStartTimestamp = parseInt(object.billingStartTimestamp, 10);
                else if (typeof object.billingStartTimestamp === "number")
                    message.billingStartTimestamp = object.billingStartTimestamp;
                else if (typeof object.billingStartTimestamp === "object")
                    message.billingStartTimestamp = new $util.LongBits(object.billingStartTimestamp.low >>> 0, object.billingStartTimestamp.high >>> 0).toNumber();
            if (object.billingEndTimestamp != null)
                if ($util.Long)
                    message.billingEndTimestamp = $util.Long.fromValue(object.billingEndTimestamp, false);
                else if (typeof object.billingEndTimestamp === "string")
                    message.billingEndTimestamp = parseInt(object.billingEndTimestamp, 10);
                else if (typeof object.billingEndTimestamp === "number")
                    message.billingEndTimestamp = object.billingEndTimestamp;
                else if (typeof object.billingEndTimestamp === "object")
                    message.billingEndTimestamp = new $util.LongBits(object.billingEndTimestamp.low >>> 0, object.billingEndTimestamp.high >>> 0).toNumber();
            if (object.currentTierId != null)
                message.currentTierId = object.currentTierId | 0;
            if (object.enterpriseBlocks != null)
                message.enterpriseBlocks = object.enterpriseBlocks | 0;
            if (object.currentTierCeiling != null)
                message.currentTierCeiling = object.currentTierCeiling | 0;
            if (object.billingPeriods) {
                if (!Array.isArray(object.billingPeriods))
                    throw TypeError(".BI.NhiBilling.billingPeriods: array expected");
                message.billingPeriods = [];
                for (let i = 0; i < object.billingPeriods.length; ++i) {
                    if (!$util.isObject(object.billingPeriods[i]))
                        throw TypeError(".BI.NhiBilling.billingPeriods: object expected");
                    message.billingPeriods[i] = $root.BI.NhiBillingPeriod.fromObject(object.billingPeriods[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a NhiBilling message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NhiBilling
         * @static
         * @param {BI.NhiBilling} message NhiBilling
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NhiBilling.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.billingPeriods = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.billingStartTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.billingStartTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.billingEndTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.billingEndTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.currentTierId = 0;
                object.enterpriseBlocks = 0;
                object.currentTierCeiling = 0;
            }
            if (message.billingStartTimestamp != null && Object.hasOwnProperty.call(message, "billingStartTimestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.billingStartTimestamp = typeof message.billingStartTimestamp === "number" ? BigInt(message.billingStartTimestamp) : $util.Long.fromBits(message.billingStartTimestamp.low >>> 0, message.billingStartTimestamp.high >>> 0, false).toBigInt();
                else if (typeof message.billingStartTimestamp === "number")
                    object.billingStartTimestamp = options.longs === String ? String(message.billingStartTimestamp) : message.billingStartTimestamp;
                else
                    object.billingStartTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.billingStartTimestamp) : options.longs === Number ? new $util.LongBits(message.billingStartTimestamp.low >>> 0, message.billingStartTimestamp.high >>> 0).toNumber() : message.billingStartTimestamp;
            if (message.billingEndTimestamp != null && Object.hasOwnProperty.call(message, "billingEndTimestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.billingEndTimestamp = typeof message.billingEndTimestamp === "number" ? BigInt(message.billingEndTimestamp) : $util.Long.fromBits(message.billingEndTimestamp.low >>> 0, message.billingEndTimestamp.high >>> 0, false).toBigInt();
                else if (typeof message.billingEndTimestamp === "number")
                    object.billingEndTimestamp = options.longs === String ? String(message.billingEndTimestamp) : message.billingEndTimestamp;
                else
                    object.billingEndTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.billingEndTimestamp) : options.longs === Number ? new $util.LongBits(message.billingEndTimestamp.low >>> 0, message.billingEndTimestamp.high >>> 0).toNumber() : message.billingEndTimestamp;
            if (message.currentTierId != null && Object.hasOwnProperty.call(message, "currentTierId"))
                object.currentTierId = message.currentTierId;
            if (message.enterpriseBlocks != null && Object.hasOwnProperty.call(message, "enterpriseBlocks"))
                object.enterpriseBlocks = message.enterpriseBlocks;
            if (message.currentTierCeiling != null && Object.hasOwnProperty.call(message, "currentTierCeiling"))
                object.currentTierCeiling = message.currentTierCeiling;
            if (message.billingPeriods && message.billingPeriods.length) {
                object.billingPeriods = [];
                for (let j = 0; j < message.billingPeriods.length; ++j)
                    object.billingPeriods[j] = $root.BI.NhiBillingPeriod.toObject(message.billingPeriods[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this NhiBilling to JSON.
         * @function toJSON
         * @memberof BI.NhiBilling
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NhiBilling.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NhiBilling
         * @function getTypeUrl
         * @memberof BI.NhiBilling
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NhiBilling.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NhiBilling";
        };

        return NhiBilling;
    })();

    BI.NhiBillingPeriod = (function() {

        /**
         * Properties of a NhiBillingPeriod.
         * @memberof BI
         * @interface INhiBillingPeriod
         * @property {number|null} [startTimestamp] NhiBillingPeriod startTimestamp
         * @property {number|null} [endTimestamp] NhiBillingPeriod endTimestamp
         */

        /**
         * Constructs a new NhiBillingPeriod.
         * @memberof BI
         * @classdesc Represents a NhiBillingPeriod.
         * @implements INhiBillingPeriod
         * @constructor
         * @param {BI.INhiBillingPeriod=} [properties] Properties to set
         */
        function NhiBillingPeriod(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NhiBillingPeriod startTimestamp.
         * @member {number} startTimestamp
         * @memberof BI.NhiBillingPeriod
         * @instance
         */
        NhiBillingPeriod.prototype.startTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NhiBillingPeriod endTimestamp.
         * @member {number} endTimestamp
         * @memberof BI.NhiBillingPeriod
         * @instance
         */
        NhiBillingPeriod.prototype.endTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new NhiBillingPeriod instance using the specified properties.
         * @function create
         * @memberof BI.NhiBillingPeriod
         * @static
         * @param {BI.INhiBillingPeriod=} [properties] Properties to set
         * @returns {BI.NhiBillingPeriod} NhiBillingPeriod instance
         */
        NhiBillingPeriod.create = function create(properties) {
            return new NhiBillingPeriod(properties);
        };

        /**
         * Encodes the specified NhiBillingPeriod message. Does not implicitly {@link BI.NhiBillingPeriod.verify|verify} messages.
         * @function encode
         * @memberof BI.NhiBillingPeriod
         * @static
         * @param {BI.INhiBillingPeriod} message NhiBillingPeriod message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NhiBillingPeriod.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.startTimestamp != null && Object.hasOwnProperty.call(message, "startTimestamp"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.startTimestamp);
            if (message.endTimestamp != null && Object.hasOwnProperty.call(message, "endTimestamp"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.endTimestamp);
            return writer;
        };

        /**
         * Decodes a NhiBillingPeriod message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NhiBillingPeriod
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NhiBillingPeriod} NhiBillingPeriod
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NhiBillingPeriod.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NhiBillingPeriod();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.startTimestamp = reader.int64();
                        break;
                    }
                case 2: {
                        message.endTimestamp = reader.int64();
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
         * Creates a NhiBillingPeriod message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.NhiBillingPeriod
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NhiBillingPeriod} NhiBillingPeriod
         */
        NhiBillingPeriod.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NhiBillingPeriod)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.NhiBillingPeriod: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.NhiBillingPeriod();
            if (object.startTimestamp != null)
                if ($util.Long)
                    message.startTimestamp = $util.Long.fromValue(object.startTimestamp, false);
                else if (typeof object.startTimestamp === "string")
                    message.startTimestamp = parseInt(object.startTimestamp, 10);
                else if (typeof object.startTimestamp === "number")
                    message.startTimestamp = object.startTimestamp;
                else if (typeof object.startTimestamp === "object")
                    message.startTimestamp = new $util.LongBits(object.startTimestamp.low >>> 0, object.startTimestamp.high >>> 0).toNumber();
            if (object.endTimestamp != null)
                if ($util.Long)
                    message.endTimestamp = $util.Long.fromValue(object.endTimestamp, false);
                else if (typeof object.endTimestamp === "string")
                    message.endTimestamp = parseInt(object.endTimestamp, 10);
                else if (typeof object.endTimestamp === "number")
                    message.endTimestamp = object.endTimestamp;
                else if (typeof object.endTimestamp === "object")
                    message.endTimestamp = new $util.LongBits(object.endTimestamp.low >>> 0, object.endTimestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a NhiBillingPeriod message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NhiBillingPeriod
         * @static
         * @param {BI.NhiBillingPeriod} message NhiBillingPeriod
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NhiBillingPeriod.toObject = function toObject(message, options, q) {
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
                    object.startTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.startTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.endTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.endTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.startTimestamp != null && Object.hasOwnProperty.call(message, "startTimestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.startTimestamp = typeof message.startTimestamp === "number" ? BigInt(message.startTimestamp) : $util.Long.fromBits(message.startTimestamp.low >>> 0, message.startTimestamp.high >>> 0, false).toBigInt();
                else if (typeof message.startTimestamp === "number")
                    object.startTimestamp = options.longs === String ? String(message.startTimestamp) : message.startTimestamp;
                else
                    object.startTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.startTimestamp) : options.longs === Number ? new $util.LongBits(message.startTimestamp.low >>> 0, message.startTimestamp.high >>> 0).toNumber() : message.startTimestamp;
            if (message.endTimestamp != null && Object.hasOwnProperty.call(message, "endTimestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.endTimestamp = typeof message.endTimestamp === "number" ? BigInt(message.endTimestamp) : $util.Long.fromBits(message.endTimestamp.low >>> 0, message.endTimestamp.high >>> 0, false).toBigInt();
                else if (typeof message.endTimestamp === "number")
                    object.endTimestamp = options.longs === String ? String(message.endTimestamp) : message.endTimestamp;
                else
                    object.endTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.endTimestamp) : options.longs === Number ? new $util.LongBits(message.endTimestamp.low >>> 0, message.endTimestamp.high >>> 0).toNumber() : message.endTimestamp;
            return object;
        };

        /**
         * Converts this NhiBillingPeriod to JSON.
         * @function toJSON
         * @memberof BI.NhiBillingPeriod
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NhiBillingPeriod.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NhiBillingPeriod
         * @function getTypeUrl
         * @memberof BI.NhiBillingPeriod
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NhiBillingPeriod.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NhiBillingPeriod";
        };

        return NhiBillingPeriod;
    })();

    BI.LicenseStats = (function() {

        /**
         * Properties of a LicenseStats.
         * @memberof BI
         * @interface ILicenseStats
         * @property {BI.LicenseStats.Type|null} [type] LicenseStats type
         * @property {number|null} [available] LicenseStats available
         * @property {number|null} [used] LicenseStats used
         */

        /**
         * Constructs a new LicenseStats.
         * @memberof BI
         * @classdesc Represents a LicenseStats.
         * @implements ILicenseStats
         * @constructor
         * @param {BI.ILicenseStats=} [properties] Properties to set
         */
        function LicenseStats(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LicenseStats type.
         * @member {BI.LicenseStats.Type} type
         * @memberof BI.LicenseStats
         * @instance
         */
        LicenseStats.prototype.type = 0;

        /**
         * LicenseStats available.
         * @member {number} available
         * @memberof BI.LicenseStats
         * @instance
         */
        LicenseStats.prototype.available = 0;

        /**
         * LicenseStats used.
         * @member {number} used
         * @memberof BI.LicenseStats
         * @instance
         */
        LicenseStats.prototype.used = 0;

        /**
         * Creates a new LicenseStats instance using the specified properties.
         * @function create
         * @memberof BI.LicenseStats
         * @static
         * @param {BI.ILicenseStats=} [properties] Properties to set
         * @returns {BI.LicenseStats} LicenseStats instance
         */
        LicenseStats.create = function create(properties) {
            return new LicenseStats(properties);
        };

        /**
         * Encodes the specified LicenseStats message. Does not implicitly {@link BI.LicenseStats.verify|verify} messages.
         * @function encode
         * @memberof BI.LicenseStats
         * @static
         * @param {BI.ILicenseStats} message LicenseStats message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LicenseStats.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.available != null && Object.hasOwnProperty.call(message, "available"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.available);
            if (message.used != null && Object.hasOwnProperty.call(message, "used"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.used);
            return writer;
        };

        /**
         * Decodes a LicenseStats message from the specified reader or buffer.
         * @function decode
         * @memberof BI.LicenseStats
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.LicenseStats} LicenseStats
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LicenseStats.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.LicenseStats();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.available = reader.int32();
                        break;
                    }
                case 3: {
                        message.used = reader.int32();
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
         * Creates a LicenseStats message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.LicenseStats
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.LicenseStats} LicenseStats
         */
        LicenseStats.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.LicenseStats)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.LicenseStats: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.LicenseStats();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "LICENSE_STAT_UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "MSP_BASE":
            case 1:
                message.type = 1;
                break;
            case "MC_BUSINESS":
            case 2:
                message.type = 2;
                break;
            case "MC_BUSINESS_PLUS":
            case 3:
                message.type = 3;
                break;
            case "MC_ENTERPRISE":
            case 4:
                message.type = 4;
                break;
            case "MC_ENTERPRISE_PLUS":
            case 5:
                message.type = 5;
                break;
            case "B2B_BUSINESS_STARTER":
            case 6:
                message.type = 6;
                break;
            case "B2B_BUSINESS":
            case 7:
                message.type = 7;
                break;
            case "B2B_ENTERPRISE":
            case 8:
                message.type = 8;
                break;
            }
            if (object.available != null)
                message.available = object.available | 0;
            if (object.used != null)
                message.used = object.used | 0;
            return message;
        };

        /**
         * Creates a plain object from a LicenseStats message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.LicenseStats
         * @static
         * @param {BI.LicenseStats} message LicenseStats
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LicenseStats.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "LICENSE_STAT_UNKNOWN" : 0;
                object.available = 0;
                object.used = 0;
            }
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                object.type = options.enums === String ? $root.BI.LicenseStats.Type[message.type] === undefined ? message.type : $root.BI.LicenseStats.Type[message.type] : message.type;
            if (message.available != null && Object.hasOwnProperty.call(message, "available"))
                object.available = message.available;
            if (message.used != null && Object.hasOwnProperty.call(message, "used"))
                object.used = message.used;
            return object;
        };

        /**
         * Converts this LicenseStats to JSON.
         * @function toJSON
         * @memberof BI.LicenseStats
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LicenseStats.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for LicenseStats
         * @function getTypeUrl
         * @memberof BI.LicenseStats
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        LicenseStats.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.LicenseStats";
        };

        /**
         * Type enum.
         * @name BI.LicenseStats.Type
         * @enum {number}
         * @property {number} LICENSE_STAT_UNKNOWN=0 LICENSE_STAT_UNKNOWN value
         * @property {number} MSP_BASE=1 MSP_BASE value
         * @property {number} MC_BUSINESS=2 MC_BUSINESS value
         * @property {number} MC_BUSINESS_PLUS=3 MC_BUSINESS_PLUS value
         * @property {number} MC_ENTERPRISE=4 MC_ENTERPRISE value
         * @property {number} MC_ENTERPRISE_PLUS=5 MC_ENTERPRISE_PLUS value
         * @property {number} B2B_BUSINESS_STARTER=6 B2B_BUSINESS_STARTER value
         * @property {number} B2B_BUSINESS=7 B2B_BUSINESS value
         * @property {number} B2B_ENTERPRISE=8 B2B_ENTERPRISE value
         */
        LicenseStats.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "LICENSE_STAT_UNKNOWN"] = 0;
            values[valuesById[1] = "MSP_BASE"] = 1;
            values[valuesById[2] = "MC_BUSINESS"] = 2;
            values[valuesById[3] = "MC_BUSINESS_PLUS"] = 3;
            values[valuesById[4] = "MC_ENTERPRISE"] = 4;
            values[valuesById[5] = "MC_ENTERPRISE_PLUS"] = 5;
            values[valuesById[6] = "B2B_BUSINESS_STARTER"] = 6;
            values[valuesById[7] = "B2B_BUSINESS"] = 7;
            values[valuesById[8] = "B2B_ENTERPRISE"] = 8;
            return values;
        })();

        return LicenseStats;
    })();

    BI.AutoRenewal = (function() {

        /**
         * Properties of an AutoRenewal.
         * @memberof BI
         * @interface IAutoRenewal
         * @property {number|null} [nextOn] AutoRenewal nextOn
         * @property {number|null} [daysLeft] AutoRenewal daysLeft
         * @property {boolean|null} [isTrial] AutoRenewal isTrial
         */

        /**
         * Constructs a new AutoRenewal.
         * @memberof BI
         * @classdesc Represents an AutoRenewal.
         * @implements IAutoRenewal
         * @constructor
         * @param {BI.IAutoRenewal=} [properties] Properties to set
         */
        function AutoRenewal(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AutoRenewal nextOn.
         * @member {number} nextOn
         * @memberof BI.AutoRenewal
         * @instance
         */
        AutoRenewal.prototype.nextOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AutoRenewal daysLeft.
         * @member {number} daysLeft
         * @memberof BI.AutoRenewal
         * @instance
         */
        AutoRenewal.prototype.daysLeft = 0;

        /**
         * AutoRenewal isTrial.
         * @member {boolean} isTrial
         * @memberof BI.AutoRenewal
         * @instance
         */
        AutoRenewal.prototype.isTrial = false;

        /**
         * Creates a new AutoRenewal instance using the specified properties.
         * @function create
         * @memberof BI.AutoRenewal
         * @static
         * @param {BI.IAutoRenewal=} [properties] Properties to set
         * @returns {BI.AutoRenewal} AutoRenewal instance
         */
        AutoRenewal.create = function create(properties) {
            return new AutoRenewal(properties);
        };

        /**
         * Encodes the specified AutoRenewal message. Does not implicitly {@link BI.AutoRenewal.verify|verify} messages.
         * @function encode
         * @memberof BI.AutoRenewal
         * @static
         * @param {BI.IAutoRenewal} message AutoRenewal message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutoRenewal.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.nextOn != null && Object.hasOwnProperty.call(message, "nextOn"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.nextOn);
            if (message.daysLeft != null && Object.hasOwnProperty.call(message, "daysLeft"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.daysLeft);
            if (message.isTrial != null && Object.hasOwnProperty.call(message, "isTrial"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isTrial);
            return writer;
        };

        /**
         * Decodes an AutoRenewal message from the specified reader or buffer.
         * @function decode
         * @memberof BI.AutoRenewal
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.AutoRenewal} AutoRenewal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutoRenewal.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.AutoRenewal();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.nextOn = reader.int64();
                        break;
                    }
                case 2: {
                        message.daysLeft = reader.int32();
                        break;
                    }
                case 3: {
                        message.isTrial = reader.bool();
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
         * Creates an AutoRenewal message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.AutoRenewal
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.AutoRenewal} AutoRenewal
         */
        AutoRenewal.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.AutoRenewal)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.AutoRenewal: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.AutoRenewal();
            if (object.nextOn != null)
                if ($util.Long)
                    message.nextOn = $util.Long.fromValue(object.nextOn, false);
                else if (typeof object.nextOn === "string")
                    message.nextOn = parseInt(object.nextOn, 10);
                else if (typeof object.nextOn === "number")
                    message.nextOn = object.nextOn;
                else if (typeof object.nextOn === "object")
                    message.nextOn = new $util.LongBits(object.nextOn.low >>> 0, object.nextOn.high >>> 0).toNumber();
            if (object.daysLeft != null)
                message.daysLeft = object.daysLeft | 0;
            if (object.isTrial != null)
                message.isTrial = Boolean(object.isTrial);
            return message;
        };

        /**
         * Creates a plain object from an AutoRenewal message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.AutoRenewal
         * @static
         * @param {BI.AutoRenewal} message AutoRenewal
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AutoRenewal.toObject = function toObject(message, options, q) {
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
                    object.nextOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.nextOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.daysLeft = 0;
                object.isTrial = false;
            }
            if (message.nextOn != null && Object.hasOwnProperty.call(message, "nextOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nextOn = typeof message.nextOn === "number" ? BigInt(message.nextOn) : $util.Long.fromBits(message.nextOn.low >>> 0, message.nextOn.high >>> 0, false).toBigInt();
                else if (typeof message.nextOn === "number")
                    object.nextOn = options.longs === String ? String(message.nextOn) : message.nextOn;
                else
                    object.nextOn = options.longs === String ? $util.Long.prototype.toString.call(message.nextOn) : options.longs === Number ? new $util.LongBits(message.nextOn.low >>> 0, message.nextOn.high >>> 0).toNumber() : message.nextOn;
            if (message.daysLeft != null && Object.hasOwnProperty.call(message, "daysLeft"))
                object.daysLeft = message.daysLeft;
            if (message.isTrial != null && Object.hasOwnProperty.call(message, "isTrial"))
                object.isTrial = message.isTrial;
            return object;
        };

        /**
         * Converts this AutoRenewal to JSON.
         * @function toJSON
         * @memberof BI.AutoRenewal
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AutoRenewal.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AutoRenewal
         * @function getTypeUrl
         * @memberof BI.AutoRenewal
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AutoRenewal.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.AutoRenewal";
        };

        return AutoRenewal;
    })();

    BI.PaymentMethod = (function() {

        /**
         * Properties of a PaymentMethod.
         * @memberof BI
         * @interface IPaymentMethod
         * @property {BI.PaymentMethod.Type|null} [type] PaymentMethod type
         * @property {BI.PaymentMethod.ICard|null} [card] PaymentMethod card
         * @property {BI.PaymentMethod.ISepa|null} [sepa] PaymentMethod sepa
         * @property {BI.PaymentMethod.IPaypal|null} [paypal] PaymentMethod paypal
         * @property {boolean|null} [failedBilling] PaymentMethod failedBilling
         * @property {BI.PaymentMethod.IVendor|null} [vendor] PaymentMethod vendor
         * @property {BI.PaymentMethod.IPurchaseOrder|null} [purchaseOrder] PaymentMethod purchaseOrder
         */

        /**
         * Constructs a new PaymentMethod.
         * @memberof BI
         * @classdesc Represents a PaymentMethod.
         * @implements IPaymentMethod
         * @constructor
         * @param {BI.IPaymentMethod=} [properties] Properties to set
         */
        function PaymentMethod(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PaymentMethod type.
         * @member {BI.PaymentMethod.Type} type
         * @memberof BI.PaymentMethod
         * @instance
         */
        PaymentMethod.prototype.type = 0;

        /**
         * PaymentMethod card.
         * @member {BI.PaymentMethod.ICard|null|undefined} card
         * @memberof BI.PaymentMethod
         * @instance
         */
        PaymentMethod.prototype.card = null;

        /**
         * PaymentMethod sepa.
         * @member {BI.PaymentMethod.ISepa|null|undefined} sepa
         * @memberof BI.PaymentMethod
         * @instance
         */
        PaymentMethod.prototype.sepa = null;

        /**
         * PaymentMethod paypal.
         * @member {BI.PaymentMethod.IPaypal|null|undefined} paypal
         * @memberof BI.PaymentMethod
         * @instance
         */
        PaymentMethod.prototype.paypal = null;

        /**
         * PaymentMethod failedBilling.
         * @member {boolean} failedBilling
         * @memberof BI.PaymentMethod
         * @instance
         */
        PaymentMethod.prototype.failedBilling = false;

        /**
         * PaymentMethod vendor.
         * @member {BI.PaymentMethod.IVendor|null|undefined} vendor
         * @memberof BI.PaymentMethod
         * @instance
         */
        PaymentMethod.prototype.vendor = null;

        /**
         * PaymentMethod purchaseOrder.
         * @member {BI.PaymentMethod.IPurchaseOrder|null|undefined} purchaseOrder
         * @memberof BI.PaymentMethod
         * @instance
         */
        PaymentMethod.prototype.purchaseOrder = null;

        /**
         * Creates a new PaymentMethod instance using the specified properties.
         * @function create
         * @memberof BI.PaymentMethod
         * @static
         * @param {BI.IPaymentMethod=} [properties] Properties to set
         * @returns {BI.PaymentMethod} PaymentMethod instance
         */
        PaymentMethod.create = function create(properties) {
            return new PaymentMethod(properties);
        };

        /**
         * Encodes the specified PaymentMethod message. Does not implicitly {@link BI.PaymentMethod.verify|verify} messages.
         * @function encode
         * @memberof BI.PaymentMethod
         * @static
         * @param {BI.IPaymentMethod} message PaymentMethod message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PaymentMethod.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.card != null && Object.hasOwnProperty.call(message, "card"))
                $root.BI.PaymentMethod.Card.encode(message.card, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.sepa != null && Object.hasOwnProperty.call(message, "sepa"))
                $root.BI.PaymentMethod.Sepa.encode(message.sepa, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.paypal != null && Object.hasOwnProperty.call(message, "paypal"))
                $root.BI.PaymentMethod.Paypal.encode(message.paypal, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.failedBilling != null && Object.hasOwnProperty.call(message, "failedBilling"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.failedBilling);
            if (message.vendor != null && Object.hasOwnProperty.call(message, "vendor"))
                $root.BI.PaymentMethod.Vendor.encode(message.vendor, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.purchaseOrder != null && Object.hasOwnProperty.call(message, "purchaseOrder"))
                $root.BI.PaymentMethod.PurchaseOrder.encode(message.purchaseOrder, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a PaymentMethod message from the specified reader or buffer.
         * @function decode
         * @memberof BI.PaymentMethod
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.PaymentMethod} PaymentMethod
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PaymentMethod.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.PaymentMethod();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.card = $root.BI.PaymentMethod.Card.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.sepa = $root.BI.PaymentMethod.Sepa.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.paypal = $root.BI.PaymentMethod.Paypal.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 5: {
                        message.failedBilling = reader.bool();
                        break;
                    }
                case 6: {
                        message.vendor = $root.BI.PaymentMethod.Vendor.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 7: {
                        message.purchaseOrder = $root.BI.PaymentMethod.PurchaseOrder.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates a PaymentMethod message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.PaymentMethod
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.PaymentMethod} PaymentMethod
         */
        PaymentMethod.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.PaymentMethod)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.PaymentMethod: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.PaymentMethod();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "CARD":
            case 0:
                message.type = 0;
                break;
            case "SEPA":
            case 1:
                message.type = 1;
                break;
            case "PAYPAL":
            case 2:
                message.type = 2;
                break;
            case "NONE":
            case 3:
                message.type = 3;
                break;
            case "VENDOR":
            case 4:
                message.type = 4;
                break;
            case "PURCHASEORDER":
            case 5:
                message.type = 5;
                break;
            }
            if (object.card != null) {
                if (!$util.isObject(object.card))
                    throw TypeError(".BI.PaymentMethod.card: object expected");
                message.card = $root.BI.PaymentMethod.Card.fromObject(object.card, long + 1);
            }
            if (object.sepa != null) {
                if (!$util.isObject(object.sepa))
                    throw TypeError(".BI.PaymentMethod.sepa: object expected");
                message.sepa = $root.BI.PaymentMethod.Sepa.fromObject(object.sepa, long + 1);
            }
            if (object.paypal != null) {
                if (!$util.isObject(object.paypal))
                    throw TypeError(".BI.PaymentMethod.paypal: object expected");
                message.paypal = $root.BI.PaymentMethod.Paypal.fromObject(object.paypal, long + 1);
            }
            if (object.failedBilling != null)
                message.failedBilling = Boolean(object.failedBilling);
            if (object.vendor != null) {
                if (!$util.isObject(object.vendor))
                    throw TypeError(".BI.PaymentMethod.vendor: object expected");
                message.vendor = $root.BI.PaymentMethod.Vendor.fromObject(object.vendor, long + 1);
            }
            if (object.purchaseOrder != null) {
                if (!$util.isObject(object.purchaseOrder))
                    throw TypeError(".BI.PaymentMethod.purchaseOrder: object expected");
                message.purchaseOrder = $root.BI.PaymentMethod.PurchaseOrder.fromObject(object.purchaseOrder, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a PaymentMethod message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.PaymentMethod
         * @static
         * @param {BI.PaymentMethod} message PaymentMethod
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PaymentMethod.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "CARD" : 0;
                object.card = null;
                object.sepa = null;
                object.paypal = null;
                object.failedBilling = false;
                object.vendor = null;
                object.purchaseOrder = null;
            }
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                object.type = options.enums === String ? $root.BI.PaymentMethod.Type[message.type] === undefined ? message.type : $root.BI.PaymentMethod.Type[message.type] : message.type;
            if (message.card != null && Object.hasOwnProperty.call(message, "card"))
                object.card = $root.BI.PaymentMethod.Card.toObject(message.card, options, q + 1);
            if (message.sepa != null && Object.hasOwnProperty.call(message, "sepa"))
                object.sepa = $root.BI.PaymentMethod.Sepa.toObject(message.sepa, options, q + 1);
            if (message.paypal != null && Object.hasOwnProperty.call(message, "paypal"))
                object.paypal = $root.BI.PaymentMethod.Paypal.toObject(message.paypal, options, q + 1);
            if (message.failedBilling != null && Object.hasOwnProperty.call(message, "failedBilling"))
                object.failedBilling = message.failedBilling;
            if (message.vendor != null && Object.hasOwnProperty.call(message, "vendor"))
                object.vendor = $root.BI.PaymentMethod.Vendor.toObject(message.vendor, options, q + 1);
            if (message.purchaseOrder != null && Object.hasOwnProperty.call(message, "purchaseOrder"))
                object.purchaseOrder = $root.BI.PaymentMethod.PurchaseOrder.toObject(message.purchaseOrder, options, q + 1);
            return object;
        };

        /**
         * Converts this PaymentMethod to JSON.
         * @function toJSON
         * @memberof BI.PaymentMethod
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PaymentMethod.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PaymentMethod
         * @function getTypeUrl
         * @memberof BI.PaymentMethod
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PaymentMethod.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.PaymentMethod";
        };

        /**
         * Type enum.
         * @name BI.PaymentMethod.Type
         * @enum {number}
         * @property {number} CARD=0 CARD value
         * @property {number} SEPA=1 SEPA value
         * @property {number} PAYPAL=2 PAYPAL value
         * @property {number} NONE=3 NONE value
         * @property {number} VENDOR=4 VENDOR value
         * @property {number} PURCHASEORDER=5 PURCHASEORDER value
         */
        PaymentMethod.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "CARD"] = 0;
            values[valuesById[1] = "SEPA"] = 1;
            values[valuesById[2] = "PAYPAL"] = 2;
            values[valuesById[3] = "NONE"] = 3;
            values[valuesById[4] = "VENDOR"] = 4;
            values[valuesById[5] = "PURCHASEORDER"] = 5;
            return values;
        })();

        PaymentMethod.Card = (function() {

            /**
             * Properties of a Card.
             * @memberof BI.PaymentMethod
             * @interface ICard
             * @property {string|null} [last4] Card last4
             * @property {string|null} [brand] Card brand
             */

            /**
             * Constructs a new Card.
             * @memberof BI.PaymentMethod
             * @classdesc Represents a Card.
             * @implements ICard
             * @constructor
             * @param {BI.PaymentMethod.ICard=} [properties] Properties to set
             */
            function Card(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Card last4.
             * @member {string} last4
             * @memberof BI.PaymentMethod.Card
             * @instance
             */
            Card.prototype.last4 = "";

            /**
             * Card brand.
             * @member {string} brand
             * @memberof BI.PaymentMethod.Card
             * @instance
             */
            Card.prototype.brand = "";

            /**
             * Creates a new Card instance using the specified properties.
             * @function create
             * @memberof BI.PaymentMethod.Card
             * @static
             * @param {BI.PaymentMethod.ICard=} [properties] Properties to set
             * @returns {BI.PaymentMethod.Card} Card instance
             */
            Card.create = function create(properties) {
                return new Card(properties);
            };

            /**
             * Encodes the specified Card message. Does not implicitly {@link BI.PaymentMethod.Card.verify|verify} messages.
             * @function encode
             * @memberof BI.PaymentMethod.Card
             * @static
             * @param {BI.PaymentMethod.ICard} message Card message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Card.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.last4 != null && Object.hasOwnProperty.call(message, "last4"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.last4);
                if (message.brand != null && Object.hasOwnProperty.call(message, "brand"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.brand);
                return writer;
            };

            /**
             * Decodes a Card message from the specified reader or buffer.
             * @function decode
             * @memberof BI.PaymentMethod.Card
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BI.PaymentMethod.Card} Card
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Card.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.PaymentMethod.Card();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.last4 = reader.string();
                            break;
                        }
                    case 2: {
                            message.brand = reader.string();
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
             * Creates a Card message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BI.PaymentMethod.Card
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BI.PaymentMethod.Card} Card
             */
            Card.fromObject = function fromObject(object, long) {
                if (object instanceof $root.BI.PaymentMethod.Card)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".BI.PaymentMethod.Card: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.BI.PaymentMethod.Card();
                if (object.last4 != null)
                    message.last4 = String(object.last4);
                if (object.brand != null)
                    message.brand = String(object.brand);
                return message;
            };

            /**
             * Creates a plain object from a Card message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BI.PaymentMethod.Card
             * @static
             * @param {BI.PaymentMethod.Card} message Card
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Card.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.last4 = "";
                    object.brand = "";
                }
                if (message.last4 != null && Object.hasOwnProperty.call(message, "last4"))
                    object.last4 = message.last4;
                if (message.brand != null && Object.hasOwnProperty.call(message, "brand"))
                    object.brand = message.brand;
                return object;
            };

            /**
             * Converts this Card to JSON.
             * @function toJSON
             * @memberof BI.PaymentMethod.Card
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Card.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Card
             * @function getTypeUrl
             * @memberof BI.PaymentMethod.Card
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Card.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/BI.PaymentMethod.Card";
            };

            return Card;
        })();

        PaymentMethod.Sepa = (function() {

            /**
             * Properties of a Sepa.
             * @memberof BI.PaymentMethod
             * @interface ISepa
             * @property {string|null} [last4] Sepa last4
             * @property {string|null} [country] Sepa country
             */

            /**
             * Constructs a new Sepa.
             * @memberof BI.PaymentMethod
             * @classdesc Represents a Sepa.
             * @implements ISepa
             * @constructor
             * @param {BI.PaymentMethod.ISepa=} [properties] Properties to set
             */
            function Sepa(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Sepa last4.
             * @member {string} last4
             * @memberof BI.PaymentMethod.Sepa
             * @instance
             */
            Sepa.prototype.last4 = "";

            /**
             * Sepa country.
             * @member {string} country
             * @memberof BI.PaymentMethod.Sepa
             * @instance
             */
            Sepa.prototype.country = "";

            /**
             * Creates a new Sepa instance using the specified properties.
             * @function create
             * @memberof BI.PaymentMethod.Sepa
             * @static
             * @param {BI.PaymentMethod.ISepa=} [properties] Properties to set
             * @returns {BI.PaymentMethod.Sepa} Sepa instance
             */
            Sepa.create = function create(properties) {
                return new Sepa(properties);
            };

            /**
             * Encodes the specified Sepa message. Does not implicitly {@link BI.PaymentMethod.Sepa.verify|verify} messages.
             * @function encode
             * @memberof BI.PaymentMethod.Sepa
             * @static
             * @param {BI.PaymentMethod.ISepa} message Sepa message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Sepa.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.last4 != null && Object.hasOwnProperty.call(message, "last4"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.last4);
                if (message.country != null && Object.hasOwnProperty.call(message, "country"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.country);
                return writer;
            };

            /**
             * Decodes a Sepa message from the specified reader or buffer.
             * @function decode
             * @memberof BI.PaymentMethod.Sepa
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BI.PaymentMethod.Sepa} Sepa
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Sepa.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.PaymentMethod.Sepa();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.last4 = reader.string();
                            break;
                        }
                    case 2: {
                            message.country = reader.string();
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
             * Creates a Sepa message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BI.PaymentMethod.Sepa
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BI.PaymentMethod.Sepa} Sepa
             */
            Sepa.fromObject = function fromObject(object, long) {
                if (object instanceof $root.BI.PaymentMethod.Sepa)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".BI.PaymentMethod.Sepa: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.BI.PaymentMethod.Sepa();
                if (object.last4 != null)
                    message.last4 = String(object.last4);
                if (object.country != null)
                    message.country = String(object.country);
                return message;
            };

            /**
             * Creates a plain object from a Sepa message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BI.PaymentMethod.Sepa
             * @static
             * @param {BI.PaymentMethod.Sepa} message Sepa
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Sepa.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.last4 = "";
                    object.country = "";
                }
                if (message.last4 != null && Object.hasOwnProperty.call(message, "last4"))
                    object.last4 = message.last4;
                if (message.country != null && Object.hasOwnProperty.call(message, "country"))
                    object.country = message.country;
                return object;
            };

            /**
             * Converts this Sepa to JSON.
             * @function toJSON
             * @memberof BI.PaymentMethod.Sepa
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Sepa.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Sepa
             * @function getTypeUrl
             * @memberof BI.PaymentMethod.Sepa
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Sepa.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/BI.PaymentMethod.Sepa";
            };

            return Sepa;
        })();

        PaymentMethod.Paypal = (function() {

            /**
             * Properties of a Paypal.
             * @memberof BI.PaymentMethod
             * @interface IPaypal
             */

            /**
             * Constructs a new Paypal.
             * @memberof BI.PaymentMethod
             * @classdesc Represents a Paypal.
             * @implements IPaypal
             * @constructor
             * @param {BI.PaymentMethod.IPaypal=} [properties] Properties to set
             */
            function Paypal(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Paypal instance using the specified properties.
             * @function create
             * @memberof BI.PaymentMethod.Paypal
             * @static
             * @param {BI.PaymentMethod.IPaypal=} [properties] Properties to set
             * @returns {BI.PaymentMethod.Paypal} Paypal instance
             */
            Paypal.create = function create(properties) {
                return new Paypal(properties);
            };

            /**
             * Encodes the specified Paypal message. Does not implicitly {@link BI.PaymentMethod.Paypal.verify|verify} messages.
             * @function encode
             * @memberof BI.PaymentMethod.Paypal
             * @static
             * @param {BI.PaymentMethod.IPaypal} message Paypal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Paypal.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                return writer;
            };

            /**
             * Decodes a Paypal message from the specified reader or buffer.
             * @function decode
             * @memberof BI.PaymentMethod.Paypal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BI.PaymentMethod.Paypal} Paypal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Paypal.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.PaymentMethod.Paypal();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Creates a Paypal message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BI.PaymentMethod.Paypal
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BI.PaymentMethod.Paypal} Paypal
             */
            Paypal.fromObject = function fromObject(object, long) {
                if (object instanceof $root.BI.PaymentMethod.Paypal)
                    return object;
                return new $root.BI.PaymentMethod.Paypal();
            };

            /**
             * Creates a plain object from a Paypal message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BI.PaymentMethod.Paypal
             * @static
             * @param {BI.PaymentMethod.Paypal} message Paypal
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Paypal.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Paypal to JSON.
             * @function toJSON
             * @memberof BI.PaymentMethod.Paypal
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Paypal.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Paypal
             * @function getTypeUrl
             * @memberof BI.PaymentMethod.Paypal
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Paypal.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/BI.PaymentMethod.Paypal";
            };

            return Paypal;
        })();

        PaymentMethod.Vendor = (function() {

            /**
             * Properties of a Vendor.
             * @memberof BI.PaymentMethod
             * @interface IVendor
             * @property {string|null} [name] Vendor name
             */

            /**
             * Constructs a new Vendor.
             * @memberof BI.PaymentMethod
             * @classdesc Represents a Vendor.
             * @implements IVendor
             * @constructor
             * @param {BI.PaymentMethod.IVendor=} [properties] Properties to set
             */
            function Vendor(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Vendor name.
             * @member {string} name
             * @memberof BI.PaymentMethod.Vendor
             * @instance
             */
            Vendor.prototype.name = "";

            /**
             * Creates a new Vendor instance using the specified properties.
             * @function create
             * @memberof BI.PaymentMethod.Vendor
             * @static
             * @param {BI.PaymentMethod.IVendor=} [properties] Properties to set
             * @returns {BI.PaymentMethod.Vendor} Vendor instance
             */
            Vendor.create = function create(properties) {
                return new Vendor(properties);
            };

            /**
             * Encodes the specified Vendor message. Does not implicitly {@link BI.PaymentMethod.Vendor.verify|verify} messages.
             * @function encode
             * @memberof BI.PaymentMethod.Vendor
             * @static
             * @param {BI.PaymentMethod.IVendor} message Vendor message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Vendor.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                return writer;
            };

            /**
             * Decodes a Vendor message from the specified reader or buffer.
             * @function decode
             * @memberof BI.PaymentMethod.Vendor
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BI.PaymentMethod.Vendor} Vendor
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Vendor.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.PaymentMethod.Vendor();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
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
             * Creates a Vendor message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BI.PaymentMethod.Vendor
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BI.PaymentMethod.Vendor} Vendor
             */
            Vendor.fromObject = function fromObject(object, long) {
                if (object instanceof $root.BI.PaymentMethod.Vendor)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".BI.PaymentMethod.Vendor: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.BI.PaymentMethod.Vendor();
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from a Vendor message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BI.PaymentMethod.Vendor
             * @static
             * @param {BI.PaymentMethod.Vendor} message Vendor
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Vendor.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults)
                    object.name = "";
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this Vendor to JSON.
             * @function toJSON
             * @memberof BI.PaymentMethod.Vendor
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Vendor.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Vendor
             * @function getTypeUrl
             * @memberof BI.PaymentMethod.Vendor
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Vendor.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/BI.PaymentMethod.Vendor";
            };

            return Vendor;
        })();

        PaymentMethod.PurchaseOrder = (function() {

            /**
             * Properties of a PurchaseOrder.
             * @memberof BI.PaymentMethod
             * @interface IPurchaseOrder
             * @property {string|null} [name] PurchaseOrder name
             */

            /**
             * Constructs a new PurchaseOrder.
             * @memberof BI.PaymentMethod
             * @classdesc Represents a PurchaseOrder.
             * @implements IPurchaseOrder
             * @constructor
             * @param {BI.PaymentMethod.IPurchaseOrder=} [properties] Properties to set
             */
            function PurchaseOrder(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * PurchaseOrder name.
             * @member {string} name
             * @memberof BI.PaymentMethod.PurchaseOrder
             * @instance
             */
            PurchaseOrder.prototype.name = "";

            /**
             * Creates a new PurchaseOrder instance using the specified properties.
             * @function create
             * @memberof BI.PaymentMethod.PurchaseOrder
             * @static
             * @param {BI.PaymentMethod.IPurchaseOrder=} [properties] Properties to set
             * @returns {BI.PaymentMethod.PurchaseOrder} PurchaseOrder instance
             */
            PurchaseOrder.create = function create(properties) {
                return new PurchaseOrder(properties);
            };

            /**
             * Encodes the specified PurchaseOrder message. Does not implicitly {@link BI.PaymentMethod.PurchaseOrder.verify|verify} messages.
             * @function encode
             * @memberof BI.PaymentMethod.PurchaseOrder
             * @static
             * @param {BI.PaymentMethod.IPurchaseOrder} message PurchaseOrder message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PurchaseOrder.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                return writer;
            };

            /**
             * Decodes a PurchaseOrder message from the specified reader or buffer.
             * @function decode
             * @memberof BI.PaymentMethod.PurchaseOrder
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BI.PaymentMethod.PurchaseOrder} PurchaseOrder
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PurchaseOrder.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.PaymentMethod.PurchaseOrder();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
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
             * Creates a PurchaseOrder message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BI.PaymentMethod.PurchaseOrder
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BI.PaymentMethod.PurchaseOrder} PurchaseOrder
             */
            PurchaseOrder.fromObject = function fromObject(object, long) {
                if (object instanceof $root.BI.PaymentMethod.PurchaseOrder)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".BI.PaymentMethod.PurchaseOrder: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.BI.PaymentMethod.PurchaseOrder();
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from a PurchaseOrder message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BI.PaymentMethod.PurchaseOrder
             * @static
             * @param {BI.PaymentMethod.PurchaseOrder} message PurchaseOrder
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PurchaseOrder.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults)
                    object.name = "";
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this PurchaseOrder to JSON.
             * @function toJSON
             * @memberof BI.PaymentMethod.PurchaseOrder
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            PurchaseOrder.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for PurchaseOrder
             * @function getTypeUrl
             * @memberof BI.PaymentMethod.PurchaseOrder
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            PurchaseOrder.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/BI.PaymentMethod.PurchaseOrder";
            };

            return PurchaseOrder;
        })();

        return PaymentMethod;
    })();

    BI.SubscriptionMspPricingRequest = (function() {

        /**
         * Properties of a SubscriptionMspPricingRequest.
         * @memberof BI
         * @interface ISubscriptionMspPricingRequest
         */

        /**
         * Constructs a new SubscriptionMspPricingRequest.
         * @memberof BI
         * @classdesc Represents a SubscriptionMspPricingRequest.
         * @implements ISubscriptionMspPricingRequest
         * @constructor
         * @param {BI.ISubscriptionMspPricingRequest=} [properties] Properties to set
         */
        function SubscriptionMspPricingRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SubscriptionMspPricingRequest instance using the specified properties.
         * @function create
         * @memberof BI.SubscriptionMspPricingRequest
         * @static
         * @param {BI.ISubscriptionMspPricingRequest=} [properties] Properties to set
         * @returns {BI.SubscriptionMspPricingRequest} SubscriptionMspPricingRequest instance
         */
        SubscriptionMspPricingRequest.create = function create(properties) {
            return new SubscriptionMspPricingRequest(properties);
        };

        /**
         * Encodes the specified SubscriptionMspPricingRequest message. Does not implicitly {@link BI.SubscriptionMspPricingRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.SubscriptionMspPricingRequest
         * @static
         * @param {BI.ISubscriptionMspPricingRequest} message SubscriptionMspPricingRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscriptionMspPricingRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a SubscriptionMspPricingRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SubscriptionMspPricingRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SubscriptionMspPricingRequest} SubscriptionMspPricingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscriptionMspPricingRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SubscriptionMspPricingRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a SubscriptionMspPricingRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SubscriptionMspPricingRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SubscriptionMspPricingRequest} SubscriptionMspPricingRequest
         */
        SubscriptionMspPricingRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SubscriptionMspPricingRequest)
                return object;
            return new $root.BI.SubscriptionMspPricingRequest();
        };

        /**
         * Creates a plain object from a SubscriptionMspPricingRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SubscriptionMspPricingRequest
         * @static
         * @param {BI.SubscriptionMspPricingRequest} message SubscriptionMspPricingRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscriptionMspPricingRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SubscriptionMspPricingRequest to JSON.
         * @function toJSON
         * @memberof BI.SubscriptionMspPricingRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscriptionMspPricingRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubscriptionMspPricingRequest
         * @function getTypeUrl
         * @memberof BI.SubscriptionMspPricingRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubscriptionMspPricingRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SubscriptionMspPricingRequest";
        };

        return SubscriptionMspPricingRequest;
    })();

    BI.SubscriptionMspPricingResponse = (function() {

        /**
         * Properties of a SubscriptionMspPricingResponse.
         * @memberof BI
         * @interface ISubscriptionMspPricingResponse
         * @property {Array.<BI.IAddon>|null} [addons] SubscriptionMspPricingResponse addons
         * @property {Array.<BI.IFilePlan>|null} [filePlans] SubscriptionMspPricingResponse filePlans
         */

        /**
         * Constructs a new SubscriptionMspPricingResponse.
         * @memberof BI
         * @classdesc Represents a SubscriptionMspPricingResponse.
         * @implements ISubscriptionMspPricingResponse
         * @constructor
         * @param {BI.ISubscriptionMspPricingResponse=} [properties] Properties to set
         */
        function SubscriptionMspPricingResponse(properties) {
            this.addons = [];
            this.filePlans = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SubscriptionMspPricingResponse addons.
         * @member {Array.<BI.IAddon>} addons
         * @memberof BI.SubscriptionMspPricingResponse
         * @instance
         */
        SubscriptionMspPricingResponse.prototype.addons = $util.emptyArray;

        /**
         * SubscriptionMspPricingResponse filePlans.
         * @member {Array.<BI.IFilePlan>} filePlans
         * @memberof BI.SubscriptionMspPricingResponse
         * @instance
         */
        SubscriptionMspPricingResponse.prototype.filePlans = $util.emptyArray;

        /**
         * Creates a new SubscriptionMspPricingResponse instance using the specified properties.
         * @function create
         * @memberof BI.SubscriptionMspPricingResponse
         * @static
         * @param {BI.ISubscriptionMspPricingResponse=} [properties] Properties to set
         * @returns {BI.SubscriptionMspPricingResponse} SubscriptionMspPricingResponse instance
         */
        SubscriptionMspPricingResponse.create = function create(properties) {
            return new SubscriptionMspPricingResponse(properties);
        };

        /**
         * Encodes the specified SubscriptionMspPricingResponse message. Does not implicitly {@link BI.SubscriptionMspPricingResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.SubscriptionMspPricingResponse
         * @static
         * @param {BI.ISubscriptionMspPricingResponse} message SubscriptionMspPricingResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscriptionMspPricingResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.addons != null && message.addons.length)
                for (let i = 0; i < message.addons.length; ++i)
                    $root.BI.Addon.encode(message.addons[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.filePlans != null && message.filePlans.length)
                for (let i = 0; i < message.filePlans.length; ++i)
                    $root.BI.FilePlan.encode(message.filePlans[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SubscriptionMspPricingResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SubscriptionMspPricingResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SubscriptionMspPricingResponse} SubscriptionMspPricingResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscriptionMspPricingResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SubscriptionMspPricingResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 2: {
                        if (!(message.addons && message.addons.length))
                            message.addons = [];
                        message.addons.push($root.BI.Addon.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        if (!(message.filePlans && message.filePlans.length))
                            message.filePlans = [];
                        message.filePlans.push($root.BI.FilePlan.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a SubscriptionMspPricingResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SubscriptionMspPricingResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SubscriptionMspPricingResponse} SubscriptionMspPricingResponse
         */
        SubscriptionMspPricingResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SubscriptionMspPricingResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.SubscriptionMspPricingResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.SubscriptionMspPricingResponse();
            if (object.addons) {
                if (!Array.isArray(object.addons))
                    throw TypeError(".BI.SubscriptionMspPricingResponse.addons: array expected");
                message.addons = [];
                for (let i = 0; i < object.addons.length; ++i) {
                    if (!$util.isObject(object.addons[i]))
                        throw TypeError(".BI.SubscriptionMspPricingResponse.addons: object expected");
                    message.addons[i] = $root.BI.Addon.fromObject(object.addons[i], long + 1);
                }
            }
            if (object.filePlans) {
                if (!Array.isArray(object.filePlans))
                    throw TypeError(".BI.SubscriptionMspPricingResponse.filePlans: array expected");
                message.filePlans = [];
                for (let i = 0; i < object.filePlans.length; ++i) {
                    if (!$util.isObject(object.filePlans[i]))
                        throw TypeError(".BI.SubscriptionMspPricingResponse.filePlans: object expected");
                    message.filePlans[i] = $root.BI.FilePlan.fromObject(object.filePlans[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SubscriptionMspPricingResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SubscriptionMspPricingResponse
         * @static
         * @param {BI.SubscriptionMspPricingResponse} message SubscriptionMspPricingResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscriptionMspPricingResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.addons = [];
                object.filePlans = [];
            }
            if (message.addons && message.addons.length) {
                object.addons = [];
                for (let j = 0; j < message.addons.length; ++j)
                    object.addons[j] = $root.BI.Addon.toObject(message.addons[j], options, q + 1);
            }
            if (message.filePlans && message.filePlans.length) {
                object.filePlans = [];
                for (let j = 0; j < message.filePlans.length; ++j)
                    object.filePlans[j] = $root.BI.FilePlan.toObject(message.filePlans[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this SubscriptionMspPricingResponse to JSON.
         * @function toJSON
         * @memberof BI.SubscriptionMspPricingResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscriptionMspPricingResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubscriptionMspPricingResponse
         * @function getTypeUrl
         * @memberof BI.SubscriptionMspPricingResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubscriptionMspPricingResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SubscriptionMspPricingResponse";
        };

        return SubscriptionMspPricingResponse;
    })();

    BI.SubscriptionMcPricingRequest = (function() {

        /**
         * Properties of a SubscriptionMcPricingRequest.
         * @memberof BI
         * @interface ISubscriptionMcPricingRequest
         */

        /**
         * Constructs a new SubscriptionMcPricingRequest.
         * @memberof BI
         * @classdesc Represents a SubscriptionMcPricingRequest.
         * @implements ISubscriptionMcPricingRequest
         * @constructor
         * @param {BI.ISubscriptionMcPricingRequest=} [properties] Properties to set
         */
        function SubscriptionMcPricingRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SubscriptionMcPricingRequest instance using the specified properties.
         * @function create
         * @memberof BI.SubscriptionMcPricingRequest
         * @static
         * @param {BI.ISubscriptionMcPricingRequest=} [properties] Properties to set
         * @returns {BI.SubscriptionMcPricingRequest} SubscriptionMcPricingRequest instance
         */
        SubscriptionMcPricingRequest.create = function create(properties) {
            return new SubscriptionMcPricingRequest(properties);
        };

        /**
         * Encodes the specified SubscriptionMcPricingRequest message. Does not implicitly {@link BI.SubscriptionMcPricingRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.SubscriptionMcPricingRequest
         * @static
         * @param {BI.ISubscriptionMcPricingRequest} message SubscriptionMcPricingRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscriptionMcPricingRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a SubscriptionMcPricingRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SubscriptionMcPricingRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SubscriptionMcPricingRequest} SubscriptionMcPricingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscriptionMcPricingRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SubscriptionMcPricingRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a SubscriptionMcPricingRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SubscriptionMcPricingRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SubscriptionMcPricingRequest} SubscriptionMcPricingRequest
         */
        SubscriptionMcPricingRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SubscriptionMcPricingRequest)
                return object;
            return new $root.BI.SubscriptionMcPricingRequest();
        };

        /**
         * Creates a plain object from a SubscriptionMcPricingRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SubscriptionMcPricingRequest
         * @static
         * @param {BI.SubscriptionMcPricingRequest} message SubscriptionMcPricingRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscriptionMcPricingRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SubscriptionMcPricingRequest to JSON.
         * @function toJSON
         * @memberof BI.SubscriptionMcPricingRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscriptionMcPricingRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubscriptionMcPricingRequest
         * @function getTypeUrl
         * @memberof BI.SubscriptionMcPricingRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubscriptionMcPricingRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SubscriptionMcPricingRequest";
        };

        return SubscriptionMcPricingRequest;
    })();

    BI.SubscriptionMcPricingResponse = (function() {

        /**
         * Properties of a SubscriptionMcPricingResponse.
         * @memberof BI
         * @interface ISubscriptionMcPricingResponse
         * @property {Array.<BI.IBasePlan>|null} [basePlans] SubscriptionMcPricingResponse basePlans
         * @property {Array.<BI.IAddon>|null} [addons] SubscriptionMcPricingResponse addons
         * @property {Array.<BI.IFilePlan>|null} [filePlans] SubscriptionMcPricingResponse filePlans
         */

        /**
         * Constructs a new SubscriptionMcPricingResponse.
         * @memberof BI
         * @classdesc Represents a SubscriptionMcPricingResponse.
         * @implements ISubscriptionMcPricingResponse
         * @constructor
         * @param {BI.ISubscriptionMcPricingResponse=} [properties] Properties to set
         */
        function SubscriptionMcPricingResponse(properties) {
            this.basePlans = [];
            this.addons = [];
            this.filePlans = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SubscriptionMcPricingResponse basePlans.
         * @member {Array.<BI.IBasePlan>} basePlans
         * @memberof BI.SubscriptionMcPricingResponse
         * @instance
         */
        SubscriptionMcPricingResponse.prototype.basePlans = $util.emptyArray;

        /**
         * SubscriptionMcPricingResponse addons.
         * @member {Array.<BI.IAddon>} addons
         * @memberof BI.SubscriptionMcPricingResponse
         * @instance
         */
        SubscriptionMcPricingResponse.prototype.addons = $util.emptyArray;

        /**
         * SubscriptionMcPricingResponse filePlans.
         * @member {Array.<BI.IFilePlan>} filePlans
         * @memberof BI.SubscriptionMcPricingResponse
         * @instance
         */
        SubscriptionMcPricingResponse.prototype.filePlans = $util.emptyArray;

        /**
         * Creates a new SubscriptionMcPricingResponse instance using the specified properties.
         * @function create
         * @memberof BI.SubscriptionMcPricingResponse
         * @static
         * @param {BI.ISubscriptionMcPricingResponse=} [properties] Properties to set
         * @returns {BI.SubscriptionMcPricingResponse} SubscriptionMcPricingResponse instance
         */
        SubscriptionMcPricingResponse.create = function create(properties) {
            return new SubscriptionMcPricingResponse(properties);
        };

        /**
         * Encodes the specified SubscriptionMcPricingResponse message. Does not implicitly {@link BI.SubscriptionMcPricingResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.SubscriptionMcPricingResponse
         * @static
         * @param {BI.ISubscriptionMcPricingResponse} message SubscriptionMcPricingResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscriptionMcPricingResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.basePlans != null && message.basePlans.length)
                for (let i = 0; i < message.basePlans.length; ++i)
                    $root.BI.BasePlan.encode(message.basePlans[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.addons != null && message.addons.length)
                for (let i = 0; i < message.addons.length; ++i)
                    $root.BI.Addon.encode(message.addons[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.filePlans != null && message.filePlans.length)
                for (let i = 0; i < message.filePlans.length; ++i)
                    $root.BI.FilePlan.encode(message.filePlans[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SubscriptionMcPricingResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SubscriptionMcPricingResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SubscriptionMcPricingResponse} SubscriptionMcPricingResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscriptionMcPricingResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SubscriptionMcPricingResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.basePlans && message.basePlans.length))
                            message.basePlans = [];
                        message.basePlans.push($root.BI.BasePlan.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.addons && message.addons.length))
                            message.addons = [];
                        message.addons.push($root.BI.Addon.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        if (!(message.filePlans && message.filePlans.length))
                            message.filePlans = [];
                        message.filePlans.push($root.BI.FilePlan.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a SubscriptionMcPricingResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SubscriptionMcPricingResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SubscriptionMcPricingResponse} SubscriptionMcPricingResponse
         */
        SubscriptionMcPricingResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SubscriptionMcPricingResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.SubscriptionMcPricingResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.SubscriptionMcPricingResponse();
            if (object.basePlans) {
                if (!Array.isArray(object.basePlans))
                    throw TypeError(".BI.SubscriptionMcPricingResponse.basePlans: array expected");
                message.basePlans = [];
                for (let i = 0; i < object.basePlans.length; ++i) {
                    if (!$util.isObject(object.basePlans[i]))
                        throw TypeError(".BI.SubscriptionMcPricingResponse.basePlans: object expected");
                    message.basePlans[i] = $root.BI.BasePlan.fromObject(object.basePlans[i], long + 1);
                }
            }
            if (object.addons) {
                if (!Array.isArray(object.addons))
                    throw TypeError(".BI.SubscriptionMcPricingResponse.addons: array expected");
                message.addons = [];
                for (let i = 0; i < object.addons.length; ++i) {
                    if (!$util.isObject(object.addons[i]))
                        throw TypeError(".BI.SubscriptionMcPricingResponse.addons: object expected");
                    message.addons[i] = $root.BI.Addon.fromObject(object.addons[i], long + 1);
                }
            }
            if (object.filePlans) {
                if (!Array.isArray(object.filePlans))
                    throw TypeError(".BI.SubscriptionMcPricingResponse.filePlans: array expected");
                message.filePlans = [];
                for (let i = 0; i < object.filePlans.length; ++i) {
                    if (!$util.isObject(object.filePlans[i]))
                        throw TypeError(".BI.SubscriptionMcPricingResponse.filePlans: object expected");
                    message.filePlans[i] = $root.BI.FilePlan.fromObject(object.filePlans[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SubscriptionMcPricingResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SubscriptionMcPricingResponse
         * @static
         * @param {BI.SubscriptionMcPricingResponse} message SubscriptionMcPricingResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscriptionMcPricingResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.basePlans = [];
                object.addons = [];
                object.filePlans = [];
            }
            if (message.basePlans && message.basePlans.length) {
                object.basePlans = [];
                for (let j = 0; j < message.basePlans.length; ++j)
                    object.basePlans[j] = $root.BI.BasePlan.toObject(message.basePlans[j], options, q + 1);
            }
            if (message.addons && message.addons.length) {
                object.addons = [];
                for (let j = 0; j < message.addons.length; ++j)
                    object.addons[j] = $root.BI.Addon.toObject(message.addons[j], options, q + 1);
            }
            if (message.filePlans && message.filePlans.length) {
                object.filePlans = [];
                for (let j = 0; j < message.filePlans.length; ++j)
                    object.filePlans[j] = $root.BI.FilePlan.toObject(message.filePlans[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this SubscriptionMcPricingResponse to JSON.
         * @function toJSON
         * @memberof BI.SubscriptionMcPricingResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscriptionMcPricingResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubscriptionMcPricingResponse
         * @function getTypeUrl
         * @memberof BI.SubscriptionMcPricingResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubscriptionMcPricingResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SubscriptionMcPricingResponse";
        };

        return SubscriptionMcPricingResponse;
    })();

    BI.BasePlan = (function() {

        /**
         * Properties of a BasePlan.
         * @memberof BI
         * @interface IBasePlan
         * @property {number|null} [id] BasePlan id
         * @property {BI.ICost|null} [cost] BasePlan cost
         */

        /**
         * Constructs a new BasePlan.
         * @memberof BI
         * @classdesc Represents a BasePlan.
         * @implements IBasePlan
         * @constructor
         * @param {BI.IBasePlan=} [properties] Properties to set
         */
        function BasePlan(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BasePlan id.
         * @member {number} id
         * @memberof BI.BasePlan
         * @instance
         */
        BasePlan.prototype.id = 0;

        /**
         * BasePlan cost.
         * @member {BI.ICost|null|undefined} cost
         * @memberof BI.BasePlan
         * @instance
         */
        BasePlan.prototype.cost = null;

        /**
         * Creates a new BasePlan instance using the specified properties.
         * @function create
         * @memberof BI.BasePlan
         * @static
         * @param {BI.IBasePlan=} [properties] Properties to set
         * @returns {BI.BasePlan} BasePlan instance
         */
        BasePlan.create = function create(properties) {
            return new BasePlan(properties);
        };

        /**
         * Encodes the specified BasePlan message. Does not implicitly {@link BI.BasePlan.verify|verify} messages.
         * @function encode
         * @memberof BI.BasePlan
         * @static
         * @param {BI.IBasePlan} message BasePlan message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BasePlan.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                $root.BI.Cost.encode(message.cost, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a BasePlan message from the specified reader or buffer.
         * @function decode
         * @memberof BI.BasePlan
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.BasePlan} BasePlan
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BasePlan.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.BasePlan();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
                        message.cost = $root.BI.Cost.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates a BasePlan message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.BasePlan
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.BasePlan} BasePlan
         */
        BasePlan.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.BasePlan)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.BasePlan: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.BasePlan();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.cost != null) {
                if (!$util.isObject(object.cost))
                    throw TypeError(".BI.BasePlan.cost: object expected");
                message.cost = $root.BI.Cost.fromObject(object.cost, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a BasePlan message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.BasePlan
         * @static
         * @param {BI.BasePlan} message BasePlan
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BasePlan.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.cost = null;
            }
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                object.cost = $root.BI.Cost.toObject(message.cost, options, q + 1);
            return object;
        };

        /**
         * Converts this BasePlan to JSON.
         * @function toJSON
         * @memberof BI.BasePlan
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BasePlan.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for BasePlan
         * @function getTypeUrl
         * @memberof BI.BasePlan
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        BasePlan.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.BasePlan";
        };

        return BasePlan;
    })();

    BI.Addon = (function() {

        /**
         * Properties of an Addon.
         * @memberof BI
         * @interface IAddon
         * @property {number|null} [id] Addon id
         * @property {BI.ICost|null} [cost] Addon cost
         * @property {number|null} [amountConsumed] Addon amountConsumed
         */

        /**
         * Constructs a new Addon.
         * @memberof BI
         * @classdesc Represents an Addon.
         * @implements IAddon
         * @constructor
         * @param {BI.IAddon=} [properties] Properties to set
         */
        function Addon(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Addon id.
         * @member {number} id
         * @memberof BI.Addon
         * @instance
         */
        Addon.prototype.id = 0;

        /**
         * Addon cost.
         * @member {BI.ICost|null|undefined} cost
         * @memberof BI.Addon
         * @instance
         */
        Addon.prototype.cost = null;

        /**
         * Addon amountConsumed.
         * @member {number} amountConsumed
         * @memberof BI.Addon
         * @instance
         */
        Addon.prototype.amountConsumed = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new Addon instance using the specified properties.
         * @function create
         * @memberof BI.Addon
         * @static
         * @param {BI.IAddon=} [properties] Properties to set
         * @returns {BI.Addon} Addon instance
         */
        Addon.create = function create(properties) {
            return new Addon(properties);
        };

        /**
         * Encodes the specified Addon message. Does not implicitly {@link BI.Addon.verify|verify} messages.
         * @function encode
         * @memberof BI.Addon
         * @static
         * @param {BI.IAddon} message Addon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Addon.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                $root.BI.Cost.encode(message.cost, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.amountConsumed != null && Object.hasOwnProperty.call(message, "amountConsumed"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.amountConsumed);
            return writer;
        };

        /**
         * Decodes an Addon message from the specified reader or buffer.
         * @function decode
         * @memberof BI.Addon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.Addon} Addon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Addon.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.Addon();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
                        message.cost = $root.BI.Cost.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.amountConsumed = reader.int64();
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
         * Creates an Addon message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.Addon
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.Addon} Addon
         */
        Addon.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.Addon)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.Addon: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.Addon();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.cost != null) {
                if (!$util.isObject(object.cost))
                    throw TypeError(".BI.Addon.cost: object expected");
                message.cost = $root.BI.Cost.fromObject(object.cost, long + 1);
            }
            if (object.amountConsumed != null)
                if ($util.Long)
                    message.amountConsumed = $util.Long.fromValue(object.amountConsumed, false);
                else if (typeof object.amountConsumed === "string")
                    message.amountConsumed = parseInt(object.amountConsumed, 10);
                else if (typeof object.amountConsumed === "number")
                    message.amountConsumed = object.amountConsumed;
                else if (typeof object.amountConsumed === "object")
                    message.amountConsumed = new $util.LongBits(object.amountConsumed.low >>> 0, object.amountConsumed.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an Addon message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.Addon
         * @static
         * @param {BI.Addon} message Addon
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Addon.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.cost = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.amountConsumed = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.amountConsumed = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                object.cost = $root.BI.Cost.toObject(message.cost, options, q + 1);
            if (message.amountConsumed != null && Object.hasOwnProperty.call(message, "amountConsumed"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.amountConsumed = typeof message.amountConsumed === "number" ? BigInt(message.amountConsumed) : $util.Long.fromBits(message.amountConsumed.low >>> 0, message.amountConsumed.high >>> 0, false).toBigInt();
                else if (typeof message.amountConsumed === "number")
                    object.amountConsumed = options.longs === String ? String(message.amountConsumed) : message.amountConsumed;
                else
                    object.amountConsumed = options.longs === String ? $util.Long.prototype.toString.call(message.amountConsumed) : options.longs === Number ? new $util.LongBits(message.amountConsumed.low >>> 0, message.amountConsumed.high >>> 0).toNumber() : message.amountConsumed;
            return object;
        };

        /**
         * Converts this Addon to JSON.
         * @function toJSON
         * @memberof BI.Addon
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Addon.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Addon
         * @function getTypeUrl
         * @memberof BI.Addon
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Addon.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.Addon";
        };

        return Addon;
    })();

    BI.FilePlan = (function() {

        /**
         * Properties of a FilePlan.
         * @memberof BI
         * @interface IFilePlan
         * @property {number|null} [id] FilePlan id
         * @property {BI.ICost|null} [cost] FilePlan cost
         */

        /**
         * Constructs a new FilePlan.
         * @memberof BI
         * @classdesc Represents a FilePlan.
         * @implements IFilePlan
         * @constructor
         * @param {BI.IFilePlan=} [properties] Properties to set
         */
        function FilePlan(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FilePlan id.
         * @member {number} id
         * @memberof BI.FilePlan
         * @instance
         */
        FilePlan.prototype.id = 0;

        /**
         * FilePlan cost.
         * @member {BI.ICost|null|undefined} cost
         * @memberof BI.FilePlan
         * @instance
         */
        FilePlan.prototype.cost = null;

        /**
         * Creates a new FilePlan instance using the specified properties.
         * @function create
         * @memberof BI.FilePlan
         * @static
         * @param {BI.IFilePlan=} [properties] Properties to set
         * @returns {BI.FilePlan} FilePlan instance
         */
        FilePlan.create = function create(properties) {
            return new FilePlan(properties);
        };

        /**
         * Encodes the specified FilePlan message. Does not implicitly {@link BI.FilePlan.verify|verify} messages.
         * @function encode
         * @memberof BI.FilePlan
         * @static
         * @param {BI.IFilePlan} message FilePlan message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FilePlan.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                $root.BI.Cost.encode(message.cost, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a FilePlan message from the specified reader or buffer.
         * @function decode
         * @memberof BI.FilePlan
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.FilePlan} FilePlan
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FilePlan.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.FilePlan();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
                        message.cost = $root.BI.Cost.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates a FilePlan message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.FilePlan
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.FilePlan} FilePlan
         */
        FilePlan.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.FilePlan)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.FilePlan: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.FilePlan();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.cost != null) {
                if (!$util.isObject(object.cost))
                    throw TypeError(".BI.FilePlan.cost: object expected");
                message.cost = $root.BI.Cost.fromObject(object.cost, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a FilePlan message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.FilePlan
         * @static
         * @param {BI.FilePlan} message FilePlan
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FilePlan.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.cost = null;
            }
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                object.cost = $root.BI.Cost.toObject(message.cost, options, q + 1);
            return object;
        };

        /**
         * Converts this FilePlan to JSON.
         * @function toJSON
         * @memberof BI.FilePlan
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FilePlan.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for FilePlan
         * @function getTypeUrl
         * @memberof BI.FilePlan
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        FilePlan.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.FilePlan";
        };

        return FilePlan;
    })();

    BI.Cost = (function() {

        /**
         * Properties of a Cost.
         * @memberof BI
         * @interface ICost
         * @property {number|null} [amount] Cost amount
         * @property {BI.Cost.AmountPer|null} [amountPer] Cost amountPer
         * @property {BI.Currency|null} [currency] Cost currency
         * @property {boolean|null} [contactSales] Cost contactSales
         */

        /**
         * Constructs a new Cost.
         * @memberof BI
         * @classdesc Represents a Cost.
         * @implements ICost
         * @constructor
         * @param {BI.ICost=} [properties] Properties to set
         */
        function Cost(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Cost amount.
         * @member {number} amount
         * @memberof BI.Cost
         * @instance
         */
        Cost.prototype.amount = 0;

        /**
         * Cost amountPer.
         * @member {BI.Cost.AmountPer} amountPer
         * @memberof BI.Cost
         * @instance
         */
        Cost.prototype.amountPer = 0;

        /**
         * Cost currency.
         * @member {BI.Currency} currency
         * @memberof BI.Cost
         * @instance
         */
        Cost.prototype.currency = 0;

        /**
         * Cost contactSales.
         * @member {boolean} contactSales
         * @memberof BI.Cost
         * @instance
         */
        Cost.prototype.contactSales = false;

        /**
         * Creates a new Cost instance using the specified properties.
         * @function create
         * @memberof BI.Cost
         * @static
         * @param {BI.ICost=} [properties] Properties to set
         * @returns {BI.Cost} Cost instance
         */
        Cost.create = function create(properties) {
            return new Cost(properties);
        };

        /**
         * Encodes the specified Cost message. Does not implicitly {@link BI.Cost.verify|verify} messages.
         * @function encode
         * @memberof BI.Cost
         * @static
         * @param {BI.ICost} message Cost message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Cost.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 3, wireType 1 =*/25).double(message.amount);
            if (message.amountPer != null && Object.hasOwnProperty.call(message, "amountPer"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.amountPer);
            if (message.currency != null && Object.hasOwnProperty.call(message, "currency"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.currency);
            if (message.contactSales != null && Object.hasOwnProperty.call(message, "contactSales"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.contactSales);
            return writer;
        };

        /**
         * Decodes a Cost message from the specified reader or buffer.
         * @function decode
         * @memberof BI.Cost
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.Cost} Cost
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Cost.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.Cost();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 3: {
                        message.amount = reader.double();
                        break;
                    }
                case 4: {
                        message.amountPer = reader.int32();
                        break;
                    }
                case 5: {
                        message.currency = reader.int32();
                        break;
                    }
                case 6: {
                        message.contactSales = reader.bool();
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
         * Creates a Cost message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.Cost
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.Cost} Cost
         */
        Cost.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.Cost)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.Cost: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.Cost();
            if (object.amount != null)
                message.amount = Number(object.amount);
            switch (object.amountPer) {
            default:
                if (typeof object.amountPer === "number") {
                    message.amountPer = object.amountPer;
                    break;
                }
                break;
            case "UNKNOWN":
            case 0:
                message.amountPer = 0;
                break;
            case "MONTH":
            case 1:
                message.amountPer = 1;
                break;
            case "USER_MONTH":
            case 2:
                message.amountPer = 2;
                break;
            case "USER_CONSUMED_MONTH":
            case 3:
                message.amountPer = 3;
                break;
            case "ENDPOINT_MONTH":
            case 4:
                message.amountPer = 4;
                break;
            case "USER_YEAR":
            case 5:
                message.amountPer = 5;
                break;
            case "USER_CONSUMED_YEAR":
            case 6:
                message.amountPer = 6;
                break;
            case "YEAR":
            case 7:
                message.amountPer = 7;
                break;
            case "ENDPOINT_YEAR":
            case 8:
                message.amountPer = 8;
                break;
            }
            switch (object.currency) {
            default:
                if (typeof object.currency === "number") {
                    message.currency = object.currency;
                    break;
                }
                break;
            case "UNKNOWN":
            case 0:
                message.currency = 0;
                break;
            case "USD":
            case 1:
                message.currency = 1;
                break;
            case "GBP":
            case 2:
                message.currency = 2;
                break;
            case "JPY":
            case 3:
                message.currency = 3;
                break;
            case "EUR":
            case 4:
                message.currency = 4;
                break;
            case "AUD":
            case 5:
                message.currency = 5;
                break;
            case "CAD":
            case 6:
                message.currency = 6;
                break;
            }
            if (object.contactSales != null)
                message.contactSales = Boolean(object.contactSales);
            return message;
        };

        /**
         * Creates a plain object from a Cost message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.Cost
         * @static
         * @param {BI.Cost} message Cost
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Cost.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.amount = 0;
                object.amountPer = options.enums === String ? "UNKNOWN" : 0;
                object.currency = options.enums === String ? "UNKNOWN" : 0;
                object.contactSales = false;
            }
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            if (message.amountPer != null && Object.hasOwnProperty.call(message, "amountPer"))
                object.amountPer = options.enums === String ? $root.BI.Cost.AmountPer[message.amountPer] === undefined ? message.amountPer : $root.BI.Cost.AmountPer[message.amountPer] : message.amountPer;
            if (message.currency != null && Object.hasOwnProperty.call(message, "currency"))
                object.currency = options.enums === String ? $root.BI.Currency[message.currency] === undefined ? message.currency : $root.BI.Currency[message.currency] : message.currency;
            if (message.contactSales != null && Object.hasOwnProperty.call(message, "contactSales"))
                object.contactSales = message.contactSales;
            return object;
        };

        /**
         * Converts this Cost to JSON.
         * @function toJSON
         * @memberof BI.Cost
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Cost.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Cost
         * @function getTypeUrl
         * @memberof BI.Cost
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Cost.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.Cost";
        };

        /**
         * AmountPer enum.
         * @name BI.Cost.AmountPer
         * @enum {number}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} MONTH=1 MONTH value
         * @property {number} USER_MONTH=2 USER_MONTH value
         * @property {number} USER_CONSUMED_MONTH=3 USER_CONSUMED_MONTH value
         * @property {number} ENDPOINT_MONTH=4 ENDPOINT_MONTH value
         * @property {number} USER_YEAR=5 USER_YEAR value
         * @property {number} USER_CONSUMED_YEAR=6 USER_CONSUMED_YEAR value
         * @property {number} YEAR=7 YEAR value
         * @property {number} ENDPOINT_YEAR=8 ENDPOINT_YEAR value
         */
        Cost.AmountPer = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "MONTH"] = 1;
            values[valuesById[2] = "USER_MONTH"] = 2;
            values[valuesById[3] = "USER_CONSUMED_MONTH"] = 3;
            values[valuesById[4] = "ENDPOINT_MONTH"] = 4;
            values[valuesById[5] = "USER_YEAR"] = 5;
            values[valuesById[6] = "USER_CONSUMED_YEAR"] = 6;
            values[valuesById[7] = "YEAR"] = 7;
            values[valuesById[8] = "ENDPOINT_YEAR"] = 8;
            return values;
        })();

        return Cost;
    })();

    BI.InvoiceSearchRequest = (function() {

        /**
         * Properties of an InvoiceSearchRequest.
         * @memberof BI
         * @interface IInvoiceSearchRequest
         * @property {number|null} [size] InvoiceSearchRequest size
         * @property {number|null} [startingAfterId] InvoiceSearchRequest startingAfterId
         * @property {boolean|null} [allInvoicesUnfiltered] InvoiceSearchRequest allInvoicesUnfiltered
         */

        /**
         * Constructs a new InvoiceSearchRequest.
         * @memberof BI
         * @classdesc Represents an InvoiceSearchRequest.
         * @implements IInvoiceSearchRequest
         * @constructor
         * @param {BI.IInvoiceSearchRequest=} [properties] Properties to set
         */
        function InvoiceSearchRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InvoiceSearchRequest size.
         * @member {number} size
         * @memberof BI.InvoiceSearchRequest
         * @instance
         */
        InvoiceSearchRequest.prototype.size = 0;

        /**
         * InvoiceSearchRequest startingAfterId.
         * @member {number} startingAfterId
         * @memberof BI.InvoiceSearchRequest
         * @instance
         */
        InvoiceSearchRequest.prototype.startingAfterId = 0;

        /**
         * InvoiceSearchRequest allInvoicesUnfiltered.
         * @member {boolean} allInvoicesUnfiltered
         * @memberof BI.InvoiceSearchRequest
         * @instance
         */
        InvoiceSearchRequest.prototype.allInvoicesUnfiltered = false;

        /**
         * Creates a new InvoiceSearchRequest instance using the specified properties.
         * @function create
         * @memberof BI.InvoiceSearchRequest
         * @static
         * @param {BI.IInvoiceSearchRequest=} [properties] Properties to set
         * @returns {BI.InvoiceSearchRequest} InvoiceSearchRequest instance
         */
        InvoiceSearchRequest.create = function create(properties) {
            return new InvoiceSearchRequest(properties);
        };

        /**
         * Encodes the specified InvoiceSearchRequest message. Does not implicitly {@link BI.InvoiceSearchRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.InvoiceSearchRequest
         * @static
         * @param {BI.IInvoiceSearchRequest} message InvoiceSearchRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InvoiceSearchRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.size);
            if (message.startingAfterId != null && Object.hasOwnProperty.call(message, "startingAfterId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.startingAfterId);
            if (message.allInvoicesUnfiltered != null && Object.hasOwnProperty.call(message, "allInvoicesUnfiltered"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.allInvoicesUnfiltered);
            return writer;
        };

        /**
         * Decodes an InvoiceSearchRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.InvoiceSearchRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.InvoiceSearchRequest} InvoiceSearchRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InvoiceSearchRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.InvoiceSearchRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.size = reader.int32();
                        break;
                    }
                case 2: {
                        message.startingAfterId = reader.int32();
                        break;
                    }
                case 3: {
                        message.allInvoicesUnfiltered = reader.bool();
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
         * Creates an InvoiceSearchRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.InvoiceSearchRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.InvoiceSearchRequest} InvoiceSearchRequest
         */
        InvoiceSearchRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.InvoiceSearchRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.InvoiceSearchRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.InvoiceSearchRequest();
            if (object.size != null)
                message.size = object.size | 0;
            if (object.startingAfterId != null)
                message.startingAfterId = object.startingAfterId | 0;
            if (object.allInvoicesUnfiltered != null)
                message.allInvoicesUnfiltered = Boolean(object.allInvoicesUnfiltered);
            return message;
        };

        /**
         * Creates a plain object from an InvoiceSearchRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.InvoiceSearchRequest
         * @static
         * @param {BI.InvoiceSearchRequest} message InvoiceSearchRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InvoiceSearchRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.size = 0;
                object.startingAfterId = 0;
                object.allInvoicesUnfiltered = false;
            }
            if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                object.size = message.size;
            if (message.startingAfterId != null && Object.hasOwnProperty.call(message, "startingAfterId"))
                object.startingAfterId = message.startingAfterId;
            if (message.allInvoicesUnfiltered != null && Object.hasOwnProperty.call(message, "allInvoicesUnfiltered"))
                object.allInvoicesUnfiltered = message.allInvoicesUnfiltered;
            return object;
        };

        /**
         * Converts this InvoiceSearchRequest to JSON.
         * @function toJSON
         * @memberof BI.InvoiceSearchRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InvoiceSearchRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for InvoiceSearchRequest
         * @function getTypeUrl
         * @memberof BI.InvoiceSearchRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        InvoiceSearchRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.InvoiceSearchRequest";
        };

        return InvoiceSearchRequest;
    })();

    BI.InvoiceSearchResponse = (function() {

        /**
         * Properties of an InvoiceSearchResponse.
         * @memberof BI
         * @interface IInvoiceSearchResponse
         * @property {Array.<BI.IInvoice>|null} [invoices] InvoiceSearchResponse invoices
         */

        /**
         * Constructs a new InvoiceSearchResponse.
         * @memberof BI
         * @classdesc Represents an InvoiceSearchResponse.
         * @implements IInvoiceSearchResponse
         * @constructor
         * @param {BI.IInvoiceSearchResponse=} [properties] Properties to set
         */
        function InvoiceSearchResponse(properties) {
            this.invoices = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InvoiceSearchResponse invoices.
         * @member {Array.<BI.IInvoice>} invoices
         * @memberof BI.InvoiceSearchResponse
         * @instance
         */
        InvoiceSearchResponse.prototype.invoices = $util.emptyArray;

        /**
         * Creates a new InvoiceSearchResponse instance using the specified properties.
         * @function create
         * @memberof BI.InvoiceSearchResponse
         * @static
         * @param {BI.IInvoiceSearchResponse=} [properties] Properties to set
         * @returns {BI.InvoiceSearchResponse} InvoiceSearchResponse instance
         */
        InvoiceSearchResponse.create = function create(properties) {
            return new InvoiceSearchResponse(properties);
        };

        /**
         * Encodes the specified InvoiceSearchResponse message. Does not implicitly {@link BI.InvoiceSearchResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.InvoiceSearchResponse
         * @static
         * @param {BI.IInvoiceSearchResponse} message InvoiceSearchResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InvoiceSearchResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.invoices != null && message.invoices.length)
                for (let i = 0; i < message.invoices.length; ++i)
                    $root.BI.Invoice.encode(message.invoices[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an InvoiceSearchResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.InvoiceSearchResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.InvoiceSearchResponse} InvoiceSearchResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InvoiceSearchResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.InvoiceSearchResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.invoices && message.invoices.length))
                            message.invoices = [];
                        message.invoices.push($root.BI.Invoice.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates an InvoiceSearchResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.InvoiceSearchResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.InvoiceSearchResponse} InvoiceSearchResponse
         */
        InvoiceSearchResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.InvoiceSearchResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.InvoiceSearchResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.InvoiceSearchResponse();
            if (object.invoices) {
                if (!Array.isArray(object.invoices))
                    throw TypeError(".BI.InvoiceSearchResponse.invoices: array expected");
                message.invoices = [];
                for (let i = 0; i < object.invoices.length; ++i) {
                    if (!$util.isObject(object.invoices[i]))
                        throw TypeError(".BI.InvoiceSearchResponse.invoices: object expected");
                    message.invoices[i] = $root.BI.Invoice.fromObject(object.invoices[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an InvoiceSearchResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.InvoiceSearchResponse
         * @static
         * @param {BI.InvoiceSearchResponse} message InvoiceSearchResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InvoiceSearchResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.invoices = [];
            if (message.invoices && message.invoices.length) {
                object.invoices = [];
                for (let j = 0; j < message.invoices.length; ++j)
                    object.invoices[j] = $root.BI.Invoice.toObject(message.invoices[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this InvoiceSearchResponse to JSON.
         * @function toJSON
         * @memberof BI.InvoiceSearchResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InvoiceSearchResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for InvoiceSearchResponse
         * @function getTypeUrl
         * @memberof BI.InvoiceSearchResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        InvoiceSearchResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.InvoiceSearchResponse";
        };

        return InvoiceSearchResponse;
    })();

    BI.Invoice = (function() {

        /**
         * Properties of an Invoice.
         * @memberof BI
         * @interface IInvoice
         * @property {number|null} [id] Invoice id
         * @property {string|null} [invoiceNumber] Invoice invoiceNumber
         * @property {number|null} [invoiceDate] Invoice invoiceDate
         * @property {number|null} [licenseCount] Invoice licenseCount
         * @property {BI.Invoice.ICost|null} [totalCost] Invoice totalCost
         * @property {BI.Invoice.Type|null} [invoiceType] Invoice invoiceType
         */

        /**
         * Constructs a new Invoice.
         * @memberof BI
         * @classdesc Represents an Invoice.
         * @implements IInvoice
         * @constructor
         * @param {BI.IInvoice=} [properties] Properties to set
         */
        function Invoice(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Invoice id.
         * @member {number} id
         * @memberof BI.Invoice
         * @instance
         */
        Invoice.prototype.id = 0;

        /**
         * Invoice invoiceNumber.
         * @member {string} invoiceNumber
         * @memberof BI.Invoice
         * @instance
         */
        Invoice.prototype.invoiceNumber = "";

        /**
         * Invoice invoiceDate.
         * @member {number} invoiceDate
         * @memberof BI.Invoice
         * @instance
         */
        Invoice.prototype.invoiceDate = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Invoice licenseCount.
         * @member {number} licenseCount
         * @memberof BI.Invoice
         * @instance
         */
        Invoice.prototype.licenseCount = 0;

        /**
         * Invoice totalCost.
         * @member {BI.Invoice.ICost|null|undefined} totalCost
         * @memberof BI.Invoice
         * @instance
         */
        Invoice.prototype.totalCost = null;

        /**
         * Invoice invoiceType.
         * @member {BI.Invoice.Type} invoiceType
         * @memberof BI.Invoice
         * @instance
         */
        Invoice.prototype.invoiceType = 0;

        /**
         * Creates a new Invoice instance using the specified properties.
         * @function create
         * @memberof BI.Invoice
         * @static
         * @param {BI.IInvoice=} [properties] Properties to set
         * @returns {BI.Invoice} Invoice instance
         */
        Invoice.create = function create(properties) {
            return new Invoice(properties);
        };

        /**
         * Encodes the specified Invoice message. Does not implicitly {@link BI.Invoice.verify|verify} messages.
         * @function encode
         * @memberof BI.Invoice
         * @static
         * @param {BI.IInvoice} message Invoice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Invoice.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.invoiceNumber != null && Object.hasOwnProperty.call(message, "invoiceNumber"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.invoiceNumber);
            if (message.invoiceDate != null && Object.hasOwnProperty.call(message, "invoiceDate"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.invoiceDate);
            if (message.licenseCount != null && Object.hasOwnProperty.call(message, "licenseCount"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.licenseCount);
            if (message.totalCost != null && Object.hasOwnProperty.call(message, "totalCost"))
                $root.BI.Invoice.Cost.encode(message.totalCost, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.invoiceType != null && Object.hasOwnProperty.call(message, "invoiceType"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.invoiceType);
            return writer;
        };

        /**
         * Decodes an Invoice message from the specified reader or buffer.
         * @function decode
         * @memberof BI.Invoice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.Invoice} Invoice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Invoice.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.Invoice();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
                        message.invoiceNumber = reader.string();
                        break;
                    }
                case 3: {
                        message.invoiceDate = reader.int64();
                        break;
                    }
                case 4: {
                        message.licenseCount = reader.int32();
                        break;
                    }
                case 5: {
                        message.totalCost = $root.BI.Invoice.Cost.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 6: {
                        message.invoiceType = reader.int32();
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
         * Creates an Invoice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.Invoice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.Invoice} Invoice
         */
        Invoice.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.Invoice)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.Invoice: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.Invoice();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.invoiceNumber != null)
                message.invoiceNumber = String(object.invoiceNumber);
            if (object.invoiceDate != null)
                if ($util.Long)
                    message.invoiceDate = $util.Long.fromValue(object.invoiceDate, false);
                else if (typeof object.invoiceDate === "string")
                    message.invoiceDate = parseInt(object.invoiceDate, 10);
                else if (typeof object.invoiceDate === "number")
                    message.invoiceDate = object.invoiceDate;
                else if (typeof object.invoiceDate === "object")
                    message.invoiceDate = new $util.LongBits(object.invoiceDate.low >>> 0, object.invoiceDate.high >>> 0).toNumber();
            if (object.licenseCount != null)
                message.licenseCount = object.licenseCount | 0;
            if (object.totalCost != null) {
                if (!$util.isObject(object.totalCost))
                    throw TypeError(".BI.Invoice.totalCost: object expected");
                message.totalCost = $root.BI.Invoice.Cost.fromObject(object.totalCost, long + 1);
            }
            switch (object.invoiceType) {
            default:
                if (typeof object.invoiceType === "number") {
                    message.invoiceType = object.invoiceType;
                    break;
                }
                break;
            case "UNKNOWN":
            case 0:
                message.invoiceType = 0;
                break;
            case "NEW":
            case 1:
                message.invoiceType = 1;
                break;
            case "RENEWAL":
            case 2:
                message.invoiceType = 2;
                break;
            case "UPGRADE":
            case 3:
                message.invoiceType = 3;
                break;
            case "RESTORE":
            case 4:
                message.invoiceType = 4;
                break;
            case "ASSOCIATION":
            case 5:
                message.invoiceType = 5;
                break;
            case "OVERAGE":
            case 6:
                message.invoiceType = 6;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an Invoice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.Invoice
         * @static
         * @param {BI.Invoice} message Invoice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Invoice.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.invoiceNumber = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.invoiceDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.invoiceDate = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.licenseCount = 0;
                object.totalCost = null;
                object.invoiceType = options.enums === String ? "UNKNOWN" : 0;
            }
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.invoiceNumber != null && Object.hasOwnProperty.call(message, "invoiceNumber"))
                object.invoiceNumber = message.invoiceNumber;
            if (message.invoiceDate != null && Object.hasOwnProperty.call(message, "invoiceDate"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.invoiceDate = typeof message.invoiceDate === "number" ? BigInt(message.invoiceDate) : $util.Long.fromBits(message.invoiceDate.low >>> 0, message.invoiceDate.high >>> 0, false).toBigInt();
                else if (typeof message.invoiceDate === "number")
                    object.invoiceDate = options.longs === String ? String(message.invoiceDate) : message.invoiceDate;
                else
                    object.invoiceDate = options.longs === String ? $util.Long.prototype.toString.call(message.invoiceDate) : options.longs === Number ? new $util.LongBits(message.invoiceDate.low >>> 0, message.invoiceDate.high >>> 0).toNumber() : message.invoiceDate;
            if (message.licenseCount != null && Object.hasOwnProperty.call(message, "licenseCount"))
                object.licenseCount = message.licenseCount;
            if (message.totalCost != null && Object.hasOwnProperty.call(message, "totalCost"))
                object.totalCost = $root.BI.Invoice.Cost.toObject(message.totalCost, options, q + 1);
            if (message.invoiceType != null && Object.hasOwnProperty.call(message, "invoiceType"))
                object.invoiceType = options.enums === String ? $root.BI.Invoice.Type[message.invoiceType] === undefined ? message.invoiceType : $root.BI.Invoice.Type[message.invoiceType] : message.invoiceType;
            return object;
        };

        /**
         * Converts this Invoice to JSON.
         * @function toJSON
         * @memberof BI.Invoice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Invoice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Invoice
         * @function getTypeUrl
         * @memberof BI.Invoice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Invoice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.Invoice";
        };

        Invoice.Cost = (function() {

            /**
             * Properties of a Cost.
             * @memberof BI.Invoice
             * @interface ICost
             * @property {number|null} [amount] Cost amount
             * @property {BI.Currency|null} [currency] Cost currency
             */

            /**
             * Constructs a new Cost.
             * @memberof BI.Invoice
             * @classdesc Represents a Cost.
             * @implements ICost
             * @constructor
             * @param {BI.Invoice.ICost=} [properties] Properties to set
             */
            function Cost(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Cost amount.
             * @member {number} amount
             * @memberof BI.Invoice.Cost
             * @instance
             */
            Cost.prototype.amount = 0;

            /**
             * Cost currency.
             * @member {BI.Currency} currency
             * @memberof BI.Invoice.Cost
             * @instance
             */
            Cost.prototype.currency = 0;

            /**
             * Creates a new Cost instance using the specified properties.
             * @function create
             * @memberof BI.Invoice.Cost
             * @static
             * @param {BI.Invoice.ICost=} [properties] Properties to set
             * @returns {BI.Invoice.Cost} Cost instance
             */
            Cost.create = function create(properties) {
                return new Cost(properties);
            };

            /**
             * Encodes the specified Cost message. Does not implicitly {@link BI.Invoice.Cost.verify|verify} messages.
             * @function encode
             * @memberof BI.Invoice.Cost
             * @static
             * @param {BI.Invoice.ICost} message Cost message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Cost.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.amount);
                if (message.currency != null && Object.hasOwnProperty.call(message, "currency"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.currency);
                return writer;
            };

            /**
             * Decodes a Cost message from the specified reader or buffer.
             * @function decode
             * @memberof BI.Invoice.Cost
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BI.Invoice.Cost} Cost
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Cost.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.Invoice.Cost();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.amount = reader.double();
                            break;
                        }
                    case 2: {
                            message.currency = reader.int32();
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
             * Creates a Cost message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BI.Invoice.Cost
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BI.Invoice.Cost} Cost
             */
            Cost.fromObject = function fromObject(object, long) {
                if (object instanceof $root.BI.Invoice.Cost)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".BI.Invoice.Cost: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.BI.Invoice.Cost();
                if (object.amount != null)
                    message.amount = Number(object.amount);
                switch (object.currency) {
                default:
                    if (typeof object.currency === "number") {
                        message.currency = object.currency;
                        break;
                    }
                    break;
                case "UNKNOWN":
                case 0:
                    message.currency = 0;
                    break;
                case "USD":
                case 1:
                    message.currency = 1;
                    break;
                case "GBP":
                case 2:
                    message.currency = 2;
                    break;
                case "JPY":
                case 3:
                    message.currency = 3;
                    break;
                case "EUR":
                case 4:
                    message.currency = 4;
                    break;
                case "AUD":
                case 5:
                    message.currency = 5;
                    break;
                case "CAD":
                case 6:
                    message.currency = 6;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a Cost message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BI.Invoice.Cost
             * @static
             * @param {BI.Invoice.Cost} message Cost
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Cost.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.amount = 0;
                    object.currency = options.enums === String ? "UNKNOWN" : 0;
                }
                if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                    object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
                if (message.currency != null && Object.hasOwnProperty.call(message, "currency"))
                    object.currency = options.enums === String ? $root.BI.Currency[message.currency] === undefined ? message.currency : $root.BI.Currency[message.currency] : message.currency;
                return object;
            };

            /**
             * Converts this Cost to JSON.
             * @function toJSON
             * @memberof BI.Invoice.Cost
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Cost.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Cost
             * @function getTypeUrl
             * @memberof BI.Invoice.Cost
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Cost.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/BI.Invoice.Cost";
            };

            return Cost;
        })();

        /**
         * Type enum.
         * @name BI.Invoice.Type
         * @enum {number}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} NEW=1 NEW value
         * @property {number} RENEWAL=2 RENEWAL value
         * @property {number} UPGRADE=3 UPGRADE value
         * @property {number} RESTORE=4 RESTORE value
         * @property {number} ASSOCIATION=5 ASSOCIATION value
         * @property {number} OVERAGE=6 OVERAGE value
         */
        Invoice.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "NEW"] = 1;
            values[valuesById[2] = "RENEWAL"] = 2;
            values[valuesById[3] = "UPGRADE"] = 3;
            values[valuesById[4] = "RESTORE"] = 4;
            values[valuesById[5] = "ASSOCIATION"] = 5;
            values[valuesById[6] = "OVERAGE"] = 6;
            return values;
        })();

        return Invoice;
    })();

    BI.VaultInvoicesListRequest = (function() {

        /**
         * Properties of a VaultInvoicesListRequest.
         * @memberof BI
         * @interface IVaultInvoicesListRequest
         */

        /**
         * Constructs a new VaultInvoicesListRequest.
         * @memberof BI
         * @classdesc Represents a VaultInvoicesListRequest.
         * @implements IVaultInvoicesListRequest
         * @constructor
         * @param {BI.IVaultInvoicesListRequest=} [properties] Properties to set
         */
        function VaultInvoicesListRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new VaultInvoicesListRequest instance using the specified properties.
         * @function create
         * @memberof BI.VaultInvoicesListRequest
         * @static
         * @param {BI.IVaultInvoicesListRequest=} [properties] Properties to set
         * @returns {BI.VaultInvoicesListRequest} VaultInvoicesListRequest instance
         */
        VaultInvoicesListRequest.create = function create(properties) {
            return new VaultInvoicesListRequest(properties);
        };

        /**
         * Encodes the specified VaultInvoicesListRequest message. Does not implicitly {@link BI.VaultInvoicesListRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.VaultInvoicesListRequest
         * @static
         * @param {BI.IVaultInvoicesListRequest} message VaultInvoicesListRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VaultInvoicesListRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a VaultInvoicesListRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.VaultInvoicesListRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.VaultInvoicesListRequest} VaultInvoicesListRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VaultInvoicesListRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.VaultInvoicesListRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a VaultInvoicesListRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.VaultInvoicesListRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.VaultInvoicesListRequest} VaultInvoicesListRequest
         */
        VaultInvoicesListRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.VaultInvoicesListRequest)
                return object;
            return new $root.BI.VaultInvoicesListRequest();
        };

        /**
         * Creates a plain object from a VaultInvoicesListRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.VaultInvoicesListRequest
         * @static
         * @param {BI.VaultInvoicesListRequest} message VaultInvoicesListRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VaultInvoicesListRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this VaultInvoicesListRequest to JSON.
         * @function toJSON
         * @memberof BI.VaultInvoicesListRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VaultInvoicesListRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for VaultInvoicesListRequest
         * @function getTypeUrl
         * @memberof BI.VaultInvoicesListRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        VaultInvoicesListRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.VaultInvoicesListRequest";
        };

        return VaultInvoicesListRequest;
    })();

    BI.VaultInvoicesListResponse = (function() {

        /**
         * Properties of a VaultInvoicesListResponse.
         * @memberof BI
         * @interface IVaultInvoicesListResponse
         * @property {Array.<BI.IVaultInvoice>|null} [invoices] VaultInvoicesListResponse invoices
         */

        /**
         * Constructs a new VaultInvoicesListResponse.
         * @memberof BI
         * @classdesc Represents a VaultInvoicesListResponse.
         * @implements IVaultInvoicesListResponse
         * @constructor
         * @param {BI.IVaultInvoicesListResponse=} [properties] Properties to set
         */
        function VaultInvoicesListResponse(properties) {
            this.invoices = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VaultInvoicesListResponse invoices.
         * @member {Array.<BI.IVaultInvoice>} invoices
         * @memberof BI.VaultInvoicesListResponse
         * @instance
         */
        VaultInvoicesListResponse.prototype.invoices = $util.emptyArray;

        /**
         * Creates a new VaultInvoicesListResponse instance using the specified properties.
         * @function create
         * @memberof BI.VaultInvoicesListResponse
         * @static
         * @param {BI.IVaultInvoicesListResponse=} [properties] Properties to set
         * @returns {BI.VaultInvoicesListResponse} VaultInvoicesListResponse instance
         */
        VaultInvoicesListResponse.create = function create(properties) {
            return new VaultInvoicesListResponse(properties);
        };

        /**
         * Encodes the specified VaultInvoicesListResponse message. Does not implicitly {@link BI.VaultInvoicesListResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.VaultInvoicesListResponse
         * @static
         * @param {BI.IVaultInvoicesListResponse} message VaultInvoicesListResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VaultInvoicesListResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.invoices != null && message.invoices.length)
                for (let i = 0; i < message.invoices.length; ++i)
                    $root.BI.VaultInvoice.encode(message.invoices[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a VaultInvoicesListResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.VaultInvoicesListResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.VaultInvoicesListResponse} VaultInvoicesListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VaultInvoicesListResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.VaultInvoicesListResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.invoices && message.invoices.length))
                            message.invoices = [];
                        message.invoices.push($root.BI.VaultInvoice.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a VaultInvoicesListResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.VaultInvoicesListResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.VaultInvoicesListResponse} VaultInvoicesListResponse
         */
        VaultInvoicesListResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.VaultInvoicesListResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.VaultInvoicesListResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.VaultInvoicesListResponse();
            if (object.invoices) {
                if (!Array.isArray(object.invoices))
                    throw TypeError(".BI.VaultInvoicesListResponse.invoices: array expected");
                message.invoices = [];
                for (let i = 0; i < object.invoices.length; ++i) {
                    if (!$util.isObject(object.invoices[i]))
                        throw TypeError(".BI.VaultInvoicesListResponse.invoices: object expected");
                    message.invoices[i] = $root.BI.VaultInvoice.fromObject(object.invoices[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a VaultInvoicesListResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.VaultInvoicesListResponse
         * @static
         * @param {BI.VaultInvoicesListResponse} message VaultInvoicesListResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VaultInvoicesListResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.invoices = [];
            if (message.invoices && message.invoices.length) {
                object.invoices = [];
                for (let j = 0; j < message.invoices.length; ++j)
                    object.invoices[j] = $root.BI.VaultInvoice.toObject(message.invoices[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this VaultInvoicesListResponse to JSON.
         * @function toJSON
         * @memberof BI.VaultInvoicesListResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VaultInvoicesListResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for VaultInvoicesListResponse
         * @function getTypeUrl
         * @memberof BI.VaultInvoicesListResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        VaultInvoicesListResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.VaultInvoicesListResponse";
        };

        return VaultInvoicesListResponse;
    })();

    BI.VaultInvoice = (function() {

        /**
         * Properties of a VaultInvoice.
         * @memberof BI
         * @interface IVaultInvoice
         * @property {number|null} [id] VaultInvoice id
         * @property {string|null} [invoiceNumber] VaultInvoice invoiceNumber
         * @property {number|null} [dateCreated] VaultInvoice dateCreated
         * @property {BI.Invoice.ICost|null} [total] VaultInvoice total
         * @property {BI.Invoice.Type|null} [purchaseType] VaultInvoice purchaseType
         */

        /**
         * Constructs a new VaultInvoice.
         * @memberof BI
         * @classdesc Represents a VaultInvoice.
         * @implements IVaultInvoice
         * @constructor
         * @param {BI.IVaultInvoice=} [properties] Properties to set
         */
        function VaultInvoice(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VaultInvoice id.
         * @member {number} id
         * @memberof BI.VaultInvoice
         * @instance
         */
        VaultInvoice.prototype.id = 0;

        /**
         * VaultInvoice invoiceNumber.
         * @member {string} invoiceNumber
         * @memberof BI.VaultInvoice
         * @instance
         */
        VaultInvoice.prototype.invoiceNumber = "";

        /**
         * VaultInvoice dateCreated.
         * @member {number} dateCreated
         * @memberof BI.VaultInvoice
         * @instance
         */
        VaultInvoice.prototype.dateCreated = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * VaultInvoice total.
         * @member {BI.Invoice.ICost|null|undefined} total
         * @memberof BI.VaultInvoice
         * @instance
         */
        VaultInvoice.prototype.total = null;

        /**
         * VaultInvoice purchaseType.
         * @member {BI.Invoice.Type} purchaseType
         * @memberof BI.VaultInvoice
         * @instance
         */
        VaultInvoice.prototype.purchaseType = 0;

        /**
         * Creates a new VaultInvoice instance using the specified properties.
         * @function create
         * @memberof BI.VaultInvoice
         * @static
         * @param {BI.IVaultInvoice=} [properties] Properties to set
         * @returns {BI.VaultInvoice} VaultInvoice instance
         */
        VaultInvoice.create = function create(properties) {
            return new VaultInvoice(properties);
        };

        /**
         * Encodes the specified VaultInvoice message. Does not implicitly {@link BI.VaultInvoice.verify|verify} messages.
         * @function encode
         * @memberof BI.VaultInvoice
         * @static
         * @param {BI.IVaultInvoice} message VaultInvoice message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VaultInvoice.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.invoiceNumber != null && Object.hasOwnProperty.call(message, "invoiceNumber"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.invoiceNumber);
            if (message.dateCreated != null && Object.hasOwnProperty.call(message, "dateCreated"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.dateCreated);
            if (message.total != null && Object.hasOwnProperty.call(message, "total"))
                $root.BI.Invoice.Cost.encode(message.total, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.purchaseType != null && Object.hasOwnProperty.call(message, "purchaseType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.purchaseType);
            return writer;
        };

        /**
         * Decodes a VaultInvoice message from the specified reader or buffer.
         * @function decode
         * @memberof BI.VaultInvoice
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.VaultInvoice} VaultInvoice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VaultInvoice.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.VaultInvoice();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
                        message.invoiceNumber = reader.string();
                        break;
                    }
                case 3: {
                        message.dateCreated = reader.int64();
                        break;
                    }
                case 4: {
                        message.total = $root.BI.Invoice.Cost.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 5: {
                        message.purchaseType = reader.int32();
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
         * Creates a VaultInvoice message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.VaultInvoice
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.VaultInvoice} VaultInvoice
         */
        VaultInvoice.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.VaultInvoice)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.VaultInvoice: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.VaultInvoice();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.invoiceNumber != null)
                message.invoiceNumber = String(object.invoiceNumber);
            if (object.dateCreated != null)
                if ($util.Long)
                    message.dateCreated = $util.Long.fromValue(object.dateCreated, false);
                else if (typeof object.dateCreated === "string")
                    message.dateCreated = parseInt(object.dateCreated, 10);
                else if (typeof object.dateCreated === "number")
                    message.dateCreated = object.dateCreated;
                else if (typeof object.dateCreated === "object")
                    message.dateCreated = new $util.LongBits(object.dateCreated.low >>> 0, object.dateCreated.high >>> 0).toNumber();
            if (object.total != null) {
                if (!$util.isObject(object.total))
                    throw TypeError(".BI.VaultInvoice.total: object expected");
                message.total = $root.BI.Invoice.Cost.fromObject(object.total, long + 1);
            }
            switch (object.purchaseType) {
            default:
                if (typeof object.purchaseType === "number") {
                    message.purchaseType = object.purchaseType;
                    break;
                }
                break;
            case "UNKNOWN":
            case 0:
                message.purchaseType = 0;
                break;
            case "NEW":
            case 1:
                message.purchaseType = 1;
                break;
            case "RENEWAL":
            case 2:
                message.purchaseType = 2;
                break;
            case "UPGRADE":
            case 3:
                message.purchaseType = 3;
                break;
            case "RESTORE":
            case 4:
                message.purchaseType = 4;
                break;
            case "ASSOCIATION":
            case 5:
                message.purchaseType = 5;
                break;
            case "OVERAGE":
            case 6:
                message.purchaseType = 6;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a VaultInvoice message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.VaultInvoice
         * @static
         * @param {BI.VaultInvoice} message VaultInvoice
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VaultInvoice.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.invoiceNumber = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.dateCreated = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.dateCreated = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.total = null;
                object.purchaseType = options.enums === String ? "UNKNOWN" : 0;
            }
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.invoiceNumber != null && Object.hasOwnProperty.call(message, "invoiceNumber"))
                object.invoiceNumber = message.invoiceNumber;
            if (message.dateCreated != null && Object.hasOwnProperty.call(message, "dateCreated"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.dateCreated = typeof message.dateCreated === "number" ? BigInt(message.dateCreated) : $util.Long.fromBits(message.dateCreated.low >>> 0, message.dateCreated.high >>> 0, false).toBigInt();
                else if (typeof message.dateCreated === "number")
                    object.dateCreated = options.longs === String ? String(message.dateCreated) : message.dateCreated;
                else
                    object.dateCreated = options.longs === String ? $util.Long.prototype.toString.call(message.dateCreated) : options.longs === Number ? new $util.LongBits(message.dateCreated.low >>> 0, message.dateCreated.high >>> 0).toNumber() : message.dateCreated;
            if (message.total != null && Object.hasOwnProperty.call(message, "total"))
                object.total = $root.BI.Invoice.Cost.toObject(message.total, options, q + 1);
            if (message.purchaseType != null && Object.hasOwnProperty.call(message, "purchaseType"))
                object.purchaseType = options.enums === String ? $root.BI.Invoice.Type[message.purchaseType] === undefined ? message.purchaseType : $root.BI.Invoice.Type[message.purchaseType] : message.purchaseType;
            return object;
        };

        /**
         * Converts this VaultInvoice to JSON.
         * @function toJSON
         * @memberof BI.VaultInvoice
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VaultInvoice.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for VaultInvoice
         * @function getTypeUrl
         * @memberof BI.VaultInvoice
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        VaultInvoice.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.VaultInvoice";
        };

        return VaultInvoice;
    })();

    BI.InvoiceDownloadRequest = (function() {

        /**
         * Properties of an InvoiceDownloadRequest.
         * @memberof BI
         * @interface IInvoiceDownloadRequest
         * @property {string|null} [invoiceNumber] InvoiceDownloadRequest invoiceNumber
         */

        /**
         * Constructs a new InvoiceDownloadRequest.
         * @memberof BI
         * @classdesc Represents an InvoiceDownloadRequest.
         * @implements IInvoiceDownloadRequest
         * @constructor
         * @param {BI.IInvoiceDownloadRequest=} [properties] Properties to set
         */
        function InvoiceDownloadRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InvoiceDownloadRequest invoiceNumber.
         * @member {string} invoiceNumber
         * @memberof BI.InvoiceDownloadRequest
         * @instance
         */
        InvoiceDownloadRequest.prototype.invoiceNumber = "";

        /**
         * Creates a new InvoiceDownloadRequest instance using the specified properties.
         * @function create
         * @memberof BI.InvoiceDownloadRequest
         * @static
         * @param {BI.IInvoiceDownloadRequest=} [properties] Properties to set
         * @returns {BI.InvoiceDownloadRequest} InvoiceDownloadRequest instance
         */
        InvoiceDownloadRequest.create = function create(properties) {
            return new InvoiceDownloadRequest(properties);
        };

        /**
         * Encodes the specified InvoiceDownloadRequest message. Does not implicitly {@link BI.InvoiceDownloadRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.InvoiceDownloadRequest
         * @static
         * @param {BI.IInvoiceDownloadRequest} message InvoiceDownloadRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InvoiceDownloadRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.invoiceNumber != null && Object.hasOwnProperty.call(message, "invoiceNumber"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.invoiceNumber);
            return writer;
        };

        /**
         * Decodes an InvoiceDownloadRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.InvoiceDownloadRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.InvoiceDownloadRequest} InvoiceDownloadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InvoiceDownloadRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.InvoiceDownloadRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.invoiceNumber = reader.string();
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
         * Creates an InvoiceDownloadRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.InvoiceDownloadRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.InvoiceDownloadRequest} InvoiceDownloadRequest
         */
        InvoiceDownloadRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.InvoiceDownloadRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.InvoiceDownloadRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.InvoiceDownloadRequest();
            if (object.invoiceNumber != null)
                message.invoiceNumber = String(object.invoiceNumber);
            return message;
        };

        /**
         * Creates a plain object from an InvoiceDownloadRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.InvoiceDownloadRequest
         * @static
         * @param {BI.InvoiceDownloadRequest} message InvoiceDownloadRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InvoiceDownloadRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.invoiceNumber = "";
            if (message.invoiceNumber != null && Object.hasOwnProperty.call(message, "invoiceNumber"))
                object.invoiceNumber = message.invoiceNumber;
            return object;
        };

        /**
         * Converts this InvoiceDownloadRequest to JSON.
         * @function toJSON
         * @memberof BI.InvoiceDownloadRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InvoiceDownloadRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for InvoiceDownloadRequest
         * @function getTypeUrl
         * @memberof BI.InvoiceDownloadRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        InvoiceDownloadRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.InvoiceDownloadRequest";
        };

        return InvoiceDownloadRequest;
    })();

    BI.InvoiceDownloadResponse = (function() {

        /**
         * Properties of an InvoiceDownloadResponse.
         * @memberof BI
         * @interface IInvoiceDownloadResponse
         * @property {string|null} [link] InvoiceDownloadResponse link
         * @property {string|null} [fileName] InvoiceDownloadResponse fileName
         */

        /**
         * Constructs a new InvoiceDownloadResponse.
         * @memberof BI
         * @classdesc Represents an InvoiceDownloadResponse.
         * @implements IInvoiceDownloadResponse
         * @constructor
         * @param {BI.IInvoiceDownloadResponse=} [properties] Properties to set
         */
        function InvoiceDownloadResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InvoiceDownloadResponse link.
         * @member {string} link
         * @memberof BI.InvoiceDownloadResponse
         * @instance
         */
        InvoiceDownloadResponse.prototype.link = "";

        /**
         * InvoiceDownloadResponse fileName.
         * @member {string} fileName
         * @memberof BI.InvoiceDownloadResponse
         * @instance
         */
        InvoiceDownloadResponse.prototype.fileName = "";

        /**
         * Creates a new InvoiceDownloadResponse instance using the specified properties.
         * @function create
         * @memberof BI.InvoiceDownloadResponse
         * @static
         * @param {BI.IInvoiceDownloadResponse=} [properties] Properties to set
         * @returns {BI.InvoiceDownloadResponse} InvoiceDownloadResponse instance
         */
        InvoiceDownloadResponse.create = function create(properties) {
            return new InvoiceDownloadResponse(properties);
        };

        /**
         * Encodes the specified InvoiceDownloadResponse message. Does not implicitly {@link BI.InvoiceDownloadResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.InvoiceDownloadResponse
         * @static
         * @param {BI.IInvoiceDownloadResponse} message InvoiceDownloadResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InvoiceDownloadResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.link != null && Object.hasOwnProperty.call(message, "link"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.link);
            if (message.fileName != null && Object.hasOwnProperty.call(message, "fileName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.fileName);
            return writer;
        };

        /**
         * Decodes an InvoiceDownloadResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.InvoiceDownloadResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.InvoiceDownloadResponse} InvoiceDownloadResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InvoiceDownloadResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.InvoiceDownloadResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.link = reader.string();
                        break;
                    }
                case 2: {
                        message.fileName = reader.string();
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
         * Creates an InvoiceDownloadResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.InvoiceDownloadResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.InvoiceDownloadResponse} InvoiceDownloadResponse
         */
        InvoiceDownloadResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.InvoiceDownloadResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.InvoiceDownloadResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.InvoiceDownloadResponse();
            if (object.link != null)
                message.link = String(object.link);
            if (object.fileName != null)
                message.fileName = String(object.fileName);
            return message;
        };

        /**
         * Creates a plain object from an InvoiceDownloadResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.InvoiceDownloadResponse
         * @static
         * @param {BI.InvoiceDownloadResponse} message InvoiceDownloadResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InvoiceDownloadResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.link = "";
                object.fileName = "";
            }
            if (message.link != null && Object.hasOwnProperty.call(message, "link"))
                object.link = message.link;
            if (message.fileName != null && Object.hasOwnProperty.call(message, "fileName"))
                object.fileName = message.fileName;
            return object;
        };

        /**
         * Converts this InvoiceDownloadResponse to JSON.
         * @function toJSON
         * @memberof BI.InvoiceDownloadResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InvoiceDownloadResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for InvoiceDownloadResponse
         * @function getTypeUrl
         * @memberof BI.InvoiceDownloadResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        InvoiceDownloadResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.InvoiceDownloadResponse";
        };

        return InvoiceDownloadResponse;
    })();

    BI.VaultInvoiceDownloadLinkRequest = (function() {

        /**
         * Properties of a VaultInvoiceDownloadLinkRequest.
         * @memberof BI
         * @interface IVaultInvoiceDownloadLinkRequest
         * @property {string|null} [invoiceNumber] VaultInvoiceDownloadLinkRequest invoiceNumber
         */

        /**
         * Constructs a new VaultInvoiceDownloadLinkRequest.
         * @memberof BI
         * @classdesc Represents a VaultInvoiceDownloadLinkRequest.
         * @implements IVaultInvoiceDownloadLinkRequest
         * @constructor
         * @param {BI.IVaultInvoiceDownloadLinkRequest=} [properties] Properties to set
         */
        function VaultInvoiceDownloadLinkRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VaultInvoiceDownloadLinkRequest invoiceNumber.
         * @member {string} invoiceNumber
         * @memberof BI.VaultInvoiceDownloadLinkRequest
         * @instance
         */
        VaultInvoiceDownloadLinkRequest.prototype.invoiceNumber = "";

        /**
         * Creates a new VaultInvoiceDownloadLinkRequest instance using the specified properties.
         * @function create
         * @memberof BI.VaultInvoiceDownloadLinkRequest
         * @static
         * @param {BI.IVaultInvoiceDownloadLinkRequest=} [properties] Properties to set
         * @returns {BI.VaultInvoiceDownloadLinkRequest} VaultInvoiceDownloadLinkRequest instance
         */
        VaultInvoiceDownloadLinkRequest.create = function create(properties) {
            return new VaultInvoiceDownloadLinkRequest(properties);
        };

        /**
         * Encodes the specified VaultInvoiceDownloadLinkRequest message. Does not implicitly {@link BI.VaultInvoiceDownloadLinkRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.VaultInvoiceDownloadLinkRequest
         * @static
         * @param {BI.IVaultInvoiceDownloadLinkRequest} message VaultInvoiceDownloadLinkRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VaultInvoiceDownloadLinkRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.invoiceNumber != null && Object.hasOwnProperty.call(message, "invoiceNumber"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.invoiceNumber);
            return writer;
        };

        /**
         * Decodes a VaultInvoiceDownloadLinkRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.VaultInvoiceDownloadLinkRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.VaultInvoiceDownloadLinkRequest} VaultInvoiceDownloadLinkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VaultInvoiceDownloadLinkRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.VaultInvoiceDownloadLinkRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.invoiceNumber = reader.string();
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
         * Creates a VaultInvoiceDownloadLinkRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.VaultInvoiceDownloadLinkRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.VaultInvoiceDownloadLinkRequest} VaultInvoiceDownloadLinkRequest
         */
        VaultInvoiceDownloadLinkRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.VaultInvoiceDownloadLinkRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.VaultInvoiceDownloadLinkRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.VaultInvoiceDownloadLinkRequest();
            if (object.invoiceNumber != null)
                message.invoiceNumber = String(object.invoiceNumber);
            return message;
        };

        /**
         * Creates a plain object from a VaultInvoiceDownloadLinkRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.VaultInvoiceDownloadLinkRequest
         * @static
         * @param {BI.VaultInvoiceDownloadLinkRequest} message VaultInvoiceDownloadLinkRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VaultInvoiceDownloadLinkRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.invoiceNumber = "";
            if (message.invoiceNumber != null && Object.hasOwnProperty.call(message, "invoiceNumber"))
                object.invoiceNumber = message.invoiceNumber;
            return object;
        };

        /**
         * Converts this VaultInvoiceDownloadLinkRequest to JSON.
         * @function toJSON
         * @memberof BI.VaultInvoiceDownloadLinkRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VaultInvoiceDownloadLinkRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for VaultInvoiceDownloadLinkRequest
         * @function getTypeUrl
         * @memberof BI.VaultInvoiceDownloadLinkRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        VaultInvoiceDownloadLinkRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.VaultInvoiceDownloadLinkRequest";
        };

        return VaultInvoiceDownloadLinkRequest;
    })();

    BI.VaultInvoiceDownloadLinkResponse = (function() {

        /**
         * Properties of a VaultInvoiceDownloadLinkResponse.
         * @memberof BI
         * @interface IVaultInvoiceDownloadLinkResponse
         * @property {string|null} [link] VaultInvoiceDownloadLinkResponse link
         * @property {string|null} [fileName] VaultInvoiceDownloadLinkResponse fileName
         */

        /**
         * Constructs a new VaultInvoiceDownloadLinkResponse.
         * @memberof BI
         * @classdesc Represents a VaultInvoiceDownloadLinkResponse.
         * @implements IVaultInvoiceDownloadLinkResponse
         * @constructor
         * @param {BI.IVaultInvoiceDownloadLinkResponse=} [properties] Properties to set
         */
        function VaultInvoiceDownloadLinkResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VaultInvoiceDownloadLinkResponse link.
         * @member {string} link
         * @memberof BI.VaultInvoiceDownloadLinkResponse
         * @instance
         */
        VaultInvoiceDownloadLinkResponse.prototype.link = "";

        /**
         * VaultInvoiceDownloadLinkResponse fileName.
         * @member {string} fileName
         * @memberof BI.VaultInvoiceDownloadLinkResponse
         * @instance
         */
        VaultInvoiceDownloadLinkResponse.prototype.fileName = "";

        /**
         * Creates a new VaultInvoiceDownloadLinkResponse instance using the specified properties.
         * @function create
         * @memberof BI.VaultInvoiceDownloadLinkResponse
         * @static
         * @param {BI.IVaultInvoiceDownloadLinkResponse=} [properties] Properties to set
         * @returns {BI.VaultInvoiceDownloadLinkResponse} VaultInvoiceDownloadLinkResponse instance
         */
        VaultInvoiceDownloadLinkResponse.create = function create(properties) {
            return new VaultInvoiceDownloadLinkResponse(properties);
        };

        /**
         * Encodes the specified VaultInvoiceDownloadLinkResponse message. Does not implicitly {@link BI.VaultInvoiceDownloadLinkResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.VaultInvoiceDownloadLinkResponse
         * @static
         * @param {BI.IVaultInvoiceDownloadLinkResponse} message VaultInvoiceDownloadLinkResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VaultInvoiceDownloadLinkResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.link != null && Object.hasOwnProperty.call(message, "link"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.link);
            if (message.fileName != null && Object.hasOwnProperty.call(message, "fileName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.fileName);
            return writer;
        };

        /**
         * Decodes a VaultInvoiceDownloadLinkResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.VaultInvoiceDownloadLinkResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.VaultInvoiceDownloadLinkResponse} VaultInvoiceDownloadLinkResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VaultInvoiceDownloadLinkResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.VaultInvoiceDownloadLinkResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.link = reader.string();
                        break;
                    }
                case 2: {
                        message.fileName = reader.string();
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
         * Creates a VaultInvoiceDownloadLinkResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.VaultInvoiceDownloadLinkResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.VaultInvoiceDownloadLinkResponse} VaultInvoiceDownloadLinkResponse
         */
        VaultInvoiceDownloadLinkResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.VaultInvoiceDownloadLinkResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.VaultInvoiceDownloadLinkResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.VaultInvoiceDownloadLinkResponse();
            if (object.link != null)
                message.link = String(object.link);
            if (object.fileName != null)
                message.fileName = String(object.fileName);
            return message;
        };

        /**
         * Creates a plain object from a VaultInvoiceDownloadLinkResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.VaultInvoiceDownloadLinkResponse
         * @static
         * @param {BI.VaultInvoiceDownloadLinkResponse} message VaultInvoiceDownloadLinkResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VaultInvoiceDownloadLinkResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.link = "";
                object.fileName = "";
            }
            if (message.link != null && Object.hasOwnProperty.call(message, "link"))
                object.link = message.link;
            if (message.fileName != null && Object.hasOwnProperty.call(message, "fileName"))
                object.fileName = message.fileName;
            return object;
        };

        /**
         * Converts this VaultInvoiceDownloadLinkResponse to JSON.
         * @function toJSON
         * @memberof BI.VaultInvoiceDownloadLinkResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VaultInvoiceDownloadLinkResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for VaultInvoiceDownloadLinkResponse
         * @function getTypeUrl
         * @memberof BI.VaultInvoiceDownloadLinkResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        VaultInvoiceDownloadLinkResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.VaultInvoiceDownloadLinkResponse";
        };

        return VaultInvoiceDownloadLinkResponse;
    })();

    BI.ReportingDailySnapshotRequest = (function() {

        /**
         * Properties of a ReportingDailySnapshotRequest.
         * @memberof BI
         * @interface IReportingDailySnapshotRequest
         * @property {number|null} [month] ReportingDailySnapshotRequest month
         * @property {number|null} [year] ReportingDailySnapshotRequest year
         */

        /**
         * Constructs a new ReportingDailySnapshotRequest.
         * @memberof BI
         * @classdesc Represents a ReportingDailySnapshotRequest.
         * @implements IReportingDailySnapshotRequest
         * @constructor
         * @param {BI.IReportingDailySnapshotRequest=} [properties] Properties to set
         */
        function ReportingDailySnapshotRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReportingDailySnapshotRequest month.
         * @member {number} month
         * @memberof BI.ReportingDailySnapshotRequest
         * @instance
         */
        ReportingDailySnapshotRequest.prototype.month = 0;

        /**
         * ReportingDailySnapshotRequest year.
         * @member {number} year
         * @memberof BI.ReportingDailySnapshotRequest
         * @instance
         */
        ReportingDailySnapshotRequest.prototype.year = 0;

        /**
         * Creates a new ReportingDailySnapshotRequest instance using the specified properties.
         * @function create
         * @memberof BI.ReportingDailySnapshotRequest
         * @static
         * @param {BI.IReportingDailySnapshotRequest=} [properties] Properties to set
         * @returns {BI.ReportingDailySnapshotRequest} ReportingDailySnapshotRequest instance
         */
        ReportingDailySnapshotRequest.create = function create(properties) {
            return new ReportingDailySnapshotRequest(properties);
        };

        /**
         * Encodes the specified ReportingDailySnapshotRequest message. Does not implicitly {@link BI.ReportingDailySnapshotRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.ReportingDailySnapshotRequest
         * @static
         * @param {BI.IReportingDailySnapshotRequest} message ReportingDailySnapshotRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReportingDailySnapshotRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.month != null && Object.hasOwnProperty.call(message, "month"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.month);
            if (message.year != null && Object.hasOwnProperty.call(message, "year"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.year);
            return writer;
        };

        /**
         * Decodes a ReportingDailySnapshotRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.ReportingDailySnapshotRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.ReportingDailySnapshotRequest} ReportingDailySnapshotRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReportingDailySnapshotRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.ReportingDailySnapshotRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.month = reader.int32();
                        break;
                    }
                case 2: {
                        message.year = reader.int32();
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
         * Creates a ReportingDailySnapshotRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.ReportingDailySnapshotRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.ReportingDailySnapshotRequest} ReportingDailySnapshotRequest
         */
        ReportingDailySnapshotRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.ReportingDailySnapshotRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.ReportingDailySnapshotRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.ReportingDailySnapshotRequest();
            if (object.month != null)
                message.month = object.month | 0;
            if (object.year != null)
                message.year = object.year | 0;
            return message;
        };

        /**
         * Creates a plain object from a ReportingDailySnapshotRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.ReportingDailySnapshotRequest
         * @static
         * @param {BI.ReportingDailySnapshotRequest} message ReportingDailySnapshotRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReportingDailySnapshotRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.month = 0;
                object.year = 0;
            }
            if (message.month != null && Object.hasOwnProperty.call(message, "month"))
                object.month = message.month;
            if (message.year != null && Object.hasOwnProperty.call(message, "year"))
                object.year = message.year;
            return object;
        };

        /**
         * Converts this ReportingDailySnapshotRequest to JSON.
         * @function toJSON
         * @memberof BI.ReportingDailySnapshotRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReportingDailySnapshotRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ReportingDailySnapshotRequest
         * @function getTypeUrl
         * @memberof BI.ReportingDailySnapshotRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ReportingDailySnapshotRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.ReportingDailySnapshotRequest";
        };

        return ReportingDailySnapshotRequest;
    })();

    BI.ReportingDailySnapshotResponse = (function() {

        /**
         * Properties of a ReportingDailySnapshotResponse.
         * @memberof BI
         * @interface IReportingDailySnapshotResponse
         * @property {Array.<BI.ISnapshotRecord>|null} [records] ReportingDailySnapshotResponse records
         * @property {Array.<BI.ISnapshotMcEnterprise>|null} [mcEnterprises] ReportingDailySnapshotResponse mcEnterprises
         */

        /**
         * Constructs a new ReportingDailySnapshotResponse.
         * @memberof BI
         * @classdesc Represents a ReportingDailySnapshotResponse.
         * @implements IReportingDailySnapshotResponse
         * @constructor
         * @param {BI.IReportingDailySnapshotResponse=} [properties] Properties to set
         */
        function ReportingDailySnapshotResponse(properties) {
            this.records = [];
            this.mcEnterprises = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReportingDailySnapshotResponse records.
         * @member {Array.<BI.ISnapshotRecord>} records
         * @memberof BI.ReportingDailySnapshotResponse
         * @instance
         */
        ReportingDailySnapshotResponse.prototype.records = $util.emptyArray;

        /**
         * ReportingDailySnapshotResponse mcEnterprises.
         * @member {Array.<BI.ISnapshotMcEnterprise>} mcEnterprises
         * @memberof BI.ReportingDailySnapshotResponse
         * @instance
         */
        ReportingDailySnapshotResponse.prototype.mcEnterprises = $util.emptyArray;

        /**
         * Creates a new ReportingDailySnapshotResponse instance using the specified properties.
         * @function create
         * @memberof BI.ReportingDailySnapshotResponse
         * @static
         * @param {BI.IReportingDailySnapshotResponse=} [properties] Properties to set
         * @returns {BI.ReportingDailySnapshotResponse} ReportingDailySnapshotResponse instance
         */
        ReportingDailySnapshotResponse.create = function create(properties) {
            return new ReportingDailySnapshotResponse(properties);
        };

        /**
         * Encodes the specified ReportingDailySnapshotResponse message. Does not implicitly {@link BI.ReportingDailySnapshotResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.ReportingDailySnapshotResponse
         * @static
         * @param {BI.IReportingDailySnapshotResponse} message ReportingDailySnapshotResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReportingDailySnapshotResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.records != null && message.records.length)
                for (let i = 0; i < message.records.length; ++i)
                    $root.BI.SnapshotRecord.encode(message.records[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.mcEnterprises != null && message.mcEnterprises.length)
                for (let i = 0; i < message.mcEnterprises.length; ++i)
                    $root.BI.SnapshotMcEnterprise.encode(message.mcEnterprises[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a ReportingDailySnapshotResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.ReportingDailySnapshotResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.ReportingDailySnapshotResponse} ReportingDailySnapshotResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReportingDailySnapshotResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.ReportingDailySnapshotResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.records && message.records.length))
                            message.records = [];
                        message.records.push($root.BI.SnapshotRecord.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.mcEnterprises && message.mcEnterprises.length))
                            message.mcEnterprises = [];
                        message.mcEnterprises.push($root.BI.SnapshotMcEnterprise.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a ReportingDailySnapshotResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.ReportingDailySnapshotResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.ReportingDailySnapshotResponse} ReportingDailySnapshotResponse
         */
        ReportingDailySnapshotResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.ReportingDailySnapshotResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.ReportingDailySnapshotResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.ReportingDailySnapshotResponse();
            if (object.records) {
                if (!Array.isArray(object.records))
                    throw TypeError(".BI.ReportingDailySnapshotResponse.records: array expected");
                message.records = [];
                for (let i = 0; i < object.records.length; ++i) {
                    if (!$util.isObject(object.records[i]))
                        throw TypeError(".BI.ReportingDailySnapshotResponse.records: object expected");
                    message.records[i] = $root.BI.SnapshotRecord.fromObject(object.records[i], long + 1);
                }
            }
            if (object.mcEnterprises) {
                if (!Array.isArray(object.mcEnterprises))
                    throw TypeError(".BI.ReportingDailySnapshotResponse.mcEnterprises: array expected");
                message.mcEnterprises = [];
                for (let i = 0; i < object.mcEnterprises.length; ++i) {
                    if (!$util.isObject(object.mcEnterprises[i]))
                        throw TypeError(".BI.ReportingDailySnapshotResponse.mcEnterprises: object expected");
                    message.mcEnterprises[i] = $root.BI.SnapshotMcEnterprise.fromObject(object.mcEnterprises[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ReportingDailySnapshotResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.ReportingDailySnapshotResponse
         * @static
         * @param {BI.ReportingDailySnapshotResponse} message ReportingDailySnapshotResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReportingDailySnapshotResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.records = [];
                object.mcEnterprises = [];
            }
            if (message.records && message.records.length) {
                object.records = [];
                for (let j = 0; j < message.records.length; ++j)
                    object.records[j] = $root.BI.SnapshotRecord.toObject(message.records[j], options, q + 1);
            }
            if (message.mcEnterprises && message.mcEnterprises.length) {
                object.mcEnterprises = [];
                for (let j = 0; j < message.mcEnterprises.length; ++j)
                    object.mcEnterprises[j] = $root.BI.SnapshotMcEnterprise.toObject(message.mcEnterprises[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ReportingDailySnapshotResponse to JSON.
         * @function toJSON
         * @memberof BI.ReportingDailySnapshotResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReportingDailySnapshotResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ReportingDailySnapshotResponse
         * @function getTypeUrl
         * @memberof BI.ReportingDailySnapshotResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ReportingDailySnapshotResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.ReportingDailySnapshotResponse";
        };

        return ReportingDailySnapshotResponse;
    })();

    BI.SnapshotRecord = (function() {

        /**
         * Properties of a SnapshotRecord.
         * @memberof BI
         * @interface ISnapshotRecord
         * @property {number|null} [date] SnapshotRecord date
         * @property {number|null} [mcEnterpriseId] SnapshotRecord mcEnterpriseId
         * @property {number|null} [maxLicenseCount] SnapshotRecord maxLicenseCount
         * @property {number|null} [maxFilePlanTypeId] SnapshotRecord maxFilePlanTypeId
         * @property {number|null} [maxBasePlanId] SnapshotRecord maxBasePlanId
         * @property {Array.<BI.SnapshotRecord.IAddon>|null} [addons] SnapshotRecord addons
         */

        /**
         * Constructs a new SnapshotRecord.
         * @memberof BI
         * @classdesc Represents a SnapshotRecord.
         * @implements ISnapshotRecord
         * @constructor
         * @param {BI.ISnapshotRecord=} [properties] Properties to set
         */
        function SnapshotRecord(properties) {
            this.addons = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SnapshotRecord date.
         * @member {number} date
         * @memberof BI.SnapshotRecord
         * @instance
         */
        SnapshotRecord.prototype.date = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SnapshotRecord mcEnterpriseId.
         * @member {number} mcEnterpriseId
         * @memberof BI.SnapshotRecord
         * @instance
         */
        SnapshotRecord.prototype.mcEnterpriseId = 0;

        /**
         * SnapshotRecord maxLicenseCount.
         * @member {number} maxLicenseCount
         * @memberof BI.SnapshotRecord
         * @instance
         */
        SnapshotRecord.prototype.maxLicenseCount = 0;

        /**
         * SnapshotRecord maxFilePlanTypeId.
         * @member {number} maxFilePlanTypeId
         * @memberof BI.SnapshotRecord
         * @instance
         */
        SnapshotRecord.prototype.maxFilePlanTypeId = 0;

        /**
         * SnapshotRecord maxBasePlanId.
         * @member {number} maxBasePlanId
         * @memberof BI.SnapshotRecord
         * @instance
         */
        SnapshotRecord.prototype.maxBasePlanId = 0;

        /**
         * SnapshotRecord addons.
         * @member {Array.<BI.SnapshotRecord.IAddon>} addons
         * @memberof BI.SnapshotRecord
         * @instance
         */
        SnapshotRecord.prototype.addons = $util.emptyArray;

        /**
         * Creates a new SnapshotRecord instance using the specified properties.
         * @function create
         * @memberof BI.SnapshotRecord
         * @static
         * @param {BI.ISnapshotRecord=} [properties] Properties to set
         * @returns {BI.SnapshotRecord} SnapshotRecord instance
         */
        SnapshotRecord.create = function create(properties) {
            return new SnapshotRecord(properties);
        };

        /**
         * Encodes the specified SnapshotRecord message. Does not implicitly {@link BI.SnapshotRecord.verify|verify} messages.
         * @function encode
         * @memberof BI.SnapshotRecord
         * @static
         * @param {BI.ISnapshotRecord} message SnapshotRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SnapshotRecord.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.date != null && Object.hasOwnProperty.call(message, "date"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.date);
            if (message.mcEnterpriseId != null && Object.hasOwnProperty.call(message, "mcEnterpriseId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mcEnterpriseId);
            if (message.maxLicenseCount != null && Object.hasOwnProperty.call(message, "maxLicenseCount"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.maxLicenseCount);
            if (message.maxFilePlanTypeId != null && Object.hasOwnProperty.call(message, "maxFilePlanTypeId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.maxFilePlanTypeId);
            if (message.maxBasePlanId != null && Object.hasOwnProperty.call(message, "maxBasePlanId"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.maxBasePlanId);
            if (message.addons != null && message.addons.length)
                for (let i = 0; i < message.addons.length; ++i)
                    $root.BI.SnapshotRecord.Addon.encode(message.addons[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SnapshotRecord message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SnapshotRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SnapshotRecord} SnapshotRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SnapshotRecord.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SnapshotRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.date = reader.int64();
                        break;
                    }
                case 2: {
                        message.mcEnterpriseId = reader.int32();
                        break;
                    }
                case 4: {
                        message.maxLicenseCount = reader.int32();
                        break;
                    }
                case 5: {
                        message.maxFilePlanTypeId = reader.int32();
                        break;
                    }
                case 6: {
                        message.maxBasePlanId = reader.int32();
                        break;
                    }
                case 7: {
                        if (!(message.addons && message.addons.length))
                            message.addons = [];
                        message.addons.push($root.BI.SnapshotRecord.Addon.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a SnapshotRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SnapshotRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SnapshotRecord} SnapshotRecord
         */
        SnapshotRecord.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SnapshotRecord)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.SnapshotRecord: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.SnapshotRecord();
            if (object.date != null)
                if ($util.Long)
                    message.date = $util.Long.fromValue(object.date, false);
                else if (typeof object.date === "string")
                    message.date = parseInt(object.date, 10);
                else if (typeof object.date === "number")
                    message.date = object.date;
                else if (typeof object.date === "object")
                    message.date = new $util.LongBits(object.date.low >>> 0, object.date.high >>> 0).toNumber();
            if (object.mcEnterpriseId != null)
                message.mcEnterpriseId = object.mcEnterpriseId | 0;
            if (object.maxLicenseCount != null)
                message.maxLicenseCount = object.maxLicenseCount | 0;
            if (object.maxFilePlanTypeId != null)
                message.maxFilePlanTypeId = object.maxFilePlanTypeId | 0;
            if (object.maxBasePlanId != null)
                message.maxBasePlanId = object.maxBasePlanId | 0;
            if (object.addons) {
                if (!Array.isArray(object.addons))
                    throw TypeError(".BI.SnapshotRecord.addons: array expected");
                message.addons = [];
                for (let i = 0; i < object.addons.length; ++i) {
                    if (!$util.isObject(object.addons[i]))
                        throw TypeError(".BI.SnapshotRecord.addons: object expected");
                    message.addons[i] = $root.BI.SnapshotRecord.Addon.fromObject(object.addons[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SnapshotRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SnapshotRecord
         * @static
         * @param {BI.SnapshotRecord} message SnapshotRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SnapshotRecord.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.addons = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.date = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.date = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.mcEnterpriseId = 0;
                object.maxLicenseCount = 0;
                object.maxFilePlanTypeId = 0;
                object.maxBasePlanId = 0;
            }
            if (message.date != null && Object.hasOwnProperty.call(message, "date"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.date = typeof message.date === "number" ? BigInt(message.date) : $util.Long.fromBits(message.date.low >>> 0, message.date.high >>> 0, false).toBigInt();
                else if (typeof message.date === "number")
                    object.date = options.longs === String ? String(message.date) : message.date;
                else
                    object.date = options.longs === String ? $util.Long.prototype.toString.call(message.date) : options.longs === Number ? new $util.LongBits(message.date.low >>> 0, message.date.high >>> 0).toNumber() : message.date;
            if (message.mcEnterpriseId != null && Object.hasOwnProperty.call(message, "mcEnterpriseId"))
                object.mcEnterpriseId = message.mcEnterpriseId;
            if (message.maxLicenseCount != null && Object.hasOwnProperty.call(message, "maxLicenseCount"))
                object.maxLicenseCount = message.maxLicenseCount;
            if (message.maxFilePlanTypeId != null && Object.hasOwnProperty.call(message, "maxFilePlanTypeId"))
                object.maxFilePlanTypeId = message.maxFilePlanTypeId;
            if (message.maxBasePlanId != null && Object.hasOwnProperty.call(message, "maxBasePlanId"))
                object.maxBasePlanId = message.maxBasePlanId;
            if (message.addons && message.addons.length) {
                object.addons = [];
                for (let j = 0; j < message.addons.length; ++j)
                    object.addons[j] = $root.BI.SnapshotRecord.Addon.toObject(message.addons[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this SnapshotRecord to JSON.
         * @function toJSON
         * @memberof BI.SnapshotRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SnapshotRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SnapshotRecord
         * @function getTypeUrl
         * @memberof BI.SnapshotRecord
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SnapshotRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SnapshotRecord";
        };

        SnapshotRecord.Addon = (function() {

            /**
             * Properties of an Addon.
             * @memberof BI.SnapshotRecord
             * @interface IAddon
             * @property {number|null} [maxAddonId] Addon maxAddonId
             * @property {number|null} [units] Addon units
             */

            /**
             * Constructs a new Addon.
             * @memberof BI.SnapshotRecord
             * @classdesc Represents an Addon.
             * @implements IAddon
             * @constructor
             * @param {BI.SnapshotRecord.IAddon=} [properties] Properties to set
             */
            function Addon(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Addon maxAddonId.
             * @member {number} maxAddonId
             * @memberof BI.SnapshotRecord.Addon
             * @instance
             */
            Addon.prototype.maxAddonId = 0;

            /**
             * Addon units.
             * @member {number} units
             * @memberof BI.SnapshotRecord.Addon
             * @instance
             */
            Addon.prototype.units = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new Addon instance using the specified properties.
             * @function create
             * @memberof BI.SnapshotRecord.Addon
             * @static
             * @param {BI.SnapshotRecord.IAddon=} [properties] Properties to set
             * @returns {BI.SnapshotRecord.Addon} Addon instance
             */
            Addon.create = function create(properties) {
                return new Addon(properties);
            };

            /**
             * Encodes the specified Addon message. Does not implicitly {@link BI.SnapshotRecord.Addon.verify|verify} messages.
             * @function encode
             * @memberof BI.SnapshotRecord.Addon
             * @static
             * @param {BI.SnapshotRecord.IAddon} message Addon message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Addon.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.maxAddonId != null && Object.hasOwnProperty.call(message, "maxAddonId"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.maxAddonId);
                if (message.units != null && Object.hasOwnProperty.call(message, "units"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.units);
                return writer;
            };

            /**
             * Decodes an Addon message from the specified reader or buffer.
             * @function decode
             * @memberof BI.SnapshotRecord.Addon
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {BI.SnapshotRecord.Addon} Addon
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Addon.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SnapshotRecord.Addon();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.maxAddonId = reader.int32();
                            break;
                        }
                    case 2: {
                            message.units = reader.int64();
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
             * Creates an Addon message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof BI.SnapshotRecord.Addon
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {BI.SnapshotRecord.Addon} Addon
             */
            Addon.fromObject = function fromObject(object, long) {
                if (object instanceof $root.BI.SnapshotRecord.Addon)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".BI.SnapshotRecord.Addon: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.BI.SnapshotRecord.Addon();
                if (object.maxAddonId != null)
                    message.maxAddonId = object.maxAddonId | 0;
                if (object.units != null)
                    if ($util.Long)
                        message.units = $util.Long.fromValue(object.units, false);
                    else if (typeof object.units === "string")
                        message.units = parseInt(object.units, 10);
                    else if (typeof object.units === "number")
                        message.units = object.units;
                    else if (typeof object.units === "object")
                        message.units = new $util.LongBits(object.units.low >>> 0, object.units.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an Addon message. Also converts values to other types if specified.
             * @function toObject
             * @memberof BI.SnapshotRecord.Addon
             * @static
             * @param {BI.SnapshotRecord.Addon} message Addon
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Addon.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    object.maxAddonId = 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.units = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.units = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                }
                if (message.maxAddonId != null && Object.hasOwnProperty.call(message, "maxAddonId"))
                    object.maxAddonId = message.maxAddonId;
                if (message.units != null && Object.hasOwnProperty.call(message, "units"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.units = typeof message.units === "number" ? BigInt(message.units) : $util.Long.fromBits(message.units.low >>> 0, message.units.high >>> 0, false).toBigInt();
                    else if (typeof message.units === "number")
                        object.units = options.longs === String ? String(message.units) : message.units;
                    else
                        object.units = options.longs === String ? $util.Long.prototype.toString.call(message.units) : options.longs === Number ? new $util.LongBits(message.units.low >>> 0, message.units.high >>> 0).toNumber() : message.units;
                return object;
            };

            /**
             * Converts this Addon to JSON.
             * @function toJSON
             * @memberof BI.SnapshotRecord.Addon
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Addon.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Addon
             * @function getTypeUrl
             * @memberof BI.SnapshotRecord.Addon
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Addon.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/BI.SnapshotRecord.Addon";
            };

            return Addon;
        })();

        return SnapshotRecord;
    })();

    BI.SnapshotMcEnterprise = (function() {

        /**
         * Properties of a SnapshotMcEnterprise.
         * @memberof BI
         * @interface ISnapshotMcEnterprise
         * @property {number|null} [id] SnapshotMcEnterprise id
         * @property {string|null} [name] SnapshotMcEnterprise name
         */

        /**
         * Constructs a new SnapshotMcEnterprise.
         * @memberof BI
         * @classdesc Represents a SnapshotMcEnterprise.
         * @implements ISnapshotMcEnterprise
         * @constructor
         * @param {BI.ISnapshotMcEnterprise=} [properties] Properties to set
         */
        function SnapshotMcEnterprise(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SnapshotMcEnterprise id.
         * @member {number} id
         * @memberof BI.SnapshotMcEnterprise
         * @instance
         */
        SnapshotMcEnterprise.prototype.id = 0;

        /**
         * SnapshotMcEnterprise name.
         * @member {string} name
         * @memberof BI.SnapshotMcEnterprise
         * @instance
         */
        SnapshotMcEnterprise.prototype.name = "";

        /**
         * Creates a new SnapshotMcEnterprise instance using the specified properties.
         * @function create
         * @memberof BI.SnapshotMcEnterprise
         * @static
         * @param {BI.ISnapshotMcEnterprise=} [properties] Properties to set
         * @returns {BI.SnapshotMcEnterprise} SnapshotMcEnterprise instance
         */
        SnapshotMcEnterprise.create = function create(properties) {
            return new SnapshotMcEnterprise(properties);
        };

        /**
         * Encodes the specified SnapshotMcEnterprise message. Does not implicitly {@link BI.SnapshotMcEnterprise.verify|verify} messages.
         * @function encode
         * @memberof BI.SnapshotMcEnterprise
         * @static
         * @param {BI.ISnapshotMcEnterprise} message SnapshotMcEnterprise message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SnapshotMcEnterprise.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Decodes a SnapshotMcEnterprise message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SnapshotMcEnterprise
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SnapshotMcEnterprise} SnapshotMcEnterprise
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SnapshotMcEnterprise.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SnapshotMcEnterprise();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
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
         * Creates a SnapshotMcEnterprise message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SnapshotMcEnterprise
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SnapshotMcEnterprise} SnapshotMcEnterprise
         */
        SnapshotMcEnterprise.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SnapshotMcEnterprise)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.SnapshotMcEnterprise: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.SnapshotMcEnterprise();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a SnapshotMcEnterprise message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SnapshotMcEnterprise
         * @static
         * @param {BI.SnapshotMcEnterprise} message SnapshotMcEnterprise
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SnapshotMcEnterprise.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
            }
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this SnapshotMcEnterprise to JSON.
         * @function toJSON
         * @memberof BI.SnapshotMcEnterprise
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SnapshotMcEnterprise.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SnapshotMcEnterprise
         * @function getTypeUrl
         * @memberof BI.SnapshotMcEnterprise
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SnapshotMcEnterprise.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SnapshotMcEnterprise";
        };

        return SnapshotMcEnterprise;
    })();

    BI.MappingAddonsRequest = (function() {

        /**
         * Properties of a MappingAddonsRequest.
         * @memberof BI
         * @interface IMappingAddonsRequest
         */

        /**
         * Constructs a new MappingAddonsRequest.
         * @memberof BI
         * @classdesc Represents a MappingAddonsRequest.
         * @implements IMappingAddonsRequest
         * @constructor
         * @param {BI.IMappingAddonsRequest=} [properties] Properties to set
         */
        function MappingAddonsRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new MappingAddonsRequest instance using the specified properties.
         * @function create
         * @memberof BI.MappingAddonsRequest
         * @static
         * @param {BI.IMappingAddonsRequest=} [properties] Properties to set
         * @returns {BI.MappingAddonsRequest} MappingAddonsRequest instance
         */
        MappingAddonsRequest.create = function create(properties) {
            return new MappingAddonsRequest(properties);
        };

        /**
         * Encodes the specified MappingAddonsRequest message. Does not implicitly {@link BI.MappingAddonsRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.MappingAddonsRequest
         * @static
         * @param {BI.IMappingAddonsRequest} message MappingAddonsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MappingAddonsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a MappingAddonsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.MappingAddonsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.MappingAddonsRequest} MappingAddonsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MappingAddonsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.MappingAddonsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a MappingAddonsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.MappingAddonsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.MappingAddonsRequest} MappingAddonsRequest
         */
        MappingAddonsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.MappingAddonsRequest)
                return object;
            return new $root.BI.MappingAddonsRequest();
        };

        /**
         * Creates a plain object from a MappingAddonsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.MappingAddonsRequest
         * @static
         * @param {BI.MappingAddonsRequest} message MappingAddonsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MappingAddonsRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this MappingAddonsRequest to JSON.
         * @function toJSON
         * @memberof BI.MappingAddonsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MappingAddonsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MappingAddonsRequest
         * @function getTypeUrl
         * @memberof BI.MappingAddonsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MappingAddonsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.MappingAddonsRequest";
        };

        return MappingAddonsRequest;
    })();

    BI.MappingAddonsResponse = (function() {

        /**
         * Properties of a MappingAddonsResponse.
         * @memberof BI
         * @interface IMappingAddonsResponse
         * @property {Array.<BI.IMappingItem>|null} [addons] MappingAddonsResponse addons
         * @property {Array.<BI.IMappingItem>|null} [filePlans] MappingAddonsResponse filePlans
         */

        /**
         * Constructs a new MappingAddonsResponse.
         * @memberof BI
         * @classdesc Represents a MappingAddonsResponse.
         * @implements IMappingAddonsResponse
         * @constructor
         * @param {BI.IMappingAddonsResponse=} [properties] Properties to set
         */
        function MappingAddonsResponse(properties) {
            this.addons = [];
            this.filePlans = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MappingAddonsResponse addons.
         * @member {Array.<BI.IMappingItem>} addons
         * @memberof BI.MappingAddonsResponse
         * @instance
         */
        MappingAddonsResponse.prototype.addons = $util.emptyArray;

        /**
         * MappingAddonsResponse filePlans.
         * @member {Array.<BI.IMappingItem>} filePlans
         * @memberof BI.MappingAddonsResponse
         * @instance
         */
        MappingAddonsResponse.prototype.filePlans = $util.emptyArray;

        /**
         * Creates a new MappingAddonsResponse instance using the specified properties.
         * @function create
         * @memberof BI.MappingAddonsResponse
         * @static
         * @param {BI.IMappingAddonsResponse=} [properties] Properties to set
         * @returns {BI.MappingAddonsResponse} MappingAddonsResponse instance
         */
        MappingAddonsResponse.create = function create(properties) {
            return new MappingAddonsResponse(properties);
        };

        /**
         * Encodes the specified MappingAddonsResponse message. Does not implicitly {@link BI.MappingAddonsResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.MappingAddonsResponse
         * @static
         * @param {BI.IMappingAddonsResponse} message MappingAddonsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MappingAddonsResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.addons != null && message.addons.length)
                for (let i = 0; i < message.addons.length; ++i)
                    $root.BI.MappingItem.encode(message.addons[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.filePlans != null && message.filePlans.length)
                for (let i = 0; i < message.filePlans.length; ++i)
                    $root.BI.MappingItem.encode(message.filePlans[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a MappingAddonsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.MappingAddonsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.MappingAddonsResponse} MappingAddonsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MappingAddonsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.MappingAddonsResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.addons && message.addons.length))
                            message.addons = [];
                        message.addons.push($root.BI.MappingItem.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.filePlans && message.filePlans.length))
                            message.filePlans = [];
                        message.filePlans.push($root.BI.MappingItem.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a MappingAddonsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.MappingAddonsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.MappingAddonsResponse} MappingAddonsResponse
         */
        MappingAddonsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.MappingAddonsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.MappingAddonsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.MappingAddonsResponse();
            if (object.addons) {
                if (!Array.isArray(object.addons))
                    throw TypeError(".BI.MappingAddonsResponse.addons: array expected");
                message.addons = [];
                for (let i = 0; i < object.addons.length; ++i) {
                    if (!$util.isObject(object.addons[i]))
                        throw TypeError(".BI.MappingAddonsResponse.addons: object expected");
                    message.addons[i] = $root.BI.MappingItem.fromObject(object.addons[i], long + 1);
                }
            }
            if (object.filePlans) {
                if (!Array.isArray(object.filePlans))
                    throw TypeError(".BI.MappingAddonsResponse.filePlans: array expected");
                message.filePlans = [];
                for (let i = 0; i < object.filePlans.length; ++i) {
                    if (!$util.isObject(object.filePlans[i]))
                        throw TypeError(".BI.MappingAddonsResponse.filePlans: object expected");
                    message.filePlans[i] = $root.BI.MappingItem.fromObject(object.filePlans[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MappingAddonsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.MappingAddonsResponse
         * @static
         * @param {BI.MappingAddonsResponse} message MappingAddonsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MappingAddonsResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.addons = [];
                object.filePlans = [];
            }
            if (message.addons && message.addons.length) {
                object.addons = [];
                for (let j = 0; j < message.addons.length; ++j)
                    object.addons[j] = $root.BI.MappingItem.toObject(message.addons[j], options, q + 1);
            }
            if (message.filePlans && message.filePlans.length) {
                object.filePlans = [];
                for (let j = 0; j < message.filePlans.length; ++j)
                    object.filePlans[j] = $root.BI.MappingItem.toObject(message.filePlans[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this MappingAddonsResponse to JSON.
         * @function toJSON
         * @memberof BI.MappingAddonsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MappingAddonsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MappingAddonsResponse
         * @function getTypeUrl
         * @memberof BI.MappingAddonsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MappingAddonsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.MappingAddonsResponse";
        };

        return MappingAddonsResponse;
    })();

    BI.MappingItem = (function() {

        /**
         * Properties of a MappingItem.
         * @memberof BI
         * @interface IMappingItem
         * @property {number|null} [id] MappingItem id
         * @property {string|null} [name] MappingItem name
         */

        /**
         * Constructs a new MappingItem.
         * @memberof BI
         * @classdesc Represents a MappingItem.
         * @implements IMappingItem
         * @constructor
         * @param {BI.IMappingItem=} [properties] Properties to set
         */
        function MappingItem(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MappingItem id.
         * @member {number} id
         * @memberof BI.MappingItem
         * @instance
         */
        MappingItem.prototype.id = 0;

        /**
         * MappingItem name.
         * @member {string} name
         * @memberof BI.MappingItem
         * @instance
         */
        MappingItem.prototype.name = "";

        /**
         * Creates a new MappingItem instance using the specified properties.
         * @function create
         * @memberof BI.MappingItem
         * @static
         * @param {BI.IMappingItem=} [properties] Properties to set
         * @returns {BI.MappingItem} MappingItem instance
         */
        MappingItem.create = function create(properties) {
            return new MappingItem(properties);
        };

        /**
         * Encodes the specified MappingItem message. Does not implicitly {@link BI.MappingItem.verify|verify} messages.
         * @function encode
         * @memberof BI.MappingItem
         * @static
         * @param {BI.IMappingItem} message MappingItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MappingItem.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Decodes a MappingItem message from the specified reader or buffer.
         * @function decode
         * @memberof BI.MappingItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.MappingItem} MappingItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MappingItem.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.MappingItem();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int32();
                        break;
                    }
                case 2: {
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
         * Creates a MappingItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.MappingItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.MappingItem} MappingItem
         */
        MappingItem.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.MappingItem)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.MappingItem: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.MappingItem();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a MappingItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.MappingItem
         * @static
         * @param {BI.MappingItem} message MappingItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MappingItem.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
            }
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this MappingItem to JSON.
         * @function toJSON
         * @memberof BI.MappingItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MappingItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MappingItem
         * @function getTypeUrl
         * @memberof BI.MappingItem
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MappingItem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.MappingItem";
        };

        return MappingItem;
    })();

    BI.GradientValidateKeyRequest = (function() {

        /**
         * Properties of a GradientValidateKeyRequest.
         * @memberof BI
         * @interface IGradientValidateKeyRequest
         * @property {string|null} [gradientKey] GradientValidateKeyRequest gradientKey
         */

        /**
         * Constructs a new GradientValidateKeyRequest.
         * @memberof BI
         * @classdesc Represents a GradientValidateKeyRequest.
         * @implements IGradientValidateKeyRequest
         * @constructor
         * @param {BI.IGradientValidateKeyRequest=} [properties] Properties to set
         */
        function GradientValidateKeyRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GradientValidateKeyRequest gradientKey.
         * @member {string} gradientKey
         * @memberof BI.GradientValidateKeyRequest
         * @instance
         */
        GradientValidateKeyRequest.prototype.gradientKey = "";

        /**
         * Creates a new GradientValidateKeyRequest instance using the specified properties.
         * @function create
         * @memberof BI.GradientValidateKeyRequest
         * @static
         * @param {BI.IGradientValidateKeyRequest=} [properties] Properties to set
         * @returns {BI.GradientValidateKeyRequest} GradientValidateKeyRequest instance
         */
        GradientValidateKeyRequest.create = function create(properties) {
            return new GradientValidateKeyRequest(properties);
        };

        /**
         * Encodes the specified GradientValidateKeyRequest message. Does not implicitly {@link BI.GradientValidateKeyRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.GradientValidateKeyRequest
         * @static
         * @param {BI.IGradientValidateKeyRequest} message GradientValidateKeyRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GradientValidateKeyRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.gradientKey != null && Object.hasOwnProperty.call(message, "gradientKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gradientKey);
            return writer;
        };

        /**
         * Decodes a GradientValidateKeyRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.GradientValidateKeyRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.GradientValidateKeyRequest} GradientValidateKeyRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GradientValidateKeyRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.GradientValidateKeyRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.gradientKey = reader.string();
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
         * Creates a GradientValidateKeyRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.GradientValidateKeyRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.GradientValidateKeyRequest} GradientValidateKeyRequest
         */
        GradientValidateKeyRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.GradientValidateKeyRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.GradientValidateKeyRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.GradientValidateKeyRequest();
            if (object.gradientKey != null)
                message.gradientKey = String(object.gradientKey);
            return message;
        };

        /**
         * Creates a plain object from a GradientValidateKeyRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.GradientValidateKeyRequest
         * @static
         * @param {BI.GradientValidateKeyRequest} message GradientValidateKeyRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GradientValidateKeyRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.gradientKey = "";
            if (message.gradientKey != null && Object.hasOwnProperty.call(message, "gradientKey"))
                object.gradientKey = message.gradientKey;
            return object;
        };

        /**
         * Converts this GradientValidateKeyRequest to JSON.
         * @function toJSON
         * @memberof BI.GradientValidateKeyRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GradientValidateKeyRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GradientValidateKeyRequest
         * @function getTypeUrl
         * @memberof BI.GradientValidateKeyRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GradientValidateKeyRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.GradientValidateKeyRequest";
        };

        return GradientValidateKeyRequest;
    })();

    BI.GradientValidateKeyResponse = (function() {

        /**
         * Properties of a GradientValidateKeyResponse.
         * @memberof BI
         * @interface IGradientValidateKeyResponse
         * @property {boolean|null} [success] GradientValidateKeyResponse success
         * @property {string|null} [message] GradientValidateKeyResponse message
         */

        /**
         * Constructs a new GradientValidateKeyResponse.
         * @memberof BI
         * @classdesc Represents a GradientValidateKeyResponse.
         * @implements IGradientValidateKeyResponse
         * @constructor
         * @param {BI.IGradientValidateKeyResponse=} [properties] Properties to set
         */
        function GradientValidateKeyResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GradientValidateKeyResponse success.
         * @member {boolean} success
         * @memberof BI.GradientValidateKeyResponse
         * @instance
         */
        GradientValidateKeyResponse.prototype.success = false;

        /**
         * GradientValidateKeyResponse message.
         * @member {string} message
         * @memberof BI.GradientValidateKeyResponse
         * @instance
         */
        GradientValidateKeyResponse.prototype.message = "";

        /**
         * Creates a new GradientValidateKeyResponse instance using the specified properties.
         * @function create
         * @memberof BI.GradientValidateKeyResponse
         * @static
         * @param {BI.IGradientValidateKeyResponse=} [properties] Properties to set
         * @returns {BI.GradientValidateKeyResponse} GradientValidateKeyResponse instance
         */
        GradientValidateKeyResponse.create = function create(properties) {
            return new GradientValidateKeyResponse(properties);
        };

        /**
         * Encodes the specified GradientValidateKeyResponse message. Does not implicitly {@link BI.GradientValidateKeyResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.GradientValidateKeyResponse
         * @static
         * @param {BI.IGradientValidateKeyResponse} message GradientValidateKeyResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GradientValidateKeyResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            return writer;
        };

        /**
         * Decodes a GradientValidateKeyResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.GradientValidateKeyResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.GradientValidateKeyResponse} GradientValidateKeyResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GradientValidateKeyResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.GradientValidateKeyResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.success = reader.bool();
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
         * Creates a GradientValidateKeyResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.GradientValidateKeyResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.GradientValidateKeyResponse} GradientValidateKeyResponse
         */
        GradientValidateKeyResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.GradientValidateKeyResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.GradientValidateKeyResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.GradientValidateKeyResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a GradientValidateKeyResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.GradientValidateKeyResponse
         * @static
         * @param {BI.GradientValidateKeyResponse} message GradientValidateKeyResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GradientValidateKeyResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.success = false;
                object.message = "";
            }
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this GradientValidateKeyResponse to JSON.
         * @function toJSON
         * @memberof BI.GradientValidateKeyResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GradientValidateKeyResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GradientValidateKeyResponse
         * @function getTypeUrl
         * @memberof BI.GradientValidateKeyResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GradientValidateKeyResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.GradientValidateKeyResponse";
        };

        return GradientValidateKeyResponse;
    })();

    BI.GradientSaveRequest = (function() {

        /**
         * Properties of a GradientSaveRequest.
         * @memberof BI
         * @interface IGradientSaveRequest
         * @property {string|null} [gradientKey] GradientSaveRequest gradientKey
         * @property {number|null} [enterpriseUserId] GradientSaveRequest enterpriseUserId
         */

        /**
         * Constructs a new GradientSaveRequest.
         * @memberof BI
         * @classdesc Represents a GradientSaveRequest.
         * @implements IGradientSaveRequest
         * @constructor
         * @param {BI.IGradientSaveRequest=} [properties] Properties to set
         */
        function GradientSaveRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GradientSaveRequest gradientKey.
         * @member {string} gradientKey
         * @memberof BI.GradientSaveRequest
         * @instance
         */
        GradientSaveRequest.prototype.gradientKey = "";

        /**
         * GradientSaveRequest enterpriseUserId.
         * @member {number} enterpriseUserId
         * @memberof BI.GradientSaveRequest
         * @instance
         */
        GradientSaveRequest.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GradientSaveRequest instance using the specified properties.
         * @function create
         * @memberof BI.GradientSaveRequest
         * @static
         * @param {BI.IGradientSaveRequest=} [properties] Properties to set
         * @returns {BI.GradientSaveRequest} GradientSaveRequest instance
         */
        GradientSaveRequest.create = function create(properties) {
            return new GradientSaveRequest(properties);
        };

        /**
         * Encodes the specified GradientSaveRequest message. Does not implicitly {@link BI.GradientSaveRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.GradientSaveRequest
         * @static
         * @param {BI.IGradientSaveRequest} message GradientSaveRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GradientSaveRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.gradientKey != null && Object.hasOwnProperty.call(message, "gradientKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gradientKey);
            if (message.enterpriseUserId != null && Object.hasOwnProperty.call(message, "enterpriseUserId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.enterpriseUserId);
            return writer;
        };

        /**
         * Decodes a GradientSaveRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.GradientSaveRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.GradientSaveRequest} GradientSaveRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GradientSaveRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.GradientSaveRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.gradientKey = reader.string();
                        break;
                    }
                case 2: {
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
         * Creates a GradientSaveRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.GradientSaveRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.GradientSaveRequest} GradientSaveRequest
         */
        GradientSaveRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.GradientSaveRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.GradientSaveRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.GradientSaveRequest();
            if (object.gradientKey != null)
                message.gradientKey = String(object.gradientKey);
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
         * Creates a plain object from a GradientSaveRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.GradientSaveRequest
         * @static
         * @param {BI.GradientSaveRequest} message GradientSaveRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GradientSaveRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.gradientKey = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.enterpriseUserId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.enterpriseUserId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.gradientKey != null && Object.hasOwnProperty.call(message, "gradientKey"))
                object.gradientKey = message.gradientKey;
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
         * Converts this GradientSaveRequest to JSON.
         * @function toJSON
         * @memberof BI.GradientSaveRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GradientSaveRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GradientSaveRequest
         * @function getTypeUrl
         * @memberof BI.GradientSaveRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GradientSaveRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.GradientSaveRequest";
        };

        return GradientSaveRequest;
    })();

    BI.GradientSaveResponse = (function() {

        /**
         * Properties of a GradientSaveResponse.
         * @memberof BI
         * @interface IGradientSaveResponse
         * @property {boolean|null} [success] GradientSaveResponse success
         * @property {BI.GradientIntegrationStatus|null} [status] GradientSaveResponse status
         * @property {string|null} [message] GradientSaveResponse message
         */

        /**
         * Constructs a new GradientSaveResponse.
         * @memberof BI
         * @classdesc Represents a GradientSaveResponse.
         * @implements IGradientSaveResponse
         * @constructor
         * @param {BI.IGradientSaveResponse=} [properties] Properties to set
         */
        function GradientSaveResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GradientSaveResponse success.
         * @member {boolean} success
         * @memberof BI.GradientSaveResponse
         * @instance
         */
        GradientSaveResponse.prototype.success = false;

        /**
         * GradientSaveResponse status.
         * @member {BI.GradientIntegrationStatus} status
         * @memberof BI.GradientSaveResponse
         * @instance
         */
        GradientSaveResponse.prototype.status = 0;

        /**
         * GradientSaveResponse message.
         * @member {string} message
         * @memberof BI.GradientSaveResponse
         * @instance
         */
        GradientSaveResponse.prototype.message = "";

        /**
         * Creates a new GradientSaveResponse instance using the specified properties.
         * @function create
         * @memberof BI.GradientSaveResponse
         * @static
         * @param {BI.IGradientSaveResponse=} [properties] Properties to set
         * @returns {BI.GradientSaveResponse} GradientSaveResponse instance
         */
        GradientSaveResponse.create = function create(properties) {
            return new GradientSaveResponse(properties);
        };

        /**
         * Encodes the specified GradientSaveResponse message. Does not implicitly {@link BI.GradientSaveResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.GradientSaveResponse
         * @static
         * @param {BI.IGradientSaveResponse} message GradientSaveResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GradientSaveResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            return writer;
        };

        /**
         * Decodes a GradientSaveResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.GradientSaveResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.GradientSaveResponse} GradientSaveResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GradientSaveResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.GradientSaveResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.success = reader.bool();
                        break;
                    }
                case 2: {
                        message.status = reader.int32();
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
         * Creates a GradientSaveResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.GradientSaveResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.GradientSaveResponse} GradientSaveResponse
         */
        GradientSaveResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.GradientSaveResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.GradientSaveResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.GradientSaveResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "NOTCONNECTED":
            case 0:
                message.status = 0;
                break;
            case "PENDING":
            case 1:
                message.status = 1;
                break;
            case "CONNECTED":
            case 2:
                message.status = 2;
                break;
            case "NONE":
            case 3:
                message.status = 3;
                break;
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a GradientSaveResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.GradientSaveResponse
         * @static
         * @param {BI.GradientSaveResponse} message GradientSaveResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GradientSaveResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.success = false;
                object.status = options.enums === String ? "NOTCONNECTED" : 0;
                object.message = "";
            }
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = options.enums === String ? $root.BI.GradientIntegrationStatus[message.status] === undefined ? message.status : $root.BI.GradientIntegrationStatus[message.status] : message.status;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this GradientSaveResponse to JSON.
         * @function toJSON
         * @memberof BI.GradientSaveResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GradientSaveResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GradientSaveResponse
         * @function getTypeUrl
         * @memberof BI.GradientSaveResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GradientSaveResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.GradientSaveResponse";
        };

        return GradientSaveResponse;
    })();

    BI.GradientRemoveRequest = (function() {

        /**
         * Properties of a GradientRemoveRequest.
         * @memberof BI
         * @interface IGradientRemoveRequest
         * @property {number|null} [enterpriseUserId] GradientRemoveRequest enterpriseUserId
         */

        /**
         * Constructs a new GradientRemoveRequest.
         * @memberof BI
         * @classdesc Represents a GradientRemoveRequest.
         * @implements IGradientRemoveRequest
         * @constructor
         * @param {BI.IGradientRemoveRequest=} [properties] Properties to set
         */
        function GradientRemoveRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GradientRemoveRequest enterpriseUserId.
         * @member {number} enterpriseUserId
         * @memberof BI.GradientRemoveRequest
         * @instance
         */
        GradientRemoveRequest.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GradientRemoveRequest instance using the specified properties.
         * @function create
         * @memberof BI.GradientRemoveRequest
         * @static
         * @param {BI.IGradientRemoveRequest=} [properties] Properties to set
         * @returns {BI.GradientRemoveRequest} GradientRemoveRequest instance
         */
        GradientRemoveRequest.create = function create(properties) {
            return new GradientRemoveRequest(properties);
        };

        /**
         * Encodes the specified GradientRemoveRequest message. Does not implicitly {@link BI.GradientRemoveRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.GradientRemoveRequest
         * @static
         * @param {BI.IGradientRemoveRequest} message GradientRemoveRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GradientRemoveRequest.encode = function encode(message, writer, q) {
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
         * Decodes a GradientRemoveRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.GradientRemoveRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.GradientRemoveRequest} GradientRemoveRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GradientRemoveRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.GradientRemoveRequest();
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
         * Creates a GradientRemoveRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.GradientRemoveRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.GradientRemoveRequest} GradientRemoveRequest
         */
        GradientRemoveRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.GradientRemoveRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.GradientRemoveRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.GradientRemoveRequest();
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
         * Creates a plain object from a GradientRemoveRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.GradientRemoveRequest
         * @static
         * @param {BI.GradientRemoveRequest} message GradientRemoveRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GradientRemoveRequest.toObject = function toObject(message, options, q) {
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
         * Converts this GradientRemoveRequest to JSON.
         * @function toJSON
         * @memberof BI.GradientRemoveRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GradientRemoveRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GradientRemoveRequest
         * @function getTypeUrl
         * @memberof BI.GradientRemoveRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GradientRemoveRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.GradientRemoveRequest";
        };

        return GradientRemoveRequest;
    })();

    BI.GradientRemoveResponse = (function() {

        /**
         * Properties of a GradientRemoveResponse.
         * @memberof BI
         * @interface IGradientRemoveResponse
         * @property {boolean|null} [success] GradientRemoveResponse success
         * @property {string|null} [message] GradientRemoveResponse message
         */

        /**
         * Constructs a new GradientRemoveResponse.
         * @memberof BI
         * @classdesc Represents a GradientRemoveResponse.
         * @implements IGradientRemoveResponse
         * @constructor
         * @param {BI.IGradientRemoveResponse=} [properties] Properties to set
         */
        function GradientRemoveResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GradientRemoveResponse success.
         * @member {boolean} success
         * @memberof BI.GradientRemoveResponse
         * @instance
         */
        GradientRemoveResponse.prototype.success = false;

        /**
         * GradientRemoveResponse message.
         * @member {string} message
         * @memberof BI.GradientRemoveResponse
         * @instance
         */
        GradientRemoveResponse.prototype.message = "";

        /**
         * Creates a new GradientRemoveResponse instance using the specified properties.
         * @function create
         * @memberof BI.GradientRemoveResponse
         * @static
         * @param {BI.IGradientRemoveResponse=} [properties] Properties to set
         * @returns {BI.GradientRemoveResponse} GradientRemoveResponse instance
         */
        GradientRemoveResponse.create = function create(properties) {
            return new GradientRemoveResponse(properties);
        };

        /**
         * Encodes the specified GradientRemoveResponse message. Does not implicitly {@link BI.GradientRemoveResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.GradientRemoveResponse
         * @static
         * @param {BI.IGradientRemoveResponse} message GradientRemoveResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GradientRemoveResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            return writer;
        };

        /**
         * Decodes a GradientRemoveResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.GradientRemoveResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.GradientRemoveResponse} GradientRemoveResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GradientRemoveResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.GradientRemoveResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.success = reader.bool();
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
         * Creates a GradientRemoveResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.GradientRemoveResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.GradientRemoveResponse} GradientRemoveResponse
         */
        GradientRemoveResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.GradientRemoveResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.GradientRemoveResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.GradientRemoveResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a GradientRemoveResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.GradientRemoveResponse
         * @static
         * @param {BI.GradientRemoveResponse} message GradientRemoveResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GradientRemoveResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.success = false;
                object.message = "";
            }
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this GradientRemoveResponse to JSON.
         * @function toJSON
         * @memberof BI.GradientRemoveResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GradientRemoveResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GradientRemoveResponse
         * @function getTypeUrl
         * @memberof BI.GradientRemoveResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GradientRemoveResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.GradientRemoveResponse";
        };

        return GradientRemoveResponse;
    })();

    BI.GradientSyncRequest = (function() {

        /**
         * Properties of a GradientSyncRequest.
         * @memberof BI
         * @interface IGradientSyncRequest
         * @property {number|null} [enterpriseUserId] GradientSyncRequest enterpriseUserId
         */

        /**
         * Constructs a new GradientSyncRequest.
         * @memberof BI
         * @classdesc Represents a GradientSyncRequest.
         * @implements IGradientSyncRequest
         * @constructor
         * @param {BI.IGradientSyncRequest=} [properties] Properties to set
         */
        function GradientSyncRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GradientSyncRequest enterpriseUserId.
         * @member {number} enterpriseUserId
         * @memberof BI.GradientSyncRequest
         * @instance
         */
        GradientSyncRequest.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new GradientSyncRequest instance using the specified properties.
         * @function create
         * @memberof BI.GradientSyncRequest
         * @static
         * @param {BI.IGradientSyncRequest=} [properties] Properties to set
         * @returns {BI.GradientSyncRequest} GradientSyncRequest instance
         */
        GradientSyncRequest.create = function create(properties) {
            return new GradientSyncRequest(properties);
        };

        /**
         * Encodes the specified GradientSyncRequest message. Does not implicitly {@link BI.GradientSyncRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.GradientSyncRequest
         * @static
         * @param {BI.IGradientSyncRequest} message GradientSyncRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GradientSyncRequest.encode = function encode(message, writer, q) {
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
         * Decodes a GradientSyncRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.GradientSyncRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.GradientSyncRequest} GradientSyncRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GradientSyncRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.GradientSyncRequest();
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
         * Creates a GradientSyncRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.GradientSyncRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.GradientSyncRequest} GradientSyncRequest
         */
        GradientSyncRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.GradientSyncRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.GradientSyncRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.GradientSyncRequest();
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
         * Creates a plain object from a GradientSyncRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.GradientSyncRequest
         * @static
         * @param {BI.GradientSyncRequest} message GradientSyncRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GradientSyncRequest.toObject = function toObject(message, options, q) {
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
         * Converts this GradientSyncRequest to JSON.
         * @function toJSON
         * @memberof BI.GradientSyncRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GradientSyncRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GradientSyncRequest
         * @function getTypeUrl
         * @memberof BI.GradientSyncRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GradientSyncRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.GradientSyncRequest";
        };

        return GradientSyncRequest;
    })();

    BI.GradientSyncResponse = (function() {

        /**
         * Properties of a GradientSyncResponse.
         * @memberof BI
         * @interface IGradientSyncResponse
         * @property {boolean|null} [success] GradientSyncResponse success
         * @property {BI.GradientIntegrationStatus|null} [status] GradientSyncResponse status
         * @property {string|null} [message] GradientSyncResponse message
         */

        /**
         * Constructs a new GradientSyncResponse.
         * @memberof BI
         * @classdesc Represents a GradientSyncResponse.
         * @implements IGradientSyncResponse
         * @constructor
         * @param {BI.IGradientSyncResponse=} [properties] Properties to set
         */
        function GradientSyncResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GradientSyncResponse success.
         * @member {boolean} success
         * @memberof BI.GradientSyncResponse
         * @instance
         */
        GradientSyncResponse.prototype.success = false;

        /**
         * GradientSyncResponse status.
         * @member {BI.GradientIntegrationStatus} status
         * @memberof BI.GradientSyncResponse
         * @instance
         */
        GradientSyncResponse.prototype.status = 0;

        /**
         * GradientSyncResponse message.
         * @member {string} message
         * @memberof BI.GradientSyncResponse
         * @instance
         */
        GradientSyncResponse.prototype.message = "";

        /**
         * Creates a new GradientSyncResponse instance using the specified properties.
         * @function create
         * @memberof BI.GradientSyncResponse
         * @static
         * @param {BI.IGradientSyncResponse=} [properties] Properties to set
         * @returns {BI.GradientSyncResponse} GradientSyncResponse instance
         */
        GradientSyncResponse.create = function create(properties) {
            return new GradientSyncResponse(properties);
        };

        /**
         * Encodes the specified GradientSyncResponse message. Does not implicitly {@link BI.GradientSyncResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.GradientSyncResponse
         * @static
         * @param {BI.IGradientSyncResponse} message GradientSyncResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GradientSyncResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            return writer;
        };

        /**
         * Decodes a GradientSyncResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.GradientSyncResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.GradientSyncResponse} GradientSyncResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GradientSyncResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.GradientSyncResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.success = reader.bool();
                        break;
                    }
                case 2: {
                        message.status = reader.int32();
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
         * Creates a GradientSyncResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.GradientSyncResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.GradientSyncResponse} GradientSyncResponse
         */
        GradientSyncResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.GradientSyncResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.GradientSyncResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.GradientSyncResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "NOTCONNECTED":
            case 0:
                message.status = 0;
                break;
            case "PENDING":
            case 1:
                message.status = 1;
                break;
            case "CONNECTED":
            case 2:
                message.status = 2;
                break;
            case "NONE":
            case 3:
                message.status = 3;
                break;
            }
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a GradientSyncResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.GradientSyncResponse
         * @static
         * @param {BI.GradientSyncResponse} message GradientSyncResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GradientSyncResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.success = false;
                object.status = options.enums === String ? "NOTCONNECTED" : 0;
                object.message = "";
            }
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = options.enums === String ? $root.BI.GradientIntegrationStatus[message.status] === undefined ? message.status : $root.BI.GradientIntegrationStatus[message.status] : message.status;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this GradientSyncResponse to JSON.
         * @function toJSON
         * @memberof BI.GradientSyncResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GradientSyncResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GradientSyncResponse
         * @function getTypeUrl
         * @memberof BI.GradientSyncResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GradientSyncResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.GradientSyncResponse";
        };

        return GradientSyncResponse;
    })();

    /**
     * GradientIntegrationStatus enum.
     * @name BI.GradientIntegrationStatus
     * @enum {number}
     * @property {number} NOTCONNECTED=0 NOTCONNECTED value
     * @property {number} PENDING=1 PENDING value
     * @property {number} CONNECTED=2 CONNECTED value
     * @property {number} NONE=3 NONE value
     */
    BI.GradientIntegrationStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NOTCONNECTED"] = 0;
        values[valuesById[1] = "PENDING"] = 1;
        values[valuesById[2] = "CONNECTED"] = 2;
        values[valuesById[3] = "NONE"] = 3;
        return values;
    })();

    BI.NetPromoterScoreSurveySubmissionRequest = (function() {

        /**
         * Properties of a NetPromoterScoreSurveySubmissionRequest.
         * @memberof BI
         * @interface INetPromoterScoreSurveySubmissionRequest
         * @property {number|null} [surveyScore] NetPromoterScoreSurveySubmissionRequest surveyScore
         * @property {string|null} [notes] NetPromoterScoreSurveySubmissionRequest notes
         */

        /**
         * Constructs a new NetPromoterScoreSurveySubmissionRequest.
         * @memberof BI
         * @classdesc Represents a NetPromoterScoreSurveySubmissionRequest.
         * @implements INetPromoterScoreSurveySubmissionRequest
         * @constructor
         * @param {BI.INetPromoterScoreSurveySubmissionRequest=} [properties] Properties to set
         */
        function NetPromoterScoreSurveySubmissionRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NetPromoterScoreSurveySubmissionRequest surveyScore.
         * @member {number} surveyScore
         * @memberof BI.NetPromoterScoreSurveySubmissionRequest
         * @instance
         */
        NetPromoterScoreSurveySubmissionRequest.prototype.surveyScore = 0;

        /**
         * NetPromoterScoreSurveySubmissionRequest notes.
         * @member {string} notes
         * @memberof BI.NetPromoterScoreSurveySubmissionRequest
         * @instance
         */
        NetPromoterScoreSurveySubmissionRequest.prototype.notes = "";

        /**
         * Creates a new NetPromoterScoreSurveySubmissionRequest instance using the specified properties.
         * @function create
         * @memberof BI.NetPromoterScoreSurveySubmissionRequest
         * @static
         * @param {BI.INetPromoterScoreSurveySubmissionRequest=} [properties] Properties to set
         * @returns {BI.NetPromoterScoreSurveySubmissionRequest} NetPromoterScoreSurveySubmissionRequest instance
         */
        NetPromoterScoreSurveySubmissionRequest.create = function create(properties) {
            return new NetPromoterScoreSurveySubmissionRequest(properties);
        };

        /**
         * Encodes the specified NetPromoterScoreSurveySubmissionRequest message. Does not implicitly {@link BI.NetPromoterScoreSurveySubmissionRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.NetPromoterScoreSurveySubmissionRequest
         * @static
         * @param {BI.INetPromoterScoreSurveySubmissionRequest} message NetPromoterScoreSurveySubmissionRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NetPromoterScoreSurveySubmissionRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.surveyScore != null && Object.hasOwnProperty.call(message, "surveyScore"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.surveyScore);
            if (message.notes != null && Object.hasOwnProperty.call(message, "notes"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.notes);
            return writer;
        };

        /**
         * Decodes a NetPromoterScoreSurveySubmissionRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NetPromoterScoreSurveySubmissionRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NetPromoterScoreSurveySubmissionRequest} NetPromoterScoreSurveySubmissionRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NetPromoterScoreSurveySubmissionRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NetPromoterScoreSurveySubmissionRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.surveyScore = reader.int32();
                        break;
                    }
                case 2: {
                        message.notes = reader.string();
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
         * Creates a NetPromoterScoreSurveySubmissionRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.NetPromoterScoreSurveySubmissionRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NetPromoterScoreSurveySubmissionRequest} NetPromoterScoreSurveySubmissionRequest
         */
        NetPromoterScoreSurveySubmissionRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NetPromoterScoreSurveySubmissionRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.NetPromoterScoreSurveySubmissionRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.NetPromoterScoreSurveySubmissionRequest();
            if (object.surveyScore != null)
                message.surveyScore = object.surveyScore | 0;
            if (object.notes != null)
                message.notes = String(object.notes);
            return message;
        };

        /**
         * Creates a plain object from a NetPromoterScoreSurveySubmissionRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NetPromoterScoreSurveySubmissionRequest
         * @static
         * @param {BI.NetPromoterScoreSurveySubmissionRequest} message NetPromoterScoreSurveySubmissionRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NetPromoterScoreSurveySubmissionRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.surveyScore = 0;
                object.notes = "";
            }
            if (message.surveyScore != null && Object.hasOwnProperty.call(message, "surveyScore"))
                object.surveyScore = message.surveyScore;
            if (message.notes != null && Object.hasOwnProperty.call(message, "notes"))
                object.notes = message.notes;
            return object;
        };

        /**
         * Converts this NetPromoterScoreSurveySubmissionRequest to JSON.
         * @function toJSON
         * @memberof BI.NetPromoterScoreSurveySubmissionRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NetPromoterScoreSurveySubmissionRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NetPromoterScoreSurveySubmissionRequest
         * @function getTypeUrl
         * @memberof BI.NetPromoterScoreSurveySubmissionRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NetPromoterScoreSurveySubmissionRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NetPromoterScoreSurveySubmissionRequest";
        };

        return NetPromoterScoreSurveySubmissionRequest;
    })();

    BI.NetPromoterScoreSurveySubmissionResponse = (function() {

        /**
         * Properties of a NetPromoterScoreSurveySubmissionResponse.
         * @memberof BI
         * @interface INetPromoterScoreSurveySubmissionResponse
         */

        /**
         * Constructs a new NetPromoterScoreSurveySubmissionResponse.
         * @memberof BI
         * @classdesc Represents a NetPromoterScoreSurveySubmissionResponse.
         * @implements INetPromoterScoreSurveySubmissionResponse
         * @constructor
         * @param {BI.INetPromoterScoreSurveySubmissionResponse=} [properties] Properties to set
         */
        function NetPromoterScoreSurveySubmissionResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new NetPromoterScoreSurveySubmissionResponse instance using the specified properties.
         * @function create
         * @memberof BI.NetPromoterScoreSurveySubmissionResponse
         * @static
         * @param {BI.INetPromoterScoreSurveySubmissionResponse=} [properties] Properties to set
         * @returns {BI.NetPromoterScoreSurveySubmissionResponse} NetPromoterScoreSurveySubmissionResponse instance
         */
        NetPromoterScoreSurveySubmissionResponse.create = function create(properties) {
            return new NetPromoterScoreSurveySubmissionResponse(properties);
        };

        /**
         * Encodes the specified NetPromoterScoreSurveySubmissionResponse message. Does not implicitly {@link BI.NetPromoterScoreSurveySubmissionResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.NetPromoterScoreSurveySubmissionResponse
         * @static
         * @param {BI.INetPromoterScoreSurveySubmissionResponse} message NetPromoterScoreSurveySubmissionResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NetPromoterScoreSurveySubmissionResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a NetPromoterScoreSurveySubmissionResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NetPromoterScoreSurveySubmissionResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NetPromoterScoreSurveySubmissionResponse} NetPromoterScoreSurveySubmissionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NetPromoterScoreSurveySubmissionResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NetPromoterScoreSurveySubmissionResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a NetPromoterScoreSurveySubmissionResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.NetPromoterScoreSurveySubmissionResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NetPromoterScoreSurveySubmissionResponse} NetPromoterScoreSurveySubmissionResponse
         */
        NetPromoterScoreSurveySubmissionResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NetPromoterScoreSurveySubmissionResponse)
                return object;
            return new $root.BI.NetPromoterScoreSurveySubmissionResponse();
        };

        /**
         * Creates a plain object from a NetPromoterScoreSurveySubmissionResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NetPromoterScoreSurveySubmissionResponse
         * @static
         * @param {BI.NetPromoterScoreSurveySubmissionResponse} message NetPromoterScoreSurveySubmissionResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NetPromoterScoreSurveySubmissionResponse.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this NetPromoterScoreSurveySubmissionResponse to JSON.
         * @function toJSON
         * @memberof BI.NetPromoterScoreSurveySubmissionResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NetPromoterScoreSurveySubmissionResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NetPromoterScoreSurveySubmissionResponse
         * @function getTypeUrl
         * @memberof BI.NetPromoterScoreSurveySubmissionResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NetPromoterScoreSurveySubmissionResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NetPromoterScoreSurveySubmissionResponse";
        };

        return NetPromoterScoreSurveySubmissionResponse;
    })();

    BI.NetPromoterScorePopupScheduleRequest = (function() {

        /**
         * Properties of a NetPromoterScorePopupScheduleRequest.
         * @memberof BI
         * @interface INetPromoterScorePopupScheduleRequest
         */

        /**
         * Constructs a new NetPromoterScorePopupScheduleRequest.
         * @memberof BI
         * @classdesc Represents a NetPromoterScorePopupScheduleRequest.
         * @implements INetPromoterScorePopupScheduleRequest
         * @constructor
         * @param {BI.INetPromoterScorePopupScheduleRequest=} [properties] Properties to set
         */
        function NetPromoterScorePopupScheduleRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new NetPromoterScorePopupScheduleRequest instance using the specified properties.
         * @function create
         * @memberof BI.NetPromoterScorePopupScheduleRequest
         * @static
         * @param {BI.INetPromoterScorePopupScheduleRequest=} [properties] Properties to set
         * @returns {BI.NetPromoterScorePopupScheduleRequest} NetPromoterScorePopupScheduleRequest instance
         */
        NetPromoterScorePopupScheduleRequest.create = function create(properties) {
            return new NetPromoterScorePopupScheduleRequest(properties);
        };

        /**
         * Encodes the specified NetPromoterScorePopupScheduleRequest message. Does not implicitly {@link BI.NetPromoterScorePopupScheduleRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.NetPromoterScorePopupScheduleRequest
         * @static
         * @param {BI.INetPromoterScorePopupScheduleRequest} message NetPromoterScorePopupScheduleRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NetPromoterScorePopupScheduleRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a NetPromoterScorePopupScheduleRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NetPromoterScorePopupScheduleRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NetPromoterScorePopupScheduleRequest} NetPromoterScorePopupScheduleRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NetPromoterScorePopupScheduleRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NetPromoterScorePopupScheduleRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a NetPromoterScorePopupScheduleRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.NetPromoterScorePopupScheduleRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NetPromoterScorePopupScheduleRequest} NetPromoterScorePopupScheduleRequest
         */
        NetPromoterScorePopupScheduleRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NetPromoterScorePopupScheduleRequest)
                return object;
            return new $root.BI.NetPromoterScorePopupScheduleRequest();
        };

        /**
         * Creates a plain object from a NetPromoterScorePopupScheduleRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NetPromoterScorePopupScheduleRequest
         * @static
         * @param {BI.NetPromoterScorePopupScheduleRequest} message NetPromoterScorePopupScheduleRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NetPromoterScorePopupScheduleRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this NetPromoterScorePopupScheduleRequest to JSON.
         * @function toJSON
         * @memberof BI.NetPromoterScorePopupScheduleRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NetPromoterScorePopupScheduleRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NetPromoterScorePopupScheduleRequest
         * @function getTypeUrl
         * @memberof BI.NetPromoterScorePopupScheduleRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NetPromoterScorePopupScheduleRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NetPromoterScorePopupScheduleRequest";
        };

        return NetPromoterScorePopupScheduleRequest;
    })();

    BI.NetPromoterScorePopupScheduleResponse = (function() {

        /**
         * Properties of a NetPromoterScorePopupScheduleResponse.
         * @memberof BI
         * @interface INetPromoterScorePopupScheduleResponse
         * @property {boolean|null} [showPopup] NetPromoterScorePopupScheduleResponse showPopup
         */

        /**
         * Constructs a new NetPromoterScorePopupScheduleResponse.
         * @memberof BI
         * @classdesc Represents a NetPromoterScorePopupScheduleResponse.
         * @implements INetPromoterScorePopupScheduleResponse
         * @constructor
         * @param {BI.INetPromoterScorePopupScheduleResponse=} [properties] Properties to set
         */
        function NetPromoterScorePopupScheduleResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NetPromoterScorePopupScheduleResponse showPopup.
         * @member {boolean} showPopup
         * @memberof BI.NetPromoterScorePopupScheduleResponse
         * @instance
         */
        NetPromoterScorePopupScheduleResponse.prototype.showPopup = false;

        /**
         * Creates a new NetPromoterScorePopupScheduleResponse instance using the specified properties.
         * @function create
         * @memberof BI.NetPromoterScorePopupScheduleResponse
         * @static
         * @param {BI.INetPromoterScorePopupScheduleResponse=} [properties] Properties to set
         * @returns {BI.NetPromoterScorePopupScheduleResponse} NetPromoterScorePopupScheduleResponse instance
         */
        NetPromoterScorePopupScheduleResponse.create = function create(properties) {
            return new NetPromoterScorePopupScheduleResponse(properties);
        };

        /**
         * Encodes the specified NetPromoterScorePopupScheduleResponse message. Does not implicitly {@link BI.NetPromoterScorePopupScheduleResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.NetPromoterScorePopupScheduleResponse
         * @static
         * @param {BI.INetPromoterScorePopupScheduleResponse} message NetPromoterScorePopupScheduleResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NetPromoterScorePopupScheduleResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.showPopup != null && Object.hasOwnProperty.call(message, "showPopup"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.showPopup);
            return writer;
        };

        /**
         * Decodes a NetPromoterScorePopupScheduleResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NetPromoterScorePopupScheduleResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NetPromoterScorePopupScheduleResponse} NetPromoterScorePopupScheduleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NetPromoterScorePopupScheduleResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NetPromoterScorePopupScheduleResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.showPopup = reader.bool();
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
         * Creates a NetPromoterScorePopupScheduleResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.NetPromoterScorePopupScheduleResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NetPromoterScorePopupScheduleResponse} NetPromoterScorePopupScheduleResponse
         */
        NetPromoterScorePopupScheduleResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NetPromoterScorePopupScheduleResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.NetPromoterScorePopupScheduleResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.NetPromoterScorePopupScheduleResponse();
            if (object.showPopup != null)
                message.showPopup = Boolean(object.showPopup);
            return message;
        };

        /**
         * Creates a plain object from a NetPromoterScorePopupScheduleResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NetPromoterScorePopupScheduleResponse
         * @static
         * @param {BI.NetPromoterScorePopupScheduleResponse} message NetPromoterScorePopupScheduleResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NetPromoterScorePopupScheduleResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.showPopup = false;
            if (message.showPopup != null && Object.hasOwnProperty.call(message, "showPopup"))
                object.showPopup = message.showPopup;
            return object;
        };

        /**
         * Converts this NetPromoterScorePopupScheduleResponse to JSON.
         * @function toJSON
         * @memberof BI.NetPromoterScorePopupScheduleResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NetPromoterScorePopupScheduleResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NetPromoterScorePopupScheduleResponse
         * @function getTypeUrl
         * @memberof BI.NetPromoterScorePopupScheduleResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NetPromoterScorePopupScheduleResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NetPromoterScorePopupScheduleResponse";
        };

        return NetPromoterScorePopupScheduleResponse;
    })();

    BI.NetPromoterScorePopupDismissalRequest = (function() {

        /**
         * Properties of a NetPromoterScorePopupDismissalRequest.
         * @memberof BI
         * @interface INetPromoterScorePopupDismissalRequest
         */

        /**
         * Constructs a new NetPromoterScorePopupDismissalRequest.
         * @memberof BI
         * @classdesc Represents a NetPromoterScorePopupDismissalRequest.
         * @implements INetPromoterScorePopupDismissalRequest
         * @constructor
         * @param {BI.INetPromoterScorePopupDismissalRequest=} [properties] Properties to set
         */
        function NetPromoterScorePopupDismissalRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new NetPromoterScorePopupDismissalRequest instance using the specified properties.
         * @function create
         * @memberof BI.NetPromoterScorePopupDismissalRequest
         * @static
         * @param {BI.INetPromoterScorePopupDismissalRequest=} [properties] Properties to set
         * @returns {BI.NetPromoterScorePopupDismissalRequest} NetPromoterScorePopupDismissalRequest instance
         */
        NetPromoterScorePopupDismissalRequest.create = function create(properties) {
            return new NetPromoterScorePopupDismissalRequest(properties);
        };

        /**
         * Encodes the specified NetPromoterScorePopupDismissalRequest message. Does not implicitly {@link BI.NetPromoterScorePopupDismissalRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.NetPromoterScorePopupDismissalRequest
         * @static
         * @param {BI.INetPromoterScorePopupDismissalRequest} message NetPromoterScorePopupDismissalRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NetPromoterScorePopupDismissalRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a NetPromoterScorePopupDismissalRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NetPromoterScorePopupDismissalRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NetPromoterScorePopupDismissalRequest} NetPromoterScorePopupDismissalRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NetPromoterScorePopupDismissalRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NetPromoterScorePopupDismissalRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a NetPromoterScorePopupDismissalRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.NetPromoterScorePopupDismissalRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NetPromoterScorePopupDismissalRequest} NetPromoterScorePopupDismissalRequest
         */
        NetPromoterScorePopupDismissalRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NetPromoterScorePopupDismissalRequest)
                return object;
            return new $root.BI.NetPromoterScorePopupDismissalRequest();
        };

        /**
         * Creates a plain object from a NetPromoterScorePopupDismissalRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NetPromoterScorePopupDismissalRequest
         * @static
         * @param {BI.NetPromoterScorePopupDismissalRequest} message NetPromoterScorePopupDismissalRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NetPromoterScorePopupDismissalRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this NetPromoterScorePopupDismissalRequest to JSON.
         * @function toJSON
         * @memberof BI.NetPromoterScorePopupDismissalRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NetPromoterScorePopupDismissalRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NetPromoterScorePopupDismissalRequest
         * @function getTypeUrl
         * @memberof BI.NetPromoterScorePopupDismissalRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NetPromoterScorePopupDismissalRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NetPromoterScorePopupDismissalRequest";
        };

        return NetPromoterScorePopupDismissalRequest;
    })();

    BI.NetPromoterScorePopupDismissalResponse = (function() {

        /**
         * Properties of a NetPromoterScorePopupDismissalResponse.
         * @memberof BI
         * @interface INetPromoterScorePopupDismissalResponse
         */

        /**
         * Constructs a new NetPromoterScorePopupDismissalResponse.
         * @memberof BI
         * @classdesc Represents a NetPromoterScorePopupDismissalResponse.
         * @implements INetPromoterScorePopupDismissalResponse
         * @constructor
         * @param {BI.INetPromoterScorePopupDismissalResponse=} [properties] Properties to set
         */
        function NetPromoterScorePopupDismissalResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new NetPromoterScorePopupDismissalResponse instance using the specified properties.
         * @function create
         * @memberof BI.NetPromoterScorePopupDismissalResponse
         * @static
         * @param {BI.INetPromoterScorePopupDismissalResponse=} [properties] Properties to set
         * @returns {BI.NetPromoterScorePopupDismissalResponse} NetPromoterScorePopupDismissalResponse instance
         */
        NetPromoterScorePopupDismissalResponse.create = function create(properties) {
            return new NetPromoterScorePopupDismissalResponse(properties);
        };

        /**
         * Encodes the specified NetPromoterScorePopupDismissalResponse message. Does not implicitly {@link BI.NetPromoterScorePopupDismissalResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.NetPromoterScorePopupDismissalResponse
         * @static
         * @param {BI.INetPromoterScorePopupDismissalResponse} message NetPromoterScorePopupDismissalResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NetPromoterScorePopupDismissalResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a NetPromoterScorePopupDismissalResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NetPromoterScorePopupDismissalResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NetPromoterScorePopupDismissalResponse} NetPromoterScorePopupDismissalResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NetPromoterScorePopupDismissalResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NetPromoterScorePopupDismissalResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a NetPromoterScorePopupDismissalResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.NetPromoterScorePopupDismissalResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NetPromoterScorePopupDismissalResponse} NetPromoterScorePopupDismissalResponse
         */
        NetPromoterScorePopupDismissalResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NetPromoterScorePopupDismissalResponse)
                return object;
            return new $root.BI.NetPromoterScorePopupDismissalResponse();
        };

        /**
         * Creates a plain object from a NetPromoterScorePopupDismissalResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NetPromoterScorePopupDismissalResponse
         * @static
         * @param {BI.NetPromoterScorePopupDismissalResponse} message NetPromoterScorePopupDismissalResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NetPromoterScorePopupDismissalResponse.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this NetPromoterScorePopupDismissalResponse to JSON.
         * @function toJSON
         * @memberof BI.NetPromoterScorePopupDismissalResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NetPromoterScorePopupDismissalResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NetPromoterScorePopupDismissalResponse
         * @function getTypeUrl
         * @memberof BI.NetPromoterScorePopupDismissalResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NetPromoterScorePopupDismissalResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NetPromoterScorePopupDismissalResponse";
        };

        return NetPromoterScorePopupDismissalResponse;
    })();

    BI.KCMLicenseRequest = (function() {

        /**
         * Properties of a KCMLicenseRequest.
         * @memberof BI
         * @interface IKCMLicenseRequest
         * @property {number|null} [enterpriseUserId] KCMLicenseRequest enterpriseUserId
         */

        /**
         * Constructs a new KCMLicenseRequest.
         * @memberof BI
         * @classdesc Represents a KCMLicenseRequest.
         * @implements IKCMLicenseRequest
         * @constructor
         * @param {BI.IKCMLicenseRequest=} [properties] Properties to set
         */
        function KCMLicenseRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KCMLicenseRequest enterpriseUserId.
         * @member {number} enterpriseUserId
         * @memberof BI.KCMLicenseRequest
         * @instance
         */
        KCMLicenseRequest.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new KCMLicenseRequest instance using the specified properties.
         * @function create
         * @memberof BI.KCMLicenseRequest
         * @static
         * @param {BI.IKCMLicenseRequest=} [properties] Properties to set
         * @returns {BI.KCMLicenseRequest} KCMLicenseRequest instance
         */
        KCMLicenseRequest.create = function create(properties) {
            return new KCMLicenseRequest(properties);
        };

        /**
         * Encodes the specified KCMLicenseRequest message. Does not implicitly {@link BI.KCMLicenseRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.KCMLicenseRequest
         * @static
         * @param {BI.IKCMLicenseRequest} message KCMLicenseRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KCMLicenseRequest.encode = function encode(message, writer, q) {
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
         * Decodes a KCMLicenseRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.KCMLicenseRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.KCMLicenseRequest} KCMLicenseRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KCMLicenseRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.KCMLicenseRequest();
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
         * Creates a KCMLicenseRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.KCMLicenseRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.KCMLicenseRequest} KCMLicenseRequest
         */
        KCMLicenseRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.KCMLicenseRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.KCMLicenseRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.KCMLicenseRequest();
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
         * Creates a plain object from a KCMLicenseRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.KCMLicenseRequest
         * @static
         * @param {BI.KCMLicenseRequest} message KCMLicenseRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KCMLicenseRequest.toObject = function toObject(message, options, q) {
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
         * Converts this KCMLicenseRequest to JSON.
         * @function toJSON
         * @memberof BI.KCMLicenseRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KCMLicenseRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KCMLicenseRequest
         * @function getTypeUrl
         * @memberof BI.KCMLicenseRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KCMLicenseRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.KCMLicenseRequest";
        };

        return KCMLicenseRequest;
    })();

    BI.KCMLicenseResponse = (function() {

        /**
         * Properties of a KCMLicenseResponse.
         * @memberof BI
         * @interface IKCMLicenseResponse
         * @property {string|null} [message] KCMLicenseResponse message
         */

        /**
         * Constructs a new KCMLicenseResponse.
         * @memberof BI
         * @classdesc Represents a KCMLicenseResponse.
         * @implements IKCMLicenseResponse
         * @constructor
         * @param {BI.IKCMLicenseResponse=} [properties] Properties to set
         */
        function KCMLicenseResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KCMLicenseResponse message.
         * @member {string} message
         * @memberof BI.KCMLicenseResponse
         * @instance
         */
        KCMLicenseResponse.prototype.message = "";

        /**
         * Creates a new KCMLicenseResponse instance using the specified properties.
         * @function create
         * @memberof BI.KCMLicenseResponse
         * @static
         * @param {BI.IKCMLicenseResponse=} [properties] Properties to set
         * @returns {BI.KCMLicenseResponse} KCMLicenseResponse instance
         */
        KCMLicenseResponse.create = function create(properties) {
            return new KCMLicenseResponse(properties);
        };

        /**
         * Encodes the specified KCMLicenseResponse message. Does not implicitly {@link BI.KCMLicenseResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.KCMLicenseResponse
         * @static
         * @param {BI.IKCMLicenseResponse} message KCMLicenseResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KCMLicenseResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            return writer;
        };

        /**
         * Decodes a KCMLicenseResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.KCMLicenseResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.KCMLicenseResponse} KCMLicenseResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KCMLicenseResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.KCMLicenseResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
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
         * Creates a KCMLicenseResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.KCMLicenseResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.KCMLicenseResponse} KCMLicenseResponse
         */
        KCMLicenseResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.KCMLicenseResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.KCMLicenseResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.KCMLicenseResponse();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a KCMLicenseResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.KCMLicenseResponse
         * @static
         * @param {BI.KCMLicenseResponse} message KCMLicenseResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KCMLicenseResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.message = "";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this KCMLicenseResponse to JSON.
         * @function toJSON
         * @memberof BI.KCMLicenseResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KCMLicenseResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KCMLicenseResponse
         * @function getTypeUrl
         * @memberof BI.KCMLicenseResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KCMLicenseResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.KCMLicenseResponse";
        };

        return KCMLicenseResponse;
    })();

    /**
     * EventType enum.
     * @name BI.EventType
     * @enum {number}
     * @property {number} UNKNOWN_TRACKING_EVENT_TYPE=0 UNKNOWN_TRACKING_EVENT_TYPE value
     * @property {number} TRACKING_POPUP_DISPLAYED=1 TRACKING_POPUP_DISPLAYED value
     * @property {number} TRACKING_POPUP_ACCEPTED=2 TRACKING_POPUP_ACCEPTED value
     * @property {number} TRACKING_POPUP_DISMISSED=3 TRACKING_POPUP_DISMISSED value
     * @property {number} TRACKING_POPUP_PAID=4 TRACKING_POPUP_PAID value
     * @property {number} TRACKING_PUSH_CLICKED=5 TRACKING_PUSH_CLICKED value
     * @property {number} CONSOLE_ACTION=6 CONSOLE_ACTION value
     * @property {number} VAULT_ACTION=7 VAULT_ACTION value
     */
    BI.EventType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_TRACKING_EVENT_TYPE"] = 0;
        values[valuesById[1] = "TRACKING_POPUP_DISPLAYED"] = 1;
        values[valuesById[2] = "TRACKING_POPUP_ACCEPTED"] = 2;
        values[valuesById[3] = "TRACKING_POPUP_DISMISSED"] = 3;
        values[valuesById[4] = "TRACKING_POPUP_PAID"] = 4;
        values[valuesById[5] = "TRACKING_PUSH_CLICKED"] = 5;
        values[valuesById[6] = "CONSOLE_ACTION"] = 6;
        values[valuesById[7] = "VAULT_ACTION"] = 7;
        return values;
    })();

    BI.EventRequest = (function() {

        /**
         * Properties of an EventRequest.
         * @memberof BI
         * @interface IEventRequest
         * @property {BI.EventType|null} [eventType] EventRequest eventType
         * @property {string|null} [eventValue] EventRequest eventValue
         * @property {number|null} [eventTime] EventRequest eventTime
         * @property {google.protobuf.IStruct|null} [attributes] EventRequest attributes
         */

        /**
         * Constructs a new EventRequest.
         * @memberof BI
         * @classdesc Represents an EventRequest.
         * @implements IEventRequest
         * @constructor
         * @param {BI.IEventRequest=} [properties] Properties to set
         */
        function EventRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EventRequest eventType.
         * @member {BI.EventType} eventType
         * @memberof BI.EventRequest
         * @instance
         */
        EventRequest.prototype.eventType = 0;

        /**
         * EventRequest eventValue.
         * @member {string} eventValue
         * @memberof BI.EventRequest
         * @instance
         */
        EventRequest.prototype.eventValue = "";

        /**
         * EventRequest eventTime.
         * @member {number} eventTime
         * @memberof BI.EventRequest
         * @instance
         */
        EventRequest.prototype.eventTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * EventRequest attributes.
         * @member {google.protobuf.IStruct|null|undefined} attributes
         * @memberof BI.EventRequest
         * @instance
         */
        EventRequest.prototype.attributes = null;

        /**
         * Creates a new EventRequest instance using the specified properties.
         * @function create
         * @memberof BI.EventRequest
         * @static
         * @param {BI.IEventRequest=} [properties] Properties to set
         * @returns {BI.EventRequest} EventRequest instance
         */
        EventRequest.create = function create(properties) {
            return new EventRequest(properties);
        };

        /**
         * Encodes the specified EventRequest message. Does not implicitly {@link BI.EventRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.EventRequest
         * @static
         * @param {BI.IEventRequest} message EventRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.eventType != null && Object.hasOwnProperty.call(message, "eventType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.eventType);
            if (message.eventValue != null && Object.hasOwnProperty.call(message, "eventValue"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.eventValue);
            if (message.eventTime != null && Object.hasOwnProperty.call(message, "eventTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.eventTime);
            if (message.attributes != null && Object.hasOwnProperty.call(message, "attributes"))
                $root.google.protobuf.Struct.encode(message.attributes, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an EventRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.EventRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.EventRequest} EventRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.EventRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.eventType = reader.int32();
                        break;
                    }
                case 2: {
                        message.eventValue = reader.string();
                        break;
                    }
                case 3: {
                        message.eventTime = reader.int64();
                        break;
                    }
                case 4: {
                        message.attributes = $root.google.protobuf.Struct.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates an EventRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.EventRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.EventRequest} EventRequest
         */
        EventRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.EventRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.EventRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.EventRequest();
            switch (object.eventType) {
            default:
                if (typeof object.eventType === "number") {
                    message.eventType = object.eventType;
                    break;
                }
                break;
            case "UNKNOWN_TRACKING_EVENT_TYPE":
            case 0:
                message.eventType = 0;
                break;
            case "TRACKING_POPUP_DISPLAYED":
            case 1:
                message.eventType = 1;
                break;
            case "TRACKING_POPUP_ACCEPTED":
            case 2:
                message.eventType = 2;
                break;
            case "TRACKING_POPUP_DISMISSED":
            case 3:
                message.eventType = 3;
                break;
            case "TRACKING_POPUP_PAID":
            case 4:
                message.eventType = 4;
                break;
            case "TRACKING_PUSH_CLICKED":
            case 5:
                message.eventType = 5;
                break;
            case "CONSOLE_ACTION":
            case 6:
                message.eventType = 6;
                break;
            case "VAULT_ACTION":
            case 7:
                message.eventType = 7;
                break;
            }
            if (object.eventValue != null)
                message.eventValue = String(object.eventValue);
            if (object.eventTime != null)
                if ($util.Long)
                    message.eventTime = $util.Long.fromValue(object.eventTime, false);
                else if (typeof object.eventTime === "string")
                    message.eventTime = parseInt(object.eventTime, 10);
                else if (typeof object.eventTime === "number")
                    message.eventTime = object.eventTime;
                else if (typeof object.eventTime === "object")
                    message.eventTime = new $util.LongBits(object.eventTime.low >>> 0, object.eventTime.high >>> 0).toNumber();
            if (object.attributes != null) {
                if (!$util.isObject(object.attributes))
                    throw TypeError(".BI.EventRequest.attributes: object expected");
                message.attributes = $root.google.protobuf.Struct.fromObject(object.attributes, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an EventRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.EventRequest
         * @static
         * @param {BI.EventRequest} message EventRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EventRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.eventType = options.enums === String ? "UNKNOWN_TRACKING_EVENT_TYPE" : 0;
                object.eventValue = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.eventTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.eventTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.attributes = null;
            }
            if (message.eventType != null && Object.hasOwnProperty.call(message, "eventType"))
                object.eventType = options.enums === String ? $root.BI.EventType[message.eventType] === undefined ? message.eventType : $root.BI.EventType[message.eventType] : message.eventType;
            if (message.eventValue != null && Object.hasOwnProperty.call(message, "eventValue"))
                object.eventValue = message.eventValue;
            if (message.eventTime != null && Object.hasOwnProperty.call(message, "eventTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.eventTime = typeof message.eventTime === "number" ? BigInt(message.eventTime) : $util.Long.fromBits(message.eventTime.low >>> 0, message.eventTime.high >>> 0, false).toBigInt();
                else if (typeof message.eventTime === "number")
                    object.eventTime = options.longs === String ? String(message.eventTime) : message.eventTime;
                else
                    object.eventTime = options.longs === String ? $util.Long.prototype.toString.call(message.eventTime) : options.longs === Number ? new $util.LongBits(message.eventTime.low >>> 0, message.eventTime.high >>> 0).toNumber() : message.eventTime;
            if (message.attributes != null && Object.hasOwnProperty.call(message, "attributes"))
                object.attributes = $root.google.protobuf.Struct.toObject(message.attributes, options, q + 1);
            return object;
        };

        /**
         * Converts this EventRequest to JSON.
         * @function toJSON
         * @memberof BI.EventRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EventRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EventRequest
         * @function getTypeUrl
         * @memberof BI.EventRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EventRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.EventRequest";
        };

        return EventRequest;
    })();

    BI.EventsRequest = (function() {

        /**
         * Properties of an EventsRequest.
         * @memberof BI
         * @interface IEventsRequest
         * @property {Array.<BI.IEventRequest>|null} [event] EventsRequest event
         */

        /**
         * Constructs a new EventsRequest.
         * @memberof BI
         * @classdesc Represents an EventsRequest.
         * @implements IEventsRequest
         * @constructor
         * @param {BI.IEventsRequest=} [properties] Properties to set
         */
        function EventsRequest(properties) {
            this.event = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EventsRequest event.
         * @member {Array.<BI.IEventRequest>} event
         * @memberof BI.EventsRequest
         * @instance
         */
        EventsRequest.prototype.event = $util.emptyArray;

        /**
         * Creates a new EventsRequest instance using the specified properties.
         * @function create
         * @memberof BI.EventsRequest
         * @static
         * @param {BI.IEventsRequest=} [properties] Properties to set
         * @returns {BI.EventsRequest} EventsRequest instance
         */
        EventsRequest.create = function create(properties) {
            return new EventsRequest(properties);
        };

        /**
         * Encodes the specified EventsRequest message. Does not implicitly {@link BI.EventsRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.EventsRequest
         * @static
         * @param {BI.IEventsRequest} message EventsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.event != null && message.event.length)
                for (let i = 0; i < message.event.length; ++i)
                    $root.BI.EventRequest.encode(message.event[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an EventsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.EventsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.EventsRequest} EventsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.EventsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.event && message.event.length))
                            message.event = [];
                        message.event.push($root.BI.EventRequest.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates an EventsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.EventsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.EventsRequest} EventsRequest
         */
        EventsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.EventsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.EventsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.EventsRequest();
            if (object.event) {
                if (!Array.isArray(object.event))
                    throw TypeError(".BI.EventsRequest.event: array expected");
                message.event = [];
                for (let i = 0; i < object.event.length; ++i) {
                    if (!$util.isObject(object.event[i]))
                        throw TypeError(".BI.EventsRequest.event: object expected");
                    message.event[i] = $root.BI.EventRequest.fromObject(object.event[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an EventsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.EventsRequest
         * @static
         * @param {BI.EventsRequest} message EventsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EventsRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.event = [];
            if (message.event && message.event.length) {
                object.event = [];
                for (let j = 0; j < message.event.length; ++j)
                    object.event[j] = $root.BI.EventRequest.toObject(message.event[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this EventsRequest to JSON.
         * @function toJSON
         * @memberof BI.EventsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EventsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EventsRequest
         * @function getTypeUrl
         * @memberof BI.EventsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EventsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.EventsRequest";
        };

        return EventsRequest;
    })();

    BI.EventResponse = (function() {

        /**
         * Properties of an EventResponse.
         * @memberof BI
         * @interface IEventResponse
         * @property {number|null} [index] EventResponse index
         * @property {boolean|null} [status] EventResponse status
         */

        /**
         * Constructs a new EventResponse.
         * @memberof BI
         * @classdesc Represents an EventResponse.
         * @implements IEventResponse
         * @constructor
         * @param {BI.IEventResponse=} [properties] Properties to set
         */
        function EventResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EventResponse index.
         * @member {number} index
         * @memberof BI.EventResponse
         * @instance
         */
        EventResponse.prototype.index = 0;

        /**
         * EventResponse status.
         * @member {boolean} status
         * @memberof BI.EventResponse
         * @instance
         */
        EventResponse.prototype.status = false;

        /**
         * Creates a new EventResponse instance using the specified properties.
         * @function create
         * @memberof BI.EventResponse
         * @static
         * @param {BI.IEventResponse=} [properties] Properties to set
         * @returns {BI.EventResponse} EventResponse instance
         */
        EventResponse.create = function create(properties) {
            return new EventResponse(properties);
        };

        /**
         * Encodes the specified EventResponse message. Does not implicitly {@link BI.EventResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.EventResponse
         * @static
         * @param {BI.IEventResponse} message EventResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.index);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.status);
            return writer;
        };

        /**
         * Decodes an EventResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.EventResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.EventResponse} EventResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.EventResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.index = reader.int32();
                        break;
                    }
                case 2: {
                        message.status = reader.bool();
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
         * Creates an EventResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.EventResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.EventResponse} EventResponse
         */
        EventResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.EventResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.EventResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.EventResponse();
            if (object.index != null)
                message.index = object.index | 0;
            if (object.status != null)
                message.status = Boolean(object.status);
            return message;
        };

        /**
         * Creates a plain object from an EventResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.EventResponse
         * @static
         * @param {BI.EventResponse} message EventResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EventResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.index = 0;
                object.status = false;
            }
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                object.index = message.index;
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = message.status;
            return object;
        };

        /**
         * Converts this EventResponse to JSON.
         * @function toJSON
         * @memberof BI.EventResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EventResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EventResponse
         * @function getTypeUrl
         * @memberof BI.EventResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EventResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.EventResponse";
        };

        return EventResponse;
    })();

    BI.EventsResponse = (function() {

        /**
         * Properties of an EventsResponse.
         * @memberof BI
         * @interface IEventsResponse
         * @property {Array.<BI.IEventResponse>|null} [response] EventsResponse response
         */

        /**
         * Constructs a new EventsResponse.
         * @memberof BI
         * @classdesc Represents an EventsResponse.
         * @implements IEventsResponse
         * @constructor
         * @param {BI.IEventsResponse=} [properties] Properties to set
         */
        function EventsResponse(properties) {
            this.response = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EventsResponse response.
         * @member {Array.<BI.IEventResponse>} response
         * @memberof BI.EventsResponse
         * @instance
         */
        EventsResponse.prototype.response = $util.emptyArray;

        /**
         * Creates a new EventsResponse instance using the specified properties.
         * @function create
         * @memberof BI.EventsResponse
         * @static
         * @param {BI.IEventsResponse=} [properties] Properties to set
         * @returns {BI.EventsResponse} EventsResponse instance
         */
        EventsResponse.create = function create(properties) {
            return new EventsResponse(properties);
        };

        /**
         * Encodes the specified EventsResponse message. Does not implicitly {@link BI.EventsResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.EventsResponse
         * @static
         * @param {BI.IEventsResponse} message EventsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EventsResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.response != null && message.response.length)
                for (let i = 0; i < message.response.length; ++i)
                    $root.BI.EventResponse.encode(message.response[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an EventsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.EventsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.EventsResponse} EventsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EventsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.EventsResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.response && message.response.length))
                            message.response = [];
                        message.response.push($root.BI.EventResponse.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates an EventsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.EventsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.EventsResponse} EventsResponse
         */
        EventsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.EventsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.EventsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.EventsResponse();
            if (object.response) {
                if (!Array.isArray(object.response))
                    throw TypeError(".BI.EventsResponse.response: array expected");
                message.response = [];
                for (let i = 0; i < object.response.length; ++i) {
                    if (!$util.isObject(object.response[i]))
                        throw TypeError(".BI.EventsResponse.response: object expected");
                    message.response[i] = $root.BI.EventResponse.fromObject(object.response[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an EventsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.EventsResponse
         * @static
         * @param {BI.EventsResponse} message EventsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EventsResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.response = [];
            if (message.response && message.response.length) {
                object.response = [];
                for (let j = 0; j < message.response.length; ++j)
                    object.response[j] = $root.BI.EventResponse.toObject(message.response[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this EventsResponse to JSON.
         * @function toJSON
         * @memberof BI.EventsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EventsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EventsResponse
         * @function getTypeUrl
         * @memberof BI.EventsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EventsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.EventsResponse";
        };

        return EventsResponse;
    })();

    BI.CustomerCaptureRequest = (function() {

        /**
         * Properties of a CustomerCaptureRequest.
         * @memberof BI
         * @interface ICustomerCaptureRequest
         * @property {string|null} [pageUrl] CustomerCaptureRequest pageUrl
         * @property {string|null} [tree] CustomerCaptureRequest tree
         * @property {string|null} [hash] CustomerCaptureRequest hash
         * @property {string|null} [image] CustomerCaptureRequest image
         * @property {string|null} [pageLoadTime] CustomerCaptureRequest pageLoadTime
         * @property {string|null} [keyId] CustomerCaptureRequest keyId
         * @property {boolean|null} [test] CustomerCaptureRequest test
         * @property {string|null} [issueType] CustomerCaptureRequest issueType
         * @property {string|null} [notes] CustomerCaptureRequest notes
         */

        /**
         * Constructs a new CustomerCaptureRequest.
         * @memberof BI
         * @classdesc Represents a CustomerCaptureRequest.
         * @implements ICustomerCaptureRequest
         * @constructor
         * @param {BI.ICustomerCaptureRequest=} [properties] Properties to set
         */
        function CustomerCaptureRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CustomerCaptureRequest pageUrl.
         * @member {string} pageUrl
         * @memberof BI.CustomerCaptureRequest
         * @instance
         */
        CustomerCaptureRequest.prototype.pageUrl = "";

        /**
         * CustomerCaptureRequest tree.
         * @member {string} tree
         * @memberof BI.CustomerCaptureRequest
         * @instance
         */
        CustomerCaptureRequest.prototype.tree = "";

        /**
         * CustomerCaptureRequest hash.
         * @member {string} hash
         * @memberof BI.CustomerCaptureRequest
         * @instance
         */
        CustomerCaptureRequest.prototype.hash = "";

        /**
         * CustomerCaptureRequest image.
         * @member {string} image
         * @memberof BI.CustomerCaptureRequest
         * @instance
         */
        CustomerCaptureRequest.prototype.image = "";

        /**
         * CustomerCaptureRequest pageLoadTime.
         * @member {string} pageLoadTime
         * @memberof BI.CustomerCaptureRequest
         * @instance
         */
        CustomerCaptureRequest.prototype.pageLoadTime = "";

        /**
         * CustomerCaptureRequest keyId.
         * @member {string} keyId
         * @memberof BI.CustomerCaptureRequest
         * @instance
         */
        CustomerCaptureRequest.prototype.keyId = "";

        /**
         * CustomerCaptureRequest test.
         * @member {boolean} test
         * @memberof BI.CustomerCaptureRequest
         * @instance
         */
        CustomerCaptureRequest.prototype.test = false;

        /**
         * CustomerCaptureRequest issueType.
         * @member {string} issueType
         * @memberof BI.CustomerCaptureRequest
         * @instance
         */
        CustomerCaptureRequest.prototype.issueType = "";

        /**
         * CustomerCaptureRequest notes.
         * @member {string} notes
         * @memberof BI.CustomerCaptureRequest
         * @instance
         */
        CustomerCaptureRequest.prototype.notes = "";

        /**
         * Creates a new CustomerCaptureRequest instance using the specified properties.
         * @function create
         * @memberof BI.CustomerCaptureRequest
         * @static
         * @param {BI.ICustomerCaptureRequest=} [properties] Properties to set
         * @returns {BI.CustomerCaptureRequest} CustomerCaptureRequest instance
         */
        CustomerCaptureRequest.create = function create(properties) {
            return new CustomerCaptureRequest(properties);
        };

        /**
         * Encodes the specified CustomerCaptureRequest message. Does not implicitly {@link BI.CustomerCaptureRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.CustomerCaptureRequest
         * @static
         * @param {BI.ICustomerCaptureRequest} message CustomerCaptureRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CustomerCaptureRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.pageUrl != null && Object.hasOwnProperty.call(message, "pageUrl"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.pageUrl);
            if (message.tree != null && Object.hasOwnProperty.call(message, "tree"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.tree);
            if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.hash);
            if (message.image != null && Object.hasOwnProperty.call(message, "image"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.image);
            if (message.pageLoadTime != null && Object.hasOwnProperty.call(message, "pageLoadTime"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.pageLoadTime);
            if (message.keyId != null && Object.hasOwnProperty.call(message, "keyId"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.keyId);
            if (message.test != null && Object.hasOwnProperty.call(message, "test"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.test);
            if (message.issueType != null && Object.hasOwnProperty.call(message, "issueType"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.issueType);
            if (message.notes != null && Object.hasOwnProperty.call(message, "notes"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.notes);
            return writer;
        };

        /**
         * Decodes a CustomerCaptureRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.CustomerCaptureRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.CustomerCaptureRequest} CustomerCaptureRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CustomerCaptureRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.CustomerCaptureRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.pageUrl = reader.string();
                        break;
                    }
                case 2: {
                        message.tree = reader.string();
                        break;
                    }
                case 3: {
                        message.hash = reader.string();
                        break;
                    }
                case 4: {
                        message.image = reader.string();
                        break;
                    }
                case 5: {
                        message.pageLoadTime = reader.string();
                        break;
                    }
                case 6: {
                        message.keyId = reader.string();
                        break;
                    }
                case 7: {
                        message.test = reader.bool();
                        break;
                    }
                case 8: {
                        message.issueType = reader.string();
                        break;
                    }
                case 9: {
                        message.notes = reader.string();
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
         * Creates a CustomerCaptureRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.CustomerCaptureRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.CustomerCaptureRequest} CustomerCaptureRequest
         */
        CustomerCaptureRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.CustomerCaptureRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.CustomerCaptureRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.CustomerCaptureRequest();
            if (object.pageUrl != null)
                message.pageUrl = String(object.pageUrl);
            if (object.tree != null)
                message.tree = String(object.tree);
            if (object.hash != null)
                message.hash = String(object.hash);
            if (object.image != null)
                message.image = String(object.image);
            if (object.pageLoadTime != null)
                message.pageLoadTime = String(object.pageLoadTime);
            if (object.keyId != null)
                message.keyId = String(object.keyId);
            if (object.test != null)
                message.test = Boolean(object.test);
            if (object.issueType != null)
                message.issueType = String(object.issueType);
            if (object.notes != null)
                message.notes = String(object.notes);
            return message;
        };

        /**
         * Creates a plain object from a CustomerCaptureRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.CustomerCaptureRequest
         * @static
         * @param {BI.CustomerCaptureRequest} message CustomerCaptureRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CustomerCaptureRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.pageUrl = "";
                object.tree = "";
                object.hash = "";
                object.image = "";
                object.pageLoadTime = "";
                object.keyId = "";
                object.test = false;
                object.issueType = "";
                object.notes = "";
            }
            if (message.pageUrl != null && Object.hasOwnProperty.call(message, "pageUrl"))
                object.pageUrl = message.pageUrl;
            if (message.tree != null && Object.hasOwnProperty.call(message, "tree"))
                object.tree = message.tree;
            if (message.hash != null && Object.hasOwnProperty.call(message, "hash"))
                object.hash = message.hash;
            if (message.image != null && Object.hasOwnProperty.call(message, "image"))
                object.image = message.image;
            if (message.pageLoadTime != null && Object.hasOwnProperty.call(message, "pageLoadTime"))
                object.pageLoadTime = message.pageLoadTime;
            if (message.keyId != null && Object.hasOwnProperty.call(message, "keyId"))
                object.keyId = message.keyId;
            if (message.test != null && Object.hasOwnProperty.call(message, "test"))
                object.test = message.test;
            if (message.issueType != null && Object.hasOwnProperty.call(message, "issueType"))
                object.issueType = message.issueType;
            if (message.notes != null && Object.hasOwnProperty.call(message, "notes"))
                object.notes = message.notes;
            return object;
        };

        /**
         * Converts this CustomerCaptureRequest to JSON.
         * @function toJSON
         * @memberof BI.CustomerCaptureRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CustomerCaptureRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CustomerCaptureRequest
         * @function getTypeUrl
         * @memberof BI.CustomerCaptureRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CustomerCaptureRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.CustomerCaptureRequest";
        };

        return CustomerCaptureRequest;
    })();

    BI.CustomerCaptureResponse = (function() {

        /**
         * Properties of a CustomerCaptureResponse.
         * @memberof BI
         * @interface ICustomerCaptureResponse
         */

        /**
         * Constructs a new CustomerCaptureResponse.
         * @memberof BI
         * @classdesc Represents a CustomerCaptureResponse.
         * @implements ICustomerCaptureResponse
         * @constructor
         * @param {BI.ICustomerCaptureResponse=} [properties] Properties to set
         */
        function CustomerCaptureResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new CustomerCaptureResponse instance using the specified properties.
         * @function create
         * @memberof BI.CustomerCaptureResponse
         * @static
         * @param {BI.ICustomerCaptureResponse=} [properties] Properties to set
         * @returns {BI.CustomerCaptureResponse} CustomerCaptureResponse instance
         */
        CustomerCaptureResponse.create = function create(properties) {
            return new CustomerCaptureResponse(properties);
        };

        /**
         * Encodes the specified CustomerCaptureResponse message. Does not implicitly {@link BI.CustomerCaptureResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.CustomerCaptureResponse
         * @static
         * @param {BI.ICustomerCaptureResponse} message CustomerCaptureResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CustomerCaptureResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a CustomerCaptureResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.CustomerCaptureResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.CustomerCaptureResponse} CustomerCaptureResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CustomerCaptureResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.CustomerCaptureResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a CustomerCaptureResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.CustomerCaptureResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.CustomerCaptureResponse} CustomerCaptureResponse
         */
        CustomerCaptureResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.CustomerCaptureResponse)
                return object;
            return new $root.BI.CustomerCaptureResponse();
        };

        /**
         * Creates a plain object from a CustomerCaptureResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.CustomerCaptureResponse
         * @static
         * @param {BI.CustomerCaptureResponse} message CustomerCaptureResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CustomerCaptureResponse.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this CustomerCaptureResponse to JSON.
         * @function toJSON
         * @memberof BI.CustomerCaptureResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CustomerCaptureResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CustomerCaptureResponse
         * @function getTypeUrl
         * @memberof BI.CustomerCaptureResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CustomerCaptureResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.CustomerCaptureResponse";
        };

        return CustomerCaptureResponse;
    })();

    /**
     * PurchaseProductType enum.
     * @name BI.PurchaseProductType
     * @enum {number}
     * @property {number} upgradeToEnterprise=0 upgradeToEnterprise value
     * @property {number} addUsers=1 addUsers value
     * @property {number} addStorage=2 addStorage value
     * @property {number} addAudit=3 addAudit value
     * @property {number} addBreachWatch=4 addBreachWatch value
     * @property {number} addCompliance=5 addCompliance value
     * @property {number} addChat=6 addChat value
     * @property {number} addPAM=7 addPAM value
     * @property {number} addSilverSupport=8 addSilverSupport value
     * @property {number} addPlatinumSupport=9 addPlatinumSupport value
     * @property {number} addKEPM=10 addKEPM value
     * @property {number} addNhi=11 addNhi value
     */
    BI.PurchaseProductType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "upgradeToEnterprise"] = 0;
        values[valuesById[1] = "addUsers"] = 1;
        values[valuesById[2] = "addStorage"] = 2;
        values[valuesById[3] = "addAudit"] = 3;
        values[valuesById[4] = "addBreachWatch"] = 4;
        values[valuesById[5] = "addCompliance"] = 5;
        values[valuesById[6] = "addChat"] = 6;
        values[valuesById[7] = "addPAM"] = 7;
        values[valuesById[8] = "addSilverSupport"] = 8;
        values[valuesById[9] = "addPlatinumSupport"] = 9;
        values[valuesById[10] = "addKEPM"] = 10;
        values[valuesById[11] = "addNhi"] = 11;
        return values;
    })();

    BI.Error = (function() {

        /**
         * Properties of an Error.
         * @memberof BI
         * @interface IError
         * @property {string|null} [code] Error code
         * @property {string|null} [message] Error message
         * @property {Object.<string,string>|null} [extras] Error extras
         */

        /**
         * Constructs a new Error.
         * @memberof BI
         * @classdesc Represents an Error.
         * @implements IError
         * @constructor
         * @param {BI.IError=} [properties] Properties to set
         */
        function Error(properties) {
            this.extras = {};
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Error code.
         * @member {string} code
         * @memberof BI.Error
         * @instance
         */
        Error.prototype.code = "";

        /**
         * Error message.
         * @member {string} message
         * @memberof BI.Error
         * @instance
         */
        Error.prototype.message = "";

        /**
         * Error extras.
         * @member {Object.<string,string>} extras
         * @memberof BI.Error
         * @instance
         */
        Error.prototype.extras = $util.emptyObject;

        /**
         * Creates a new Error instance using the specified properties.
         * @function create
         * @memberof BI.Error
         * @static
         * @param {BI.IError=} [properties] Properties to set
         * @returns {BI.Error} Error instance
         */
        Error.create = function create(properties) {
            return new Error(properties);
        };

        /**
         * Encodes the specified Error message. Does not implicitly {@link BI.Error.verify|verify} messages.
         * @function encode
         * @memberof BI.Error
         * @static
         * @param {BI.IError} message Error message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Error.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.extras != null && Object.hasOwnProperty.call(message, "extras"))
                for (let keys = Object.keys(message.extras), i = 0; i < keys.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]).uint32(/* id 2, wireType 2 =*/18).string(message.extras[keys[i]]).ldelim();
            return writer;
        };

        /**
         * Decodes an Error message from the specified reader or buffer.
         * @function decode
         * @memberof BI.Error
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.Error} Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Error.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.Error(), key, value;
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.code = reader.string();
                        break;
                    }
                case 2: {
                        message.message = reader.string();
                        break;
                    }
                case 3: {
                        if (message.extras === $util.emptyObject)
                            message.extras = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = "";
                        value = "";
                        while (reader.pos < end2) {
                            let tag2 = reader.uint32();
                            switch (tag2 >>> 3) {
                            case 1:
                                key = reader.string();
                                break;
                            case 2:
                                value = reader.string();
                                break;
                            default:
                                reader.skipType(tag2 & 7, long);
                                break;
                            }
                        }
                        if (key === "__proto__")
                            $util.makeProp(message.extras, key);
                        message.extras[key] = value;
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
         * Creates an Error message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.Error
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.Error} Error
         */
        Error.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.Error)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.Error: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.Error();
            if (object.code != null)
                message.code = String(object.code);
            if (object.message != null)
                message.message = String(object.message);
            if (object.extras) {
                if (!$util.isObject(object.extras))
                    throw TypeError(".BI.Error.extras: object expected");
                message.extras = {};
                for (let keys = Object.keys(object.extras), i = 0; i < keys.length; ++i) {
                    if (keys[i] === "__proto__")
                        $util.makeProp(message.extras, keys[i]);
                    message.extras[keys[i]] = String(object.extras[keys[i]]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an Error message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.Error
         * @static
         * @param {BI.Error} message Error
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Error.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.objects || options.defaults)
                object.extras = {};
            if (options.defaults) {
                object.code = "";
                object.message = "";
            }
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                object.code = message.code;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            let keys2;
            if (message.extras && (keys2 = Object.keys(message.extras)).length) {
                object.extras = {};
                for (let j = 0; j < keys2.length; ++j) {
                    if (keys2[j] === "__proto__")
                        $util.makeProp(object.extras, keys2[j]);
                    object.extras[keys2[j]] = message.extras[keys2[j]];
                }
            }
            return object;
        };

        /**
         * Converts this Error to JSON.
         * @function toJSON
         * @memberof BI.Error
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Error.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Error
         * @function getTypeUrl
         * @memberof BI.Error
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Error.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.Error";
        };

        return Error;
    })();

    BI.QuotePurchase = (function() {

        /**
         * Properties of a QuotePurchase.
         * @memberof BI
         * @interface IQuotePurchase
         * @property {number|null} [quoteTotal] QuotePurchase quoteTotal
         * @property {boolean|null} [includedTax] QuotePurchase includedTax
         * @property {boolean|null} [includedOtherAddons] QuotePurchase includedOtherAddons
         * @property {number|null} [taxAmount] QuotePurchase taxAmount
         * @property {string|null} [taxLabel] QuotePurchase taxLabel
         * @property {string|null} [purchaseIdentifier] QuotePurchase purchaseIdentifier
         */

        /**
         * Constructs a new QuotePurchase.
         * @memberof BI
         * @classdesc Represents a QuotePurchase.
         * @implements IQuotePurchase
         * @constructor
         * @param {BI.IQuotePurchase=} [properties] Properties to set
         */
        function QuotePurchase(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QuotePurchase quoteTotal.
         * @member {number} quoteTotal
         * @memberof BI.QuotePurchase
         * @instance
         */
        QuotePurchase.prototype.quoteTotal = 0;

        /**
         * QuotePurchase includedTax.
         * @member {boolean} includedTax
         * @memberof BI.QuotePurchase
         * @instance
         */
        QuotePurchase.prototype.includedTax = false;

        /**
         * QuotePurchase includedOtherAddons.
         * @member {boolean} includedOtherAddons
         * @memberof BI.QuotePurchase
         * @instance
         */
        QuotePurchase.prototype.includedOtherAddons = false;

        /**
         * QuotePurchase taxAmount.
         * @member {number} taxAmount
         * @memberof BI.QuotePurchase
         * @instance
         */
        QuotePurchase.prototype.taxAmount = 0;

        /**
         * QuotePurchase taxLabel.
         * @member {string} taxLabel
         * @memberof BI.QuotePurchase
         * @instance
         */
        QuotePurchase.prototype.taxLabel = "";

        /**
         * QuotePurchase purchaseIdentifier.
         * @member {string} purchaseIdentifier
         * @memberof BI.QuotePurchase
         * @instance
         */
        QuotePurchase.prototype.purchaseIdentifier = "";

        /**
         * Creates a new QuotePurchase instance using the specified properties.
         * @function create
         * @memberof BI.QuotePurchase
         * @static
         * @param {BI.IQuotePurchase=} [properties] Properties to set
         * @returns {BI.QuotePurchase} QuotePurchase instance
         */
        QuotePurchase.create = function create(properties) {
            return new QuotePurchase(properties);
        };

        /**
         * Encodes the specified QuotePurchase message. Does not implicitly {@link BI.QuotePurchase.verify|verify} messages.
         * @function encode
         * @memberof BI.QuotePurchase
         * @static
         * @param {BI.IQuotePurchase} message QuotePurchase message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuotePurchase.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.quoteTotal != null && Object.hasOwnProperty.call(message, "quoteTotal"))
                writer.uint32(/* id 1, wireType 1 =*/9).double(message.quoteTotal);
            if (message.includedTax != null && Object.hasOwnProperty.call(message, "includedTax"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.includedTax);
            if (message.includedOtherAddons != null && Object.hasOwnProperty.call(message, "includedOtherAddons"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.includedOtherAddons);
            if (message.taxAmount != null && Object.hasOwnProperty.call(message, "taxAmount"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.taxAmount);
            if (message.taxLabel != null && Object.hasOwnProperty.call(message, "taxLabel"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.taxLabel);
            if (message.purchaseIdentifier != null && Object.hasOwnProperty.call(message, "purchaseIdentifier"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.purchaseIdentifier);
            return writer;
        };

        /**
         * Decodes a QuotePurchase message from the specified reader or buffer.
         * @function decode
         * @memberof BI.QuotePurchase
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.QuotePurchase} QuotePurchase
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuotePurchase.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.QuotePurchase();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.quoteTotal = reader.double();
                        break;
                    }
                case 2: {
                        message.includedTax = reader.bool();
                        break;
                    }
                case 3: {
                        message.includedOtherAddons = reader.bool();
                        break;
                    }
                case 4: {
                        message.taxAmount = reader.double();
                        break;
                    }
                case 5: {
                        message.taxLabel = reader.string();
                        break;
                    }
                case 6: {
                        message.purchaseIdentifier = reader.string();
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
         * Creates a QuotePurchase message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.QuotePurchase
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.QuotePurchase} QuotePurchase
         */
        QuotePurchase.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.QuotePurchase)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.QuotePurchase: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.QuotePurchase();
            if (object.quoteTotal != null)
                message.quoteTotal = Number(object.quoteTotal);
            if (object.includedTax != null)
                message.includedTax = Boolean(object.includedTax);
            if (object.includedOtherAddons != null)
                message.includedOtherAddons = Boolean(object.includedOtherAddons);
            if (object.taxAmount != null)
                message.taxAmount = Number(object.taxAmount);
            if (object.taxLabel != null)
                message.taxLabel = String(object.taxLabel);
            if (object.purchaseIdentifier != null)
                message.purchaseIdentifier = String(object.purchaseIdentifier);
            return message;
        };

        /**
         * Creates a plain object from a QuotePurchase message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.QuotePurchase
         * @static
         * @param {BI.QuotePurchase} message QuotePurchase
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QuotePurchase.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.quoteTotal = 0;
                object.includedTax = false;
                object.includedOtherAddons = false;
                object.taxAmount = 0;
                object.taxLabel = "";
                object.purchaseIdentifier = "";
            }
            if (message.quoteTotal != null && Object.hasOwnProperty.call(message, "quoteTotal"))
                object.quoteTotal = options.json && !isFinite(message.quoteTotal) ? String(message.quoteTotal) : message.quoteTotal;
            if (message.includedTax != null && Object.hasOwnProperty.call(message, "includedTax"))
                object.includedTax = message.includedTax;
            if (message.includedOtherAddons != null && Object.hasOwnProperty.call(message, "includedOtherAddons"))
                object.includedOtherAddons = message.includedOtherAddons;
            if (message.taxAmount != null && Object.hasOwnProperty.call(message, "taxAmount"))
                object.taxAmount = options.json && !isFinite(message.taxAmount) ? String(message.taxAmount) : message.taxAmount;
            if (message.taxLabel != null && Object.hasOwnProperty.call(message, "taxLabel"))
                object.taxLabel = message.taxLabel;
            if (message.purchaseIdentifier != null && Object.hasOwnProperty.call(message, "purchaseIdentifier"))
                object.purchaseIdentifier = message.purchaseIdentifier;
            return object;
        };

        /**
         * Converts this QuotePurchase to JSON.
         * @function toJSON
         * @memberof BI.QuotePurchase
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QuotePurchase.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for QuotePurchase
         * @function getTypeUrl
         * @memberof BI.QuotePurchase
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        QuotePurchase.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.QuotePurchase";
        };

        return QuotePurchase;
    })();

    BI.PurchaseOptions = (function() {

        /**
         * Properties of a PurchaseOptions.
         * @memberof BI
         * @interface IPurchaseOptions
         * @property {boolean|null} [inConsole] PurchaseOptions inConsole
         * @property {boolean|null} [externalCheckout] PurchaseOptions externalCheckout
         */

        /**
         * Constructs a new PurchaseOptions.
         * @memberof BI
         * @classdesc Represents a PurchaseOptions.
         * @implements IPurchaseOptions
         * @constructor
         * @param {BI.IPurchaseOptions=} [properties] Properties to set
         */
        function PurchaseOptions(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PurchaseOptions inConsole.
         * @member {boolean|null|undefined} inConsole
         * @memberof BI.PurchaseOptions
         * @instance
         */
        PurchaseOptions.prototype.inConsole = null;

        /**
         * PurchaseOptions externalCheckout.
         * @member {boolean|null|undefined} externalCheckout
         * @memberof BI.PurchaseOptions
         * @instance
         */
        PurchaseOptions.prototype.externalCheckout = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PurchaseOptions.prototype, "_inConsole", {
            get: $util.oneOfGetter($oneOfFields = ["inConsole"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(PurchaseOptions.prototype, "_externalCheckout", {
            get: $util.oneOfGetter($oneOfFields = ["externalCheckout"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new PurchaseOptions instance using the specified properties.
         * @function create
         * @memberof BI.PurchaseOptions
         * @static
         * @param {BI.IPurchaseOptions=} [properties] Properties to set
         * @returns {BI.PurchaseOptions} PurchaseOptions instance
         */
        PurchaseOptions.create = function create(properties) {
            return new PurchaseOptions(properties);
        };

        /**
         * Encodes the specified PurchaseOptions message. Does not implicitly {@link BI.PurchaseOptions.verify|verify} messages.
         * @function encode
         * @memberof BI.PurchaseOptions
         * @static
         * @param {BI.IPurchaseOptions} message PurchaseOptions message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PurchaseOptions.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.inConsole != null && Object.hasOwnProperty.call(message, "inConsole"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.inConsole);
            if (message.externalCheckout != null && Object.hasOwnProperty.call(message, "externalCheckout"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.externalCheckout);
            return writer;
        };

        /**
         * Decodes a PurchaseOptions message from the specified reader or buffer.
         * @function decode
         * @memberof BI.PurchaseOptions
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.PurchaseOptions} PurchaseOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PurchaseOptions.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.PurchaseOptions();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.inConsole = reader.bool();
                        break;
                    }
                case 2: {
                        message.externalCheckout = reader.bool();
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
         * Creates a PurchaseOptions message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.PurchaseOptions
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.PurchaseOptions} PurchaseOptions
         */
        PurchaseOptions.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.PurchaseOptions)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.PurchaseOptions: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.PurchaseOptions();
            if (object.inConsole != null)
                message.inConsole = Boolean(object.inConsole);
            if (object.externalCheckout != null)
                message.externalCheckout = Boolean(object.externalCheckout);
            return message;
        };

        /**
         * Creates a plain object from a PurchaseOptions message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.PurchaseOptions
         * @static
         * @param {BI.PurchaseOptions} message PurchaseOptions
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PurchaseOptions.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (message.inConsole != null && Object.hasOwnProperty.call(message, "inConsole")) {
                object.inConsole = message.inConsole;
                if (options.oneofs)
                    object._inConsole = "inConsole";
            }
            if (message.externalCheckout != null && Object.hasOwnProperty.call(message, "externalCheckout")) {
                object.externalCheckout = message.externalCheckout;
                if (options.oneofs)
                    object._externalCheckout = "externalCheckout";
            }
            return object;
        };

        /**
         * Converts this PurchaseOptions to JSON.
         * @function toJSON
         * @memberof BI.PurchaseOptions
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PurchaseOptions.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PurchaseOptions
         * @function getTypeUrl
         * @memberof BI.PurchaseOptions
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PurchaseOptions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.PurchaseOptions";
        };

        return PurchaseOptions;
    })();

    BI.AddonPurchaseOptions = (function() {

        /**
         * Properties of an AddonPurchaseOptions.
         * @memberof BI
         * @interface IAddonPurchaseOptions
         * @property {BI.IPurchaseOptions|null} [storage] AddonPurchaseOptions storage
         * @property {BI.IPurchaseOptions|null} [audit] AddonPurchaseOptions audit
         * @property {BI.IPurchaseOptions|null} [breachwatch] AddonPurchaseOptions breachwatch
         * @property {BI.IPurchaseOptions|null} [chat] AddonPurchaseOptions chat
         * @property {BI.IPurchaseOptions|null} [compliance] AddonPurchaseOptions compliance
         * @property {BI.IPurchaseOptions|null} [professionalServicesSilver] AddonPurchaseOptions professionalServicesSilver
         * @property {BI.IPurchaseOptions|null} [professionalServicesPlatinum] AddonPurchaseOptions professionalServicesPlatinum
         * @property {BI.IPurchaseOptions|null} [pam] AddonPurchaseOptions pam
         * @property {BI.IPurchaseOptions|null} [epm] AddonPurchaseOptions epm
         * @property {BI.IPurchaseOptions|null} [secretsManager] AddonPurchaseOptions secretsManager
         * @property {BI.IPurchaseOptions|null} [connectionManager] AddonPurchaseOptions connectionManager
         * @property {BI.IPurchaseOptions|null} [remoteBrowserIsolation] AddonPurchaseOptions remoteBrowserIsolation
         * @property {BI.IPurchaseOptions|null} [nhiTier] AddonPurchaseOptions nhiTier
         */

        /**
         * Constructs a new AddonPurchaseOptions.
         * @memberof BI
         * @classdesc Represents an AddonPurchaseOptions.
         * @implements IAddonPurchaseOptions
         * @constructor
         * @param {BI.IAddonPurchaseOptions=} [properties] Properties to set
         */
        function AddonPurchaseOptions(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AddonPurchaseOptions storage.
         * @member {BI.IPurchaseOptions|null|undefined} storage
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.storage = null;

        /**
         * AddonPurchaseOptions audit.
         * @member {BI.IPurchaseOptions|null|undefined} audit
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.audit = null;

        /**
         * AddonPurchaseOptions breachwatch.
         * @member {BI.IPurchaseOptions|null|undefined} breachwatch
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.breachwatch = null;

        /**
         * AddonPurchaseOptions chat.
         * @member {BI.IPurchaseOptions|null|undefined} chat
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.chat = null;

        /**
         * AddonPurchaseOptions compliance.
         * @member {BI.IPurchaseOptions|null|undefined} compliance
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.compliance = null;

        /**
         * AddonPurchaseOptions professionalServicesSilver.
         * @member {BI.IPurchaseOptions|null|undefined} professionalServicesSilver
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.professionalServicesSilver = null;

        /**
         * AddonPurchaseOptions professionalServicesPlatinum.
         * @member {BI.IPurchaseOptions|null|undefined} professionalServicesPlatinum
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.professionalServicesPlatinum = null;

        /**
         * AddonPurchaseOptions pam.
         * @member {BI.IPurchaseOptions|null|undefined} pam
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.pam = null;

        /**
         * AddonPurchaseOptions epm.
         * @member {BI.IPurchaseOptions|null|undefined} epm
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.epm = null;

        /**
         * AddonPurchaseOptions secretsManager.
         * @member {BI.IPurchaseOptions|null|undefined} secretsManager
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.secretsManager = null;

        /**
         * AddonPurchaseOptions connectionManager.
         * @member {BI.IPurchaseOptions|null|undefined} connectionManager
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.connectionManager = null;

        /**
         * AddonPurchaseOptions remoteBrowserIsolation.
         * @member {BI.IPurchaseOptions|null|undefined} remoteBrowserIsolation
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.remoteBrowserIsolation = null;

        /**
         * AddonPurchaseOptions nhiTier.
         * @member {BI.IPurchaseOptions|null|undefined} nhiTier
         * @memberof BI.AddonPurchaseOptions
         * @instance
         */
        AddonPurchaseOptions.prototype.nhiTier = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_storage", {
            get: $util.oneOfGetter($oneOfFields = ["storage"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_audit", {
            get: $util.oneOfGetter($oneOfFields = ["audit"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_breachwatch", {
            get: $util.oneOfGetter($oneOfFields = ["breachwatch"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_chat", {
            get: $util.oneOfGetter($oneOfFields = ["chat"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_compliance", {
            get: $util.oneOfGetter($oneOfFields = ["compliance"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_professionalServicesSilver", {
            get: $util.oneOfGetter($oneOfFields = ["professionalServicesSilver"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_professionalServicesPlatinum", {
            get: $util.oneOfGetter($oneOfFields = ["professionalServicesPlatinum"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_pam", {
            get: $util.oneOfGetter($oneOfFields = ["pam"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_epm", {
            get: $util.oneOfGetter($oneOfFields = ["epm"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_secretsManager", {
            get: $util.oneOfGetter($oneOfFields = ["secretsManager"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_connectionManager", {
            get: $util.oneOfGetter($oneOfFields = ["connectionManager"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_remoteBrowserIsolation", {
            get: $util.oneOfGetter($oneOfFields = ["remoteBrowserIsolation"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(AddonPurchaseOptions.prototype, "_nhiTier", {
            get: $util.oneOfGetter($oneOfFields = ["nhiTier"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new AddonPurchaseOptions instance using the specified properties.
         * @function create
         * @memberof BI.AddonPurchaseOptions
         * @static
         * @param {BI.IAddonPurchaseOptions=} [properties] Properties to set
         * @returns {BI.AddonPurchaseOptions} AddonPurchaseOptions instance
         */
        AddonPurchaseOptions.create = function create(properties) {
            return new AddonPurchaseOptions(properties);
        };

        /**
         * Encodes the specified AddonPurchaseOptions message. Does not implicitly {@link BI.AddonPurchaseOptions.verify|verify} messages.
         * @function encode
         * @memberof BI.AddonPurchaseOptions
         * @static
         * @param {BI.IAddonPurchaseOptions} message AddonPurchaseOptions message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AddonPurchaseOptions.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.storage != null && Object.hasOwnProperty.call(message, "storage"))
                $root.BI.PurchaseOptions.encode(message.storage, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.audit != null && Object.hasOwnProperty.call(message, "audit"))
                $root.BI.PurchaseOptions.encode(message.audit, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.breachwatch != null && Object.hasOwnProperty.call(message, "breachwatch"))
                $root.BI.PurchaseOptions.encode(message.breachwatch, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.chat != null && Object.hasOwnProperty.call(message, "chat"))
                $root.BI.PurchaseOptions.encode(message.chat, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.compliance != null && Object.hasOwnProperty.call(message, "compliance"))
                $root.BI.PurchaseOptions.encode(message.compliance, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.professionalServicesSilver != null && Object.hasOwnProperty.call(message, "professionalServicesSilver"))
                $root.BI.PurchaseOptions.encode(message.professionalServicesSilver, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.professionalServicesPlatinum != null && Object.hasOwnProperty.call(message, "professionalServicesPlatinum"))
                $root.BI.PurchaseOptions.encode(message.professionalServicesPlatinum, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            if (message.pam != null && Object.hasOwnProperty.call(message, "pam"))
                $root.BI.PurchaseOptions.encode(message.pam, writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            if (message.epm != null && Object.hasOwnProperty.call(message, "epm"))
                $root.BI.PurchaseOptions.encode(message.epm, writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
            if (message.secretsManager != null && Object.hasOwnProperty.call(message, "secretsManager"))
                $root.BI.PurchaseOptions.encode(message.secretsManager, writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
            if (message.connectionManager != null && Object.hasOwnProperty.call(message, "connectionManager"))
                $root.BI.PurchaseOptions.encode(message.connectionManager, writer.uint32(/* id 11, wireType 2 =*/90).fork(), q + 1).ldelim();
            if (message.remoteBrowserIsolation != null && Object.hasOwnProperty.call(message, "remoteBrowserIsolation"))
                $root.BI.PurchaseOptions.encode(message.remoteBrowserIsolation, writer.uint32(/* id 12, wireType 2 =*/98).fork(), q + 1).ldelim();
            if (message.nhiTier != null && Object.hasOwnProperty.call(message, "nhiTier"))
                $root.BI.PurchaseOptions.encode(message.nhiTier, writer.uint32(/* id 13, wireType 2 =*/106).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an AddonPurchaseOptions message from the specified reader or buffer.
         * @function decode
         * @memberof BI.AddonPurchaseOptions
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.AddonPurchaseOptions} AddonPurchaseOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AddonPurchaseOptions.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.AddonPurchaseOptions();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.storage = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        message.audit = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.breachwatch = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.chat = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 5: {
                        message.compliance = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 6: {
                        message.professionalServicesSilver = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 7: {
                        message.professionalServicesPlatinum = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 8: {
                        message.pam = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 9: {
                        message.epm = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 10: {
                        message.secretsManager = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 11: {
                        message.connectionManager = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 12: {
                        message.remoteBrowserIsolation = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 13: {
                        message.nhiTier = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates an AddonPurchaseOptions message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.AddonPurchaseOptions
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.AddonPurchaseOptions} AddonPurchaseOptions
         */
        AddonPurchaseOptions.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.AddonPurchaseOptions)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.AddonPurchaseOptions: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.AddonPurchaseOptions();
            if (object.storage != null) {
                if (!$util.isObject(object.storage))
                    throw TypeError(".BI.AddonPurchaseOptions.storage: object expected");
                message.storage = $root.BI.PurchaseOptions.fromObject(object.storage, long + 1);
            }
            if (object.audit != null) {
                if (!$util.isObject(object.audit))
                    throw TypeError(".BI.AddonPurchaseOptions.audit: object expected");
                message.audit = $root.BI.PurchaseOptions.fromObject(object.audit, long + 1);
            }
            if (object.breachwatch != null) {
                if (!$util.isObject(object.breachwatch))
                    throw TypeError(".BI.AddonPurchaseOptions.breachwatch: object expected");
                message.breachwatch = $root.BI.PurchaseOptions.fromObject(object.breachwatch, long + 1);
            }
            if (object.chat != null) {
                if (!$util.isObject(object.chat))
                    throw TypeError(".BI.AddonPurchaseOptions.chat: object expected");
                message.chat = $root.BI.PurchaseOptions.fromObject(object.chat, long + 1);
            }
            if (object.compliance != null) {
                if (!$util.isObject(object.compliance))
                    throw TypeError(".BI.AddonPurchaseOptions.compliance: object expected");
                message.compliance = $root.BI.PurchaseOptions.fromObject(object.compliance, long + 1);
            }
            if (object.professionalServicesSilver != null) {
                if (!$util.isObject(object.professionalServicesSilver))
                    throw TypeError(".BI.AddonPurchaseOptions.professionalServicesSilver: object expected");
                message.professionalServicesSilver = $root.BI.PurchaseOptions.fromObject(object.professionalServicesSilver, long + 1);
            }
            if (object.professionalServicesPlatinum != null) {
                if (!$util.isObject(object.professionalServicesPlatinum))
                    throw TypeError(".BI.AddonPurchaseOptions.professionalServicesPlatinum: object expected");
                message.professionalServicesPlatinum = $root.BI.PurchaseOptions.fromObject(object.professionalServicesPlatinum, long + 1);
            }
            if (object.pam != null) {
                if (!$util.isObject(object.pam))
                    throw TypeError(".BI.AddonPurchaseOptions.pam: object expected");
                message.pam = $root.BI.PurchaseOptions.fromObject(object.pam, long + 1);
            }
            if (object.epm != null) {
                if (!$util.isObject(object.epm))
                    throw TypeError(".BI.AddonPurchaseOptions.epm: object expected");
                message.epm = $root.BI.PurchaseOptions.fromObject(object.epm, long + 1);
            }
            if (object.secretsManager != null) {
                if (!$util.isObject(object.secretsManager))
                    throw TypeError(".BI.AddonPurchaseOptions.secretsManager: object expected");
                message.secretsManager = $root.BI.PurchaseOptions.fromObject(object.secretsManager, long + 1);
            }
            if (object.connectionManager != null) {
                if (!$util.isObject(object.connectionManager))
                    throw TypeError(".BI.AddonPurchaseOptions.connectionManager: object expected");
                message.connectionManager = $root.BI.PurchaseOptions.fromObject(object.connectionManager, long + 1);
            }
            if (object.remoteBrowserIsolation != null) {
                if (!$util.isObject(object.remoteBrowserIsolation))
                    throw TypeError(".BI.AddonPurchaseOptions.remoteBrowserIsolation: object expected");
                message.remoteBrowserIsolation = $root.BI.PurchaseOptions.fromObject(object.remoteBrowserIsolation, long + 1);
            }
            if (object.nhiTier != null) {
                if (!$util.isObject(object.nhiTier))
                    throw TypeError(".BI.AddonPurchaseOptions.nhiTier: object expected");
                message.nhiTier = $root.BI.PurchaseOptions.fromObject(object.nhiTier, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AddonPurchaseOptions message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.AddonPurchaseOptions
         * @static
         * @param {BI.AddonPurchaseOptions} message AddonPurchaseOptions
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AddonPurchaseOptions.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (message.storage != null && Object.hasOwnProperty.call(message, "storage")) {
                object.storage = $root.BI.PurchaseOptions.toObject(message.storage, options, q + 1);
                if (options.oneofs)
                    object._storage = "storage";
            }
            if (message.audit != null && Object.hasOwnProperty.call(message, "audit")) {
                object.audit = $root.BI.PurchaseOptions.toObject(message.audit, options, q + 1);
                if (options.oneofs)
                    object._audit = "audit";
            }
            if (message.breachwatch != null && Object.hasOwnProperty.call(message, "breachwatch")) {
                object.breachwatch = $root.BI.PurchaseOptions.toObject(message.breachwatch, options, q + 1);
                if (options.oneofs)
                    object._breachwatch = "breachwatch";
            }
            if (message.chat != null && Object.hasOwnProperty.call(message, "chat")) {
                object.chat = $root.BI.PurchaseOptions.toObject(message.chat, options, q + 1);
                if (options.oneofs)
                    object._chat = "chat";
            }
            if (message.compliance != null && Object.hasOwnProperty.call(message, "compliance")) {
                object.compliance = $root.BI.PurchaseOptions.toObject(message.compliance, options, q + 1);
                if (options.oneofs)
                    object._compliance = "compliance";
            }
            if (message.professionalServicesSilver != null && Object.hasOwnProperty.call(message, "professionalServicesSilver")) {
                object.professionalServicesSilver = $root.BI.PurchaseOptions.toObject(message.professionalServicesSilver, options, q + 1);
                if (options.oneofs)
                    object._professionalServicesSilver = "professionalServicesSilver";
            }
            if (message.professionalServicesPlatinum != null && Object.hasOwnProperty.call(message, "professionalServicesPlatinum")) {
                object.professionalServicesPlatinum = $root.BI.PurchaseOptions.toObject(message.professionalServicesPlatinum, options, q + 1);
                if (options.oneofs)
                    object._professionalServicesPlatinum = "professionalServicesPlatinum";
            }
            if (message.pam != null && Object.hasOwnProperty.call(message, "pam")) {
                object.pam = $root.BI.PurchaseOptions.toObject(message.pam, options, q + 1);
                if (options.oneofs)
                    object._pam = "pam";
            }
            if (message.epm != null && Object.hasOwnProperty.call(message, "epm")) {
                object.epm = $root.BI.PurchaseOptions.toObject(message.epm, options, q + 1);
                if (options.oneofs)
                    object._epm = "epm";
            }
            if (message.secretsManager != null && Object.hasOwnProperty.call(message, "secretsManager")) {
                object.secretsManager = $root.BI.PurchaseOptions.toObject(message.secretsManager, options, q + 1);
                if (options.oneofs)
                    object._secretsManager = "secretsManager";
            }
            if (message.connectionManager != null && Object.hasOwnProperty.call(message, "connectionManager")) {
                object.connectionManager = $root.BI.PurchaseOptions.toObject(message.connectionManager, options, q + 1);
                if (options.oneofs)
                    object._connectionManager = "connectionManager";
            }
            if (message.remoteBrowserIsolation != null && Object.hasOwnProperty.call(message, "remoteBrowserIsolation")) {
                object.remoteBrowserIsolation = $root.BI.PurchaseOptions.toObject(message.remoteBrowserIsolation, options, q + 1);
                if (options.oneofs)
                    object._remoteBrowserIsolation = "remoteBrowserIsolation";
            }
            if (message.nhiTier != null && Object.hasOwnProperty.call(message, "nhiTier")) {
                object.nhiTier = $root.BI.PurchaseOptions.toObject(message.nhiTier, options, q + 1);
                if (options.oneofs)
                    object._nhiTier = "nhiTier";
            }
            return object;
        };

        /**
         * Converts this AddonPurchaseOptions to JSON.
         * @function toJSON
         * @memberof BI.AddonPurchaseOptions
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AddonPurchaseOptions.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AddonPurchaseOptions
         * @function getTypeUrl
         * @memberof BI.AddonPurchaseOptions
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AddonPurchaseOptions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.AddonPurchaseOptions";
        };

        return AddonPurchaseOptions;
    })();

    BI.AvailablePurchaseOptions = (function() {

        /**
         * Properties of an AvailablePurchaseOptions.
         * @memberof BI
         * @interface IAvailablePurchaseOptions
         * @property {BI.IPurchaseOptions|null} [basePlan] AvailablePurchaseOptions basePlan
         * @property {BI.IPurchaseOptions|null} [users] AvailablePurchaseOptions users
         * @property {BI.IAddonPurchaseOptions|null} [addons] AvailablePurchaseOptions addons
         */

        /**
         * Constructs a new AvailablePurchaseOptions.
         * @memberof BI
         * @classdesc Represents an AvailablePurchaseOptions.
         * @implements IAvailablePurchaseOptions
         * @constructor
         * @param {BI.IAvailablePurchaseOptions=} [properties] Properties to set
         */
        function AvailablePurchaseOptions(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AvailablePurchaseOptions basePlan.
         * @member {BI.IPurchaseOptions|null|undefined} basePlan
         * @memberof BI.AvailablePurchaseOptions
         * @instance
         */
        AvailablePurchaseOptions.prototype.basePlan = null;

        /**
         * AvailablePurchaseOptions users.
         * @member {BI.IPurchaseOptions|null|undefined} users
         * @memberof BI.AvailablePurchaseOptions
         * @instance
         */
        AvailablePurchaseOptions.prototype.users = null;

        /**
         * AvailablePurchaseOptions addons.
         * @member {BI.IAddonPurchaseOptions|null|undefined} addons
         * @memberof BI.AvailablePurchaseOptions
         * @instance
         */
        AvailablePurchaseOptions.prototype.addons = null;

        /**
         * Creates a new AvailablePurchaseOptions instance using the specified properties.
         * @function create
         * @memberof BI.AvailablePurchaseOptions
         * @static
         * @param {BI.IAvailablePurchaseOptions=} [properties] Properties to set
         * @returns {BI.AvailablePurchaseOptions} AvailablePurchaseOptions instance
         */
        AvailablePurchaseOptions.create = function create(properties) {
            return new AvailablePurchaseOptions(properties);
        };

        /**
         * Encodes the specified AvailablePurchaseOptions message. Does not implicitly {@link BI.AvailablePurchaseOptions.verify|verify} messages.
         * @function encode
         * @memberof BI.AvailablePurchaseOptions
         * @static
         * @param {BI.IAvailablePurchaseOptions} message AvailablePurchaseOptions message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AvailablePurchaseOptions.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.basePlan != null && Object.hasOwnProperty.call(message, "basePlan"))
                $root.BI.PurchaseOptions.encode(message.basePlan, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.users != null && Object.hasOwnProperty.call(message, "users"))
                $root.BI.PurchaseOptions.encode(message.users, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.addons != null && Object.hasOwnProperty.call(message, "addons"))
                $root.BI.AddonPurchaseOptions.encode(message.addons, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an AvailablePurchaseOptions message from the specified reader or buffer.
         * @function decode
         * @memberof BI.AvailablePurchaseOptions
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.AvailablePurchaseOptions} AvailablePurchaseOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AvailablePurchaseOptions.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.AvailablePurchaseOptions();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.basePlan = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        message.users = $root.BI.PurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.addons = $root.BI.AddonPurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates an AvailablePurchaseOptions message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.AvailablePurchaseOptions
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.AvailablePurchaseOptions} AvailablePurchaseOptions
         */
        AvailablePurchaseOptions.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.AvailablePurchaseOptions)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.AvailablePurchaseOptions: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.AvailablePurchaseOptions();
            if (object.basePlan != null) {
                if (!$util.isObject(object.basePlan))
                    throw TypeError(".BI.AvailablePurchaseOptions.basePlan: object expected");
                message.basePlan = $root.BI.PurchaseOptions.fromObject(object.basePlan, long + 1);
            }
            if (object.users != null) {
                if (!$util.isObject(object.users))
                    throw TypeError(".BI.AvailablePurchaseOptions.users: object expected");
                message.users = $root.BI.PurchaseOptions.fromObject(object.users, long + 1);
            }
            if (object.addons != null) {
                if (!$util.isObject(object.addons))
                    throw TypeError(".BI.AvailablePurchaseOptions.addons: object expected");
                message.addons = $root.BI.AddonPurchaseOptions.fromObject(object.addons, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AvailablePurchaseOptions message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.AvailablePurchaseOptions
         * @static
         * @param {BI.AvailablePurchaseOptions} message AvailablePurchaseOptions
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AvailablePurchaseOptions.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.basePlan = null;
                object.users = null;
                object.addons = null;
            }
            if (message.basePlan != null && Object.hasOwnProperty.call(message, "basePlan"))
                object.basePlan = $root.BI.PurchaseOptions.toObject(message.basePlan, options, q + 1);
            if (message.users != null && Object.hasOwnProperty.call(message, "users"))
                object.users = $root.BI.PurchaseOptions.toObject(message.users, options, q + 1);
            if (message.addons != null && Object.hasOwnProperty.call(message, "addons"))
                object.addons = $root.BI.AddonPurchaseOptions.toObject(message.addons, options, q + 1);
            return object;
        };

        /**
         * Converts this AvailablePurchaseOptions to JSON.
         * @function toJSON
         * @memberof BI.AvailablePurchaseOptions
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AvailablePurchaseOptions.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AvailablePurchaseOptions
         * @function getTypeUrl
         * @memberof BI.AvailablePurchaseOptions
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AvailablePurchaseOptions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.AvailablePurchaseOptions";
        };

        return AvailablePurchaseOptions;
    })();

    BI.UpgradeLicenseStatusRequest = (function() {

        /**
         * Properties of an UpgradeLicenseStatusRequest.
         * @memberof BI
         * @interface IUpgradeLicenseStatusRequest
         */

        /**
         * Constructs a new UpgradeLicenseStatusRequest.
         * @memberof BI
         * @classdesc Represents an UpgradeLicenseStatusRequest.
         * @implements IUpgradeLicenseStatusRequest
         * @constructor
         * @param {BI.IUpgradeLicenseStatusRequest=} [properties] Properties to set
         */
        function UpgradeLicenseStatusRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new UpgradeLicenseStatusRequest instance using the specified properties.
         * @function create
         * @memberof BI.UpgradeLicenseStatusRequest
         * @static
         * @param {BI.IUpgradeLicenseStatusRequest=} [properties] Properties to set
         * @returns {BI.UpgradeLicenseStatusRequest} UpgradeLicenseStatusRequest instance
         */
        UpgradeLicenseStatusRequest.create = function create(properties) {
            return new UpgradeLicenseStatusRequest(properties);
        };

        /**
         * Encodes the specified UpgradeLicenseStatusRequest message. Does not implicitly {@link BI.UpgradeLicenseStatusRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.UpgradeLicenseStatusRequest
         * @static
         * @param {BI.IUpgradeLicenseStatusRequest} message UpgradeLicenseStatusRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpgradeLicenseStatusRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes an UpgradeLicenseStatusRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.UpgradeLicenseStatusRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.UpgradeLicenseStatusRequest} UpgradeLicenseStatusRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpgradeLicenseStatusRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.UpgradeLicenseStatusRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates an UpgradeLicenseStatusRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.UpgradeLicenseStatusRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.UpgradeLicenseStatusRequest} UpgradeLicenseStatusRequest
         */
        UpgradeLicenseStatusRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.UpgradeLicenseStatusRequest)
                return object;
            return new $root.BI.UpgradeLicenseStatusRequest();
        };

        /**
         * Creates a plain object from an UpgradeLicenseStatusRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.UpgradeLicenseStatusRequest
         * @static
         * @param {BI.UpgradeLicenseStatusRequest} message UpgradeLicenseStatusRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpgradeLicenseStatusRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this UpgradeLicenseStatusRequest to JSON.
         * @function toJSON
         * @memberof BI.UpgradeLicenseStatusRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpgradeLicenseStatusRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpgradeLicenseStatusRequest
         * @function getTypeUrl
         * @memberof BI.UpgradeLicenseStatusRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpgradeLicenseStatusRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.UpgradeLicenseStatusRequest";
        };

        return UpgradeLicenseStatusRequest;
    })();

    BI.UpgradeLicenseStatusResponse = (function() {

        /**
         * Properties of an UpgradeLicenseStatusResponse.
         * @memberof BI
         * @interface IUpgradeLicenseStatusResponse
         * @property {boolean|null} [allowPurchaseFromConsole] UpgradeLicenseStatusResponse allowPurchaseFromConsole
         * @property {BI.IAvailablePurchaseOptions|null} [purchaseOptions] UpgradeLicenseStatusResponse purchaseOptions
         * @property {BI.IError|null} [error] UpgradeLicenseStatusResponse error
         */

        /**
         * Constructs a new UpgradeLicenseStatusResponse.
         * @memberof BI
         * @classdesc Represents an UpgradeLicenseStatusResponse.
         * @implements IUpgradeLicenseStatusResponse
         * @constructor
         * @param {BI.IUpgradeLicenseStatusResponse=} [properties] Properties to set
         */
        function UpgradeLicenseStatusResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpgradeLicenseStatusResponse allowPurchaseFromConsole.
         * @member {boolean} allowPurchaseFromConsole
         * @memberof BI.UpgradeLicenseStatusResponse
         * @instance
         */
        UpgradeLicenseStatusResponse.prototype.allowPurchaseFromConsole = false;

        /**
         * UpgradeLicenseStatusResponse purchaseOptions.
         * @member {BI.IAvailablePurchaseOptions|null|undefined} purchaseOptions
         * @memberof BI.UpgradeLicenseStatusResponse
         * @instance
         */
        UpgradeLicenseStatusResponse.prototype.purchaseOptions = null;

        /**
         * UpgradeLicenseStatusResponse error.
         * @member {BI.IError|null|undefined} error
         * @memberof BI.UpgradeLicenseStatusResponse
         * @instance
         */
        UpgradeLicenseStatusResponse.prototype.error = null;

        /**
         * Creates a new UpgradeLicenseStatusResponse instance using the specified properties.
         * @function create
         * @memberof BI.UpgradeLicenseStatusResponse
         * @static
         * @param {BI.IUpgradeLicenseStatusResponse=} [properties] Properties to set
         * @returns {BI.UpgradeLicenseStatusResponse} UpgradeLicenseStatusResponse instance
         */
        UpgradeLicenseStatusResponse.create = function create(properties) {
            return new UpgradeLicenseStatusResponse(properties);
        };

        /**
         * Encodes the specified UpgradeLicenseStatusResponse message. Does not implicitly {@link BI.UpgradeLicenseStatusResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.UpgradeLicenseStatusResponse
         * @static
         * @param {BI.IUpgradeLicenseStatusResponse} message UpgradeLicenseStatusResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpgradeLicenseStatusResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.allowPurchaseFromConsole != null && Object.hasOwnProperty.call(message, "allowPurchaseFromConsole"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.allowPurchaseFromConsole);
            if (message.purchaseOptions != null && Object.hasOwnProperty.call(message, "purchaseOptions"))
                $root.BI.AvailablePurchaseOptions.encode(message.purchaseOptions, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.BI.Error.encode(message.error, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an UpgradeLicenseStatusResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.UpgradeLicenseStatusResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.UpgradeLicenseStatusResponse} UpgradeLicenseStatusResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpgradeLicenseStatusResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.UpgradeLicenseStatusResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.allowPurchaseFromConsole = reader.bool();
                        break;
                    }
                case 2: {
                        message.purchaseOptions = $root.BI.AvailablePurchaseOptions.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.error = $root.BI.Error.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates an UpgradeLicenseStatusResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.UpgradeLicenseStatusResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.UpgradeLicenseStatusResponse} UpgradeLicenseStatusResponse
         */
        UpgradeLicenseStatusResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.UpgradeLicenseStatusResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.UpgradeLicenseStatusResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.UpgradeLicenseStatusResponse();
            if (object.allowPurchaseFromConsole != null)
                message.allowPurchaseFromConsole = Boolean(object.allowPurchaseFromConsole);
            if (object.purchaseOptions != null) {
                if (!$util.isObject(object.purchaseOptions))
                    throw TypeError(".BI.UpgradeLicenseStatusResponse.purchaseOptions: object expected");
                message.purchaseOptions = $root.BI.AvailablePurchaseOptions.fromObject(object.purchaseOptions, long + 1);
            }
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".BI.UpgradeLicenseStatusResponse.error: object expected");
                message.error = $root.BI.Error.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an UpgradeLicenseStatusResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.UpgradeLicenseStatusResponse
         * @static
         * @param {BI.UpgradeLicenseStatusResponse} message UpgradeLicenseStatusResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpgradeLicenseStatusResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.allowPurchaseFromConsole = false;
                object.purchaseOptions = null;
                object.error = null;
            }
            if (message.allowPurchaseFromConsole != null && Object.hasOwnProperty.call(message, "allowPurchaseFromConsole"))
                object.allowPurchaseFromConsole = message.allowPurchaseFromConsole;
            if (message.purchaseOptions != null && Object.hasOwnProperty.call(message, "purchaseOptions"))
                object.purchaseOptions = $root.BI.AvailablePurchaseOptions.toObject(message.purchaseOptions, options, q + 1);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.BI.Error.toObject(message.error, options, q + 1);
            return object;
        };

        /**
         * Converts this UpgradeLicenseStatusResponse to JSON.
         * @function toJSON
         * @memberof BI.UpgradeLicenseStatusResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpgradeLicenseStatusResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpgradeLicenseStatusResponse
         * @function getTypeUrl
         * @memberof BI.UpgradeLicenseStatusResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpgradeLicenseStatusResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.UpgradeLicenseStatusResponse";
        };

        return UpgradeLicenseStatusResponse;
    })();

    BI.UpgradeLicenseQuotePurchaseRequest = (function() {

        /**
         * Properties of an UpgradeLicenseQuotePurchaseRequest.
         * @memberof BI
         * @interface IUpgradeLicenseQuotePurchaseRequest
         * @property {BI.PurchaseProductType|null} [productType] UpgradeLicenseQuotePurchaseRequest productType
         * @property {number|null} [quantity] UpgradeLicenseQuotePurchaseRequest quantity
         * @property {number|null} [tier] UpgradeLicenseQuotePurchaseRequest tier
         */

        /**
         * Constructs a new UpgradeLicenseQuotePurchaseRequest.
         * @memberof BI
         * @classdesc Represents an UpgradeLicenseQuotePurchaseRequest.
         * @implements IUpgradeLicenseQuotePurchaseRequest
         * @constructor
         * @param {BI.IUpgradeLicenseQuotePurchaseRequest=} [properties] Properties to set
         */
        function UpgradeLicenseQuotePurchaseRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpgradeLicenseQuotePurchaseRequest productType.
         * @member {BI.PurchaseProductType} productType
         * @memberof BI.UpgradeLicenseQuotePurchaseRequest
         * @instance
         */
        UpgradeLicenseQuotePurchaseRequest.prototype.productType = 0;

        /**
         * UpgradeLicenseQuotePurchaseRequest quantity.
         * @member {number} quantity
         * @memberof BI.UpgradeLicenseQuotePurchaseRequest
         * @instance
         */
        UpgradeLicenseQuotePurchaseRequest.prototype.quantity = 0;

        /**
         * UpgradeLicenseQuotePurchaseRequest tier.
         * @member {number} tier
         * @memberof BI.UpgradeLicenseQuotePurchaseRequest
         * @instance
         */
        UpgradeLicenseQuotePurchaseRequest.prototype.tier = 0;

        /**
         * Creates a new UpgradeLicenseQuotePurchaseRequest instance using the specified properties.
         * @function create
         * @memberof BI.UpgradeLicenseQuotePurchaseRequest
         * @static
         * @param {BI.IUpgradeLicenseQuotePurchaseRequest=} [properties] Properties to set
         * @returns {BI.UpgradeLicenseQuotePurchaseRequest} UpgradeLicenseQuotePurchaseRequest instance
         */
        UpgradeLicenseQuotePurchaseRequest.create = function create(properties) {
            return new UpgradeLicenseQuotePurchaseRequest(properties);
        };

        /**
         * Encodes the specified UpgradeLicenseQuotePurchaseRequest message. Does not implicitly {@link BI.UpgradeLicenseQuotePurchaseRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.UpgradeLicenseQuotePurchaseRequest
         * @static
         * @param {BI.IUpgradeLicenseQuotePurchaseRequest} message UpgradeLicenseQuotePurchaseRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpgradeLicenseQuotePurchaseRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.productType != null && Object.hasOwnProperty.call(message, "productType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.productType);
            if (message.quantity != null && Object.hasOwnProperty.call(message, "quantity"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.quantity);
            if (message.tier != null && Object.hasOwnProperty.call(message, "tier"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.tier);
            return writer;
        };

        /**
         * Decodes an UpgradeLicenseQuotePurchaseRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.UpgradeLicenseQuotePurchaseRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.UpgradeLicenseQuotePurchaseRequest} UpgradeLicenseQuotePurchaseRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpgradeLicenseQuotePurchaseRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.UpgradeLicenseQuotePurchaseRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.productType = reader.int32();
                        break;
                    }
                case 2: {
                        message.quantity = reader.int32();
                        break;
                    }
                case 3: {
                        message.tier = reader.int32();
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
         * Creates an UpgradeLicenseQuotePurchaseRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.UpgradeLicenseQuotePurchaseRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.UpgradeLicenseQuotePurchaseRequest} UpgradeLicenseQuotePurchaseRequest
         */
        UpgradeLicenseQuotePurchaseRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.UpgradeLicenseQuotePurchaseRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.UpgradeLicenseQuotePurchaseRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.UpgradeLicenseQuotePurchaseRequest();
            switch (object.productType) {
            default:
                if (typeof object.productType === "number") {
                    message.productType = object.productType;
                    break;
                }
                break;
            case "upgradeToEnterprise":
            case 0:
                message.productType = 0;
                break;
            case "addUsers":
            case 1:
                message.productType = 1;
                break;
            case "addStorage":
            case 2:
                message.productType = 2;
                break;
            case "addAudit":
            case 3:
                message.productType = 3;
                break;
            case "addBreachWatch":
            case 4:
                message.productType = 4;
                break;
            case "addCompliance":
            case 5:
                message.productType = 5;
                break;
            case "addChat":
            case 6:
                message.productType = 6;
                break;
            case "addPAM":
            case 7:
                message.productType = 7;
                break;
            case "addSilverSupport":
            case 8:
                message.productType = 8;
                break;
            case "addPlatinumSupport":
            case 9:
                message.productType = 9;
                break;
            case "addKEPM":
            case 10:
                message.productType = 10;
                break;
            case "addNhi":
            case 11:
                message.productType = 11;
                break;
            }
            if (object.quantity != null)
                message.quantity = object.quantity | 0;
            if (object.tier != null)
                message.tier = object.tier | 0;
            return message;
        };

        /**
         * Creates a plain object from an UpgradeLicenseQuotePurchaseRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.UpgradeLicenseQuotePurchaseRequest
         * @static
         * @param {BI.UpgradeLicenseQuotePurchaseRequest} message UpgradeLicenseQuotePurchaseRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpgradeLicenseQuotePurchaseRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.productType = options.enums === String ? "upgradeToEnterprise" : 0;
                object.quantity = 0;
                object.tier = 0;
            }
            if (message.productType != null && Object.hasOwnProperty.call(message, "productType"))
                object.productType = options.enums === String ? $root.BI.PurchaseProductType[message.productType] === undefined ? message.productType : $root.BI.PurchaseProductType[message.productType] : message.productType;
            if (message.quantity != null && Object.hasOwnProperty.call(message, "quantity"))
                object.quantity = message.quantity;
            if (message.tier != null && Object.hasOwnProperty.call(message, "tier"))
                object.tier = message.tier;
            return object;
        };

        /**
         * Converts this UpgradeLicenseQuotePurchaseRequest to JSON.
         * @function toJSON
         * @memberof BI.UpgradeLicenseQuotePurchaseRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpgradeLicenseQuotePurchaseRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpgradeLicenseQuotePurchaseRequest
         * @function getTypeUrl
         * @memberof BI.UpgradeLicenseQuotePurchaseRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpgradeLicenseQuotePurchaseRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.UpgradeLicenseQuotePurchaseRequest";
        };

        return UpgradeLicenseQuotePurchaseRequest;
    })();

    BI.UpgradeLicenseQuotePurchaseResponse = (function() {

        /**
         * Properties of an UpgradeLicenseQuotePurchaseResponse.
         * @memberof BI
         * @interface IUpgradeLicenseQuotePurchaseResponse
         * @property {boolean|null} [success] UpgradeLicenseQuotePurchaseResponse success
         * @property {BI.IQuotePurchase|null} [quotePurchase] UpgradeLicenseQuotePurchaseResponse quotePurchase
         * @property {string|null} [viewSummaryLink] UpgradeLicenseQuotePurchaseResponse viewSummaryLink
         * @property {BI.IError|null} [error] UpgradeLicenseQuotePurchaseResponse error
         */

        /**
         * Constructs a new UpgradeLicenseQuotePurchaseResponse.
         * @memberof BI
         * @classdesc Represents an UpgradeLicenseQuotePurchaseResponse.
         * @implements IUpgradeLicenseQuotePurchaseResponse
         * @constructor
         * @param {BI.IUpgradeLicenseQuotePurchaseResponse=} [properties] Properties to set
         */
        function UpgradeLicenseQuotePurchaseResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpgradeLicenseQuotePurchaseResponse success.
         * @member {boolean} success
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @instance
         */
        UpgradeLicenseQuotePurchaseResponse.prototype.success = false;

        /**
         * UpgradeLicenseQuotePurchaseResponse quotePurchase.
         * @member {BI.IQuotePurchase|null|undefined} quotePurchase
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @instance
         */
        UpgradeLicenseQuotePurchaseResponse.prototype.quotePurchase = null;

        /**
         * UpgradeLicenseQuotePurchaseResponse viewSummaryLink.
         * @member {string} viewSummaryLink
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @instance
         */
        UpgradeLicenseQuotePurchaseResponse.prototype.viewSummaryLink = "";

        /**
         * UpgradeLicenseQuotePurchaseResponse error.
         * @member {BI.IError|null|undefined} error
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @instance
         */
        UpgradeLicenseQuotePurchaseResponse.prototype.error = null;

        /**
         * Creates a new UpgradeLicenseQuotePurchaseResponse instance using the specified properties.
         * @function create
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @static
         * @param {BI.IUpgradeLicenseQuotePurchaseResponse=} [properties] Properties to set
         * @returns {BI.UpgradeLicenseQuotePurchaseResponse} UpgradeLicenseQuotePurchaseResponse instance
         */
        UpgradeLicenseQuotePurchaseResponse.create = function create(properties) {
            return new UpgradeLicenseQuotePurchaseResponse(properties);
        };

        /**
         * Encodes the specified UpgradeLicenseQuotePurchaseResponse message. Does not implicitly {@link BI.UpgradeLicenseQuotePurchaseResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @static
         * @param {BI.IUpgradeLicenseQuotePurchaseResponse} message UpgradeLicenseQuotePurchaseResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpgradeLicenseQuotePurchaseResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            if (message.quotePurchase != null && Object.hasOwnProperty.call(message, "quotePurchase"))
                $root.BI.QuotePurchase.encode(message.quotePurchase, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.viewSummaryLink != null && Object.hasOwnProperty.call(message, "viewSummaryLink"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.viewSummaryLink);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.BI.Error.encode(message.error, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an UpgradeLicenseQuotePurchaseResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.UpgradeLicenseQuotePurchaseResponse} UpgradeLicenseQuotePurchaseResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpgradeLicenseQuotePurchaseResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.UpgradeLicenseQuotePurchaseResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.success = reader.bool();
                        break;
                    }
                case 2: {
                        message.quotePurchase = $root.BI.QuotePurchase.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.viewSummaryLink = reader.string();
                        break;
                    }
                case 4: {
                        message.error = $root.BI.Error.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates an UpgradeLicenseQuotePurchaseResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.UpgradeLicenseQuotePurchaseResponse} UpgradeLicenseQuotePurchaseResponse
         */
        UpgradeLicenseQuotePurchaseResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.UpgradeLicenseQuotePurchaseResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.UpgradeLicenseQuotePurchaseResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.UpgradeLicenseQuotePurchaseResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.quotePurchase != null) {
                if (!$util.isObject(object.quotePurchase))
                    throw TypeError(".BI.UpgradeLicenseQuotePurchaseResponse.quotePurchase: object expected");
                message.quotePurchase = $root.BI.QuotePurchase.fromObject(object.quotePurchase, long + 1);
            }
            if (object.viewSummaryLink != null)
                message.viewSummaryLink = String(object.viewSummaryLink);
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".BI.UpgradeLicenseQuotePurchaseResponse.error: object expected");
                message.error = $root.BI.Error.fromObject(object.error, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an UpgradeLicenseQuotePurchaseResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @static
         * @param {BI.UpgradeLicenseQuotePurchaseResponse} message UpgradeLicenseQuotePurchaseResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpgradeLicenseQuotePurchaseResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.success = false;
                object.quotePurchase = null;
                object.viewSummaryLink = "";
                object.error = null;
            }
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.quotePurchase != null && Object.hasOwnProperty.call(message, "quotePurchase"))
                object.quotePurchase = $root.BI.QuotePurchase.toObject(message.quotePurchase, options, q + 1);
            if (message.viewSummaryLink != null && Object.hasOwnProperty.call(message, "viewSummaryLink"))
                object.viewSummaryLink = message.viewSummaryLink;
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.BI.Error.toObject(message.error, options, q + 1);
            return object;
        };

        /**
         * Converts this UpgradeLicenseQuotePurchaseResponse to JSON.
         * @function toJSON
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpgradeLicenseQuotePurchaseResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpgradeLicenseQuotePurchaseResponse
         * @function getTypeUrl
         * @memberof BI.UpgradeLicenseQuotePurchaseResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpgradeLicenseQuotePurchaseResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.UpgradeLicenseQuotePurchaseResponse";
        };

        return UpgradeLicenseQuotePurchaseResponse;
    })();

    BI.UpgradeLicenseCompletePurchaseRequest = (function() {

        /**
         * Properties of an UpgradeLicenseCompletePurchaseRequest.
         * @memberof BI
         * @interface IUpgradeLicenseCompletePurchaseRequest
         * @property {BI.PurchaseProductType|null} [productType] UpgradeLicenseCompletePurchaseRequest productType
         * @property {number|null} [quantity] UpgradeLicenseCompletePurchaseRequest quantity
         * @property {BI.IQuotePurchase|null} [quotePurchase] UpgradeLicenseCompletePurchaseRequest quotePurchase
         * @property {number|null} [tier] UpgradeLicenseCompletePurchaseRequest tier
         */

        /**
         * Constructs a new UpgradeLicenseCompletePurchaseRequest.
         * @memberof BI
         * @classdesc Represents an UpgradeLicenseCompletePurchaseRequest.
         * @implements IUpgradeLicenseCompletePurchaseRequest
         * @constructor
         * @param {BI.IUpgradeLicenseCompletePurchaseRequest=} [properties] Properties to set
         */
        function UpgradeLicenseCompletePurchaseRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpgradeLicenseCompletePurchaseRequest productType.
         * @member {BI.PurchaseProductType} productType
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @instance
         */
        UpgradeLicenseCompletePurchaseRequest.prototype.productType = 0;

        /**
         * UpgradeLicenseCompletePurchaseRequest quantity.
         * @member {number} quantity
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @instance
         */
        UpgradeLicenseCompletePurchaseRequest.prototype.quantity = 0;

        /**
         * UpgradeLicenseCompletePurchaseRequest quotePurchase.
         * @member {BI.IQuotePurchase|null|undefined} quotePurchase
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @instance
         */
        UpgradeLicenseCompletePurchaseRequest.prototype.quotePurchase = null;

        /**
         * UpgradeLicenseCompletePurchaseRequest tier.
         * @member {number} tier
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @instance
         */
        UpgradeLicenseCompletePurchaseRequest.prototype.tier = 0;

        /**
         * Creates a new UpgradeLicenseCompletePurchaseRequest instance using the specified properties.
         * @function create
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @static
         * @param {BI.IUpgradeLicenseCompletePurchaseRequest=} [properties] Properties to set
         * @returns {BI.UpgradeLicenseCompletePurchaseRequest} UpgradeLicenseCompletePurchaseRequest instance
         */
        UpgradeLicenseCompletePurchaseRequest.create = function create(properties) {
            return new UpgradeLicenseCompletePurchaseRequest(properties);
        };

        /**
         * Encodes the specified UpgradeLicenseCompletePurchaseRequest message. Does not implicitly {@link BI.UpgradeLicenseCompletePurchaseRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @static
         * @param {BI.IUpgradeLicenseCompletePurchaseRequest} message UpgradeLicenseCompletePurchaseRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpgradeLicenseCompletePurchaseRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.productType != null && Object.hasOwnProperty.call(message, "productType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.productType);
            if (message.quantity != null && Object.hasOwnProperty.call(message, "quantity"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.quantity);
            if (message.quotePurchase != null && Object.hasOwnProperty.call(message, "quotePurchase"))
                $root.BI.QuotePurchase.encode(message.quotePurchase, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.tier != null && Object.hasOwnProperty.call(message, "tier"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.tier);
            return writer;
        };

        /**
         * Decodes an UpgradeLicenseCompletePurchaseRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.UpgradeLicenseCompletePurchaseRequest} UpgradeLicenseCompletePurchaseRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpgradeLicenseCompletePurchaseRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.UpgradeLicenseCompletePurchaseRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.productType = reader.int32();
                        break;
                    }
                case 2: {
                        message.quantity = reader.int32();
                        break;
                    }
                case 3: {
                        message.quotePurchase = $root.BI.QuotePurchase.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.tier = reader.int32();
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
         * Creates an UpgradeLicenseCompletePurchaseRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.UpgradeLicenseCompletePurchaseRequest} UpgradeLicenseCompletePurchaseRequest
         */
        UpgradeLicenseCompletePurchaseRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.UpgradeLicenseCompletePurchaseRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.UpgradeLicenseCompletePurchaseRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.UpgradeLicenseCompletePurchaseRequest();
            switch (object.productType) {
            default:
                if (typeof object.productType === "number") {
                    message.productType = object.productType;
                    break;
                }
                break;
            case "upgradeToEnterprise":
            case 0:
                message.productType = 0;
                break;
            case "addUsers":
            case 1:
                message.productType = 1;
                break;
            case "addStorage":
            case 2:
                message.productType = 2;
                break;
            case "addAudit":
            case 3:
                message.productType = 3;
                break;
            case "addBreachWatch":
            case 4:
                message.productType = 4;
                break;
            case "addCompliance":
            case 5:
                message.productType = 5;
                break;
            case "addChat":
            case 6:
                message.productType = 6;
                break;
            case "addPAM":
            case 7:
                message.productType = 7;
                break;
            case "addSilverSupport":
            case 8:
                message.productType = 8;
                break;
            case "addPlatinumSupport":
            case 9:
                message.productType = 9;
                break;
            case "addKEPM":
            case 10:
                message.productType = 10;
                break;
            case "addNhi":
            case 11:
                message.productType = 11;
                break;
            }
            if (object.quantity != null)
                message.quantity = object.quantity | 0;
            if (object.quotePurchase != null) {
                if (!$util.isObject(object.quotePurchase))
                    throw TypeError(".BI.UpgradeLicenseCompletePurchaseRequest.quotePurchase: object expected");
                message.quotePurchase = $root.BI.QuotePurchase.fromObject(object.quotePurchase, long + 1);
            }
            if (object.tier != null)
                message.tier = object.tier | 0;
            return message;
        };

        /**
         * Creates a plain object from an UpgradeLicenseCompletePurchaseRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @static
         * @param {BI.UpgradeLicenseCompletePurchaseRequest} message UpgradeLicenseCompletePurchaseRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpgradeLicenseCompletePurchaseRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.productType = options.enums === String ? "upgradeToEnterprise" : 0;
                object.quantity = 0;
                object.quotePurchase = null;
                object.tier = 0;
            }
            if (message.productType != null && Object.hasOwnProperty.call(message, "productType"))
                object.productType = options.enums === String ? $root.BI.PurchaseProductType[message.productType] === undefined ? message.productType : $root.BI.PurchaseProductType[message.productType] : message.productType;
            if (message.quantity != null && Object.hasOwnProperty.call(message, "quantity"))
                object.quantity = message.quantity;
            if (message.quotePurchase != null && Object.hasOwnProperty.call(message, "quotePurchase"))
                object.quotePurchase = $root.BI.QuotePurchase.toObject(message.quotePurchase, options, q + 1);
            if (message.tier != null && Object.hasOwnProperty.call(message, "tier"))
                object.tier = message.tier;
            return object;
        };

        /**
         * Converts this UpgradeLicenseCompletePurchaseRequest to JSON.
         * @function toJSON
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpgradeLicenseCompletePurchaseRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpgradeLicenseCompletePurchaseRequest
         * @function getTypeUrl
         * @memberof BI.UpgradeLicenseCompletePurchaseRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpgradeLicenseCompletePurchaseRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.UpgradeLicenseCompletePurchaseRequest";
        };

        return UpgradeLicenseCompletePurchaseRequest;
    })();

    BI.UpgradeLicenseCompletePurchaseResponse = (function() {

        /**
         * Properties of an UpgradeLicenseCompletePurchaseResponse.
         * @memberof BI
         * @interface IUpgradeLicenseCompletePurchaseResponse
         * @property {boolean|null} [success] UpgradeLicenseCompletePurchaseResponse success
         * @property {string|null} [invoiceNumber] UpgradeLicenseCompletePurchaseResponse invoiceNumber
         * @property {BI.IError|null} [error] UpgradeLicenseCompletePurchaseResponse error
         * @property {BI.IQuotePurchase|null} [quotePurchase] UpgradeLicenseCompletePurchaseResponse quotePurchase
         */

        /**
         * Constructs a new UpgradeLicenseCompletePurchaseResponse.
         * @memberof BI
         * @classdesc Represents an UpgradeLicenseCompletePurchaseResponse.
         * @implements IUpgradeLicenseCompletePurchaseResponse
         * @constructor
         * @param {BI.IUpgradeLicenseCompletePurchaseResponse=} [properties] Properties to set
         */
        function UpgradeLicenseCompletePurchaseResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpgradeLicenseCompletePurchaseResponse success.
         * @member {boolean} success
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @instance
         */
        UpgradeLicenseCompletePurchaseResponse.prototype.success = false;

        /**
         * UpgradeLicenseCompletePurchaseResponse invoiceNumber.
         * @member {string} invoiceNumber
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @instance
         */
        UpgradeLicenseCompletePurchaseResponse.prototype.invoiceNumber = "";

        /**
         * UpgradeLicenseCompletePurchaseResponse error.
         * @member {BI.IError|null|undefined} error
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @instance
         */
        UpgradeLicenseCompletePurchaseResponse.prototype.error = null;

        /**
         * UpgradeLicenseCompletePurchaseResponse quotePurchase.
         * @member {BI.IQuotePurchase|null|undefined} quotePurchase
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @instance
         */
        UpgradeLicenseCompletePurchaseResponse.prototype.quotePurchase = null;

        /**
         * Creates a new UpgradeLicenseCompletePurchaseResponse instance using the specified properties.
         * @function create
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @static
         * @param {BI.IUpgradeLicenseCompletePurchaseResponse=} [properties] Properties to set
         * @returns {BI.UpgradeLicenseCompletePurchaseResponse} UpgradeLicenseCompletePurchaseResponse instance
         */
        UpgradeLicenseCompletePurchaseResponse.create = function create(properties) {
            return new UpgradeLicenseCompletePurchaseResponse(properties);
        };

        /**
         * Encodes the specified UpgradeLicenseCompletePurchaseResponse message. Does not implicitly {@link BI.UpgradeLicenseCompletePurchaseResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @static
         * @param {BI.IUpgradeLicenseCompletePurchaseResponse} message UpgradeLicenseCompletePurchaseResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpgradeLicenseCompletePurchaseResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
            if (message.invoiceNumber != null && Object.hasOwnProperty.call(message, "invoiceNumber"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.invoiceNumber);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.BI.Error.encode(message.error, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.quotePurchase != null && Object.hasOwnProperty.call(message, "quotePurchase"))
                $root.BI.QuotePurchase.encode(message.quotePurchase, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an UpgradeLicenseCompletePurchaseResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.UpgradeLicenseCompletePurchaseResponse} UpgradeLicenseCompletePurchaseResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpgradeLicenseCompletePurchaseResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.UpgradeLicenseCompletePurchaseResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.success = reader.bool();
                        break;
                    }
                case 2: {
                        message.invoiceNumber = reader.string();
                        break;
                    }
                case 3: {
                        message.error = $root.BI.Error.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.quotePurchase = $root.BI.QuotePurchase.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates an UpgradeLicenseCompletePurchaseResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.UpgradeLicenseCompletePurchaseResponse} UpgradeLicenseCompletePurchaseResponse
         */
        UpgradeLicenseCompletePurchaseResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.UpgradeLicenseCompletePurchaseResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.UpgradeLicenseCompletePurchaseResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.UpgradeLicenseCompletePurchaseResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.invoiceNumber != null)
                message.invoiceNumber = String(object.invoiceNumber);
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".BI.UpgradeLicenseCompletePurchaseResponse.error: object expected");
                message.error = $root.BI.Error.fromObject(object.error, long + 1);
            }
            if (object.quotePurchase != null) {
                if (!$util.isObject(object.quotePurchase))
                    throw TypeError(".BI.UpgradeLicenseCompletePurchaseResponse.quotePurchase: object expected");
                message.quotePurchase = $root.BI.QuotePurchase.fromObject(object.quotePurchase, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an UpgradeLicenseCompletePurchaseResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @static
         * @param {BI.UpgradeLicenseCompletePurchaseResponse} message UpgradeLicenseCompletePurchaseResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpgradeLicenseCompletePurchaseResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.success = false;
                object.invoiceNumber = "";
                object.error = null;
                object.quotePurchase = null;
            }
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.invoiceNumber != null && Object.hasOwnProperty.call(message, "invoiceNumber"))
                object.invoiceNumber = message.invoiceNumber;
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                object.error = $root.BI.Error.toObject(message.error, options, q + 1);
            if (message.quotePurchase != null && Object.hasOwnProperty.call(message, "quotePurchase"))
                object.quotePurchase = $root.BI.QuotePurchase.toObject(message.quotePurchase, options, q + 1);
            return object;
        };

        /**
         * Converts this UpgradeLicenseCompletePurchaseResponse to JSON.
         * @function toJSON
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpgradeLicenseCompletePurchaseResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpgradeLicenseCompletePurchaseResponse
         * @function getTypeUrl
         * @memberof BI.UpgradeLicenseCompletePurchaseResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpgradeLicenseCompletePurchaseResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.UpgradeLicenseCompletePurchaseResponse";
        };

        return UpgradeLicenseCompletePurchaseResponse;
    })();

    BI.EnterpriseBasePlan = (function() {

        /**
         * Properties of an EnterpriseBasePlan.
         * @memberof BI
         * @interface IEnterpriseBasePlan
         * @property {BI.EnterpriseBasePlan.EnterpriseBasePlanVersion|null} [baseplanVersion] EnterpriseBasePlan baseplanVersion
         * @property {BI.ICost|null} [cost] EnterpriseBasePlan cost
         */

        /**
         * Constructs a new EnterpriseBasePlan.
         * @memberof BI
         * @classdesc Represents an EnterpriseBasePlan.
         * @implements IEnterpriseBasePlan
         * @constructor
         * @param {BI.IEnterpriseBasePlan=} [properties] Properties to set
         */
        function EnterpriseBasePlan(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterpriseBasePlan baseplanVersion.
         * @member {BI.EnterpriseBasePlan.EnterpriseBasePlanVersion} baseplanVersion
         * @memberof BI.EnterpriseBasePlan
         * @instance
         */
        EnterpriseBasePlan.prototype.baseplanVersion = 0;

        /**
         * EnterpriseBasePlan cost.
         * @member {BI.ICost|null|undefined} cost
         * @memberof BI.EnterpriseBasePlan
         * @instance
         */
        EnterpriseBasePlan.prototype.cost = null;

        /**
         * Creates a new EnterpriseBasePlan instance using the specified properties.
         * @function create
         * @memberof BI.EnterpriseBasePlan
         * @static
         * @param {BI.IEnterpriseBasePlan=} [properties] Properties to set
         * @returns {BI.EnterpriseBasePlan} EnterpriseBasePlan instance
         */
        EnterpriseBasePlan.create = function create(properties) {
            return new EnterpriseBasePlan(properties);
        };

        /**
         * Encodes the specified EnterpriseBasePlan message. Does not implicitly {@link BI.EnterpriseBasePlan.verify|verify} messages.
         * @function encode
         * @memberof BI.EnterpriseBasePlan
         * @static
         * @param {BI.IEnterpriseBasePlan} message EnterpriseBasePlan message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterpriseBasePlan.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.baseplanVersion != null && Object.hasOwnProperty.call(message, "baseplanVersion"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.baseplanVersion);
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                $root.BI.Cost.encode(message.cost, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an EnterpriseBasePlan message from the specified reader or buffer.
         * @function decode
         * @memberof BI.EnterpriseBasePlan
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.EnterpriseBasePlan} EnterpriseBasePlan
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterpriseBasePlan.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.EnterpriseBasePlan();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.baseplanVersion = reader.int32();
                        break;
                    }
                case 2: {
                        message.cost = $root.BI.Cost.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates an EnterpriseBasePlan message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.EnterpriseBasePlan
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.EnterpriseBasePlan} EnterpriseBasePlan
         */
        EnterpriseBasePlan.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.EnterpriseBasePlan)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.EnterpriseBasePlan: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.EnterpriseBasePlan();
            switch (object.baseplanVersion) {
            default:
                if (typeof object.baseplanVersion === "number") {
                    message.baseplanVersion = object.baseplanVersion;
                    break;
                }
                break;
            case "UNKNOWN":
            case 0:
                message.baseplanVersion = 0;
                break;
            case "BUSINESS_STARTER":
            case 1:
                message.baseplanVersion = 1;
                break;
            case "BUSINESS":
            case 2:
                message.baseplanVersion = 2;
                break;
            case "ENTERPRISE":
            case 3:
                message.baseplanVersion = 3;
                break;
            }
            if (object.cost != null) {
                if (!$util.isObject(object.cost))
                    throw TypeError(".BI.EnterpriseBasePlan.cost: object expected");
                message.cost = $root.BI.Cost.fromObject(object.cost, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an EnterpriseBasePlan message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.EnterpriseBasePlan
         * @static
         * @param {BI.EnterpriseBasePlan} message EnterpriseBasePlan
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterpriseBasePlan.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.baseplanVersion = options.enums === String ? "UNKNOWN" : 0;
                object.cost = null;
            }
            if (message.baseplanVersion != null && Object.hasOwnProperty.call(message, "baseplanVersion"))
                object.baseplanVersion = options.enums === String ? $root.BI.EnterpriseBasePlan.EnterpriseBasePlanVersion[message.baseplanVersion] === undefined ? message.baseplanVersion : $root.BI.EnterpriseBasePlan.EnterpriseBasePlanVersion[message.baseplanVersion] : message.baseplanVersion;
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                object.cost = $root.BI.Cost.toObject(message.cost, options, q + 1);
            return object;
        };

        /**
         * Converts this EnterpriseBasePlan to JSON.
         * @function toJSON
         * @memberof BI.EnterpriseBasePlan
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterpriseBasePlan.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EnterpriseBasePlan
         * @function getTypeUrl
         * @memberof BI.EnterpriseBasePlan
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EnterpriseBasePlan.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.EnterpriseBasePlan";
        };

        /**
         * EnterpriseBasePlanVersion enum.
         * @name BI.EnterpriseBasePlan.EnterpriseBasePlanVersion
         * @enum {number}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} BUSINESS_STARTER=1 BUSINESS_STARTER value
         * @property {number} BUSINESS=2 BUSINESS value
         * @property {number} ENTERPRISE=3 ENTERPRISE value
         */
        EnterpriseBasePlan.EnterpriseBasePlanVersion = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "BUSINESS_STARTER"] = 1;
            values[valuesById[2] = "BUSINESS"] = 2;
            values[valuesById[3] = "ENTERPRISE"] = 3;
            return values;
        })();

        return EnterpriseBasePlan;
    })();

    BI.SubscriptionEnterprisePricingRequest = (function() {

        /**
         * Properties of a SubscriptionEnterprisePricingRequest.
         * @memberof BI
         * @interface ISubscriptionEnterprisePricingRequest
         */

        /**
         * Constructs a new SubscriptionEnterprisePricingRequest.
         * @memberof BI
         * @classdesc Represents a SubscriptionEnterprisePricingRequest.
         * @implements ISubscriptionEnterprisePricingRequest
         * @constructor
         * @param {BI.ISubscriptionEnterprisePricingRequest=} [properties] Properties to set
         */
        function SubscriptionEnterprisePricingRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new SubscriptionEnterprisePricingRequest instance using the specified properties.
         * @function create
         * @memberof BI.SubscriptionEnterprisePricingRequest
         * @static
         * @param {BI.ISubscriptionEnterprisePricingRequest=} [properties] Properties to set
         * @returns {BI.SubscriptionEnterprisePricingRequest} SubscriptionEnterprisePricingRequest instance
         */
        SubscriptionEnterprisePricingRequest.create = function create(properties) {
            return new SubscriptionEnterprisePricingRequest(properties);
        };

        /**
         * Encodes the specified SubscriptionEnterprisePricingRequest message. Does not implicitly {@link BI.SubscriptionEnterprisePricingRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.SubscriptionEnterprisePricingRequest
         * @static
         * @param {BI.ISubscriptionEnterprisePricingRequest} message SubscriptionEnterprisePricingRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscriptionEnterprisePricingRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            return writer;
        };

        /**
         * Decodes a SubscriptionEnterprisePricingRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SubscriptionEnterprisePricingRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SubscriptionEnterprisePricingRequest} SubscriptionEnterprisePricingRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscriptionEnterprisePricingRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SubscriptionEnterprisePricingRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Creates a SubscriptionEnterprisePricingRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SubscriptionEnterprisePricingRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SubscriptionEnterprisePricingRequest} SubscriptionEnterprisePricingRequest
         */
        SubscriptionEnterprisePricingRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SubscriptionEnterprisePricingRequest)
                return object;
            return new $root.BI.SubscriptionEnterprisePricingRequest();
        };

        /**
         * Creates a plain object from a SubscriptionEnterprisePricingRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SubscriptionEnterprisePricingRequest
         * @static
         * @param {BI.SubscriptionEnterprisePricingRequest} message SubscriptionEnterprisePricingRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscriptionEnterprisePricingRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this SubscriptionEnterprisePricingRequest to JSON.
         * @function toJSON
         * @memberof BI.SubscriptionEnterprisePricingRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscriptionEnterprisePricingRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubscriptionEnterprisePricingRequest
         * @function getTypeUrl
         * @memberof BI.SubscriptionEnterprisePricingRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubscriptionEnterprisePricingRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SubscriptionEnterprisePricingRequest";
        };

        return SubscriptionEnterprisePricingRequest;
    })();

    BI.NhiTierPlan = (function() {

        /**
         * Properties of a NhiTierPlan.
         * @memberof BI
         * @interface INhiTierPlan
         * @property {number|null} [tierId] NhiTierPlan tierId
         * @property {number|null} [nhiCeiling] NhiTierPlan nhiCeiling
         * @property {BI.ICost|null} [cost] NhiTierPlan cost
         * @property {number|null} [productId] NhiTierPlan productId
         * @property {number|null} [nhiFloor] NhiTierPlan nhiFloor
         */

        /**
         * Constructs a new NhiTierPlan.
         * @memberof BI
         * @classdesc Represents a NhiTierPlan.
         * @implements INhiTierPlan
         * @constructor
         * @param {BI.INhiTierPlan=} [properties] Properties to set
         */
        function NhiTierPlan(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NhiTierPlan tierId.
         * @member {number} tierId
         * @memberof BI.NhiTierPlan
         * @instance
         */
        NhiTierPlan.prototype.tierId = 0;

        /**
         * NhiTierPlan nhiCeiling.
         * @member {number} nhiCeiling
         * @memberof BI.NhiTierPlan
         * @instance
         */
        NhiTierPlan.prototype.nhiCeiling = 0;

        /**
         * NhiTierPlan cost.
         * @member {BI.ICost|null|undefined} cost
         * @memberof BI.NhiTierPlan
         * @instance
         */
        NhiTierPlan.prototype.cost = null;

        /**
         * NhiTierPlan productId.
         * @member {number} productId
         * @memberof BI.NhiTierPlan
         * @instance
         */
        NhiTierPlan.prototype.productId = 0;

        /**
         * NhiTierPlan nhiFloor.
         * @member {number} nhiFloor
         * @memberof BI.NhiTierPlan
         * @instance
         */
        NhiTierPlan.prototype.nhiFloor = 0;

        /**
         * Creates a new NhiTierPlan instance using the specified properties.
         * @function create
         * @memberof BI.NhiTierPlan
         * @static
         * @param {BI.INhiTierPlan=} [properties] Properties to set
         * @returns {BI.NhiTierPlan} NhiTierPlan instance
         */
        NhiTierPlan.create = function create(properties) {
            return new NhiTierPlan(properties);
        };

        /**
         * Encodes the specified NhiTierPlan message. Does not implicitly {@link BI.NhiTierPlan.verify|verify} messages.
         * @function encode
         * @memberof BI.NhiTierPlan
         * @static
         * @param {BI.INhiTierPlan} message NhiTierPlan message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NhiTierPlan.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.tierId != null && Object.hasOwnProperty.call(message, "tierId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.tierId);
            if (message.nhiCeiling != null && Object.hasOwnProperty.call(message, "nhiCeiling"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nhiCeiling);
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                $root.BI.Cost.encode(message.cost, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.productId != null && Object.hasOwnProperty.call(message, "productId"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.productId);
            if (message.nhiFloor != null && Object.hasOwnProperty.call(message, "nhiFloor"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.nhiFloor);
            return writer;
        };

        /**
         * Decodes a NhiTierPlan message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NhiTierPlan
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NhiTierPlan} NhiTierPlan
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NhiTierPlan.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NhiTierPlan();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.tierId = reader.int32();
                        break;
                    }
                case 2: {
                        message.nhiCeiling = reader.int32();
                        break;
                    }
                case 3: {
                        message.cost = $root.BI.Cost.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.productId = reader.int32();
                        break;
                    }
                case 5: {
                        message.nhiFloor = reader.int32();
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
         * Creates a NhiTierPlan message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.NhiTierPlan
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NhiTierPlan} NhiTierPlan
         */
        NhiTierPlan.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NhiTierPlan)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.NhiTierPlan: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.NhiTierPlan();
            if (object.tierId != null)
                message.tierId = object.tierId | 0;
            if (object.nhiCeiling != null)
                message.nhiCeiling = object.nhiCeiling | 0;
            if (object.cost != null) {
                if (!$util.isObject(object.cost))
                    throw TypeError(".BI.NhiTierPlan.cost: object expected");
                message.cost = $root.BI.Cost.fromObject(object.cost, long + 1);
            }
            if (object.productId != null)
                message.productId = object.productId | 0;
            if (object.nhiFloor != null)
                message.nhiFloor = object.nhiFloor | 0;
            return message;
        };

        /**
         * Creates a plain object from a NhiTierPlan message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NhiTierPlan
         * @static
         * @param {BI.NhiTierPlan} message NhiTierPlan
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NhiTierPlan.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.tierId = 0;
                object.nhiCeiling = 0;
                object.cost = null;
                object.productId = 0;
                object.nhiFloor = 0;
            }
            if (message.tierId != null && Object.hasOwnProperty.call(message, "tierId"))
                object.tierId = message.tierId;
            if (message.nhiCeiling != null && Object.hasOwnProperty.call(message, "nhiCeiling"))
                object.nhiCeiling = message.nhiCeiling;
            if (message.cost != null && Object.hasOwnProperty.call(message, "cost"))
                object.cost = $root.BI.Cost.toObject(message.cost, options, q + 1);
            if (message.productId != null && Object.hasOwnProperty.call(message, "productId"))
                object.productId = message.productId;
            if (message.nhiFloor != null && Object.hasOwnProperty.call(message, "nhiFloor"))
                object.nhiFloor = message.nhiFloor;
            return object;
        };

        /**
         * Converts this NhiTierPlan to JSON.
         * @function toJSON
         * @memberof BI.NhiTierPlan
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NhiTierPlan.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NhiTierPlan
         * @function getTypeUrl
         * @memberof BI.NhiTierPlan
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NhiTierPlan.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NhiTierPlan";
        };

        return NhiTierPlan;
    })();

    BI.SubscriptionEnterprisePricingResponse = (function() {

        /**
         * Properties of a SubscriptionEnterprisePricingResponse.
         * @memberof BI
         * @interface ISubscriptionEnterprisePricingResponse
         * @property {Array.<BI.IEnterpriseBasePlan>|null} [basePlans] SubscriptionEnterprisePricingResponse basePlans
         * @property {Array.<BI.IAddon>|null} [addons] SubscriptionEnterprisePricingResponse addons
         * @property {Array.<BI.IFilePlan>|null} [filePlans] SubscriptionEnterprisePricingResponse filePlans
         * @property {Array.<BI.INhiTierPlan>|null} [nhiTierPlans] SubscriptionEnterprisePricingResponse nhiTierPlans
         */

        /**
         * Constructs a new SubscriptionEnterprisePricingResponse.
         * @memberof BI
         * @classdesc Represents a SubscriptionEnterprisePricingResponse.
         * @implements ISubscriptionEnterprisePricingResponse
         * @constructor
         * @param {BI.ISubscriptionEnterprisePricingResponse=} [properties] Properties to set
         */
        function SubscriptionEnterprisePricingResponse(properties) {
            this.basePlans = [];
            this.addons = [];
            this.filePlans = [];
            this.nhiTierPlans = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SubscriptionEnterprisePricingResponse basePlans.
         * @member {Array.<BI.IEnterpriseBasePlan>} basePlans
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @instance
         */
        SubscriptionEnterprisePricingResponse.prototype.basePlans = $util.emptyArray;

        /**
         * SubscriptionEnterprisePricingResponse addons.
         * @member {Array.<BI.IAddon>} addons
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @instance
         */
        SubscriptionEnterprisePricingResponse.prototype.addons = $util.emptyArray;

        /**
         * SubscriptionEnterprisePricingResponse filePlans.
         * @member {Array.<BI.IFilePlan>} filePlans
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @instance
         */
        SubscriptionEnterprisePricingResponse.prototype.filePlans = $util.emptyArray;

        /**
         * SubscriptionEnterprisePricingResponse nhiTierPlans.
         * @member {Array.<BI.INhiTierPlan>} nhiTierPlans
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @instance
         */
        SubscriptionEnterprisePricingResponse.prototype.nhiTierPlans = $util.emptyArray;

        /**
         * Creates a new SubscriptionEnterprisePricingResponse instance using the specified properties.
         * @function create
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @static
         * @param {BI.ISubscriptionEnterprisePricingResponse=} [properties] Properties to set
         * @returns {BI.SubscriptionEnterprisePricingResponse} SubscriptionEnterprisePricingResponse instance
         */
        SubscriptionEnterprisePricingResponse.create = function create(properties) {
            return new SubscriptionEnterprisePricingResponse(properties);
        };

        /**
         * Encodes the specified SubscriptionEnterprisePricingResponse message. Does not implicitly {@link BI.SubscriptionEnterprisePricingResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @static
         * @param {BI.ISubscriptionEnterprisePricingResponse} message SubscriptionEnterprisePricingResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SubscriptionEnterprisePricingResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.basePlans != null && message.basePlans.length)
                for (let i = 0; i < message.basePlans.length; ++i)
                    $root.BI.EnterpriseBasePlan.encode(message.basePlans[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.addons != null && message.addons.length)
                for (let i = 0; i < message.addons.length; ++i)
                    $root.BI.Addon.encode(message.addons[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.filePlans != null && message.filePlans.length)
                for (let i = 0; i < message.filePlans.length; ++i)
                    $root.BI.FilePlan.encode(message.filePlans[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.nhiTierPlans != null && message.nhiTierPlans.length)
                for (let i = 0; i < message.nhiTierPlans.length; ++i)
                    $root.BI.NhiTierPlan.encode(message.nhiTierPlans[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SubscriptionEnterprisePricingResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SubscriptionEnterprisePricingResponse} SubscriptionEnterprisePricingResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SubscriptionEnterprisePricingResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SubscriptionEnterprisePricingResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.basePlans && message.basePlans.length))
                            message.basePlans = [];
                        message.basePlans.push($root.BI.EnterpriseBasePlan.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.addons && message.addons.length))
                            message.addons = [];
                        message.addons.push($root.BI.Addon.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        if (!(message.filePlans && message.filePlans.length))
                            message.filePlans = [];
                        message.filePlans.push($root.BI.FilePlan.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 4: {
                        if (!(message.nhiTierPlans && message.nhiTierPlans.length))
                            message.nhiTierPlans = [];
                        message.nhiTierPlans.push($root.BI.NhiTierPlan.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a SubscriptionEnterprisePricingResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SubscriptionEnterprisePricingResponse} SubscriptionEnterprisePricingResponse
         */
        SubscriptionEnterprisePricingResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SubscriptionEnterprisePricingResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.SubscriptionEnterprisePricingResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.SubscriptionEnterprisePricingResponse();
            if (object.basePlans) {
                if (!Array.isArray(object.basePlans))
                    throw TypeError(".BI.SubscriptionEnterprisePricingResponse.basePlans: array expected");
                message.basePlans = [];
                for (let i = 0; i < object.basePlans.length; ++i) {
                    if (!$util.isObject(object.basePlans[i]))
                        throw TypeError(".BI.SubscriptionEnterprisePricingResponse.basePlans: object expected");
                    message.basePlans[i] = $root.BI.EnterpriseBasePlan.fromObject(object.basePlans[i], long + 1);
                }
            }
            if (object.addons) {
                if (!Array.isArray(object.addons))
                    throw TypeError(".BI.SubscriptionEnterprisePricingResponse.addons: array expected");
                message.addons = [];
                for (let i = 0; i < object.addons.length; ++i) {
                    if (!$util.isObject(object.addons[i]))
                        throw TypeError(".BI.SubscriptionEnterprisePricingResponse.addons: object expected");
                    message.addons[i] = $root.BI.Addon.fromObject(object.addons[i], long + 1);
                }
            }
            if (object.filePlans) {
                if (!Array.isArray(object.filePlans))
                    throw TypeError(".BI.SubscriptionEnterprisePricingResponse.filePlans: array expected");
                message.filePlans = [];
                for (let i = 0; i < object.filePlans.length; ++i) {
                    if (!$util.isObject(object.filePlans[i]))
                        throw TypeError(".BI.SubscriptionEnterprisePricingResponse.filePlans: object expected");
                    message.filePlans[i] = $root.BI.FilePlan.fromObject(object.filePlans[i], long + 1);
                }
            }
            if (object.nhiTierPlans) {
                if (!Array.isArray(object.nhiTierPlans))
                    throw TypeError(".BI.SubscriptionEnterprisePricingResponse.nhiTierPlans: array expected");
                message.nhiTierPlans = [];
                for (let i = 0; i < object.nhiTierPlans.length; ++i) {
                    if (!$util.isObject(object.nhiTierPlans[i]))
                        throw TypeError(".BI.SubscriptionEnterprisePricingResponse.nhiTierPlans: object expected");
                    message.nhiTierPlans[i] = $root.BI.NhiTierPlan.fromObject(object.nhiTierPlans[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SubscriptionEnterprisePricingResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @static
         * @param {BI.SubscriptionEnterprisePricingResponse} message SubscriptionEnterprisePricingResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SubscriptionEnterprisePricingResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.basePlans = [];
                object.addons = [];
                object.filePlans = [];
                object.nhiTierPlans = [];
            }
            if (message.basePlans && message.basePlans.length) {
                object.basePlans = [];
                for (let j = 0; j < message.basePlans.length; ++j)
                    object.basePlans[j] = $root.BI.EnterpriseBasePlan.toObject(message.basePlans[j], options, q + 1);
            }
            if (message.addons && message.addons.length) {
                object.addons = [];
                for (let j = 0; j < message.addons.length; ++j)
                    object.addons[j] = $root.BI.Addon.toObject(message.addons[j], options, q + 1);
            }
            if (message.filePlans && message.filePlans.length) {
                object.filePlans = [];
                for (let j = 0; j < message.filePlans.length; ++j)
                    object.filePlans[j] = $root.BI.FilePlan.toObject(message.filePlans[j], options, q + 1);
            }
            if (message.nhiTierPlans && message.nhiTierPlans.length) {
                object.nhiTierPlans = [];
                for (let j = 0; j < message.nhiTierPlans.length; ++j)
                    object.nhiTierPlans[j] = $root.BI.NhiTierPlan.toObject(message.nhiTierPlans[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this SubscriptionEnterprisePricingResponse to JSON.
         * @function toJSON
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SubscriptionEnterprisePricingResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SubscriptionEnterprisePricingResponse
         * @function getTypeUrl
         * @memberof BI.SubscriptionEnterprisePricingResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SubscriptionEnterprisePricingResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SubscriptionEnterprisePricingResponse";
        };

        return SubscriptionEnterprisePricingResponse;
    })();

    /**
     * IdentifierType enum.
     * @name BI.IdentifierType
     * @enum {number}
     * @property {number} UNKNOWN_IDENTIFIER_TYPE=0 UNKNOWN_IDENTIFIER_TYPE value
     * @property {number} IOS_ID=1 IOS_ID value
     * @property {number} ANDROID_GOOGLE_PLAY_ID=2 ANDROID_GOOGLE_PLAY_ID value
     * @property {number} ANDROID_APP_SET_ID=3 ANDROID_APP_SET_ID value
     * @property {number} ANDROID_ID=4 ANDROID_ID value
     * @property {number} AMAZON_ADVERTISING_ID=5 AMAZON_ADVERTISING_ID value
     * @property {number} OPEN_ADVERTISING_ID=6 OPEN_ADVERTISING_ID value
     * @property {number} SINGULAR_DEVICE_ID=7 SINGULAR_DEVICE_ID value
     * @property {number} CLIENT_DEFINED_ID=8 CLIENT_DEFINED_ID value
     */
    BI.IdentifierType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_IDENTIFIER_TYPE"] = 0;
        values[valuesById[1] = "IOS_ID"] = 1;
        values[valuesById[2] = "ANDROID_GOOGLE_PLAY_ID"] = 2;
        values[valuesById[3] = "ANDROID_APP_SET_ID"] = 3;
        values[valuesById[4] = "ANDROID_ID"] = 4;
        values[valuesById[5] = "AMAZON_ADVERTISING_ID"] = 5;
        values[valuesById[6] = "OPEN_ADVERTISING_ID"] = 6;
        values[valuesById[7] = "SINGULAR_DEVICE_ID"] = 7;
        values[valuesById[8] = "CLIENT_DEFINED_ID"] = 8;
        return values;
    })();

    BI.SingularDeviceIdentifier = (function() {

        /**
         * Properties of a SingularDeviceIdentifier.
         * @memberof BI
         * @interface ISingularDeviceIdentifier
         * @property {string|null} [id] SingularDeviceIdentifier id
         * @property {BI.IdentifierType|null} [idType] SingularDeviceIdentifier idType
         */

        /**
         * Constructs a new SingularDeviceIdentifier.
         * @memberof BI
         * @classdesc Represents a SingularDeviceIdentifier.
         * @implements ISingularDeviceIdentifier
         * @constructor
         * @param {BI.ISingularDeviceIdentifier=} [properties] Properties to set
         */
        function SingularDeviceIdentifier(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SingularDeviceIdentifier id.
         * @member {string} id
         * @memberof BI.SingularDeviceIdentifier
         * @instance
         */
        SingularDeviceIdentifier.prototype.id = "";

        /**
         * SingularDeviceIdentifier idType.
         * @member {BI.IdentifierType} idType
         * @memberof BI.SingularDeviceIdentifier
         * @instance
         */
        SingularDeviceIdentifier.prototype.idType = 0;

        /**
         * Creates a new SingularDeviceIdentifier instance using the specified properties.
         * @function create
         * @memberof BI.SingularDeviceIdentifier
         * @static
         * @param {BI.ISingularDeviceIdentifier=} [properties] Properties to set
         * @returns {BI.SingularDeviceIdentifier} SingularDeviceIdentifier instance
         */
        SingularDeviceIdentifier.create = function create(properties) {
            return new SingularDeviceIdentifier(properties);
        };

        /**
         * Encodes the specified SingularDeviceIdentifier message. Does not implicitly {@link BI.SingularDeviceIdentifier.verify|verify} messages.
         * @function encode
         * @memberof BI.SingularDeviceIdentifier
         * @static
         * @param {BI.ISingularDeviceIdentifier} message SingularDeviceIdentifier message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SingularDeviceIdentifier.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.idType != null && Object.hasOwnProperty.call(message, "idType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.idType);
            return writer;
        };

        /**
         * Decodes a SingularDeviceIdentifier message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SingularDeviceIdentifier
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SingularDeviceIdentifier} SingularDeviceIdentifier
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SingularDeviceIdentifier.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SingularDeviceIdentifier();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.idType = reader.int32();
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
         * Creates a SingularDeviceIdentifier message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SingularDeviceIdentifier
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SingularDeviceIdentifier} SingularDeviceIdentifier
         */
        SingularDeviceIdentifier.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SingularDeviceIdentifier)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.SingularDeviceIdentifier: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.SingularDeviceIdentifier();
            if (object.id != null)
                message.id = String(object.id);
            switch (object.idType) {
            default:
                if (typeof object.idType === "number") {
                    message.idType = object.idType;
                    break;
                }
                break;
            case "UNKNOWN_IDENTIFIER_TYPE":
            case 0:
                message.idType = 0;
                break;
            case "IOS_ID":
            case 1:
                message.idType = 1;
                break;
            case "ANDROID_GOOGLE_PLAY_ID":
            case 2:
                message.idType = 2;
                break;
            case "ANDROID_APP_SET_ID":
            case 3:
                message.idType = 3;
                break;
            case "ANDROID_ID":
            case 4:
                message.idType = 4;
                break;
            case "AMAZON_ADVERTISING_ID":
            case 5:
                message.idType = 5;
                break;
            case "OPEN_ADVERTISING_ID":
            case 6:
                message.idType = 6;
                break;
            case "SINGULAR_DEVICE_ID":
            case 7:
                message.idType = 7;
                break;
            case "CLIENT_DEFINED_ID":
            case 8:
                message.idType = 8;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a SingularDeviceIdentifier message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SingularDeviceIdentifier
         * @static
         * @param {BI.SingularDeviceIdentifier} message SingularDeviceIdentifier
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SingularDeviceIdentifier.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.idType = options.enums === String ? "UNKNOWN_IDENTIFIER_TYPE" : 0;
            }
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                object.id = message.id;
            if (message.idType != null && Object.hasOwnProperty.call(message, "idType"))
                object.idType = options.enums === String ? $root.BI.IdentifierType[message.idType] === undefined ? message.idType : $root.BI.IdentifierType[message.idType] : message.idType;
            return object;
        };

        /**
         * Converts this SingularDeviceIdentifier to JSON.
         * @function toJSON
         * @memberof BI.SingularDeviceIdentifier
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SingularDeviceIdentifier.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SingularDeviceIdentifier
         * @function getTypeUrl
         * @memberof BI.SingularDeviceIdentifier
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SingularDeviceIdentifier.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SingularDeviceIdentifier";
        };

        return SingularDeviceIdentifier;
    })();

    BI.SingularSharedData = (function() {

        /**
         * Properties of a SingularSharedData.
         * @memberof BI
         * @interface ISingularSharedData
         * @property {string|null} [platform] SingularSharedData platform
         * @property {string|null} [osVersion] SingularSharedData osVersion
         * @property {string|null} [make] SingularSharedData make
         * @property {string|null} [model] SingularSharedData model
         * @property {string|null} [locale] SingularSharedData locale
         * @property {string|null} [build] SingularSharedData build
         * @property {string|null} [appIdentifier] SingularSharedData appIdentifier
         * @property {number|null} [attAuthorizationStatus] SingularSharedData attAuthorizationStatus
         */

        /**
         * Constructs a new SingularSharedData.
         * @memberof BI
         * @classdesc Represents a SingularSharedData.
         * @implements ISingularSharedData
         * @constructor
         * @param {BI.ISingularSharedData=} [properties] Properties to set
         */
        function SingularSharedData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SingularSharedData platform.
         * @member {string} platform
         * @memberof BI.SingularSharedData
         * @instance
         */
        SingularSharedData.prototype.platform = "";

        /**
         * SingularSharedData osVersion.
         * @member {string} osVersion
         * @memberof BI.SingularSharedData
         * @instance
         */
        SingularSharedData.prototype.osVersion = "";

        /**
         * SingularSharedData make.
         * @member {string} make
         * @memberof BI.SingularSharedData
         * @instance
         */
        SingularSharedData.prototype.make = "";

        /**
         * SingularSharedData model.
         * @member {string} model
         * @memberof BI.SingularSharedData
         * @instance
         */
        SingularSharedData.prototype.model = "";

        /**
         * SingularSharedData locale.
         * @member {string} locale
         * @memberof BI.SingularSharedData
         * @instance
         */
        SingularSharedData.prototype.locale = "";

        /**
         * SingularSharedData build.
         * @member {string} build
         * @memberof BI.SingularSharedData
         * @instance
         */
        SingularSharedData.prototype.build = "";

        /**
         * SingularSharedData appIdentifier.
         * @member {string} appIdentifier
         * @memberof BI.SingularSharedData
         * @instance
         */
        SingularSharedData.prototype.appIdentifier = "";

        /**
         * SingularSharedData attAuthorizationStatus.
         * @member {number} attAuthorizationStatus
         * @memberof BI.SingularSharedData
         * @instance
         */
        SingularSharedData.prototype.attAuthorizationStatus = 0;

        /**
         * Creates a new SingularSharedData instance using the specified properties.
         * @function create
         * @memberof BI.SingularSharedData
         * @static
         * @param {BI.ISingularSharedData=} [properties] Properties to set
         * @returns {BI.SingularSharedData} SingularSharedData instance
         */
        SingularSharedData.create = function create(properties) {
            return new SingularSharedData(properties);
        };

        /**
         * Encodes the specified SingularSharedData message. Does not implicitly {@link BI.SingularSharedData.verify|verify} messages.
         * @function encode
         * @memberof BI.SingularSharedData
         * @static
         * @param {BI.ISingularSharedData} message SingularSharedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SingularSharedData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.platform != null && Object.hasOwnProperty.call(message, "platform"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.platform);
            if (message.osVersion != null && Object.hasOwnProperty.call(message, "osVersion"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.osVersion);
            if (message.make != null && Object.hasOwnProperty.call(message, "make"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.make);
            if (message.model != null && Object.hasOwnProperty.call(message, "model"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.model);
            if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.locale);
            if (message.build != null && Object.hasOwnProperty.call(message, "build"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.build);
            if (message.appIdentifier != null && Object.hasOwnProperty.call(message, "appIdentifier"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.appIdentifier);
            if (message.attAuthorizationStatus != null && Object.hasOwnProperty.call(message, "attAuthorizationStatus"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.attAuthorizationStatus);
            return writer;
        };

        /**
         * Decodes a SingularSharedData message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SingularSharedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SingularSharedData} SingularSharedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SingularSharedData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SingularSharedData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.platform = reader.string();
                        break;
                    }
                case 2: {
                        message.osVersion = reader.string();
                        break;
                    }
                case 3: {
                        message.make = reader.string();
                        break;
                    }
                case 4: {
                        message.model = reader.string();
                        break;
                    }
                case 5: {
                        message.locale = reader.string();
                        break;
                    }
                case 6: {
                        message.build = reader.string();
                        break;
                    }
                case 7: {
                        message.appIdentifier = reader.string();
                        break;
                    }
                case 8: {
                        message.attAuthorizationStatus = reader.int32();
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
         * Creates a SingularSharedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SingularSharedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SingularSharedData} SingularSharedData
         */
        SingularSharedData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SingularSharedData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.SingularSharedData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.SingularSharedData();
            if (object.platform != null)
                message.platform = String(object.platform);
            if (object.osVersion != null)
                message.osVersion = String(object.osVersion);
            if (object.make != null)
                message.make = String(object.make);
            if (object.model != null)
                message.model = String(object.model);
            if (object.locale != null)
                message.locale = String(object.locale);
            if (object.build != null)
                message.build = String(object.build);
            if (object.appIdentifier != null)
                message.appIdentifier = String(object.appIdentifier);
            if (object.attAuthorizationStatus != null)
                message.attAuthorizationStatus = object.attAuthorizationStatus | 0;
            return message;
        };

        /**
         * Creates a plain object from a SingularSharedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SingularSharedData
         * @static
         * @param {BI.SingularSharedData} message SingularSharedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SingularSharedData.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.platform = "";
                object.osVersion = "";
                object.make = "";
                object.model = "";
                object.locale = "";
                object.build = "";
                object.appIdentifier = "";
                object.attAuthorizationStatus = 0;
            }
            if (message.platform != null && Object.hasOwnProperty.call(message, "platform"))
                object.platform = message.platform;
            if (message.osVersion != null && Object.hasOwnProperty.call(message, "osVersion"))
                object.osVersion = message.osVersion;
            if (message.make != null && Object.hasOwnProperty.call(message, "make"))
                object.make = message.make;
            if (message.model != null && Object.hasOwnProperty.call(message, "model"))
                object.model = message.model;
            if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
                object.locale = message.locale;
            if (message.build != null && Object.hasOwnProperty.call(message, "build"))
                object.build = message.build;
            if (message.appIdentifier != null && Object.hasOwnProperty.call(message, "appIdentifier"))
                object.appIdentifier = message.appIdentifier;
            if (message.attAuthorizationStatus != null && Object.hasOwnProperty.call(message, "attAuthorizationStatus"))
                object.attAuthorizationStatus = message.attAuthorizationStatus;
            return object;
        };

        /**
         * Converts this SingularSharedData to JSON.
         * @function toJSON
         * @memberof BI.SingularSharedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SingularSharedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SingularSharedData
         * @function getTypeUrl
         * @memberof BI.SingularSharedData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SingularSharedData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SingularSharedData";
        };

        return SingularSharedData;
    })();

    BI.SingularSessionRequest = (function() {

        /**
         * Properties of a SingularSessionRequest.
         * @memberof BI
         * @interface ISingularSessionRequest
         * @property {Array.<BI.ISingularDeviceIdentifier>|null} [deviceIdentifiers] SingularSessionRequest deviceIdentifiers
         * @property {BI.ISingularSharedData|null} [sharedData] SingularSessionRequest sharedData
         * @property {string|null} [applicationVersion] SingularSessionRequest applicationVersion
         * @property {boolean|null} [install] SingularSessionRequest install
         * @property {number|null} [installTime] SingularSessionRequest installTime
         * @property {number|null} [updateTime] SingularSessionRequest updateTime
         * @property {string|null} [installSource] SingularSessionRequest installSource
         * @property {string|null} [installReceipt] SingularSessionRequest installReceipt
         * @property {string|null} [openuri] SingularSessionRequest openuri
         * @property {boolean|null} [ddlEnabled] SingularSessionRequest ddlEnabled
         * @property {boolean|null} [singularLinkResolveRequired] SingularSessionRequest singularLinkResolveRequired
         * @property {string|null} [installRef] SingularSessionRequest installRef
         * @property {string|null} [metaRef] SingularSessionRequest metaRef
         * @property {string|null} [attributionToken] SingularSessionRequest attributionToken
         */

        /**
         * Constructs a new SingularSessionRequest.
         * @memberof BI
         * @classdesc Represents a SingularSessionRequest.
         * @implements ISingularSessionRequest
         * @constructor
         * @param {BI.ISingularSessionRequest=} [properties] Properties to set
         */
        function SingularSessionRequest(properties) {
            this.deviceIdentifiers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SingularSessionRequest deviceIdentifiers.
         * @member {Array.<BI.ISingularDeviceIdentifier>} deviceIdentifiers
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.deviceIdentifiers = $util.emptyArray;

        /**
         * SingularSessionRequest sharedData.
         * @member {BI.ISingularSharedData|null|undefined} sharedData
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.sharedData = null;

        /**
         * SingularSessionRequest applicationVersion.
         * @member {string} applicationVersion
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.applicationVersion = "";

        /**
         * SingularSessionRequest install.
         * @member {boolean} install
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.install = false;

        /**
         * SingularSessionRequest installTime.
         * @member {number} installTime
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.installTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SingularSessionRequest updateTime.
         * @member {number} updateTime
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.updateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SingularSessionRequest installSource.
         * @member {string} installSource
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.installSource = "";

        /**
         * SingularSessionRequest installReceipt.
         * @member {string} installReceipt
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.installReceipt = "";

        /**
         * SingularSessionRequest openuri.
         * @member {string} openuri
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.openuri = "";

        /**
         * SingularSessionRequest ddlEnabled.
         * @member {boolean} ddlEnabled
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.ddlEnabled = false;

        /**
         * SingularSessionRequest singularLinkResolveRequired.
         * @member {boolean} singularLinkResolveRequired
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.singularLinkResolveRequired = false;

        /**
         * SingularSessionRequest installRef.
         * @member {string} installRef
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.installRef = "";

        /**
         * SingularSessionRequest metaRef.
         * @member {string} metaRef
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.metaRef = "";

        /**
         * SingularSessionRequest attributionToken.
         * @member {string} attributionToken
         * @memberof BI.SingularSessionRequest
         * @instance
         */
        SingularSessionRequest.prototype.attributionToken = "";

        /**
         * Creates a new SingularSessionRequest instance using the specified properties.
         * @function create
         * @memberof BI.SingularSessionRequest
         * @static
         * @param {BI.ISingularSessionRequest=} [properties] Properties to set
         * @returns {BI.SingularSessionRequest} SingularSessionRequest instance
         */
        SingularSessionRequest.create = function create(properties) {
            return new SingularSessionRequest(properties);
        };

        /**
         * Encodes the specified SingularSessionRequest message. Does not implicitly {@link BI.SingularSessionRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.SingularSessionRequest
         * @static
         * @param {BI.ISingularSessionRequest} message SingularSessionRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SingularSessionRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.deviceIdentifiers != null && message.deviceIdentifiers.length)
                for (let i = 0; i < message.deviceIdentifiers.length; ++i)
                    $root.BI.SingularDeviceIdentifier.encode(message.deviceIdentifiers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.sharedData != null && Object.hasOwnProperty.call(message, "sharedData"))
                $root.BI.SingularSharedData.encode(message.sharedData, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.applicationVersion != null && Object.hasOwnProperty.call(message, "applicationVersion"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.applicationVersion);
            if (message.install != null && Object.hasOwnProperty.call(message, "install"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.install);
            if (message.installTime != null && Object.hasOwnProperty.call(message, "installTime"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.installTime);
            if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.updateTime);
            if (message.installSource != null && Object.hasOwnProperty.call(message, "installSource"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.installSource);
            if (message.installReceipt != null && Object.hasOwnProperty.call(message, "installReceipt"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.installReceipt);
            if (message.openuri != null && Object.hasOwnProperty.call(message, "openuri"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.openuri);
            if (message.ddlEnabled != null && Object.hasOwnProperty.call(message, "ddlEnabled"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.ddlEnabled);
            if (message.singularLinkResolveRequired != null && Object.hasOwnProperty.call(message, "singularLinkResolveRequired"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.singularLinkResolveRequired);
            if (message.installRef != null && Object.hasOwnProperty.call(message, "installRef"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.installRef);
            if (message.metaRef != null && Object.hasOwnProperty.call(message, "metaRef"))
                writer.uint32(/* id 13, wireType 2 =*/106).string(message.metaRef);
            if (message.attributionToken != null && Object.hasOwnProperty.call(message, "attributionToken"))
                writer.uint32(/* id 14, wireType 2 =*/114).string(message.attributionToken);
            return writer;
        };

        /**
         * Decodes a SingularSessionRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SingularSessionRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SingularSessionRequest} SingularSessionRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SingularSessionRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SingularSessionRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.deviceIdentifiers && message.deviceIdentifiers.length))
                            message.deviceIdentifiers = [];
                        message.deviceIdentifiers.push($root.BI.SingularDeviceIdentifier.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        message.sharedData = $root.BI.SingularSharedData.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.applicationVersion = reader.string();
                        break;
                    }
                case 4: {
                        message.install = reader.bool();
                        break;
                    }
                case 5: {
                        message.installTime = reader.int64();
                        break;
                    }
                case 6: {
                        message.updateTime = reader.int64();
                        break;
                    }
                case 7: {
                        message.installSource = reader.string();
                        break;
                    }
                case 8: {
                        message.installReceipt = reader.string();
                        break;
                    }
                case 9: {
                        message.openuri = reader.string();
                        break;
                    }
                case 10: {
                        message.ddlEnabled = reader.bool();
                        break;
                    }
                case 11: {
                        message.singularLinkResolveRequired = reader.bool();
                        break;
                    }
                case 12: {
                        message.installRef = reader.string();
                        break;
                    }
                case 13: {
                        message.metaRef = reader.string();
                        break;
                    }
                case 14: {
                        message.attributionToken = reader.string();
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
         * Creates a SingularSessionRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SingularSessionRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SingularSessionRequest} SingularSessionRequest
         */
        SingularSessionRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SingularSessionRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.SingularSessionRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.SingularSessionRequest();
            if (object.deviceIdentifiers) {
                if (!Array.isArray(object.deviceIdentifiers))
                    throw TypeError(".BI.SingularSessionRequest.deviceIdentifiers: array expected");
                message.deviceIdentifiers = [];
                for (let i = 0; i < object.deviceIdentifiers.length; ++i) {
                    if (!$util.isObject(object.deviceIdentifiers[i]))
                        throw TypeError(".BI.SingularSessionRequest.deviceIdentifiers: object expected");
                    message.deviceIdentifiers[i] = $root.BI.SingularDeviceIdentifier.fromObject(object.deviceIdentifiers[i], long + 1);
                }
            }
            if (object.sharedData != null) {
                if (!$util.isObject(object.sharedData))
                    throw TypeError(".BI.SingularSessionRequest.sharedData: object expected");
                message.sharedData = $root.BI.SingularSharedData.fromObject(object.sharedData, long + 1);
            }
            if (object.applicationVersion != null)
                message.applicationVersion = String(object.applicationVersion);
            if (object.install != null)
                message.install = Boolean(object.install);
            if (object.installTime != null)
                if ($util.Long)
                    message.installTime = $util.Long.fromValue(object.installTime, false);
                else if (typeof object.installTime === "string")
                    message.installTime = parseInt(object.installTime, 10);
                else if (typeof object.installTime === "number")
                    message.installTime = object.installTime;
                else if (typeof object.installTime === "object")
                    message.installTime = new $util.LongBits(object.installTime.low >>> 0, object.installTime.high >>> 0).toNumber();
            if (object.updateTime != null)
                if ($util.Long)
                    message.updateTime = $util.Long.fromValue(object.updateTime, false);
                else if (typeof object.updateTime === "string")
                    message.updateTime = parseInt(object.updateTime, 10);
                else if (typeof object.updateTime === "number")
                    message.updateTime = object.updateTime;
                else if (typeof object.updateTime === "object")
                    message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber();
            if (object.installSource != null)
                message.installSource = String(object.installSource);
            if (object.installReceipt != null)
                message.installReceipt = String(object.installReceipt);
            if (object.openuri != null)
                message.openuri = String(object.openuri);
            if (object.ddlEnabled != null)
                message.ddlEnabled = Boolean(object.ddlEnabled);
            if (object.singularLinkResolveRequired != null)
                message.singularLinkResolveRequired = Boolean(object.singularLinkResolveRequired);
            if (object.installRef != null)
                message.installRef = String(object.installRef);
            if (object.metaRef != null)
                message.metaRef = String(object.metaRef);
            if (object.attributionToken != null)
                message.attributionToken = String(object.attributionToken);
            return message;
        };

        /**
         * Creates a plain object from a SingularSessionRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SingularSessionRequest
         * @static
         * @param {BI.SingularSessionRequest} message SingularSessionRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SingularSessionRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.deviceIdentifiers = [];
            if (options.defaults) {
                object.sharedData = null;
                object.applicationVersion = "";
                object.install = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.installTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.installTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.updateTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.updateTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.installSource = "";
                object.installReceipt = "";
                object.openuri = "";
                object.ddlEnabled = false;
                object.singularLinkResolveRequired = false;
                object.installRef = "";
                object.metaRef = "";
                object.attributionToken = "";
            }
            if (message.deviceIdentifiers && message.deviceIdentifiers.length) {
                object.deviceIdentifiers = [];
                for (let j = 0; j < message.deviceIdentifiers.length; ++j)
                    object.deviceIdentifiers[j] = $root.BI.SingularDeviceIdentifier.toObject(message.deviceIdentifiers[j], options, q + 1);
            }
            if (message.sharedData != null && Object.hasOwnProperty.call(message, "sharedData"))
                object.sharedData = $root.BI.SingularSharedData.toObject(message.sharedData, options, q + 1);
            if (message.applicationVersion != null && Object.hasOwnProperty.call(message, "applicationVersion"))
                object.applicationVersion = message.applicationVersion;
            if (message.install != null && Object.hasOwnProperty.call(message, "install"))
                object.install = message.install;
            if (message.installTime != null && Object.hasOwnProperty.call(message, "installTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.installTime = typeof message.installTime === "number" ? BigInt(message.installTime) : $util.Long.fromBits(message.installTime.low >>> 0, message.installTime.high >>> 0, false).toBigInt();
                else if (typeof message.installTime === "number")
                    object.installTime = options.longs === String ? String(message.installTime) : message.installTime;
                else
                    object.installTime = options.longs === String ? $util.Long.prototype.toString.call(message.installTime) : options.longs === Number ? new $util.LongBits(message.installTime.low >>> 0, message.installTime.high >>> 0).toNumber() : message.installTime;
            if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.updateTime = typeof message.updateTime === "number" ? BigInt(message.updateTime) : $util.Long.fromBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0, false).toBigInt();
                else if (typeof message.updateTime === "number")
                    object.updateTime = options.longs === String ? String(message.updateTime) : message.updateTime;
                else
                    object.updateTime = options.longs === String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber() : message.updateTime;
            if (message.installSource != null && Object.hasOwnProperty.call(message, "installSource"))
                object.installSource = message.installSource;
            if (message.installReceipt != null && Object.hasOwnProperty.call(message, "installReceipt"))
                object.installReceipt = message.installReceipt;
            if (message.openuri != null && Object.hasOwnProperty.call(message, "openuri"))
                object.openuri = message.openuri;
            if (message.ddlEnabled != null && Object.hasOwnProperty.call(message, "ddlEnabled"))
                object.ddlEnabled = message.ddlEnabled;
            if (message.singularLinkResolveRequired != null && Object.hasOwnProperty.call(message, "singularLinkResolveRequired"))
                object.singularLinkResolveRequired = message.singularLinkResolveRequired;
            if (message.installRef != null && Object.hasOwnProperty.call(message, "installRef"))
                object.installRef = message.installRef;
            if (message.metaRef != null && Object.hasOwnProperty.call(message, "metaRef"))
                object.metaRef = message.metaRef;
            if (message.attributionToken != null && Object.hasOwnProperty.call(message, "attributionToken"))
                object.attributionToken = message.attributionToken;
            return object;
        };

        /**
         * Converts this SingularSessionRequest to JSON.
         * @function toJSON
         * @memberof BI.SingularSessionRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SingularSessionRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SingularSessionRequest
         * @function getTypeUrl
         * @memberof BI.SingularSessionRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SingularSessionRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SingularSessionRequest";
        };

        return SingularSessionRequest;
    })();

    BI.SingularEventRequest = (function() {

        /**
         * Properties of a SingularEventRequest.
         * @memberof BI
         * @interface ISingularEventRequest
         * @property {Array.<BI.ISingularDeviceIdentifier>|null} [deviceIdentifiers] SingularEventRequest deviceIdentifiers
         * @property {BI.ISingularSharedData|null} [sharedData] SingularEventRequest sharedData
         * @property {string|null} [eventName] SingularEventRequest eventName
         */

        /**
         * Constructs a new SingularEventRequest.
         * @memberof BI
         * @classdesc Represents a SingularEventRequest.
         * @implements ISingularEventRequest
         * @constructor
         * @param {BI.ISingularEventRequest=} [properties] Properties to set
         */
        function SingularEventRequest(properties) {
            this.deviceIdentifiers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SingularEventRequest deviceIdentifiers.
         * @member {Array.<BI.ISingularDeviceIdentifier>} deviceIdentifiers
         * @memberof BI.SingularEventRequest
         * @instance
         */
        SingularEventRequest.prototype.deviceIdentifiers = $util.emptyArray;

        /**
         * SingularEventRequest sharedData.
         * @member {BI.ISingularSharedData|null|undefined} sharedData
         * @memberof BI.SingularEventRequest
         * @instance
         */
        SingularEventRequest.prototype.sharedData = null;

        /**
         * SingularEventRequest eventName.
         * @member {string} eventName
         * @memberof BI.SingularEventRequest
         * @instance
         */
        SingularEventRequest.prototype.eventName = "";

        /**
         * Creates a new SingularEventRequest instance using the specified properties.
         * @function create
         * @memberof BI.SingularEventRequest
         * @static
         * @param {BI.ISingularEventRequest=} [properties] Properties to set
         * @returns {BI.SingularEventRequest} SingularEventRequest instance
         */
        SingularEventRequest.create = function create(properties) {
            return new SingularEventRequest(properties);
        };

        /**
         * Encodes the specified SingularEventRequest message. Does not implicitly {@link BI.SingularEventRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.SingularEventRequest
         * @static
         * @param {BI.ISingularEventRequest} message SingularEventRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SingularEventRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.deviceIdentifiers != null && message.deviceIdentifiers.length)
                for (let i = 0; i < message.deviceIdentifiers.length; ++i)
                    $root.BI.SingularDeviceIdentifier.encode(message.deviceIdentifiers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.sharedData != null && Object.hasOwnProperty.call(message, "sharedData"))
                $root.BI.SingularSharedData.encode(message.sharedData, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.eventName != null && Object.hasOwnProperty.call(message, "eventName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.eventName);
            return writer;
        };

        /**
         * Decodes a SingularEventRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.SingularEventRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.SingularEventRequest} SingularEventRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SingularEventRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.SingularEventRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.deviceIdentifiers && message.deviceIdentifiers.length))
                            message.deviceIdentifiers = [];
                        message.deviceIdentifiers.push($root.BI.SingularDeviceIdentifier.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        message.sharedData = $root.BI.SingularSharedData.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.eventName = reader.string();
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
         * Creates a SingularEventRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.SingularEventRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.SingularEventRequest} SingularEventRequest
         */
        SingularEventRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.SingularEventRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.SingularEventRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.SingularEventRequest();
            if (object.deviceIdentifiers) {
                if (!Array.isArray(object.deviceIdentifiers))
                    throw TypeError(".BI.SingularEventRequest.deviceIdentifiers: array expected");
                message.deviceIdentifiers = [];
                for (let i = 0; i < object.deviceIdentifiers.length; ++i) {
                    if (!$util.isObject(object.deviceIdentifiers[i]))
                        throw TypeError(".BI.SingularEventRequest.deviceIdentifiers: object expected");
                    message.deviceIdentifiers[i] = $root.BI.SingularDeviceIdentifier.fromObject(object.deviceIdentifiers[i], long + 1);
                }
            }
            if (object.sharedData != null) {
                if (!$util.isObject(object.sharedData))
                    throw TypeError(".BI.SingularEventRequest.sharedData: object expected");
                message.sharedData = $root.BI.SingularSharedData.fromObject(object.sharedData, long + 1);
            }
            if (object.eventName != null)
                message.eventName = String(object.eventName);
            return message;
        };

        /**
         * Creates a plain object from a SingularEventRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.SingularEventRequest
         * @static
         * @param {BI.SingularEventRequest} message SingularEventRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SingularEventRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.deviceIdentifiers = [];
            if (options.defaults) {
                object.sharedData = null;
                object.eventName = "";
            }
            if (message.deviceIdentifiers && message.deviceIdentifiers.length) {
                object.deviceIdentifiers = [];
                for (let j = 0; j < message.deviceIdentifiers.length; ++j)
                    object.deviceIdentifiers[j] = $root.BI.SingularDeviceIdentifier.toObject(message.deviceIdentifiers[j], options, q + 1);
            }
            if (message.sharedData != null && Object.hasOwnProperty.call(message, "sharedData"))
                object.sharedData = $root.BI.SingularSharedData.toObject(message.sharedData, options, q + 1);
            if (message.eventName != null && Object.hasOwnProperty.call(message, "eventName"))
                object.eventName = message.eventName;
            return object;
        };

        /**
         * Converts this SingularEventRequest to JSON.
         * @function toJSON
         * @memberof BI.SingularEventRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SingularEventRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SingularEventRequest
         * @function getTypeUrl
         * @memberof BI.SingularEventRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SingularEventRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.SingularEventRequest";
        };

        return SingularEventRequest;
    })();

    BI.ActivePamCountRequest = (function() {

        /**
         * Properties of an ActivePamCountRequest.
         * @memberof BI
         * @interface IActivePamCountRequest
         * @property {number|null} [enterpriseId] ActivePamCountRequest enterpriseId
         */

        /**
         * Constructs a new ActivePamCountRequest.
         * @memberof BI
         * @classdesc Represents an ActivePamCountRequest.
         * @implements IActivePamCountRequest
         * @constructor
         * @param {BI.IActivePamCountRequest=} [properties] Properties to set
         */
        function ActivePamCountRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActivePamCountRequest enterpriseId.
         * @member {number} enterpriseId
         * @memberof BI.ActivePamCountRequest
         * @instance
         */
        ActivePamCountRequest.prototype.enterpriseId = 0;

        /**
         * Creates a new ActivePamCountRequest instance using the specified properties.
         * @function create
         * @memberof BI.ActivePamCountRequest
         * @static
         * @param {BI.IActivePamCountRequest=} [properties] Properties to set
         * @returns {BI.ActivePamCountRequest} ActivePamCountRequest instance
         */
        ActivePamCountRequest.create = function create(properties) {
            return new ActivePamCountRequest(properties);
        };

        /**
         * Encodes the specified ActivePamCountRequest message. Does not implicitly {@link BI.ActivePamCountRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.ActivePamCountRequest
         * @static
         * @param {BI.IActivePamCountRequest} message ActivePamCountRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActivePamCountRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.enterpriseId);
            return writer;
        };

        /**
         * Decodes an ActivePamCountRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.ActivePamCountRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.ActivePamCountRequest} ActivePamCountRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActivePamCountRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.ActivePamCountRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.enterpriseId = reader.int32();
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
         * Creates an ActivePamCountRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.ActivePamCountRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.ActivePamCountRequest} ActivePamCountRequest
         */
        ActivePamCountRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.ActivePamCountRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.ActivePamCountRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.ActivePamCountRequest();
            if (object.enterpriseId != null)
                message.enterpriseId = object.enterpriseId | 0;
            return message;
        };

        /**
         * Creates a plain object from an ActivePamCountRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.ActivePamCountRequest
         * @static
         * @param {BI.ActivePamCountRequest} message ActivePamCountRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActivePamCountRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.enterpriseId = 0;
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                object.enterpriseId = message.enterpriseId;
            return object;
        };

        /**
         * Converts this ActivePamCountRequest to JSON.
         * @function toJSON
         * @memberof BI.ActivePamCountRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ActivePamCountRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ActivePamCountRequest
         * @function getTypeUrl
         * @memberof BI.ActivePamCountRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ActivePamCountRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.ActivePamCountRequest";
        };

        return ActivePamCountRequest;
    })();

    BI.ActivePamCountResponse = (function() {

        /**
         * Properties of an ActivePamCountResponse.
         * @memberof BI
         * @interface IActivePamCountResponse
         * @property {number|null} [pamCount] ActivePamCountResponse pamCount
         */

        /**
         * Constructs a new ActivePamCountResponse.
         * @memberof BI
         * @classdesc Represents an ActivePamCountResponse.
         * @implements IActivePamCountResponse
         * @constructor
         * @param {BI.IActivePamCountResponse=} [properties] Properties to set
         */
        function ActivePamCountResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActivePamCountResponse pamCount.
         * @member {number} pamCount
         * @memberof BI.ActivePamCountResponse
         * @instance
         */
        ActivePamCountResponse.prototype.pamCount = 0;

        /**
         * Creates a new ActivePamCountResponse instance using the specified properties.
         * @function create
         * @memberof BI.ActivePamCountResponse
         * @static
         * @param {BI.IActivePamCountResponse=} [properties] Properties to set
         * @returns {BI.ActivePamCountResponse} ActivePamCountResponse instance
         */
        ActivePamCountResponse.create = function create(properties) {
            return new ActivePamCountResponse(properties);
        };

        /**
         * Encodes the specified ActivePamCountResponse message. Does not implicitly {@link BI.ActivePamCountResponse.verify|verify} messages.
         * @function encode
         * @memberof BI.ActivePamCountResponse
         * @static
         * @param {BI.IActivePamCountResponse} message ActivePamCountResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActivePamCountResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.pamCount != null && Object.hasOwnProperty.call(message, "pamCount"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.pamCount);
            return writer;
        };

        /**
         * Decodes an ActivePamCountResponse message from the specified reader or buffer.
         * @function decode
         * @memberof BI.ActivePamCountResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.ActivePamCountResponse} ActivePamCountResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActivePamCountResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.ActivePamCountResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.pamCount = reader.int32();
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
         * Creates an ActivePamCountResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.ActivePamCountResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.ActivePamCountResponse} ActivePamCountResponse
         */
        ActivePamCountResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.ActivePamCountResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.ActivePamCountResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.ActivePamCountResponse();
            if (object.pamCount != null)
                message.pamCount = object.pamCount | 0;
            return message;
        };

        /**
         * Creates a plain object from an ActivePamCountResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.ActivePamCountResponse
         * @static
         * @param {BI.ActivePamCountResponse} message ActivePamCountResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActivePamCountResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                object.pamCount = 0;
            if (message.pamCount != null && Object.hasOwnProperty.call(message, "pamCount"))
                object.pamCount = message.pamCount;
            return object;
        };

        /**
         * Converts this ActivePamCountResponse to JSON.
         * @function toJSON
         * @memberof BI.ActivePamCountResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ActivePamCountResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ActivePamCountResponse
         * @function getTypeUrl
         * @memberof BI.ActivePamCountResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ActivePamCountResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.ActivePamCountResponse";
        };

        return ActivePamCountResponse;
    })();

    BI.NhiEnterpriseRequest = (function() {

        /**
         * Properties of a NhiEnterpriseRequest.
         * @memberof BI
         * @interface INhiEnterpriseRequest
         * @property {number|null} [enterpriseId] NhiEnterpriseRequest enterpriseId
         * @property {number|null} [startTime] NhiEnterpriseRequest startTime
         * @property {number|null} [endTime] NhiEnterpriseRequest endTime
         */

        /**
         * Constructs a new NhiEnterpriseRequest.
         * @memberof BI
         * @classdesc Represents a NhiEnterpriseRequest.
         * @implements INhiEnterpriseRequest
         * @constructor
         * @param {BI.INhiEnterpriseRequest=} [properties] Properties to set
         */
        function NhiEnterpriseRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NhiEnterpriseRequest enterpriseId.
         * @member {number} enterpriseId
         * @memberof BI.NhiEnterpriseRequest
         * @instance
         */
        NhiEnterpriseRequest.prototype.enterpriseId = 0;

        /**
         * NhiEnterpriseRequest startTime.
         * @member {number} startTime
         * @memberof BI.NhiEnterpriseRequest
         * @instance
         */
        NhiEnterpriseRequest.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NhiEnterpriseRequest endTime.
         * @member {number} endTime
         * @memberof BI.NhiEnterpriseRequest
         * @instance
         */
        NhiEnterpriseRequest.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new NhiEnterpriseRequest instance using the specified properties.
         * @function create
         * @memberof BI.NhiEnterpriseRequest
         * @static
         * @param {BI.INhiEnterpriseRequest=} [properties] Properties to set
         * @returns {BI.NhiEnterpriseRequest} NhiEnterpriseRequest instance
         */
        NhiEnterpriseRequest.create = function create(properties) {
            return new NhiEnterpriseRequest(properties);
        };

        /**
         * Encodes the specified NhiEnterpriseRequest message. Does not implicitly {@link BI.NhiEnterpriseRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.NhiEnterpriseRequest
         * @static
         * @param {BI.INhiEnterpriseRequest} message NhiEnterpriseRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NhiEnterpriseRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.enterpriseId);
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.startTime);
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.endTime);
            return writer;
        };

        /**
         * Decodes a NhiEnterpriseRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NhiEnterpriseRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NhiEnterpriseRequest} NhiEnterpriseRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NhiEnterpriseRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NhiEnterpriseRequest();
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
                        message.startTime = reader.int64();
                        break;
                    }
                case 3: {
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
         * Creates a NhiEnterpriseRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof BI.NhiEnterpriseRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NhiEnterpriseRequest} NhiEnterpriseRequest
         */
        NhiEnterpriseRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NhiEnterpriseRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.NhiEnterpriseRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.NhiEnterpriseRequest();
            if (object.enterpriseId != null)
                message.enterpriseId = object.enterpriseId | 0;
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
         * Creates a plain object from a NhiEnterpriseRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NhiEnterpriseRequest
         * @static
         * @param {BI.NhiEnterpriseRequest} message NhiEnterpriseRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NhiEnterpriseRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.enterpriseId = 0;
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
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                object.enterpriseId = message.enterpriseId;
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
         * Converts this NhiEnterpriseRequest to JSON.
         * @function toJSON
         * @memberof BI.NhiEnterpriseRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NhiEnterpriseRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NhiEnterpriseRequest
         * @function getTypeUrl
         * @memberof BI.NhiEnterpriseRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NhiEnterpriseRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NhiEnterpriseRequest";
        };

        return NhiEnterpriseRequest;
    })();

    BI.NhiMetricsRequest = (function() {

        /**
         * Properties of a NhiMetricsRequest.
         * @memberof BI
         * @interface INhiMetricsRequest
         * @property {Array.<number>|null} [enterpriseIds] NhiMetricsRequest enterpriseIds
         * @property {number|null} [startTime] NhiMetricsRequest startTime
         * @property {number|null} [endTime] NhiMetricsRequest endTime
         * @property {Array.<BI.INhiEnterpriseRequest>|null} [enterprises] NhiMetricsRequest enterprises
         */

        /**
         * Constructs a new NhiMetricsRequest.
         * @memberof BI
         * @classdesc Represents a NhiMetricsRequest.
         * @implements INhiMetricsRequest
         * @constructor
         * @param {BI.INhiMetricsRequest=} [properties] Properties to set
         */
        function NhiMetricsRequest(properties) {
            this.enterpriseIds = [];
            this.enterprises = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NhiMetricsRequest enterpriseIds.
         * @member {Array.<number>} enterpriseIds
         * @memberof BI.NhiMetricsRequest
         * @instance
         */
        NhiMetricsRequest.prototype.enterpriseIds = $util.emptyArray;

        /**
         * NhiMetricsRequest startTime.
         * @member {number} startTime
         * @memberof BI.NhiMetricsRequest
         * @instance
         */
        NhiMetricsRequest.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NhiMetricsRequest endTime.
         * @member {number} endTime
         * @memberof BI.NhiMetricsRequest
         * @instance
         */
        NhiMetricsRequest.prototype.endTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NhiMetricsRequest enterprises.
         * @member {Array.<BI.INhiEnterpriseRequest>} enterprises
         * @memberof BI.NhiMetricsRequest
         * @instance
         */
        NhiMetricsRequest.prototype.enterprises = $util.emptyArray;

        /**
         * Creates a new NhiMetricsRequest instance using the specified properties.
         * @function create
         * @memberof BI.NhiMetricsRequest
         * @static
         * @param {BI.INhiMetricsRequest=} [properties] Properties to set
         * @returns {BI.NhiMetricsRequest} NhiMetricsRequest instance
         */
        NhiMetricsRequest.create = function create(properties) {
            return new NhiMetricsRequest(properties);
        };

        /**
         * Encodes the specified NhiMetricsRequest message. Does not implicitly {@link BI.NhiMetricsRequest.verify|verify} messages.
         * @function encode
         * @memberof BI.NhiMetricsRequest
         * @static
         * @param {BI.INhiMetricsRequest} message NhiMetricsRequest message or plain object to encode
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
            if (message.enterpriseIds != null && message.enterpriseIds.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.enterpriseIds.length; ++i)
                    writer.int32(message.enterpriseIds[i]);
                writer.ldelim();
            }
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.startTime);
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.endTime);
            if (message.enterprises != null && message.enterprises.length)
                for (let i = 0; i < message.enterprises.length; ++i)
                    $root.BI.NhiEnterpriseRequest.encode(message.enterprises[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a NhiMetricsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof BI.NhiMetricsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {BI.NhiMetricsRequest} NhiMetricsRequest
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
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.BI.NhiMetricsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.enterpriseIds && message.enterpriseIds.length))
                            message.enterpriseIds = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.enterpriseIds.push(reader.int32());
                        } else
                            message.enterpriseIds.push(reader.int32());
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
                        if (!(message.enterprises && message.enterprises.length))
                            message.enterprises = [];
                        message.enterprises.push($root.BI.NhiEnterpriseRequest.decode(reader, reader.uint32(), undefined, long + 1));
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
         * @memberof BI.NhiMetricsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {BI.NhiMetricsRequest} NhiMetricsRequest
         */
        NhiMetricsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.BI.NhiMetricsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".BI.NhiMetricsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.BI.NhiMetricsRequest();
            if (object.enterpriseIds) {
                if (!Array.isArray(object.enterpriseIds))
                    throw TypeError(".BI.NhiMetricsRequest.enterpriseIds: array expected");
                message.enterpriseIds = [];
                for (let i = 0; i < object.enterpriseIds.length; ++i)
                    message.enterpriseIds[i] = object.enterpriseIds[i] | 0;
            }
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
            if (object.enterprises) {
                if (!Array.isArray(object.enterprises))
                    throw TypeError(".BI.NhiMetricsRequest.enterprises: array expected");
                message.enterprises = [];
                for (let i = 0; i < object.enterprises.length; ++i) {
                    if (!$util.isObject(object.enterprises[i]))
                        throw TypeError(".BI.NhiMetricsRequest.enterprises: object expected");
                    message.enterprises[i] = $root.BI.NhiEnterpriseRequest.fromObject(object.enterprises[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a NhiMetricsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof BI.NhiMetricsRequest
         * @static
         * @param {BI.NhiMetricsRequest} message NhiMetricsRequest
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
            if (options.arrays || options.defaults) {
                object.enterpriseIds = [];
                object.enterprises = [];
            }
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
            if (message.enterpriseIds && message.enterpriseIds.length) {
                object.enterpriseIds = [];
                for (let j = 0; j < message.enterpriseIds.length; ++j)
                    object.enterpriseIds[j] = message.enterpriseIds[j];
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
            if (message.enterprises && message.enterprises.length) {
                object.enterprises = [];
                for (let j = 0; j < message.enterprises.length; ++j)
                    object.enterprises[j] = $root.BI.NhiEnterpriseRequest.toObject(message.enterprises[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this NhiMetricsRequest to JSON.
         * @function toJSON
         * @memberof BI.NhiMetricsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NhiMetricsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NhiMetricsRequest
         * @function getTypeUrl
         * @memberof BI.NhiMetricsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NhiMetricsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/BI.NhiMetricsRequest";
        };

        return NhiMetricsRequest;
    })();

    return BI;
})();

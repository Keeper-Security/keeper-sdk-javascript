/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const Authentication = $root.Authentication = (() => {

    /**
     * Namespace Authentication.
     * @exports Authentication
     * @namespace
     */
    const Authentication = {};

    /**
     * SupportedLanguage enum.
     * @name Authentication.SupportedLanguage
     * @enum {string}
     * @property {number} ENGLISH=0 ENGLISH value
     * @property {number} ARABIC=1 ARABIC value
     * @property {number} BRITISH=2 BRITISH value
     * @property {number} CHINESE=3 CHINESE value
     * @property {number} CHINESE_HONG_KONG=4 CHINESE_HONG_KONG value
     * @property {number} CHINESE_TAIWAN=5 CHINESE_TAIWAN value
     * @property {number} DUTCH=6 DUTCH value
     * @property {number} FRENCH=7 FRENCH value
     * @property {number} GERMAN=8 GERMAN value
     * @property {number} GREEK=9 GREEK value
     * @property {number} HEBREW=10 HEBREW value
     * @property {number} ITALIAN=11 ITALIAN value
     * @property {number} JAPANESE=12 JAPANESE value
     * @property {number} KOREAN=13 KOREAN value
     * @property {number} POLISH=14 POLISH value
     * @property {number} PORTUGUESE=15 PORTUGUESE value
     * @property {number} PORTUGUESE_BRAZIL=16 PORTUGUESE_BRAZIL value
     * @property {number} ROMANIAN=17 ROMANIAN value
     * @property {number} RUSSIAN=18 RUSSIAN value
     * @property {number} SLOVAK=19 SLOVAK value
     * @property {number} SPANISH=20 SPANISH value
     */
    Authentication.SupportedLanguage = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ENGLISH"] = 0;
        values[valuesById[1] = "ARABIC"] = 1;
        values[valuesById[2] = "BRITISH"] = 2;
        values[valuesById[3] = "CHINESE"] = 3;
        values[valuesById[4] = "CHINESE_HONG_KONG"] = 4;
        values[valuesById[5] = "CHINESE_TAIWAN"] = 5;
        values[valuesById[6] = "DUTCH"] = 6;
        values[valuesById[7] = "FRENCH"] = 7;
        values[valuesById[8] = "GERMAN"] = 8;
        values[valuesById[9] = "GREEK"] = 9;
        values[valuesById[10] = "HEBREW"] = 10;
        values[valuesById[11] = "ITALIAN"] = 11;
        values[valuesById[12] = "JAPANESE"] = 12;
        values[valuesById[13] = "KOREAN"] = 13;
        values[valuesById[14] = "POLISH"] = 14;
        values[valuesById[15] = "PORTUGUESE"] = 15;
        values[valuesById[16] = "PORTUGUESE_BRAZIL"] = 16;
        values[valuesById[17] = "ROMANIAN"] = 17;
        values[valuesById[18] = "RUSSIAN"] = 18;
        values[valuesById[19] = "SLOVAK"] = 19;
        values[valuesById[20] = "SPANISH"] = 20;
        return values;
    })();

    /**
     * LoginType enum.
     * @name Authentication.LoginType
     * @enum {string}
     * @property {number} NORMAL=0 NORMAL value
     * @property {number} SSO=1 SSO value
     * @property {number} BIO=2 BIO value
     * @property {number} ALTERNATE=3 ALTERNATE value
     * @property {number} OFFLINE=4 OFFLINE value
     */
    Authentication.LoginType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NORMAL"] = 0;
        values[valuesById[1] = "SSO"] = 1;
        values[valuesById[2] = "BIO"] = 2;
        values[valuesById[3] = "ALTERNATE"] = 3;
        values[valuesById[4] = "OFFLINE"] = 4;
        return values;
    })();

    /**
     * DeviceStatus enum.
     * @name Authentication.DeviceStatus
     * @enum {string}
     * @property {number} NEED_APPROVAL=0 NEED_APPROVAL value
     * @property {number} OK=1 OK value
     * @property {number} DEVICE_DISABLED=2 DEVICE_DISABLED value
     */
    Authentication.DeviceStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NEED_APPROVAL"] = 0;
        values[valuesById[1] = "OK"] = 1;
        values[valuesById[2] = "DEVICE_DISABLED"] = 2;
        return values;
    })();

    /**
     * LicenseStatus enum.
     * @name Authentication.LicenseStatus
     * @enum {string}
     * @property {number} OTHER=0 OTHER value
     * @property {number} ACTIVE=1 ACTIVE value
     * @property {number} EXPIRED=2 EXPIRED value
     * @property {number} DISABLED=3 DISABLED value
     */
    Authentication.LicenseStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "OTHER"] = 0;
        values[valuesById[1] = "ACTIVE"] = 1;
        values[valuesById[2] = "EXPIRED"] = 2;
        values[valuesById[3] = "DISABLED"] = 3;
        return values;
    })();

    /**
     * AccountType enum.
     * @name Authentication.AccountType
     * @enum {string}
     * @property {number} CONSUMER=0 CONSUMER value
     * @property {number} FAMILY=1 FAMILY value
     * @property {number} ENTERPRISE=2 ENTERPRISE value
     */
    Authentication.AccountType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CONSUMER"] = 0;
        values[valuesById[1] = "FAMILY"] = 1;
        values[valuesById[2] = "ENTERPRISE"] = 2;
        return values;
    })();

    /**
     * SessionTokenType enum.
     * @name Authentication.SessionTokenType
     * @enum {string}
     * @property {number} NO_RESTRICTION=0 NO_RESTRICTION value
     * @property {number} ACCOUNT_RECOVERY=1 ACCOUNT_RECOVERY value
     * @property {number} SHARE_ACCOUNT=2 SHARE_ACCOUNT value
     * @property {number} PURCHASE=3 PURCHASE value
     * @property {number} RESTRICT=4 RESTRICT value
     * @property {number} ACCEPT_INVITE=5 ACCEPT_INVITE value
     */
    Authentication.SessionTokenType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NO_RESTRICTION"] = 0;
        values[valuesById[1] = "ACCOUNT_RECOVERY"] = 1;
        values[valuesById[2] = "SHARE_ACCOUNT"] = 2;
        values[valuesById[3] = "PURCHASE"] = 3;
        values[valuesById[4] = "RESTRICT"] = 4;
        values[valuesById[5] = "ACCEPT_INVITE"] = 5;
        return values;
    })();

    Authentication.ApiRequest = (function() {

        /**
         * Properties of an ApiRequest.
         * @memberof Authentication
         * @interface IApiRequest
         * @property {Uint8Array|null} [encryptedTransmissionKey] ApiRequest encryptedTransmissionKey
         * @property {number|null} [publicKeyId] ApiRequest publicKeyId
         * @property {string|null} [locale] ApiRequest locale
         * @property {Uint8Array|null} [encryptedPayload] ApiRequest encryptedPayload
         */

        /**
         * Constructs a new ApiRequest.
         * @memberof Authentication
         * @classdesc Represents an ApiRequest.
         * @implements IApiRequest
         * @constructor
         * @param {Authentication.IApiRequest=} [properties] Properties to set
         */
        function ApiRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApiRequest encryptedTransmissionKey.
         * @member {Uint8Array} encryptedTransmissionKey
         * @memberof Authentication.ApiRequest
         * @instance
         */
        ApiRequest.prototype.encryptedTransmissionKey = $util.newBuffer([]);

        /**
         * ApiRequest publicKeyId.
         * @member {number} publicKeyId
         * @memberof Authentication.ApiRequest
         * @instance
         */
        ApiRequest.prototype.publicKeyId = 0;

        /**
         * ApiRequest locale.
         * @member {string} locale
         * @memberof Authentication.ApiRequest
         * @instance
         */
        ApiRequest.prototype.locale = "";

        /**
         * ApiRequest encryptedPayload.
         * @member {Uint8Array} encryptedPayload
         * @memberof Authentication.ApiRequest
         * @instance
         */
        ApiRequest.prototype.encryptedPayload = $util.newBuffer([]);

        /**
         * Creates a new ApiRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.ApiRequest
         * @static
         * @param {Authentication.IApiRequest=} [properties] Properties to set
         * @returns {Authentication.ApiRequest} ApiRequest instance
         */
        ApiRequest.create = function create(properties) {
            return new ApiRequest(properties);
        };

        /**
         * Encodes the specified ApiRequest message. Does not implicitly {@link Authentication.ApiRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.ApiRequest
         * @static
         * @param {Authentication.IApiRequest} message ApiRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.encryptedTransmissionKey != null && message.hasOwnProperty("encryptedTransmissionKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encryptedTransmissionKey);
            if (message.publicKeyId != null && message.hasOwnProperty("publicKeyId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.publicKeyId);
            if (message.locale != null && message.hasOwnProperty("locale"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.locale);
            if (message.encryptedPayload != null && message.hasOwnProperty("encryptedPayload"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.encryptedPayload);
            return writer;
        };

        /**
         * Encodes the specified ApiRequest message, length delimited. Does not implicitly {@link Authentication.ApiRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.ApiRequest
         * @static
         * @param {Authentication.IApiRequest} message ApiRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ApiRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.ApiRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.ApiRequest} ApiRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.ApiRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.encryptedTransmissionKey = reader.bytes();
                    break;
                case 2:
                    message.publicKeyId = reader.int32();
                    break;
                case 3:
                    message.locale = reader.string();
                    break;
                case 4:
                    message.encryptedPayload = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ApiRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.ApiRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.ApiRequest} ApiRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApiRequest message.
         * @function verify
         * @memberof Authentication.ApiRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApiRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.encryptedTransmissionKey != null && message.hasOwnProperty("encryptedTransmissionKey"))
                if (!(message.encryptedTransmissionKey && typeof message.encryptedTransmissionKey.length === "number" || $util.isString(message.encryptedTransmissionKey)))
                    return "encryptedTransmissionKey: buffer expected";
            if (message.publicKeyId != null && message.hasOwnProperty("publicKeyId"))
                if (!$util.isInteger(message.publicKeyId))
                    return "publicKeyId: integer expected";
            if (message.locale != null && message.hasOwnProperty("locale"))
                if (!$util.isString(message.locale))
                    return "locale: string expected";
            if (message.encryptedPayload != null && message.hasOwnProperty("encryptedPayload"))
                if (!(message.encryptedPayload && typeof message.encryptedPayload.length === "number" || $util.isString(message.encryptedPayload)))
                    return "encryptedPayload: buffer expected";
            return null;
        };

        /**
         * Creates an ApiRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.ApiRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.ApiRequest} ApiRequest
         */
        ApiRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.ApiRequest)
                return object;
            let message = new $root.Authentication.ApiRequest();
            if (object.encryptedTransmissionKey != null)
                if (typeof object.encryptedTransmissionKey === "string")
                    $util.base64.decode(object.encryptedTransmissionKey, message.encryptedTransmissionKey = $util.newBuffer($util.base64.length(object.encryptedTransmissionKey)), 0);
                else if (object.encryptedTransmissionKey.length)
                    message.encryptedTransmissionKey = object.encryptedTransmissionKey;
            if (object.publicKeyId != null)
                message.publicKeyId = object.publicKeyId | 0;
            if (object.locale != null)
                message.locale = String(object.locale);
            if (object.encryptedPayload != null)
                if (typeof object.encryptedPayload === "string")
                    $util.base64.decode(object.encryptedPayload, message.encryptedPayload = $util.newBuffer($util.base64.length(object.encryptedPayload)), 0);
                else if (object.encryptedPayload.length)
                    message.encryptedPayload = object.encryptedPayload;
            return message;
        };

        /**
         * Creates a plain object from an ApiRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.ApiRequest
         * @static
         * @param {Authentication.ApiRequest} message ApiRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApiRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.encryptedTransmissionKey = "";
                else {
                    object.encryptedTransmissionKey = [];
                    if (options.bytes !== Array)
                        object.encryptedTransmissionKey = $util.newBuffer(object.encryptedTransmissionKey);
                }
                object.publicKeyId = 0;
                object.locale = "";
                if (options.bytes === String)
                    object.encryptedPayload = "";
                else {
                    object.encryptedPayload = [];
                    if (options.bytes !== Array)
                        object.encryptedPayload = $util.newBuffer(object.encryptedPayload);
                }
            }
            if (message.encryptedTransmissionKey != null && message.hasOwnProperty("encryptedTransmissionKey"))
                object.encryptedTransmissionKey = options.bytes === String ? $util.base64.encode(message.encryptedTransmissionKey, 0, message.encryptedTransmissionKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedTransmissionKey) : message.encryptedTransmissionKey;
            if (message.publicKeyId != null && message.hasOwnProperty("publicKeyId"))
                object.publicKeyId = message.publicKeyId;
            if (message.locale != null && message.hasOwnProperty("locale"))
                object.locale = message.locale;
            if (message.encryptedPayload != null && message.hasOwnProperty("encryptedPayload"))
                object.encryptedPayload = options.bytes === String ? $util.base64.encode(message.encryptedPayload, 0, message.encryptedPayload.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedPayload) : message.encryptedPayload;
            return object;
        };

        /**
         * Converts this ApiRequest to JSON.
         * @function toJSON
         * @memberof Authentication.ApiRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApiRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ApiRequest;
    })();

    Authentication.ApiRequestPayload = (function() {

        /**
         * Properties of an ApiRequestPayload.
         * @memberof Authentication
         * @interface IApiRequestPayload
         * @property {Uint8Array|null} [payload] ApiRequestPayload payload
         * @property {Uint8Array|null} [encryptedSessionToken] ApiRequestPayload encryptedSessionToken
         * @property {Uint8Array|null} [timeToken] ApiRequestPayload timeToken
         * @property {number|null} [apiVersion] ApiRequestPayload apiVersion
         */

        /**
         * Constructs a new ApiRequestPayload.
         * @memberof Authentication
         * @classdesc Represents an ApiRequestPayload.
         * @implements IApiRequestPayload
         * @constructor
         * @param {Authentication.IApiRequestPayload=} [properties] Properties to set
         */
        function ApiRequestPayload(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApiRequestPayload payload.
         * @member {Uint8Array} payload
         * @memberof Authentication.ApiRequestPayload
         * @instance
         */
        ApiRequestPayload.prototype.payload = $util.newBuffer([]);

        /**
         * ApiRequestPayload encryptedSessionToken.
         * @member {Uint8Array} encryptedSessionToken
         * @memberof Authentication.ApiRequestPayload
         * @instance
         */
        ApiRequestPayload.prototype.encryptedSessionToken = $util.newBuffer([]);

        /**
         * ApiRequestPayload timeToken.
         * @member {Uint8Array} timeToken
         * @memberof Authentication.ApiRequestPayload
         * @instance
         */
        ApiRequestPayload.prototype.timeToken = $util.newBuffer([]);

        /**
         * ApiRequestPayload apiVersion.
         * @member {number} apiVersion
         * @memberof Authentication.ApiRequestPayload
         * @instance
         */
        ApiRequestPayload.prototype.apiVersion = 0;

        /**
         * Creates a new ApiRequestPayload instance using the specified properties.
         * @function create
         * @memberof Authentication.ApiRequestPayload
         * @static
         * @param {Authentication.IApiRequestPayload=} [properties] Properties to set
         * @returns {Authentication.ApiRequestPayload} ApiRequestPayload instance
         */
        ApiRequestPayload.create = function create(properties) {
            return new ApiRequestPayload(properties);
        };

        /**
         * Encodes the specified ApiRequestPayload message. Does not implicitly {@link Authentication.ApiRequestPayload.verify|verify} messages.
         * @function encode
         * @memberof Authentication.ApiRequestPayload
         * @static
         * @param {Authentication.IApiRequestPayload} message ApiRequestPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiRequestPayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.payload != null && message.hasOwnProperty("payload"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.payload);
            if (message.encryptedSessionToken != null && message.hasOwnProperty("encryptedSessionToken"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.encryptedSessionToken);
            if (message.timeToken != null && message.hasOwnProperty("timeToken"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.timeToken);
            if (message.apiVersion != null && message.hasOwnProperty("apiVersion"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.apiVersion);
            return writer;
        };

        /**
         * Encodes the specified ApiRequestPayload message, length delimited. Does not implicitly {@link Authentication.ApiRequestPayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.ApiRequestPayload
         * @static
         * @param {Authentication.IApiRequestPayload} message ApiRequestPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApiRequestPayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ApiRequestPayload message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.ApiRequestPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.ApiRequestPayload} ApiRequestPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiRequestPayload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.ApiRequestPayload();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.payload = reader.bytes();
                    break;
                case 2:
                    message.encryptedSessionToken = reader.bytes();
                    break;
                case 3:
                    message.timeToken = reader.bytes();
                    break;
                case 4:
                    message.apiVersion = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ApiRequestPayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.ApiRequestPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.ApiRequestPayload} ApiRequestPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApiRequestPayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApiRequestPayload message.
         * @function verify
         * @memberof Authentication.ApiRequestPayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApiRequestPayload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.payload != null && message.hasOwnProperty("payload"))
                if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                    return "payload: buffer expected";
            if (message.encryptedSessionToken != null && message.hasOwnProperty("encryptedSessionToken"))
                if (!(message.encryptedSessionToken && typeof message.encryptedSessionToken.length === "number" || $util.isString(message.encryptedSessionToken)))
                    return "encryptedSessionToken: buffer expected";
            if (message.timeToken != null && message.hasOwnProperty("timeToken"))
                if (!(message.timeToken && typeof message.timeToken.length === "number" || $util.isString(message.timeToken)))
                    return "timeToken: buffer expected";
            if (message.apiVersion != null && message.hasOwnProperty("apiVersion"))
                if (!$util.isInteger(message.apiVersion))
                    return "apiVersion: integer expected";
            return null;
        };

        /**
         * Creates an ApiRequestPayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.ApiRequestPayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.ApiRequestPayload} ApiRequestPayload
         */
        ApiRequestPayload.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.ApiRequestPayload)
                return object;
            let message = new $root.Authentication.ApiRequestPayload();
            if (object.payload != null)
                if (typeof object.payload === "string")
                    $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                else if (object.payload.length)
                    message.payload = object.payload;
            if (object.encryptedSessionToken != null)
                if (typeof object.encryptedSessionToken === "string")
                    $util.base64.decode(object.encryptedSessionToken, message.encryptedSessionToken = $util.newBuffer($util.base64.length(object.encryptedSessionToken)), 0);
                else if (object.encryptedSessionToken.length)
                    message.encryptedSessionToken = object.encryptedSessionToken;
            if (object.timeToken != null)
                if (typeof object.timeToken === "string")
                    $util.base64.decode(object.timeToken, message.timeToken = $util.newBuffer($util.base64.length(object.timeToken)), 0);
                else if (object.timeToken.length)
                    message.timeToken = object.timeToken;
            if (object.apiVersion != null)
                message.apiVersion = object.apiVersion | 0;
            return message;
        };

        /**
         * Creates a plain object from an ApiRequestPayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.ApiRequestPayload
         * @static
         * @param {Authentication.ApiRequestPayload} message ApiRequestPayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApiRequestPayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.payload = "";
                else {
                    object.payload = [];
                    if (options.bytes !== Array)
                        object.payload = $util.newBuffer(object.payload);
                }
                if (options.bytes === String)
                    object.encryptedSessionToken = "";
                else {
                    object.encryptedSessionToken = [];
                    if (options.bytes !== Array)
                        object.encryptedSessionToken = $util.newBuffer(object.encryptedSessionToken);
                }
                if (options.bytes === String)
                    object.timeToken = "";
                else {
                    object.timeToken = [];
                    if (options.bytes !== Array)
                        object.timeToken = $util.newBuffer(object.timeToken);
                }
                object.apiVersion = 0;
            }
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
            if (message.encryptedSessionToken != null && message.hasOwnProperty("encryptedSessionToken"))
                object.encryptedSessionToken = options.bytes === String ? $util.base64.encode(message.encryptedSessionToken, 0, message.encryptedSessionToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedSessionToken) : message.encryptedSessionToken;
            if (message.timeToken != null && message.hasOwnProperty("timeToken"))
                object.timeToken = options.bytes === String ? $util.base64.encode(message.timeToken, 0, message.timeToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.timeToken) : message.timeToken;
            if (message.apiVersion != null && message.hasOwnProperty("apiVersion"))
                object.apiVersion = message.apiVersion;
            return object;
        };

        /**
         * Converts this ApiRequestPayload to JSON.
         * @function toJSON
         * @memberof Authentication.ApiRequestPayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApiRequestPayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ApiRequestPayload;
    })();

    Authentication.Transform = (function() {

        /**
         * Properties of a Transform.
         * @memberof Authentication
         * @interface ITransform
         * @property {Uint8Array|null} [key] Transform key
         * @property {Uint8Array|null} [encryptedDeviceToken] Transform encryptedDeviceToken
         */

        /**
         * Constructs a new Transform.
         * @memberof Authentication
         * @classdesc Represents a Transform.
         * @implements ITransform
         * @constructor
         * @param {Authentication.ITransform=} [properties] Properties to set
         */
        function Transform(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Transform key.
         * @member {Uint8Array} key
         * @memberof Authentication.Transform
         * @instance
         */
        Transform.prototype.key = $util.newBuffer([]);

        /**
         * Transform encryptedDeviceToken.
         * @member {Uint8Array} encryptedDeviceToken
         * @memberof Authentication.Transform
         * @instance
         */
        Transform.prototype.encryptedDeviceToken = $util.newBuffer([]);

        /**
         * Creates a new Transform instance using the specified properties.
         * @function create
         * @memberof Authentication.Transform
         * @static
         * @param {Authentication.ITransform=} [properties] Properties to set
         * @returns {Authentication.Transform} Transform instance
         */
        Transform.create = function create(properties) {
            return new Transform(properties);
        };

        /**
         * Encodes the specified Transform message. Does not implicitly {@link Authentication.Transform.verify|verify} messages.
         * @function encode
         * @memberof Authentication.Transform
         * @static
         * @param {Authentication.ITransform} message Transform message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transform.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.key != null && message.hasOwnProperty("key"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.key);
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.encryptedDeviceToken);
            return writer;
        };

        /**
         * Encodes the specified Transform message, length delimited. Does not implicitly {@link Authentication.Transform.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.Transform
         * @static
         * @param {Authentication.ITransform} message Transform message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Transform.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Transform message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.Transform
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.Transform} Transform
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transform.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.Transform();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.key = reader.bytes();
                    break;
                case 2:
                    message.encryptedDeviceToken = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Transform message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.Transform
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.Transform} Transform
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Transform.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Transform message.
         * @function verify
         * @memberof Authentication.Transform
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Transform.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                if (!(message.encryptedDeviceToken && typeof message.encryptedDeviceToken.length === "number" || $util.isString(message.encryptedDeviceToken)))
                    return "encryptedDeviceToken: buffer expected";
            return null;
        };

        /**
         * Creates a Transform message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.Transform
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.Transform} Transform
         */
        Transform.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.Transform)
                return object;
            let message = new $root.Authentication.Transform();
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length)
                    message.key = object.key;
            if (object.encryptedDeviceToken != null)
                if (typeof object.encryptedDeviceToken === "string")
                    $util.base64.decode(object.encryptedDeviceToken, message.encryptedDeviceToken = $util.newBuffer($util.base64.length(object.encryptedDeviceToken)), 0);
                else if (object.encryptedDeviceToken.length)
                    message.encryptedDeviceToken = object.encryptedDeviceToken;
            return message;
        };

        /**
         * Creates a plain object from a Transform message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.Transform
         * @static
         * @param {Authentication.Transform} message Transform
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Transform.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                if (options.bytes === String)
                    object.encryptedDeviceToken = "";
                else {
                    object.encryptedDeviceToken = [];
                    if (options.bytes !== Array)
                        object.encryptedDeviceToken = $util.newBuffer(object.encryptedDeviceToken);
                }
            }
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                object.encryptedDeviceToken = options.bytes === String ? $util.base64.encode(message.encryptedDeviceToken, 0, message.encryptedDeviceToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedDeviceToken) : message.encryptedDeviceToken;
            return object;
        };

        /**
         * Converts this Transform to JSON.
         * @function toJSON
         * @memberof Authentication.Transform
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Transform.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Transform;
    })();

    Authentication.DeviceRequest = (function() {

        /**
         * Properties of a DeviceRequest.
         * @memberof Authentication
         * @interface IDeviceRequest
         * @property {string|null} [clientVersion] DeviceRequest clientVersion
         * @property {string|null} [deviceName] DeviceRequest deviceName
         */

        /**
         * Constructs a new DeviceRequest.
         * @memberof Authentication
         * @classdesc Represents a DeviceRequest.
         * @implements IDeviceRequest
         * @constructor
         * @param {Authentication.IDeviceRequest=} [properties] Properties to set
         */
        function DeviceRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeviceRequest clientVersion.
         * @member {string} clientVersion
         * @memberof Authentication.DeviceRequest
         * @instance
         */
        DeviceRequest.prototype.clientVersion = "";

        /**
         * DeviceRequest deviceName.
         * @member {string} deviceName
         * @memberof Authentication.DeviceRequest
         * @instance
         */
        DeviceRequest.prototype.deviceName = "";

        /**
         * Creates a new DeviceRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.DeviceRequest
         * @static
         * @param {Authentication.IDeviceRequest=} [properties] Properties to set
         * @returns {Authentication.DeviceRequest} DeviceRequest instance
         */
        DeviceRequest.create = function create(properties) {
            return new DeviceRequest(properties);
        };

        /**
         * Encodes the specified DeviceRequest message. Does not implicitly {@link Authentication.DeviceRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.DeviceRequest
         * @static
         * @param {Authentication.IDeviceRequest} message DeviceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientVersion);
            if (message.deviceName != null && message.hasOwnProperty("deviceName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.deviceName);
            return writer;
        };

        /**
         * Encodes the specified DeviceRequest message, length delimited. Does not implicitly {@link Authentication.DeviceRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.DeviceRequest
         * @static
         * @param {Authentication.IDeviceRequest} message DeviceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeviceRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.DeviceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.DeviceRequest} DeviceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.DeviceRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.clientVersion = reader.string();
                    break;
                case 2:
                    message.deviceName = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DeviceRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.DeviceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.DeviceRequest} DeviceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeviceRequest message.
         * @function verify
         * @memberof Authentication.DeviceRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeviceRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                if (!$util.isString(message.clientVersion))
                    return "clientVersion: string expected";
            if (message.deviceName != null && message.hasOwnProperty("deviceName"))
                if (!$util.isString(message.deviceName))
                    return "deviceName: string expected";
            return null;
        };

        /**
         * Creates a DeviceRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.DeviceRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.DeviceRequest} DeviceRequest
         */
        DeviceRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.DeviceRequest)
                return object;
            let message = new $root.Authentication.DeviceRequest();
            if (object.clientVersion != null)
                message.clientVersion = String(object.clientVersion);
            if (object.deviceName != null)
                message.deviceName = String(object.deviceName);
            return message;
        };

        /**
         * Creates a plain object from a DeviceRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.DeviceRequest
         * @static
         * @param {Authentication.DeviceRequest} message DeviceRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeviceRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.clientVersion = "";
                object.deviceName = "";
            }
            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                object.clientVersion = message.clientVersion;
            if (message.deviceName != null && message.hasOwnProperty("deviceName"))
                object.deviceName = message.deviceName;
            return object;
        };

        /**
         * Converts this DeviceRequest to JSON.
         * @function toJSON
         * @memberof Authentication.DeviceRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeviceRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DeviceRequest;
    })();

    Authentication.AuthRequest = (function() {

        /**
         * Properties of an AuthRequest.
         * @memberof Authentication
         * @interface IAuthRequest
         * @property {string|null} [clientVersion] AuthRequest clientVersion
         * @property {string|null} [username] AuthRequest username
         * @property {Uint8Array|null} [encryptedDeviceToken] AuthRequest encryptedDeviceToken
         */

        /**
         * Constructs a new AuthRequest.
         * @memberof Authentication
         * @classdesc Represents an AuthRequest.
         * @implements IAuthRequest
         * @constructor
         * @param {Authentication.IAuthRequest=} [properties] Properties to set
         */
        function AuthRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AuthRequest clientVersion.
         * @member {string} clientVersion
         * @memberof Authentication.AuthRequest
         * @instance
         */
        AuthRequest.prototype.clientVersion = "";

        /**
         * AuthRequest username.
         * @member {string} username
         * @memberof Authentication.AuthRequest
         * @instance
         */
        AuthRequest.prototype.username = "";

        /**
         * AuthRequest encryptedDeviceToken.
         * @member {Uint8Array} encryptedDeviceToken
         * @memberof Authentication.AuthRequest
         * @instance
         */
        AuthRequest.prototype.encryptedDeviceToken = $util.newBuffer([]);

        /**
         * Creates a new AuthRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.AuthRequest
         * @static
         * @param {Authentication.IAuthRequest=} [properties] Properties to set
         * @returns {Authentication.AuthRequest} AuthRequest instance
         */
        AuthRequest.create = function create(properties) {
            return new AuthRequest(properties);
        };

        /**
         * Encodes the specified AuthRequest message. Does not implicitly {@link Authentication.AuthRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.AuthRequest
         * @static
         * @param {Authentication.IAuthRequest} message AuthRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientVersion);
            if (message.username != null && message.hasOwnProperty("username"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.encryptedDeviceToken);
            return writer;
        };

        /**
         * Encodes the specified AuthRequest message, length delimited. Does not implicitly {@link Authentication.AuthRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.AuthRequest
         * @static
         * @param {Authentication.IAuthRequest} message AuthRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AuthRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.AuthRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.AuthRequest} AuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.AuthRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.clientVersion = reader.string();
                    break;
                case 2:
                    message.username = reader.string();
                    break;
                case 3:
                    message.encryptedDeviceToken = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AuthRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.AuthRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.AuthRequest} AuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AuthRequest message.
         * @function verify
         * @memberof Authentication.AuthRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AuthRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                if (!$util.isString(message.clientVersion))
                    return "clientVersion: string expected";
            if (message.username != null && message.hasOwnProperty("username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                if (!(message.encryptedDeviceToken && typeof message.encryptedDeviceToken.length === "number" || $util.isString(message.encryptedDeviceToken)))
                    return "encryptedDeviceToken: buffer expected";
            return null;
        };

        /**
         * Creates an AuthRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.AuthRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.AuthRequest} AuthRequest
         */
        AuthRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.AuthRequest)
                return object;
            let message = new $root.Authentication.AuthRequest();
            if (object.clientVersion != null)
                message.clientVersion = String(object.clientVersion);
            if (object.username != null)
                message.username = String(object.username);
            if (object.encryptedDeviceToken != null)
                if (typeof object.encryptedDeviceToken === "string")
                    $util.base64.decode(object.encryptedDeviceToken, message.encryptedDeviceToken = $util.newBuffer($util.base64.length(object.encryptedDeviceToken)), 0);
                else if (object.encryptedDeviceToken.length)
                    message.encryptedDeviceToken = object.encryptedDeviceToken;
            return message;
        };

        /**
         * Creates a plain object from an AuthRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.AuthRequest
         * @static
         * @param {Authentication.AuthRequest} message AuthRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AuthRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.clientVersion = "";
                object.username = "";
                if (options.bytes === String)
                    object.encryptedDeviceToken = "";
                else {
                    object.encryptedDeviceToken = [];
                    if (options.bytes !== Array)
                        object.encryptedDeviceToken = $util.newBuffer(object.encryptedDeviceToken);
                }
            }
            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                object.clientVersion = message.clientVersion;
            if (message.username != null && message.hasOwnProperty("username"))
                object.username = message.username;
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                object.encryptedDeviceToken = options.bytes === String ? $util.base64.encode(message.encryptedDeviceToken, 0, message.encryptedDeviceToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedDeviceToken) : message.encryptedDeviceToken;
            return object;
        };

        /**
         * Converts this AuthRequest to JSON.
         * @function toJSON
         * @memberof Authentication.AuthRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AuthRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AuthRequest;
    })();

    Authentication.NewUserMinimumParams = (function() {

        /**
         * Properties of a NewUserMinimumParams.
         * @memberof Authentication
         * @interface INewUserMinimumParams
         * @property {number|null} [minimumIterations] NewUserMinimumParams minimumIterations
         * @property {Array.<string>|null} [passwordMatchRegex] NewUserMinimumParams passwordMatchRegex
         * @property {Array.<string>|null} [passwordMatchDescription] NewUserMinimumParams passwordMatchDescription
         */

        /**
         * Constructs a new NewUserMinimumParams.
         * @memberof Authentication
         * @classdesc Represents a NewUserMinimumParams.
         * @implements INewUserMinimumParams
         * @constructor
         * @param {Authentication.INewUserMinimumParams=} [properties] Properties to set
         */
        function NewUserMinimumParams(properties) {
            this.passwordMatchRegex = [];
            this.passwordMatchDescription = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NewUserMinimumParams minimumIterations.
         * @member {number} minimumIterations
         * @memberof Authentication.NewUserMinimumParams
         * @instance
         */
        NewUserMinimumParams.prototype.minimumIterations = 0;

        /**
         * NewUserMinimumParams passwordMatchRegex.
         * @member {Array.<string>} passwordMatchRegex
         * @memberof Authentication.NewUserMinimumParams
         * @instance
         */
        NewUserMinimumParams.prototype.passwordMatchRegex = $util.emptyArray;

        /**
         * NewUserMinimumParams passwordMatchDescription.
         * @member {Array.<string>} passwordMatchDescription
         * @memberof Authentication.NewUserMinimumParams
         * @instance
         */
        NewUserMinimumParams.prototype.passwordMatchDescription = $util.emptyArray;

        /**
         * Creates a new NewUserMinimumParams instance using the specified properties.
         * @function create
         * @memberof Authentication.NewUserMinimumParams
         * @static
         * @param {Authentication.INewUserMinimumParams=} [properties] Properties to set
         * @returns {Authentication.NewUserMinimumParams} NewUserMinimumParams instance
         */
        NewUserMinimumParams.create = function create(properties) {
            return new NewUserMinimumParams(properties);
        };

        /**
         * Encodes the specified NewUserMinimumParams message. Does not implicitly {@link Authentication.NewUserMinimumParams.verify|verify} messages.
         * @function encode
         * @memberof Authentication.NewUserMinimumParams
         * @static
         * @param {Authentication.INewUserMinimumParams} message NewUserMinimumParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NewUserMinimumParams.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.minimumIterations != null && message.hasOwnProperty("minimumIterations"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.minimumIterations);
            if (message.passwordMatchRegex != null && message.passwordMatchRegex.length)
                for (let i = 0; i < message.passwordMatchRegex.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.passwordMatchRegex[i]);
            if (message.passwordMatchDescription != null && message.passwordMatchDescription.length)
                for (let i = 0; i < message.passwordMatchDescription.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.passwordMatchDescription[i]);
            return writer;
        };

        /**
         * Encodes the specified NewUserMinimumParams message, length delimited. Does not implicitly {@link Authentication.NewUserMinimumParams.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.NewUserMinimumParams
         * @static
         * @param {Authentication.INewUserMinimumParams} message NewUserMinimumParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NewUserMinimumParams.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NewUserMinimumParams message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.NewUserMinimumParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.NewUserMinimumParams} NewUserMinimumParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NewUserMinimumParams.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.NewUserMinimumParams();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.minimumIterations = reader.int32();
                    break;
                case 2:
                    if (!(message.passwordMatchRegex && message.passwordMatchRegex.length))
                        message.passwordMatchRegex = [];
                    message.passwordMatchRegex.push(reader.string());
                    break;
                case 3:
                    if (!(message.passwordMatchDescription && message.passwordMatchDescription.length))
                        message.passwordMatchDescription = [];
                    message.passwordMatchDescription.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a NewUserMinimumParams message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.NewUserMinimumParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.NewUserMinimumParams} NewUserMinimumParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NewUserMinimumParams.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NewUserMinimumParams message.
         * @function verify
         * @memberof Authentication.NewUserMinimumParams
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NewUserMinimumParams.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.minimumIterations != null && message.hasOwnProperty("minimumIterations"))
                if (!$util.isInteger(message.minimumIterations))
                    return "minimumIterations: integer expected";
            if (message.passwordMatchRegex != null && message.hasOwnProperty("passwordMatchRegex")) {
                if (!Array.isArray(message.passwordMatchRegex))
                    return "passwordMatchRegex: array expected";
                for (let i = 0; i < message.passwordMatchRegex.length; ++i)
                    if (!$util.isString(message.passwordMatchRegex[i]))
                        return "passwordMatchRegex: string[] expected";
            }
            if (message.passwordMatchDescription != null && message.hasOwnProperty("passwordMatchDescription")) {
                if (!Array.isArray(message.passwordMatchDescription))
                    return "passwordMatchDescription: array expected";
                for (let i = 0; i < message.passwordMatchDescription.length; ++i)
                    if (!$util.isString(message.passwordMatchDescription[i]))
                        return "passwordMatchDescription: string[] expected";
            }
            return null;
        };

        /**
         * Creates a NewUserMinimumParams message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.NewUserMinimumParams
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.NewUserMinimumParams} NewUserMinimumParams
         */
        NewUserMinimumParams.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.NewUserMinimumParams)
                return object;
            let message = new $root.Authentication.NewUserMinimumParams();
            if (object.minimumIterations != null)
                message.minimumIterations = object.minimumIterations | 0;
            if (object.passwordMatchRegex) {
                if (!Array.isArray(object.passwordMatchRegex))
                    throw TypeError(".Authentication.NewUserMinimumParams.passwordMatchRegex: array expected");
                message.passwordMatchRegex = [];
                for (let i = 0; i < object.passwordMatchRegex.length; ++i)
                    message.passwordMatchRegex[i] = String(object.passwordMatchRegex[i]);
            }
            if (object.passwordMatchDescription) {
                if (!Array.isArray(object.passwordMatchDescription))
                    throw TypeError(".Authentication.NewUserMinimumParams.passwordMatchDescription: array expected");
                message.passwordMatchDescription = [];
                for (let i = 0; i < object.passwordMatchDescription.length; ++i)
                    message.passwordMatchDescription[i] = String(object.passwordMatchDescription[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a NewUserMinimumParams message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.NewUserMinimumParams
         * @static
         * @param {Authentication.NewUserMinimumParams} message NewUserMinimumParams
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NewUserMinimumParams.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.passwordMatchRegex = [];
                object.passwordMatchDescription = [];
            }
            if (options.defaults)
                object.minimumIterations = 0;
            if (message.minimumIterations != null && message.hasOwnProperty("minimumIterations"))
                object.minimumIterations = message.minimumIterations;
            if (message.passwordMatchRegex && message.passwordMatchRegex.length) {
                object.passwordMatchRegex = [];
                for (let j = 0; j < message.passwordMatchRegex.length; ++j)
                    object.passwordMatchRegex[j] = message.passwordMatchRegex[j];
            }
            if (message.passwordMatchDescription && message.passwordMatchDescription.length) {
                object.passwordMatchDescription = [];
                for (let j = 0; j < message.passwordMatchDescription.length; ++j)
                    object.passwordMatchDescription[j] = message.passwordMatchDescription[j];
            }
            return object;
        };

        /**
         * Converts this NewUserMinimumParams to JSON.
         * @function toJSON
         * @memberof Authentication.NewUserMinimumParams
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NewUserMinimumParams.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return NewUserMinimumParams;
    })();

    Authentication.PreLoginRequest = (function() {

        /**
         * Properties of a PreLoginRequest.
         * @memberof Authentication
         * @interface IPreLoginRequest
         * @property {Authentication.IAuthRequest|null} [authRequest] PreLoginRequest authRequest
         * @property {Authentication.LoginType|null} [loginType] PreLoginRequest loginType
         * @property {Uint8Array|null} [twoFactorToken] PreLoginRequest twoFactorToken
         */

        /**
         * Constructs a new PreLoginRequest.
         * @memberof Authentication
         * @classdesc Represents a PreLoginRequest.
         * @implements IPreLoginRequest
         * @constructor
         * @param {Authentication.IPreLoginRequest=} [properties] Properties to set
         */
        function PreLoginRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PreLoginRequest authRequest.
         * @member {Authentication.IAuthRequest|null|undefined} authRequest
         * @memberof Authentication.PreLoginRequest
         * @instance
         */
        PreLoginRequest.prototype.authRequest = null;

        /**
         * PreLoginRequest loginType.
         * @member {Authentication.LoginType} loginType
         * @memberof Authentication.PreLoginRequest
         * @instance
         */
        PreLoginRequest.prototype.loginType = 0;

        /**
         * PreLoginRequest twoFactorToken.
         * @member {Uint8Array} twoFactorToken
         * @memberof Authentication.PreLoginRequest
         * @instance
         */
        PreLoginRequest.prototype.twoFactorToken = $util.newBuffer([]);

        /**
         * Creates a new PreLoginRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.PreLoginRequest
         * @static
         * @param {Authentication.IPreLoginRequest=} [properties] Properties to set
         * @returns {Authentication.PreLoginRequest} PreLoginRequest instance
         */
        PreLoginRequest.create = function create(properties) {
            return new PreLoginRequest(properties);
        };

        /**
         * Encodes the specified PreLoginRequest message. Does not implicitly {@link Authentication.PreLoginRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.PreLoginRequest
         * @static
         * @param {Authentication.IPreLoginRequest} message PreLoginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PreLoginRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.authRequest != null && message.hasOwnProperty("authRequest"))
                $root.Authentication.AuthRequest.encode(message.authRequest, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.loginType);
            if (message.twoFactorToken != null && message.hasOwnProperty("twoFactorToken"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.twoFactorToken);
            return writer;
        };

        /**
         * Encodes the specified PreLoginRequest message, length delimited. Does not implicitly {@link Authentication.PreLoginRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.PreLoginRequest
         * @static
         * @param {Authentication.IPreLoginRequest} message PreLoginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PreLoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PreLoginRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.PreLoginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.PreLoginRequest} PreLoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PreLoginRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.PreLoginRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.authRequest = $root.Authentication.AuthRequest.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.loginType = reader.int32();
                    break;
                case 3:
                    message.twoFactorToken = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PreLoginRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.PreLoginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.PreLoginRequest} PreLoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PreLoginRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PreLoginRequest message.
         * @function verify
         * @memberof Authentication.PreLoginRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PreLoginRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.authRequest != null && message.hasOwnProperty("authRequest")) {
                let error = $root.Authentication.AuthRequest.verify(message.authRequest);
                if (error)
                    return "authRequest." + error;
            }
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                switch (message.loginType) {
                default:
                    return "loginType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.twoFactorToken != null && message.hasOwnProperty("twoFactorToken"))
                if (!(message.twoFactorToken && typeof message.twoFactorToken.length === "number" || $util.isString(message.twoFactorToken)))
                    return "twoFactorToken: buffer expected";
            return null;
        };

        /**
         * Creates a PreLoginRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.PreLoginRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.PreLoginRequest} PreLoginRequest
         */
        PreLoginRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.PreLoginRequest)
                return object;
            let message = new $root.Authentication.PreLoginRequest();
            if (object.authRequest != null) {
                if (typeof object.authRequest !== "object")
                    throw TypeError(".Authentication.PreLoginRequest.authRequest: object expected");
                message.authRequest = $root.Authentication.AuthRequest.fromObject(object.authRequest);
            }
            switch (object.loginType) {
            case "NORMAL":
            case 0:
                message.loginType = 0;
                break;
            case "SSO":
            case 1:
                message.loginType = 1;
                break;
            case "BIO":
            case 2:
                message.loginType = 2;
                break;
            case "ALTERNATE":
            case 3:
                message.loginType = 3;
                break;
            case "OFFLINE":
            case 4:
                message.loginType = 4;
                break;
            }
            if (object.twoFactorToken != null)
                if (typeof object.twoFactorToken === "string")
                    $util.base64.decode(object.twoFactorToken, message.twoFactorToken = $util.newBuffer($util.base64.length(object.twoFactorToken)), 0);
                else if (object.twoFactorToken.length)
                    message.twoFactorToken = object.twoFactorToken;
            return message;
        };

        /**
         * Creates a plain object from a PreLoginRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.PreLoginRequest
         * @static
         * @param {Authentication.PreLoginRequest} message PreLoginRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PreLoginRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.authRequest = null;
                object.loginType = options.enums === String ? "NORMAL" : 0;
                if (options.bytes === String)
                    object.twoFactorToken = "";
                else {
                    object.twoFactorToken = [];
                    if (options.bytes !== Array)
                        object.twoFactorToken = $util.newBuffer(object.twoFactorToken);
                }
            }
            if (message.authRequest != null && message.hasOwnProperty("authRequest"))
                object.authRequest = $root.Authentication.AuthRequest.toObject(message.authRequest, options);
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                object.loginType = options.enums === String ? $root.Authentication.LoginType[message.loginType] : message.loginType;
            if (message.twoFactorToken != null && message.hasOwnProperty("twoFactorToken"))
                object.twoFactorToken = options.bytes === String ? $util.base64.encode(message.twoFactorToken, 0, message.twoFactorToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.twoFactorToken) : message.twoFactorToken;
            return object;
        };

        /**
         * Converts this PreLoginRequest to JSON.
         * @function toJSON
         * @memberof Authentication.PreLoginRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PreLoginRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PreLoginRequest;
    })();

    Authentication.LoginRequest = (function() {

        /**
         * Properties of a LoginRequest.
         * @memberof Authentication
         * @interface ILoginRequest
         * @property {Authentication.IAuthRequest|null} [authRequest] LoginRequest authRequest
         * @property {Authentication.LoginType|null} [loginType] LoginRequest loginType
         * @property {Uint8Array|null} [authenticationHashPrime] LoginRequest authenticationHashPrime
         * @property {Uint8Array|null} [randomHashKey] LoginRequest randomHashKey
         * @property {Uint8Array|null} [encryptedTwoFactorToken] LoginRequest encryptedTwoFactorToken
         * @property {Uint8Array|null} [encryptedBreachWatchToken] LoginRequest encryptedBreachWatchToken
         */

        /**
         * Constructs a new LoginRequest.
         * @memberof Authentication
         * @classdesc Represents a LoginRequest.
         * @implements ILoginRequest
         * @constructor
         * @param {Authentication.ILoginRequest=} [properties] Properties to set
         */
        function LoginRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginRequest authRequest.
         * @member {Authentication.IAuthRequest|null|undefined} authRequest
         * @memberof Authentication.LoginRequest
         * @instance
         */
        LoginRequest.prototype.authRequest = null;

        /**
         * LoginRequest loginType.
         * @member {Authentication.LoginType} loginType
         * @memberof Authentication.LoginRequest
         * @instance
         */
        LoginRequest.prototype.loginType = 0;

        /**
         * LoginRequest authenticationHashPrime.
         * @member {Uint8Array} authenticationHashPrime
         * @memberof Authentication.LoginRequest
         * @instance
         */
        LoginRequest.prototype.authenticationHashPrime = $util.newBuffer([]);

        /**
         * LoginRequest randomHashKey.
         * @member {Uint8Array} randomHashKey
         * @memberof Authentication.LoginRequest
         * @instance
         */
        LoginRequest.prototype.randomHashKey = $util.newBuffer([]);

        /**
         * LoginRequest encryptedTwoFactorToken.
         * @member {Uint8Array} encryptedTwoFactorToken
         * @memberof Authentication.LoginRequest
         * @instance
         */
        LoginRequest.prototype.encryptedTwoFactorToken = $util.newBuffer([]);

        /**
         * LoginRequest encryptedBreachWatchToken.
         * @member {Uint8Array} encryptedBreachWatchToken
         * @memberof Authentication.LoginRequest
         * @instance
         */
        LoginRequest.prototype.encryptedBreachWatchToken = $util.newBuffer([]);

        /**
         * Creates a new LoginRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.LoginRequest
         * @static
         * @param {Authentication.ILoginRequest=} [properties] Properties to set
         * @returns {Authentication.LoginRequest} LoginRequest instance
         */
        LoginRequest.create = function create(properties) {
            return new LoginRequest(properties);
        };

        /**
         * Encodes the specified LoginRequest message. Does not implicitly {@link Authentication.LoginRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.LoginRequest
         * @static
         * @param {Authentication.ILoginRequest} message LoginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.authRequest != null && message.hasOwnProperty("authRequest"))
                $root.Authentication.AuthRequest.encode(message.authRequest, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.loginType);
            if (message.authenticationHashPrime != null && message.hasOwnProperty("authenticationHashPrime"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.authenticationHashPrime);
            if (message.randomHashKey != null && message.hasOwnProperty("randomHashKey"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.randomHashKey);
            if (message.encryptedTwoFactorToken != null && message.hasOwnProperty("encryptedTwoFactorToken"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.encryptedTwoFactorToken);
            if (message.encryptedBreachWatchToken != null && message.hasOwnProperty("encryptedBreachWatchToken"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.encryptedBreachWatchToken);
            return writer;
        };

        /**
         * Encodes the specified LoginRequest message, length delimited. Does not implicitly {@link Authentication.LoginRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.LoginRequest
         * @static
         * @param {Authentication.ILoginRequest} message LoginRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.LoginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.LoginRequest} LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.LoginRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.authRequest = $root.Authentication.AuthRequest.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.loginType = reader.int32();
                    break;
                case 3:
                    message.authenticationHashPrime = reader.bytes();
                    break;
                case 4:
                    message.randomHashKey = reader.bytes();
                    break;
                case 5:
                    message.encryptedTwoFactorToken = reader.bytes();
                    break;
                case 6:
                    message.encryptedBreachWatchToken = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.LoginRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.LoginRequest} LoginRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginRequest message.
         * @function verify
         * @memberof Authentication.LoginRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.authRequest != null && message.hasOwnProperty("authRequest")) {
                let error = $root.Authentication.AuthRequest.verify(message.authRequest);
                if (error)
                    return "authRequest." + error;
            }
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                switch (message.loginType) {
                default:
                    return "loginType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.authenticationHashPrime != null && message.hasOwnProperty("authenticationHashPrime"))
                if (!(message.authenticationHashPrime && typeof message.authenticationHashPrime.length === "number" || $util.isString(message.authenticationHashPrime)))
                    return "authenticationHashPrime: buffer expected";
            if (message.randomHashKey != null && message.hasOwnProperty("randomHashKey"))
                if (!(message.randomHashKey && typeof message.randomHashKey.length === "number" || $util.isString(message.randomHashKey)))
                    return "randomHashKey: buffer expected";
            if (message.encryptedTwoFactorToken != null && message.hasOwnProperty("encryptedTwoFactorToken"))
                if (!(message.encryptedTwoFactorToken && typeof message.encryptedTwoFactorToken.length === "number" || $util.isString(message.encryptedTwoFactorToken)))
                    return "encryptedTwoFactorToken: buffer expected";
            if (message.encryptedBreachWatchToken != null && message.hasOwnProperty("encryptedBreachWatchToken"))
                if (!(message.encryptedBreachWatchToken && typeof message.encryptedBreachWatchToken.length === "number" || $util.isString(message.encryptedBreachWatchToken)))
                    return "encryptedBreachWatchToken: buffer expected";
            return null;
        };

        /**
         * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.LoginRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.LoginRequest} LoginRequest
         */
        LoginRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.LoginRequest)
                return object;
            let message = new $root.Authentication.LoginRequest();
            if (object.authRequest != null) {
                if (typeof object.authRequest !== "object")
                    throw TypeError(".Authentication.LoginRequest.authRequest: object expected");
                message.authRequest = $root.Authentication.AuthRequest.fromObject(object.authRequest);
            }
            switch (object.loginType) {
            case "NORMAL":
            case 0:
                message.loginType = 0;
                break;
            case "SSO":
            case 1:
                message.loginType = 1;
                break;
            case "BIO":
            case 2:
                message.loginType = 2;
                break;
            case "ALTERNATE":
            case 3:
                message.loginType = 3;
                break;
            case "OFFLINE":
            case 4:
                message.loginType = 4;
                break;
            }
            if (object.authenticationHashPrime != null)
                if (typeof object.authenticationHashPrime === "string")
                    $util.base64.decode(object.authenticationHashPrime, message.authenticationHashPrime = $util.newBuffer($util.base64.length(object.authenticationHashPrime)), 0);
                else if (object.authenticationHashPrime.length)
                    message.authenticationHashPrime = object.authenticationHashPrime;
            if (object.randomHashKey != null)
                if (typeof object.randomHashKey === "string")
                    $util.base64.decode(object.randomHashKey, message.randomHashKey = $util.newBuffer($util.base64.length(object.randomHashKey)), 0);
                else if (object.randomHashKey.length)
                    message.randomHashKey = object.randomHashKey;
            if (object.encryptedTwoFactorToken != null)
                if (typeof object.encryptedTwoFactorToken === "string")
                    $util.base64.decode(object.encryptedTwoFactorToken, message.encryptedTwoFactorToken = $util.newBuffer($util.base64.length(object.encryptedTwoFactorToken)), 0);
                else if (object.encryptedTwoFactorToken.length)
                    message.encryptedTwoFactorToken = object.encryptedTwoFactorToken;
            if (object.encryptedBreachWatchToken != null)
                if (typeof object.encryptedBreachWatchToken === "string")
                    $util.base64.decode(object.encryptedBreachWatchToken, message.encryptedBreachWatchToken = $util.newBuffer($util.base64.length(object.encryptedBreachWatchToken)), 0);
                else if (object.encryptedBreachWatchToken.length)
                    message.encryptedBreachWatchToken = object.encryptedBreachWatchToken;
            return message;
        };

        /**
         * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.LoginRequest
         * @static
         * @param {Authentication.LoginRequest} message LoginRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.authRequest = null;
                object.loginType = options.enums === String ? "NORMAL" : 0;
                if (options.bytes === String)
                    object.authenticationHashPrime = "";
                else {
                    object.authenticationHashPrime = [];
                    if (options.bytes !== Array)
                        object.authenticationHashPrime = $util.newBuffer(object.authenticationHashPrime);
                }
                if (options.bytes === String)
                    object.randomHashKey = "";
                else {
                    object.randomHashKey = [];
                    if (options.bytes !== Array)
                        object.randomHashKey = $util.newBuffer(object.randomHashKey);
                }
                if (options.bytes === String)
                    object.encryptedTwoFactorToken = "";
                else {
                    object.encryptedTwoFactorToken = [];
                    if (options.bytes !== Array)
                        object.encryptedTwoFactorToken = $util.newBuffer(object.encryptedTwoFactorToken);
                }
                if (options.bytes === String)
                    object.encryptedBreachWatchToken = "";
                else {
                    object.encryptedBreachWatchToken = [];
                    if (options.bytes !== Array)
                        object.encryptedBreachWatchToken = $util.newBuffer(object.encryptedBreachWatchToken);
                }
            }
            if (message.authRequest != null && message.hasOwnProperty("authRequest"))
                object.authRequest = $root.Authentication.AuthRequest.toObject(message.authRequest, options);
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                object.loginType = options.enums === String ? $root.Authentication.LoginType[message.loginType] : message.loginType;
            if (message.authenticationHashPrime != null && message.hasOwnProperty("authenticationHashPrime"))
                object.authenticationHashPrime = options.bytes === String ? $util.base64.encode(message.authenticationHashPrime, 0, message.authenticationHashPrime.length) : options.bytes === Array ? Array.prototype.slice.call(message.authenticationHashPrime) : message.authenticationHashPrime;
            if (message.randomHashKey != null && message.hasOwnProperty("randomHashKey"))
                object.randomHashKey = options.bytes === String ? $util.base64.encode(message.randomHashKey, 0, message.randomHashKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.randomHashKey) : message.randomHashKey;
            if (message.encryptedTwoFactorToken != null && message.hasOwnProperty("encryptedTwoFactorToken"))
                object.encryptedTwoFactorToken = options.bytes === String ? $util.base64.encode(message.encryptedTwoFactorToken, 0, message.encryptedTwoFactorToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedTwoFactorToken) : message.encryptedTwoFactorToken;
            if (message.encryptedBreachWatchToken != null && message.hasOwnProperty("encryptedBreachWatchToken"))
                object.encryptedBreachWatchToken = options.bytes === String ? $util.base64.encode(message.encryptedBreachWatchToken, 0, message.encryptedBreachWatchToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedBreachWatchToken) : message.encryptedBreachWatchToken;
            return object;
        };

        /**
         * Converts this LoginRequest to JSON.
         * @function toJSON
         * @memberof Authentication.LoginRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginRequest;
    })();

    Authentication.RegistrationRequest = (function() {

        /**
         * Properties of a RegistrationRequest.
         * @memberof Authentication
         * @interface IRegistrationRequest
         * @property {Authentication.IAuthRequest|null} [authRequest] RegistrationRequest authRequest
         * @property {Authentication.IUserAuthRequest|null} [userAuthRequest] RegistrationRequest userAuthRequest
         * @property {Uint8Array|null} [encryptedClientKey] RegistrationRequest encryptedClientKey
         * @property {Uint8Array|null} [encryptedPrivateKey] RegistrationRequest encryptedPrivateKey
         * @property {Uint8Array|null} [publicKey] RegistrationRequest publicKey
         * @property {string|null} [verificationCode] RegistrationRequest verificationCode
         * @property {Uint8Array|null} [deprecatedAuthHashHash] RegistrationRequest deprecatedAuthHashHash
         * @property {Uint8Array|null} [deprecatedEncryptedClientKey] RegistrationRequest deprecatedEncryptedClientKey
         * @property {Uint8Array|null} [deprecatedEncryptedPrivateKey] RegistrationRequest deprecatedEncryptedPrivateKey
         * @property {Uint8Array|null} [deprecatedEncryptionParams] RegistrationRequest deprecatedEncryptionParams
         */

        /**
         * Constructs a new RegistrationRequest.
         * @memberof Authentication
         * @classdesc Represents a RegistrationRequest.
         * @implements IRegistrationRequest
         * @constructor
         * @param {Authentication.IRegistrationRequest=} [properties] Properties to set
         */
        function RegistrationRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RegistrationRequest authRequest.
         * @member {Authentication.IAuthRequest|null|undefined} authRequest
         * @memberof Authentication.RegistrationRequest
         * @instance
         */
        RegistrationRequest.prototype.authRequest = null;

        /**
         * RegistrationRequest userAuthRequest.
         * @member {Authentication.IUserAuthRequest|null|undefined} userAuthRequest
         * @memberof Authentication.RegistrationRequest
         * @instance
         */
        RegistrationRequest.prototype.userAuthRequest = null;

        /**
         * RegistrationRequest encryptedClientKey.
         * @member {Uint8Array} encryptedClientKey
         * @memberof Authentication.RegistrationRequest
         * @instance
         */
        RegistrationRequest.prototype.encryptedClientKey = $util.newBuffer([]);

        /**
         * RegistrationRequest encryptedPrivateKey.
         * @member {Uint8Array} encryptedPrivateKey
         * @memberof Authentication.RegistrationRequest
         * @instance
         */
        RegistrationRequest.prototype.encryptedPrivateKey = $util.newBuffer([]);

        /**
         * RegistrationRequest publicKey.
         * @member {Uint8Array} publicKey
         * @memberof Authentication.RegistrationRequest
         * @instance
         */
        RegistrationRequest.prototype.publicKey = $util.newBuffer([]);

        /**
         * RegistrationRequest verificationCode.
         * @member {string} verificationCode
         * @memberof Authentication.RegistrationRequest
         * @instance
         */
        RegistrationRequest.prototype.verificationCode = "";

        /**
         * RegistrationRequest deprecatedAuthHashHash.
         * @member {Uint8Array} deprecatedAuthHashHash
         * @memberof Authentication.RegistrationRequest
         * @instance
         */
        RegistrationRequest.prototype.deprecatedAuthHashHash = $util.newBuffer([]);

        /**
         * RegistrationRequest deprecatedEncryptedClientKey.
         * @member {Uint8Array} deprecatedEncryptedClientKey
         * @memberof Authentication.RegistrationRequest
         * @instance
         */
        RegistrationRequest.prototype.deprecatedEncryptedClientKey = $util.newBuffer([]);

        /**
         * RegistrationRequest deprecatedEncryptedPrivateKey.
         * @member {Uint8Array} deprecatedEncryptedPrivateKey
         * @memberof Authentication.RegistrationRequest
         * @instance
         */
        RegistrationRequest.prototype.deprecatedEncryptedPrivateKey = $util.newBuffer([]);

        /**
         * RegistrationRequest deprecatedEncryptionParams.
         * @member {Uint8Array} deprecatedEncryptionParams
         * @memberof Authentication.RegistrationRequest
         * @instance
         */
        RegistrationRequest.prototype.deprecatedEncryptionParams = $util.newBuffer([]);

        /**
         * Creates a new RegistrationRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.RegistrationRequest
         * @static
         * @param {Authentication.IRegistrationRequest=} [properties] Properties to set
         * @returns {Authentication.RegistrationRequest} RegistrationRequest instance
         */
        RegistrationRequest.create = function create(properties) {
            return new RegistrationRequest(properties);
        };

        /**
         * Encodes the specified RegistrationRequest message. Does not implicitly {@link Authentication.RegistrationRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.RegistrationRequest
         * @static
         * @param {Authentication.IRegistrationRequest} message RegistrationRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegistrationRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.authRequest != null && message.hasOwnProperty("authRequest"))
                $root.Authentication.AuthRequest.encode(message.authRequest, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.userAuthRequest != null && message.hasOwnProperty("userAuthRequest"))
                $root.Authentication.UserAuthRequest.encode(message.userAuthRequest, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.encryptedClientKey != null && message.hasOwnProperty("encryptedClientKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.encryptedClientKey);
            if (message.encryptedPrivateKey != null && message.hasOwnProperty("encryptedPrivateKey"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.encryptedPrivateKey);
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.publicKey);
            if (message.verificationCode != null && message.hasOwnProperty("verificationCode"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.verificationCode);
            if (message.deprecatedAuthHashHash != null && message.hasOwnProperty("deprecatedAuthHashHash"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.deprecatedAuthHashHash);
            if (message.deprecatedEncryptedClientKey != null && message.hasOwnProperty("deprecatedEncryptedClientKey"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.deprecatedEncryptedClientKey);
            if (message.deprecatedEncryptedPrivateKey != null && message.hasOwnProperty("deprecatedEncryptedPrivateKey"))
                writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.deprecatedEncryptedPrivateKey);
            if (message.deprecatedEncryptionParams != null && message.hasOwnProperty("deprecatedEncryptionParams"))
                writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.deprecatedEncryptionParams);
            return writer;
        };

        /**
         * Encodes the specified RegistrationRequest message, length delimited. Does not implicitly {@link Authentication.RegistrationRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.RegistrationRequest
         * @static
         * @param {Authentication.IRegistrationRequest} message RegistrationRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RegistrationRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RegistrationRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.RegistrationRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.RegistrationRequest} RegistrationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegistrationRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.RegistrationRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.authRequest = $root.Authentication.AuthRequest.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.userAuthRequest = $root.Authentication.UserAuthRequest.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.encryptedClientKey = reader.bytes();
                    break;
                case 4:
                    message.encryptedPrivateKey = reader.bytes();
                    break;
                case 5:
                    message.publicKey = reader.bytes();
                    break;
                case 6:
                    message.verificationCode = reader.string();
                    break;
                case 7:
                    message.deprecatedAuthHashHash = reader.bytes();
                    break;
                case 8:
                    message.deprecatedEncryptedClientKey = reader.bytes();
                    break;
                case 9:
                    message.deprecatedEncryptedPrivateKey = reader.bytes();
                    break;
                case 10:
                    message.deprecatedEncryptionParams = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RegistrationRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.RegistrationRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.RegistrationRequest} RegistrationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RegistrationRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RegistrationRequest message.
         * @function verify
         * @memberof Authentication.RegistrationRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RegistrationRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.authRequest != null && message.hasOwnProperty("authRequest")) {
                let error = $root.Authentication.AuthRequest.verify(message.authRequest);
                if (error)
                    return "authRequest." + error;
            }
            if (message.userAuthRequest != null && message.hasOwnProperty("userAuthRequest")) {
                let error = $root.Authentication.UserAuthRequest.verify(message.userAuthRequest);
                if (error)
                    return "userAuthRequest." + error;
            }
            if (message.encryptedClientKey != null && message.hasOwnProperty("encryptedClientKey"))
                if (!(message.encryptedClientKey && typeof message.encryptedClientKey.length === "number" || $util.isString(message.encryptedClientKey)))
                    return "encryptedClientKey: buffer expected";
            if (message.encryptedPrivateKey != null && message.hasOwnProperty("encryptedPrivateKey"))
                if (!(message.encryptedPrivateKey && typeof message.encryptedPrivateKey.length === "number" || $util.isString(message.encryptedPrivateKey)))
                    return "encryptedPrivateKey: buffer expected";
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                    return "publicKey: buffer expected";
            if (message.verificationCode != null && message.hasOwnProperty("verificationCode"))
                if (!$util.isString(message.verificationCode))
                    return "verificationCode: string expected";
            if (message.deprecatedAuthHashHash != null && message.hasOwnProperty("deprecatedAuthHashHash"))
                if (!(message.deprecatedAuthHashHash && typeof message.deprecatedAuthHashHash.length === "number" || $util.isString(message.deprecatedAuthHashHash)))
                    return "deprecatedAuthHashHash: buffer expected";
            if (message.deprecatedEncryptedClientKey != null && message.hasOwnProperty("deprecatedEncryptedClientKey"))
                if (!(message.deprecatedEncryptedClientKey && typeof message.deprecatedEncryptedClientKey.length === "number" || $util.isString(message.deprecatedEncryptedClientKey)))
                    return "deprecatedEncryptedClientKey: buffer expected";
            if (message.deprecatedEncryptedPrivateKey != null && message.hasOwnProperty("deprecatedEncryptedPrivateKey"))
                if (!(message.deprecatedEncryptedPrivateKey && typeof message.deprecatedEncryptedPrivateKey.length === "number" || $util.isString(message.deprecatedEncryptedPrivateKey)))
                    return "deprecatedEncryptedPrivateKey: buffer expected";
            if (message.deprecatedEncryptionParams != null && message.hasOwnProperty("deprecatedEncryptionParams"))
                if (!(message.deprecatedEncryptionParams && typeof message.deprecatedEncryptionParams.length === "number" || $util.isString(message.deprecatedEncryptionParams)))
                    return "deprecatedEncryptionParams: buffer expected";
            return null;
        };

        /**
         * Creates a RegistrationRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.RegistrationRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.RegistrationRequest} RegistrationRequest
         */
        RegistrationRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.RegistrationRequest)
                return object;
            let message = new $root.Authentication.RegistrationRequest();
            if (object.authRequest != null) {
                if (typeof object.authRequest !== "object")
                    throw TypeError(".Authentication.RegistrationRequest.authRequest: object expected");
                message.authRequest = $root.Authentication.AuthRequest.fromObject(object.authRequest);
            }
            if (object.userAuthRequest != null) {
                if (typeof object.userAuthRequest !== "object")
                    throw TypeError(".Authentication.RegistrationRequest.userAuthRequest: object expected");
                message.userAuthRequest = $root.Authentication.UserAuthRequest.fromObject(object.userAuthRequest);
            }
            if (object.encryptedClientKey != null)
                if (typeof object.encryptedClientKey === "string")
                    $util.base64.decode(object.encryptedClientKey, message.encryptedClientKey = $util.newBuffer($util.base64.length(object.encryptedClientKey)), 0);
                else if (object.encryptedClientKey.length)
                    message.encryptedClientKey = object.encryptedClientKey;
            if (object.encryptedPrivateKey != null)
                if (typeof object.encryptedPrivateKey === "string")
                    $util.base64.decode(object.encryptedPrivateKey, message.encryptedPrivateKey = $util.newBuffer($util.base64.length(object.encryptedPrivateKey)), 0);
                else if (object.encryptedPrivateKey.length)
                    message.encryptedPrivateKey = object.encryptedPrivateKey;
            if (object.publicKey != null)
                if (typeof object.publicKey === "string")
                    $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                else if (object.publicKey.length)
                    message.publicKey = object.publicKey;
            if (object.verificationCode != null)
                message.verificationCode = String(object.verificationCode);
            if (object.deprecatedAuthHashHash != null)
                if (typeof object.deprecatedAuthHashHash === "string")
                    $util.base64.decode(object.deprecatedAuthHashHash, message.deprecatedAuthHashHash = $util.newBuffer($util.base64.length(object.deprecatedAuthHashHash)), 0);
                else if (object.deprecatedAuthHashHash.length)
                    message.deprecatedAuthHashHash = object.deprecatedAuthHashHash;
            if (object.deprecatedEncryptedClientKey != null)
                if (typeof object.deprecatedEncryptedClientKey === "string")
                    $util.base64.decode(object.deprecatedEncryptedClientKey, message.deprecatedEncryptedClientKey = $util.newBuffer($util.base64.length(object.deprecatedEncryptedClientKey)), 0);
                else if (object.deprecatedEncryptedClientKey.length)
                    message.deprecatedEncryptedClientKey = object.deprecatedEncryptedClientKey;
            if (object.deprecatedEncryptedPrivateKey != null)
                if (typeof object.deprecatedEncryptedPrivateKey === "string")
                    $util.base64.decode(object.deprecatedEncryptedPrivateKey, message.deprecatedEncryptedPrivateKey = $util.newBuffer($util.base64.length(object.deprecatedEncryptedPrivateKey)), 0);
                else if (object.deprecatedEncryptedPrivateKey.length)
                    message.deprecatedEncryptedPrivateKey = object.deprecatedEncryptedPrivateKey;
            if (object.deprecatedEncryptionParams != null)
                if (typeof object.deprecatedEncryptionParams === "string")
                    $util.base64.decode(object.deprecatedEncryptionParams, message.deprecatedEncryptionParams = $util.newBuffer($util.base64.length(object.deprecatedEncryptionParams)), 0);
                else if (object.deprecatedEncryptionParams.length)
                    message.deprecatedEncryptionParams = object.deprecatedEncryptionParams;
            return message;
        };

        /**
         * Creates a plain object from a RegistrationRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.RegistrationRequest
         * @static
         * @param {Authentication.RegistrationRequest} message RegistrationRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RegistrationRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.authRequest = null;
                object.userAuthRequest = null;
                if (options.bytes === String)
                    object.encryptedClientKey = "";
                else {
                    object.encryptedClientKey = [];
                    if (options.bytes !== Array)
                        object.encryptedClientKey = $util.newBuffer(object.encryptedClientKey);
                }
                if (options.bytes === String)
                    object.encryptedPrivateKey = "";
                else {
                    object.encryptedPrivateKey = [];
                    if (options.bytes !== Array)
                        object.encryptedPrivateKey = $util.newBuffer(object.encryptedPrivateKey);
                }
                if (options.bytes === String)
                    object.publicKey = "";
                else {
                    object.publicKey = [];
                    if (options.bytes !== Array)
                        object.publicKey = $util.newBuffer(object.publicKey);
                }
                object.verificationCode = "";
                if (options.bytes === String)
                    object.deprecatedAuthHashHash = "";
                else {
                    object.deprecatedAuthHashHash = [];
                    if (options.bytes !== Array)
                        object.deprecatedAuthHashHash = $util.newBuffer(object.deprecatedAuthHashHash);
                }
                if (options.bytes === String)
                    object.deprecatedEncryptedClientKey = "";
                else {
                    object.deprecatedEncryptedClientKey = [];
                    if (options.bytes !== Array)
                        object.deprecatedEncryptedClientKey = $util.newBuffer(object.deprecatedEncryptedClientKey);
                }
                if (options.bytes === String)
                    object.deprecatedEncryptedPrivateKey = "";
                else {
                    object.deprecatedEncryptedPrivateKey = [];
                    if (options.bytes !== Array)
                        object.deprecatedEncryptedPrivateKey = $util.newBuffer(object.deprecatedEncryptedPrivateKey);
                }
                if (options.bytes === String)
                    object.deprecatedEncryptionParams = "";
                else {
                    object.deprecatedEncryptionParams = [];
                    if (options.bytes !== Array)
                        object.deprecatedEncryptionParams = $util.newBuffer(object.deprecatedEncryptionParams);
                }
            }
            if (message.authRequest != null && message.hasOwnProperty("authRequest"))
                object.authRequest = $root.Authentication.AuthRequest.toObject(message.authRequest, options);
            if (message.userAuthRequest != null && message.hasOwnProperty("userAuthRequest"))
                object.userAuthRequest = $root.Authentication.UserAuthRequest.toObject(message.userAuthRequest, options);
            if (message.encryptedClientKey != null && message.hasOwnProperty("encryptedClientKey"))
                object.encryptedClientKey = options.bytes === String ? $util.base64.encode(message.encryptedClientKey, 0, message.encryptedClientKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedClientKey) : message.encryptedClientKey;
            if (message.encryptedPrivateKey != null && message.hasOwnProperty("encryptedPrivateKey"))
                object.encryptedPrivateKey = options.bytes === String ? $util.base64.encode(message.encryptedPrivateKey, 0, message.encryptedPrivateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedPrivateKey) : message.encryptedPrivateKey;
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
            if (message.verificationCode != null && message.hasOwnProperty("verificationCode"))
                object.verificationCode = message.verificationCode;
            if (message.deprecatedAuthHashHash != null && message.hasOwnProperty("deprecatedAuthHashHash"))
                object.deprecatedAuthHashHash = options.bytes === String ? $util.base64.encode(message.deprecatedAuthHashHash, 0, message.deprecatedAuthHashHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.deprecatedAuthHashHash) : message.deprecatedAuthHashHash;
            if (message.deprecatedEncryptedClientKey != null && message.hasOwnProperty("deprecatedEncryptedClientKey"))
                object.deprecatedEncryptedClientKey = options.bytes === String ? $util.base64.encode(message.deprecatedEncryptedClientKey, 0, message.deprecatedEncryptedClientKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.deprecatedEncryptedClientKey) : message.deprecatedEncryptedClientKey;
            if (message.deprecatedEncryptedPrivateKey != null && message.hasOwnProperty("deprecatedEncryptedPrivateKey"))
                object.deprecatedEncryptedPrivateKey = options.bytes === String ? $util.base64.encode(message.deprecatedEncryptedPrivateKey, 0, message.deprecatedEncryptedPrivateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.deprecatedEncryptedPrivateKey) : message.deprecatedEncryptedPrivateKey;
            if (message.deprecatedEncryptionParams != null && message.hasOwnProperty("deprecatedEncryptionParams"))
                object.deprecatedEncryptionParams = options.bytes === String ? $util.base64.encode(message.deprecatedEncryptionParams, 0, message.deprecatedEncryptionParams.length) : options.bytes === Array ? Array.prototype.slice.call(message.deprecatedEncryptionParams) : message.deprecatedEncryptionParams;
            return object;
        };

        /**
         * Converts this RegistrationRequest to JSON.
         * @function toJSON
         * @memberof Authentication.RegistrationRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RegistrationRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RegistrationRequest;
    })();

    Authentication.DeviceResponse = (function() {

        /**
         * Properties of a DeviceResponse.
         * @memberof Authentication
         * @interface IDeviceResponse
         * @property {Uint8Array|null} [encryptedDeviceToken] DeviceResponse encryptedDeviceToken
         * @property {Authentication.DeviceStatus|null} [status] DeviceResponse status
         */

        /**
         * Constructs a new DeviceResponse.
         * @memberof Authentication
         * @classdesc Represents a DeviceResponse.
         * @implements IDeviceResponse
         * @constructor
         * @param {Authentication.IDeviceResponse=} [properties] Properties to set
         */
        function DeviceResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeviceResponse encryptedDeviceToken.
         * @member {Uint8Array} encryptedDeviceToken
         * @memberof Authentication.DeviceResponse
         * @instance
         */
        DeviceResponse.prototype.encryptedDeviceToken = $util.newBuffer([]);

        /**
         * DeviceResponse status.
         * @member {Authentication.DeviceStatus} status
         * @memberof Authentication.DeviceResponse
         * @instance
         */
        DeviceResponse.prototype.status = 0;

        /**
         * Creates a new DeviceResponse instance using the specified properties.
         * @function create
         * @memberof Authentication.DeviceResponse
         * @static
         * @param {Authentication.IDeviceResponse=} [properties] Properties to set
         * @returns {Authentication.DeviceResponse} DeviceResponse instance
         */
        DeviceResponse.create = function create(properties) {
            return new DeviceResponse(properties);
        };

        /**
         * Encodes the specified DeviceResponse message. Does not implicitly {@link Authentication.DeviceResponse.verify|verify} messages.
         * @function encode
         * @memberof Authentication.DeviceResponse
         * @static
         * @param {Authentication.IDeviceResponse} message DeviceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encryptedDeviceToken);
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            return writer;
        };

        /**
         * Encodes the specified DeviceResponse message, length delimited. Does not implicitly {@link Authentication.DeviceResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.DeviceResponse
         * @static
         * @param {Authentication.IDeviceResponse} message DeviceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeviceResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.DeviceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.DeviceResponse} DeviceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.DeviceResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.encryptedDeviceToken = reader.bytes();
                    break;
                case 2:
                    message.status = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DeviceResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.DeviceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.DeviceResponse} DeviceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeviceResponse message.
         * @function verify
         * @memberof Authentication.DeviceResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeviceResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                if (!(message.encryptedDeviceToken && typeof message.encryptedDeviceToken.length === "number" || $util.isString(message.encryptedDeviceToken)))
                    return "encryptedDeviceToken: buffer expected";
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        /**
         * Creates a DeviceResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.DeviceResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.DeviceResponse} DeviceResponse
         */
        DeviceResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.DeviceResponse)
                return object;
            let message = new $root.Authentication.DeviceResponse();
            if (object.encryptedDeviceToken != null)
                if (typeof object.encryptedDeviceToken === "string")
                    $util.base64.decode(object.encryptedDeviceToken, message.encryptedDeviceToken = $util.newBuffer($util.base64.length(object.encryptedDeviceToken)), 0);
                else if (object.encryptedDeviceToken.length)
                    message.encryptedDeviceToken = object.encryptedDeviceToken;
            switch (object.status) {
            case "NEED_APPROVAL":
            case 0:
                message.status = 0;
                break;
            case "OK":
            case 1:
                message.status = 1;
                break;
            case "DEVICE_DISABLED":
            case 2:
                message.status = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a DeviceResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.DeviceResponse
         * @static
         * @param {Authentication.DeviceResponse} message DeviceResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeviceResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.encryptedDeviceToken = "";
                else {
                    object.encryptedDeviceToken = [];
                    if (options.bytes !== Array)
                        object.encryptedDeviceToken = $util.newBuffer(object.encryptedDeviceToken);
                }
                object.status = options.enums === String ? "NEED_APPROVAL" : 0;
            }
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                object.encryptedDeviceToken = options.bytes === String ? $util.base64.encode(message.encryptedDeviceToken, 0, message.encryptedDeviceToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedDeviceToken) : message.encryptedDeviceToken;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.Authentication.DeviceStatus[message.status] : message.status;
            return object;
        };

        /**
         * Converts this DeviceResponse to JSON.
         * @function toJSON
         * @memberof Authentication.DeviceResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeviceResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DeviceResponse;
    })();

    Authentication.Salt = (function() {

        /**
         * Properties of a Salt.
         * @memberof Authentication
         * @interface ISalt
         * @property {number|null} [iterations] Salt iterations
         * @property {Uint8Array|null} [salt] Salt salt
         * @property {number|null} [algorithm] Salt algorithm
         * @property {Uint8Array|null} [uid] Salt uid
         * @property {string|null} [name] Salt name
         */

        /**
         * Constructs a new Salt.
         * @memberof Authentication
         * @classdesc Represents a Salt.
         * @implements ISalt
         * @constructor
         * @param {Authentication.ISalt=} [properties] Properties to set
         */
        function Salt(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Salt iterations.
         * @member {number} iterations
         * @memberof Authentication.Salt
         * @instance
         */
        Salt.prototype.iterations = 0;

        /**
         * Salt salt.
         * @member {Uint8Array} salt
         * @memberof Authentication.Salt
         * @instance
         */
        Salt.prototype.salt = $util.newBuffer([]);

        /**
         * Salt algorithm.
         * @member {number} algorithm
         * @memberof Authentication.Salt
         * @instance
         */
        Salt.prototype.algorithm = 0;

        /**
         * Salt uid.
         * @member {Uint8Array} uid
         * @memberof Authentication.Salt
         * @instance
         */
        Salt.prototype.uid = $util.newBuffer([]);

        /**
         * Salt name.
         * @member {string} name
         * @memberof Authentication.Salt
         * @instance
         */
        Salt.prototype.name = "";

        /**
         * Creates a new Salt instance using the specified properties.
         * @function create
         * @memberof Authentication.Salt
         * @static
         * @param {Authentication.ISalt=} [properties] Properties to set
         * @returns {Authentication.Salt} Salt instance
         */
        Salt.create = function create(properties) {
            return new Salt(properties);
        };

        /**
         * Encodes the specified Salt message. Does not implicitly {@link Authentication.Salt.verify|verify} messages.
         * @function encode
         * @memberof Authentication.Salt
         * @static
         * @param {Authentication.ISalt} message Salt message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Salt.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.iterations != null && message.hasOwnProperty("iterations"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.iterations);
            if (message.salt != null && message.hasOwnProperty("salt"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.salt);
            if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.algorithm);
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.uid);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified Salt message, length delimited. Does not implicitly {@link Authentication.Salt.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.Salt
         * @static
         * @param {Authentication.ISalt} message Salt message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Salt.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Salt message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.Salt
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.Salt} Salt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Salt.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.Salt();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.iterations = reader.int32();
                    break;
                case 2:
                    message.salt = reader.bytes();
                    break;
                case 3:
                    message.algorithm = reader.int32();
                    break;
                case 4:
                    message.uid = reader.bytes();
                    break;
                case 5:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Salt message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.Salt
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.Salt} Salt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Salt.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Salt message.
         * @function verify
         * @memberof Authentication.Salt
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Salt.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.iterations != null && message.hasOwnProperty("iterations"))
                if (!$util.isInteger(message.iterations))
                    return "iterations: integer expected";
            if (message.salt != null && message.hasOwnProperty("salt"))
                if (!(message.salt && typeof message.salt.length === "number" || $util.isString(message.salt)))
                    return "salt: buffer expected";
            if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                if (!$util.isInteger(message.algorithm))
                    return "algorithm: integer expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!(message.uid && typeof message.uid.length === "number" || $util.isString(message.uid)))
                    return "uid: buffer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a Salt message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.Salt
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.Salt} Salt
         */
        Salt.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.Salt)
                return object;
            let message = new $root.Authentication.Salt();
            if (object.iterations != null)
                message.iterations = object.iterations | 0;
            if (object.salt != null)
                if (typeof object.salt === "string")
                    $util.base64.decode(object.salt, message.salt = $util.newBuffer($util.base64.length(object.salt)), 0);
                else if (object.salt.length)
                    message.salt = object.salt;
            if (object.algorithm != null)
                message.algorithm = object.algorithm | 0;
            if (object.uid != null)
                if (typeof object.uid === "string")
                    $util.base64.decode(object.uid, message.uid = $util.newBuffer($util.base64.length(object.uid)), 0);
                else if (object.uid.length)
                    message.uid = object.uid;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a Salt message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.Salt
         * @static
         * @param {Authentication.Salt} message Salt
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Salt.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.iterations = 0;
                if (options.bytes === String)
                    object.salt = "";
                else {
                    object.salt = [];
                    if (options.bytes !== Array)
                        object.salt = $util.newBuffer(object.salt);
                }
                object.algorithm = 0;
                if (options.bytes === String)
                    object.uid = "";
                else {
                    object.uid = [];
                    if (options.bytes !== Array)
                        object.uid = $util.newBuffer(object.uid);
                }
                object.name = "";
            }
            if (message.iterations != null && message.hasOwnProperty("iterations"))
                object.iterations = message.iterations;
            if (message.salt != null && message.hasOwnProperty("salt"))
                object.salt = options.bytes === String ? $util.base64.encode(message.salt, 0, message.salt.length) : options.bytes === Array ? Array.prototype.slice.call(message.salt) : message.salt;
            if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                object.algorithm = message.algorithm;
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = options.bytes === String ? $util.base64.encode(message.uid, 0, message.uid.length) : options.bytes === Array ? Array.prototype.slice.call(message.uid) : message.uid;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this Salt to JSON.
         * @function toJSON
         * @memberof Authentication.Salt
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Salt.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Salt;
    })();

    Authentication.TwoFactorChannel = (function() {

        /**
         * Properties of a TwoFactorChannel.
         * @memberof Authentication
         * @interface ITwoFactorChannel
         * @property {number|null} [type] TwoFactorChannel type
         */

        /**
         * Constructs a new TwoFactorChannel.
         * @memberof Authentication
         * @classdesc Represents a TwoFactorChannel.
         * @implements ITwoFactorChannel
         * @constructor
         * @param {Authentication.ITwoFactorChannel=} [properties] Properties to set
         */
        function TwoFactorChannel(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TwoFactorChannel type.
         * @member {number} type
         * @memberof Authentication.TwoFactorChannel
         * @instance
         */
        TwoFactorChannel.prototype.type = 0;

        /**
         * Creates a new TwoFactorChannel instance using the specified properties.
         * @function create
         * @memberof Authentication.TwoFactorChannel
         * @static
         * @param {Authentication.ITwoFactorChannel=} [properties] Properties to set
         * @returns {Authentication.TwoFactorChannel} TwoFactorChannel instance
         */
        TwoFactorChannel.create = function create(properties) {
            return new TwoFactorChannel(properties);
        };

        /**
         * Encodes the specified TwoFactorChannel message. Does not implicitly {@link Authentication.TwoFactorChannel.verify|verify} messages.
         * @function encode
         * @memberof Authentication.TwoFactorChannel
         * @static
         * @param {Authentication.ITwoFactorChannel} message TwoFactorChannel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TwoFactorChannel.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            return writer;
        };

        /**
         * Encodes the specified TwoFactorChannel message, length delimited. Does not implicitly {@link Authentication.TwoFactorChannel.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.TwoFactorChannel
         * @static
         * @param {Authentication.ITwoFactorChannel} message TwoFactorChannel message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TwoFactorChannel.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TwoFactorChannel message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.TwoFactorChannel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.TwoFactorChannel} TwoFactorChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TwoFactorChannel.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.TwoFactorChannel();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TwoFactorChannel message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.TwoFactorChannel
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.TwoFactorChannel} TwoFactorChannel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TwoFactorChannel.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TwoFactorChannel message.
         * @function verify
         * @memberof Authentication.TwoFactorChannel
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TwoFactorChannel.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            return null;
        };

        /**
         * Creates a TwoFactorChannel message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.TwoFactorChannel
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.TwoFactorChannel} TwoFactorChannel
         */
        TwoFactorChannel.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.TwoFactorChannel)
                return object;
            let message = new $root.Authentication.TwoFactorChannel();
            if (object.type != null)
                message.type = object.type | 0;
            return message;
        };

        /**
         * Creates a plain object from a TwoFactorChannel message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.TwoFactorChannel
         * @static
         * @param {Authentication.TwoFactorChannel} message TwoFactorChannel
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TwoFactorChannel.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.type = 0;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            return object;
        };

        /**
         * Converts this TwoFactorChannel to JSON.
         * @function toJSON
         * @memberof Authentication.TwoFactorChannel
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TwoFactorChannel.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TwoFactorChannel;
    })();

    Authentication.PreLoginResponse = (function() {

        /**
         * Properties of a PreLoginResponse.
         * @memberof Authentication
         * @interface IPreLoginResponse
         * @property {Authentication.DeviceStatus|null} [status] PreLoginResponse status
         * @property {Array.<Authentication.ISalt>|null} [salt] PreLoginResponse salt
         * @property {Array.<Authentication.ITwoFactorChannel>|null} [twoFactorChannel] PreLoginResponse twoFactorChannel
         */

        /**
         * Constructs a new PreLoginResponse.
         * @memberof Authentication
         * @classdesc Represents a PreLoginResponse.
         * @implements IPreLoginResponse
         * @constructor
         * @param {Authentication.IPreLoginResponse=} [properties] Properties to set
         */
        function PreLoginResponse(properties) {
            this.salt = [];
            this.twoFactorChannel = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PreLoginResponse status.
         * @member {Authentication.DeviceStatus} status
         * @memberof Authentication.PreLoginResponse
         * @instance
         */
        PreLoginResponse.prototype.status = 0;

        /**
         * PreLoginResponse salt.
         * @member {Array.<Authentication.ISalt>} salt
         * @memberof Authentication.PreLoginResponse
         * @instance
         */
        PreLoginResponse.prototype.salt = $util.emptyArray;

        /**
         * PreLoginResponse twoFactorChannel.
         * @member {Array.<Authentication.ITwoFactorChannel>} twoFactorChannel
         * @memberof Authentication.PreLoginResponse
         * @instance
         */
        PreLoginResponse.prototype.twoFactorChannel = $util.emptyArray;

        /**
         * Creates a new PreLoginResponse instance using the specified properties.
         * @function create
         * @memberof Authentication.PreLoginResponse
         * @static
         * @param {Authentication.IPreLoginResponse=} [properties] Properties to set
         * @returns {Authentication.PreLoginResponse} PreLoginResponse instance
         */
        PreLoginResponse.create = function create(properties) {
            return new PreLoginResponse(properties);
        };

        /**
         * Encodes the specified PreLoginResponse message. Does not implicitly {@link Authentication.PreLoginResponse.verify|verify} messages.
         * @function encode
         * @memberof Authentication.PreLoginResponse
         * @static
         * @param {Authentication.IPreLoginResponse} message PreLoginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PreLoginResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
            if (message.salt != null && message.salt.length)
                for (let i = 0; i < message.salt.length; ++i)
                    $root.Authentication.Salt.encode(message.salt[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.twoFactorChannel != null && message.twoFactorChannel.length)
                for (let i = 0; i < message.twoFactorChannel.length; ++i)
                    $root.Authentication.TwoFactorChannel.encode(message.twoFactorChannel[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PreLoginResponse message, length delimited. Does not implicitly {@link Authentication.PreLoginResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.PreLoginResponse
         * @static
         * @param {Authentication.IPreLoginResponse} message PreLoginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PreLoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PreLoginResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.PreLoginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.PreLoginResponse} PreLoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PreLoginResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.PreLoginResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.status = reader.int32();
                    break;
                case 2:
                    if (!(message.salt && message.salt.length))
                        message.salt = [];
                    message.salt.push($root.Authentication.Salt.decode(reader, reader.uint32()));
                    break;
                case 3:
                    if (!(message.twoFactorChannel && message.twoFactorChannel.length))
                        message.twoFactorChannel = [];
                    message.twoFactorChannel.push($root.Authentication.TwoFactorChannel.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PreLoginResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.PreLoginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.PreLoginResponse} PreLoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PreLoginResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PreLoginResponse message.
         * @function verify
         * @memberof Authentication.PreLoginResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PreLoginResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.status != null && message.hasOwnProperty("status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.salt != null && message.hasOwnProperty("salt")) {
                if (!Array.isArray(message.salt))
                    return "salt: array expected";
                for (let i = 0; i < message.salt.length; ++i) {
                    let error = $root.Authentication.Salt.verify(message.salt[i]);
                    if (error)
                        return "salt." + error;
                }
            }
            if (message.twoFactorChannel != null && message.hasOwnProperty("twoFactorChannel")) {
                if (!Array.isArray(message.twoFactorChannel))
                    return "twoFactorChannel: array expected";
                for (let i = 0; i < message.twoFactorChannel.length; ++i) {
                    let error = $root.Authentication.TwoFactorChannel.verify(message.twoFactorChannel[i]);
                    if (error)
                        return "twoFactorChannel." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PreLoginResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.PreLoginResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.PreLoginResponse} PreLoginResponse
         */
        PreLoginResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.PreLoginResponse)
                return object;
            let message = new $root.Authentication.PreLoginResponse();
            switch (object.status) {
            case "NEED_APPROVAL":
            case 0:
                message.status = 0;
                break;
            case "OK":
            case 1:
                message.status = 1;
                break;
            case "DEVICE_DISABLED":
            case 2:
                message.status = 2;
                break;
            }
            if (object.salt) {
                if (!Array.isArray(object.salt))
                    throw TypeError(".Authentication.PreLoginResponse.salt: array expected");
                message.salt = [];
                for (let i = 0; i < object.salt.length; ++i) {
                    if (typeof object.salt[i] !== "object")
                        throw TypeError(".Authentication.PreLoginResponse.salt: object expected");
                    message.salt[i] = $root.Authentication.Salt.fromObject(object.salt[i]);
                }
            }
            if (object.twoFactorChannel) {
                if (!Array.isArray(object.twoFactorChannel))
                    throw TypeError(".Authentication.PreLoginResponse.twoFactorChannel: array expected");
                message.twoFactorChannel = [];
                for (let i = 0; i < object.twoFactorChannel.length; ++i) {
                    if (typeof object.twoFactorChannel[i] !== "object")
                        throw TypeError(".Authentication.PreLoginResponse.twoFactorChannel: object expected");
                    message.twoFactorChannel[i] = $root.Authentication.TwoFactorChannel.fromObject(object.twoFactorChannel[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PreLoginResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.PreLoginResponse
         * @static
         * @param {Authentication.PreLoginResponse} message PreLoginResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PreLoginResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.salt = [];
                object.twoFactorChannel = [];
            }
            if (options.defaults)
                object.status = options.enums === String ? "NEED_APPROVAL" : 0;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = options.enums === String ? $root.Authentication.DeviceStatus[message.status] : message.status;
            if (message.salt && message.salt.length) {
                object.salt = [];
                for (let j = 0; j < message.salt.length; ++j)
                    object.salt[j] = $root.Authentication.Salt.toObject(message.salt[j], options);
            }
            if (message.twoFactorChannel && message.twoFactorChannel.length) {
                object.twoFactorChannel = [];
                for (let j = 0; j < message.twoFactorChannel.length; ++j)
                    object.twoFactorChannel[j] = $root.Authentication.TwoFactorChannel.toObject(message.twoFactorChannel[j], options);
            }
            return object;
        };

        /**
         * Converts this PreLoginResponse to JSON.
         * @function toJSON
         * @memberof Authentication.PreLoginResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PreLoginResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PreLoginResponse;
    })();

    Authentication.LoginResponse = (function() {

        /**
         * Properties of a LoginResponse.
         * @memberof Authentication
         * @interface ILoginResponse
         * @property {Uint8Array|null} [encryrptedSessionToken] LoginResponse encryrptedSessionToken
         * @property {Authentication.ILicense|null} [vault] LoginResponse vault
         * @property {Authentication.ILicense|null} [chat] LoginResponse chat
         * @property {Authentication.ILicense|null} [storage] LoginResponse storage
         * @property {Authentication.ILicense|null} [breachWatch] LoginResponse breachWatch
         * @property {Authentication.AccountType|null} [accountType] LoginResponse accountType
         * @property {Uint8Array|null} [encryptedDAT] LoginResponse encryptedDAT
         * @property {Uint8Array|null} [encryptedPAT] LoginResponse encryptedPAT
         * @property {Uint8Array|null} [encryptedEAT] LoginResponse encryptedEAT
         * @property {Uint8Array|null} [encryptedDataKey] LoginResponse encryptedDataKey
         * @property {Array.<Authentication.SessionTokenType>|null} [sessionTokenType] LoginResponse sessionTokenType
         */

        /**
         * Constructs a new LoginResponse.
         * @memberof Authentication
         * @classdesc Represents a LoginResponse.
         * @implements ILoginResponse
         * @constructor
         * @param {Authentication.ILoginResponse=} [properties] Properties to set
         */
        function LoginResponse(properties) {
            this.sessionTokenType = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginResponse encryrptedSessionToken.
         * @member {Uint8Array} encryrptedSessionToken
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.encryrptedSessionToken = $util.newBuffer([]);

        /**
         * LoginResponse vault.
         * @member {Authentication.ILicense|null|undefined} vault
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.vault = null;

        /**
         * LoginResponse chat.
         * @member {Authentication.ILicense|null|undefined} chat
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.chat = null;

        /**
         * LoginResponse storage.
         * @member {Authentication.ILicense|null|undefined} storage
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.storage = null;

        /**
         * LoginResponse breachWatch.
         * @member {Authentication.ILicense|null|undefined} breachWatch
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.breachWatch = null;

        /**
         * LoginResponse accountType.
         * @member {Authentication.AccountType} accountType
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.accountType = 0;

        /**
         * LoginResponse encryptedDAT.
         * @member {Uint8Array} encryptedDAT
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.encryptedDAT = $util.newBuffer([]);

        /**
         * LoginResponse encryptedPAT.
         * @member {Uint8Array} encryptedPAT
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.encryptedPAT = $util.newBuffer([]);

        /**
         * LoginResponse encryptedEAT.
         * @member {Uint8Array} encryptedEAT
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.encryptedEAT = $util.newBuffer([]);

        /**
         * LoginResponse encryptedDataKey.
         * @member {Uint8Array} encryptedDataKey
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.encryptedDataKey = $util.newBuffer([]);

        /**
         * LoginResponse sessionTokenType.
         * @member {Array.<Authentication.SessionTokenType>} sessionTokenType
         * @memberof Authentication.LoginResponse
         * @instance
         */
        LoginResponse.prototype.sessionTokenType = $util.emptyArray;

        /**
         * Creates a new LoginResponse instance using the specified properties.
         * @function create
         * @memberof Authentication.LoginResponse
         * @static
         * @param {Authentication.ILoginResponse=} [properties] Properties to set
         * @returns {Authentication.LoginResponse} LoginResponse instance
         */
        LoginResponse.create = function create(properties) {
            return new LoginResponse(properties);
        };

        /**
         * Encodes the specified LoginResponse message. Does not implicitly {@link Authentication.LoginResponse.verify|verify} messages.
         * @function encode
         * @memberof Authentication.LoginResponse
         * @static
         * @param {Authentication.ILoginResponse} message LoginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.encryrptedSessionToken != null && message.hasOwnProperty("encryrptedSessionToken"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encryrptedSessionToken);
            if (message.vault != null && message.hasOwnProperty("vault"))
                $root.Authentication.License.encode(message.vault, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.chat != null && message.hasOwnProperty("chat"))
                $root.Authentication.License.encode(message.chat, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.storage != null && message.hasOwnProperty("storage"))
                $root.Authentication.License.encode(message.storage, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.breachWatch != null && message.hasOwnProperty("breachWatch"))
                $root.Authentication.License.encode(message.breachWatch, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.accountType != null && message.hasOwnProperty("accountType"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.accountType);
            if (message.encryptedDAT != null && message.hasOwnProperty("encryptedDAT"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.encryptedDAT);
            if (message.encryptedPAT != null && message.hasOwnProperty("encryptedPAT"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.encryptedPAT);
            if (message.encryptedEAT != null && message.hasOwnProperty("encryptedEAT"))
                writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.encryptedEAT);
            if (message.encryptedDataKey != null && message.hasOwnProperty("encryptedDataKey"))
                writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.encryptedDataKey);
            if (message.sessionTokenType != null && message.sessionTokenType.length) {
                writer.uint32(/* id 11, wireType 2 =*/90).fork();
                for (let i = 0; i < message.sessionTokenType.length; ++i)
                    writer.int32(message.sessionTokenType[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified LoginResponse message, length delimited. Does not implicitly {@link Authentication.LoginResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.LoginResponse
         * @static
         * @param {Authentication.ILoginResponse} message LoginResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.LoginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.LoginResponse} LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.LoginResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.encryrptedSessionToken = reader.bytes();
                    break;
                case 2:
                    message.vault = $root.Authentication.License.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.chat = $root.Authentication.License.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.storage = $root.Authentication.License.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.breachWatch = $root.Authentication.License.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.accountType = reader.int32();
                    break;
                case 7:
                    message.encryptedDAT = reader.bytes();
                    break;
                case 8:
                    message.encryptedPAT = reader.bytes();
                    break;
                case 9:
                    message.encryptedEAT = reader.bytes();
                    break;
                case 10:
                    message.encryptedDataKey = reader.bytes();
                    break;
                case 11:
                    if (!(message.sessionTokenType && message.sessionTokenType.length))
                        message.sessionTokenType = [];
                    if ((tag & 7) === 2) {
                        let end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.sessionTokenType.push(reader.int32());
                    } else
                        message.sessionTokenType.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.LoginResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.LoginResponse} LoginResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginResponse message.
         * @function verify
         * @memberof Authentication.LoginResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.encryrptedSessionToken != null && message.hasOwnProperty("encryrptedSessionToken"))
                if (!(message.encryrptedSessionToken && typeof message.encryrptedSessionToken.length === "number" || $util.isString(message.encryrptedSessionToken)))
                    return "encryrptedSessionToken: buffer expected";
            if (message.vault != null && message.hasOwnProperty("vault")) {
                let error = $root.Authentication.License.verify(message.vault);
                if (error)
                    return "vault." + error;
            }
            if (message.chat != null && message.hasOwnProperty("chat")) {
                let error = $root.Authentication.License.verify(message.chat);
                if (error)
                    return "chat." + error;
            }
            if (message.storage != null && message.hasOwnProperty("storage")) {
                let error = $root.Authentication.License.verify(message.storage);
                if (error)
                    return "storage." + error;
            }
            if (message.breachWatch != null && message.hasOwnProperty("breachWatch")) {
                let error = $root.Authentication.License.verify(message.breachWatch);
                if (error)
                    return "breachWatch." + error;
            }
            if (message.accountType != null && message.hasOwnProperty("accountType"))
                switch (message.accountType) {
                default:
                    return "accountType: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.encryptedDAT != null && message.hasOwnProperty("encryptedDAT"))
                if (!(message.encryptedDAT && typeof message.encryptedDAT.length === "number" || $util.isString(message.encryptedDAT)))
                    return "encryptedDAT: buffer expected";
            if (message.encryptedPAT != null && message.hasOwnProperty("encryptedPAT"))
                if (!(message.encryptedPAT && typeof message.encryptedPAT.length === "number" || $util.isString(message.encryptedPAT)))
                    return "encryptedPAT: buffer expected";
            if (message.encryptedEAT != null && message.hasOwnProperty("encryptedEAT"))
                if (!(message.encryptedEAT && typeof message.encryptedEAT.length === "number" || $util.isString(message.encryptedEAT)))
                    return "encryptedEAT: buffer expected";
            if (message.encryptedDataKey != null && message.hasOwnProperty("encryptedDataKey"))
                if (!(message.encryptedDataKey && typeof message.encryptedDataKey.length === "number" || $util.isString(message.encryptedDataKey)))
                    return "encryptedDataKey: buffer expected";
            if (message.sessionTokenType != null && message.hasOwnProperty("sessionTokenType")) {
                if (!Array.isArray(message.sessionTokenType))
                    return "sessionTokenType: array expected";
                for (let i = 0; i < message.sessionTokenType.length; ++i)
                    switch (message.sessionTokenType[i]) {
                    default:
                        return "sessionTokenType: enum value[] expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
            }
            return null;
        };

        /**
         * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.LoginResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.LoginResponse} LoginResponse
         */
        LoginResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.LoginResponse)
                return object;
            let message = new $root.Authentication.LoginResponse();
            if (object.encryrptedSessionToken != null)
                if (typeof object.encryrptedSessionToken === "string")
                    $util.base64.decode(object.encryrptedSessionToken, message.encryrptedSessionToken = $util.newBuffer($util.base64.length(object.encryrptedSessionToken)), 0);
                else if (object.encryrptedSessionToken.length)
                    message.encryrptedSessionToken = object.encryrptedSessionToken;
            if (object.vault != null) {
                if (typeof object.vault !== "object")
                    throw TypeError(".Authentication.LoginResponse.vault: object expected");
                message.vault = $root.Authentication.License.fromObject(object.vault);
            }
            if (object.chat != null) {
                if (typeof object.chat !== "object")
                    throw TypeError(".Authentication.LoginResponse.chat: object expected");
                message.chat = $root.Authentication.License.fromObject(object.chat);
            }
            if (object.storage != null) {
                if (typeof object.storage !== "object")
                    throw TypeError(".Authentication.LoginResponse.storage: object expected");
                message.storage = $root.Authentication.License.fromObject(object.storage);
            }
            if (object.breachWatch != null) {
                if (typeof object.breachWatch !== "object")
                    throw TypeError(".Authentication.LoginResponse.breachWatch: object expected");
                message.breachWatch = $root.Authentication.License.fromObject(object.breachWatch);
            }
            switch (object.accountType) {
            case "CONSUMER":
            case 0:
                message.accountType = 0;
                break;
            case "FAMILY":
            case 1:
                message.accountType = 1;
                break;
            case "ENTERPRISE":
            case 2:
                message.accountType = 2;
                break;
            }
            if (object.encryptedDAT != null)
                if (typeof object.encryptedDAT === "string")
                    $util.base64.decode(object.encryptedDAT, message.encryptedDAT = $util.newBuffer($util.base64.length(object.encryptedDAT)), 0);
                else if (object.encryptedDAT.length)
                    message.encryptedDAT = object.encryptedDAT;
            if (object.encryptedPAT != null)
                if (typeof object.encryptedPAT === "string")
                    $util.base64.decode(object.encryptedPAT, message.encryptedPAT = $util.newBuffer($util.base64.length(object.encryptedPAT)), 0);
                else if (object.encryptedPAT.length)
                    message.encryptedPAT = object.encryptedPAT;
            if (object.encryptedEAT != null)
                if (typeof object.encryptedEAT === "string")
                    $util.base64.decode(object.encryptedEAT, message.encryptedEAT = $util.newBuffer($util.base64.length(object.encryptedEAT)), 0);
                else if (object.encryptedEAT.length)
                    message.encryptedEAT = object.encryptedEAT;
            if (object.encryptedDataKey != null)
                if (typeof object.encryptedDataKey === "string")
                    $util.base64.decode(object.encryptedDataKey, message.encryptedDataKey = $util.newBuffer($util.base64.length(object.encryptedDataKey)), 0);
                else if (object.encryptedDataKey.length)
                    message.encryptedDataKey = object.encryptedDataKey;
            if (object.sessionTokenType) {
                if (!Array.isArray(object.sessionTokenType))
                    throw TypeError(".Authentication.LoginResponse.sessionTokenType: array expected");
                message.sessionTokenType = [];
                for (let i = 0; i < object.sessionTokenType.length; ++i)
                    switch (object.sessionTokenType[i]) {
                    default:
                    case "NO_RESTRICTION":
                    case 0:
                        message.sessionTokenType[i] = 0;
                        break;
                    case "ACCOUNT_RECOVERY":
                    case 1:
                        message.sessionTokenType[i] = 1;
                        break;
                    case "SHARE_ACCOUNT":
                    case 2:
                        message.sessionTokenType[i] = 2;
                        break;
                    case "PURCHASE":
                    case 3:
                        message.sessionTokenType[i] = 3;
                        break;
                    case "RESTRICT":
                    case 4:
                        message.sessionTokenType[i] = 4;
                        break;
                    case "ACCEPT_INVITE":
                    case 5:
                        message.sessionTokenType[i] = 5;
                        break;
                    }
            }
            return message;
        };

        /**
         * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.LoginResponse
         * @static
         * @param {Authentication.LoginResponse} message LoginResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.sessionTokenType = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.encryrptedSessionToken = "";
                else {
                    object.encryrptedSessionToken = [];
                    if (options.bytes !== Array)
                        object.encryrptedSessionToken = $util.newBuffer(object.encryrptedSessionToken);
                }
                object.vault = null;
                object.chat = null;
                object.storage = null;
                object.breachWatch = null;
                object.accountType = options.enums === String ? "CONSUMER" : 0;
                if (options.bytes === String)
                    object.encryptedDAT = "";
                else {
                    object.encryptedDAT = [];
                    if (options.bytes !== Array)
                        object.encryptedDAT = $util.newBuffer(object.encryptedDAT);
                }
                if (options.bytes === String)
                    object.encryptedPAT = "";
                else {
                    object.encryptedPAT = [];
                    if (options.bytes !== Array)
                        object.encryptedPAT = $util.newBuffer(object.encryptedPAT);
                }
                if (options.bytes === String)
                    object.encryptedEAT = "";
                else {
                    object.encryptedEAT = [];
                    if (options.bytes !== Array)
                        object.encryptedEAT = $util.newBuffer(object.encryptedEAT);
                }
                if (options.bytes === String)
                    object.encryptedDataKey = "";
                else {
                    object.encryptedDataKey = [];
                    if (options.bytes !== Array)
                        object.encryptedDataKey = $util.newBuffer(object.encryptedDataKey);
                }
            }
            if (message.encryrptedSessionToken != null && message.hasOwnProperty("encryrptedSessionToken"))
                object.encryrptedSessionToken = options.bytes === String ? $util.base64.encode(message.encryrptedSessionToken, 0, message.encryrptedSessionToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryrptedSessionToken) : message.encryrptedSessionToken;
            if (message.vault != null && message.hasOwnProperty("vault"))
                object.vault = $root.Authentication.License.toObject(message.vault, options);
            if (message.chat != null && message.hasOwnProperty("chat"))
                object.chat = $root.Authentication.License.toObject(message.chat, options);
            if (message.storage != null && message.hasOwnProperty("storage"))
                object.storage = $root.Authentication.License.toObject(message.storage, options);
            if (message.breachWatch != null && message.hasOwnProperty("breachWatch"))
                object.breachWatch = $root.Authentication.License.toObject(message.breachWatch, options);
            if (message.accountType != null && message.hasOwnProperty("accountType"))
                object.accountType = options.enums === String ? $root.Authentication.AccountType[message.accountType] : message.accountType;
            if (message.encryptedDAT != null && message.hasOwnProperty("encryptedDAT"))
                object.encryptedDAT = options.bytes === String ? $util.base64.encode(message.encryptedDAT, 0, message.encryptedDAT.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedDAT) : message.encryptedDAT;
            if (message.encryptedPAT != null && message.hasOwnProperty("encryptedPAT"))
                object.encryptedPAT = options.bytes === String ? $util.base64.encode(message.encryptedPAT, 0, message.encryptedPAT.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedPAT) : message.encryptedPAT;
            if (message.encryptedEAT != null && message.hasOwnProperty("encryptedEAT"))
                object.encryptedEAT = options.bytes === String ? $util.base64.encode(message.encryptedEAT, 0, message.encryptedEAT.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedEAT) : message.encryptedEAT;
            if (message.encryptedDataKey != null && message.hasOwnProperty("encryptedDataKey"))
                object.encryptedDataKey = options.bytes === String ? $util.base64.encode(message.encryptedDataKey, 0, message.encryptedDataKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedDataKey) : message.encryptedDataKey;
            if (message.sessionTokenType && message.sessionTokenType.length) {
                object.sessionTokenType = [];
                for (let j = 0; j < message.sessionTokenType.length; ++j)
                    object.sessionTokenType[j] = options.enums === String ? $root.Authentication.SessionTokenType[message.sessionTokenType[j]] : message.sessionTokenType[j];
            }
            return object;
        };

        /**
         * Converts this LoginResponse to JSON.
         * @function toJSON
         * @memberof Authentication.LoginResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginResponse;
    })();

    Authentication.License = (function() {

        /**
         * Properties of a License.
         * @memberof Authentication
         * @interface ILicense
         * @property {number|Long|null} [created] License created
         * @property {number|Long|null} [expiration] License expiration
         * @property {Authentication.LicenseStatus|null} [licenseStatus] License licenseStatus
         * @property {boolean|null} [paid] License paid
         * @property {string|null} [message] License message
         */

        /**
         * Constructs a new License.
         * @memberof Authentication
         * @classdesc Represents a License.
         * @implements ILicense
         * @constructor
         * @param {Authentication.ILicense=} [properties] Properties to set
         */
        function License(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * License created.
         * @member {number|Long} created
         * @memberof Authentication.License
         * @instance
         */
        License.prototype.created = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * License expiration.
         * @member {number|Long} expiration
         * @memberof Authentication.License
         * @instance
         */
        License.prototype.expiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * License licenseStatus.
         * @member {Authentication.LicenseStatus} licenseStatus
         * @memberof Authentication.License
         * @instance
         */
        License.prototype.licenseStatus = 0;

        /**
         * License paid.
         * @member {boolean} paid
         * @memberof Authentication.License
         * @instance
         */
        License.prototype.paid = false;

        /**
         * License message.
         * @member {string} message
         * @memberof Authentication.License
         * @instance
         */
        License.prototype.message = "";

        /**
         * Creates a new License instance using the specified properties.
         * @function create
         * @memberof Authentication.License
         * @static
         * @param {Authentication.ILicense=} [properties] Properties to set
         * @returns {Authentication.License} License instance
         */
        License.create = function create(properties) {
            return new License(properties);
        };

        /**
         * Encodes the specified License message. Does not implicitly {@link Authentication.License.verify|verify} messages.
         * @function encode
         * @memberof Authentication.License
         * @static
         * @param {Authentication.ILicense} message License message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        License.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.created != null && message.hasOwnProperty("created"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.created);
            if (message.expiration != null && message.hasOwnProperty("expiration"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.expiration);
            if (message.licenseStatus != null && message.hasOwnProperty("licenseStatus"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.licenseStatus);
            if (message.paid != null && message.hasOwnProperty("paid"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.paid);
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified License message, length delimited. Does not implicitly {@link Authentication.License.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.License
         * @static
         * @param {Authentication.ILicense} message License message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        License.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a License message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.License
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.License} License
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        License.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.License();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.created = reader.int64();
                    break;
                case 2:
                    message.expiration = reader.int64();
                    break;
                case 3:
                    message.licenseStatus = reader.int32();
                    break;
                case 4:
                    message.paid = reader.bool();
                    break;
                case 5:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a License message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.License
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.License} License
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        License.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a License message.
         * @function verify
         * @memberof Authentication.License
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        License.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.created != null && message.hasOwnProperty("created"))
                if (!$util.isInteger(message.created) && !(message.created && $util.isInteger(message.created.low) && $util.isInteger(message.created.high)))
                    return "created: integer|Long expected";
            if (message.expiration != null && message.hasOwnProperty("expiration"))
                if (!$util.isInteger(message.expiration) && !(message.expiration && $util.isInteger(message.expiration.low) && $util.isInteger(message.expiration.high)))
                    return "expiration: integer|Long expected";
            if (message.licenseStatus != null && message.hasOwnProperty("licenseStatus"))
                switch (message.licenseStatus) {
                default:
                    return "licenseStatus: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.paid != null && message.hasOwnProperty("paid"))
                if (typeof message.paid !== "boolean")
                    return "paid: boolean expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates a License message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.License
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.License} License
         */
        License.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.License)
                return object;
            let message = new $root.Authentication.License();
            if (object.created != null)
                if ($util.Long)
                    (message.created = $util.Long.fromValue(object.created)).unsigned = false;
                else if (typeof object.created === "string")
                    message.created = parseInt(object.created, 10);
                else if (typeof object.created === "number")
                    message.created = object.created;
                else if (typeof object.created === "object")
                    message.created = new $util.LongBits(object.created.low >>> 0, object.created.high >>> 0).toNumber();
            if (object.expiration != null)
                if ($util.Long)
                    (message.expiration = $util.Long.fromValue(object.expiration)).unsigned = false;
                else if (typeof object.expiration === "string")
                    message.expiration = parseInt(object.expiration, 10);
                else if (typeof object.expiration === "number")
                    message.expiration = object.expiration;
                else if (typeof object.expiration === "object")
                    message.expiration = new $util.LongBits(object.expiration.low >>> 0, object.expiration.high >>> 0).toNumber();
            switch (object.licenseStatus) {
            case "OTHER":
            case 0:
                message.licenseStatus = 0;
                break;
            case "ACTIVE":
            case 1:
                message.licenseStatus = 1;
                break;
            case "EXPIRED":
            case 2:
                message.licenseStatus = 2;
                break;
            case "DISABLED":
            case 3:
                message.licenseStatus = 3;
                break;
            }
            if (object.paid != null)
                message.paid = Boolean(object.paid);
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a License message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.License
         * @static
         * @param {Authentication.License} message License
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        License.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.created = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.created = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.expiration = options.longs === String ? "0" : 0;
                object.licenseStatus = options.enums === String ? "OTHER" : 0;
                object.paid = false;
                object.message = "";
            }
            if (message.created != null && message.hasOwnProperty("created"))
                if (typeof message.created === "number")
                    object.created = options.longs === String ? String(message.created) : message.created;
                else
                    object.created = options.longs === String ? $util.Long.prototype.toString.call(message.created) : options.longs === Number ? new $util.LongBits(message.created.low >>> 0, message.created.high >>> 0).toNumber() : message.created;
            if (message.expiration != null && message.hasOwnProperty("expiration"))
                if (typeof message.expiration === "number")
                    object.expiration = options.longs === String ? String(message.expiration) : message.expiration;
                else
                    object.expiration = options.longs === String ? $util.Long.prototype.toString.call(message.expiration) : options.longs === Number ? new $util.LongBits(message.expiration.low >>> 0, message.expiration.high >>> 0).toNumber() : message.expiration;
            if (message.licenseStatus != null && message.hasOwnProperty("licenseStatus"))
                object.licenseStatus = options.enums === String ? $root.Authentication.LicenseStatus[message.licenseStatus] : message.licenseStatus;
            if (message.paid != null && message.hasOwnProperty("paid"))
                object.paid = message.paid;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this License to JSON.
         * @function toJSON
         * @memberof Authentication.License
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        License.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return License;
    })();

    Authentication.OwnerlessRecord = (function() {

        /**
         * Properties of an OwnerlessRecord.
         * @memberof Authentication
         * @interface IOwnerlessRecord
         * @property {Uint8Array|null} [recordUid] OwnerlessRecord recordUid
         * @property {Uint8Array|null} [recordKey] OwnerlessRecord recordKey
         * @property {number|null} [status] OwnerlessRecord status
         */

        /**
         * Constructs a new OwnerlessRecord.
         * @memberof Authentication
         * @classdesc Represents an OwnerlessRecord.
         * @implements IOwnerlessRecord
         * @constructor
         * @param {Authentication.IOwnerlessRecord=} [properties] Properties to set
         */
        function OwnerlessRecord(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OwnerlessRecord recordUid.
         * @member {Uint8Array} recordUid
         * @memberof Authentication.OwnerlessRecord
         * @instance
         */
        OwnerlessRecord.prototype.recordUid = $util.newBuffer([]);

        /**
         * OwnerlessRecord recordKey.
         * @member {Uint8Array} recordKey
         * @memberof Authentication.OwnerlessRecord
         * @instance
         */
        OwnerlessRecord.prototype.recordKey = $util.newBuffer([]);

        /**
         * OwnerlessRecord status.
         * @member {number} status
         * @memberof Authentication.OwnerlessRecord
         * @instance
         */
        OwnerlessRecord.prototype.status = 0;

        /**
         * Creates a new OwnerlessRecord instance using the specified properties.
         * @function create
         * @memberof Authentication.OwnerlessRecord
         * @static
         * @param {Authentication.IOwnerlessRecord=} [properties] Properties to set
         * @returns {Authentication.OwnerlessRecord} OwnerlessRecord instance
         */
        OwnerlessRecord.create = function create(properties) {
            return new OwnerlessRecord(properties);
        };

        /**
         * Encodes the specified OwnerlessRecord message. Does not implicitly {@link Authentication.OwnerlessRecord.verify|verify} messages.
         * @function encode
         * @memberof Authentication.OwnerlessRecord
         * @static
         * @param {Authentication.IOwnerlessRecord} message OwnerlessRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OwnerlessRecord.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.recordUid != null && message.hasOwnProperty("recordUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
            if (message.recordKey != null && message.hasOwnProperty("recordKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recordKey);
            if (message.status != null && message.hasOwnProperty("status"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
            return writer;
        };

        /**
         * Encodes the specified OwnerlessRecord message, length delimited. Does not implicitly {@link Authentication.OwnerlessRecord.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.OwnerlessRecord
         * @static
         * @param {Authentication.IOwnerlessRecord} message OwnerlessRecord message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OwnerlessRecord.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OwnerlessRecord message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.OwnerlessRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.OwnerlessRecord} OwnerlessRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OwnerlessRecord.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.OwnerlessRecord();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.recordUid = reader.bytes();
                    break;
                case 2:
                    message.recordKey = reader.bytes();
                    break;
                case 3:
                    message.status = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OwnerlessRecord message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.OwnerlessRecord
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.OwnerlessRecord} OwnerlessRecord
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OwnerlessRecord.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OwnerlessRecord message.
         * @function verify
         * @memberof Authentication.OwnerlessRecord
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OwnerlessRecord.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.recordUid != null && message.hasOwnProperty("recordUid"))
                if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                    return "recordUid: buffer expected";
            if (message.recordKey != null && message.hasOwnProperty("recordKey"))
                if (!(message.recordKey && typeof message.recordKey.length === "number" || $util.isString(message.recordKey)))
                    return "recordKey: buffer expected";
            if (message.status != null && message.hasOwnProperty("status"))
                if (!$util.isInteger(message.status))
                    return "status: integer expected";
            return null;
        };

        /**
         * Creates an OwnerlessRecord message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.OwnerlessRecord
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.OwnerlessRecord} OwnerlessRecord
         */
        OwnerlessRecord.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.OwnerlessRecord)
                return object;
            let message = new $root.Authentication.OwnerlessRecord();
            if (object.recordUid != null)
                if (typeof object.recordUid === "string")
                    $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                else if (object.recordUid.length)
                    message.recordUid = object.recordUid;
            if (object.recordKey != null)
                if (typeof object.recordKey === "string")
                    $util.base64.decode(object.recordKey, message.recordKey = $util.newBuffer($util.base64.length(object.recordKey)), 0);
                else if (object.recordKey.length)
                    message.recordKey = object.recordKey;
            if (object.status != null)
                message.status = object.status | 0;
            return message;
        };

        /**
         * Creates a plain object from an OwnerlessRecord message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.OwnerlessRecord
         * @static
         * @param {Authentication.OwnerlessRecord} message OwnerlessRecord
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OwnerlessRecord.toObject = function toObject(message, options) {
            if (!options)
                options = {};
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
                    object.recordKey = "";
                else {
                    object.recordKey = [];
                    if (options.bytes !== Array)
                        object.recordKey = $util.newBuffer(object.recordKey);
                }
                object.status = 0;
            }
            if (message.recordUid != null && message.hasOwnProperty("recordUid"))
                object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
            if (message.recordKey != null && message.hasOwnProperty("recordKey"))
                object.recordKey = options.bytes === String ? $util.base64.encode(message.recordKey, 0, message.recordKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordKey) : message.recordKey;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            return object;
        };

        /**
         * Converts this OwnerlessRecord to JSON.
         * @function toJSON
         * @memberof Authentication.OwnerlessRecord
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OwnerlessRecord.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OwnerlessRecord;
    })();

    Authentication.OwnerlessRecords = (function() {

        /**
         * Properties of an OwnerlessRecords.
         * @memberof Authentication
         * @interface IOwnerlessRecords
         * @property {Array.<Authentication.IOwnerlessRecord>|null} [ownerlessRecord] OwnerlessRecords ownerlessRecord
         */

        /**
         * Constructs a new OwnerlessRecords.
         * @memberof Authentication
         * @classdesc Represents an OwnerlessRecords.
         * @implements IOwnerlessRecords
         * @constructor
         * @param {Authentication.IOwnerlessRecords=} [properties] Properties to set
         */
        function OwnerlessRecords(properties) {
            this.ownerlessRecord = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * OwnerlessRecords ownerlessRecord.
         * @member {Array.<Authentication.IOwnerlessRecord>} ownerlessRecord
         * @memberof Authentication.OwnerlessRecords
         * @instance
         */
        OwnerlessRecords.prototype.ownerlessRecord = $util.emptyArray;

        /**
         * Creates a new OwnerlessRecords instance using the specified properties.
         * @function create
         * @memberof Authentication.OwnerlessRecords
         * @static
         * @param {Authentication.IOwnerlessRecords=} [properties] Properties to set
         * @returns {Authentication.OwnerlessRecords} OwnerlessRecords instance
         */
        OwnerlessRecords.create = function create(properties) {
            return new OwnerlessRecords(properties);
        };

        /**
         * Encodes the specified OwnerlessRecords message. Does not implicitly {@link Authentication.OwnerlessRecords.verify|verify} messages.
         * @function encode
         * @memberof Authentication.OwnerlessRecords
         * @static
         * @param {Authentication.IOwnerlessRecords} message OwnerlessRecords message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OwnerlessRecords.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ownerlessRecord != null && message.ownerlessRecord.length)
                for (let i = 0; i < message.ownerlessRecord.length; ++i)
                    $root.Authentication.OwnerlessRecord.encode(message.ownerlessRecord[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified OwnerlessRecords message, length delimited. Does not implicitly {@link Authentication.OwnerlessRecords.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.OwnerlessRecords
         * @static
         * @param {Authentication.IOwnerlessRecords} message OwnerlessRecords message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        OwnerlessRecords.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an OwnerlessRecords message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.OwnerlessRecords
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.OwnerlessRecords} OwnerlessRecords
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OwnerlessRecords.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.OwnerlessRecords();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.ownerlessRecord && message.ownerlessRecord.length))
                        message.ownerlessRecord = [];
                    message.ownerlessRecord.push($root.Authentication.OwnerlessRecord.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an OwnerlessRecords message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.OwnerlessRecords
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.OwnerlessRecords} OwnerlessRecords
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        OwnerlessRecords.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an OwnerlessRecords message.
         * @function verify
         * @memberof Authentication.OwnerlessRecords
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        OwnerlessRecords.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ownerlessRecord != null && message.hasOwnProperty("ownerlessRecord")) {
                if (!Array.isArray(message.ownerlessRecord))
                    return "ownerlessRecord: array expected";
                for (let i = 0; i < message.ownerlessRecord.length; ++i) {
                    let error = $root.Authentication.OwnerlessRecord.verify(message.ownerlessRecord[i]);
                    if (error)
                        return "ownerlessRecord." + error;
                }
            }
            return null;
        };

        /**
         * Creates an OwnerlessRecords message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.OwnerlessRecords
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.OwnerlessRecords} OwnerlessRecords
         */
        OwnerlessRecords.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.OwnerlessRecords)
                return object;
            let message = new $root.Authentication.OwnerlessRecords();
            if (object.ownerlessRecord) {
                if (!Array.isArray(object.ownerlessRecord))
                    throw TypeError(".Authentication.OwnerlessRecords.ownerlessRecord: array expected");
                message.ownerlessRecord = [];
                for (let i = 0; i < object.ownerlessRecord.length; ++i) {
                    if (typeof object.ownerlessRecord[i] !== "object")
                        throw TypeError(".Authentication.OwnerlessRecords.ownerlessRecord: object expected");
                    message.ownerlessRecord[i] = $root.Authentication.OwnerlessRecord.fromObject(object.ownerlessRecord[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an OwnerlessRecords message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.OwnerlessRecords
         * @static
         * @param {Authentication.OwnerlessRecords} message OwnerlessRecords
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        OwnerlessRecords.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.ownerlessRecord = [];
            if (message.ownerlessRecord && message.ownerlessRecord.length) {
                object.ownerlessRecord = [];
                for (let j = 0; j < message.ownerlessRecord.length; ++j)
                    object.ownerlessRecord[j] = $root.Authentication.OwnerlessRecord.toObject(message.ownerlessRecord[j], options);
            }
            return object;
        };

        /**
         * Converts this OwnerlessRecords to JSON.
         * @function toJSON
         * @memberof Authentication.OwnerlessRecords
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        OwnerlessRecords.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return OwnerlessRecords;
    })();

    Authentication.UserAuthRequest = (function() {

        /**
         * Properties of a UserAuthRequest.
         * @memberof Authentication
         * @interface IUserAuthRequest
         * @property {Uint8Array|null} [uid] UserAuthRequest uid
         * @property {Uint8Array|null} [salt] UserAuthRequest salt
         * @property {number|null} [iterations] UserAuthRequest iterations
         * @property {Uint8Array|null} [encryptedClientKey] UserAuthRequest encryptedClientKey
         * @property {Uint8Array|null} [authHash] UserAuthRequest authHash
         * @property {Uint8Array|null} [encryptedDataKey] UserAuthRequest encryptedDataKey
         * @property {Authentication.LoginType|null} [loginType] UserAuthRequest loginType
         * @property {string|null} [name] UserAuthRequest name
         * @property {number|null} [algorithm] UserAuthRequest algorithm
         */

        /**
         * Constructs a new UserAuthRequest.
         * @memberof Authentication
         * @classdesc Represents a UserAuthRequest.
         * @implements IUserAuthRequest
         * @constructor
         * @param {Authentication.IUserAuthRequest=} [properties] Properties to set
         */
        function UserAuthRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserAuthRequest uid.
         * @member {Uint8Array} uid
         * @memberof Authentication.UserAuthRequest
         * @instance
         */
        UserAuthRequest.prototype.uid = $util.newBuffer([]);

        /**
         * UserAuthRequest salt.
         * @member {Uint8Array} salt
         * @memberof Authentication.UserAuthRequest
         * @instance
         */
        UserAuthRequest.prototype.salt = $util.newBuffer([]);

        /**
         * UserAuthRequest iterations.
         * @member {number} iterations
         * @memberof Authentication.UserAuthRequest
         * @instance
         */
        UserAuthRequest.prototype.iterations = 0;

        /**
         * UserAuthRequest encryptedClientKey.
         * @member {Uint8Array} encryptedClientKey
         * @memberof Authentication.UserAuthRequest
         * @instance
         */
        UserAuthRequest.prototype.encryptedClientKey = $util.newBuffer([]);

        /**
         * UserAuthRequest authHash.
         * @member {Uint8Array} authHash
         * @memberof Authentication.UserAuthRequest
         * @instance
         */
        UserAuthRequest.prototype.authHash = $util.newBuffer([]);

        /**
         * UserAuthRequest encryptedDataKey.
         * @member {Uint8Array} encryptedDataKey
         * @memberof Authentication.UserAuthRequest
         * @instance
         */
        UserAuthRequest.prototype.encryptedDataKey = $util.newBuffer([]);

        /**
         * UserAuthRequest loginType.
         * @member {Authentication.LoginType} loginType
         * @memberof Authentication.UserAuthRequest
         * @instance
         */
        UserAuthRequest.prototype.loginType = 0;

        /**
         * UserAuthRequest name.
         * @member {string} name
         * @memberof Authentication.UserAuthRequest
         * @instance
         */
        UserAuthRequest.prototype.name = "";

        /**
         * UserAuthRequest algorithm.
         * @member {number} algorithm
         * @memberof Authentication.UserAuthRequest
         * @instance
         */
        UserAuthRequest.prototype.algorithm = 0;

        /**
         * Creates a new UserAuthRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.UserAuthRequest
         * @static
         * @param {Authentication.IUserAuthRequest=} [properties] Properties to set
         * @returns {Authentication.UserAuthRequest} UserAuthRequest instance
         */
        UserAuthRequest.create = function create(properties) {
            return new UserAuthRequest(properties);
        };

        /**
         * Encodes the specified UserAuthRequest message. Does not implicitly {@link Authentication.UserAuthRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.UserAuthRequest
         * @static
         * @param {Authentication.IUserAuthRequest} message UserAuthRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserAuthRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.uid);
            if (message.salt != null && message.hasOwnProperty("salt"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.salt);
            if (message.iterations != null && message.hasOwnProperty("iterations"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.iterations);
            if (message.encryptedClientKey != null && message.hasOwnProperty("encryptedClientKey"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.encryptedClientKey);
            if (message.authHash != null && message.hasOwnProperty("authHash"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.authHash);
            if (message.encryptedDataKey != null && message.hasOwnProperty("encryptedDataKey"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.encryptedDataKey);
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.loginType);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.name);
            if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.algorithm);
            return writer;
        };

        /**
         * Encodes the specified UserAuthRequest message, length delimited. Does not implicitly {@link Authentication.UserAuthRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.UserAuthRequest
         * @static
         * @param {Authentication.IUserAuthRequest} message UserAuthRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserAuthRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserAuthRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.UserAuthRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.UserAuthRequest} UserAuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserAuthRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.UserAuthRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.bytes();
                    break;
                case 2:
                    message.salt = reader.bytes();
                    break;
                case 3:
                    message.iterations = reader.int32();
                    break;
                case 4:
                    message.encryptedClientKey = reader.bytes();
                    break;
                case 5:
                    message.authHash = reader.bytes();
                    break;
                case 6:
                    message.encryptedDataKey = reader.bytes();
                    break;
                case 7:
                    message.loginType = reader.int32();
                    break;
                case 8:
                    message.name = reader.string();
                    break;
                case 9:
                    message.algorithm = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserAuthRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.UserAuthRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.UserAuthRequest} UserAuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserAuthRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserAuthRequest message.
         * @function verify
         * @memberof Authentication.UserAuthRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserAuthRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!(message.uid && typeof message.uid.length === "number" || $util.isString(message.uid)))
                    return "uid: buffer expected";
            if (message.salt != null && message.hasOwnProperty("salt"))
                if (!(message.salt && typeof message.salt.length === "number" || $util.isString(message.salt)))
                    return "salt: buffer expected";
            if (message.iterations != null && message.hasOwnProperty("iterations"))
                if (!$util.isInteger(message.iterations))
                    return "iterations: integer expected";
            if (message.encryptedClientKey != null && message.hasOwnProperty("encryptedClientKey"))
                if (!(message.encryptedClientKey && typeof message.encryptedClientKey.length === "number" || $util.isString(message.encryptedClientKey)))
                    return "encryptedClientKey: buffer expected";
            if (message.authHash != null && message.hasOwnProperty("authHash"))
                if (!(message.authHash && typeof message.authHash.length === "number" || $util.isString(message.authHash)))
                    return "authHash: buffer expected";
            if (message.encryptedDataKey != null && message.hasOwnProperty("encryptedDataKey"))
                if (!(message.encryptedDataKey && typeof message.encryptedDataKey.length === "number" || $util.isString(message.encryptedDataKey)))
                    return "encryptedDataKey: buffer expected";
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                switch (message.loginType) {
                default:
                    return "loginType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                if (!$util.isInteger(message.algorithm))
                    return "algorithm: integer expected";
            return null;
        };

        /**
         * Creates a UserAuthRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.UserAuthRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.UserAuthRequest} UserAuthRequest
         */
        UserAuthRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.UserAuthRequest)
                return object;
            let message = new $root.Authentication.UserAuthRequest();
            if (object.uid != null)
                if (typeof object.uid === "string")
                    $util.base64.decode(object.uid, message.uid = $util.newBuffer($util.base64.length(object.uid)), 0);
                else if (object.uid.length)
                    message.uid = object.uid;
            if (object.salt != null)
                if (typeof object.salt === "string")
                    $util.base64.decode(object.salt, message.salt = $util.newBuffer($util.base64.length(object.salt)), 0);
                else if (object.salt.length)
                    message.salt = object.salt;
            if (object.iterations != null)
                message.iterations = object.iterations | 0;
            if (object.encryptedClientKey != null)
                if (typeof object.encryptedClientKey === "string")
                    $util.base64.decode(object.encryptedClientKey, message.encryptedClientKey = $util.newBuffer($util.base64.length(object.encryptedClientKey)), 0);
                else if (object.encryptedClientKey.length)
                    message.encryptedClientKey = object.encryptedClientKey;
            if (object.authHash != null)
                if (typeof object.authHash === "string")
                    $util.base64.decode(object.authHash, message.authHash = $util.newBuffer($util.base64.length(object.authHash)), 0);
                else if (object.authHash.length)
                    message.authHash = object.authHash;
            if (object.encryptedDataKey != null)
                if (typeof object.encryptedDataKey === "string")
                    $util.base64.decode(object.encryptedDataKey, message.encryptedDataKey = $util.newBuffer($util.base64.length(object.encryptedDataKey)), 0);
                else if (object.encryptedDataKey.length)
                    message.encryptedDataKey = object.encryptedDataKey;
            switch (object.loginType) {
            case "NORMAL":
            case 0:
                message.loginType = 0;
                break;
            case "SSO":
            case 1:
                message.loginType = 1;
                break;
            case "BIO":
            case 2:
                message.loginType = 2;
                break;
            case "ALTERNATE":
            case 3:
                message.loginType = 3;
                break;
            case "OFFLINE":
            case 4:
                message.loginType = 4;
                break;
            }
            if (object.name != null)
                message.name = String(object.name);
            if (object.algorithm != null)
                message.algorithm = object.algorithm | 0;
            return message;
        };

        /**
         * Creates a plain object from a UserAuthRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.UserAuthRequest
         * @static
         * @param {Authentication.UserAuthRequest} message UserAuthRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserAuthRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.uid = "";
                else {
                    object.uid = [];
                    if (options.bytes !== Array)
                        object.uid = $util.newBuffer(object.uid);
                }
                if (options.bytes === String)
                    object.salt = "";
                else {
                    object.salt = [];
                    if (options.bytes !== Array)
                        object.salt = $util.newBuffer(object.salt);
                }
                object.iterations = 0;
                if (options.bytes === String)
                    object.encryptedClientKey = "";
                else {
                    object.encryptedClientKey = [];
                    if (options.bytes !== Array)
                        object.encryptedClientKey = $util.newBuffer(object.encryptedClientKey);
                }
                if (options.bytes === String)
                    object.authHash = "";
                else {
                    object.authHash = [];
                    if (options.bytes !== Array)
                        object.authHash = $util.newBuffer(object.authHash);
                }
                if (options.bytes === String)
                    object.encryptedDataKey = "";
                else {
                    object.encryptedDataKey = [];
                    if (options.bytes !== Array)
                        object.encryptedDataKey = $util.newBuffer(object.encryptedDataKey);
                }
                object.loginType = options.enums === String ? "NORMAL" : 0;
                object.name = "";
                object.algorithm = 0;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = options.bytes === String ? $util.base64.encode(message.uid, 0, message.uid.length) : options.bytes === Array ? Array.prototype.slice.call(message.uid) : message.uid;
            if (message.salt != null && message.hasOwnProperty("salt"))
                object.salt = options.bytes === String ? $util.base64.encode(message.salt, 0, message.salt.length) : options.bytes === Array ? Array.prototype.slice.call(message.salt) : message.salt;
            if (message.iterations != null && message.hasOwnProperty("iterations"))
                object.iterations = message.iterations;
            if (message.encryptedClientKey != null && message.hasOwnProperty("encryptedClientKey"))
                object.encryptedClientKey = options.bytes === String ? $util.base64.encode(message.encryptedClientKey, 0, message.encryptedClientKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedClientKey) : message.encryptedClientKey;
            if (message.authHash != null && message.hasOwnProperty("authHash"))
                object.authHash = options.bytes === String ? $util.base64.encode(message.authHash, 0, message.authHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.authHash) : message.authHash;
            if (message.encryptedDataKey != null && message.hasOwnProperty("encryptedDataKey"))
                object.encryptedDataKey = options.bytes === String ? $util.base64.encode(message.encryptedDataKey, 0, message.encryptedDataKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedDataKey) : message.encryptedDataKey;
            if (message.loginType != null && message.hasOwnProperty("loginType"))
                object.loginType = options.enums === String ? $root.Authentication.LoginType[message.loginType] : message.loginType;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.algorithm != null && message.hasOwnProperty("algorithm"))
                object.algorithm = message.algorithm;
            return object;
        };

        /**
         * Converts this UserAuthRequest to JSON.
         * @function toJSON
         * @memberof Authentication.UserAuthRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserAuthRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserAuthRequest;
    })();

    Authentication.UidRequest = (function() {

        /**
         * Properties of an UidRequest.
         * @memberof Authentication
         * @interface IUidRequest
         * @property {Array.<Uint8Array>|null} [uid] UidRequest uid
         */

        /**
         * Constructs a new UidRequest.
         * @memberof Authentication
         * @classdesc Represents an UidRequest.
         * @implements IUidRequest
         * @constructor
         * @param {Authentication.IUidRequest=} [properties] Properties to set
         */
        function UidRequest(properties) {
            this.uid = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UidRequest uid.
         * @member {Array.<Uint8Array>} uid
         * @memberof Authentication.UidRequest
         * @instance
         */
        UidRequest.prototype.uid = $util.emptyArray;

        /**
         * Creates a new UidRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.UidRequest
         * @static
         * @param {Authentication.IUidRequest=} [properties] Properties to set
         * @returns {Authentication.UidRequest} UidRequest instance
         */
        UidRequest.create = function create(properties) {
            return new UidRequest(properties);
        };

        /**
         * Encodes the specified UidRequest message. Does not implicitly {@link Authentication.UidRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.UidRequest
         * @static
         * @param {Authentication.IUidRequest} message UidRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UidRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && message.uid.length)
                for (let i = 0; i < message.uid.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.uid[i]);
            return writer;
        };

        /**
         * Encodes the specified UidRequest message, length delimited. Does not implicitly {@link Authentication.UidRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.UidRequest
         * @static
         * @param {Authentication.IUidRequest} message UidRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UidRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UidRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.UidRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.UidRequest} UidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UidRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.UidRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.uid && message.uid.length))
                        message.uid = [];
                    message.uid.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UidRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.UidRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.UidRequest} UidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UidRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UidRequest message.
         * @function verify
         * @memberof Authentication.UidRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UidRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid")) {
                if (!Array.isArray(message.uid))
                    return "uid: array expected";
                for (let i = 0; i < message.uid.length; ++i)
                    if (!(message.uid[i] && typeof message.uid[i].length === "number" || $util.isString(message.uid[i])))
                        return "uid: buffer[] expected";
            }
            return null;
        };

        /**
         * Creates an UidRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.UidRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.UidRequest} UidRequest
         */
        UidRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.UidRequest)
                return object;
            let message = new $root.Authentication.UidRequest();
            if (object.uid) {
                if (!Array.isArray(object.uid))
                    throw TypeError(".Authentication.UidRequest.uid: array expected");
                message.uid = [];
                for (let i = 0; i < object.uid.length; ++i)
                    if (typeof object.uid[i] === "string")
                        $util.base64.decode(object.uid[i], message.uid[i] = $util.newBuffer($util.base64.length(object.uid[i])), 0);
                    else if (object.uid[i].length)
                        message.uid[i] = object.uid[i];
            }
            return message;
        };

        /**
         * Creates a plain object from an UidRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.UidRequest
         * @static
         * @param {Authentication.UidRequest} message UidRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UidRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.uid = [];
            if (message.uid && message.uid.length) {
                object.uid = [];
                for (let j = 0; j < message.uid.length; ++j)
                    object.uid[j] = options.bytes === String ? $util.base64.encode(message.uid[j], 0, message.uid[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.uid[j]) : message.uid[j];
            }
            return object;
        };

        /**
         * Converts this UidRequest to JSON.
         * @function toJSON
         * @memberof Authentication.UidRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UidRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UidRequest;
    })();

    Authentication.DeviceClientVersionUpdateRequest = (function() {

        /**
         * Properties of a DeviceClientVersionUpdateRequest.
         * @memberof Authentication
         * @interface IDeviceClientVersionUpdateRequest
         * @property {Uint8Array|null} [encryptedDeviceToken] DeviceClientVersionUpdateRequest encryptedDeviceToken
         * @property {string|null} [clientVersion] DeviceClientVersionUpdateRequest clientVersion
         */

        /**
         * Constructs a new DeviceClientVersionUpdateRequest.
         * @memberof Authentication
         * @classdesc Represents a DeviceClientVersionUpdateRequest.
         * @implements IDeviceClientVersionUpdateRequest
         * @constructor
         * @param {Authentication.IDeviceClientVersionUpdateRequest=} [properties] Properties to set
         */
        function DeviceClientVersionUpdateRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeviceClientVersionUpdateRequest encryptedDeviceToken.
         * @member {Uint8Array} encryptedDeviceToken
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @instance
         */
        DeviceClientVersionUpdateRequest.prototype.encryptedDeviceToken = $util.newBuffer([]);

        /**
         * DeviceClientVersionUpdateRequest clientVersion.
         * @member {string} clientVersion
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @instance
         */
        DeviceClientVersionUpdateRequest.prototype.clientVersion = "";

        /**
         * Creates a new DeviceClientVersionUpdateRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @static
         * @param {Authentication.IDeviceClientVersionUpdateRequest=} [properties] Properties to set
         * @returns {Authentication.DeviceClientVersionUpdateRequest} DeviceClientVersionUpdateRequest instance
         */
        DeviceClientVersionUpdateRequest.create = function create(properties) {
            return new DeviceClientVersionUpdateRequest(properties);
        };

        /**
         * Encodes the specified DeviceClientVersionUpdateRequest message. Does not implicitly {@link Authentication.DeviceClientVersionUpdateRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @static
         * @param {Authentication.IDeviceClientVersionUpdateRequest} message DeviceClientVersionUpdateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceClientVersionUpdateRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encryptedDeviceToken);
            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.clientVersion);
            return writer;
        };

        /**
         * Encodes the specified DeviceClientVersionUpdateRequest message, length delimited. Does not implicitly {@link Authentication.DeviceClientVersionUpdateRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @static
         * @param {Authentication.IDeviceClientVersionUpdateRequest} message DeviceClientVersionUpdateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceClientVersionUpdateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeviceClientVersionUpdateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.DeviceClientVersionUpdateRequest} DeviceClientVersionUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceClientVersionUpdateRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.DeviceClientVersionUpdateRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.encryptedDeviceToken = reader.bytes();
                    break;
                case 2:
                    message.clientVersion = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DeviceClientVersionUpdateRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.DeviceClientVersionUpdateRequest} DeviceClientVersionUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceClientVersionUpdateRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeviceClientVersionUpdateRequest message.
         * @function verify
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeviceClientVersionUpdateRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                if (!(message.encryptedDeviceToken && typeof message.encryptedDeviceToken.length === "number" || $util.isString(message.encryptedDeviceToken)))
                    return "encryptedDeviceToken: buffer expected";
            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                if (!$util.isString(message.clientVersion))
                    return "clientVersion: string expected";
            return null;
        };

        /**
         * Creates a DeviceClientVersionUpdateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.DeviceClientVersionUpdateRequest} DeviceClientVersionUpdateRequest
         */
        DeviceClientVersionUpdateRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.DeviceClientVersionUpdateRequest)
                return object;
            let message = new $root.Authentication.DeviceClientVersionUpdateRequest();
            if (object.encryptedDeviceToken != null)
                if (typeof object.encryptedDeviceToken === "string")
                    $util.base64.decode(object.encryptedDeviceToken, message.encryptedDeviceToken = $util.newBuffer($util.base64.length(object.encryptedDeviceToken)), 0);
                else if (object.encryptedDeviceToken.length)
                    message.encryptedDeviceToken = object.encryptedDeviceToken;
            if (object.clientVersion != null)
                message.clientVersion = String(object.clientVersion);
            return message;
        };

        /**
         * Creates a plain object from a DeviceClientVersionUpdateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @static
         * @param {Authentication.DeviceClientVersionUpdateRequest} message DeviceClientVersionUpdateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeviceClientVersionUpdateRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.encryptedDeviceToken = "";
                else {
                    object.encryptedDeviceToken = [];
                    if (options.bytes !== Array)
                        object.encryptedDeviceToken = $util.newBuffer(object.encryptedDeviceToken);
                }
                object.clientVersion = "";
            }
            if (message.encryptedDeviceToken != null && message.hasOwnProperty("encryptedDeviceToken"))
                object.encryptedDeviceToken = options.bytes === String ? $util.base64.encode(message.encryptedDeviceToken, 0, message.encryptedDeviceToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedDeviceToken) : message.encryptedDeviceToken;
            if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
                object.clientVersion = message.clientVersion;
            return object;
        };

        /**
         * Converts this DeviceClientVersionUpdateRequest to JSON.
         * @function toJSON
         * @memberof Authentication.DeviceClientVersionUpdateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeviceClientVersionUpdateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return DeviceClientVersionUpdateRequest;
    })();

    Authentication.ConvertUserToV3Request = (function() {

        /**
         * Properties of a ConvertUserToV3Request.
         * @memberof Authentication
         * @interface IConvertUserToV3Request
         * @property {Authentication.IAuthRequest|null} [authRequest] ConvertUserToV3Request authRequest
         * @property {Authentication.IUserAuthRequest|null} [userAuthRequest] ConvertUserToV3Request userAuthRequest
         * @property {Uint8Array|null} [encryptedClientKey] ConvertUserToV3Request encryptedClientKey
         * @property {Uint8Array|null} [encryptedPrivateKey] ConvertUserToV3Request encryptedPrivateKey
         * @property {Uint8Array|null} [publicKey] ConvertUserToV3Request publicKey
         */

        /**
         * Constructs a new ConvertUserToV3Request.
         * @memberof Authentication
         * @classdesc Represents a ConvertUserToV3Request.
         * @implements IConvertUserToV3Request
         * @constructor
         * @param {Authentication.IConvertUserToV3Request=} [properties] Properties to set
         */
        function ConvertUserToV3Request(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ConvertUserToV3Request authRequest.
         * @member {Authentication.IAuthRequest|null|undefined} authRequest
         * @memberof Authentication.ConvertUserToV3Request
         * @instance
         */
        ConvertUserToV3Request.prototype.authRequest = null;

        /**
         * ConvertUserToV3Request userAuthRequest.
         * @member {Authentication.IUserAuthRequest|null|undefined} userAuthRequest
         * @memberof Authentication.ConvertUserToV3Request
         * @instance
         */
        ConvertUserToV3Request.prototype.userAuthRequest = null;

        /**
         * ConvertUserToV3Request encryptedClientKey.
         * @member {Uint8Array} encryptedClientKey
         * @memberof Authentication.ConvertUserToV3Request
         * @instance
         */
        ConvertUserToV3Request.prototype.encryptedClientKey = $util.newBuffer([]);

        /**
         * ConvertUserToV3Request encryptedPrivateKey.
         * @member {Uint8Array} encryptedPrivateKey
         * @memberof Authentication.ConvertUserToV3Request
         * @instance
         */
        ConvertUserToV3Request.prototype.encryptedPrivateKey = $util.newBuffer([]);

        /**
         * ConvertUserToV3Request publicKey.
         * @member {Uint8Array} publicKey
         * @memberof Authentication.ConvertUserToV3Request
         * @instance
         */
        ConvertUserToV3Request.prototype.publicKey = $util.newBuffer([]);

        /**
         * Creates a new ConvertUserToV3Request instance using the specified properties.
         * @function create
         * @memberof Authentication.ConvertUserToV3Request
         * @static
         * @param {Authentication.IConvertUserToV3Request=} [properties] Properties to set
         * @returns {Authentication.ConvertUserToV3Request} ConvertUserToV3Request instance
         */
        ConvertUserToV3Request.create = function create(properties) {
            return new ConvertUserToV3Request(properties);
        };

        /**
         * Encodes the specified ConvertUserToV3Request message. Does not implicitly {@link Authentication.ConvertUserToV3Request.verify|verify} messages.
         * @function encode
         * @memberof Authentication.ConvertUserToV3Request
         * @static
         * @param {Authentication.IConvertUserToV3Request} message ConvertUserToV3Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConvertUserToV3Request.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.authRequest != null && message.hasOwnProperty("authRequest"))
                $root.Authentication.AuthRequest.encode(message.authRequest, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.userAuthRequest != null && message.hasOwnProperty("userAuthRequest"))
                $root.Authentication.UserAuthRequest.encode(message.userAuthRequest, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.encryptedClientKey != null && message.hasOwnProperty("encryptedClientKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.encryptedClientKey);
            if (message.encryptedPrivateKey != null && message.hasOwnProperty("encryptedPrivateKey"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.encryptedPrivateKey);
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.publicKey);
            return writer;
        };

        /**
         * Encodes the specified ConvertUserToV3Request message, length delimited. Does not implicitly {@link Authentication.ConvertUserToV3Request.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.ConvertUserToV3Request
         * @static
         * @param {Authentication.IConvertUserToV3Request} message ConvertUserToV3Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConvertUserToV3Request.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ConvertUserToV3Request message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.ConvertUserToV3Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.ConvertUserToV3Request} ConvertUserToV3Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConvertUserToV3Request.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.ConvertUserToV3Request();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.authRequest = $root.Authentication.AuthRequest.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.userAuthRequest = $root.Authentication.UserAuthRequest.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.encryptedClientKey = reader.bytes();
                    break;
                case 4:
                    message.encryptedPrivateKey = reader.bytes();
                    break;
                case 5:
                    message.publicKey = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ConvertUserToV3Request message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.ConvertUserToV3Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.ConvertUserToV3Request} ConvertUserToV3Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConvertUserToV3Request.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ConvertUserToV3Request message.
         * @function verify
         * @memberof Authentication.ConvertUserToV3Request
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ConvertUserToV3Request.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.authRequest != null && message.hasOwnProperty("authRequest")) {
                let error = $root.Authentication.AuthRequest.verify(message.authRequest);
                if (error)
                    return "authRequest." + error;
            }
            if (message.userAuthRequest != null && message.hasOwnProperty("userAuthRequest")) {
                let error = $root.Authentication.UserAuthRequest.verify(message.userAuthRequest);
                if (error)
                    return "userAuthRequest." + error;
            }
            if (message.encryptedClientKey != null && message.hasOwnProperty("encryptedClientKey"))
                if (!(message.encryptedClientKey && typeof message.encryptedClientKey.length === "number" || $util.isString(message.encryptedClientKey)))
                    return "encryptedClientKey: buffer expected";
            if (message.encryptedPrivateKey != null && message.hasOwnProperty("encryptedPrivateKey"))
                if (!(message.encryptedPrivateKey && typeof message.encryptedPrivateKey.length === "number" || $util.isString(message.encryptedPrivateKey)))
                    return "encryptedPrivateKey: buffer expected";
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                    return "publicKey: buffer expected";
            return null;
        };

        /**
         * Creates a ConvertUserToV3Request message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.ConvertUserToV3Request
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.ConvertUserToV3Request} ConvertUserToV3Request
         */
        ConvertUserToV3Request.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.ConvertUserToV3Request)
                return object;
            let message = new $root.Authentication.ConvertUserToV3Request();
            if (object.authRequest != null) {
                if (typeof object.authRequest !== "object")
                    throw TypeError(".Authentication.ConvertUserToV3Request.authRequest: object expected");
                message.authRequest = $root.Authentication.AuthRequest.fromObject(object.authRequest);
            }
            if (object.userAuthRequest != null) {
                if (typeof object.userAuthRequest !== "object")
                    throw TypeError(".Authentication.ConvertUserToV3Request.userAuthRequest: object expected");
                message.userAuthRequest = $root.Authentication.UserAuthRequest.fromObject(object.userAuthRequest);
            }
            if (object.encryptedClientKey != null)
                if (typeof object.encryptedClientKey === "string")
                    $util.base64.decode(object.encryptedClientKey, message.encryptedClientKey = $util.newBuffer($util.base64.length(object.encryptedClientKey)), 0);
                else if (object.encryptedClientKey.length)
                    message.encryptedClientKey = object.encryptedClientKey;
            if (object.encryptedPrivateKey != null)
                if (typeof object.encryptedPrivateKey === "string")
                    $util.base64.decode(object.encryptedPrivateKey, message.encryptedPrivateKey = $util.newBuffer($util.base64.length(object.encryptedPrivateKey)), 0);
                else if (object.encryptedPrivateKey.length)
                    message.encryptedPrivateKey = object.encryptedPrivateKey;
            if (object.publicKey != null)
                if (typeof object.publicKey === "string")
                    $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                else if (object.publicKey.length)
                    message.publicKey = object.publicKey;
            return message;
        };

        /**
         * Creates a plain object from a ConvertUserToV3Request message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.ConvertUserToV3Request
         * @static
         * @param {Authentication.ConvertUserToV3Request} message ConvertUserToV3Request
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ConvertUserToV3Request.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.authRequest = null;
                object.userAuthRequest = null;
                if (options.bytes === String)
                    object.encryptedClientKey = "";
                else {
                    object.encryptedClientKey = [];
                    if (options.bytes !== Array)
                        object.encryptedClientKey = $util.newBuffer(object.encryptedClientKey);
                }
                if (options.bytes === String)
                    object.encryptedPrivateKey = "";
                else {
                    object.encryptedPrivateKey = [];
                    if (options.bytes !== Array)
                        object.encryptedPrivateKey = $util.newBuffer(object.encryptedPrivateKey);
                }
                if (options.bytes === String)
                    object.publicKey = "";
                else {
                    object.publicKey = [];
                    if (options.bytes !== Array)
                        object.publicKey = $util.newBuffer(object.publicKey);
                }
            }
            if (message.authRequest != null && message.hasOwnProperty("authRequest"))
                object.authRequest = $root.Authentication.AuthRequest.toObject(message.authRequest, options);
            if (message.userAuthRequest != null && message.hasOwnProperty("userAuthRequest"))
                object.userAuthRequest = $root.Authentication.UserAuthRequest.toObject(message.userAuthRequest, options);
            if (message.encryptedClientKey != null && message.hasOwnProperty("encryptedClientKey"))
                object.encryptedClientKey = options.bytes === String ? $util.base64.encode(message.encryptedClientKey, 0, message.encryptedClientKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedClientKey) : message.encryptedClientKey;
            if (message.encryptedPrivateKey != null && message.hasOwnProperty("encryptedPrivateKey"))
                object.encryptedPrivateKey = options.bytes === String ? $util.base64.encode(message.encryptedPrivateKey, 0, message.encryptedPrivateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedPrivateKey) : message.encryptedPrivateKey;
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
            return object;
        };

        /**
         * Converts this ConvertUserToV3Request to JSON.
         * @function toJSON
         * @memberof Authentication.ConvertUserToV3Request
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ConvertUserToV3Request.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ConvertUserToV3Request;
    })();

    Authentication.RevisionResponse = (function() {

        /**
         * Properties of a RevisionResponse.
         * @memberof Authentication
         * @interface IRevisionResponse
         * @property {number|Long|null} [revision] RevisionResponse revision
         */

        /**
         * Constructs a new RevisionResponse.
         * @memberof Authentication
         * @classdesc Represents a RevisionResponse.
         * @implements IRevisionResponse
         * @constructor
         * @param {Authentication.IRevisionResponse=} [properties] Properties to set
         */
        function RevisionResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RevisionResponse revision.
         * @member {number|Long} revision
         * @memberof Authentication.RevisionResponse
         * @instance
         */
        RevisionResponse.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RevisionResponse instance using the specified properties.
         * @function create
         * @memberof Authentication.RevisionResponse
         * @static
         * @param {Authentication.IRevisionResponse=} [properties] Properties to set
         * @returns {Authentication.RevisionResponse} RevisionResponse instance
         */
        RevisionResponse.create = function create(properties) {
            return new RevisionResponse(properties);
        };

        /**
         * Encodes the specified RevisionResponse message. Does not implicitly {@link Authentication.RevisionResponse.verify|verify} messages.
         * @function encode
         * @memberof Authentication.RevisionResponse
         * @static
         * @param {Authentication.IRevisionResponse} message RevisionResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RevisionResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.revision != null && message.hasOwnProperty("revision"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.revision);
            return writer;
        };

        /**
         * Encodes the specified RevisionResponse message, length delimited. Does not implicitly {@link Authentication.RevisionResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.RevisionResponse
         * @static
         * @param {Authentication.IRevisionResponse} message RevisionResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RevisionResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RevisionResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.RevisionResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.RevisionResponse} RevisionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RevisionResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.RevisionResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.revision = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RevisionResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.RevisionResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.RevisionResponse} RevisionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RevisionResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RevisionResponse message.
         * @function verify
         * @memberof Authentication.RevisionResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RevisionResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.revision != null && message.hasOwnProperty("revision"))
                if (!$util.isInteger(message.revision) && !(message.revision && $util.isInteger(message.revision.low) && $util.isInteger(message.revision.high)))
                    return "revision: integer|Long expected";
            return null;
        };

        /**
         * Creates a RevisionResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.RevisionResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.RevisionResponse} RevisionResponse
         */
        RevisionResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.RevisionResponse)
                return object;
            let message = new $root.Authentication.RevisionResponse();
            if (object.revision != null)
                if ($util.Long)
                    (message.revision = $util.Long.fromValue(object.revision)).unsigned = false;
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RevisionResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.RevisionResponse
         * @static
         * @param {Authentication.RevisionResponse} message RevisionResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RevisionResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.revision = options.longs === String ? "0" : 0;
            if (message.revision != null && message.hasOwnProperty("revision"))
                if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            return object;
        };

        /**
         * Converts this RevisionResponse to JSON.
         * @function toJSON
         * @memberof Authentication.RevisionResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RevisionResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RevisionResponse;
    })();

    Authentication.ChangeEmailRequest = (function() {

        /**
         * Properties of a ChangeEmailRequest.
         * @memberof Authentication
         * @interface IChangeEmailRequest
         * @property {string|null} [newEmail] ChangeEmailRequest newEmail
         */

        /**
         * Constructs a new ChangeEmailRequest.
         * @memberof Authentication
         * @classdesc Represents a ChangeEmailRequest.
         * @implements IChangeEmailRequest
         * @constructor
         * @param {Authentication.IChangeEmailRequest=} [properties] Properties to set
         */
        function ChangeEmailRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChangeEmailRequest newEmail.
         * @member {string} newEmail
         * @memberof Authentication.ChangeEmailRequest
         * @instance
         */
        ChangeEmailRequest.prototype.newEmail = "";

        /**
         * Creates a new ChangeEmailRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.ChangeEmailRequest
         * @static
         * @param {Authentication.IChangeEmailRequest=} [properties] Properties to set
         * @returns {Authentication.ChangeEmailRequest} ChangeEmailRequest instance
         */
        ChangeEmailRequest.create = function create(properties) {
            return new ChangeEmailRequest(properties);
        };

        /**
         * Encodes the specified ChangeEmailRequest message. Does not implicitly {@link Authentication.ChangeEmailRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.ChangeEmailRequest
         * @static
         * @param {Authentication.IChangeEmailRequest} message ChangeEmailRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChangeEmailRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.newEmail != null && message.hasOwnProperty("newEmail"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.newEmail);
            return writer;
        };

        /**
         * Encodes the specified ChangeEmailRequest message, length delimited. Does not implicitly {@link Authentication.ChangeEmailRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.ChangeEmailRequest
         * @static
         * @param {Authentication.IChangeEmailRequest} message ChangeEmailRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChangeEmailRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChangeEmailRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.ChangeEmailRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.ChangeEmailRequest} ChangeEmailRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChangeEmailRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.ChangeEmailRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.newEmail = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChangeEmailRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.ChangeEmailRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.ChangeEmailRequest} ChangeEmailRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChangeEmailRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChangeEmailRequest message.
         * @function verify
         * @memberof Authentication.ChangeEmailRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChangeEmailRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.newEmail != null && message.hasOwnProperty("newEmail"))
                if (!$util.isString(message.newEmail))
                    return "newEmail: string expected";
            return null;
        };

        /**
         * Creates a ChangeEmailRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.ChangeEmailRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.ChangeEmailRequest} ChangeEmailRequest
         */
        ChangeEmailRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.ChangeEmailRequest)
                return object;
            let message = new $root.Authentication.ChangeEmailRequest();
            if (object.newEmail != null)
                message.newEmail = String(object.newEmail);
            return message;
        };

        /**
         * Creates a plain object from a ChangeEmailRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.ChangeEmailRequest
         * @static
         * @param {Authentication.ChangeEmailRequest} message ChangeEmailRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChangeEmailRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.newEmail = "";
            if (message.newEmail != null && message.hasOwnProperty("newEmail"))
                object.newEmail = message.newEmail;
            return object;
        };

        /**
         * Converts this ChangeEmailRequest to JSON.
         * @function toJSON
         * @memberof Authentication.ChangeEmailRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChangeEmailRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChangeEmailRequest;
    })();

    Authentication.ChangeEmailResponse = (function() {

        /**
         * Properties of a ChangeEmailResponse.
         * @memberof Authentication
         * @interface IChangeEmailResponse
         * @property {Uint8Array|null} [encryptedChangeEmailToken] ChangeEmailResponse encryptedChangeEmailToken
         */

        /**
         * Constructs a new ChangeEmailResponse.
         * @memberof Authentication
         * @classdesc Represents a ChangeEmailResponse.
         * @implements IChangeEmailResponse
         * @constructor
         * @param {Authentication.IChangeEmailResponse=} [properties] Properties to set
         */
        function ChangeEmailResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ChangeEmailResponse encryptedChangeEmailToken.
         * @member {Uint8Array} encryptedChangeEmailToken
         * @memberof Authentication.ChangeEmailResponse
         * @instance
         */
        ChangeEmailResponse.prototype.encryptedChangeEmailToken = $util.newBuffer([]);

        /**
         * Creates a new ChangeEmailResponse instance using the specified properties.
         * @function create
         * @memberof Authentication.ChangeEmailResponse
         * @static
         * @param {Authentication.IChangeEmailResponse=} [properties] Properties to set
         * @returns {Authentication.ChangeEmailResponse} ChangeEmailResponse instance
         */
        ChangeEmailResponse.create = function create(properties) {
            return new ChangeEmailResponse(properties);
        };

        /**
         * Encodes the specified ChangeEmailResponse message. Does not implicitly {@link Authentication.ChangeEmailResponse.verify|verify} messages.
         * @function encode
         * @memberof Authentication.ChangeEmailResponse
         * @static
         * @param {Authentication.IChangeEmailResponse} message ChangeEmailResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChangeEmailResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.encryptedChangeEmailToken != null && message.hasOwnProperty("encryptedChangeEmailToken"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.encryptedChangeEmailToken);
            return writer;
        };

        /**
         * Encodes the specified ChangeEmailResponse message, length delimited. Does not implicitly {@link Authentication.ChangeEmailResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.ChangeEmailResponse
         * @static
         * @param {Authentication.IChangeEmailResponse} message ChangeEmailResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ChangeEmailResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ChangeEmailResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.ChangeEmailResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.ChangeEmailResponse} ChangeEmailResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChangeEmailResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.ChangeEmailResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.encryptedChangeEmailToken = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ChangeEmailResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.ChangeEmailResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.ChangeEmailResponse} ChangeEmailResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ChangeEmailResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ChangeEmailResponse message.
         * @function verify
         * @memberof Authentication.ChangeEmailResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ChangeEmailResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.encryptedChangeEmailToken != null && message.hasOwnProperty("encryptedChangeEmailToken"))
                if (!(message.encryptedChangeEmailToken && typeof message.encryptedChangeEmailToken.length === "number" || $util.isString(message.encryptedChangeEmailToken)))
                    return "encryptedChangeEmailToken: buffer expected";
            return null;
        };

        /**
         * Creates a ChangeEmailResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.ChangeEmailResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.ChangeEmailResponse} ChangeEmailResponse
         */
        ChangeEmailResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.ChangeEmailResponse)
                return object;
            let message = new $root.Authentication.ChangeEmailResponse();
            if (object.encryptedChangeEmailToken != null)
                if (typeof object.encryptedChangeEmailToken === "string")
                    $util.base64.decode(object.encryptedChangeEmailToken, message.encryptedChangeEmailToken = $util.newBuffer($util.base64.length(object.encryptedChangeEmailToken)), 0);
                else if (object.encryptedChangeEmailToken.length)
                    message.encryptedChangeEmailToken = object.encryptedChangeEmailToken;
            return message;
        };

        /**
         * Creates a plain object from a ChangeEmailResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.ChangeEmailResponse
         * @static
         * @param {Authentication.ChangeEmailResponse} message ChangeEmailResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ChangeEmailResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.encryptedChangeEmailToken = "";
                else {
                    object.encryptedChangeEmailToken = [];
                    if (options.bytes !== Array)
                        object.encryptedChangeEmailToken = $util.newBuffer(object.encryptedChangeEmailToken);
                }
            if (message.encryptedChangeEmailToken != null && message.hasOwnProperty("encryptedChangeEmailToken"))
                object.encryptedChangeEmailToken = options.bytes === String ? $util.base64.encode(message.encryptedChangeEmailToken, 0, message.encryptedChangeEmailToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedChangeEmailToken) : message.encryptedChangeEmailToken;
            return object;
        };

        /**
         * Converts this ChangeEmailResponse to JSON.
         * @function toJSON
         * @memberof Authentication.ChangeEmailResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ChangeEmailResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ChangeEmailResponse;
    })();

    Authentication.SecurityData = (function() {

        /**
         * Properties of a SecurityData.
         * @memberof Authentication
         * @interface ISecurityData
         * @property {Uint8Array|null} [uid] SecurityData uid
         * @property {Uint8Array|null} [data] SecurityData data
         */

        /**
         * Constructs a new SecurityData.
         * @memberof Authentication
         * @classdesc Represents a SecurityData.
         * @implements ISecurityData
         * @constructor
         * @param {Authentication.ISecurityData=} [properties] Properties to set
         */
        function SecurityData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SecurityData uid.
         * @member {Uint8Array} uid
         * @memberof Authentication.SecurityData
         * @instance
         */
        SecurityData.prototype.uid = $util.newBuffer([]);

        /**
         * SecurityData data.
         * @member {Uint8Array} data
         * @memberof Authentication.SecurityData
         * @instance
         */
        SecurityData.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new SecurityData instance using the specified properties.
         * @function create
         * @memberof Authentication.SecurityData
         * @static
         * @param {Authentication.ISecurityData=} [properties] Properties to set
         * @returns {Authentication.SecurityData} SecurityData instance
         */
        SecurityData.create = function create(properties) {
            return new SecurityData(properties);
        };

        /**
         * Encodes the specified SecurityData message. Does not implicitly {@link Authentication.SecurityData.verify|verify} messages.
         * @function encode
         * @memberof Authentication.SecurityData
         * @static
         * @param {Authentication.ISecurityData} message SecurityData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.uid);
            if (message.data != null && message.hasOwnProperty("data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified SecurityData message, length delimited. Does not implicitly {@link Authentication.SecurityData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.SecurityData
         * @static
         * @param {Authentication.ISecurityData} message SecurityData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SecurityData message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.SecurityData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.SecurityData} SecurityData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.SecurityData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uid = reader.bytes();
                    break;
                case 2:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SecurityData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.SecurityData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.SecurityData} SecurityData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SecurityData message.
         * @function verify
         * @memberof Authentication.SecurityData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SecurityData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!(message.uid && typeof message.uid.length === "number" || $util.isString(message.uid)))
                    return "uid: buffer expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates a SecurityData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.SecurityData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.SecurityData} SecurityData
         */
        SecurityData.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.SecurityData)
                return object;
            let message = new $root.Authentication.SecurityData();
            if (object.uid != null)
                if (typeof object.uid === "string")
                    $util.base64.decode(object.uid, message.uid = $util.newBuffer($util.base64.length(object.uid)), 0);
                else if (object.uid.length)
                    message.uid = object.uid;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a SecurityData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.SecurityData
         * @static
         * @param {Authentication.SecurityData} message SecurityData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SecurityData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.uid = "";
                else {
                    object.uid = [];
                    if (options.bytes !== Array)
                        object.uid = $util.newBuffer(object.uid);
                }
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = options.bytes === String ? $util.base64.encode(message.uid, 0, message.uid.length) : options.bytes === Array ? Array.prototype.slice.call(message.uid) : message.uid;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this SecurityData to JSON.
         * @function toJSON
         * @memberof Authentication.SecurityData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SecurityData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SecurityData;
    })();

    Authentication.SecurityDataRequest = (function() {

        /**
         * Properties of a SecurityDataRequest.
         * @memberof Authentication
         * @interface ISecurityDataRequest
         * @property {Array.<Authentication.ISecurityData>|null} [recordSecurityData] SecurityDataRequest recordSecurityData
         * @property {Array.<Authentication.ISecurityData>|null} [masterPasswordSecurityData] SecurityDataRequest masterPasswordSecurityData
         */

        /**
         * Constructs a new SecurityDataRequest.
         * @memberof Authentication
         * @classdesc Represents a SecurityDataRequest.
         * @implements ISecurityDataRequest
         * @constructor
         * @param {Authentication.ISecurityDataRequest=} [properties] Properties to set
         */
        function SecurityDataRequest(properties) {
            this.recordSecurityData = [];
            this.masterPasswordSecurityData = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SecurityDataRequest recordSecurityData.
         * @member {Array.<Authentication.ISecurityData>} recordSecurityData
         * @memberof Authentication.SecurityDataRequest
         * @instance
         */
        SecurityDataRequest.prototype.recordSecurityData = $util.emptyArray;

        /**
         * SecurityDataRequest masterPasswordSecurityData.
         * @member {Array.<Authentication.ISecurityData>} masterPasswordSecurityData
         * @memberof Authentication.SecurityDataRequest
         * @instance
         */
        SecurityDataRequest.prototype.masterPasswordSecurityData = $util.emptyArray;

        /**
         * Creates a new SecurityDataRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.SecurityDataRequest
         * @static
         * @param {Authentication.ISecurityDataRequest=} [properties] Properties to set
         * @returns {Authentication.SecurityDataRequest} SecurityDataRequest instance
         */
        SecurityDataRequest.create = function create(properties) {
            return new SecurityDataRequest(properties);
        };

        /**
         * Encodes the specified SecurityDataRequest message. Does not implicitly {@link Authentication.SecurityDataRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.SecurityDataRequest
         * @static
         * @param {Authentication.ISecurityDataRequest} message SecurityDataRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityDataRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.recordSecurityData != null && message.recordSecurityData.length)
                for (let i = 0; i < message.recordSecurityData.length; ++i)
                    $root.Authentication.SecurityData.encode(message.recordSecurityData[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.masterPasswordSecurityData != null && message.masterPasswordSecurityData.length)
                for (let i = 0; i < message.masterPasswordSecurityData.length; ++i)
                    $root.Authentication.SecurityData.encode(message.masterPasswordSecurityData[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SecurityDataRequest message, length delimited. Does not implicitly {@link Authentication.SecurityDataRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.SecurityDataRequest
         * @static
         * @param {Authentication.ISecurityDataRequest} message SecurityDataRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityDataRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SecurityDataRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.SecurityDataRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.SecurityDataRequest} SecurityDataRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityDataRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.SecurityDataRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.recordSecurityData && message.recordSecurityData.length))
                        message.recordSecurityData = [];
                    message.recordSecurityData.push($root.Authentication.SecurityData.decode(reader, reader.uint32()));
                    break;
                case 2:
                    if (!(message.masterPasswordSecurityData && message.masterPasswordSecurityData.length))
                        message.masterPasswordSecurityData = [];
                    message.masterPasswordSecurityData.push($root.Authentication.SecurityData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SecurityDataRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.SecurityDataRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.SecurityDataRequest} SecurityDataRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityDataRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SecurityDataRequest message.
         * @function verify
         * @memberof Authentication.SecurityDataRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SecurityDataRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.recordSecurityData != null && message.hasOwnProperty("recordSecurityData")) {
                if (!Array.isArray(message.recordSecurityData))
                    return "recordSecurityData: array expected";
                for (let i = 0; i < message.recordSecurityData.length; ++i) {
                    let error = $root.Authentication.SecurityData.verify(message.recordSecurityData[i]);
                    if (error)
                        return "recordSecurityData." + error;
                }
            }
            if (message.masterPasswordSecurityData != null && message.hasOwnProperty("masterPasswordSecurityData")) {
                if (!Array.isArray(message.masterPasswordSecurityData))
                    return "masterPasswordSecurityData: array expected";
                for (let i = 0; i < message.masterPasswordSecurityData.length; ++i) {
                    let error = $root.Authentication.SecurityData.verify(message.masterPasswordSecurityData[i]);
                    if (error)
                        return "masterPasswordSecurityData." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SecurityDataRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.SecurityDataRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.SecurityDataRequest} SecurityDataRequest
         */
        SecurityDataRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.SecurityDataRequest)
                return object;
            let message = new $root.Authentication.SecurityDataRequest();
            if (object.recordSecurityData) {
                if (!Array.isArray(object.recordSecurityData))
                    throw TypeError(".Authentication.SecurityDataRequest.recordSecurityData: array expected");
                message.recordSecurityData = [];
                for (let i = 0; i < object.recordSecurityData.length; ++i) {
                    if (typeof object.recordSecurityData[i] !== "object")
                        throw TypeError(".Authentication.SecurityDataRequest.recordSecurityData: object expected");
                    message.recordSecurityData[i] = $root.Authentication.SecurityData.fromObject(object.recordSecurityData[i]);
                }
            }
            if (object.masterPasswordSecurityData) {
                if (!Array.isArray(object.masterPasswordSecurityData))
                    throw TypeError(".Authentication.SecurityDataRequest.masterPasswordSecurityData: array expected");
                message.masterPasswordSecurityData = [];
                for (let i = 0; i < object.masterPasswordSecurityData.length; ++i) {
                    if (typeof object.masterPasswordSecurityData[i] !== "object")
                        throw TypeError(".Authentication.SecurityDataRequest.masterPasswordSecurityData: object expected");
                    message.masterPasswordSecurityData[i] = $root.Authentication.SecurityData.fromObject(object.masterPasswordSecurityData[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SecurityDataRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.SecurityDataRequest
         * @static
         * @param {Authentication.SecurityDataRequest} message SecurityDataRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SecurityDataRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.recordSecurityData = [];
                object.masterPasswordSecurityData = [];
            }
            if (message.recordSecurityData && message.recordSecurityData.length) {
                object.recordSecurityData = [];
                for (let j = 0; j < message.recordSecurityData.length; ++j)
                    object.recordSecurityData[j] = $root.Authentication.SecurityData.toObject(message.recordSecurityData[j], options);
            }
            if (message.masterPasswordSecurityData && message.masterPasswordSecurityData.length) {
                object.masterPasswordSecurityData = [];
                for (let j = 0; j < message.masterPasswordSecurityData.length; ++j)
                    object.masterPasswordSecurityData[j] = $root.Authentication.SecurityData.toObject(message.masterPasswordSecurityData[j], options);
            }
            return object;
        };

        /**
         * Converts this SecurityDataRequest to JSON.
         * @function toJSON
         * @memberof Authentication.SecurityDataRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SecurityDataRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SecurityDataRequest;
    })();

    Authentication.SecurityReportIncrementalData = (function() {

        /**
         * Properties of a SecurityReportIncrementalData.
         * @memberof Authentication
         * @interface ISecurityReportIncrementalData
         * @property {number|Long|null} [enterpriseUserId] SecurityReportIncrementalData enterpriseUserId
         * @property {Uint8Array|null} [currentSecurityData] SecurityReportIncrementalData currentSecurityData
         * @property {number|Long|null} [currentSecurityDataRevision] SecurityReportIncrementalData currentSecurityDataRevision
         * @property {Uint8Array|null} [oldSecurityData] SecurityReportIncrementalData oldSecurityData
         * @property {number|Long|null} [oldSecurityDataRevision] SecurityReportIncrementalData oldSecurityDataRevision
         */

        /**
         * Constructs a new SecurityReportIncrementalData.
         * @memberof Authentication
         * @classdesc Represents a SecurityReportIncrementalData.
         * @implements ISecurityReportIncrementalData
         * @constructor
         * @param {Authentication.ISecurityReportIncrementalData=} [properties] Properties to set
         */
        function SecurityReportIncrementalData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SecurityReportIncrementalData enterpriseUserId.
         * @member {number|Long} enterpriseUserId
         * @memberof Authentication.SecurityReportIncrementalData
         * @instance
         */
        SecurityReportIncrementalData.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SecurityReportIncrementalData currentSecurityData.
         * @member {Uint8Array} currentSecurityData
         * @memberof Authentication.SecurityReportIncrementalData
         * @instance
         */
        SecurityReportIncrementalData.prototype.currentSecurityData = $util.newBuffer([]);

        /**
         * SecurityReportIncrementalData currentSecurityDataRevision.
         * @member {number|Long} currentSecurityDataRevision
         * @memberof Authentication.SecurityReportIncrementalData
         * @instance
         */
        SecurityReportIncrementalData.prototype.currentSecurityDataRevision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SecurityReportIncrementalData oldSecurityData.
         * @member {Uint8Array} oldSecurityData
         * @memberof Authentication.SecurityReportIncrementalData
         * @instance
         */
        SecurityReportIncrementalData.prototype.oldSecurityData = $util.newBuffer([]);

        /**
         * SecurityReportIncrementalData oldSecurityDataRevision.
         * @member {number|Long} oldSecurityDataRevision
         * @memberof Authentication.SecurityReportIncrementalData
         * @instance
         */
        SecurityReportIncrementalData.prototype.oldSecurityDataRevision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new SecurityReportIncrementalData instance using the specified properties.
         * @function create
         * @memberof Authentication.SecurityReportIncrementalData
         * @static
         * @param {Authentication.ISecurityReportIncrementalData=} [properties] Properties to set
         * @returns {Authentication.SecurityReportIncrementalData} SecurityReportIncrementalData instance
         */
        SecurityReportIncrementalData.create = function create(properties) {
            return new SecurityReportIncrementalData(properties);
        };

        /**
         * Encodes the specified SecurityReportIncrementalData message. Does not implicitly {@link Authentication.SecurityReportIncrementalData.verify|verify} messages.
         * @function encode
         * @memberof Authentication.SecurityReportIncrementalData
         * @static
         * @param {Authentication.ISecurityReportIncrementalData} message SecurityReportIncrementalData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityReportIncrementalData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.enterpriseUserId != null && message.hasOwnProperty("enterpriseUserId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.enterpriseUserId);
            if (message.currentSecurityData != null && message.hasOwnProperty("currentSecurityData"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.currentSecurityData);
            if (message.currentSecurityDataRevision != null && message.hasOwnProperty("currentSecurityDataRevision"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.currentSecurityDataRevision);
            if (message.oldSecurityData != null && message.hasOwnProperty("oldSecurityData"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.oldSecurityData);
            if (message.oldSecurityDataRevision != null && message.hasOwnProperty("oldSecurityDataRevision"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.oldSecurityDataRevision);
            return writer;
        };

        /**
         * Encodes the specified SecurityReportIncrementalData message, length delimited. Does not implicitly {@link Authentication.SecurityReportIncrementalData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.SecurityReportIncrementalData
         * @static
         * @param {Authentication.ISecurityReportIncrementalData} message SecurityReportIncrementalData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityReportIncrementalData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SecurityReportIncrementalData message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.SecurityReportIncrementalData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.SecurityReportIncrementalData} SecurityReportIncrementalData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityReportIncrementalData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.SecurityReportIncrementalData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.enterpriseUserId = reader.int64();
                    break;
                case 2:
                    message.currentSecurityData = reader.bytes();
                    break;
                case 3:
                    message.currentSecurityDataRevision = reader.int64();
                    break;
                case 4:
                    message.oldSecurityData = reader.bytes();
                    break;
                case 5:
                    message.oldSecurityDataRevision = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SecurityReportIncrementalData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.SecurityReportIncrementalData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.SecurityReportIncrementalData} SecurityReportIncrementalData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityReportIncrementalData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SecurityReportIncrementalData message.
         * @function verify
         * @memberof Authentication.SecurityReportIncrementalData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SecurityReportIncrementalData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.enterpriseUserId != null && message.hasOwnProperty("enterpriseUserId"))
                if (!$util.isInteger(message.enterpriseUserId) && !(message.enterpriseUserId && $util.isInteger(message.enterpriseUserId.low) && $util.isInteger(message.enterpriseUserId.high)))
                    return "enterpriseUserId: integer|Long expected";
            if (message.currentSecurityData != null && message.hasOwnProperty("currentSecurityData"))
                if (!(message.currentSecurityData && typeof message.currentSecurityData.length === "number" || $util.isString(message.currentSecurityData)))
                    return "currentSecurityData: buffer expected";
            if (message.currentSecurityDataRevision != null && message.hasOwnProperty("currentSecurityDataRevision"))
                if (!$util.isInteger(message.currentSecurityDataRevision) && !(message.currentSecurityDataRevision && $util.isInteger(message.currentSecurityDataRevision.low) && $util.isInteger(message.currentSecurityDataRevision.high)))
                    return "currentSecurityDataRevision: integer|Long expected";
            if (message.oldSecurityData != null && message.hasOwnProperty("oldSecurityData"))
                if (!(message.oldSecurityData && typeof message.oldSecurityData.length === "number" || $util.isString(message.oldSecurityData)))
                    return "oldSecurityData: buffer expected";
            if (message.oldSecurityDataRevision != null && message.hasOwnProperty("oldSecurityDataRevision"))
                if (!$util.isInteger(message.oldSecurityDataRevision) && !(message.oldSecurityDataRevision && $util.isInteger(message.oldSecurityDataRevision.low) && $util.isInteger(message.oldSecurityDataRevision.high)))
                    return "oldSecurityDataRevision: integer|Long expected";
            return null;
        };

        /**
         * Creates a SecurityReportIncrementalData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.SecurityReportIncrementalData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.SecurityReportIncrementalData} SecurityReportIncrementalData
         */
        SecurityReportIncrementalData.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.SecurityReportIncrementalData)
                return object;
            let message = new $root.Authentication.SecurityReportIncrementalData();
            if (object.enterpriseUserId != null)
                if ($util.Long)
                    (message.enterpriseUserId = $util.Long.fromValue(object.enterpriseUserId)).unsigned = false;
                else if (typeof object.enterpriseUserId === "string")
                    message.enterpriseUserId = parseInt(object.enterpriseUserId, 10);
                else if (typeof object.enterpriseUserId === "number")
                    message.enterpriseUserId = object.enterpriseUserId;
                else if (typeof object.enterpriseUserId === "object")
                    message.enterpriseUserId = new $util.LongBits(object.enterpriseUserId.low >>> 0, object.enterpriseUserId.high >>> 0).toNumber();
            if (object.currentSecurityData != null)
                if (typeof object.currentSecurityData === "string")
                    $util.base64.decode(object.currentSecurityData, message.currentSecurityData = $util.newBuffer($util.base64.length(object.currentSecurityData)), 0);
                else if (object.currentSecurityData.length)
                    message.currentSecurityData = object.currentSecurityData;
            if (object.currentSecurityDataRevision != null)
                if ($util.Long)
                    (message.currentSecurityDataRevision = $util.Long.fromValue(object.currentSecurityDataRevision)).unsigned = false;
                else if (typeof object.currentSecurityDataRevision === "string")
                    message.currentSecurityDataRevision = parseInt(object.currentSecurityDataRevision, 10);
                else if (typeof object.currentSecurityDataRevision === "number")
                    message.currentSecurityDataRevision = object.currentSecurityDataRevision;
                else if (typeof object.currentSecurityDataRevision === "object")
                    message.currentSecurityDataRevision = new $util.LongBits(object.currentSecurityDataRevision.low >>> 0, object.currentSecurityDataRevision.high >>> 0).toNumber();
            if (object.oldSecurityData != null)
                if (typeof object.oldSecurityData === "string")
                    $util.base64.decode(object.oldSecurityData, message.oldSecurityData = $util.newBuffer($util.base64.length(object.oldSecurityData)), 0);
                else if (object.oldSecurityData.length)
                    message.oldSecurityData = object.oldSecurityData;
            if (object.oldSecurityDataRevision != null)
                if ($util.Long)
                    (message.oldSecurityDataRevision = $util.Long.fromValue(object.oldSecurityDataRevision)).unsigned = false;
                else if (typeof object.oldSecurityDataRevision === "string")
                    message.oldSecurityDataRevision = parseInt(object.oldSecurityDataRevision, 10);
                else if (typeof object.oldSecurityDataRevision === "number")
                    message.oldSecurityDataRevision = object.oldSecurityDataRevision;
                else if (typeof object.oldSecurityDataRevision === "object")
                    message.oldSecurityDataRevision = new $util.LongBits(object.oldSecurityDataRevision.low >>> 0, object.oldSecurityDataRevision.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a SecurityReportIncrementalData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.SecurityReportIncrementalData
         * @static
         * @param {Authentication.SecurityReportIncrementalData} message SecurityReportIncrementalData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SecurityReportIncrementalData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.enterpriseUserId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.enterpriseUserId = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.currentSecurityData = "";
                else {
                    object.currentSecurityData = [];
                    if (options.bytes !== Array)
                        object.currentSecurityData = $util.newBuffer(object.currentSecurityData);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.currentSecurityDataRevision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.currentSecurityDataRevision = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.oldSecurityData = "";
                else {
                    object.oldSecurityData = [];
                    if (options.bytes !== Array)
                        object.oldSecurityData = $util.newBuffer(object.oldSecurityData);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.oldSecurityDataRevision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.oldSecurityDataRevision = options.longs === String ? "0" : 0;
            }
            if (message.enterpriseUserId != null && message.hasOwnProperty("enterpriseUserId"))
                if (typeof message.enterpriseUserId === "number")
                    object.enterpriseUserId = options.longs === String ? String(message.enterpriseUserId) : message.enterpriseUserId;
                else
                    object.enterpriseUserId = options.longs === String ? $util.Long.prototype.toString.call(message.enterpriseUserId) : options.longs === Number ? new $util.LongBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0).toNumber() : message.enterpriseUserId;
            if (message.currentSecurityData != null && message.hasOwnProperty("currentSecurityData"))
                object.currentSecurityData = options.bytes === String ? $util.base64.encode(message.currentSecurityData, 0, message.currentSecurityData.length) : options.bytes === Array ? Array.prototype.slice.call(message.currentSecurityData) : message.currentSecurityData;
            if (message.currentSecurityDataRevision != null && message.hasOwnProperty("currentSecurityDataRevision"))
                if (typeof message.currentSecurityDataRevision === "number")
                    object.currentSecurityDataRevision = options.longs === String ? String(message.currentSecurityDataRevision) : message.currentSecurityDataRevision;
                else
                    object.currentSecurityDataRevision = options.longs === String ? $util.Long.prototype.toString.call(message.currentSecurityDataRevision) : options.longs === Number ? new $util.LongBits(message.currentSecurityDataRevision.low >>> 0, message.currentSecurityDataRevision.high >>> 0).toNumber() : message.currentSecurityDataRevision;
            if (message.oldSecurityData != null && message.hasOwnProperty("oldSecurityData"))
                object.oldSecurityData = options.bytes === String ? $util.base64.encode(message.oldSecurityData, 0, message.oldSecurityData.length) : options.bytes === Array ? Array.prototype.slice.call(message.oldSecurityData) : message.oldSecurityData;
            if (message.oldSecurityDataRevision != null && message.hasOwnProperty("oldSecurityDataRevision"))
                if (typeof message.oldSecurityDataRevision === "number")
                    object.oldSecurityDataRevision = options.longs === String ? String(message.oldSecurityDataRevision) : message.oldSecurityDataRevision;
                else
                    object.oldSecurityDataRevision = options.longs === String ? $util.Long.prototype.toString.call(message.oldSecurityDataRevision) : options.longs === Number ? new $util.LongBits(message.oldSecurityDataRevision.low >>> 0, message.oldSecurityDataRevision.high >>> 0).toNumber() : message.oldSecurityDataRevision;
            return object;
        };

        /**
         * Converts this SecurityReportIncrementalData to JSON.
         * @function toJSON
         * @memberof Authentication.SecurityReportIncrementalData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SecurityReportIncrementalData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SecurityReportIncrementalData;
    })();

    Authentication.SecurityReport = (function() {

        /**
         * Properties of a SecurityReport.
         * @memberof Authentication
         * @interface ISecurityReport
         * @property {number|Long|null} [enterpriseUserId] SecurityReport enterpriseUserId
         * @property {Uint8Array|null} [encryptedReportData] SecurityReport encryptedReportData
         * @property {number|Long|null} [revision] SecurityReport revision
         * @property {string|null} [twoFactor] SecurityReport twoFactor
         * @property {number|Long|null} [lastLogin] SecurityReport lastLogin
         * @property {number|null} [numberOfReusedPassword] SecurityReport numberOfReusedPassword
         * @property {Array.<Authentication.ISecurityReportIncrementalData>|null} [securityReportIncrementalData] SecurityReport securityReportIncrementalData
         */

        /**
         * Constructs a new SecurityReport.
         * @memberof Authentication
         * @classdesc Represents a SecurityReport.
         * @implements ISecurityReport
         * @constructor
         * @param {Authentication.ISecurityReport=} [properties] Properties to set
         */
        function SecurityReport(properties) {
            this.securityReportIncrementalData = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SecurityReport enterpriseUserId.
         * @member {number|Long} enterpriseUserId
         * @memberof Authentication.SecurityReport
         * @instance
         */
        SecurityReport.prototype.enterpriseUserId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SecurityReport encryptedReportData.
         * @member {Uint8Array} encryptedReportData
         * @memberof Authentication.SecurityReport
         * @instance
         */
        SecurityReport.prototype.encryptedReportData = $util.newBuffer([]);

        /**
         * SecurityReport revision.
         * @member {number|Long} revision
         * @memberof Authentication.SecurityReport
         * @instance
         */
        SecurityReport.prototype.revision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SecurityReport twoFactor.
         * @member {string} twoFactor
         * @memberof Authentication.SecurityReport
         * @instance
         */
        SecurityReport.prototype.twoFactor = "";

        /**
         * SecurityReport lastLogin.
         * @member {number|Long} lastLogin
         * @memberof Authentication.SecurityReport
         * @instance
         */
        SecurityReport.prototype.lastLogin = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SecurityReport numberOfReusedPassword.
         * @member {number} numberOfReusedPassword
         * @memberof Authentication.SecurityReport
         * @instance
         */
        SecurityReport.prototype.numberOfReusedPassword = 0;

        /**
         * SecurityReport securityReportIncrementalData.
         * @member {Array.<Authentication.ISecurityReportIncrementalData>} securityReportIncrementalData
         * @memberof Authentication.SecurityReport
         * @instance
         */
        SecurityReport.prototype.securityReportIncrementalData = $util.emptyArray;

        /**
         * Creates a new SecurityReport instance using the specified properties.
         * @function create
         * @memberof Authentication.SecurityReport
         * @static
         * @param {Authentication.ISecurityReport=} [properties] Properties to set
         * @returns {Authentication.SecurityReport} SecurityReport instance
         */
        SecurityReport.create = function create(properties) {
            return new SecurityReport(properties);
        };

        /**
         * Encodes the specified SecurityReport message. Does not implicitly {@link Authentication.SecurityReport.verify|verify} messages.
         * @function encode
         * @memberof Authentication.SecurityReport
         * @static
         * @param {Authentication.ISecurityReport} message SecurityReport message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityReport.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.enterpriseUserId != null && message.hasOwnProperty("enterpriseUserId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.enterpriseUserId);
            if (message.encryptedReportData != null && message.hasOwnProperty("encryptedReportData"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.encryptedReportData);
            if (message.revision != null && message.hasOwnProperty("revision"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.revision);
            if (message.twoFactor != null && message.hasOwnProperty("twoFactor"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.twoFactor);
            if (message.lastLogin != null && message.hasOwnProperty("lastLogin"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.lastLogin);
            if (message.numberOfReusedPassword != null && message.hasOwnProperty("numberOfReusedPassword"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.numberOfReusedPassword);
            if (message.securityReportIncrementalData != null && message.securityReportIncrementalData.length)
                for (let i = 0; i < message.securityReportIncrementalData.length; ++i)
                    $root.Authentication.SecurityReportIncrementalData.encode(message.securityReportIncrementalData[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SecurityReport message, length delimited. Does not implicitly {@link Authentication.SecurityReport.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.SecurityReport
         * @static
         * @param {Authentication.ISecurityReport} message SecurityReport message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityReport.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SecurityReport message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.SecurityReport
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.SecurityReport} SecurityReport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityReport.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.SecurityReport();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.enterpriseUserId = reader.int64();
                    break;
                case 2:
                    message.encryptedReportData = reader.bytes();
                    break;
                case 3:
                    message.revision = reader.int64();
                    break;
                case 4:
                    message.twoFactor = reader.string();
                    break;
                case 5:
                    message.lastLogin = reader.int64();
                    break;
                case 6:
                    message.numberOfReusedPassword = reader.int32();
                    break;
                case 7:
                    if (!(message.securityReportIncrementalData && message.securityReportIncrementalData.length))
                        message.securityReportIncrementalData = [];
                    message.securityReportIncrementalData.push($root.Authentication.SecurityReportIncrementalData.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SecurityReport message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.SecurityReport
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.SecurityReport} SecurityReport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityReport.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SecurityReport message.
         * @function verify
         * @memberof Authentication.SecurityReport
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SecurityReport.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.enterpriseUserId != null && message.hasOwnProperty("enterpriseUserId"))
                if (!$util.isInteger(message.enterpriseUserId) && !(message.enterpriseUserId && $util.isInteger(message.enterpriseUserId.low) && $util.isInteger(message.enterpriseUserId.high)))
                    return "enterpriseUserId: integer|Long expected";
            if (message.encryptedReportData != null && message.hasOwnProperty("encryptedReportData"))
                if (!(message.encryptedReportData && typeof message.encryptedReportData.length === "number" || $util.isString(message.encryptedReportData)))
                    return "encryptedReportData: buffer expected";
            if (message.revision != null && message.hasOwnProperty("revision"))
                if (!$util.isInteger(message.revision) && !(message.revision && $util.isInteger(message.revision.low) && $util.isInteger(message.revision.high)))
                    return "revision: integer|Long expected";
            if (message.twoFactor != null && message.hasOwnProperty("twoFactor"))
                if (!$util.isString(message.twoFactor))
                    return "twoFactor: string expected";
            if (message.lastLogin != null && message.hasOwnProperty("lastLogin"))
                if (!$util.isInteger(message.lastLogin) && !(message.lastLogin && $util.isInteger(message.lastLogin.low) && $util.isInteger(message.lastLogin.high)))
                    return "lastLogin: integer|Long expected";
            if (message.numberOfReusedPassword != null && message.hasOwnProperty("numberOfReusedPassword"))
                if (!$util.isInteger(message.numberOfReusedPassword))
                    return "numberOfReusedPassword: integer expected";
            if (message.securityReportIncrementalData != null && message.hasOwnProperty("securityReportIncrementalData")) {
                if (!Array.isArray(message.securityReportIncrementalData))
                    return "securityReportIncrementalData: array expected";
                for (let i = 0; i < message.securityReportIncrementalData.length; ++i) {
                    let error = $root.Authentication.SecurityReportIncrementalData.verify(message.securityReportIncrementalData[i]);
                    if (error)
                        return "securityReportIncrementalData." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SecurityReport message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.SecurityReport
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.SecurityReport} SecurityReport
         */
        SecurityReport.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.SecurityReport)
                return object;
            let message = new $root.Authentication.SecurityReport();
            if (object.enterpriseUserId != null)
                if ($util.Long)
                    (message.enterpriseUserId = $util.Long.fromValue(object.enterpriseUserId)).unsigned = false;
                else if (typeof object.enterpriseUserId === "string")
                    message.enterpriseUserId = parseInt(object.enterpriseUserId, 10);
                else if (typeof object.enterpriseUserId === "number")
                    message.enterpriseUserId = object.enterpriseUserId;
                else if (typeof object.enterpriseUserId === "object")
                    message.enterpriseUserId = new $util.LongBits(object.enterpriseUserId.low >>> 0, object.enterpriseUserId.high >>> 0).toNumber();
            if (object.encryptedReportData != null)
                if (typeof object.encryptedReportData === "string")
                    $util.base64.decode(object.encryptedReportData, message.encryptedReportData = $util.newBuffer($util.base64.length(object.encryptedReportData)), 0);
                else if (object.encryptedReportData.length)
                    message.encryptedReportData = object.encryptedReportData;
            if (object.revision != null)
                if ($util.Long)
                    (message.revision = $util.Long.fromValue(object.revision)).unsigned = false;
                else if (typeof object.revision === "string")
                    message.revision = parseInt(object.revision, 10);
                else if (typeof object.revision === "number")
                    message.revision = object.revision;
                else if (typeof object.revision === "object")
                    message.revision = new $util.LongBits(object.revision.low >>> 0, object.revision.high >>> 0).toNumber();
            if (object.twoFactor != null)
                message.twoFactor = String(object.twoFactor);
            if (object.lastLogin != null)
                if ($util.Long)
                    (message.lastLogin = $util.Long.fromValue(object.lastLogin)).unsigned = false;
                else if (typeof object.lastLogin === "string")
                    message.lastLogin = parseInt(object.lastLogin, 10);
                else if (typeof object.lastLogin === "number")
                    message.lastLogin = object.lastLogin;
                else if (typeof object.lastLogin === "object")
                    message.lastLogin = new $util.LongBits(object.lastLogin.low >>> 0, object.lastLogin.high >>> 0).toNumber();
            if (object.numberOfReusedPassword != null)
                message.numberOfReusedPassword = object.numberOfReusedPassword | 0;
            if (object.securityReportIncrementalData) {
                if (!Array.isArray(object.securityReportIncrementalData))
                    throw TypeError(".Authentication.SecurityReport.securityReportIncrementalData: array expected");
                message.securityReportIncrementalData = [];
                for (let i = 0; i < object.securityReportIncrementalData.length; ++i) {
                    if (typeof object.securityReportIncrementalData[i] !== "object")
                        throw TypeError(".Authentication.SecurityReport.securityReportIncrementalData: object expected");
                    message.securityReportIncrementalData[i] = $root.Authentication.SecurityReportIncrementalData.fromObject(object.securityReportIncrementalData[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SecurityReport message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.SecurityReport
         * @static
         * @param {Authentication.SecurityReport} message SecurityReport
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SecurityReport.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.securityReportIncrementalData = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.enterpriseUserId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.enterpriseUserId = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.encryptedReportData = "";
                else {
                    object.encryptedReportData = [];
                    if (options.bytes !== Array)
                        object.encryptedReportData = $util.newBuffer(object.encryptedReportData);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.revision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.revision = options.longs === String ? "0" : 0;
                object.twoFactor = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.lastLogin = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.lastLogin = options.longs === String ? "0" : 0;
                object.numberOfReusedPassword = 0;
            }
            if (message.enterpriseUserId != null && message.hasOwnProperty("enterpriseUserId"))
                if (typeof message.enterpriseUserId === "number")
                    object.enterpriseUserId = options.longs === String ? String(message.enterpriseUserId) : message.enterpriseUserId;
                else
                    object.enterpriseUserId = options.longs === String ? $util.Long.prototype.toString.call(message.enterpriseUserId) : options.longs === Number ? new $util.LongBits(message.enterpriseUserId.low >>> 0, message.enterpriseUserId.high >>> 0).toNumber() : message.enterpriseUserId;
            if (message.encryptedReportData != null && message.hasOwnProperty("encryptedReportData"))
                object.encryptedReportData = options.bytes === String ? $util.base64.encode(message.encryptedReportData, 0, message.encryptedReportData.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedReportData) : message.encryptedReportData;
            if (message.revision != null && message.hasOwnProperty("revision"))
                if (typeof message.revision === "number")
                    object.revision = options.longs === String ? String(message.revision) : message.revision;
                else
                    object.revision = options.longs === String ? $util.Long.prototype.toString.call(message.revision) : options.longs === Number ? new $util.LongBits(message.revision.low >>> 0, message.revision.high >>> 0).toNumber() : message.revision;
            if (message.twoFactor != null && message.hasOwnProperty("twoFactor"))
                object.twoFactor = message.twoFactor;
            if (message.lastLogin != null && message.hasOwnProperty("lastLogin"))
                if (typeof message.lastLogin === "number")
                    object.lastLogin = options.longs === String ? String(message.lastLogin) : message.lastLogin;
                else
                    object.lastLogin = options.longs === String ? $util.Long.prototype.toString.call(message.lastLogin) : options.longs === Number ? new $util.LongBits(message.lastLogin.low >>> 0, message.lastLogin.high >>> 0).toNumber() : message.lastLogin;
            if (message.numberOfReusedPassword != null && message.hasOwnProperty("numberOfReusedPassword"))
                object.numberOfReusedPassword = message.numberOfReusedPassword;
            if (message.securityReportIncrementalData && message.securityReportIncrementalData.length) {
                object.securityReportIncrementalData = [];
                for (let j = 0; j < message.securityReportIncrementalData.length; ++j)
                    object.securityReportIncrementalData[j] = $root.Authentication.SecurityReportIncrementalData.toObject(message.securityReportIncrementalData[j], options);
            }
            return object;
        };

        /**
         * Converts this SecurityReport to JSON.
         * @function toJSON
         * @memberof Authentication.SecurityReport
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SecurityReport.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SecurityReport;
    })();

    Authentication.SecurityReportSaveRequest = (function() {

        /**
         * Properties of a SecurityReportSaveRequest.
         * @memberof Authentication
         * @interface ISecurityReportSaveRequest
         * @property {Array.<Authentication.ISecurityReport>|null} [securityReport] SecurityReportSaveRequest securityReport
         */

        /**
         * Constructs a new SecurityReportSaveRequest.
         * @memberof Authentication
         * @classdesc Represents a SecurityReportSaveRequest.
         * @implements ISecurityReportSaveRequest
         * @constructor
         * @param {Authentication.ISecurityReportSaveRequest=} [properties] Properties to set
         */
        function SecurityReportSaveRequest(properties) {
            this.securityReport = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SecurityReportSaveRequest securityReport.
         * @member {Array.<Authentication.ISecurityReport>} securityReport
         * @memberof Authentication.SecurityReportSaveRequest
         * @instance
         */
        SecurityReportSaveRequest.prototype.securityReport = $util.emptyArray;

        /**
         * Creates a new SecurityReportSaveRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.SecurityReportSaveRequest
         * @static
         * @param {Authentication.ISecurityReportSaveRequest=} [properties] Properties to set
         * @returns {Authentication.SecurityReportSaveRequest} SecurityReportSaveRequest instance
         */
        SecurityReportSaveRequest.create = function create(properties) {
            return new SecurityReportSaveRequest(properties);
        };

        /**
         * Encodes the specified SecurityReportSaveRequest message. Does not implicitly {@link Authentication.SecurityReportSaveRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.SecurityReportSaveRequest
         * @static
         * @param {Authentication.ISecurityReportSaveRequest} message SecurityReportSaveRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityReportSaveRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.securityReport != null && message.securityReport.length)
                for (let i = 0; i < message.securityReport.length; ++i)
                    $root.Authentication.SecurityReport.encode(message.securityReport[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SecurityReportSaveRequest message, length delimited. Does not implicitly {@link Authentication.SecurityReportSaveRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.SecurityReportSaveRequest
         * @static
         * @param {Authentication.ISecurityReportSaveRequest} message SecurityReportSaveRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityReportSaveRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SecurityReportSaveRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.SecurityReportSaveRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.SecurityReportSaveRequest} SecurityReportSaveRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityReportSaveRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.SecurityReportSaveRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.securityReport && message.securityReport.length))
                        message.securityReport = [];
                    message.securityReport.push($root.Authentication.SecurityReport.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SecurityReportSaveRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.SecurityReportSaveRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.SecurityReportSaveRequest} SecurityReportSaveRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityReportSaveRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SecurityReportSaveRequest message.
         * @function verify
         * @memberof Authentication.SecurityReportSaveRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SecurityReportSaveRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.securityReport != null && message.hasOwnProperty("securityReport")) {
                if (!Array.isArray(message.securityReport))
                    return "securityReport: array expected";
                for (let i = 0; i < message.securityReport.length; ++i) {
                    let error = $root.Authentication.SecurityReport.verify(message.securityReport[i]);
                    if (error)
                        return "securityReport." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SecurityReportSaveRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.SecurityReportSaveRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.SecurityReportSaveRequest} SecurityReportSaveRequest
         */
        SecurityReportSaveRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.SecurityReportSaveRequest)
                return object;
            let message = new $root.Authentication.SecurityReportSaveRequest();
            if (object.securityReport) {
                if (!Array.isArray(object.securityReport))
                    throw TypeError(".Authentication.SecurityReportSaveRequest.securityReport: array expected");
                message.securityReport = [];
                for (let i = 0; i < object.securityReport.length; ++i) {
                    if (typeof object.securityReport[i] !== "object")
                        throw TypeError(".Authentication.SecurityReportSaveRequest.securityReport: object expected");
                    message.securityReport[i] = $root.Authentication.SecurityReport.fromObject(object.securityReport[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SecurityReportSaveRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.SecurityReportSaveRequest
         * @static
         * @param {Authentication.SecurityReportSaveRequest} message SecurityReportSaveRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SecurityReportSaveRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.securityReport = [];
            if (message.securityReport && message.securityReport.length) {
                object.securityReport = [];
                for (let j = 0; j < message.securityReport.length; ++j)
                    object.securityReport[j] = $root.Authentication.SecurityReport.toObject(message.securityReport[j], options);
            }
            return object;
        };

        /**
         * Converts this SecurityReportSaveRequest to JSON.
         * @function toJSON
         * @memberof Authentication.SecurityReportSaveRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SecurityReportSaveRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SecurityReportSaveRequest;
    })();

    Authentication.SecurityReportRequest = (function() {

        /**
         * Properties of a SecurityReportRequest.
         * @memberof Authentication
         * @interface ISecurityReportRequest
         * @property {number|Long|null} [fromPage] SecurityReportRequest fromPage
         */

        /**
         * Constructs a new SecurityReportRequest.
         * @memberof Authentication
         * @classdesc Represents a SecurityReportRequest.
         * @implements ISecurityReportRequest
         * @constructor
         * @param {Authentication.ISecurityReportRequest=} [properties] Properties to set
         */
        function SecurityReportRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SecurityReportRequest fromPage.
         * @member {number|Long} fromPage
         * @memberof Authentication.SecurityReportRequest
         * @instance
         */
        SecurityReportRequest.prototype.fromPage = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new SecurityReportRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.SecurityReportRequest
         * @static
         * @param {Authentication.ISecurityReportRequest=} [properties] Properties to set
         * @returns {Authentication.SecurityReportRequest} SecurityReportRequest instance
         */
        SecurityReportRequest.create = function create(properties) {
            return new SecurityReportRequest(properties);
        };

        /**
         * Encodes the specified SecurityReportRequest message. Does not implicitly {@link Authentication.SecurityReportRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.SecurityReportRequest
         * @static
         * @param {Authentication.ISecurityReportRequest} message SecurityReportRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityReportRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.fromPage != null && message.hasOwnProperty("fromPage"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.fromPage);
            return writer;
        };

        /**
         * Encodes the specified SecurityReportRequest message, length delimited. Does not implicitly {@link Authentication.SecurityReportRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.SecurityReportRequest
         * @static
         * @param {Authentication.ISecurityReportRequest} message SecurityReportRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityReportRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SecurityReportRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.SecurityReportRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.SecurityReportRequest} SecurityReportRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityReportRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.SecurityReportRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.fromPage = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SecurityReportRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.SecurityReportRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.SecurityReportRequest} SecurityReportRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityReportRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SecurityReportRequest message.
         * @function verify
         * @memberof Authentication.SecurityReportRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SecurityReportRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.fromPage != null && message.hasOwnProperty("fromPage"))
                if (!$util.isInteger(message.fromPage) && !(message.fromPage && $util.isInteger(message.fromPage.low) && $util.isInteger(message.fromPage.high)))
                    return "fromPage: integer|Long expected";
            return null;
        };

        /**
         * Creates a SecurityReportRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.SecurityReportRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.SecurityReportRequest} SecurityReportRequest
         */
        SecurityReportRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.SecurityReportRequest)
                return object;
            let message = new $root.Authentication.SecurityReportRequest();
            if (object.fromPage != null)
                if ($util.Long)
                    (message.fromPage = $util.Long.fromValue(object.fromPage)).unsigned = false;
                else if (typeof object.fromPage === "string")
                    message.fromPage = parseInt(object.fromPage, 10);
                else if (typeof object.fromPage === "number")
                    message.fromPage = object.fromPage;
                else if (typeof object.fromPage === "object")
                    message.fromPage = new $util.LongBits(object.fromPage.low >>> 0, object.fromPage.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a SecurityReportRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.SecurityReportRequest
         * @static
         * @param {Authentication.SecurityReportRequest} message SecurityReportRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SecurityReportRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.fromPage = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.fromPage = options.longs === String ? "0" : 0;
            if (message.fromPage != null && message.hasOwnProperty("fromPage"))
                if (typeof message.fromPage === "number")
                    object.fromPage = options.longs === String ? String(message.fromPage) : message.fromPage;
                else
                    object.fromPage = options.longs === String ? $util.Long.prototype.toString.call(message.fromPage) : options.longs === Number ? new $util.LongBits(message.fromPage.low >>> 0, message.fromPage.high >>> 0).toNumber() : message.fromPage;
            return object;
        };

        /**
         * Converts this SecurityReportRequest to JSON.
         * @function toJSON
         * @memberof Authentication.SecurityReportRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SecurityReportRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SecurityReportRequest;
    })();

    Authentication.SecurityReportResponse = (function() {

        /**
         * Properties of a SecurityReportResponse.
         * @memberof Authentication
         * @interface ISecurityReportResponse
         * @property {Uint8Array|null} [enterprisePrivateKey] SecurityReportResponse enterprisePrivateKey
         * @property {Array.<Authentication.ISecurityReport>|null} [securityReport] SecurityReportResponse securityReport
         * @property {number|Long|null} [asOfRevision] SecurityReportResponse asOfRevision
         * @property {number|Long|null} [fromPage] SecurityReportResponse fromPage
         * @property {number|Long|null} [toPage] SecurityReportResponse toPage
         * @property {boolean|null} [complete] SecurityReportResponse complete
         */

        /**
         * Constructs a new SecurityReportResponse.
         * @memberof Authentication
         * @classdesc Represents a SecurityReportResponse.
         * @implements ISecurityReportResponse
         * @constructor
         * @param {Authentication.ISecurityReportResponse=} [properties] Properties to set
         */
        function SecurityReportResponse(properties) {
            this.securityReport = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SecurityReportResponse enterprisePrivateKey.
         * @member {Uint8Array} enterprisePrivateKey
         * @memberof Authentication.SecurityReportResponse
         * @instance
         */
        SecurityReportResponse.prototype.enterprisePrivateKey = $util.newBuffer([]);

        /**
         * SecurityReportResponse securityReport.
         * @member {Array.<Authentication.ISecurityReport>} securityReport
         * @memberof Authentication.SecurityReportResponse
         * @instance
         */
        SecurityReportResponse.prototype.securityReport = $util.emptyArray;

        /**
         * SecurityReportResponse asOfRevision.
         * @member {number|Long} asOfRevision
         * @memberof Authentication.SecurityReportResponse
         * @instance
         */
        SecurityReportResponse.prototype.asOfRevision = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SecurityReportResponse fromPage.
         * @member {number|Long} fromPage
         * @memberof Authentication.SecurityReportResponse
         * @instance
         */
        SecurityReportResponse.prototype.fromPage = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SecurityReportResponse toPage.
         * @member {number|Long} toPage
         * @memberof Authentication.SecurityReportResponse
         * @instance
         */
        SecurityReportResponse.prototype.toPage = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SecurityReportResponse complete.
         * @member {boolean} complete
         * @memberof Authentication.SecurityReportResponse
         * @instance
         */
        SecurityReportResponse.prototype.complete = false;

        /**
         * Creates a new SecurityReportResponse instance using the specified properties.
         * @function create
         * @memberof Authentication.SecurityReportResponse
         * @static
         * @param {Authentication.ISecurityReportResponse=} [properties] Properties to set
         * @returns {Authentication.SecurityReportResponse} SecurityReportResponse instance
         */
        SecurityReportResponse.create = function create(properties) {
            return new SecurityReportResponse(properties);
        };

        /**
         * Encodes the specified SecurityReportResponse message. Does not implicitly {@link Authentication.SecurityReportResponse.verify|verify} messages.
         * @function encode
         * @memberof Authentication.SecurityReportResponse
         * @static
         * @param {Authentication.ISecurityReportResponse} message SecurityReportResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityReportResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.enterprisePrivateKey != null && message.hasOwnProperty("enterprisePrivateKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.enterprisePrivateKey);
            if (message.securityReport != null && message.securityReport.length)
                for (let i = 0; i < message.securityReport.length; ++i)
                    $root.Authentication.SecurityReport.encode(message.securityReport[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.asOfRevision != null && message.hasOwnProperty("asOfRevision"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.asOfRevision);
            if (message.fromPage != null && message.hasOwnProperty("fromPage"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.fromPage);
            if (message.toPage != null && message.hasOwnProperty("toPage"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.toPage);
            if (message.complete != null && message.hasOwnProperty("complete"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.complete);
            return writer;
        };

        /**
         * Encodes the specified SecurityReportResponse message, length delimited. Does not implicitly {@link Authentication.SecurityReportResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.SecurityReportResponse
         * @static
         * @param {Authentication.ISecurityReportResponse} message SecurityReportResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SecurityReportResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SecurityReportResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.SecurityReportResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.SecurityReportResponse} SecurityReportResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityReportResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.SecurityReportResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.enterprisePrivateKey = reader.bytes();
                    break;
                case 2:
                    if (!(message.securityReport && message.securityReport.length))
                        message.securityReport = [];
                    message.securityReport.push($root.Authentication.SecurityReport.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.asOfRevision = reader.int64();
                    break;
                case 4:
                    message.fromPage = reader.int64();
                    break;
                case 5:
                    message.toPage = reader.int64();
                    break;
                case 6:
                    message.complete = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SecurityReportResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.SecurityReportResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.SecurityReportResponse} SecurityReportResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SecurityReportResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SecurityReportResponse message.
         * @function verify
         * @memberof Authentication.SecurityReportResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SecurityReportResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.enterprisePrivateKey != null && message.hasOwnProperty("enterprisePrivateKey"))
                if (!(message.enterprisePrivateKey && typeof message.enterprisePrivateKey.length === "number" || $util.isString(message.enterprisePrivateKey)))
                    return "enterprisePrivateKey: buffer expected";
            if (message.securityReport != null && message.hasOwnProperty("securityReport")) {
                if (!Array.isArray(message.securityReport))
                    return "securityReport: array expected";
                for (let i = 0; i < message.securityReport.length; ++i) {
                    let error = $root.Authentication.SecurityReport.verify(message.securityReport[i]);
                    if (error)
                        return "securityReport." + error;
                }
            }
            if (message.asOfRevision != null && message.hasOwnProperty("asOfRevision"))
                if (!$util.isInteger(message.asOfRevision) && !(message.asOfRevision && $util.isInteger(message.asOfRevision.low) && $util.isInteger(message.asOfRevision.high)))
                    return "asOfRevision: integer|Long expected";
            if (message.fromPage != null && message.hasOwnProperty("fromPage"))
                if (!$util.isInteger(message.fromPage) && !(message.fromPage && $util.isInteger(message.fromPage.low) && $util.isInteger(message.fromPage.high)))
                    return "fromPage: integer|Long expected";
            if (message.toPage != null && message.hasOwnProperty("toPage"))
                if (!$util.isInteger(message.toPage) && !(message.toPage && $util.isInteger(message.toPage.low) && $util.isInteger(message.toPage.high)))
                    return "toPage: integer|Long expected";
            if (message.complete != null && message.hasOwnProperty("complete"))
                if (typeof message.complete !== "boolean")
                    return "complete: boolean expected";
            return null;
        };

        /**
         * Creates a SecurityReportResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.SecurityReportResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.SecurityReportResponse} SecurityReportResponse
         */
        SecurityReportResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.SecurityReportResponse)
                return object;
            let message = new $root.Authentication.SecurityReportResponse();
            if (object.enterprisePrivateKey != null)
                if (typeof object.enterprisePrivateKey === "string")
                    $util.base64.decode(object.enterprisePrivateKey, message.enterprisePrivateKey = $util.newBuffer($util.base64.length(object.enterprisePrivateKey)), 0);
                else if (object.enterprisePrivateKey.length)
                    message.enterprisePrivateKey = object.enterprisePrivateKey;
            if (object.securityReport) {
                if (!Array.isArray(object.securityReport))
                    throw TypeError(".Authentication.SecurityReportResponse.securityReport: array expected");
                message.securityReport = [];
                for (let i = 0; i < object.securityReport.length; ++i) {
                    if (typeof object.securityReport[i] !== "object")
                        throw TypeError(".Authentication.SecurityReportResponse.securityReport: object expected");
                    message.securityReport[i] = $root.Authentication.SecurityReport.fromObject(object.securityReport[i]);
                }
            }
            if (object.asOfRevision != null)
                if ($util.Long)
                    (message.asOfRevision = $util.Long.fromValue(object.asOfRevision)).unsigned = false;
                else if (typeof object.asOfRevision === "string")
                    message.asOfRevision = parseInt(object.asOfRevision, 10);
                else if (typeof object.asOfRevision === "number")
                    message.asOfRevision = object.asOfRevision;
                else if (typeof object.asOfRevision === "object")
                    message.asOfRevision = new $util.LongBits(object.asOfRevision.low >>> 0, object.asOfRevision.high >>> 0).toNumber();
            if (object.fromPage != null)
                if ($util.Long)
                    (message.fromPage = $util.Long.fromValue(object.fromPage)).unsigned = false;
                else if (typeof object.fromPage === "string")
                    message.fromPage = parseInt(object.fromPage, 10);
                else if (typeof object.fromPage === "number")
                    message.fromPage = object.fromPage;
                else if (typeof object.fromPage === "object")
                    message.fromPage = new $util.LongBits(object.fromPage.low >>> 0, object.fromPage.high >>> 0).toNumber();
            if (object.toPage != null)
                if ($util.Long)
                    (message.toPage = $util.Long.fromValue(object.toPage)).unsigned = false;
                else if (typeof object.toPage === "string")
                    message.toPage = parseInt(object.toPage, 10);
                else if (typeof object.toPage === "number")
                    message.toPage = object.toPage;
                else if (typeof object.toPage === "object")
                    message.toPage = new $util.LongBits(object.toPage.low >>> 0, object.toPage.high >>> 0).toNumber();
            if (object.complete != null)
                message.complete = Boolean(object.complete);
            return message;
        };

        /**
         * Creates a plain object from a SecurityReportResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.SecurityReportResponse
         * @static
         * @param {Authentication.SecurityReportResponse} message SecurityReportResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SecurityReportResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.securityReport = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.enterprisePrivateKey = "";
                else {
                    object.enterprisePrivateKey = [];
                    if (options.bytes !== Array)
                        object.enterprisePrivateKey = $util.newBuffer(object.enterprisePrivateKey);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.asOfRevision = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.asOfRevision = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.fromPage = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.fromPage = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.toPage = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.toPage = options.longs === String ? "0" : 0;
                object.complete = false;
            }
            if (message.enterprisePrivateKey != null && message.hasOwnProperty("enterprisePrivateKey"))
                object.enterprisePrivateKey = options.bytes === String ? $util.base64.encode(message.enterprisePrivateKey, 0, message.enterprisePrivateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.enterprisePrivateKey) : message.enterprisePrivateKey;
            if (message.securityReport && message.securityReport.length) {
                object.securityReport = [];
                for (let j = 0; j < message.securityReport.length; ++j)
                    object.securityReport[j] = $root.Authentication.SecurityReport.toObject(message.securityReport[j], options);
            }
            if (message.asOfRevision != null && message.hasOwnProperty("asOfRevision"))
                if (typeof message.asOfRevision === "number")
                    object.asOfRevision = options.longs === String ? String(message.asOfRevision) : message.asOfRevision;
                else
                    object.asOfRevision = options.longs === String ? $util.Long.prototype.toString.call(message.asOfRevision) : options.longs === Number ? new $util.LongBits(message.asOfRevision.low >>> 0, message.asOfRevision.high >>> 0).toNumber() : message.asOfRevision;
            if (message.fromPage != null && message.hasOwnProperty("fromPage"))
                if (typeof message.fromPage === "number")
                    object.fromPage = options.longs === String ? String(message.fromPage) : message.fromPage;
                else
                    object.fromPage = options.longs === String ? $util.Long.prototype.toString.call(message.fromPage) : options.longs === Number ? new $util.LongBits(message.fromPage.low >>> 0, message.fromPage.high >>> 0).toNumber() : message.fromPage;
            if (message.toPage != null && message.hasOwnProperty("toPage"))
                if (typeof message.toPage === "number")
                    object.toPage = options.longs === String ? String(message.toPage) : message.toPage;
                else
                    object.toPage = options.longs === String ? $util.Long.prototype.toString.call(message.toPage) : options.longs === Number ? new $util.LongBits(message.toPage.low >>> 0, message.toPage.high >>> 0).toNumber() : message.toPage;
            if (message.complete != null && message.hasOwnProperty("complete"))
                object.complete = message.complete;
            return object;
        };

        /**
         * Converts this SecurityReportResponse to JSON.
         * @function toJSON
         * @memberof Authentication.SecurityReportResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SecurityReportResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SecurityReportResponse;
    })();

    Authentication.ReusedPasswordsRequest = (function() {

        /**
         * Properties of a ReusedPasswordsRequest.
         * @memberof Authentication
         * @interface IReusedPasswordsRequest
         * @property {number|null} [count] ReusedPasswordsRequest count
         */

        /**
         * Constructs a new ReusedPasswordsRequest.
         * @memberof Authentication
         * @classdesc Represents a ReusedPasswordsRequest.
         * @implements IReusedPasswordsRequest
         * @constructor
         * @param {Authentication.IReusedPasswordsRequest=} [properties] Properties to set
         */
        function ReusedPasswordsRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReusedPasswordsRequest count.
         * @member {number} count
         * @memberof Authentication.ReusedPasswordsRequest
         * @instance
         */
        ReusedPasswordsRequest.prototype.count = 0;

        /**
         * Creates a new ReusedPasswordsRequest instance using the specified properties.
         * @function create
         * @memberof Authentication.ReusedPasswordsRequest
         * @static
         * @param {Authentication.IReusedPasswordsRequest=} [properties] Properties to set
         * @returns {Authentication.ReusedPasswordsRequest} ReusedPasswordsRequest instance
         */
        ReusedPasswordsRequest.create = function create(properties) {
            return new ReusedPasswordsRequest(properties);
        };

        /**
         * Encodes the specified ReusedPasswordsRequest message. Does not implicitly {@link Authentication.ReusedPasswordsRequest.verify|verify} messages.
         * @function encode
         * @memberof Authentication.ReusedPasswordsRequest
         * @static
         * @param {Authentication.IReusedPasswordsRequest} message ReusedPasswordsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReusedPasswordsRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.count != null && message.hasOwnProperty("count"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.count);
            return writer;
        };

        /**
         * Encodes the specified ReusedPasswordsRequest message, length delimited. Does not implicitly {@link Authentication.ReusedPasswordsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.ReusedPasswordsRequest
         * @static
         * @param {Authentication.IReusedPasswordsRequest} message ReusedPasswordsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReusedPasswordsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReusedPasswordsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.ReusedPasswordsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.ReusedPasswordsRequest} ReusedPasswordsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReusedPasswordsRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.ReusedPasswordsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.count = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReusedPasswordsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.ReusedPasswordsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.ReusedPasswordsRequest} ReusedPasswordsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReusedPasswordsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReusedPasswordsRequest message.
         * @function verify
         * @memberof Authentication.ReusedPasswordsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReusedPasswordsRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count))
                    return "count: integer expected";
            return null;
        };

        /**
         * Creates a ReusedPasswordsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.ReusedPasswordsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.ReusedPasswordsRequest} ReusedPasswordsRequest
         */
        ReusedPasswordsRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.ReusedPasswordsRequest)
                return object;
            let message = new $root.Authentication.ReusedPasswordsRequest();
            if (object.count != null)
                message.count = object.count | 0;
            return message;
        };

        /**
         * Creates a plain object from a ReusedPasswordsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.ReusedPasswordsRequest
         * @static
         * @param {Authentication.ReusedPasswordsRequest} message ReusedPasswordsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReusedPasswordsRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.count = 0;
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            return object;
        };

        /**
         * Converts this ReusedPasswordsRequest to JSON.
         * @function toJSON
         * @memberof Authentication.ReusedPasswordsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReusedPasswordsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReusedPasswordsRequest;
    })();

    Authentication.SummaryConsoleReport = (function() {

        /**
         * Properties of a SummaryConsoleReport.
         * @memberof Authentication
         * @interface ISummaryConsoleReport
         * @property {number|null} [reportType] SummaryConsoleReport reportType
         * @property {Uint8Array|null} [reportData] SummaryConsoleReport reportData
         */

        /**
         * Constructs a new SummaryConsoleReport.
         * @memberof Authentication
         * @classdesc Represents a SummaryConsoleReport.
         * @implements ISummaryConsoleReport
         * @constructor
         * @param {Authentication.ISummaryConsoleReport=} [properties] Properties to set
         */
        function SummaryConsoleReport(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SummaryConsoleReport reportType.
         * @member {number} reportType
         * @memberof Authentication.SummaryConsoleReport
         * @instance
         */
        SummaryConsoleReport.prototype.reportType = 0;

        /**
         * SummaryConsoleReport reportData.
         * @member {Uint8Array} reportData
         * @memberof Authentication.SummaryConsoleReport
         * @instance
         */
        SummaryConsoleReport.prototype.reportData = $util.newBuffer([]);

        /**
         * Creates a new SummaryConsoleReport instance using the specified properties.
         * @function create
         * @memberof Authentication.SummaryConsoleReport
         * @static
         * @param {Authentication.ISummaryConsoleReport=} [properties] Properties to set
         * @returns {Authentication.SummaryConsoleReport} SummaryConsoleReport instance
         */
        SummaryConsoleReport.create = function create(properties) {
            return new SummaryConsoleReport(properties);
        };

        /**
         * Encodes the specified SummaryConsoleReport message. Does not implicitly {@link Authentication.SummaryConsoleReport.verify|verify} messages.
         * @function encode
         * @memberof Authentication.SummaryConsoleReport
         * @static
         * @param {Authentication.ISummaryConsoleReport} message SummaryConsoleReport message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SummaryConsoleReport.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reportType != null && message.hasOwnProperty("reportType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.reportType);
            if (message.reportData != null && message.hasOwnProperty("reportData"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.reportData);
            return writer;
        };

        /**
         * Encodes the specified SummaryConsoleReport message, length delimited. Does not implicitly {@link Authentication.SummaryConsoleReport.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Authentication.SummaryConsoleReport
         * @static
         * @param {Authentication.ISummaryConsoleReport} message SummaryConsoleReport message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SummaryConsoleReport.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SummaryConsoleReport message from the specified reader or buffer.
         * @function decode
         * @memberof Authentication.SummaryConsoleReport
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Authentication.SummaryConsoleReport} SummaryConsoleReport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SummaryConsoleReport.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Authentication.SummaryConsoleReport();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.reportType = reader.int32();
                    break;
                case 2:
                    message.reportData = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SummaryConsoleReport message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Authentication.SummaryConsoleReport
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Authentication.SummaryConsoleReport} SummaryConsoleReport
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SummaryConsoleReport.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SummaryConsoleReport message.
         * @function verify
         * @memberof Authentication.SummaryConsoleReport
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SummaryConsoleReport.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reportType != null && message.hasOwnProperty("reportType"))
                if (!$util.isInteger(message.reportType))
                    return "reportType: integer expected";
            if (message.reportData != null && message.hasOwnProperty("reportData"))
                if (!(message.reportData && typeof message.reportData.length === "number" || $util.isString(message.reportData)))
                    return "reportData: buffer expected";
            return null;
        };

        /**
         * Creates a SummaryConsoleReport message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Authentication.SummaryConsoleReport
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Authentication.SummaryConsoleReport} SummaryConsoleReport
         */
        SummaryConsoleReport.fromObject = function fromObject(object) {
            if (object instanceof $root.Authentication.SummaryConsoleReport)
                return object;
            let message = new $root.Authentication.SummaryConsoleReport();
            if (object.reportType != null)
                message.reportType = object.reportType | 0;
            if (object.reportData != null)
                if (typeof object.reportData === "string")
                    $util.base64.decode(object.reportData, message.reportData = $util.newBuffer($util.base64.length(object.reportData)), 0);
                else if (object.reportData.length)
                    message.reportData = object.reportData;
            return message;
        };

        /**
         * Creates a plain object from a SummaryConsoleReport message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Authentication.SummaryConsoleReport
         * @static
         * @param {Authentication.SummaryConsoleReport} message SummaryConsoleReport
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SummaryConsoleReport.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.reportType = 0;
                if (options.bytes === String)
                    object.reportData = "";
                else {
                    object.reportData = [];
                    if (options.bytes !== Array)
                        object.reportData = $util.newBuffer(object.reportData);
                }
            }
            if (message.reportType != null && message.hasOwnProperty("reportType"))
                object.reportType = message.reportType;
            if (message.reportData != null && message.hasOwnProperty("reportData"))
                object.reportData = options.bytes === String ? $util.base64.encode(message.reportData, 0, message.reportData.length) : options.bytes === Array ? Array.prototype.slice.call(message.reportData) : message.reportData;
            return object;
        };

        /**
         * Converts this SummaryConsoleReport to JSON.
         * @function toJSON
         * @memberof Authentication.SummaryConsoleReport
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SummaryConsoleReport.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SummaryConsoleReport;
    })();

    return Authentication;
})();

export { $root as default };

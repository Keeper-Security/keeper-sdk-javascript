/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const NotificationCenter = $root.NotificationCenter = (() => {

    /**
     * Namespace NotificationCenter.
     * @exports NotificationCenter
     * @namespace
     */
    const NotificationCenter = {};

    /**
     * NotificationCategory enum.
     * @name NotificationCenter.NotificationCategory
     * @enum {number}
     * @property {number} NC_UNSPECIFIED=0 NC_UNSPECIFIED value
     * @property {number} NC_ACCOUNT=1 NC_ACCOUNT value
     * @property {number} NC_SHARING=2 NC_SHARING value
     * @property {number} NC_ENTERPRISE=3 NC_ENTERPRISE value
     * @property {number} NC_SECURITY=4 NC_SECURITY value
     * @property {number} NC_REQUEST=5 NC_REQUEST value
     * @property {number} NC_SYSTEM=6 NC_SYSTEM value
     * @property {number} NC_PROMOTION=7 NC_PROMOTION value
     */
    NotificationCenter.NotificationCategory = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NC_UNSPECIFIED"] = 0;
        values[valuesById[1] = "NC_ACCOUNT"] = 1;
        values[valuesById[2] = "NC_SHARING"] = 2;
        values[valuesById[3] = "NC_ENTERPRISE"] = 3;
        values[valuesById[4] = "NC_SECURITY"] = 4;
        values[valuesById[5] = "NC_REQUEST"] = 5;
        values[valuesById[6] = "NC_SYSTEM"] = 6;
        values[valuesById[7] = "NC_PROMOTION"] = 7;
        return values;
    })();

    /**
     * NotificationType enum.
     * @name NotificationCenter.NotificationType
     * @enum {number}
     * @property {number} NT_UNSPECIFIED=0 NT_UNSPECIFIED value
     * @property {number} NT_ALERT=1 NT_ALERT value
     * @property {number} NT_DEVICE_APPROVAL=2 NT_DEVICE_APPROVAL value
     * @property {number} NT_MASTER_PASS_UPDATED=3 NT_MASTER_PASS_UPDATED value
     * @property {number} NT_SHARE_APPROVAL=4 NT_SHARE_APPROVAL value
     * @property {number} NT_SHARE_APPROVAL_APPROVED=5 NT_SHARE_APPROVAL_APPROVED value
     * @property {number} NT_SHARED=6 NT_SHARED value
     * @property {number} NT_TRANSFERRED=7 NT_TRANSFERRED value
     * @property {number} NT_LICENSE_LIMIT_REACHED=8 NT_LICENSE_LIMIT_REACHED value
     * @property {number} NT_APPROVAL_REQUEST=9 NT_APPROVAL_REQUEST value
     * @property {number} NT_APPROVED_RESPONSE=10 NT_APPROVED_RESPONSE value
     * @property {number} NT_DENIED_RESPONSE=11 NT_DENIED_RESPONSE value
     * @property {number} NT_2FA_CONFIGURED=12 NT_2FA_CONFIGURED value
     * @property {number} NT_SHARE_APPROVAL_DENIED=13 NT_SHARE_APPROVAL_DENIED value
     * @property {number} NT_DEVICE_APPROVAL_APPROVED=14 NT_DEVICE_APPROVAL_APPROVED value
     * @property {number} NT_DEVICE_APPROVAL_DENIED=15 NT_DEVICE_APPROVAL_DENIED value
     * @property {number} NT_ACCOUNT_CREATED=16 NT_ACCOUNT_CREATED value
     * @property {number} NT_2FA_ENABLED=17 NT_2FA_ENABLED value
     * @property {number} NT_2FA_DISABLED=18 NT_2FA_DISABLED value
     * @property {number} NT_SECURITY_KEYS_ENABLED=19 NT_SECURITY_KEYS_ENABLED value
     * @property {number} NT_SECURITY_KEYS_DISABLED=20 NT_SECURITY_KEYS_DISABLED value
     * @property {number} NT_SSL_CERTIFICATE_EXPIRES_SOON=21 NT_SSL_CERTIFICATE_EXPIRES_SOON value
     * @property {number} NT_SSL_CERTIFICATE_EXPIRED=22 NT_SSL_CERTIFICATE_EXPIRED value
     */
    NotificationCenter.NotificationType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NT_UNSPECIFIED"] = 0;
        values[valuesById[1] = "NT_ALERT"] = 1;
        values[valuesById[2] = "NT_DEVICE_APPROVAL"] = 2;
        values[valuesById[3] = "NT_MASTER_PASS_UPDATED"] = 3;
        values[valuesById[4] = "NT_SHARE_APPROVAL"] = 4;
        values[valuesById[5] = "NT_SHARE_APPROVAL_APPROVED"] = 5;
        values[valuesById[6] = "NT_SHARED"] = 6;
        values[valuesById[7] = "NT_TRANSFERRED"] = 7;
        values[valuesById[8] = "NT_LICENSE_LIMIT_REACHED"] = 8;
        values[valuesById[9] = "NT_APPROVAL_REQUEST"] = 9;
        values[valuesById[10] = "NT_APPROVED_RESPONSE"] = 10;
        values[valuesById[11] = "NT_DENIED_RESPONSE"] = 11;
        values[valuesById[12] = "NT_2FA_CONFIGURED"] = 12;
        values[valuesById[13] = "NT_SHARE_APPROVAL_DENIED"] = 13;
        values[valuesById[14] = "NT_DEVICE_APPROVAL_APPROVED"] = 14;
        values[valuesById[15] = "NT_DEVICE_APPROVAL_DENIED"] = 15;
        values[valuesById[16] = "NT_ACCOUNT_CREATED"] = 16;
        values[valuesById[17] = "NT_2FA_ENABLED"] = 17;
        values[valuesById[18] = "NT_2FA_DISABLED"] = 18;
        values[valuesById[19] = "NT_SECURITY_KEYS_ENABLED"] = 19;
        values[valuesById[20] = "NT_SECURITY_KEYS_DISABLED"] = 20;
        values[valuesById[21] = "NT_SSL_CERTIFICATE_EXPIRES_SOON"] = 21;
        values[valuesById[22] = "NT_SSL_CERTIFICATE_EXPIRED"] = 22;
        return values;
    })();

    /**
     * NotificationReadStatus enum.
     * @name NotificationCenter.NotificationReadStatus
     * @enum {number}
     * @property {number} NRS_UNSPECIFIED=0 NRS_UNSPECIFIED value
     * @property {number} NRS_LAST=1 NRS_LAST value
     * @property {number} NRS_READ=2 NRS_READ value
     * @property {number} NRS_UNREAD=3 NRS_UNREAD value
     */
    NotificationCenter.NotificationReadStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NRS_UNSPECIFIED"] = 0;
        values[valuesById[1] = "NRS_LAST"] = 1;
        values[valuesById[2] = "NRS_READ"] = 2;
        values[valuesById[3] = "NRS_UNREAD"] = 3;
        return values;
    })();

    /**
     * NotificationApprovalStatus enum.
     * @name NotificationCenter.NotificationApprovalStatus
     * @enum {number}
     * @property {number} NAS_UNSPECIFIED=0 NAS_UNSPECIFIED value
     * @property {number} NAS_APPROVED=1 NAS_APPROVED value
     * @property {number} NAS_DENIED=2 NAS_DENIED value
     * @property {number} NAS_LOST_APPROVAL_RIGHTS=3 NAS_LOST_APPROVAL_RIGHTS value
     * @property {number} NAS_LOST_ACCESS=4 NAS_LOST_ACCESS value
     */
    NotificationCenter.NotificationApprovalStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NAS_UNSPECIFIED"] = 0;
        values[valuesById[1] = "NAS_APPROVED"] = 1;
        values[valuesById[2] = "NAS_DENIED"] = 2;
        values[valuesById[3] = "NAS_LOST_APPROVAL_RIGHTS"] = 3;
        values[valuesById[4] = "NAS_LOST_ACCESS"] = 4;
        return values;
    })();

    NotificationCenter.EncryptedData = (function() {

        /**
         * Properties of an EncryptedData.
         * @memberof NotificationCenter
         * @interface IEncryptedData
         * @property {number|null} [version] EncryptedData version
         * @property {Uint8Array|null} [data] EncryptedData data
         */

        /**
         * Constructs a new EncryptedData.
         * @memberof NotificationCenter
         * @classdesc Represents an EncryptedData.
         * @implements IEncryptedData
         * @constructor
         * @param {NotificationCenter.IEncryptedData=} [properties] Properties to set
         */
        function EncryptedData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EncryptedData version.
         * @member {number} version
         * @memberof NotificationCenter.EncryptedData
         * @instance
         */
        EncryptedData.prototype.version = 0;

        /**
         * EncryptedData data.
         * @member {Uint8Array} data
         * @memberof NotificationCenter.EncryptedData
         * @instance
         */
        EncryptedData.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new EncryptedData instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.EncryptedData
         * @static
         * @param {NotificationCenter.IEncryptedData=} [properties] Properties to set
         * @returns {NotificationCenter.EncryptedData} EncryptedData instance
         */
        EncryptedData.create = function create(properties) {
            return new EncryptedData(properties);
        };

        /**
         * Encodes the specified EncryptedData message. Does not implicitly {@link NotificationCenter.EncryptedData.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.EncryptedData
         * @static
         * @param {NotificationCenter.IEncryptedData} message EncryptedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EncryptedData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.version);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified EncryptedData message, length delimited. Does not implicitly {@link NotificationCenter.EncryptedData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.EncryptedData
         * @static
         * @param {NotificationCenter.IEncryptedData} message EncryptedData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EncryptedData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an EncryptedData message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.EncryptedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.EncryptedData} EncryptedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EncryptedData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.EncryptedData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.version = reader.int32();
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
         * Decodes an EncryptedData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.EncryptedData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.EncryptedData} EncryptedData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EncryptedData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EncryptedData message.
         * @function verify
         * @memberof NotificationCenter.EncryptedData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EncryptedData.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates an EncryptedData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.EncryptedData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.EncryptedData} EncryptedData
         */
        EncryptedData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.EncryptedData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.EncryptedData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.EncryptedData();
            if (object.version != null)
                message.version = object.version | 0;
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from an EncryptedData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.EncryptedData
         * @static
         * @param {NotificationCenter.EncryptedData} message EncryptedData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EncryptedData.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.version = 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                object.version = message.version;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this EncryptedData to JSON.
         * @function toJSON
         * @memberof NotificationCenter.EncryptedData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EncryptedData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for EncryptedData
         * @function getTypeUrl
         * @memberof NotificationCenter.EncryptedData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        EncryptedData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.EncryptedData";
        };

        return EncryptedData;
    })();

    NotificationCenter.NotificationParameter = (function() {

        /**
         * Properties of a NotificationParameter.
         * @memberof NotificationCenter
         * @interface INotificationParameter
         * @property {string|null} [key] NotificationParameter key
         * @property {Uint8Array|null} [data] NotificationParameter data
         */

        /**
         * Constructs a new NotificationParameter.
         * @memberof NotificationCenter
         * @classdesc Represents a NotificationParameter.
         * @implements INotificationParameter
         * @constructor
         * @param {NotificationCenter.INotificationParameter=} [properties] Properties to set
         */
        function NotificationParameter(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotificationParameter key.
         * @member {string} key
         * @memberof NotificationCenter.NotificationParameter
         * @instance
         */
        NotificationParameter.prototype.key = "";

        /**
         * NotificationParameter data.
         * @member {Uint8Array} data
         * @memberof NotificationCenter.NotificationParameter
         * @instance
         */
        NotificationParameter.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new NotificationParameter instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.NotificationParameter
         * @static
         * @param {NotificationCenter.INotificationParameter=} [properties] Properties to set
         * @returns {NotificationCenter.NotificationParameter} NotificationParameter instance
         */
        NotificationParameter.create = function create(properties) {
            return new NotificationParameter(properties);
        };

        /**
         * Encodes the specified NotificationParameter message. Does not implicitly {@link NotificationCenter.NotificationParameter.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.NotificationParameter
         * @static
         * @param {NotificationCenter.INotificationParameter} message NotificationParameter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationParameter.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified NotificationParameter message, length delimited. Does not implicitly {@link NotificationCenter.NotificationParameter.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.NotificationParameter
         * @static
         * @param {NotificationCenter.INotificationParameter} message NotificationParameter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationParameter.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a NotificationParameter message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.NotificationParameter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.NotificationParameter} NotificationParameter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationParameter.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.NotificationParameter();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.key = reader.string();
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
         * Decodes a NotificationParameter message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.NotificationParameter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.NotificationParameter} NotificationParameter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationParameter.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotificationParameter message.
         * @function verify
         * @memberof NotificationCenter.NotificationParameter
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotificationParameter.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                if (!$util.isString(message.key))
                    return "key: string expected";
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates a NotificationParameter message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.NotificationParameter
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.NotificationParameter} NotificationParameter
         */
        NotificationParameter.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.NotificationParameter)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.NotificationParameter: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.NotificationParameter();
            if (object.key != null)
                message.key = String(object.key);
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a NotificationParameter message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.NotificationParameter
         * @static
         * @param {NotificationCenter.NotificationParameter} message NotificationParameter
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotificationParameter.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.key = "";
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                object.key = message.key;
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this NotificationParameter to JSON.
         * @function toJSON
         * @memberof NotificationCenter.NotificationParameter
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotificationParameter.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotificationParameter
         * @function getTypeUrl
         * @memberof NotificationCenter.NotificationParameter
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotificationParameter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.NotificationParameter";
        };

        return NotificationParameter;
    })();

    NotificationCenter.Notification = (function() {

        /**
         * Properties of a Notification.
         * @memberof NotificationCenter
         * @interface INotification
         * @property {NotificationCenter.NotificationType|null} [type] Notification type
         * @property {NotificationCenter.NotificationCategory|null} [category] Notification category
         * @property {GraphSync.IGraphSyncRef|null} [sender] Notification sender
         * @property {string|null} [senderFullName] Notification senderFullName
         * @property {NotificationCenter.IEncryptedData|null} [encryptedData] Notification encryptedData
         * @property {Array.<GraphSync.IGraphSyncRef>|null} [refs] Notification refs
         * @property {Array.<NotificationCenter.NotificationCategory>|null} [categories] Notification categories
         * @property {Array.<NotificationCenter.INotificationParameter>|null} [parameters] Notification parameters
         */

        /**
         * Constructs a new Notification.
         * @memberof NotificationCenter
         * @classdesc Represents a Notification.
         * @implements INotification
         * @constructor
         * @param {NotificationCenter.INotification=} [properties] Properties to set
         */
        function Notification(properties) {
            this.refs = [];
            this.categories = [];
            this.parameters = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Notification type.
         * @member {NotificationCenter.NotificationType} type
         * @memberof NotificationCenter.Notification
         * @instance
         */
        Notification.prototype.type = 0;

        /**
         * Notification category.
         * @member {NotificationCenter.NotificationCategory} category
         * @memberof NotificationCenter.Notification
         * @instance
         */
        Notification.prototype.category = 0;

        /**
         * Notification sender.
         * @member {GraphSync.IGraphSyncRef|null|undefined} sender
         * @memberof NotificationCenter.Notification
         * @instance
         */
        Notification.prototype.sender = null;

        /**
         * Notification senderFullName.
         * @member {string} senderFullName
         * @memberof NotificationCenter.Notification
         * @instance
         */
        Notification.prototype.senderFullName = "";

        /**
         * Notification encryptedData.
         * @member {NotificationCenter.IEncryptedData|null|undefined} encryptedData
         * @memberof NotificationCenter.Notification
         * @instance
         */
        Notification.prototype.encryptedData = null;

        /**
         * Notification refs.
         * @member {Array.<GraphSync.IGraphSyncRef>} refs
         * @memberof NotificationCenter.Notification
         * @instance
         */
        Notification.prototype.refs = $util.emptyArray;

        /**
         * Notification categories.
         * @member {Array.<NotificationCenter.NotificationCategory>} categories
         * @memberof NotificationCenter.Notification
         * @instance
         */
        Notification.prototype.categories = $util.emptyArray;

        /**
         * Notification parameters.
         * @member {Array.<NotificationCenter.INotificationParameter>} parameters
         * @memberof NotificationCenter.Notification
         * @instance
         */
        Notification.prototype.parameters = $util.emptyArray;

        /**
         * Creates a new Notification instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.Notification
         * @static
         * @param {NotificationCenter.INotification=} [properties] Properties to set
         * @returns {NotificationCenter.Notification} Notification instance
         */
        Notification.create = function create(properties) {
            return new Notification(properties);
        };

        /**
         * Encodes the specified Notification message. Does not implicitly {@link NotificationCenter.Notification.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.Notification
         * @static
         * @param {NotificationCenter.INotification} message Notification message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Notification.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.category != null && Object.hasOwnProperty.call(message, "category"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.category);
            if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                $root.GraphSync.GraphSyncRef.encode(message.sender, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.senderFullName != null && Object.hasOwnProperty.call(message, "senderFullName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.senderFullName);
            if (message.encryptedData != null && Object.hasOwnProperty.call(message, "encryptedData"))
                $root.NotificationCenter.EncryptedData.encode(message.encryptedData, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.refs != null && message.refs.length)
                for (let i = 0; i < message.refs.length; ++i)
                    $root.GraphSync.GraphSyncRef.encode(message.refs[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.categories != null && message.categories.length) {
                writer.uint32(/* id 7, wireType 2 =*/58).fork();
                for (let i = 0; i < message.categories.length; ++i)
                    writer.int32(message.categories[i]);
                writer.ldelim();
            }
            if (message.parameters != null && message.parameters.length)
                for (let i = 0; i < message.parameters.length; ++i)
                    $root.NotificationCenter.NotificationParameter.encode(message.parameters[i], writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Notification message, length delimited. Does not implicitly {@link NotificationCenter.Notification.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.Notification
         * @static
         * @param {NotificationCenter.INotification} message Notification message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Notification.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Notification message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.Notification
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.Notification} Notification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Notification.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.Notification();
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
                        message.category = reader.int32();
                        break;
                    }
                case 3: {
                        message.sender = $root.GraphSync.GraphSyncRef.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.senderFullName = reader.string();
                        break;
                    }
                case 5: {
                        message.encryptedData = $root.NotificationCenter.EncryptedData.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 6: {
                        if (!(message.refs && message.refs.length))
                            message.refs = [];
                        message.refs.push($root.GraphSync.GraphSyncRef.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        if (!(message.categories && message.categories.length))
                            message.categories = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.categories.push(reader.int32());
                        } else
                            message.categories.push(reader.int32());
                        break;
                    }
                case 8: {
                        if (!(message.parameters && message.parameters.length))
                            message.parameters = [];
                        message.parameters.push($root.NotificationCenter.NotificationParameter.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a Notification message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.Notification
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.Notification} Notification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Notification.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Notification message.
         * @function verify
         * @memberof NotificationCenter.Notification
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Notification.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
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
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                    break;
                }
            if (message.category != null && Object.hasOwnProperty.call(message, "category"))
                switch (message.category) {
                default:
                    return "category: enum value expected";
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
            if (message.sender != null && Object.hasOwnProperty.call(message, "sender")) {
                let error = $root.GraphSync.GraphSyncRef.verify(message.sender, long + 1);
                if (error)
                    return "sender." + error;
            }
            if (message.senderFullName != null && Object.hasOwnProperty.call(message, "senderFullName"))
                if (!$util.isString(message.senderFullName))
                    return "senderFullName: string expected";
            if (message.encryptedData != null && Object.hasOwnProperty.call(message, "encryptedData")) {
                let error = $root.NotificationCenter.EncryptedData.verify(message.encryptedData, long + 1);
                if (error)
                    return "encryptedData." + error;
            }
            if (message.refs != null && Object.hasOwnProperty.call(message, "refs")) {
                if (!Array.isArray(message.refs))
                    return "refs: array expected";
                for (let i = 0; i < message.refs.length; ++i) {
                    let error = $root.GraphSync.GraphSyncRef.verify(message.refs[i], long + 1);
                    if (error)
                        return "refs." + error;
                }
            }
            if (message.categories != null && Object.hasOwnProperty.call(message, "categories")) {
                if (!Array.isArray(message.categories))
                    return "categories: array expected";
                for (let i = 0; i < message.categories.length; ++i)
                    switch (message.categories[i]) {
                    default:
                        return "categories: enum value[] expected";
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
            }
            if (message.parameters != null && Object.hasOwnProperty.call(message, "parameters")) {
                if (!Array.isArray(message.parameters))
                    return "parameters: array expected";
                for (let i = 0; i < message.parameters.length; ++i) {
                    let error = $root.NotificationCenter.NotificationParameter.verify(message.parameters[i], long + 1);
                    if (error)
                        return "parameters." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Notification message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.Notification
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.Notification} Notification
         */
        Notification.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.Notification)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.Notification: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.Notification();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "NT_UNSPECIFIED":
            case 0:
                message.type = 0;
                break;
            case "NT_ALERT":
            case 1:
                message.type = 1;
                break;
            case "NT_DEVICE_APPROVAL":
            case 2:
                message.type = 2;
                break;
            case "NT_MASTER_PASS_UPDATED":
            case 3:
                message.type = 3;
                break;
            case "NT_SHARE_APPROVAL":
            case 4:
                message.type = 4;
                break;
            case "NT_SHARE_APPROVAL_APPROVED":
            case 5:
                message.type = 5;
                break;
            case "NT_SHARED":
            case 6:
                message.type = 6;
                break;
            case "NT_TRANSFERRED":
            case 7:
                message.type = 7;
                break;
            case "NT_LICENSE_LIMIT_REACHED":
            case 8:
                message.type = 8;
                break;
            case "NT_APPROVAL_REQUEST":
            case 9:
                message.type = 9;
                break;
            case "NT_APPROVED_RESPONSE":
            case 10:
                message.type = 10;
                break;
            case "NT_DENIED_RESPONSE":
            case 11:
                message.type = 11;
                break;
            case "NT_2FA_CONFIGURED":
            case 12:
                message.type = 12;
                break;
            case "NT_SHARE_APPROVAL_DENIED":
            case 13:
                message.type = 13;
                break;
            case "NT_DEVICE_APPROVAL_APPROVED":
            case 14:
                message.type = 14;
                break;
            case "NT_DEVICE_APPROVAL_DENIED":
            case 15:
                message.type = 15;
                break;
            case "NT_ACCOUNT_CREATED":
            case 16:
                message.type = 16;
                break;
            case "NT_2FA_ENABLED":
            case 17:
                message.type = 17;
                break;
            case "NT_2FA_DISABLED":
            case 18:
                message.type = 18;
                break;
            case "NT_SECURITY_KEYS_ENABLED":
            case 19:
                message.type = 19;
                break;
            case "NT_SECURITY_KEYS_DISABLED":
            case 20:
                message.type = 20;
                break;
            case "NT_SSL_CERTIFICATE_EXPIRES_SOON":
            case 21:
                message.type = 21;
                break;
            case "NT_SSL_CERTIFICATE_EXPIRED":
            case 22:
                message.type = 22;
                break;
            }
            switch (object.category) {
            default:
                if (typeof object.category === "number") {
                    message.category = object.category;
                    break;
                }
                break;
            case "NC_UNSPECIFIED":
            case 0:
                message.category = 0;
                break;
            case "NC_ACCOUNT":
            case 1:
                message.category = 1;
                break;
            case "NC_SHARING":
            case 2:
                message.category = 2;
                break;
            case "NC_ENTERPRISE":
            case 3:
                message.category = 3;
                break;
            case "NC_SECURITY":
            case 4:
                message.category = 4;
                break;
            case "NC_REQUEST":
            case 5:
                message.category = 5;
                break;
            case "NC_SYSTEM":
            case 6:
                message.category = 6;
                break;
            case "NC_PROMOTION":
            case 7:
                message.category = 7;
                break;
            }
            if (object.sender != null) {
                if (!$util.isObject(object.sender))
                    throw TypeError(".NotificationCenter.Notification.sender: object expected");
                message.sender = $root.GraphSync.GraphSyncRef.fromObject(object.sender, long + 1);
            }
            if (object.senderFullName != null)
                message.senderFullName = String(object.senderFullName);
            if (object.encryptedData != null) {
                if (!$util.isObject(object.encryptedData))
                    throw TypeError(".NotificationCenter.Notification.encryptedData: object expected");
                message.encryptedData = $root.NotificationCenter.EncryptedData.fromObject(object.encryptedData, long + 1);
            }
            if (object.refs) {
                if (!Array.isArray(object.refs))
                    throw TypeError(".NotificationCenter.Notification.refs: array expected");
                message.refs = [];
                for (let i = 0; i < object.refs.length; ++i) {
                    if (!$util.isObject(object.refs[i]))
                        throw TypeError(".NotificationCenter.Notification.refs: object expected");
                    message.refs[i] = $root.GraphSync.GraphSyncRef.fromObject(object.refs[i], long + 1);
                }
            }
            if (object.categories) {
                if (!Array.isArray(object.categories))
                    throw TypeError(".NotificationCenter.Notification.categories: array expected");
                message.categories = [];
                for (let i = 0; i < object.categories.length; ++i)
                    switch (object.categories[i]) {
                    default:
                        if (typeof object.categories[i] === "number") {
                            message.categories[i] = object.categories[i];
                            break;
                        }
                    case "NC_UNSPECIFIED":
                    case 0:
                        message.categories[i] = 0;
                        break;
                    case "NC_ACCOUNT":
                    case 1:
                        message.categories[i] = 1;
                        break;
                    case "NC_SHARING":
                    case 2:
                        message.categories[i] = 2;
                        break;
                    case "NC_ENTERPRISE":
                    case 3:
                        message.categories[i] = 3;
                        break;
                    case "NC_SECURITY":
                    case 4:
                        message.categories[i] = 4;
                        break;
                    case "NC_REQUEST":
                    case 5:
                        message.categories[i] = 5;
                        break;
                    case "NC_SYSTEM":
                    case 6:
                        message.categories[i] = 6;
                        break;
                    case "NC_PROMOTION":
                    case 7:
                        message.categories[i] = 7;
                        break;
                    }
            }
            if (object.parameters) {
                if (!Array.isArray(object.parameters))
                    throw TypeError(".NotificationCenter.Notification.parameters: array expected");
                message.parameters = [];
                for (let i = 0; i < object.parameters.length; ++i) {
                    if (!$util.isObject(object.parameters[i]))
                        throw TypeError(".NotificationCenter.Notification.parameters: object expected");
                    message.parameters[i] = $root.NotificationCenter.NotificationParameter.fromObject(object.parameters[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Notification message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.Notification
         * @static
         * @param {NotificationCenter.Notification} message Notification
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Notification.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.refs = [];
                object.categories = [];
                object.parameters = [];
            }
            if (options.defaults) {
                object.type = options.enums === String ? "NT_UNSPECIFIED" : 0;
                object.category = options.enums === String ? "NC_UNSPECIFIED" : 0;
                object.sender = null;
                object.senderFullName = "";
                object.encryptedData = null;
            }
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                object.type = options.enums === String ? $root.NotificationCenter.NotificationType[message.type] === undefined ? message.type : $root.NotificationCenter.NotificationType[message.type] : message.type;
            if (message.category != null && Object.hasOwnProperty.call(message, "category"))
                object.category = options.enums === String ? $root.NotificationCenter.NotificationCategory[message.category] === undefined ? message.category : $root.NotificationCenter.NotificationCategory[message.category] : message.category;
            if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
                object.sender = $root.GraphSync.GraphSyncRef.toObject(message.sender, options, q + 1);
            if (message.senderFullName != null && Object.hasOwnProperty.call(message, "senderFullName"))
                object.senderFullName = message.senderFullName;
            if (message.encryptedData != null && Object.hasOwnProperty.call(message, "encryptedData"))
                object.encryptedData = $root.NotificationCenter.EncryptedData.toObject(message.encryptedData, options, q + 1);
            if (message.refs && message.refs.length) {
                object.refs = [];
                for (let j = 0; j < message.refs.length; ++j)
                    object.refs[j] = $root.GraphSync.GraphSyncRef.toObject(message.refs[j], options, q + 1);
            }
            if (message.categories && message.categories.length) {
                object.categories = [];
                for (let j = 0; j < message.categories.length; ++j)
                    object.categories[j] = options.enums === String ? $root.NotificationCenter.NotificationCategory[message.categories[j]] === undefined ? message.categories[j] : $root.NotificationCenter.NotificationCategory[message.categories[j]] : message.categories[j];
            }
            if (message.parameters && message.parameters.length) {
                object.parameters = [];
                for (let j = 0; j < message.parameters.length; ++j)
                    object.parameters[j] = $root.NotificationCenter.NotificationParameter.toObject(message.parameters[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this Notification to JSON.
         * @function toJSON
         * @memberof NotificationCenter.Notification
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Notification.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Notification
         * @function getTypeUrl
         * @memberof NotificationCenter.Notification
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Notification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.Notification";
        };

        return Notification;
    })();

    NotificationCenter.NotificationReadMark = (function() {

        /**
         * Properties of a NotificationReadMark.
         * @memberof NotificationCenter
         * @interface INotificationReadMark
         * @property {Uint8Array|null} [uid] NotificationReadMark uid
         * @property {number|null} [notificationEdgeId] NotificationReadMark notificationEdgeId
         * @property {number|null} [markEdgeId] NotificationReadMark markEdgeId
         * @property {NotificationCenter.NotificationReadStatus|null} [readStatus] NotificationReadMark readStatus
         */

        /**
         * Constructs a new NotificationReadMark.
         * @memberof NotificationCenter
         * @classdesc Represents a NotificationReadMark.
         * @implements INotificationReadMark
         * @constructor
         * @param {NotificationCenter.INotificationReadMark=} [properties] Properties to set
         */
        function NotificationReadMark(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotificationReadMark uid.
         * @member {Uint8Array} uid
         * @memberof NotificationCenter.NotificationReadMark
         * @instance
         */
        NotificationReadMark.prototype.uid = $util.newBuffer([]);

        /**
         * NotificationReadMark notificationEdgeId.
         * @member {number} notificationEdgeId
         * @memberof NotificationCenter.NotificationReadMark
         * @instance
         */
        NotificationReadMark.prototype.notificationEdgeId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NotificationReadMark markEdgeId.
         * @member {number} markEdgeId
         * @memberof NotificationCenter.NotificationReadMark
         * @instance
         */
        NotificationReadMark.prototype.markEdgeId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NotificationReadMark readStatus.
         * @member {NotificationCenter.NotificationReadStatus} readStatus
         * @memberof NotificationCenter.NotificationReadMark
         * @instance
         */
        NotificationReadMark.prototype.readStatus = 0;

        /**
         * Creates a new NotificationReadMark instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.NotificationReadMark
         * @static
         * @param {NotificationCenter.INotificationReadMark=} [properties] Properties to set
         * @returns {NotificationCenter.NotificationReadMark} NotificationReadMark instance
         */
        NotificationReadMark.create = function create(properties) {
            return new NotificationReadMark(properties);
        };

        /**
         * Encodes the specified NotificationReadMark message. Does not implicitly {@link NotificationCenter.NotificationReadMark.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.NotificationReadMark
         * @static
         * @param {NotificationCenter.INotificationReadMark} message NotificationReadMark message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationReadMark.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.uid);
            if (message.notificationEdgeId != null && Object.hasOwnProperty.call(message, "notificationEdgeId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.notificationEdgeId);
            if (message.markEdgeId != null && Object.hasOwnProperty.call(message, "markEdgeId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.markEdgeId);
            if (message.readStatus != null && Object.hasOwnProperty.call(message, "readStatus"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.readStatus);
            return writer;
        };

        /**
         * Encodes the specified NotificationReadMark message, length delimited. Does not implicitly {@link NotificationCenter.NotificationReadMark.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.NotificationReadMark
         * @static
         * @param {NotificationCenter.INotificationReadMark} message NotificationReadMark message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationReadMark.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a NotificationReadMark message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.NotificationReadMark
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.NotificationReadMark} NotificationReadMark
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationReadMark.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.NotificationReadMark();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.uid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.notificationEdgeId = reader.int64();
                        break;
                    }
                case 3: {
                        message.markEdgeId = reader.int64();
                        break;
                    }
                case 4: {
                        message.readStatus = reader.int32();
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
         * Decodes a NotificationReadMark message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.NotificationReadMark
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.NotificationReadMark} NotificationReadMark
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationReadMark.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotificationReadMark message.
         * @function verify
         * @memberof NotificationCenter.NotificationReadMark
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotificationReadMark.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                if (!(message.uid && typeof message.uid.length === "number" || $util.isString(message.uid)))
                    return "uid: buffer expected";
            if (message.notificationEdgeId != null && Object.hasOwnProperty.call(message, "notificationEdgeId"))
                if (!$util.isInteger(message.notificationEdgeId) && !(message.notificationEdgeId && $util.isInteger(message.notificationEdgeId.low) && $util.isInteger(message.notificationEdgeId.high)))
                    return "notificationEdgeId: integer|Long expected";
            if (message.markEdgeId != null && Object.hasOwnProperty.call(message, "markEdgeId"))
                if (!$util.isInteger(message.markEdgeId) && !(message.markEdgeId && $util.isInteger(message.markEdgeId.low) && $util.isInteger(message.markEdgeId.high)))
                    return "markEdgeId: integer|Long expected";
            if (message.readStatus != null && Object.hasOwnProperty.call(message, "readStatus"))
                switch (message.readStatus) {
                default:
                    return "readStatus: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            return null;
        };

        /**
         * Creates a NotificationReadMark message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.NotificationReadMark
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.NotificationReadMark} NotificationReadMark
         */
        NotificationReadMark.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.NotificationReadMark)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.NotificationReadMark: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.NotificationReadMark();
            if (object.uid != null)
                if (typeof object.uid === "string")
                    $util.base64.decode(object.uid, message.uid = $util.newBuffer($util.base64.length(object.uid)), 0);
                else if (object.uid.length >= 0)
                    message.uid = object.uid;
            if (object.notificationEdgeId != null)
                if ($util.Long)
                    message.notificationEdgeId = $util.Long.fromValue(object.notificationEdgeId, false);
                else if (typeof object.notificationEdgeId === "string")
                    message.notificationEdgeId = parseInt(object.notificationEdgeId, 10);
                else if (typeof object.notificationEdgeId === "number")
                    message.notificationEdgeId = object.notificationEdgeId;
                else if (typeof object.notificationEdgeId === "object")
                    message.notificationEdgeId = new $util.LongBits(object.notificationEdgeId.low >>> 0, object.notificationEdgeId.high >>> 0).toNumber();
            if (object.markEdgeId != null)
                if ($util.Long)
                    message.markEdgeId = $util.Long.fromValue(object.markEdgeId, false);
                else if (typeof object.markEdgeId === "string")
                    message.markEdgeId = parseInt(object.markEdgeId, 10);
                else if (typeof object.markEdgeId === "number")
                    message.markEdgeId = object.markEdgeId;
                else if (typeof object.markEdgeId === "object")
                    message.markEdgeId = new $util.LongBits(object.markEdgeId.low >>> 0, object.markEdgeId.high >>> 0).toNumber();
            switch (object.readStatus) {
            default:
                if (typeof object.readStatus === "number") {
                    message.readStatus = object.readStatus;
                    break;
                }
                break;
            case "NRS_UNSPECIFIED":
            case 0:
                message.readStatus = 0;
                break;
            case "NRS_LAST":
            case 1:
                message.readStatus = 1;
                break;
            case "NRS_READ":
            case 2:
                message.readStatus = 2;
                break;
            case "NRS_UNREAD":
            case 3:
                message.readStatus = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a NotificationReadMark message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.NotificationReadMark
         * @static
         * @param {NotificationCenter.NotificationReadMark} message NotificationReadMark
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotificationReadMark.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.uid = "";
                else {
                    object.uid = [];
                    if (options.bytes !== Array)
                        object.uid = $util.newBuffer(object.uid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.notificationEdgeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.notificationEdgeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.markEdgeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.markEdgeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.readStatus = options.enums === String ? "NRS_UNSPECIFIED" : 0;
            }
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                object.uid = options.bytes === String ? $util.base64.encode(message.uid, 0, message.uid.length) : options.bytes === Array ? Array.prototype.slice.call(message.uid) : message.uid;
            if (message.notificationEdgeId != null && Object.hasOwnProperty.call(message, "notificationEdgeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.notificationEdgeId = typeof message.notificationEdgeId === "number" ? BigInt(message.notificationEdgeId) : $util.Long.fromBits(message.notificationEdgeId.low >>> 0, message.notificationEdgeId.high >>> 0, false).toBigInt();
                else if (typeof message.notificationEdgeId === "number")
                    object.notificationEdgeId = options.longs === String ? String(message.notificationEdgeId) : message.notificationEdgeId;
                else
                    object.notificationEdgeId = options.longs === String ? $util.Long.prototype.toString.call(message.notificationEdgeId) : options.longs === Number ? new $util.LongBits(message.notificationEdgeId.low >>> 0, message.notificationEdgeId.high >>> 0).toNumber() : message.notificationEdgeId;
            if (message.markEdgeId != null && Object.hasOwnProperty.call(message, "markEdgeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.markEdgeId = typeof message.markEdgeId === "number" ? BigInt(message.markEdgeId) : $util.Long.fromBits(message.markEdgeId.low >>> 0, message.markEdgeId.high >>> 0, false).toBigInt();
                else if (typeof message.markEdgeId === "number")
                    object.markEdgeId = options.longs === String ? String(message.markEdgeId) : message.markEdgeId;
                else
                    object.markEdgeId = options.longs === String ? $util.Long.prototype.toString.call(message.markEdgeId) : options.longs === Number ? new $util.LongBits(message.markEdgeId.low >>> 0, message.markEdgeId.high >>> 0).toNumber() : message.markEdgeId;
            if (message.readStatus != null && Object.hasOwnProperty.call(message, "readStatus"))
                object.readStatus = options.enums === String ? $root.NotificationCenter.NotificationReadStatus[message.readStatus] === undefined ? message.readStatus : $root.NotificationCenter.NotificationReadStatus[message.readStatus] : message.readStatus;
            return object;
        };

        /**
         * Converts this NotificationReadMark to JSON.
         * @function toJSON
         * @memberof NotificationCenter.NotificationReadMark
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotificationReadMark.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotificationReadMark
         * @function getTypeUrl
         * @memberof NotificationCenter.NotificationReadMark
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotificationReadMark.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.NotificationReadMark";
        };

        return NotificationReadMark;
    })();

    NotificationCenter.NotificationContent = (function() {

        /**
         * Properties of a NotificationContent.
         * @memberof NotificationCenter
         * @interface INotificationContent
         * @property {NotificationCenter.INotification|null} [notification] NotificationContent notification
         * @property {NotificationCenter.NotificationReadStatus|null} [readStatus] NotificationContent readStatus
         * @property {NotificationCenter.NotificationApprovalStatus|null} [approvalStatus] NotificationContent approvalStatus
         * @property {boolean|null} [trimmingPoint] NotificationContent trimmingPoint
         * @property {Array.<number>|null} [clientTypeIDs] NotificationContent clientTypeIDs
         * @property {Array.<number>|null} [deviceIDs] NotificationContent deviceIDs
         */

        /**
         * Constructs a new NotificationContent.
         * @memberof NotificationCenter
         * @classdesc Represents a NotificationContent.
         * @implements INotificationContent
         * @constructor
         * @param {NotificationCenter.INotificationContent=} [properties] Properties to set
         */
        function NotificationContent(properties) {
            this.clientTypeIDs = [];
            this.deviceIDs = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotificationContent notification.
         * @member {NotificationCenter.INotification|null|undefined} notification
         * @memberof NotificationCenter.NotificationContent
         * @instance
         */
        NotificationContent.prototype.notification = null;

        /**
         * NotificationContent readStatus.
         * @member {NotificationCenter.NotificationReadStatus|null|undefined} readStatus
         * @memberof NotificationCenter.NotificationContent
         * @instance
         */
        NotificationContent.prototype.readStatus = null;

        /**
         * NotificationContent approvalStatus.
         * @member {NotificationCenter.NotificationApprovalStatus|null|undefined} approvalStatus
         * @memberof NotificationCenter.NotificationContent
         * @instance
         */
        NotificationContent.prototype.approvalStatus = null;

        /**
         * NotificationContent trimmingPoint.
         * @member {boolean|null|undefined} trimmingPoint
         * @memberof NotificationCenter.NotificationContent
         * @instance
         */
        NotificationContent.prototype.trimmingPoint = null;

        /**
         * NotificationContent clientTypeIDs.
         * @member {Array.<number>} clientTypeIDs
         * @memberof NotificationCenter.NotificationContent
         * @instance
         */
        NotificationContent.prototype.clientTypeIDs = $util.emptyArray;

        /**
         * NotificationContent deviceIDs.
         * @member {Array.<number>} deviceIDs
         * @memberof NotificationCenter.NotificationContent
         * @instance
         */
        NotificationContent.prototype.deviceIDs = $util.emptyArray;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * NotificationContent type.
         * @member {"notification"|"readStatus"|"approvalStatus"|"trimmingPoint"|undefined} type
         * @memberof NotificationCenter.NotificationContent
         * @instance
         */
        Object.defineProperty(NotificationContent.prototype, "type", {
            get: $util.oneOfGetter($oneOfFields = ["notification", "readStatus", "approvalStatus", "trimmingPoint"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new NotificationContent instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.NotificationContent
         * @static
         * @param {NotificationCenter.INotificationContent=} [properties] Properties to set
         * @returns {NotificationCenter.NotificationContent} NotificationContent instance
         */
        NotificationContent.create = function create(properties) {
            return new NotificationContent(properties);
        };

        /**
         * Encodes the specified NotificationContent message. Does not implicitly {@link NotificationCenter.NotificationContent.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.NotificationContent
         * @static
         * @param {NotificationCenter.INotificationContent} message NotificationContent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationContent.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.notification != null && Object.hasOwnProperty.call(message, "notification"))
                $root.NotificationCenter.Notification.encode(message.notification, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.readStatus != null && Object.hasOwnProperty.call(message, "readStatus"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.readStatus);
            if (message.approvalStatus != null && Object.hasOwnProperty.call(message, "approvalStatus"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.approvalStatus);
            if (message.trimmingPoint != null && Object.hasOwnProperty.call(message, "trimmingPoint"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.trimmingPoint);
            if (message.clientTypeIDs != null && message.clientTypeIDs.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.clientTypeIDs.length; ++i)
                    writer.int32(message.clientTypeIDs[i]);
                writer.ldelim();
            }
            if (message.deviceIDs != null && message.deviceIDs.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (let i = 0; i < message.deviceIDs.length; ++i)
                    writer.int64(message.deviceIDs[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified NotificationContent message, length delimited. Does not implicitly {@link NotificationCenter.NotificationContent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.NotificationContent
         * @static
         * @param {NotificationCenter.INotificationContent} message NotificationContent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationContent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a NotificationContent message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.NotificationContent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.NotificationContent} NotificationContent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationContent.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.NotificationContent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.notification = $root.NotificationCenter.Notification.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        message.readStatus = reader.int32();
                        break;
                    }
                case 3: {
                        message.approvalStatus = reader.int32();
                        break;
                    }
                case 4: {
                        message.trimmingPoint = reader.bool();
                        break;
                    }
                case 5: {
                        if (!(message.clientTypeIDs && message.clientTypeIDs.length))
                            message.clientTypeIDs = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.clientTypeIDs.push(reader.int32());
                        } else
                            message.clientTypeIDs.push(reader.int32());
                        break;
                    }
                case 6: {
                        if (!(message.deviceIDs && message.deviceIDs.length))
                            message.deviceIDs = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.deviceIDs.push(reader.int64());
                        } else
                            message.deviceIDs.push(reader.int64());
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
         * Decodes a NotificationContent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.NotificationContent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.NotificationContent} NotificationContent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationContent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotificationContent message.
         * @function verify
         * @memberof NotificationCenter.NotificationContent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotificationContent.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.notification != null && Object.hasOwnProperty.call(message, "notification")) {
                properties.type = 1;
                {
                    let error = $root.NotificationCenter.Notification.verify(message.notification, long + 1);
                    if (error)
                        return "notification." + error;
                }
            }
            if (message.readStatus != null && Object.hasOwnProperty.call(message, "readStatus")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                switch (message.readStatus) {
                default:
                    return "readStatus: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            }
            if (message.approvalStatus != null && Object.hasOwnProperty.call(message, "approvalStatus")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                switch (message.approvalStatus) {
                default:
                    return "approvalStatus: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            }
            if (message.trimmingPoint != null && Object.hasOwnProperty.call(message, "trimmingPoint")) {
                if (properties.type === 1)
                    return "type: multiple values";
                properties.type = 1;
                if (typeof message.trimmingPoint !== "boolean")
                    return "trimmingPoint: boolean expected";
            }
            if (message.clientTypeIDs != null && Object.hasOwnProperty.call(message, "clientTypeIDs")) {
                if (!Array.isArray(message.clientTypeIDs))
                    return "clientTypeIDs: array expected";
                for (let i = 0; i < message.clientTypeIDs.length; ++i)
                    if (!$util.isInteger(message.clientTypeIDs[i]))
                        return "clientTypeIDs: integer[] expected";
            }
            if (message.deviceIDs != null && Object.hasOwnProperty.call(message, "deviceIDs")) {
                if (!Array.isArray(message.deviceIDs))
                    return "deviceIDs: array expected";
                for (let i = 0; i < message.deviceIDs.length; ++i)
                    if (!$util.isInteger(message.deviceIDs[i]) && !(message.deviceIDs[i] && $util.isInteger(message.deviceIDs[i].low) && $util.isInteger(message.deviceIDs[i].high)))
                        return "deviceIDs: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a NotificationContent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.NotificationContent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.NotificationContent} NotificationContent
         */
        NotificationContent.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.NotificationContent)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.NotificationContent: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.NotificationContent();
            if (object.notification != null) {
                if (!$util.isObject(object.notification))
                    throw TypeError(".NotificationCenter.NotificationContent.notification: object expected");
                message.notification = $root.NotificationCenter.Notification.fromObject(object.notification, long + 1);
            }
            switch (object.readStatus) {
            default:
                if (typeof object.readStatus === "number") {
                    message.readStatus = object.readStatus;
                    break;
                }
                break;
            case "NRS_UNSPECIFIED":
            case 0:
                message.readStatus = 0;
                break;
            case "NRS_LAST":
            case 1:
                message.readStatus = 1;
                break;
            case "NRS_READ":
            case 2:
                message.readStatus = 2;
                break;
            case "NRS_UNREAD":
            case 3:
                message.readStatus = 3;
                break;
            }
            switch (object.approvalStatus) {
            default:
                if (typeof object.approvalStatus === "number") {
                    message.approvalStatus = object.approvalStatus;
                    break;
                }
                break;
            case "NAS_UNSPECIFIED":
            case 0:
                message.approvalStatus = 0;
                break;
            case "NAS_APPROVED":
            case 1:
                message.approvalStatus = 1;
                break;
            case "NAS_DENIED":
            case 2:
                message.approvalStatus = 2;
                break;
            case "NAS_LOST_APPROVAL_RIGHTS":
            case 3:
                message.approvalStatus = 3;
                break;
            case "NAS_LOST_ACCESS":
            case 4:
                message.approvalStatus = 4;
                break;
            }
            if (object.trimmingPoint != null)
                message.trimmingPoint = Boolean(object.trimmingPoint);
            if (object.clientTypeIDs) {
                if (!Array.isArray(object.clientTypeIDs))
                    throw TypeError(".NotificationCenter.NotificationContent.clientTypeIDs: array expected");
                message.clientTypeIDs = [];
                for (let i = 0; i < object.clientTypeIDs.length; ++i)
                    message.clientTypeIDs[i] = object.clientTypeIDs[i] | 0;
            }
            if (object.deviceIDs) {
                if (!Array.isArray(object.deviceIDs))
                    throw TypeError(".NotificationCenter.NotificationContent.deviceIDs: array expected");
                message.deviceIDs = [];
                for (let i = 0; i < object.deviceIDs.length; ++i)
                    if ($util.Long)
                        message.deviceIDs[i] = $util.Long.fromValue(object.deviceIDs[i], false);
                    else if (typeof object.deviceIDs[i] === "string")
                        message.deviceIDs[i] = parseInt(object.deviceIDs[i], 10);
                    else if (typeof object.deviceIDs[i] === "number")
                        message.deviceIDs[i] = object.deviceIDs[i];
                    else if (typeof object.deviceIDs[i] === "object")
                        message.deviceIDs[i] = new $util.LongBits(object.deviceIDs[i].low >>> 0, object.deviceIDs[i].high >>> 0).toNumber();
            }
            return message;
        };

        /**
         * Creates a plain object from a NotificationContent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.NotificationContent
         * @static
         * @param {NotificationCenter.NotificationContent} message NotificationContent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotificationContent.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.clientTypeIDs = [];
                object.deviceIDs = [];
            }
            if (message.notification != null && Object.hasOwnProperty.call(message, "notification")) {
                object.notification = $root.NotificationCenter.Notification.toObject(message.notification, options, q + 1);
                if (options.oneofs)
                    object.type = "notification";
            }
            if (message.readStatus != null && Object.hasOwnProperty.call(message, "readStatus")) {
                object.readStatus = options.enums === String ? $root.NotificationCenter.NotificationReadStatus[message.readStatus] === undefined ? message.readStatus : $root.NotificationCenter.NotificationReadStatus[message.readStatus] : message.readStatus;
                if (options.oneofs)
                    object.type = "readStatus";
            }
            if (message.approvalStatus != null && Object.hasOwnProperty.call(message, "approvalStatus")) {
                object.approvalStatus = options.enums === String ? $root.NotificationCenter.NotificationApprovalStatus[message.approvalStatus] === undefined ? message.approvalStatus : $root.NotificationCenter.NotificationApprovalStatus[message.approvalStatus] : message.approvalStatus;
                if (options.oneofs)
                    object.type = "approvalStatus";
            }
            if (message.trimmingPoint != null && Object.hasOwnProperty.call(message, "trimmingPoint")) {
                object.trimmingPoint = message.trimmingPoint;
                if (options.oneofs)
                    object.type = "trimmingPoint";
            }
            if (message.clientTypeIDs && message.clientTypeIDs.length) {
                object.clientTypeIDs = [];
                for (let j = 0; j < message.clientTypeIDs.length; ++j)
                    object.clientTypeIDs[j] = message.clientTypeIDs[j];
            }
            if (message.deviceIDs && message.deviceIDs.length) {
                object.deviceIDs = [];
                for (let j = 0; j < message.deviceIDs.length; ++j)
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.deviceIDs[j] = typeof message.deviceIDs[j] === "number" ? BigInt(message.deviceIDs[j]) : $util.Long.fromBits(message.deviceIDs[j].low >>> 0, message.deviceIDs[j].high >>> 0, false).toBigInt();
                    else if (typeof message.deviceIDs[j] === "number")
                        object.deviceIDs[j] = options.longs === String ? String(message.deviceIDs[j]) : message.deviceIDs[j];
                    else
                        object.deviceIDs[j] = options.longs === String ? $util.Long.prototype.toString.call(message.deviceIDs[j]) : options.longs === Number ? new $util.LongBits(message.deviceIDs[j].low >>> 0, message.deviceIDs[j].high >>> 0).toNumber() : message.deviceIDs[j];
            }
            return object;
        };

        /**
         * Converts this NotificationContent to JSON.
         * @function toJSON
         * @memberof NotificationCenter.NotificationContent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotificationContent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotificationContent
         * @function getTypeUrl
         * @memberof NotificationCenter.NotificationContent
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotificationContent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.NotificationContent";
        };

        return NotificationContent;
    })();

    NotificationCenter.NotificationWrapper = (function() {

        /**
         * Properties of a NotificationWrapper.
         * @memberof NotificationCenter
         * @interface INotificationWrapper
         * @property {Uint8Array|null} [uid] NotificationWrapper uid
         * @property {NotificationCenter.INotificationContent|null} [content] NotificationWrapper content
         * @property {number|null} [timestamp] NotificationWrapper timestamp
         */

        /**
         * Constructs a new NotificationWrapper.
         * @memberof NotificationCenter
         * @classdesc Represents a NotificationWrapper.
         * @implements INotificationWrapper
         * @constructor
         * @param {NotificationCenter.INotificationWrapper=} [properties] Properties to set
         */
        function NotificationWrapper(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotificationWrapper uid.
         * @member {Uint8Array} uid
         * @memberof NotificationCenter.NotificationWrapper
         * @instance
         */
        NotificationWrapper.prototype.uid = $util.newBuffer([]);

        /**
         * NotificationWrapper content.
         * @member {NotificationCenter.INotificationContent|null|undefined} content
         * @memberof NotificationCenter.NotificationWrapper
         * @instance
         */
        NotificationWrapper.prototype.content = null;

        /**
         * NotificationWrapper timestamp.
         * @member {number} timestamp
         * @memberof NotificationCenter.NotificationWrapper
         * @instance
         */
        NotificationWrapper.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new NotificationWrapper instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.NotificationWrapper
         * @static
         * @param {NotificationCenter.INotificationWrapper=} [properties] Properties to set
         * @returns {NotificationCenter.NotificationWrapper} NotificationWrapper instance
         */
        NotificationWrapper.create = function create(properties) {
            return new NotificationWrapper(properties);
        };

        /**
         * Encodes the specified NotificationWrapper message. Does not implicitly {@link NotificationCenter.NotificationWrapper.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.NotificationWrapper
         * @static
         * @param {NotificationCenter.INotificationWrapper} message NotificationWrapper message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationWrapper.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.uid);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                $root.NotificationCenter.NotificationContent.encode(message.content, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified NotificationWrapper message, length delimited. Does not implicitly {@link NotificationCenter.NotificationWrapper.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.NotificationWrapper
         * @static
         * @param {NotificationCenter.INotificationWrapper} message NotificationWrapper message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationWrapper.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a NotificationWrapper message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.NotificationWrapper
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.NotificationWrapper} NotificationWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationWrapper.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.NotificationWrapper();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.uid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.content = $root.NotificationCenter.NotificationContent.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.timestamp = reader.int64();
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
         * Decodes a NotificationWrapper message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.NotificationWrapper
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.NotificationWrapper} NotificationWrapper
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationWrapper.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotificationWrapper message.
         * @function verify
         * @memberof NotificationCenter.NotificationWrapper
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotificationWrapper.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                if (!(message.uid && typeof message.uid.length === "number" || $util.isString(message.uid)))
                    return "uid: buffer expected";
            if (message.content != null && Object.hasOwnProperty.call(message, "content")) {
                let error = $root.NotificationCenter.NotificationContent.verify(message.content, long + 1);
                if (error)
                    return "content." + error;
            }
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a NotificationWrapper message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.NotificationWrapper
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.NotificationWrapper} NotificationWrapper
         */
        NotificationWrapper.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.NotificationWrapper)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.NotificationWrapper: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.NotificationWrapper();
            if (object.uid != null)
                if (typeof object.uid === "string")
                    $util.base64.decode(object.uid, message.uid = $util.newBuffer($util.base64.length(object.uid)), 0);
                else if (object.uid.length >= 0)
                    message.uid = object.uid;
            if (object.content != null) {
                if (!$util.isObject(object.content))
                    throw TypeError(".NotificationCenter.NotificationWrapper.content: object expected");
                message.content = $root.NotificationCenter.NotificationContent.fromObject(object.content, long + 1);
            }
            if (object.timestamp != null)
                if ($util.Long)
                    message.timestamp = $util.Long.fromValue(object.timestamp, false);
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a NotificationWrapper message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.NotificationWrapper
         * @static
         * @param {NotificationCenter.NotificationWrapper} message NotificationWrapper
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotificationWrapper.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.uid = "";
                else {
                    object.uid = [];
                    if (options.bytes !== Array)
                        object.uid = $util.newBuffer(object.uid);
                }
                object.content = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                object.uid = options.bytes === String ? $util.base64.encode(message.uid, 0, message.uid.length) : options.bytes === Array ? Array.prototype.slice.call(message.uid) : message.uid;
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                object.content = $root.NotificationCenter.NotificationContent.toObject(message.content, options, q + 1);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.timestamp = typeof message.timestamp === "number" ? BigInt(message.timestamp) : $util.Long.fromBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0, false).toBigInt();
                else if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this NotificationWrapper to JSON.
         * @function toJSON
         * @memberof NotificationCenter.NotificationWrapper
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotificationWrapper.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotificationWrapper
         * @function getTypeUrl
         * @memberof NotificationCenter.NotificationWrapper
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotificationWrapper.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.NotificationWrapper";
        };

        return NotificationWrapper;
    })();

    NotificationCenter.NotificationSync = (function() {

        /**
         * Properties of a NotificationSync.
         * @memberof NotificationCenter
         * @interface INotificationSync
         * @property {Array.<NotificationCenter.INotificationWrapper>|null} [data] NotificationSync data
         * @property {number|null} [syncPoint] NotificationSync syncPoint
         * @property {boolean|null} [hasMore] NotificationSync hasMore
         */

        /**
         * Constructs a new NotificationSync.
         * @memberof NotificationCenter
         * @classdesc Represents a NotificationSync.
         * @implements INotificationSync
         * @constructor
         * @param {NotificationCenter.INotificationSync=} [properties] Properties to set
         */
        function NotificationSync(properties) {
            this.data = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotificationSync data.
         * @member {Array.<NotificationCenter.INotificationWrapper>} data
         * @memberof NotificationCenter.NotificationSync
         * @instance
         */
        NotificationSync.prototype.data = $util.emptyArray;

        /**
         * NotificationSync syncPoint.
         * @member {number} syncPoint
         * @memberof NotificationCenter.NotificationSync
         * @instance
         */
        NotificationSync.prototype.syncPoint = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * NotificationSync hasMore.
         * @member {boolean} hasMore
         * @memberof NotificationCenter.NotificationSync
         * @instance
         */
        NotificationSync.prototype.hasMore = false;

        /**
         * Creates a new NotificationSync instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.NotificationSync
         * @static
         * @param {NotificationCenter.INotificationSync=} [properties] Properties to set
         * @returns {NotificationCenter.NotificationSync} NotificationSync instance
         */
        NotificationSync.create = function create(properties) {
            return new NotificationSync(properties);
        };

        /**
         * Encodes the specified NotificationSync message. Does not implicitly {@link NotificationCenter.NotificationSync.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.NotificationSync
         * @static
         * @param {NotificationCenter.INotificationSync} message NotificationSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationSync.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.data != null && message.data.length)
                for (let i = 0; i < message.data.length; ++i)
                    $root.NotificationCenter.NotificationWrapper.encode(message.data[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.syncPoint != null && Object.hasOwnProperty.call(message, "syncPoint"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.syncPoint);
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.hasMore);
            return writer;
        };

        /**
         * Encodes the specified NotificationSync message, length delimited. Does not implicitly {@link NotificationCenter.NotificationSync.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.NotificationSync
         * @static
         * @param {NotificationCenter.INotificationSync} message NotificationSync message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationSync.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a NotificationSync message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.NotificationSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.NotificationSync} NotificationSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationSync.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.NotificationSync();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.data && message.data.length))
                            message.data = [];
                        message.data.push($root.NotificationCenter.NotificationWrapper.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        message.syncPoint = reader.int64();
                        break;
                    }
                case 3: {
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
         * Decodes a NotificationSync message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.NotificationSync
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.NotificationSync} NotificationSync
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationSync.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotificationSync message.
         * @function verify
         * @memberof NotificationCenter.NotificationSync
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotificationSync.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.data != null && Object.hasOwnProperty.call(message, "data")) {
                if (!Array.isArray(message.data))
                    return "data: array expected";
                for (let i = 0; i < message.data.length; ++i) {
                    let error = $root.NotificationCenter.NotificationWrapper.verify(message.data[i], long + 1);
                    if (error)
                        return "data." + error;
                }
            }
            if (message.syncPoint != null && Object.hasOwnProperty.call(message, "syncPoint"))
                if (!$util.isInteger(message.syncPoint) && !(message.syncPoint && $util.isInteger(message.syncPoint.low) && $util.isInteger(message.syncPoint.high)))
                    return "syncPoint: integer|Long expected";
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                if (typeof message.hasMore !== "boolean")
                    return "hasMore: boolean expected";
            return null;
        };

        /**
         * Creates a NotificationSync message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.NotificationSync
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.NotificationSync} NotificationSync
         */
        NotificationSync.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.NotificationSync)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.NotificationSync: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.NotificationSync();
            if (object.data) {
                if (!Array.isArray(object.data))
                    throw TypeError(".NotificationCenter.NotificationSync.data: array expected");
                message.data = [];
                for (let i = 0; i < object.data.length; ++i) {
                    if (!$util.isObject(object.data[i]))
                        throw TypeError(".NotificationCenter.NotificationSync.data: object expected");
                    message.data[i] = $root.NotificationCenter.NotificationWrapper.fromObject(object.data[i], long + 1);
                }
            }
            if (object.syncPoint != null)
                if ($util.Long)
                    message.syncPoint = $util.Long.fromValue(object.syncPoint, false);
                else if (typeof object.syncPoint === "string")
                    message.syncPoint = parseInt(object.syncPoint, 10);
                else if (typeof object.syncPoint === "number")
                    message.syncPoint = object.syncPoint;
                else if (typeof object.syncPoint === "object")
                    message.syncPoint = new $util.LongBits(object.syncPoint.low >>> 0, object.syncPoint.high >>> 0).toNumber();
            if (object.hasMore != null)
                message.hasMore = Boolean(object.hasMore);
            return message;
        };

        /**
         * Creates a plain object from a NotificationSync message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.NotificationSync
         * @static
         * @param {NotificationCenter.NotificationSync} message NotificationSync
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotificationSync.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.data = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.syncPoint = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.syncPoint = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.hasMore = false;
            }
            if (message.data && message.data.length) {
                object.data = [];
                for (let j = 0; j < message.data.length; ++j)
                    object.data[j] = $root.NotificationCenter.NotificationWrapper.toObject(message.data[j], options, q + 1);
            }
            if (message.syncPoint != null && Object.hasOwnProperty.call(message, "syncPoint"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.syncPoint = typeof message.syncPoint === "number" ? BigInt(message.syncPoint) : $util.Long.fromBits(message.syncPoint.low >>> 0, message.syncPoint.high >>> 0, false).toBigInt();
                else if (typeof message.syncPoint === "number")
                    object.syncPoint = options.longs === String ? String(message.syncPoint) : message.syncPoint;
                else
                    object.syncPoint = options.longs === String ? $util.Long.prototype.toString.call(message.syncPoint) : options.longs === Number ? new $util.LongBits(message.syncPoint.low >>> 0, message.syncPoint.high >>> 0).toNumber() : message.syncPoint;
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                object.hasMore = message.hasMore;
            return object;
        };

        /**
         * Converts this NotificationSync to JSON.
         * @function toJSON
         * @memberof NotificationCenter.NotificationSync
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotificationSync.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotificationSync
         * @function getTypeUrl
         * @memberof NotificationCenter.NotificationSync
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotificationSync.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.NotificationSync";
        };

        return NotificationSync;
    })();

    NotificationCenter.ReadStatusUpdate = (function() {

        /**
         * Properties of a ReadStatusUpdate.
         * @memberof NotificationCenter
         * @interface IReadStatusUpdate
         * @property {Uint8Array|null} [notificationUid] ReadStatusUpdate notificationUid
         * @property {NotificationCenter.NotificationReadStatus|null} [status] ReadStatusUpdate status
         */

        /**
         * Constructs a new ReadStatusUpdate.
         * @memberof NotificationCenter
         * @classdesc Represents a ReadStatusUpdate.
         * @implements IReadStatusUpdate
         * @constructor
         * @param {NotificationCenter.IReadStatusUpdate=} [properties] Properties to set
         */
        function ReadStatusUpdate(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReadStatusUpdate notificationUid.
         * @member {Uint8Array} notificationUid
         * @memberof NotificationCenter.ReadStatusUpdate
         * @instance
         */
        ReadStatusUpdate.prototype.notificationUid = $util.newBuffer([]);

        /**
         * ReadStatusUpdate status.
         * @member {NotificationCenter.NotificationReadStatus} status
         * @memberof NotificationCenter.ReadStatusUpdate
         * @instance
         */
        ReadStatusUpdate.prototype.status = 0;

        /**
         * Creates a new ReadStatusUpdate instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.ReadStatusUpdate
         * @static
         * @param {NotificationCenter.IReadStatusUpdate=} [properties] Properties to set
         * @returns {NotificationCenter.ReadStatusUpdate} ReadStatusUpdate instance
         */
        ReadStatusUpdate.create = function create(properties) {
            return new ReadStatusUpdate(properties);
        };

        /**
         * Encodes the specified ReadStatusUpdate message. Does not implicitly {@link NotificationCenter.ReadStatusUpdate.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.ReadStatusUpdate
         * @static
         * @param {NotificationCenter.IReadStatusUpdate} message ReadStatusUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReadStatusUpdate.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.notificationUid != null && Object.hasOwnProperty.call(message, "notificationUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.notificationUid);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            return writer;
        };

        /**
         * Encodes the specified ReadStatusUpdate message, length delimited. Does not implicitly {@link NotificationCenter.ReadStatusUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.ReadStatusUpdate
         * @static
         * @param {NotificationCenter.IReadStatusUpdate} message ReadStatusUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReadStatusUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ReadStatusUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.ReadStatusUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.ReadStatusUpdate} ReadStatusUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReadStatusUpdate.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.ReadStatusUpdate();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.notificationUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.status = reader.int32();
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
         * Decodes a ReadStatusUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.ReadStatusUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.ReadStatusUpdate} ReadStatusUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReadStatusUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReadStatusUpdate message.
         * @function verify
         * @memberof NotificationCenter.ReadStatusUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReadStatusUpdate.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.notificationUid != null && Object.hasOwnProperty.call(message, "notificationUid"))
                if (!(message.notificationUid && typeof message.notificationUid.length === "number" || $util.isString(message.notificationUid)))
                    return "notificationUid: buffer expected";
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
            return null;
        };

        /**
         * Creates a ReadStatusUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.ReadStatusUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.ReadStatusUpdate} ReadStatusUpdate
         */
        ReadStatusUpdate.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.ReadStatusUpdate)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.ReadStatusUpdate: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.ReadStatusUpdate();
            if (object.notificationUid != null)
                if (typeof object.notificationUid === "string")
                    $util.base64.decode(object.notificationUid, message.notificationUid = $util.newBuffer($util.base64.length(object.notificationUid)), 0);
                else if (object.notificationUid.length >= 0)
                    message.notificationUid = object.notificationUid;
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "NRS_UNSPECIFIED":
            case 0:
                message.status = 0;
                break;
            case "NRS_LAST":
            case 1:
                message.status = 1;
                break;
            case "NRS_READ":
            case 2:
                message.status = 2;
                break;
            case "NRS_UNREAD":
            case 3:
                message.status = 3;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a ReadStatusUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.ReadStatusUpdate
         * @static
         * @param {NotificationCenter.ReadStatusUpdate} message ReadStatusUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReadStatusUpdate.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.notificationUid = "";
                else {
                    object.notificationUid = [];
                    if (options.bytes !== Array)
                        object.notificationUid = $util.newBuffer(object.notificationUid);
                }
                object.status = options.enums === String ? "NRS_UNSPECIFIED" : 0;
            }
            if (message.notificationUid != null && Object.hasOwnProperty.call(message, "notificationUid"))
                object.notificationUid = options.bytes === String ? $util.base64.encode(message.notificationUid, 0, message.notificationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.notificationUid) : message.notificationUid;
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = options.enums === String ? $root.NotificationCenter.NotificationReadStatus[message.status] === undefined ? message.status : $root.NotificationCenter.NotificationReadStatus[message.status] : message.status;
            return object;
        };

        /**
         * Converts this ReadStatusUpdate to JSON.
         * @function toJSON
         * @memberof NotificationCenter.ReadStatusUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReadStatusUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ReadStatusUpdate
         * @function getTypeUrl
         * @memberof NotificationCenter.ReadStatusUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ReadStatusUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.ReadStatusUpdate";
        };

        return ReadStatusUpdate;
    })();

    NotificationCenter.ApprovalStatusUpdate = (function() {

        /**
         * Properties of an ApprovalStatusUpdate.
         * @memberof NotificationCenter
         * @interface IApprovalStatusUpdate
         * @property {Uint8Array|null} [notificationUid] ApprovalStatusUpdate notificationUid
         * @property {NotificationCenter.NotificationApprovalStatus|null} [status] ApprovalStatusUpdate status
         */

        /**
         * Constructs a new ApprovalStatusUpdate.
         * @memberof NotificationCenter
         * @classdesc Represents an ApprovalStatusUpdate.
         * @implements IApprovalStatusUpdate
         * @constructor
         * @param {NotificationCenter.IApprovalStatusUpdate=} [properties] Properties to set
         */
        function ApprovalStatusUpdate(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApprovalStatusUpdate notificationUid.
         * @member {Uint8Array} notificationUid
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @instance
         */
        ApprovalStatusUpdate.prototype.notificationUid = $util.newBuffer([]);

        /**
         * ApprovalStatusUpdate status.
         * @member {NotificationCenter.NotificationApprovalStatus} status
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @instance
         */
        ApprovalStatusUpdate.prototype.status = 0;

        /**
         * Creates a new ApprovalStatusUpdate instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @static
         * @param {NotificationCenter.IApprovalStatusUpdate=} [properties] Properties to set
         * @returns {NotificationCenter.ApprovalStatusUpdate} ApprovalStatusUpdate instance
         */
        ApprovalStatusUpdate.create = function create(properties) {
            return new ApprovalStatusUpdate(properties);
        };

        /**
         * Encodes the specified ApprovalStatusUpdate message. Does not implicitly {@link NotificationCenter.ApprovalStatusUpdate.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @static
         * @param {NotificationCenter.IApprovalStatusUpdate} message ApprovalStatusUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApprovalStatusUpdate.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.notificationUid != null && Object.hasOwnProperty.call(message, "notificationUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.notificationUid);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
            return writer;
        };

        /**
         * Encodes the specified ApprovalStatusUpdate message, length delimited. Does not implicitly {@link NotificationCenter.ApprovalStatusUpdate.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @static
         * @param {NotificationCenter.IApprovalStatusUpdate} message ApprovalStatusUpdate message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApprovalStatusUpdate.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApprovalStatusUpdate message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.ApprovalStatusUpdate} ApprovalStatusUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApprovalStatusUpdate.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.ApprovalStatusUpdate();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.notificationUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.status = reader.int32();
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
         * Decodes an ApprovalStatusUpdate message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.ApprovalStatusUpdate} ApprovalStatusUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApprovalStatusUpdate.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApprovalStatusUpdate message.
         * @function verify
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApprovalStatusUpdate.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.notificationUid != null && Object.hasOwnProperty.call(message, "notificationUid"))
                if (!(message.notificationUid && typeof message.notificationUid.length === "number" || $util.isString(message.notificationUid)))
                    return "notificationUid: buffer expected";
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                switch (message.status) {
                default:
                    return "status: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            return null;
        };

        /**
         * Creates an ApprovalStatusUpdate message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.ApprovalStatusUpdate} ApprovalStatusUpdate
         */
        ApprovalStatusUpdate.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.ApprovalStatusUpdate)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.ApprovalStatusUpdate: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.ApprovalStatusUpdate();
            if (object.notificationUid != null)
                if (typeof object.notificationUid === "string")
                    $util.base64.decode(object.notificationUid, message.notificationUid = $util.newBuffer($util.base64.length(object.notificationUid)), 0);
                else if (object.notificationUid.length >= 0)
                    message.notificationUid = object.notificationUid;
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "NAS_UNSPECIFIED":
            case 0:
                message.status = 0;
                break;
            case "NAS_APPROVED":
            case 1:
                message.status = 1;
                break;
            case "NAS_DENIED":
            case 2:
                message.status = 2;
                break;
            case "NAS_LOST_APPROVAL_RIGHTS":
            case 3:
                message.status = 3;
                break;
            case "NAS_LOST_ACCESS":
            case 4:
                message.status = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an ApprovalStatusUpdate message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @static
         * @param {NotificationCenter.ApprovalStatusUpdate} message ApprovalStatusUpdate
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApprovalStatusUpdate.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.notificationUid = "";
                else {
                    object.notificationUid = [];
                    if (options.bytes !== Array)
                        object.notificationUid = $util.newBuffer(object.notificationUid);
                }
                object.status = options.enums === String ? "NAS_UNSPECIFIED" : 0;
            }
            if (message.notificationUid != null && Object.hasOwnProperty.call(message, "notificationUid"))
                object.notificationUid = options.bytes === String ? $util.base64.encode(message.notificationUid, 0, message.notificationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.notificationUid) : message.notificationUid;
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = options.enums === String ? $root.NotificationCenter.NotificationApprovalStatus[message.status] === undefined ? message.status : $root.NotificationCenter.NotificationApprovalStatus[message.status] : message.status;
            return object;
        };

        /**
         * Converts this ApprovalStatusUpdate to JSON.
         * @function toJSON
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApprovalStatusUpdate.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApprovalStatusUpdate
         * @function getTypeUrl
         * @memberof NotificationCenter.ApprovalStatusUpdate
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApprovalStatusUpdate.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.ApprovalStatusUpdate";
        };

        return ApprovalStatusUpdate;
    })();

    NotificationCenter.ProcessMarkReadEventsRequest = (function() {

        /**
         * Properties of a ProcessMarkReadEventsRequest.
         * @memberof NotificationCenter
         * @interface IProcessMarkReadEventsRequest
         * @property {Array.<NotificationCenter.IReadStatusUpdate>|null} [readStatusUpdate] ProcessMarkReadEventsRequest readStatusUpdate
         */

        /**
         * Constructs a new ProcessMarkReadEventsRequest.
         * @memberof NotificationCenter
         * @classdesc Represents a ProcessMarkReadEventsRequest.
         * @implements IProcessMarkReadEventsRequest
         * @constructor
         * @param {NotificationCenter.IProcessMarkReadEventsRequest=} [properties] Properties to set
         */
        function ProcessMarkReadEventsRequest(properties) {
            this.readStatusUpdate = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ProcessMarkReadEventsRequest readStatusUpdate.
         * @member {Array.<NotificationCenter.IReadStatusUpdate>} readStatusUpdate
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @instance
         */
        ProcessMarkReadEventsRequest.prototype.readStatusUpdate = $util.emptyArray;

        /**
         * Creates a new ProcessMarkReadEventsRequest instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @static
         * @param {NotificationCenter.IProcessMarkReadEventsRequest=} [properties] Properties to set
         * @returns {NotificationCenter.ProcessMarkReadEventsRequest} ProcessMarkReadEventsRequest instance
         */
        ProcessMarkReadEventsRequest.create = function create(properties) {
            return new ProcessMarkReadEventsRequest(properties);
        };

        /**
         * Encodes the specified ProcessMarkReadEventsRequest message. Does not implicitly {@link NotificationCenter.ProcessMarkReadEventsRequest.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @static
         * @param {NotificationCenter.IProcessMarkReadEventsRequest} message ProcessMarkReadEventsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProcessMarkReadEventsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.readStatusUpdate != null && message.readStatusUpdate.length)
                for (let i = 0; i < message.readStatusUpdate.length; ++i)
                    $root.NotificationCenter.ReadStatusUpdate.encode(message.readStatusUpdate[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ProcessMarkReadEventsRequest message, length delimited. Does not implicitly {@link NotificationCenter.ProcessMarkReadEventsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @static
         * @param {NotificationCenter.IProcessMarkReadEventsRequest} message ProcessMarkReadEventsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ProcessMarkReadEventsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a ProcessMarkReadEventsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.ProcessMarkReadEventsRequest} ProcessMarkReadEventsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProcessMarkReadEventsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.ProcessMarkReadEventsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.readStatusUpdate && message.readStatusUpdate.length))
                            message.readStatusUpdate = [];
                        message.readStatusUpdate.push($root.NotificationCenter.ReadStatusUpdate.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a ProcessMarkReadEventsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.ProcessMarkReadEventsRequest} ProcessMarkReadEventsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ProcessMarkReadEventsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ProcessMarkReadEventsRequest message.
         * @function verify
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ProcessMarkReadEventsRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.readStatusUpdate != null && Object.hasOwnProperty.call(message, "readStatusUpdate")) {
                if (!Array.isArray(message.readStatusUpdate))
                    return "readStatusUpdate: array expected";
                for (let i = 0; i < message.readStatusUpdate.length; ++i) {
                    let error = $root.NotificationCenter.ReadStatusUpdate.verify(message.readStatusUpdate[i], long + 1);
                    if (error)
                        return "readStatusUpdate." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ProcessMarkReadEventsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.ProcessMarkReadEventsRequest} ProcessMarkReadEventsRequest
         */
        ProcessMarkReadEventsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.ProcessMarkReadEventsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.ProcessMarkReadEventsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.ProcessMarkReadEventsRequest();
            if (object.readStatusUpdate) {
                if (!Array.isArray(object.readStatusUpdate))
                    throw TypeError(".NotificationCenter.ProcessMarkReadEventsRequest.readStatusUpdate: array expected");
                message.readStatusUpdate = [];
                for (let i = 0; i < object.readStatusUpdate.length; ++i) {
                    if (!$util.isObject(object.readStatusUpdate[i]))
                        throw TypeError(".NotificationCenter.ProcessMarkReadEventsRequest.readStatusUpdate: object expected");
                    message.readStatusUpdate[i] = $root.NotificationCenter.ReadStatusUpdate.fromObject(object.readStatusUpdate[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ProcessMarkReadEventsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @static
         * @param {NotificationCenter.ProcessMarkReadEventsRequest} message ProcessMarkReadEventsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ProcessMarkReadEventsRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.readStatusUpdate = [];
            if (message.readStatusUpdate && message.readStatusUpdate.length) {
                object.readStatusUpdate = [];
                for (let j = 0; j < message.readStatusUpdate.length; ++j)
                    object.readStatusUpdate[j] = $root.NotificationCenter.ReadStatusUpdate.toObject(message.readStatusUpdate[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ProcessMarkReadEventsRequest to JSON.
         * @function toJSON
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ProcessMarkReadEventsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ProcessMarkReadEventsRequest
         * @function getTypeUrl
         * @memberof NotificationCenter.ProcessMarkReadEventsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ProcessMarkReadEventsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.ProcessMarkReadEventsRequest";
        };

        return ProcessMarkReadEventsRequest;
    })();

    NotificationCenter.NotificationSendRequest = (function() {

        /**
         * Properties of a NotificationSendRequest.
         * @memberof NotificationCenter
         * @interface INotificationSendRequest
         * @property {Array.<GraphSync.IGraphSyncRef>|null} [recipients] NotificationSendRequest recipients
         * @property {NotificationCenter.INotification|null} [notification] NotificationSendRequest notification
         * @property {Array.<number>|null} [clientTypeIDs] NotificationSendRequest clientTypeIDs
         * @property {Array.<number>|null} [deviceIDs] NotificationSendRequest deviceIDs
         * @property {Uint8Array|null} [predefinedUid] NotificationSendRequest predefinedUid
         */

        /**
         * Constructs a new NotificationSendRequest.
         * @memberof NotificationCenter
         * @classdesc Represents a NotificationSendRequest.
         * @implements INotificationSendRequest
         * @constructor
         * @param {NotificationCenter.INotificationSendRequest=} [properties] Properties to set
         */
        function NotificationSendRequest(properties) {
            this.recipients = [];
            this.clientTypeIDs = [];
            this.deviceIDs = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotificationSendRequest recipients.
         * @member {Array.<GraphSync.IGraphSyncRef>} recipients
         * @memberof NotificationCenter.NotificationSendRequest
         * @instance
         */
        NotificationSendRequest.prototype.recipients = $util.emptyArray;

        /**
         * NotificationSendRequest notification.
         * @member {NotificationCenter.INotification|null|undefined} notification
         * @memberof NotificationCenter.NotificationSendRequest
         * @instance
         */
        NotificationSendRequest.prototype.notification = null;

        /**
         * NotificationSendRequest clientTypeIDs.
         * @member {Array.<number>} clientTypeIDs
         * @memberof NotificationCenter.NotificationSendRequest
         * @instance
         */
        NotificationSendRequest.prototype.clientTypeIDs = $util.emptyArray;

        /**
         * NotificationSendRequest deviceIDs.
         * @member {Array.<number>} deviceIDs
         * @memberof NotificationCenter.NotificationSendRequest
         * @instance
         */
        NotificationSendRequest.prototype.deviceIDs = $util.emptyArray;

        /**
         * NotificationSendRequest predefinedUid.
         * @member {Uint8Array|null|undefined} predefinedUid
         * @memberof NotificationCenter.NotificationSendRequest
         * @instance
         */
        NotificationSendRequest.prototype.predefinedUid = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(NotificationSendRequest.prototype, "_predefinedUid", {
            get: $util.oneOfGetter($oneOfFields = ["predefinedUid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new NotificationSendRequest instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.NotificationSendRequest
         * @static
         * @param {NotificationCenter.INotificationSendRequest=} [properties] Properties to set
         * @returns {NotificationCenter.NotificationSendRequest} NotificationSendRequest instance
         */
        NotificationSendRequest.create = function create(properties) {
            return new NotificationSendRequest(properties);
        };

        /**
         * Encodes the specified NotificationSendRequest message. Does not implicitly {@link NotificationCenter.NotificationSendRequest.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.NotificationSendRequest
         * @static
         * @param {NotificationCenter.INotificationSendRequest} message NotificationSendRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationSendRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.recipients != null && message.recipients.length)
                for (let i = 0; i < message.recipients.length; ++i)
                    $root.GraphSync.GraphSyncRef.encode(message.recipients[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.notification != null && Object.hasOwnProperty.call(message, "notification"))
                $root.NotificationCenter.Notification.encode(message.notification, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.clientTypeIDs != null && message.clientTypeIDs.length) {
                writer.uint32(/* id 3, wireType 2 =*/26).fork();
                for (let i = 0; i < message.clientTypeIDs.length; ++i)
                    writer.int32(message.clientTypeIDs[i]);
                writer.ldelim();
            }
            if (message.deviceIDs != null && message.deviceIDs.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.deviceIDs.length; ++i)
                    writer.int64(message.deviceIDs[i]);
                writer.ldelim();
            }
            if (message.predefinedUid != null && Object.hasOwnProperty.call(message, "predefinedUid"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.predefinedUid);
            return writer;
        };

        /**
         * Encodes the specified NotificationSendRequest message, length delimited. Does not implicitly {@link NotificationCenter.NotificationSendRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.NotificationSendRequest
         * @static
         * @param {NotificationCenter.INotificationSendRequest} message NotificationSendRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationSendRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a NotificationSendRequest message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.NotificationSendRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.NotificationSendRequest} NotificationSendRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationSendRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.NotificationSendRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.recipients && message.recipients.length))
                            message.recipients = [];
                        message.recipients.push($root.GraphSync.GraphSyncRef.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        message.notification = $root.NotificationCenter.Notification.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        if (!(message.clientTypeIDs && message.clientTypeIDs.length))
                            message.clientTypeIDs = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.clientTypeIDs.push(reader.int32());
                        } else
                            message.clientTypeIDs.push(reader.int32());
                        break;
                    }
                case 4: {
                        if (!(message.deviceIDs && message.deviceIDs.length))
                            message.deviceIDs = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.deviceIDs.push(reader.int64());
                        } else
                            message.deviceIDs.push(reader.int64());
                        break;
                    }
                case 5: {
                        message.predefinedUid = reader.bytes();
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
         * Decodes a NotificationSendRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.NotificationSendRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.NotificationSendRequest} NotificationSendRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationSendRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotificationSendRequest message.
         * @function verify
         * @memberof NotificationCenter.NotificationSendRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotificationSendRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.recipients != null && Object.hasOwnProperty.call(message, "recipients")) {
                if (!Array.isArray(message.recipients))
                    return "recipients: array expected";
                for (let i = 0; i < message.recipients.length; ++i) {
                    let error = $root.GraphSync.GraphSyncRef.verify(message.recipients[i], long + 1);
                    if (error)
                        return "recipients." + error;
                }
            }
            if (message.notification != null && Object.hasOwnProperty.call(message, "notification")) {
                let error = $root.NotificationCenter.Notification.verify(message.notification, long + 1);
                if (error)
                    return "notification." + error;
            }
            if (message.clientTypeIDs != null && Object.hasOwnProperty.call(message, "clientTypeIDs")) {
                if (!Array.isArray(message.clientTypeIDs))
                    return "clientTypeIDs: array expected";
                for (let i = 0; i < message.clientTypeIDs.length; ++i)
                    if (!$util.isInteger(message.clientTypeIDs[i]))
                        return "clientTypeIDs: integer[] expected";
            }
            if (message.deviceIDs != null && Object.hasOwnProperty.call(message, "deviceIDs")) {
                if (!Array.isArray(message.deviceIDs))
                    return "deviceIDs: array expected";
                for (let i = 0; i < message.deviceIDs.length; ++i)
                    if (!$util.isInteger(message.deviceIDs[i]) && !(message.deviceIDs[i] && $util.isInteger(message.deviceIDs[i].low) && $util.isInteger(message.deviceIDs[i].high)))
                        return "deviceIDs: integer|Long[] expected";
            }
            if (message.predefinedUid != null && Object.hasOwnProperty.call(message, "predefinedUid")) {
                properties._predefinedUid = 1;
                if (!(message.predefinedUid && typeof message.predefinedUid.length === "number" || $util.isString(message.predefinedUid)))
                    return "predefinedUid: buffer expected";
            }
            return null;
        };

        /**
         * Creates a NotificationSendRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.NotificationSendRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.NotificationSendRequest} NotificationSendRequest
         */
        NotificationSendRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.NotificationSendRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.NotificationSendRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.NotificationSendRequest();
            if (object.recipients) {
                if (!Array.isArray(object.recipients))
                    throw TypeError(".NotificationCenter.NotificationSendRequest.recipients: array expected");
                message.recipients = [];
                for (let i = 0; i < object.recipients.length; ++i) {
                    if (!$util.isObject(object.recipients[i]))
                        throw TypeError(".NotificationCenter.NotificationSendRequest.recipients: object expected");
                    message.recipients[i] = $root.GraphSync.GraphSyncRef.fromObject(object.recipients[i], long + 1);
                }
            }
            if (object.notification != null) {
                if (!$util.isObject(object.notification))
                    throw TypeError(".NotificationCenter.NotificationSendRequest.notification: object expected");
                message.notification = $root.NotificationCenter.Notification.fromObject(object.notification, long + 1);
            }
            if (object.clientTypeIDs) {
                if (!Array.isArray(object.clientTypeIDs))
                    throw TypeError(".NotificationCenter.NotificationSendRequest.clientTypeIDs: array expected");
                message.clientTypeIDs = [];
                for (let i = 0; i < object.clientTypeIDs.length; ++i)
                    message.clientTypeIDs[i] = object.clientTypeIDs[i] | 0;
            }
            if (object.deviceIDs) {
                if (!Array.isArray(object.deviceIDs))
                    throw TypeError(".NotificationCenter.NotificationSendRequest.deviceIDs: array expected");
                message.deviceIDs = [];
                for (let i = 0; i < object.deviceIDs.length; ++i)
                    if ($util.Long)
                        message.deviceIDs[i] = $util.Long.fromValue(object.deviceIDs[i], false);
                    else if (typeof object.deviceIDs[i] === "string")
                        message.deviceIDs[i] = parseInt(object.deviceIDs[i], 10);
                    else if (typeof object.deviceIDs[i] === "number")
                        message.deviceIDs[i] = object.deviceIDs[i];
                    else if (typeof object.deviceIDs[i] === "object")
                        message.deviceIDs[i] = new $util.LongBits(object.deviceIDs[i].low >>> 0, object.deviceIDs[i].high >>> 0).toNumber();
            }
            if (object.predefinedUid != null)
                if (typeof object.predefinedUid === "string")
                    $util.base64.decode(object.predefinedUid, message.predefinedUid = $util.newBuffer($util.base64.length(object.predefinedUid)), 0);
                else if (object.predefinedUid.length >= 0)
                    message.predefinedUid = object.predefinedUid;
            return message;
        };

        /**
         * Creates a plain object from a NotificationSendRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.NotificationSendRequest
         * @static
         * @param {NotificationCenter.NotificationSendRequest} message NotificationSendRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotificationSendRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.recipients = [];
                object.clientTypeIDs = [];
                object.deviceIDs = [];
            }
            if (options.defaults)
                object.notification = null;
            if (message.recipients && message.recipients.length) {
                object.recipients = [];
                for (let j = 0; j < message.recipients.length; ++j)
                    object.recipients[j] = $root.GraphSync.GraphSyncRef.toObject(message.recipients[j], options, q + 1);
            }
            if (message.notification != null && Object.hasOwnProperty.call(message, "notification"))
                object.notification = $root.NotificationCenter.Notification.toObject(message.notification, options, q + 1);
            if (message.clientTypeIDs && message.clientTypeIDs.length) {
                object.clientTypeIDs = [];
                for (let j = 0; j < message.clientTypeIDs.length; ++j)
                    object.clientTypeIDs[j] = message.clientTypeIDs[j];
            }
            if (message.deviceIDs && message.deviceIDs.length) {
                object.deviceIDs = [];
                for (let j = 0; j < message.deviceIDs.length; ++j)
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.deviceIDs[j] = typeof message.deviceIDs[j] === "number" ? BigInt(message.deviceIDs[j]) : $util.Long.fromBits(message.deviceIDs[j].low >>> 0, message.deviceIDs[j].high >>> 0, false).toBigInt();
                    else if (typeof message.deviceIDs[j] === "number")
                        object.deviceIDs[j] = options.longs === String ? String(message.deviceIDs[j]) : message.deviceIDs[j];
                    else
                        object.deviceIDs[j] = options.longs === String ? $util.Long.prototype.toString.call(message.deviceIDs[j]) : options.longs === Number ? new $util.LongBits(message.deviceIDs[j].low >>> 0, message.deviceIDs[j].high >>> 0).toNumber() : message.deviceIDs[j];
            }
            if (message.predefinedUid != null && Object.hasOwnProperty.call(message, "predefinedUid")) {
                object.predefinedUid = options.bytes === String ? $util.base64.encode(message.predefinedUid, 0, message.predefinedUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.predefinedUid) : message.predefinedUid;
                if (options.oneofs)
                    object._predefinedUid = "predefinedUid";
            }
            return object;
        };

        /**
         * Converts this NotificationSendRequest to JSON.
         * @function toJSON
         * @memberof NotificationCenter.NotificationSendRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotificationSendRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotificationSendRequest
         * @function getTypeUrl
         * @memberof NotificationCenter.NotificationSendRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotificationSendRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.NotificationSendRequest";
        };

        return NotificationSendRequest;
    })();

    NotificationCenter.NotificationsSendRequest = (function() {

        /**
         * Properties of a NotificationsSendRequest.
         * @memberof NotificationCenter
         * @interface INotificationsSendRequest
         * @property {Array.<NotificationCenter.INotificationSendRequest>|null} [notifications] NotificationsSendRequest notifications
         */

        /**
         * Constructs a new NotificationsSendRequest.
         * @memberof NotificationCenter
         * @classdesc Represents a NotificationsSendRequest.
         * @implements INotificationsSendRequest
         * @constructor
         * @param {NotificationCenter.INotificationsSendRequest=} [properties] Properties to set
         */
        function NotificationsSendRequest(properties) {
            this.notifications = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotificationsSendRequest notifications.
         * @member {Array.<NotificationCenter.INotificationSendRequest>} notifications
         * @memberof NotificationCenter.NotificationsSendRequest
         * @instance
         */
        NotificationsSendRequest.prototype.notifications = $util.emptyArray;

        /**
         * Creates a new NotificationsSendRequest instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.NotificationsSendRequest
         * @static
         * @param {NotificationCenter.INotificationsSendRequest=} [properties] Properties to set
         * @returns {NotificationCenter.NotificationsSendRequest} NotificationsSendRequest instance
         */
        NotificationsSendRequest.create = function create(properties) {
            return new NotificationsSendRequest(properties);
        };

        /**
         * Encodes the specified NotificationsSendRequest message. Does not implicitly {@link NotificationCenter.NotificationsSendRequest.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.NotificationsSendRequest
         * @static
         * @param {NotificationCenter.INotificationsSendRequest} message NotificationsSendRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationsSendRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.notifications != null && message.notifications.length)
                for (let i = 0; i < message.notifications.length; ++i)
                    $root.NotificationCenter.NotificationSendRequest.encode(message.notifications[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified NotificationsSendRequest message, length delimited. Does not implicitly {@link NotificationCenter.NotificationsSendRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.NotificationsSendRequest
         * @static
         * @param {NotificationCenter.INotificationsSendRequest} message NotificationsSendRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationsSendRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a NotificationsSendRequest message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.NotificationsSendRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.NotificationsSendRequest} NotificationsSendRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationsSendRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.NotificationsSendRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.notifications && message.notifications.length))
                            message.notifications = [];
                        message.notifications.push($root.NotificationCenter.NotificationSendRequest.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a NotificationsSendRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.NotificationsSendRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.NotificationsSendRequest} NotificationsSendRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationsSendRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotificationsSendRequest message.
         * @function verify
         * @memberof NotificationCenter.NotificationsSendRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotificationsSendRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.notifications != null && Object.hasOwnProperty.call(message, "notifications")) {
                if (!Array.isArray(message.notifications))
                    return "notifications: array expected";
                for (let i = 0; i < message.notifications.length; ++i) {
                    let error = $root.NotificationCenter.NotificationSendRequest.verify(message.notifications[i], long + 1);
                    if (error)
                        return "notifications." + error;
                }
            }
            return null;
        };

        /**
         * Creates a NotificationsSendRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.NotificationsSendRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.NotificationsSendRequest} NotificationsSendRequest
         */
        NotificationsSendRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.NotificationsSendRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.NotificationsSendRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.NotificationsSendRequest();
            if (object.notifications) {
                if (!Array.isArray(object.notifications))
                    throw TypeError(".NotificationCenter.NotificationsSendRequest.notifications: array expected");
                message.notifications = [];
                for (let i = 0; i < object.notifications.length; ++i) {
                    if (!$util.isObject(object.notifications[i]))
                        throw TypeError(".NotificationCenter.NotificationsSendRequest.notifications: object expected");
                    message.notifications[i] = $root.NotificationCenter.NotificationSendRequest.fromObject(object.notifications[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a NotificationsSendRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.NotificationsSendRequest
         * @static
         * @param {NotificationCenter.NotificationsSendRequest} message NotificationsSendRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotificationsSendRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.notifications = [];
            if (message.notifications && message.notifications.length) {
                object.notifications = [];
                for (let j = 0; j < message.notifications.length; ++j)
                    object.notifications[j] = $root.NotificationCenter.NotificationSendRequest.toObject(message.notifications[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this NotificationsSendRequest to JSON.
         * @function toJSON
         * @memberof NotificationCenter.NotificationsSendRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotificationsSendRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotificationsSendRequest
         * @function getTypeUrl
         * @memberof NotificationCenter.NotificationsSendRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotificationsSendRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.NotificationsSendRequest";
        };

        return NotificationsSendRequest;
    })();

    NotificationCenter.NotificationSyncRequest = (function() {

        /**
         * Properties of a NotificationSyncRequest.
         * @memberof NotificationCenter
         * @interface INotificationSyncRequest
         * @property {number|null} [syncPoint] NotificationSyncRequest syncPoint
         */

        /**
         * Constructs a new NotificationSyncRequest.
         * @memberof NotificationCenter
         * @classdesc Represents a NotificationSyncRequest.
         * @implements INotificationSyncRequest
         * @constructor
         * @param {NotificationCenter.INotificationSyncRequest=} [properties] Properties to set
         */
        function NotificationSyncRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotificationSyncRequest syncPoint.
         * @member {number} syncPoint
         * @memberof NotificationCenter.NotificationSyncRequest
         * @instance
         */
        NotificationSyncRequest.prototype.syncPoint = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new NotificationSyncRequest instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.NotificationSyncRequest
         * @static
         * @param {NotificationCenter.INotificationSyncRequest=} [properties] Properties to set
         * @returns {NotificationCenter.NotificationSyncRequest} NotificationSyncRequest instance
         */
        NotificationSyncRequest.create = function create(properties) {
            return new NotificationSyncRequest(properties);
        };

        /**
         * Encodes the specified NotificationSyncRequest message. Does not implicitly {@link NotificationCenter.NotificationSyncRequest.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.NotificationSyncRequest
         * @static
         * @param {NotificationCenter.INotificationSyncRequest} message NotificationSyncRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationSyncRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.syncPoint != null && Object.hasOwnProperty.call(message, "syncPoint"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.syncPoint);
            return writer;
        };

        /**
         * Encodes the specified NotificationSyncRequest message, length delimited. Does not implicitly {@link NotificationCenter.NotificationSyncRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.NotificationSyncRequest
         * @static
         * @param {NotificationCenter.INotificationSyncRequest} message NotificationSyncRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationSyncRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a NotificationSyncRequest message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.NotificationSyncRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.NotificationSyncRequest} NotificationSyncRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationSyncRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.NotificationSyncRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.syncPoint = reader.int64();
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
         * Decodes a NotificationSyncRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.NotificationSyncRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.NotificationSyncRequest} NotificationSyncRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationSyncRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotificationSyncRequest message.
         * @function verify
         * @memberof NotificationCenter.NotificationSyncRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotificationSyncRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.syncPoint != null && Object.hasOwnProperty.call(message, "syncPoint"))
                if (!$util.isInteger(message.syncPoint) && !(message.syncPoint && $util.isInteger(message.syncPoint.low) && $util.isInteger(message.syncPoint.high)))
                    return "syncPoint: integer|Long expected";
            return null;
        };

        /**
         * Creates a NotificationSyncRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.NotificationSyncRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.NotificationSyncRequest} NotificationSyncRequest
         */
        NotificationSyncRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.NotificationSyncRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.NotificationSyncRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.NotificationSyncRequest();
            if (object.syncPoint != null)
                if ($util.Long)
                    message.syncPoint = $util.Long.fromValue(object.syncPoint, false);
                else if (typeof object.syncPoint === "string")
                    message.syncPoint = parseInt(object.syncPoint, 10);
                else if (typeof object.syncPoint === "number")
                    message.syncPoint = object.syncPoint;
                else if (typeof object.syncPoint === "object")
                    message.syncPoint = new $util.LongBits(object.syncPoint.low >>> 0, object.syncPoint.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a NotificationSyncRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.NotificationSyncRequest
         * @static
         * @param {NotificationCenter.NotificationSyncRequest} message NotificationSyncRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotificationSyncRequest.toObject = function toObject(message, options, q) {
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
                    object.syncPoint = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.syncPoint = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.syncPoint != null && Object.hasOwnProperty.call(message, "syncPoint"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.syncPoint = typeof message.syncPoint === "number" ? BigInt(message.syncPoint) : $util.Long.fromBits(message.syncPoint.low >>> 0, message.syncPoint.high >>> 0, false).toBigInt();
                else if (typeof message.syncPoint === "number")
                    object.syncPoint = options.longs === String ? String(message.syncPoint) : message.syncPoint;
                else
                    object.syncPoint = options.longs === String ? $util.Long.prototype.toString.call(message.syncPoint) : options.longs === Number ? new $util.LongBits(message.syncPoint.low >>> 0, message.syncPoint.high >>> 0).toNumber() : message.syncPoint;
            return object;
        };

        /**
         * Converts this NotificationSyncRequest to JSON.
         * @function toJSON
         * @memberof NotificationCenter.NotificationSyncRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotificationSyncRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotificationSyncRequest
         * @function getTypeUrl
         * @memberof NotificationCenter.NotificationSyncRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotificationSyncRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.NotificationSyncRequest";
        };

        return NotificationSyncRequest;
    })();

    NotificationCenter.SentNotification = (function() {

        /**
         * Properties of a SentNotification.
         * @memberof NotificationCenter
         * @interface ISentNotification
         * @property {number|null} [user] SentNotification user
         * @property {Uint8Array|null} [notificationUid] SentNotification notificationUid
         */

        /**
         * Constructs a new SentNotification.
         * @memberof NotificationCenter
         * @classdesc Represents a SentNotification.
         * @implements ISentNotification
         * @constructor
         * @param {NotificationCenter.ISentNotification=} [properties] Properties to set
         */
        function SentNotification(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SentNotification user.
         * @member {number} user
         * @memberof NotificationCenter.SentNotification
         * @instance
         */
        SentNotification.prototype.user = 0;

        /**
         * SentNotification notificationUid.
         * @member {Uint8Array} notificationUid
         * @memberof NotificationCenter.SentNotification
         * @instance
         */
        SentNotification.prototype.notificationUid = $util.newBuffer([]);

        /**
         * Creates a new SentNotification instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.SentNotification
         * @static
         * @param {NotificationCenter.ISentNotification=} [properties] Properties to set
         * @returns {NotificationCenter.SentNotification} SentNotification instance
         */
        SentNotification.create = function create(properties) {
            return new SentNotification(properties);
        };

        /**
         * Encodes the specified SentNotification message. Does not implicitly {@link NotificationCenter.SentNotification.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.SentNotification
         * @static
         * @param {NotificationCenter.ISentNotification} message SentNotification message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SentNotification.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.user);
            if (message.notificationUid != null && Object.hasOwnProperty.call(message, "notificationUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.notificationUid);
            return writer;
        };

        /**
         * Encodes the specified SentNotification message, length delimited. Does not implicitly {@link NotificationCenter.SentNotification.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.SentNotification
         * @static
         * @param {NotificationCenter.ISentNotification} message SentNotification message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SentNotification.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a SentNotification message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.SentNotification
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.SentNotification} SentNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SentNotification.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.SentNotification();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.user = reader.int32();
                        break;
                    }
                case 2: {
                        message.notificationUid = reader.bytes();
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
         * Decodes a SentNotification message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.SentNotification
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.SentNotification} SentNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SentNotification.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SentNotification message.
         * @function verify
         * @memberof NotificationCenter.SentNotification
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SentNotification.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                if (!$util.isInteger(message.user))
                    return "user: integer expected";
            if (message.notificationUid != null && Object.hasOwnProperty.call(message, "notificationUid"))
                if (!(message.notificationUid && typeof message.notificationUid.length === "number" || $util.isString(message.notificationUid)))
                    return "notificationUid: buffer expected";
            return null;
        };

        /**
         * Creates a SentNotification message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.SentNotification
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.SentNotification} SentNotification
         */
        SentNotification.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.SentNotification)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.SentNotification: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.SentNotification();
            if (object.user != null)
                message.user = object.user | 0;
            if (object.notificationUid != null)
                if (typeof object.notificationUid === "string")
                    $util.base64.decode(object.notificationUid, message.notificationUid = $util.newBuffer($util.base64.length(object.notificationUid)), 0);
                else if (object.notificationUid.length >= 0)
                    message.notificationUid = object.notificationUid;
            return message;
        };

        /**
         * Creates a plain object from a SentNotification message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.SentNotification
         * @static
         * @param {NotificationCenter.SentNotification} message SentNotification
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SentNotification.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.user = 0;
                if (options.bytes === String)
                    object.notificationUid = "";
                else {
                    object.notificationUid = [];
                    if (options.bytes !== Array)
                        object.notificationUid = $util.newBuffer(object.notificationUid);
                }
            }
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                object.user = message.user;
            if (message.notificationUid != null && Object.hasOwnProperty.call(message, "notificationUid"))
                object.notificationUid = options.bytes === String ? $util.base64.encode(message.notificationUid, 0, message.notificationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.notificationUid) : message.notificationUid;
            return object;
        };

        /**
         * Converts this SentNotification to JSON.
         * @function toJSON
         * @memberof NotificationCenter.SentNotification
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SentNotification.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SentNotification
         * @function getTypeUrl
         * @memberof NotificationCenter.SentNotification
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SentNotification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.SentNotification";
        };

        return SentNotification;
    })();

    NotificationCenter.NotificationsApprovalStatusUpdateRequest = (function() {

        /**
         * Properties of a NotificationsApprovalStatusUpdateRequest.
         * @memberof NotificationCenter
         * @interface INotificationsApprovalStatusUpdateRequest
         * @property {NotificationCenter.NotificationApprovalStatus|null} [status] NotificationsApprovalStatusUpdateRequest status
         * @property {Array.<NotificationCenter.ISentNotification>|null} [notifications] NotificationsApprovalStatusUpdateRequest notifications
         */

        /**
         * Constructs a new NotificationsApprovalStatusUpdateRequest.
         * @memberof NotificationCenter
         * @classdesc Represents a NotificationsApprovalStatusUpdateRequest.
         * @implements INotificationsApprovalStatusUpdateRequest
         * @constructor
         * @param {NotificationCenter.INotificationsApprovalStatusUpdateRequest=} [properties] Properties to set
         */
        function NotificationsApprovalStatusUpdateRequest(properties) {
            this.notifications = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotificationsApprovalStatusUpdateRequest status.
         * @member {NotificationCenter.NotificationApprovalStatus} status
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @instance
         */
        NotificationsApprovalStatusUpdateRequest.prototype.status = 0;

        /**
         * NotificationsApprovalStatusUpdateRequest notifications.
         * @member {Array.<NotificationCenter.ISentNotification>} notifications
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @instance
         */
        NotificationsApprovalStatusUpdateRequest.prototype.notifications = $util.emptyArray;

        /**
         * Creates a new NotificationsApprovalStatusUpdateRequest instance using the specified properties.
         * @function create
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @static
         * @param {NotificationCenter.INotificationsApprovalStatusUpdateRequest=} [properties] Properties to set
         * @returns {NotificationCenter.NotificationsApprovalStatusUpdateRequest} NotificationsApprovalStatusUpdateRequest instance
         */
        NotificationsApprovalStatusUpdateRequest.create = function create(properties) {
            return new NotificationsApprovalStatusUpdateRequest(properties);
        };

        /**
         * Encodes the specified NotificationsApprovalStatusUpdateRequest message. Does not implicitly {@link NotificationCenter.NotificationsApprovalStatusUpdateRequest.verify|verify} messages.
         * @function encode
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @static
         * @param {NotificationCenter.INotificationsApprovalStatusUpdateRequest} message NotificationsApprovalStatusUpdateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationsApprovalStatusUpdateRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
            if (message.notifications != null && message.notifications.length)
                for (let i = 0; i < message.notifications.length; ++i)
                    $root.NotificationCenter.SentNotification.encode(message.notifications[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified NotificationsApprovalStatusUpdateRequest message, length delimited. Does not implicitly {@link NotificationCenter.NotificationsApprovalStatusUpdateRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @static
         * @param {NotificationCenter.INotificationsApprovalStatusUpdateRequest} message NotificationsApprovalStatusUpdateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotificationsApprovalStatusUpdateRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a NotificationsApprovalStatusUpdateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {NotificationCenter.NotificationsApprovalStatusUpdateRequest} NotificationsApprovalStatusUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationsApprovalStatusUpdateRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.NotificationCenter.NotificationsApprovalStatusUpdateRequest();
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
                        if (!(message.notifications && message.notifications.length))
                            message.notifications = [];
                        message.notifications.push($root.NotificationCenter.SentNotification.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a NotificationsApprovalStatusUpdateRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {NotificationCenter.NotificationsApprovalStatusUpdateRequest} NotificationsApprovalStatusUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotificationsApprovalStatusUpdateRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotificationsApprovalStatusUpdateRequest message.
         * @function verify
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotificationsApprovalStatusUpdateRequest.verify = function verify(message, long) {
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
                case 4:
                    break;
                }
            if (message.notifications != null && Object.hasOwnProperty.call(message, "notifications")) {
                if (!Array.isArray(message.notifications))
                    return "notifications: array expected";
                for (let i = 0; i < message.notifications.length; ++i) {
                    let error = $root.NotificationCenter.SentNotification.verify(message.notifications[i], long + 1);
                    if (error)
                        return "notifications." + error;
                }
            }
            return null;
        };

        /**
         * Creates a NotificationsApprovalStatusUpdateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {NotificationCenter.NotificationsApprovalStatusUpdateRequest} NotificationsApprovalStatusUpdateRequest
         */
        NotificationsApprovalStatusUpdateRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.NotificationCenter.NotificationsApprovalStatusUpdateRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".NotificationCenter.NotificationsApprovalStatusUpdateRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.NotificationCenter.NotificationsApprovalStatusUpdateRequest();
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "NAS_UNSPECIFIED":
            case 0:
                message.status = 0;
                break;
            case "NAS_APPROVED":
            case 1:
                message.status = 1;
                break;
            case "NAS_DENIED":
            case 2:
                message.status = 2;
                break;
            case "NAS_LOST_APPROVAL_RIGHTS":
            case 3:
                message.status = 3;
                break;
            case "NAS_LOST_ACCESS":
            case 4:
                message.status = 4;
                break;
            }
            if (object.notifications) {
                if (!Array.isArray(object.notifications))
                    throw TypeError(".NotificationCenter.NotificationsApprovalStatusUpdateRequest.notifications: array expected");
                message.notifications = [];
                for (let i = 0; i < object.notifications.length; ++i) {
                    if (!$util.isObject(object.notifications[i]))
                        throw TypeError(".NotificationCenter.NotificationsApprovalStatusUpdateRequest.notifications: object expected");
                    message.notifications[i] = $root.NotificationCenter.SentNotification.fromObject(object.notifications[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a NotificationsApprovalStatusUpdateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @static
         * @param {NotificationCenter.NotificationsApprovalStatusUpdateRequest} message NotificationsApprovalStatusUpdateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotificationsApprovalStatusUpdateRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.notifications = [];
            if (options.defaults)
                object.status = options.enums === String ? "NAS_UNSPECIFIED" : 0;
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = options.enums === String ? $root.NotificationCenter.NotificationApprovalStatus[message.status] === undefined ? message.status : $root.NotificationCenter.NotificationApprovalStatus[message.status] : message.status;
            if (message.notifications && message.notifications.length) {
                object.notifications = [];
                for (let j = 0; j < message.notifications.length; ++j)
                    object.notifications[j] = $root.NotificationCenter.SentNotification.toObject(message.notifications[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this NotificationsApprovalStatusUpdateRequest to JSON.
         * @function toJSON
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotificationsApprovalStatusUpdateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotificationsApprovalStatusUpdateRequest
         * @function getTypeUrl
         * @memberof NotificationCenter.NotificationsApprovalStatusUpdateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotificationsApprovalStatusUpdateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/NotificationCenter.NotificationsApprovalStatusUpdateRequest";
        };

        return NotificationsApprovalStatusUpdateRequest;
    })();

    return NotificationCenter;
})();

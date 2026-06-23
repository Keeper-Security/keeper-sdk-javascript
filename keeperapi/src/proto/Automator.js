/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const Automator = $root.Automator = (() => {

    /**
     * Namespace Automator.
     * @exports Automator
     * @namespace
     */
    const Automator = {};

    /**
     * This enumerates the SSO Authentication protocols we support.
     * We plan to support more protocols in the future.
     * @name Automator.SsoAuthenticationProtocolType
     * @enum {number}
     * @property {number} UNKNOWN_PROTOCOL=0 UNKNOWN_PROTOCOL value
     * @property {number} SAML2=1 SAML2 value
     * @property {number} JWT=2 JWT value
     */
    Automator.SsoAuthenticationProtocolType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_PROTOCOL"] = 0;
        values[valuesById[1] = "SAML2"] = 1;
        values[valuesById[2] = "JWT"] = 2;
        return values;
    })();

    /**
     * CertificateFormat enum.
     * @name Automator.CertificateFormat
     * @enum {number}
     * @property {number} UNKNOWN_FORMAT=0 UNKNOWN_FORMAT value
     * @property {number} PKCS12=1 PKCS12 value
     * @property {number} JKS=2 JKS value
     */
    Automator.CertificateFormat = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_FORMAT"] = 0;
        values[valuesById[1] = "PKCS12"] = 1;
        values[valuesById[2] = "JKS"] = 2;
        return values;
    })();

    Automator.AutomatorSettingValue = (function() {

        /**
         * Properties of an AutomatorSettingValue.
         * @memberof Automator
         * @interface IAutomatorSettingValue
         * @property {number|null} [settingId] AutomatorSettingValue settingId
         * @property {number|null} [settingTypeId] AutomatorSettingValue settingTypeId
         * @property {string|null} [settingTag] AutomatorSettingValue settingTag
         * @property {string|null} [settingName] AutomatorSettingValue settingName
         * @property {string|null} [settingValue] AutomatorSettingValue settingValue
         * @property {SsoCloud.DataType|null} [dataType] AutomatorSettingValue dataType
         * @property {string|null} [lastModified] AutomatorSettingValue lastModified
         * @property {boolean|null} [fromFile] AutomatorSettingValue fromFile
         * @property {boolean|null} [encrypted] AutomatorSettingValue encrypted
         * @property {boolean|null} [encoded] AutomatorSettingValue encoded
         * @property {boolean|null} [editable] AutomatorSettingValue editable
         * @property {boolean|null} [translated] AutomatorSettingValue translated
         * @property {boolean|null} [userVisible] AutomatorSettingValue userVisible
         * @property {boolean|null} [required] AutomatorSettingValue required
         */

        /**
         * Constructs a new AutomatorSettingValue.
         * @memberof Automator
         * @classdesc This represents one setting and its value.
         * The value is always a string but it is dynamically typed.
         * The dataType property determines what type it is (boolean, string, integer, ...) and thus how it should be interpreted.
         * Other properties such as "editable" and "fromFile" help the client determine whether the user can edit the value and
         * what type of interface to present to the user (text box, file upload, etc.).
         * @implements IAutomatorSettingValue
         * @constructor
         * @param {Automator.IAutomatorSettingValue=} [properties] Properties to set
         */
        function AutomatorSettingValue(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AutomatorSettingValue settingId.
         * @member {number} settingId
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.settingId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AutomatorSettingValue settingTypeId.
         * @member {number} settingTypeId
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.settingTypeId = 0;

        /**
         * AutomatorSettingValue settingTag.
         * @member {string} settingTag
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.settingTag = "";

        /**
         * AutomatorSettingValue settingName.
         * @member {string} settingName
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.settingName = "";

        /**
         * AutomatorSettingValue settingValue.
         * @member {string} settingValue
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.settingValue = "";

        /**
         * AutomatorSettingValue dataType.
         * @member {SsoCloud.DataType} dataType
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.dataType = 0;

        /**
         * AutomatorSettingValue lastModified.
         * @member {string} lastModified
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.lastModified = "";

        /**
         * AutomatorSettingValue fromFile.
         * @member {boolean} fromFile
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.fromFile = false;

        /**
         * AutomatorSettingValue encrypted.
         * @member {boolean} encrypted
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.encrypted = false;

        /**
         * AutomatorSettingValue encoded.
         * @member {boolean} encoded
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.encoded = false;

        /**
         * AutomatorSettingValue editable.
         * @member {boolean} editable
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.editable = false;

        /**
         * AutomatorSettingValue translated.
         * @member {boolean} translated
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.translated = false;

        /**
         * AutomatorSettingValue userVisible.
         * @member {boolean} userVisible
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.userVisible = false;

        /**
         * AutomatorSettingValue required.
         * @member {boolean} required
         * @memberof Automator.AutomatorSettingValue
         * @instance
         */
        AutomatorSettingValue.prototype.required = false;

        /**
         * Creates a new AutomatorSettingValue instance using the specified properties.
         * @function create
         * @memberof Automator.AutomatorSettingValue
         * @static
         * @param {Automator.IAutomatorSettingValue=} [properties] Properties to set
         * @returns {Automator.AutomatorSettingValue} AutomatorSettingValue instance
         */
        AutomatorSettingValue.create = function create(properties) {
            return new AutomatorSettingValue(properties);
        };

        /**
         * Encodes the specified AutomatorSettingValue message. Does not implicitly {@link Automator.AutomatorSettingValue.verify|verify} messages.
         * @function encode
         * @memberof Automator.AutomatorSettingValue
         * @static
         * @param {Automator.IAutomatorSettingValue} message AutomatorSettingValue message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutomatorSettingValue.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.settingId != null && Object.hasOwnProperty.call(message, "settingId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.settingId);
            if (message.settingTypeId != null && Object.hasOwnProperty.call(message, "settingTypeId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.settingTypeId);
            if (message.settingTag != null && Object.hasOwnProperty.call(message, "settingTag"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.settingTag);
            if (message.settingName != null && Object.hasOwnProperty.call(message, "settingName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.settingName);
            if (message.settingValue != null && Object.hasOwnProperty.call(message, "settingValue"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.settingValue);
            if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.dataType);
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.lastModified);
            if (message.fromFile != null && Object.hasOwnProperty.call(message, "fromFile"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.fromFile);
            if (message.encrypted != null && Object.hasOwnProperty.call(message, "encrypted"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.encrypted);
            if (message.encoded != null && Object.hasOwnProperty.call(message, "encoded"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.encoded);
            if (message.editable != null && Object.hasOwnProperty.call(message, "editable"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.editable);
            if (message.translated != null && Object.hasOwnProperty.call(message, "translated"))
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.translated);
            if (message.userVisible != null && Object.hasOwnProperty.call(message, "userVisible"))
                writer.uint32(/* id 13, wireType 0 =*/104).bool(message.userVisible);
            if (message.required != null && Object.hasOwnProperty.call(message, "required"))
                writer.uint32(/* id 14, wireType 0 =*/112).bool(message.required);
            return writer;
        };

        /**
         * Encodes the specified AutomatorSettingValue message, length delimited. Does not implicitly {@link Automator.AutomatorSettingValue.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AutomatorSettingValue
         * @static
         * @param {Automator.IAutomatorSettingValue} message AutomatorSettingValue message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutomatorSettingValue.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AutomatorSettingValue message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AutomatorSettingValue
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AutomatorSettingValue} AutomatorSettingValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutomatorSettingValue.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AutomatorSettingValue();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.settingId = reader.int64();
                        break;
                    }
                case 2: {
                        message.settingTypeId = reader.int32();
                        break;
                    }
                case 3: {
                        message.settingTag = reader.string();
                        break;
                    }
                case 4: {
                        message.settingName = reader.string();
                        break;
                    }
                case 5: {
                        message.settingValue = reader.string();
                        break;
                    }
                case 6: {
                        message.dataType = reader.int32();
                        break;
                    }
                case 7: {
                        message.lastModified = reader.string();
                        break;
                    }
                case 8: {
                        message.fromFile = reader.bool();
                        break;
                    }
                case 9: {
                        message.encrypted = reader.bool();
                        break;
                    }
                case 10: {
                        message.encoded = reader.bool();
                        break;
                    }
                case 11: {
                        message.editable = reader.bool();
                        break;
                    }
                case 12: {
                        message.translated = reader.bool();
                        break;
                    }
                case 13: {
                        message.userVisible = reader.bool();
                        break;
                    }
                case 14: {
                        message.required = reader.bool();
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
         * Decodes an AutomatorSettingValue message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AutomatorSettingValue
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AutomatorSettingValue} AutomatorSettingValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutomatorSettingValue.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AutomatorSettingValue message.
         * @function verify
         * @memberof Automator.AutomatorSettingValue
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AutomatorSettingValue.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.settingId != null && Object.hasOwnProperty.call(message, "settingId"))
                if (!$util.isInteger(message.settingId) && !(message.settingId && $util.isInteger(message.settingId.low) && $util.isInteger(message.settingId.high)))
                    return "settingId: integer|Long expected";
            if (message.settingTypeId != null && Object.hasOwnProperty.call(message, "settingTypeId"))
                if (!$util.isInteger(message.settingTypeId))
                    return "settingTypeId: integer expected";
            if (message.settingTag != null && Object.hasOwnProperty.call(message, "settingTag"))
                if (!$util.isString(message.settingTag))
                    return "settingTag: string expected";
            if (message.settingName != null && Object.hasOwnProperty.call(message, "settingName"))
                if (!$util.isString(message.settingName))
                    return "settingName: string expected";
            if (message.settingValue != null && Object.hasOwnProperty.call(message, "settingValue"))
                if (!$util.isString(message.settingValue))
                    return "settingValue: string expected";
            if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
                switch (message.dataType) {
                default:
                    return "dataType: enum value expected";
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
                    break;
                }
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                if (!$util.isString(message.lastModified))
                    return "lastModified: string expected";
            if (message.fromFile != null && Object.hasOwnProperty.call(message, "fromFile"))
                if (typeof message.fromFile !== "boolean")
                    return "fromFile: boolean expected";
            if (message.encrypted != null && Object.hasOwnProperty.call(message, "encrypted"))
                if (typeof message.encrypted !== "boolean")
                    return "encrypted: boolean expected";
            if (message.encoded != null && Object.hasOwnProperty.call(message, "encoded"))
                if (typeof message.encoded !== "boolean")
                    return "encoded: boolean expected";
            if (message.editable != null && Object.hasOwnProperty.call(message, "editable"))
                if (typeof message.editable !== "boolean")
                    return "editable: boolean expected";
            if (message.translated != null && Object.hasOwnProperty.call(message, "translated"))
                if (typeof message.translated !== "boolean")
                    return "translated: boolean expected";
            if (message.userVisible != null && Object.hasOwnProperty.call(message, "userVisible"))
                if (typeof message.userVisible !== "boolean")
                    return "userVisible: boolean expected";
            if (message.required != null && Object.hasOwnProperty.call(message, "required"))
                if (typeof message.required !== "boolean")
                    return "required: boolean expected";
            return null;
        };

        /**
         * Creates an AutomatorSettingValue message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AutomatorSettingValue
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AutomatorSettingValue} AutomatorSettingValue
         */
        AutomatorSettingValue.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AutomatorSettingValue)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AutomatorSettingValue: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AutomatorSettingValue();
            if (object.settingId != null)
                if ($util.Long)
                    message.settingId = $util.Long.fromValue(object.settingId, false);
                else if (typeof object.settingId === "string")
                    message.settingId = parseInt(object.settingId, 10);
                else if (typeof object.settingId === "number")
                    message.settingId = object.settingId;
                else if (typeof object.settingId === "object")
                    message.settingId = new $util.LongBits(object.settingId.low >>> 0, object.settingId.high >>> 0).toNumber();
            if (object.settingTypeId != null)
                message.settingTypeId = object.settingTypeId | 0;
            if (object.settingTag != null)
                message.settingTag = String(object.settingTag);
            if (object.settingName != null)
                message.settingName = String(object.settingName);
            if (object.settingValue != null)
                message.settingValue = String(object.settingValue);
            switch (object.dataType) {
            default:
                if (typeof object.dataType === "number") {
                    message.dataType = object.dataType;
                    break;
                }
                break;
            case "ANY":
            case 0:
                message.dataType = 0;
                break;
            case "BOOLEAN":
            case 1:
                message.dataType = 1;
                break;
            case "INTEGER":
            case 2:
                message.dataType = 2;
                break;
            case "STRING":
            case 3:
                message.dataType = 3;
                break;
            case "BYTES":
            case 4:
                message.dataType = 4;
                break;
            case "URL":
            case 5:
                message.dataType = 5;
                break;
            case "com_keepersecurity_proto_SsoCloud_DataType":
            case 6:
                message.dataType = 6;
                break;
            case "com_keepersecurity_proto_SsoCloud_AuthProtocolType":
            case 7:
                message.dataType = 7;
                break;
            case "com_keepersecurity_proto_SsoCloud_SsoIdpType":
            case 8:
                message.dataType = 8;
                break;
            case "LONG":
            case 9:
                message.dataType = 9;
                break;
            case "TIMESTAMP":
            case 10:
                message.dataType = 10;
                break;
            }
            if (object.lastModified != null)
                message.lastModified = String(object.lastModified);
            if (object.fromFile != null)
                message.fromFile = Boolean(object.fromFile);
            if (object.encrypted != null)
                message.encrypted = Boolean(object.encrypted);
            if (object.encoded != null)
                message.encoded = Boolean(object.encoded);
            if (object.editable != null)
                message.editable = Boolean(object.editable);
            if (object.translated != null)
                message.translated = Boolean(object.translated);
            if (object.userVisible != null)
                message.userVisible = Boolean(object.userVisible);
            if (object.required != null)
                message.required = Boolean(object.required);
            return message;
        };

        /**
         * Creates a plain object from an AutomatorSettingValue message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AutomatorSettingValue
         * @static
         * @param {Automator.AutomatorSettingValue} message AutomatorSettingValue
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AutomatorSettingValue.toObject = function toObject(message, options, q) {
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
                    object.settingId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.settingId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.settingTypeId = 0;
                object.settingTag = "";
                object.settingName = "";
                object.settingValue = "";
                object.dataType = options.enums === String ? "ANY" : 0;
                object.lastModified = "";
                object.fromFile = false;
                object.encrypted = false;
                object.encoded = false;
                object.editable = false;
                object.translated = false;
                object.userVisible = false;
                object.required = false;
            }
            if (message.settingId != null && Object.hasOwnProperty.call(message, "settingId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.settingId = typeof message.settingId === "number" ? BigInt(message.settingId) : $util.Long.fromBits(message.settingId.low >>> 0, message.settingId.high >>> 0, false).toBigInt();
                else if (typeof message.settingId === "number")
                    object.settingId = options.longs === String ? String(message.settingId) : message.settingId;
                else
                    object.settingId = options.longs === String ? $util.Long.prototype.toString.call(message.settingId) : options.longs === Number ? new $util.LongBits(message.settingId.low >>> 0, message.settingId.high >>> 0).toNumber() : message.settingId;
            if (message.settingTypeId != null && Object.hasOwnProperty.call(message, "settingTypeId"))
                object.settingTypeId = message.settingTypeId;
            if (message.settingTag != null && Object.hasOwnProperty.call(message, "settingTag"))
                object.settingTag = message.settingTag;
            if (message.settingName != null && Object.hasOwnProperty.call(message, "settingName"))
                object.settingName = message.settingName;
            if (message.settingValue != null && Object.hasOwnProperty.call(message, "settingValue"))
                object.settingValue = message.settingValue;
            if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
                object.dataType = options.enums === String ? $root.SsoCloud.DataType[message.dataType] === undefined ? message.dataType : $root.SsoCloud.DataType[message.dataType] : message.dataType;
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                object.lastModified = message.lastModified;
            if (message.fromFile != null && Object.hasOwnProperty.call(message, "fromFile"))
                object.fromFile = message.fromFile;
            if (message.encrypted != null && Object.hasOwnProperty.call(message, "encrypted"))
                object.encrypted = message.encrypted;
            if (message.encoded != null && Object.hasOwnProperty.call(message, "encoded"))
                object.encoded = message.encoded;
            if (message.editable != null && Object.hasOwnProperty.call(message, "editable"))
                object.editable = message.editable;
            if (message.translated != null && Object.hasOwnProperty.call(message, "translated"))
                object.translated = message.translated;
            if (message.userVisible != null && Object.hasOwnProperty.call(message, "userVisible"))
                object.userVisible = message.userVisible;
            if (message.required != null && Object.hasOwnProperty.call(message, "required"))
                object.required = message.required;
            return object;
        };

        /**
         * Converts this AutomatorSettingValue to JSON.
         * @function toJSON
         * @memberof Automator.AutomatorSettingValue
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AutomatorSettingValue.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AutomatorSettingValue
         * @function getTypeUrl
         * @memberof Automator.AutomatorSettingValue
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AutomatorSettingValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AutomatorSettingValue";
        };

        return AutomatorSettingValue;
    })();

    Automator.ApproveDeviceRequest = (function() {

        /**
         * Properties of an ApproveDeviceRequest.
         * @memberof Automator
         * @interface IApproveDeviceRequest
         * @property {number|null} [automatorId] ApproveDeviceRequest automatorId
         * @property {Automator.SsoAuthenticationProtocolType|null} [ssoAuthenticationProtocolType] ApproveDeviceRequest ssoAuthenticationProtocolType
         * @property {string|null} [authMessage] ApproveDeviceRequest authMessage
         * @property {string|null} [email] ApproveDeviceRequest email
         * @property {Uint8Array|null} [devicePublicKey] ApproveDeviceRequest devicePublicKey
         * @property {number|null} [serverEccPublicKeyId] ApproveDeviceRequest serverEccPublicKeyId
         * @property {Uint8Array|null} [userEncryptedDataKey] ApproveDeviceRequest userEncryptedDataKey
         * @property {Enterprise.EncryptedKeyType|null} [userEncryptedDataKeyType] ApproveDeviceRequest userEncryptedDataKeyType
         * @property {string|null} [ipAddress] ApproveDeviceRequest ipAddress
         * @property {boolean|null} [isTesting] ApproveDeviceRequest isTesting
         * @property {boolean|null} [isEccOnly] ApproveDeviceRequest isEccOnly
         */

        /**
         * Constructs a new ApproveDeviceRequest.
         * @memberof Automator
         * @classdesc ApproveDeviceRequest
         * This is used to ask Automator to approve a user's device.
         * It requires a SAML Authentication response, or the equivalent.
         * 
         * @return an AutomatorResponse containing an ApproveDeviceResponse
         * @implements IApproveDeviceRequest
         * @constructor
         * @param {Automator.IApproveDeviceRequest=} [properties] Properties to set
         */
        function ApproveDeviceRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApproveDeviceRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ApproveDeviceRequest ssoAuthenticationProtocolType.
         * @member {Automator.SsoAuthenticationProtocolType} ssoAuthenticationProtocolType
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.ssoAuthenticationProtocolType = 0;

        /**
         * ApproveDeviceRequest authMessage.
         * @member {string} authMessage
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.authMessage = "";

        /**
         * ApproveDeviceRequest email.
         * @member {string} email
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.email = "";

        /**
         * ApproveDeviceRequest devicePublicKey.
         * @member {Uint8Array} devicePublicKey
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.devicePublicKey = $util.newBuffer([]);

        /**
         * ApproveDeviceRequest serverEccPublicKeyId.
         * @member {number} serverEccPublicKeyId
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.serverEccPublicKeyId = 0;

        /**
         * ApproveDeviceRequest userEncryptedDataKey.
         * @member {Uint8Array} userEncryptedDataKey
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.userEncryptedDataKey = $util.newBuffer([]);

        /**
         * ApproveDeviceRequest userEncryptedDataKeyType.
         * @member {Enterprise.EncryptedKeyType} userEncryptedDataKeyType
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.userEncryptedDataKeyType = 0;

        /**
         * ApproveDeviceRequest ipAddress.
         * @member {string} ipAddress
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.ipAddress = "";

        /**
         * ApproveDeviceRequest isTesting.
         * @member {boolean} isTesting
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.isTesting = false;

        /**
         * ApproveDeviceRequest isEccOnly.
         * @member {boolean} isEccOnly
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         */
        ApproveDeviceRequest.prototype.isEccOnly = false;

        /**
         * Creates a new ApproveDeviceRequest instance using the specified properties.
         * @function create
         * @memberof Automator.ApproveDeviceRequest
         * @static
         * @param {Automator.IApproveDeviceRequest=} [properties] Properties to set
         * @returns {Automator.ApproveDeviceRequest} ApproveDeviceRequest instance
         */
        ApproveDeviceRequest.create = function create(properties) {
            return new ApproveDeviceRequest(properties);
        };

        /**
         * Encodes the specified ApproveDeviceRequest message. Does not implicitly {@link Automator.ApproveDeviceRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.ApproveDeviceRequest
         * @static
         * @param {Automator.IApproveDeviceRequest} message ApproveDeviceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveDeviceRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.ssoAuthenticationProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthenticationProtocolType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ssoAuthenticationProtocolType);
            if (message.authMessage != null && Object.hasOwnProperty.call(message, "authMessage"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.authMessage);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.email);
            if (message.devicePublicKey != null && Object.hasOwnProperty.call(message, "devicePublicKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.devicePublicKey);
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.serverEccPublicKeyId);
            if (message.userEncryptedDataKey != null && Object.hasOwnProperty.call(message, "userEncryptedDataKey"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.userEncryptedDataKey);
            if (message.userEncryptedDataKeyType != null && Object.hasOwnProperty.call(message, "userEncryptedDataKeyType"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.userEncryptedDataKeyType);
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.ipAddress);
            if (message.isTesting != null && Object.hasOwnProperty.call(message, "isTesting"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.isTesting);
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.isEccOnly);
            return writer;
        };

        /**
         * Encodes the specified ApproveDeviceRequest message, length delimited. Does not implicitly {@link Automator.ApproveDeviceRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.ApproveDeviceRequest
         * @static
         * @param {Automator.IApproveDeviceRequest} message ApproveDeviceRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveDeviceRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApproveDeviceRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.ApproveDeviceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.ApproveDeviceRequest} ApproveDeviceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveDeviceRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.ApproveDeviceRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.ssoAuthenticationProtocolType = reader.int32();
                        break;
                    }
                case 3: {
                        message.authMessage = reader.string();
                        break;
                    }
                case 4: {
                        message.email = reader.string();
                        break;
                    }
                case 5: {
                        message.devicePublicKey = reader.bytes();
                        break;
                    }
                case 6: {
                        message.serverEccPublicKeyId = reader.int32();
                        break;
                    }
                case 7: {
                        message.userEncryptedDataKey = reader.bytes();
                        break;
                    }
                case 8: {
                        message.userEncryptedDataKeyType = reader.int32();
                        break;
                    }
                case 9: {
                        message.ipAddress = reader.string();
                        break;
                    }
                case 10: {
                        message.isTesting = reader.bool();
                        break;
                    }
                case 11: {
                        message.isEccOnly = reader.bool();
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
         * Decodes an ApproveDeviceRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.ApproveDeviceRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.ApproveDeviceRequest} ApproveDeviceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveDeviceRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApproveDeviceRequest message.
         * @function verify
         * @memberof Automator.ApproveDeviceRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApproveDeviceRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.ssoAuthenticationProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthenticationProtocolType"))
                switch (message.ssoAuthenticationProtocolType) {
                default:
                    return "ssoAuthenticationProtocolType: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.authMessage != null && Object.hasOwnProperty.call(message, "authMessage"))
                if (!$util.isString(message.authMessage))
                    return "authMessage: string expected";
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.devicePublicKey != null && Object.hasOwnProperty.call(message, "devicePublicKey"))
                if (!(message.devicePublicKey && typeof message.devicePublicKey.length === "number" || $util.isString(message.devicePublicKey)))
                    return "devicePublicKey: buffer expected";
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                if (!$util.isInteger(message.serverEccPublicKeyId))
                    return "serverEccPublicKeyId: integer expected";
            if (message.userEncryptedDataKey != null && Object.hasOwnProperty.call(message, "userEncryptedDataKey"))
                if (!(message.userEncryptedDataKey && typeof message.userEncryptedDataKey.length === "number" || $util.isString(message.userEncryptedDataKey)))
                    return "userEncryptedDataKey: buffer expected";
            if (message.userEncryptedDataKeyType != null && Object.hasOwnProperty.call(message, "userEncryptedDataKeyType"))
                switch (message.userEncryptedDataKeyType) {
                default:
                    return "userEncryptedDataKeyType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                if (!$util.isString(message.ipAddress))
                    return "ipAddress: string expected";
            if (message.isTesting != null && Object.hasOwnProperty.call(message, "isTesting"))
                if (typeof message.isTesting !== "boolean")
                    return "isTesting: boolean expected";
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                if (typeof message.isEccOnly !== "boolean")
                    return "isEccOnly: boolean expected";
            return null;
        };

        /**
         * Creates an ApproveDeviceRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.ApproveDeviceRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.ApproveDeviceRequest} ApproveDeviceRequest
         */
        ApproveDeviceRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.ApproveDeviceRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.ApproveDeviceRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.ApproveDeviceRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            switch (object.ssoAuthenticationProtocolType) {
            default:
                if (typeof object.ssoAuthenticationProtocolType === "number") {
                    message.ssoAuthenticationProtocolType = object.ssoAuthenticationProtocolType;
                    break;
                }
                break;
            case "UNKNOWN_PROTOCOL":
            case 0:
                message.ssoAuthenticationProtocolType = 0;
                break;
            case "SAML2":
            case 1:
                message.ssoAuthenticationProtocolType = 1;
                break;
            case "JWT":
            case 2:
                message.ssoAuthenticationProtocolType = 2;
                break;
            }
            if (object.authMessage != null)
                message.authMessage = String(object.authMessage);
            if (object.email != null)
                message.email = String(object.email);
            if (object.devicePublicKey != null)
                if (typeof object.devicePublicKey === "string")
                    $util.base64.decode(object.devicePublicKey, message.devicePublicKey = $util.newBuffer($util.base64.length(object.devicePublicKey)), 0);
                else if (object.devicePublicKey.length >= 0)
                    message.devicePublicKey = object.devicePublicKey;
            if (object.serverEccPublicKeyId != null)
                message.serverEccPublicKeyId = object.serverEccPublicKeyId | 0;
            if (object.userEncryptedDataKey != null)
                if (typeof object.userEncryptedDataKey === "string")
                    $util.base64.decode(object.userEncryptedDataKey, message.userEncryptedDataKey = $util.newBuffer($util.base64.length(object.userEncryptedDataKey)), 0);
                else if (object.userEncryptedDataKey.length >= 0)
                    message.userEncryptedDataKey = object.userEncryptedDataKey;
            switch (object.userEncryptedDataKeyType) {
            default:
                if (typeof object.userEncryptedDataKeyType === "number") {
                    message.userEncryptedDataKeyType = object.userEncryptedDataKeyType;
                    break;
                }
                break;
            case "KT_NO_KEY":
            case 0:
                message.userEncryptedDataKeyType = 0;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.userEncryptedDataKeyType = 1;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.userEncryptedDataKeyType = 2;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.userEncryptedDataKeyType = 3;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.userEncryptedDataKeyType = 4;
                break;
            }
            if (object.ipAddress != null)
                message.ipAddress = String(object.ipAddress);
            if (object.isTesting != null)
                message.isTesting = Boolean(object.isTesting);
            if (object.isEccOnly != null)
                message.isEccOnly = Boolean(object.isEccOnly);
            return message;
        };

        /**
         * Creates a plain object from an ApproveDeviceRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.ApproveDeviceRequest
         * @static
         * @param {Automator.ApproveDeviceRequest} message ApproveDeviceRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApproveDeviceRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.ssoAuthenticationProtocolType = options.enums === String ? "UNKNOWN_PROTOCOL" : 0;
                object.authMessage = "";
                object.email = "";
                if (options.bytes === String)
                    object.devicePublicKey = "";
                else {
                    object.devicePublicKey = [];
                    if (options.bytes !== Array)
                        object.devicePublicKey = $util.newBuffer(object.devicePublicKey);
                }
                object.serverEccPublicKeyId = 0;
                if (options.bytes === String)
                    object.userEncryptedDataKey = "";
                else {
                    object.userEncryptedDataKey = [];
                    if (options.bytes !== Array)
                        object.userEncryptedDataKey = $util.newBuffer(object.userEncryptedDataKey);
                }
                object.userEncryptedDataKeyType = options.enums === String ? "KT_NO_KEY" : 0;
                object.ipAddress = "";
                object.isTesting = false;
                object.isEccOnly = false;
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.ssoAuthenticationProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthenticationProtocolType"))
                object.ssoAuthenticationProtocolType = options.enums === String ? $root.Automator.SsoAuthenticationProtocolType[message.ssoAuthenticationProtocolType] === undefined ? message.ssoAuthenticationProtocolType : $root.Automator.SsoAuthenticationProtocolType[message.ssoAuthenticationProtocolType] : message.ssoAuthenticationProtocolType;
            if (message.authMessage != null && Object.hasOwnProperty.call(message, "authMessage"))
                object.authMessage = message.authMessage;
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                object.email = message.email;
            if (message.devicePublicKey != null && Object.hasOwnProperty.call(message, "devicePublicKey"))
                object.devicePublicKey = options.bytes === String ? $util.base64.encode(message.devicePublicKey, 0, message.devicePublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.devicePublicKey) : message.devicePublicKey;
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                object.serverEccPublicKeyId = message.serverEccPublicKeyId;
            if (message.userEncryptedDataKey != null && Object.hasOwnProperty.call(message, "userEncryptedDataKey"))
                object.userEncryptedDataKey = options.bytes === String ? $util.base64.encode(message.userEncryptedDataKey, 0, message.userEncryptedDataKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.userEncryptedDataKey) : message.userEncryptedDataKey;
            if (message.userEncryptedDataKeyType != null && Object.hasOwnProperty.call(message, "userEncryptedDataKeyType"))
                object.userEncryptedDataKeyType = options.enums === String ? $root.Enterprise.EncryptedKeyType[message.userEncryptedDataKeyType] === undefined ? message.userEncryptedDataKeyType : $root.Enterprise.EncryptedKeyType[message.userEncryptedDataKeyType] : message.userEncryptedDataKeyType;
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                object.ipAddress = message.ipAddress;
            if (message.isTesting != null && Object.hasOwnProperty.call(message, "isTesting"))
                object.isTesting = message.isTesting;
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                object.isEccOnly = message.isEccOnly;
            return object;
        };

        /**
         * Converts this ApproveDeviceRequest to JSON.
         * @function toJSON
         * @memberof Automator.ApproveDeviceRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApproveDeviceRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApproveDeviceRequest
         * @function getTypeUrl
         * @memberof Automator.ApproveDeviceRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApproveDeviceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.ApproveDeviceRequest";
        };

        return ApproveDeviceRequest;
    })();

    Automator.SetupRequest = (function() {

        /**
         * Properties of a SetupRequest.
         * @memberof Automator
         * @interface ISetupRequest
         * @property {number|null} [automatorId] SetupRequest automatorId
         * @property {number|null} [serverEccPublicKeyId] SetupRequest serverEccPublicKeyId
         * @property {Automator.AutomatorState|null} [automatorState] SetupRequest automatorState
         * @property {Uint8Array|null} [encryptedEnterprisePrivateEccKey] SetupRequest encryptedEnterprisePrivateEccKey
         * @property {Uint8Array|null} [encryptedEnterprisePrivateRsaKey] SetupRequest encryptedEnterprisePrivateRsaKey
         * @property {Array.<Automator.IAutomatorSkill>|null} [automatorSkills] SetupRequest automatorSkills
         * @property {Uint8Array|null} [encryptedTreeKey] SetupRequest encryptedTreeKey
         * @property {boolean|null} [isEccOnly] SetupRequest isEccOnly
         */

        /**
         * Constructs a new SetupRequest.
         * @memberof Automator
         * @classdesc SetupRequest
         * In NEEDS_CRYPTO_STEP_1, this causes the automator to reply with the automator public ECC key.
         * In NEEDS_CRYPTO_STEP_2, this causes the automator to accept the ec_enterprise_private_key encrypted with the automator's public ECC key.
         * 
         * The client should check the automatorState in the AutomatorResponse to see what the next step should be.
         * 
         * @return an AutomatorResponse containing  StatusResponse
         * @implements ISetupRequest
         * @constructor
         * @param {Automator.ISetupRequest=} [properties] Properties to set
         */
        function SetupRequest(properties) {
            this.automatorSkills = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SetupRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.SetupRequest
         * @instance
         */
        SetupRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SetupRequest serverEccPublicKeyId.
         * @member {number} serverEccPublicKeyId
         * @memberof Automator.SetupRequest
         * @instance
         */
        SetupRequest.prototype.serverEccPublicKeyId = 0;

        /**
         * SetupRequest automatorState.
         * @member {Automator.AutomatorState} automatorState
         * @memberof Automator.SetupRequest
         * @instance
         */
        SetupRequest.prototype.automatorState = 0;

        /**
         * SetupRequest encryptedEnterprisePrivateEccKey.
         * @member {Uint8Array} encryptedEnterprisePrivateEccKey
         * @memberof Automator.SetupRequest
         * @instance
         */
        SetupRequest.prototype.encryptedEnterprisePrivateEccKey = $util.newBuffer([]);

        /**
         * SetupRequest encryptedEnterprisePrivateRsaKey.
         * @member {Uint8Array} encryptedEnterprisePrivateRsaKey
         * @memberof Automator.SetupRequest
         * @instance
         */
        SetupRequest.prototype.encryptedEnterprisePrivateRsaKey = $util.newBuffer([]);

        /**
         * SetupRequest automatorSkills.
         * @member {Array.<Automator.IAutomatorSkill>} automatorSkills
         * @memberof Automator.SetupRequest
         * @instance
         */
        SetupRequest.prototype.automatorSkills = $util.emptyArray;

        /**
         * SetupRequest encryptedTreeKey.
         * @member {Uint8Array} encryptedTreeKey
         * @memberof Automator.SetupRequest
         * @instance
         */
        SetupRequest.prototype.encryptedTreeKey = $util.newBuffer([]);

        /**
         * SetupRequest isEccOnly.
         * @member {boolean} isEccOnly
         * @memberof Automator.SetupRequest
         * @instance
         */
        SetupRequest.prototype.isEccOnly = false;

        /**
         * Creates a new SetupRequest instance using the specified properties.
         * @function create
         * @memberof Automator.SetupRequest
         * @static
         * @param {Automator.ISetupRequest=} [properties] Properties to set
         * @returns {Automator.SetupRequest} SetupRequest instance
         */
        SetupRequest.create = function create(properties) {
            return new SetupRequest(properties);
        };

        /**
         * Encodes the specified SetupRequest message. Does not implicitly {@link Automator.SetupRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.SetupRequest
         * @static
         * @param {Automator.ISetupRequest} message SetupRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetupRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.serverEccPublicKeyId);
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.automatorState);
            if (message.encryptedEnterprisePrivateEccKey != null && Object.hasOwnProperty.call(message, "encryptedEnterprisePrivateEccKey"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.encryptedEnterprisePrivateEccKey);
            if (message.encryptedEnterprisePrivateRsaKey != null && Object.hasOwnProperty.call(message, "encryptedEnterprisePrivateRsaKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.encryptedEnterprisePrivateRsaKey);
            if (message.automatorSkills != null && message.automatorSkills.length)
                for (let i = 0; i < message.automatorSkills.length; ++i)
                    $root.Automator.AutomatorSkill.encode(message.automatorSkills[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.encryptedTreeKey != null && Object.hasOwnProperty.call(message, "encryptedTreeKey"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.encryptedTreeKey);
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isEccOnly);
            return writer;
        };

        /**
         * Encodes the specified SetupRequest message, length delimited. Does not implicitly {@link Automator.SetupRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.SetupRequest
         * @static
         * @param {Automator.ISetupRequest} message SetupRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SetupRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a SetupRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.SetupRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.SetupRequest} SetupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetupRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.SetupRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.serverEccPublicKeyId = reader.int32();
                        break;
                    }
                case 3: {
                        message.automatorState = reader.int32();
                        break;
                    }
                case 4: {
                        message.encryptedEnterprisePrivateEccKey = reader.bytes();
                        break;
                    }
                case 5: {
                        message.encryptedEnterprisePrivateRsaKey = reader.bytes();
                        break;
                    }
                case 6: {
                        if (!(message.automatorSkills && message.automatorSkills.length))
                            message.automatorSkills = [];
                        message.automatorSkills.push($root.Automator.AutomatorSkill.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        message.encryptedTreeKey = reader.bytes();
                        break;
                    }
                case 8: {
                        message.isEccOnly = reader.bool();
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
         * Decodes a SetupRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.SetupRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.SetupRequest} SetupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SetupRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SetupRequest message.
         * @function verify
         * @memberof Automator.SetupRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SetupRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                if (!$util.isInteger(message.serverEccPublicKeyId))
                    return "serverEccPublicKeyId: integer expected";
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                switch (message.automatorState) {
                default:
                    return "automatorState: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.encryptedEnterprisePrivateEccKey != null && Object.hasOwnProperty.call(message, "encryptedEnterprisePrivateEccKey"))
                if (!(message.encryptedEnterprisePrivateEccKey && typeof message.encryptedEnterprisePrivateEccKey.length === "number" || $util.isString(message.encryptedEnterprisePrivateEccKey)))
                    return "encryptedEnterprisePrivateEccKey: buffer expected";
            if (message.encryptedEnterprisePrivateRsaKey != null && Object.hasOwnProperty.call(message, "encryptedEnterprisePrivateRsaKey"))
                if (!(message.encryptedEnterprisePrivateRsaKey && typeof message.encryptedEnterprisePrivateRsaKey.length === "number" || $util.isString(message.encryptedEnterprisePrivateRsaKey)))
                    return "encryptedEnterprisePrivateRsaKey: buffer expected";
            if (message.automatorSkills != null && Object.hasOwnProperty.call(message, "automatorSkills")) {
                if (!Array.isArray(message.automatorSkills))
                    return "automatorSkills: array expected";
                for (let i = 0; i < message.automatorSkills.length; ++i) {
                    let error = $root.Automator.AutomatorSkill.verify(message.automatorSkills[i], long + 1);
                    if (error)
                        return "automatorSkills." + error;
                }
            }
            if (message.encryptedTreeKey != null && Object.hasOwnProperty.call(message, "encryptedTreeKey"))
                if (!(message.encryptedTreeKey && typeof message.encryptedTreeKey.length === "number" || $util.isString(message.encryptedTreeKey)))
                    return "encryptedTreeKey: buffer expected";
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                if (typeof message.isEccOnly !== "boolean")
                    return "isEccOnly: boolean expected";
            return null;
        };

        /**
         * Creates a SetupRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.SetupRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.SetupRequest} SetupRequest
         */
        SetupRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.SetupRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.SetupRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.SetupRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            if (object.serverEccPublicKeyId != null)
                message.serverEccPublicKeyId = object.serverEccPublicKeyId | 0;
            switch (object.automatorState) {
            default:
                if (typeof object.automatorState === "number") {
                    message.automatorState = object.automatorState;
                    break;
                }
                break;
            case "UNKNOWN_STATE":
            case 0:
                message.automatorState = 0;
                break;
            case "RUNNING":
            case 1:
                message.automatorState = 1;
                break;
            case "ERROR":
            case 2:
                message.automatorState = 2;
                break;
            case "NEEDS_INITIALIZATION":
            case 3:
                message.automatorState = 3;
                break;
            case "NEEDS_CRYPTO_STEP_1":
            case 4:
                message.automatorState = 4;
                break;
            case "NEEDS_CRYPTO_STEP_2":
            case 5:
                message.automatorState = 5;
                break;
            }
            if (object.encryptedEnterprisePrivateEccKey != null)
                if (typeof object.encryptedEnterprisePrivateEccKey === "string")
                    $util.base64.decode(object.encryptedEnterprisePrivateEccKey, message.encryptedEnterprisePrivateEccKey = $util.newBuffer($util.base64.length(object.encryptedEnterprisePrivateEccKey)), 0);
                else if (object.encryptedEnterprisePrivateEccKey.length >= 0)
                    message.encryptedEnterprisePrivateEccKey = object.encryptedEnterprisePrivateEccKey;
            if (object.encryptedEnterprisePrivateRsaKey != null)
                if (typeof object.encryptedEnterprisePrivateRsaKey === "string")
                    $util.base64.decode(object.encryptedEnterprisePrivateRsaKey, message.encryptedEnterprisePrivateRsaKey = $util.newBuffer($util.base64.length(object.encryptedEnterprisePrivateRsaKey)), 0);
                else if (object.encryptedEnterprisePrivateRsaKey.length >= 0)
                    message.encryptedEnterprisePrivateRsaKey = object.encryptedEnterprisePrivateRsaKey;
            if (object.automatorSkills) {
                if (!Array.isArray(object.automatorSkills))
                    throw TypeError(".Automator.SetupRequest.automatorSkills: array expected");
                message.automatorSkills = [];
                for (let i = 0; i < object.automatorSkills.length; ++i) {
                    if (!$util.isObject(object.automatorSkills[i]))
                        throw TypeError(".Automator.SetupRequest.automatorSkills: object expected");
                    message.automatorSkills[i] = $root.Automator.AutomatorSkill.fromObject(object.automatorSkills[i], long + 1);
                }
            }
            if (object.encryptedTreeKey != null)
                if (typeof object.encryptedTreeKey === "string")
                    $util.base64.decode(object.encryptedTreeKey, message.encryptedTreeKey = $util.newBuffer($util.base64.length(object.encryptedTreeKey)), 0);
                else if (object.encryptedTreeKey.length >= 0)
                    message.encryptedTreeKey = object.encryptedTreeKey;
            if (object.isEccOnly != null)
                message.isEccOnly = Boolean(object.isEccOnly);
            return message;
        };

        /**
         * Creates a plain object from a SetupRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.SetupRequest
         * @static
         * @param {Automator.SetupRequest} message SetupRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SetupRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.automatorSkills = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.serverEccPublicKeyId = 0;
                object.automatorState = options.enums === String ? "UNKNOWN_STATE" : 0;
                if (options.bytes === String)
                    object.encryptedEnterprisePrivateEccKey = "";
                else {
                    object.encryptedEnterprisePrivateEccKey = [];
                    if (options.bytes !== Array)
                        object.encryptedEnterprisePrivateEccKey = $util.newBuffer(object.encryptedEnterprisePrivateEccKey);
                }
                if (options.bytes === String)
                    object.encryptedEnterprisePrivateRsaKey = "";
                else {
                    object.encryptedEnterprisePrivateRsaKey = [];
                    if (options.bytes !== Array)
                        object.encryptedEnterprisePrivateRsaKey = $util.newBuffer(object.encryptedEnterprisePrivateRsaKey);
                }
                if (options.bytes === String)
                    object.encryptedTreeKey = "";
                else {
                    object.encryptedTreeKey = [];
                    if (options.bytes !== Array)
                        object.encryptedTreeKey = $util.newBuffer(object.encryptedTreeKey);
                }
                object.isEccOnly = false;
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                object.serverEccPublicKeyId = message.serverEccPublicKeyId;
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                object.automatorState = options.enums === String ? $root.Automator.AutomatorState[message.automatorState] === undefined ? message.automatorState : $root.Automator.AutomatorState[message.automatorState] : message.automatorState;
            if (message.encryptedEnterprisePrivateEccKey != null && Object.hasOwnProperty.call(message, "encryptedEnterprisePrivateEccKey"))
                object.encryptedEnterprisePrivateEccKey = options.bytes === String ? $util.base64.encode(message.encryptedEnterprisePrivateEccKey, 0, message.encryptedEnterprisePrivateEccKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedEnterprisePrivateEccKey) : message.encryptedEnterprisePrivateEccKey;
            if (message.encryptedEnterprisePrivateRsaKey != null && Object.hasOwnProperty.call(message, "encryptedEnterprisePrivateRsaKey"))
                object.encryptedEnterprisePrivateRsaKey = options.bytes === String ? $util.base64.encode(message.encryptedEnterprisePrivateRsaKey, 0, message.encryptedEnterprisePrivateRsaKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedEnterprisePrivateRsaKey) : message.encryptedEnterprisePrivateRsaKey;
            if (message.automatorSkills && message.automatorSkills.length) {
                object.automatorSkills = [];
                for (let j = 0; j < message.automatorSkills.length; ++j)
                    object.automatorSkills[j] = $root.Automator.AutomatorSkill.toObject(message.automatorSkills[j], options, q + 1);
            }
            if (message.encryptedTreeKey != null && Object.hasOwnProperty.call(message, "encryptedTreeKey"))
                object.encryptedTreeKey = options.bytes === String ? $util.base64.encode(message.encryptedTreeKey, 0, message.encryptedTreeKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedTreeKey) : message.encryptedTreeKey;
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                object.isEccOnly = message.isEccOnly;
            return object;
        };

        /**
         * Converts this SetupRequest to JSON.
         * @function toJSON
         * @memberof Automator.SetupRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SetupRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SetupRequest
         * @function getTypeUrl
         * @memberof Automator.SetupRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SetupRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.SetupRequest";
        };

        return SetupRequest;
    })();

    Automator.StatusRequest = (function() {

        /**
         * Properties of a StatusRequest.
         * @memberof Automator
         * @interface IStatusRequest
         * @property {number|null} [automatorId] StatusRequest automatorId
         * @property {number|null} [serverEccPublicKeyId] StatusRequest serverEccPublicKeyId
         * @property {boolean|null} [isEccOnly] StatusRequest isEccOnly
         */

        /**
         * Constructs a new StatusRequest.
         * @memberof Automator
         * @classdesc StatusRequest
         * This is used to ask the Automator instance for its status via an authenticated REST call.
         * @return an AutomatorResponse containing  StatusResponse
         * @implements IStatusRequest
         * @constructor
         * @param {Automator.IStatusRequest=} [properties] Properties to set
         */
        function StatusRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StatusRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.StatusRequest
         * @instance
         */
        StatusRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusRequest serverEccPublicKeyId.
         * @member {number} serverEccPublicKeyId
         * @memberof Automator.StatusRequest
         * @instance
         */
        StatusRequest.prototype.serverEccPublicKeyId = 0;

        /**
         * StatusRequest isEccOnly.
         * @member {boolean} isEccOnly
         * @memberof Automator.StatusRequest
         * @instance
         */
        StatusRequest.prototype.isEccOnly = false;

        /**
         * Creates a new StatusRequest instance using the specified properties.
         * @function create
         * @memberof Automator.StatusRequest
         * @static
         * @param {Automator.IStatusRequest=} [properties] Properties to set
         * @returns {Automator.StatusRequest} StatusRequest instance
         */
        StatusRequest.create = function create(properties) {
            return new StatusRequest(properties);
        };

        /**
         * Encodes the specified StatusRequest message. Does not implicitly {@link Automator.StatusRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.StatusRequest
         * @static
         * @param {Automator.IStatusRequest} message StatusRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StatusRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.serverEccPublicKeyId);
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isEccOnly);
            return writer;
        };

        /**
         * Encodes the specified StatusRequest message, length delimited. Does not implicitly {@link Automator.StatusRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.StatusRequest
         * @static
         * @param {Automator.IStatusRequest} message StatusRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StatusRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a StatusRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.StatusRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.StatusRequest} StatusRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StatusRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.StatusRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.serverEccPublicKeyId = reader.int32();
                        break;
                    }
                case 3: {
                        message.isEccOnly = reader.bool();
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
         * Decodes a StatusRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.StatusRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.StatusRequest} StatusRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StatusRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StatusRequest message.
         * @function verify
         * @memberof Automator.StatusRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StatusRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                if (!$util.isInteger(message.serverEccPublicKeyId))
                    return "serverEccPublicKeyId: integer expected";
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                if (typeof message.isEccOnly !== "boolean")
                    return "isEccOnly: boolean expected";
            return null;
        };

        /**
         * Creates a StatusRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.StatusRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.StatusRequest} StatusRequest
         */
        StatusRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.StatusRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.StatusRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.StatusRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            if (object.serverEccPublicKeyId != null)
                message.serverEccPublicKeyId = object.serverEccPublicKeyId | 0;
            if (object.isEccOnly != null)
                message.isEccOnly = Boolean(object.isEccOnly);
            return message;
        };

        /**
         * Creates a plain object from a StatusRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.StatusRequest
         * @static
         * @param {Automator.StatusRequest} message StatusRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StatusRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.serverEccPublicKeyId = 0;
                object.isEccOnly = false;
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                object.serverEccPublicKeyId = message.serverEccPublicKeyId;
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                object.isEccOnly = message.isEccOnly;
            return object;
        };

        /**
         * Converts this StatusRequest to JSON.
         * @function toJSON
         * @memberof Automator.StatusRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StatusRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StatusRequest
         * @function getTypeUrl
         * @memberof Automator.StatusRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StatusRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.StatusRequest";
        };

        return StatusRequest;
    })();

    Automator.InitializeRequest = (function() {

        /**
         * Properties of an InitializeRequest.
         * @memberof Automator
         * @interface IInitializeRequest
         * @property {number|null} [automatorId] InitializeRequest automatorId
         * @property {string|null} [idpMetadata] InitializeRequest idpMetadata
         * @property {Uint8Array|null} [idpSigningCertificate] InitializeRequest idpSigningCertificate
         * @property {string|null} [ssoEntityId] InitializeRequest ssoEntityId
         * @property {string|null} [emailMapping] InitializeRequest emailMapping
         * @property {string|null} [firstnameMapping] InitializeRequest firstnameMapping
         * @property {string|null} [lastnameMapping] InitializeRequest lastnameMapping
         * @property {boolean|null} [disabled] InitializeRequest disabled
         * @property {number|null} [serverEccPublicKeyId] InitializeRequest serverEccPublicKeyId
         * @property {Uint8Array|null} [config] InitializeRequest config
         * @property {string|null} [sslMode] InitializeRequest sslMode
         * @property {boolean|null} [persistState] InitializeRequest persistState
         * @property {boolean|null} [disableSniCheck] InitializeRequest disableSniCheck
         * @property {string|null} [sslCertificateFilename] InitializeRequest sslCertificateFilename
         * @property {string|null} [sslCertificateFilePassword] InitializeRequest sslCertificateFilePassword
         * @property {string|null} [sslCertificateKeyPassword] InitializeRequest sslCertificateKeyPassword
         * @property {Uint8Array|null} [sslCertificateContents] InitializeRequest sslCertificateContents
         * @property {string|null} [automatorHost] InitializeRequest automatorHost
         * @property {string|null} [automatorPort] InitializeRequest automatorPort
         * @property {string|null} [ipAllow] InitializeRequest ipAllow
         * @property {string|null} [ipDeny] InitializeRequest ipDeny
         * @property {boolean|null} [isEccOnly] InitializeRequest isEccOnly
         */

        /**
         * Constructs a new InitializeRequest.
         * @memberof Automator
         * @classdesc InitializeRequest
         * This is used to Initialize the Automator instance via an authenticated REST call.
         * Updated for Automator 2.0 by adding 9 new configuration parameters.
         * Updated for Automator 2.2 by adding 2 new configuration parameters.
         * 
         * @return an AutomatorResponse containing a StatusResponse
         * @implements IInitializeRequest
         * @constructor
         * @param {Automator.IInitializeRequest=} [properties] Properties to set
         */
        function InitializeRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InitializeRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * InitializeRequest idpMetadata.
         * @member {string} idpMetadata
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.idpMetadata = "";

        /**
         * InitializeRequest idpSigningCertificate.
         * @member {Uint8Array} idpSigningCertificate
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.idpSigningCertificate = $util.newBuffer([]);

        /**
         * InitializeRequest ssoEntityId.
         * @member {string} ssoEntityId
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.ssoEntityId = "";

        /**
         * InitializeRequest emailMapping.
         * @member {string} emailMapping
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.emailMapping = "";

        /**
         * InitializeRequest firstnameMapping.
         * @member {string} firstnameMapping
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.firstnameMapping = "";

        /**
         * InitializeRequest lastnameMapping.
         * @member {string} lastnameMapping
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.lastnameMapping = "";

        /**
         * InitializeRequest disabled.
         * @member {boolean} disabled
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.disabled = false;

        /**
         * InitializeRequest serverEccPublicKeyId.
         * @member {number} serverEccPublicKeyId
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.serverEccPublicKeyId = 0;

        /**
         * InitializeRequest config.
         * @member {Uint8Array} config
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.config = $util.newBuffer([]);

        /**
         * InitializeRequest sslMode.
         * @member {string} sslMode
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.sslMode = "";

        /**
         * InitializeRequest persistState.
         * @member {boolean} persistState
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.persistState = false;

        /**
         * InitializeRequest disableSniCheck.
         * @member {boolean} disableSniCheck
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.disableSniCheck = false;

        /**
         * InitializeRequest sslCertificateFilename.
         * @member {string} sslCertificateFilename
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.sslCertificateFilename = "";

        /**
         * InitializeRequest sslCertificateFilePassword.
         * @member {string} sslCertificateFilePassword
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.sslCertificateFilePassword = "";

        /**
         * InitializeRequest sslCertificateKeyPassword.
         * @member {string} sslCertificateKeyPassword
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.sslCertificateKeyPassword = "";

        /**
         * InitializeRequest sslCertificateContents.
         * @member {Uint8Array} sslCertificateContents
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.sslCertificateContents = $util.newBuffer([]);

        /**
         * InitializeRequest automatorHost.
         * @member {string} automatorHost
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.automatorHost = "";

        /**
         * InitializeRequest automatorPort.
         * @member {string} automatorPort
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.automatorPort = "";

        /**
         * InitializeRequest ipAllow.
         * @member {string} ipAllow
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.ipAllow = "";

        /**
         * InitializeRequest ipDeny.
         * @member {string} ipDeny
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.ipDeny = "";

        /**
         * InitializeRequest isEccOnly.
         * @member {boolean} isEccOnly
         * @memberof Automator.InitializeRequest
         * @instance
         */
        InitializeRequest.prototype.isEccOnly = false;

        /**
         * Creates a new InitializeRequest instance using the specified properties.
         * @function create
         * @memberof Automator.InitializeRequest
         * @static
         * @param {Automator.IInitializeRequest=} [properties] Properties to set
         * @returns {Automator.InitializeRequest} InitializeRequest instance
         */
        InitializeRequest.create = function create(properties) {
            return new InitializeRequest(properties);
        };

        /**
         * Encodes the specified InitializeRequest message. Does not implicitly {@link Automator.InitializeRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.InitializeRequest
         * @static
         * @param {Automator.IInitializeRequest} message InitializeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitializeRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.idpMetadata != null && Object.hasOwnProperty.call(message, "idpMetadata"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.idpMetadata);
            if (message.idpSigningCertificate != null && Object.hasOwnProperty.call(message, "idpSigningCertificate"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.idpSigningCertificate);
            if (message.ssoEntityId != null && Object.hasOwnProperty.call(message, "ssoEntityId"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.ssoEntityId);
            if (message.emailMapping != null && Object.hasOwnProperty.call(message, "emailMapping"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.emailMapping);
            if (message.firstnameMapping != null && Object.hasOwnProperty.call(message, "firstnameMapping"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.firstnameMapping);
            if (message.lastnameMapping != null && Object.hasOwnProperty.call(message, "lastnameMapping"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.lastnameMapping);
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.disabled);
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.serverEccPublicKeyId);
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.config);
            if (message.sslMode != null && Object.hasOwnProperty.call(message, "sslMode"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.sslMode);
            if (message.persistState != null && Object.hasOwnProperty.call(message, "persistState"))
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.persistState);
            if (message.disableSniCheck != null && Object.hasOwnProperty.call(message, "disableSniCheck"))
                writer.uint32(/* id 13, wireType 0 =*/104).bool(message.disableSniCheck);
            if (message.sslCertificateFilename != null && Object.hasOwnProperty.call(message, "sslCertificateFilename"))
                writer.uint32(/* id 14, wireType 2 =*/114).string(message.sslCertificateFilename);
            if (message.sslCertificateFilePassword != null && Object.hasOwnProperty.call(message, "sslCertificateFilePassword"))
                writer.uint32(/* id 15, wireType 2 =*/122).string(message.sslCertificateFilePassword);
            if (message.sslCertificateKeyPassword != null && Object.hasOwnProperty.call(message, "sslCertificateKeyPassword"))
                writer.uint32(/* id 16, wireType 2 =*/130).string(message.sslCertificateKeyPassword);
            if (message.sslCertificateContents != null && Object.hasOwnProperty.call(message, "sslCertificateContents"))
                writer.uint32(/* id 17, wireType 2 =*/138).bytes(message.sslCertificateContents);
            if (message.automatorHost != null && Object.hasOwnProperty.call(message, "automatorHost"))
                writer.uint32(/* id 18, wireType 2 =*/146).string(message.automatorHost);
            if (message.automatorPort != null && Object.hasOwnProperty.call(message, "automatorPort"))
                writer.uint32(/* id 19, wireType 2 =*/154).string(message.automatorPort);
            if (message.ipAllow != null && Object.hasOwnProperty.call(message, "ipAllow"))
                writer.uint32(/* id 20, wireType 2 =*/162).string(message.ipAllow);
            if (message.ipDeny != null && Object.hasOwnProperty.call(message, "ipDeny"))
                writer.uint32(/* id 21, wireType 2 =*/170).string(message.ipDeny);
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                writer.uint32(/* id 22, wireType 0 =*/176).bool(message.isEccOnly);
            return writer;
        };

        /**
         * Encodes the specified InitializeRequest message, length delimited. Does not implicitly {@link Automator.InitializeRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.InitializeRequest
         * @static
         * @param {Automator.IInitializeRequest} message InitializeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InitializeRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an InitializeRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.InitializeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.InitializeRequest} InitializeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitializeRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.InitializeRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.idpMetadata = reader.string();
                        break;
                    }
                case 3: {
                        message.idpSigningCertificate = reader.bytes();
                        break;
                    }
                case 4: {
                        message.ssoEntityId = reader.string();
                        break;
                    }
                case 5: {
                        message.emailMapping = reader.string();
                        break;
                    }
                case 6: {
                        message.firstnameMapping = reader.string();
                        break;
                    }
                case 7: {
                        message.lastnameMapping = reader.string();
                        break;
                    }
                case 8: {
                        message.disabled = reader.bool();
                        break;
                    }
                case 9: {
                        message.serverEccPublicKeyId = reader.int32();
                        break;
                    }
                case 10: {
                        message.config = reader.bytes();
                        break;
                    }
                case 11: {
                        message.sslMode = reader.string();
                        break;
                    }
                case 12: {
                        message.persistState = reader.bool();
                        break;
                    }
                case 13: {
                        message.disableSniCheck = reader.bool();
                        break;
                    }
                case 14: {
                        message.sslCertificateFilename = reader.string();
                        break;
                    }
                case 15: {
                        message.sslCertificateFilePassword = reader.string();
                        break;
                    }
                case 16: {
                        message.sslCertificateKeyPassword = reader.string();
                        break;
                    }
                case 17: {
                        message.sslCertificateContents = reader.bytes();
                        break;
                    }
                case 18: {
                        message.automatorHost = reader.string();
                        break;
                    }
                case 19: {
                        message.automatorPort = reader.string();
                        break;
                    }
                case 20: {
                        message.ipAllow = reader.string();
                        break;
                    }
                case 21: {
                        message.ipDeny = reader.string();
                        break;
                    }
                case 22: {
                        message.isEccOnly = reader.bool();
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
         * Decodes an InitializeRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.InitializeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.InitializeRequest} InitializeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InitializeRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InitializeRequest message.
         * @function verify
         * @memberof Automator.InitializeRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InitializeRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.idpMetadata != null && Object.hasOwnProperty.call(message, "idpMetadata"))
                if (!$util.isString(message.idpMetadata))
                    return "idpMetadata: string expected";
            if (message.idpSigningCertificate != null && Object.hasOwnProperty.call(message, "idpSigningCertificate"))
                if (!(message.idpSigningCertificate && typeof message.idpSigningCertificate.length === "number" || $util.isString(message.idpSigningCertificate)))
                    return "idpSigningCertificate: buffer expected";
            if (message.ssoEntityId != null && Object.hasOwnProperty.call(message, "ssoEntityId"))
                if (!$util.isString(message.ssoEntityId))
                    return "ssoEntityId: string expected";
            if (message.emailMapping != null && Object.hasOwnProperty.call(message, "emailMapping"))
                if (!$util.isString(message.emailMapping))
                    return "emailMapping: string expected";
            if (message.firstnameMapping != null && Object.hasOwnProperty.call(message, "firstnameMapping"))
                if (!$util.isString(message.firstnameMapping))
                    return "firstnameMapping: string expected";
            if (message.lastnameMapping != null && Object.hasOwnProperty.call(message, "lastnameMapping"))
                if (!$util.isString(message.lastnameMapping))
                    return "lastnameMapping: string expected";
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                if (typeof message.disabled !== "boolean")
                    return "disabled: boolean expected";
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                if (!$util.isInteger(message.serverEccPublicKeyId))
                    return "serverEccPublicKeyId: integer expected";
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                if (!(message.config && typeof message.config.length === "number" || $util.isString(message.config)))
                    return "config: buffer expected";
            if (message.sslMode != null && Object.hasOwnProperty.call(message, "sslMode"))
                if (!$util.isString(message.sslMode))
                    return "sslMode: string expected";
            if (message.persistState != null && Object.hasOwnProperty.call(message, "persistState"))
                if (typeof message.persistState !== "boolean")
                    return "persistState: boolean expected";
            if (message.disableSniCheck != null && Object.hasOwnProperty.call(message, "disableSniCheck"))
                if (typeof message.disableSniCheck !== "boolean")
                    return "disableSniCheck: boolean expected";
            if (message.sslCertificateFilename != null && Object.hasOwnProperty.call(message, "sslCertificateFilename"))
                if (!$util.isString(message.sslCertificateFilename))
                    return "sslCertificateFilename: string expected";
            if (message.sslCertificateFilePassword != null && Object.hasOwnProperty.call(message, "sslCertificateFilePassword"))
                if (!$util.isString(message.sslCertificateFilePassword))
                    return "sslCertificateFilePassword: string expected";
            if (message.sslCertificateKeyPassword != null && Object.hasOwnProperty.call(message, "sslCertificateKeyPassword"))
                if (!$util.isString(message.sslCertificateKeyPassword))
                    return "sslCertificateKeyPassword: string expected";
            if (message.sslCertificateContents != null && Object.hasOwnProperty.call(message, "sslCertificateContents"))
                if (!(message.sslCertificateContents && typeof message.sslCertificateContents.length === "number" || $util.isString(message.sslCertificateContents)))
                    return "sslCertificateContents: buffer expected";
            if (message.automatorHost != null && Object.hasOwnProperty.call(message, "automatorHost"))
                if (!$util.isString(message.automatorHost))
                    return "automatorHost: string expected";
            if (message.automatorPort != null && Object.hasOwnProperty.call(message, "automatorPort"))
                if (!$util.isString(message.automatorPort))
                    return "automatorPort: string expected";
            if (message.ipAllow != null && Object.hasOwnProperty.call(message, "ipAllow"))
                if (!$util.isString(message.ipAllow))
                    return "ipAllow: string expected";
            if (message.ipDeny != null && Object.hasOwnProperty.call(message, "ipDeny"))
                if (!$util.isString(message.ipDeny))
                    return "ipDeny: string expected";
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                if (typeof message.isEccOnly !== "boolean")
                    return "isEccOnly: boolean expected";
            return null;
        };

        /**
         * Creates an InitializeRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.InitializeRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.InitializeRequest} InitializeRequest
         */
        InitializeRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.InitializeRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.InitializeRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.InitializeRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            if (object.idpMetadata != null)
                message.idpMetadata = String(object.idpMetadata);
            if (object.idpSigningCertificate != null)
                if (typeof object.idpSigningCertificate === "string")
                    $util.base64.decode(object.idpSigningCertificate, message.idpSigningCertificate = $util.newBuffer($util.base64.length(object.idpSigningCertificate)), 0);
                else if (object.idpSigningCertificate.length >= 0)
                    message.idpSigningCertificate = object.idpSigningCertificate;
            if (object.ssoEntityId != null)
                message.ssoEntityId = String(object.ssoEntityId);
            if (object.emailMapping != null)
                message.emailMapping = String(object.emailMapping);
            if (object.firstnameMapping != null)
                message.firstnameMapping = String(object.firstnameMapping);
            if (object.lastnameMapping != null)
                message.lastnameMapping = String(object.lastnameMapping);
            if (object.disabled != null)
                message.disabled = Boolean(object.disabled);
            if (object.serverEccPublicKeyId != null)
                message.serverEccPublicKeyId = object.serverEccPublicKeyId | 0;
            if (object.config != null)
                if (typeof object.config === "string")
                    $util.base64.decode(object.config, message.config = $util.newBuffer($util.base64.length(object.config)), 0);
                else if (object.config.length >= 0)
                    message.config = object.config;
            if (object.sslMode != null)
                message.sslMode = String(object.sslMode);
            if (object.persistState != null)
                message.persistState = Boolean(object.persistState);
            if (object.disableSniCheck != null)
                message.disableSniCheck = Boolean(object.disableSniCheck);
            if (object.sslCertificateFilename != null)
                message.sslCertificateFilename = String(object.sslCertificateFilename);
            if (object.sslCertificateFilePassword != null)
                message.sslCertificateFilePassword = String(object.sslCertificateFilePassword);
            if (object.sslCertificateKeyPassword != null)
                message.sslCertificateKeyPassword = String(object.sslCertificateKeyPassword);
            if (object.sslCertificateContents != null)
                if (typeof object.sslCertificateContents === "string")
                    $util.base64.decode(object.sslCertificateContents, message.sslCertificateContents = $util.newBuffer($util.base64.length(object.sslCertificateContents)), 0);
                else if (object.sslCertificateContents.length >= 0)
                    message.sslCertificateContents = object.sslCertificateContents;
            if (object.automatorHost != null)
                message.automatorHost = String(object.automatorHost);
            if (object.automatorPort != null)
                message.automatorPort = String(object.automatorPort);
            if (object.ipAllow != null)
                message.ipAllow = String(object.ipAllow);
            if (object.ipDeny != null)
                message.ipDeny = String(object.ipDeny);
            if (object.isEccOnly != null)
                message.isEccOnly = Boolean(object.isEccOnly);
            return message;
        };

        /**
         * Creates a plain object from an InitializeRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.InitializeRequest
         * @static
         * @param {Automator.InitializeRequest} message InitializeRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InitializeRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.idpMetadata = "";
                if (options.bytes === String)
                    object.idpSigningCertificate = "";
                else {
                    object.idpSigningCertificate = [];
                    if (options.bytes !== Array)
                        object.idpSigningCertificate = $util.newBuffer(object.idpSigningCertificate);
                }
                object.ssoEntityId = "";
                object.emailMapping = "";
                object.firstnameMapping = "";
                object.lastnameMapping = "";
                object.disabled = false;
                object.serverEccPublicKeyId = 0;
                if (options.bytes === String)
                    object.config = "";
                else {
                    object.config = [];
                    if (options.bytes !== Array)
                        object.config = $util.newBuffer(object.config);
                }
                object.sslMode = "";
                object.persistState = false;
                object.disableSniCheck = false;
                object.sslCertificateFilename = "";
                object.sslCertificateFilePassword = "";
                object.sslCertificateKeyPassword = "";
                if (options.bytes === String)
                    object.sslCertificateContents = "";
                else {
                    object.sslCertificateContents = [];
                    if (options.bytes !== Array)
                        object.sslCertificateContents = $util.newBuffer(object.sslCertificateContents);
                }
                object.automatorHost = "";
                object.automatorPort = "";
                object.ipAllow = "";
                object.ipDeny = "";
                object.isEccOnly = false;
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.idpMetadata != null && Object.hasOwnProperty.call(message, "idpMetadata"))
                object.idpMetadata = message.idpMetadata;
            if (message.idpSigningCertificate != null && Object.hasOwnProperty.call(message, "idpSigningCertificate"))
                object.idpSigningCertificate = options.bytes === String ? $util.base64.encode(message.idpSigningCertificate, 0, message.idpSigningCertificate.length) : options.bytes === Array ? Array.prototype.slice.call(message.idpSigningCertificate) : message.idpSigningCertificate;
            if (message.ssoEntityId != null && Object.hasOwnProperty.call(message, "ssoEntityId"))
                object.ssoEntityId = message.ssoEntityId;
            if (message.emailMapping != null && Object.hasOwnProperty.call(message, "emailMapping"))
                object.emailMapping = message.emailMapping;
            if (message.firstnameMapping != null && Object.hasOwnProperty.call(message, "firstnameMapping"))
                object.firstnameMapping = message.firstnameMapping;
            if (message.lastnameMapping != null && Object.hasOwnProperty.call(message, "lastnameMapping"))
                object.lastnameMapping = message.lastnameMapping;
            if (message.disabled != null && Object.hasOwnProperty.call(message, "disabled"))
                object.disabled = message.disabled;
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                object.serverEccPublicKeyId = message.serverEccPublicKeyId;
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                object.config = options.bytes === String ? $util.base64.encode(message.config, 0, message.config.length) : options.bytes === Array ? Array.prototype.slice.call(message.config) : message.config;
            if (message.sslMode != null && Object.hasOwnProperty.call(message, "sslMode"))
                object.sslMode = message.sslMode;
            if (message.persistState != null && Object.hasOwnProperty.call(message, "persistState"))
                object.persistState = message.persistState;
            if (message.disableSniCheck != null && Object.hasOwnProperty.call(message, "disableSniCheck"))
                object.disableSniCheck = message.disableSniCheck;
            if (message.sslCertificateFilename != null && Object.hasOwnProperty.call(message, "sslCertificateFilename"))
                object.sslCertificateFilename = message.sslCertificateFilename;
            if (message.sslCertificateFilePassword != null && Object.hasOwnProperty.call(message, "sslCertificateFilePassword"))
                object.sslCertificateFilePassword = message.sslCertificateFilePassword;
            if (message.sslCertificateKeyPassword != null && Object.hasOwnProperty.call(message, "sslCertificateKeyPassword"))
                object.sslCertificateKeyPassword = message.sslCertificateKeyPassword;
            if (message.sslCertificateContents != null && Object.hasOwnProperty.call(message, "sslCertificateContents"))
                object.sslCertificateContents = options.bytes === String ? $util.base64.encode(message.sslCertificateContents, 0, message.sslCertificateContents.length) : options.bytes === Array ? Array.prototype.slice.call(message.sslCertificateContents) : message.sslCertificateContents;
            if (message.automatorHost != null && Object.hasOwnProperty.call(message, "automatorHost"))
                object.automatorHost = message.automatorHost;
            if (message.automatorPort != null && Object.hasOwnProperty.call(message, "automatorPort"))
                object.automatorPort = message.automatorPort;
            if (message.ipAllow != null && Object.hasOwnProperty.call(message, "ipAllow"))
                object.ipAllow = message.ipAllow;
            if (message.ipDeny != null && Object.hasOwnProperty.call(message, "ipDeny"))
                object.ipDeny = message.ipDeny;
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                object.isEccOnly = message.isEccOnly;
            return object;
        };

        /**
         * Converts this InitializeRequest to JSON.
         * @function toJSON
         * @memberof Automator.InitializeRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InitializeRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for InitializeRequest
         * @function getTypeUrl
         * @memberof Automator.InitializeRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        InitializeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.InitializeRequest";
        };

        return InitializeRequest;
    })();

    Automator.NotInitializedResponse = (function() {

        /**
         * Properties of a NotInitializedResponse.
         * @memberof Automator
         * @interface INotInitializedResponse
         * @property {Uint8Array|null} [automatorTransmissionKey] NotInitializedResponse automatorTransmissionKey
         * @property {Uint8Array|null} [signingCertificate] NotInitializedResponse signingCertificate
         * @property {string|null} [signingCertificateFilename] NotInitializedResponse signingCertificateFilename
         * @property {string|null} [signingCertificatePassword] NotInitializedResponse signingCertificatePassword
         * @property {string|null} [signingKeyPassword] NotInitializedResponse signingKeyPassword
         * @property {Automator.CertificateFormat|null} [signingCertificateFormat] NotInitializedResponse signingCertificateFormat
         * @property {Uint8Array|null} [automatorPublicKey] NotInitializedResponse automatorPublicKey
         * @property {Uint8Array|null} [config] NotInitializedResponse config
         */

        /**
         * Constructs a new NotInitializedResponse.
         * @memberof Automator
         * @classdesc NotInitializedResponse
         * The Automator instance replies with this message if it has not been initialized.
         * The certificate is most likely the SSL certificate of the Automator.
         * The certificate will be passed to the corresponding Cloud SSO instance and used to sign the IdP messages.
         * 
         * This message will be encrypted with the ECC public key whose ID is indicated in the request received from Keeper.
         * All other messages are encrypted with the automatorTransmissionKey.
         * @implements INotInitializedResponse
         * @constructor
         * @param {Automator.INotInitializedResponse=} [properties] Properties to set
         */
        function NotInitializedResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NotInitializedResponse automatorTransmissionKey.
         * @member {Uint8Array} automatorTransmissionKey
         * @memberof Automator.NotInitializedResponse
         * @instance
         */
        NotInitializedResponse.prototype.automatorTransmissionKey = $util.newBuffer([]);

        /**
         * NotInitializedResponse signingCertificate.
         * @member {Uint8Array} signingCertificate
         * @memberof Automator.NotInitializedResponse
         * @instance
         */
        NotInitializedResponse.prototype.signingCertificate = $util.newBuffer([]);

        /**
         * NotInitializedResponse signingCertificateFilename.
         * @member {string} signingCertificateFilename
         * @memberof Automator.NotInitializedResponse
         * @instance
         */
        NotInitializedResponse.prototype.signingCertificateFilename = "";

        /**
         * NotInitializedResponse signingCertificatePassword.
         * @member {string} signingCertificatePassword
         * @memberof Automator.NotInitializedResponse
         * @instance
         */
        NotInitializedResponse.prototype.signingCertificatePassword = "";

        /**
         * NotInitializedResponse signingKeyPassword.
         * @member {string} signingKeyPassword
         * @memberof Automator.NotInitializedResponse
         * @instance
         */
        NotInitializedResponse.prototype.signingKeyPassword = "";

        /**
         * NotInitializedResponse signingCertificateFormat.
         * @member {Automator.CertificateFormat} signingCertificateFormat
         * @memberof Automator.NotInitializedResponse
         * @instance
         */
        NotInitializedResponse.prototype.signingCertificateFormat = 0;

        /**
         * NotInitializedResponse automatorPublicKey.
         * @member {Uint8Array} automatorPublicKey
         * @memberof Automator.NotInitializedResponse
         * @instance
         */
        NotInitializedResponse.prototype.automatorPublicKey = $util.newBuffer([]);

        /**
         * NotInitializedResponse config.
         * @member {Uint8Array} config
         * @memberof Automator.NotInitializedResponse
         * @instance
         */
        NotInitializedResponse.prototype.config = $util.newBuffer([]);

        /**
         * Creates a new NotInitializedResponse instance using the specified properties.
         * @function create
         * @memberof Automator.NotInitializedResponse
         * @static
         * @param {Automator.INotInitializedResponse=} [properties] Properties to set
         * @returns {Automator.NotInitializedResponse} NotInitializedResponse instance
         */
        NotInitializedResponse.create = function create(properties) {
            return new NotInitializedResponse(properties);
        };

        /**
         * Encodes the specified NotInitializedResponse message. Does not implicitly {@link Automator.NotInitializedResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.NotInitializedResponse
         * @static
         * @param {Automator.INotInitializedResponse} message NotInitializedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotInitializedResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorTransmissionKey != null && Object.hasOwnProperty.call(message, "automatorTransmissionKey"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.automatorTransmissionKey);
            if (message.signingCertificate != null && Object.hasOwnProperty.call(message, "signingCertificate"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.signingCertificate);
            if (message.signingCertificateFilename != null && Object.hasOwnProperty.call(message, "signingCertificateFilename"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.signingCertificateFilename);
            if (message.signingCertificatePassword != null && Object.hasOwnProperty.call(message, "signingCertificatePassword"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.signingCertificatePassword);
            if (message.signingKeyPassword != null && Object.hasOwnProperty.call(message, "signingKeyPassword"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.signingKeyPassword);
            if (message.signingCertificateFormat != null && Object.hasOwnProperty.call(message, "signingCertificateFormat"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.signingCertificateFormat);
            if (message.automatorPublicKey != null && Object.hasOwnProperty.call(message, "automatorPublicKey"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.automatorPublicKey);
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.config);
            return writer;
        };

        /**
         * Encodes the specified NotInitializedResponse message, length delimited. Does not implicitly {@link Automator.NotInitializedResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.NotInitializedResponse
         * @static
         * @param {Automator.INotInitializedResponse} message NotInitializedResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NotInitializedResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a NotInitializedResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.NotInitializedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.NotInitializedResponse} NotInitializedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotInitializedResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.NotInitializedResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorTransmissionKey = reader.bytes();
                        break;
                    }
                case 2: {
                        message.signingCertificate = reader.bytes();
                        break;
                    }
                case 3: {
                        message.signingCertificateFilename = reader.string();
                        break;
                    }
                case 4: {
                        message.signingCertificatePassword = reader.string();
                        break;
                    }
                case 5: {
                        message.signingKeyPassword = reader.string();
                        break;
                    }
                case 6: {
                        message.signingCertificateFormat = reader.int32();
                        break;
                    }
                case 7: {
                        message.automatorPublicKey = reader.bytes();
                        break;
                    }
                case 8: {
                        message.config = reader.bytes();
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
         * Decodes a NotInitializedResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.NotInitializedResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.NotInitializedResponse} NotInitializedResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NotInitializedResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NotInitializedResponse message.
         * @function verify
         * @memberof Automator.NotInitializedResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NotInitializedResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorTransmissionKey != null && Object.hasOwnProperty.call(message, "automatorTransmissionKey"))
                if (!(message.automatorTransmissionKey && typeof message.automatorTransmissionKey.length === "number" || $util.isString(message.automatorTransmissionKey)))
                    return "automatorTransmissionKey: buffer expected";
            if (message.signingCertificate != null && Object.hasOwnProperty.call(message, "signingCertificate"))
                if (!(message.signingCertificate && typeof message.signingCertificate.length === "number" || $util.isString(message.signingCertificate)))
                    return "signingCertificate: buffer expected";
            if (message.signingCertificateFilename != null && Object.hasOwnProperty.call(message, "signingCertificateFilename"))
                if (!$util.isString(message.signingCertificateFilename))
                    return "signingCertificateFilename: string expected";
            if (message.signingCertificatePassword != null && Object.hasOwnProperty.call(message, "signingCertificatePassword"))
                if (!$util.isString(message.signingCertificatePassword))
                    return "signingCertificatePassword: string expected";
            if (message.signingKeyPassword != null && Object.hasOwnProperty.call(message, "signingKeyPassword"))
                if (!$util.isString(message.signingKeyPassword))
                    return "signingKeyPassword: string expected";
            if (message.signingCertificateFormat != null && Object.hasOwnProperty.call(message, "signingCertificateFormat"))
                switch (message.signingCertificateFormat) {
                default:
                    return "signingCertificateFormat: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.automatorPublicKey != null && Object.hasOwnProperty.call(message, "automatorPublicKey"))
                if (!(message.automatorPublicKey && typeof message.automatorPublicKey.length === "number" || $util.isString(message.automatorPublicKey)))
                    return "automatorPublicKey: buffer expected";
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                if (!(message.config && typeof message.config.length === "number" || $util.isString(message.config)))
                    return "config: buffer expected";
            return null;
        };

        /**
         * Creates a NotInitializedResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.NotInitializedResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.NotInitializedResponse} NotInitializedResponse
         */
        NotInitializedResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.NotInitializedResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.NotInitializedResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.NotInitializedResponse();
            if (object.automatorTransmissionKey != null)
                if (typeof object.automatorTransmissionKey === "string")
                    $util.base64.decode(object.automatorTransmissionKey, message.automatorTransmissionKey = $util.newBuffer($util.base64.length(object.automatorTransmissionKey)), 0);
                else if (object.automatorTransmissionKey.length >= 0)
                    message.automatorTransmissionKey = object.automatorTransmissionKey;
            if (object.signingCertificate != null)
                if (typeof object.signingCertificate === "string")
                    $util.base64.decode(object.signingCertificate, message.signingCertificate = $util.newBuffer($util.base64.length(object.signingCertificate)), 0);
                else if (object.signingCertificate.length >= 0)
                    message.signingCertificate = object.signingCertificate;
            if (object.signingCertificateFilename != null)
                message.signingCertificateFilename = String(object.signingCertificateFilename);
            if (object.signingCertificatePassword != null)
                message.signingCertificatePassword = String(object.signingCertificatePassword);
            if (object.signingKeyPassword != null)
                message.signingKeyPassword = String(object.signingKeyPassword);
            switch (object.signingCertificateFormat) {
            default:
                if (typeof object.signingCertificateFormat === "number") {
                    message.signingCertificateFormat = object.signingCertificateFormat;
                    break;
                }
                break;
            case "UNKNOWN_FORMAT":
            case 0:
                message.signingCertificateFormat = 0;
                break;
            case "PKCS12":
            case 1:
                message.signingCertificateFormat = 1;
                break;
            case "JKS":
            case 2:
                message.signingCertificateFormat = 2;
                break;
            }
            if (object.automatorPublicKey != null)
                if (typeof object.automatorPublicKey === "string")
                    $util.base64.decode(object.automatorPublicKey, message.automatorPublicKey = $util.newBuffer($util.base64.length(object.automatorPublicKey)), 0);
                else if (object.automatorPublicKey.length >= 0)
                    message.automatorPublicKey = object.automatorPublicKey;
            if (object.config != null)
                if (typeof object.config === "string")
                    $util.base64.decode(object.config, message.config = $util.newBuffer($util.base64.length(object.config)), 0);
                else if (object.config.length >= 0)
                    message.config = object.config;
            return message;
        };

        /**
         * Creates a plain object from a NotInitializedResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.NotInitializedResponse
         * @static
         * @param {Automator.NotInitializedResponse} message NotInitializedResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NotInitializedResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.automatorTransmissionKey = "";
                else {
                    object.automatorTransmissionKey = [];
                    if (options.bytes !== Array)
                        object.automatorTransmissionKey = $util.newBuffer(object.automatorTransmissionKey);
                }
                if (options.bytes === String)
                    object.signingCertificate = "";
                else {
                    object.signingCertificate = [];
                    if (options.bytes !== Array)
                        object.signingCertificate = $util.newBuffer(object.signingCertificate);
                }
                object.signingCertificateFilename = "";
                object.signingCertificatePassword = "";
                object.signingKeyPassword = "";
                object.signingCertificateFormat = options.enums === String ? "UNKNOWN_FORMAT" : 0;
                if (options.bytes === String)
                    object.automatorPublicKey = "";
                else {
                    object.automatorPublicKey = [];
                    if (options.bytes !== Array)
                        object.automatorPublicKey = $util.newBuffer(object.automatorPublicKey);
                }
                if (options.bytes === String)
                    object.config = "";
                else {
                    object.config = [];
                    if (options.bytes !== Array)
                        object.config = $util.newBuffer(object.config);
                }
            }
            if (message.automatorTransmissionKey != null && Object.hasOwnProperty.call(message, "automatorTransmissionKey"))
                object.automatorTransmissionKey = options.bytes === String ? $util.base64.encode(message.automatorTransmissionKey, 0, message.automatorTransmissionKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.automatorTransmissionKey) : message.automatorTransmissionKey;
            if (message.signingCertificate != null && Object.hasOwnProperty.call(message, "signingCertificate"))
                object.signingCertificate = options.bytes === String ? $util.base64.encode(message.signingCertificate, 0, message.signingCertificate.length) : options.bytes === Array ? Array.prototype.slice.call(message.signingCertificate) : message.signingCertificate;
            if (message.signingCertificateFilename != null && Object.hasOwnProperty.call(message, "signingCertificateFilename"))
                object.signingCertificateFilename = message.signingCertificateFilename;
            if (message.signingCertificatePassword != null && Object.hasOwnProperty.call(message, "signingCertificatePassword"))
                object.signingCertificatePassword = message.signingCertificatePassword;
            if (message.signingKeyPassword != null && Object.hasOwnProperty.call(message, "signingKeyPassword"))
                object.signingKeyPassword = message.signingKeyPassword;
            if (message.signingCertificateFormat != null && Object.hasOwnProperty.call(message, "signingCertificateFormat"))
                object.signingCertificateFormat = options.enums === String ? $root.Automator.CertificateFormat[message.signingCertificateFormat] === undefined ? message.signingCertificateFormat : $root.Automator.CertificateFormat[message.signingCertificateFormat] : message.signingCertificateFormat;
            if (message.automatorPublicKey != null && Object.hasOwnProperty.call(message, "automatorPublicKey"))
                object.automatorPublicKey = options.bytes === String ? $util.base64.encode(message.automatorPublicKey, 0, message.automatorPublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.automatorPublicKey) : message.automatorPublicKey;
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                object.config = options.bytes === String ? $util.base64.encode(message.config, 0, message.config.length) : options.bytes === Array ? Array.prototype.slice.call(message.config) : message.config;
            return object;
        };

        /**
         * Converts this NotInitializedResponse to JSON.
         * @function toJSON
         * @memberof Automator.NotInitializedResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NotInitializedResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NotInitializedResponse
         * @function getTypeUrl
         * @memberof Automator.NotInitializedResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NotInitializedResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.NotInitializedResponse";
        };

        return NotInitializedResponse;
    })();

    Automator.AutomatorResponse = (function() {

        /**
         * Properties of an AutomatorResponse.
         * @memberof Automator
         * @interface IAutomatorResponse
         * @property {number|null} [automatorId] AutomatorResponse automatorId
         * @property {boolean|null} [enabled] AutomatorResponse enabled
         * @property {number|null} [timestamp] AutomatorResponse timestamp
         * @property {Automator.IApproveDeviceResponse|null} [approveDevice] AutomatorResponse approveDevice
         * @property {Automator.IStatusResponse|null} [status] AutomatorResponse status
         * @property {Automator.INotInitializedResponse|null} [notInitialized] AutomatorResponse notInitialized
         * @property {Automator.IErrorResponse|null} [error] AutomatorResponse error
         * @property {Automator.IApproveTeamsForUserResponse|null} [approveTeamsForUser] AutomatorResponse approveTeamsForUser
         * @property {Automator.IApproveTeamsResponse|null} [approveTeams] AutomatorResponse approveTeams
         * @property {Automator.AutomatorState|null} [automatorState] AutomatorResponse automatorState
         * @property {Uint8Array|null} [automatorPublicEccKey] AutomatorResponse automatorPublicEccKey
         * @property {SemanticVersion.IVersion|null} [version] AutomatorResponse version
         */

        /**
         * Constructs a new AutomatorResponse.
         * @memberof Automator
         * @classdesc AutomatorResponse
         * This is always the response to an API request.
         * Just as in a Keeperapp client, it is encrypted with the one-time transmissionKey sent with the ApiRequest.
         * @implements IAutomatorResponse
         * @constructor
         * @param {Automator.IAutomatorResponse=} [properties] Properties to set
         */
        function AutomatorResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AutomatorResponse automatorId.
         * @member {number} automatorId
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AutomatorResponse enabled.
         * @member {boolean} enabled
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.enabled = false;

        /**
         * AutomatorResponse timestamp.
         * @member {number} timestamp
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AutomatorResponse approveDevice.
         * @member {Automator.IApproveDeviceResponse|null|undefined} approveDevice
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.approveDevice = null;

        /**
         * AutomatorResponse status.
         * @member {Automator.IStatusResponse|null|undefined} status
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.status = null;

        /**
         * AutomatorResponse notInitialized.
         * @member {Automator.INotInitializedResponse|null|undefined} notInitialized
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.notInitialized = null;

        /**
         * AutomatorResponse error.
         * @member {Automator.IErrorResponse|null|undefined} error
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.error = null;

        /**
         * AutomatorResponse approveTeamsForUser.
         * @member {Automator.IApproveTeamsForUserResponse|null|undefined} approveTeamsForUser
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.approveTeamsForUser = null;

        /**
         * AutomatorResponse approveTeams.
         * @member {Automator.IApproveTeamsResponse|null|undefined} approveTeams
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.approveTeams = null;

        /**
         * AutomatorResponse automatorState.
         * @member {Automator.AutomatorState} automatorState
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.automatorState = 0;

        /**
         * AutomatorResponse automatorPublicEccKey.
         * @member {Uint8Array} automatorPublicEccKey
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.automatorPublicEccKey = $util.newBuffer([]);

        /**
         * AutomatorResponse version.
         * @member {SemanticVersion.IVersion|null|undefined} version
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        AutomatorResponse.prototype.version = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * AutomatorResponse response.
         * @member {"approveDevice"|"status"|"notInitialized"|"error"|"approveTeamsForUser"|"approveTeams"|undefined} response
         * @memberof Automator.AutomatorResponse
         * @instance
         */
        Object.defineProperty(AutomatorResponse.prototype, "response", {
            get: $util.oneOfGetter($oneOfFields = ["approveDevice", "status", "notInitialized", "error", "approveTeamsForUser", "approveTeams"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new AutomatorResponse instance using the specified properties.
         * @function create
         * @memberof Automator.AutomatorResponse
         * @static
         * @param {Automator.IAutomatorResponse=} [properties] Properties to set
         * @returns {Automator.AutomatorResponse} AutomatorResponse instance
         */
        AutomatorResponse.create = function create(properties) {
            return new AutomatorResponse(properties);
        };

        /**
         * Encodes the specified AutomatorResponse message. Does not implicitly {@link Automator.AutomatorResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.AutomatorResponse
         * @static
         * @param {Automator.IAutomatorResponse} message AutomatorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutomatorResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.enabled);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
            if (message.approveDevice != null && Object.hasOwnProperty.call(message, "approveDevice"))
                $root.Automator.ApproveDeviceResponse.encode(message.approveDevice, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                $root.Automator.StatusResponse.encode(message.status, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            if (message.notInitialized != null && Object.hasOwnProperty.call(message, "notInitialized"))
                $root.Automator.NotInitializedResponse.encode(message.notInitialized, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.Automator.ErrorResponse.encode(message.error, writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.automatorState);
            if (message.automatorPublicEccKey != null && Object.hasOwnProperty.call(message, "automatorPublicEccKey"))
                writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.automatorPublicEccKey);
            if (message.approveTeamsForUser != null && Object.hasOwnProperty.call(message, "approveTeamsForUser"))
                $root.Automator.ApproveTeamsForUserResponse.encode(message.approveTeamsForUser, writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
            if (message.approveTeams != null && Object.hasOwnProperty.call(message, "approveTeams"))
                $root.Automator.ApproveTeamsResponse.encode(message.approveTeams, writer.uint32(/* id 11, wireType 2 =*/90).fork(), q + 1).ldelim();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                $root.SemanticVersion.Version.encode(message.version, writer.uint32(/* id 12, wireType 2 =*/98).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AutomatorResponse message, length delimited. Does not implicitly {@link Automator.AutomatorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AutomatorResponse
         * @static
         * @param {Automator.IAutomatorResponse} message AutomatorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutomatorResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AutomatorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AutomatorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AutomatorResponse} AutomatorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutomatorResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AutomatorResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.enabled = reader.bool();
                        break;
                    }
                case 3: {
                        message.timestamp = reader.int64();
                        break;
                    }
                case 4: {
                        message.approveDevice = $root.Automator.ApproveDeviceResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 5: {
                        message.status = $root.Automator.StatusResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 6: {
                        message.notInitialized = $root.Automator.NotInitializedResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 7: {
                        message.error = $root.Automator.ErrorResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 10: {
                        message.approveTeamsForUser = $root.Automator.ApproveTeamsForUserResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 11: {
                        message.approveTeams = $root.Automator.ApproveTeamsResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 8: {
                        message.automatorState = reader.int32();
                        break;
                    }
                case 9: {
                        message.automatorPublicEccKey = reader.bytes();
                        break;
                    }
                case 12: {
                        message.version = $root.SemanticVersion.Version.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Decodes an AutomatorResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AutomatorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AutomatorResponse} AutomatorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutomatorResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AutomatorResponse message.
         * @function verify
         * @memberof Automator.AutomatorResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AutomatorResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            let properties = {};
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                if (typeof message.enabled !== "boolean")
                    return "enabled: boolean expected";
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.approveDevice != null && Object.hasOwnProperty.call(message, "approveDevice")) {
                properties.response = 1;
                {
                    let error = $root.Automator.ApproveDeviceResponse.verify(message.approveDevice, long + 1);
                    if (error)
                        return "approveDevice." + error;
                }
            }
            if (message.status != null && Object.hasOwnProperty.call(message, "status")) {
                if (properties.response === 1)
                    return "response: multiple values";
                properties.response = 1;
                {
                    let error = $root.Automator.StatusResponse.verify(message.status, long + 1);
                    if (error)
                        return "status." + error;
                }
            }
            if (message.notInitialized != null && Object.hasOwnProperty.call(message, "notInitialized")) {
                if (properties.response === 1)
                    return "response: multiple values";
                properties.response = 1;
                {
                    let error = $root.Automator.NotInitializedResponse.verify(message.notInitialized, long + 1);
                    if (error)
                        return "notInitialized." + error;
                }
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                if (properties.response === 1)
                    return "response: multiple values";
                properties.response = 1;
                {
                    let error = $root.Automator.ErrorResponse.verify(message.error, long + 1);
                    if (error)
                        return "error." + error;
                }
            }
            if (message.approveTeamsForUser != null && Object.hasOwnProperty.call(message, "approveTeamsForUser")) {
                if (properties.response === 1)
                    return "response: multiple values";
                properties.response = 1;
                {
                    let error = $root.Automator.ApproveTeamsForUserResponse.verify(message.approveTeamsForUser, long + 1);
                    if (error)
                        return "approveTeamsForUser." + error;
                }
            }
            if (message.approveTeams != null && Object.hasOwnProperty.call(message, "approveTeams")) {
                if (properties.response === 1)
                    return "response: multiple values";
                properties.response = 1;
                {
                    let error = $root.Automator.ApproveTeamsResponse.verify(message.approveTeams, long + 1);
                    if (error)
                        return "approveTeams." + error;
                }
            }
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                switch (message.automatorState) {
                default:
                    return "automatorState: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.automatorPublicEccKey != null && Object.hasOwnProperty.call(message, "automatorPublicEccKey"))
                if (!(message.automatorPublicEccKey && typeof message.automatorPublicEccKey.length === "number" || $util.isString(message.automatorPublicEccKey)))
                    return "automatorPublicEccKey: buffer expected";
            if (message.version != null && Object.hasOwnProperty.call(message, "version")) {
                let error = $root.SemanticVersion.Version.verify(message.version, long + 1);
                if (error)
                    return "version." + error;
            }
            return null;
        };

        /**
         * Creates an AutomatorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AutomatorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AutomatorResponse} AutomatorResponse
         */
        AutomatorResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AutomatorResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AutomatorResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AutomatorResponse();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            if (object.enabled != null)
                message.enabled = Boolean(object.enabled);
            if (object.timestamp != null)
                if ($util.Long)
                    message.timestamp = $util.Long.fromValue(object.timestamp, false);
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.approveDevice != null) {
                if (!$util.isObject(object.approveDevice))
                    throw TypeError(".Automator.AutomatorResponse.approveDevice: object expected");
                message.approveDevice = $root.Automator.ApproveDeviceResponse.fromObject(object.approveDevice, long + 1);
            }
            if (object.status != null) {
                if (!$util.isObject(object.status))
                    throw TypeError(".Automator.AutomatorResponse.status: object expected");
                message.status = $root.Automator.StatusResponse.fromObject(object.status, long + 1);
            }
            if (object.notInitialized != null) {
                if (!$util.isObject(object.notInitialized))
                    throw TypeError(".Automator.AutomatorResponse.notInitialized: object expected");
                message.notInitialized = $root.Automator.NotInitializedResponse.fromObject(object.notInitialized, long + 1);
            }
            if (object.error != null) {
                if (!$util.isObject(object.error))
                    throw TypeError(".Automator.AutomatorResponse.error: object expected");
                message.error = $root.Automator.ErrorResponse.fromObject(object.error, long + 1);
            }
            if (object.approveTeamsForUser != null) {
                if (!$util.isObject(object.approveTeamsForUser))
                    throw TypeError(".Automator.AutomatorResponse.approveTeamsForUser: object expected");
                message.approveTeamsForUser = $root.Automator.ApproveTeamsForUserResponse.fromObject(object.approveTeamsForUser, long + 1);
            }
            if (object.approveTeams != null) {
                if (!$util.isObject(object.approveTeams))
                    throw TypeError(".Automator.AutomatorResponse.approveTeams: object expected");
                message.approveTeams = $root.Automator.ApproveTeamsResponse.fromObject(object.approveTeams, long + 1);
            }
            switch (object.automatorState) {
            default:
                if (typeof object.automatorState === "number") {
                    message.automatorState = object.automatorState;
                    break;
                }
                break;
            case "UNKNOWN_STATE":
            case 0:
                message.automatorState = 0;
                break;
            case "RUNNING":
            case 1:
                message.automatorState = 1;
                break;
            case "ERROR":
            case 2:
                message.automatorState = 2;
                break;
            case "NEEDS_INITIALIZATION":
            case 3:
                message.automatorState = 3;
                break;
            case "NEEDS_CRYPTO_STEP_1":
            case 4:
                message.automatorState = 4;
                break;
            case "NEEDS_CRYPTO_STEP_2":
            case 5:
                message.automatorState = 5;
                break;
            }
            if (object.automatorPublicEccKey != null)
                if (typeof object.automatorPublicEccKey === "string")
                    $util.base64.decode(object.automatorPublicEccKey, message.automatorPublicEccKey = $util.newBuffer($util.base64.length(object.automatorPublicEccKey)), 0);
                else if (object.automatorPublicEccKey.length >= 0)
                    message.automatorPublicEccKey = object.automatorPublicEccKey;
            if (object.version != null) {
                if (!$util.isObject(object.version))
                    throw TypeError(".Automator.AutomatorResponse.version: object expected");
                message.version = $root.SemanticVersion.Version.fromObject(object.version, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AutomatorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AutomatorResponse
         * @static
         * @param {Automator.AutomatorResponse} message AutomatorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AutomatorResponse.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.enabled = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.automatorState = options.enums === String ? "UNKNOWN_STATE" : 0;
                if (options.bytes === String)
                    object.automatorPublicEccKey = "";
                else {
                    object.automatorPublicEccKey = [];
                    if (options.bytes !== Array)
                        object.automatorPublicEccKey = $util.newBuffer(object.automatorPublicEccKey);
                }
                object.version = null;
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                object.enabled = message.enabled;
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.timestamp = typeof message.timestamp === "number" ? BigInt(message.timestamp) : $util.Long.fromBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0, false).toBigInt();
                else if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.approveDevice != null && Object.hasOwnProperty.call(message, "approveDevice")) {
                object.approveDevice = $root.Automator.ApproveDeviceResponse.toObject(message.approveDevice, options, q + 1);
                if (options.oneofs)
                    object.response = "approveDevice";
            }
            if (message.status != null && Object.hasOwnProperty.call(message, "status")) {
                object.status = $root.Automator.StatusResponse.toObject(message.status, options, q + 1);
                if (options.oneofs)
                    object.response = "status";
            }
            if (message.notInitialized != null && Object.hasOwnProperty.call(message, "notInitialized")) {
                object.notInitialized = $root.Automator.NotInitializedResponse.toObject(message.notInitialized, options, q + 1);
                if (options.oneofs)
                    object.response = "notInitialized";
            }
            if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                object.error = $root.Automator.ErrorResponse.toObject(message.error, options, q + 1);
                if (options.oneofs)
                    object.response = "error";
            }
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                object.automatorState = options.enums === String ? $root.Automator.AutomatorState[message.automatorState] === undefined ? message.automatorState : $root.Automator.AutomatorState[message.automatorState] : message.automatorState;
            if (message.automatorPublicEccKey != null && Object.hasOwnProperty.call(message, "automatorPublicEccKey"))
                object.automatorPublicEccKey = options.bytes === String ? $util.base64.encode(message.automatorPublicEccKey, 0, message.automatorPublicEccKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.automatorPublicEccKey) : message.automatorPublicEccKey;
            if (message.approveTeamsForUser != null && Object.hasOwnProperty.call(message, "approveTeamsForUser")) {
                object.approveTeamsForUser = $root.Automator.ApproveTeamsForUserResponse.toObject(message.approveTeamsForUser, options, q + 1);
                if (options.oneofs)
                    object.response = "approveTeamsForUser";
            }
            if (message.approveTeams != null && Object.hasOwnProperty.call(message, "approveTeams")) {
                object.approveTeams = $root.Automator.ApproveTeamsResponse.toObject(message.approveTeams, options, q + 1);
                if (options.oneofs)
                    object.response = "approveTeams";
            }
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                object.version = $root.SemanticVersion.Version.toObject(message.version, options, q + 1);
            return object;
        };

        /**
         * Converts this AutomatorResponse to JSON.
         * @function toJSON
         * @memberof Automator.AutomatorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AutomatorResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AutomatorResponse
         * @function getTypeUrl
         * @memberof Automator.AutomatorResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AutomatorResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AutomatorResponse";
        };

        return AutomatorResponse;
    })();

    Automator.ApproveDeviceResponse = (function() {

        /**
         * Properties of an ApproveDeviceResponse.
         * @memberof Automator
         * @interface IApproveDeviceResponse
         * @property {boolean|null} [approved] ApproveDeviceResponse approved
         * @property {Uint8Array|null} [encryptedUserDataKey] ApproveDeviceResponse encryptedUserDataKey
         * @property {string|null} [message] ApproveDeviceResponse message
         * @property {Enterprise.EncryptedKeyType|null} [encryptedUserDataKeyType] ApproveDeviceResponse encryptedUserDataKeyType
         */

        /**
         * Constructs a new ApproveDeviceResponse.
         * @memberof Automator
         * @classdesc ApproveDeviceResponse
         * Includes information about whether the device was approved or not.
         * There will be a message in the 'message' field of the AutomatorResponse if the device was not approved.
         * @implements IApproveDeviceResponse
         * @constructor
         * @param {Automator.IApproveDeviceResponse=} [properties] Properties to set
         */
        function ApproveDeviceResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApproveDeviceResponse approved.
         * @member {boolean} approved
         * @memberof Automator.ApproveDeviceResponse
         * @instance
         */
        ApproveDeviceResponse.prototype.approved = false;

        /**
         * ApproveDeviceResponse encryptedUserDataKey.
         * @member {Uint8Array} encryptedUserDataKey
         * @memberof Automator.ApproveDeviceResponse
         * @instance
         */
        ApproveDeviceResponse.prototype.encryptedUserDataKey = $util.newBuffer([]);

        /**
         * ApproveDeviceResponse message.
         * @member {string} message
         * @memberof Automator.ApproveDeviceResponse
         * @instance
         */
        ApproveDeviceResponse.prototype.message = "";

        /**
         * ApproveDeviceResponse encryptedUserDataKeyType.
         * @member {Enterprise.EncryptedKeyType} encryptedUserDataKeyType
         * @memberof Automator.ApproveDeviceResponse
         * @instance
         */
        ApproveDeviceResponse.prototype.encryptedUserDataKeyType = 0;

        /**
         * Creates a new ApproveDeviceResponse instance using the specified properties.
         * @function create
         * @memberof Automator.ApproveDeviceResponse
         * @static
         * @param {Automator.IApproveDeviceResponse=} [properties] Properties to set
         * @returns {Automator.ApproveDeviceResponse} ApproveDeviceResponse instance
         */
        ApproveDeviceResponse.create = function create(properties) {
            return new ApproveDeviceResponse(properties);
        };

        /**
         * Encodes the specified ApproveDeviceResponse message. Does not implicitly {@link Automator.ApproveDeviceResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.ApproveDeviceResponse
         * @static
         * @param {Automator.IApproveDeviceResponse} message ApproveDeviceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveDeviceResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.approved);
            if (message.encryptedUserDataKey != null && Object.hasOwnProperty.call(message, "encryptedUserDataKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.encryptedUserDataKey);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            if (message.encryptedUserDataKeyType != null && Object.hasOwnProperty.call(message, "encryptedUserDataKeyType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.encryptedUserDataKeyType);
            return writer;
        };

        /**
         * Encodes the specified ApproveDeviceResponse message, length delimited. Does not implicitly {@link Automator.ApproveDeviceResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.ApproveDeviceResponse
         * @static
         * @param {Automator.IApproveDeviceResponse} message ApproveDeviceResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveDeviceResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApproveDeviceResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.ApproveDeviceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.ApproveDeviceResponse} ApproveDeviceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveDeviceResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.ApproveDeviceResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.approved = reader.bool();
                        break;
                    }
                case 2: {
                        message.encryptedUserDataKey = reader.bytes();
                        break;
                    }
                case 3: {
                        message.message = reader.string();
                        break;
                    }
                case 4: {
                        message.encryptedUserDataKeyType = reader.int32();
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
         * Decodes an ApproveDeviceResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.ApproveDeviceResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.ApproveDeviceResponse} ApproveDeviceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveDeviceResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApproveDeviceResponse message.
         * @function verify
         * @memberof Automator.ApproveDeviceResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApproveDeviceResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                if (typeof message.approved !== "boolean")
                    return "approved: boolean expected";
            if (message.encryptedUserDataKey != null && Object.hasOwnProperty.call(message, "encryptedUserDataKey"))
                if (!(message.encryptedUserDataKey && typeof message.encryptedUserDataKey.length === "number" || $util.isString(message.encryptedUserDataKey)))
                    return "encryptedUserDataKey: buffer expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.encryptedUserDataKeyType != null && Object.hasOwnProperty.call(message, "encryptedUserDataKeyType"))
                switch (message.encryptedUserDataKeyType) {
                default:
                    return "encryptedUserDataKeyType: enum value expected";
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
         * Creates an ApproveDeviceResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.ApproveDeviceResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.ApproveDeviceResponse} ApproveDeviceResponse
         */
        ApproveDeviceResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.ApproveDeviceResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.ApproveDeviceResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.ApproveDeviceResponse();
            if (object.approved != null)
                message.approved = Boolean(object.approved);
            if (object.encryptedUserDataKey != null)
                if (typeof object.encryptedUserDataKey === "string")
                    $util.base64.decode(object.encryptedUserDataKey, message.encryptedUserDataKey = $util.newBuffer($util.base64.length(object.encryptedUserDataKey)), 0);
                else if (object.encryptedUserDataKey.length >= 0)
                    message.encryptedUserDataKey = object.encryptedUserDataKey;
            if (object.message != null)
                message.message = String(object.message);
            switch (object.encryptedUserDataKeyType) {
            default:
                if (typeof object.encryptedUserDataKeyType === "number") {
                    message.encryptedUserDataKeyType = object.encryptedUserDataKeyType;
                    break;
                }
                break;
            case "KT_NO_KEY":
            case 0:
                message.encryptedUserDataKeyType = 0;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.encryptedUserDataKeyType = 1;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.encryptedUserDataKeyType = 2;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.encryptedUserDataKeyType = 3;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.encryptedUserDataKeyType = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an ApproveDeviceResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.ApproveDeviceResponse
         * @static
         * @param {Automator.ApproveDeviceResponse} message ApproveDeviceResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApproveDeviceResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.approved = false;
                if (options.bytes === String)
                    object.encryptedUserDataKey = "";
                else {
                    object.encryptedUserDataKey = [];
                    if (options.bytes !== Array)
                        object.encryptedUserDataKey = $util.newBuffer(object.encryptedUserDataKey);
                }
                object.message = "";
                object.encryptedUserDataKeyType = options.enums === String ? "KT_NO_KEY" : 0;
            }
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                object.approved = message.approved;
            if (message.encryptedUserDataKey != null && Object.hasOwnProperty.call(message, "encryptedUserDataKey"))
                object.encryptedUserDataKey = options.bytes === String ? $util.base64.encode(message.encryptedUserDataKey, 0, message.encryptedUserDataKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedUserDataKey) : message.encryptedUserDataKey;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.encryptedUserDataKeyType != null && Object.hasOwnProperty.call(message, "encryptedUserDataKeyType"))
                object.encryptedUserDataKeyType = options.enums === String ? $root.Enterprise.EncryptedKeyType[message.encryptedUserDataKeyType] === undefined ? message.encryptedUserDataKeyType : $root.Enterprise.EncryptedKeyType[message.encryptedUserDataKeyType] : message.encryptedUserDataKeyType;
            return object;
        };

        /**
         * Converts this ApproveDeviceResponse to JSON.
         * @function toJSON
         * @memberof Automator.ApproveDeviceResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApproveDeviceResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApproveDeviceResponse
         * @function getTypeUrl
         * @memberof Automator.ApproveDeviceResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApproveDeviceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.ApproveDeviceResponse";
        };

        return ApproveDeviceResponse;
    })();

    Automator.StatusResponse = (function() {

        /**
         * Properties of a StatusResponse.
         * @memberof Automator
         * @interface IStatusResponse
         * @property {boolean|null} [initialized] StatusResponse initialized
         * @property {number|null} [enabledTimestamp] StatusResponse enabledTimestamp
         * @property {number|null} [initializedTimestamp] StatusResponse initializedTimestamp
         * @property {number|null} [updatedTimestamp] StatusResponse updatedTimestamp
         * @property {number|null} [numberOfDevicesApproved] StatusResponse numberOfDevicesApproved
         * @property {number|null} [numberOfDevicesDenied] StatusResponse numberOfDevicesDenied
         * @property {number|null} [numberOfErrors] StatusResponse numberOfErrors
         * @property {number|null} [sslCertificateExpiration] StatusResponse sslCertificateExpiration
         * @property {Automator.INotInitializedResponse|null} [notInitializedResponse] StatusResponse notInitializedResponse
         * @property {Uint8Array|null} [config] StatusResponse config
         * @property {number|null} [numberOfTeamMembershipsApproved] StatusResponse numberOfTeamMembershipsApproved
         * @property {number|null} [numberOfTeamMembershipsDenied] StatusResponse numberOfTeamMembershipsDenied
         * @property {number|null} [numberOfTeamsApproved] StatusResponse numberOfTeamsApproved
         * @property {number|null} [numberOfTeamsDenied] StatusResponse numberOfTeamsDenied
         * @property {Array.<Automator.ISSLCertificateInfo>|null} [sslCertificateInfo] StatusResponse sslCertificateInfo
         */

        /**
         * Constructs a new StatusResponse.
         * @memberof Automator
         * @classdesc StatusResponse
         * Includes information about the status of the Automator instance, if it has been initialized.
         * There will be a message in the 'message' field of the AutomatorResponse if there was an internal error.
         * If this is in response to an 'initializeRequest' message it will contain a NotInitializedResponse that
         * contains information about the signing certificate used by the Automator.
         * @implements IStatusResponse
         * @constructor
         * @param {Automator.IStatusResponse=} [properties] Properties to set
         */
        function StatusResponse(properties) {
            this.sslCertificateInfo = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StatusResponse initialized.
         * @member {boolean} initialized
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.initialized = false;

        /**
         * StatusResponse enabledTimestamp.
         * @member {number} enabledTimestamp
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.enabledTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse initializedTimestamp.
         * @member {number} initializedTimestamp
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.initializedTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse updatedTimestamp.
         * @member {number} updatedTimestamp
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.updatedTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse numberOfDevicesApproved.
         * @member {number} numberOfDevicesApproved
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.numberOfDevicesApproved = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse numberOfDevicesDenied.
         * @member {number} numberOfDevicesDenied
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.numberOfDevicesDenied = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse numberOfErrors.
         * @member {number} numberOfErrors
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.numberOfErrors = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse sslCertificateExpiration.
         * @member {number} sslCertificateExpiration
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.sslCertificateExpiration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse notInitializedResponse.
         * @member {Automator.INotInitializedResponse|null|undefined} notInitializedResponse
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.notInitializedResponse = null;

        /**
         * StatusResponse config.
         * @member {Uint8Array} config
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.config = $util.newBuffer([]);

        /**
         * StatusResponse numberOfTeamMembershipsApproved.
         * @member {number} numberOfTeamMembershipsApproved
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.numberOfTeamMembershipsApproved = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse numberOfTeamMembershipsDenied.
         * @member {number} numberOfTeamMembershipsDenied
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.numberOfTeamMembershipsDenied = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse numberOfTeamsApproved.
         * @member {number} numberOfTeamsApproved
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.numberOfTeamsApproved = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse numberOfTeamsDenied.
         * @member {number} numberOfTeamsDenied
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.numberOfTeamsDenied = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * StatusResponse sslCertificateInfo.
         * @member {Array.<Automator.ISSLCertificateInfo>} sslCertificateInfo
         * @memberof Automator.StatusResponse
         * @instance
         */
        StatusResponse.prototype.sslCertificateInfo = $util.emptyArray;

        /**
         * Creates a new StatusResponse instance using the specified properties.
         * @function create
         * @memberof Automator.StatusResponse
         * @static
         * @param {Automator.IStatusResponse=} [properties] Properties to set
         * @returns {Automator.StatusResponse} StatusResponse instance
         */
        StatusResponse.create = function create(properties) {
            return new StatusResponse(properties);
        };

        /**
         * Encodes the specified StatusResponse message. Does not implicitly {@link Automator.StatusResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.StatusResponse
         * @static
         * @param {Automator.IStatusResponse} message StatusResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StatusResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.initialized != null && Object.hasOwnProperty.call(message, "initialized"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.initialized);
            if (message.enabledTimestamp != null && Object.hasOwnProperty.call(message, "enabledTimestamp"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.enabledTimestamp);
            if (message.initializedTimestamp != null && Object.hasOwnProperty.call(message, "initializedTimestamp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.initializedTimestamp);
            if (message.updatedTimestamp != null && Object.hasOwnProperty.call(message, "updatedTimestamp"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.updatedTimestamp);
            if (message.numberOfDevicesApproved != null && Object.hasOwnProperty.call(message, "numberOfDevicesApproved"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.numberOfDevicesApproved);
            if (message.numberOfDevicesDenied != null && Object.hasOwnProperty.call(message, "numberOfDevicesDenied"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.numberOfDevicesDenied);
            if (message.numberOfErrors != null && Object.hasOwnProperty.call(message, "numberOfErrors"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.numberOfErrors);
            if (message.sslCertificateExpiration != null && Object.hasOwnProperty.call(message, "sslCertificateExpiration"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.sslCertificateExpiration);
            if (message.notInitializedResponse != null && Object.hasOwnProperty.call(message, "notInitializedResponse"))
                $root.Automator.NotInitializedResponse.encode(message.notInitializedResponse, writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.config);
            if (message.numberOfTeamMembershipsApproved != null && Object.hasOwnProperty.call(message, "numberOfTeamMembershipsApproved"))
                writer.uint32(/* id 11, wireType 0 =*/88).int64(message.numberOfTeamMembershipsApproved);
            if (message.numberOfTeamMembershipsDenied != null && Object.hasOwnProperty.call(message, "numberOfTeamMembershipsDenied"))
                writer.uint32(/* id 12, wireType 0 =*/96).int64(message.numberOfTeamMembershipsDenied);
            if (message.numberOfTeamsApproved != null && Object.hasOwnProperty.call(message, "numberOfTeamsApproved"))
                writer.uint32(/* id 13, wireType 0 =*/104).int64(message.numberOfTeamsApproved);
            if (message.numberOfTeamsDenied != null && Object.hasOwnProperty.call(message, "numberOfTeamsDenied"))
                writer.uint32(/* id 14, wireType 0 =*/112).int64(message.numberOfTeamsDenied);
            if (message.sslCertificateInfo != null && message.sslCertificateInfo.length)
                for (let i = 0; i < message.sslCertificateInfo.length; ++i)
                    $root.Automator.SSLCertificateInfo.encode(message.sslCertificateInfo[i], writer.uint32(/* id 15, wireType 2 =*/122).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified StatusResponse message, length delimited. Does not implicitly {@link Automator.StatusResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.StatusResponse
         * @static
         * @param {Automator.IStatusResponse} message StatusResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StatusResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a StatusResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.StatusResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.StatusResponse} StatusResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StatusResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.StatusResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.initialized = reader.bool();
                        break;
                    }
                case 2: {
                        message.enabledTimestamp = reader.int64();
                        break;
                    }
                case 3: {
                        message.initializedTimestamp = reader.int64();
                        break;
                    }
                case 4: {
                        message.updatedTimestamp = reader.int64();
                        break;
                    }
                case 5: {
                        message.numberOfDevicesApproved = reader.int64();
                        break;
                    }
                case 6: {
                        message.numberOfDevicesDenied = reader.int64();
                        break;
                    }
                case 7: {
                        message.numberOfErrors = reader.int64();
                        break;
                    }
                case 8: {
                        message.sslCertificateExpiration = reader.int64();
                        break;
                    }
                case 9: {
                        message.notInitializedResponse = $root.Automator.NotInitializedResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 10: {
                        message.config = reader.bytes();
                        break;
                    }
                case 11: {
                        message.numberOfTeamMembershipsApproved = reader.int64();
                        break;
                    }
                case 12: {
                        message.numberOfTeamMembershipsDenied = reader.int64();
                        break;
                    }
                case 13: {
                        message.numberOfTeamsApproved = reader.int64();
                        break;
                    }
                case 14: {
                        message.numberOfTeamsDenied = reader.int64();
                        break;
                    }
                case 15: {
                        if (!(message.sslCertificateInfo && message.sslCertificateInfo.length))
                            message.sslCertificateInfo = [];
                        message.sslCertificateInfo.push($root.Automator.SSLCertificateInfo.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a StatusResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.StatusResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.StatusResponse} StatusResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StatusResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StatusResponse message.
         * @function verify
         * @memberof Automator.StatusResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StatusResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.initialized != null && Object.hasOwnProperty.call(message, "initialized"))
                if (typeof message.initialized !== "boolean")
                    return "initialized: boolean expected";
            if (message.enabledTimestamp != null && Object.hasOwnProperty.call(message, "enabledTimestamp"))
                if (!$util.isInteger(message.enabledTimestamp) && !(message.enabledTimestamp && $util.isInteger(message.enabledTimestamp.low) && $util.isInteger(message.enabledTimestamp.high)))
                    return "enabledTimestamp: integer|Long expected";
            if (message.initializedTimestamp != null && Object.hasOwnProperty.call(message, "initializedTimestamp"))
                if (!$util.isInteger(message.initializedTimestamp) && !(message.initializedTimestamp && $util.isInteger(message.initializedTimestamp.low) && $util.isInteger(message.initializedTimestamp.high)))
                    return "initializedTimestamp: integer|Long expected";
            if (message.updatedTimestamp != null && Object.hasOwnProperty.call(message, "updatedTimestamp"))
                if (!$util.isInteger(message.updatedTimestamp) && !(message.updatedTimestamp && $util.isInteger(message.updatedTimestamp.low) && $util.isInteger(message.updatedTimestamp.high)))
                    return "updatedTimestamp: integer|Long expected";
            if (message.numberOfDevicesApproved != null && Object.hasOwnProperty.call(message, "numberOfDevicesApproved"))
                if (!$util.isInteger(message.numberOfDevicesApproved) && !(message.numberOfDevicesApproved && $util.isInteger(message.numberOfDevicesApproved.low) && $util.isInteger(message.numberOfDevicesApproved.high)))
                    return "numberOfDevicesApproved: integer|Long expected";
            if (message.numberOfDevicesDenied != null && Object.hasOwnProperty.call(message, "numberOfDevicesDenied"))
                if (!$util.isInteger(message.numberOfDevicesDenied) && !(message.numberOfDevicesDenied && $util.isInteger(message.numberOfDevicesDenied.low) && $util.isInteger(message.numberOfDevicesDenied.high)))
                    return "numberOfDevicesDenied: integer|Long expected";
            if (message.numberOfErrors != null && Object.hasOwnProperty.call(message, "numberOfErrors"))
                if (!$util.isInteger(message.numberOfErrors) && !(message.numberOfErrors && $util.isInteger(message.numberOfErrors.low) && $util.isInteger(message.numberOfErrors.high)))
                    return "numberOfErrors: integer|Long expected";
            if (message.sslCertificateExpiration != null && Object.hasOwnProperty.call(message, "sslCertificateExpiration"))
                if (!$util.isInteger(message.sslCertificateExpiration) && !(message.sslCertificateExpiration && $util.isInteger(message.sslCertificateExpiration.low) && $util.isInteger(message.sslCertificateExpiration.high)))
                    return "sslCertificateExpiration: integer|Long expected";
            if (message.notInitializedResponse != null && Object.hasOwnProperty.call(message, "notInitializedResponse")) {
                let error = $root.Automator.NotInitializedResponse.verify(message.notInitializedResponse, long + 1);
                if (error)
                    return "notInitializedResponse." + error;
            }
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                if (!(message.config && typeof message.config.length === "number" || $util.isString(message.config)))
                    return "config: buffer expected";
            if (message.numberOfTeamMembershipsApproved != null && Object.hasOwnProperty.call(message, "numberOfTeamMembershipsApproved"))
                if (!$util.isInteger(message.numberOfTeamMembershipsApproved) && !(message.numberOfTeamMembershipsApproved && $util.isInteger(message.numberOfTeamMembershipsApproved.low) && $util.isInteger(message.numberOfTeamMembershipsApproved.high)))
                    return "numberOfTeamMembershipsApproved: integer|Long expected";
            if (message.numberOfTeamMembershipsDenied != null && Object.hasOwnProperty.call(message, "numberOfTeamMembershipsDenied"))
                if (!$util.isInteger(message.numberOfTeamMembershipsDenied) && !(message.numberOfTeamMembershipsDenied && $util.isInteger(message.numberOfTeamMembershipsDenied.low) && $util.isInteger(message.numberOfTeamMembershipsDenied.high)))
                    return "numberOfTeamMembershipsDenied: integer|Long expected";
            if (message.numberOfTeamsApproved != null && Object.hasOwnProperty.call(message, "numberOfTeamsApproved"))
                if (!$util.isInteger(message.numberOfTeamsApproved) && !(message.numberOfTeamsApproved && $util.isInteger(message.numberOfTeamsApproved.low) && $util.isInteger(message.numberOfTeamsApproved.high)))
                    return "numberOfTeamsApproved: integer|Long expected";
            if (message.numberOfTeamsDenied != null && Object.hasOwnProperty.call(message, "numberOfTeamsDenied"))
                if (!$util.isInteger(message.numberOfTeamsDenied) && !(message.numberOfTeamsDenied && $util.isInteger(message.numberOfTeamsDenied.low) && $util.isInteger(message.numberOfTeamsDenied.high)))
                    return "numberOfTeamsDenied: integer|Long expected";
            if (message.sslCertificateInfo != null && Object.hasOwnProperty.call(message, "sslCertificateInfo")) {
                if (!Array.isArray(message.sslCertificateInfo))
                    return "sslCertificateInfo: array expected";
                for (let i = 0; i < message.sslCertificateInfo.length; ++i) {
                    let error = $root.Automator.SSLCertificateInfo.verify(message.sslCertificateInfo[i], long + 1);
                    if (error)
                        return "sslCertificateInfo." + error;
                }
            }
            return null;
        };

        /**
         * Creates a StatusResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.StatusResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.StatusResponse} StatusResponse
         */
        StatusResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.StatusResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.StatusResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.StatusResponse();
            if (object.initialized != null)
                message.initialized = Boolean(object.initialized);
            if (object.enabledTimestamp != null)
                if ($util.Long)
                    message.enabledTimestamp = $util.Long.fromValue(object.enabledTimestamp, false);
                else if (typeof object.enabledTimestamp === "string")
                    message.enabledTimestamp = parseInt(object.enabledTimestamp, 10);
                else if (typeof object.enabledTimestamp === "number")
                    message.enabledTimestamp = object.enabledTimestamp;
                else if (typeof object.enabledTimestamp === "object")
                    message.enabledTimestamp = new $util.LongBits(object.enabledTimestamp.low >>> 0, object.enabledTimestamp.high >>> 0).toNumber();
            if (object.initializedTimestamp != null)
                if ($util.Long)
                    message.initializedTimestamp = $util.Long.fromValue(object.initializedTimestamp, false);
                else if (typeof object.initializedTimestamp === "string")
                    message.initializedTimestamp = parseInt(object.initializedTimestamp, 10);
                else if (typeof object.initializedTimestamp === "number")
                    message.initializedTimestamp = object.initializedTimestamp;
                else if (typeof object.initializedTimestamp === "object")
                    message.initializedTimestamp = new $util.LongBits(object.initializedTimestamp.low >>> 0, object.initializedTimestamp.high >>> 0).toNumber();
            if (object.updatedTimestamp != null)
                if ($util.Long)
                    message.updatedTimestamp = $util.Long.fromValue(object.updatedTimestamp, false);
                else if (typeof object.updatedTimestamp === "string")
                    message.updatedTimestamp = parseInt(object.updatedTimestamp, 10);
                else if (typeof object.updatedTimestamp === "number")
                    message.updatedTimestamp = object.updatedTimestamp;
                else if (typeof object.updatedTimestamp === "object")
                    message.updatedTimestamp = new $util.LongBits(object.updatedTimestamp.low >>> 0, object.updatedTimestamp.high >>> 0).toNumber();
            if (object.numberOfDevicesApproved != null)
                if ($util.Long)
                    message.numberOfDevicesApproved = $util.Long.fromValue(object.numberOfDevicesApproved, false);
                else if (typeof object.numberOfDevicesApproved === "string")
                    message.numberOfDevicesApproved = parseInt(object.numberOfDevicesApproved, 10);
                else if (typeof object.numberOfDevicesApproved === "number")
                    message.numberOfDevicesApproved = object.numberOfDevicesApproved;
                else if (typeof object.numberOfDevicesApproved === "object")
                    message.numberOfDevicesApproved = new $util.LongBits(object.numberOfDevicesApproved.low >>> 0, object.numberOfDevicesApproved.high >>> 0).toNumber();
            if (object.numberOfDevicesDenied != null)
                if ($util.Long)
                    message.numberOfDevicesDenied = $util.Long.fromValue(object.numberOfDevicesDenied, false);
                else if (typeof object.numberOfDevicesDenied === "string")
                    message.numberOfDevicesDenied = parseInt(object.numberOfDevicesDenied, 10);
                else if (typeof object.numberOfDevicesDenied === "number")
                    message.numberOfDevicesDenied = object.numberOfDevicesDenied;
                else if (typeof object.numberOfDevicesDenied === "object")
                    message.numberOfDevicesDenied = new $util.LongBits(object.numberOfDevicesDenied.low >>> 0, object.numberOfDevicesDenied.high >>> 0).toNumber();
            if (object.numberOfErrors != null)
                if ($util.Long)
                    message.numberOfErrors = $util.Long.fromValue(object.numberOfErrors, false);
                else if (typeof object.numberOfErrors === "string")
                    message.numberOfErrors = parseInt(object.numberOfErrors, 10);
                else if (typeof object.numberOfErrors === "number")
                    message.numberOfErrors = object.numberOfErrors;
                else if (typeof object.numberOfErrors === "object")
                    message.numberOfErrors = new $util.LongBits(object.numberOfErrors.low >>> 0, object.numberOfErrors.high >>> 0).toNumber();
            if (object.sslCertificateExpiration != null)
                if ($util.Long)
                    message.sslCertificateExpiration = $util.Long.fromValue(object.sslCertificateExpiration, false);
                else if (typeof object.sslCertificateExpiration === "string")
                    message.sslCertificateExpiration = parseInt(object.sslCertificateExpiration, 10);
                else if (typeof object.sslCertificateExpiration === "number")
                    message.sslCertificateExpiration = object.sslCertificateExpiration;
                else if (typeof object.sslCertificateExpiration === "object")
                    message.sslCertificateExpiration = new $util.LongBits(object.sslCertificateExpiration.low >>> 0, object.sslCertificateExpiration.high >>> 0).toNumber();
            if (object.notInitializedResponse != null) {
                if (!$util.isObject(object.notInitializedResponse))
                    throw TypeError(".Automator.StatusResponse.notInitializedResponse: object expected");
                message.notInitializedResponse = $root.Automator.NotInitializedResponse.fromObject(object.notInitializedResponse, long + 1);
            }
            if (object.config != null)
                if (typeof object.config === "string")
                    $util.base64.decode(object.config, message.config = $util.newBuffer($util.base64.length(object.config)), 0);
                else if (object.config.length >= 0)
                    message.config = object.config;
            if (object.numberOfTeamMembershipsApproved != null)
                if ($util.Long)
                    message.numberOfTeamMembershipsApproved = $util.Long.fromValue(object.numberOfTeamMembershipsApproved, false);
                else if (typeof object.numberOfTeamMembershipsApproved === "string")
                    message.numberOfTeamMembershipsApproved = parseInt(object.numberOfTeamMembershipsApproved, 10);
                else if (typeof object.numberOfTeamMembershipsApproved === "number")
                    message.numberOfTeamMembershipsApproved = object.numberOfTeamMembershipsApproved;
                else if (typeof object.numberOfTeamMembershipsApproved === "object")
                    message.numberOfTeamMembershipsApproved = new $util.LongBits(object.numberOfTeamMembershipsApproved.low >>> 0, object.numberOfTeamMembershipsApproved.high >>> 0).toNumber();
            if (object.numberOfTeamMembershipsDenied != null)
                if ($util.Long)
                    message.numberOfTeamMembershipsDenied = $util.Long.fromValue(object.numberOfTeamMembershipsDenied, false);
                else if (typeof object.numberOfTeamMembershipsDenied === "string")
                    message.numberOfTeamMembershipsDenied = parseInt(object.numberOfTeamMembershipsDenied, 10);
                else if (typeof object.numberOfTeamMembershipsDenied === "number")
                    message.numberOfTeamMembershipsDenied = object.numberOfTeamMembershipsDenied;
                else if (typeof object.numberOfTeamMembershipsDenied === "object")
                    message.numberOfTeamMembershipsDenied = new $util.LongBits(object.numberOfTeamMembershipsDenied.low >>> 0, object.numberOfTeamMembershipsDenied.high >>> 0).toNumber();
            if (object.numberOfTeamsApproved != null)
                if ($util.Long)
                    message.numberOfTeamsApproved = $util.Long.fromValue(object.numberOfTeamsApproved, false);
                else if (typeof object.numberOfTeamsApproved === "string")
                    message.numberOfTeamsApproved = parseInt(object.numberOfTeamsApproved, 10);
                else if (typeof object.numberOfTeamsApproved === "number")
                    message.numberOfTeamsApproved = object.numberOfTeamsApproved;
                else if (typeof object.numberOfTeamsApproved === "object")
                    message.numberOfTeamsApproved = new $util.LongBits(object.numberOfTeamsApproved.low >>> 0, object.numberOfTeamsApproved.high >>> 0).toNumber();
            if (object.numberOfTeamsDenied != null)
                if ($util.Long)
                    message.numberOfTeamsDenied = $util.Long.fromValue(object.numberOfTeamsDenied, false);
                else if (typeof object.numberOfTeamsDenied === "string")
                    message.numberOfTeamsDenied = parseInt(object.numberOfTeamsDenied, 10);
                else if (typeof object.numberOfTeamsDenied === "number")
                    message.numberOfTeamsDenied = object.numberOfTeamsDenied;
                else if (typeof object.numberOfTeamsDenied === "object")
                    message.numberOfTeamsDenied = new $util.LongBits(object.numberOfTeamsDenied.low >>> 0, object.numberOfTeamsDenied.high >>> 0).toNumber();
            if (object.sslCertificateInfo) {
                if (!Array.isArray(object.sslCertificateInfo))
                    throw TypeError(".Automator.StatusResponse.sslCertificateInfo: array expected");
                message.sslCertificateInfo = [];
                for (let i = 0; i < object.sslCertificateInfo.length; ++i) {
                    if (!$util.isObject(object.sslCertificateInfo[i]))
                        throw TypeError(".Automator.StatusResponse.sslCertificateInfo: object expected");
                    message.sslCertificateInfo[i] = $root.Automator.SSLCertificateInfo.fromObject(object.sslCertificateInfo[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a StatusResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.StatusResponse
         * @static
         * @param {Automator.StatusResponse} message StatusResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StatusResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.sslCertificateInfo = [];
            if (options.defaults) {
                object.initialized = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.enabledTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.enabledTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.initializedTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.initializedTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.updatedTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.updatedTimestamp = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.numberOfDevicesApproved = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.numberOfDevicesApproved = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.numberOfDevicesDenied = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.numberOfDevicesDenied = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.numberOfErrors = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.numberOfErrors = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.sslCertificateExpiration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.sslCertificateExpiration = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.notInitializedResponse = null;
                if (options.bytes === String)
                    object.config = "";
                else {
                    object.config = [];
                    if (options.bytes !== Array)
                        object.config = $util.newBuffer(object.config);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.numberOfTeamMembershipsApproved = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.numberOfTeamMembershipsApproved = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.numberOfTeamMembershipsDenied = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.numberOfTeamMembershipsDenied = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.numberOfTeamsApproved = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.numberOfTeamsApproved = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.numberOfTeamsDenied = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.numberOfTeamsDenied = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.initialized != null && Object.hasOwnProperty.call(message, "initialized"))
                object.initialized = message.initialized;
            if (message.enabledTimestamp != null && Object.hasOwnProperty.call(message, "enabledTimestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.enabledTimestamp = typeof message.enabledTimestamp === "number" ? BigInt(message.enabledTimestamp) : $util.Long.fromBits(message.enabledTimestamp.low >>> 0, message.enabledTimestamp.high >>> 0, false).toBigInt();
                else if (typeof message.enabledTimestamp === "number")
                    object.enabledTimestamp = options.longs === String ? String(message.enabledTimestamp) : message.enabledTimestamp;
                else
                    object.enabledTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.enabledTimestamp) : options.longs === Number ? new $util.LongBits(message.enabledTimestamp.low >>> 0, message.enabledTimestamp.high >>> 0).toNumber() : message.enabledTimestamp;
            if (message.initializedTimestamp != null && Object.hasOwnProperty.call(message, "initializedTimestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.initializedTimestamp = typeof message.initializedTimestamp === "number" ? BigInt(message.initializedTimestamp) : $util.Long.fromBits(message.initializedTimestamp.low >>> 0, message.initializedTimestamp.high >>> 0, false).toBigInt();
                else if (typeof message.initializedTimestamp === "number")
                    object.initializedTimestamp = options.longs === String ? String(message.initializedTimestamp) : message.initializedTimestamp;
                else
                    object.initializedTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.initializedTimestamp) : options.longs === Number ? new $util.LongBits(message.initializedTimestamp.low >>> 0, message.initializedTimestamp.high >>> 0).toNumber() : message.initializedTimestamp;
            if (message.updatedTimestamp != null && Object.hasOwnProperty.call(message, "updatedTimestamp"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.updatedTimestamp = typeof message.updatedTimestamp === "number" ? BigInt(message.updatedTimestamp) : $util.Long.fromBits(message.updatedTimestamp.low >>> 0, message.updatedTimestamp.high >>> 0, false).toBigInt();
                else if (typeof message.updatedTimestamp === "number")
                    object.updatedTimestamp = options.longs === String ? String(message.updatedTimestamp) : message.updatedTimestamp;
                else
                    object.updatedTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.updatedTimestamp) : options.longs === Number ? new $util.LongBits(message.updatedTimestamp.low >>> 0, message.updatedTimestamp.high >>> 0).toNumber() : message.updatedTimestamp;
            if (message.numberOfDevicesApproved != null && Object.hasOwnProperty.call(message, "numberOfDevicesApproved"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.numberOfDevicesApproved = typeof message.numberOfDevicesApproved === "number" ? BigInt(message.numberOfDevicesApproved) : $util.Long.fromBits(message.numberOfDevicesApproved.low >>> 0, message.numberOfDevicesApproved.high >>> 0, false).toBigInt();
                else if (typeof message.numberOfDevicesApproved === "number")
                    object.numberOfDevicesApproved = options.longs === String ? String(message.numberOfDevicesApproved) : message.numberOfDevicesApproved;
                else
                    object.numberOfDevicesApproved = options.longs === String ? $util.Long.prototype.toString.call(message.numberOfDevicesApproved) : options.longs === Number ? new $util.LongBits(message.numberOfDevicesApproved.low >>> 0, message.numberOfDevicesApproved.high >>> 0).toNumber() : message.numberOfDevicesApproved;
            if (message.numberOfDevicesDenied != null && Object.hasOwnProperty.call(message, "numberOfDevicesDenied"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.numberOfDevicesDenied = typeof message.numberOfDevicesDenied === "number" ? BigInt(message.numberOfDevicesDenied) : $util.Long.fromBits(message.numberOfDevicesDenied.low >>> 0, message.numberOfDevicesDenied.high >>> 0, false).toBigInt();
                else if (typeof message.numberOfDevicesDenied === "number")
                    object.numberOfDevicesDenied = options.longs === String ? String(message.numberOfDevicesDenied) : message.numberOfDevicesDenied;
                else
                    object.numberOfDevicesDenied = options.longs === String ? $util.Long.prototype.toString.call(message.numberOfDevicesDenied) : options.longs === Number ? new $util.LongBits(message.numberOfDevicesDenied.low >>> 0, message.numberOfDevicesDenied.high >>> 0).toNumber() : message.numberOfDevicesDenied;
            if (message.numberOfErrors != null && Object.hasOwnProperty.call(message, "numberOfErrors"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.numberOfErrors = typeof message.numberOfErrors === "number" ? BigInt(message.numberOfErrors) : $util.Long.fromBits(message.numberOfErrors.low >>> 0, message.numberOfErrors.high >>> 0, false).toBigInt();
                else if (typeof message.numberOfErrors === "number")
                    object.numberOfErrors = options.longs === String ? String(message.numberOfErrors) : message.numberOfErrors;
                else
                    object.numberOfErrors = options.longs === String ? $util.Long.prototype.toString.call(message.numberOfErrors) : options.longs === Number ? new $util.LongBits(message.numberOfErrors.low >>> 0, message.numberOfErrors.high >>> 0).toNumber() : message.numberOfErrors;
            if (message.sslCertificateExpiration != null && Object.hasOwnProperty.call(message, "sslCertificateExpiration"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.sslCertificateExpiration = typeof message.sslCertificateExpiration === "number" ? BigInt(message.sslCertificateExpiration) : $util.Long.fromBits(message.sslCertificateExpiration.low >>> 0, message.sslCertificateExpiration.high >>> 0, false).toBigInt();
                else if (typeof message.sslCertificateExpiration === "number")
                    object.sslCertificateExpiration = options.longs === String ? String(message.sslCertificateExpiration) : message.sslCertificateExpiration;
                else
                    object.sslCertificateExpiration = options.longs === String ? $util.Long.prototype.toString.call(message.sslCertificateExpiration) : options.longs === Number ? new $util.LongBits(message.sslCertificateExpiration.low >>> 0, message.sslCertificateExpiration.high >>> 0).toNumber() : message.sslCertificateExpiration;
            if (message.notInitializedResponse != null && Object.hasOwnProperty.call(message, "notInitializedResponse"))
                object.notInitializedResponse = $root.Automator.NotInitializedResponse.toObject(message.notInitializedResponse, options, q + 1);
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                object.config = options.bytes === String ? $util.base64.encode(message.config, 0, message.config.length) : options.bytes === Array ? Array.prototype.slice.call(message.config) : message.config;
            if (message.numberOfTeamMembershipsApproved != null && Object.hasOwnProperty.call(message, "numberOfTeamMembershipsApproved"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.numberOfTeamMembershipsApproved = typeof message.numberOfTeamMembershipsApproved === "number" ? BigInt(message.numberOfTeamMembershipsApproved) : $util.Long.fromBits(message.numberOfTeamMembershipsApproved.low >>> 0, message.numberOfTeamMembershipsApproved.high >>> 0, false).toBigInt();
                else if (typeof message.numberOfTeamMembershipsApproved === "number")
                    object.numberOfTeamMembershipsApproved = options.longs === String ? String(message.numberOfTeamMembershipsApproved) : message.numberOfTeamMembershipsApproved;
                else
                    object.numberOfTeamMembershipsApproved = options.longs === String ? $util.Long.prototype.toString.call(message.numberOfTeamMembershipsApproved) : options.longs === Number ? new $util.LongBits(message.numberOfTeamMembershipsApproved.low >>> 0, message.numberOfTeamMembershipsApproved.high >>> 0).toNumber() : message.numberOfTeamMembershipsApproved;
            if (message.numberOfTeamMembershipsDenied != null && Object.hasOwnProperty.call(message, "numberOfTeamMembershipsDenied"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.numberOfTeamMembershipsDenied = typeof message.numberOfTeamMembershipsDenied === "number" ? BigInt(message.numberOfTeamMembershipsDenied) : $util.Long.fromBits(message.numberOfTeamMembershipsDenied.low >>> 0, message.numberOfTeamMembershipsDenied.high >>> 0, false).toBigInt();
                else if (typeof message.numberOfTeamMembershipsDenied === "number")
                    object.numberOfTeamMembershipsDenied = options.longs === String ? String(message.numberOfTeamMembershipsDenied) : message.numberOfTeamMembershipsDenied;
                else
                    object.numberOfTeamMembershipsDenied = options.longs === String ? $util.Long.prototype.toString.call(message.numberOfTeamMembershipsDenied) : options.longs === Number ? new $util.LongBits(message.numberOfTeamMembershipsDenied.low >>> 0, message.numberOfTeamMembershipsDenied.high >>> 0).toNumber() : message.numberOfTeamMembershipsDenied;
            if (message.numberOfTeamsApproved != null && Object.hasOwnProperty.call(message, "numberOfTeamsApproved"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.numberOfTeamsApproved = typeof message.numberOfTeamsApproved === "number" ? BigInt(message.numberOfTeamsApproved) : $util.Long.fromBits(message.numberOfTeamsApproved.low >>> 0, message.numberOfTeamsApproved.high >>> 0, false).toBigInt();
                else if (typeof message.numberOfTeamsApproved === "number")
                    object.numberOfTeamsApproved = options.longs === String ? String(message.numberOfTeamsApproved) : message.numberOfTeamsApproved;
                else
                    object.numberOfTeamsApproved = options.longs === String ? $util.Long.prototype.toString.call(message.numberOfTeamsApproved) : options.longs === Number ? new $util.LongBits(message.numberOfTeamsApproved.low >>> 0, message.numberOfTeamsApproved.high >>> 0).toNumber() : message.numberOfTeamsApproved;
            if (message.numberOfTeamsDenied != null && Object.hasOwnProperty.call(message, "numberOfTeamsDenied"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.numberOfTeamsDenied = typeof message.numberOfTeamsDenied === "number" ? BigInt(message.numberOfTeamsDenied) : $util.Long.fromBits(message.numberOfTeamsDenied.low >>> 0, message.numberOfTeamsDenied.high >>> 0, false).toBigInt();
                else if (typeof message.numberOfTeamsDenied === "number")
                    object.numberOfTeamsDenied = options.longs === String ? String(message.numberOfTeamsDenied) : message.numberOfTeamsDenied;
                else
                    object.numberOfTeamsDenied = options.longs === String ? $util.Long.prototype.toString.call(message.numberOfTeamsDenied) : options.longs === Number ? new $util.LongBits(message.numberOfTeamsDenied.low >>> 0, message.numberOfTeamsDenied.high >>> 0).toNumber() : message.numberOfTeamsDenied;
            if (message.sslCertificateInfo && message.sslCertificateInfo.length) {
                object.sslCertificateInfo = [];
                for (let j = 0; j < message.sslCertificateInfo.length; ++j)
                    object.sslCertificateInfo[j] = $root.Automator.SSLCertificateInfo.toObject(message.sslCertificateInfo[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this StatusResponse to JSON.
         * @function toJSON
         * @memberof Automator.StatusResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StatusResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StatusResponse
         * @function getTypeUrl
         * @memberof Automator.StatusResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StatusResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.StatusResponse";
        };

        return StatusResponse;
    })();

    Automator.ErrorResponse = (function() {

        /**
         * Properties of an ErrorResponse.
         * @memberof Automator
         * @interface IErrorResponse
         * @property {string|null} [message] ErrorResponse message
         */

        /**
         * Constructs a new ErrorResponse.
         * @memberof Automator
         * @classdesc ErrorResponse
         * Includes error information, if the Automator encountered an error during processing.
         * @implements IErrorResponse
         * @constructor
         * @param {Automator.IErrorResponse=} [properties] Properties to set
         */
        function ErrorResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorResponse message.
         * @member {string} message
         * @memberof Automator.ErrorResponse
         * @instance
         */
        ErrorResponse.prototype.message = "";

        /**
         * Creates a new ErrorResponse instance using the specified properties.
         * @function create
         * @memberof Automator.ErrorResponse
         * @static
         * @param {Automator.IErrorResponse=} [properties] Properties to set
         * @returns {Automator.ErrorResponse} ErrorResponse instance
         */
        ErrorResponse.create = function create(properties) {
            return new ErrorResponse(properties);
        };

        /**
         * Encodes the specified ErrorResponse message. Does not implicitly {@link Automator.ErrorResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.ErrorResponse
         * @static
         * @param {Automator.IErrorResponse} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encode = function encode(message, writer, q) {
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
         * Encodes the specified ErrorResponse message, length delimited. Does not implicitly {@link Automator.ErrorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.ErrorResponse
         * @static
         * @param {Automator.IErrorResponse} message ErrorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ErrorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.ErrorResponse} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.ErrorResponse();
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
         * Decodes an ErrorResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.ErrorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.ErrorResponse} ErrorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorResponse message.
         * @function verify
         * @memberof Automator.ErrorResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates an ErrorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.ErrorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.ErrorResponse} ErrorResponse
         */
        ErrorResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.ErrorResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.ErrorResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.ErrorResponse();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an ErrorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.ErrorResponse
         * @static
         * @param {Automator.ErrorResponse} message ErrorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorResponse.toObject = function toObject(message, options, q) {
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
         * Converts this ErrorResponse to JSON.
         * @function toJSON
         * @memberof Automator.ErrorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ErrorResponse
         * @function getTypeUrl
         * @memberof Automator.ErrorResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ErrorResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.ErrorResponse";
        };

        return ErrorResponse;
    })();

    /**
     * These are the known skill types.
     * @name Automator.SkillType
     * @enum {number}
     * @property {number} UNKNOWN_SKILL_TYPE=0 UNKNOWN_SKILL_TYPE value
     * @property {number} DEVICE_APPROVAL=1 DEVICE_APPROVAL value
     * @property {number} TEAM_APPROVAL=2 TEAM_APPROVAL value
     * @property {number} TEAM_FOR_USER_APPROVAL=3 TEAM_FOR_USER_APPROVAL value
     */
    Automator.SkillType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_SKILL_TYPE"] = 0;
        values[valuesById[1] = "DEVICE_APPROVAL"] = 1;
        values[valuesById[2] = "TEAM_APPROVAL"] = 2;
        values[valuesById[3] = "TEAM_FOR_USER_APPROVAL"] = 3;
        return values;
    })();

    Automator.LogEntry = (function() {

        /**
         * Properties of a LogEntry.
         * @memberof Automator
         * @interface ILogEntry
         * @property {string|null} [serverTime] LogEntry serverTime
         * @property {string|null} [messageLevel] LogEntry messageLevel
         * @property {string|null} [component] LogEntry component
         * @property {string|null} [message] LogEntry message
         */

        /**
         * Constructs a new LogEntry.
         * @memberof Automator
         * @classdesc One entry from the log.
         * Normally, log entries will be sorted in reverse chronological order (newest first).
         * 
         * Included in AdminResponse.
         * @implements ILogEntry
         * @constructor
         * @param {Automator.ILogEntry=} [properties] Properties to set
         */
        function LogEntry(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LogEntry serverTime.
         * @member {string} serverTime
         * @memberof Automator.LogEntry
         * @instance
         */
        LogEntry.prototype.serverTime = "";

        /**
         * LogEntry messageLevel.
         * @member {string} messageLevel
         * @memberof Automator.LogEntry
         * @instance
         */
        LogEntry.prototype.messageLevel = "";

        /**
         * LogEntry component.
         * @member {string} component
         * @memberof Automator.LogEntry
         * @instance
         */
        LogEntry.prototype.component = "";

        /**
         * LogEntry message.
         * @member {string} message
         * @memberof Automator.LogEntry
         * @instance
         */
        LogEntry.prototype.message = "";

        /**
         * Creates a new LogEntry instance using the specified properties.
         * @function create
         * @memberof Automator.LogEntry
         * @static
         * @param {Automator.ILogEntry=} [properties] Properties to set
         * @returns {Automator.LogEntry} LogEntry instance
         */
        LogEntry.create = function create(properties) {
            return new LogEntry(properties);
        };

        /**
         * Encodes the specified LogEntry message. Does not implicitly {@link Automator.LogEntry.verify|verify} messages.
         * @function encode
         * @memberof Automator.LogEntry
         * @static
         * @param {Automator.ILogEntry} message LogEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogEntry.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.serverTime);
            if (message.messageLevel != null && Object.hasOwnProperty.call(message, "messageLevel"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.messageLevel);
            if (message.component != null && Object.hasOwnProperty.call(message, "component"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.component);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified LogEntry message, length delimited. Does not implicitly {@link Automator.LogEntry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.LogEntry
         * @static
         * @param {Automator.ILogEntry} message LogEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LogEntry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a LogEntry message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.LogEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.LogEntry} LogEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogEntry.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.LogEntry();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.serverTime = reader.string();
                        break;
                    }
                case 2: {
                        message.messageLevel = reader.string();
                        break;
                    }
                case 3: {
                        message.component = reader.string();
                        break;
                    }
                case 4: {
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
         * Decodes a LogEntry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.LogEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.LogEntry} LogEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LogEntry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LogEntry message.
         * @function verify
         * @memberof Automator.LogEntry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LogEntry.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                if (!$util.isString(message.serverTime))
                    return "serverTime: string expected";
            if (message.messageLevel != null && Object.hasOwnProperty.call(message, "messageLevel"))
                if (!$util.isString(message.messageLevel))
                    return "messageLevel: string expected";
            if (message.component != null && Object.hasOwnProperty.call(message, "component"))
                if (!$util.isString(message.component))
                    return "component: string expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates a LogEntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.LogEntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.LogEntry} LogEntry
         */
        LogEntry.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.LogEntry)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.LogEntry: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.LogEntry();
            if (object.serverTime != null)
                message.serverTime = String(object.serverTime);
            if (object.messageLevel != null)
                message.messageLevel = String(object.messageLevel);
            if (object.component != null)
                message.component = String(object.component);
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a LogEntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.LogEntry
         * @static
         * @param {Automator.LogEntry} message LogEntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LogEntry.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.serverTime = "";
                object.messageLevel = "";
                object.component = "";
                object.message = "";
            }
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                object.serverTime = message.serverTime;
            if (message.messageLevel != null && Object.hasOwnProperty.call(message, "messageLevel"))
                object.messageLevel = message.messageLevel;
            if (message.component != null && Object.hasOwnProperty.call(message, "component"))
                object.component = message.component;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this LogEntry to JSON.
         * @function toJSON
         * @memberof Automator.LogEntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LogEntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for LogEntry
         * @function getTypeUrl
         * @memberof Automator.LogEntry
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        LogEntry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.LogEntry";
        };

        return LogEntry;
    })();

    /**
     * AutomatorState (enum)
     * 
     * Provides the state of the Automator - part of the status.
     * @name Automator.AutomatorState
     * @enum {number}
     * @property {number} UNKNOWN_STATE=0 UNKNOWN_STATE value
     * @property {number} RUNNING=1 RUNNING value
     * @property {number} ERROR=2 ERROR value
     * @property {number} NEEDS_INITIALIZATION=3 NEEDS_INITIALIZATION value
     * @property {number} NEEDS_CRYPTO_STEP_1=4 NEEDS_CRYPTO_STEP_1 value
     * @property {number} NEEDS_CRYPTO_STEP_2=5 NEEDS_CRYPTO_STEP_2 value
     */
    Automator.AutomatorState = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNKNOWN_STATE"] = 0;
        values[valuesById[1] = "RUNNING"] = 1;
        values[valuesById[2] = "ERROR"] = 2;
        values[valuesById[3] = "NEEDS_INITIALIZATION"] = 3;
        values[valuesById[4] = "NEEDS_CRYPTO_STEP_1"] = 4;
        values[valuesById[5] = "NEEDS_CRYPTO_STEP_2"] = 5;
        return values;
    })();

    Automator.AdminResponse = (function() {

        /**
         * Properties of an AdminResponse.
         * @memberof Automator
         * @interface IAdminResponse
         * @property {boolean|null} [success] AdminResponse success
         * @property {string|null} [message] AdminResponse message
         * @property {Array.<Automator.IAutomatorInfo>|null} [automatorInfo] AdminResponse automatorInfo
         */

        /**
         * Constructs a new AdminResponse.
         * @memberof Automator
         * @classdesc AdminResponse
         * 
         * This is sent in reply to an Admin request.
         * There can be more than one Automator on a Node so that's why this is a multi-response.
         * @implements IAdminResponse
         * @constructor
         * @param {Automator.IAdminResponse=} [properties] Properties to set
         */
        function AdminResponse(properties) {
            this.automatorInfo = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminResponse success.
         * @member {boolean} success
         * @memberof Automator.AdminResponse
         * @instance
         */
        AdminResponse.prototype.success = false;

        /**
         * AdminResponse message.
         * @member {string} message
         * @memberof Automator.AdminResponse
         * @instance
         */
        AdminResponse.prototype.message = "";

        /**
         * AdminResponse automatorInfo.
         * @member {Array.<Automator.IAutomatorInfo>} automatorInfo
         * @memberof Automator.AdminResponse
         * @instance
         */
        AdminResponse.prototype.automatorInfo = $util.emptyArray;

        /**
         * Creates a new AdminResponse instance using the specified properties.
         * @function create
         * @memberof Automator.AdminResponse
         * @static
         * @param {Automator.IAdminResponse=} [properties] Properties to set
         * @returns {Automator.AdminResponse} AdminResponse instance
         */
        AdminResponse.create = function create(properties) {
            return new AdminResponse(properties);
        };

        /**
         * Encodes the specified AdminResponse message. Does not implicitly {@link Automator.AdminResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminResponse
         * @static
         * @param {Automator.IAdminResponse} message AdminResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminResponse.encode = function encode(message, writer, q) {
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
            if (message.automatorInfo != null && message.automatorInfo.length)
                for (let i = 0; i < message.automatorInfo.length; ++i)
                    $root.Automator.AutomatorInfo.encode(message.automatorInfo[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AdminResponse message, length delimited. Does not implicitly {@link Automator.AdminResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminResponse
         * @static
         * @param {Automator.IAdminResponse} message AdminResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminResponse} AdminResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminResponse();
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
                case 3: {
                        if (!(message.automatorInfo && message.automatorInfo.length))
                            message.automatorInfo = [];
                        message.automatorInfo.push($root.Automator.AutomatorInfo.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes an AdminResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminResponse} AdminResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminResponse message.
         * @function verify
         * @memberof Automator.AdminResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.automatorInfo != null && Object.hasOwnProperty.call(message, "automatorInfo")) {
                if (!Array.isArray(message.automatorInfo))
                    return "automatorInfo: array expected";
                for (let i = 0; i < message.automatorInfo.length; ++i) {
                    let error = $root.Automator.AutomatorInfo.verify(message.automatorInfo[i], long + 1);
                    if (error)
                        return "automatorInfo." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AdminResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminResponse} AdminResponse
         */
        AdminResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.message != null)
                message.message = String(object.message);
            if (object.automatorInfo) {
                if (!Array.isArray(object.automatorInfo))
                    throw TypeError(".Automator.AdminResponse.automatorInfo: array expected");
                message.automatorInfo = [];
                for (let i = 0; i < object.automatorInfo.length; ++i) {
                    if (!$util.isObject(object.automatorInfo[i]))
                        throw TypeError(".Automator.AdminResponse.automatorInfo: object expected");
                    message.automatorInfo[i] = $root.Automator.AutomatorInfo.fromObject(object.automatorInfo[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AdminResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminResponse
         * @static
         * @param {Automator.AdminResponse} message AdminResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.automatorInfo = [];
            if (options.defaults) {
                object.success = false;
                object.message = "";
            }
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.automatorInfo && message.automatorInfo.length) {
                object.automatorInfo = [];
                for (let j = 0; j < message.automatorInfo.length; ++j)
                    object.automatorInfo[j] = $root.Automator.AutomatorInfo.toObject(message.automatorInfo[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this AdminResponse to JSON.
         * @function toJSON
         * @memberof Automator.AdminResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminResponse
         * @function getTypeUrl
         * @memberof Automator.AdminResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminResponse";
        };

        return AdminResponse;
    })();

    Automator.AutomatorInfo = (function() {

        /**
         * Properties of an AutomatorInfo.
         * @memberof Automator
         * @interface IAutomatorInfo
         * @property {number|null} [automatorId] AutomatorInfo automatorId
         * @property {number|null} [nodeId] AutomatorInfo nodeId
         * @property {string|null} [name] AutomatorInfo name
         * @property {boolean|null} [enabled] AutomatorInfo enabled
         * @property {string|null} [url] AutomatorInfo url
         * @property {Array.<Automator.IAutomatorSkill>|null} [automatorSkills] AutomatorInfo automatorSkills
         * @property {Array.<Automator.IAutomatorSettingValue>|null} [automatorSettingValues] AutomatorInfo automatorSettingValues
         * @property {Automator.IStatusResponse|null} [status] AutomatorInfo status
         * @property {Array.<Automator.ILogEntry>|null} [logEntries] AutomatorInfo logEntries
         * @property {Automator.AutomatorState|null} [automatorState] AutomatorInfo automatorState
         * @property {string|null} [version] AutomatorInfo version
         * @property {string|null} [sslCertificateExpirationDate] AutomatorInfo sslCertificateExpirationDate
         */

        /**
         * Constructs a new AutomatorInfo.
         * @memberof Automator
         * @classdesc Information about an automator for a client that is configuring an Automator.
         * @implements IAutomatorInfo
         * @constructor
         * @param {Automator.IAutomatorInfo=} [properties] Properties to set
         */
        function AutomatorInfo(properties) {
            this.automatorSkills = [];
            this.automatorSettingValues = [];
            this.logEntries = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AutomatorInfo automatorId.
         * @member {number} automatorId
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AutomatorInfo nodeId.
         * @member {number} nodeId
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AutomatorInfo name.
         * @member {string} name
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.name = "";

        /**
         * AutomatorInfo enabled.
         * @member {boolean} enabled
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.enabled = false;

        /**
         * AutomatorInfo url.
         * @member {string} url
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.url = "";

        /**
         * AutomatorInfo automatorSkills.
         * @member {Array.<Automator.IAutomatorSkill>} automatorSkills
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.automatorSkills = $util.emptyArray;

        /**
         * AutomatorInfo automatorSettingValues.
         * @member {Array.<Automator.IAutomatorSettingValue>} automatorSettingValues
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.automatorSettingValues = $util.emptyArray;

        /**
         * AutomatorInfo status.
         * @member {Automator.IStatusResponse|null|undefined} status
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.status = null;

        /**
         * AutomatorInfo logEntries.
         * @member {Array.<Automator.ILogEntry>} logEntries
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.logEntries = $util.emptyArray;

        /**
         * AutomatorInfo automatorState.
         * @member {Automator.AutomatorState} automatorState
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.automatorState = 0;

        /**
         * AutomatorInfo version.
         * @member {string} version
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.version = "";

        /**
         * AutomatorInfo sslCertificateExpirationDate.
         * @member {string} sslCertificateExpirationDate
         * @memberof Automator.AutomatorInfo
         * @instance
         */
        AutomatorInfo.prototype.sslCertificateExpirationDate = "";

        /**
         * Creates a new AutomatorInfo instance using the specified properties.
         * @function create
         * @memberof Automator.AutomatorInfo
         * @static
         * @param {Automator.IAutomatorInfo=} [properties] Properties to set
         * @returns {Automator.AutomatorInfo} AutomatorInfo instance
         */
        AutomatorInfo.create = function create(properties) {
            return new AutomatorInfo(properties);
        };

        /**
         * Encodes the specified AutomatorInfo message. Does not implicitly {@link Automator.AutomatorInfo.verify|verify} messages.
         * @function encode
         * @memberof Automator.AutomatorInfo
         * @static
         * @param {Automator.IAutomatorInfo} message AutomatorInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutomatorInfo.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.nodeId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.enabled);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.url);
            if (message.automatorSkills != null && message.automatorSkills.length)
                for (let i = 0; i < message.automatorSkills.length; ++i)
                    $root.Automator.AutomatorSkill.encode(message.automatorSkills[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            if (message.automatorSettingValues != null && message.automatorSettingValues.length)
                for (let i = 0; i < message.automatorSettingValues.length; ++i)
                    $root.Automator.AutomatorSettingValue.encode(message.automatorSettingValues[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                $root.Automator.StatusResponse.encode(message.status, writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            if (message.logEntries != null && message.logEntries.length)
                for (let i = 0; i < message.logEntries.length; ++i)
                    $root.Automator.LogEntry.encode(message.logEntries[i], writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.automatorState);
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.version);
            if (message.sslCertificateExpirationDate != null && Object.hasOwnProperty.call(message, "sslCertificateExpirationDate"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.sslCertificateExpirationDate);
            return writer;
        };

        /**
         * Encodes the specified AutomatorInfo message, length delimited. Does not implicitly {@link Automator.AutomatorInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AutomatorInfo
         * @static
         * @param {Automator.IAutomatorInfo} message AutomatorInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutomatorInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AutomatorInfo message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AutomatorInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AutomatorInfo} AutomatorInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutomatorInfo.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AutomatorInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.nodeId = reader.int64();
                        break;
                    }
                case 3: {
                        message.name = reader.string();
                        break;
                    }
                case 4: {
                        message.enabled = reader.bool();
                        break;
                    }
                case 5: {
                        message.url = reader.string();
                        break;
                    }
                case 6: {
                        if (!(message.automatorSkills && message.automatorSkills.length))
                            message.automatorSkills = [];
                        message.automatorSkills.push($root.Automator.AutomatorSkill.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 7: {
                        if (!(message.automatorSettingValues && message.automatorSettingValues.length))
                            message.automatorSettingValues = [];
                        message.automatorSettingValues.push($root.Automator.AutomatorSettingValue.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 8: {
                        message.status = $root.Automator.StatusResponse.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 9: {
                        if (!(message.logEntries && message.logEntries.length))
                            message.logEntries = [];
                        message.logEntries.push($root.Automator.LogEntry.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 10: {
                        message.automatorState = reader.int32();
                        break;
                    }
                case 11: {
                        message.version = reader.string();
                        break;
                    }
                case 12: {
                        message.sslCertificateExpirationDate = reader.string();
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
         * Decodes an AutomatorInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AutomatorInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AutomatorInfo} AutomatorInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutomatorInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AutomatorInfo message.
         * @function verify
         * @memberof Automator.AutomatorInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AutomatorInfo.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (!$util.isInteger(message.nodeId) && !(message.nodeId && $util.isInteger(message.nodeId.low) && $util.isInteger(message.nodeId.high)))
                    return "nodeId: integer|Long expected";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                if (typeof message.enabled !== "boolean")
                    return "enabled: boolean expected";
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.automatorSkills != null && Object.hasOwnProperty.call(message, "automatorSkills")) {
                if (!Array.isArray(message.automatorSkills))
                    return "automatorSkills: array expected";
                for (let i = 0; i < message.automatorSkills.length; ++i) {
                    let error = $root.Automator.AutomatorSkill.verify(message.automatorSkills[i], long + 1);
                    if (error)
                        return "automatorSkills." + error;
                }
            }
            if (message.automatorSettingValues != null && Object.hasOwnProperty.call(message, "automatorSettingValues")) {
                if (!Array.isArray(message.automatorSettingValues))
                    return "automatorSettingValues: array expected";
                for (let i = 0; i < message.automatorSettingValues.length; ++i) {
                    let error = $root.Automator.AutomatorSettingValue.verify(message.automatorSettingValues[i], long + 1);
                    if (error)
                        return "automatorSettingValues." + error;
                }
            }
            if (message.status != null && Object.hasOwnProperty.call(message, "status")) {
                let error = $root.Automator.StatusResponse.verify(message.status, long + 1);
                if (error)
                    return "status." + error;
            }
            if (message.logEntries != null && Object.hasOwnProperty.call(message, "logEntries")) {
                if (!Array.isArray(message.logEntries))
                    return "logEntries: array expected";
                for (let i = 0; i < message.logEntries.length; ++i) {
                    let error = $root.Automator.LogEntry.verify(message.logEntries[i], long + 1);
                    if (error)
                        return "logEntries." + error;
                }
            }
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                switch (message.automatorState) {
                default:
                    return "automatorState: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.sslCertificateExpirationDate != null && Object.hasOwnProperty.call(message, "sslCertificateExpirationDate"))
                if (!$util.isString(message.sslCertificateExpirationDate))
                    return "sslCertificateExpirationDate: string expected";
            return null;
        };

        /**
         * Creates an AutomatorInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AutomatorInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AutomatorInfo} AutomatorInfo
         */
        AutomatorInfo.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AutomatorInfo)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AutomatorInfo: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AutomatorInfo();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            if (object.nodeId != null)
                if ($util.Long)
                    message.nodeId = $util.Long.fromValue(object.nodeId, false);
                else if (typeof object.nodeId === "string")
                    message.nodeId = parseInt(object.nodeId, 10);
                else if (typeof object.nodeId === "number")
                    message.nodeId = object.nodeId;
                else if (typeof object.nodeId === "object")
                    message.nodeId = new $util.LongBits(object.nodeId.low >>> 0, object.nodeId.high >>> 0).toNumber();
            if (object.name != null)
                message.name = String(object.name);
            if (object.enabled != null)
                message.enabled = Boolean(object.enabled);
            if (object.url != null)
                message.url = String(object.url);
            if (object.automatorSkills) {
                if (!Array.isArray(object.automatorSkills))
                    throw TypeError(".Automator.AutomatorInfo.automatorSkills: array expected");
                message.automatorSkills = [];
                for (let i = 0; i < object.automatorSkills.length; ++i) {
                    if (!$util.isObject(object.automatorSkills[i]))
                        throw TypeError(".Automator.AutomatorInfo.automatorSkills: object expected");
                    message.automatorSkills[i] = $root.Automator.AutomatorSkill.fromObject(object.automatorSkills[i], long + 1);
                }
            }
            if (object.automatorSettingValues) {
                if (!Array.isArray(object.automatorSettingValues))
                    throw TypeError(".Automator.AutomatorInfo.automatorSettingValues: array expected");
                message.automatorSettingValues = [];
                for (let i = 0; i < object.automatorSettingValues.length; ++i) {
                    if (!$util.isObject(object.automatorSettingValues[i]))
                        throw TypeError(".Automator.AutomatorInfo.automatorSettingValues: object expected");
                    message.automatorSettingValues[i] = $root.Automator.AutomatorSettingValue.fromObject(object.automatorSettingValues[i], long + 1);
                }
            }
            if (object.status != null) {
                if (!$util.isObject(object.status))
                    throw TypeError(".Automator.AutomatorInfo.status: object expected");
                message.status = $root.Automator.StatusResponse.fromObject(object.status, long + 1);
            }
            if (object.logEntries) {
                if (!Array.isArray(object.logEntries))
                    throw TypeError(".Automator.AutomatorInfo.logEntries: array expected");
                message.logEntries = [];
                for (let i = 0; i < object.logEntries.length; ++i) {
                    if (!$util.isObject(object.logEntries[i]))
                        throw TypeError(".Automator.AutomatorInfo.logEntries: object expected");
                    message.logEntries[i] = $root.Automator.LogEntry.fromObject(object.logEntries[i], long + 1);
                }
            }
            switch (object.automatorState) {
            default:
                if (typeof object.automatorState === "number") {
                    message.automatorState = object.automatorState;
                    break;
                }
                break;
            case "UNKNOWN_STATE":
            case 0:
                message.automatorState = 0;
                break;
            case "RUNNING":
            case 1:
                message.automatorState = 1;
                break;
            case "ERROR":
            case 2:
                message.automatorState = 2;
                break;
            case "NEEDS_INITIALIZATION":
            case 3:
                message.automatorState = 3;
                break;
            case "NEEDS_CRYPTO_STEP_1":
            case 4:
                message.automatorState = 4;
                break;
            case "NEEDS_CRYPTO_STEP_2":
            case 5:
                message.automatorState = 5;
                break;
            }
            if (object.version != null)
                message.version = String(object.version);
            if (object.sslCertificateExpirationDate != null)
                message.sslCertificateExpirationDate = String(object.sslCertificateExpirationDate);
            return message;
        };

        /**
         * Creates a plain object from an AutomatorInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AutomatorInfo
         * @static
         * @param {Automator.AutomatorInfo} message AutomatorInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AutomatorInfo.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.automatorSkills = [];
                object.automatorSettingValues = [];
                object.logEntries = [];
            }
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.nodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.nodeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.name = "";
                object.enabled = false;
                object.url = "";
                object.status = null;
                object.automatorState = options.enums === String ? "UNKNOWN_STATE" : 0;
                object.version = "";
                object.sslCertificateExpirationDate = "";
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nodeId = typeof message.nodeId === "number" ? BigInt(message.nodeId) : $util.Long.fromBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0, false).toBigInt();
                else if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber() : message.nodeId;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                object.enabled = message.enabled;
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                object.url = message.url;
            if (message.automatorSkills && message.automatorSkills.length) {
                object.automatorSkills = [];
                for (let j = 0; j < message.automatorSkills.length; ++j)
                    object.automatorSkills[j] = $root.Automator.AutomatorSkill.toObject(message.automatorSkills[j], options, q + 1);
            }
            if (message.automatorSettingValues && message.automatorSettingValues.length) {
                object.automatorSettingValues = [];
                for (let j = 0; j < message.automatorSettingValues.length; ++j)
                    object.automatorSettingValues[j] = $root.Automator.AutomatorSettingValue.toObject(message.automatorSettingValues[j], options, q + 1);
            }
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = $root.Automator.StatusResponse.toObject(message.status, options, q + 1);
            if (message.logEntries && message.logEntries.length) {
                object.logEntries = [];
                for (let j = 0; j < message.logEntries.length; ++j)
                    object.logEntries[j] = $root.Automator.LogEntry.toObject(message.logEntries[j], options, q + 1);
            }
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                object.automatorState = options.enums === String ? $root.Automator.AutomatorState[message.automatorState] === undefined ? message.automatorState : $root.Automator.AutomatorState[message.automatorState] : message.automatorState;
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                object.version = message.version;
            if (message.sslCertificateExpirationDate != null && Object.hasOwnProperty.call(message, "sslCertificateExpirationDate"))
                object.sslCertificateExpirationDate = message.sslCertificateExpirationDate;
            return object;
        };

        /**
         * Converts this AutomatorInfo to JSON.
         * @function toJSON
         * @memberof Automator.AutomatorInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AutomatorInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AutomatorInfo
         * @function getTypeUrl
         * @memberof Automator.AutomatorInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AutomatorInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AutomatorInfo";
        };

        return AutomatorInfo;
    })();

    Automator.AdminCreateAutomatorRequest = (function() {

        /**
         * Properties of an AdminCreateAutomatorRequest.
         * @memberof Automator
         * @interface IAdminCreateAutomatorRequest
         * @property {number|null} [nodeId] AdminCreateAutomatorRequest nodeId
         * @property {string|null} [name] AdminCreateAutomatorRequest name
         * @property {Automator.IAutomatorSkill|null} [skill] AdminCreateAutomatorRequest skill
         */

        /**
         * Constructs a new AdminCreateAutomatorRequest.
         * @memberof Automator
         * @classdesc AdminCreateAutomatorRequest
         * Create an automator on a Node.
         * 
         * Returns AdminResponse
         * @implements IAdminCreateAutomatorRequest
         * @constructor
         * @param {Automator.IAdminCreateAutomatorRequest=} [properties] Properties to set
         */
        function AdminCreateAutomatorRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminCreateAutomatorRequest nodeId.
         * @member {number} nodeId
         * @memberof Automator.AdminCreateAutomatorRequest
         * @instance
         */
        AdminCreateAutomatorRequest.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AdminCreateAutomatorRequest name.
         * @member {string} name
         * @memberof Automator.AdminCreateAutomatorRequest
         * @instance
         */
        AdminCreateAutomatorRequest.prototype.name = "";

        /**
         * AdminCreateAutomatorRequest skill.
         * @member {Automator.IAutomatorSkill|null|undefined} skill
         * @memberof Automator.AdminCreateAutomatorRequest
         * @instance
         */
        AdminCreateAutomatorRequest.prototype.skill = null;

        /**
         * Creates a new AdminCreateAutomatorRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminCreateAutomatorRequest
         * @static
         * @param {Automator.IAdminCreateAutomatorRequest=} [properties] Properties to set
         * @returns {Automator.AdminCreateAutomatorRequest} AdminCreateAutomatorRequest instance
         */
        AdminCreateAutomatorRequest.create = function create(properties) {
            return new AdminCreateAutomatorRequest(properties);
        };

        /**
         * Encodes the specified AdminCreateAutomatorRequest message. Does not implicitly {@link Automator.AdminCreateAutomatorRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminCreateAutomatorRequest
         * @static
         * @param {Automator.IAdminCreateAutomatorRequest} message AdminCreateAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminCreateAutomatorRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.nodeId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.skill != null && Object.hasOwnProperty.call(message, "skill"))
                $root.Automator.AutomatorSkill.encode(message.skill, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AdminCreateAutomatorRequest message, length delimited. Does not implicitly {@link Automator.AdminCreateAutomatorRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminCreateAutomatorRequest
         * @static
         * @param {Automator.IAdminCreateAutomatorRequest} message AdminCreateAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminCreateAutomatorRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminCreateAutomatorRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminCreateAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminCreateAutomatorRequest} AdminCreateAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminCreateAutomatorRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminCreateAutomatorRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.nodeId = reader.int64();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.skill = $root.Automator.AutomatorSkill.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Decodes an AdminCreateAutomatorRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminCreateAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminCreateAutomatorRequest} AdminCreateAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminCreateAutomatorRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminCreateAutomatorRequest message.
         * @function verify
         * @memberof Automator.AdminCreateAutomatorRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminCreateAutomatorRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (!$util.isInteger(message.nodeId) && !(message.nodeId && $util.isInteger(message.nodeId.low) && $util.isInteger(message.nodeId.high)))
                    return "nodeId: integer|Long expected";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.skill != null && Object.hasOwnProperty.call(message, "skill")) {
                let error = $root.Automator.AutomatorSkill.verify(message.skill, long + 1);
                if (error)
                    return "skill." + error;
            }
            return null;
        };

        /**
         * Creates an AdminCreateAutomatorRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminCreateAutomatorRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminCreateAutomatorRequest} AdminCreateAutomatorRequest
         */
        AdminCreateAutomatorRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminCreateAutomatorRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminCreateAutomatorRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminCreateAutomatorRequest();
            if (object.nodeId != null)
                if ($util.Long)
                    message.nodeId = $util.Long.fromValue(object.nodeId, false);
                else if (typeof object.nodeId === "string")
                    message.nodeId = parseInt(object.nodeId, 10);
                else if (typeof object.nodeId === "number")
                    message.nodeId = object.nodeId;
                else if (typeof object.nodeId === "object")
                    message.nodeId = new $util.LongBits(object.nodeId.low >>> 0, object.nodeId.high >>> 0).toNumber();
            if (object.name != null)
                message.name = String(object.name);
            if (object.skill != null) {
                if (!$util.isObject(object.skill))
                    throw TypeError(".Automator.AdminCreateAutomatorRequest.skill: object expected");
                message.skill = $root.Automator.AutomatorSkill.fromObject(object.skill, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AdminCreateAutomatorRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminCreateAutomatorRequest
         * @static
         * @param {Automator.AdminCreateAutomatorRequest} message AdminCreateAutomatorRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminCreateAutomatorRequest.toObject = function toObject(message, options, q) {
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
                    object.nodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.nodeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.name = "";
                object.skill = null;
            }
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nodeId = typeof message.nodeId === "number" ? BigInt(message.nodeId) : $util.Long.fromBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0, false).toBigInt();
                else if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber() : message.nodeId;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.skill != null && Object.hasOwnProperty.call(message, "skill"))
                object.skill = $root.Automator.AutomatorSkill.toObject(message.skill, options, q + 1);
            return object;
        };

        /**
         * Converts this AdminCreateAutomatorRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminCreateAutomatorRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminCreateAutomatorRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminCreateAutomatorRequest
         * @function getTypeUrl
         * @memberof Automator.AdminCreateAutomatorRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminCreateAutomatorRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminCreateAutomatorRequest";
        };

        return AdminCreateAutomatorRequest;
    })();

    Automator.AdminDeleteAutomatorRequest = (function() {

        /**
         * Properties of an AdminDeleteAutomatorRequest.
         * @memberof Automator
         * @interface IAdminDeleteAutomatorRequest
         * @property {number|null} [automatorId] AdminDeleteAutomatorRequest automatorId
         */

        /**
         * Constructs a new AdminDeleteAutomatorRequest.
         * @memberof Automator
         * @classdesc AdminDeleteAutomatorRequest
         * 
         * Delete an automator and its settings.
         * Does not notify or affect the actual Automator running at the client site.
         * 
         * Returns AdminResponse
         * @implements IAdminDeleteAutomatorRequest
         * @constructor
         * @param {Automator.IAdminDeleteAutomatorRequest=} [properties] Properties to set
         */
        function AdminDeleteAutomatorRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminDeleteAutomatorRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @instance
         */
        AdminDeleteAutomatorRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AdminDeleteAutomatorRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @static
         * @param {Automator.IAdminDeleteAutomatorRequest=} [properties] Properties to set
         * @returns {Automator.AdminDeleteAutomatorRequest} AdminDeleteAutomatorRequest instance
         */
        AdminDeleteAutomatorRequest.create = function create(properties) {
            return new AdminDeleteAutomatorRequest(properties);
        };

        /**
         * Encodes the specified AdminDeleteAutomatorRequest message. Does not implicitly {@link Automator.AdminDeleteAutomatorRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @static
         * @param {Automator.IAdminDeleteAutomatorRequest} message AdminDeleteAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminDeleteAutomatorRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            return writer;
        };

        /**
         * Encodes the specified AdminDeleteAutomatorRequest message, length delimited. Does not implicitly {@link Automator.AdminDeleteAutomatorRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @static
         * @param {Automator.IAdminDeleteAutomatorRequest} message AdminDeleteAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminDeleteAutomatorRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminDeleteAutomatorRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminDeleteAutomatorRequest} AdminDeleteAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminDeleteAutomatorRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminDeleteAutomatorRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
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
         * Decodes an AdminDeleteAutomatorRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminDeleteAutomatorRequest} AdminDeleteAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminDeleteAutomatorRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminDeleteAutomatorRequest message.
         * @function verify
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminDeleteAutomatorRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AdminDeleteAutomatorRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminDeleteAutomatorRequest} AdminDeleteAutomatorRequest
         */
        AdminDeleteAutomatorRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminDeleteAutomatorRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminDeleteAutomatorRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminDeleteAutomatorRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AdminDeleteAutomatorRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @static
         * @param {Automator.AdminDeleteAutomatorRequest} message AdminDeleteAutomatorRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminDeleteAutomatorRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            return object;
        };

        /**
         * Converts this AdminDeleteAutomatorRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminDeleteAutomatorRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminDeleteAutomatorRequest
         * @function getTypeUrl
         * @memberof Automator.AdminDeleteAutomatorRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminDeleteAutomatorRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminDeleteAutomatorRequest";
        };

        return AdminDeleteAutomatorRequest;
    })();

    Automator.AdminGetAutomatorsOnNodeRequest = (function() {

        /**
         * Properties of an AdminGetAutomatorsOnNodeRequest.
         * @memberof Automator
         * @interface IAdminGetAutomatorsOnNodeRequest
         * @property {number|null} [nodeId] AdminGetAutomatorsOnNodeRequest nodeId
         */

        /**
         * Constructs a new AdminGetAutomatorsOnNodeRequest.
         * @memberof Automator
         * @classdesc Retrieve automators on a node.
         * The info should also be in enterprise_summary or whatever it is called.
         * 
         * If you want info on a particular automator, use automator_get.
         * Returns AdminResponse
         * @implements IAdminGetAutomatorsOnNodeRequest
         * @constructor
         * @param {Automator.IAdminGetAutomatorsOnNodeRequest=} [properties] Properties to set
         */
        function AdminGetAutomatorsOnNodeRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminGetAutomatorsOnNodeRequest nodeId.
         * @member {number} nodeId
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @instance
         */
        AdminGetAutomatorsOnNodeRequest.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AdminGetAutomatorsOnNodeRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @static
         * @param {Automator.IAdminGetAutomatorsOnNodeRequest=} [properties] Properties to set
         * @returns {Automator.AdminGetAutomatorsOnNodeRequest} AdminGetAutomatorsOnNodeRequest instance
         */
        AdminGetAutomatorsOnNodeRequest.create = function create(properties) {
            return new AdminGetAutomatorsOnNodeRequest(properties);
        };

        /**
         * Encodes the specified AdminGetAutomatorsOnNodeRequest message. Does not implicitly {@link Automator.AdminGetAutomatorsOnNodeRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @static
         * @param {Automator.IAdminGetAutomatorsOnNodeRequest} message AdminGetAutomatorsOnNodeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminGetAutomatorsOnNodeRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.nodeId);
            return writer;
        };

        /**
         * Encodes the specified AdminGetAutomatorsOnNodeRequest message, length delimited. Does not implicitly {@link Automator.AdminGetAutomatorsOnNodeRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @static
         * @param {Automator.IAdminGetAutomatorsOnNodeRequest} message AdminGetAutomatorsOnNodeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminGetAutomatorsOnNodeRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminGetAutomatorsOnNodeRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminGetAutomatorsOnNodeRequest} AdminGetAutomatorsOnNodeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminGetAutomatorsOnNodeRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminGetAutomatorsOnNodeRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.nodeId = reader.int64();
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
         * Decodes an AdminGetAutomatorsOnNodeRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminGetAutomatorsOnNodeRequest} AdminGetAutomatorsOnNodeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminGetAutomatorsOnNodeRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminGetAutomatorsOnNodeRequest message.
         * @function verify
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminGetAutomatorsOnNodeRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (!$util.isInteger(message.nodeId) && !(message.nodeId && $util.isInteger(message.nodeId.low) && $util.isInteger(message.nodeId.high)))
                    return "nodeId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AdminGetAutomatorsOnNodeRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminGetAutomatorsOnNodeRequest} AdminGetAutomatorsOnNodeRequest
         */
        AdminGetAutomatorsOnNodeRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminGetAutomatorsOnNodeRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminGetAutomatorsOnNodeRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminGetAutomatorsOnNodeRequest();
            if (object.nodeId != null)
                if ($util.Long)
                    message.nodeId = $util.Long.fromValue(object.nodeId, false);
                else if (typeof object.nodeId === "string")
                    message.nodeId = parseInt(object.nodeId, 10);
                else if (typeof object.nodeId === "number")
                    message.nodeId = object.nodeId;
                else if (typeof object.nodeId === "object")
                    message.nodeId = new $util.LongBits(object.nodeId.low >>> 0, object.nodeId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AdminGetAutomatorsOnNodeRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @static
         * @param {Automator.AdminGetAutomatorsOnNodeRequest} message AdminGetAutomatorsOnNodeRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminGetAutomatorsOnNodeRequest.toObject = function toObject(message, options, q) {
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
                    object.nodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.nodeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nodeId = typeof message.nodeId === "number" ? BigInt(message.nodeId) : $util.Long.fromBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0, false).toBigInt();
                else if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber() : message.nodeId;
            return object;
        };

        /**
         * Converts this AdminGetAutomatorsOnNodeRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminGetAutomatorsOnNodeRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminGetAutomatorsOnNodeRequest
         * @function getTypeUrl
         * @memberof Automator.AdminGetAutomatorsOnNodeRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminGetAutomatorsOnNodeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminGetAutomatorsOnNodeRequest";
        };

        return AdminGetAutomatorsOnNodeRequest;
    })();

    Automator.AdminGetAutomatorsForEnterpriseRequest = (function() {

        /**
         * Properties of an AdminGetAutomatorsForEnterpriseRequest.
         * @memberof Automator
         * @interface IAdminGetAutomatorsForEnterpriseRequest
         * @property {number|null} [enterpriseId] AdminGetAutomatorsForEnterpriseRequest enterpriseId
         */

        /**
         * Constructs a new AdminGetAutomatorsForEnterpriseRequest.
         * @memberof Automator
         * @classdesc Retrieve automators in an enterprise.
         * The info should also be in enterprise_summary or whatever it is called.
         * 
         * If you want info on a particular automator, use automator_get.
         * If you want a list of automators on a node, use automator_get_on_node
         * Returns AdminResponse
         * @implements IAdminGetAutomatorsForEnterpriseRequest
         * @constructor
         * @param {Automator.IAdminGetAutomatorsForEnterpriseRequest=} [properties] Properties to set
         */
        function AdminGetAutomatorsForEnterpriseRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminGetAutomatorsForEnterpriseRequest enterpriseId.
         * @member {number} enterpriseId
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @instance
         */
        AdminGetAutomatorsForEnterpriseRequest.prototype.enterpriseId = 0;

        /**
         * Creates a new AdminGetAutomatorsForEnterpriseRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @static
         * @param {Automator.IAdminGetAutomatorsForEnterpriseRequest=} [properties] Properties to set
         * @returns {Automator.AdminGetAutomatorsForEnterpriseRequest} AdminGetAutomatorsForEnterpriseRequest instance
         */
        AdminGetAutomatorsForEnterpriseRequest.create = function create(properties) {
            return new AdminGetAutomatorsForEnterpriseRequest(properties);
        };

        /**
         * Encodes the specified AdminGetAutomatorsForEnterpriseRequest message. Does not implicitly {@link Automator.AdminGetAutomatorsForEnterpriseRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @static
         * @param {Automator.IAdminGetAutomatorsForEnterpriseRequest} message AdminGetAutomatorsForEnterpriseRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminGetAutomatorsForEnterpriseRequest.encode = function encode(message, writer, q) {
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
         * Encodes the specified AdminGetAutomatorsForEnterpriseRequest message, length delimited. Does not implicitly {@link Automator.AdminGetAutomatorsForEnterpriseRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @static
         * @param {Automator.IAdminGetAutomatorsForEnterpriseRequest} message AdminGetAutomatorsForEnterpriseRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminGetAutomatorsForEnterpriseRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminGetAutomatorsForEnterpriseRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminGetAutomatorsForEnterpriseRequest} AdminGetAutomatorsForEnterpriseRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminGetAutomatorsForEnterpriseRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminGetAutomatorsForEnterpriseRequest();
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
         * Decodes an AdminGetAutomatorsForEnterpriseRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminGetAutomatorsForEnterpriseRequest} AdminGetAutomatorsForEnterpriseRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminGetAutomatorsForEnterpriseRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminGetAutomatorsForEnterpriseRequest message.
         * @function verify
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminGetAutomatorsForEnterpriseRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                if (!$util.isInteger(message.enterpriseId))
                    return "enterpriseId: integer expected";
            return null;
        };

        /**
         * Creates an AdminGetAutomatorsForEnterpriseRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminGetAutomatorsForEnterpriseRequest} AdminGetAutomatorsForEnterpriseRequest
         */
        AdminGetAutomatorsForEnterpriseRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminGetAutomatorsForEnterpriseRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminGetAutomatorsForEnterpriseRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminGetAutomatorsForEnterpriseRequest();
            if (object.enterpriseId != null)
                message.enterpriseId = object.enterpriseId | 0;
            return message;
        };

        /**
         * Creates a plain object from an AdminGetAutomatorsForEnterpriseRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @static
         * @param {Automator.AdminGetAutomatorsForEnterpriseRequest} message AdminGetAutomatorsForEnterpriseRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminGetAutomatorsForEnterpriseRequest.toObject = function toObject(message, options, q) {
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
         * Converts this AdminGetAutomatorsForEnterpriseRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminGetAutomatorsForEnterpriseRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminGetAutomatorsForEnterpriseRequest
         * @function getTypeUrl
         * @memberof Automator.AdminGetAutomatorsForEnterpriseRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminGetAutomatorsForEnterpriseRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminGetAutomatorsForEnterpriseRequest";
        };

        return AdminGetAutomatorsForEnterpriseRequest;
    })();

    Automator.AdminGetAutomatorRequest = (function() {

        /**
         * Properties of an AdminGetAutomatorRequest.
         * @memberof Automator
         * @interface IAdminGetAutomatorRequest
         * @property {number|null} [automatorId] AdminGetAutomatorRequest automatorId
         */

        /**
         * Constructs a new AdminGetAutomatorRequest.
         * @memberof Automator
         * @classdesc Retrieve information about a specific automator.
         * 
         * Returns AdminResponse
         * @implements IAdminGetAutomatorRequest
         * @constructor
         * @param {Automator.IAdminGetAutomatorRequest=} [properties] Properties to set
         */
        function AdminGetAutomatorRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminGetAutomatorRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminGetAutomatorRequest
         * @instance
         */
        AdminGetAutomatorRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AdminGetAutomatorRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminGetAutomatorRequest
         * @static
         * @param {Automator.IAdminGetAutomatorRequest=} [properties] Properties to set
         * @returns {Automator.AdminGetAutomatorRequest} AdminGetAutomatorRequest instance
         */
        AdminGetAutomatorRequest.create = function create(properties) {
            return new AdminGetAutomatorRequest(properties);
        };

        /**
         * Encodes the specified AdminGetAutomatorRequest message. Does not implicitly {@link Automator.AdminGetAutomatorRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminGetAutomatorRequest
         * @static
         * @param {Automator.IAdminGetAutomatorRequest} message AdminGetAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminGetAutomatorRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            return writer;
        };

        /**
         * Encodes the specified AdminGetAutomatorRequest message, length delimited. Does not implicitly {@link Automator.AdminGetAutomatorRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminGetAutomatorRequest
         * @static
         * @param {Automator.IAdminGetAutomatorRequest} message AdminGetAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminGetAutomatorRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminGetAutomatorRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminGetAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminGetAutomatorRequest} AdminGetAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminGetAutomatorRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminGetAutomatorRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
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
         * Decodes an AdminGetAutomatorRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminGetAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminGetAutomatorRequest} AdminGetAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminGetAutomatorRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminGetAutomatorRequest message.
         * @function verify
         * @memberof Automator.AdminGetAutomatorRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminGetAutomatorRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AdminGetAutomatorRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminGetAutomatorRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminGetAutomatorRequest} AdminGetAutomatorRequest
         */
        AdminGetAutomatorRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminGetAutomatorRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminGetAutomatorRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminGetAutomatorRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AdminGetAutomatorRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminGetAutomatorRequest
         * @static
         * @param {Automator.AdminGetAutomatorRequest} message AdminGetAutomatorRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminGetAutomatorRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            return object;
        };

        /**
         * Converts this AdminGetAutomatorRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminGetAutomatorRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminGetAutomatorRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminGetAutomatorRequest
         * @function getTypeUrl
         * @memberof Automator.AdminGetAutomatorRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminGetAutomatorRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminGetAutomatorRequest";
        };

        return AdminGetAutomatorRequest;
    })();

    Automator.AdminEnableAutomatorRequest = (function() {

        /**
         * Properties of an AdminEnableAutomatorRequest.
         * @memberof Automator
         * @interface IAdminEnableAutomatorRequest
         * @property {number|null} [automatorId] AdminEnableAutomatorRequest automatorId
         * @property {boolean|null} [enabled] AdminEnableAutomatorRequest enabled
         */

        /**
         * Constructs a new AdminEnableAutomatorRequest.
         * @memberof Automator
         * @classdesc Enable or disable an automator.
         * 
         * Returns AdminResponse
         * @implements IAdminEnableAutomatorRequest
         * @constructor
         * @param {Automator.IAdminEnableAutomatorRequest=} [properties] Properties to set
         */
        function AdminEnableAutomatorRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminEnableAutomatorRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminEnableAutomatorRequest
         * @instance
         */
        AdminEnableAutomatorRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AdminEnableAutomatorRequest enabled.
         * @member {boolean} enabled
         * @memberof Automator.AdminEnableAutomatorRequest
         * @instance
         */
        AdminEnableAutomatorRequest.prototype.enabled = false;

        /**
         * Creates a new AdminEnableAutomatorRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminEnableAutomatorRequest
         * @static
         * @param {Automator.IAdminEnableAutomatorRequest=} [properties] Properties to set
         * @returns {Automator.AdminEnableAutomatorRequest} AdminEnableAutomatorRequest instance
         */
        AdminEnableAutomatorRequest.create = function create(properties) {
            return new AdminEnableAutomatorRequest(properties);
        };

        /**
         * Encodes the specified AdminEnableAutomatorRequest message. Does not implicitly {@link Automator.AdminEnableAutomatorRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminEnableAutomatorRequest
         * @static
         * @param {Automator.IAdminEnableAutomatorRequest} message AdminEnableAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminEnableAutomatorRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.enabled);
            return writer;
        };

        /**
         * Encodes the specified AdminEnableAutomatorRequest message, length delimited. Does not implicitly {@link Automator.AdminEnableAutomatorRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminEnableAutomatorRequest
         * @static
         * @param {Automator.IAdminEnableAutomatorRequest} message AdminEnableAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminEnableAutomatorRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminEnableAutomatorRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminEnableAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminEnableAutomatorRequest} AdminEnableAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminEnableAutomatorRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminEnableAutomatorRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.enabled = reader.bool();
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
         * Decodes an AdminEnableAutomatorRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminEnableAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminEnableAutomatorRequest} AdminEnableAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminEnableAutomatorRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminEnableAutomatorRequest message.
         * @function verify
         * @memberof Automator.AdminEnableAutomatorRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminEnableAutomatorRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                if (typeof message.enabled !== "boolean")
                    return "enabled: boolean expected";
            return null;
        };

        /**
         * Creates an AdminEnableAutomatorRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminEnableAutomatorRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminEnableAutomatorRequest} AdminEnableAutomatorRequest
         */
        AdminEnableAutomatorRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminEnableAutomatorRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminEnableAutomatorRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminEnableAutomatorRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            if (object.enabled != null)
                message.enabled = Boolean(object.enabled);
            return message;
        };

        /**
         * Creates a plain object from an AdminEnableAutomatorRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminEnableAutomatorRequest
         * @static
         * @param {Automator.AdminEnableAutomatorRequest} message AdminEnableAutomatorRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminEnableAutomatorRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.enabled = false;
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                object.enabled = message.enabled;
            return object;
        };

        /**
         * Converts this AdminEnableAutomatorRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminEnableAutomatorRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminEnableAutomatorRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminEnableAutomatorRequest
         * @function getTypeUrl
         * @memberof Automator.AdminEnableAutomatorRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminEnableAutomatorRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminEnableAutomatorRequest";
        };

        return AdminEnableAutomatorRequest;
    })();

    Automator.AdminEditAutomatorRequest = (function() {

        /**
         * Properties of an AdminEditAutomatorRequest.
         * @memberof Automator
         * @interface IAdminEditAutomatorRequest
         * @property {number|null} [automatorId] AdminEditAutomatorRequest automatorId
         * @property {string|null} [name] AdminEditAutomatorRequest name
         * @property {boolean|null} [enabled] AdminEditAutomatorRequest enabled
         * @property {string|null} [url] AdminEditAutomatorRequest url
         * @property {Array.<Automator.SkillType>|null} [skillTypes] AdminEditAutomatorRequest skillTypes
         * @property {Array.<Automator.IAutomatorSettingValue>|null} [automatorSettingValues] AdminEditAutomatorRequest automatorSettingValues
         */

        /**
         * Constructs a new AdminEditAutomatorRequest.
         * @memberof Automator
         * @classdesc Edit settings on the automator.
         * 
         * If a value is non-empty, it will be set on the Automator.
         * 
         * Returns AdminResponse with all current settings
         * @implements IAdminEditAutomatorRequest
         * @constructor
         * @param {Automator.IAdminEditAutomatorRequest=} [properties] Properties to set
         */
        function AdminEditAutomatorRequest(properties) {
            this.skillTypes = [];
            this.automatorSettingValues = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminEditAutomatorRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminEditAutomatorRequest
         * @instance
         */
        AdminEditAutomatorRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AdminEditAutomatorRequest name.
         * @member {string} name
         * @memberof Automator.AdminEditAutomatorRequest
         * @instance
         */
        AdminEditAutomatorRequest.prototype.name = "";

        /**
         * AdminEditAutomatorRequest enabled.
         * @member {boolean} enabled
         * @memberof Automator.AdminEditAutomatorRequest
         * @instance
         */
        AdminEditAutomatorRequest.prototype.enabled = false;

        /**
         * AdminEditAutomatorRequest url.
         * @member {string} url
         * @memberof Automator.AdminEditAutomatorRequest
         * @instance
         */
        AdminEditAutomatorRequest.prototype.url = "";

        /**
         * AdminEditAutomatorRequest skillTypes.
         * @member {Array.<Automator.SkillType>} skillTypes
         * @memberof Automator.AdminEditAutomatorRequest
         * @instance
         */
        AdminEditAutomatorRequest.prototype.skillTypes = $util.emptyArray;

        /**
         * AdminEditAutomatorRequest automatorSettingValues.
         * @member {Array.<Automator.IAutomatorSettingValue>} automatorSettingValues
         * @memberof Automator.AdminEditAutomatorRequest
         * @instance
         */
        AdminEditAutomatorRequest.prototype.automatorSettingValues = $util.emptyArray;

        /**
         * Creates a new AdminEditAutomatorRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminEditAutomatorRequest
         * @static
         * @param {Automator.IAdminEditAutomatorRequest=} [properties] Properties to set
         * @returns {Automator.AdminEditAutomatorRequest} AdminEditAutomatorRequest instance
         */
        AdminEditAutomatorRequest.create = function create(properties) {
            return new AdminEditAutomatorRequest(properties);
        };

        /**
         * Encodes the specified AdminEditAutomatorRequest message. Does not implicitly {@link Automator.AdminEditAutomatorRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminEditAutomatorRequest
         * @static
         * @param {Automator.IAdminEditAutomatorRequest} message AdminEditAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminEditAutomatorRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.enabled);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.url);
            if (message.skillTypes != null && message.skillTypes.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.skillTypes.length; ++i)
                    writer.int32(message.skillTypes[i]);
                writer.ldelim();
            }
            if (message.automatorSettingValues != null && message.automatorSettingValues.length)
                for (let i = 0; i < message.automatorSettingValues.length; ++i)
                    $root.Automator.AutomatorSettingValue.encode(message.automatorSettingValues[i], writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AdminEditAutomatorRequest message, length delimited. Does not implicitly {@link Automator.AdminEditAutomatorRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminEditAutomatorRequest
         * @static
         * @param {Automator.IAdminEditAutomatorRequest} message AdminEditAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminEditAutomatorRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminEditAutomatorRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminEditAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminEditAutomatorRequest} AdminEditAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminEditAutomatorRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminEditAutomatorRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.enabled = reader.bool();
                        break;
                    }
                case 4: {
                        message.url = reader.string();
                        break;
                    }
                case 5: {
                        if (!(message.skillTypes && message.skillTypes.length))
                            message.skillTypes = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.skillTypes.push(reader.int32());
                        } else
                            message.skillTypes.push(reader.int32());
                        break;
                    }
                case 6: {
                        if (!(message.automatorSettingValues && message.automatorSettingValues.length))
                            message.automatorSettingValues = [];
                        message.automatorSettingValues.push($root.Automator.AutomatorSettingValue.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes an AdminEditAutomatorRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminEditAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminEditAutomatorRequest} AdminEditAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminEditAutomatorRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminEditAutomatorRequest message.
         * @function verify
         * @memberof Automator.AdminEditAutomatorRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminEditAutomatorRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                if (typeof message.enabled !== "boolean")
                    return "enabled: boolean expected";
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.skillTypes != null && Object.hasOwnProperty.call(message, "skillTypes")) {
                if (!Array.isArray(message.skillTypes))
                    return "skillTypes: array expected";
                for (let i = 0; i < message.skillTypes.length; ++i)
                    switch (message.skillTypes[i]) {
                    default:
                        return "skillTypes: enum value[] expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
            }
            if (message.automatorSettingValues != null && Object.hasOwnProperty.call(message, "automatorSettingValues")) {
                if (!Array.isArray(message.automatorSettingValues))
                    return "automatorSettingValues: array expected";
                for (let i = 0; i < message.automatorSettingValues.length; ++i) {
                    let error = $root.Automator.AutomatorSettingValue.verify(message.automatorSettingValues[i], long + 1);
                    if (error)
                        return "automatorSettingValues." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AdminEditAutomatorRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminEditAutomatorRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminEditAutomatorRequest} AdminEditAutomatorRequest
         */
        AdminEditAutomatorRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminEditAutomatorRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminEditAutomatorRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminEditAutomatorRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            if (object.name != null)
                message.name = String(object.name);
            if (object.enabled != null)
                message.enabled = Boolean(object.enabled);
            if (object.url != null)
                message.url = String(object.url);
            if (object.skillTypes) {
                if (!Array.isArray(object.skillTypes))
                    throw TypeError(".Automator.AdminEditAutomatorRequest.skillTypes: array expected");
                message.skillTypes = [];
                for (let i = 0; i < object.skillTypes.length; ++i)
                    switch (object.skillTypes[i]) {
                    default:
                        if (typeof object.skillTypes[i] === "number") {
                            message.skillTypes[i] = object.skillTypes[i];
                            break;
                        }
                    case "UNKNOWN_SKILL_TYPE":
                    case 0:
                        message.skillTypes[i] = 0;
                        break;
                    case "DEVICE_APPROVAL":
                    case 1:
                        message.skillTypes[i] = 1;
                        break;
                    case "TEAM_APPROVAL":
                    case 2:
                        message.skillTypes[i] = 2;
                        break;
                    case "TEAM_FOR_USER_APPROVAL":
                    case 3:
                        message.skillTypes[i] = 3;
                        break;
                    }
            }
            if (object.automatorSettingValues) {
                if (!Array.isArray(object.automatorSettingValues))
                    throw TypeError(".Automator.AdminEditAutomatorRequest.automatorSettingValues: array expected");
                message.automatorSettingValues = [];
                for (let i = 0; i < object.automatorSettingValues.length; ++i) {
                    if (!$util.isObject(object.automatorSettingValues[i]))
                        throw TypeError(".Automator.AdminEditAutomatorRequest.automatorSettingValues: object expected");
                    message.automatorSettingValues[i] = $root.Automator.AutomatorSettingValue.fromObject(object.automatorSettingValues[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AdminEditAutomatorRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminEditAutomatorRequest
         * @static
         * @param {Automator.AdminEditAutomatorRequest} message AdminEditAutomatorRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminEditAutomatorRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.skillTypes = [];
                object.automatorSettingValues = [];
            }
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.name = "";
                object.enabled = false;
                object.url = "";
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.enabled != null && Object.hasOwnProperty.call(message, "enabled"))
                object.enabled = message.enabled;
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                object.url = message.url;
            if (message.skillTypes && message.skillTypes.length) {
                object.skillTypes = [];
                for (let j = 0; j < message.skillTypes.length; ++j)
                    object.skillTypes[j] = options.enums === String ? $root.Automator.SkillType[message.skillTypes[j]] === undefined ? message.skillTypes[j] : $root.Automator.SkillType[message.skillTypes[j]] : message.skillTypes[j];
            }
            if (message.automatorSettingValues && message.automatorSettingValues.length) {
                object.automatorSettingValues = [];
                for (let j = 0; j < message.automatorSettingValues.length; ++j)
                    object.automatorSettingValues[j] = $root.Automator.AutomatorSettingValue.toObject(message.automatorSettingValues[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this AdminEditAutomatorRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminEditAutomatorRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminEditAutomatorRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminEditAutomatorRequest
         * @function getTypeUrl
         * @memberof Automator.AdminEditAutomatorRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminEditAutomatorRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminEditAutomatorRequest";
        };

        return AdminEditAutomatorRequest;
    })();

    Automator.AdminSetupAutomatorRequest = (function() {

        /**
         * Properties of an AdminSetupAutomatorRequest.
         * @memberof Automator
         * @interface IAdminSetupAutomatorRequest
         * @property {number|null} [automatorId] AdminSetupAutomatorRequest automatorId
         * @property {Automator.AutomatorState|null} [automatorState] AdminSetupAutomatorRequest automatorState
         * @property {Uint8Array|null} [encryptedEccEnterprisePrivateKey] AdminSetupAutomatorRequest encryptedEccEnterprisePrivateKey
         * @property {Uint8Array|null} [encryptedRsaEnterprisePrivateKey] AdminSetupAutomatorRequest encryptedRsaEnterprisePrivateKey
         * @property {Array.<Automator.SkillType>|null} [skillTypes] AdminSetupAutomatorRequest skillTypes
         * @property {Uint8Array|null} [encryptedTreeKey] AdminSetupAutomatorRequest encryptedTreeKey
         */

        /**
         * Constructs a new AdminSetupAutomatorRequest.
         * @memberof Automator
         * @classdesc Initiate a setup operation with the automator via Keeper.
         * Step 1 is to request the Automator's ECC public key.  Use automatorState = NEEDS_CRYPTO_STEP_1
         * Step 2 is to send the ec_enterprise_private_key encrypted with the public key. Use automatorState = NEEDS_CRYPTO_STEP_2
         * 
         * Returns AdminSetupAutomatorResponse
         * @implements IAdminSetupAutomatorRequest
         * @constructor
         * @param {Automator.IAdminSetupAutomatorRequest=} [properties] Properties to set
         */
        function AdminSetupAutomatorRequest(properties) {
            this.skillTypes = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminSetupAutomatorRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminSetupAutomatorRequest
         * @instance
         */
        AdminSetupAutomatorRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AdminSetupAutomatorRequest automatorState.
         * @member {Automator.AutomatorState} automatorState
         * @memberof Automator.AdminSetupAutomatorRequest
         * @instance
         */
        AdminSetupAutomatorRequest.prototype.automatorState = 0;

        /**
         * AdminSetupAutomatorRequest encryptedEccEnterprisePrivateKey.
         * @member {Uint8Array} encryptedEccEnterprisePrivateKey
         * @memberof Automator.AdminSetupAutomatorRequest
         * @instance
         */
        AdminSetupAutomatorRequest.prototype.encryptedEccEnterprisePrivateKey = $util.newBuffer([]);

        /**
         * AdminSetupAutomatorRequest encryptedRsaEnterprisePrivateKey.
         * @member {Uint8Array} encryptedRsaEnterprisePrivateKey
         * @memberof Automator.AdminSetupAutomatorRequest
         * @instance
         */
        AdminSetupAutomatorRequest.prototype.encryptedRsaEnterprisePrivateKey = $util.newBuffer([]);

        /**
         * AdminSetupAutomatorRequest skillTypes.
         * @member {Array.<Automator.SkillType>} skillTypes
         * @memberof Automator.AdminSetupAutomatorRequest
         * @instance
         */
        AdminSetupAutomatorRequest.prototype.skillTypes = $util.emptyArray;

        /**
         * AdminSetupAutomatorRequest encryptedTreeKey.
         * @member {Uint8Array} encryptedTreeKey
         * @memberof Automator.AdminSetupAutomatorRequest
         * @instance
         */
        AdminSetupAutomatorRequest.prototype.encryptedTreeKey = $util.newBuffer([]);

        /**
         * Creates a new AdminSetupAutomatorRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminSetupAutomatorRequest
         * @static
         * @param {Automator.IAdminSetupAutomatorRequest=} [properties] Properties to set
         * @returns {Automator.AdminSetupAutomatorRequest} AdminSetupAutomatorRequest instance
         */
        AdminSetupAutomatorRequest.create = function create(properties) {
            return new AdminSetupAutomatorRequest(properties);
        };

        /**
         * Encodes the specified AdminSetupAutomatorRequest message. Does not implicitly {@link Automator.AdminSetupAutomatorRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminSetupAutomatorRequest
         * @static
         * @param {Automator.IAdminSetupAutomatorRequest} message AdminSetupAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminSetupAutomatorRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.automatorState);
            if (message.encryptedEccEnterprisePrivateKey != null && Object.hasOwnProperty.call(message, "encryptedEccEnterprisePrivateKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.encryptedEccEnterprisePrivateKey);
            if (message.encryptedRsaEnterprisePrivateKey != null && Object.hasOwnProperty.call(message, "encryptedRsaEnterprisePrivateKey"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.encryptedRsaEnterprisePrivateKey);
            if (message.skillTypes != null && message.skillTypes.length) {
                writer.uint32(/* id 5, wireType 2 =*/42).fork();
                for (let i = 0; i < message.skillTypes.length; ++i)
                    writer.int32(message.skillTypes[i]);
                writer.ldelim();
            }
            if (message.encryptedTreeKey != null && Object.hasOwnProperty.call(message, "encryptedTreeKey"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.encryptedTreeKey);
            return writer;
        };

        /**
         * Encodes the specified AdminSetupAutomatorRequest message, length delimited. Does not implicitly {@link Automator.AdminSetupAutomatorRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminSetupAutomatorRequest
         * @static
         * @param {Automator.IAdminSetupAutomatorRequest} message AdminSetupAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminSetupAutomatorRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminSetupAutomatorRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminSetupAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminSetupAutomatorRequest} AdminSetupAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminSetupAutomatorRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminSetupAutomatorRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.automatorState = reader.int32();
                        break;
                    }
                case 3: {
                        message.encryptedEccEnterprisePrivateKey = reader.bytes();
                        break;
                    }
                case 4: {
                        message.encryptedRsaEnterprisePrivateKey = reader.bytes();
                        break;
                    }
                case 5: {
                        if (!(message.skillTypes && message.skillTypes.length))
                            message.skillTypes = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.skillTypes.push(reader.int32());
                        } else
                            message.skillTypes.push(reader.int32());
                        break;
                    }
                case 6: {
                        message.encryptedTreeKey = reader.bytes();
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
         * Decodes an AdminSetupAutomatorRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminSetupAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminSetupAutomatorRequest} AdminSetupAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminSetupAutomatorRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminSetupAutomatorRequest message.
         * @function verify
         * @memberof Automator.AdminSetupAutomatorRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminSetupAutomatorRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                switch (message.automatorState) {
                default:
                    return "automatorState: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.encryptedEccEnterprisePrivateKey != null && Object.hasOwnProperty.call(message, "encryptedEccEnterprisePrivateKey"))
                if (!(message.encryptedEccEnterprisePrivateKey && typeof message.encryptedEccEnterprisePrivateKey.length === "number" || $util.isString(message.encryptedEccEnterprisePrivateKey)))
                    return "encryptedEccEnterprisePrivateKey: buffer expected";
            if (message.encryptedRsaEnterprisePrivateKey != null && Object.hasOwnProperty.call(message, "encryptedRsaEnterprisePrivateKey"))
                if (!(message.encryptedRsaEnterprisePrivateKey && typeof message.encryptedRsaEnterprisePrivateKey.length === "number" || $util.isString(message.encryptedRsaEnterprisePrivateKey)))
                    return "encryptedRsaEnterprisePrivateKey: buffer expected";
            if (message.skillTypes != null && Object.hasOwnProperty.call(message, "skillTypes")) {
                if (!Array.isArray(message.skillTypes))
                    return "skillTypes: array expected";
                for (let i = 0; i < message.skillTypes.length; ++i)
                    switch (message.skillTypes[i]) {
                    default:
                        return "skillTypes: enum value[] expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                    }
            }
            if (message.encryptedTreeKey != null && Object.hasOwnProperty.call(message, "encryptedTreeKey"))
                if (!(message.encryptedTreeKey && typeof message.encryptedTreeKey.length === "number" || $util.isString(message.encryptedTreeKey)))
                    return "encryptedTreeKey: buffer expected";
            return null;
        };

        /**
         * Creates an AdminSetupAutomatorRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminSetupAutomatorRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminSetupAutomatorRequest} AdminSetupAutomatorRequest
         */
        AdminSetupAutomatorRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminSetupAutomatorRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminSetupAutomatorRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminSetupAutomatorRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            switch (object.automatorState) {
            default:
                if (typeof object.automatorState === "number") {
                    message.automatorState = object.automatorState;
                    break;
                }
                break;
            case "UNKNOWN_STATE":
            case 0:
                message.automatorState = 0;
                break;
            case "RUNNING":
            case 1:
                message.automatorState = 1;
                break;
            case "ERROR":
            case 2:
                message.automatorState = 2;
                break;
            case "NEEDS_INITIALIZATION":
            case 3:
                message.automatorState = 3;
                break;
            case "NEEDS_CRYPTO_STEP_1":
            case 4:
                message.automatorState = 4;
                break;
            case "NEEDS_CRYPTO_STEP_2":
            case 5:
                message.automatorState = 5;
                break;
            }
            if (object.encryptedEccEnterprisePrivateKey != null)
                if (typeof object.encryptedEccEnterprisePrivateKey === "string")
                    $util.base64.decode(object.encryptedEccEnterprisePrivateKey, message.encryptedEccEnterprisePrivateKey = $util.newBuffer($util.base64.length(object.encryptedEccEnterprisePrivateKey)), 0);
                else if (object.encryptedEccEnterprisePrivateKey.length >= 0)
                    message.encryptedEccEnterprisePrivateKey = object.encryptedEccEnterprisePrivateKey;
            if (object.encryptedRsaEnterprisePrivateKey != null)
                if (typeof object.encryptedRsaEnterprisePrivateKey === "string")
                    $util.base64.decode(object.encryptedRsaEnterprisePrivateKey, message.encryptedRsaEnterprisePrivateKey = $util.newBuffer($util.base64.length(object.encryptedRsaEnterprisePrivateKey)), 0);
                else if (object.encryptedRsaEnterprisePrivateKey.length >= 0)
                    message.encryptedRsaEnterprisePrivateKey = object.encryptedRsaEnterprisePrivateKey;
            if (object.skillTypes) {
                if (!Array.isArray(object.skillTypes))
                    throw TypeError(".Automator.AdminSetupAutomatorRequest.skillTypes: array expected");
                message.skillTypes = [];
                for (let i = 0; i < object.skillTypes.length; ++i)
                    switch (object.skillTypes[i]) {
                    default:
                        if (typeof object.skillTypes[i] === "number") {
                            message.skillTypes[i] = object.skillTypes[i];
                            break;
                        }
                    case "UNKNOWN_SKILL_TYPE":
                    case 0:
                        message.skillTypes[i] = 0;
                        break;
                    case "DEVICE_APPROVAL":
                    case 1:
                        message.skillTypes[i] = 1;
                        break;
                    case "TEAM_APPROVAL":
                    case 2:
                        message.skillTypes[i] = 2;
                        break;
                    case "TEAM_FOR_USER_APPROVAL":
                    case 3:
                        message.skillTypes[i] = 3;
                        break;
                    }
            }
            if (object.encryptedTreeKey != null)
                if (typeof object.encryptedTreeKey === "string")
                    $util.base64.decode(object.encryptedTreeKey, message.encryptedTreeKey = $util.newBuffer($util.base64.length(object.encryptedTreeKey)), 0);
                else if (object.encryptedTreeKey.length >= 0)
                    message.encryptedTreeKey = object.encryptedTreeKey;
            return message;
        };

        /**
         * Creates a plain object from an AdminSetupAutomatorRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminSetupAutomatorRequest
         * @static
         * @param {Automator.AdminSetupAutomatorRequest} message AdminSetupAutomatorRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminSetupAutomatorRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.skillTypes = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.automatorState = options.enums === String ? "UNKNOWN_STATE" : 0;
                if (options.bytes === String)
                    object.encryptedEccEnterprisePrivateKey = "";
                else {
                    object.encryptedEccEnterprisePrivateKey = [];
                    if (options.bytes !== Array)
                        object.encryptedEccEnterprisePrivateKey = $util.newBuffer(object.encryptedEccEnterprisePrivateKey);
                }
                if (options.bytes === String)
                    object.encryptedRsaEnterprisePrivateKey = "";
                else {
                    object.encryptedRsaEnterprisePrivateKey = [];
                    if (options.bytes !== Array)
                        object.encryptedRsaEnterprisePrivateKey = $util.newBuffer(object.encryptedRsaEnterprisePrivateKey);
                }
                if (options.bytes === String)
                    object.encryptedTreeKey = "";
                else {
                    object.encryptedTreeKey = [];
                    if (options.bytes !== Array)
                        object.encryptedTreeKey = $util.newBuffer(object.encryptedTreeKey);
                }
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                object.automatorState = options.enums === String ? $root.Automator.AutomatorState[message.automatorState] === undefined ? message.automatorState : $root.Automator.AutomatorState[message.automatorState] : message.automatorState;
            if (message.encryptedEccEnterprisePrivateKey != null && Object.hasOwnProperty.call(message, "encryptedEccEnterprisePrivateKey"))
                object.encryptedEccEnterprisePrivateKey = options.bytes === String ? $util.base64.encode(message.encryptedEccEnterprisePrivateKey, 0, message.encryptedEccEnterprisePrivateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedEccEnterprisePrivateKey) : message.encryptedEccEnterprisePrivateKey;
            if (message.encryptedRsaEnterprisePrivateKey != null && Object.hasOwnProperty.call(message, "encryptedRsaEnterprisePrivateKey"))
                object.encryptedRsaEnterprisePrivateKey = options.bytes === String ? $util.base64.encode(message.encryptedRsaEnterprisePrivateKey, 0, message.encryptedRsaEnterprisePrivateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedRsaEnterprisePrivateKey) : message.encryptedRsaEnterprisePrivateKey;
            if (message.skillTypes && message.skillTypes.length) {
                object.skillTypes = [];
                for (let j = 0; j < message.skillTypes.length; ++j)
                    object.skillTypes[j] = options.enums === String ? $root.Automator.SkillType[message.skillTypes[j]] === undefined ? message.skillTypes[j] : $root.Automator.SkillType[message.skillTypes[j]] : message.skillTypes[j];
            }
            if (message.encryptedTreeKey != null && Object.hasOwnProperty.call(message, "encryptedTreeKey"))
                object.encryptedTreeKey = options.bytes === String ? $util.base64.encode(message.encryptedTreeKey, 0, message.encryptedTreeKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedTreeKey) : message.encryptedTreeKey;
            return object;
        };

        /**
         * Converts this AdminSetupAutomatorRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminSetupAutomatorRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminSetupAutomatorRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminSetupAutomatorRequest
         * @function getTypeUrl
         * @memberof Automator.AdminSetupAutomatorRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminSetupAutomatorRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminSetupAutomatorRequest";
        };

        return AdminSetupAutomatorRequest;
    })();

    Automator.AdminSetupAutomatorResponse = (function() {

        /**
         * Properties of an AdminSetupAutomatorResponse.
         * @memberof Automator
         * @interface IAdminSetupAutomatorResponse
         * @property {boolean|null} [success] AdminSetupAutomatorResponse success
         * @property {string|null} [message] AdminSetupAutomatorResponse message
         * @property {number|null} [automatorId] AdminSetupAutomatorResponse automatorId
         * @property {Automator.AutomatorState|null} [automatorState] AdminSetupAutomatorResponse automatorState
         * @property {Uint8Array|null} [automatorEccPublicKey] AdminSetupAutomatorResponse automatorEccPublicKey
         */

        /**
         * Constructs a new AdminSetupAutomatorResponse.
         * @memberof Automator
         * @classdesc The response to an AdminSetupAutomatorRequest.
         * The automatorEccPublicKey fields will be non-empty iff the AutomatorState is NEEDS_CRYPTO_STEP_2
         * @implements IAdminSetupAutomatorResponse
         * @constructor
         * @param {Automator.IAdminSetupAutomatorResponse=} [properties] Properties to set
         */
        function AdminSetupAutomatorResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminSetupAutomatorResponse success.
         * @member {boolean} success
         * @memberof Automator.AdminSetupAutomatorResponse
         * @instance
         */
        AdminSetupAutomatorResponse.prototype.success = false;

        /**
         * AdminSetupAutomatorResponse message.
         * @member {string} message
         * @memberof Automator.AdminSetupAutomatorResponse
         * @instance
         */
        AdminSetupAutomatorResponse.prototype.message = "";

        /**
         * AdminSetupAutomatorResponse automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminSetupAutomatorResponse
         * @instance
         */
        AdminSetupAutomatorResponse.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AdminSetupAutomatorResponse automatorState.
         * @member {Automator.AutomatorState} automatorState
         * @memberof Automator.AdminSetupAutomatorResponse
         * @instance
         */
        AdminSetupAutomatorResponse.prototype.automatorState = 0;

        /**
         * AdminSetupAutomatorResponse automatorEccPublicKey.
         * @member {Uint8Array} automatorEccPublicKey
         * @memberof Automator.AdminSetupAutomatorResponse
         * @instance
         */
        AdminSetupAutomatorResponse.prototype.automatorEccPublicKey = $util.newBuffer([]);

        /**
         * Creates a new AdminSetupAutomatorResponse instance using the specified properties.
         * @function create
         * @memberof Automator.AdminSetupAutomatorResponse
         * @static
         * @param {Automator.IAdminSetupAutomatorResponse=} [properties] Properties to set
         * @returns {Automator.AdminSetupAutomatorResponse} AdminSetupAutomatorResponse instance
         */
        AdminSetupAutomatorResponse.create = function create(properties) {
            return new AdminSetupAutomatorResponse(properties);
        };

        /**
         * Encodes the specified AdminSetupAutomatorResponse message. Does not implicitly {@link Automator.AdminSetupAutomatorResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminSetupAutomatorResponse
         * @static
         * @param {Automator.IAdminSetupAutomatorResponse} message AdminSetupAutomatorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminSetupAutomatorResponse.encode = function encode(message, writer, q) {
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
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.automatorId);
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.automatorState);
            if (message.automatorEccPublicKey != null && Object.hasOwnProperty.call(message, "automatorEccPublicKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.automatorEccPublicKey);
            return writer;
        };

        /**
         * Encodes the specified AdminSetupAutomatorResponse message, length delimited. Does not implicitly {@link Automator.AdminSetupAutomatorResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminSetupAutomatorResponse
         * @static
         * @param {Automator.IAdminSetupAutomatorResponse} message AdminSetupAutomatorResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminSetupAutomatorResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminSetupAutomatorResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminSetupAutomatorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminSetupAutomatorResponse} AdminSetupAutomatorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminSetupAutomatorResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminSetupAutomatorResponse();
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
                case 3: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 4: {
                        message.automatorState = reader.int32();
                        break;
                    }
                case 5: {
                        message.automatorEccPublicKey = reader.bytes();
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
         * Decodes an AdminSetupAutomatorResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminSetupAutomatorResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminSetupAutomatorResponse} AdminSetupAutomatorResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminSetupAutomatorResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminSetupAutomatorResponse message.
         * @function verify
         * @memberof Automator.AdminSetupAutomatorResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminSetupAutomatorResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                switch (message.automatorState) {
                default:
                    return "automatorState: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                }
            if (message.automatorEccPublicKey != null && Object.hasOwnProperty.call(message, "automatorEccPublicKey"))
                if (!(message.automatorEccPublicKey && typeof message.automatorEccPublicKey.length === "number" || $util.isString(message.automatorEccPublicKey)))
                    return "automatorEccPublicKey: buffer expected";
            return null;
        };

        /**
         * Creates an AdminSetupAutomatorResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminSetupAutomatorResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminSetupAutomatorResponse} AdminSetupAutomatorResponse
         */
        AdminSetupAutomatorResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminSetupAutomatorResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminSetupAutomatorResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminSetupAutomatorResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.message != null)
                message.message = String(object.message);
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            switch (object.automatorState) {
            default:
                if (typeof object.automatorState === "number") {
                    message.automatorState = object.automatorState;
                    break;
                }
                break;
            case "UNKNOWN_STATE":
            case 0:
                message.automatorState = 0;
                break;
            case "RUNNING":
            case 1:
                message.automatorState = 1;
                break;
            case "ERROR":
            case 2:
                message.automatorState = 2;
                break;
            case "NEEDS_INITIALIZATION":
            case 3:
                message.automatorState = 3;
                break;
            case "NEEDS_CRYPTO_STEP_1":
            case 4:
                message.automatorState = 4;
                break;
            case "NEEDS_CRYPTO_STEP_2":
            case 5:
                message.automatorState = 5;
                break;
            }
            if (object.automatorEccPublicKey != null)
                if (typeof object.automatorEccPublicKey === "string")
                    $util.base64.decode(object.automatorEccPublicKey, message.automatorEccPublicKey = $util.newBuffer($util.base64.length(object.automatorEccPublicKey)), 0);
                else if (object.automatorEccPublicKey.length >= 0)
                    message.automatorEccPublicKey = object.automatorEccPublicKey;
            return message;
        };

        /**
         * Creates a plain object from an AdminSetupAutomatorResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminSetupAutomatorResponse
         * @static
         * @param {Automator.AdminSetupAutomatorResponse} message AdminSetupAutomatorResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminSetupAutomatorResponse.toObject = function toObject(message, options, q) {
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
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.automatorState = options.enums === String ? "UNKNOWN_STATE" : 0;
                if (options.bytes === String)
                    object.automatorEccPublicKey = "";
                else {
                    object.automatorEccPublicKey = [];
                    if (options.bytes !== Array)
                        object.automatorEccPublicKey = $util.newBuffer(object.automatorEccPublicKey);
                }
            }
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.automatorState != null && Object.hasOwnProperty.call(message, "automatorState"))
                object.automatorState = options.enums === String ? $root.Automator.AutomatorState[message.automatorState] === undefined ? message.automatorState : $root.Automator.AutomatorState[message.automatorState] : message.automatorState;
            if (message.automatorEccPublicKey != null && Object.hasOwnProperty.call(message, "automatorEccPublicKey"))
                object.automatorEccPublicKey = options.bytes === String ? $util.base64.encode(message.automatorEccPublicKey, 0, message.automatorEccPublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.automatorEccPublicKey) : message.automatorEccPublicKey;
            return object;
        };

        /**
         * Converts this AdminSetupAutomatorResponse to JSON.
         * @function toJSON
         * @memberof Automator.AdminSetupAutomatorResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminSetupAutomatorResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminSetupAutomatorResponse
         * @function getTypeUrl
         * @memberof Automator.AdminSetupAutomatorResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminSetupAutomatorResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminSetupAutomatorResponse";
        };

        return AdminSetupAutomatorResponse;
    })();

    Automator.AdminAutomatorSkillsRequest = (function() {

        /**
         * Properties of an AdminAutomatorSkillsRequest.
         * @memberof Automator
         * @interface IAdminAutomatorSkillsRequest
         * @property {number|null} [automatorId] AdminAutomatorSkillsRequest automatorId
         */

        /**
         * Constructs a new AdminAutomatorSkillsRequest.
         * @memberof Automator
         * @classdesc Retrieve the list of known skills that Automators can have.
         * This is NOT the list of skills that a particular Automator has.
         * 
         * Returns AdminAutomatorSkillsResponse.
         * @implements IAdminAutomatorSkillsRequest
         * @constructor
         * @param {Automator.IAdminAutomatorSkillsRequest=} [properties] Properties to set
         */
        function AdminAutomatorSkillsRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminAutomatorSkillsRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @instance
         */
        AdminAutomatorSkillsRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AdminAutomatorSkillsRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @static
         * @param {Automator.IAdminAutomatorSkillsRequest=} [properties] Properties to set
         * @returns {Automator.AdminAutomatorSkillsRequest} AdminAutomatorSkillsRequest instance
         */
        AdminAutomatorSkillsRequest.create = function create(properties) {
            return new AdminAutomatorSkillsRequest(properties);
        };

        /**
         * Encodes the specified AdminAutomatorSkillsRequest message. Does not implicitly {@link Automator.AdminAutomatorSkillsRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @static
         * @param {Automator.IAdminAutomatorSkillsRequest} message AdminAutomatorSkillsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminAutomatorSkillsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            return writer;
        };

        /**
         * Encodes the specified AdminAutomatorSkillsRequest message, length delimited. Does not implicitly {@link Automator.AdminAutomatorSkillsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @static
         * @param {Automator.IAdminAutomatorSkillsRequest} message AdminAutomatorSkillsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminAutomatorSkillsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminAutomatorSkillsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminAutomatorSkillsRequest} AdminAutomatorSkillsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminAutomatorSkillsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminAutomatorSkillsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
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
         * Decodes an AdminAutomatorSkillsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminAutomatorSkillsRequest} AdminAutomatorSkillsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminAutomatorSkillsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminAutomatorSkillsRequest message.
         * @function verify
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminAutomatorSkillsRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AdminAutomatorSkillsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminAutomatorSkillsRequest} AdminAutomatorSkillsRequest
         */
        AdminAutomatorSkillsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminAutomatorSkillsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminAutomatorSkillsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminAutomatorSkillsRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AdminAutomatorSkillsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @static
         * @param {Automator.AdminAutomatorSkillsRequest} message AdminAutomatorSkillsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminAutomatorSkillsRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            return object;
        };

        /**
         * Converts this AdminAutomatorSkillsRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminAutomatorSkillsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminAutomatorSkillsRequest
         * @function getTypeUrl
         * @memberof Automator.AdminAutomatorSkillsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminAutomatorSkillsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminAutomatorSkillsRequest";
        };

        return AdminAutomatorSkillsRequest;
    })();

    Automator.AutomatorSkill = (function() {

        /**
         * Properties of an AutomatorSkill.
         * @memberof Automator
         * @interface IAutomatorSkill
         * @property {Automator.SkillType|null} [skillType] AutomatorSkill skillType
         * @property {string|null} [name] AutomatorSkill name
         * @property {string|null} [translatedName] AutomatorSkill translatedName
         */

        /**
         * Constructs a new AutomatorSkill.
         * @memberof Automator
         * @classdesc Information about a specific defined skill such as Device Approval.
         * @implements IAutomatorSkill
         * @constructor
         * @param {Automator.IAutomatorSkill=} [properties] Properties to set
         */
        function AutomatorSkill(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AutomatorSkill skillType.
         * @member {Automator.SkillType} skillType
         * @memberof Automator.AutomatorSkill
         * @instance
         */
        AutomatorSkill.prototype.skillType = 0;

        /**
         * AutomatorSkill name.
         * @member {string} name
         * @memberof Automator.AutomatorSkill
         * @instance
         */
        AutomatorSkill.prototype.name = "";

        /**
         * AutomatorSkill translatedName.
         * @member {string} translatedName
         * @memberof Automator.AutomatorSkill
         * @instance
         */
        AutomatorSkill.prototype.translatedName = "";

        /**
         * Creates a new AutomatorSkill instance using the specified properties.
         * @function create
         * @memberof Automator.AutomatorSkill
         * @static
         * @param {Automator.IAutomatorSkill=} [properties] Properties to set
         * @returns {Automator.AutomatorSkill} AutomatorSkill instance
         */
        AutomatorSkill.create = function create(properties) {
            return new AutomatorSkill(properties);
        };

        /**
         * Encodes the specified AutomatorSkill message. Does not implicitly {@link Automator.AutomatorSkill.verify|verify} messages.
         * @function encode
         * @memberof Automator.AutomatorSkill
         * @static
         * @param {Automator.IAutomatorSkill} message AutomatorSkill message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutomatorSkill.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.skillType != null && Object.hasOwnProperty.call(message, "skillType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.skillType);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.translatedName != null && Object.hasOwnProperty.call(message, "translatedName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.translatedName);
            return writer;
        };

        /**
         * Encodes the specified AutomatorSkill message, length delimited. Does not implicitly {@link Automator.AutomatorSkill.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AutomatorSkill
         * @static
         * @param {Automator.IAutomatorSkill} message AutomatorSkill message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AutomatorSkill.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AutomatorSkill message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AutomatorSkill
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AutomatorSkill} AutomatorSkill
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutomatorSkill.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AutomatorSkill();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.skillType = reader.int32();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.translatedName = reader.string();
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
         * Decodes an AutomatorSkill message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AutomatorSkill
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AutomatorSkill} AutomatorSkill
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AutomatorSkill.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AutomatorSkill message.
         * @function verify
         * @memberof Automator.AutomatorSkill
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AutomatorSkill.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.skillType != null && Object.hasOwnProperty.call(message, "skillType"))
                switch (message.skillType) {
                default:
                    return "skillType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                    break;
                }
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.translatedName != null && Object.hasOwnProperty.call(message, "translatedName"))
                if (!$util.isString(message.translatedName))
                    return "translatedName: string expected";
            return null;
        };

        /**
         * Creates an AutomatorSkill message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AutomatorSkill
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AutomatorSkill} AutomatorSkill
         */
        AutomatorSkill.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AutomatorSkill)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AutomatorSkill: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AutomatorSkill();
            switch (object.skillType) {
            default:
                if (typeof object.skillType === "number") {
                    message.skillType = object.skillType;
                    break;
                }
                break;
            case "UNKNOWN_SKILL_TYPE":
            case 0:
                message.skillType = 0;
                break;
            case "DEVICE_APPROVAL":
            case 1:
                message.skillType = 1;
                break;
            case "TEAM_APPROVAL":
            case 2:
                message.skillType = 2;
                break;
            case "TEAM_FOR_USER_APPROVAL":
            case 3:
                message.skillType = 3;
                break;
            }
            if (object.name != null)
                message.name = String(object.name);
            if (object.translatedName != null)
                message.translatedName = String(object.translatedName);
            return message;
        };

        /**
         * Creates a plain object from an AutomatorSkill message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AutomatorSkill
         * @static
         * @param {Automator.AutomatorSkill} message AutomatorSkill
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AutomatorSkill.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.skillType = options.enums === String ? "UNKNOWN_SKILL_TYPE" : 0;
                object.name = "";
                object.translatedName = "";
            }
            if (message.skillType != null && Object.hasOwnProperty.call(message, "skillType"))
                object.skillType = options.enums === String ? $root.Automator.SkillType[message.skillType] === undefined ? message.skillType : $root.Automator.SkillType[message.skillType] : message.skillType;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.translatedName != null && Object.hasOwnProperty.call(message, "translatedName"))
                object.translatedName = message.translatedName;
            return object;
        };

        /**
         * Converts this AutomatorSkill to JSON.
         * @function toJSON
         * @memberof Automator.AutomatorSkill
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AutomatorSkill.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AutomatorSkill
         * @function getTypeUrl
         * @memberof Automator.AutomatorSkill
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AutomatorSkill.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AutomatorSkill";
        };

        return AutomatorSkill;
    })();

    Automator.AdminAutomatorSkillsResponse = (function() {

        /**
         * Properties of an AdminAutomatorSkillsResponse.
         * @memberof Automator
         * @interface IAdminAutomatorSkillsResponse
         * @property {boolean|null} [success] AdminAutomatorSkillsResponse success
         * @property {string|null} [message] AdminAutomatorSkillsResponse message
         * @property {Array.<Automator.IAutomatorSkill>|null} [automatorSkills] AdminAutomatorSkillsResponse automatorSkills
         */

        /**
         * Constructs a new AdminAutomatorSkillsResponse.
         * @memberof Automator
         * @classdesc Contains a list of known skill types that Automators can have.
         * @implements IAdminAutomatorSkillsResponse
         * @constructor
         * @param {Automator.IAdminAutomatorSkillsResponse=} [properties] Properties to set
         */
        function AdminAutomatorSkillsResponse(properties) {
            this.automatorSkills = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminAutomatorSkillsResponse success.
         * @member {boolean} success
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @instance
         */
        AdminAutomatorSkillsResponse.prototype.success = false;

        /**
         * AdminAutomatorSkillsResponse message.
         * @member {string} message
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @instance
         */
        AdminAutomatorSkillsResponse.prototype.message = "";

        /**
         * AdminAutomatorSkillsResponse automatorSkills.
         * @member {Array.<Automator.IAutomatorSkill>} automatorSkills
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @instance
         */
        AdminAutomatorSkillsResponse.prototype.automatorSkills = $util.emptyArray;

        /**
         * Creates a new AdminAutomatorSkillsResponse instance using the specified properties.
         * @function create
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @static
         * @param {Automator.IAdminAutomatorSkillsResponse=} [properties] Properties to set
         * @returns {Automator.AdminAutomatorSkillsResponse} AdminAutomatorSkillsResponse instance
         */
        AdminAutomatorSkillsResponse.create = function create(properties) {
            return new AdminAutomatorSkillsResponse(properties);
        };

        /**
         * Encodes the specified AdminAutomatorSkillsResponse message. Does not implicitly {@link Automator.AdminAutomatorSkillsResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @static
         * @param {Automator.IAdminAutomatorSkillsResponse} message AdminAutomatorSkillsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminAutomatorSkillsResponse.encode = function encode(message, writer, q) {
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
            if (message.automatorSkills != null && message.automatorSkills.length)
                for (let i = 0; i < message.automatorSkills.length; ++i)
                    $root.Automator.AutomatorSkill.encode(message.automatorSkills[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified AdminAutomatorSkillsResponse message, length delimited. Does not implicitly {@link Automator.AdminAutomatorSkillsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @static
         * @param {Automator.IAdminAutomatorSkillsResponse} message AdminAutomatorSkillsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminAutomatorSkillsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminAutomatorSkillsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminAutomatorSkillsResponse} AdminAutomatorSkillsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminAutomatorSkillsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminAutomatorSkillsResponse();
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
                case 3: {
                        if (!(message.automatorSkills && message.automatorSkills.length))
                            message.automatorSkills = [];
                        message.automatorSkills.push($root.Automator.AutomatorSkill.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes an AdminAutomatorSkillsResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminAutomatorSkillsResponse} AdminAutomatorSkillsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminAutomatorSkillsResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminAutomatorSkillsResponse message.
         * @function verify
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminAutomatorSkillsResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                if (typeof message.success !== "boolean")
                    return "success: boolean expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.automatorSkills != null && Object.hasOwnProperty.call(message, "automatorSkills")) {
                if (!Array.isArray(message.automatorSkills))
                    return "automatorSkills: array expected";
                for (let i = 0; i < message.automatorSkills.length; ++i) {
                    let error = $root.Automator.AutomatorSkill.verify(message.automatorSkills[i], long + 1);
                    if (error)
                        return "automatorSkills." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AdminAutomatorSkillsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminAutomatorSkillsResponse} AdminAutomatorSkillsResponse
         */
        AdminAutomatorSkillsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminAutomatorSkillsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminAutomatorSkillsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminAutomatorSkillsResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.message != null)
                message.message = String(object.message);
            if (object.automatorSkills) {
                if (!Array.isArray(object.automatorSkills))
                    throw TypeError(".Automator.AdminAutomatorSkillsResponse.automatorSkills: array expected");
                message.automatorSkills = [];
                for (let i = 0; i < object.automatorSkills.length; ++i) {
                    if (!$util.isObject(object.automatorSkills[i]))
                        throw TypeError(".Automator.AdminAutomatorSkillsResponse.automatorSkills: object expected");
                    message.automatorSkills[i] = $root.Automator.AutomatorSkill.fromObject(object.automatorSkills[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AdminAutomatorSkillsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @static
         * @param {Automator.AdminAutomatorSkillsResponse} message AdminAutomatorSkillsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminAutomatorSkillsResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.automatorSkills = [];
            if (options.defaults) {
                object.success = false;
                object.message = "";
            }
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.automatorSkills && message.automatorSkills.length) {
                object.automatorSkills = [];
                for (let j = 0; j < message.automatorSkills.length; ++j)
                    object.automatorSkills[j] = $root.Automator.AutomatorSkill.toObject(message.automatorSkills[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this AdminAutomatorSkillsResponse to JSON.
         * @function toJSON
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminAutomatorSkillsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminAutomatorSkillsResponse
         * @function getTypeUrl
         * @memberof Automator.AdminAutomatorSkillsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminAutomatorSkillsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminAutomatorSkillsResponse";
        };

        return AdminAutomatorSkillsResponse;
    })();

    Automator.AdminResetAutomatorRequest = (function() {

        /**
         * Properties of an AdminResetAutomatorRequest.
         * @memberof Automator
         * @interface IAdminResetAutomatorRequest
         * @property {number|null} [automatorId] AdminResetAutomatorRequest automatorId
         */

        /**
         * Constructs a new AdminResetAutomatorRequest.
         * @memberof Automator
         * @classdesc Sends a message to an Automator to reset all of its settings so that it can be re-initialized.
         * 
         * We don't want this in the Console - just in Commander, or for use in testing.
         * 
         * Returns AdminResponse
         * @implements IAdminResetAutomatorRequest
         * @constructor
         * @param {Automator.IAdminResetAutomatorRequest=} [properties] Properties to set
         */
        function AdminResetAutomatorRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminResetAutomatorRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminResetAutomatorRequest
         * @instance
         */
        AdminResetAutomatorRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AdminResetAutomatorRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminResetAutomatorRequest
         * @static
         * @param {Automator.IAdminResetAutomatorRequest=} [properties] Properties to set
         * @returns {Automator.AdminResetAutomatorRequest} AdminResetAutomatorRequest instance
         */
        AdminResetAutomatorRequest.create = function create(properties) {
            return new AdminResetAutomatorRequest(properties);
        };

        /**
         * Encodes the specified AdminResetAutomatorRequest message. Does not implicitly {@link Automator.AdminResetAutomatorRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminResetAutomatorRequest
         * @static
         * @param {Automator.IAdminResetAutomatorRequest} message AdminResetAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminResetAutomatorRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            return writer;
        };

        /**
         * Encodes the specified AdminResetAutomatorRequest message, length delimited. Does not implicitly {@link Automator.AdminResetAutomatorRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminResetAutomatorRequest
         * @static
         * @param {Automator.IAdminResetAutomatorRequest} message AdminResetAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminResetAutomatorRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminResetAutomatorRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminResetAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminResetAutomatorRequest} AdminResetAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminResetAutomatorRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminResetAutomatorRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
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
         * Decodes an AdminResetAutomatorRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminResetAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminResetAutomatorRequest} AdminResetAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminResetAutomatorRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminResetAutomatorRequest message.
         * @function verify
         * @memberof Automator.AdminResetAutomatorRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminResetAutomatorRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AdminResetAutomatorRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminResetAutomatorRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminResetAutomatorRequest} AdminResetAutomatorRequest
         */
        AdminResetAutomatorRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminResetAutomatorRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminResetAutomatorRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminResetAutomatorRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AdminResetAutomatorRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminResetAutomatorRequest
         * @static
         * @param {Automator.AdminResetAutomatorRequest} message AdminResetAutomatorRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminResetAutomatorRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            return object;
        };

        /**
         * Converts this AdminResetAutomatorRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminResetAutomatorRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminResetAutomatorRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminResetAutomatorRequest
         * @function getTypeUrl
         * @memberof Automator.AdminResetAutomatorRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminResetAutomatorRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminResetAutomatorRequest";
        };

        return AdminResetAutomatorRequest;
    })();

    Automator.AdminInitializeAutomatorRequest = (function() {

        /**
         * Properties of an AdminInitializeAutomatorRequest.
         * @memberof Automator
         * @interface IAdminInitializeAutomatorRequest
         * @property {number|null} [automatorId] AdminInitializeAutomatorRequest automatorId
         */

        /**
         * Constructs a new AdminInitializeAutomatorRequest.
         * @memberof Automator
         * @classdesc Sends configuration settings to an Automator.
         * Call this after AdminAutomatorEdit to send the new settings to the Automator.
         * 
         * Returns AdminResponse
         * @implements IAdminInitializeAutomatorRequest
         * @constructor
         * @param {Automator.IAdminInitializeAutomatorRequest=} [properties] Properties to set
         */
        function AdminInitializeAutomatorRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminInitializeAutomatorRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @instance
         */
        AdminInitializeAutomatorRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AdminInitializeAutomatorRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @static
         * @param {Automator.IAdminInitializeAutomatorRequest=} [properties] Properties to set
         * @returns {Automator.AdminInitializeAutomatorRequest} AdminInitializeAutomatorRequest instance
         */
        AdminInitializeAutomatorRequest.create = function create(properties) {
            return new AdminInitializeAutomatorRequest(properties);
        };

        /**
         * Encodes the specified AdminInitializeAutomatorRequest message. Does not implicitly {@link Automator.AdminInitializeAutomatorRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @static
         * @param {Automator.IAdminInitializeAutomatorRequest} message AdminInitializeAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminInitializeAutomatorRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            return writer;
        };

        /**
         * Encodes the specified AdminInitializeAutomatorRequest message, length delimited. Does not implicitly {@link Automator.AdminInitializeAutomatorRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @static
         * @param {Automator.IAdminInitializeAutomatorRequest} message AdminInitializeAutomatorRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminInitializeAutomatorRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminInitializeAutomatorRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminInitializeAutomatorRequest} AdminInitializeAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminInitializeAutomatorRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminInitializeAutomatorRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
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
         * Decodes an AdminInitializeAutomatorRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminInitializeAutomatorRequest} AdminInitializeAutomatorRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminInitializeAutomatorRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminInitializeAutomatorRequest message.
         * @function verify
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminInitializeAutomatorRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AdminInitializeAutomatorRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminInitializeAutomatorRequest} AdminInitializeAutomatorRequest
         */
        AdminInitializeAutomatorRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminInitializeAutomatorRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminInitializeAutomatorRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminInitializeAutomatorRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AdminInitializeAutomatorRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @static
         * @param {Automator.AdminInitializeAutomatorRequest} message AdminInitializeAutomatorRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminInitializeAutomatorRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            return object;
        };

        /**
         * Converts this AdminInitializeAutomatorRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminInitializeAutomatorRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminInitializeAutomatorRequest
         * @function getTypeUrl
         * @memberof Automator.AdminInitializeAutomatorRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminInitializeAutomatorRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminInitializeAutomatorRequest";
        };

        return AdminInitializeAutomatorRequest;
    })();

    Automator.AdminAutomatorLogRequest = (function() {

        /**
         * Properties of an AdminAutomatorLogRequest.
         * @memberof Automator
         * @interface IAdminAutomatorLogRequest
         * @property {number|null} [automatorId] AdminAutomatorLogRequest automatorId
         */

        /**
         * Constructs a new AdminAutomatorLogRequest.
         * @memberof Automator
         * @classdesc AdminAutomatorLogRequest
         * 
         * Retrieves the internal log entries of Keeper that relate to the given Automator instance.
         * It does not contact the remote Automator.
         * 
         * Returns AdminResponse
         * @implements IAdminAutomatorLogRequest
         * @constructor
         * @param {Automator.IAdminAutomatorLogRequest=} [properties] Properties to set
         */
        function AdminAutomatorLogRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminAutomatorLogRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminAutomatorLogRequest
         * @instance
         */
        AdminAutomatorLogRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AdminAutomatorLogRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminAutomatorLogRequest
         * @static
         * @param {Automator.IAdminAutomatorLogRequest=} [properties] Properties to set
         * @returns {Automator.AdminAutomatorLogRequest} AdminAutomatorLogRequest instance
         */
        AdminAutomatorLogRequest.create = function create(properties) {
            return new AdminAutomatorLogRequest(properties);
        };

        /**
         * Encodes the specified AdminAutomatorLogRequest message. Does not implicitly {@link Automator.AdminAutomatorLogRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminAutomatorLogRequest
         * @static
         * @param {Automator.IAdminAutomatorLogRequest} message AdminAutomatorLogRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminAutomatorLogRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            return writer;
        };

        /**
         * Encodes the specified AdminAutomatorLogRequest message, length delimited. Does not implicitly {@link Automator.AdminAutomatorLogRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminAutomatorLogRequest
         * @static
         * @param {Automator.IAdminAutomatorLogRequest} message AdminAutomatorLogRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminAutomatorLogRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminAutomatorLogRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminAutomatorLogRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminAutomatorLogRequest} AdminAutomatorLogRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminAutomatorLogRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminAutomatorLogRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
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
         * Decodes an AdminAutomatorLogRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminAutomatorLogRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminAutomatorLogRequest} AdminAutomatorLogRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminAutomatorLogRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminAutomatorLogRequest message.
         * @function verify
         * @memberof Automator.AdminAutomatorLogRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminAutomatorLogRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AdminAutomatorLogRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminAutomatorLogRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminAutomatorLogRequest} AdminAutomatorLogRequest
         */
        AdminAutomatorLogRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminAutomatorLogRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminAutomatorLogRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminAutomatorLogRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AdminAutomatorLogRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminAutomatorLogRequest
         * @static
         * @param {Automator.AdminAutomatorLogRequest} message AdminAutomatorLogRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminAutomatorLogRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            return object;
        };

        /**
         * Converts this AdminAutomatorLogRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminAutomatorLogRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminAutomatorLogRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminAutomatorLogRequest
         * @function getTypeUrl
         * @memberof Automator.AdminAutomatorLogRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminAutomatorLogRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminAutomatorLogRequest";
        };

        return AdminAutomatorLogRequest;
    })();

    Automator.AdminAutomatorLogClearRequest = (function() {

        /**
         * Properties of an AdminAutomatorLogClearRequest.
         * @memberof Automator
         * @interface IAdminAutomatorLogClearRequest
         * @property {number|null} [automatorId] AdminAutomatorLogClearRequest automatorId
         */

        /**
         * Constructs a new AdminAutomatorLogClearRequest.
         * @memberof Automator
         * @classdesc AdminAutomatorLogClearRequest
         * 
         * Clears the internal log entries of Keeper that relate to the given Automator instance.
         * It does not contact the remote Automator.
         * 
         * Returns AdminResponse
         * @implements IAdminAutomatorLogClearRequest
         * @constructor
         * @param {Automator.IAdminAutomatorLogClearRequest=} [properties] Properties to set
         */
        function AdminAutomatorLogClearRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdminAutomatorLogClearRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @instance
         */
        AdminAutomatorLogClearRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AdminAutomatorLogClearRequest instance using the specified properties.
         * @function create
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @static
         * @param {Automator.IAdminAutomatorLogClearRequest=} [properties] Properties to set
         * @returns {Automator.AdminAutomatorLogClearRequest} AdminAutomatorLogClearRequest instance
         */
        AdminAutomatorLogClearRequest.create = function create(properties) {
            return new AdminAutomatorLogClearRequest(properties);
        };

        /**
         * Encodes the specified AdminAutomatorLogClearRequest message. Does not implicitly {@link Automator.AdminAutomatorLogClearRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @static
         * @param {Automator.IAdminAutomatorLogClearRequest} message AdminAutomatorLogClearRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminAutomatorLogClearRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            return writer;
        };

        /**
         * Encodes the specified AdminAutomatorLogClearRequest message, length delimited. Does not implicitly {@link Automator.AdminAutomatorLogClearRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @static
         * @param {Automator.IAdminAutomatorLogClearRequest} message AdminAutomatorLogClearRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdminAutomatorLogClearRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an AdminAutomatorLogClearRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.AdminAutomatorLogClearRequest} AdminAutomatorLogClearRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminAutomatorLogClearRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.AdminAutomatorLogClearRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
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
         * Decodes an AdminAutomatorLogClearRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.AdminAutomatorLogClearRequest} AdminAutomatorLogClearRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdminAutomatorLogClearRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdminAutomatorLogClearRequest message.
         * @function verify
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdminAutomatorLogClearRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AdminAutomatorLogClearRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.AdminAutomatorLogClearRequest} AdminAutomatorLogClearRequest
         */
        AdminAutomatorLogClearRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.AdminAutomatorLogClearRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.AdminAutomatorLogClearRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.AdminAutomatorLogClearRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AdminAutomatorLogClearRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @static
         * @param {Automator.AdminAutomatorLogClearRequest} message AdminAutomatorLogClearRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdminAutomatorLogClearRequest.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            return object;
        };

        /**
         * Converts this AdminAutomatorLogClearRequest to JSON.
         * @function toJSON
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdminAutomatorLogClearRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AdminAutomatorLogClearRequest
         * @function getTypeUrl
         * @memberof Automator.AdminAutomatorLogClearRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AdminAutomatorLogClearRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.AdminAutomatorLogClearRequest";
        };

        return AdminAutomatorLogClearRequest;
    })();

    Automator.ApproveTeamsForUserRequest = (function() {

        /**
         * Properties of an ApproveTeamsForUserRequest.
         * @memberof Automator
         * @interface IApproveTeamsForUserRequest
         * @property {number|null} [automatorId] ApproveTeamsForUserRequest automatorId
         * @property {Automator.SsoAuthenticationProtocolType|null} [ssoAuthenticationProtocolType] ApproveTeamsForUserRequest ssoAuthenticationProtocolType
         * @property {string|null} [authMessage] ApproveTeamsForUserRequest authMessage
         * @property {string|null} [email] ApproveTeamsForUserRequest email
         * @property {number|null} [serverEccPublicKeyId] ApproveTeamsForUserRequest serverEccPublicKeyId
         * @property {string|null} [ipAddress] ApproveTeamsForUserRequest ipAddress
         * @property {Uint8Array|null} [userPublicKey] ApproveTeamsForUserRequest userPublicKey
         * @property {Array.<Automator.ITeamDescription>|null} [teamDescription] ApproveTeamsForUserRequest teamDescription
         * @property {boolean|null} [isTesting] ApproveTeamsForUserRequest isTesting
         * @property {boolean|null} [isEccOnly] ApproveTeamsForUserRequest isEccOnly
         * @property {Uint8Array|null} [userPublicKeyEcc] ApproveTeamsForUserRequest userPublicKeyEcc
         */

        /**
         * Constructs a new ApproveTeamsForUserRequest.
         * @memberof Automator
         * @classdesc ApproveTeamsForUserRequest
         * 
         * A message from Keeper to Automator asking for approval to add a user to one or more teams.
         * 
         * @return an AutomatorResponse containing an ApproveTeamsForUserResponse
         * @implements IApproveTeamsForUserRequest
         * @constructor
         * @param {Automator.IApproveTeamsForUserRequest=} [properties] Properties to set
         */
        function ApproveTeamsForUserRequest(properties) {
            this.teamDescription = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApproveTeamsForUserRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ApproveTeamsForUserRequest ssoAuthenticationProtocolType.
         * @member {Automator.SsoAuthenticationProtocolType} ssoAuthenticationProtocolType
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.ssoAuthenticationProtocolType = 0;

        /**
         * ApproveTeamsForUserRequest authMessage.
         * @member {string} authMessage
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.authMessage = "";

        /**
         * ApproveTeamsForUserRequest email.
         * @member {string} email
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.email = "";

        /**
         * ApproveTeamsForUserRequest serverEccPublicKeyId.
         * @member {number} serverEccPublicKeyId
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.serverEccPublicKeyId = 0;

        /**
         * ApproveTeamsForUserRequest ipAddress.
         * @member {string} ipAddress
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.ipAddress = "";

        /**
         * ApproveTeamsForUserRequest userPublicKey.
         * @member {Uint8Array} userPublicKey
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.userPublicKey = $util.newBuffer([]);

        /**
         * ApproveTeamsForUserRequest teamDescription.
         * @member {Array.<Automator.ITeamDescription>} teamDescription
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.teamDescription = $util.emptyArray;

        /**
         * ApproveTeamsForUserRequest isTesting.
         * @member {boolean} isTesting
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.isTesting = false;

        /**
         * ApproveTeamsForUserRequest isEccOnly.
         * @member {boolean} isEccOnly
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.isEccOnly = false;

        /**
         * ApproveTeamsForUserRequest userPublicKeyEcc.
         * @member {Uint8Array} userPublicKeyEcc
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         */
        ApproveTeamsForUserRequest.prototype.userPublicKeyEcc = $util.newBuffer([]);

        /**
         * Creates a new ApproveTeamsForUserRequest instance using the specified properties.
         * @function create
         * @memberof Automator.ApproveTeamsForUserRequest
         * @static
         * @param {Automator.IApproveTeamsForUserRequest=} [properties] Properties to set
         * @returns {Automator.ApproveTeamsForUserRequest} ApproveTeamsForUserRequest instance
         */
        ApproveTeamsForUserRequest.create = function create(properties) {
            return new ApproveTeamsForUserRequest(properties);
        };

        /**
         * Encodes the specified ApproveTeamsForUserRequest message. Does not implicitly {@link Automator.ApproveTeamsForUserRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.ApproveTeamsForUserRequest
         * @static
         * @param {Automator.IApproveTeamsForUserRequest} message ApproveTeamsForUserRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveTeamsForUserRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.ssoAuthenticationProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthenticationProtocolType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ssoAuthenticationProtocolType);
            if (message.authMessage != null && Object.hasOwnProperty.call(message, "authMessage"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.authMessage);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.email);
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.serverEccPublicKeyId);
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.ipAddress);
            if (message.userPublicKey != null && Object.hasOwnProperty.call(message, "userPublicKey"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.userPublicKey);
            if (message.teamDescription != null && message.teamDescription.length)
                for (let i = 0; i < message.teamDescription.length; ++i)
                    $root.Automator.TeamDescription.encode(message.teamDescription[i], writer.uint32(/* id 8, wireType 2 =*/66).fork(), q + 1).ldelim();
            if (message.isTesting != null && Object.hasOwnProperty.call(message, "isTesting"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isTesting);
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.isEccOnly);
            if (message.userPublicKeyEcc != null && Object.hasOwnProperty.call(message, "userPublicKeyEcc"))
                writer.uint32(/* id 11, wireType 2 =*/90).bytes(message.userPublicKeyEcc);
            return writer;
        };

        /**
         * Encodes the specified ApproveTeamsForUserRequest message, length delimited. Does not implicitly {@link Automator.ApproveTeamsForUserRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.ApproveTeamsForUserRequest
         * @static
         * @param {Automator.IApproveTeamsForUserRequest} message ApproveTeamsForUserRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveTeamsForUserRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApproveTeamsForUserRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.ApproveTeamsForUserRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.ApproveTeamsForUserRequest} ApproveTeamsForUserRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveTeamsForUserRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.ApproveTeamsForUserRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.ssoAuthenticationProtocolType = reader.int32();
                        break;
                    }
                case 3: {
                        message.authMessage = reader.string();
                        break;
                    }
                case 4: {
                        message.email = reader.string();
                        break;
                    }
                case 5: {
                        message.serverEccPublicKeyId = reader.int32();
                        break;
                    }
                case 6: {
                        message.ipAddress = reader.string();
                        break;
                    }
                case 7: {
                        message.userPublicKey = reader.bytes();
                        break;
                    }
                case 8: {
                        if (!(message.teamDescription && message.teamDescription.length))
                            message.teamDescription = [];
                        message.teamDescription.push($root.Automator.TeamDescription.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 9: {
                        message.isTesting = reader.bool();
                        break;
                    }
                case 10: {
                        message.isEccOnly = reader.bool();
                        break;
                    }
                case 11: {
                        message.userPublicKeyEcc = reader.bytes();
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
         * Decodes an ApproveTeamsForUserRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.ApproveTeamsForUserRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.ApproveTeamsForUserRequest} ApproveTeamsForUserRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveTeamsForUserRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApproveTeamsForUserRequest message.
         * @function verify
         * @memberof Automator.ApproveTeamsForUserRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApproveTeamsForUserRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.ssoAuthenticationProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthenticationProtocolType"))
                switch (message.ssoAuthenticationProtocolType) {
                default:
                    return "ssoAuthenticationProtocolType: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.authMessage != null && Object.hasOwnProperty.call(message, "authMessage"))
                if (!$util.isString(message.authMessage))
                    return "authMessage: string expected";
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                if (!$util.isInteger(message.serverEccPublicKeyId))
                    return "serverEccPublicKeyId: integer expected";
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                if (!$util.isString(message.ipAddress))
                    return "ipAddress: string expected";
            if (message.userPublicKey != null && Object.hasOwnProperty.call(message, "userPublicKey"))
                if (!(message.userPublicKey && typeof message.userPublicKey.length === "number" || $util.isString(message.userPublicKey)))
                    return "userPublicKey: buffer expected";
            if (message.teamDescription != null && Object.hasOwnProperty.call(message, "teamDescription")) {
                if (!Array.isArray(message.teamDescription))
                    return "teamDescription: array expected";
                for (let i = 0; i < message.teamDescription.length; ++i) {
                    let error = $root.Automator.TeamDescription.verify(message.teamDescription[i], long + 1);
                    if (error)
                        return "teamDescription." + error;
                }
            }
            if (message.isTesting != null && Object.hasOwnProperty.call(message, "isTesting"))
                if (typeof message.isTesting !== "boolean")
                    return "isTesting: boolean expected";
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                if (typeof message.isEccOnly !== "boolean")
                    return "isEccOnly: boolean expected";
            if (message.userPublicKeyEcc != null && Object.hasOwnProperty.call(message, "userPublicKeyEcc"))
                if (!(message.userPublicKeyEcc && typeof message.userPublicKeyEcc.length === "number" || $util.isString(message.userPublicKeyEcc)))
                    return "userPublicKeyEcc: buffer expected";
            return null;
        };

        /**
         * Creates an ApproveTeamsForUserRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.ApproveTeamsForUserRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.ApproveTeamsForUserRequest} ApproveTeamsForUserRequest
         */
        ApproveTeamsForUserRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.ApproveTeamsForUserRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.ApproveTeamsForUserRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.ApproveTeamsForUserRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            switch (object.ssoAuthenticationProtocolType) {
            default:
                if (typeof object.ssoAuthenticationProtocolType === "number") {
                    message.ssoAuthenticationProtocolType = object.ssoAuthenticationProtocolType;
                    break;
                }
                break;
            case "UNKNOWN_PROTOCOL":
            case 0:
                message.ssoAuthenticationProtocolType = 0;
                break;
            case "SAML2":
            case 1:
                message.ssoAuthenticationProtocolType = 1;
                break;
            case "JWT":
            case 2:
                message.ssoAuthenticationProtocolType = 2;
                break;
            }
            if (object.authMessage != null)
                message.authMessage = String(object.authMessage);
            if (object.email != null)
                message.email = String(object.email);
            if (object.serverEccPublicKeyId != null)
                message.serverEccPublicKeyId = object.serverEccPublicKeyId | 0;
            if (object.ipAddress != null)
                message.ipAddress = String(object.ipAddress);
            if (object.userPublicKey != null)
                if (typeof object.userPublicKey === "string")
                    $util.base64.decode(object.userPublicKey, message.userPublicKey = $util.newBuffer($util.base64.length(object.userPublicKey)), 0);
                else if (object.userPublicKey.length >= 0)
                    message.userPublicKey = object.userPublicKey;
            if (object.teamDescription) {
                if (!Array.isArray(object.teamDescription))
                    throw TypeError(".Automator.ApproveTeamsForUserRequest.teamDescription: array expected");
                message.teamDescription = [];
                for (let i = 0; i < object.teamDescription.length; ++i) {
                    if (!$util.isObject(object.teamDescription[i]))
                        throw TypeError(".Automator.ApproveTeamsForUserRequest.teamDescription: object expected");
                    message.teamDescription[i] = $root.Automator.TeamDescription.fromObject(object.teamDescription[i], long + 1);
                }
            }
            if (object.isTesting != null)
                message.isTesting = Boolean(object.isTesting);
            if (object.isEccOnly != null)
                message.isEccOnly = Boolean(object.isEccOnly);
            if (object.userPublicKeyEcc != null)
                if (typeof object.userPublicKeyEcc === "string")
                    $util.base64.decode(object.userPublicKeyEcc, message.userPublicKeyEcc = $util.newBuffer($util.base64.length(object.userPublicKeyEcc)), 0);
                else if (object.userPublicKeyEcc.length >= 0)
                    message.userPublicKeyEcc = object.userPublicKeyEcc;
            return message;
        };

        /**
         * Creates a plain object from an ApproveTeamsForUserRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.ApproveTeamsForUserRequest
         * @static
         * @param {Automator.ApproveTeamsForUserRequest} message ApproveTeamsForUserRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApproveTeamsForUserRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.teamDescription = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.ssoAuthenticationProtocolType = options.enums === String ? "UNKNOWN_PROTOCOL" : 0;
                object.authMessage = "";
                object.email = "";
                object.serverEccPublicKeyId = 0;
                object.ipAddress = "";
                if (options.bytes === String)
                    object.userPublicKey = "";
                else {
                    object.userPublicKey = [];
                    if (options.bytes !== Array)
                        object.userPublicKey = $util.newBuffer(object.userPublicKey);
                }
                object.isTesting = false;
                object.isEccOnly = false;
                if (options.bytes === String)
                    object.userPublicKeyEcc = "";
                else {
                    object.userPublicKeyEcc = [];
                    if (options.bytes !== Array)
                        object.userPublicKeyEcc = $util.newBuffer(object.userPublicKeyEcc);
                }
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.ssoAuthenticationProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthenticationProtocolType"))
                object.ssoAuthenticationProtocolType = options.enums === String ? $root.Automator.SsoAuthenticationProtocolType[message.ssoAuthenticationProtocolType] === undefined ? message.ssoAuthenticationProtocolType : $root.Automator.SsoAuthenticationProtocolType[message.ssoAuthenticationProtocolType] : message.ssoAuthenticationProtocolType;
            if (message.authMessage != null && Object.hasOwnProperty.call(message, "authMessage"))
                object.authMessage = message.authMessage;
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                object.email = message.email;
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                object.serverEccPublicKeyId = message.serverEccPublicKeyId;
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                object.ipAddress = message.ipAddress;
            if (message.userPublicKey != null && Object.hasOwnProperty.call(message, "userPublicKey"))
                object.userPublicKey = options.bytes === String ? $util.base64.encode(message.userPublicKey, 0, message.userPublicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.userPublicKey) : message.userPublicKey;
            if (message.teamDescription && message.teamDescription.length) {
                object.teamDescription = [];
                for (let j = 0; j < message.teamDescription.length; ++j)
                    object.teamDescription[j] = $root.Automator.TeamDescription.toObject(message.teamDescription[j], options, q + 1);
            }
            if (message.isTesting != null && Object.hasOwnProperty.call(message, "isTesting"))
                object.isTesting = message.isTesting;
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                object.isEccOnly = message.isEccOnly;
            if (message.userPublicKeyEcc != null && Object.hasOwnProperty.call(message, "userPublicKeyEcc"))
                object.userPublicKeyEcc = options.bytes === String ? $util.base64.encode(message.userPublicKeyEcc, 0, message.userPublicKeyEcc.length) : options.bytes === Array ? Array.prototype.slice.call(message.userPublicKeyEcc) : message.userPublicKeyEcc;
            return object;
        };

        /**
         * Converts this ApproveTeamsForUserRequest to JSON.
         * @function toJSON
         * @memberof Automator.ApproveTeamsForUserRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApproveTeamsForUserRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApproveTeamsForUserRequest
         * @function getTypeUrl
         * @memberof Automator.ApproveTeamsForUserRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApproveTeamsForUserRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.ApproveTeamsForUserRequest";
        };

        return ApproveTeamsForUserRequest;
    })();

    Automator.TeamDescription = (function() {

        /**
         * Properties of a TeamDescription.
         * @memberof Automator
         * @interface ITeamDescription
         * @property {Uint8Array|null} [teamUid] TeamDescription teamUid
         * @property {string|null} [teamName] TeamDescription teamName
         * @property {Uint8Array|null} [encryptedTeamKey] TeamDescription encryptedTeamKey
         * @property {Enterprise.EncryptedKeyType|null} [encryptedTeamKeyType] TeamDescription encryptedTeamKeyType
         */

        /**
         * Constructs a new TeamDescription.
         * @memberof Automator
         * @classdesc TeamDescription
         * 
         * Description of a team involved in a Team approval or Team for User approval.
         * Used in ApproveTeamsForUserRequest.
         * @implements ITeamDescription
         * @constructor
         * @param {Automator.ITeamDescription=} [properties] Properties to set
         */
        function TeamDescription(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TeamDescription teamUid.
         * @member {Uint8Array} teamUid
         * @memberof Automator.TeamDescription
         * @instance
         */
        TeamDescription.prototype.teamUid = $util.newBuffer([]);

        /**
         * TeamDescription teamName.
         * @member {string} teamName
         * @memberof Automator.TeamDescription
         * @instance
         */
        TeamDescription.prototype.teamName = "";

        /**
         * TeamDescription encryptedTeamKey.
         * @member {Uint8Array} encryptedTeamKey
         * @memberof Automator.TeamDescription
         * @instance
         */
        TeamDescription.prototype.encryptedTeamKey = $util.newBuffer([]);

        /**
         * TeamDescription encryptedTeamKeyType.
         * @member {Enterprise.EncryptedKeyType} encryptedTeamKeyType
         * @memberof Automator.TeamDescription
         * @instance
         */
        TeamDescription.prototype.encryptedTeamKeyType = 0;

        /**
         * Creates a new TeamDescription instance using the specified properties.
         * @function create
         * @memberof Automator.TeamDescription
         * @static
         * @param {Automator.ITeamDescription=} [properties] Properties to set
         * @returns {Automator.TeamDescription} TeamDescription instance
         */
        TeamDescription.create = function create(properties) {
            return new TeamDescription(properties);
        };

        /**
         * Encodes the specified TeamDescription message. Does not implicitly {@link Automator.TeamDescription.verify|verify} messages.
         * @function encode
         * @memberof Automator.TeamDescription
         * @static
         * @param {Automator.ITeamDescription} message TeamDescription message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TeamDescription.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.teamUid);
            if (message.teamName != null && Object.hasOwnProperty.call(message, "teamName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.teamName);
            if (message.encryptedTeamKey != null && Object.hasOwnProperty.call(message, "encryptedTeamKey"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.encryptedTeamKey);
            if (message.encryptedTeamKeyType != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.encryptedTeamKeyType);
            return writer;
        };

        /**
         * Encodes the specified TeamDescription message, length delimited. Does not implicitly {@link Automator.TeamDescription.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.TeamDescription
         * @static
         * @param {Automator.ITeamDescription} message TeamDescription message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TeamDescription.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a TeamDescription message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.TeamDescription
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.TeamDescription} TeamDescription
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TeamDescription.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.TeamDescription();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.teamUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.teamName = reader.string();
                        break;
                    }
                case 3: {
                        message.encryptedTeamKey = reader.bytes();
                        break;
                    }
                case 4: {
                        message.encryptedTeamKeyType = reader.int32();
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
         * Decodes a TeamDescription message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.TeamDescription
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.TeamDescription} TeamDescription
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TeamDescription.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TeamDescription message.
         * @function verify
         * @memberof Automator.TeamDescription
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TeamDescription.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                if (!(message.teamUid && typeof message.teamUid.length === "number" || $util.isString(message.teamUid)))
                    return "teamUid: buffer expected";
            if (message.teamName != null && Object.hasOwnProperty.call(message, "teamName"))
                if (!$util.isString(message.teamName))
                    return "teamName: string expected";
            if (message.encryptedTeamKey != null && Object.hasOwnProperty.call(message, "encryptedTeamKey"))
                if (!(message.encryptedTeamKey && typeof message.encryptedTeamKey.length === "number" || $util.isString(message.encryptedTeamKey)))
                    return "encryptedTeamKey: buffer expected";
            if (message.encryptedTeamKeyType != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyType"))
                switch (message.encryptedTeamKeyType) {
                default:
                    return "encryptedTeamKeyType: enum value expected";
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
         * Creates a TeamDescription message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.TeamDescription
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.TeamDescription} TeamDescription
         */
        TeamDescription.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.TeamDescription)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.TeamDescription: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.TeamDescription();
            if (object.teamUid != null)
                if (typeof object.teamUid === "string")
                    $util.base64.decode(object.teamUid, message.teamUid = $util.newBuffer($util.base64.length(object.teamUid)), 0);
                else if (object.teamUid.length >= 0)
                    message.teamUid = object.teamUid;
            if (object.teamName != null)
                message.teamName = String(object.teamName);
            if (object.encryptedTeamKey != null)
                if (typeof object.encryptedTeamKey === "string")
                    $util.base64.decode(object.encryptedTeamKey, message.encryptedTeamKey = $util.newBuffer($util.base64.length(object.encryptedTeamKey)), 0);
                else if (object.encryptedTeamKey.length >= 0)
                    message.encryptedTeamKey = object.encryptedTeamKey;
            switch (object.encryptedTeamKeyType) {
            default:
                if (typeof object.encryptedTeamKeyType === "number") {
                    message.encryptedTeamKeyType = object.encryptedTeamKeyType;
                    break;
                }
                break;
            case "KT_NO_KEY":
            case 0:
                message.encryptedTeamKeyType = 0;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.encryptedTeamKeyType = 1;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.encryptedTeamKeyType = 2;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.encryptedTeamKeyType = 3;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.encryptedTeamKeyType = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a TeamDescription message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.TeamDescription
         * @static
         * @param {Automator.TeamDescription} message TeamDescription
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TeamDescription.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.teamUid = "";
                else {
                    object.teamUid = [];
                    if (options.bytes !== Array)
                        object.teamUid = $util.newBuffer(object.teamUid);
                }
                object.teamName = "";
                if (options.bytes === String)
                    object.encryptedTeamKey = "";
                else {
                    object.encryptedTeamKey = [];
                    if (options.bytes !== Array)
                        object.encryptedTeamKey = $util.newBuffer(object.encryptedTeamKey);
                }
                object.encryptedTeamKeyType = options.enums === String ? "KT_NO_KEY" : 0;
            }
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                object.teamUid = options.bytes === String ? $util.base64.encode(message.teamUid, 0, message.teamUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamUid) : message.teamUid;
            if (message.teamName != null && Object.hasOwnProperty.call(message, "teamName"))
                object.teamName = message.teamName;
            if (message.encryptedTeamKey != null && Object.hasOwnProperty.call(message, "encryptedTeamKey"))
                object.encryptedTeamKey = options.bytes === String ? $util.base64.encode(message.encryptedTeamKey, 0, message.encryptedTeamKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedTeamKey) : message.encryptedTeamKey;
            if (message.encryptedTeamKeyType != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyType"))
                object.encryptedTeamKeyType = options.enums === String ? $root.Enterprise.EncryptedKeyType[message.encryptedTeamKeyType] === undefined ? message.encryptedTeamKeyType : $root.Enterprise.EncryptedKeyType[message.encryptedTeamKeyType] : message.encryptedTeamKeyType;
            return object;
        };

        /**
         * Converts this TeamDescription to JSON.
         * @function toJSON
         * @memberof Automator.TeamDescription
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TeamDescription.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TeamDescription
         * @function getTypeUrl
         * @memberof Automator.TeamDescription
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TeamDescription.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.TeamDescription";
        };

        return TeamDescription;
    })();

    Automator.ApproveTeamsForUserResponse = (function() {

        /**
         * Properties of an ApproveTeamsForUserResponse.
         * @memberof Automator
         * @interface IApproveTeamsForUserResponse
         * @property {number|null} [automatorId] ApproveTeamsForUserResponse automatorId
         * @property {string|null} [email] ApproveTeamsForUserResponse email
         * @property {string|null} [message] ApproveTeamsForUserResponse message
         * @property {Array.<Automator.IApproveOneTeamForUserResponse>|null} [approveTeamResponse] ApproveTeamsForUserResponse approveTeamResponse
         */

        /**
         * Constructs a new ApproveTeamsForUserResponse.
         * @memberof Automator
         * @classdesc ApproveTeamsForUserResponse
         * 
         * The Response from Automator when a team is or is not approved.
         * It is included in an AutomatorResponse.
         * @implements IApproveTeamsForUserResponse
         * @constructor
         * @param {Automator.IApproveTeamsForUserResponse=} [properties] Properties to set
         */
        function ApproveTeamsForUserResponse(properties) {
            this.approveTeamResponse = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApproveTeamsForUserResponse automatorId.
         * @member {number} automatorId
         * @memberof Automator.ApproveTeamsForUserResponse
         * @instance
         */
        ApproveTeamsForUserResponse.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ApproveTeamsForUserResponse email.
         * @member {string} email
         * @memberof Automator.ApproveTeamsForUserResponse
         * @instance
         */
        ApproveTeamsForUserResponse.prototype.email = "";

        /**
         * ApproveTeamsForUserResponse message.
         * @member {string} message
         * @memberof Automator.ApproveTeamsForUserResponse
         * @instance
         */
        ApproveTeamsForUserResponse.prototype.message = "";

        /**
         * ApproveTeamsForUserResponse approveTeamResponse.
         * @member {Array.<Automator.IApproveOneTeamForUserResponse>} approveTeamResponse
         * @memberof Automator.ApproveTeamsForUserResponse
         * @instance
         */
        ApproveTeamsForUserResponse.prototype.approveTeamResponse = $util.emptyArray;

        /**
         * Creates a new ApproveTeamsForUserResponse instance using the specified properties.
         * @function create
         * @memberof Automator.ApproveTeamsForUserResponse
         * @static
         * @param {Automator.IApproveTeamsForUserResponse=} [properties] Properties to set
         * @returns {Automator.ApproveTeamsForUserResponse} ApproveTeamsForUserResponse instance
         */
        ApproveTeamsForUserResponse.create = function create(properties) {
            return new ApproveTeamsForUserResponse(properties);
        };

        /**
         * Encodes the specified ApproveTeamsForUserResponse message. Does not implicitly {@link Automator.ApproveTeamsForUserResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.ApproveTeamsForUserResponse
         * @static
         * @param {Automator.IApproveTeamsForUserResponse} message ApproveTeamsForUserResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveTeamsForUserResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.email);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            if (message.approveTeamResponse != null && message.approveTeamResponse.length)
                for (let i = 0; i < message.approveTeamResponse.length; ++i)
                    $root.Automator.ApproveOneTeamForUserResponse.encode(message.approveTeamResponse[i], writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ApproveTeamsForUserResponse message, length delimited. Does not implicitly {@link Automator.ApproveTeamsForUserResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.ApproveTeamsForUserResponse
         * @static
         * @param {Automator.IApproveTeamsForUserResponse} message ApproveTeamsForUserResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveTeamsForUserResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApproveTeamsForUserResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.ApproveTeamsForUserResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.ApproveTeamsForUserResponse} ApproveTeamsForUserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveTeamsForUserResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.ApproveTeamsForUserResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.email = reader.string();
                        break;
                    }
                case 3: {
                        message.message = reader.string();
                        break;
                    }
                case 4: {
                        if (!(message.approveTeamResponse && message.approveTeamResponse.length))
                            message.approveTeamResponse = [];
                        message.approveTeamResponse.push($root.Automator.ApproveOneTeamForUserResponse.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes an ApproveTeamsForUserResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.ApproveTeamsForUserResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.ApproveTeamsForUserResponse} ApproveTeamsForUserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveTeamsForUserResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApproveTeamsForUserResponse message.
         * @function verify
         * @memberof Automator.ApproveTeamsForUserResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApproveTeamsForUserResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.approveTeamResponse != null && Object.hasOwnProperty.call(message, "approveTeamResponse")) {
                if (!Array.isArray(message.approveTeamResponse))
                    return "approveTeamResponse: array expected";
                for (let i = 0; i < message.approveTeamResponse.length; ++i) {
                    let error = $root.Automator.ApproveOneTeamForUserResponse.verify(message.approveTeamResponse[i], long + 1);
                    if (error)
                        return "approveTeamResponse." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ApproveTeamsForUserResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.ApproveTeamsForUserResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.ApproveTeamsForUserResponse} ApproveTeamsForUserResponse
         */
        ApproveTeamsForUserResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.ApproveTeamsForUserResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.ApproveTeamsForUserResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.ApproveTeamsForUserResponse();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            if (object.email != null)
                message.email = String(object.email);
            if (object.message != null)
                message.message = String(object.message);
            if (object.approveTeamResponse) {
                if (!Array.isArray(object.approveTeamResponse))
                    throw TypeError(".Automator.ApproveTeamsForUserResponse.approveTeamResponse: array expected");
                message.approveTeamResponse = [];
                for (let i = 0; i < object.approveTeamResponse.length; ++i) {
                    if (!$util.isObject(object.approveTeamResponse[i]))
                        throw TypeError(".Automator.ApproveTeamsForUserResponse.approveTeamResponse: object expected");
                    message.approveTeamResponse[i] = $root.Automator.ApproveOneTeamForUserResponse.fromObject(object.approveTeamResponse[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ApproveTeamsForUserResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.ApproveTeamsForUserResponse
         * @static
         * @param {Automator.ApproveTeamsForUserResponse} message ApproveTeamsForUserResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApproveTeamsForUserResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.approveTeamResponse = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.email = "";
                object.message = "";
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                object.email = message.email;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.approveTeamResponse && message.approveTeamResponse.length) {
                object.approveTeamResponse = [];
                for (let j = 0; j < message.approveTeamResponse.length; ++j)
                    object.approveTeamResponse[j] = $root.Automator.ApproveOneTeamForUserResponse.toObject(message.approveTeamResponse[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ApproveTeamsForUserResponse to JSON.
         * @function toJSON
         * @memberof Automator.ApproveTeamsForUserResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApproveTeamsForUserResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApproveTeamsForUserResponse
         * @function getTypeUrl
         * @memberof Automator.ApproveTeamsForUserResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApproveTeamsForUserResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.ApproveTeamsForUserResponse";
        };

        return ApproveTeamsForUserResponse;
    })();

    Automator.ApproveOneTeamForUserResponse = (function() {

        /**
         * Properties of an ApproveOneTeamForUserResponse.
         * @memberof Automator
         * @interface IApproveOneTeamForUserResponse
         * @property {boolean|null} [approved] ApproveOneTeamForUserResponse approved
         * @property {string|null} [message] ApproveOneTeamForUserResponse message
         * @property {Uint8Array|null} [teamUid] ApproveOneTeamForUserResponse teamUid
         * @property {string|null} [teamName] ApproveOneTeamForUserResponse teamName
         * @property {Uint8Array|null} [userEncryptedTeamKey] ApproveOneTeamForUserResponse userEncryptedTeamKey
         * @property {Enterprise.EncryptedKeyType|null} [userEncryptedTeamKeyType] ApproveOneTeamForUserResponse userEncryptedTeamKeyType
         * @property {Uint8Array|null} [userEncryptedTeamKeyByEcc] ApproveOneTeamForUserResponse userEncryptedTeamKeyByEcc
         * @property {Enterprise.EncryptedKeyType|null} [userEncryptedTeamKeyByEccType] ApproveOneTeamForUserResponse userEncryptedTeamKeyByEccType
         */

        /**
         * Constructs a new ApproveOneTeamForUserResponse.
         * @memberof Automator
         * @classdesc ApproveOneTeamForUserResponse
         * 
         * Part of the ApproveTeamsForUserResponse.
         * Provides information needed to add one user to one team.
         * @implements IApproveOneTeamForUserResponse
         * @constructor
         * @param {Automator.IApproveOneTeamForUserResponse=} [properties] Properties to set
         */
        function ApproveOneTeamForUserResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApproveOneTeamForUserResponse approved.
         * @member {boolean} approved
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @instance
         */
        ApproveOneTeamForUserResponse.prototype.approved = false;

        /**
         * ApproveOneTeamForUserResponse message.
         * @member {string} message
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @instance
         */
        ApproveOneTeamForUserResponse.prototype.message = "";

        /**
         * ApproveOneTeamForUserResponse teamUid.
         * @member {Uint8Array} teamUid
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @instance
         */
        ApproveOneTeamForUserResponse.prototype.teamUid = $util.newBuffer([]);

        /**
         * ApproveOneTeamForUserResponse teamName.
         * @member {string} teamName
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @instance
         */
        ApproveOneTeamForUserResponse.prototype.teamName = "";

        /**
         * ApproveOneTeamForUserResponse userEncryptedTeamKey.
         * @member {Uint8Array} userEncryptedTeamKey
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @instance
         */
        ApproveOneTeamForUserResponse.prototype.userEncryptedTeamKey = $util.newBuffer([]);

        /**
         * ApproveOneTeamForUserResponse userEncryptedTeamKeyType.
         * @member {Enterprise.EncryptedKeyType} userEncryptedTeamKeyType
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @instance
         */
        ApproveOneTeamForUserResponse.prototype.userEncryptedTeamKeyType = 0;

        /**
         * ApproveOneTeamForUserResponse userEncryptedTeamKeyByEcc.
         * @member {Uint8Array} userEncryptedTeamKeyByEcc
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @instance
         */
        ApproveOneTeamForUserResponse.prototype.userEncryptedTeamKeyByEcc = $util.newBuffer([]);

        /**
         * ApproveOneTeamForUserResponse userEncryptedTeamKeyByEccType.
         * @member {Enterprise.EncryptedKeyType} userEncryptedTeamKeyByEccType
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @instance
         */
        ApproveOneTeamForUserResponse.prototype.userEncryptedTeamKeyByEccType = 0;

        /**
         * Creates a new ApproveOneTeamForUserResponse instance using the specified properties.
         * @function create
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @static
         * @param {Automator.IApproveOneTeamForUserResponse=} [properties] Properties to set
         * @returns {Automator.ApproveOneTeamForUserResponse} ApproveOneTeamForUserResponse instance
         */
        ApproveOneTeamForUserResponse.create = function create(properties) {
            return new ApproveOneTeamForUserResponse(properties);
        };

        /**
         * Encodes the specified ApproveOneTeamForUserResponse message. Does not implicitly {@link Automator.ApproveOneTeamForUserResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @static
         * @param {Automator.IApproveOneTeamForUserResponse} message ApproveOneTeamForUserResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveOneTeamForUserResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.approved);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.teamUid);
            if (message.teamName != null && Object.hasOwnProperty.call(message, "teamName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.teamName);
            if (message.userEncryptedTeamKey != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.userEncryptedTeamKey);
            if (message.userEncryptedTeamKeyType != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKeyType"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.userEncryptedTeamKeyType);
            if (message.userEncryptedTeamKeyByEcc != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKeyByEcc"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.userEncryptedTeamKeyByEcc);
            if (message.userEncryptedTeamKeyByEccType != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKeyByEccType"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.userEncryptedTeamKeyByEccType);
            return writer;
        };

        /**
         * Encodes the specified ApproveOneTeamForUserResponse message, length delimited. Does not implicitly {@link Automator.ApproveOneTeamForUserResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @static
         * @param {Automator.IApproveOneTeamForUserResponse} message ApproveOneTeamForUserResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveOneTeamForUserResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApproveOneTeamForUserResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.ApproveOneTeamForUserResponse} ApproveOneTeamForUserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveOneTeamForUserResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.ApproveOneTeamForUserResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.approved = reader.bool();
                        break;
                    }
                case 2: {
                        message.message = reader.string();
                        break;
                    }
                case 3: {
                        message.teamUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.teamName = reader.string();
                        break;
                    }
                case 5: {
                        message.userEncryptedTeamKey = reader.bytes();
                        break;
                    }
                case 6: {
                        message.userEncryptedTeamKeyType = reader.int32();
                        break;
                    }
                case 7: {
                        message.userEncryptedTeamKeyByEcc = reader.bytes();
                        break;
                    }
                case 8: {
                        message.userEncryptedTeamKeyByEccType = reader.int32();
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
         * Decodes an ApproveOneTeamForUserResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.ApproveOneTeamForUserResponse} ApproveOneTeamForUserResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveOneTeamForUserResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApproveOneTeamForUserResponse message.
         * @function verify
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApproveOneTeamForUserResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                if (typeof message.approved !== "boolean")
                    return "approved: boolean expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                if (!(message.teamUid && typeof message.teamUid.length === "number" || $util.isString(message.teamUid)))
                    return "teamUid: buffer expected";
            if (message.teamName != null && Object.hasOwnProperty.call(message, "teamName"))
                if (!$util.isString(message.teamName))
                    return "teamName: string expected";
            if (message.userEncryptedTeamKey != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKey"))
                if (!(message.userEncryptedTeamKey && typeof message.userEncryptedTeamKey.length === "number" || $util.isString(message.userEncryptedTeamKey)))
                    return "userEncryptedTeamKey: buffer expected";
            if (message.userEncryptedTeamKeyType != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKeyType"))
                switch (message.userEncryptedTeamKeyType) {
                default:
                    return "userEncryptedTeamKeyType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.userEncryptedTeamKeyByEcc != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKeyByEcc"))
                if (!(message.userEncryptedTeamKeyByEcc && typeof message.userEncryptedTeamKeyByEcc.length === "number" || $util.isString(message.userEncryptedTeamKeyByEcc)))
                    return "userEncryptedTeamKeyByEcc: buffer expected";
            if (message.userEncryptedTeamKeyByEccType != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKeyByEccType"))
                switch (message.userEncryptedTeamKeyByEccType) {
                default:
                    return "userEncryptedTeamKeyByEccType: enum value expected";
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
         * Creates an ApproveOneTeamForUserResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.ApproveOneTeamForUserResponse} ApproveOneTeamForUserResponse
         */
        ApproveOneTeamForUserResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.ApproveOneTeamForUserResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.ApproveOneTeamForUserResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.ApproveOneTeamForUserResponse();
            if (object.approved != null)
                message.approved = Boolean(object.approved);
            if (object.message != null)
                message.message = String(object.message);
            if (object.teamUid != null)
                if (typeof object.teamUid === "string")
                    $util.base64.decode(object.teamUid, message.teamUid = $util.newBuffer($util.base64.length(object.teamUid)), 0);
                else if (object.teamUid.length >= 0)
                    message.teamUid = object.teamUid;
            if (object.teamName != null)
                message.teamName = String(object.teamName);
            if (object.userEncryptedTeamKey != null)
                if (typeof object.userEncryptedTeamKey === "string")
                    $util.base64.decode(object.userEncryptedTeamKey, message.userEncryptedTeamKey = $util.newBuffer($util.base64.length(object.userEncryptedTeamKey)), 0);
                else if (object.userEncryptedTeamKey.length >= 0)
                    message.userEncryptedTeamKey = object.userEncryptedTeamKey;
            switch (object.userEncryptedTeamKeyType) {
            default:
                if (typeof object.userEncryptedTeamKeyType === "number") {
                    message.userEncryptedTeamKeyType = object.userEncryptedTeamKeyType;
                    break;
                }
                break;
            case "KT_NO_KEY":
            case 0:
                message.userEncryptedTeamKeyType = 0;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.userEncryptedTeamKeyType = 1;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.userEncryptedTeamKeyType = 2;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.userEncryptedTeamKeyType = 3;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.userEncryptedTeamKeyType = 4;
                break;
            }
            if (object.userEncryptedTeamKeyByEcc != null)
                if (typeof object.userEncryptedTeamKeyByEcc === "string")
                    $util.base64.decode(object.userEncryptedTeamKeyByEcc, message.userEncryptedTeamKeyByEcc = $util.newBuffer($util.base64.length(object.userEncryptedTeamKeyByEcc)), 0);
                else if (object.userEncryptedTeamKeyByEcc.length >= 0)
                    message.userEncryptedTeamKeyByEcc = object.userEncryptedTeamKeyByEcc;
            switch (object.userEncryptedTeamKeyByEccType) {
            default:
                if (typeof object.userEncryptedTeamKeyByEccType === "number") {
                    message.userEncryptedTeamKeyByEccType = object.userEncryptedTeamKeyByEccType;
                    break;
                }
                break;
            case "KT_NO_KEY":
            case 0:
                message.userEncryptedTeamKeyByEccType = 0;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.userEncryptedTeamKeyByEccType = 1;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.userEncryptedTeamKeyByEccType = 2;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.userEncryptedTeamKeyByEccType = 3;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.userEncryptedTeamKeyByEccType = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an ApproveOneTeamForUserResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @static
         * @param {Automator.ApproveOneTeamForUserResponse} message ApproveOneTeamForUserResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApproveOneTeamForUserResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.approved = false;
                object.message = "";
                if (options.bytes === String)
                    object.teamUid = "";
                else {
                    object.teamUid = [];
                    if (options.bytes !== Array)
                        object.teamUid = $util.newBuffer(object.teamUid);
                }
                object.teamName = "";
                if (options.bytes === String)
                    object.userEncryptedTeamKey = "";
                else {
                    object.userEncryptedTeamKey = [];
                    if (options.bytes !== Array)
                        object.userEncryptedTeamKey = $util.newBuffer(object.userEncryptedTeamKey);
                }
                object.userEncryptedTeamKeyType = options.enums === String ? "KT_NO_KEY" : 0;
                if (options.bytes === String)
                    object.userEncryptedTeamKeyByEcc = "";
                else {
                    object.userEncryptedTeamKeyByEcc = [];
                    if (options.bytes !== Array)
                        object.userEncryptedTeamKeyByEcc = $util.newBuffer(object.userEncryptedTeamKeyByEcc);
                }
                object.userEncryptedTeamKeyByEccType = options.enums === String ? "KT_NO_KEY" : 0;
            }
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                object.approved = message.approved;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                object.teamUid = options.bytes === String ? $util.base64.encode(message.teamUid, 0, message.teamUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamUid) : message.teamUid;
            if (message.teamName != null && Object.hasOwnProperty.call(message, "teamName"))
                object.teamName = message.teamName;
            if (message.userEncryptedTeamKey != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKey"))
                object.userEncryptedTeamKey = options.bytes === String ? $util.base64.encode(message.userEncryptedTeamKey, 0, message.userEncryptedTeamKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.userEncryptedTeamKey) : message.userEncryptedTeamKey;
            if (message.userEncryptedTeamKeyType != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKeyType"))
                object.userEncryptedTeamKeyType = options.enums === String ? $root.Enterprise.EncryptedKeyType[message.userEncryptedTeamKeyType] === undefined ? message.userEncryptedTeamKeyType : $root.Enterprise.EncryptedKeyType[message.userEncryptedTeamKeyType] : message.userEncryptedTeamKeyType;
            if (message.userEncryptedTeamKeyByEcc != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKeyByEcc"))
                object.userEncryptedTeamKeyByEcc = options.bytes === String ? $util.base64.encode(message.userEncryptedTeamKeyByEcc, 0, message.userEncryptedTeamKeyByEcc.length) : options.bytes === Array ? Array.prototype.slice.call(message.userEncryptedTeamKeyByEcc) : message.userEncryptedTeamKeyByEcc;
            if (message.userEncryptedTeamKeyByEccType != null && Object.hasOwnProperty.call(message, "userEncryptedTeamKeyByEccType"))
                object.userEncryptedTeamKeyByEccType = options.enums === String ? $root.Enterprise.EncryptedKeyType[message.userEncryptedTeamKeyByEccType] === undefined ? message.userEncryptedTeamKeyByEccType : $root.Enterprise.EncryptedKeyType[message.userEncryptedTeamKeyByEccType] : message.userEncryptedTeamKeyByEccType;
            return object;
        };

        /**
         * Converts this ApproveOneTeamForUserResponse to JSON.
         * @function toJSON
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApproveOneTeamForUserResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApproveOneTeamForUserResponse
         * @function getTypeUrl
         * @memberof Automator.ApproveOneTeamForUserResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApproveOneTeamForUserResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.ApproveOneTeamForUserResponse";
        };

        return ApproveOneTeamForUserResponse;
    })();

    Automator.ApproveTeamsRequest = (function() {

        /**
         * Properties of an ApproveTeamsRequest.
         * @memberof Automator
         * @interface IApproveTeamsRequest
         * @property {number|null} [automatorId] ApproveTeamsRequest automatorId
         * @property {Automator.SsoAuthenticationProtocolType|null} [ssoAuthenticationProtocolType] ApproveTeamsRequest ssoAuthenticationProtocolType
         * @property {string|null} [authMessage] ApproveTeamsRequest authMessage
         * @property {string|null} [email] ApproveTeamsRequest email
         * @property {number|null} [serverEccPublicKeyId] ApproveTeamsRequest serverEccPublicKeyId
         * @property {string|null} [ipAddress] ApproveTeamsRequest ipAddress
         * @property {Array.<Automator.ITeamDescription>|null} [teamDescription] ApproveTeamsRequest teamDescription
         * @property {boolean|null} [isEccOnly] ApproveTeamsRequest isEccOnly
         * @property {boolean|null} [isTesting] ApproveTeamsRequest isTesting
         */

        /**
         * Constructs a new ApproveTeamsRequest.
         * @memberof Automator
         * @classdesc ApproveTeamsRequest
         * 
         * A message from Keeper to Automator asking for approval to create one or more teams.
         * 
         * @return an AutomatorResponse containing an ApproveTeamsResponse
         * @implements IApproveTeamsRequest
         * @constructor
         * @param {Automator.IApproveTeamsRequest=} [properties] Properties to set
         */
        function ApproveTeamsRequest(properties) {
            this.teamDescription = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApproveTeamsRequest automatorId.
         * @member {number} automatorId
         * @memberof Automator.ApproveTeamsRequest
         * @instance
         */
        ApproveTeamsRequest.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ApproveTeamsRequest ssoAuthenticationProtocolType.
         * @member {Automator.SsoAuthenticationProtocolType} ssoAuthenticationProtocolType
         * @memberof Automator.ApproveTeamsRequest
         * @instance
         */
        ApproveTeamsRequest.prototype.ssoAuthenticationProtocolType = 0;

        /**
         * ApproveTeamsRequest authMessage.
         * @member {string} authMessage
         * @memberof Automator.ApproveTeamsRequest
         * @instance
         */
        ApproveTeamsRequest.prototype.authMessage = "";

        /**
         * ApproveTeamsRequest email.
         * @member {string} email
         * @memberof Automator.ApproveTeamsRequest
         * @instance
         */
        ApproveTeamsRequest.prototype.email = "";

        /**
         * ApproveTeamsRequest serverEccPublicKeyId.
         * @member {number} serverEccPublicKeyId
         * @memberof Automator.ApproveTeamsRequest
         * @instance
         */
        ApproveTeamsRequest.prototype.serverEccPublicKeyId = 0;

        /**
         * ApproveTeamsRequest ipAddress.
         * @member {string} ipAddress
         * @memberof Automator.ApproveTeamsRequest
         * @instance
         */
        ApproveTeamsRequest.prototype.ipAddress = "";

        /**
         * ApproveTeamsRequest teamDescription.
         * @member {Array.<Automator.ITeamDescription>} teamDescription
         * @memberof Automator.ApproveTeamsRequest
         * @instance
         */
        ApproveTeamsRequest.prototype.teamDescription = $util.emptyArray;

        /**
         * ApproveTeamsRequest isEccOnly.
         * @member {boolean} isEccOnly
         * @memberof Automator.ApproveTeamsRequest
         * @instance
         */
        ApproveTeamsRequest.prototype.isEccOnly = false;

        /**
         * ApproveTeamsRequest isTesting.
         * @member {boolean} isTesting
         * @memberof Automator.ApproveTeamsRequest
         * @instance
         */
        ApproveTeamsRequest.prototype.isTesting = false;

        /**
         * Creates a new ApproveTeamsRequest instance using the specified properties.
         * @function create
         * @memberof Automator.ApproveTeamsRequest
         * @static
         * @param {Automator.IApproveTeamsRequest=} [properties] Properties to set
         * @returns {Automator.ApproveTeamsRequest} ApproveTeamsRequest instance
         */
        ApproveTeamsRequest.create = function create(properties) {
            return new ApproveTeamsRequest(properties);
        };

        /**
         * Encodes the specified ApproveTeamsRequest message. Does not implicitly {@link Automator.ApproveTeamsRequest.verify|verify} messages.
         * @function encode
         * @memberof Automator.ApproveTeamsRequest
         * @static
         * @param {Automator.IApproveTeamsRequest} message ApproveTeamsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveTeamsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.ssoAuthenticationProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthenticationProtocolType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ssoAuthenticationProtocolType);
            if (message.authMessage != null && Object.hasOwnProperty.call(message, "authMessage"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.authMessage);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.email);
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.serverEccPublicKeyId);
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.ipAddress);
            if (message.teamDescription != null && message.teamDescription.length)
                for (let i = 0; i < message.teamDescription.length; ++i)
                    $root.Automator.TeamDescription.encode(message.teamDescription[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isEccOnly);
            if (message.isTesting != null && Object.hasOwnProperty.call(message, "isTesting"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isTesting);
            return writer;
        };

        /**
         * Encodes the specified ApproveTeamsRequest message, length delimited. Does not implicitly {@link Automator.ApproveTeamsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.ApproveTeamsRequest
         * @static
         * @param {Automator.IApproveTeamsRequest} message ApproveTeamsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveTeamsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApproveTeamsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.ApproveTeamsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.ApproveTeamsRequest} ApproveTeamsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveTeamsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.ApproveTeamsRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.ssoAuthenticationProtocolType = reader.int32();
                        break;
                    }
                case 3: {
                        message.authMessage = reader.string();
                        break;
                    }
                case 4: {
                        message.email = reader.string();
                        break;
                    }
                case 5: {
                        message.serverEccPublicKeyId = reader.int32();
                        break;
                    }
                case 6: {
                        message.ipAddress = reader.string();
                        break;
                    }
                case 7: {
                        if (!(message.teamDescription && message.teamDescription.length))
                            message.teamDescription = [];
                        message.teamDescription.push($root.Automator.TeamDescription.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 8: {
                        message.isEccOnly = reader.bool();
                        break;
                    }
                case 9: {
                        message.isTesting = reader.bool();
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
         * Decodes an ApproveTeamsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.ApproveTeamsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.ApproveTeamsRequest} ApproveTeamsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveTeamsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApproveTeamsRequest message.
         * @function verify
         * @memberof Automator.ApproveTeamsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApproveTeamsRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.ssoAuthenticationProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthenticationProtocolType"))
                switch (message.ssoAuthenticationProtocolType) {
                default:
                    return "ssoAuthenticationProtocolType: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.authMessage != null && Object.hasOwnProperty.call(message, "authMessage"))
                if (!$util.isString(message.authMessage))
                    return "authMessage: string expected";
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                if (!$util.isInteger(message.serverEccPublicKeyId))
                    return "serverEccPublicKeyId: integer expected";
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                if (!$util.isString(message.ipAddress))
                    return "ipAddress: string expected";
            if (message.teamDescription != null && Object.hasOwnProperty.call(message, "teamDescription")) {
                if (!Array.isArray(message.teamDescription))
                    return "teamDescription: array expected";
                for (let i = 0; i < message.teamDescription.length; ++i) {
                    let error = $root.Automator.TeamDescription.verify(message.teamDescription[i], long + 1);
                    if (error)
                        return "teamDescription." + error;
                }
            }
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                if (typeof message.isEccOnly !== "boolean")
                    return "isEccOnly: boolean expected";
            if (message.isTesting != null && Object.hasOwnProperty.call(message, "isTesting"))
                if (typeof message.isTesting !== "boolean")
                    return "isTesting: boolean expected";
            return null;
        };

        /**
         * Creates an ApproveTeamsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.ApproveTeamsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.ApproveTeamsRequest} ApproveTeamsRequest
         */
        ApproveTeamsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.ApproveTeamsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.ApproveTeamsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.ApproveTeamsRequest();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            switch (object.ssoAuthenticationProtocolType) {
            default:
                if (typeof object.ssoAuthenticationProtocolType === "number") {
                    message.ssoAuthenticationProtocolType = object.ssoAuthenticationProtocolType;
                    break;
                }
                break;
            case "UNKNOWN_PROTOCOL":
            case 0:
                message.ssoAuthenticationProtocolType = 0;
                break;
            case "SAML2":
            case 1:
                message.ssoAuthenticationProtocolType = 1;
                break;
            case "JWT":
            case 2:
                message.ssoAuthenticationProtocolType = 2;
                break;
            }
            if (object.authMessage != null)
                message.authMessage = String(object.authMessage);
            if (object.email != null)
                message.email = String(object.email);
            if (object.serverEccPublicKeyId != null)
                message.serverEccPublicKeyId = object.serverEccPublicKeyId | 0;
            if (object.ipAddress != null)
                message.ipAddress = String(object.ipAddress);
            if (object.teamDescription) {
                if (!Array.isArray(object.teamDescription))
                    throw TypeError(".Automator.ApproveTeamsRequest.teamDescription: array expected");
                message.teamDescription = [];
                for (let i = 0; i < object.teamDescription.length; ++i) {
                    if (!$util.isObject(object.teamDescription[i]))
                        throw TypeError(".Automator.ApproveTeamsRequest.teamDescription: object expected");
                    message.teamDescription[i] = $root.Automator.TeamDescription.fromObject(object.teamDescription[i], long + 1);
                }
            }
            if (object.isEccOnly != null)
                message.isEccOnly = Boolean(object.isEccOnly);
            if (object.isTesting != null)
                message.isTesting = Boolean(object.isTesting);
            return message;
        };

        /**
         * Creates a plain object from an ApproveTeamsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.ApproveTeamsRequest
         * @static
         * @param {Automator.ApproveTeamsRequest} message ApproveTeamsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApproveTeamsRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.teamDescription = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.ssoAuthenticationProtocolType = options.enums === String ? "UNKNOWN_PROTOCOL" : 0;
                object.authMessage = "";
                object.email = "";
                object.serverEccPublicKeyId = 0;
                object.ipAddress = "";
                object.isEccOnly = false;
                object.isTesting = false;
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.ssoAuthenticationProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthenticationProtocolType"))
                object.ssoAuthenticationProtocolType = options.enums === String ? $root.Automator.SsoAuthenticationProtocolType[message.ssoAuthenticationProtocolType] === undefined ? message.ssoAuthenticationProtocolType : $root.Automator.SsoAuthenticationProtocolType[message.ssoAuthenticationProtocolType] : message.ssoAuthenticationProtocolType;
            if (message.authMessage != null && Object.hasOwnProperty.call(message, "authMessage"))
                object.authMessage = message.authMessage;
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                object.email = message.email;
            if (message.serverEccPublicKeyId != null && Object.hasOwnProperty.call(message, "serverEccPublicKeyId"))
                object.serverEccPublicKeyId = message.serverEccPublicKeyId;
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                object.ipAddress = message.ipAddress;
            if (message.teamDescription && message.teamDescription.length) {
                object.teamDescription = [];
                for (let j = 0; j < message.teamDescription.length; ++j)
                    object.teamDescription[j] = $root.Automator.TeamDescription.toObject(message.teamDescription[j], options, q + 1);
            }
            if (message.isEccOnly != null && Object.hasOwnProperty.call(message, "isEccOnly"))
                object.isEccOnly = message.isEccOnly;
            if (message.isTesting != null && Object.hasOwnProperty.call(message, "isTesting"))
                object.isTesting = message.isTesting;
            return object;
        };

        /**
         * Converts this ApproveTeamsRequest to JSON.
         * @function toJSON
         * @memberof Automator.ApproveTeamsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApproveTeamsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApproveTeamsRequest
         * @function getTypeUrl
         * @memberof Automator.ApproveTeamsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApproveTeamsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.ApproveTeamsRequest";
        };

        return ApproveTeamsRequest;
    })();

    Automator.ApproveTeamsResponse = (function() {

        /**
         * Properties of an ApproveTeamsResponse.
         * @memberof Automator
         * @interface IApproveTeamsResponse
         * @property {number|null} [automatorId] ApproveTeamsResponse automatorId
         * @property {string|null} [message] ApproveTeamsResponse message
         * @property {Array.<Automator.IApproveOneTeamResponse>|null} [approveTeamResponse] ApproveTeamsResponse approveTeamResponse
         */

        /**
         * Constructs a new ApproveTeamsResponse.
         * @memberof Automator
         * @classdesc ApproveTeamsResponse
         * 
         * The Response from Automator when a team is or is not approved.
         * It is included in an AutomatorResponse.
         * @implements IApproveTeamsResponse
         * @constructor
         * @param {Automator.IApproveTeamsResponse=} [properties] Properties to set
         */
        function ApproveTeamsResponse(properties) {
            this.approveTeamResponse = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApproveTeamsResponse automatorId.
         * @member {number} automatorId
         * @memberof Automator.ApproveTeamsResponse
         * @instance
         */
        ApproveTeamsResponse.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ApproveTeamsResponse message.
         * @member {string} message
         * @memberof Automator.ApproveTeamsResponse
         * @instance
         */
        ApproveTeamsResponse.prototype.message = "";

        /**
         * ApproveTeamsResponse approveTeamResponse.
         * @member {Array.<Automator.IApproveOneTeamResponse>} approveTeamResponse
         * @memberof Automator.ApproveTeamsResponse
         * @instance
         */
        ApproveTeamsResponse.prototype.approveTeamResponse = $util.emptyArray;

        /**
         * Creates a new ApproveTeamsResponse instance using the specified properties.
         * @function create
         * @memberof Automator.ApproveTeamsResponse
         * @static
         * @param {Automator.IApproveTeamsResponse=} [properties] Properties to set
         * @returns {Automator.ApproveTeamsResponse} ApproveTeamsResponse instance
         */
        ApproveTeamsResponse.create = function create(properties) {
            return new ApproveTeamsResponse(properties);
        };

        /**
         * Encodes the specified ApproveTeamsResponse message. Does not implicitly {@link Automator.ApproveTeamsResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.ApproveTeamsResponse
         * @static
         * @param {Automator.IApproveTeamsResponse} message ApproveTeamsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveTeamsResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.automatorId);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.approveTeamResponse != null && message.approveTeamResponse.length)
                for (let i = 0; i < message.approveTeamResponse.length; ++i)
                    $root.Automator.ApproveOneTeamResponse.encode(message.approveTeamResponse[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ApproveTeamsResponse message, length delimited. Does not implicitly {@link Automator.ApproveTeamsResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.ApproveTeamsResponse
         * @static
         * @param {Automator.IApproveTeamsResponse} message ApproveTeamsResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveTeamsResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApproveTeamsResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.ApproveTeamsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.ApproveTeamsResponse} ApproveTeamsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveTeamsResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.ApproveTeamsResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.int64();
                        break;
                    }
                case 2: {
                        message.message = reader.string();
                        break;
                    }
                case 3: {
                        if (!(message.approveTeamResponse && message.approveTeamResponse.length))
                            message.approveTeamResponse = [];
                        message.approveTeamResponse.push($root.Automator.ApproveOneTeamResponse.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes an ApproveTeamsResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.ApproveTeamsResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.ApproveTeamsResponse} ApproveTeamsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveTeamsResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApproveTeamsResponse message.
         * @function verify
         * @memberof Automator.ApproveTeamsResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApproveTeamsResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.approveTeamResponse != null && Object.hasOwnProperty.call(message, "approveTeamResponse")) {
                if (!Array.isArray(message.approveTeamResponse))
                    return "approveTeamResponse: array expected";
                for (let i = 0; i < message.approveTeamResponse.length; ++i) {
                    let error = $root.Automator.ApproveOneTeamResponse.verify(message.approveTeamResponse[i], long + 1);
                    if (error)
                        return "approveTeamResponse." + error;
                }
            }
            return null;
        };

        /**
         * Creates an ApproveTeamsResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.ApproveTeamsResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.ApproveTeamsResponse} ApproveTeamsResponse
         */
        ApproveTeamsResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.ApproveTeamsResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.ApproveTeamsResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.ApproveTeamsResponse();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, false);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber();
            if (object.message != null)
                message.message = String(object.message);
            if (object.approveTeamResponse) {
                if (!Array.isArray(object.approveTeamResponse))
                    throw TypeError(".Automator.ApproveTeamsResponse.approveTeamResponse: array expected");
                message.approveTeamResponse = [];
                for (let i = 0; i < object.approveTeamResponse.length; ++i) {
                    if (!$util.isObject(object.approveTeamResponse[i]))
                        throw TypeError(".Automator.ApproveTeamsResponse.approveTeamResponse: object expected");
                    message.approveTeamResponse[i] = $root.Automator.ApproveOneTeamResponse.fromObject(object.approveTeamResponse[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ApproveTeamsResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.ApproveTeamsResponse
         * @static
         * @param {Automator.ApproveTeamsResponse} message ApproveTeamsResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApproveTeamsResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.approveTeamResponse = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.message = "";
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, false).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber() : message.automatorId;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.approveTeamResponse && message.approveTeamResponse.length) {
                object.approveTeamResponse = [];
                for (let j = 0; j < message.approveTeamResponse.length; ++j)
                    object.approveTeamResponse[j] = $root.Automator.ApproveOneTeamResponse.toObject(message.approveTeamResponse[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ApproveTeamsResponse to JSON.
         * @function toJSON
         * @memberof Automator.ApproveTeamsResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApproveTeamsResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApproveTeamsResponse
         * @function getTypeUrl
         * @memberof Automator.ApproveTeamsResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApproveTeamsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.ApproveTeamsResponse";
        };

        return ApproveTeamsResponse;
    })();

    Automator.ApproveOneTeamResponse = (function() {

        /**
         * Properties of an ApproveOneTeamResponse.
         * @memberof Automator
         * @interface IApproveOneTeamResponse
         * @property {boolean|null} [approved] ApproveOneTeamResponse approved
         * @property {string|null} [message] ApproveOneTeamResponse message
         * @property {Uint8Array|null} [teamUid] ApproveOneTeamResponse teamUid
         * @property {string|null} [teamName] ApproveOneTeamResponse teamName
         * @property {Uint8Array|null} [encryptedTeamKeyCbc] ApproveOneTeamResponse encryptedTeamKeyCbc
         * @property {Enterprise.EncryptedKeyType|null} [encryptedTeamKeyCbcType] ApproveOneTeamResponse encryptedTeamKeyCbcType
         * @property {Uint8Array|null} [encryptedTeamKeyGcm] ApproveOneTeamResponse encryptedTeamKeyGcm
         * @property {Enterprise.EncryptedKeyType|null} [encryptedTeamKeyGcmType] ApproveOneTeamResponse encryptedTeamKeyGcmType
         * @property {Uint8Array|null} [teamPublicKeyRsa] ApproveOneTeamResponse teamPublicKeyRsa
         * @property {Uint8Array|null} [encryptedTeamPrivateKeyRsa] ApproveOneTeamResponse encryptedTeamPrivateKeyRsa
         * @property {Enterprise.EncryptedKeyType|null} [encryptedTeamPrivateKeyRsaType] ApproveOneTeamResponse encryptedTeamPrivateKeyRsaType
         * @property {Uint8Array|null} [teamPublicKeyEcc] ApproveOneTeamResponse teamPublicKeyEcc
         * @property {Uint8Array|null} [encryptedTeamPrivateKeyEcc] ApproveOneTeamResponse encryptedTeamPrivateKeyEcc
         * @property {Enterprise.EncryptedKeyType|null} [encryptedTeamPrivateKeyEccType] ApproveOneTeamResponse encryptedTeamPrivateKeyEccType
         */

        /**
         * Constructs a new ApproveOneTeamResponse.
         * @memberof Automator
         * @classdesc ApproveOneTeamResponse
         * 
         * The Response from Automator when a team is or is not approved.
         * It is included in an ApproveTeamsResponse.
         * Fields 5 and above will be empty if the team was not approved.
         * @implements IApproveOneTeamResponse
         * @constructor
         * @param {Automator.IApproveOneTeamResponse=} [properties] Properties to set
         */
        function ApproveOneTeamResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApproveOneTeamResponse approved.
         * @member {boolean} approved
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.approved = false;

        /**
         * ApproveOneTeamResponse message.
         * @member {string} message
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.message = "";

        /**
         * ApproveOneTeamResponse teamUid.
         * @member {Uint8Array} teamUid
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.teamUid = $util.newBuffer([]);

        /**
         * ApproveOneTeamResponse teamName.
         * @member {string} teamName
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.teamName = "";

        /**
         * ApproveOneTeamResponse encryptedTeamKeyCbc.
         * @member {Uint8Array} encryptedTeamKeyCbc
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.encryptedTeamKeyCbc = $util.newBuffer([]);

        /**
         * ApproveOneTeamResponse encryptedTeamKeyCbcType.
         * @member {Enterprise.EncryptedKeyType} encryptedTeamKeyCbcType
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.encryptedTeamKeyCbcType = 0;

        /**
         * ApproveOneTeamResponse encryptedTeamKeyGcm.
         * @member {Uint8Array} encryptedTeamKeyGcm
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.encryptedTeamKeyGcm = $util.newBuffer([]);

        /**
         * ApproveOneTeamResponse encryptedTeamKeyGcmType.
         * @member {Enterprise.EncryptedKeyType} encryptedTeamKeyGcmType
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.encryptedTeamKeyGcmType = 0;

        /**
         * ApproveOneTeamResponse teamPublicKeyRsa.
         * @member {Uint8Array} teamPublicKeyRsa
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.teamPublicKeyRsa = $util.newBuffer([]);

        /**
         * ApproveOneTeamResponse encryptedTeamPrivateKeyRsa.
         * @member {Uint8Array} encryptedTeamPrivateKeyRsa
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.encryptedTeamPrivateKeyRsa = $util.newBuffer([]);

        /**
         * ApproveOneTeamResponse encryptedTeamPrivateKeyRsaType.
         * @member {Enterprise.EncryptedKeyType} encryptedTeamPrivateKeyRsaType
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.encryptedTeamPrivateKeyRsaType = 0;

        /**
         * ApproveOneTeamResponse teamPublicKeyEcc.
         * @member {Uint8Array} teamPublicKeyEcc
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.teamPublicKeyEcc = $util.newBuffer([]);

        /**
         * ApproveOneTeamResponse encryptedTeamPrivateKeyEcc.
         * @member {Uint8Array} encryptedTeamPrivateKeyEcc
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.encryptedTeamPrivateKeyEcc = $util.newBuffer([]);

        /**
         * ApproveOneTeamResponse encryptedTeamPrivateKeyEccType.
         * @member {Enterprise.EncryptedKeyType} encryptedTeamPrivateKeyEccType
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         */
        ApproveOneTeamResponse.prototype.encryptedTeamPrivateKeyEccType = 0;

        /**
         * Creates a new ApproveOneTeamResponse instance using the specified properties.
         * @function create
         * @memberof Automator.ApproveOneTeamResponse
         * @static
         * @param {Automator.IApproveOneTeamResponse=} [properties] Properties to set
         * @returns {Automator.ApproveOneTeamResponse} ApproveOneTeamResponse instance
         */
        ApproveOneTeamResponse.create = function create(properties) {
            return new ApproveOneTeamResponse(properties);
        };

        /**
         * Encodes the specified ApproveOneTeamResponse message. Does not implicitly {@link Automator.ApproveOneTeamResponse.verify|verify} messages.
         * @function encode
         * @memberof Automator.ApproveOneTeamResponse
         * @static
         * @param {Automator.IApproveOneTeamResponse} message ApproveOneTeamResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveOneTeamResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.approved);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.teamUid);
            if (message.teamName != null && Object.hasOwnProperty.call(message, "teamName"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.teamName);
            if (message.encryptedTeamKeyCbc != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyCbc"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.encryptedTeamKeyCbc);
            if (message.encryptedTeamKeyCbcType != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyCbcType"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.encryptedTeamKeyCbcType);
            if (message.encryptedTeamKeyGcm != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyGcm"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.encryptedTeamKeyGcm);
            if (message.encryptedTeamKeyGcmType != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyGcmType"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.encryptedTeamKeyGcmType);
            if (message.teamPublicKeyRsa != null && Object.hasOwnProperty.call(message, "teamPublicKeyRsa"))
                writer.uint32(/* id 9, wireType 2 =*/74).bytes(message.teamPublicKeyRsa);
            if (message.encryptedTeamPrivateKeyRsa != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyRsa"))
                writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.encryptedTeamPrivateKeyRsa);
            if (message.encryptedTeamPrivateKeyRsaType != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyRsaType"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.encryptedTeamPrivateKeyRsaType);
            if (message.teamPublicKeyEcc != null && Object.hasOwnProperty.call(message, "teamPublicKeyEcc"))
                writer.uint32(/* id 12, wireType 2 =*/98).bytes(message.teamPublicKeyEcc);
            if (message.encryptedTeamPrivateKeyEcc != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyEcc"))
                writer.uint32(/* id 13, wireType 2 =*/106).bytes(message.encryptedTeamPrivateKeyEcc);
            if (message.encryptedTeamPrivateKeyEccType != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyEccType"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.encryptedTeamPrivateKeyEccType);
            return writer;
        };

        /**
         * Encodes the specified ApproveOneTeamResponse message, length delimited. Does not implicitly {@link Automator.ApproveOneTeamResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.ApproveOneTeamResponse
         * @static
         * @param {Automator.IApproveOneTeamResponse} message ApproveOneTeamResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApproveOneTeamResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an ApproveOneTeamResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.ApproveOneTeamResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.ApproveOneTeamResponse} ApproveOneTeamResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveOneTeamResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.ApproveOneTeamResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.approved = reader.bool();
                        break;
                    }
                case 2: {
                        message.message = reader.string();
                        break;
                    }
                case 3: {
                        message.teamUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.teamName = reader.string();
                        break;
                    }
                case 5: {
                        message.encryptedTeamKeyCbc = reader.bytes();
                        break;
                    }
                case 6: {
                        message.encryptedTeamKeyCbcType = reader.int32();
                        break;
                    }
                case 7: {
                        message.encryptedTeamKeyGcm = reader.bytes();
                        break;
                    }
                case 8: {
                        message.encryptedTeamKeyGcmType = reader.int32();
                        break;
                    }
                case 9: {
                        message.teamPublicKeyRsa = reader.bytes();
                        break;
                    }
                case 10: {
                        message.encryptedTeamPrivateKeyRsa = reader.bytes();
                        break;
                    }
                case 11: {
                        message.encryptedTeamPrivateKeyRsaType = reader.int32();
                        break;
                    }
                case 12: {
                        message.teamPublicKeyEcc = reader.bytes();
                        break;
                    }
                case 13: {
                        message.encryptedTeamPrivateKeyEcc = reader.bytes();
                        break;
                    }
                case 14: {
                        message.encryptedTeamPrivateKeyEccType = reader.int32();
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
         * Decodes an ApproveOneTeamResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.ApproveOneTeamResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.ApproveOneTeamResponse} ApproveOneTeamResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApproveOneTeamResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ApproveOneTeamResponse message.
         * @function verify
         * @memberof Automator.ApproveOneTeamResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ApproveOneTeamResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                if (typeof message.approved !== "boolean")
                    return "approved: boolean expected";
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                if (!(message.teamUid && typeof message.teamUid.length === "number" || $util.isString(message.teamUid)))
                    return "teamUid: buffer expected";
            if (message.teamName != null && Object.hasOwnProperty.call(message, "teamName"))
                if (!$util.isString(message.teamName))
                    return "teamName: string expected";
            if (message.encryptedTeamKeyCbc != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyCbc"))
                if (!(message.encryptedTeamKeyCbc && typeof message.encryptedTeamKeyCbc.length === "number" || $util.isString(message.encryptedTeamKeyCbc)))
                    return "encryptedTeamKeyCbc: buffer expected";
            if (message.encryptedTeamKeyCbcType != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyCbcType"))
                switch (message.encryptedTeamKeyCbcType) {
                default:
                    return "encryptedTeamKeyCbcType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.encryptedTeamKeyGcm != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyGcm"))
                if (!(message.encryptedTeamKeyGcm && typeof message.encryptedTeamKeyGcm.length === "number" || $util.isString(message.encryptedTeamKeyGcm)))
                    return "encryptedTeamKeyGcm: buffer expected";
            if (message.encryptedTeamKeyGcmType != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyGcmType"))
                switch (message.encryptedTeamKeyGcmType) {
                default:
                    return "encryptedTeamKeyGcmType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.teamPublicKeyRsa != null && Object.hasOwnProperty.call(message, "teamPublicKeyRsa"))
                if (!(message.teamPublicKeyRsa && typeof message.teamPublicKeyRsa.length === "number" || $util.isString(message.teamPublicKeyRsa)))
                    return "teamPublicKeyRsa: buffer expected";
            if (message.encryptedTeamPrivateKeyRsa != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyRsa"))
                if (!(message.encryptedTeamPrivateKeyRsa && typeof message.encryptedTeamPrivateKeyRsa.length === "number" || $util.isString(message.encryptedTeamPrivateKeyRsa)))
                    return "encryptedTeamPrivateKeyRsa: buffer expected";
            if (message.encryptedTeamPrivateKeyRsaType != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyRsaType"))
                switch (message.encryptedTeamPrivateKeyRsaType) {
                default:
                    return "encryptedTeamPrivateKeyRsaType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.teamPublicKeyEcc != null && Object.hasOwnProperty.call(message, "teamPublicKeyEcc"))
                if (!(message.teamPublicKeyEcc && typeof message.teamPublicKeyEcc.length === "number" || $util.isString(message.teamPublicKeyEcc)))
                    return "teamPublicKeyEcc: buffer expected";
            if (message.encryptedTeamPrivateKeyEcc != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyEcc"))
                if (!(message.encryptedTeamPrivateKeyEcc && typeof message.encryptedTeamPrivateKeyEcc.length === "number" || $util.isString(message.encryptedTeamPrivateKeyEcc)))
                    return "encryptedTeamPrivateKeyEcc: buffer expected";
            if (message.encryptedTeamPrivateKeyEccType != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyEccType"))
                switch (message.encryptedTeamPrivateKeyEccType) {
                default:
                    return "encryptedTeamPrivateKeyEccType: enum value expected";
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
         * Creates an ApproveOneTeamResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.ApproveOneTeamResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.ApproveOneTeamResponse} ApproveOneTeamResponse
         */
        ApproveOneTeamResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.ApproveOneTeamResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.ApproveOneTeamResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.ApproveOneTeamResponse();
            if (object.approved != null)
                message.approved = Boolean(object.approved);
            if (object.message != null)
                message.message = String(object.message);
            if (object.teamUid != null)
                if (typeof object.teamUid === "string")
                    $util.base64.decode(object.teamUid, message.teamUid = $util.newBuffer($util.base64.length(object.teamUid)), 0);
                else if (object.teamUid.length >= 0)
                    message.teamUid = object.teamUid;
            if (object.teamName != null)
                message.teamName = String(object.teamName);
            if (object.encryptedTeamKeyCbc != null)
                if (typeof object.encryptedTeamKeyCbc === "string")
                    $util.base64.decode(object.encryptedTeamKeyCbc, message.encryptedTeamKeyCbc = $util.newBuffer($util.base64.length(object.encryptedTeamKeyCbc)), 0);
                else if (object.encryptedTeamKeyCbc.length >= 0)
                    message.encryptedTeamKeyCbc = object.encryptedTeamKeyCbc;
            switch (object.encryptedTeamKeyCbcType) {
            default:
                if (typeof object.encryptedTeamKeyCbcType === "number") {
                    message.encryptedTeamKeyCbcType = object.encryptedTeamKeyCbcType;
                    break;
                }
                break;
            case "KT_NO_KEY":
            case 0:
                message.encryptedTeamKeyCbcType = 0;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.encryptedTeamKeyCbcType = 1;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.encryptedTeamKeyCbcType = 2;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.encryptedTeamKeyCbcType = 3;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.encryptedTeamKeyCbcType = 4;
                break;
            }
            if (object.encryptedTeamKeyGcm != null)
                if (typeof object.encryptedTeamKeyGcm === "string")
                    $util.base64.decode(object.encryptedTeamKeyGcm, message.encryptedTeamKeyGcm = $util.newBuffer($util.base64.length(object.encryptedTeamKeyGcm)), 0);
                else if (object.encryptedTeamKeyGcm.length >= 0)
                    message.encryptedTeamKeyGcm = object.encryptedTeamKeyGcm;
            switch (object.encryptedTeamKeyGcmType) {
            default:
                if (typeof object.encryptedTeamKeyGcmType === "number") {
                    message.encryptedTeamKeyGcmType = object.encryptedTeamKeyGcmType;
                    break;
                }
                break;
            case "KT_NO_KEY":
            case 0:
                message.encryptedTeamKeyGcmType = 0;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.encryptedTeamKeyGcmType = 1;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.encryptedTeamKeyGcmType = 2;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.encryptedTeamKeyGcmType = 3;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.encryptedTeamKeyGcmType = 4;
                break;
            }
            if (object.teamPublicKeyRsa != null)
                if (typeof object.teamPublicKeyRsa === "string")
                    $util.base64.decode(object.teamPublicKeyRsa, message.teamPublicKeyRsa = $util.newBuffer($util.base64.length(object.teamPublicKeyRsa)), 0);
                else if (object.teamPublicKeyRsa.length >= 0)
                    message.teamPublicKeyRsa = object.teamPublicKeyRsa;
            if (object.encryptedTeamPrivateKeyRsa != null)
                if (typeof object.encryptedTeamPrivateKeyRsa === "string")
                    $util.base64.decode(object.encryptedTeamPrivateKeyRsa, message.encryptedTeamPrivateKeyRsa = $util.newBuffer($util.base64.length(object.encryptedTeamPrivateKeyRsa)), 0);
                else if (object.encryptedTeamPrivateKeyRsa.length >= 0)
                    message.encryptedTeamPrivateKeyRsa = object.encryptedTeamPrivateKeyRsa;
            switch (object.encryptedTeamPrivateKeyRsaType) {
            default:
                if (typeof object.encryptedTeamPrivateKeyRsaType === "number") {
                    message.encryptedTeamPrivateKeyRsaType = object.encryptedTeamPrivateKeyRsaType;
                    break;
                }
                break;
            case "KT_NO_KEY":
            case 0:
                message.encryptedTeamPrivateKeyRsaType = 0;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.encryptedTeamPrivateKeyRsaType = 1;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.encryptedTeamPrivateKeyRsaType = 2;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.encryptedTeamPrivateKeyRsaType = 3;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.encryptedTeamPrivateKeyRsaType = 4;
                break;
            }
            if (object.teamPublicKeyEcc != null)
                if (typeof object.teamPublicKeyEcc === "string")
                    $util.base64.decode(object.teamPublicKeyEcc, message.teamPublicKeyEcc = $util.newBuffer($util.base64.length(object.teamPublicKeyEcc)), 0);
                else if (object.teamPublicKeyEcc.length >= 0)
                    message.teamPublicKeyEcc = object.teamPublicKeyEcc;
            if (object.encryptedTeamPrivateKeyEcc != null)
                if (typeof object.encryptedTeamPrivateKeyEcc === "string")
                    $util.base64.decode(object.encryptedTeamPrivateKeyEcc, message.encryptedTeamPrivateKeyEcc = $util.newBuffer($util.base64.length(object.encryptedTeamPrivateKeyEcc)), 0);
                else if (object.encryptedTeamPrivateKeyEcc.length >= 0)
                    message.encryptedTeamPrivateKeyEcc = object.encryptedTeamPrivateKeyEcc;
            switch (object.encryptedTeamPrivateKeyEccType) {
            default:
                if (typeof object.encryptedTeamPrivateKeyEccType === "number") {
                    message.encryptedTeamPrivateKeyEccType = object.encryptedTeamPrivateKeyEccType;
                    break;
                }
                break;
            case "KT_NO_KEY":
            case 0:
                message.encryptedTeamPrivateKeyEccType = 0;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY":
            case 1:
                message.encryptedTeamPrivateKeyEccType = 1;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY":
            case 2:
                message.encryptedTeamPrivateKeyEccType = 2;
                break;
            case "KT_ENCRYPTED_BY_DATA_KEY_GCM":
            case 3:
                message.encryptedTeamPrivateKeyEccType = 3;
                break;
            case "KT_ENCRYPTED_BY_PUBLIC_KEY_ECC":
            case 4:
                message.encryptedTeamPrivateKeyEccType = 4;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from an ApproveOneTeamResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.ApproveOneTeamResponse
         * @static
         * @param {Automator.ApproveOneTeamResponse} message ApproveOneTeamResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApproveOneTeamResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.approved = false;
                object.message = "";
                if (options.bytes === String)
                    object.teamUid = "";
                else {
                    object.teamUid = [];
                    if (options.bytes !== Array)
                        object.teamUid = $util.newBuffer(object.teamUid);
                }
                object.teamName = "";
                if (options.bytes === String)
                    object.encryptedTeamKeyCbc = "";
                else {
                    object.encryptedTeamKeyCbc = [];
                    if (options.bytes !== Array)
                        object.encryptedTeamKeyCbc = $util.newBuffer(object.encryptedTeamKeyCbc);
                }
                object.encryptedTeamKeyCbcType = options.enums === String ? "KT_NO_KEY" : 0;
                if (options.bytes === String)
                    object.encryptedTeamKeyGcm = "";
                else {
                    object.encryptedTeamKeyGcm = [];
                    if (options.bytes !== Array)
                        object.encryptedTeamKeyGcm = $util.newBuffer(object.encryptedTeamKeyGcm);
                }
                object.encryptedTeamKeyGcmType = options.enums === String ? "KT_NO_KEY" : 0;
                if (options.bytes === String)
                    object.teamPublicKeyRsa = "";
                else {
                    object.teamPublicKeyRsa = [];
                    if (options.bytes !== Array)
                        object.teamPublicKeyRsa = $util.newBuffer(object.teamPublicKeyRsa);
                }
                if (options.bytes === String)
                    object.encryptedTeamPrivateKeyRsa = "";
                else {
                    object.encryptedTeamPrivateKeyRsa = [];
                    if (options.bytes !== Array)
                        object.encryptedTeamPrivateKeyRsa = $util.newBuffer(object.encryptedTeamPrivateKeyRsa);
                }
                object.encryptedTeamPrivateKeyRsaType = options.enums === String ? "KT_NO_KEY" : 0;
                if (options.bytes === String)
                    object.teamPublicKeyEcc = "";
                else {
                    object.teamPublicKeyEcc = [];
                    if (options.bytes !== Array)
                        object.teamPublicKeyEcc = $util.newBuffer(object.teamPublicKeyEcc);
                }
                if (options.bytes === String)
                    object.encryptedTeamPrivateKeyEcc = "";
                else {
                    object.encryptedTeamPrivateKeyEcc = [];
                    if (options.bytes !== Array)
                        object.encryptedTeamPrivateKeyEcc = $util.newBuffer(object.encryptedTeamPrivateKeyEcc);
                }
                object.encryptedTeamPrivateKeyEccType = options.enums === String ? "KT_NO_KEY" : 0;
            }
            if (message.approved != null && Object.hasOwnProperty.call(message, "approved"))
                object.approved = message.approved;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                object.teamUid = options.bytes === String ? $util.base64.encode(message.teamUid, 0, message.teamUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamUid) : message.teamUid;
            if (message.teamName != null && Object.hasOwnProperty.call(message, "teamName"))
                object.teamName = message.teamName;
            if (message.encryptedTeamKeyCbc != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyCbc"))
                object.encryptedTeamKeyCbc = options.bytes === String ? $util.base64.encode(message.encryptedTeamKeyCbc, 0, message.encryptedTeamKeyCbc.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedTeamKeyCbc) : message.encryptedTeamKeyCbc;
            if (message.encryptedTeamKeyCbcType != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyCbcType"))
                object.encryptedTeamKeyCbcType = options.enums === String ? $root.Enterprise.EncryptedKeyType[message.encryptedTeamKeyCbcType] === undefined ? message.encryptedTeamKeyCbcType : $root.Enterprise.EncryptedKeyType[message.encryptedTeamKeyCbcType] : message.encryptedTeamKeyCbcType;
            if (message.encryptedTeamKeyGcm != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyGcm"))
                object.encryptedTeamKeyGcm = options.bytes === String ? $util.base64.encode(message.encryptedTeamKeyGcm, 0, message.encryptedTeamKeyGcm.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedTeamKeyGcm) : message.encryptedTeamKeyGcm;
            if (message.encryptedTeamKeyGcmType != null && Object.hasOwnProperty.call(message, "encryptedTeamKeyGcmType"))
                object.encryptedTeamKeyGcmType = options.enums === String ? $root.Enterprise.EncryptedKeyType[message.encryptedTeamKeyGcmType] === undefined ? message.encryptedTeamKeyGcmType : $root.Enterprise.EncryptedKeyType[message.encryptedTeamKeyGcmType] : message.encryptedTeamKeyGcmType;
            if (message.teamPublicKeyRsa != null && Object.hasOwnProperty.call(message, "teamPublicKeyRsa"))
                object.teamPublicKeyRsa = options.bytes === String ? $util.base64.encode(message.teamPublicKeyRsa, 0, message.teamPublicKeyRsa.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamPublicKeyRsa) : message.teamPublicKeyRsa;
            if (message.encryptedTeamPrivateKeyRsa != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyRsa"))
                object.encryptedTeamPrivateKeyRsa = options.bytes === String ? $util.base64.encode(message.encryptedTeamPrivateKeyRsa, 0, message.encryptedTeamPrivateKeyRsa.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedTeamPrivateKeyRsa) : message.encryptedTeamPrivateKeyRsa;
            if (message.encryptedTeamPrivateKeyRsaType != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyRsaType"))
                object.encryptedTeamPrivateKeyRsaType = options.enums === String ? $root.Enterprise.EncryptedKeyType[message.encryptedTeamPrivateKeyRsaType] === undefined ? message.encryptedTeamPrivateKeyRsaType : $root.Enterprise.EncryptedKeyType[message.encryptedTeamPrivateKeyRsaType] : message.encryptedTeamPrivateKeyRsaType;
            if (message.teamPublicKeyEcc != null && Object.hasOwnProperty.call(message, "teamPublicKeyEcc"))
                object.teamPublicKeyEcc = options.bytes === String ? $util.base64.encode(message.teamPublicKeyEcc, 0, message.teamPublicKeyEcc.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamPublicKeyEcc) : message.teamPublicKeyEcc;
            if (message.encryptedTeamPrivateKeyEcc != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyEcc"))
                object.encryptedTeamPrivateKeyEcc = options.bytes === String ? $util.base64.encode(message.encryptedTeamPrivateKeyEcc, 0, message.encryptedTeamPrivateKeyEcc.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedTeamPrivateKeyEcc) : message.encryptedTeamPrivateKeyEcc;
            if (message.encryptedTeamPrivateKeyEccType != null && Object.hasOwnProperty.call(message, "encryptedTeamPrivateKeyEccType"))
                object.encryptedTeamPrivateKeyEccType = options.enums === String ? $root.Enterprise.EncryptedKeyType[message.encryptedTeamPrivateKeyEccType] === undefined ? message.encryptedTeamPrivateKeyEccType : $root.Enterprise.EncryptedKeyType[message.encryptedTeamPrivateKeyEccType] : message.encryptedTeamPrivateKeyEccType;
            return object;
        };

        /**
         * Converts this ApproveOneTeamResponse to JSON.
         * @function toJSON
         * @memberof Automator.ApproveOneTeamResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApproveOneTeamResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApproveOneTeamResponse
         * @function getTypeUrl
         * @memberof Automator.ApproveOneTeamResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApproveOneTeamResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.ApproveOneTeamResponse";
        };

        return ApproveOneTeamResponse;
    })();

    Automator.SSLCertificateInfo = (function() {

        /**
         * Properties of a SSLCertificateInfo.
         * @memberof Automator
         * @interface ISSLCertificateInfo
         * @property {number|null} [automatorId] SSLCertificateInfo automatorId
         * @property {string|null} [hostUrl] SSLCertificateInfo hostUrl
         * @property {string|null} [subject] SSLCertificateInfo subject
         * @property {string|null} [issuer] SSLCertificateInfo issuer
         * @property {number|null} [issuedOn] SSLCertificateInfo issuedOn
         * @property {number|null} [expiresOn] SSLCertificateInfo expiresOn
         * @property {number|null} [checkedOn] SSLCertificateInfo checkedOn
         */

        /**
         * Constructs a new SSLCertificateInfo.
         * @memberof Automator
         * @classdesc SSLCertificateInfo - This message contains information about the SSL certificate of an Automator instance.
         * It is used to send a message to an Admin to renew the certificate.
         * @implements ISSLCertificateInfo
         * @constructor
         * @param {Automator.ISSLCertificateInfo=} [properties] Properties to set
         */
        function SSLCertificateInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SSLCertificateInfo automatorId.
         * @member {number} automatorId
         * @memberof Automator.SSLCertificateInfo
         * @instance
         */
        SSLCertificateInfo.prototype.automatorId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SSLCertificateInfo hostUrl.
         * @member {string} hostUrl
         * @memberof Automator.SSLCertificateInfo
         * @instance
         */
        SSLCertificateInfo.prototype.hostUrl = "";

        /**
         * SSLCertificateInfo subject.
         * @member {string} subject
         * @memberof Automator.SSLCertificateInfo
         * @instance
         */
        SSLCertificateInfo.prototype.subject = "";

        /**
         * SSLCertificateInfo issuer.
         * @member {string} issuer
         * @memberof Automator.SSLCertificateInfo
         * @instance
         */
        SSLCertificateInfo.prototype.issuer = "";

        /**
         * SSLCertificateInfo issuedOn.
         * @member {number} issuedOn
         * @memberof Automator.SSLCertificateInfo
         * @instance
         */
        SSLCertificateInfo.prototype.issuedOn = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SSLCertificateInfo expiresOn.
         * @member {number} expiresOn
         * @memberof Automator.SSLCertificateInfo
         * @instance
         */
        SSLCertificateInfo.prototype.expiresOn = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SSLCertificateInfo checkedOn.
         * @member {number} checkedOn
         * @memberof Automator.SSLCertificateInfo
         * @instance
         */
        SSLCertificateInfo.prototype.checkedOn = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new SSLCertificateInfo instance using the specified properties.
         * @function create
         * @memberof Automator.SSLCertificateInfo
         * @static
         * @param {Automator.ISSLCertificateInfo=} [properties] Properties to set
         * @returns {Automator.SSLCertificateInfo} SSLCertificateInfo instance
         */
        SSLCertificateInfo.create = function create(properties) {
            return new SSLCertificateInfo(properties);
        };

        /**
         * Encodes the specified SSLCertificateInfo message. Does not implicitly {@link Automator.SSLCertificateInfo.verify|verify} messages.
         * @function encode
         * @memberof Automator.SSLCertificateInfo
         * @static
         * @param {Automator.ISSLCertificateInfo} message SSLCertificateInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SSLCertificateInfo.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.automatorId);
            if (message.hostUrl != null && Object.hasOwnProperty.call(message, "hostUrl"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.hostUrl);
            if (message.subject != null && Object.hasOwnProperty.call(message, "subject"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.subject);
            if (message.issuer != null && Object.hasOwnProperty.call(message, "issuer"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.issuer);
            if (message.issuedOn != null && Object.hasOwnProperty.call(message, "issuedOn"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.issuedOn);
            if (message.expiresOn != null && Object.hasOwnProperty.call(message, "expiresOn"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.expiresOn);
            if (message.checkedOn != null && Object.hasOwnProperty.call(message, "checkedOn"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.checkedOn);
            return writer;
        };

        /**
         * Encodes the specified SSLCertificateInfo message, length delimited. Does not implicitly {@link Automator.SSLCertificateInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Automator.SSLCertificateInfo
         * @static
         * @param {Automator.ISSLCertificateInfo} message SSLCertificateInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SSLCertificateInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a SSLCertificateInfo message from the specified reader or buffer.
         * @function decode
         * @memberof Automator.SSLCertificateInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Automator.SSLCertificateInfo} SSLCertificateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SSLCertificateInfo.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Automator.SSLCertificateInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.automatorId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.hostUrl = reader.string();
                        break;
                    }
                case 3: {
                        message.subject = reader.string();
                        break;
                    }
                case 4: {
                        message.issuer = reader.string();
                        break;
                    }
                case 5: {
                        message.issuedOn = reader.uint64();
                        break;
                    }
                case 6: {
                        message.expiresOn = reader.uint64();
                        break;
                    }
                case 7: {
                        message.checkedOn = reader.uint64();
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
         * Decodes a SSLCertificateInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Automator.SSLCertificateInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Automator.SSLCertificateInfo} SSLCertificateInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SSLCertificateInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SSLCertificateInfo message.
         * @function verify
         * @memberof Automator.SSLCertificateInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SSLCertificateInfo.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (!$util.isInteger(message.automatorId) && !(message.automatorId && $util.isInteger(message.automatorId.low) && $util.isInteger(message.automatorId.high)))
                    return "automatorId: integer|Long expected";
            if (message.hostUrl != null && Object.hasOwnProperty.call(message, "hostUrl"))
                if (!$util.isString(message.hostUrl))
                    return "hostUrl: string expected";
            if (message.subject != null && Object.hasOwnProperty.call(message, "subject"))
                if (!$util.isString(message.subject))
                    return "subject: string expected";
            if (message.issuer != null && Object.hasOwnProperty.call(message, "issuer"))
                if (!$util.isString(message.issuer))
                    return "issuer: string expected";
            if (message.issuedOn != null && Object.hasOwnProperty.call(message, "issuedOn"))
                if (!$util.isInteger(message.issuedOn) && !(message.issuedOn && $util.isInteger(message.issuedOn.low) && $util.isInteger(message.issuedOn.high)))
                    return "issuedOn: integer|Long expected";
            if (message.expiresOn != null && Object.hasOwnProperty.call(message, "expiresOn"))
                if (!$util.isInteger(message.expiresOn) && !(message.expiresOn && $util.isInteger(message.expiresOn.low) && $util.isInteger(message.expiresOn.high)))
                    return "expiresOn: integer|Long expected";
            if (message.checkedOn != null && Object.hasOwnProperty.call(message, "checkedOn"))
                if (!$util.isInteger(message.checkedOn) && !(message.checkedOn && $util.isInteger(message.checkedOn.low) && $util.isInteger(message.checkedOn.high)))
                    return "checkedOn: integer|Long expected";
            return null;
        };

        /**
         * Creates a SSLCertificateInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Automator.SSLCertificateInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Automator.SSLCertificateInfo} SSLCertificateInfo
         */
        SSLCertificateInfo.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Automator.SSLCertificateInfo)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Automator.SSLCertificateInfo: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Automator.SSLCertificateInfo();
            if (object.automatorId != null)
                if ($util.Long)
                    message.automatorId = $util.Long.fromValue(object.automatorId, true);
                else if (typeof object.automatorId === "string")
                    message.automatorId = parseInt(object.automatorId, 10);
                else if (typeof object.automatorId === "number")
                    message.automatorId = object.automatorId;
                else if (typeof object.automatorId === "object")
                    message.automatorId = new $util.LongBits(object.automatorId.low >>> 0, object.automatorId.high >>> 0).toNumber(true);
            if (object.hostUrl != null)
                message.hostUrl = String(object.hostUrl);
            if (object.subject != null)
                message.subject = String(object.subject);
            if (object.issuer != null)
                message.issuer = String(object.issuer);
            if (object.issuedOn != null)
                if ($util.Long)
                    message.issuedOn = $util.Long.fromValue(object.issuedOn, true);
                else if (typeof object.issuedOn === "string")
                    message.issuedOn = parseInt(object.issuedOn, 10);
                else if (typeof object.issuedOn === "number")
                    message.issuedOn = object.issuedOn;
                else if (typeof object.issuedOn === "object")
                    message.issuedOn = new $util.LongBits(object.issuedOn.low >>> 0, object.issuedOn.high >>> 0).toNumber(true);
            if (object.expiresOn != null)
                if ($util.Long)
                    message.expiresOn = $util.Long.fromValue(object.expiresOn, true);
                else if (typeof object.expiresOn === "string")
                    message.expiresOn = parseInt(object.expiresOn, 10);
                else if (typeof object.expiresOn === "number")
                    message.expiresOn = object.expiresOn;
                else if (typeof object.expiresOn === "object")
                    message.expiresOn = new $util.LongBits(object.expiresOn.low >>> 0, object.expiresOn.high >>> 0).toNumber(true);
            if (object.checkedOn != null)
                if ($util.Long)
                    message.checkedOn = $util.Long.fromValue(object.checkedOn, true);
                else if (typeof object.checkedOn === "string")
                    message.checkedOn = parseInt(object.checkedOn, 10);
                else if (typeof object.checkedOn === "number")
                    message.checkedOn = object.checkedOn;
                else if (typeof object.checkedOn === "object")
                    message.checkedOn = new $util.LongBits(object.checkedOn.low >>> 0, object.checkedOn.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a SSLCertificateInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Automator.SSLCertificateInfo
         * @static
         * @param {Automator.SSLCertificateInfo} message SSLCertificateInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SSLCertificateInfo.toObject = function toObject(message, options, q) {
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
                    object.automatorId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.automatorId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.hostUrl = "";
                object.subject = "";
                object.issuer = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.issuedOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.issuedOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.expiresOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.expiresOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.checkedOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.checkedOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.automatorId != null && Object.hasOwnProperty.call(message, "automatorId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.automatorId = typeof message.automatorId === "number" ? BigInt(message.automatorId) : $util.Long.fromBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0, true).toBigInt();
                else if (typeof message.automatorId === "number")
                    object.automatorId = options.longs === String ? String(message.automatorId) : message.automatorId;
                else
                    object.automatorId = options.longs === String ? $util.Long.prototype.toString.call(message.automatorId) : options.longs === Number ? new $util.LongBits(message.automatorId.low >>> 0, message.automatorId.high >>> 0).toNumber(true) : message.automatorId;
            if (message.hostUrl != null && Object.hasOwnProperty.call(message, "hostUrl"))
                object.hostUrl = message.hostUrl;
            if (message.subject != null && Object.hasOwnProperty.call(message, "subject"))
                object.subject = message.subject;
            if (message.issuer != null && Object.hasOwnProperty.call(message, "issuer"))
                object.issuer = message.issuer;
            if (message.issuedOn != null && Object.hasOwnProperty.call(message, "issuedOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.issuedOn = typeof message.issuedOn === "number" ? BigInt(message.issuedOn) : $util.Long.fromBits(message.issuedOn.low >>> 0, message.issuedOn.high >>> 0, true).toBigInt();
                else if (typeof message.issuedOn === "number")
                    object.issuedOn = options.longs === String ? String(message.issuedOn) : message.issuedOn;
                else
                    object.issuedOn = options.longs === String ? $util.Long.prototype.toString.call(message.issuedOn) : options.longs === Number ? new $util.LongBits(message.issuedOn.low >>> 0, message.issuedOn.high >>> 0).toNumber(true) : message.issuedOn;
            if (message.expiresOn != null && Object.hasOwnProperty.call(message, "expiresOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.expiresOn = typeof message.expiresOn === "number" ? BigInt(message.expiresOn) : $util.Long.fromBits(message.expiresOn.low >>> 0, message.expiresOn.high >>> 0, true).toBigInt();
                else if (typeof message.expiresOn === "number")
                    object.expiresOn = options.longs === String ? String(message.expiresOn) : message.expiresOn;
                else
                    object.expiresOn = options.longs === String ? $util.Long.prototype.toString.call(message.expiresOn) : options.longs === Number ? new $util.LongBits(message.expiresOn.low >>> 0, message.expiresOn.high >>> 0).toNumber(true) : message.expiresOn;
            if (message.checkedOn != null && Object.hasOwnProperty.call(message, "checkedOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.checkedOn = typeof message.checkedOn === "number" ? BigInt(message.checkedOn) : $util.Long.fromBits(message.checkedOn.low >>> 0, message.checkedOn.high >>> 0, true).toBigInt();
                else if (typeof message.checkedOn === "number")
                    object.checkedOn = options.longs === String ? String(message.checkedOn) : message.checkedOn;
                else
                    object.checkedOn = options.longs === String ? $util.Long.prototype.toString.call(message.checkedOn) : options.longs === Number ? new $util.LongBits(message.checkedOn.low >>> 0, message.checkedOn.high >>> 0).toNumber(true) : message.checkedOn;
            return object;
        };

        /**
         * Converts this SSLCertificateInfo to JSON.
         * @function toJSON
         * @memberof Automator.SSLCertificateInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SSLCertificateInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SSLCertificateInfo
         * @function getTypeUrl
         * @memberof Automator.SSLCertificateInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SSLCertificateInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Automator.SSLCertificateInfo";
        };

        return SSLCertificateInfo;
    })();

    return Automator;
})();

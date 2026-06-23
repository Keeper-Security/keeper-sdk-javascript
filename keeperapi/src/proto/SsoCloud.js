/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const SsoCloud = $root.SsoCloud = (() => {

    /**
     * Namespace SsoCloud.
     * @exports SsoCloud
     * @namespace
     */
    const SsoCloud = {};

    /**
     * Authentication protocols we support.
     * @name SsoCloud.AuthProtocolType
     * @enum {number}
     * @property {number} SAML2=0 SAML2 value
     * @property {number} JWT=1 JWT value
     */
    SsoCloud.AuthProtocolType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SAML2"] = 0;
        values[valuesById[1] = "JWT"] = 1;
        return values;
    })();

    /**
     * Datatypes of SsoCloudSettings
     * @name SsoCloud.DataType
     * @enum {number}
     * @property {number} ANY=0 ANY value
     * @property {number} BOOLEAN=1 BOOLEAN value
     * @property {number} INTEGER=2 INTEGER value
     * @property {number} STRING=3 STRING value
     * @property {number} BYTES=4 BYTES value
     * @property {number} URL=5 URL value
     * @property {number} com_keepersecurity_proto_SsoCloud_DataType=6 com_keepersecurity_proto_SsoCloud_DataType value
     * @property {number} com_keepersecurity_proto_SsoCloud_AuthProtocolType=7 com_keepersecurity_proto_SsoCloud_AuthProtocolType value
     * @property {number} com_keepersecurity_proto_SsoCloud_SsoIdpType=8 com_keepersecurity_proto_SsoCloud_SsoIdpType value
     * @property {number} LONG=9 LONG value
     * @property {number} TIMESTAMP=10 TIMESTAMP value
     */
    SsoCloud.DataType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ANY"] = 0;
        values[valuesById[1] = "BOOLEAN"] = 1;
        values[valuesById[2] = "INTEGER"] = 2;
        values[valuesById[3] = "STRING"] = 3;
        values[valuesById[4] = "BYTES"] = 4;
        values[valuesById[5] = "URL"] = 5;
        values[valuesById[6] = "com_keepersecurity_proto_SsoCloud_DataType"] = 6;
        values[valuesById[7] = "com_keepersecurity_proto_SsoCloud_AuthProtocolType"] = 7;
        values[valuesById[8] = "com_keepersecurity_proto_SsoCloud_SsoIdpType"] = 8;
        values[valuesById[9] = "LONG"] = 9;
        values[valuesById[10] = "TIMESTAMP"] = 10;
        return values;
    })();

    /**
     * This is how the client can change a Configuration setting
     * @name SsoCloud.SsoCloudSettingOperationType
     * @enum {number}
     * @property {number} SET=0 SET value
     * @property {number} GET=1 GET value
     * @property {number} DELETE=2 DELETE value
     * @property {number} RESET_TO_DEFAULT=3 RESET_TO_DEFAULT value
     */
    SsoCloud.SsoCloudSettingOperationType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "SET"] = 0;
        values[valuesById[1] = "GET"] = 1;
        values[valuesById[2] = "DELETE"] = 2;
        values[valuesById[3] = "RESET_TO_DEFAULT"] = 3;
        return values;
    })();

    /**
     * SsoIdpType enum.
     * @name SsoCloud.SsoIdpType
     * @enum {number}
     * @property {number} XX_UNUSED=0 XX_UNUSED value
     * @property {number} GENERIC=1 GENERIC value
     * @property {number} F5=2 F5 value
     * @property {number} GOOGLE=3 GOOGLE value
     * @property {number} OKTA=4 OKTA value
     * @property {number} ADFS=5 ADFS value
     * @property {number} AZURE=6 AZURE value
     * @property {number} ONELOGIN=7 ONELOGIN value
     * @property {number} AWS=8 AWS value
     * @property {number} CENTRIFY=9 CENTRIFY value
     * @property {number} DUO=10 DUO value
     * @property {number} IBM=11 IBM value
     * @property {number} JUMPCLOUD=12 JUMPCLOUD value
     * @property {number} PING=13 PING value
     * @property {number} PINGONE=14 PINGONE value
     * @property {number} RSA=15 RSA value
     * @property {number} SECUREAUTH=16 SECUREAUTH value
     * @property {number} THALES=17 THALES value
     * @property {number} AUTH0=18 AUTH0 value
     * @property {number} BEYOND=19 BEYOND value
     * @property {number} HYPR=20 HYPR value
     * @property {number} PUREID=21 PUREID value
     * @property {number} SDO=22 SDO value
     * @property {number} TRAIT=23 TRAIT value
     * @property {number} TRANSMIT=24 TRANSMIT value
     * @property {number} TRUSONA=25 TRUSONA value
     * @property {number} VERIDIUM=26 VERIDIUM value
     * @property {number} CAS=27 CAS value
     */
    SsoCloud.SsoIdpType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "XX_UNUSED"] = 0;
        values[valuesById[1] = "GENERIC"] = 1;
        values[valuesById[2] = "F5"] = 2;
        values[valuesById[3] = "GOOGLE"] = 3;
        values[valuesById[4] = "OKTA"] = 4;
        values[valuesById[5] = "ADFS"] = 5;
        values[valuesById[6] = "AZURE"] = 6;
        values[valuesById[7] = "ONELOGIN"] = 7;
        values[valuesById[8] = "AWS"] = 8;
        values[valuesById[9] = "CENTRIFY"] = 9;
        values[valuesById[10] = "DUO"] = 10;
        values[valuesById[11] = "IBM"] = 11;
        values[valuesById[12] = "JUMPCLOUD"] = 12;
        values[valuesById[13] = "PING"] = 13;
        values[valuesById[14] = "PINGONE"] = 14;
        values[valuesById[15] = "RSA"] = 15;
        values[valuesById[16] = "SECUREAUTH"] = 16;
        values[valuesById[17] = "THALES"] = 17;
        values[valuesById[18] = "AUTH0"] = 18;
        values[valuesById[19] = "BEYOND"] = 19;
        values[valuesById[20] = "HYPR"] = 20;
        values[valuesById[21] = "PUREID"] = 21;
        values[valuesById[22] = "SDO"] = 22;
        values[valuesById[23] = "TRAIT"] = 23;
        values[valuesById[24] = "TRANSMIT"] = 24;
        values[valuesById[25] = "TRUSONA"] = 25;
        values[valuesById[26] = "VERIDIUM"] = 26;
        values[valuesById[27] = "CAS"] = 27;
        return values;
    })();

    SsoCloud.SsoCloudSettingValue = (function() {

        /**
         * Properties of a SsoCloudSettingValue.
         * @memberof SsoCloud
         * @interface ISsoCloudSettingValue
         * @property {number|null} [settingId] SsoCloudSettingValue settingId
         * @property {string|null} [settingName] SsoCloudSettingValue settingName
         * @property {string|null} [label] SsoCloudSettingValue label
         * @property {string|null} [value] SsoCloudSettingValue value
         * @property {SsoCloud.DataType|null} [valueType] SsoCloudSettingValue valueType
         * @property {string|null} [lastModified] SsoCloudSettingValue lastModified
         * @property {boolean|null} [isFromFile] SsoCloudSettingValue isFromFile
         * @property {boolean|null} [isEditable] SsoCloudSettingValue isEditable
         * @property {boolean|null} [isRequired] SsoCloudSettingValue isRequired
         */

        /**
         * Constructs a new SsoCloudSettingValue.
         * @memberof SsoCloud
         * @classdesc This is the value of a Configuration setting
         * @implements ISsoCloudSettingValue
         * @constructor
         * @param {SsoCloud.ISsoCloudSettingValue=} [properties] Properties to set
         */
        function SsoCloudSettingValue(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudSettingValue settingId.
         * @member {number} settingId
         * @memberof SsoCloud.SsoCloudSettingValue
         * @instance
         */
        SsoCloudSettingValue.prototype.settingId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudSettingValue settingName.
         * @member {string} settingName
         * @memberof SsoCloud.SsoCloudSettingValue
         * @instance
         */
        SsoCloudSettingValue.prototype.settingName = "";

        /**
         * SsoCloudSettingValue label.
         * @member {string} label
         * @memberof SsoCloud.SsoCloudSettingValue
         * @instance
         */
        SsoCloudSettingValue.prototype.label = "";

        /**
         * SsoCloudSettingValue value.
         * @member {string} value
         * @memberof SsoCloud.SsoCloudSettingValue
         * @instance
         */
        SsoCloudSettingValue.prototype.value = "";

        /**
         * SsoCloudSettingValue valueType.
         * @member {SsoCloud.DataType} valueType
         * @memberof SsoCloud.SsoCloudSettingValue
         * @instance
         */
        SsoCloudSettingValue.prototype.valueType = 0;

        /**
         * SsoCloudSettingValue lastModified.
         * @member {string} lastModified
         * @memberof SsoCloud.SsoCloudSettingValue
         * @instance
         */
        SsoCloudSettingValue.prototype.lastModified = "";

        /**
         * SsoCloudSettingValue isFromFile.
         * @member {boolean} isFromFile
         * @memberof SsoCloud.SsoCloudSettingValue
         * @instance
         */
        SsoCloudSettingValue.prototype.isFromFile = false;

        /**
         * SsoCloudSettingValue isEditable.
         * @member {boolean} isEditable
         * @memberof SsoCloud.SsoCloudSettingValue
         * @instance
         */
        SsoCloudSettingValue.prototype.isEditable = false;

        /**
         * SsoCloudSettingValue isRequired.
         * @member {boolean} isRequired
         * @memberof SsoCloud.SsoCloudSettingValue
         * @instance
         */
        SsoCloudSettingValue.prototype.isRequired = false;

        /**
         * Creates a new SsoCloudSettingValue instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudSettingValue
         * @static
         * @param {SsoCloud.ISsoCloudSettingValue=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudSettingValue} SsoCloudSettingValue instance
         */
        SsoCloudSettingValue.create = function create(properties) {
            return new SsoCloudSettingValue(properties);
        };

        /**
         * Encodes the specified SsoCloudSettingValue message. Does not implicitly {@link SsoCloud.SsoCloudSettingValue.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudSettingValue
         * @static
         * @param {SsoCloud.ISsoCloudSettingValue} message SsoCloudSettingValue message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudSettingValue.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.settingId != null && Object.hasOwnProperty.call(message, "settingId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.settingId);
            if (message.settingName != null && Object.hasOwnProperty.call(message, "settingName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.settingName);
            if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.label);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.value);
            if (message.valueType != null && Object.hasOwnProperty.call(message, "valueType"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.valueType);
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.lastModified);
            if (message.isFromFile != null && Object.hasOwnProperty.call(message, "isFromFile"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isFromFile);
            if (message.isEditable != null && Object.hasOwnProperty.call(message, "isEditable"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isEditable);
            if (message.isRequired != null && Object.hasOwnProperty.call(message, "isRequired"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.isRequired);
            return writer;
        };

        /**
         * Decodes a SsoCloudSettingValue message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudSettingValue
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudSettingValue} SsoCloudSettingValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudSettingValue.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudSettingValue();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.settingId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.settingName = reader.string();
                        break;
                    }
                case 3: {
                        message.label = reader.string();
                        break;
                    }
                case 4: {
                        message.value = reader.string();
                        break;
                    }
                case 5: {
                        message.valueType = reader.int32();
                        break;
                    }
                case 7: {
                        message.lastModified = reader.string();
                        break;
                    }
                case 8: {
                        message.isFromFile = reader.bool();
                        break;
                    }
                case 9: {
                        message.isEditable = reader.bool();
                        break;
                    }
                case 10: {
                        message.isRequired = reader.bool();
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
         * Creates a SsoCloudSettingValue message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudSettingValue
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudSettingValue} SsoCloudSettingValue
         */
        SsoCloudSettingValue.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudSettingValue)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudSettingValue: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudSettingValue();
            if (object.settingId != null)
                if ($util.Long)
                    message.settingId = $util.Long.fromValue(object.settingId, true);
                else if (typeof object.settingId === "string")
                    message.settingId = parseInt(object.settingId, 10);
                else if (typeof object.settingId === "number")
                    message.settingId = object.settingId;
                else if (typeof object.settingId === "object")
                    message.settingId = new $util.LongBits(object.settingId.low >>> 0, object.settingId.high >>> 0).toNumber(true);
            if (object.settingName != null)
                message.settingName = String(object.settingName);
            if (object.label != null)
                message.label = String(object.label);
            if (object.value != null)
                message.value = String(object.value);
            switch (object.valueType) {
            default:
                if (typeof object.valueType === "number") {
                    message.valueType = object.valueType;
                    break;
                }
                break;
            case "ANY":
            case 0:
                message.valueType = 0;
                break;
            case "BOOLEAN":
            case 1:
                message.valueType = 1;
                break;
            case "INTEGER":
            case 2:
                message.valueType = 2;
                break;
            case "STRING":
            case 3:
                message.valueType = 3;
                break;
            case "BYTES":
            case 4:
                message.valueType = 4;
                break;
            case "URL":
            case 5:
                message.valueType = 5;
                break;
            case "com_keepersecurity_proto_SsoCloud_DataType":
            case 6:
                message.valueType = 6;
                break;
            case "com_keepersecurity_proto_SsoCloud_AuthProtocolType":
            case 7:
                message.valueType = 7;
                break;
            case "com_keepersecurity_proto_SsoCloud_SsoIdpType":
            case 8:
                message.valueType = 8;
                break;
            case "LONG":
            case 9:
                message.valueType = 9;
                break;
            case "TIMESTAMP":
            case 10:
                message.valueType = 10;
                break;
            }
            if (object.lastModified != null)
                message.lastModified = String(object.lastModified);
            if (object.isFromFile != null)
                message.isFromFile = Boolean(object.isFromFile);
            if (object.isEditable != null)
                message.isEditable = Boolean(object.isEditable);
            if (object.isRequired != null)
                message.isRequired = Boolean(object.isRequired);
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudSettingValue message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudSettingValue
         * @static
         * @param {SsoCloud.SsoCloudSettingValue} message SsoCloudSettingValue
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudSettingValue.toObject = function toObject(message, options, q) {
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
                    object.settingId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.settingId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.settingName = "";
                object.label = "";
                object.value = "";
                object.valueType = options.enums === String ? "ANY" : 0;
                object.lastModified = "";
                object.isFromFile = false;
                object.isEditable = false;
                object.isRequired = false;
            }
            if (message.settingId != null && Object.hasOwnProperty.call(message, "settingId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.settingId = typeof message.settingId === "number" ? BigInt(message.settingId) : $util.Long.fromBits(message.settingId.low >>> 0, message.settingId.high >>> 0, true).toBigInt();
                else if (typeof message.settingId === "number")
                    object.settingId = options.longs === String ? String(message.settingId) : message.settingId;
                else
                    object.settingId = options.longs === String ? $util.Long.prototype.toString.call(message.settingId) : options.longs === Number ? new $util.LongBits(message.settingId.low >>> 0, message.settingId.high >>> 0).toNumber(true) : message.settingId;
            if (message.settingName != null && Object.hasOwnProperty.call(message, "settingName"))
                object.settingName = message.settingName;
            if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                object.label = message.label;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            if (message.valueType != null && Object.hasOwnProperty.call(message, "valueType"))
                object.valueType = options.enums === String ? $root.SsoCloud.DataType[message.valueType] === undefined ? message.valueType : $root.SsoCloud.DataType[message.valueType] : message.valueType;
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                object.lastModified = message.lastModified;
            if (message.isFromFile != null && Object.hasOwnProperty.call(message, "isFromFile"))
                object.isFromFile = message.isFromFile;
            if (message.isEditable != null && Object.hasOwnProperty.call(message, "isEditable"))
                object.isEditable = message.isEditable;
            if (message.isRequired != null && Object.hasOwnProperty.call(message, "isRequired"))
                object.isRequired = message.isRequired;
            return object;
        };

        /**
         * Converts this SsoCloudSettingValue to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudSettingValue
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudSettingValue.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudSettingValue
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudSettingValue
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudSettingValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudSettingValue";
        };

        return SsoCloudSettingValue;
    })();

    SsoCloud.SsoCloudSettingAction = (function() {

        /**
         * Properties of a SsoCloudSettingAction.
         * @memberof SsoCloud
         * @interface ISsoCloudSettingAction
         * @property {number|null} [settingId] SsoCloudSettingAction settingId
         * @property {string|null} [settingName] SsoCloudSettingAction settingName
         * @property {SsoCloud.SsoCloudSettingOperationType|null} [operation] SsoCloudSettingAction operation
         * @property {string|null} [value] SsoCloudSettingAction value
         */

        /**
         * Constructs a new SsoCloudSettingAction.
         * @memberof SsoCloud
         * @classdesc This performs an edit operation on a Configuration setting
         * @implements ISsoCloudSettingAction
         * @constructor
         * @param {SsoCloud.ISsoCloudSettingAction=} [properties] Properties to set
         */
        function SsoCloudSettingAction(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudSettingAction settingId.
         * @member {number} settingId
         * @memberof SsoCloud.SsoCloudSettingAction
         * @instance
         */
        SsoCloudSettingAction.prototype.settingId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudSettingAction settingName.
         * @member {string} settingName
         * @memberof SsoCloud.SsoCloudSettingAction
         * @instance
         */
        SsoCloudSettingAction.prototype.settingName = "";

        /**
         * SsoCloudSettingAction operation.
         * @member {SsoCloud.SsoCloudSettingOperationType} operation
         * @memberof SsoCloud.SsoCloudSettingAction
         * @instance
         */
        SsoCloudSettingAction.prototype.operation = 0;

        /**
         * SsoCloudSettingAction value.
         * @member {string} value
         * @memberof SsoCloud.SsoCloudSettingAction
         * @instance
         */
        SsoCloudSettingAction.prototype.value = "";

        /**
         * Creates a new SsoCloudSettingAction instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudSettingAction
         * @static
         * @param {SsoCloud.ISsoCloudSettingAction=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudSettingAction} SsoCloudSettingAction instance
         */
        SsoCloudSettingAction.create = function create(properties) {
            return new SsoCloudSettingAction(properties);
        };

        /**
         * Encodes the specified SsoCloudSettingAction message. Does not implicitly {@link SsoCloud.SsoCloudSettingAction.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudSettingAction
         * @static
         * @param {SsoCloud.ISsoCloudSettingAction} message SsoCloudSettingAction message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudSettingAction.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.settingId != null && Object.hasOwnProperty.call(message, "settingId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.settingId);
            if (message.settingName != null && Object.hasOwnProperty.call(message, "settingName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.settingName);
            if (message.operation != null && Object.hasOwnProperty.call(message, "operation"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.operation);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.value);
            return writer;
        };

        /**
         * Decodes a SsoCloudSettingAction message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudSettingAction
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudSettingAction} SsoCloudSettingAction
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudSettingAction.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudSettingAction();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.settingId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.settingName = reader.string();
                        break;
                    }
                case 3: {
                        message.operation = reader.int32();
                        break;
                    }
                case 4: {
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
         * Creates a SsoCloudSettingAction message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudSettingAction
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudSettingAction} SsoCloudSettingAction
         */
        SsoCloudSettingAction.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudSettingAction)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudSettingAction: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudSettingAction();
            if (object.settingId != null)
                if ($util.Long)
                    message.settingId = $util.Long.fromValue(object.settingId, true);
                else if (typeof object.settingId === "string")
                    message.settingId = parseInt(object.settingId, 10);
                else if (typeof object.settingId === "number")
                    message.settingId = object.settingId;
                else if (typeof object.settingId === "object")
                    message.settingId = new $util.LongBits(object.settingId.low >>> 0, object.settingId.high >>> 0).toNumber(true);
            if (object.settingName != null)
                message.settingName = String(object.settingName);
            switch (object.operation) {
            default:
                if (typeof object.operation === "number") {
                    message.operation = object.operation;
                    break;
                }
                break;
            case "SET":
            case 0:
                message.operation = 0;
                break;
            case "GET":
            case 1:
                message.operation = 1;
                break;
            case "DELETE":
            case 2:
                message.operation = 2;
                break;
            case "RESET_TO_DEFAULT":
            case 3:
                message.operation = 3;
                break;
            }
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudSettingAction message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudSettingAction
         * @static
         * @param {SsoCloud.SsoCloudSettingAction} message SsoCloudSettingAction
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudSettingAction.toObject = function toObject(message, options, q) {
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
                    object.settingId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.settingId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.settingName = "";
                object.operation = options.enums === String ? "SET" : 0;
                object.value = "";
            }
            if (message.settingId != null && Object.hasOwnProperty.call(message, "settingId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.settingId = typeof message.settingId === "number" ? BigInt(message.settingId) : $util.Long.fromBits(message.settingId.low >>> 0, message.settingId.high >>> 0, true).toBigInt();
                else if (typeof message.settingId === "number")
                    object.settingId = options.longs === String ? String(message.settingId) : message.settingId;
                else
                    object.settingId = options.longs === String ? $util.Long.prototype.toString.call(message.settingId) : options.longs === Number ? new $util.LongBits(message.settingId.low >>> 0, message.settingId.high >>> 0).toNumber(true) : message.settingId;
            if (message.settingName != null && Object.hasOwnProperty.call(message, "settingName"))
                object.settingName = message.settingName;
            if (message.operation != null && Object.hasOwnProperty.call(message, "operation"))
                object.operation = options.enums === String ? $root.SsoCloud.SsoCloudSettingOperationType[message.operation] === undefined ? message.operation : $root.SsoCloud.SsoCloudSettingOperationType[message.operation] : message.operation;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this SsoCloudSettingAction to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudSettingAction
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudSettingAction.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudSettingAction
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudSettingAction
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudSettingAction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudSettingAction";
        };

        return SsoCloudSettingAction;
    })();

    SsoCloud.SsoCloudConfigurationRequest = (function() {

        /**
         * Properties of a SsoCloudConfigurationRequest.
         * @memberof SsoCloud
         * @interface ISsoCloudConfigurationRequest
         * @property {number|null} [ssoServiceProviderId] SsoCloudConfigurationRequest ssoServiceProviderId
         * @property {number|null} [ssoSpConfigurationId] SsoCloudConfigurationRequest ssoSpConfigurationId
         * @property {string|null} [name] SsoCloudConfigurationRequest name
         * @property {SsoCloud.AuthProtocolType|null} [ssoAuthProtocolType] SsoCloudConfigurationRequest ssoAuthProtocolType
         * @property {Array.<SsoCloud.ISsoCloudSettingAction>|null} [ssoCloudSettingAction] SsoCloudConfigurationRequest ssoCloudSettingAction
         */

        /**
         * Constructs a new SsoCloudConfigurationRequest.
         * @memberof SsoCloud
         * @classdesc Requesting the value of or a change to an SSO Configuration
         * @implements ISsoCloudConfigurationRequest
         * @constructor
         * @param {SsoCloud.ISsoCloudConfigurationRequest=} [properties] Properties to set
         */
        function SsoCloudConfigurationRequest(properties) {
            this.ssoCloudSettingAction = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudConfigurationRequest ssoServiceProviderId.
         * @member {number} ssoServiceProviderId
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @instance
         */
        SsoCloudConfigurationRequest.prototype.ssoServiceProviderId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudConfigurationRequest ssoSpConfigurationId.
         * @member {number} ssoSpConfigurationId
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @instance
         */
        SsoCloudConfigurationRequest.prototype.ssoSpConfigurationId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudConfigurationRequest name.
         * @member {string} name
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @instance
         */
        SsoCloudConfigurationRequest.prototype.name = "";

        /**
         * SsoCloudConfigurationRequest ssoAuthProtocolType.
         * @member {SsoCloud.AuthProtocolType} ssoAuthProtocolType
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @instance
         */
        SsoCloudConfigurationRequest.prototype.ssoAuthProtocolType = 0;

        /**
         * SsoCloudConfigurationRequest ssoCloudSettingAction.
         * @member {Array.<SsoCloud.ISsoCloudSettingAction>} ssoCloudSettingAction
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @instance
         */
        SsoCloudConfigurationRequest.prototype.ssoCloudSettingAction = $util.emptyArray;

        /**
         * Creates a new SsoCloudConfigurationRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @static
         * @param {SsoCloud.ISsoCloudConfigurationRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudConfigurationRequest} SsoCloudConfigurationRequest instance
         */
        SsoCloudConfigurationRequest.create = function create(properties) {
            return new SsoCloudConfigurationRequest(properties);
        };

        /**
         * Encodes the specified SsoCloudConfigurationRequest message. Does not implicitly {@link SsoCloud.SsoCloudConfigurationRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @static
         * @param {SsoCloud.ISsoCloudConfigurationRequest} message SsoCloudConfigurationRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudConfigurationRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoServiceProviderId);
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ssoSpConfigurationId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.ssoAuthProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthProtocolType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.ssoAuthProtocolType);
            if (message.ssoCloudSettingAction != null && message.ssoCloudSettingAction.length)
                for (let i = 0; i < message.ssoCloudSettingAction.length; ++i)
                    $root.SsoCloud.SsoCloudSettingAction.encode(message.ssoCloudSettingAction[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SsoCloudConfigurationRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudConfigurationRequest} SsoCloudConfigurationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudConfigurationRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudConfigurationRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoServiceProviderId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.ssoSpConfigurationId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.name = reader.string();
                        break;
                    }
                case 4: {
                        message.ssoAuthProtocolType = reader.int32();
                        break;
                    }
                case 5: {
                        if (!(message.ssoCloudSettingAction && message.ssoCloudSettingAction.length))
                            message.ssoCloudSettingAction = [];
                        message.ssoCloudSettingAction.push($root.SsoCloud.SsoCloudSettingAction.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a SsoCloudConfigurationRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudConfigurationRequest} SsoCloudConfigurationRequest
         */
        SsoCloudConfigurationRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudConfigurationRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudConfigurationRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudConfigurationRequest();
            if (object.ssoServiceProviderId != null)
                if ($util.Long)
                    message.ssoServiceProviderId = $util.Long.fromValue(object.ssoServiceProviderId, true);
                else if (typeof object.ssoServiceProviderId === "string")
                    message.ssoServiceProviderId = parseInt(object.ssoServiceProviderId, 10);
                else if (typeof object.ssoServiceProviderId === "number")
                    message.ssoServiceProviderId = object.ssoServiceProviderId;
                else if (typeof object.ssoServiceProviderId === "object")
                    message.ssoServiceProviderId = new $util.LongBits(object.ssoServiceProviderId.low >>> 0, object.ssoServiceProviderId.high >>> 0).toNumber(true);
            if (object.ssoSpConfigurationId != null)
                if ($util.Long)
                    message.ssoSpConfigurationId = $util.Long.fromValue(object.ssoSpConfigurationId, true);
                else if (typeof object.ssoSpConfigurationId === "string")
                    message.ssoSpConfigurationId = parseInt(object.ssoSpConfigurationId, 10);
                else if (typeof object.ssoSpConfigurationId === "number")
                    message.ssoSpConfigurationId = object.ssoSpConfigurationId;
                else if (typeof object.ssoSpConfigurationId === "object")
                    message.ssoSpConfigurationId = new $util.LongBits(object.ssoSpConfigurationId.low >>> 0, object.ssoSpConfigurationId.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            switch (object.ssoAuthProtocolType) {
            default:
                if (typeof object.ssoAuthProtocolType === "number") {
                    message.ssoAuthProtocolType = object.ssoAuthProtocolType;
                    break;
                }
                break;
            case "SAML2":
            case 0:
                message.ssoAuthProtocolType = 0;
                break;
            case "JWT":
            case 1:
                message.ssoAuthProtocolType = 1;
                break;
            }
            if (object.ssoCloudSettingAction) {
                if (!Array.isArray(object.ssoCloudSettingAction))
                    throw TypeError(".SsoCloud.SsoCloudConfigurationRequest.ssoCloudSettingAction: array expected");
                message.ssoCloudSettingAction = [];
                for (let i = 0; i < object.ssoCloudSettingAction.length; ++i) {
                    if (!$util.isObject(object.ssoCloudSettingAction[i]))
                        throw TypeError(".SsoCloud.SsoCloudConfigurationRequest.ssoCloudSettingAction: object expected");
                    message.ssoCloudSettingAction[i] = $root.SsoCloud.SsoCloudSettingAction.fromObject(object.ssoCloudSettingAction[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudConfigurationRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @static
         * @param {SsoCloud.SsoCloudConfigurationRequest} message SsoCloudConfigurationRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudConfigurationRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.ssoCloudSettingAction = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoServiceProviderId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoServiceProviderId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoSpConfigurationId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoSpConfigurationId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.name = "";
                object.ssoAuthProtocolType = options.enums === String ? "SAML2" : 0;
            }
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoServiceProviderId = typeof message.ssoServiceProviderId === "number" ? BigInt(message.ssoServiceProviderId) : $util.Long.fromBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoServiceProviderId === "number")
                    object.ssoServiceProviderId = options.longs === String ? String(message.ssoServiceProviderId) : message.ssoServiceProviderId;
                else
                    object.ssoServiceProviderId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoServiceProviderId) : options.longs === Number ? new $util.LongBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0).toNumber(true) : message.ssoServiceProviderId;
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoSpConfigurationId = typeof message.ssoSpConfigurationId === "number" ? BigInt(message.ssoSpConfigurationId) : $util.Long.fromBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoSpConfigurationId === "number")
                    object.ssoSpConfigurationId = options.longs === String ? String(message.ssoSpConfigurationId) : message.ssoSpConfigurationId;
                else
                    object.ssoSpConfigurationId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoSpConfigurationId) : options.longs === Number ? new $util.LongBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0).toNumber(true) : message.ssoSpConfigurationId;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.ssoAuthProtocolType != null && Object.hasOwnProperty.call(message, "ssoAuthProtocolType"))
                object.ssoAuthProtocolType = options.enums === String ? $root.SsoCloud.AuthProtocolType[message.ssoAuthProtocolType] === undefined ? message.ssoAuthProtocolType : $root.SsoCloud.AuthProtocolType[message.ssoAuthProtocolType] : message.ssoAuthProtocolType;
            if (message.ssoCloudSettingAction && message.ssoCloudSettingAction.length) {
                object.ssoCloudSettingAction = [];
                for (let j = 0; j < message.ssoCloudSettingAction.length; ++j)
                    object.ssoCloudSettingAction[j] = $root.SsoCloud.SsoCloudSettingAction.toObject(message.ssoCloudSettingAction[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this SsoCloudConfigurationRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudConfigurationRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudConfigurationRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudConfigurationRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudConfigurationRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudConfigurationRequest";
        };

        return SsoCloudConfigurationRequest;
    })();

    SsoCloud.SsoSharedConfigItem = (function() {

        /**
         * Properties of a SsoSharedConfigItem.
         * @memberof SsoCloud
         * @interface ISsoSharedConfigItem
         * @property {number|null} [ssoSpConfigurationId] SsoSharedConfigItem ssoSpConfigurationId
         * @property {number|null} [ssoServiceProviderId] SsoSharedConfigItem ssoServiceProviderId
         * @property {number|null} [ssoNodeId] SsoSharedConfigItem ssoNodeId
         */

        /**
         * Constructs a new SsoSharedConfigItem.
         * @memberof SsoCloud
         * @classdesc This represents the providers that share a given configuration
         * @implements ISsoSharedConfigItem
         * @constructor
         * @param {SsoCloud.ISsoSharedConfigItem=} [properties] Properties to set
         */
        function SsoSharedConfigItem(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoSharedConfigItem ssoSpConfigurationId.
         * @member {number} ssoSpConfigurationId
         * @memberof SsoCloud.SsoSharedConfigItem
         * @instance
         */
        SsoSharedConfigItem.prototype.ssoSpConfigurationId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoSharedConfigItem ssoServiceProviderId.
         * @member {number} ssoServiceProviderId
         * @memberof SsoCloud.SsoSharedConfigItem
         * @instance
         */
        SsoSharedConfigItem.prototype.ssoServiceProviderId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoSharedConfigItem ssoNodeId.
         * @member {number} ssoNodeId
         * @memberof SsoCloud.SsoSharedConfigItem
         * @instance
         */
        SsoSharedConfigItem.prototype.ssoNodeId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new SsoSharedConfigItem instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoSharedConfigItem
         * @static
         * @param {SsoCloud.ISsoSharedConfigItem=} [properties] Properties to set
         * @returns {SsoCloud.SsoSharedConfigItem} SsoSharedConfigItem instance
         */
        SsoSharedConfigItem.create = function create(properties) {
            return new SsoSharedConfigItem(properties);
        };

        /**
         * Encodes the specified SsoSharedConfigItem message. Does not implicitly {@link SsoCloud.SsoSharedConfigItem.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoSharedConfigItem
         * @static
         * @param {SsoCloud.ISsoSharedConfigItem} message SsoSharedConfigItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoSharedConfigItem.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoSpConfigurationId);
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ssoServiceProviderId);
            if (message.ssoNodeId != null && Object.hasOwnProperty.call(message, "ssoNodeId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.ssoNodeId);
            return writer;
        };

        /**
         * Decodes a SsoSharedConfigItem message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoSharedConfigItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoSharedConfigItem} SsoSharedConfigItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoSharedConfigItem.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoSharedConfigItem();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoSpConfigurationId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.ssoServiceProviderId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.ssoNodeId = reader.uint64();
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
         * Creates a SsoSharedConfigItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoSharedConfigItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoSharedConfigItem} SsoSharedConfigItem
         */
        SsoSharedConfigItem.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoSharedConfigItem)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoSharedConfigItem: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoSharedConfigItem();
            if (object.ssoSpConfigurationId != null)
                if ($util.Long)
                    message.ssoSpConfigurationId = $util.Long.fromValue(object.ssoSpConfigurationId, true);
                else if (typeof object.ssoSpConfigurationId === "string")
                    message.ssoSpConfigurationId = parseInt(object.ssoSpConfigurationId, 10);
                else if (typeof object.ssoSpConfigurationId === "number")
                    message.ssoSpConfigurationId = object.ssoSpConfigurationId;
                else if (typeof object.ssoSpConfigurationId === "object")
                    message.ssoSpConfigurationId = new $util.LongBits(object.ssoSpConfigurationId.low >>> 0, object.ssoSpConfigurationId.high >>> 0).toNumber(true);
            if (object.ssoServiceProviderId != null)
                if ($util.Long)
                    message.ssoServiceProviderId = $util.Long.fromValue(object.ssoServiceProviderId, true);
                else if (typeof object.ssoServiceProviderId === "string")
                    message.ssoServiceProviderId = parseInt(object.ssoServiceProviderId, 10);
                else if (typeof object.ssoServiceProviderId === "number")
                    message.ssoServiceProviderId = object.ssoServiceProviderId;
                else if (typeof object.ssoServiceProviderId === "object")
                    message.ssoServiceProviderId = new $util.LongBits(object.ssoServiceProviderId.low >>> 0, object.ssoServiceProviderId.high >>> 0).toNumber(true);
            if (object.ssoNodeId != null)
                if ($util.Long)
                    message.ssoNodeId = $util.Long.fromValue(object.ssoNodeId, true);
                else if (typeof object.ssoNodeId === "string")
                    message.ssoNodeId = parseInt(object.ssoNodeId, 10);
                else if (typeof object.ssoNodeId === "number")
                    message.ssoNodeId = object.ssoNodeId;
                else if (typeof object.ssoNodeId === "object")
                    message.ssoNodeId = new $util.LongBits(object.ssoNodeId.low >>> 0, object.ssoNodeId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a SsoSharedConfigItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoSharedConfigItem
         * @static
         * @param {SsoCloud.SsoSharedConfigItem} message SsoSharedConfigItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoSharedConfigItem.toObject = function toObject(message, options, q) {
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
                    object.ssoSpConfigurationId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoSpConfigurationId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoServiceProviderId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoServiceProviderId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoNodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoNodeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoSpConfigurationId = typeof message.ssoSpConfigurationId === "number" ? BigInt(message.ssoSpConfigurationId) : $util.Long.fromBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoSpConfigurationId === "number")
                    object.ssoSpConfigurationId = options.longs === String ? String(message.ssoSpConfigurationId) : message.ssoSpConfigurationId;
                else
                    object.ssoSpConfigurationId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoSpConfigurationId) : options.longs === Number ? new $util.LongBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0).toNumber(true) : message.ssoSpConfigurationId;
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoServiceProviderId = typeof message.ssoServiceProviderId === "number" ? BigInt(message.ssoServiceProviderId) : $util.Long.fromBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoServiceProviderId === "number")
                    object.ssoServiceProviderId = options.longs === String ? String(message.ssoServiceProviderId) : message.ssoServiceProviderId;
                else
                    object.ssoServiceProviderId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoServiceProviderId) : options.longs === Number ? new $util.LongBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0).toNumber(true) : message.ssoServiceProviderId;
            if (message.ssoNodeId != null && Object.hasOwnProperty.call(message, "ssoNodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoNodeId = typeof message.ssoNodeId === "number" ? BigInt(message.ssoNodeId) : $util.Long.fromBits(message.ssoNodeId.low >>> 0, message.ssoNodeId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoNodeId === "number")
                    object.ssoNodeId = options.longs === String ? String(message.ssoNodeId) : message.ssoNodeId;
                else
                    object.ssoNodeId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoNodeId) : options.longs === Number ? new $util.LongBits(message.ssoNodeId.low >>> 0, message.ssoNodeId.high >>> 0).toNumber(true) : message.ssoNodeId;
            return object;
        };

        /**
         * Converts this SsoSharedConfigItem to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoSharedConfigItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoSharedConfigItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoSharedConfigItem
         * @function getTypeUrl
         * @memberof SsoCloud.SsoSharedConfigItem
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoSharedConfigItem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoSharedConfigItem";
        };

        return SsoSharedConfigItem;
    })();

    SsoCloud.SsoCloudConfigurationResponse = (function() {

        /**
         * Properties of a SsoCloudConfigurationResponse.
         * @memberof SsoCloud
         * @interface ISsoCloudConfigurationResponse
         * @property {number|null} [ssoServiceProviderId] SsoCloudConfigurationResponse ssoServiceProviderId
         * @property {number|null} [ssoSpConfigurationId] SsoCloudConfigurationResponse ssoSpConfigurationId
         * @property {number|null} [enterpriseId] SsoCloudConfigurationResponse enterpriseId
         * @property {string|null} [name] SsoCloudConfigurationResponse name
         * @property {string|null} [protocol] SsoCloudConfigurationResponse protocol
         * @property {string|null} [lastModified] SsoCloudConfigurationResponse lastModified
         * @property {Array.<SsoCloud.ISsoCloudSettingValue>|null} [ssoCloudSettingValue] SsoCloudConfigurationResponse ssoCloudSettingValue
         * @property {boolean|null} [isShared] SsoCloudConfigurationResponse isShared
         * @property {Array.<SsoCloud.ISsoSharedConfigItem>|null} [sharedConfigs] SsoCloudConfigurationResponse sharedConfigs
         */

        /**
         * Constructs a new SsoCloudConfigurationResponse.
         * @memberof SsoCloud
         * @classdesc This is the response to an SsoConfigurationRequest
         * @implements ISsoCloudConfigurationResponse
         * @constructor
         * @param {SsoCloud.ISsoCloudConfigurationResponse=} [properties] Properties to set
         */
        function SsoCloudConfigurationResponse(properties) {
            this.ssoCloudSettingValue = [];
            this.sharedConfigs = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudConfigurationResponse ssoServiceProviderId.
         * @member {number} ssoServiceProviderId
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @instance
         */
        SsoCloudConfigurationResponse.prototype.ssoServiceProviderId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudConfigurationResponse ssoSpConfigurationId.
         * @member {number} ssoSpConfigurationId
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @instance
         */
        SsoCloudConfigurationResponse.prototype.ssoSpConfigurationId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudConfigurationResponse enterpriseId.
         * @member {number} enterpriseId
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @instance
         */
        SsoCloudConfigurationResponse.prototype.enterpriseId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudConfigurationResponse name.
         * @member {string} name
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @instance
         */
        SsoCloudConfigurationResponse.prototype.name = "";

        /**
         * SsoCloudConfigurationResponse protocol.
         * @member {string} protocol
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @instance
         */
        SsoCloudConfigurationResponse.prototype.protocol = "";

        /**
         * SsoCloudConfigurationResponse lastModified.
         * @member {string} lastModified
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @instance
         */
        SsoCloudConfigurationResponse.prototype.lastModified = "";

        /**
         * SsoCloudConfigurationResponse ssoCloudSettingValue.
         * @member {Array.<SsoCloud.ISsoCloudSettingValue>} ssoCloudSettingValue
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @instance
         */
        SsoCloudConfigurationResponse.prototype.ssoCloudSettingValue = $util.emptyArray;

        /**
         * SsoCloudConfigurationResponse isShared.
         * @member {boolean} isShared
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @instance
         */
        SsoCloudConfigurationResponse.prototype.isShared = false;

        /**
         * SsoCloudConfigurationResponse sharedConfigs.
         * @member {Array.<SsoCloud.ISsoSharedConfigItem>} sharedConfigs
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @instance
         */
        SsoCloudConfigurationResponse.prototype.sharedConfigs = $util.emptyArray;

        /**
         * Creates a new SsoCloudConfigurationResponse instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @static
         * @param {SsoCloud.ISsoCloudConfigurationResponse=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudConfigurationResponse} SsoCloudConfigurationResponse instance
         */
        SsoCloudConfigurationResponse.create = function create(properties) {
            return new SsoCloudConfigurationResponse(properties);
        };

        /**
         * Encodes the specified SsoCloudConfigurationResponse message. Does not implicitly {@link SsoCloud.SsoCloudConfigurationResponse.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @static
         * @param {SsoCloud.ISsoCloudConfigurationResponse} message SsoCloudConfigurationResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudConfigurationResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoServiceProviderId);
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ssoSpConfigurationId);
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.enterpriseId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.name);
            if (message.protocol != null && Object.hasOwnProperty.call(message, "protocol"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.protocol);
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.lastModified);
            if (message.ssoCloudSettingValue != null && message.ssoCloudSettingValue.length)
                for (let i = 0; i < message.ssoCloudSettingValue.length; ++i)
                    $root.SsoCloud.SsoCloudSettingValue.encode(message.ssoCloudSettingValue[i], writer.uint32(/* id 7, wireType 2 =*/58).fork(), q + 1).ldelim();
            if (message.isShared != null && Object.hasOwnProperty.call(message, "isShared"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.isShared);
            if (message.sharedConfigs != null && message.sharedConfigs.length)
                for (let i = 0; i < message.sharedConfigs.length; ++i)
                    $root.SsoCloud.SsoSharedConfigItem.encode(message.sharedConfigs[i], writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SsoCloudConfigurationResponse message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudConfigurationResponse} SsoCloudConfigurationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudConfigurationResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudConfigurationResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoServiceProviderId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.ssoSpConfigurationId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.enterpriseId = reader.uint64();
                        break;
                    }
                case 4: {
                        message.name = reader.string();
                        break;
                    }
                case 5: {
                        message.protocol = reader.string();
                        break;
                    }
                case 6: {
                        message.lastModified = reader.string();
                        break;
                    }
                case 7: {
                        if (!(message.ssoCloudSettingValue && message.ssoCloudSettingValue.length))
                            message.ssoCloudSettingValue = [];
                        message.ssoCloudSettingValue.push($root.SsoCloud.SsoCloudSettingValue.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 8: {
                        message.isShared = reader.bool();
                        break;
                    }
                case 9: {
                        if (!(message.sharedConfigs && message.sharedConfigs.length))
                            message.sharedConfigs = [];
                        message.sharedConfigs.push($root.SsoCloud.SsoSharedConfigItem.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a SsoCloudConfigurationResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudConfigurationResponse} SsoCloudConfigurationResponse
         */
        SsoCloudConfigurationResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudConfigurationResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudConfigurationResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudConfigurationResponse();
            if (object.ssoServiceProviderId != null)
                if ($util.Long)
                    message.ssoServiceProviderId = $util.Long.fromValue(object.ssoServiceProviderId, true);
                else if (typeof object.ssoServiceProviderId === "string")
                    message.ssoServiceProviderId = parseInt(object.ssoServiceProviderId, 10);
                else if (typeof object.ssoServiceProviderId === "number")
                    message.ssoServiceProviderId = object.ssoServiceProviderId;
                else if (typeof object.ssoServiceProviderId === "object")
                    message.ssoServiceProviderId = new $util.LongBits(object.ssoServiceProviderId.low >>> 0, object.ssoServiceProviderId.high >>> 0).toNumber(true);
            if (object.ssoSpConfigurationId != null)
                if ($util.Long)
                    message.ssoSpConfigurationId = $util.Long.fromValue(object.ssoSpConfigurationId, true);
                else if (typeof object.ssoSpConfigurationId === "string")
                    message.ssoSpConfigurationId = parseInt(object.ssoSpConfigurationId, 10);
                else if (typeof object.ssoSpConfigurationId === "number")
                    message.ssoSpConfigurationId = object.ssoSpConfigurationId;
                else if (typeof object.ssoSpConfigurationId === "object")
                    message.ssoSpConfigurationId = new $util.LongBits(object.ssoSpConfigurationId.low >>> 0, object.ssoSpConfigurationId.high >>> 0).toNumber(true);
            if (object.enterpriseId != null)
                if ($util.Long)
                    message.enterpriseId = $util.Long.fromValue(object.enterpriseId, true);
                else if (typeof object.enterpriseId === "string")
                    message.enterpriseId = parseInt(object.enterpriseId, 10);
                else if (typeof object.enterpriseId === "number")
                    message.enterpriseId = object.enterpriseId;
                else if (typeof object.enterpriseId === "object")
                    message.enterpriseId = new $util.LongBits(object.enterpriseId.low >>> 0, object.enterpriseId.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            if (object.protocol != null)
                message.protocol = String(object.protocol);
            if (object.lastModified != null)
                message.lastModified = String(object.lastModified);
            if (object.ssoCloudSettingValue) {
                if (!Array.isArray(object.ssoCloudSettingValue))
                    throw TypeError(".SsoCloud.SsoCloudConfigurationResponse.ssoCloudSettingValue: array expected");
                message.ssoCloudSettingValue = [];
                for (let i = 0; i < object.ssoCloudSettingValue.length; ++i) {
                    if (!$util.isObject(object.ssoCloudSettingValue[i]))
                        throw TypeError(".SsoCloud.SsoCloudConfigurationResponse.ssoCloudSettingValue: object expected");
                    message.ssoCloudSettingValue[i] = $root.SsoCloud.SsoCloudSettingValue.fromObject(object.ssoCloudSettingValue[i], long + 1);
                }
            }
            if (object.isShared != null)
                message.isShared = Boolean(object.isShared);
            if (object.sharedConfigs) {
                if (!Array.isArray(object.sharedConfigs))
                    throw TypeError(".SsoCloud.SsoCloudConfigurationResponse.sharedConfigs: array expected");
                message.sharedConfigs = [];
                for (let i = 0; i < object.sharedConfigs.length; ++i) {
                    if (!$util.isObject(object.sharedConfigs[i]))
                        throw TypeError(".SsoCloud.SsoCloudConfigurationResponse.sharedConfigs: object expected");
                    message.sharedConfigs[i] = $root.SsoCloud.SsoSharedConfigItem.fromObject(object.sharedConfigs[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudConfigurationResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @static
         * @param {SsoCloud.SsoCloudConfigurationResponse} message SsoCloudConfigurationResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudConfigurationResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.ssoCloudSettingValue = [];
                object.sharedConfigs = [];
            }
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoServiceProviderId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoServiceProviderId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoSpConfigurationId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoSpConfigurationId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.enterpriseId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.enterpriseId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.name = "";
                object.protocol = "";
                object.lastModified = "";
                object.isShared = false;
            }
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoServiceProviderId = typeof message.ssoServiceProviderId === "number" ? BigInt(message.ssoServiceProviderId) : $util.Long.fromBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoServiceProviderId === "number")
                    object.ssoServiceProviderId = options.longs === String ? String(message.ssoServiceProviderId) : message.ssoServiceProviderId;
                else
                    object.ssoServiceProviderId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoServiceProviderId) : options.longs === Number ? new $util.LongBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0).toNumber(true) : message.ssoServiceProviderId;
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoSpConfigurationId = typeof message.ssoSpConfigurationId === "number" ? BigInt(message.ssoSpConfigurationId) : $util.Long.fromBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoSpConfigurationId === "number")
                    object.ssoSpConfigurationId = options.longs === String ? String(message.ssoSpConfigurationId) : message.ssoSpConfigurationId;
                else
                    object.ssoSpConfigurationId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoSpConfigurationId) : options.longs === Number ? new $util.LongBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0).toNumber(true) : message.ssoSpConfigurationId;
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.enterpriseId = typeof message.enterpriseId === "number" ? BigInt(message.enterpriseId) : $util.Long.fromBits(message.enterpriseId.low >>> 0, message.enterpriseId.high >>> 0, true).toBigInt();
                else if (typeof message.enterpriseId === "number")
                    object.enterpriseId = options.longs === String ? String(message.enterpriseId) : message.enterpriseId;
                else
                    object.enterpriseId = options.longs === String ? $util.Long.prototype.toString.call(message.enterpriseId) : options.longs === Number ? new $util.LongBits(message.enterpriseId.low >>> 0, message.enterpriseId.high >>> 0).toNumber(true) : message.enterpriseId;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.protocol != null && Object.hasOwnProperty.call(message, "protocol"))
                object.protocol = message.protocol;
            if (message.lastModified != null && Object.hasOwnProperty.call(message, "lastModified"))
                object.lastModified = message.lastModified;
            if (message.ssoCloudSettingValue && message.ssoCloudSettingValue.length) {
                object.ssoCloudSettingValue = [];
                for (let j = 0; j < message.ssoCloudSettingValue.length; ++j)
                    object.ssoCloudSettingValue[j] = $root.SsoCloud.SsoCloudSettingValue.toObject(message.ssoCloudSettingValue[j], options, q + 1);
            }
            if (message.isShared != null && Object.hasOwnProperty.call(message, "isShared"))
                object.isShared = message.isShared;
            if (message.sharedConfigs && message.sharedConfigs.length) {
                object.sharedConfigs = [];
                for (let j = 0; j < message.sharedConfigs.length; ++j)
                    object.sharedConfigs[j] = $root.SsoCloud.SsoSharedConfigItem.toObject(message.sharedConfigs[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this SsoCloudConfigurationResponse to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudConfigurationResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudConfigurationResponse
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudConfigurationResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudConfigurationResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudConfigurationResponse";
        };

        return SsoCloudConfigurationResponse;
    })();

    SsoCloud.SsoIdpTypeRequest = (function() {

        /**
         * Properties of a SsoIdpTypeRequest.
         * @memberof SsoCloud
         * @interface ISsoIdpTypeRequest
         * @property {number|null} [ssoIdpTypeId] SsoIdpTypeRequest ssoIdpTypeId
         * @property {string|null} [tag] SsoIdpTypeRequest tag
         * @property {string|null} [label] SsoIdpTypeRequest label
         */

        /**
         * Constructs a new SsoIdpTypeRequest.
         * @memberof SsoCloud
         * @classdesc This is a request to the IdpType API.
         * @implements ISsoIdpTypeRequest
         * @constructor
         * @param {SsoCloud.ISsoIdpTypeRequest=} [properties] Properties to set
         */
        function SsoIdpTypeRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoIdpTypeRequest ssoIdpTypeId.
         * @member {number} ssoIdpTypeId
         * @memberof SsoCloud.SsoIdpTypeRequest
         * @instance
         */
        SsoIdpTypeRequest.prototype.ssoIdpTypeId = 0;

        /**
         * SsoIdpTypeRequest tag.
         * @member {string} tag
         * @memberof SsoCloud.SsoIdpTypeRequest
         * @instance
         */
        SsoIdpTypeRequest.prototype.tag = "";

        /**
         * SsoIdpTypeRequest label.
         * @member {string} label
         * @memberof SsoCloud.SsoIdpTypeRequest
         * @instance
         */
        SsoIdpTypeRequest.prototype.label = "";

        /**
         * Creates a new SsoIdpTypeRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoIdpTypeRequest
         * @static
         * @param {SsoCloud.ISsoIdpTypeRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoIdpTypeRequest} SsoIdpTypeRequest instance
         */
        SsoIdpTypeRequest.create = function create(properties) {
            return new SsoIdpTypeRequest(properties);
        };

        /**
         * Encodes the specified SsoIdpTypeRequest message. Does not implicitly {@link SsoCloud.SsoIdpTypeRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoIdpTypeRequest
         * @static
         * @param {SsoCloud.ISsoIdpTypeRequest} message SsoIdpTypeRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoIdpTypeRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoIdpTypeId != null && Object.hasOwnProperty.call(message, "ssoIdpTypeId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ssoIdpTypeId);
            if (message.tag != null && Object.hasOwnProperty.call(message, "tag"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.tag);
            if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.label);
            return writer;
        };

        /**
         * Decodes a SsoIdpTypeRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoIdpTypeRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoIdpTypeRequest} SsoIdpTypeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoIdpTypeRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoIdpTypeRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoIdpTypeId = reader.uint32();
                        break;
                    }
                case 2: {
                        message.tag = reader.string();
                        break;
                    }
                case 3: {
                        message.label = reader.string();
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
         * Creates a SsoIdpTypeRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoIdpTypeRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoIdpTypeRequest} SsoIdpTypeRequest
         */
        SsoIdpTypeRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoIdpTypeRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoIdpTypeRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoIdpTypeRequest();
            if (object.ssoIdpTypeId != null)
                message.ssoIdpTypeId = object.ssoIdpTypeId >>> 0;
            if (object.tag != null)
                message.tag = String(object.tag);
            if (object.label != null)
                message.label = String(object.label);
            return message;
        };

        /**
         * Creates a plain object from a SsoIdpTypeRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoIdpTypeRequest
         * @static
         * @param {SsoCloud.SsoIdpTypeRequest} message SsoIdpTypeRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoIdpTypeRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.ssoIdpTypeId = 0;
                object.tag = "";
                object.label = "";
            }
            if (message.ssoIdpTypeId != null && Object.hasOwnProperty.call(message, "ssoIdpTypeId"))
                object.ssoIdpTypeId = message.ssoIdpTypeId;
            if (message.tag != null && Object.hasOwnProperty.call(message, "tag"))
                object.tag = message.tag;
            if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                object.label = message.label;
            return object;
        };

        /**
         * Converts this SsoIdpTypeRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoIdpTypeRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoIdpTypeRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoIdpTypeRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoIdpTypeRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoIdpTypeRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoIdpTypeRequest";
        };

        return SsoIdpTypeRequest;
    })();

    SsoCloud.SsoIdpTypeResponse = (function() {

        /**
         * Properties of a SsoIdpTypeResponse.
         * @memberof SsoCloud
         * @interface ISsoIdpTypeResponse
         * @property {number|null} [ssoIdpTypeId] SsoIdpTypeResponse ssoIdpTypeId
         * @property {number|null} [tag] SsoIdpTypeResponse tag
         * @property {number|null} [label] SsoIdpTypeResponse label
         */

        /**
         * Constructs a new SsoIdpTypeResponse.
         * @memberof SsoCloud
         * @classdesc This is a response from the IdpType API calls.
         * @implements ISsoIdpTypeResponse
         * @constructor
         * @param {SsoCloud.ISsoIdpTypeResponse=} [properties] Properties to set
         */
        function SsoIdpTypeResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoIdpTypeResponse ssoIdpTypeId.
         * @member {number} ssoIdpTypeId
         * @memberof SsoCloud.SsoIdpTypeResponse
         * @instance
         */
        SsoIdpTypeResponse.prototype.ssoIdpTypeId = 0;

        /**
         * SsoIdpTypeResponse tag.
         * @member {number} tag
         * @memberof SsoCloud.SsoIdpTypeResponse
         * @instance
         */
        SsoIdpTypeResponse.prototype.tag = 0;

        /**
         * SsoIdpTypeResponse label.
         * @member {number} label
         * @memberof SsoCloud.SsoIdpTypeResponse
         * @instance
         */
        SsoIdpTypeResponse.prototype.label = 0;

        /**
         * Creates a new SsoIdpTypeResponse instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoIdpTypeResponse
         * @static
         * @param {SsoCloud.ISsoIdpTypeResponse=} [properties] Properties to set
         * @returns {SsoCloud.SsoIdpTypeResponse} SsoIdpTypeResponse instance
         */
        SsoIdpTypeResponse.create = function create(properties) {
            return new SsoIdpTypeResponse(properties);
        };

        /**
         * Encodes the specified SsoIdpTypeResponse message. Does not implicitly {@link SsoCloud.SsoIdpTypeResponse.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoIdpTypeResponse
         * @static
         * @param {SsoCloud.ISsoIdpTypeResponse} message SsoIdpTypeResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoIdpTypeResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoIdpTypeId != null && Object.hasOwnProperty.call(message, "ssoIdpTypeId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ssoIdpTypeId);
            if (message.tag != null && Object.hasOwnProperty.call(message, "tag"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.tag);
            if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.label);
            return writer;
        };

        /**
         * Decodes a SsoIdpTypeResponse message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoIdpTypeResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoIdpTypeResponse} SsoIdpTypeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoIdpTypeResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoIdpTypeResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoIdpTypeId = reader.int32();
                        break;
                    }
                case 2: {
                        message.tag = reader.int32();
                        break;
                    }
                case 3: {
                        message.label = reader.int32();
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
         * Creates a SsoIdpTypeResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoIdpTypeResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoIdpTypeResponse} SsoIdpTypeResponse
         */
        SsoIdpTypeResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoIdpTypeResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoIdpTypeResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoIdpTypeResponse();
            if (object.ssoIdpTypeId != null)
                message.ssoIdpTypeId = object.ssoIdpTypeId | 0;
            if (object.tag != null)
                message.tag = object.tag | 0;
            if (object.label != null)
                message.label = object.label | 0;
            return message;
        };

        /**
         * Creates a plain object from a SsoIdpTypeResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoIdpTypeResponse
         * @static
         * @param {SsoCloud.SsoIdpTypeResponse} message SsoIdpTypeResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoIdpTypeResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.ssoIdpTypeId = 0;
                object.tag = 0;
                object.label = 0;
            }
            if (message.ssoIdpTypeId != null && Object.hasOwnProperty.call(message, "ssoIdpTypeId"))
                object.ssoIdpTypeId = message.ssoIdpTypeId;
            if (message.tag != null && Object.hasOwnProperty.call(message, "tag"))
                object.tag = message.tag;
            if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                object.label = message.label;
            return object;
        };

        /**
         * Converts this SsoIdpTypeResponse to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoIdpTypeResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoIdpTypeResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoIdpTypeResponse
         * @function getTypeUrl
         * @memberof SsoCloud.SsoIdpTypeResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoIdpTypeResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoIdpTypeResponse";
        };

        return SsoIdpTypeResponse;
    })();

    SsoCloud.SsoCloudSAMLLogRequest = (function() {

        /**
         * Properties of a SsoCloudSAMLLogRequest.
         * @memberof SsoCloud
         * @interface ISsoCloudSAMLLogRequest
         * @property {number|null} [ssoServiceProviderId] SsoCloudSAMLLogRequest ssoServiceProviderId
         */

        /**
         * Constructs a new SsoCloudSAMLLogRequest.
         * @memberof SsoCloud
         * @classdesc This is the request for the SAML logs of a service provider.  Used for both saml_log_get and saml_log_clear
         * @implements ISsoCloudSAMLLogRequest
         * @constructor
         * @param {SsoCloud.ISsoCloudSAMLLogRequest=} [properties] Properties to set
         */
        function SsoCloudSAMLLogRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudSAMLLogRequest ssoServiceProviderId.
         * @member {number} ssoServiceProviderId
         * @memberof SsoCloud.SsoCloudSAMLLogRequest
         * @instance
         */
        SsoCloudSAMLLogRequest.prototype.ssoServiceProviderId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new SsoCloudSAMLLogRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudSAMLLogRequest
         * @static
         * @param {SsoCloud.ISsoCloudSAMLLogRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudSAMLLogRequest} SsoCloudSAMLLogRequest instance
         */
        SsoCloudSAMLLogRequest.create = function create(properties) {
            return new SsoCloudSAMLLogRequest(properties);
        };

        /**
         * Encodes the specified SsoCloudSAMLLogRequest message. Does not implicitly {@link SsoCloud.SsoCloudSAMLLogRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudSAMLLogRequest
         * @static
         * @param {SsoCloud.ISsoCloudSAMLLogRequest} message SsoCloudSAMLLogRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudSAMLLogRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoServiceProviderId);
            return writer;
        };

        /**
         * Decodes a SsoCloudSAMLLogRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudSAMLLogRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudSAMLLogRequest} SsoCloudSAMLLogRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudSAMLLogRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudSAMLLogRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoServiceProviderId = reader.uint64();
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
         * Creates a SsoCloudSAMLLogRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudSAMLLogRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudSAMLLogRequest} SsoCloudSAMLLogRequest
         */
        SsoCloudSAMLLogRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudSAMLLogRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudSAMLLogRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudSAMLLogRequest();
            if (object.ssoServiceProviderId != null)
                if ($util.Long)
                    message.ssoServiceProviderId = $util.Long.fromValue(object.ssoServiceProviderId, true);
                else if (typeof object.ssoServiceProviderId === "string")
                    message.ssoServiceProviderId = parseInt(object.ssoServiceProviderId, 10);
                else if (typeof object.ssoServiceProviderId === "number")
                    message.ssoServiceProviderId = object.ssoServiceProviderId;
                else if (typeof object.ssoServiceProviderId === "object")
                    message.ssoServiceProviderId = new $util.LongBits(object.ssoServiceProviderId.low >>> 0, object.ssoServiceProviderId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudSAMLLogRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudSAMLLogRequest
         * @static
         * @param {SsoCloud.SsoCloudSAMLLogRequest} message SsoCloudSAMLLogRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudSAMLLogRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoServiceProviderId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoServiceProviderId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoServiceProviderId = typeof message.ssoServiceProviderId === "number" ? BigInt(message.ssoServiceProviderId) : $util.Long.fromBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoServiceProviderId === "number")
                    object.ssoServiceProviderId = options.longs === String ? String(message.ssoServiceProviderId) : message.ssoServiceProviderId;
                else
                    object.ssoServiceProviderId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoServiceProviderId) : options.longs === Number ? new $util.LongBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0).toNumber(true) : message.ssoServiceProviderId;
            return object;
        };

        /**
         * Converts this SsoCloudSAMLLogRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudSAMLLogRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudSAMLLogRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudSAMLLogRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudSAMLLogRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudSAMLLogRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudSAMLLogRequest";
        };

        return SsoCloudSAMLLogRequest;
    })();

    SsoCloud.SsoCloudSAMLLogEntry = (function() {

        /**
         * Properties of a SsoCloudSAMLLogEntry.
         * @memberof SsoCloud
         * @interface ISsoCloudSAMLLogEntry
         * @property {string|null} [serverTime] SsoCloudSAMLLogEntry serverTime
         * @property {string|null} [direction] SsoCloudSAMLLogEntry direction
         * @property {string|null} [messageType] SsoCloudSAMLLogEntry messageType
         * @property {string|null} [messageIssued] SsoCloudSAMLLogEntry messageIssued
         * @property {string|null} [fromEntityId] SsoCloudSAMLLogEntry fromEntityId
         * @property {string|null} [samlStatus] SsoCloudSAMLLogEntry samlStatus
         * @property {string|null} [relayState] SsoCloudSAMLLogEntry relayState
         * @property {string|null} [samlContent] SsoCloudSAMLLogEntry samlContent
         * @property {boolean|null} [isSigned] SsoCloudSAMLLogEntry isSigned
         * @property {boolean|null} [isOK] SsoCloudSAMLLogEntry isOK
         */

        /**
         * Constructs a new SsoCloudSAMLLogEntry.
         * @memberof SsoCloud
         * @classdesc This represents one SAML message in the log.
         * @implements ISsoCloudSAMLLogEntry
         * @constructor
         * @param {SsoCloud.ISsoCloudSAMLLogEntry=} [properties] Properties to set
         */
        function SsoCloudSAMLLogEntry(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudSAMLLogEntry serverTime.
         * @member {string} serverTime
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         */
        SsoCloudSAMLLogEntry.prototype.serverTime = "";

        /**
         * SsoCloudSAMLLogEntry direction.
         * @member {string} direction
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         */
        SsoCloudSAMLLogEntry.prototype.direction = "";

        /**
         * SsoCloudSAMLLogEntry messageType.
         * @member {string} messageType
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         */
        SsoCloudSAMLLogEntry.prototype.messageType = "";

        /**
         * SsoCloudSAMLLogEntry messageIssued.
         * @member {string} messageIssued
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         */
        SsoCloudSAMLLogEntry.prototype.messageIssued = "";

        /**
         * SsoCloudSAMLLogEntry fromEntityId.
         * @member {string} fromEntityId
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         */
        SsoCloudSAMLLogEntry.prototype.fromEntityId = "";

        /**
         * SsoCloudSAMLLogEntry samlStatus.
         * @member {string} samlStatus
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         */
        SsoCloudSAMLLogEntry.prototype.samlStatus = "";

        /**
         * SsoCloudSAMLLogEntry relayState.
         * @member {string} relayState
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         */
        SsoCloudSAMLLogEntry.prototype.relayState = "";

        /**
         * SsoCloudSAMLLogEntry samlContent.
         * @member {string} samlContent
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         */
        SsoCloudSAMLLogEntry.prototype.samlContent = "";

        /**
         * SsoCloudSAMLLogEntry isSigned.
         * @member {boolean} isSigned
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         */
        SsoCloudSAMLLogEntry.prototype.isSigned = false;

        /**
         * SsoCloudSAMLLogEntry isOK.
         * @member {boolean} isOK
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         */
        SsoCloudSAMLLogEntry.prototype.isOK = false;

        /**
         * Creates a new SsoCloudSAMLLogEntry instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @static
         * @param {SsoCloud.ISsoCloudSAMLLogEntry=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudSAMLLogEntry} SsoCloudSAMLLogEntry instance
         */
        SsoCloudSAMLLogEntry.create = function create(properties) {
            return new SsoCloudSAMLLogEntry(properties);
        };

        /**
         * Encodes the specified SsoCloudSAMLLogEntry message. Does not implicitly {@link SsoCloud.SsoCloudSAMLLogEntry.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @static
         * @param {SsoCloud.ISsoCloudSAMLLogEntry} message SsoCloudSAMLLogEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudSAMLLogEntry.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.serverTime);
            if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.direction);
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.messageType);
            if (message.messageIssued != null && Object.hasOwnProperty.call(message, "messageIssued"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.messageIssued);
            if (message.fromEntityId != null && Object.hasOwnProperty.call(message, "fromEntityId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.fromEntityId);
            if (message.samlStatus != null && Object.hasOwnProperty.call(message, "samlStatus"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.samlStatus);
            if (message.relayState != null && Object.hasOwnProperty.call(message, "relayState"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.relayState);
            if (message.samlContent != null && Object.hasOwnProperty.call(message, "samlContent"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.samlContent);
            if (message.isSigned != null && Object.hasOwnProperty.call(message, "isSigned"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isSigned);
            if (message.isOK != null && Object.hasOwnProperty.call(message, "isOK"))
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.isOK);
            return writer;
        };

        /**
         * Decodes a SsoCloudSAMLLogEntry message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudSAMLLogEntry} SsoCloudSAMLLogEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudSAMLLogEntry.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudSAMLLogEntry();
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
                        message.direction = reader.string();
                        break;
                    }
                case 3: {
                        message.messageType = reader.string();
                        break;
                    }
                case 4: {
                        message.messageIssued = reader.string();
                        break;
                    }
                case 5: {
                        message.fromEntityId = reader.string();
                        break;
                    }
                case 6: {
                        message.samlStatus = reader.string();
                        break;
                    }
                case 7: {
                        message.relayState = reader.string();
                        break;
                    }
                case 8: {
                        message.samlContent = reader.string();
                        break;
                    }
                case 9: {
                        message.isSigned = reader.bool();
                        break;
                    }
                case 10: {
                        message.isOK = reader.bool();
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
         * Creates a SsoCloudSAMLLogEntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudSAMLLogEntry} SsoCloudSAMLLogEntry
         */
        SsoCloudSAMLLogEntry.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudSAMLLogEntry)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudSAMLLogEntry: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudSAMLLogEntry();
            if (object.serverTime != null)
                message.serverTime = String(object.serverTime);
            if (object.direction != null)
                message.direction = String(object.direction);
            if (object.messageType != null)
                message.messageType = String(object.messageType);
            if (object.messageIssued != null)
                message.messageIssued = String(object.messageIssued);
            if (object.fromEntityId != null)
                message.fromEntityId = String(object.fromEntityId);
            if (object.samlStatus != null)
                message.samlStatus = String(object.samlStatus);
            if (object.relayState != null)
                message.relayState = String(object.relayState);
            if (object.samlContent != null)
                message.samlContent = String(object.samlContent);
            if (object.isSigned != null)
                message.isSigned = Boolean(object.isSigned);
            if (object.isOK != null)
                message.isOK = Boolean(object.isOK);
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudSAMLLogEntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @static
         * @param {SsoCloud.SsoCloudSAMLLogEntry} message SsoCloudSAMLLogEntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudSAMLLogEntry.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.serverTime = "";
                object.direction = "";
                object.messageType = "";
                object.messageIssued = "";
                object.fromEntityId = "";
                object.samlStatus = "";
                object.relayState = "";
                object.samlContent = "";
                object.isSigned = false;
                object.isOK = false;
            }
            if (message.serverTime != null && Object.hasOwnProperty.call(message, "serverTime"))
                object.serverTime = message.serverTime;
            if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                object.direction = message.direction;
            if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                object.messageType = message.messageType;
            if (message.messageIssued != null && Object.hasOwnProperty.call(message, "messageIssued"))
                object.messageIssued = message.messageIssued;
            if (message.fromEntityId != null && Object.hasOwnProperty.call(message, "fromEntityId"))
                object.fromEntityId = message.fromEntityId;
            if (message.samlStatus != null && Object.hasOwnProperty.call(message, "samlStatus"))
                object.samlStatus = message.samlStatus;
            if (message.relayState != null && Object.hasOwnProperty.call(message, "relayState"))
                object.relayState = message.relayState;
            if (message.samlContent != null && Object.hasOwnProperty.call(message, "samlContent"))
                object.samlContent = message.samlContent;
            if (message.isSigned != null && Object.hasOwnProperty.call(message, "isSigned"))
                object.isSigned = message.isSigned;
            if (message.isOK != null && Object.hasOwnProperty.call(message, "isOK"))
                object.isOK = message.isOK;
            return object;
        };

        /**
         * Converts this SsoCloudSAMLLogEntry to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudSAMLLogEntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudSAMLLogEntry
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudSAMLLogEntry
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudSAMLLogEntry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudSAMLLogEntry";
        };

        return SsoCloudSAMLLogEntry;
    })();

    SsoCloud.SsoCloudSAMLLogResponse = (function() {

        /**
         * Properties of a SsoCloudSAMLLogResponse.
         * @memberof SsoCloud
         * @interface ISsoCloudSAMLLogResponse
         * @property {number|null} [ssoServiceProviderId] SsoCloudSAMLLogResponse ssoServiceProviderId
         * @property {Array.<SsoCloud.ISsoCloudSAMLLogEntry>|null} [entry] SsoCloudSAMLLogResponse entry
         */

        /**
         * Constructs a new SsoCloudSAMLLogResponse.
         * @memberof SsoCloud
         * @classdesc This represents an array of SAML responses from the log.
         * @implements ISsoCloudSAMLLogResponse
         * @constructor
         * @param {SsoCloud.ISsoCloudSAMLLogResponse=} [properties] Properties to set
         */
        function SsoCloudSAMLLogResponse(properties) {
            this.entry = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudSAMLLogResponse ssoServiceProviderId.
         * @member {number} ssoServiceProviderId
         * @memberof SsoCloud.SsoCloudSAMLLogResponse
         * @instance
         */
        SsoCloudSAMLLogResponse.prototype.ssoServiceProviderId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudSAMLLogResponse entry.
         * @member {Array.<SsoCloud.ISsoCloudSAMLLogEntry>} entry
         * @memberof SsoCloud.SsoCloudSAMLLogResponse
         * @instance
         */
        SsoCloudSAMLLogResponse.prototype.entry = $util.emptyArray;

        /**
         * Creates a new SsoCloudSAMLLogResponse instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudSAMLLogResponse
         * @static
         * @param {SsoCloud.ISsoCloudSAMLLogResponse=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudSAMLLogResponse} SsoCloudSAMLLogResponse instance
         */
        SsoCloudSAMLLogResponse.create = function create(properties) {
            return new SsoCloudSAMLLogResponse(properties);
        };

        /**
         * Encodes the specified SsoCloudSAMLLogResponse message. Does not implicitly {@link SsoCloud.SsoCloudSAMLLogResponse.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudSAMLLogResponse
         * @static
         * @param {SsoCloud.ISsoCloudSAMLLogResponse} message SsoCloudSAMLLogResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudSAMLLogResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoServiceProviderId);
            if (message.entry != null && message.entry.length)
                for (let i = 0; i < message.entry.length; ++i)
                    $root.SsoCloud.SsoCloudSAMLLogEntry.encode(message.entry[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SsoCloudSAMLLogResponse message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudSAMLLogResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudSAMLLogResponse} SsoCloudSAMLLogResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudSAMLLogResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudSAMLLogResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoServiceProviderId = reader.uint64();
                        break;
                    }
                case 2: {
                        if (!(message.entry && message.entry.length))
                            message.entry = [];
                        message.entry.push($root.SsoCloud.SsoCloudSAMLLogEntry.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a SsoCloudSAMLLogResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudSAMLLogResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudSAMLLogResponse} SsoCloudSAMLLogResponse
         */
        SsoCloudSAMLLogResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudSAMLLogResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudSAMLLogResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudSAMLLogResponse();
            if (object.ssoServiceProviderId != null)
                if ($util.Long)
                    message.ssoServiceProviderId = $util.Long.fromValue(object.ssoServiceProviderId, true);
                else if (typeof object.ssoServiceProviderId === "string")
                    message.ssoServiceProviderId = parseInt(object.ssoServiceProviderId, 10);
                else if (typeof object.ssoServiceProviderId === "number")
                    message.ssoServiceProviderId = object.ssoServiceProviderId;
                else if (typeof object.ssoServiceProviderId === "object")
                    message.ssoServiceProviderId = new $util.LongBits(object.ssoServiceProviderId.low >>> 0, object.ssoServiceProviderId.high >>> 0).toNumber(true);
            if (object.entry) {
                if (!Array.isArray(object.entry))
                    throw TypeError(".SsoCloud.SsoCloudSAMLLogResponse.entry: array expected");
                message.entry = [];
                for (let i = 0; i < object.entry.length; ++i) {
                    if (!$util.isObject(object.entry[i]))
                        throw TypeError(".SsoCloud.SsoCloudSAMLLogResponse.entry: object expected");
                    message.entry[i] = $root.SsoCloud.SsoCloudSAMLLogEntry.fromObject(object.entry[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudSAMLLogResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudSAMLLogResponse
         * @static
         * @param {SsoCloud.SsoCloudSAMLLogResponse} message SsoCloudSAMLLogResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudSAMLLogResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.entry = [];
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoServiceProviderId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoServiceProviderId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoServiceProviderId = typeof message.ssoServiceProviderId === "number" ? BigInt(message.ssoServiceProviderId) : $util.Long.fromBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoServiceProviderId === "number")
                    object.ssoServiceProviderId = options.longs === String ? String(message.ssoServiceProviderId) : message.ssoServiceProviderId;
                else
                    object.ssoServiceProviderId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoServiceProviderId) : options.longs === Number ? new $util.LongBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0).toNumber(true) : message.ssoServiceProviderId;
            if (message.entry && message.entry.length) {
                object.entry = [];
                for (let j = 0; j < message.entry.length; ++j)
                    object.entry[j] = $root.SsoCloud.SsoCloudSAMLLogEntry.toObject(message.entry[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this SsoCloudSAMLLogResponse to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudSAMLLogResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudSAMLLogResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudSAMLLogResponse
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudSAMLLogResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudSAMLLogResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudSAMLLogResponse";
        };

        return SsoCloudSAMLLogResponse;
    })();

    SsoCloud.SsoCloudServiceProviderUpdateRequest = (function() {

        /**
         * Properties of a SsoCloudServiceProviderUpdateRequest.
         * @memberof SsoCloud
         * @interface ISsoCloudServiceProviderUpdateRequest
         * @property {number|null} [ssoServiceProviderId] SsoCloudServiceProviderUpdateRequest ssoServiceProviderId
         * @property {number|null} [ssoSpConfigurationId] SsoCloudServiceProviderUpdateRequest ssoSpConfigurationId
         */

        /**
         * Constructs a new SsoCloudServiceProviderUpdateRequest.
         * @memberof SsoCloud
         * @classdesc This is a request to set the SSO Configuration for an SSO Service Provider, by ID.
         * The response is an instance of SsoCloudConfigurationRequest.
         * @implements ISsoCloudServiceProviderUpdateRequest
         * @constructor
         * @param {SsoCloud.ISsoCloudServiceProviderUpdateRequest=} [properties] Properties to set
         */
        function SsoCloudServiceProviderUpdateRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudServiceProviderUpdateRequest ssoServiceProviderId.
         * @member {number} ssoServiceProviderId
         * @memberof SsoCloud.SsoCloudServiceProviderUpdateRequest
         * @instance
         */
        SsoCloudServiceProviderUpdateRequest.prototype.ssoServiceProviderId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudServiceProviderUpdateRequest ssoSpConfigurationId.
         * @member {number} ssoSpConfigurationId
         * @memberof SsoCloud.SsoCloudServiceProviderUpdateRequest
         * @instance
         */
        SsoCloudServiceProviderUpdateRequest.prototype.ssoSpConfigurationId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new SsoCloudServiceProviderUpdateRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudServiceProviderUpdateRequest
         * @static
         * @param {SsoCloud.ISsoCloudServiceProviderUpdateRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudServiceProviderUpdateRequest} SsoCloudServiceProviderUpdateRequest instance
         */
        SsoCloudServiceProviderUpdateRequest.create = function create(properties) {
            return new SsoCloudServiceProviderUpdateRequest(properties);
        };

        /**
         * Encodes the specified SsoCloudServiceProviderUpdateRequest message. Does not implicitly {@link SsoCloud.SsoCloudServiceProviderUpdateRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudServiceProviderUpdateRequest
         * @static
         * @param {SsoCloud.ISsoCloudServiceProviderUpdateRequest} message SsoCloudServiceProviderUpdateRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudServiceProviderUpdateRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoServiceProviderId);
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ssoSpConfigurationId);
            return writer;
        };

        /**
         * Decodes a SsoCloudServiceProviderUpdateRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudServiceProviderUpdateRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudServiceProviderUpdateRequest} SsoCloudServiceProviderUpdateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudServiceProviderUpdateRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudServiceProviderUpdateRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoServiceProviderId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.ssoSpConfigurationId = reader.uint64();
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
         * Creates a SsoCloudServiceProviderUpdateRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudServiceProviderUpdateRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudServiceProviderUpdateRequest} SsoCloudServiceProviderUpdateRequest
         */
        SsoCloudServiceProviderUpdateRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudServiceProviderUpdateRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudServiceProviderUpdateRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudServiceProviderUpdateRequest();
            if (object.ssoServiceProviderId != null)
                if ($util.Long)
                    message.ssoServiceProviderId = $util.Long.fromValue(object.ssoServiceProviderId, true);
                else if (typeof object.ssoServiceProviderId === "string")
                    message.ssoServiceProviderId = parseInt(object.ssoServiceProviderId, 10);
                else if (typeof object.ssoServiceProviderId === "number")
                    message.ssoServiceProviderId = object.ssoServiceProviderId;
                else if (typeof object.ssoServiceProviderId === "object")
                    message.ssoServiceProviderId = new $util.LongBits(object.ssoServiceProviderId.low >>> 0, object.ssoServiceProviderId.high >>> 0).toNumber(true);
            if (object.ssoSpConfigurationId != null)
                if ($util.Long)
                    message.ssoSpConfigurationId = $util.Long.fromValue(object.ssoSpConfigurationId, true);
                else if (typeof object.ssoSpConfigurationId === "string")
                    message.ssoSpConfigurationId = parseInt(object.ssoSpConfigurationId, 10);
                else if (typeof object.ssoSpConfigurationId === "number")
                    message.ssoSpConfigurationId = object.ssoSpConfigurationId;
                else if (typeof object.ssoSpConfigurationId === "object")
                    message.ssoSpConfigurationId = new $util.LongBits(object.ssoSpConfigurationId.low >>> 0, object.ssoSpConfigurationId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudServiceProviderUpdateRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudServiceProviderUpdateRequest
         * @static
         * @param {SsoCloud.SsoCloudServiceProviderUpdateRequest} message SsoCloudServiceProviderUpdateRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudServiceProviderUpdateRequest.toObject = function toObject(message, options, q) {
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
                    object.ssoServiceProviderId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoServiceProviderId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoSpConfigurationId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoSpConfigurationId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoServiceProviderId = typeof message.ssoServiceProviderId === "number" ? BigInt(message.ssoServiceProviderId) : $util.Long.fromBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoServiceProviderId === "number")
                    object.ssoServiceProviderId = options.longs === String ? String(message.ssoServiceProviderId) : message.ssoServiceProviderId;
                else
                    object.ssoServiceProviderId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoServiceProviderId) : options.longs === Number ? new $util.LongBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0).toNumber(true) : message.ssoServiceProviderId;
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoSpConfigurationId = typeof message.ssoSpConfigurationId === "number" ? BigInt(message.ssoSpConfigurationId) : $util.Long.fromBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoSpConfigurationId === "number")
                    object.ssoSpConfigurationId = options.longs === String ? String(message.ssoSpConfigurationId) : message.ssoSpConfigurationId;
                else
                    object.ssoSpConfigurationId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoSpConfigurationId) : options.longs === Number ? new $util.LongBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0).toNumber(true) : message.ssoSpConfigurationId;
            return object;
        };

        /**
         * Converts this SsoCloudServiceProviderUpdateRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudServiceProviderUpdateRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudServiceProviderUpdateRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudServiceProviderUpdateRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudServiceProviderUpdateRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudServiceProviderUpdateRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudServiceProviderUpdateRequest";
        };

        return SsoCloudServiceProviderUpdateRequest;
    })();

    SsoCloud.SsoCloudIdpMetadataRequest = (function() {

        /**
         * Properties of a SsoCloudIdpMetadataRequest.
         * @memberof SsoCloud
         * @interface ISsoCloudIdpMetadataRequest
         * @property {number|null} [ssoSpConfigurationId] SsoCloudIdpMetadataRequest ssoSpConfigurationId
         * @property {string|null} [filename] SsoCloudIdpMetadataRequest filename
         * @property {Uint8Array|null} [content] SsoCloudIdpMetadataRequest content
         */

        /**
         * Constructs a new SsoCloudIdpMetadataRequest.
         * @memberof SsoCloud
         * @classdesc This request is to upload the IdP metadata file as its UTF-8 byte content.
         * The response is an SsoCloudConfigurationValidationResponse.
         * @implements ISsoCloudIdpMetadataRequest
         * @constructor
         * @param {SsoCloud.ISsoCloudIdpMetadataRequest=} [properties] Properties to set
         */
        function SsoCloudIdpMetadataRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudIdpMetadataRequest ssoSpConfigurationId.
         * @member {number} ssoSpConfigurationId
         * @memberof SsoCloud.SsoCloudIdpMetadataRequest
         * @instance
         */
        SsoCloudIdpMetadataRequest.prototype.ssoSpConfigurationId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudIdpMetadataRequest filename.
         * @member {string} filename
         * @memberof SsoCloud.SsoCloudIdpMetadataRequest
         * @instance
         */
        SsoCloudIdpMetadataRequest.prototype.filename = "";

        /**
         * SsoCloudIdpMetadataRequest content.
         * @member {Uint8Array} content
         * @memberof SsoCloud.SsoCloudIdpMetadataRequest
         * @instance
         */
        SsoCloudIdpMetadataRequest.prototype.content = $util.newBuffer([]);

        /**
         * Creates a new SsoCloudIdpMetadataRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudIdpMetadataRequest
         * @static
         * @param {SsoCloud.ISsoCloudIdpMetadataRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudIdpMetadataRequest} SsoCloudIdpMetadataRequest instance
         */
        SsoCloudIdpMetadataRequest.create = function create(properties) {
            return new SsoCloudIdpMetadataRequest(properties);
        };

        /**
         * Encodes the specified SsoCloudIdpMetadataRequest message. Does not implicitly {@link SsoCloud.SsoCloudIdpMetadataRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudIdpMetadataRequest
         * @static
         * @param {SsoCloud.ISsoCloudIdpMetadataRequest} message SsoCloudIdpMetadataRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudIdpMetadataRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoSpConfigurationId);
            if (message.filename != null && Object.hasOwnProperty.call(message, "filename"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.filename);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.content);
            return writer;
        };

        /**
         * Decodes a SsoCloudIdpMetadataRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudIdpMetadataRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudIdpMetadataRequest} SsoCloudIdpMetadataRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudIdpMetadataRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudIdpMetadataRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoSpConfigurationId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.filename = reader.string();
                        break;
                    }
                case 3: {
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
         * Creates a SsoCloudIdpMetadataRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudIdpMetadataRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudIdpMetadataRequest} SsoCloudIdpMetadataRequest
         */
        SsoCloudIdpMetadataRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudIdpMetadataRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudIdpMetadataRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudIdpMetadataRequest();
            if (object.ssoSpConfigurationId != null)
                if ($util.Long)
                    message.ssoSpConfigurationId = $util.Long.fromValue(object.ssoSpConfigurationId, true);
                else if (typeof object.ssoSpConfigurationId === "string")
                    message.ssoSpConfigurationId = parseInt(object.ssoSpConfigurationId, 10);
                else if (typeof object.ssoSpConfigurationId === "number")
                    message.ssoSpConfigurationId = object.ssoSpConfigurationId;
                else if (typeof object.ssoSpConfigurationId === "object")
                    message.ssoSpConfigurationId = new $util.LongBits(object.ssoSpConfigurationId.low >>> 0, object.ssoSpConfigurationId.high >>> 0).toNumber(true);
            if (object.filename != null)
                message.filename = String(object.filename);
            if (object.content != null)
                if (typeof object.content === "string")
                    $util.base64.decode(object.content, message.content = $util.newBuffer($util.base64.length(object.content)), 0);
                else if (object.content.length >= 0)
                    message.content = object.content;
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudIdpMetadataRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudIdpMetadataRequest
         * @static
         * @param {SsoCloud.SsoCloudIdpMetadataRequest} message SsoCloudIdpMetadataRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudIdpMetadataRequest.toObject = function toObject(message, options, q) {
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
                    object.ssoSpConfigurationId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoSpConfigurationId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.filename = "";
                if (options.bytes === String)
                    object.content = "";
                else {
                    object.content = [];
                    if (options.bytes !== Array)
                        object.content = $util.newBuffer(object.content);
                }
            }
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoSpConfigurationId = typeof message.ssoSpConfigurationId === "number" ? BigInt(message.ssoSpConfigurationId) : $util.Long.fromBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoSpConfigurationId === "number")
                    object.ssoSpConfigurationId = options.longs === String ? String(message.ssoSpConfigurationId) : message.ssoSpConfigurationId;
                else
                    object.ssoSpConfigurationId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoSpConfigurationId) : options.longs === Number ? new $util.LongBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0).toNumber(true) : message.ssoSpConfigurationId;
            if (message.filename != null && Object.hasOwnProperty.call(message, "filename"))
                object.filename = message.filename;
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                object.content = options.bytes === String ? $util.base64.encode(message.content, 0, message.content.length) : options.bytes === Array ? Array.prototype.slice.call(message.content) : message.content;
            return object;
        };

        /**
         * Converts this SsoCloudIdpMetadataRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudIdpMetadataRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudIdpMetadataRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudIdpMetadataRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudIdpMetadataRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudIdpMetadataRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudIdpMetadataRequest";
        };

        return SsoCloudIdpMetadataRequest;
    })();

    SsoCloud.SsoCloudIdpMetadataSupportRequest = (function() {

        /**
         * Properties of a SsoCloudIdpMetadataSupportRequest.
         * @memberof SsoCloud
         * @interface ISsoCloudIdpMetadataSupportRequest
         * @property {number|null} [ssoServiceProviderId] SsoCloudIdpMetadataSupportRequest ssoServiceProviderId
         * @property {number|null} [ssoSpConfigurationId] SsoCloudIdpMetadataSupportRequest ssoSpConfigurationId
         * @property {number|null} [ssoEnterpriseId] SsoCloudIdpMetadataSupportRequest ssoEnterpriseId
         * @property {string|null} [filename] SsoCloudIdpMetadataSupportRequest filename
         * @property {Uint8Array|null} [content] SsoCloudIdpMetadataSupportRequest content
         */

        /**
         * Constructs a new SsoCloudIdpMetadataSupportRequest.
         * @memberof SsoCloud
         * @classdesc This request is by the API Test Tool to upload the IdP metadata file as its UTF-8 byte content.
         * The response is an SsoCloudConfigurationValidationResponse.
         * @implements ISsoCloudIdpMetadataSupportRequest
         * @constructor
         * @param {SsoCloud.ISsoCloudIdpMetadataSupportRequest=} [properties] Properties to set
         */
        function SsoCloudIdpMetadataSupportRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudIdpMetadataSupportRequest ssoServiceProviderId.
         * @member {number} ssoServiceProviderId
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @instance
         */
        SsoCloudIdpMetadataSupportRequest.prototype.ssoServiceProviderId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudIdpMetadataSupportRequest ssoSpConfigurationId.
         * @member {number} ssoSpConfigurationId
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @instance
         */
        SsoCloudIdpMetadataSupportRequest.prototype.ssoSpConfigurationId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudIdpMetadataSupportRequest ssoEnterpriseId.
         * @member {number} ssoEnterpriseId
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @instance
         */
        SsoCloudIdpMetadataSupportRequest.prototype.ssoEnterpriseId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudIdpMetadataSupportRequest filename.
         * @member {string} filename
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @instance
         */
        SsoCloudIdpMetadataSupportRequest.prototype.filename = "";

        /**
         * SsoCloudIdpMetadataSupportRequest content.
         * @member {Uint8Array} content
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @instance
         */
        SsoCloudIdpMetadataSupportRequest.prototype.content = $util.newBuffer([]);

        /**
         * Creates a new SsoCloudIdpMetadataSupportRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @static
         * @param {SsoCloud.ISsoCloudIdpMetadataSupportRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudIdpMetadataSupportRequest} SsoCloudIdpMetadataSupportRequest instance
         */
        SsoCloudIdpMetadataSupportRequest.create = function create(properties) {
            return new SsoCloudIdpMetadataSupportRequest(properties);
        };

        /**
         * Encodes the specified SsoCloudIdpMetadataSupportRequest message. Does not implicitly {@link SsoCloud.SsoCloudIdpMetadataSupportRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @static
         * @param {SsoCloud.ISsoCloudIdpMetadataSupportRequest} message SsoCloudIdpMetadataSupportRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudIdpMetadataSupportRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoServiceProviderId);
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.ssoSpConfigurationId);
            if (message.ssoEnterpriseId != null && Object.hasOwnProperty.call(message, "ssoEnterpriseId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.ssoEnterpriseId);
            if (message.filename != null && Object.hasOwnProperty.call(message, "filename"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.filename);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.content);
            return writer;
        };

        /**
         * Decodes a SsoCloudIdpMetadataSupportRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudIdpMetadataSupportRequest} SsoCloudIdpMetadataSupportRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudIdpMetadataSupportRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudIdpMetadataSupportRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoServiceProviderId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.ssoSpConfigurationId = reader.uint64();
                        break;
                    }
                case 3: {
                        message.ssoEnterpriseId = reader.uint64();
                        break;
                    }
                case 4: {
                        message.filename = reader.string();
                        break;
                    }
                case 5: {
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
         * Creates a SsoCloudIdpMetadataSupportRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudIdpMetadataSupportRequest} SsoCloudIdpMetadataSupportRequest
         */
        SsoCloudIdpMetadataSupportRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudIdpMetadataSupportRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudIdpMetadataSupportRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudIdpMetadataSupportRequest();
            if (object.ssoServiceProviderId != null)
                if ($util.Long)
                    message.ssoServiceProviderId = $util.Long.fromValue(object.ssoServiceProviderId, true);
                else if (typeof object.ssoServiceProviderId === "string")
                    message.ssoServiceProviderId = parseInt(object.ssoServiceProviderId, 10);
                else if (typeof object.ssoServiceProviderId === "number")
                    message.ssoServiceProviderId = object.ssoServiceProviderId;
                else if (typeof object.ssoServiceProviderId === "object")
                    message.ssoServiceProviderId = new $util.LongBits(object.ssoServiceProviderId.low >>> 0, object.ssoServiceProviderId.high >>> 0).toNumber(true);
            if (object.ssoSpConfigurationId != null)
                if ($util.Long)
                    message.ssoSpConfigurationId = $util.Long.fromValue(object.ssoSpConfigurationId, true);
                else if (typeof object.ssoSpConfigurationId === "string")
                    message.ssoSpConfigurationId = parseInt(object.ssoSpConfigurationId, 10);
                else if (typeof object.ssoSpConfigurationId === "number")
                    message.ssoSpConfigurationId = object.ssoSpConfigurationId;
                else if (typeof object.ssoSpConfigurationId === "object")
                    message.ssoSpConfigurationId = new $util.LongBits(object.ssoSpConfigurationId.low >>> 0, object.ssoSpConfigurationId.high >>> 0).toNumber(true);
            if (object.ssoEnterpriseId != null)
                if ($util.Long)
                    message.ssoEnterpriseId = $util.Long.fromValue(object.ssoEnterpriseId, true);
                else if (typeof object.ssoEnterpriseId === "string")
                    message.ssoEnterpriseId = parseInt(object.ssoEnterpriseId, 10);
                else if (typeof object.ssoEnterpriseId === "number")
                    message.ssoEnterpriseId = object.ssoEnterpriseId;
                else if (typeof object.ssoEnterpriseId === "object")
                    message.ssoEnterpriseId = new $util.LongBits(object.ssoEnterpriseId.low >>> 0, object.ssoEnterpriseId.high >>> 0).toNumber(true);
            if (object.filename != null)
                message.filename = String(object.filename);
            if (object.content != null)
                if (typeof object.content === "string")
                    $util.base64.decode(object.content, message.content = $util.newBuffer($util.base64.length(object.content)), 0);
                else if (object.content.length >= 0)
                    message.content = object.content;
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudIdpMetadataSupportRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @static
         * @param {SsoCloud.SsoCloudIdpMetadataSupportRequest} message SsoCloudIdpMetadataSupportRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudIdpMetadataSupportRequest.toObject = function toObject(message, options, q) {
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
                    object.ssoServiceProviderId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoServiceProviderId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoSpConfigurationId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoSpConfigurationId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoEnterpriseId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoEnterpriseId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.filename = "";
                if (options.bytes === String)
                    object.content = "";
                else {
                    object.content = [];
                    if (options.bytes !== Array)
                        object.content = $util.newBuffer(object.content);
                }
            }
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoServiceProviderId = typeof message.ssoServiceProviderId === "number" ? BigInt(message.ssoServiceProviderId) : $util.Long.fromBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoServiceProviderId === "number")
                    object.ssoServiceProviderId = options.longs === String ? String(message.ssoServiceProviderId) : message.ssoServiceProviderId;
                else
                    object.ssoServiceProviderId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoServiceProviderId) : options.longs === Number ? new $util.LongBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0).toNumber(true) : message.ssoServiceProviderId;
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoSpConfigurationId = typeof message.ssoSpConfigurationId === "number" ? BigInt(message.ssoSpConfigurationId) : $util.Long.fromBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoSpConfigurationId === "number")
                    object.ssoSpConfigurationId = options.longs === String ? String(message.ssoSpConfigurationId) : message.ssoSpConfigurationId;
                else
                    object.ssoSpConfigurationId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoSpConfigurationId) : options.longs === Number ? new $util.LongBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0).toNumber(true) : message.ssoSpConfigurationId;
            if (message.ssoEnterpriseId != null && Object.hasOwnProperty.call(message, "ssoEnterpriseId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoEnterpriseId = typeof message.ssoEnterpriseId === "number" ? BigInt(message.ssoEnterpriseId) : $util.Long.fromBits(message.ssoEnterpriseId.low >>> 0, message.ssoEnterpriseId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoEnterpriseId === "number")
                    object.ssoEnterpriseId = options.longs === String ? String(message.ssoEnterpriseId) : message.ssoEnterpriseId;
                else
                    object.ssoEnterpriseId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoEnterpriseId) : options.longs === Number ? new $util.LongBits(message.ssoEnterpriseId.low >>> 0, message.ssoEnterpriseId.high >>> 0).toNumber(true) : message.ssoEnterpriseId;
            if (message.filename != null && Object.hasOwnProperty.call(message, "filename"))
                object.filename = message.filename;
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                object.content = options.bytes === String ? $util.base64.encode(message.content, 0, message.content.length) : options.bytes === Array ? Array.prototype.slice.call(message.content) : message.content;
            return object;
        };

        /**
         * Converts this SsoCloudIdpMetadataSupportRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudIdpMetadataSupportRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudIdpMetadataSupportRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudIdpMetadataSupportRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudIdpMetadataSupportRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudIdpMetadataSupportRequest";
        };

        return SsoCloudIdpMetadataSupportRequest;
    })();

    SsoCloud.SsoCloudConfigurationValidationRequest = (function() {

        /**
         * Properties of a SsoCloudConfigurationValidationRequest.
         * @memberof SsoCloud
         * @interface ISsoCloudConfigurationValidationRequest
         * @property {Array.<number>|null} [ssoSpConfigurationId] SsoCloudConfigurationValidationRequest ssoSpConfigurationId
         */

        /**
         * Constructs a new SsoCloudConfigurationValidationRequest.
         * @memberof SsoCloud
         * @classdesc Request validation of one or more SsoCloudConfigurations.
         * The response is SsoCloudConfigurationValidationResponse.
         * @implements ISsoCloudConfigurationValidationRequest
         * @constructor
         * @param {SsoCloud.ISsoCloudConfigurationValidationRequest=} [properties] Properties to set
         */
        function SsoCloudConfigurationValidationRequest(properties) {
            this.ssoSpConfigurationId = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudConfigurationValidationRequest ssoSpConfigurationId.
         * @member {Array.<number>} ssoSpConfigurationId
         * @memberof SsoCloud.SsoCloudConfigurationValidationRequest
         * @instance
         */
        SsoCloudConfigurationValidationRequest.prototype.ssoSpConfigurationId = $util.emptyArray;

        /**
         * Creates a new SsoCloudConfigurationValidationRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudConfigurationValidationRequest
         * @static
         * @param {SsoCloud.ISsoCloudConfigurationValidationRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudConfigurationValidationRequest} SsoCloudConfigurationValidationRequest instance
         */
        SsoCloudConfigurationValidationRequest.create = function create(properties) {
            return new SsoCloudConfigurationValidationRequest(properties);
        };

        /**
         * Encodes the specified SsoCloudConfigurationValidationRequest message. Does not implicitly {@link SsoCloud.SsoCloudConfigurationValidationRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudConfigurationValidationRequest
         * @static
         * @param {SsoCloud.ISsoCloudConfigurationValidationRequest} message SsoCloudConfigurationValidationRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudConfigurationValidationRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoSpConfigurationId != null && message.ssoSpConfigurationId.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (let i = 0; i < message.ssoSpConfigurationId.length; ++i)
                    writer.uint64(message.ssoSpConfigurationId[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Decodes a SsoCloudConfigurationValidationRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudConfigurationValidationRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudConfigurationValidationRequest} SsoCloudConfigurationValidationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudConfigurationValidationRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudConfigurationValidationRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.ssoSpConfigurationId && message.ssoSpConfigurationId.length))
                            message.ssoSpConfigurationId = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.ssoSpConfigurationId.push(reader.uint64());
                        } else
                            message.ssoSpConfigurationId.push(reader.uint64());
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
         * Creates a SsoCloudConfigurationValidationRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudConfigurationValidationRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudConfigurationValidationRequest} SsoCloudConfigurationValidationRequest
         */
        SsoCloudConfigurationValidationRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudConfigurationValidationRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudConfigurationValidationRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudConfigurationValidationRequest();
            if (object.ssoSpConfigurationId) {
                if (!Array.isArray(object.ssoSpConfigurationId))
                    throw TypeError(".SsoCloud.SsoCloudConfigurationValidationRequest.ssoSpConfigurationId: array expected");
                message.ssoSpConfigurationId = [];
                for (let i = 0; i < object.ssoSpConfigurationId.length; ++i)
                    if ($util.Long)
                        message.ssoSpConfigurationId[i] = $util.Long.fromValue(object.ssoSpConfigurationId[i], true);
                    else if (typeof object.ssoSpConfigurationId[i] === "string")
                        message.ssoSpConfigurationId[i] = parseInt(object.ssoSpConfigurationId[i], 10);
                    else if (typeof object.ssoSpConfigurationId[i] === "number")
                        message.ssoSpConfigurationId[i] = object.ssoSpConfigurationId[i];
                    else if (typeof object.ssoSpConfigurationId[i] === "object")
                        message.ssoSpConfigurationId[i] = new $util.LongBits(object.ssoSpConfigurationId[i].low >>> 0, object.ssoSpConfigurationId[i].high >>> 0).toNumber(true);
            }
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudConfigurationValidationRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudConfigurationValidationRequest
         * @static
         * @param {SsoCloud.SsoCloudConfigurationValidationRequest} message SsoCloudConfigurationValidationRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudConfigurationValidationRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.ssoSpConfigurationId = [];
            if (message.ssoSpConfigurationId && message.ssoSpConfigurationId.length) {
                object.ssoSpConfigurationId = [];
                for (let j = 0; j < message.ssoSpConfigurationId.length; ++j)
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.ssoSpConfigurationId[j] = typeof message.ssoSpConfigurationId[j] === "number" ? BigInt(message.ssoSpConfigurationId[j]) : $util.Long.fromBits(message.ssoSpConfigurationId[j].low >>> 0, message.ssoSpConfigurationId[j].high >>> 0, true).toBigInt();
                    else if (typeof message.ssoSpConfigurationId[j] === "number")
                        object.ssoSpConfigurationId[j] = options.longs === String ? String(message.ssoSpConfigurationId[j]) : message.ssoSpConfigurationId[j];
                    else
                        object.ssoSpConfigurationId[j] = options.longs === String ? $util.Long.prototype.toString.call(message.ssoSpConfigurationId[j]) : options.longs === Number ? new $util.LongBits(message.ssoSpConfigurationId[j].low >>> 0, message.ssoSpConfigurationId[j].high >>> 0).toNumber(true) : message.ssoSpConfigurationId[j];
            }
            return object;
        };

        /**
         * Converts this SsoCloudConfigurationValidationRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudConfigurationValidationRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudConfigurationValidationRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudConfigurationValidationRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudConfigurationValidationRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudConfigurationValidationRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudConfigurationValidationRequest";
        };

        return SsoCloudConfigurationValidationRequest;
    })();

    SsoCloud.ValidationContent = (function() {

        /**
         * Properties of a ValidationContent.
         * @memberof SsoCloud
         * @interface IValidationContent
         * @property {number|null} [ssoSpConfigurationId] ValidationContent ssoSpConfigurationId
         * @property {boolean|null} [isSuccessful] ValidationContent isSuccessful
         * @property {Array.<string>|null} [errorMessage] ValidationContent errorMessage
         */

        /**
         * Constructs a new ValidationContent.
         * @memberof SsoCloud
         * @classdesc This is part of SsoCloudConfigurationValidationResponse.
         * @implements IValidationContent
         * @constructor
         * @param {SsoCloud.IValidationContent=} [properties] Properties to set
         */
        function ValidationContent(properties) {
            this.errorMessage = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValidationContent ssoSpConfigurationId.
         * @member {number} ssoSpConfigurationId
         * @memberof SsoCloud.ValidationContent
         * @instance
         */
        ValidationContent.prototype.ssoSpConfigurationId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ValidationContent isSuccessful.
         * @member {boolean} isSuccessful
         * @memberof SsoCloud.ValidationContent
         * @instance
         */
        ValidationContent.prototype.isSuccessful = false;

        /**
         * ValidationContent errorMessage.
         * @member {Array.<string>} errorMessage
         * @memberof SsoCloud.ValidationContent
         * @instance
         */
        ValidationContent.prototype.errorMessage = $util.emptyArray;

        /**
         * Creates a new ValidationContent instance using the specified properties.
         * @function create
         * @memberof SsoCloud.ValidationContent
         * @static
         * @param {SsoCloud.IValidationContent=} [properties] Properties to set
         * @returns {SsoCloud.ValidationContent} ValidationContent instance
         */
        ValidationContent.create = function create(properties) {
            return new ValidationContent(properties);
        };

        /**
         * Encodes the specified ValidationContent message. Does not implicitly {@link SsoCloud.ValidationContent.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.ValidationContent
         * @static
         * @param {SsoCloud.IValidationContent} message ValidationContent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValidationContent.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoSpConfigurationId);
            if (message.isSuccessful != null && Object.hasOwnProperty.call(message, "isSuccessful"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isSuccessful);
            if (message.errorMessage != null && message.errorMessage.length)
                for (let i = 0; i < message.errorMessage.length; ++i)
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.errorMessage[i]);
            return writer;
        };

        /**
         * Decodes a ValidationContent message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.ValidationContent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.ValidationContent} ValidationContent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValidationContent.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.ValidationContent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoSpConfigurationId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.isSuccessful = reader.bool();
                        break;
                    }
                case 3: {
                        if (!(message.errorMessage && message.errorMessage.length))
                            message.errorMessage = [];
                        message.errorMessage.push(reader.string());
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
         * Creates a ValidationContent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.ValidationContent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.ValidationContent} ValidationContent
         */
        ValidationContent.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.ValidationContent)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.ValidationContent: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.ValidationContent();
            if (object.ssoSpConfigurationId != null)
                if ($util.Long)
                    message.ssoSpConfigurationId = $util.Long.fromValue(object.ssoSpConfigurationId, true);
                else if (typeof object.ssoSpConfigurationId === "string")
                    message.ssoSpConfigurationId = parseInt(object.ssoSpConfigurationId, 10);
                else if (typeof object.ssoSpConfigurationId === "number")
                    message.ssoSpConfigurationId = object.ssoSpConfigurationId;
                else if (typeof object.ssoSpConfigurationId === "object")
                    message.ssoSpConfigurationId = new $util.LongBits(object.ssoSpConfigurationId.low >>> 0, object.ssoSpConfigurationId.high >>> 0).toNumber(true);
            if (object.isSuccessful != null)
                message.isSuccessful = Boolean(object.isSuccessful);
            if (object.errorMessage) {
                if (!Array.isArray(object.errorMessage))
                    throw TypeError(".SsoCloud.ValidationContent.errorMessage: array expected");
                message.errorMessage = [];
                for (let i = 0; i < object.errorMessage.length; ++i)
                    message.errorMessage[i] = String(object.errorMessage[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a ValidationContent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.ValidationContent
         * @static
         * @param {SsoCloud.ValidationContent} message ValidationContent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValidationContent.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.errorMessage = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoSpConfigurationId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoSpConfigurationId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.isSuccessful = false;
            }
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoSpConfigurationId = typeof message.ssoSpConfigurationId === "number" ? BigInt(message.ssoSpConfigurationId) : $util.Long.fromBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoSpConfigurationId === "number")
                    object.ssoSpConfigurationId = options.longs === String ? String(message.ssoSpConfigurationId) : message.ssoSpConfigurationId;
                else
                    object.ssoSpConfigurationId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoSpConfigurationId) : options.longs === Number ? new $util.LongBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0).toNumber(true) : message.ssoSpConfigurationId;
            if (message.isSuccessful != null && Object.hasOwnProperty.call(message, "isSuccessful"))
                object.isSuccessful = message.isSuccessful;
            if (message.errorMessage && message.errorMessage.length) {
                object.errorMessage = [];
                for (let j = 0; j < message.errorMessage.length; ++j)
                    object.errorMessage[j] = message.errorMessage[j];
            }
            return object;
        };

        /**
         * Converts this ValidationContent to JSON.
         * @function toJSON
         * @memberof SsoCloud.ValidationContent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValidationContent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValidationContent
         * @function getTypeUrl
         * @memberof SsoCloud.ValidationContent
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValidationContent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.ValidationContent";
        };

        return ValidationContent;
    })();

    SsoCloud.SsoCloudConfigurationValidationResponse = (function() {

        /**
         * Properties of a SsoCloudConfigurationValidationResponse.
         * @memberof SsoCloud
         * @interface ISsoCloudConfigurationValidationResponse
         * @property {Array.<SsoCloud.IValidationContent>|null} [validationContent] SsoCloudConfigurationValidationResponse validationContent
         */

        /**
         * Constructs a new SsoCloudConfigurationValidationResponse.
         * @memberof SsoCloud
         * @classdesc This response is sent for a configuration validation request and for a Metadata upload request.
         * @implements ISsoCloudConfigurationValidationResponse
         * @constructor
         * @param {SsoCloud.ISsoCloudConfigurationValidationResponse=} [properties] Properties to set
         */
        function SsoCloudConfigurationValidationResponse(properties) {
            this.validationContent = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudConfigurationValidationResponse validationContent.
         * @member {Array.<SsoCloud.IValidationContent>} validationContent
         * @memberof SsoCloud.SsoCloudConfigurationValidationResponse
         * @instance
         */
        SsoCloudConfigurationValidationResponse.prototype.validationContent = $util.emptyArray;

        /**
         * Creates a new SsoCloudConfigurationValidationResponse instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudConfigurationValidationResponse
         * @static
         * @param {SsoCloud.ISsoCloudConfigurationValidationResponse=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudConfigurationValidationResponse} SsoCloudConfigurationValidationResponse instance
         */
        SsoCloudConfigurationValidationResponse.create = function create(properties) {
            return new SsoCloudConfigurationValidationResponse(properties);
        };

        /**
         * Encodes the specified SsoCloudConfigurationValidationResponse message. Does not implicitly {@link SsoCloud.SsoCloudConfigurationValidationResponse.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudConfigurationValidationResponse
         * @static
         * @param {SsoCloud.ISsoCloudConfigurationValidationResponse} message SsoCloudConfigurationValidationResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudConfigurationValidationResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.validationContent != null && message.validationContent.length)
                for (let i = 0; i < message.validationContent.length; ++i)
                    $root.SsoCloud.ValidationContent.encode(message.validationContent[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SsoCloudConfigurationValidationResponse message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudConfigurationValidationResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudConfigurationValidationResponse} SsoCloudConfigurationValidationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudConfigurationValidationResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudConfigurationValidationResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.validationContent && message.validationContent.length))
                            message.validationContent = [];
                        message.validationContent.push($root.SsoCloud.ValidationContent.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a SsoCloudConfigurationValidationResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudConfigurationValidationResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudConfigurationValidationResponse} SsoCloudConfigurationValidationResponse
         */
        SsoCloudConfigurationValidationResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudConfigurationValidationResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudConfigurationValidationResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudConfigurationValidationResponse();
            if (object.validationContent) {
                if (!Array.isArray(object.validationContent))
                    throw TypeError(".SsoCloud.SsoCloudConfigurationValidationResponse.validationContent: array expected");
                message.validationContent = [];
                for (let i = 0; i < object.validationContent.length; ++i) {
                    if (!$util.isObject(object.validationContent[i]))
                        throw TypeError(".SsoCloud.SsoCloudConfigurationValidationResponse.validationContent: object expected");
                    message.validationContent[i] = $root.SsoCloud.ValidationContent.fromObject(object.validationContent[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudConfigurationValidationResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudConfigurationValidationResponse
         * @static
         * @param {SsoCloud.SsoCloudConfigurationValidationResponse} message SsoCloudConfigurationValidationResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudConfigurationValidationResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.validationContent = [];
            if (message.validationContent && message.validationContent.length) {
                object.validationContent = [];
                for (let j = 0; j < message.validationContent.length; ++j)
                    object.validationContent[j] = $root.SsoCloud.ValidationContent.toObject(message.validationContent[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this SsoCloudConfigurationValidationResponse to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudConfigurationValidationResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudConfigurationValidationResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudConfigurationValidationResponse
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudConfigurationValidationResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudConfigurationValidationResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudConfigurationValidationResponse";
        };

        return SsoCloudConfigurationValidationResponse;
    })();

    SsoCloud.SsoCloudServiceProviderConfigurationListRequest = (function() {

        /**
         * Properties of a SsoCloudServiceProviderConfigurationListRequest.
         * @memberof SsoCloud
         * @interface ISsoCloudServiceProviderConfigurationListRequest
         * @property {number|null} [ssoServiceProviderId] SsoCloudServiceProviderConfigurationListRequest ssoServiceProviderId
         */

        /**
         * Constructs a new SsoCloudServiceProviderConfigurationListRequest.
         * @memberof SsoCloud
         * @classdesc This request is sent to retrieve the list of configurations defined in an enterprise.
         * @implements ISsoCloudServiceProviderConfigurationListRequest
         * @constructor
         * @param {SsoCloud.ISsoCloudServiceProviderConfigurationListRequest=} [properties] Properties to set
         */
        function SsoCloudServiceProviderConfigurationListRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudServiceProviderConfigurationListRequest ssoServiceProviderId.
         * @member {number} ssoServiceProviderId
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListRequest
         * @instance
         */
        SsoCloudServiceProviderConfigurationListRequest.prototype.ssoServiceProviderId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new SsoCloudServiceProviderConfigurationListRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListRequest
         * @static
         * @param {SsoCloud.ISsoCloudServiceProviderConfigurationListRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudServiceProviderConfigurationListRequest} SsoCloudServiceProviderConfigurationListRequest instance
         */
        SsoCloudServiceProviderConfigurationListRequest.create = function create(properties) {
            return new SsoCloudServiceProviderConfigurationListRequest(properties);
        };

        /**
         * Encodes the specified SsoCloudServiceProviderConfigurationListRequest message. Does not implicitly {@link SsoCloud.SsoCloudServiceProviderConfigurationListRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListRequest
         * @static
         * @param {SsoCloud.ISsoCloudServiceProviderConfigurationListRequest} message SsoCloudServiceProviderConfigurationListRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudServiceProviderConfigurationListRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoServiceProviderId);
            return writer;
        };

        /**
         * Decodes a SsoCloudServiceProviderConfigurationListRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudServiceProviderConfigurationListRequest} SsoCloudServiceProviderConfigurationListRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudServiceProviderConfigurationListRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudServiceProviderConfigurationListRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoServiceProviderId = reader.uint64();
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
         * Creates a SsoCloudServiceProviderConfigurationListRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudServiceProviderConfigurationListRequest} SsoCloudServiceProviderConfigurationListRequest
         */
        SsoCloudServiceProviderConfigurationListRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudServiceProviderConfigurationListRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudServiceProviderConfigurationListRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudServiceProviderConfigurationListRequest();
            if (object.ssoServiceProviderId != null)
                if ($util.Long)
                    message.ssoServiceProviderId = $util.Long.fromValue(object.ssoServiceProviderId, true);
                else if (typeof object.ssoServiceProviderId === "string")
                    message.ssoServiceProviderId = parseInt(object.ssoServiceProviderId, 10);
                else if (typeof object.ssoServiceProviderId === "number")
                    message.ssoServiceProviderId = object.ssoServiceProviderId;
                else if (typeof object.ssoServiceProviderId === "object")
                    message.ssoServiceProviderId = new $util.LongBits(object.ssoServiceProviderId.low >>> 0, object.ssoServiceProviderId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudServiceProviderConfigurationListRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListRequest
         * @static
         * @param {SsoCloud.SsoCloudServiceProviderConfigurationListRequest} message SsoCloudServiceProviderConfigurationListRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudServiceProviderConfigurationListRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoServiceProviderId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoServiceProviderId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoServiceProviderId = typeof message.ssoServiceProviderId === "number" ? BigInt(message.ssoServiceProviderId) : $util.Long.fromBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoServiceProviderId === "number")
                    object.ssoServiceProviderId = options.longs === String ? String(message.ssoServiceProviderId) : message.ssoServiceProviderId;
                else
                    object.ssoServiceProviderId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoServiceProviderId) : options.longs === Number ? new $util.LongBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0).toNumber(true) : message.ssoServiceProviderId;
            return object;
        };

        /**
         * Converts this SsoCloudServiceProviderConfigurationListRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudServiceProviderConfigurationListRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudServiceProviderConfigurationListRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudServiceProviderConfigurationListRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudServiceProviderConfigurationListRequest";
        };

        return SsoCloudServiceProviderConfigurationListRequest;
    })();

    SsoCloud.ConfigurationListItem = (function() {

        /**
         * Properties of a ConfigurationListItem.
         * @memberof SsoCloud
         * @interface IConfigurationListItem
         * @property {number|null} [ssoSpConfigurationId] ConfigurationListItem ssoSpConfigurationId
         * @property {string|null} [name] ConfigurationListItem name
         * @property {boolean|null} [isSelected] ConfigurationListItem isSelected
         * @property {Array.<number>|null} [ssoServiceProviderId] ConfigurationListItem ssoServiceProviderId
         */

        /**
         * Constructs a new ConfigurationListItem.
         * @memberof SsoCloud
         * @classdesc This represents one configuration in the list.
         * If isSelected is true this configuration is currently being used by the sso service provider(s) listed.
         * @implements IConfigurationListItem
         * @constructor
         * @param {SsoCloud.IConfigurationListItem=} [properties] Properties to set
         */
        function ConfigurationListItem(properties) {
            this.ssoServiceProviderId = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ConfigurationListItem ssoSpConfigurationId.
         * @member {number} ssoSpConfigurationId
         * @memberof SsoCloud.ConfigurationListItem
         * @instance
         */
        ConfigurationListItem.prototype.ssoSpConfigurationId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ConfigurationListItem name.
         * @member {string} name
         * @memberof SsoCloud.ConfigurationListItem
         * @instance
         */
        ConfigurationListItem.prototype.name = "";

        /**
         * ConfigurationListItem isSelected.
         * @member {boolean} isSelected
         * @memberof SsoCloud.ConfigurationListItem
         * @instance
         */
        ConfigurationListItem.prototype.isSelected = false;

        /**
         * ConfigurationListItem ssoServiceProviderId.
         * @member {Array.<number>} ssoServiceProviderId
         * @memberof SsoCloud.ConfigurationListItem
         * @instance
         */
        ConfigurationListItem.prototype.ssoServiceProviderId = $util.emptyArray;

        /**
         * Creates a new ConfigurationListItem instance using the specified properties.
         * @function create
         * @memberof SsoCloud.ConfigurationListItem
         * @static
         * @param {SsoCloud.IConfigurationListItem=} [properties] Properties to set
         * @returns {SsoCloud.ConfigurationListItem} ConfigurationListItem instance
         */
        ConfigurationListItem.create = function create(properties) {
            return new ConfigurationListItem(properties);
        };

        /**
         * Encodes the specified ConfigurationListItem message. Does not implicitly {@link SsoCloud.ConfigurationListItem.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.ConfigurationListItem
         * @static
         * @param {SsoCloud.IConfigurationListItem} message ConfigurationListItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConfigurationListItem.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoSpConfigurationId);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.isSelected != null && Object.hasOwnProperty.call(message, "isSelected"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isSelected);
            if (message.ssoServiceProviderId != null && message.ssoServiceProviderId.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (let i = 0; i < message.ssoServiceProviderId.length; ++i)
                    writer.uint64(message.ssoServiceProviderId[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Decodes a ConfigurationListItem message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.ConfigurationListItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.ConfigurationListItem} ConfigurationListItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConfigurationListItem.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.ConfigurationListItem();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoSpConfigurationId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.isSelected = reader.bool();
                        break;
                    }
                case 4: {
                        if (!(message.ssoServiceProviderId && message.ssoServiceProviderId.length))
                            message.ssoServiceProviderId = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.ssoServiceProviderId.push(reader.uint64());
                        } else
                            message.ssoServiceProviderId.push(reader.uint64());
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
         * Creates a ConfigurationListItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.ConfigurationListItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.ConfigurationListItem} ConfigurationListItem
         */
        ConfigurationListItem.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.ConfigurationListItem)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.ConfigurationListItem: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.ConfigurationListItem();
            if (object.ssoSpConfigurationId != null)
                if ($util.Long)
                    message.ssoSpConfigurationId = $util.Long.fromValue(object.ssoSpConfigurationId, true);
                else if (typeof object.ssoSpConfigurationId === "string")
                    message.ssoSpConfigurationId = parseInt(object.ssoSpConfigurationId, 10);
                else if (typeof object.ssoSpConfigurationId === "number")
                    message.ssoSpConfigurationId = object.ssoSpConfigurationId;
                else if (typeof object.ssoSpConfigurationId === "object")
                    message.ssoSpConfigurationId = new $util.LongBits(object.ssoSpConfigurationId.low >>> 0, object.ssoSpConfigurationId.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            if (object.isSelected != null)
                message.isSelected = Boolean(object.isSelected);
            if (object.ssoServiceProviderId) {
                if (!Array.isArray(object.ssoServiceProviderId))
                    throw TypeError(".SsoCloud.ConfigurationListItem.ssoServiceProviderId: array expected");
                message.ssoServiceProviderId = [];
                for (let i = 0; i < object.ssoServiceProviderId.length; ++i)
                    if ($util.Long)
                        message.ssoServiceProviderId[i] = $util.Long.fromValue(object.ssoServiceProviderId[i], true);
                    else if (typeof object.ssoServiceProviderId[i] === "string")
                        message.ssoServiceProviderId[i] = parseInt(object.ssoServiceProviderId[i], 10);
                    else if (typeof object.ssoServiceProviderId[i] === "number")
                        message.ssoServiceProviderId[i] = object.ssoServiceProviderId[i];
                    else if (typeof object.ssoServiceProviderId[i] === "object")
                        message.ssoServiceProviderId[i] = new $util.LongBits(object.ssoServiceProviderId[i].low >>> 0, object.ssoServiceProviderId[i].high >>> 0).toNumber(true);
            }
            return message;
        };

        /**
         * Creates a plain object from a ConfigurationListItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.ConfigurationListItem
         * @static
         * @param {SsoCloud.ConfigurationListItem} message ConfigurationListItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ConfigurationListItem.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.ssoServiceProviderId = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoSpConfigurationId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoSpConfigurationId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.name = "";
                object.isSelected = false;
            }
            if (message.ssoSpConfigurationId != null && Object.hasOwnProperty.call(message, "ssoSpConfigurationId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoSpConfigurationId = typeof message.ssoSpConfigurationId === "number" ? BigInt(message.ssoSpConfigurationId) : $util.Long.fromBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoSpConfigurationId === "number")
                    object.ssoSpConfigurationId = options.longs === String ? String(message.ssoSpConfigurationId) : message.ssoSpConfigurationId;
                else
                    object.ssoSpConfigurationId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoSpConfigurationId) : options.longs === Number ? new $util.LongBits(message.ssoSpConfigurationId.low >>> 0, message.ssoSpConfigurationId.high >>> 0).toNumber(true) : message.ssoSpConfigurationId;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.isSelected != null && Object.hasOwnProperty.call(message, "isSelected"))
                object.isSelected = message.isSelected;
            if (message.ssoServiceProviderId && message.ssoServiceProviderId.length) {
                object.ssoServiceProviderId = [];
                for (let j = 0; j < message.ssoServiceProviderId.length; ++j)
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.ssoServiceProviderId[j] = typeof message.ssoServiceProviderId[j] === "number" ? BigInt(message.ssoServiceProviderId[j]) : $util.Long.fromBits(message.ssoServiceProviderId[j].low >>> 0, message.ssoServiceProviderId[j].high >>> 0, true).toBigInt();
                    else if (typeof message.ssoServiceProviderId[j] === "number")
                        object.ssoServiceProviderId[j] = options.longs === String ? String(message.ssoServiceProviderId[j]) : message.ssoServiceProviderId[j];
                    else
                        object.ssoServiceProviderId[j] = options.longs === String ? $util.Long.prototype.toString.call(message.ssoServiceProviderId[j]) : options.longs === Number ? new $util.LongBits(message.ssoServiceProviderId[j].low >>> 0, message.ssoServiceProviderId[j].high >>> 0).toNumber(true) : message.ssoServiceProviderId[j];
            }
            return object;
        };

        /**
         * Converts this ConfigurationListItem to JSON.
         * @function toJSON
         * @memberof SsoCloud.ConfigurationListItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ConfigurationListItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ConfigurationListItem
         * @function getTypeUrl
         * @memberof SsoCloud.ConfigurationListItem
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ConfigurationListItem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.ConfigurationListItem";
        };

        return ConfigurationListItem;
    })();

    SsoCloud.SsoCloudServiceProviderConfigurationListResponse = (function() {

        /**
         * Properties of a SsoCloudServiceProviderConfigurationListResponse.
         * @memberof SsoCloud
         * @interface ISsoCloudServiceProviderConfigurationListResponse
         * @property {Array.<SsoCloud.IConfigurationListItem>|null} [configurationItem] SsoCloudServiceProviderConfigurationListResponse configurationItem
         */

        /**
         * Constructs a new SsoCloudServiceProviderConfigurationListResponse.
         * @memberof SsoCloud
         * @classdesc This represents a list of Configuration entries.
         * @implements ISsoCloudServiceProviderConfigurationListResponse
         * @constructor
         * @param {SsoCloud.ISsoCloudServiceProviderConfigurationListResponse=} [properties] Properties to set
         */
        function SsoCloudServiceProviderConfigurationListResponse(properties) {
            this.configurationItem = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudServiceProviderConfigurationListResponse configurationItem.
         * @member {Array.<SsoCloud.IConfigurationListItem>} configurationItem
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListResponse
         * @instance
         */
        SsoCloudServiceProviderConfigurationListResponse.prototype.configurationItem = $util.emptyArray;

        /**
         * Creates a new SsoCloudServiceProviderConfigurationListResponse instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListResponse
         * @static
         * @param {SsoCloud.ISsoCloudServiceProviderConfigurationListResponse=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudServiceProviderConfigurationListResponse} SsoCloudServiceProviderConfigurationListResponse instance
         */
        SsoCloudServiceProviderConfigurationListResponse.create = function create(properties) {
            return new SsoCloudServiceProviderConfigurationListResponse(properties);
        };

        /**
         * Encodes the specified SsoCloudServiceProviderConfigurationListResponse message. Does not implicitly {@link SsoCloud.SsoCloudServiceProviderConfigurationListResponse.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListResponse
         * @static
         * @param {SsoCloud.ISsoCloudServiceProviderConfigurationListResponse} message SsoCloudServiceProviderConfigurationListResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudServiceProviderConfigurationListResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.configurationItem != null && message.configurationItem.length)
                for (let i = 0; i < message.configurationItem.length; ++i)
                    $root.SsoCloud.ConfigurationListItem.encode(message.configurationItem[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SsoCloudServiceProviderConfigurationListResponse message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudServiceProviderConfigurationListResponse} SsoCloudServiceProviderConfigurationListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudServiceProviderConfigurationListResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudServiceProviderConfigurationListResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.configurationItem && message.configurationItem.length))
                            message.configurationItem = [];
                        message.configurationItem.push($root.SsoCloud.ConfigurationListItem.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a SsoCloudServiceProviderConfigurationListResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudServiceProviderConfigurationListResponse} SsoCloudServiceProviderConfigurationListResponse
         */
        SsoCloudServiceProviderConfigurationListResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudServiceProviderConfigurationListResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudServiceProviderConfigurationListResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudServiceProviderConfigurationListResponse();
            if (object.configurationItem) {
                if (!Array.isArray(object.configurationItem))
                    throw TypeError(".SsoCloud.SsoCloudServiceProviderConfigurationListResponse.configurationItem: array expected");
                message.configurationItem = [];
                for (let i = 0; i < object.configurationItem.length; ++i) {
                    if (!$util.isObject(object.configurationItem[i]))
                        throw TypeError(".SsoCloud.SsoCloudServiceProviderConfigurationListResponse.configurationItem: object expected");
                    message.configurationItem[i] = $root.SsoCloud.ConfigurationListItem.fromObject(object.configurationItem[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudServiceProviderConfigurationListResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListResponse
         * @static
         * @param {SsoCloud.SsoCloudServiceProviderConfigurationListResponse} message SsoCloudServiceProviderConfigurationListResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudServiceProviderConfigurationListResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.configurationItem = [];
            if (message.configurationItem && message.configurationItem.length) {
                object.configurationItem = [];
                for (let j = 0; j < message.configurationItem.length; ++j)
                    object.configurationItem[j] = $root.SsoCloud.ConfigurationListItem.toObject(message.configurationItem[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this SsoCloudServiceProviderConfigurationListResponse to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudServiceProviderConfigurationListResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudServiceProviderConfigurationListResponse
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudServiceProviderConfigurationListResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudServiceProviderConfigurationListResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudServiceProviderConfigurationListResponse";
        };

        return SsoCloudServiceProviderConfigurationListResponse;
    })();

    SsoCloud.SsoCloudRequest = (function() {

        /**
         * Properties of a SsoCloudRequest.
         * @memberof SsoCloud
         * @interface ISsoCloudRequest
         * @property {Uint8Array|null} [messageSessionUid] SsoCloudRequest messageSessionUid
         * @property {string|null} [clientVersion] SsoCloudRequest clientVersion
         * @property {boolean|null} [embedded] SsoCloudRequest embedded
         * @property {boolean|null} [json] SsoCloudRequest json
         * @property {string|null} [dest] SsoCloudRequest dest
         * @property {string|null} [idpSessionId] SsoCloudRequest idpSessionId
         * @property {boolean|null} [forceLogin] SsoCloudRequest forceLogin
         * @property {string|null} [username] SsoCloudRequest username
         * @property {boolean|null} [detached] SsoCloudRequest detached
         */

        /**
         * Constructs a new SsoCloudRequest.
         * @memberof SsoCloud
         * @classdesc For security, this structure is used to make a Cloud SSO login or logout request rather than sending the parameters in the URL or in a form.
         * A typical call is: https://www.keepersecurity.com/api/rest/sso/saml/login/123456789?payload=encodedEncryptedAPIRequestContainingAnSsoCloudRequest
         * @implements ISsoCloudRequest
         * @constructor
         * @param {SsoCloud.ISsoCloudRequest=} [properties] Properties to set
         */
        function SsoCloudRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudRequest messageSessionUid.
         * @member {Uint8Array} messageSessionUid
         * @memberof SsoCloud.SsoCloudRequest
         * @instance
         */
        SsoCloudRequest.prototype.messageSessionUid = $util.newBuffer([]);

        /**
         * SsoCloudRequest clientVersion.
         * @member {string} clientVersion
         * @memberof SsoCloud.SsoCloudRequest
         * @instance
         */
        SsoCloudRequest.prototype.clientVersion = "";

        /**
         * SsoCloudRequest embedded.
         * @member {boolean} embedded
         * @memberof SsoCloud.SsoCloudRequest
         * @instance
         */
        SsoCloudRequest.prototype.embedded = false;

        /**
         * SsoCloudRequest json.
         * @member {boolean} json
         * @memberof SsoCloud.SsoCloudRequest
         * @instance
         */
        SsoCloudRequest.prototype.json = false;

        /**
         * SsoCloudRequest dest.
         * @member {string} dest
         * @memberof SsoCloud.SsoCloudRequest
         * @instance
         */
        SsoCloudRequest.prototype.dest = "";

        /**
         * SsoCloudRequest idpSessionId.
         * @member {string} idpSessionId
         * @memberof SsoCloud.SsoCloudRequest
         * @instance
         */
        SsoCloudRequest.prototype.idpSessionId = "";

        /**
         * SsoCloudRequest forceLogin.
         * @member {boolean} forceLogin
         * @memberof SsoCloud.SsoCloudRequest
         * @instance
         */
        SsoCloudRequest.prototype.forceLogin = false;

        /**
         * SsoCloudRequest username.
         * @member {string} username
         * @memberof SsoCloud.SsoCloudRequest
         * @instance
         */
        SsoCloudRequest.prototype.username = "";

        /**
         * SsoCloudRequest detached.
         * @member {boolean} detached
         * @memberof SsoCloud.SsoCloudRequest
         * @instance
         */
        SsoCloudRequest.prototype.detached = false;

        /**
         * Creates a new SsoCloudRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudRequest
         * @static
         * @param {SsoCloud.ISsoCloudRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudRequest} SsoCloudRequest instance
         */
        SsoCloudRequest.create = function create(properties) {
            return new SsoCloudRequest(properties);
        };

        /**
         * Encodes the specified SsoCloudRequest message. Does not implicitly {@link SsoCloud.SsoCloudRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudRequest
         * @static
         * @param {SsoCloud.ISsoCloudRequest} message SsoCloudRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.messageSessionUid != null && Object.hasOwnProperty.call(message, "messageSessionUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.messageSessionUid);
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.clientVersion);
            if (message.embedded != null && Object.hasOwnProperty.call(message, "embedded"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.embedded);
            if (message.json != null && Object.hasOwnProperty.call(message, "json"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.json);
            if (message.dest != null && Object.hasOwnProperty.call(message, "dest"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.dest);
            if (message.idpSessionId != null && Object.hasOwnProperty.call(message, "idpSessionId"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.idpSessionId);
            if (message.forceLogin != null && Object.hasOwnProperty.call(message, "forceLogin"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.forceLogin);
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.username);
            if (message.detached != null && Object.hasOwnProperty.call(message, "detached"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.detached);
            return writer;
        };

        /**
         * Decodes a SsoCloudRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudRequest} SsoCloudRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.messageSessionUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.clientVersion = reader.string();
                        break;
                    }
                case 3: {
                        message.embedded = reader.bool();
                        break;
                    }
                case 4: {
                        message.json = reader.bool();
                        break;
                    }
                case 5: {
                        message.dest = reader.string();
                        break;
                    }
                case 6: {
                        message.idpSessionId = reader.string();
                        break;
                    }
                case 7: {
                        message.forceLogin = reader.bool();
                        break;
                    }
                case 8: {
                        message.username = reader.string();
                        break;
                    }
                case 9: {
                        message.detached = reader.bool();
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
         * Creates a SsoCloudRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudRequest} SsoCloudRequest
         */
        SsoCloudRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudRequest();
            if (object.messageSessionUid != null)
                if (typeof object.messageSessionUid === "string")
                    $util.base64.decode(object.messageSessionUid, message.messageSessionUid = $util.newBuffer($util.base64.length(object.messageSessionUid)), 0);
                else if (object.messageSessionUid.length >= 0)
                    message.messageSessionUid = object.messageSessionUid;
            if (object.clientVersion != null)
                message.clientVersion = String(object.clientVersion);
            if (object.embedded != null)
                message.embedded = Boolean(object.embedded);
            if (object.json != null)
                message.json = Boolean(object.json);
            if (object.dest != null)
                message.dest = String(object.dest);
            if (object.idpSessionId != null)
                message.idpSessionId = String(object.idpSessionId);
            if (object.forceLogin != null)
                message.forceLogin = Boolean(object.forceLogin);
            if (object.username != null)
                message.username = String(object.username);
            if (object.detached != null)
                message.detached = Boolean(object.detached);
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudRequest
         * @static
         * @param {SsoCloud.SsoCloudRequest} message SsoCloudRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.messageSessionUid = "";
                else {
                    object.messageSessionUid = [];
                    if (options.bytes !== Array)
                        object.messageSessionUid = $util.newBuffer(object.messageSessionUid);
                }
                object.clientVersion = "";
                object.embedded = false;
                object.json = false;
                object.dest = "";
                object.idpSessionId = "";
                object.forceLogin = false;
                object.username = "";
                object.detached = false;
            }
            if (message.messageSessionUid != null && Object.hasOwnProperty.call(message, "messageSessionUid"))
                object.messageSessionUid = options.bytes === String ? $util.base64.encode(message.messageSessionUid, 0, message.messageSessionUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.messageSessionUid) : message.messageSessionUid;
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                object.clientVersion = message.clientVersion;
            if (message.embedded != null && Object.hasOwnProperty.call(message, "embedded"))
                object.embedded = message.embedded;
            if (message.json != null && Object.hasOwnProperty.call(message, "json"))
                object.json = message.json;
            if (message.dest != null && Object.hasOwnProperty.call(message, "dest"))
                object.dest = message.dest;
            if (message.idpSessionId != null && Object.hasOwnProperty.call(message, "idpSessionId"))
                object.idpSessionId = message.idpSessionId;
            if (message.forceLogin != null && Object.hasOwnProperty.call(message, "forceLogin"))
                object.forceLogin = message.forceLogin;
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.detached != null && Object.hasOwnProperty.call(message, "detached"))
                object.detached = message.detached;
            return object;
        };

        /**
         * Converts this SsoCloudRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudRequest";
        };

        return SsoCloudRequest;
    })();

    SsoCloud.SsoCloudResponse = (function() {

        /**
         * Properties of a SsoCloudResponse.
         * @memberof SsoCloud
         * @interface ISsoCloudResponse
         * @property {string|null} [command] SsoCloudResponse command
         * @property {Uint8Array|null} [messageSessionUid] SsoCloudResponse messageSessionUid
         * @property {string|null} [email] SsoCloudResponse email
         * @property {Uint8Array|null} [encryptedLoginToken] SsoCloudResponse encryptedLoginToken
         * @property {string|null} [providerName] SsoCloudResponse providerName
         * @property {string|null} [idpSessionId] SsoCloudResponse idpSessionId
         * @property {Uint8Array|null} [encryptedSessionToken] SsoCloudResponse encryptedSessionToken
         * @property {string|null} [errorToken] SsoCloudResponse errorToken
         */

        /**
         * Constructs a new SsoCloudResponse.
         * @memberof SsoCloud
         * @classdesc For security, this structure is used to return values from a Cloud SSO login or logout.
         * It is encrypted with the key sent along with the SsoCloudRequest.
         * @implements ISsoCloudResponse
         * @constructor
         * @param {SsoCloud.ISsoCloudResponse=} [properties] Properties to set
         */
        function SsoCloudResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudResponse command.
         * @member {string} command
         * @memberof SsoCloud.SsoCloudResponse
         * @instance
         */
        SsoCloudResponse.prototype.command = "";

        /**
         * SsoCloudResponse messageSessionUid.
         * @member {Uint8Array} messageSessionUid
         * @memberof SsoCloud.SsoCloudResponse
         * @instance
         */
        SsoCloudResponse.prototype.messageSessionUid = $util.newBuffer([]);

        /**
         * SsoCloudResponse email.
         * @member {string} email
         * @memberof SsoCloud.SsoCloudResponse
         * @instance
         */
        SsoCloudResponse.prototype.email = "";

        /**
         * SsoCloudResponse encryptedLoginToken.
         * @member {Uint8Array} encryptedLoginToken
         * @memberof SsoCloud.SsoCloudResponse
         * @instance
         */
        SsoCloudResponse.prototype.encryptedLoginToken = $util.newBuffer([]);

        /**
         * SsoCloudResponse providerName.
         * @member {string} providerName
         * @memberof SsoCloud.SsoCloudResponse
         * @instance
         */
        SsoCloudResponse.prototype.providerName = "";

        /**
         * SsoCloudResponse idpSessionId.
         * @member {string} idpSessionId
         * @memberof SsoCloud.SsoCloudResponse
         * @instance
         */
        SsoCloudResponse.prototype.idpSessionId = "";

        /**
         * SsoCloudResponse encryptedSessionToken.
         * @member {Uint8Array} encryptedSessionToken
         * @memberof SsoCloud.SsoCloudResponse
         * @instance
         */
        SsoCloudResponse.prototype.encryptedSessionToken = $util.newBuffer([]);

        /**
         * SsoCloudResponse errorToken.
         * @member {string} errorToken
         * @memberof SsoCloud.SsoCloudResponse
         * @instance
         */
        SsoCloudResponse.prototype.errorToken = "";

        /**
         * Creates a new SsoCloudResponse instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudResponse
         * @static
         * @param {SsoCloud.ISsoCloudResponse=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudResponse} SsoCloudResponse instance
         */
        SsoCloudResponse.create = function create(properties) {
            return new SsoCloudResponse(properties);
        };

        /**
         * Encodes the specified SsoCloudResponse message. Does not implicitly {@link SsoCloud.SsoCloudResponse.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudResponse
         * @static
         * @param {SsoCloud.ISsoCloudResponse} message SsoCloudResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.command);
            if (message.messageSessionUid != null && Object.hasOwnProperty.call(message, "messageSessionUid"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.messageSessionUid);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.email);
            if (message.encryptedLoginToken != null && Object.hasOwnProperty.call(message, "encryptedLoginToken"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.encryptedLoginToken);
            if (message.providerName != null && Object.hasOwnProperty.call(message, "providerName"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.providerName);
            if (message.idpSessionId != null && Object.hasOwnProperty.call(message, "idpSessionId"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.idpSessionId);
            if (message.encryptedSessionToken != null && Object.hasOwnProperty.call(message, "encryptedSessionToken"))
                writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.encryptedSessionToken);
            if (message.errorToken != null && Object.hasOwnProperty.call(message, "errorToken"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.errorToken);
            return writer;
        };

        /**
         * Decodes a SsoCloudResponse message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudResponse} SsoCloudResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.command = reader.string();
                        break;
                    }
                case 2: {
                        message.messageSessionUid = reader.bytes();
                        break;
                    }
                case 3: {
                        message.email = reader.string();
                        break;
                    }
                case 4: {
                        message.encryptedLoginToken = reader.bytes();
                        break;
                    }
                case 5: {
                        message.providerName = reader.string();
                        break;
                    }
                case 6: {
                        message.idpSessionId = reader.string();
                        break;
                    }
                case 7: {
                        message.encryptedSessionToken = reader.bytes();
                        break;
                    }
                case 8: {
                        message.errorToken = reader.string();
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
         * Creates a SsoCloudResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudResponse} SsoCloudResponse
         */
        SsoCloudResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudResponse();
            if (object.command != null)
                message.command = String(object.command);
            if (object.messageSessionUid != null)
                if (typeof object.messageSessionUid === "string")
                    $util.base64.decode(object.messageSessionUid, message.messageSessionUid = $util.newBuffer($util.base64.length(object.messageSessionUid)), 0);
                else if (object.messageSessionUid.length >= 0)
                    message.messageSessionUid = object.messageSessionUid;
            if (object.email != null)
                message.email = String(object.email);
            if (object.encryptedLoginToken != null)
                if (typeof object.encryptedLoginToken === "string")
                    $util.base64.decode(object.encryptedLoginToken, message.encryptedLoginToken = $util.newBuffer($util.base64.length(object.encryptedLoginToken)), 0);
                else if (object.encryptedLoginToken.length >= 0)
                    message.encryptedLoginToken = object.encryptedLoginToken;
            if (object.providerName != null)
                message.providerName = String(object.providerName);
            if (object.idpSessionId != null)
                message.idpSessionId = String(object.idpSessionId);
            if (object.encryptedSessionToken != null)
                if (typeof object.encryptedSessionToken === "string")
                    $util.base64.decode(object.encryptedSessionToken, message.encryptedSessionToken = $util.newBuffer($util.base64.length(object.encryptedSessionToken)), 0);
                else if (object.encryptedSessionToken.length >= 0)
                    message.encryptedSessionToken = object.encryptedSessionToken;
            if (object.errorToken != null)
                message.errorToken = String(object.errorToken);
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudResponse
         * @static
         * @param {SsoCloud.SsoCloudResponse} message SsoCloudResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.command = "";
                if (options.bytes === String)
                    object.messageSessionUid = "";
                else {
                    object.messageSessionUid = [];
                    if (options.bytes !== Array)
                        object.messageSessionUid = $util.newBuffer(object.messageSessionUid);
                }
                object.email = "";
                if (options.bytes === String)
                    object.encryptedLoginToken = "";
                else {
                    object.encryptedLoginToken = [];
                    if (options.bytes !== Array)
                        object.encryptedLoginToken = $util.newBuffer(object.encryptedLoginToken);
                }
                object.providerName = "";
                object.idpSessionId = "";
                if (options.bytes === String)
                    object.encryptedSessionToken = "";
                else {
                    object.encryptedSessionToken = [];
                    if (options.bytes !== Array)
                        object.encryptedSessionToken = $util.newBuffer(object.encryptedSessionToken);
                }
                object.errorToken = "";
            }
            if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                object.command = message.command;
            if (message.messageSessionUid != null && Object.hasOwnProperty.call(message, "messageSessionUid"))
                object.messageSessionUid = options.bytes === String ? $util.base64.encode(message.messageSessionUid, 0, message.messageSessionUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.messageSessionUid) : message.messageSessionUid;
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                object.email = message.email;
            if (message.encryptedLoginToken != null && Object.hasOwnProperty.call(message, "encryptedLoginToken"))
                object.encryptedLoginToken = options.bytes === String ? $util.base64.encode(message.encryptedLoginToken, 0, message.encryptedLoginToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedLoginToken) : message.encryptedLoginToken;
            if (message.providerName != null && Object.hasOwnProperty.call(message, "providerName"))
                object.providerName = message.providerName;
            if (message.idpSessionId != null && Object.hasOwnProperty.call(message, "idpSessionId"))
                object.idpSessionId = message.idpSessionId;
            if (message.encryptedSessionToken != null && Object.hasOwnProperty.call(message, "encryptedSessionToken"))
                object.encryptedSessionToken = options.bytes === String ? $util.base64.encode(message.encryptedSessionToken, 0, message.encryptedSessionToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedSessionToken) : message.encryptedSessionToken;
            if (message.errorToken != null && Object.hasOwnProperty.call(message, "errorToken"))
                object.errorToken = message.errorToken;
            return object;
        };

        /**
         * Converts this SsoCloudResponse to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudResponse
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudResponse";
        };

        return SsoCloudResponse;
    })();

    SsoCloud.SsoCloudLogRequest = (function() {

        /**
         * Properties of a SsoCloudLogRequest.
         * @memberof SsoCloud
         * @interface ISsoCloudLogRequest
         * @property {number|null} [ssoServiceProviderId] SsoCloudLogRequest ssoServiceProviderId
         * @property {string|null} [serviceName] SsoCloudLogRequest serviceName
         * @property {number|null} [serviceId] SsoCloudLogRequest serviceId
         */

        /**
         * Constructs a new SsoCloudLogRequest.
         * @memberof SsoCloud
         * @classdesc This allows the user to retrieve or clear SSO logs related to a service provider.
         * @implements ISsoCloudLogRequest
         * @constructor
         * @param {SsoCloud.ISsoCloudLogRequest=} [properties] Properties to set
         */
        function SsoCloudLogRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudLogRequest ssoServiceProviderId.
         * @member {number} ssoServiceProviderId
         * @memberof SsoCloud.SsoCloudLogRequest
         * @instance
         */
        SsoCloudLogRequest.prototype.ssoServiceProviderId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudLogRequest serviceName.
         * @member {string} serviceName
         * @memberof SsoCloud.SsoCloudLogRequest
         * @instance
         */
        SsoCloudLogRequest.prototype.serviceName = "";

        /**
         * SsoCloudLogRequest serviceId.
         * @member {number} serviceId
         * @memberof SsoCloud.SsoCloudLogRequest
         * @instance
         */
        SsoCloudLogRequest.prototype.serviceId = 0;

        /**
         * Creates a new SsoCloudLogRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudLogRequest
         * @static
         * @param {SsoCloud.ISsoCloudLogRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudLogRequest} SsoCloudLogRequest instance
         */
        SsoCloudLogRequest.create = function create(properties) {
            return new SsoCloudLogRequest(properties);
        };

        /**
         * Encodes the specified SsoCloudLogRequest message. Does not implicitly {@link SsoCloud.SsoCloudLogRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudLogRequest
         * @static
         * @param {SsoCloud.ISsoCloudLogRequest} message SsoCloudLogRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudLogRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.ssoServiceProviderId);
            if (message.serviceName != null && Object.hasOwnProperty.call(message, "serviceName"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.serviceName);
            if (message.serviceId != null && Object.hasOwnProperty.call(message, "serviceId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.serviceId);
            return writer;
        };

        /**
         * Decodes a SsoCloudLogRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudLogRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudLogRequest} SsoCloudLogRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudLogRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudLogRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.ssoServiceProviderId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.serviceName = reader.string();
                        break;
                    }
                case 3: {
                        message.serviceId = reader.uint32();
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
         * Creates a SsoCloudLogRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudLogRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudLogRequest} SsoCloudLogRequest
         */
        SsoCloudLogRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudLogRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudLogRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudLogRequest();
            if (object.ssoServiceProviderId != null)
                if ($util.Long)
                    message.ssoServiceProviderId = $util.Long.fromValue(object.ssoServiceProviderId, true);
                else if (typeof object.ssoServiceProviderId === "string")
                    message.ssoServiceProviderId = parseInt(object.ssoServiceProviderId, 10);
                else if (typeof object.ssoServiceProviderId === "number")
                    message.ssoServiceProviderId = object.ssoServiceProviderId;
                else if (typeof object.ssoServiceProviderId === "object")
                    message.ssoServiceProviderId = new $util.LongBits(object.ssoServiceProviderId.low >>> 0, object.ssoServiceProviderId.high >>> 0).toNumber(true);
            if (object.serviceName != null)
                message.serviceName = String(object.serviceName);
            if (object.serviceId != null)
                message.serviceId = object.serviceId >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudLogRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudLogRequest
         * @static
         * @param {SsoCloud.SsoCloudLogRequest} message SsoCloudLogRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudLogRequest.toObject = function toObject(message, options, q) {
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
                    object.ssoServiceProviderId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoServiceProviderId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.serviceName = "";
                object.serviceId = 0;
            }
            if (message.ssoServiceProviderId != null && Object.hasOwnProperty.call(message, "ssoServiceProviderId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoServiceProviderId = typeof message.ssoServiceProviderId === "number" ? BigInt(message.ssoServiceProviderId) : $util.Long.fromBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoServiceProviderId === "number")
                    object.ssoServiceProviderId = options.longs === String ? String(message.ssoServiceProviderId) : message.ssoServiceProviderId;
                else
                    object.ssoServiceProviderId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoServiceProviderId) : options.longs === Number ? new $util.LongBits(message.ssoServiceProviderId.low >>> 0, message.ssoServiceProviderId.high >>> 0).toNumber(true) : message.ssoServiceProviderId;
            if (message.serviceName != null && Object.hasOwnProperty.call(message, "serviceName"))
                object.serviceName = message.serviceName;
            if (message.serviceId != null && Object.hasOwnProperty.call(message, "serviceId"))
                object.serviceId = message.serviceId;
            return object;
        };

        /**
         * Converts this SsoCloudLogRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudLogRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudLogRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudLogRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudLogRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudLogRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudLogRequest";
        };

        return SsoCloudLogRequest;
    })();

    SsoCloud.SamlRelayState = (function() {

        /**
         * Properties of a SamlRelayState.
         * @memberof SsoCloud
         * @interface ISamlRelayState
         * @property {Uint8Array|null} [messageSessionUid] SamlRelayState messageSessionUid
         * @property {string|null} [username] SamlRelayState username
         * @property {boolean|null} [embedded] SamlRelayState embedded
         * @property {boolean|null} [json] SamlRelayState json
         * @property {number|null} [destId] SamlRelayState destId
         * @property {number|null} [keyId] SamlRelayState keyId
         * @property {Authentication.SupportedLanguage|null} [supportedLanguage] SamlRelayState supportedLanguage
         * @property {number|null} [checksum] SamlRelayState checksum
         * @property {boolean|null} [isGeneratedUid] SamlRelayState isGeneratedUid
         * @property {number|null} [deviceId] SamlRelayState deviceId
         * @property {boolean|null} [detached] SamlRelayState detached
         */

        /**
         * Constructs a new SamlRelayState.
         * @memberof SsoCloud
         * @classdesc This is used internally by Cloud SSO.  Clients do not use it.
         * @implements ISamlRelayState
         * @constructor
         * @param {SsoCloud.ISamlRelayState=} [properties] Properties to set
         */
        function SamlRelayState(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SamlRelayState messageSessionUid.
         * @member {Uint8Array} messageSessionUid
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.messageSessionUid = $util.newBuffer([]);

        /**
         * SamlRelayState username.
         * @member {string} username
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.username = "";

        /**
         * SamlRelayState embedded.
         * @member {boolean} embedded
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.embedded = false;

        /**
         * SamlRelayState json.
         * @member {boolean} json
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.json = false;

        /**
         * SamlRelayState destId.
         * @member {number} destId
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.destId = 0;

        /**
         * SamlRelayState keyId.
         * @member {number} keyId
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.keyId = 0;

        /**
         * SamlRelayState supportedLanguage.
         * @member {Authentication.SupportedLanguage} supportedLanguage
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.supportedLanguage = 0;

        /**
         * SamlRelayState checksum.
         * @member {number} checksum
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.checksum = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SamlRelayState isGeneratedUid.
         * @member {boolean} isGeneratedUid
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.isGeneratedUid = false;

        /**
         * SamlRelayState deviceId.
         * @member {number} deviceId
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.deviceId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SamlRelayState detached.
         * @member {boolean} detached
         * @memberof SsoCloud.SamlRelayState
         * @instance
         */
        SamlRelayState.prototype.detached = false;

        /**
         * Creates a new SamlRelayState instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SamlRelayState
         * @static
         * @param {SsoCloud.ISamlRelayState=} [properties] Properties to set
         * @returns {SsoCloud.SamlRelayState} SamlRelayState instance
         */
        SamlRelayState.create = function create(properties) {
            return new SamlRelayState(properties);
        };

        /**
         * Encodes the specified SamlRelayState message. Does not implicitly {@link SsoCloud.SamlRelayState.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SamlRelayState
         * @static
         * @param {SsoCloud.ISamlRelayState} message SamlRelayState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SamlRelayState.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.messageSessionUid != null && Object.hasOwnProperty.call(message, "messageSessionUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.messageSessionUid);
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
            if (message.embedded != null && Object.hasOwnProperty.call(message, "embedded"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.embedded);
            if (message.json != null && Object.hasOwnProperty.call(message, "json"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.json);
            if (message.destId != null && Object.hasOwnProperty.call(message, "destId"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.destId);
            if (message.keyId != null && Object.hasOwnProperty.call(message, "keyId"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.keyId);
            if (message.supportedLanguage != null && Object.hasOwnProperty.call(message, "supportedLanguage"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.supportedLanguage);
            if (message.checksum != null && Object.hasOwnProperty.call(message, "checksum"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.checksum);
            if (message.isGeneratedUid != null && Object.hasOwnProperty.call(message, "isGeneratedUid"))
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.isGeneratedUid);
            if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.deviceId);
            if (message.detached != null && Object.hasOwnProperty.call(message, "detached"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.detached);
            return writer;
        };

        /**
         * Decodes a SamlRelayState message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SamlRelayState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SamlRelayState} SamlRelayState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SamlRelayState.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SamlRelayState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.messageSessionUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.username = reader.string();
                        break;
                    }
                case 3: {
                        message.embedded = reader.bool();
                        break;
                    }
                case 4: {
                        message.json = reader.bool();
                        break;
                    }
                case 5: {
                        message.destId = reader.uint32();
                        break;
                    }
                case 6: {
                        message.keyId = reader.int32();
                        break;
                    }
                case 7: {
                        message.supportedLanguage = reader.int32();
                        break;
                    }
                case 8: {
                        message.checksum = reader.uint64();
                        break;
                    }
                case 9: {
                        message.isGeneratedUid = reader.bool();
                        break;
                    }
                case 10: {
                        message.deviceId = reader.int64();
                        break;
                    }
                case 11: {
                        message.detached = reader.bool();
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
         * Creates a SamlRelayState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SamlRelayState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SamlRelayState} SamlRelayState
         */
        SamlRelayState.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SamlRelayState)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SamlRelayState: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SamlRelayState();
            if (object.messageSessionUid != null)
                if (typeof object.messageSessionUid === "string")
                    $util.base64.decode(object.messageSessionUid, message.messageSessionUid = $util.newBuffer($util.base64.length(object.messageSessionUid)), 0);
                else if (object.messageSessionUid.length >= 0)
                    message.messageSessionUid = object.messageSessionUid;
            if (object.username != null)
                message.username = String(object.username);
            if (object.embedded != null)
                message.embedded = Boolean(object.embedded);
            if (object.json != null)
                message.json = Boolean(object.json);
            if (object.destId != null)
                message.destId = object.destId >>> 0;
            if (object.keyId != null)
                message.keyId = object.keyId | 0;
            switch (object.supportedLanguage) {
            default:
                if (typeof object.supportedLanguage === "number") {
                    message.supportedLanguage = object.supportedLanguage;
                    break;
                }
                break;
            case "ENGLISH":
            case 0:
                message.supportedLanguage = 0;
                break;
            case "ARABIC":
            case 1:
                message.supportedLanguage = 1;
                break;
            case "BRITISH":
            case 2:
                message.supportedLanguage = 2;
                break;
            case "CHINESE":
            case 3:
                message.supportedLanguage = 3;
                break;
            case "CHINESE_HONG_KONG":
            case 4:
                message.supportedLanguage = 4;
                break;
            case "CHINESE_TAIWAN":
            case 5:
                message.supportedLanguage = 5;
                break;
            case "DUTCH":
            case 6:
                message.supportedLanguage = 6;
                break;
            case "FRENCH":
            case 7:
                message.supportedLanguage = 7;
                break;
            case "GERMAN":
            case 8:
                message.supportedLanguage = 8;
                break;
            case "GREEK":
            case 9:
                message.supportedLanguage = 9;
                break;
            case "HEBREW":
            case 10:
                message.supportedLanguage = 10;
                break;
            case "ITALIAN":
            case 11:
                message.supportedLanguage = 11;
                break;
            case "JAPANESE":
            case 12:
                message.supportedLanguage = 12;
                break;
            case "KOREAN":
            case 13:
                message.supportedLanguage = 13;
                break;
            case "POLISH":
            case 14:
                message.supportedLanguage = 14;
                break;
            case "PORTUGUESE":
            case 15:
                message.supportedLanguage = 15;
                break;
            case "PORTUGUESE_BRAZIL":
            case 16:
                message.supportedLanguage = 16;
                break;
            case "ROMANIAN":
            case 17:
                message.supportedLanguage = 17;
                break;
            case "RUSSIAN":
            case 18:
                message.supportedLanguage = 18;
                break;
            case "SLOVAK":
            case 19:
                message.supportedLanguage = 19;
                break;
            case "SPANISH":
            case 20:
                message.supportedLanguage = 20;
                break;
            case "FINNISH":
            case 21:
                message.supportedLanguage = 21;
                break;
            case "SWEDISH":
            case 22:
                message.supportedLanguage = 22;
                break;
            }
            if (object.checksum != null)
                if ($util.Long)
                    message.checksum = $util.Long.fromValue(object.checksum, true);
                else if (typeof object.checksum === "string")
                    message.checksum = parseInt(object.checksum, 10);
                else if (typeof object.checksum === "number")
                    message.checksum = object.checksum;
                else if (typeof object.checksum === "object")
                    message.checksum = new $util.LongBits(object.checksum.low >>> 0, object.checksum.high >>> 0).toNumber(true);
            if (object.isGeneratedUid != null)
                message.isGeneratedUid = Boolean(object.isGeneratedUid);
            if (object.deviceId != null)
                if ($util.Long)
                    message.deviceId = $util.Long.fromValue(object.deviceId, false);
                else if (typeof object.deviceId === "string")
                    message.deviceId = parseInt(object.deviceId, 10);
                else if (typeof object.deviceId === "number")
                    message.deviceId = object.deviceId;
                else if (typeof object.deviceId === "object")
                    message.deviceId = new $util.LongBits(object.deviceId.low >>> 0, object.deviceId.high >>> 0).toNumber();
            if (object.detached != null)
                message.detached = Boolean(object.detached);
            return message;
        };

        /**
         * Creates a plain object from a SamlRelayState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SamlRelayState
         * @static
         * @param {SsoCloud.SamlRelayState} message SamlRelayState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SamlRelayState.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.messageSessionUid = "";
                else {
                    object.messageSessionUid = [];
                    if (options.bytes !== Array)
                        object.messageSessionUid = $util.newBuffer(object.messageSessionUid);
                }
                object.username = "";
                object.embedded = false;
                object.json = false;
                object.destId = 0;
                object.keyId = 0;
                object.supportedLanguage = options.enums === String ? "ENGLISH" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.checksum = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.checksum = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.isGeneratedUid = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.deviceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.deviceId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.detached = false;
            }
            if (message.messageSessionUid != null && Object.hasOwnProperty.call(message, "messageSessionUid"))
                object.messageSessionUid = options.bytes === String ? $util.base64.encode(message.messageSessionUid, 0, message.messageSessionUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.messageSessionUid) : message.messageSessionUid;
            if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.embedded != null && Object.hasOwnProperty.call(message, "embedded"))
                object.embedded = message.embedded;
            if (message.json != null && Object.hasOwnProperty.call(message, "json"))
                object.json = message.json;
            if (message.destId != null && Object.hasOwnProperty.call(message, "destId"))
                object.destId = message.destId;
            if (message.keyId != null && Object.hasOwnProperty.call(message, "keyId"))
                object.keyId = message.keyId;
            if (message.supportedLanguage != null && Object.hasOwnProperty.call(message, "supportedLanguage"))
                object.supportedLanguage = options.enums === String ? $root.Authentication.SupportedLanguage[message.supportedLanguage] === undefined ? message.supportedLanguage : $root.Authentication.SupportedLanguage[message.supportedLanguage] : message.supportedLanguage;
            if (message.checksum != null && Object.hasOwnProperty.call(message, "checksum"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.checksum = typeof message.checksum === "number" ? BigInt(message.checksum) : $util.Long.fromBits(message.checksum.low >>> 0, message.checksum.high >>> 0, true).toBigInt();
                else if (typeof message.checksum === "number")
                    object.checksum = options.longs === String ? String(message.checksum) : message.checksum;
                else
                    object.checksum = options.longs === String ? $util.Long.prototype.toString.call(message.checksum) : options.longs === Number ? new $util.LongBits(message.checksum.low >>> 0, message.checksum.high >>> 0).toNumber(true) : message.checksum;
            if (message.isGeneratedUid != null && Object.hasOwnProperty.call(message, "isGeneratedUid"))
                object.isGeneratedUid = message.isGeneratedUid;
            if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.deviceId = typeof message.deviceId === "number" ? BigInt(message.deviceId) : $util.Long.fromBits(message.deviceId.low >>> 0, message.deviceId.high >>> 0, false).toBigInt();
                else if (typeof message.deviceId === "number")
                    object.deviceId = options.longs === String ? String(message.deviceId) : message.deviceId;
                else
                    object.deviceId = options.longs === String ? $util.Long.prototype.toString.call(message.deviceId) : options.longs === Number ? new $util.LongBits(message.deviceId.low >>> 0, message.deviceId.high >>> 0).toNumber() : message.deviceId;
            if (message.detached != null && Object.hasOwnProperty.call(message, "detached"))
                object.detached = message.detached;
            return object;
        };

        /**
         * Converts this SamlRelayState to JSON.
         * @function toJSON
         * @memberof SsoCloud.SamlRelayState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SamlRelayState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SamlRelayState
         * @function getTypeUrl
         * @memberof SsoCloud.SamlRelayState
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SamlRelayState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SamlRelayState";
        };

        return SamlRelayState;
    })();

    SsoCloud.SsoCloudMigrationStatusRequest = (function() {

        /**
         * Properties of a SsoCloudMigrationStatusRequest.
         * @memberof SsoCloud
         * @interface ISsoCloudMigrationStatusRequest
         * @property {number|null} [nodeId] SsoCloudMigrationStatusRequest nodeId
         * @property {boolean|null} [fullStatus] SsoCloudMigrationStatusRequest fullStatus
         * @property {boolean|null} [includeMigratedUsers] SsoCloudMigrationStatusRequest includeMigratedUsers
         * @property {number|null} [limit] SsoCloudMigrationStatusRequest limit
         */

        /**
         * Constructs a new SsoCloudMigrationStatusRequest.
         * @memberof SsoCloud
         * @classdesc This is used when migrating from SSO Connect to SSO Connect Cloud.
         * This retrieves the current status of the migration.
         * 
         * If fullStatus == false but limit == 0, a default limit (probably 25) will be used.
         * 
         * Example 1: (nodeId=123, fullStatus=true,  includeMigratedUsers=true,  limit=any).  ALL users, migrated and unmigrated, will be returned.
         * Example 2: (nodeId=123, fullStatus=true,  includeMigratedUsers=false, limit=any).  ALL unmigrated users will be returned.
         * Example 3: (nodeId=123, fullStatus=false, includeMigratedUsers=true,  limit=-1).   No users will be returned
         * Example 4: (nodeId=123, fullStatus=false, includeMigratedUsers=true,  limit=0).    The first 25 users of each type, migrated and unmigrated, will be returned.
         * Example 5: (nodeId=123, fullStatus=false, includeMigratedUsers=false, limit=0).    The first 25 unmigrated users will be returned.
         * Example 6: (nodeId=123, fullStatus=false, includeMigratedUsers=false, limit=15).   The first 15 unmigrated users will be returned.
         * Example 7: (nodeId=123, fullStatus=false, includeMigratedUsers=false, limit=-1).   Just stats will be returned, no users will be returned.
         * 
         * @see SsoCloudMigrationStatusResponse
         * @since MH: 2022-01-11
         * @implements ISsoCloudMigrationStatusRequest
         * @constructor
         * @param {SsoCloud.ISsoCloudMigrationStatusRequest=} [properties] Properties to set
         */
        function SsoCloudMigrationStatusRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudMigrationStatusRequest nodeId.
         * @member {number} nodeId
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @instance
         */
        SsoCloudMigrationStatusRequest.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudMigrationStatusRequest fullStatus.
         * @member {boolean} fullStatus
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @instance
         */
        SsoCloudMigrationStatusRequest.prototype.fullStatus = false;

        /**
         * SsoCloudMigrationStatusRequest includeMigratedUsers.
         * @member {boolean} includeMigratedUsers
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @instance
         */
        SsoCloudMigrationStatusRequest.prototype.includeMigratedUsers = false;

        /**
         * SsoCloudMigrationStatusRequest limit.
         * @member {number} limit
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @instance
         */
        SsoCloudMigrationStatusRequest.prototype.limit = 0;

        /**
         * Creates a new SsoCloudMigrationStatusRequest instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @static
         * @param {SsoCloud.ISsoCloudMigrationStatusRequest=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudMigrationStatusRequest} SsoCloudMigrationStatusRequest instance
         */
        SsoCloudMigrationStatusRequest.create = function create(properties) {
            return new SsoCloudMigrationStatusRequest(properties);
        };

        /**
         * Encodes the specified SsoCloudMigrationStatusRequest message. Does not implicitly {@link SsoCloud.SsoCloudMigrationStatusRequest.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @static
         * @param {SsoCloud.ISsoCloudMigrationStatusRequest} message SsoCloudMigrationStatusRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudMigrationStatusRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.nodeId);
            if (message.fullStatus != null && Object.hasOwnProperty.call(message, "fullStatus"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.fullStatus);
            if (message.includeMigratedUsers != null && Object.hasOwnProperty.call(message, "includeMigratedUsers"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.includeMigratedUsers);
            if (message.limit != null && Object.hasOwnProperty.call(message, "limit"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.limit);
            return writer;
        };

        /**
         * Decodes a SsoCloudMigrationStatusRequest message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudMigrationStatusRequest} SsoCloudMigrationStatusRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudMigrationStatusRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudMigrationStatusRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.nodeId = reader.uint64();
                        break;
                    }
                case 2: {
                        message.fullStatus = reader.bool();
                        break;
                    }
                case 3: {
                        message.includeMigratedUsers = reader.bool();
                        break;
                    }
                case 4: {
                        message.limit = reader.int32();
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
         * Creates a SsoCloudMigrationStatusRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudMigrationStatusRequest} SsoCloudMigrationStatusRequest
         */
        SsoCloudMigrationStatusRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudMigrationStatusRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudMigrationStatusRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudMigrationStatusRequest();
            if (object.nodeId != null)
                if ($util.Long)
                    message.nodeId = $util.Long.fromValue(object.nodeId, true);
                else if (typeof object.nodeId === "string")
                    message.nodeId = parseInt(object.nodeId, 10);
                else if (typeof object.nodeId === "number")
                    message.nodeId = object.nodeId;
                else if (typeof object.nodeId === "object")
                    message.nodeId = new $util.LongBits(object.nodeId.low >>> 0, object.nodeId.high >>> 0).toNumber(true);
            if (object.fullStatus != null)
                message.fullStatus = Boolean(object.fullStatus);
            if (object.includeMigratedUsers != null)
                message.includeMigratedUsers = Boolean(object.includeMigratedUsers);
            if (object.limit != null)
                message.limit = object.limit | 0;
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudMigrationStatusRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @static
         * @param {SsoCloud.SsoCloudMigrationStatusRequest} message SsoCloudMigrationStatusRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudMigrationStatusRequest.toObject = function toObject(message, options, q) {
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
                    object.nodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.nodeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.fullStatus = false;
                object.includeMigratedUsers = false;
                object.limit = 0;
            }
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nodeId = typeof message.nodeId === "number" ? BigInt(message.nodeId) : $util.Long.fromBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0, true).toBigInt();
                else if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber(true) : message.nodeId;
            if (message.fullStatus != null && Object.hasOwnProperty.call(message, "fullStatus"))
                object.fullStatus = message.fullStatus;
            if (message.includeMigratedUsers != null && Object.hasOwnProperty.call(message, "includeMigratedUsers"))
                object.includeMigratedUsers = message.includeMigratedUsers;
            if (message.limit != null && Object.hasOwnProperty.call(message, "limit"))
                object.limit = message.limit;
            return object;
        };

        /**
         * Converts this SsoCloudMigrationStatusRequest to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudMigrationStatusRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudMigrationStatusRequest
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudMigrationStatusRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudMigrationStatusRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudMigrationStatusRequest";
        };

        return SsoCloudMigrationStatusRequest;
    })();

    SsoCloud.SsoCloudMigrationStatusResponse = (function() {

        /**
         * Properties of a SsoCloudMigrationStatusResponse.
         * @memberof SsoCloud
         * @interface ISsoCloudMigrationStatusResponse
         * @property {boolean|null} [success] SsoCloudMigrationStatusResponse success
         * @property {string|null} [message] SsoCloudMigrationStatusResponse message
         * @property {number|null} [nodeId] SsoCloudMigrationStatusResponse nodeId
         * @property {number|null} [ssoConnectId] SsoCloudMigrationStatusResponse ssoConnectId
         * @property {string|null} [ssoConnectName] SsoCloudMigrationStatusResponse ssoConnectName
         * @property {number|null} [ssoConnectCloudId] SsoCloudMigrationStatusResponse ssoConnectCloudId
         * @property {string|null} [ssoConnectCloudName] SsoCloudMigrationStatusResponse ssoConnectCloudName
         * @property {number|null} [totalUsersCount] SsoCloudMigrationStatusResponse totalUsersCount
         * @property {number|null} [usersMigratedCount] SsoCloudMigrationStatusResponse usersMigratedCount
         * @property {Array.<SsoCloud.ISsoCloudMigrationUserInfo>|null} [migratedUsers] SsoCloudMigrationStatusResponse migratedUsers
         * @property {Array.<SsoCloud.ISsoCloudMigrationUserInfo>|null} [unmigratedUsers] SsoCloudMigrationStatusResponse unmigratedUsers
         */

        /**
         * Constructs a new SsoCloudMigrationStatusResponse.
         * @memberof SsoCloud
         * @classdesc Returns the status of an SSO Connect migration in progress.
         * If there is an error, success will be false and message will contain an error message.
         * User records will be sorted by last name.
         * 
         * @see SsoCloudMigrationStatusRequest
         * @since MH: 2022-01-11
         * @implements ISsoCloudMigrationStatusResponse
         * @constructor
         * @param {SsoCloud.ISsoCloudMigrationStatusResponse=} [properties] Properties to set
         */
        function SsoCloudMigrationStatusResponse(properties) {
            this.migratedUsers = [];
            this.unmigratedUsers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudMigrationStatusResponse success.
         * @member {boolean} success
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.success = false;

        /**
         * SsoCloudMigrationStatusResponse message.
         * @member {string} message
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.message = "";

        /**
         * SsoCloudMigrationStatusResponse nodeId.
         * @member {number} nodeId
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.nodeId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudMigrationStatusResponse ssoConnectId.
         * @member {number} ssoConnectId
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.ssoConnectId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudMigrationStatusResponse ssoConnectName.
         * @member {string} ssoConnectName
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.ssoConnectName = "";

        /**
         * SsoCloudMigrationStatusResponse ssoConnectCloudId.
         * @member {number} ssoConnectCloudId
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.ssoConnectCloudId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * SsoCloudMigrationStatusResponse ssoConnectCloudName.
         * @member {string} ssoConnectCloudName
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.ssoConnectCloudName = "";

        /**
         * SsoCloudMigrationStatusResponse totalUsersCount.
         * @member {number} totalUsersCount
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.totalUsersCount = 0;

        /**
         * SsoCloudMigrationStatusResponse usersMigratedCount.
         * @member {number} usersMigratedCount
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.usersMigratedCount = 0;

        /**
         * SsoCloudMigrationStatusResponse migratedUsers.
         * @member {Array.<SsoCloud.ISsoCloudMigrationUserInfo>} migratedUsers
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.migratedUsers = $util.emptyArray;

        /**
         * SsoCloudMigrationStatusResponse unmigratedUsers.
         * @member {Array.<SsoCloud.ISsoCloudMigrationUserInfo>} unmigratedUsers
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         */
        SsoCloudMigrationStatusResponse.prototype.unmigratedUsers = $util.emptyArray;

        /**
         * Creates a new SsoCloudMigrationStatusResponse instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @static
         * @param {SsoCloud.ISsoCloudMigrationStatusResponse=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudMigrationStatusResponse} SsoCloudMigrationStatusResponse instance
         */
        SsoCloudMigrationStatusResponse.create = function create(properties) {
            return new SsoCloudMigrationStatusResponse(properties);
        };

        /**
         * Encodes the specified SsoCloudMigrationStatusResponse message. Does not implicitly {@link SsoCloud.SsoCloudMigrationStatusResponse.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @static
         * @param {SsoCloud.ISsoCloudMigrationStatusResponse} message SsoCloudMigrationStatusResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudMigrationStatusResponse.encode = function encode(message, writer, q) {
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
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.nodeId);
            if (message.ssoConnectId != null && Object.hasOwnProperty.call(message, "ssoConnectId"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.ssoConnectId);
            if (message.ssoConnectName != null && Object.hasOwnProperty.call(message, "ssoConnectName"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.ssoConnectName);
            if (message.ssoConnectCloudId != null && Object.hasOwnProperty.call(message, "ssoConnectCloudId"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.ssoConnectCloudId);
            if (message.ssoConnectCloudName != null && Object.hasOwnProperty.call(message, "ssoConnectCloudName"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.ssoConnectCloudName);
            if (message.totalUsersCount != null && Object.hasOwnProperty.call(message, "totalUsersCount"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.totalUsersCount);
            if (message.usersMigratedCount != null && Object.hasOwnProperty.call(message, "usersMigratedCount"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.usersMigratedCount);
            if (message.migratedUsers != null && message.migratedUsers.length)
                for (let i = 0; i < message.migratedUsers.length; ++i)
                    $root.SsoCloud.SsoCloudMigrationUserInfo.encode(message.migratedUsers[i], writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
            if (message.unmigratedUsers != null && message.unmigratedUsers.length)
                for (let i = 0; i < message.unmigratedUsers.length; ++i)
                    $root.SsoCloud.SsoCloudMigrationUserInfo.encode(message.unmigratedUsers[i], writer.uint32(/* id 11, wireType 2 =*/90).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a SsoCloudMigrationStatusResponse message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudMigrationStatusResponse} SsoCloudMigrationStatusResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudMigrationStatusResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudMigrationStatusResponse();
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
                        message.nodeId = reader.uint64();
                        break;
                    }
                case 4: {
                        message.ssoConnectId = reader.uint64();
                        break;
                    }
                case 5: {
                        message.ssoConnectName = reader.string();
                        break;
                    }
                case 6: {
                        message.ssoConnectCloudId = reader.uint64();
                        break;
                    }
                case 7: {
                        message.ssoConnectCloudName = reader.string();
                        break;
                    }
                case 8: {
                        message.totalUsersCount = reader.uint32();
                        break;
                    }
                case 9: {
                        message.usersMigratedCount = reader.uint32();
                        break;
                    }
                case 10: {
                        if (!(message.migratedUsers && message.migratedUsers.length))
                            message.migratedUsers = [];
                        message.migratedUsers.push($root.SsoCloud.SsoCloudMigrationUserInfo.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 11: {
                        if (!(message.unmigratedUsers && message.unmigratedUsers.length))
                            message.unmigratedUsers = [];
                        message.unmigratedUsers.push($root.SsoCloud.SsoCloudMigrationUserInfo.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a SsoCloudMigrationStatusResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudMigrationStatusResponse} SsoCloudMigrationStatusResponse
         */
        SsoCloudMigrationStatusResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudMigrationStatusResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudMigrationStatusResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudMigrationStatusResponse();
            if (object.success != null)
                message.success = Boolean(object.success);
            if (object.message != null)
                message.message = String(object.message);
            if (object.nodeId != null)
                if ($util.Long)
                    message.nodeId = $util.Long.fromValue(object.nodeId, true);
                else if (typeof object.nodeId === "string")
                    message.nodeId = parseInt(object.nodeId, 10);
                else if (typeof object.nodeId === "number")
                    message.nodeId = object.nodeId;
                else if (typeof object.nodeId === "object")
                    message.nodeId = new $util.LongBits(object.nodeId.low >>> 0, object.nodeId.high >>> 0).toNumber(true);
            if (object.ssoConnectId != null)
                if ($util.Long)
                    message.ssoConnectId = $util.Long.fromValue(object.ssoConnectId, true);
                else if (typeof object.ssoConnectId === "string")
                    message.ssoConnectId = parseInt(object.ssoConnectId, 10);
                else if (typeof object.ssoConnectId === "number")
                    message.ssoConnectId = object.ssoConnectId;
                else if (typeof object.ssoConnectId === "object")
                    message.ssoConnectId = new $util.LongBits(object.ssoConnectId.low >>> 0, object.ssoConnectId.high >>> 0).toNumber(true);
            if (object.ssoConnectName != null)
                message.ssoConnectName = String(object.ssoConnectName);
            if (object.ssoConnectCloudId != null)
                if ($util.Long)
                    message.ssoConnectCloudId = $util.Long.fromValue(object.ssoConnectCloudId, true);
                else if (typeof object.ssoConnectCloudId === "string")
                    message.ssoConnectCloudId = parseInt(object.ssoConnectCloudId, 10);
                else if (typeof object.ssoConnectCloudId === "number")
                    message.ssoConnectCloudId = object.ssoConnectCloudId;
                else if (typeof object.ssoConnectCloudId === "object")
                    message.ssoConnectCloudId = new $util.LongBits(object.ssoConnectCloudId.low >>> 0, object.ssoConnectCloudId.high >>> 0).toNumber(true);
            if (object.ssoConnectCloudName != null)
                message.ssoConnectCloudName = String(object.ssoConnectCloudName);
            if (object.totalUsersCount != null)
                message.totalUsersCount = object.totalUsersCount >>> 0;
            if (object.usersMigratedCount != null)
                message.usersMigratedCount = object.usersMigratedCount >>> 0;
            if (object.migratedUsers) {
                if (!Array.isArray(object.migratedUsers))
                    throw TypeError(".SsoCloud.SsoCloudMigrationStatusResponse.migratedUsers: array expected");
                message.migratedUsers = [];
                for (let i = 0; i < object.migratedUsers.length; ++i) {
                    if (!$util.isObject(object.migratedUsers[i]))
                        throw TypeError(".SsoCloud.SsoCloudMigrationStatusResponse.migratedUsers: object expected");
                    message.migratedUsers[i] = $root.SsoCloud.SsoCloudMigrationUserInfo.fromObject(object.migratedUsers[i], long + 1);
                }
            }
            if (object.unmigratedUsers) {
                if (!Array.isArray(object.unmigratedUsers))
                    throw TypeError(".SsoCloud.SsoCloudMigrationStatusResponse.unmigratedUsers: array expected");
                message.unmigratedUsers = [];
                for (let i = 0; i < object.unmigratedUsers.length; ++i) {
                    if (!$util.isObject(object.unmigratedUsers[i]))
                        throw TypeError(".SsoCloud.SsoCloudMigrationStatusResponse.unmigratedUsers: object expected");
                    message.unmigratedUsers[i] = $root.SsoCloud.SsoCloudMigrationUserInfo.fromObject(object.unmigratedUsers[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudMigrationStatusResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @static
         * @param {SsoCloud.SsoCloudMigrationStatusResponse} message SsoCloudMigrationStatusResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudMigrationStatusResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.migratedUsers = [];
                object.unmigratedUsers = [];
            }
            if (options.defaults) {
                object.success = false;
                object.message = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.nodeId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.nodeId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoConnectId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoConnectId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.ssoConnectName = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.ssoConnectCloudId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.ssoConnectCloudId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.ssoConnectCloudName = "";
                object.totalUsersCount = 0;
                object.usersMigratedCount = 0;
            }
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                object.success = message.success;
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                object.message = message.message;
            if (message.nodeId != null && Object.hasOwnProperty.call(message, "nodeId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.nodeId = typeof message.nodeId === "number" ? BigInt(message.nodeId) : $util.Long.fromBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0, true).toBigInt();
                else if (typeof message.nodeId === "number")
                    object.nodeId = options.longs === String ? String(message.nodeId) : message.nodeId;
                else
                    object.nodeId = options.longs === String ? $util.Long.prototype.toString.call(message.nodeId) : options.longs === Number ? new $util.LongBits(message.nodeId.low >>> 0, message.nodeId.high >>> 0).toNumber(true) : message.nodeId;
            if (message.ssoConnectId != null && Object.hasOwnProperty.call(message, "ssoConnectId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoConnectId = typeof message.ssoConnectId === "number" ? BigInt(message.ssoConnectId) : $util.Long.fromBits(message.ssoConnectId.low >>> 0, message.ssoConnectId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoConnectId === "number")
                    object.ssoConnectId = options.longs === String ? String(message.ssoConnectId) : message.ssoConnectId;
                else
                    object.ssoConnectId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoConnectId) : options.longs === Number ? new $util.LongBits(message.ssoConnectId.low >>> 0, message.ssoConnectId.high >>> 0).toNumber(true) : message.ssoConnectId;
            if (message.ssoConnectName != null && Object.hasOwnProperty.call(message, "ssoConnectName"))
                object.ssoConnectName = message.ssoConnectName;
            if (message.ssoConnectCloudId != null && Object.hasOwnProperty.call(message, "ssoConnectCloudId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.ssoConnectCloudId = typeof message.ssoConnectCloudId === "number" ? BigInt(message.ssoConnectCloudId) : $util.Long.fromBits(message.ssoConnectCloudId.low >>> 0, message.ssoConnectCloudId.high >>> 0, true).toBigInt();
                else if (typeof message.ssoConnectCloudId === "number")
                    object.ssoConnectCloudId = options.longs === String ? String(message.ssoConnectCloudId) : message.ssoConnectCloudId;
                else
                    object.ssoConnectCloudId = options.longs === String ? $util.Long.prototype.toString.call(message.ssoConnectCloudId) : options.longs === Number ? new $util.LongBits(message.ssoConnectCloudId.low >>> 0, message.ssoConnectCloudId.high >>> 0).toNumber(true) : message.ssoConnectCloudId;
            if (message.ssoConnectCloudName != null && Object.hasOwnProperty.call(message, "ssoConnectCloudName"))
                object.ssoConnectCloudName = message.ssoConnectCloudName;
            if (message.totalUsersCount != null && Object.hasOwnProperty.call(message, "totalUsersCount"))
                object.totalUsersCount = message.totalUsersCount;
            if (message.usersMigratedCount != null && Object.hasOwnProperty.call(message, "usersMigratedCount"))
                object.usersMigratedCount = message.usersMigratedCount;
            if (message.migratedUsers && message.migratedUsers.length) {
                object.migratedUsers = [];
                for (let j = 0; j < message.migratedUsers.length; ++j)
                    object.migratedUsers[j] = $root.SsoCloud.SsoCloudMigrationUserInfo.toObject(message.migratedUsers[j], options, q + 1);
            }
            if (message.unmigratedUsers && message.unmigratedUsers.length) {
                object.unmigratedUsers = [];
                for (let j = 0; j < message.unmigratedUsers.length; ++j)
                    object.unmigratedUsers[j] = $root.SsoCloud.SsoCloudMigrationUserInfo.toObject(message.unmigratedUsers[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this SsoCloudMigrationStatusResponse to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudMigrationStatusResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudMigrationStatusResponse
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudMigrationStatusResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudMigrationStatusResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudMigrationStatusResponse";
        };

        return SsoCloudMigrationStatusResponse;
    })();

    SsoCloud.SsoCloudMigrationUserInfo = (function() {

        /**
         * Properties of a SsoCloudMigrationUserInfo.
         * @memberof SsoCloud
         * @interface ISsoCloudMigrationUserInfo
         * @property {number|null} [userId] SsoCloudMigrationUserInfo userId
         * @property {string|null} [email] SsoCloudMigrationUserInfo email
         * @property {string|null} [fullName] SsoCloudMigrationUserInfo fullName
         * @property {boolean|null} [isMigrated] SsoCloudMigrationUserInfo isMigrated
         */

        /**
         * Constructs a new SsoCloudMigrationUserInfo.
         * @memberof SsoCloud
         * @classdesc @since MH: 2022-01-11
         * @implements ISsoCloudMigrationUserInfo
         * @constructor
         * @param {SsoCloud.ISsoCloudMigrationUserInfo=} [properties] Properties to set
         */
        function SsoCloudMigrationUserInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SsoCloudMigrationUserInfo userId.
         * @member {number} userId
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @instance
         */
        SsoCloudMigrationUserInfo.prototype.userId = 0;

        /**
         * SsoCloudMigrationUserInfo email.
         * @member {string} email
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @instance
         */
        SsoCloudMigrationUserInfo.prototype.email = "";

        /**
         * SsoCloudMigrationUserInfo fullName.
         * @member {string} fullName
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @instance
         */
        SsoCloudMigrationUserInfo.prototype.fullName = "";

        /**
         * SsoCloudMigrationUserInfo isMigrated.
         * @member {boolean} isMigrated
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @instance
         */
        SsoCloudMigrationUserInfo.prototype.isMigrated = false;

        /**
         * Creates a new SsoCloudMigrationUserInfo instance using the specified properties.
         * @function create
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @static
         * @param {SsoCloud.ISsoCloudMigrationUserInfo=} [properties] Properties to set
         * @returns {SsoCloud.SsoCloudMigrationUserInfo} SsoCloudMigrationUserInfo instance
         */
        SsoCloudMigrationUserInfo.create = function create(properties) {
            return new SsoCloudMigrationUserInfo(properties);
        };

        /**
         * Encodes the specified SsoCloudMigrationUserInfo message. Does not implicitly {@link SsoCloud.SsoCloudMigrationUserInfo.verify|verify} messages.
         * @function encode
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @static
         * @param {SsoCloud.ISsoCloudMigrationUserInfo} message SsoCloudMigrationUserInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SsoCloudMigrationUserInfo.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.userId);
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.email);
            if (message.fullName != null && Object.hasOwnProperty.call(message, "fullName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.fullName);
            if (message.isMigrated != null && Object.hasOwnProperty.call(message, "isMigrated"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isMigrated);
            return writer;
        };

        /**
         * Decodes a SsoCloudMigrationUserInfo message from the specified reader or buffer.
         * @function decode
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SsoCloud.SsoCloudMigrationUserInfo} SsoCloudMigrationUserInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SsoCloudMigrationUserInfo.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SsoCloud.SsoCloudMigrationUserInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.uint32();
                        break;
                    }
                case 2: {
                        message.email = reader.string();
                        break;
                    }
                case 3: {
                        message.fullName = reader.string();
                        break;
                    }
                case 4: {
                        message.isMigrated = reader.bool();
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
         * Creates a SsoCloudMigrationUserInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SsoCloud.SsoCloudMigrationUserInfo} SsoCloudMigrationUserInfo
         */
        SsoCloudMigrationUserInfo.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SsoCloud.SsoCloudMigrationUserInfo)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SsoCloud.SsoCloudMigrationUserInfo: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SsoCloud.SsoCloudMigrationUserInfo();
            if (object.userId != null)
                message.userId = object.userId >>> 0;
            if (object.email != null)
                message.email = String(object.email);
            if (object.fullName != null)
                message.fullName = String(object.fullName);
            if (object.isMigrated != null)
                message.isMigrated = Boolean(object.isMigrated);
            return message;
        };

        /**
         * Creates a plain object from a SsoCloudMigrationUserInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @static
         * @param {SsoCloud.SsoCloudMigrationUserInfo} message SsoCloudMigrationUserInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SsoCloudMigrationUserInfo.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.userId = 0;
                object.email = "";
                object.fullName = "";
                object.isMigrated = false;
            }
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                object.userId = message.userId;
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                object.email = message.email;
            if (message.fullName != null && Object.hasOwnProperty.call(message, "fullName"))
                object.fullName = message.fullName;
            if (message.isMigrated != null && Object.hasOwnProperty.call(message, "isMigrated"))
                object.isMigrated = message.isMigrated;
            return object;
        };

        /**
         * Converts this SsoCloudMigrationUserInfo to JSON.
         * @function toJSON
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SsoCloudMigrationUserInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SsoCloudMigrationUserInfo
         * @function getTypeUrl
         * @memberof SsoCloud.SsoCloudMigrationUserInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SsoCloudMigrationUserInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SsoCloud.SsoCloudMigrationUserInfo";
        };

        return SsoCloudMigrationUserInfo;
    })();

    return SsoCloud;
})();

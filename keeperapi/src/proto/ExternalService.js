/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const ExternalService = $root.ExternalService = (() => {

    /**
     * Namespace ExternalService.
     * @exports ExternalService
     * @namespace
     */
    const ExternalService = {};

    ExternalService.SaveSettingsRequest = (function() {

        /**
         * Properties of a SaveSettingsRequest.
         * @memberof ExternalService
         * @interface ISaveSettingsRequest
         * @property {number|null} [enterpriseId] SaveSettingsRequest enterpriseId
         * @property {Uint8Array|null} [certificate] SaveSettingsRequest certificate
         * @property {string|null} [password] SaveSettingsRequest password
         * @property {string|null} [directoryUrl] SaveSettingsRequest directoryUrl
         */

        /**
         * Constructs a new SaveSettingsRequest.
         * @memberof ExternalService
         * @classdesc Represents a SaveSettingsRequest.
         * @implements ISaveSettingsRequest
         * @constructor
         * @param {ExternalService.ISaveSettingsRequest=} [properties] Properties to set
         */
        function SaveSettingsRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SaveSettingsRequest enterpriseId.
         * @member {number} enterpriseId
         * @memberof ExternalService.SaveSettingsRequest
         * @instance
         */
        SaveSettingsRequest.prototype.enterpriseId = 0;

        /**
         * SaveSettingsRequest certificate.
         * @member {Uint8Array} certificate
         * @memberof ExternalService.SaveSettingsRequest
         * @instance
         */
        SaveSettingsRequest.prototype.certificate = $util.newBuffer([]);

        /**
         * SaveSettingsRequest password.
         * @member {string} password
         * @memberof ExternalService.SaveSettingsRequest
         * @instance
         */
        SaveSettingsRequest.prototype.password = "";

        /**
         * SaveSettingsRequest directoryUrl.
         * @member {string} directoryUrl
         * @memberof ExternalService.SaveSettingsRequest
         * @instance
         */
        SaveSettingsRequest.prototype.directoryUrl = "";

        /**
         * Creates a new SaveSettingsRequest instance using the specified properties.
         * @function create
         * @memberof ExternalService.SaveSettingsRequest
         * @static
         * @param {ExternalService.ISaveSettingsRequest=} [properties] Properties to set
         * @returns {ExternalService.SaveSettingsRequest} SaveSettingsRequest instance
         */
        SaveSettingsRequest.create = function create(properties) {
            return new SaveSettingsRequest(properties);
        };

        /**
         * Encodes the specified SaveSettingsRequest message. Does not implicitly {@link ExternalService.SaveSettingsRequest.verify|verify} messages.
         * @function encode
         * @memberof ExternalService.SaveSettingsRequest
         * @static
         * @param {ExternalService.ISaveSettingsRequest} message SaveSettingsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SaveSettingsRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.enterpriseId);
            if (message.certificate != null && Object.hasOwnProperty.call(message, "certificate"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.certificate);
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.password);
            if (message.directoryUrl != null && Object.hasOwnProperty.call(message, "directoryUrl"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.directoryUrl);
            return writer;
        };

        /**
         * Encodes the specified SaveSettingsRequest message, length delimited. Does not implicitly {@link ExternalService.SaveSettingsRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ExternalService.SaveSettingsRequest
         * @static
         * @param {ExternalService.ISaveSettingsRequest} message SaveSettingsRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SaveSettingsRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a SaveSettingsRequest message from the specified reader or buffer.
         * @function decode
         * @memberof ExternalService.SaveSettingsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ExternalService.SaveSettingsRequest} SaveSettingsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SaveSettingsRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ExternalService.SaveSettingsRequest();
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
                        message.certificate = reader.bytes();
                        break;
                    }
                case 3: {
                        message.password = reader.string();
                        break;
                    }
                case 4: {
                        message.directoryUrl = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SaveSettingsRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ExternalService.SaveSettingsRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ExternalService.SaveSettingsRequest} SaveSettingsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SaveSettingsRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SaveSettingsRequest message.
         * @function verify
         * @memberof ExternalService.SaveSettingsRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SaveSettingsRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                if (!$util.isInteger(message.enterpriseId))
                    return "enterpriseId: integer expected";
            if (message.certificate != null && Object.hasOwnProperty.call(message, "certificate"))
                if (!(message.certificate && typeof message.certificate.length === "number" || $util.isString(message.certificate)))
                    return "certificate: buffer expected";
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                if (!$util.isString(message.password))
                    return "password: string expected";
            if (message.directoryUrl != null && Object.hasOwnProperty.call(message, "directoryUrl"))
                if (!$util.isString(message.directoryUrl))
                    return "directoryUrl: string expected";
            return null;
        };

        /**
         * Creates a SaveSettingsRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ExternalService.SaveSettingsRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ExternalService.SaveSettingsRequest} SaveSettingsRequest
         */
        SaveSettingsRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ExternalService.SaveSettingsRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ExternalService.SaveSettingsRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ExternalService.SaveSettingsRequest();
            if (object.enterpriseId != null)
                message.enterpriseId = object.enterpriseId | 0;
            if (object.certificate != null)
                if (typeof object.certificate === "string")
                    $util.base64.decode(object.certificate, message.certificate = $util.newBuffer($util.base64.length(object.certificate)), 0);
                else if (object.certificate.length >= 0)
                    message.certificate = object.certificate;
            if (object.password != null)
                message.password = String(object.password);
            if (object.directoryUrl != null)
                message.directoryUrl = String(object.directoryUrl);
            return message;
        };

        /**
         * Creates a plain object from a SaveSettingsRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ExternalService.SaveSettingsRequest
         * @static
         * @param {ExternalService.SaveSettingsRequest} message SaveSettingsRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SaveSettingsRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.enterpriseId = 0;
                if (options.bytes === String)
                    object.certificate = "";
                else {
                    object.certificate = [];
                    if (options.bytes !== Array)
                        object.certificate = $util.newBuffer(object.certificate);
                }
                object.password = "";
                object.directoryUrl = "";
            }
            if (message.enterpriseId != null && Object.hasOwnProperty.call(message, "enterpriseId"))
                object.enterpriseId = message.enterpriseId;
            if (message.certificate != null && Object.hasOwnProperty.call(message, "certificate"))
                object.certificate = options.bytes === String ? $util.base64.encode(message.certificate, 0, message.certificate.length) : options.bytes === Array ? Array.prototype.slice.call(message.certificate) : message.certificate;
            if (message.password != null && Object.hasOwnProperty.call(message, "password"))
                object.password = message.password;
            if (message.directoryUrl != null && Object.hasOwnProperty.call(message, "directoryUrl"))
                object.directoryUrl = message.directoryUrl;
            return object;
        };

        /**
         * Converts this SaveSettingsRequest to JSON.
         * @function toJSON
         * @memberof ExternalService.SaveSettingsRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SaveSettingsRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SaveSettingsRequest
         * @function getTypeUrl
         * @memberof ExternalService.SaveSettingsRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SaveSettingsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ExternalService.SaveSettingsRequest";
        };

        return SaveSettingsRequest;
    })();

    ExternalService.GetUsersRequest = (function() {

        /**
         * Properties of a GetUsersRequest.
         * @memberof ExternalService
         * @interface IGetUsersRequest
         * @property {string|null} [field] GetUsersRequest field
         * @property {string|null} [value] GetUsersRequest value
         */

        /**
         * Constructs a new GetUsersRequest.
         * @memberof ExternalService
         * @classdesc Represents a GetUsersRequest.
         * @implements IGetUsersRequest
         * @constructor
         * @param {ExternalService.IGetUsersRequest=} [properties] Properties to set
         */
        function GetUsersRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetUsersRequest field.
         * @member {string} field
         * @memberof ExternalService.GetUsersRequest
         * @instance
         */
        GetUsersRequest.prototype.field = "";

        /**
         * GetUsersRequest value.
         * @member {string} value
         * @memberof ExternalService.GetUsersRequest
         * @instance
         */
        GetUsersRequest.prototype.value = "";

        /**
         * Creates a new GetUsersRequest instance using the specified properties.
         * @function create
         * @memberof ExternalService.GetUsersRequest
         * @static
         * @param {ExternalService.IGetUsersRequest=} [properties] Properties to set
         * @returns {ExternalService.GetUsersRequest} GetUsersRequest instance
         */
        GetUsersRequest.create = function create(properties) {
            return new GetUsersRequest(properties);
        };

        /**
         * Encodes the specified GetUsersRequest message. Does not implicitly {@link ExternalService.GetUsersRequest.verify|verify} messages.
         * @function encode
         * @memberof ExternalService.GetUsersRequest
         * @static
         * @param {ExternalService.IGetUsersRequest} message GetUsersRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetUsersRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.field != null && Object.hasOwnProperty.call(message, "field"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.field);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
            return writer;
        };

        /**
         * Encodes the specified GetUsersRequest message, length delimited. Does not implicitly {@link ExternalService.GetUsersRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ExternalService.GetUsersRequest
         * @static
         * @param {ExternalService.IGetUsersRequest} message GetUsersRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetUsersRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a GetUsersRequest message from the specified reader or buffer.
         * @function decode
         * @memberof ExternalService.GetUsersRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ExternalService.GetUsersRequest} GetUsersRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetUsersRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ExternalService.GetUsersRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.field = reader.string();
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
         * Decodes a GetUsersRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ExternalService.GetUsersRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ExternalService.GetUsersRequest} GetUsersRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetUsersRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetUsersRequest message.
         * @function verify
         * @memberof ExternalService.GetUsersRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetUsersRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.field != null && Object.hasOwnProperty.call(message, "field"))
                if (!$util.isString(message.field))
                    return "field: string expected";
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates a GetUsersRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ExternalService.GetUsersRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ExternalService.GetUsersRequest} GetUsersRequest
         */
        GetUsersRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ExternalService.GetUsersRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ExternalService.GetUsersRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ExternalService.GetUsersRequest();
            if (object.field != null)
                message.field = String(object.field);
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from a GetUsersRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ExternalService.GetUsersRequest
         * @static
         * @param {ExternalService.GetUsersRequest} message GetUsersRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetUsersRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.field = "";
                object.value = "";
            }
            if (message.field != null && Object.hasOwnProperty.call(message, "field"))
                object.field = message.field;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this GetUsersRequest to JSON.
         * @function toJSON
         * @memberof ExternalService.GetUsersRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetUsersRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetUsersRequest
         * @function getTypeUrl
         * @memberof ExternalService.GetUsersRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetUsersRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ExternalService.GetUsersRequest";
        };

        return GetUsersRequest;
    })();

    /**
     * UserStatus enum.
     * @name ExternalService.UserStatus
     * @enum {number}
     * @property {number} NEW=0 NEW value
     * @property {number} INVITED=1 INVITED value
     * @property {number} ACTIVE=2 ACTIVE value
     * @property {number} TAKEN=3 TAKEN value
     */
    ExternalService.UserStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "NEW"] = 0;
        values[valuesById[1] = "INVITED"] = 1;
        values[valuesById[2] = "ACTIVE"] = 2;
        values[valuesById[3] = "TAKEN"] = 3;
        return values;
    })();

    /**
     * LockStatus enum.
     * @name ExternalService.LockStatus
     * @enum {number}
     * @property {number} UNLOCKED=0 UNLOCKED value
     * @property {number} LOCKED=1 LOCKED value
     * @property {number} DISABLED=2 DISABLED value
     */
    ExternalService.LockStatus = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "UNLOCKED"] = 0;
        values[valuesById[1] = "LOCKED"] = 1;
        values[valuesById[2] = "DISABLED"] = 2;
        return values;
    })();

    ExternalService.User = (function() {

        /**
         * Properties of a User.
         * @memberof ExternalService
         * @interface IUser
         * @property {string|null} [email] User email
         * @property {string|null} [name] User name
         * @property {ExternalService.UserStatus|null} [status] User status
         * @property {ExternalService.LockStatus|null} [lockStatus] User lockStatus
         */

        /**
         * Constructs a new User.
         * @memberof ExternalService
         * @classdesc Represents a User.
         * @implements IUser
         * @constructor
         * @param {ExternalService.IUser=} [properties] Properties to set
         */
        function User(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * User email.
         * @member {string} email
         * @memberof ExternalService.User
         * @instance
         */
        User.prototype.email = "";

        /**
         * User name.
         * @member {string} name
         * @memberof ExternalService.User
         * @instance
         */
        User.prototype.name = "";

        /**
         * User status.
         * @member {ExternalService.UserStatus} status
         * @memberof ExternalService.User
         * @instance
         */
        User.prototype.status = 0;

        /**
         * User lockStatus.
         * @member {ExternalService.LockStatus} lockStatus
         * @memberof ExternalService.User
         * @instance
         */
        User.prototype.lockStatus = 0;

        /**
         * Creates a new User instance using the specified properties.
         * @function create
         * @memberof ExternalService.User
         * @static
         * @param {ExternalService.IUser=} [properties] Properties to set
         * @returns {ExternalService.User} User instance
         */
        User.create = function create(properties) {
            return new User(properties);
        };

        /**
         * Encodes the specified User message. Does not implicitly {@link ExternalService.User.verify|verify} messages.
         * @function encode
         * @memberof ExternalService.User
         * @static
         * @param {ExternalService.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
            if (message.lockStatus != null && Object.hasOwnProperty.call(message, "lockStatus"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.lockStatus);
            return writer;
        };

        /**
         * Encodes the specified User message, length delimited. Does not implicitly {@link ExternalService.User.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ExternalService.User
         * @static
         * @param {ExternalService.IUser} message User message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        User.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a User message from the specified reader or buffer.
         * @function decode
         * @memberof ExternalService.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ExternalService.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ExternalService.User();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.email = reader.string();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
                        break;
                    }
                case 3: {
                        message.status = reader.int32();
                        break;
                    }
                case 4: {
                        message.lockStatus = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a User message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ExternalService.User
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ExternalService.User} User
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        User.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a User message.
         * @function verify
         * @memberof ExternalService.User
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        User.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
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
            if (message.lockStatus != null && Object.hasOwnProperty.call(message, "lockStatus"))
                switch (message.lockStatus) {
                default:
                    return "lockStatus: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            return null;
        };

        /**
         * Creates a User message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ExternalService.User
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ExternalService.User} User
         */
        User.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ExternalService.User)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ExternalService.User: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ExternalService.User();
            if (object.email != null)
                message.email = String(object.email);
            if (object.name != null)
                message.name = String(object.name);
            switch (object.status) {
            default:
                if (typeof object.status === "number") {
                    message.status = object.status;
                    break;
                }
                break;
            case "NEW":
            case 0:
                message.status = 0;
                break;
            case "INVITED":
            case 1:
                message.status = 1;
                break;
            case "ACTIVE":
            case 2:
                message.status = 2;
                break;
            case "TAKEN":
            case 3:
                message.status = 3;
                break;
            }
            switch (object.lockStatus) {
            default:
                if (typeof object.lockStatus === "number") {
                    message.lockStatus = object.lockStatus;
                    break;
                }
                break;
            case "UNLOCKED":
            case 0:
                message.lockStatus = 0;
                break;
            case "LOCKED":
            case 1:
                message.lockStatus = 1;
                break;
            case "DISABLED":
            case 2:
                message.lockStatus = 2;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a User message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ExternalService.User
         * @static
         * @param {ExternalService.User} message User
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        User.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.email = "";
                object.name = "";
                object.status = options.enums === String ? "NEW" : 0;
                object.lockStatus = options.enums === String ? "UNLOCKED" : 0;
            }
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                object.email = message.email;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = options.enums === String ? $root.ExternalService.UserStatus[message.status] === undefined ? message.status : $root.ExternalService.UserStatus[message.status] : message.status;
            if (message.lockStatus != null && Object.hasOwnProperty.call(message, "lockStatus"))
                object.lockStatus = options.enums === String ? $root.ExternalService.LockStatus[message.lockStatus] === undefined ? message.lockStatus : $root.ExternalService.LockStatus[message.lockStatus] : message.lockStatus;
            return object;
        };

        /**
         * Converts this User to JSON.
         * @function toJSON
         * @memberof ExternalService.User
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        User.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for User
         * @function getTypeUrl
         * @memberof ExternalService.User
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        User.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ExternalService.User";
        };

        return User;
    })();

    ExternalService.GetUsersResponse = (function() {

        /**
         * Properties of a GetUsersResponse.
         * @memberof ExternalService
         * @interface IGetUsersResponse
         * @property {Array.<ExternalService.IUser>|null} [users] GetUsersResponse users
         */

        /**
         * Constructs a new GetUsersResponse.
         * @memberof ExternalService
         * @classdesc Represents a GetUsersResponse.
         * @implements IGetUsersResponse
         * @constructor
         * @param {ExternalService.IGetUsersResponse=} [properties] Properties to set
         */
        function GetUsersResponse(properties) {
            this.users = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GetUsersResponse users.
         * @member {Array.<ExternalService.IUser>} users
         * @memberof ExternalService.GetUsersResponse
         * @instance
         */
        GetUsersResponse.prototype.users = $util.emptyArray;

        /**
         * Creates a new GetUsersResponse instance using the specified properties.
         * @function create
         * @memberof ExternalService.GetUsersResponse
         * @static
         * @param {ExternalService.IGetUsersResponse=} [properties] Properties to set
         * @returns {ExternalService.GetUsersResponse} GetUsersResponse instance
         */
        GetUsersResponse.create = function create(properties) {
            return new GetUsersResponse(properties);
        };

        /**
         * Encodes the specified GetUsersResponse message. Does not implicitly {@link ExternalService.GetUsersResponse.verify|verify} messages.
         * @function encode
         * @memberof ExternalService.GetUsersResponse
         * @static
         * @param {ExternalService.IGetUsersResponse} message GetUsersResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetUsersResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.users != null && message.users.length)
                for (let i = 0; i < message.users.length; ++i)
                    $root.ExternalService.User.encode(message.users[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GetUsersResponse message, length delimited. Does not implicitly {@link ExternalService.GetUsersResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ExternalService.GetUsersResponse
         * @static
         * @param {ExternalService.IGetUsersResponse} message GetUsersResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GetUsersResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a GetUsersResponse message from the specified reader or buffer.
         * @function decode
         * @memberof ExternalService.GetUsersResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ExternalService.GetUsersResponse} GetUsersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetUsersResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ExternalService.GetUsersResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.users && message.users.length))
                            message.users = [];
                        message.users.push($root.ExternalService.User.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GetUsersResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ExternalService.GetUsersResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ExternalService.GetUsersResponse} GetUsersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GetUsersResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GetUsersResponse message.
         * @function verify
         * @memberof ExternalService.GetUsersResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GetUsersResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.users != null && Object.hasOwnProperty.call(message, "users")) {
                if (!Array.isArray(message.users))
                    return "users: array expected";
                for (let i = 0; i < message.users.length; ++i) {
                    let error = $root.ExternalService.User.verify(message.users[i], long + 1);
                    if (error)
                        return "users." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GetUsersResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ExternalService.GetUsersResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ExternalService.GetUsersResponse} GetUsersResponse
         */
        GetUsersResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.ExternalService.GetUsersResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".ExternalService.GetUsersResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.ExternalService.GetUsersResponse();
            if (object.users) {
                if (!Array.isArray(object.users))
                    throw TypeError(".ExternalService.GetUsersResponse.users: array expected");
                message.users = [];
                for (let i = 0; i < object.users.length; ++i) {
                    if (!$util.isObject(object.users[i]))
                        throw TypeError(".ExternalService.GetUsersResponse.users: object expected");
                    message.users[i] = $root.ExternalService.User.fromObject(object.users[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GetUsersResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ExternalService.GetUsersResponse
         * @static
         * @param {ExternalService.GetUsersResponse} message GetUsersResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GetUsersResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.users = [];
            if (message.users && message.users.length) {
                object.users = [];
                for (let j = 0; j < message.users.length; ++j)
                    object.users[j] = $root.ExternalService.User.toObject(message.users[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this GetUsersResponse to JSON.
         * @function toJSON
         * @memberof ExternalService.GetUsersResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GetUsersResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GetUsersResponse
         * @function getTypeUrl
         * @memberof ExternalService.GetUsersResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GetUsersResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ExternalService.GetUsersResponse";
        };

        return GetUsersResponse;
    })();

    return ExternalService;
})();

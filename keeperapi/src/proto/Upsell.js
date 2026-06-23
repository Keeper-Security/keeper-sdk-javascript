/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const Upsell = $root.Upsell = (() => {

    /**
     * Namespace Upsell.
     * @exports Upsell
     * @namespace
     */
    const Upsell = {};

    Upsell.UpsellRequest = (function() {

        /**
         * Properties of an UpsellRequest.
         * @memberof Upsell
         * @interface IUpsellRequest
         * @property {string|null} [email] UpsellRequest email
         * @property {string|null} [locale] UpsellRequest locale
         * @property {string|null} [clientVersion] UpsellRequest clientVersion
         * @property {string|null} [sessionToken] UpsellRequest sessionToken
         */

        /**
         * Constructs a new UpsellRequest.
         * @memberof Upsell
         * @classdesc Represents an UpsellRequest.
         * @implements IUpsellRequest
         * @constructor
         * @param {Upsell.IUpsellRequest=} [properties] Properties to set
         */
        function UpsellRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpsellRequest email.
         * @member {string} email
         * @memberof Upsell.UpsellRequest
         * @instance
         */
        UpsellRequest.prototype.email = "";

        /**
         * UpsellRequest locale.
         * @member {string} locale
         * @memberof Upsell.UpsellRequest
         * @instance
         */
        UpsellRequest.prototype.locale = "";

        /**
         * UpsellRequest clientVersion.
         * @member {string} clientVersion
         * @memberof Upsell.UpsellRequest
         * @instance
         */
        UpsellRequest.prototype.clientVersion = "";

        /**
         * UpsellRequest sessionToken.
         * @member {string} sessionToken
         * @memberof Upsell.UpsellRequest
         * @instance
         */
        UpsellRequest.prototype.sessionToken = "";

        /**
         * Creates a new UpsellRequest instance using the specified properties.
         * @function create
         * @memberof Upsell.UpsellRequest
         * @static
         * @param {Upsell.IUpsellRequest=} [properties] Properties to set
         * @returns {Upsell.UpsellRequest} UpsellRequest instance
         */
        UpsellRequest.create = function create(properties) {
            return new UpsellRequest(properties);
        };

        /**
         * Encodes the specified UpsellRequest message. Does not implicitly {@link Upsell.UpsellRequest.verify|verify} messages.
         * @function encode
         * @memberof Upsell.UpsellRequest
         * @static
         * @param {Upsell.IUpsellRequest} message UpsellRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpsellRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.email);
            if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.locale);
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.clientVersion);
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.sessionToken);
            return writer;
        };

        /**
         * Encodes the specified UpsellRequest message, length delimited. Does not implicitly {@link Upsell.UpsellRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Upsell.UpsellRequest
         * @static
         * @param {Upsell.IUpsellRequest} message UpsellRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpsellRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an UpsellRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Upsell.UpsellRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Upsell.UpsellRequest} UpsellRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpsellRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Upsell.UpsellRequest();
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
                        message.locale = reader.string();
                        break;
                    }
                case 3: {
                        message.clientVersion = reader.string();
                        break;
                    }
                case 4: {
                        message.sessionToken = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpsellRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Upsell.UpsellRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Upsell.UpsellRequest} UpsellRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpsellRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpsellRequest message.
         * @function verify
         * @memberof Upsell.UpsellRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpsellRequest.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                if (!$util.isString(message.email))
                    return "email: string expected";
            if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
                if (!$util.isString(message.locale))
                    return "locale: string expected";
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                if (!$util.isString(message.clientVersion))
                    return "clientVersion: string expected";
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                if (!$util.isString(message.sessionToken))
                    return "sessionToken: string expected";
            return null;
        };

        /**
         * Creates an UpsellRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Upsell.UpsellRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Upsell.UpsellRequest} UpsellRequest
         */
        UpsellRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Upsell.UpsellRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Upsell.UpsellRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Upsell.UpsellRequest();
            if (object.email != null)
                message.email = String(object.email);
            if (object.locale != null)
                message.locale = String(object.locale);
            if (object.clientVersion != null)
                message.clientVersion = String(object.clientVersion);
            if (object.sessionToken != null)
                message.sessionToken = String(object.sessionToken);
            return message;
        };

        /**
         * Creates a plain object from an UpsellRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Upsell.UpsellRequest
         * @static
         * @param {Upsell.UpsellRequest} message UpsellRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpsellRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.email = "";
                object.locale = "";
                object.clientVersion = "";
                object.sessionToken = "";
            }
            if (message.email != null && Object.hasOwnProperty.call(message, "email"))
                object.email = message.email;
            if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
                object.locale = message.locale;
            if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
                object.clientVersion = message.clientVersion;
            if (message.sessionToken != null && Object.hasOwnProperty.call(message, "sessionToken"))
                object.sessionToken = message.sessionToken;
            return object;
        };

        /**
         * Converts this UpsellRequest to JSON.
         * @function toJSON
         * @memberof Upsell.UpsellRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpsellRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpsellRequest
         * @function getTypeUrl
         * @memberof Upsell.UpsellRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpsellRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Upsell.UpsellRequest";
        };

        return UpsellRequest;
    })();

    Upsell.UpsellResponse = (function() {

        /**
         * Properties of an UpsellResponse.
         * @memberof Upsell
         * @interface IUpsellResponse
         * @property {Array.<Upsell.IUpsellBanner>|null} [UpsellBanner] UpsellResponse UpsellBanner
         */

        /**
         * Constructs a new UpsellResponse.
         * @memberof Upsell
         * @classdesc Represents an UpsellResponse.
         * @implements IUpsellResponse
         * @constructor
         * @param {Upsell.IUpsellResponse=} [properties] Properties to set
         */
        function UpsellResponse(properties) {
            this.UpsellBanner = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpsellResponse UpsellBanner.
         * @member {Array.<Upsell.IUpsellBanner>} UpsellBanner
         * @memberof Upsell.UpsellResponse
         * @instance
         */
        UpsellResponse.prototype.UpsellBanner = $util.emptyArray;

        /**
         * Creates a new UpsellResponse instance using the specified properties.
         * @function create
         * @memberof Upsell.UpsellResponse
         * @static
         * @param {Upsell.IUpsellResponse=} [properties] Properties to set
         * @returns {Upsell.UpsellResponse} UpsellResponse instance
         */
        UpsellResponse.create = function create(properties) {
            return new UpsellResponse(properties);
        };

        /**
         * Encodes the specified UpsellResponse message. Does not implicitly {@link Upsell.UpsellResponse.verify|verify} messages.
         * @function encode
         * @memberof Upsell.UpsellResponse
         * @static
         * @param {Upsell.IUpsellResponse} message UpsellResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpsellResponse.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.UpsellBanner != null && message.UpsellBanner.length)
                for (let i = 0; i < message.UpsellBanner.length; ++i)
                    $root.Upsell.UpsellBanner.encode(message.UpsellBanner[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UpsellResponse message, length delimited. Does not implicitly {@link Upsell.UpsellResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Upsell.UpsellResponse
         * @static
         * @param {Upsell.IUpsellResponse} message UpsellResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpsellResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an UpsellResponse message from the specified reader or buffer.
         * @function decode
         * @memberof Upsell.UpsellResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Upsell.UpsellResponse} UpsellResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpsellResponse.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Upsell.UpsellResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.UpsellBanner && message.UpsellBanner.length))
                            message.UpsellBanner = [];
                        message.UpsellBanner.push($root.Upsell.UpsellBanner.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpsellResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Upsell.UpsellResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Upsell.UpsellResponse} UpsellResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpsellResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpsellResponse message.
         * @function verify
         * @memberof Upsell.UpsellResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpsellResponse.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.UpsellBanner != null && Object.hasOwnProperty.call(message, "UpsellBanner")) {
                if (!Array.isArray(message.UpsellBanner))
                    return "UpsellBanner: array expected";
                for (let i = 0; i < message.UpsellBanner.length; ++i) {
                    let error = $root.Upsell.UpsellBanner.verify(message.UpsellBanner[i], long + 1);
                    if (error)
                        return "UpsellBanner." + error;
                }
            }
            return null;
        };

        /**
         * Creates an UpsellResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Upsell.UpsellResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Upsell.UpsellResponse} UpsellResponse
         */
        UpsellResponse.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Upsell.UpsellResponse)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Upsell.UpsellResponse: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Upsell.UpsellResponse();
            if (object.UpsellBanner) {
                if (!Array.isArray(object.UpsellBanner))
                    throw TypeError(".Upsell.UpsellResponse.UpsellBanner: array expected");
                message.UpsellBanner = [];
                for (let i = 0; i < object.UpsellBanner.length; ++i) {
                    if (!$util.isObject(object.UpsellBanner[i]))
                        throw TypeError(".Upsell.UpsellResponse.UpsellBanner: object expected");
                    message.UpsellBanner[i] = $root.Upsell.UpsellBanner.fromObject(object.UpsellBanner[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an UpsellResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Upsell.UpsellResponse
         * @static
         * @param {Upsell.UpsellResponse} message UpsellResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpsellResponse.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.UpsellBanner = [];
            if (message.UpsellBanner && message.UpsellBanner.length) {
                object.UpsellBanner = [];
                for (let j = 0; j < message.UpsellBanner.length; ++j)
                    object.UpsellBanner[j] = $root.Upsell.UpsellBanner.toObject(message.UpsellBanner[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this UpsellResponse to JSON.
         * @function toJSON
         * @memberof Upsell.UpsellResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpsellResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpsellResponse
         * @function getTypeUrl
         * @memberof Upsell.UpsellResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpsellResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Upsell.UpsellResponse";
        };

        return UpsellResponse;
    })();

    Upsell.UpsellBanner = (function() {

        /**
         * Properties of an UpsellBanner.
         * @memberof Upsell
         * @interface IUpsellBanner
         * @property {number|null} [bannerId] UpsellBanner bannerId
         * @property {string|null} [bannerOkAction] UpsellBanner bannerOkAction
         * @property {string|null} [bannerOkButton] UpsellBanner bannerOkButton
         * @property {string|null} [bannerCancelAction] UpsellBanner bannerCancelAction
         * @property {string|null} [bannerCancelButton] UpsellBanner bannerCancelButton
         * @property {string|null} [bannerMessage] UpsellBanner bannerMessage
         * @property {string|null} [locale] UpsellBanner locale
         */

        /**
         * Constructs a new UpsellBanner.
         * @memberof Upsell
         * @classdesc Represents an UpsellBanner.
         * @implements IUpsellBanner
         * @constructor
         * @param {Upsell.IUpsellBanner=} [properties] Properties to set
         */
        function UpsellBanner(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpsellBanner bannerId.
         * @member {number} bannerId
         * @memberof Upsell.UpsellBanner
         * @instance
         */
        UpsellBanner.prototype.bannerId = 0;

        /**
         * UpsellBanner bannerOkAction.
         * @member {string} bannerOkAction
         * @memberof Upsell.UpsellBanner
         * @instance
         */
        UpsellBanner.prototype.bannerOkAction = "";

        /**
         * UpsellBanner bannerOkButton.
         * @member {string} bannerOkButton
         * @memberof Upsell.UpsellBanner
         * @instance
         */
        UpsellBanner.prototype.bannerOkButton = "";

        /**
         * UpsellBanner bannerCancelAction.
         * @member {string} bannerCancelAction
         * @memberof Upsell.UpsellBanner
         * @instance
         */
        UpsellBanner.prototype.bannerCancelAction = "";

        /**
         * UpsellBanner bannerCancelButton.
         * @member {string} bannerCancelButton
         * @memberof Upsell.UpsellBanner
         * @instance
         */
        UpsellBanner.prototype.bannerCancelButton = "";

        /**
         * UpsellBanner bannerMessage.
         * @member {string} bannerMessage
         * @memberof Upsell.UpsellBanner
         * @instance
         */
        UpsellBanner.prototype.bannerMessage = "";

        /**
         * UpsellBanner locale.
         * @member {string} locale
         * @memberof Upsell.UpsellBanner
         * @instance
         */
        UpsellBanner.prototype.locale = "";

        /**
         * Creates a new UpsellBanner instance using the specified properties.
         * @function create
         * @memberof Upsell.UpsellBanner
         * @static
         * @param {Upsell.IUpsellBanner=} [properties] Properties to set
         * @returns {Upsell.UpsellBanner} UpsellBanner instance
         */
        UpsellBanner.create = function create(properties) {
            return new UpsellBanner(properties);
        };

        /**
         * Encodes the specified UpsellBanner message. Does not implicitly {@link Upsell.UpsellBanner.verify|verify} messages.
         * @function encode
         * @memberof Upsell.UpsellBanner
         * @static
         * @param {Upsell.IUpsellBanner} message UpsellBanner message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpsellBanner.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.bannerId != null && Object.hasOwnProperty.call(message, "bannerId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.bannerId);
            if (message.bannerOkAction != null && Object.hasOwnProperty.call(message, "bannerOkAction"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.bannerOkAction);
            if (message.bannerOkButton != null && Object.hasOwnProperty.call(message, "bannerOkButton"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.bannerOkButton);
            if (message.bannerCancelAction != null && Object.hasOwnProperty.call(message, "bannerCancelAction"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.bannerCancelAction);
            if (message.bannerCancelButton != null && Object.hasOwnProperty.call(message, "bannerCancelButton"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.bannerCancelButton);
            if (message.bannerMessage != null && Object.hasOwnProperty.call(message, "bannerMessage"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.bannerMessage);
            if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.locale);
            return writer;
        };

        /**
         * Encodes the specified UpsellBanner message, length delimited. Does not implicitly {@link Upsell.UpsellBanner.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Upsell.UpsellBanner
         * @static
         * @param {Upsell.IUpsellBanner} message UpsellBanner message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpsellBanner.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes an UpsellBanner message from the specified reader or buffer.
         * @function decode
         * @memberof Upsell.UpsellBanner
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Upsell.UpsellBanner} UpsellBanner
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpsellBanner.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Upsell.UpsellBanner();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.bannerId = reader.int32();
                        break;
                    }
                case 2: {
                        message.bannerOkAction = reader.string();
                        break;
                    }
                case 3: {
                        message.bannerOkButton = reader.string();
                        break;
                    }
                case 4: {
                        message.bannerCancelAction = reader.string();
                        break;
                    }
                case 5: {
                        message.bannerCancelButton = reader.string();
                        break;
                    }
                case 6: {
                        message.bannerMessage = reader.string();
                        break;
                    }
                case 7: {
                        message.locale = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpsellBanner message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Upsell.UpsellBanner
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Upsell.UpsellBanner} UpsellBanner
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpsellBanner.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpsellBanner message.
         * @function verify
         * @memberof Upsell.UpsellBanner
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpsellBanner.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.bannerId != null && Object.hasOwnProperty.call(message, "bannerId"))
                if (!$util.isInteger(message.bannerId))
                    return "bannerId: integer expected";
            if (message.bannerOkAction != null && Object.hasOwnProperty.call(message, "bannerOkAction"))
                if (!$util.isString(message.bannerOkAction))
                    return "bannerOkAction: string expected";
            if (message.bannerOkButton != null && Object.hasOwnProperty.call(message, "bannerOkButton"))
                if (!$util.isString(message.bannerOkButton))
                    return "bannerOkButton: string expected";
            if (message.bannerCancelAction != null && Object.hasOwnProperty.call(message, "bannerCancelAction"))
                if (!$util.isString(message.bannerCancelAction))
                    return "bannerCancelAction: string expected";
            if (message.bannerCancelButton != null && Object.hasOwnProperty.call(message, "bannerCancelButton"))
                if (!$util.isString(message.bannerCancelButton))
                    return "bannerCancelButton: string expected";
            if (message.bannerMessage != null && Object.hasOwnProperty.call(message, "bannerMessage"))
                if (!$util.isString(message.bannerMessage))
                    return "bannerMessage: string expected";
            if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
                if (!$util.isString(message.locale))
                    return "locale: string expected";
            return null;
        };

        /**
         * Creates an UpsellBanner message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Upsell.UpsellBanner
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Upsell.UpsellBanner} UpsellBanner
         */
        UpsellBanner.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Upsell.UpsellBanner)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Upsell.UpsellBanner: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Upsell.UpsellBanner();
            if (object.bannerId != null)
                message.bannerId = object.bannerId | 0;
            if (object.bannerOkAction != null)
                message.bannerOkAction = String(object.bannerOkAction);
            if (object.bannerOkButton != null)
                message.bannerOkButton = String(object.bannerOkButton);
            if (object.bannerCancelAction != null)
                message.bannerCancelAction = String(object.bannerCancelAction);
            if (object.bannerCancelButton != null)
                message.bannerCancelButton = String(object.bannerCancelButton);
            if (object.bannerMessage != null)
                message.bannerMessage = String(object.bannerMessage);
            if (object.locale != null)
                message.locale = String(object.locale);
            return message;
        };

        /**
         * Creates a plain object from an UpsellBanner message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Upsell.UpsellBanner
         * @static
         * @param {Upsell.UpsellBanner} message UpsellBanner
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpsellBanner.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.bannerId = 0;
                object.bannerOkAction = "";
                object.bannerOkButton = "";
                object.bannerCancelAction = "";
                object.bannerCancelButton = "";
                object.bannerMessage = "";
                object.locale = "";
            }
            if (message.bannerId != null && Object.hasOwnProperty.call(message, "bannerId"))
                object.bannerId = message.bannerId;
            if (message.bannerOkAction != null && Object.hasOwnProperty.call(message, "bannerOkAction"))
                object.bannerOkAction = message.bannerOkAction;
            if (message.bannerOkButton != null && Object.hasOwnProperty.call(message, "bannerOkButton"))
                object.bannerOkButton = message.bannerOkButton;
            if (message.bannerCancelAction != null && Object.hasOwnProperty.call(message, "bannerCancelAction"))
                object.bannerCancelAction = message.bannerCancelAction;
            if (message.bannerCancelButton != null && Object.hasOwnProperty.call(message, "bannerCancelButton"))
                object.bannerCancelButton = message.bannerCancelButton;
            if (message.bannerMessage != null && Object.hasOwnProperty.call(message, "bannerMessage"))
                object.bannerMessage = message.bannerMessage;
            if (message.locale != null && Object.hasOwnProperty.call(message, "locale"))
                object.locale = message.locale;
            return object;
        };

        /**
         * Converts this UpsellBanner to JSON.
         * @function toJSON
         * @memberof Upsell.UpsellBanner
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpsellBanner.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UpsellBanner
         * @function getTypeUrl
         * @memberof Upsell.UpsellBanner
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UpsellBanner.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Upsell.UpsellBanner";
        };

        return UpsellBanner;
    })();

    /**
     * ClientType enum.
     * @name Upsell.ClientType
     * @enum {number}
     * @property {number} DEFAULT_CLIENT_TYPE=0 DEFAULT_CLIENT_TYPE value
     * @property {number} ALL=1 ALL value
     * @property {number} ANDROID=2 ANDROID value
     * @property {number} IOS=3 IOS value
     * @property {number} MICROSOFT=4 MICROSOFT value
     * @property {number} WEBAPP=5 WEBAPP value
     */
    Upsell.ClientType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DEFAULT_CLIENT_TYPE"] = 0;
        values[valuesById[1] = "ALL"] = 1;
        values[valuesById[2] = "ANDROID"] = 2;
        values[valuesById[3] = "IOS"] = 3;
        values[valuesById[4] = "MICROSOFT"] = 4;
        values[valuesById[5] = "WEBAPP"] = 5;
        return values;
    })();

    /**
     * ClientVersion enum.
     * @name Upsell.ClientVersion
     * @enum {number}
     * @property {number} DEFAULT_VERSION=0 DEFAULT_VERSION value
     * @property {number} SUPPORTS_ALL=1 SUPPORTS_ALL value
     * @property {number} BASEVERSION=14 BASEVERSION value
     * @property {number} ABOVERANGE=15 ABOVERANGE value
     */
    Upsell.ClientVersion = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DEFAULT_VERSION"] = 0;
        values[valuesById[1] = "SUPPORTS_ALL"] = 1;
        values[valuesById[14] = "BASEVERSION"] = 14;
        values[valuesById[15] = "ABOVERANGE"] = 15;
        return values;
    })();

    return Upsell;
})();

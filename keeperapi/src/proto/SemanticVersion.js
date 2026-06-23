/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const SemanticVersion = $root.SemanticVersion = (() => {

    /**
     * Namespace SemanticVersion.
     * @exports SemanticVersion
     * @namespace
     */
    const SemanticVersion = {};

    SemanticVersion.Version = (function() {

        /**
         * Properties of a Version.
         * @memberof SemanticVersion
         * @interface IVersion
         * @property {number|null} [major] Version major
         * @property {number|null} [minor] Version minor
         * @property {number|null} [patch] Version patch
         * @property {number|null} [build] Version build
         */

        /**
         * Constructs a new Version.
         * @memberof SemanticVersion
         * @classdesc Represents a Version.
         * @implements IVersion
         * @constructor
         * @param {SemanticVersion.IVersion=} [properties] Properties to set
         */
        function Version(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Version major.
         * @member {number} major
         * @memberof SemanticVersion.Version
         * @instance
         */
        Version.prototype.major = 0;

        /**
         * Version minor.
         * @member {number} minor
         * @memberof SemanticVersion.Version
         * @instance
         */
        Version.prototype.minor = 0;

        /**
         * Version patch.
         * @member {number} patch
         * @memberof SemanticVersion.Version
         * @instance
         */
        Version.prototype.patch = 0;

        /**
         * Version build.
         * @member {number} build
         * @memberof SemanticVersion.Version
         * @instance
         */
        Version.prototype.build = 0;

        /**
         * Creates a new Version instance using the specified properties.
         * @function create
         * @memberof SemanticVersion.Version
         * @static
         * @param {SemanticVersion.IVersion=} [properties] Properties to set
         * @returns {SemanticVersion.Version} Version instance
         */
        Version.create = function create(properties) {
            return new Version(properties);
        };

        /**
         * Encodes the specified Version message. Does not implicitly {@link SemanticVersion.Version.verify|verify} messages.
         * @function encode
         * @memberof SemanticVersion.Version
         * @static
         * @param {SemanticVersion.IVersion} message Version message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Version.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.major != null && Object.hasOwnProperty.call(message, "major"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.major);
            if (message.minor != null && Object.hasOwnProperty.call(message, "minor"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.minor);
            if (message.patch != null && Object.hasOwnProperty.call(message, "patch"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.patch);
            if (message.build != null && Object.hasOwnProperty.call(message, "build"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.build);
            return writer;
        };

        /**
         * Encodes the specified Version message, length delimited. Does not implicitly {@link SemanticVersion.Version.verify|verify} messages.
         * @function encodeDelimited
         * @memberof SemanticVersion.Version
         * @static
         * @param {SemanticVersion.IVersion} message Version message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Version.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Version message from the specified reader or buffer.
         * @function decode
         * @memberof SemanticVersion.Version
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {SemanticVersion.Version} Version
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Version.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.SemanticVersion.Version();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.major = reader.int32();
                        break;
                    }
                case 2: {
                        message.minor = reader.int32();
                        break;
                    }
                case 3: {
                        message.patch = reader.int32();
                        break;
                    }
                case 4: {
                        message.build = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7, long);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Version message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof SemanticVersion.Version
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {SemanticVersion.Version} Version
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Version.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Version message.
         * @function verify
         * @memberof SemanticVersion.Version
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Version.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.major != null && Object.hasOwnProperty.call(message, "major"))
                if (!$util.isInteger(message.major))
                    return "major: integer expected";
            if (message.minor != null && Object.hasOwnProperty.call(message, "minor"))
                if (!$util.isInteger(message.minor))
                    return "minor: integer expected";
            if (message.patch != null && Object.hasOwnProperty.call(message, "patch"))
                if (!$util.isInteger(message.patch))
                    return "patch: integer expected";
            if (message.build != null && Object.hasOwnProperty.call(message, "build"))
                if (!$util.isInteger(message.build))
                    return "build: integer expected";
            return null;
        };

        /**
         * Creates a Version message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof SemanticVersion.Version
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {SemanticVersion.Version} Version
         */
        Version.fromObject = function fromObject(object, long) {
            if (object instanceof $root.SemanticVersion.Version)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".SemanticVersion.Version: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.SemanticVersion.Version();
            if (object.major != null)
                message.major = object.major | 0;
            if (object.minor != null)
                message.minor = object.minor | 0;
            if (object.patch != null)
                message.patch = object.patch | 0;
            if (object.build != null)
                message.build = object.build | 0;
            return message;
        };

        /**
         * Creates a plain object from a Version message. Also converts values to other types if specified.
         * @function toObject
         * @memberof SemanticVersion.Version
         * @static
         * @param {SemanticVersion.Version} message Version
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Version.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.major = 0;
                object.minor = 0;
                object.patch = 0;
                object.build = 0;
            }
            if (message.major != null && Object.hasOwnProperty.call(message, "major"))
                object.major = message.major;
            if (message.minor != null && Object.hasOwnProperty.call(message, "minor"))
                object.minor = message.minor;
            if (message.patch != null && Object.hasOwnProperty.call(message, "patch"))
                object.patch = message.patch;
            if (message.build != null && Object.hasOwnProperty.call(message, "build"))
                object.build = message.build;
            return object;
        };

        /**
         * Converts this Version to JSON.
         * @function toJSON
         * @memberof SemanticVersion.Version
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Version.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Version
         * @function getTypeUrl
         * @memberof SemanticVersion.Version
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Version.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/SemanticVersion.Version";
        };

        return Version;
    })();

    return SemanticVersion;
})();

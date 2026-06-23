/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const Dag = $root.Dag = (() => {

    /**
     * Namespace Dag.
     * @exports Dag
     * @namespace
     */
    const Dag = {};

    /**
     * RefType enum.
     * @name Dag.RefType
     * @enum {number}
     * @property {number} GENERAL=0 GENERAL value
     * @property {number} USER=1 USER value
     * @property {number} DEVICE=2 DEVICE value
     * @property {number} REC=3 REC value
     * @property {number} FOLDER=4 FOLDER value
     * @property {number} TEAM=5 TEAM value
     * @property {number} ENTERPRISE=6 ENTERPRISE value
     * @property {number} PAM_DIRECTORY=7 PAM_DIRECTORY value
     * @property {number} PAM_MACHINE=8 PAM_MACHINE value
     * @property {number} PAM_USER=9 PAM_USER value
     */
    Dag.RefType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "GENERAL"] = 0;
        values[valuesById[1] = "USER"] = 1;
        values[valuesById[2] = "DEVICE"] = 2;
        values[valuesById[3] = "REC"] = 3;
        values[valuesById[4] = "FOLDER"] = 4;
        values[valuesById[5] = "TEAM"] = 5;
        values[valuesById[6] = "ENTERPRISE"] = 6;
        values[valuesById[7] = "PAM_DIRECTORY"] = 7;
        values[valuesById[8] = "PAM_MACHINE"] = 8;
        values[valuesById[9] = "PAM_USER"] = 9;
        return values;
    })();

    /**
     * DataType enum.
     * @name Dag.DataType
     * @enum {number}
     * @property {number} DATA=0 DATA value
     * @property {number} KEY=1 KEY value
     * @property {number} LINK=2 LINK value
     * @property {number} ACL=3 ACL value
     * @property {number} DELETION=4 DELETION value
     * @property {number} DENIAL=5 DENIAL value
     * @property {number} UNDENIAL=6 UNDENIAL value
     */
    Dag.DataType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DATA"] = 0;
        values[valuesById[1] = "KEY"] = 1;
        values[valuesById[2] = "LINK"] = 2;
        values[valuesById[3] = "ACL"] = 3;
        values[valuesById[4] = "DELETION"] = 4;
        values[valuesById[5] = "DENIAL"] = 5;
        values[valuesById[6] = "UNDENIAL"] = 6;
        return values;
    })();

    Dag.Ref = (function() {

        /**
         * Properties of a Ref.
         * @memberof Dag
         * @interface IRef
         * @property {Dag.RefType|null} [type] Ref type
         * @property {Uint8Array|null} [value] Ref value
         * @property {string|null} [name] Ref name
         */

        /**
         * Constructs a new Ref.
         * @memberof Dag
         * @classdesc Represents a Ref.
         * @implements IRef
         * @constructor
         * @param {Dag.IRef=} [properties] Properties to set
         */
        function Ref(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Ref type.
         * @member {Dag.RefType} type
         * @memberof Dag.Ref
         * @instance
         */
        Ref.prototype.type = 0;

        /**
         * Ref value.
         * @member {Uint8Array} value
         * @memberof Dag.Ref
         * @instance
         */
        Ref.prototype.value = $util.newBuffer([]);

        /**
         * Ref name.
         * @member {string} name
         * @memberof Dag.Ref
         * @instance
         */
        Ref.prototype.name = "";

        /**
         * Creates a new Ref instance using the specified properties.
         * @function create
         * @memberof Dag.Ref
         * @static
         * @param {Dag.IRef=} [properties] Properties to set
         * @returns {Dag.Ref} Ref instance
         */
        Ref.create = function create(properties) {
            return new Ref(properties);
        };

        /**
         * Encodes the specified Ref message. Does not implicitly {@link Dag.Ref.verify|verify} messages.
         * @function encode
         * @memberof Dag.Ref
         * @static
         * @param {Dag.IRef} message Ref message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ref.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified Ref message, length delimited. Does not implicitly {@link Dag.Ref.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Dag.Ref
         * @static
         * @param {Dag.IRef} message Ref message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ref.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Ref message from the specified reader or buffer.
         * @function decode
         * @memberof Dag.Ref
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Dag.Ref} Ref
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ref.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Dag.Ref();
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
                        message.value = reader.bytes();
                        break;
                    }
                case 3: {
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
         * Decodes a Ref message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Dag.Ref
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Dag.Ref} Ref
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ref.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Ref message.
         * @function verify
         * @memberof Dag.Ref
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Ref.verify = function verify(message, long) {
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
                    break;
                }
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a Ref message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Dag.Ref
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Dag.Ref} Ref
         */
        Ref.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Dag.Ref)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Dag.Ref: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Dag.Ref();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "GENERAL":
            case 0:
                message.type = 0;
                break;
            case "USER":
            case 1:
                message.type = 1;
                break;
            case "DEVICE":
            case 2:
                message.type = 2;
                break;
            case "REC":
            case 3:
                message.type = 3;
                break;
            case "FOLDER":
            case 4:
                message.type = 4;
                break;
            case "TEAM":
            case 5:
                message.type = 5;
                break;
            case "ENTERPRISE":
            case 6:
                message.type = 6;
                break;
            case "PAM_DIRECTORY":
            case 7:
                message.type = 7;
                break;
            case "PAM_MACHINE":
            case 8:
                message.type = 8;
                break;
            case "PAM_USER":
            case 9:
                message.type = 9;
                break;
            }
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length >= 0)
                    message.value = object.value;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a Ref message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Dag.Ref
         * @static
         * @param {Dag.Ref} message Ref
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Ref.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "GENERAL" : 0;
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
                object.name = "";
            }
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                object.type = options.enums === String ? $root.Dag.RefType[message.type] === undefined ? message.type : $root.Dag.RefType[message.type] : message.type;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this Ref to JSON.
         * @function toJSON
         * @memberof Dag.Ref
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Ref.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Ref
         * @function getTypeUrl
         * @memberof Dag.Ref
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Ref.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Dag.Ref";
        };

        return Ref;
    })();

    Dag.Data = (function() {

        /**
         * Properties of a Data.
         * @memberof Dag
         * @interface IData
         * @property {Dag.DataType|null} [dataType] Data dataType
         * @property {Dag.IRef|null} [ref] Data ref
         * @property {Dag.IRef|null} [parentRef] Data parentRef
         * @property {Uint8Array|null} [content] Data content
         * @property {string|null} [path] Data path
         */

        /**
         * Constructs a new Data.
         * @memberof Dag
         * @classdesc Represents a Data.
         * @implements IData
         * @constructor
         * @param {Dag.IData=} [properties] Properties to set
         */
        function Data(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Data dataType.
         * @member {Dag.DataType} dataType
         * @memberof Dag.Data
         * @instance
         */
        Data.prototype.dataType = 0;

        /**
         * Data ref.
         * @member {Dag.IRef|null|undefined} ref
         * @memberof Dag.Data
         * @instance
         */
        Data.prototype.ref = null;

        /**
         * Data parentRef.
         * @member {Dag.IRef|null|undefined} parentRef
         * @memberof Dag.Data
         * @instance
         */
        Data.prototype.parentRef = null;

        /**
         * Data content.
         * @member {Uint8Array} content
         * @memberof Dag.Data
         * @instance
         */
        Data.prototype.content = $util.newBuffer([]);

        /**
         * Data path.
         * @member {string} path
         * @memberof Dag.Data
         * @instance
         */
        Data.prototype.path = "";

        /**
         * Creates a new Data instance using the specified properties.
         * @function create
         * @memberof Dag.Data
         * @static
         * @param {Dag.IData=} [properties] Properties to set
         * @returns {Dag.Data} Data instance
         */
        Data.create = function create(properties) {
            return new Data(properties);
        };

        /**
         * Encodes the specified Data message. Does not implicitly {@link Dag.Data.verify|verify} messages.
         * @function encode
         * @memberof Dag.Data
         * @static
         * @param {Dag.IData} message Data message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Data.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.dataType);
            if (message.ref != null && Object.hasOwnProperty.call(message, "ref"))
                $root.Dag.Ref.encode(message.ref, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.parentRef != null && Object.hasOwnProperty.call(message, "parentRef"))
                $root.Dag.Ref.encode(message.parentRef, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.content);
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.path);
            return writer;
        };

        /**
         * Encodes the specified Data message, length delimited. Does not implicitly {@link Dag.Data.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Dag.Data
         * @static
         * @param {Dag.IData} message Data message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Data.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a Data message from the specified reader or buffer.
         * @function decode
         * @memberof Dag.Data
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Dag.Data} Data
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Data.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Dag.Data();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.dataType = reader.int32();
                        break;
                    }
                case 2: {
                        message.ref = $root.Dag.Ref.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.parentRef = $root.Dag.Ref.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.content = reader.bytes();
                        break;
                    }
                case 5: {
                        message.path = reader.string();
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
         * Decodes a Data message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Dag.Data
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Dag.Data} Data
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Data.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Data message.
         * @function verify
         * @memberof Dag.Data
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Data.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
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
                    break;
                }
            if (message.ref != null && Object.hasOwnProperty.call(message, "ref")) {
                let error = $root.Dag.Ref.verify(message.ref, long + 1);
                if (error)
                    return "ref." + error;
            }
            if (message.parentRef != null && Object.hasOwnProperty.call(message, "parentRef")) {
                let error = $root.Dag.Ref.verify(message.parentRef, long + 1);
                if (error)
                    return "parentRef." + error;
            }
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                if (!(message.content && typeof message.content.length === "number" || $util.isString(message.content)))
                    return "content: buffer expected";
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                if (!$util.isString(message.path))
                    return "path: string expected";
            return null;
        };

        /**
         * Creates a Data message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Dag.Data
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Dag.Data} Data
         */
        Data.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Dag.Data)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Dag.Data: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Dag.Data();
            switch (object.dataType) {
            default:
                if (typeof object.dataType === "number") {
                    message.dataType = object.dataType;
                    break;
                }
                break;
            case "DATA":
            case 0:
                message.dataType = 0;
                break;
            case "KEY":
            case 1:
                message.dataType = 1;
                break;
            case "LINK":
            case 2:
                message.dataType = 2;
                break;
            case "ACL":
            case 3:
                message.dataType = 3;
                break;
            case "DELETION":
            case 4:
                message.dataType = 4;
                break;
            case "DENIAL":
            case 5:
                message.dataType = 5;
                break;
            case "UNDENIAL":
            case 6:
                message.dataType = 6;
                break;
            }
            if (object.ref != null) {
                if (!$util.isObject(object.ref))
                    throw TypeError(".Dag.Data.ref: object expected");
                message.ref = $root.Dag.Ref.fromObject(object.ref, long + 1);
            }
            if (object.parentRef != null) {
                if (!$util.isObject(object.parentRef))
                    throw TypeError(".Dag.Data.parentRef: object expected");
                message.parentRef = $root.Dag.Ref.fromObject(object.parentRef, long + 1);
            }
            if (object.content != null)
                if (typeof object.content === "string")
                    $util.base64.decode(object.content, message.content = $util.newBuffer($util.base64.length(object.content)), 0);
                else if (object.content.length >= 0)
                    message.content = object.content;
            if (object.path != null)
                message.path = String(object.path);
            return message;
        };

        /**
         * Creates a plain object from a Data message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Dag.Data
         * @static
         * @param {Dag.Data} message Data
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Data.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.dataType = options.enums === String ? "DATA" : 0;
                object.ref = null;
                object.parentRef = null;
                if (options.bytes === String)
                    object.content = "";
                else {
                    object.content = [];
                    if (options.bytes !== Array)
                        object.content = $util.newBuffer(object.content);
                }
                object.path = "";
            }
            if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
                object.dataType = options.enums === String ? $root.Dag.DataType[message.dataType] === undefined ? message.dataType : $root.Dag.DataType[message.dataType] : message.dataType;
            if (message.ref != null && Object.hasOwnProperty.call(message, "ref"))
                object.ref = $root.Dag.Ref.toObject(message.ref, options, q + 1);
            if (message.parentRef != null && Object.hasOwnProperty.call(message, "parentRef"))
                object.parentRef = $root.Dag.Ref.toObject(message.parentRef, options, q + 1);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                object.content = options.bytes === String ? $util.base64.encode(message.content, 0, message.content.length) : options.bytes === Array ? Array.prototype.slice.call(message.content) : message.content;
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                object.path = message.path;
            return object;
        };

        /**
         * Converts this Data to JSON.
         * @function toJSON
         * @memberof Dag.Data
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Data.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Data
         * @function getTypeUrl
         * @memberof Dag.Data
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Data.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Dag.Data";
        };

        return Data;
    })();

    Dag.SyncData = (function() {

        /**
         * Properties of a SyncData.
         * @memberof Dag
         * @interface ISyncData
         * @property {Array.<Dag.IData>|null} [data] SyncData data
         * @property {number|null} [syncPoint] SyncData syncPoint
         * @property {boolean|null} [hasMore] SyncData hasMore
         */

        /**
         * Constructs a new SyncData.
         * @memberof Dag
         * @classdesc Represents a SyncData.
         * @implements ISyncData
         * @constructor
         * @param {Dag.ISyncData=} [properties] Properties to set
         */
        function SyncData(properties) {
            this.data = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncData data.
         * @member {Array.<Dag.IData>} data
         * @memberof Dag.SyncData
         * @instance
         */
        SyncData.prototype.data = $util.emptyArray;

        /**
         * SyncData syncPoint.
         * @member {number} syncPoint
         * @memberof Dag.SyncData
         * @instance
         */
        SyncData.prototype.syncPoint = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SyncData hasMore.
         * @member {boolean} hasMore
         * @memberof Dag.SyncData
         * @instance
         */
        SyncData.prototype.hasMore = false;

        /**
         * Creates a new SyncData instance using the specified properties.
         * @function create
         * @memberof Dag.SyncData
         * @static
         * @param {Dag.ISyncData=} [properties] Properties to set
         * @returns {Dag.SyncData} SyncData instance
         */
        SyncData.create = function create(properties) {
            return new SyncData(properties);
        };

        /**
         * Encodes the specified SyncData message. Does not implicitly {@link Dag.SyncData.verify|verify} messages.
         * @function encode
         * @memberof Dag.SyncData
         * @static
         * @param {Dag.ISyncData} message SyncData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.data != null && message.data.length)
                for (let i = 0; i < message.data.length; ++i)
                    $root.Dag.Data.encode(message.data[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.syncPoint != null && Object.hasOwnProperty.call(message, "syncPoint"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.syncPoint);
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.hasMore);
            return writer;
        };

        /**
         * Encodes the specified SyncData message, length delimited. Does not implicitly {@link Dag.SyncData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Dag.SyncData
         * @static
         * @param {Dag.ISyncData} message SyncData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a SyncData message from the specified reader or buffer.
         * @function decode
         * @memberof Dag.SyncData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Dag.SyncData} SyncData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Dag.SyncData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.data && message.data.length))
                            message.data = [];
                        message.data.push($root.Dag.Data.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Decodes a SyncData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Dag.SyncData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Dag.SyncData} SyncData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SyncData message.
         * @function verify
         * @memberof Dag.SyncData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SyncData.verify = function verify(message, long) {
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
                    let error = $root.Dag.Data.verify(message.data[i], long + 1);
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
         * Creates a SyncData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Dag.SyncData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Dag.SyncData} SyncData
         */
        SyncData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Dag.SyncData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Dag.SyncData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Dag.SyncData();
            if (object.data) {
                if (!Array.isArray(object.data))
                    throw TypeError(".Dag.SyncData.data: array expected");
                message.data = [];
                for (let i = 0; i < object.data.length; ++i) {
                    if (!$util.isObject(object.data[i]))
                        throw TypeError(".Dag.SyncData.data: object expected");
                    message.data[i] = $root.Dag.Data.fromObject(object.data[i], long + 1);
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
         * Creates a plain object from a SyncData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Dag.SyncData
         * @static
         * @param {Dag.SyncData} message SyncData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncData.toObject = function toObject(message, options, q) {
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
                    object.data[j] = $root.Dag.Data.toObject(message.data[j], options, q + 1);
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
         * Converts this SyncData to JSON.
         * @function toJSON
         * @memberof Dag.SyncData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SyncData
         * @function getTypeUrl
         * @memberof Dag.SyncData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SyncData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Dag.SyncData";
        };

        return SyncData;
    })();

    Dag.DebugData = (function() {

        /**
         * Properties of a DebugData.
         * @memberof Dag
         * @interface IDebugData
         * @property {string|null} [dataType] DebugData dataType
         * @property {string|null} [path] DebugData path
         * @property {Dag.IDebugRefInfo|null} [ref] DebugData ref
         * @property {Dag.IDebugRefInfo|null} [parentRef] DebugData parentRef
         */

        /**
         * Constructs a new DebugData.
         * @memberof Dag
         * @classdesc Represents a DebugData.
         * @implements IDebugData
         * @constructor
         * @param {Dag.IDebugData=} [properties] Properties to set
         */
        function DebugData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DebugData dataType.
         * @member {string} dataType
         * @memberof Dag.DebugData
         * @instance
         */
        DebugData.prototype.dataType = "";

        /**
         * DebugData path.
         * @member {string} path
         * @memberof Dag.DebugData
         * @instance
         */
        DebugData.prototype.path = "";

        /**
         * DebugData ref.
         * @member {Dag.IDebugRefInfo|null|undefined} ref
         * @memberof Dag.DebugData
         * @instance
         */
        DebugData.prototype.ref = null;

        /**
         * DebugData parentRef.
         * @member {Dag.IDebugRefInfo|null|undefined} parentRef
         * @memberof Dag.DebugData
         * @instance
         */
        DebugData.prototype.parentRef = null;

        /**
         * Creates a new DebugData instance using the specified properties.
         * @function create
         * @memberof Dag.DebugData
         * @static
         * @param {Dag.IDebugData=} [properties] Properties to set
         * @returns {Dag.DebugData} DebugData instance
         */
        DebugData.create = function create(properties) {
            return new DebugData(properties);
        };

        /**
         * Encodes the specified DebugData message. Does not implicitly {@link Dag.DebugData.verify|verify} messages.
         * @function encode
         * @memberof Dag.DebugData
         * @static
         * @param {Dag.IDebugData} message DebugData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DebugData.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.dataType);
            if (message.ref != null && Object.hasOwnProperty.call(message, "ref"))
                $root.Dag.DebugRefInfo.encode(message.ref, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.parentRef != null && Object.hasOwnProperty.call(message, "parentRef"))
                $root.Dag.DebugRefInfo.encode(message.parentRef, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.path);
            return writer;
        };

        /**
         * Encodes the specified DebugData message, length delimited. Does not implicitly {@link Dag.DebugData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Dag.DebugData
         * @static
         * @param {Dag.IDebugData} message DebugData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DebugData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a DebugData message from the specified reader or buffer.
         * @function decode
         * @memberof Dag.DebugData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Dag.DebugData} DebugData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DebugData.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Dag.DebugData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.dataType = reader.string();
                        break;
                    }
                case 4: {
                        message.path = reader.string();
                        break;
                    }
                case 2: {
                        message.ref = $root.Dag.DebugRefInfo.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.parentRef = $root.Dag.DebugRefInfo.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Decodes a DebugData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Dag.DebugData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Dag.DebugData} DebugData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DebugData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DebugData message.
         * @function verify
         * @memberof Dag.DebugData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DebugData.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
                if (!$util.isString(message.dataType))
                    return "dataType: string expected";
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                if (!$util.isString(message.path))
                    return "path: string expected";
            if (message.ref != null && Object.hasOwnProperty.call(message, "ref")) {
                let error = $root.Dag.DebugRefInfo.verify(message.ref, long + 1);
                if (error)
                    return "ref." + error;
            }
            if (message.parentRef != null && Object.hasOwnProperty.call(message, "parentRef")) {
                let error = $root.Dag.DebugRefInfo.verify(message.parentRef, long + 1);
                if (error)
                    return "parentRef." + error;
            }
            return null;
        };

        /**
         * Creates a DebugData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Dag.DebugData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Dag.DebugData} DebugData
         */
        DebugData.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Dag.DebugData)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Dag.DebugData: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Dag.DebugData();
            if (object.dataType != null)
                message.dataType = String(object.dataType);
            if (object.path != null)
                message.path = String(object.path);
            if (object.ref != null) {
                if (!$util.isObject(object.ref))
                    throw TypeError(".Dag.DebugData.ref: object expected");
                message.ref = $root.Dag.DebugRefInfo.fromObject(object.ref, long + 1);
            }
            if (object.parentRef != null) {
                if (!$util.isObject(object.parentRef))
                    throw TypeError(".Dag.DebugData.parentRef: object expected");
                message.parentRef = $root.Dag.DebugRefInfo.fromObject(object.parentRef, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a DebugData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Dag.DebugData
         * @static
         * @param {Dag.DebugData} message DebugData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DebugData.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.dataType = "";
                object.ref = null;
                object.parentRef = null;
                object.path = "";
            }
            if (message.dataType != null && Object.hasOwnProperty.call(message, "dataType"))
                object.dataType = message.dataType;
            if (message.ref != null && Object.hasOwnProperty.call(message, "ref"))
                object.ref = $root.Dag.DebugRefInfo.toObject(message.ref, options, q + 1);
            if (message.parentRef != null && Object.hasOwnProperty.call(message, "parentRef"))
                object.parentRef = $root.Dag.DebugRefInfo.toObject(message.parentRef, options, q + 1);
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                object.path = message.path;
            return object;
        };

        /**
         * Converts this DebugData to JSON.
         * @function toJSON
         * @memberof Dag.DebugData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DebugData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DebugData
         * @function getTypeUrl
         * @memberof Dag.DebugData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DebugData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Dag.DebugData";
        };

        return DebugData;
    })();

    Dag.DebugRefInfo = (function() {

        /**
         * Properties of a DebugRefInfo.
         * @memberof Dag
         * @interface IDebugRefInfo
         * @property {string|null} [refType] DebugRefInfo refType
         * @property {Uint8Array|null} [value] DebugRefInfo value
         */

        /**
         * Constructs a new DebugRefInfo.
         * @memberof Dag
         * @classdesc Represents a DebugRefInfo.
         * @implements IDebugRefInfo
         * @constructor
         * @param {Dag.IDebugRefInfo=} [properties] Properties to set
         */
        function DebugRefInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DebugRefInfo refType.
         * @member {string} refType
         * @memberof Dag.DebugRefInfo
         * @instance
         */
        DebugRefInfo.prototype.refType = "";

        /**
         * DebugRefInfo value.
         * @member {Uint8Array} value
         * @memberof Dag.DebugRefInfo
         * @instance
         */
        DebugRefInfo.prototype.value = $util.newBuffer([]);

        /**
         * Creates a new DebugRefInfo instance using the specified properties.
         * @function create
         * @memberof Dag.DebugRefInfo
         * @static
         * @param {Dag.IDebugRefInfo=} [properties] Properties to set
         * @returns {Dag.DebugRefInfo} DebugRefInfo instance
         */
        DebugRefInfo.create = function create(properties) {
            return new DebugRefInfo(properties);
        };

        /**
         * Encodes the specified DebugRefInfo message. Does not implicitly {@link Dag.DebugRefInfo.verify|verify} messages.
         * @function encode
         * @memberof Dag.DebugRefInfo
         * @static
         * @param {Dag.IDebugRefInfo} message DebugRefInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DebugRefInfo.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.refType != null && Object.hasOwnProperty.call(message, "refType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.refType);
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
            return writer;
        };

        /**
         * Encodes the specified DebugRefInfo message, length delimited. Does not implicitly {@link Dag.DebugRefInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Dag.DebugRefInfo
         * @static
         * @param {Dag.IDebugRefInfo} message DebugRefInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DebugRefInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a DebugRefInfo message from the specified reader or buffer.
         * @function decode
         * @memberof Dag.DebugRefInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Dag.DebugRefInfo} DebugRefInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DebugRefInfo.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Dag.DebugRefInfo();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.refType = reader.string();
                        break;
                    }
                case 2: {
                        message.value = reader.bytes();
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
         * Decodes a DebugRefInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Dag.DebugRefInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Dag.DebugRefInfo} DebugRefInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DebugRefInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DebugRefInfo message.
         * @function verify
         * @memberof Dag.DebugRefInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DebugRefInfo.verify = function verify(message, long) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                return "maximum nesting depth exceeded";
            if (message.refType != null && Object.hasOwnProperty.call(message, "refType"))
                if (!$util.isString(message.refType))
                    return "refType: string expected";
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                    return "value: buffer expected";
            return null;
        };

        /**
         * Creates a DebugRefInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Dag.DebugRefInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Dag.DebugRefInfo} DebugRefInfo
         */
        DebugRefInfo.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Dag.DebugRefInfo)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Dag.DebugRefInfo: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Dag.DebugRefInfo();
            if (object.refType != null)
                message.refType = String(object.refType);
            if (object.value != null)
                if (typeof object.value === "string")
                    $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                else if (object.value.length >= 0)
                    message.value = object.value;
            return message;
        };

        /**
         * Creates a plain object from a DebugRefInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Dag.DebugRefInfo
         * @static
         * @param {Dag.DebugRefInfo} message DebugRefInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DebugRefInfo.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.refType = "";
                if (options.bytes === String)
                    object.value = "";
                else {
                    object.value = [];
                    if (options.bytes !== Array)
                        object.value = $util.newBuffer(object.value);
                }
            }
            if (message.refType != null && Object.hasOwnProperty.call(message, "refType"))
                object.refType = message.refType;
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
            return object;
        };

        /**
         * Converts this DebugRefInfo to JSON.
         * @function toJSON
         * @memberof Dag.DebugRefInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DebugRefInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DebugRefInfo
         * @function getTypeUrl
         * @memberof Dag.DebugRefInfo
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DebugRefInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Dag.DebugRefInfo";
        };

        return DebugRefInfo;
    })();

    return Dag;
})();

/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const record = $root.record = (() => {

    /**
     * Namespace record.
     * @exports record
     * @namespace
     */
    const record = {};

    record.v3 = (function() {

        /**
         * Namespace v3.
         * @memberof record
         * @namespace
         */
        const v3 = {};

        v3.sharing = (function() {

            /**
             * Namespace sharing.
             * @memberof record.v3
             * @namespace
             */
            const sharing = {};

            sharing.RecordSharingService = (function() {

                /**
                 * Constructs a new RecordSharingService service.
                 * @memberof record.v3.sharing
                 * @classdesc Represents a RecordSharingService
                 * @extends $protobuf.rpc.Service
                 * @constructor
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 */
                function RecordSharingService(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }

                (RecordSharingService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = RecordSharingService;

                /**
                 * Creates new RecordSharingService service using the specified rpc implementation.
                 * @function create
                 * @memberof record.v3.sharing.RecordSharingService
                 * @static
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 * @returns {RecordSharingService} RPC service. Useful where requests and/or responses are streamed.
                 */
                RecordSharingService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                };

                /**
                 * Callback as used by {@link record.v3.sharing.RecordSharingService#shareRecord}.
                 * @memberof record.v3.sharing.RecordSharingService
                 * @typedef ShareRecordCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {record.v3.sharing.Response} [response] Response
                 */

                /**
                 * Manage direct sharing of records: grant, update and revoke user access to
                 * records in the same request
                 * @function shareRecord
                 * @memberof record.v3.sharing.RecordSharingService
                 * @instance
                 * @param {record.v3.sharing.IRequest} request Request message or plain object
                 * @param {record.v3.sharing.RecordSharingService.ShareRecordCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(RecordSharingService.prototype.shareRecord = function shareRecord(request, callback) {
                    return $protobuf.rpc.Service.prototype.rpcCall.call(this, shareRecord, $root.record.v3.sharing.Request, $root.record.v3.sharing.Response, request, callback);
                }, "name", { value: "ShareRecord" });

                /**
                 * Manage direct sharing of records: grant, update and revoke user access to
                 * records in the same request
                 * @function shareRecord
                 * @memberof record.v3.sharing.RecordSharingService
                 * @instance
                 * @param {record.v3.sharing.IRequest} request Request message or plain object
                 * @returns {Promise<record.v3.sharing.Response>} Promise
                 * @variation 2
                 */

                return RecordSharingService;
            })();

            sharing.Request = (function() {

                /**
                 * Properties of a Request.
                 * @memberof record.v3.sharing
                 * @interface IRequest
                 * @property {Array.<record.v3.sharing.IPermissions>|null} [createSharingPermissions] add new permissions to a list of existing records
                 * corresponds to creating new records shares, directly with "someone", whether a team or a specific user
                 * @property {Array.<record.v3.sharing.IPermissions>|null} [updateSharingPermissions] update existing permissions of a list of existing records shared with a team or a user
                 * @property {Array.<record.v3.sharing.IPermissions>|null} [revokeSharingPermissions] remove all sharing permissions from existing records
                 * specified records that were previously shared with "someone" (user or team) directly will be "unshared"
                 * @property {string|null} [echo] A string that is sent back in the push notification to identify the user who initiated the push (device id)
                 */

                /**
                 * Constructs a new Request.
                 * @memberof record.v3.sharing
                 * @classdesc Represents a request encapsulating new, updated and deleted record sharing permissions.
                 * References:
                 * https://keeper.atlassian.net/wiki/spaces/FEAT/pages/1540653191/Shared+Subfolder+Permissions+aka+best+project+ever
                 * https://keeper.atlassian.net/wiki/spaces/KA/pages/2520711174/records_share_update+v3
                 * @implements IRequest
                 * @constructor
                 * @param {record.v3.sharing.IRequest=} [properties] Properties to set
                 */
                function Request(properties) {
                    this.createSharingPermissions = [];
                    this.updateSharingPermissions = [];
                    this.revokeSharingPermissions = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * add new permissions to a list of existing records
                 * corresponds to creating new records shares, directly with "someone", whether a team or a specific user
                 * @member {Array.<record.v3.sharing.IPermissions>} createSharingPermissions
                 * @memberof record.v3.sharing.Request
                 * @instance
                 */
                Request.prototype.createSharingPermissions = $util.emptyArray;

                /**
                 * update existing permissions of a list of existing records shared with a team or a user
                 * @member {Array.<record.v3.sharing.IPermissions>} updateSharingPermissions
                 * @memberof record.v3.sharing.Request
                 * @instance
                 */
                Request.prototype.updateSharingPermissions = $util.emptyArray;

                /**
                 * remove all sharing permissions from existing records
                 * specified records that were previously shared with "someone" (user or team) directly will be "unshared"
                 * @member {Array.<record.v3.sharing.IPermissions>} revokeSharingPermissions
                 * @memberof record.v3.sharing.Request
                 * @instance
                 */
                Request.prototype.revokeSharingPermissions = $util.emptyArray;

                /**
                 * A string that is sent back in the push notification to identify the user who initiated the push (device id)
                 * @member {string} echo
                 * @memberof record.v3.sharing.Request
                 * @instance
                 */
                Request.prototype.echo = "";

                /**
                 * Creates a new Request instance using the specified properties.
                 * @function create
                 * @memberof record.v3.sharing.Request
                 * @static
                 * @param {record.v3.sharing.IRequest=} [properties] Properties to set
                 * @returns {record.v3.sharing.Request} Request instance
                 */
                Request.create = function create(properties) {
                    return new Request(properties);
                };

                /**
                 * Encodes the specified Request message. Does not implicitly {@link record.v3.sharing.Request.verify|verify} messages.
                 * @function encode
                 * @memberof record.v3.sharing.Request
                 * @static
                 * @param {record.v3.sharing.IRequest} message Request message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Request.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.createSharingPermissions != null && message.createSharingPermissions.length)
                        for (let i = 0; i < message.createSharingPermissions.length; ++i)
                            $root.record.v3.sharing.Permissions.encode(message.createSharingPermissions[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                    if (message.updateSharingPermissions != null && message.updateSharingPermissions.length)
                        for (let i = 0; i < message.updateSharingPermissions.length; ++i)
                            $root.record.v3.sharing.Permissions.encode(message.updateSharingPermissions[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                    if (message.revokeSharingPermissions != null && message.revokeSharingPermissions.length)
                        for (let i = 0; i < message.revokeSharingPermissions.length; ++i)
                            $root.record.v3.sharing.Permissions.encode(message.revokeSharingPermissions[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                    if (message.echo != null && Object.hasOwnProperty.call(message, "echo"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.echo);
                    return writer;
                };

                /**
                 * Encodes the specified Request message, length delimited. Does not implicitly {@link record.v3.sharing.Request.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof record.v3.sharing.Request
                 * @static
                 * @param {record.v3.sharing.IRequest} message Request message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Request.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a Request message from the specified reader or buffer.
                 * @function decode
                 * @memberof record.v3.sharing.Request
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {record.v3.sharing.Request} Request
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Request.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.record.v3.sharing.Request();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.createSharingPermissions && message.createSharingPermissions.length))
                                    message.createSharingPermissions = [];
                                message.createSharingPermissions.push($root.record.v3.sharing.Permissions.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 2: {
                                if (!(message.updateSharingPermissions && message.updateSharingPermissions.length))
                                    message.updateSharingPermissions = [];
                                message.updateSharingPermissions.push($root.record.v3.sharing.Permissions.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 3: {
                                if (!(message.revokeSharingPermissions && message.revokeSharingPermissions.length))
                                    message.revokeSharingPermissions = [];
                                message.revokeSharingPermissions.push($root.record.v3.sharing.Permissions.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 4: {
                                message.echo = reader.string();
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
                 * Decodes a Request message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof record.v3.sharing.Request
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {record.v3.sharing.Request} Request
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Request.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Request message.
                 * @function verify
                 * @memberof record.v3.sharing.Request
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Request.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.createSharingPermissions != null && Object.hasOwnProperty.call(message, "createSharingPermissions")) {
                        if (!Array.isArray(message.createSharingPermissions))
                            return "createSharingPermissions: array expected";
                        for (let i = 0; i < message.createSharingPermissions.length; ++i) {
                            let error = $root.record.v3.sharing.Permissions.verify(message.createSharingPermissions[i], long + 1);
                            if (error)
                                return "createSharingPermissions." + error;
                        }
                    }
                    if (message.updateSharingPermissions != null && Object.hasOwnProperty.call(message, "updateSharingPermissions")) {
                        if (!Array.isArray(message.updateSharingPermissions))
                            return "updateSharingPermissions: array expected";
                        for (let i = 0; i < message.updateSharingPermissions.length; ++i) {
                            let error = $root.record.v3.sharing.Permissions.verify(message.updateSharingPermissions[i], long + 1);
                            if (error)
                                return "updateSharingPermissions." + error;
                        }
                    }
                    if (message.revokeSharingPermissions != null && Object.hasOwnProperty.call(message, "revokeSharingPermissions")) {
                        if (!Array.isArray(message.revokeSharingPermissions))
                            return "revokeSharingPermissions: array expected";
                        for (let i = 0; i < message.revokeSharingPermissions.length; ++i) {
                            let error = $root.record.v3.sharing.Permissions.verify(message.revokeSharingPermissions[i], long + 1);
                            if (error)
                                return "revokeSharingPermissions." + error;
                        }
                    }
                    if (message.echo != null && Object.hasOwnProperty.call(message, "echo"))
                        if (!$util.isString(message.echo))
                            return "echo: string expected";
                    return null;
                };

                /**
                 * Creates a Request message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof record.v3.sharing.Request
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {record.v3.sharing.Request} Request
                 */
                Request.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.record.v3.sharing.Request)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".record.v3.sharing.Request: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.record.v3.sharing.Request();
                    if (object.createSharingPermissions) {
                        if (!Array.isArray(object.createSharingPermissions))
                            throw TypeError(".record.v3.sharing.Request.createSharingPermissions: array expected");
                        message.createSharingPermissions = [];
                        for (let i = 0; i < object.createSharingPermissions.length; ++i) {
                            if (!$util.isObject(object.createSharingPermissions[i]))
                                throw TypeError(".record.v3.sharing.Request.createSharingPermissions: object expected");
                            message.createSharingPermissions[i] = $root.record.v3.sharing.Permissions.fromObject(object.createSharingPermissions[i], long + 1);
                        }
                    }
                    if (object.updateSharingPermissions) {
                        if (!Array.isArray(object.updateSharingPermissions))
                            throw TypeError(".record.v3.sharing.Request.updateSharingPermissions: array expected");
                        message.updateSharingPermissions = [];
                        for (let i = 0; i < object.updateSharingPermissions.length; ++i) {
                            if (!$util.isObject(object.updateSharingPermissions[i]))
                                throw TypeError(".record.v3.sharing.Request.updateSharingPermissions: object expected");
                            message.updateSharingPermissions[i] = $root.record.v3.sharing.Permissions.fromObject(object.updateSharingPermissions[i], long + 1);
                        }
                    }
                    if (object.revokeSharingPermissions) {
                        if (!Array.isArray(object.revokeSharingPermissions))
                            throw TypeError(".record.v3.sharing.Request.revokeSharingPermissions: array expected");
                        message.revokeSharingPermissions = [];
                        for (let i = 0; i < object.revokeSharingPermissions.length; ++i) {
                            if (!$util.isObject(object.revokeSharingPermissions[i]))
                                throw TypeError(".record.v3.sharing.Request.revokeSharingPermissions: object expected");
                            message.revokeSharingPermissions[i] = $root.record.v3.sharing.Permissions.fromObject(object.revokeSharingPermissions[i], long + 1);
                        }
                    }
                    if (object.echo != null)
                        message.echo = String(object.echo);
                    return message;
                };

                /**
                 * Creates a plain object from a Request message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof record.v3.sharing.Request
                 * @static
                 * @param {record.v3.sharing.Request} message Request
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Request.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults) {
                        object.createSharingPermissions = [];
                        object.updateSharingPermissions = [];
                        object.revokeSharingPermissions = [];
                    }
                    if (options.defaults)
                        object.echo = "";
                    if (message.createSharingPermissions && message.createSharingPermissions.length) {
                        object.createSharingPermissions = [];
                        for (let j = 0; j < message.createSharingPermissions.length; ++j)
                            object.createSharingPermissions[j] = $root.record.v3.sharing.Permissions.toObject(message.createSharingPermissions[j], options, q + 1);
                    }
                    if (message.updateSharingPermissions && message.updateSharingPermissions.length) {
                        object.updateSharingPermissions = [];
                        for (let j = 0; j < message.updateSharingPermissions.length; ++j)
                            object.updateSharingPermissions[j] = $root.record.v3.sharing.Permissions.toObject(message.updateSharingPermissions[j], options, q + 1);
                    }
                    if (message.revokeSharingPermissions && message.revokeSharingPermissions.length) {
                        object.revokeSharingPermissions = [];
                        for (let j = 0; j < message.revokeSharingPermissions.length; ++j)
                            object.revokeSharingPermissions[j] = $root.record.v3.sharing.Permissions.toObject(message.revokeSharingPermissions[j], options, q + 1);
                    }
                    if (message.echo != null && Object.hasOwnProperty.call(message, "echo"))
                        object.echo = message.echo;
                    return object;
                };

                /**
                 * Converts this Request to JSON.
                 * @function toJSON
                 * @memberof record.v3.sharing.Request
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Request.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Request
                 * @function getTypeUrl
                 * @memberof record.v3.sharing.Request
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Request.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/record.v3.sharing.Request";
                };

                return Request;
            })();

            sharing.Permissions = (function() {

                /**
                 * Properties of a Permissions.
                 * @memberof record.v3.sharing
                 * @interface IPermissions
                 * @property {Uint8Array|null} [recipientUid] The uid of the recipient the record is shared with. Must be either a team uid or a user uid.
                 * @property {Uint8Array|null} [recordUid] Identifier of the record being shared or whose sharing permissions are being updated/removed
                 * @property {Uint8Array|null} [recordKey] The record key encrypted with the recipient's public key (see. @username)
                 * @property {boolean|null} [useEccKey] Use ECIES algorithm instead of RSA to share to the recipient's public ECC key (see. @username)
                 * @property {Folder.IRecordAccessData|null} [rules] The set of record permissions granted to the recipient (@username).
                 * Permissions apply in the context of the specified folder.
                 */

                /**
                 * Constructs a new Permissions.
                 * @memberof record.v3.sharing
                 * @classdesc Represents a Permissions.
                 * @implements IPermissions
                 * @constructor
                 * @param {record.v3.sharing.IPermissions=} [properties] Properties to set
                 */
                function Permissions(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * The uid of the recipient the record is shared with. Must be either a team uid or a user uid.
                 * @member {Uint8Array} recipientUid
                 * @memberof record.v3.sharing.Permissions
                 * @instance
                 */
                Permissions.prototype.recipientUid = $util.newBuffer([]);

                /**
                 * Identifier of the record being shared or whose sharing permissions are being updated/removed
                 * @member {Uint8Array} recordUid
                 * @memberof record.v3.sharing.Permissions
                 * @instance
                 */
                Permissions.prototype.recordUid = $util.newBuffer([]);

                /**
                 * The record key encrypted with the recipient's public key (see. @username)
                 * @member {Uint8Array} recordKey
                 * @memberof record.v3.sharing.Permissions
                 * @instance
                 */
                Permissions.prototype.recordKey = $util.newBuffer([]);

                /**
                 * Use ECIES algorithm instead of RSA to share to the recipient's public ECC key (see. @username)
                 * @member {boolean} useEccKey
                 * @memberof record.v3.sharing.Permissions
                 * @instance
                 */
                Permissions.prototype.useEccKey = false;

                /**
                 * The set of record permissions granted to the recipient (@username).
                 * Permissions apply in the context of the specified folder.
                 * @member {Folder.IRecordAccessData|null|undefined} rules
                 * @memberof record.v3.sharing.Permissions
                 * @instance
                 */
                Permissions.prototype.rules = null;

                /**
                 * Creates a new Permissions instance using the specified properties.
                 * @function create
                 * @memberof record.v3.sharing.Permissions
                 * @static
                 * @param {record.v3.sharing.IPermissions=} [properties] Properties to set
                 * @returns {record.v3.sharing.Permissions} Permissions instance
                 */
                Permissions.create = function create(properties) {
                    return new Permissions(properties);
                };

                /**
                 * Encodes the specified Permissions message. Does not implicitly {@link record.v3.sharing.Permissions.verify|verify} messages.
                 * @function encode
                 * @memberof record.v3.sharing.Permissions
                 * @static
                 * @param {record.v3.sharing.IPermissions} message Permissions message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Permissions.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.recipientUid != null && Object.hasOwnProperty.call(message, "recipientUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recipientUid);
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.recordUid);
                    if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                        writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.recordKey);
                    if (message.useEccKey != null && Object.hasOwnProperty.call(message, "useEccKey"))
                        writer.uint32(/* id 5, wireType 0 =*/40).bool(message.useEccKey);
                    if (message.rules != null && Object.hasOwnProperty.call(message, "rules"))
                        $root.Folder.RecordAccessData.encode(message.rules, writer.uint32(/* id 6, wireType 2 =*/50).fork(), q + 1).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Permissions message, length delimited. Does not implicitly {@link record.v3.sharing.Permissions.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof record.v3.sharing.Permissions
                 * @static
                 * @param {record.v3.sharing.IPermissions} message Permissions message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Permissions.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a Permissions message from the specified reader or buffer.
                 * @function decode
                 * @memberof record.v3.sharing.Permissions
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {record.v3.sharing.Permissions} Permissions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Permissions.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.record.v3.sharing.Permissions();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.recipientUid = reader.bytes();
                                break;
                            }
                        case 3: {
                                message.recordUid = reader.bytes();
                                break;
                            }
                        case 4: {
                                message.recordKey = reader.bytes();
                                break;
                            }
                        case 5: {
                                message.useEccKey = reader.bool();
                                break;
                            }
                        case 6: {
                                message.rules = $root.Folder.RecordAccessData.decode(reader, reader.uint32(), undefined, long + 1);
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
                 * Decodes a Permissions message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof record.v3.sharing.Permissions
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {record.v3.sharing.Permissions} Permissions
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Permissions.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Permissions message.
                 * @function verify
                 * @memberof record.v3.sharing.Permissions
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Permissions.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.recipientUid != null && Object.hasOwnProperty.call(message, "recipientUid"))
                        if (!(message.recipientUid && typeof message.recipientUid.length === "number" || $util.isString(message.recipientUid)))
                            return "recipientUid: buffer expected";
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                            return "recordUid: buffer expected";
                    if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                        if (!(message.recordKey && typeof message.recordKey.length === "number" || $util.isString(message.recordKey)))
                            return "recordKey: buffer expected";
                    if (message.useEccKey != null && Object.hasOwnProperty.call(message, "useEccKey"))
                        if (typeof message.useEccKey !== "boolean")
                            return "useEccKey: boolean expected";
                    if (message.rules != null && Object.hasOwnProperty.call(message, "rules")) {
                        let error = $root.Folder.RecordAccessData.verify(message.rules, long + 1);
                        if (error)
                            return "rules." + error;
                    }
                    return null;
                };

                /**
                 * Creates a Permissions message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof record.v3.sharing.Permissions
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {record.v3.sharing.Permissions} Permissions
                 */
                Permissions.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.record.v3.sharing.Permissions)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".record.v3.sharing.Permissions: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.record.v3.sharing.Permissions();
                    if (object.recipientUid != null)
                        if (typeof object.recipientUid === "string")
                            $util.base64.decode(object.recipientUid, message.recipientUid = $util.newBuffer($util.base64.length(object.recipientUid)), 0);
                        else if (object.recipientUid.length >= 0)
                            message.recipientUid = object.recipientUid;
                    if (object.recordUid != null)
                        if (typeof object.recordUid === "string")
                            $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                        else if (object.recordUid.length >= 0)
                            message.recordUid = object.recordUid;
                    if (object.recordKey != null)
                        if (typeof object.recordKey === "string")
                            $util.base64.decode(object.recordKey, message.recordKey = $util.newBuffer($util.base64.length(object.recordKey)), 0);
                        else if (object.recordKey.length >= 0)
                            message.recordKey = object.recordKey;
                    if (object.useEccKey != null)
                        message.useEccKey = Boolean(object.useEccKey);
                    if (object.rules != null) {
                        if (!$util.isObject(object.rules))
                            throw TypeError(".record.v3.sharing.Permissions.rules: object expected");
                        message.rules = $root.Folder.RecordAccessData.fromObject(object.rules, long + 1);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Permissions message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof record.v3.sharing.Permissions
                 * @static
                 * @param {record.v3.sharing.Permissions} message Permissions
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Permissions.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.recipientUid = "";
                        else {
                            object.recipientUid = [];
                            if (options.bytes !== Array)
                                object.recipientUid = $util.newBuffer(object.recipientUid);
                        }
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
                        object.useEccKey = false;
                        object.rules = null;
                    }
                    if (message.recipientUid != null && Object.hasOwnProperty.call(message, "recipientUid"))
                        object.recipientUid = options.bytes === String ? $util.base64.encode(message.recipientUid, 0, message.recipientUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recipientUid) : message.recipientUid;
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
                    if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                        object.recordKey = options.bytes === String ? $util.base64.encode(message.recordKey, 0, message.recordKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordKey) : message.recordKey;
                    if (message.useEccKey != null && Object.hasOwnProperty.call(message, "useEccKey"))
                        object.useEccKey = message.useEccKey;
                    if (message.rules != null && Object.hasOwnProperty.call(message, "rules"))
                        object.rules = $root.Folder.RecordAccessData.toObject(message.rules, options, q + 1);
                    return object;
                };

                /**
                 * Converts this Permissions to JSON.
                 * @function toJSON
                 * @memberof record.v3.sharing.Permissions
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Permissions.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Permissions
                 * @function getTypeUrl
                 * @memberof record.v3.sharing.Permissions
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Permissions.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/record.v3.sharing.Permissions";
                };

                return Permissions;
            })();

            sharing.Response = (function() {

                /**
                 * Properties of a Response.
                 * @memberof record.v3.sharing
                 * @interface IResponse
                 * @property {Array.<record.v3.sharing.IStatus>|null} [createdSharingStatus] The list of the respective sharing status of the newly shared records
                 * @property {Array.<record.v3.sharing.IStatus>|null} [updatedSharingStatus] The list of the respective sharing status of the updated shared records
                 * @property {Array.<record.v3.sharing.IStatus>|null} [revokedSharingStatus] The list of the respective sharing status of records that have been "unshared"
                 */

                /**
                 * Constructs a new Response.
                 * @memberof record.v3.sharing
                 * @classdesc Represents a Response.
                 * @implements IResponse
                 * @constructor
                 * @param {record.v3.sharing.IResponse=} [properties] Properties to set
                 */
                function Response(properties) {
                    this.createdSharingStatus = [];
                    this.updatedSharingStatus = [];
                    this.revokedSharingStatus = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * The list of the respective sharing status of the newly shared records
                 * @member {Array.<record.v3.sharing.IStatus>} createdSharingStatus
                 * @memberof record.v3.sharing.Response
                 * @instance
                 */
                Response.prototype.createdSharingStatus = $util.emptyArray;

                /**
                 * The list of the respective sharing status of the updated shared records
                 * @member {Array.<record.v3.sharing.IStatus>} updatedSharingStatus
                 * @memberof record.v3.sharing.Response
                 * @instance
                 */
                Response.prototype.updatedSharingStatus = $util.emptyArray;

                /**
                 * The list of the respective sharing status of records that have been "unshared"
                 * @member {Array.<record.v3.sharing.IStatus>} revokedSharingStatus
                 * @memberof record.v3.sharing.Response
                 * @instance
                 */
                Response.prototype.revokedSharingStatus = $util.emptyArray;

                /**
                 * Creates a new Response instance using the specified properties.
                 * @function create
                 * @memberof record.v3.sharing.Response
                 * @static
                 * @param {record.v3.sharing.IResponse=} [properties] Properties to set
                 * @returns {record.v3.sharing.Response} Response instance
                 */
                Response.create = function create(properties) {
                    return new Response(properties);
                };

                /**
                 * Encodes the specified Response message. Does not implicitly {@link record.v3.sharing.Response.verify|verify} messages.
                 * @function encode
                 * @memberof record.v3.sharing.Response
                 * @static
                 * @param {record.v3.sharing.IResponse} message Response message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Response.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.createdSharingStatus != null && message.createdSharingStatus.length)
                        for (let i = 0; i < message.createdSharingStatus.length; ++i)
                            $root.record.v3.sharing.Status.encode(message.createdSharingStatus[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                    if (message.updatedSharingStatus != null && message.updatedSharingStatus.length)
                        for (let i = 0; i < message.updatedSharingStatus.length; ++i)
                            $root.record.v3.sharing.Status.encode(message.updatedSharingStatus[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                    if (message.revokedSharingStatus != null && message.revokedSharingStatus.length)
                        for (let i = 0; i < message.revokedSharingStatus.length; ++i)
                            $root.record.v3.sharing.Status.encode(message.revokedSharingStatus[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Response message, length delimited. Does not implicitly {@link record.v3.sharing.Response.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof record.v3.sharing.Response
                 * @static
                 * @param {record.v3.sharing.IResponse} message Response message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Response.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a Response message from the specified reader or buffer.
                 * @function decode
                 * @memberof record.v3.sharing.Response
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {record.v3.sharing.Response} Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Response.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.record.v3.sharing.Response();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.createdSharingStatus && message.createdSharingStatus.length))
                                    message.createdSharingStatus = [];
                                message.createdSharingStatus.push($root.record.v3.sharing.Status.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 2: {
                                if (!(message.updatedSharingStatus && message.updatedSharingStatus.length))
                                    message.updatedSharingStatus = [];
                                message.updatedSharingStatus.push($root.record.v3.sharing.Status.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 3: {
                                if (!(message.revokedSharingStatus && message.revokedSharingStatus.length))
                                    message.revokedSharingStatus = [];
                                message.revokedSharingStatus.push($root.record.v3.sharing.Status.decode(reader, reader.uint32(), undefined, long + 1));
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
                 * Decodes a Response message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof record.v3.sharing.Response
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {record.v3.sharing.Response} Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Response.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Response message.
                 * @function verify
                 * @memberof record.v3.sharing.Response
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Response.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.createdSharingStatus != null && Object.hasOwnProperty.call(message, "createdSharingStatus")) {
                        if (!Array.isArray(message.createdSharingStatus))
                            return "createdSharingStatus: array expected";
                        for (let i = 0; i < message.createdSharingStatus.length; ++i) {
                            let error = $root.record.v3.sharing.Status.verify(message.createdSharingStatus[i], long + 1);
                            if (error)
                                return "createdSharingStatus." + error;
                        }
                    }
                    if (message.updatedSharingStatus != null && Object.hasOwnProperty.call(message, "updatedSharingStatus")) {
                        if (!Array.isArray(message.updatedSharingStatus))
                            return "updatedSharingStatus: array expected";
                        for (let i = 0; i < message.updatedSharingStatus.length; ++i) {
                            let error = $root.record.v3.sharing.Status.verify(message.updatedSharingStatus[i], long + 1);
                            if (error)
                                return "updatedSharingStatus." + error;
                        }
                    }
                    if (message.revokedSharingStatus != null && Object.hasOwnProperty.call(message, "revokedSharingStatus")) {
                        if (!Array.isArray(message.revokedSharingStatus))
                            return "revokedSharingStatus: array expected";
                        for (let i = 0; i < message.revokedSharingStatus.length; ++i) {
                            let error = $root.record.v3.sharing.Status.verify(message.revokedSharingStatus[i], long + 1);
                            if (error)
                                return "revokedSharingStatus." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Response message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof record.v3.sharing.Response
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {record.v3.sharing.Response} Response
                 */
                Response.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.record.v3.sharing.Response)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".record.v3.sharing.Response: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.record.v3.sharing.Response();
                    if (object.createdSharingStatus) {
                        if (!Array.isArray(object.createdSharingStatus))
                            throw TypeError(".record.v3.sharing.Response.createdSharingStatus: array expected");
                        message.createdSharingStatus = [];
                        for (let i = 0; i < object.createdSharingStatus.length; ++i) {
                            if (!$util.isObject(object.createdSharingStatus[i]))
                                throw TypeError(".record.v3.sharing.Response.createdSharingStatus: object expected");
                            message.createdSharingStatus[i] = $root.record.v3.sharing.Status.fromObject(object.createdSharingStatus[i], long + 1);
                        }
                    }
                    if (object.updatedSharingStatus) {
                        if (!Array.isArray(object.updatedSharingStatus))
                            throw TypeError(".record.v3.sharing.Response.updatedSharingStatus: array expected");
                        message.updatedSharingStatus = [];
                        for (let i = 0; i < object.updatedSharingStatus.length; ++i) {
                            if (!$util.isObject(object.updatedSharingStatus[i]))
                                throw TypeError(".record.v3.sharing.Response.updatedSharingStatus: object expected");
                            message.updatedSharingStatus[i] = $root.record.v3.sharing.Status.fromObject(object.updatedSharingStatus[i], long + 1);
                        }
                    }
                    if (object.revokedSharingStatus) {
                        if (!Array.isArray(object.revokedSharingStatus))
                            throw TypeError(".record.v3.sharing.Response.revokedSharingStatus: array expected");
                        message.revokedSharingStatus = [];
                        for (let i = 0; i < object.revokedSharingStatus.length; ++i) {
                            if (!$util.isObject(object.revokedSharingStatus[i]))
                                throw TypeError(".record.v3.sharing.Response.revokedSharingStatus: object expected");
                            message.revokedSharingStatus[i] = $root.record.v3.sharing.Status.fromObject(object.revokedSharingStatus[i], long + 1);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Response message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof record.v3.sharing.Response
                 * @static
                 * @param {record.v3.sharing.Response} message Response
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Response.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults) {
                        object.createdSharingStatus = [];
                        object.updatedSharingStatus = [];
                        object.revokedSharingStatus = [];
                    }
                    if (message.createdSharingStatus && message.createdSharingStatus.length) {
                        object.createdSharingStatus = [];
                        for (let j = 0; j < message.createdSharingStatus.length; ++j)
                            object.createdSharingStatus[j] = $root.record.v3.sharing.Status.toObject(message.createdSharingStatus[j], options, q + 1);
                    }
                    if (message.updatedSharingStatus && message.updatedSharingStatus.length) {
                        object.updatedSharingStatus = [];
                        for (let j = 0; j < message.updatedSharingStatus.length; ++j)
                            object.updatedSharingStatus[j] = $root.record.v3.sharing.Status.toObject(message.updatedSharingStatus[j], options, q + 1);
                    }
                    if (message.revokedSharingStatus && message.revokedSharingStatus.length) {
                        object.revokedSharingStatus = [];
                        for (let j = 0; j < message.revokedSharingStatus.length; ++j)
                            object.revokedSharingStatus[j] = $root.record.v3.sharing.Status.toObject(message.revokedSharingStatus[j], options, q + 1);
                    }
                    return object;
                };

                /**
                 * Converts this Response to JSON.
                 * @function toJSON
                 * @memberof record.v3.sharing.Response
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Response.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Response
                 * @function getTypeUrl
                 * @memberof record.v3.sharing.Response
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/record.v3.sharing.Response";
                };

                return Response;
            })();

            sharing.Status = (function() {

                /**
                 * Properties of a Status.
                 * @memberof record.v3.sharing
                 * @interface IStatus
                 * @property {Uint8Array|null} [recordUid] Identifier of the record being shared or whose sharing permissions are being updated/removed
                 * @property {record.v3.sharing.SharingStatus|null} [status] Status of the request (success or error)
                 * @property {string|null} [message] Translatable, human-readable message
                 * @property {Uint8Array|null} [recipientUid] XOR(userUid, teamUid); the recipient the record was shared with
                 */

                /**
                 * Constructs a new Status.
                 * @memberof record.v3.sharing
                 * @classdesc Represents a Status.
                 * @implements IStatus
                 * @constructor
                 * @param {record.v3.sharing.IStatus=} [properties] Properties to set
                 */
                function Status(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Identifier of the record being shared or whose sharing permissions are being updated/removed
                 * @member {Uint8Array} recordUid
                 * @memberof record.v3.sharing.Status
                 * @instance
                 */
                Status.prototype.recordUid = $util.newBuffer([]);

                /**
                 * Status of the request (success or error)
                 * @member {record.v3.sharing.SharingStatus} status
                 * @memberof record.v3.sharing.Status
                 * @instance
                 */
                Status.prototype.status = 0;

                /**
                 * Translatable, human-readable message
                 * @member {string} message
                 * @memberof record.v3.sharing.Status
                 * @instance
                 */
                Status.prototype.message = "";

                /**
                 * XOR(userUid, teamUid); the recipient the record was shared with
                 * @member {Uint8Array} recipientUid
                 * @memberof record.v3.sharing.Status
                 * @instance
                 */
                Status.prototype.recipientUid = $util.newBuffer([]);

                /**
                 * Creates a new Status instance using the specified properties.
                 * @function create
                 * @memberof record.v3.sharing.Status
                 * @static
                 * @param {record.v3.sharing.IStatus=} [properties] Properties to set
                 * @returns {record.v3.sharing.Status} Status instance
                 */
                Status.create = function create(properties) {
                    return new Status(properties);
                };

                /**
                 * Encodes the specified Status message. Does not implicitly {@link record.v3.sharing.Status.verify|verify} messages.
                 * @function encode
                 * @memberof record.v3.sharing.Status
                 * @static
                 * @param {record.v3.sharing.IStatus} message Status message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Status.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.status);
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
                    if (message.recipientUid != null && Object.hasOwnProperty.call(message, "recipientUid"))
                        writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.recipientUid);
                    return writer;
                };

                /**
                 * Encodes the specified Status message, length delimited. Does not implicitly {@link record.v3.sharing.Status.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof record.v3.sharing.Status
                 * @static
                 * @param {record.v3.sharing.IStatus} message Status message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Status.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a Status message from the specified reader or buffer.
                 * @function decode
                 * @memberof record.v3.sharing.Status
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {record.v3.sharing.Status} Status
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Status.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.record.v3.sharing.Status();
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
                                message.status = reader.int32();
                                break;
                            }
                        case 3: {
                                message.message = reader.string();
                                break;
                            }
                        case 4: {
                                message.recipientUid = reader.bytes();
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
                 * Decodes a Status message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof record.v3.sharing.Status
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {record.v3.sharing.Status} Status
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Status.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Status message.
                 * @function verify
                 * @memberof record.v3.sharing.Status
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Status.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                            return "recordUid: buffer expected";
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        switch (message.status) {
                        default:
                            return "status: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                            break;
                        }
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        if (!$util.isString(message.message))
                            return "message: string expected";
                    if (message.recipientUid != null && Object.hasOwnProperty.call(message, "recipientUid"))
                        if (!(message.recipientUid && typeof message.recipientUid.length === "number" || $util.isString(message.recipientUid)))
                            return "recipientUid: buffer expected";
                    return null;
                };

                /**
                 * Creates a Status message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof record.v3.sharing.Status
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {record.v3.sharing.Status} Status
                 */
                Status.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.record.v3.sharing.Status)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".record.v3.sharing.Status: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.record.v3.sharing.Status();
                    if (object.recordUid != null)
                        if (typeof object.recordUid === "string")
                            $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                        else if (object.recordUid.length >= 0)
                            message.recordUid = object.recordUid;
                    switch (object.status) {
                    default:
                        if (typeof object.status === "number") {
                            message.status = object.status;
                            break;
                        }
                        break;
                    case "SUCCESS":
                    case 0:
                        message.status = 0;
                        break;
                    case "PENDING_ACCEPT":
                    case 1:
                        message.status = 1;
                        break;
                    case "USER_NOT_FOUND":
                    case 2:
                        message.status = 2;
                        break;
                    case "ALREADY_SHARED":
                    case 3:
                        message.status = 3;
                        break;
                    case "NOT_ALLOWED_TO_SHARE":
                    case 4:
                        message.status = 4;
                        break;
                    case "ACCESS_DENIED":
                    case 5:
                        message.status = 5;
                        break;
                    case "NOT_ALLOWED_TO_SET_PERMISSIONS":
                    case 6:
                        message.status = 6;
                        break;
                    }
                    if (object.message != null)
                        message.message = String(object.message);
                    if (object.recipientUid != null)
                        if (typeof object.recipientUid === "string")
                            $util.base64.decode(object.recipientUid, message.recipientUid = $util.newBuffer($util.base64.length(object.recipientUid)), 0);
                        else if (object.recipientUid.length >= 0)
                            message.recipientUid = object.recipientUid;
                    return message;
                };

                /**
                 * Creates a plain object from a Status message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof record.v3.sharing.Status
                 * @static
                 * @param {record.v3.sharing.Status} message Status
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Status.toObject = function toObject(message, options, q) {
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
                        object.status = options.enums === String ? "SUCCESS" : 0;
                        object.message = "";
                        if (options.bytes === String)
                            object.recipientUid = "";
                        else {
                            object.recipientUid = [];
                            if (options.bytes !== Array)
                                object.recipientUid = $util.newBuffer(object.recipientUid);
                        }
                    }
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        object.status = options.enums === String ? $root.record.v3.sharing.SharingStatus[message.status] === undefined ? message.status : $root.record.v3.sharing.SharingStatus[message.status] : message.status;
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        object.message = message.message;
                    if (message.recipientUid != null && Object.hasOwnProperty.call(message, "recipientUid"))
                        object.recipientUid = options.bytes === String ? $util.base64.encode(message.recipientUid, 0, message.recipientUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recipientUid) : message.recipientUid;
                    return object;
                };

                /**
                 * Converts this Status to JSON.
                 * @function toJSON
                 * @memberof record.v3.sharing.Status
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Status.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Status
                 * @function getTypeUrl
                 * @memberof record.v3.sharing.Status
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Status.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/record.v3.sharing.Status";
                };

                return Status;
            })();

            /**
             * SharingStatus enum.
             * @name record.v3.sharing.SharingStatus
             * @enum {number}
             * @property {number} SUCCESS=0 SUCCESS value
             * @property {number} PENDING_ACCEPT=1 PENDING_ACCEPT value
             * @property {number} USER_NOT_FOUND=2 USER_NOT_FOUND value
             * @property {number} ALREADY_SHARED=3 ALREADY_SHARED value
             * @property {number} NOT_ALLOWED_TO_SHARE=4 NOT_ALLOWED_TO_SHARE value
             * @property {number} ACCESS_DENIED=5 ACCESS_DENIED value
             * @property {number} NOT_ALLOWED_TO_SET_PERMISSIONS=6 NOT_ALLOWED_TO_SET_PERMISSIONS value
             */
            sharing.SharingStatus = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "SUCCESS"] = 0;
                values[valuesById[1] = "PENDING_ACCEPT"] = 1;
                values[valuesById[2] = "USER_NOT_FOUND"] = 2;
                values[valuesById[3] = "ALREADY_SHARED"] = 3;
                values[valuesById[4] = "NOT_ALLOWED_TO_SHARE"] = 4;
                values[valuesById[5] = "ACCESS_DENIED"] = 5;
                values[valuesById[6] = "NOT_ALLOWED_TO_SET_PERMISSIONS"] = 6;
                return values;
            })();

            sharing.RevokedAccess = (function() {

                /**
                 * Properties of a RevokedAccess.
                 * @memberof record.v3.sharing
                 * @interface IRevokedAccess
                 * @property {Uint8Array|null} [recordUid] the uid of the record whose access have been revoked
                 * @property {Uint8Array|null} [actorUid] the uid of actor whose access has been revoked. represents a User (an account)
                 */

                /**
                 * Constructs a new RevokedAccess.
                 * @memberof record.v3.sharing
                 * @classdesc Represents a RevokedAccess.
                 * @implements IRevokedAccess
                 * @constructor
                 * @param {record.v3.sharing.IRevokedAccess=} [properties] Properties to set
                 */
                function RevokedAccess(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * the uid of the record whose access have been revoked
                 * @member {Uint8Array} recordUid
                 * @memberof record.v3.sharing.RevokedAccess
                 * @instance
                 */
                RevokedAccess.prototype.recordUid = $util.newBuffer([]);

                /**
                 * the uid of actor whose access has been revoked. represents a User (an account)
                 * @member {Uint8Array} actorUid
                 * @memberof record.v3.sharing.RevokedAccess
                 * @instance
                 */
                RevokedAccess.prototype.actorUid = $util.newBuffer([]);

                /**
                 * Creates a new RevokedAccess instance using the specified properties.
                 * @function create
                 * @memberof record.v3.sharing.RevokedAccess
                 * @static
                 * @param {record.v3.sharing.IRevokedAccess=} [properties] Properties to set
                 * @returns {record.v3.sharing.RevokedAccess} RevokedAccess instance
                 */
                RevokedAccess.create = function create(properties) {
                    return new RevokedAccess(properties);
                };

                /**
                 * Encodes the specified RevokedAccess message. Does not implicitly {@link record.v3.sharing.RevokedAccess.verify|verify} messages.
                 * @function encode
                 * @memberof record.v3.sharing.RevokedAccess
                 * @static
                 * @param {record.v3.sharing.IRevokedAccess} message RevokedAccess message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RevokedAccess.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
                    if (message.actorUid != null && Object.hasOwnProperty.call(message, "actorUid"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.actorUid);
                    return writer;
                };

                /**
                 * Encodes the specified RevokedAccess message, length delimited. Does not implicitly {@link record.v3.sharing.RevokedAccess.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof record.v3.sharing.RevokedAccess
                 * @static
                 * @param {record.v3.sharing.IRevokedAccess} message RevokedAccess message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RevokedAccess.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RevokedAccess message from the specified reader or buffer.
                 * @function decode
                 * @memberof record.v3.sharing.RevokedAccess
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {record.v3.sharing.RevokedAccess} RevokedAccess
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RevokedAccess.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.record.v3.sharing.RevokedAccess();
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
                                message.actorUid = reader.bytes();
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
                 * Decodes a RevokedAccess message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof record.v3.sharing.RevokedAccess
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {record.v3.sharing.RevokedAccess} RevokedAccess
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RevokedAccess.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RevokedAccess message.
                 * @function verify
                 * @memberof record.v3.sharing.RevokedAccess
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RevokedAccess.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                            return "recordUid: buffer expected";
                    if (message.actorUid != null && Object.hasOwnProperty.call(message, "actorUid"))
                        if (!(message.actorUid && typeof message.actorUid.length === "number" || $util.isString(message.actorUid)))
                            return "actorUid: buffer expected";
                    return null;
                };

                /**
                 * Creates a RevokedAccess message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof record.v3.sharing.RevokedAccess
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {record.v3.sharing.RevokedAccess} RevokedAccess
                 */
                RevokedAccess.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.record.v3.sharing.RevokedAccess)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".record.v3.sharing.RevokedAccess: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.record.v3.sharing.RevokedAccess();
                    if (object.recordUid != null)
                        if (typeof object.recordUid === "string")
                            $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                        else if (object.recordUid.length >= 0)
                            message.recordUid = object.recordUid;
                    if (object.actorUid != null)
                        if (typeof object.actorUid === "string")
                            $util.base64.decode(object.actorUid, message.actorUid = $util.newBuffer($util.base64.length(object.actorUid)), 0);
                        else if (object.actorUid.length >= 0)
                            message.actorUid = object.actorUid;
                    return message;
                };

                /**
                 * Creates a plain object from a RevokedAccess message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof record.v3.sharing.RevokedAccess
                 * @static
                 * @param {record.v3.sharing.RevokedAccess} message RevokedAccess
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RevokedAccess.toObject = function toObject(message, options, q) {
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
                            object.actorUid = "";
                        else {
                            object.actorUid = [];
                            if (options.bytes !== Array)
                                object.actorUid = $util.newBuffer(object.actorUid);
                        }
                    }
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
                    if (message.actorUid != null && Object.hasOwnProperty.call(message, "actorUid"))
                        object.actorUid = options.bytes === String ? $util.base64.encode(message.actorUid, 0, message.actorUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.actorUid) : message.actorUid;
                    return object;
                };

                /**
                 * Converts this RevokedAccess to JSON.
                 * @function toJSON
                 * @memberof record.v3.sharing.RevokedAccess
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RevokedAccess.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RevokedAccess
                 * @function getTypeUrl
                 * @memberof record.v3.sharing.RevokedAccess
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RevokedAccess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/record.v3.sharing.RevokedAccess";
                };

                return RevokedAccess;
            })();

            sharing.RecordSharingState = (function() {

                /**
                 * Properties of a RecordSharingState.
                 * @memberof record.v3.sharing
                 * @interface IRecordSharingState
                 * @property {Uint8Array|null} [recordUid] The UID of the record this sharing state relates to.
                 * @property {boolean|null} [isDirectlyShared] True if the record is directly shared with non-owner actors.
                 * @property {boolean|null} [isIndirectlyShared] True if the record is indirectly shared via folder access with non-owner actors.
                 * @property {boolean|null} [isShared] Synthetic convenience property: {@code isDirectlyShared || isIndirectlyShared}.
                 */

                /**
                 * Constructs a new RecordSharingState.
                 * @memberof record.v3.sharing
                 * @classdesc Represents the sharing state of a single record.
                 * 
                 * <p>This message captures whether a record is shared either directly (via explicit grants)
                 * or indirectly (via folder access). It includes a computed convenience field
                 * {@code isShared}, which is true if the record is shared through either mechanism.
                 * 
                 * <p>This message is typically stored in a DAG edge and used by clients during sync
                 * @implements IRecordSharingState
                 * @constructor
                 * @param {record.v3.sharing.IRecordSharingState=} [properties] Properties to set
                 */
                function RecordSharingState(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * The UID of the record this sharing state relates to.
                 * @member {Uint8Array} recordUid
                 * @memberof record.v3.sharing.RecordSharingState
                 * @instance
                 */
                RecordSharingState.prototype.recordUid = $util.newBuffer([]);

                /**
                 * True if the record is directly shared with non-owner actors.
                 * @member {boolean} isDirectlyShared
                 * @memberof record.v3.sharing.RecordSharingState
                 * @instance
                 */
                RecordSharingState.prototype.isDirectlyShared = false;

                /**
                 * True if the record is indirectly shared via folder access with non-owner actors.
                 * @member {boolean} isIndirectlyShared
                 * @memberof record.v3.sharing.RecordSharingState
                 * @instance
                 */
                RecordSharingState.prototype.isIndirectlyShared = false;

                /**
                 * Synthetic convenience property: {@code isDirectlyShared || isIndirectlyShared}.
                 * @member {boolean} isShared
                 * @memberof record.v3.sharing.RecordSharingState
                 * @instance
                 */
                RecordSharingState.prototype.isShared = false;

                /**
                 * Creates a new RecordSharingState instance using the specified properties.
                 * @function create
                 * @memberof record.v3.sharing.RecordSharingState
                 * @static
                 * @param {record.v3.sharing.IRecordSharingState=} [properties] Properties to set
                 * @returns {record.v3.sharing.RecordSharingState} RecordSharingState instance
                 */
                RecordSharingState.create = function create(properties) {
                    return new RecordSharingState(properties);
                };

                /**
                 * Encodes the specified RecordSharingState message. Does not implicitly {@link record.v3.sharing.RecordSharingState.verify|verify} messages.
                 * @function encode
                 * @memberof record.v3.sharing.RecordSharingState
                 * @static
                 * @param {record.v3.sharing.IRecordSharingState} message RecordSharingState message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RecordSharingState.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
                    if (message.isDirectlyShared != null && Object.hasOwnProperty.call(message, "isDirectlyShared"))
                        writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isDirectlyShared);
                    if (message.isIndirectlyShared != null && Object.hasOwnProperty.call(message, "isIndirectlyShared"))
                        writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isIndirectlyShared);
                    if (message.isShared != null && Object.hasOwnProperty.call(message, "isShared"))
                        writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isShared);
                    return writer;
                };

                /**
                 * Encodes the specified RecordSharingState message, length delimited. Does not implicitly {@link record.v3.sharing.RecordSharingState.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof record.v3.sharing.RecordSharingState
                 * @static
                 * @param {record.v3.sharing.IRecordSharingState} message RecordSharingState message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RecordSharingState.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RecordSharingState message from the specified reader or buffer.
                 * @function decode
                 * @memberof record.v3.sharing.RecordSharingState
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {record.v3.sharing.RecordSharingState} RecordSharingState
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RecordSharingState.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.record.v3.sharing.RecordSharingState();
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
                                message.isDirectlyShared = reader.bool();
                                break;
                            }
                        case 3: {
                                message.isIndirectlyShared = reader.bool();
                                break;
                            }
                        case 4: {
                                message.isShared = reader.bool();
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
                 * Decodes a RecordSharingState message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof record.v3.sharing.RecordSharingState
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {record.v3.sharing.RecordSharingState} RecordSharingState
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RecordSharingState.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RecordSharingState message.
                 * @function verify
                 * @memberof record.v3.sharing.RecordSharingState
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RecordSharingState.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                            return "recordUid: buffer expected";
                    if (message.isDirectlyShared != null && Object.hasOwnProperty.call(message, "isDirectlyShared"))
                        if (typeof message.isDirectlyShared !== "boolean")
                            return "isDirectlyShared: boolean expected";
                    if (message.isIndirectlyShared != null && Object.hasOwnProperty.call(message, "isIndirectlyShared"))
                        if (typeof message.isIndirectlyShared !== "boolean")
                            return "isIndirectlyShared: boolean expected";
                    if (message.isShared != null && Object.hasOwnProperty.call(message, "isShared"))
                        if (typeof message.isShared !== "boolean")
                            return "isShared: boolean expected";
                    return null;
                };

                /**
                 * Creates a RecordSharingState message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof record.v3.sharing.RecordSharingState
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {record.v3.sharing.RecordSharingState} RecordSharingState
                 */
                RecordSharingState.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.record.v3.sharing.RecordSharingState)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".record.v3.sharing.RecordSharingState: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.record.v3.sharing.RecordSharingState();
                    if (object.recordUid != null)
                        if (typeof object.recordUid === "string")
                            $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                        else if (object.recordUid.length >= 0)
                            message.recordUid = object.recordUid;
                    if (object.isDirectlyShared != null)
                        message.isDirectlyShared = Boolean(object.isDirectlyShared);
                    if (object.isIndirectlyShared != null)
                        message.isIndirectlyShared = Boolean(object.isIndirectlyShared);
                    if (object.isShared != null)
                        message.isShared = Boolean(object.isShared);
                    return message;
                };

                /**
                 * Creates a plain object from a RecordSharingState message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof record.v3.sharing.RecordSharingState
                 * @static
                 * @param {record.v3.sharing.RecordSharingState} message RecordSharingState
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RecordSharingState.toObject = function toObject(message, options, q) {
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
                        object.isDirectlyShared = false;
                        object.isIndirectlyShared = false;
                        object.isShared = false;
                    }
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
                    if (message.isDirectlyShared != null && Object.hasOwnProperty.call(message, "isDirectlyShared"))
                        object.isDirectlyShared = message.isDirectlyShared;
                    if (message.isIndirectlyShared != null && Object.hasOwnProperty.call(message, "isIndirectlyShared"))
                        object.isIndirectlyShared = message.isIndirectlyShared;
                    if (message.isShared != null && Object.hasOwnProperty.call(message, "isShared"))
                        object.isShared = message.isShared;
                    return object;
                };

                /**
                 * Converts this RecordSharingState to JSON.
                 * @function toJSON
                 * @memberof record.v3.sharing.RecordSharingState
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RecordSharingState.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RecordSharingState
                 * @function getTypeUrl
                 * @memberof record.v3.sharing.RecordSharingState
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RecordSharingState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/record.v3.sharing.RecordSharingState";
                };

                return RecordSharingState;
            })();

            return sharing;
        })();

        v3.RecordsAddRequest = (function() {

            /**
             * Properties of a RecordsAddRequest.
             * @memberof record.v3
             * @interface IRecordsAddRequest
             * @property {Array.<record.v3.IRecordAdd>|null} [records] RecordsAddRequest records
             * @property {number|null} [clientTime] RecordsAddRequest clientTime
             * @property {Records.RecordKeyType|null} [securityDataKeyType] RecordsAddRequest securityDataKeyType
             */

            /**
             * Constructs a new RecordsAddRequest.
             * @memberof record.v3
             * @classdesc Represents a RecordsAddRequest.
             * @implements IRecordsAddRequest
             * @constructor
             * @param {record.v3.IRecordsAddRequest=} [properties] Properties to set
             */
            function RecordsAddRequest(properties) {
                this.records = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RecordsAddRequest records.
             * @member {Array.<record.v3.IRecordAdd>} records
             * @memberof record.v3.RecordsAddRequest
             * @instance
             */
            RecordsAddRequest.prototype.records = $util.emptyArray;

            /**
             * RecordsAddRequest clientTime.
             * @member {number} clientTime
             * @memberof record.v3.RecordsAddRequest
             * @instance
             */
            RecordsAddRequest.prototype.clientTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * RecordsAddRequest securityDataKeyType.
             * @member {Records.RecordKeyType} securityDataKeyType
             * @memberof record.v3.RecordsAddRequest
             * @instance
             */
            RecordsAddRequest.prototype.securityDataKeyType = 0;

            /**
             * Creates a new RecordsAddRequest instance using the specified properties.
             * @function create
             * @memberof record.v3.RecordsAddRequest
             * @static
             * @param {record.v3.IRecordsAddRequest=} [properties] Properties to set
             * @returns {record.v3.RecordsAddRequest} RecordsAddRequest instance
             */
            RecordsAddRequest.create = function create(properties) {
                return new RecordsAddRequest(properties);
            };

            /**
             * Encodes the specified RecordsAddRequest message. Does not implicitly {@link record.v3.RecordsAddRequest.verify|verify} messages.
             * @function encode
             * @memberof record.v3.RecordsAddRequest
             * @static
             * @param {record.v3.IRecordsAddRequest} message RecordsAddRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RecordsAddRequest.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.records != null && message.records.length)
                    for (let i = 0; i < message.records.length; ++i)
                        $root.record.v3.RecordAdd.encode(message.records[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                if (message.clientTime != null && Object.hasOwnProperty.call(message, "clientTime"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.clientTime);
                if (message.securityDataKeyType != null && Object.hasOwnProperty.call(message, "securityDataKeyType"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.securityDataKeyType);
                return writer;
            };

            /**
             * Encodes the specified RecordsAddRequest message, length delimited. Does not implicitly {@link record.v3.RecordsAddRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof record.v3.RecordsAddRequest
             * @static
             * @param {record.v3.IRecordsAddRequest} message RecordsAddRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RecordsAddRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a RecordsAddRequest message from the specified reader or buffer.
             * @function decode
             * @memberof record.v3.RecordsAddRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {record.v3.RecordsAddRequest} RecordsAddRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RecordsAddRequest.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.record.v3.RecordsAddRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.records && message.records.length))
                                message.records = [];
                            message.records.push($root.record.v3.RecordAdd.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 2: {
                            message.clientTime = reader.int64();
                            break;
                        }
                    case 3: {
                            message.securityDataKeyType = reader.int32();
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
             * Decodes a RecordsAddRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof record.v3.RecordsAddRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {record.v3.RecordsAddRequest} RecordsAddRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RecordsAddRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RecordsAddRequest message.
             * @function verify
             * @memberof record.v3.RecordsAddRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RecordsAddRequest.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.records != null && Object.hasOwnProperty.call(message, "records")) {
                    if (!Array.isArray(message.records))
                        return "records: array expected";
                    for (let i = 0; i < message.records.length; ++i) {
                        let error = $root.record.v3.RecordAdd.verify(message.records[i], long + 1);
                        if (error)
                            return "records." + error;
                    }
                }
                if (message.clientTime != null && Object.hasOwnProperty.call(message, "clientTime"))
                    if (!$util.isInteger(message.clientTime) && !(message.clientTime && $util.isInteger(message.clientTime.low) && $util.isInteger(message.clientTime.high)))
                        return "clientTime: integer|Long expected";
                if (message.securityDataKeyType != null && Object.hasOwnProperty.call(message, "securityDataKeyType"))
                    switch (message.securityDataKeyType) {
                    default:
                        return "securityDataKeyType: enum value expected";
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
             * Creates a RecordsAddRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof record.v3.RecordsAddRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {record.v3.RecordsAddRequest} RecordsAddRequest
             */
            RecordsAddRequest.fromObject = function fromObject(object, long) {
                if (object instanceof $root.record.v3.RecordsAddRequest)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".record.v3.RecordsAddRequest: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.record.v3.RecordsAddRequest();
                if (object.records) {
                    if (!Array.isArray(object.records))
                        throw TypeError(".record.v3.RecordsAddRequest.records: array expected");
                    message.records = [];
                    for (let i = 0; i < object.records.length; ++i) {
                        if (!$util.isObject(object.records[i]))
                            throw TypeError(".record.v3.RecordsAddRequest.records: object expected");
                        message.records[i] = $root.record.v3.RecordAdd.fromObject(object.records[i], long + 1);
                    }
                }
                if (object.clientTime != null)
                    if ($util.Long)
                        message.clientTime = $util.Long.fromValue(object.clientTime, false);
                    else if (typeof object.clientTime === "string")
                        message.clientTime = parseInt(object.clientTime, 10);
                    else if (typeof object.clientTime === "number")
                        message.clientTime = object.clientTime;
                    else if (typeof object.clientTime === "object")
                        message.clientTime = new $util.LongBits(object.clientTime.low >>> 0, object.clientTime.high >>> 0).toNumber();
                switch (object.securityDataKeyType) {
                default:
                    if (typeof object.securityDataKeyType === "number") {
                        message.securityDataKeyType = object.securityDataKeyType;
                        break;
                    }
                    break;
                case "NO_KEY":
                case 0:
                    message.securityDataKeyType = 0;
                    break;
                case "ENCRYPTED_BY_DATA_KEY":
                case 1:
                    message.securityDataKeyType = 1;
                    break;
                case "ENCRYPTED_BY_PUBLIC_KEY":
                case 2:
                    message.securityDataKeyType = 2;
                    break;
                case "ENCRYPTED_BY_DATA_KEY_GCM":
                case 3:
                    message.securityDataKeyType = 3;
                    break;
                case "ENCRYPTED_BY_PUBLIC_KEY_ECC":
                case 4:
                    message.securityDataKeyType = 4;
                    break;
                case "ENCRYPTED_BY_ROOT_KEY_CBC":
                case 5:
                    message.securityDataKeyType = 5;
                    break;
                case "ENCRYPTED_BY_ROOT_KEY_GCM":
                case 6:
                    message.securityDataKeyType = 6;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a RecordsAddRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof record.v3.RecordsAddRequest
             * @static
             * @param {record.v3.RecordsAddRequest} message RecordsAddRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RecordsAddRequest.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.records = [];
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.clientTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.clientTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                    object.securityDataKeyType = options.enums === String ? "NO_KEY" : 0;
                }
                if (message.records && message.records.length) {
                    object.records = [];
                    for (let j = 0; j < message.records.length; ++j)
                        object.records[j] = $root.record.v3.RecordAdd.toObject(message.records[j], options, q + 1);
                }
                if (message.clientTime != null && Object.hasOwnProperty.call(message, "clientTime"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.clientTime = typeof message.clientTime === "number" ? BigInt(message.clientTime) : $util.Long.fromBits(message.clientTime.low >>> 0, message.clientTime.high >>> 0, false).toBigInt();
                    else if (typeof message.clientTime === "number")
                        object.clientTime = options.longs === String ? String(message.clientTime) : message.clientTime;
                    else
                        object.clientTime = options.longs === String ? $util.Long.prototype.toString.call(message.clientTime) : options.longs === Number ? new $util.LongBits(message.clientTime.low >>> 0, message.clientTime.high >>> 0).toNumber() : message.clientTime;
                if (message.securityDataKeyType != null && Object.hasOwnProperty.call(message, "securityDataKeyType"))
                    object.securityDataKeyType = options.enums === String ? $root.Records.RecordKeyType[message.securityDataKeyType] === undefined ? message.securityDataKeyType : $root.Records.RecordKeyType[message.securityDataKeyType] : message.securityDataKeyType;
                return object;
            };

            /**
             * Converts this RecordsAddRequest to JSON.
             * @function toJSON
             * @memberof record.v3.RecordsAddRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RecordsAddRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RecordsAddRequest
             * @function getTypeUrl
             * @memberof record.v3.RecordsAddRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RecordsAddRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/record.v3.RecordsAddRequest";
            };

            return RecordsAddRequest;
        })();

        v3.RecordAdd = (function() {

            /**
             * Properties of a RecordAdd.
             * @memberof record.v3
             * @interface IRecordAdd
             * @property {Uint8Array|null} [recordUid] RecordAdd recordUid
             * @property {Uint8Array|null} [recordKey] RecordAdd recordKey
             * @property {Folder.EncryptedKeyType|null} [recordKeyType] RecordAdd recordKeyType
             * @property {Folder.FolderKeyEncryptionType|null} [recordKeyEncryptedBy] Record creates in root folder is encrypted by user key.
             * Record creates in non-root folder is encrypted by folder key.
             * @property {number|null} [clientModifiedTime] RecordAdd clientModifiedTime
             * @property {Uint8Array|null} [data] RecordAdd data
             * @property {Uint8Array|null} [nonSharedData] RecordAdd nonSharedData
             * @property {Uint8Array|null} [folderUid] RecordAdd folderUid
             * @property {Array.<Records.IRecordLink>|null} [recordLinks] RecordAdd recordLinks
             * @property {Records.IRecordAudit|null} [audit] RecordAdd audit
             * @property {Records.ISecurityData|null} [securityData] RecordAdd securityData
             * @property {Records.ISecurityScoreData|null} [securityScoreData] RecordAdd securityScoreData
             */

            /**
             * Constructs a new RecordAdd.
             * @memberof record.v3
             * @classdesc Represents a RecordAdd.
             * @implements IRecordAdd
             * @constructor
             * @param {record.v3.IRecordAdd=} [properties] Properties to set
             */
            function RecordAdd(properties) {
                this.recordLinks = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RecordAdd recordUid.
             * @member {Uint8Array} recordUid
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.recordUid = $util.newBuffer([]);

            /**
             * RecordAdd recordKey.
             * @member {Uint8Array} recordKey
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.recordKey = $util.newBuffer([]);

            /**
             * RecordAdd recordKeyType.
             * @member {Folder.EncryptedKeyType} recordKeyType
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.recordKeyType = 0;

            /**
             * Record creates in root folder is encrypted by user key.
             * Record creates in non-root folder is encrypted by folder key.
             * @member {Folder.FolderKeyEncryptionType} recordKeyEncryptedBy
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.recordKeyEncryptedBy = 0;

            /**
             * RecordAdd clientModifiedTime.
             * @member {number} clientModifiedTime
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.clientModifiedTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * RecordAdd data.
             * @member {Uint8Array} data
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.data = $util.newBuffer([]);

            /**
             * RecordAdd nonSharedData.
             * @member {Uint8Array} nonSharedData
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.nonSharedData = $util.newBuffer([]);

            /**
             * RecordAdd folderUid.
             * @member {Uint8Array} folderUid
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.folderUid = $util.newBuffer([]);

            /**
             * RecordAdd recordLinks.
             * @member {Array.<Records.IRecordLink>} recordLinks
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.recordLinks = $util.emptyArray;

            /**
             * RecordAdd audit.
             * @member {Records.IRecordAudit|null|undefined} audit
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.audit = null;

            /**
             * RecordAdd securityData.
             * @member {Records.ISecurityData|null|undefined} securityData
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.securityData = null;

            /**
             * RecordAdd securityScoreData.
             * @member {Records.ISecurityScoreData|null|undefined} securityScoreData
             * @memberof record.v3.RecordAdd
             * @instance
             */
            RecordAdd.prototype.securityScoreData = null;

            /**
             * Creates a new RecordAdd instance using the specified properties.
             * @function create
             * @memberof record.v3.RecordAdd
             * @static
             * @param {record.v3.IRecordAdd=} [properties] Properties to set
             * @returns {record.v3.RecordAdd} RecordAdd instance
             */
            RecordAdd.create = function create(properties) {
                return new RecordAdd(properties);
            };

            /**
             * Encodes the specified RecordAdd message. Does not implicitly {@link record.v3.RecordAdd.verify|verify} messages.
             * @function encode
             * @memberof record.v3.RecordAdd
             * @static
             * @param {record.v3.IRecordAdd} message RecordAdd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RecordAdd.encode = function encode(message, writer, q) {
                if (!writer)
                    writer = $Writer.create();
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
                if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recordKey);
                if (message.recordKeyType != null && Object.hasOwnProperty.call(message, "recordKeyType"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.recordKeyType);
                if (message.recordKeyEncryptedBy != null && Object.hasOwnProperty.call(message, "recordKeyEncryptedBy"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.recordKeyEncryptedBy);
                if (message.clientModifiedTime != null && Object.hasOwnProperty.call(message, "clientModifiedTime"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int64(message.clientModifiedTime);
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.data);
                if (message.nonSharedData != null && Object.hasOwnProperty.call(message, "nonSharedData"))
                    writer.uint32(/* id 7, wireType 2 =*/58).bytes(message.nonSharedData);
                if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                    writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.folderUid);
                if (message.recordLinks != null && message.recordLinks.length)
                    for (let i = 0; i < message.recordLinks.length; ++i)
                        $root.Records.RecordLink.encode(message.recordLinks[i], writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
                if (message.audit != null && Object.hasOwnProperty.call(message, "audit"))
                    $root.Records.RecordAudit.encode(message.audit, writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
                if (message.securityData != null && Object.hasOwnProperty.call(message, "securityData"))
                    $root.Records.SecurityData.encode(message.securityData, writer.uint32(/* id 11, wireType 2 =*/90).fork(), q + 1).ldelim();
                if (message.securityScoreData != null && Object.hasOwnProperty.call(message, "securityScoreData"))
                    $root.Records.SecurityScoreData.encode(message.securityScoreData, writer.uint32(/* id 12, wireType 2 =*/98).fork(), q + 1).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RecordAdd message, length delimited. Does not implicitly {@link record.v3.RecordAdd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof record.v3.RecordAdd
             * @static
             * @param {record.v3.IRecordAdd} message RecordAdd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RecordAdd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a RecordAdd message from the specified reader or buffer.
             * @function decode
             * @memberof record.v3.RecordAdd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {record.v3.RecordAdd} RecordAdd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RecordAdd.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.record.v3.RecordAdd();
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
                            message.recordKey = reader.bytes();
                            break;
                        }
                    case 3: {
                            message.recordKeyType = reader.int32();
                            break;
                        }
                    case 4: {
                            message.recordKeyEncryptedBy = reader.int32();
                            break;
                        }
                    case 5: {
                            message.clientModifiedTime = reader.int64();
                            break;
                        }
                    case 6: {
                            message.data = reader.bytes();
                            break;
                        }
                    case 7: {
                            message.nonSharedData = reader.bytes();
                            break;
                        }
                    case 8: {
                            message.folderUid = reader.bytes();
                            break;
                        }
                    case 9: {
                            if (!(message.recordLinks && message.recordLinks.length))
                                message.recordLinks = [];
                            message.recordLinks.push($root.Records.RecordLink.decode(reader, reader.uint32(), undefined, long + 1));
                            break;
                        }
                    case 10: {
                            message.audit = $root.Records.RecordAudit.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 11: {
                            message.securityData = $root.Records.SecurityData.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 12: {
                            message.securityScoreData = $root.Records.SecurityScoreData.decode(reader, reader.uint32(), undefined, long + 1);
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
             * Decodes a RecordAdd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof record.v3.RecordAdd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {record.v3.RecordAdd} RecordAdd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RecordAdd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RecordAdd message.
             * @function verify
             * @memberof record.v3.RecordAdd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RecordAdd.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                    if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                        return "recordUid: buffer expected";
                if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                    if (!(message.recordKey && typeof message.recordKey.length === "number" || $util.isString(message.recordKey)))
                        return "recordKey: buffer expected";
                if (message.recordKeyType != null && Object.hasOwnProperty.call(message, "recordKeyType"))
                    switch (message.recordKeyType) {
                    default:
                        return "recordKeyType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                        break;
                    }
                if (message.recordKeyEncryptedBy != null && Object.hasOwnProperty.call(message, "recordKeyEncryptedBy"))
                    switch (message.recordKeyEncryptedBy) {
                    default:
                        return "recordKeyEncryptedBy: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.clientModifiedTime != null && Object.hasOwnProperty.call(message, "clientModifiedTime"))
                    if (!$util.isInteger(message.clientModifiedTime) && !(message.clientModifiedTime && $util.isInteger(message.clientModifiedTime.low) && $util.isInteger(message.clientModifiedTime.high)))
                        return "clientModifiedTime: integer|Long expected";
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                if (message.nonSharedData != null && Object.hasOwnProperty.call(message, "nonSharedData"))
                    if (!(message.nonSharedData && typeof message.nonSharedData.length === "number" || $util.isString(message.nonSharedData)))
                        return "nonSharedData: buffer expected";
                if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                    if (!(message.folderUid && typeof message.folderUid.length === "number" || $util.isString(message.folderUid)))
                        return "folderUid: buffer expected";
                if (message.recordLinks != null && Object.hasOwnProperty.call(message, "recordLinks")) {
                    if (!Array.isArray(message.recordLinks))
                        return "recordLinks: array expected";
                    for (let i = 0; i < message.recordLinks.length; ++i) {
                        let error = $root.Records.RecordLink.verify(message.recordLinks[i], long + 1);
                        if (error)
                            return "recordLinks." + error;
                    }
                }
                if (message.audit != null && Object.hasOwnProperty.call(message, "audit")) {
                    let error = $root.Records.RecordAudit.verify(message.audit, long + 1);
                    if (error)
                        return "audit." + error;
                }
                if (message.securityData != null && Object.hasOwnProperty.call(message, "securityData")) {
                    let error = $root.Records.SecurityData.verify(message.securityData, long + 1);
                    if (error)
                        return "securityData." + error;
                }
                if (message.securityScoreData != null && Object.hasOwnProperty.call(message, "securityScoreData")) {
                    let error = $root.Records.SecurityScoreData.verify(message.securityScoreData, long + 1);
                    if (error)
                        return "securityScoreData." + error;
                }
                return null;
            };

            /**
             * Creates a RecordAdd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof record.v3.RecordAdd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {record.v3.RecordAdd} RecordAdd
             */
            RecordAdd.fromObject = function fromObject(object, long) {
                if (object instanceof $root.record.v3.RecordAdd)
                    return object;
                if (!$util.isObject(object))
                    throw TypeError(".record.v3.RecordAdd: object expected");
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.record.v3.RecordAdd();
                if (object.recordUid != null)
                    if (typeof object.recordUid === "string")
                        $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                    else if (object.recordUid.length >= 0)
                        message.recordUid = object.recordUid;
                if (object.recordKey != null)
                    if (typeof object.recordKey === "string")
                        $util.base64.decode(object.recordKey, message.recordKey = $util.newBuffer($util.base64.length(object.recordKey)), 0);
                    else if (object.recordKey.length >= 0)
                        message.recordKey = object.recordKey;
                switch (object.recordKeyType) {
                default:
                    if (typeof object.recordKeyType === "number") {
                        message.recordKeyType = object.recordKeyType;
                        break;
                    }
                    break;
                case "no_key":
                case 0:
                    message.recordKeyType = 0;
                    break;
                case "encrypted_by_data_key":
                case 1:
                    message.recordKeyType = 1;
                    break;
                case "encrypted_by_public_key":
                case 2:
                    message.recordKeyType = 2;
                    break;
                case "encrypted_by_data_key_gcm":
                case 3:
                    message.recordKeyType = 3;
                    break;
                case "encrypted_by_public_key_ecc":
                case 4:
                    message.recordKeyType = 4;
                    break;
                }
                switch (object.recordKeyEncryptedBy) {
                default:
                    if (typeof object.recordKeyEncryptedBy === "number") {
                        message.recordKeyEncryptedBy = object.recordKeyEncryptedBy;
                        break;
                    }
                    break;
                case "ENCRYPTED_BY_USER_KEY":
                case 0:
                    message.recordKeyEncryptedBy = 0;
                    break;
                case "ENCRYPTED_BY_PARENT_KEY":
                case 1:
                    message.recordKeyEncryptedBy = 1;
                    break;
                case "ENCRYPTED_BY_TEAM_KEY":
                case 2:
                    message.recordKeyEncryptedBy = 2;
                    break;
                }
                if (object.clientModifiedTime != null)
                    if ($util.Long)
                        message.clientModifiedTime = $util.Long.fromValue(object.clientModifiedTime, false);
                    else if (typeof object.clientModifiedTime === "string")
                        message.clientModifiedTime = parseInt(object.clientModifiedTime, 10);
                    else if (typeof object.clientModifiedTime === "number")
                        message.clientModifiedTime = object.clientModifiedTime;
                    else if (typeof object.clientModifiedTime === "object")
                        message.clientModifiedTime = new $util.LongBits(object.clientModifiedTime.low >>> 0, object.clientModifiedTime.high >>> 0).toNumber();
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length >= 0)
                        message.data = object.data;
                if (object.nonSharedData != null)
                    if (typeof object.nonSharedData === "string")
                        $util.base64.decode(object.nonSharedData, message.nonSharedData = $util.newBuffer($util.base64.length(object.nonSharedData)), 0);
                    else if (object.nonSharedData.length >= 0)
                        message.nonSharedData = object.nonSharedData;
                if (object.folderUid != null)
                    if (typeof object.folderUid === "string")
                        $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                    else if (object.folderUid.length >= 0)
                        message.folderUid = object.folderUid;
                if (object.recordLinks) {
                    if (!Array.isArray(object.recordLinks))
                        throw TypeError(".record.v3.RecordAdd.recordLinks: array expected");
                    message.recordLinks = [];
                    for (let i = 0; i < object.recordLinks.length; ++i) {
                        if (!$util.isObject(object.recordLinks[i]))
                            throw TypeError(".record.v3.RecordAdd.recordLinks: object expected");
                        message.recordLinks[i] = $root.Records.RecordLink.fromObject(object.recordLinks[i], long + 1);
                    }
                }
                if (object.audit != null) {
                    if (!$util.isObject(object.audit))
                        throw TypeError(".record.v3.RecordAdd.audit: object expected");
                    message.audit = $root.Records.RecordAudit.fromObject(object.audit, long + 1);
                }
                if (object.securityData != null) {
                    if (!$util.isObject(object.securityData))
                        throw TypeError(".record.v3.RecordAdd.securityData: object expected");
                    message.securityData = $root.Records.SecurityData.fromObject(object.securityData, long + 1);
                }
                if (object.securityScoreData != null) {
                    if (!$util.isObject(object.securityScoreData))
                        throw TypeError(".record.v3.RecordAdd.securityScoreData: object expected");
                    message.securityScoreData = $root.Records.SecurityScoreData.fromObject(object.securityScoreData, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a RecordAdd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof record.v3.RecordAdd
             * @static
             * @param {record.v3.RecordAdd} message RecordAdd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RecordAdd.toObject = function toObject(message, options, q) {
                if (!options)
                    options = {};
                if (q === undefined)
                    q = 0;
                if (q > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let object = {};
                if (options.arrays || options.defaults)
                    object.recordLinks = [];
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
                    object.recordKeyType = options.enums === String ? "no_key" : 0;
                    object.recordKeyEncryptedBy = options.enums === String ? "ENCRYPTED_BY_USER_KEY" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.clientModifiedTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                    } else
                        object.clientModifiedTime = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                    if (options.bytes === String)
                        object.nonSharedData = "";
                    else {
                        object.nonSharedData = [];
                        if (options.bytes !== Array)
                            object.nonSharedData = $util.newBuffer(object.nonSharedData);
                    }
                    if (options.bytes === String)
                        object.folderUid = "";
                    else {
                        object.folderUid = [];
                        if (options.bytes !== Array)
                            object.folderUid = $util.newBuffer(object.folderUid);
                    }
                    object.audit = null;
                    object.securityData = null;
                    object.securityScoreData = null;
                }
                if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                    object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
                if (message.recordKey != null && Object.hasOwnProperty.call(message, "recordKey"))
                    object.recordKey = options.bytes === String ? $util.base64.encode(message.recordKey, 0, message.recordKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordKey) : message.recordKey;
                if (message.recordKeyType != null && Object.hasOwnProperty.call(message, "recordKeyType"))
                    object.recordKeyType = options.enums === String ? $root.Folder.EncryptedKeyType[message.recordKeyType] === undefined ? message.recordKeyType : $root.Folder.EncryptedKeyType[message.recordKeyType] : message.recordKeyType;
                if (message.recordKeyEncryptedBy != null && Object.hasOwnProperty.call(message, "recordKeyEncryptedBy"))
                    object.recordKeyEncryptedBy = options.enums === String ? $root.Folder.FolderKeyEncryptionType[message.recordKeyEncryptedBy] === undefined ? message.recordKeyEncryptedBy : $root.Folder.FolderKeyEncryptionType[message.recordKeyEncryptedBy] : message.recordKeyEncryptedBy;
                if (message.clientModifiedTime != null && Object.hasOwnProperty.call(message, "clientModifiedTime"))
                    if (typeof BigInt !== "undefined" && options.longs === BigInt)
                        object.clientModifiedTime = typeof message.clientModifiedTime === "number" ? BigInt(message.clientModifiedTime) : $util.Long.fromBits(message.clientModifiedTime.low >>> 0, message.clientModifiedTime.high >>> 0, false).toBigInt();
                    else if (typeof message.clientModifiedTime === "number")
                        object.clientModifiedTime = options.longs === String ? String(message.clientModifiedTime) : message.clientModifiedTime;
                    else
                        object.clientModifiedTime = options.longs === String ? $util.Long.prototype.toString.call(message.clientModifiedTime) : options.longs === Number ? new $util.LongBits(message.clientModifiedTime.low >>> 0, message.clientModifiedTime.high >>> 0).toNumber() : message.clientModifiedTime;
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                if (message.nonSharedData != null && Object.hasOwnProperty.call(message, "nonSharedData"))
                    object.nonSharedData = options.bytes === String ? $util.base64.encode(message.nonSharedData, 0, message.nonSharedData.length) : options.bytes === Array ? Array.prototype.slice.call(message.nonSharedData) : message.nonSharedData;
                if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                    object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
                if (message.recordLinks && message.recordLinks.length) {
                    object.recordLinks = [];
                    for (let j = 0; j < message.recordLinks.length; ++j)
                        object.recordLinks[j] = $root.Records.RecordLink.toObject(message.recordLinks[j], options, q + 1);
                }
                if (message.audit != null && Object.hasOwnProperty.call(message, "audit"))
                    object.audit = $root.Records.RecordAudit.toObject(message.audit, options, q + 1);
                if (message.securityData != null && Object.hasOwnProperty.call(message, "securityData"))
                    object.securityData = $root.Records.SecurityData.toObject(message.securityData, options, q + 1);
                if (message.securityScoreData != null && Object.hasOwnProperty.call(message, "securityScoreData"))
                    object.securityScoreData = $root.Records.SecurityScoreData.toObject(message.securityScoreData, options, q + 1);
                return object;
            };

            /**
             * Converts this RecordAdd to JSON.
             * @function toJSON
             * @memberof record.v3.RecordAdd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RecordAdd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for RecordAdd
             * @function getTypeUrl
             * @memberof record.v3.RecordAdd
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            RecordAdd.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/record.v3.RecordAdd";
            };

            return RecordAdd;
        })();

        return v3;
    })();

    return record;
})();

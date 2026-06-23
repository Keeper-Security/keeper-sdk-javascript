/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const folder = $root.folder = (() => {

    /**
     * Namespace folder.
     * @exports folder
     * @namespace
     */
    const folder = {};

    folder.v3 = (function() {

        /**
         * Namespace v3.
         * @memberof folder
         * @namespace
         */
        const v3 = {};

        v3.remove = (function() {

            /**
             * Namespace remove.
             * @memberof folder.v3
             * @namespace
             */
            const remove = {};

            remove.RemoveService = (function() {

                /**
                 * Constructs a new RemoveService service.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a RemoveService
                 * @extends $protobuf.rpc.Service
                 * @constructor
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 */
                function RemoveService(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }

                (RemoveService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = RemoveService;

                /**
                 * Creates new RemoveService service using the specified rpc implementation.
                 * @function create
                 * @memberof folder.v3.remove.RemoveService
                 * @static
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 * @returns {RemoveService} RPC service. Useful where requests and/or responses are streamed.
                 */
                RemoveService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                };

                /**
                 * Callback as used by {@link folder.v3.remove.RemoveService#removeRecord}.
                 * @memberof folder.v3.remove.RemoveService
                 * @typedef RemoveRecordCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {folder.v3.remove.RemoveResponse} [response] RemoveResponse
                 */

                /**
                 * Preview or execute record removal from folders.
                 * PREVIEW: Computes impact metrics and returns a signed confirmation token.
                 * CONFIRM: Validates token and executes the removal operation.
                 * @function removeRecord
                 * @memberof folder.v3.remove.RemoveService
                 * @instance
                 * @param {folder.v3.remove.IRemoveRecordRequest} request RemoveRecordRequest message or plain object
                 * @param {folder.v3.remove.RemoveService.RemoveRecordCallback} callback Node-style callback called with the error, if any, and RemoveResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(RemoveService.prototype.removeRecord = function removeRecord(request, callback) {
                    return $protobuf.rpc.Service.prototype.rpcCall.call(this, removeRecord, $root.folder.v3.remove.RemoveRecordRequest, $root.folder.v3.remove.RemoveResponse, request, callback);
                }, "name", { value: "RemoveRecord" });

                /**
                 * Preview or execute record removal from folders.
                 * PREVIEW: Computes impact metrics and returns a signed confirmation token.
                 * CONFIRM: Validates token and executes the removal operation.
                 * @function removeRecord
                 * @memberof folder.v3.remove.RemoveService
                 * @instance
                 * @param {folder.v3.remove.IRemoveRecordRequest} request RemoveRecordRequest message or plain object
                 * @returns {Promise<folder.v3.remove.RemoveResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link folder.v3.remove.RemoveService#removeFolder}.
                 * @memberof folder.v3.remove.RemoveService
                 * @typedef RemoveFolderCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {folder.v3.remove.RemoveResponse} [response] RemoveResponse
                 */

                /**
                 * Preview or execute folder deletion.
                 * PREVIEW: Computes impact metrics and returns a signed confirmation token.
                 * CONFIRM: Validates token and executes the deletion operation.
                 * @function removeFolder
                 * @memberof folder.v3.remove.RemoveService
                 * @instance
                 * @param {folder.v3.remove.IRemoveFolderRequest} request RemoveFolderRequest message or plain object
                 * @param {folder.v3.remove.RemoveService.RemoveFolderCallback} callback Node-style callback called with the error, if any, and RemoveResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(RemoveService.prototype.removeFolder = function removeFolder(request, callback) {
                    return $protobuf.rpc.Service.prototype.rpcCall.call(this, removeFolder, $root.folder.v3.remove.RemoveFolderRequest, $root.folder.v3.remove.RemoveResponse, request, callback);
                }, "name", { value: "RemoveFolder" });

                /**
                 * Preview or execute folder deletion.
                 * PREVIEW: Computes impact metrics and returns a signed confirmation token.
                 * CONFIRM: Validates token and executes the deletion operation.
                 * @function removeFolder
                 * @memberof folder.v3.remove.RemoveService
                 * @instance
                 * @param {folder.v3.remove.IRemoveFolderRequest} request RemoveFolderRequest message or plain object
                 * @returns {Promise<folder.v3.remove.RemoveResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link folder.v3.remove.RemoveService#trashcanRestore}.
                 * @memberof folder.v3.remove.RemoveService
                 * @typedef TrashcanRestoreCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {folder.v3.remove.TrashcanRestoreResponse} [response] TrashcanRestoreResponse
                 */

                /**
                 * Restore records and/or folders from the caller's trashcan into a target folder (KA-8144).
                 * Each input item is validated independently; failures are reported per-item via
                 * TrashcanRestoreResponse.results — a failed item does not poison the batch.
                 * @function trashcanRestore
                 * @memberof folder.v3.remove.RemoveService
                 * @instance
                 * @param {folder.v3.remove.ITrashcanRestoreRequest} request TrashcanRestoreRequest message or plain object
                 * @param {folder.v3.remove.RemoveService.TrashcanRestoreCallback} callback Node-style callback called with the error, if any, and TrashcanRestoreResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(RemoveService.prototype.trashcanRestore = function trashcanRestore(request, callback) {
                    return $protobuf.rpc.Service.prototype.rpcCall.call(this, trashcanRestore, $root.folder.v3.remove.TrashcanRestoreRequest, $root.folder.v3.remove.TrashcanRestoreResponse, request, callback);
                }, "name", { value: "TrashcanRestore" });

                /**
                 * Restore records and/or folders from the caller's trashcan into a target folder (KA-8144).
                 * Each input item is validated independently; failures are reported per-item via
                 * TrashcanRestoreResponse.results — a failed item does not poison the batch.
                 * @function trashcanRestore
                 * @memberof folder.v3.remove.RemoveService
                 * @instance
                 * @param {folder.v3.remove.ITrashcanRestoreRequest} request TrashcanRestoreRequest message or plain object
                 * @returns {Promise<folder.v3.remove.TrashcanRestoreResponse>} Promise
                 * @variation 2
                 */

                return RemoveService;
            })();

            /**
             * RemoveAction enum.
             * @name folder.v3.remove.RemoveAction
             * @enum {number}
             * @property {number} REMOVE_ACTION_PREVIEW=0 REMOVE_ACTION_PREVIEW value
             * @property {number} REMOVE_ACTION_CONFIRM=1 REMOVE_ACTION_CONFIRM value
             */
            remove.RemoveAction = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "REMOVE_ACTION_PREVIEW"] = 0;
                values[valuesById[1] = "REMOVE_ACTION_CONFIRM"] = 1;
                return values;
            })();

            /**
             * RecordOperationType enum.
             * @name folder.v3.remove.RecordOperationType
             * @enum {number}
             * @property {number} RECORD_OPERATION_UNKNOWN=0 RECORD_OPERATION_UNKNOWN value
             * @property {number} UNLINK_FROM_FOLDER=1 UNLINK_FROM_FOLDER value
             * @property {number} MOVE_TO_FOLDER_TRASH=2 MOVE_TO_FOLDER_TRASH value
             * @property {number} MOVE_TO_OWNER_TRASH=3 MOVE_TO_OWNER_TRASH value
             */
            remove.RecordOperationType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "RECORD_OPERATION_UNKNOWN"] = 0;
                values[valuesById[1] = "UNLINK_FROM_FOLDER"] = 1;
                values[valuesById[2] = "MOVE_TO_FOLDER_TRASH"] = 2;
                values[valuesById[3] = "MOVE_TO_OWNER_TRASH"] = 3;
                return values;
            })();

            /**
             * FolderOperationType enum.
             * @name folder.v3.remove.FolderOperationType
             * @enum {number}
             * @property {number} FOLDER_OPERATION_UNKNOWN=0 FOLDER_OPERATION_UNKNOWN value
             * @property {number} FOLDER_MOVE_TO_FOLDER_TRASH=1 FOLDER_MOVE_TO_FOLDER_TRASH value
             * @property {number} FOLDER_MOVE_TO_OWNER_TRASH=2 FOLDER_MOVE_TO_OWNER_TRASH value
             * @property {number} FOLDER_DELETE_PERMANENT=3 FOLDER_DELETE_PERMANENT value
             */
            remove.FolderOperationType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "FOLDER_OPERATION_UNKNOWN"] = 0;
                values[valuesById[1] = "FOLDER_MOVE_TO_FOLDER_TRASH"] = 1;
                values[valuesById[2] = "FOLDER_MOVE_TO_OWNER_TRASH"] = 2;
                values[valuesById[3] = "FOLDER_DELETE_PERMANENT"] = 3;
                return values;
            })();

            /**
             * RemoveErrorCode enum.
             * @name folder.v3.remove.RemoveErrorCode
             * @enum {number}
             * @property {number} REMOVE_ERROR_UNKNOWN=0 REMOVE_ERROR_UNKNOWN value
             * @property {number} REMOVE_ERROR_NOT_FOUND=1 REMOVE_ERROR_NOT_FOUND value
             * @property {number} REMOVE_ERROR_ACCESS_DENIED=2 REMOVE_ERROR_ACCESS_DENIED value
             * @property {number} REMOVE_ERROR_TRASHCAN_FOLDER=3 REMOVE_ERROR_TRASHCAN_FOLDER value
             * @property {number} REMOVE_ERROR_ROOT_FOLDER=4 REMOVE_ERROR_ROOT_FOLDER value
             * @property {number} REMOVE_ERROR_DESCENDANT_DENIED=5 REMOVE_ERROR_DESCENDANT_DENIED value
             */
            remove.RemoveErrorCode = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "REMOVE_ERROR_UNKNOWN"] = 0;
                values[valuesById[1] = "REMOVE_ERROR_NOT_FOUND"] = 1;
                values[valuesById[2] = "REMOVE_ERROR_ACCESS_DENIED"] = 2;
                values[valuesById[3] = "REMOVE_ERROR_TRASHCAN_FOLDER"] = 3;
                values[valuesById[4] = "REMOVE_ERROR_ROOT_FOLDER"] = 4;
                values[valuesById[5] = "REMOVE_ERROR_DESCENDANT_DENIED"] = 5;
                return values;
            })();

            /**
             * RemoveStatus enum.
             * @name folder.v3.remove.RemoveStatus
             * @enum {number}
             * @property {number} REMOVE_STATUS_UNKNOWN=0 REMOVE_STATUS_UNKNOWN value
             * @property {number} REMOVE_STATUS_SUCCESS=1 REMOVE_STATUS_SUCCESS value
             * @property {number} REMOVE_STATUS_STALE_PREVIEW=2 REMOVE_STATUS_STALE_PREVIEW value
             * @property {number} REMOVE_STATUS_TOKEN_EXPIRED=3 REMOVE_STATUS_TOKEN_EXPIRED value
             * @property {number} REMOVE_STATUS_TOKEN_INVALID=4 REMOVE_STATUS_TOKEN_INVALID value
             * @property {number} REMOVE_STATUS_ACCESS_DENIED=5 REMOVE_STATUS_ACCESS_DENIED value
             * @property {number} REMOVE_STATUS_VALIDATION_ERROR=6 REMOVE_STATUS_VALIDATION_ERROR value
             */
            remove.RemoveStatus = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "REMOVE_STATUS_UNKNOWN"] = 0;
                values[valuesById[1] = "REMOVE_STATUS_SUCCESS"] = 1;
                values[valuesById[2] = "REMOVE_STATUS_STALE_PREVIEW"] = 2;
                values[valuesById[3] = "REMOVE_STATUS_TOKEN_EXPIRED"] = 3;
                values[valuesById[4] = "REMOVE_STATUS_TOKEN_INVALID"] = 4;
                values[valuesById[5] = "REMOVE_STATUS_ACCESS_DENIED"] = 5;
                values[valuesById[6] = "REMOVE_STATUS_VALIDATION_ERROR"] = 6;
                return values;
            })();

            remove.RecordRemoval = (function() {

                /**
                 * Properties of a RecordRemoval.
                 * @memberof folder.v3.remove
                 * @interface IRecordRemoval
                 * @property {Uint8Array|null} [folderUid] RecordRemoval folderUid
                 * @property {Uint8Array|null} [recordUid] RecordRemoval recordUid
                 * @property {folder.v3.remove.RecordOperationType|null} [operationType] RecordRemoval operationType
                 */

                /**
                 * Constructs a new RecordRemoval.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a RecordRemoval.
                 * @implements IRecordRemoval
                 * @constructor
                 * @param {folder.v3.remove.IRecordRemoval=} [properties] Properties to set
                 */
                function RecordRemoval(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RecordRemoval folderUid.
                 * @member {Uint8Array} folderUid
                 * @memberof folder.v3.remove.RecordRemoval
                 * @instance
                 */
                RecordRemoval.prototype.folderUid = $util.newBuffer([]);

                /**
                 * RecordRemoval recordUid.
                 * @member {Uint8Array} recordUid
                 * @memberof folder.v3.remove.RecordRemoval
                 * @instance
                 */
                RecordRemoval.prototype.recordUid = $util.newBuffer([]);

                /**
                 * RecordRemoval operationType.
                 * @member {folder.v3.remove.RecordOperationType} operationType
                 * @memberof folder.v3.remove.RecordRemoval
                 * @instance
                 */
                RecordRemoval.prototype.operationType = 0;

                /**
                 * Creates a new RecordRemoval instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RecordRemoval
                 * @static
                 * @param {folder.v3.remove.IRecordRemoval=} [properties] Properties to set
                 * @returns {folder.v3.remove.RecordRemoval} RecordRemoval instance
                 */
                RecordRemoval.create = function create(properties) {
                    return new RecordRemoval(properties);
                };

                /**
                 * Encodes the specified RecordRemoval message. Does not implicitly {@link folder.v3.remove.RecordRemoval.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RecordRemoval
                 * @static
                 * @param {folder.v3.remove.IRecordRemoval} message RecordRemoval message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RecordRemoval.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.folderUid);
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recordUid);
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.operationType);
                    return writer;
                };

                /**
                 * Encodes the specified RecordRemoval message, length delimited. Does not implicitly {@link folder.v3.remove.RecordRemoval.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RecordRemoval
                 * @static
                 * @param {folder.v3.remove.IRecordRemoval} message RecordRemoval message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RecordRemoval.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RecordRemoval message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RecordRemoval
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RecordRemoval} RecordRemoval
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RecordRemoval.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RecordRemoval();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.folderUid = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.recordUid = reader.bytes();
                                break;
                            }
                        case 3: {
                                message.operationType = reader.int32();
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
                 * Decodes a RecordRemoval message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RecordRemoval
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RecordRemoval} RecordRemoval
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RecordRemoval.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RecordRemoval message.
                 * @function verify
                 * @memberof folder.v3.remove.RecordRemoval
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RecordRemoval.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        if (!(message.folderUid && typeof message.folderUid.length === "number" || $util.isString(message.folderUid)))
                            return "folderUid: buffer expected";
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                            return "recordUid: buffer expected";
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        switch (message.operationType) {
                        default:
                            return "operationType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a RecordRemoval message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RecordRemoval
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RecordRemoval} RecordRemoval
                 */
                RecordRemoval.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RecordRemoval)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RecordRemoval: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RecordRemoval();
                    if (object.folderUid != null)
                        if (typeof object.folderUid === "string")
                            $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                        else if (object.folderUid.length >= 0)
                            message.folderUid = object.folderUid;
                    if (object.recordUid != null)
                        if (typeof object.recordUid === "string")
                            $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                        else if (object.recordUid.length >= 0)
                            message.recordUid = object.recordUid;
                    switch (object.operationType) {
                    default:
                        if (typeof object.operationType === "number") {
                            message.operationType = object.operationType;
                            break;
                        }
                        break;
                    case "RECORD_OPERATION_UNKNOWN":
                    case 0:
                        message.operationType = 0;
                        break;
                    case "UNLINK_FROM_FOLDER":
                    case 1:
                        message.operationType = 1;
                        break;
                    case "MOVE_TO_FOLDER_TRASH":
                    case 2:
                        message.operationType = 2;
                        break;
                    case "MOVE_TO_OWNER_TRASH":
                    case 3:
                        message.operationType = 3;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a RecordRemoval message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RecordRemoval
                 * @static
                 * @param {folder.v3.remove.RecordRemoval} message RecordRemoval
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RecordRemoval.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.folderUid = "";
                        else {
                            object.folderUid = [];
                            if (options.bytes !== Array)
                                object.folderUid = $util.newBuffer(object.folderUid);
                        }
                        if (options.bytes === String)
                            object.recordUid = "";
                        else {
                            object.recordUid = [];
                            if (options.bytes !== Array)
                                object.recordUid = $util.newBuffer(object.recordUid);
                        }
                        object.operationType = options.enums === String ? "RECORD_OPERATION_UNKNOWN" : 0;
                    }
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        object.operationType = options.enums === String ? $root.folder.v3.remove.RecordOperationType[message.operationType] === undefined ? message.operationType : $root.folder.v3.remove.RecordOperationType[message.operationType] : message.operationType;
                    return object;
                };

                /**
                 * Converts this RecordRemoval to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RecordRemoval
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RecordRemoval.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RecordRemoval
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RecordRemoval
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RecordRemoval.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RecordRemoval";
                };

                return RecordRemoval;
            })();

            remove.FolderRemoval = (function() {

                /**
                 * Properties of a FolderRemoval.
                 * @memberof folder.v3.remove
                 * @interface IFolderRemoval
                 * @property {Uint8Array|null} [folderUid] FolderRemoval folderUid
                 * @property {folder.v3.remove.FolderOperationType|null} [operationType] FolderRemoval operationType
                 */

                /**
                 * Constructs a new FolderRemoval.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a FolderRemoval.
                 * @implements IFolderRemoval
                 * @constructor
                 * @param {folder.v3.remove.IFolderRemoval=} [properties] Properties to set
                 */
                function FolderRemoval(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * FolderRemoval folderUid.
                 * @member {Uint8Array} folderUid
                 * @memberof folder.v3.remove.FolderRemoval
                 * @instance
                 */
                FolderRemoval.prototype.folderUid = $util.newBuffer([]);

                /**
                 * FolderRemoval operationType.
                 * @member {folder.v3.remove.FolderOperationType} operationType
                 * @memberof folder.v3.remove.FolderRemoval
                 * @instance
                 */
                FolderRemoval.prototype.operationType = 0;

                /**
                 * Creates a new FolderRemoval instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.FolderRemoval
                 * @static
                 * @param {folder.v3.remove.IFolderRemoval=} [properties] Properties to set
                 * @returns {folder.v3.remove.FolderRemoval} FolderRemoval instance
                 */
                FolderRemoval.create = function create(properties) {
                    return new FolderRemoval(properties);
                };

                /**
                 * Encodes the specified FolderRemoval message. Does not implicitly {@link folder.v3.remove.FolderRemoval.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.FolderRemoval
                 * @static
                 * @param {folder.v3.remove.IFolderRemoval} message FolderRemoval message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FolderRemoval.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.folderUid);
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.operationType);
                    return writer;
                };

                /**
                 * Encodes the specified FolderRemoval message, length delimited. Does not implicitly {@link folder.v3.remove.FolderRemoval.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.FolderRemoval
                 * @static
                 * @param {folder.v3.remove.IFolderRemoval} message FolderRemoval message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FolderRemoval.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a FolderRemoval message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.FolderRemoval
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.FolderRemoval} FolderRemoval
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FolderRemoval.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.FolderRemoval();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.folderUid = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.operationType = reader.int32();
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
                 * Decodes a FolderRemoval message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.FolderRemoval
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.FolderRemoval} FolderRemoval
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FolderRemoval.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a FolderRemoval message.
                 * @function verify
                 * @memberof folder.v3.remove.FolderRemoval
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                FolderRemoval.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        if (!(message.folderUid && typeof message.folderUid.length === "number" || $util.isString(message.folderUid)))
                            return "folderUid: buffer expected";
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        switch (message.operationType) {
                        default:
                            return "operationType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a FolderRemoval message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.FolderRemoval
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.FolderRemoval} FolderRemoval
                 */
                FolderRemoval.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.FolderRemoval)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.FolderRemoval: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.FolderRemoval();
                    if (object.folderUid != null)
                        if (typeof object.folderUid === "string")
                            $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                        else if (object.folderUid.length >= 0)
                            message.folderUid = object.folderUid;
                    switch (object.operationType) {
                    default:
                        if (typeof object.operationType === "number") {
                            message.operationType = object.operationType;
                            break;
                        }
                        break;
                    case "FOLDER_OPERATION_UNKNOWN":
                    case 0:
                        message.operationType = 0;
                        break;
                    case "FOLDER_MOVE_TO_FOLDER_TRASH":
                    case 1:
                        message.operationType = 1;
                        break;
                    case "FOLDER_MOVE_TO_OWNER_TRASH":
                    case 2:
                        message.operationType = 2;
                        break;
                    case "FOLDER_DELETE_PERMANENT":
                    case 3:
                        message.operationType = 3;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a FolderRemoval message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.FolderRemoval
                 * @static
                 * @param {folder.v3.remove.FolderRemoval} message FolderRemoval
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                FolderRemoval.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.folderUid = "";
                        else {
                            object.folderUid = [];
                            if (options.bytes !== Array)
                                object.folderUid = $util.newBuffer(object.folderUid);
                        }
                        object.operationType = options.enums === String ? "FOLDER_OPERATION_UNKNOWN" : 0;
                    }
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        object.operationType = options.enums === String ? $root.folder.v3.remove.FolderOperationType[message.operationType] === undefined ? message.operationType : $root.folder.v3.remove.FolderOperationType[message.operationType] : message.operationType;
                    return object;
                };

                /**
                 * Converts this FolderRemoval to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.FolderRemoval
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                FolderRemoval.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for FolderRemoval
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.FolderRemoval
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                FolderRemoval.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.FolderRemoval";
                };

                return FolderRemoval;
            })();

            remove.RemoveRecordRequest = (function() {

                /**
                 * Properties of a RemoveRecordRequest.
                 * @memberof folder.v3.remove
                 * @interface IRemoveRecordRequest
                 * @property {folder.v3.remove.RemoveAction|null} [action] RemoveRecordRequest action
                 * @property {Array.<folder.v3.remove.IRecordRemoval>|null} [records] RemoveRecordRequest records
                 * @property {Uint8Array|null} [confirmationToken] RemoveRecordRequest confirmationToken
                 */

                /**
                 * Constructs a new RemoveRecordRequest.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a RemoveRecordRequest.
                 * @implements IRemoveRecordRequest
                 * @constructor
                 * @param {folder.v3.remove.IRemoveRecordRequest=} [properties] Properties to set
                 */
                function RemoveRecordRequest(properties) {
                    this.records = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RemoveRecordRequest action.
                 * @member {folder.v3.remove.RemoveAction} action
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @instance
                 */
                RemoveRecordRequest.prototype.action = 0;

                /**
                 * RemoveRecordRequest records.
                 * @member {Array.<folder.v3.remove.IRecordRemoval>} records
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @instance
                 */
                RemoveRecordRequest.prototype.records = $util.emptyArray;

                /**
                 * RemoveRecordRequest confirmationToken.
                 * @member {Uint8Array} confirmationToken
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @instance
                 */
                RemoveRecordRequest.prototype.confirmationToken = $util.newBuffer([]);

                /**
                 * Creates a new RemoveRecordRequest instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @static
                 * @param {folder.v3.remove.IRemoveRecordRequest=} [properties] Properties to set
                 * @returns {folder.v3.remove.RemoveRecordRequest} RemoveRecordRequest instance
                 */
                RemoveRecordRequest.create = function create(properties) {
                    return new RemoveRecordRequest(properties);
                };

                /**
                 * Encodes the specified RemoveRecordRequest message. Does not implicitly {@link folder.v3.remove.RemoveRecordRequest.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @static
                 * @param {folder.v3.remove.IRemoveRecordRequest} message RemoveRecordRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RemoveRecordRequest.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
                    if (message.records != null && message.records.length)
                        for (let i = 0; i < message.records.length; ++i)
                            $root.folder.v3.remove.RecordRemoval.encode(message.records[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                    if (message.confirmationToken != null && Object.hasOwnProperty.call(message, "confirmationToken"))
                        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.confirmationToken);
                    return writer;
                };

                /**
                 * Encodes the specified RemoveRecordRequest message, length delimited. Does not implicitly {@link folder.v3.remove.RemoveRecordRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @static
                 * @param {folder.v3.remove.IRemoveRecordRequest} message RemoveRecordRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RemoveRecordRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RemoveRecordRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RemoveRecordRequest} RemoveRecordRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RemoveRecordRequest.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RemoveRecordRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.action = reader.int32();
                                break;
                            }
                        case 2: {
                                if (!(message.records && message.records.length))
                                    message.records = [];
                                message.records.push($root.folder.v3.remove.RecordRemoval.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 3: {
                                message.confirmationToken = reader.bytes();
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
                 * Decodes a RemoveRecordRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RemoveRecordRequest} RemoveRecordRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RemoveRecordRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RemoveRecordRequest message.
                 * @function verify
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RemoveRecordRequest.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                        switch (message.action) {
                        default:
                            return "action: enum value expected";
                        case 0:
                        case 1:
                            break;
                        }
                    if (message.records != null && Object.hasOwnProperty.call(message, "records")) {
                        if (!Array.isArray(message.records))
                            return "records: array expected";
                        for (let i = 0; i < message.records.length; ++i) {
                            let error = $root.folder.v3.remove.RecordRemoval.verify(message.records[i], long + 1);
                            if (error)
                                return "records." + error;
                        }
                    }
                    if (message.confirmationToken != null && Object.hasOwnProperty.call(message, "confirmationToken"))
                        if (!(message.confirmationToken && typeof message.confirmationToken.length === "number" || $util.isString(message.confirmationToken)))
                            return "confirmationToken: buffer expected";
                    return null;
                };

                /**
                 * Creates a RemoveRecordRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RemoveRecordRequest} RemoveRecordRequest
                 */
                RemoveRecordRequest.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RemoveRecordRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RemoveRecordRequest: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RemoveRecordRequest();
                    switch (object.action) {
                    default:
                        if (typeof object.action === "number") {
                            message.action = object.action;
                            break;
                        }
                        break;
                    case "REMOVE_ACTION_PREVIEW":
                    case 0:
                        message.action = 0;
                        break;
                    case "REMOVE_ACTION_CONFIRM":
                    case 1:
                        message.action = 1;
                        break;
                    }
                    if (object.records) {
                        if (!Array.isArray(object.records))
                            throw TypeError(".folder.v3.remove.RemoveRecordRequest.records: array expected");
                        message.records = [];
                        for (let i = 0; i < object.records.length; ++i) {
                            if (!$util.isObject(object.records[i]))
                                throw TypeError(".folder.v3.remove.RemoveRecordRequest.records: object expected");
                            message.records[i] = $root.folder.v3.remove.RecordRemoval.fromObject(object.records[i], long + 1);
                        }
                    }
                    if (object.confirmationToken != null)
                        if (typeof object.confirmationToken === "string")
                            $util.base64.decode(object.confirmationToken, message.confirmationToken = $util.newBuffer($util.base64.length(object.confirmationToken)), 0);
                        else if (object.confirmationToken.length >= 0)
                            message.confirmationToken = object.confirmationToken;
                    return message;
                };

                /**
                 * Creates a plain object from a RemoveRecordRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @static
                 * @param {folder.v3.remove.RemoveRecordRequest} message RemoveRecordRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RemoveRecordRequest.toObject = function toObject(message, options, q) {
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
                        object.action = options.enums === String ? "REMOVE_ACTION_PREVIEW" : 0;
                        if (options.bytes === String)
                            object.confirmationToken = "";
                        else {
                            object.confirmationToken = [];
                            if (options.bytes !== Array)
                                object.confirmationToken = $util.newBuffer(object.confirmationToken);
                        }
                    }
                    if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                        object.action = options.enums === String ? $root.folder.v3.remove.RemoveAction[message.action] === undefined ? message.action : $root.folder.v3.remove.RemoveAction[message.action] : message.action;
                    if (message.records && message.records.length) {
                        object.records = [];
                        for (let j = 0; j < message.records.length; ++j)
                            object.records[j] = $root.folder.v3.remove.RecordRemoval.toObject(message.records[j], options, q + 1);
                    }
                    if (message.confirmationToken != null && Object.hasOwnProperty.call(message, "confirmationToken"))
                        object.confirmationToken = options.bytes === String ? $util.base64.encode(message.confirmationToken, 0, message.confirmationToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.confirmationToken) : message.confirmationToken;
                    return object;
                };

                /**
                 * Converts this RemoveRecordRequest to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RemoveRecordRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RemoveRecordRequest
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RemoveRecordRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RemoveRecordRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RemoveRecordRequest";
                };

                return RemoveRecordRequest;
            })();

            remove.RemoveFolderRequest = (function() {

                /**
                 * Properties of a RemoveFolderRequest.
                 * @memberof folder.v3.remove
                 * @interface IRemoveFolderRequest
                 * @property {folder.v3.remove.RemoveAction|null} [action] RemoveFolderRequest action
                 * @property {Array.<folder.v3.remove.IFolderRemoval>|null} [folders] RemoveFolderRequest folders
                 * @property {Uint8Array|null} [confirmationToken] RemoveFolderRequest confirmationToken
                 */

                /**
                 * Constructs a new RemoveFolderRequest.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a RemoveFolderRequest.
                 * @implements IRemoveFolderRequest
                 * @constructor
                 * @param {folder.v3.remove.IRemoveFolderRequest=} [properties] Properties to set
                 */
                function RemoveFolderRequest(properties) {
                    this.folders = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RemoveFolderRequest action.
                 * @member {folder.v3.remove.RemoveAction} action
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @instance
                 */
                RemoveFolderRequest.prototype.action = 0;

                /**
                 * RemoveFolderRequest folders.
                 * @member {Array.<folder.v3.remove.IFolderRemoval>} folders
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @instance
                 */
                RemoveFolderRequest.prototype.folders = $util.emptyArray;

                /**
                 * RemoveFolderRequest confirmationToken.
                 * @member {Uint8Array} confirmationToken
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @instance
                 */
                RemoveFolderRequest.prototype.confirmationToken = $util.newBuffer([]);

                /**
                 * Creates a new RemoveFolderRequest instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @static
                 * @param {folder.v3.remove.IRemoveFolderRequest=} [properties] Properties to set
                 * @returns {folder.v3.remove.RemoveFolderRequest} RemoveFolderRequest instance
                 */
                RemoveFolderRequest.create = function create(properties) {
                    return new RemoveFolderRequest(properties);
                };

                /**
                 * Encodes the specified RemoveFolderRequest message. Does not implicitly {@link folder.v3.remove.RemoveFolderRequest.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @static
                 * @param {folder.v3.remove.IRemoveFolderRequest} message RemoveFolderRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RemoveFolderRequest.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
                    if (message.folders != null && message.folders.length)
                        for (let i = 0; i < message.folders.length; ++i)
                            $root.folder.v3.remove.FolderRemoval.encode(message.folders[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                    if (message.confirmationToken != null && Object.hasOwnProperty.call(message, "confirmationToken"))
                        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.confirmationToken);
                    return writer;
                };

                /**
                 * Encodes the specified RemoveFolderRequest message, length delimited. Does not implicitly {@link folder.v3.remove.RemoveFolderRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @static
                 * @param {folder.v3.remove.IRemoveFolderRequest} message RemoveFolderRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RemoveFolderRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RemoveFolderRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RemoveFolderRequest} RemoveFolderRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RemoveFolderRequest.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RemoveFolderRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.action = reader.int32();
                                break;
                            }
                        case 2: {
                                if (!(message.folders && message.folders.length))
                                    message.folders = [];
                                message.folders.push($root.folder.v3.remove.FolderRemoval.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 3: {
                                message.confirmationToken = reader.bytes();
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
                 * Decodes a RemoveFolderRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RemoveFolderRequest} RemoveFolderRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RemoveFolderRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RemoveFolderRequest message.
                 * @function verify
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RemoveFolderRequest.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                        switch (message.action) {
                        default:
                            return "action: enum value expected";
                        case 0:
                        case 1:
                            break;
                        }
                    if (message.folders != null && Object.hasOwnProperty.call(message, "folders")) {
                        if (!Array.isArray(message.folders))
                            return "folders: array expected";
                        for (let i = 0; i < message.folders.length; ++i) {
                            let error = $root.folder.v3.remove.FolderRemoval.verify(message.folders[i], long + 1);
                            if (error)
                                return "folders." + error;
                        }
                    }
                    if (message.confirmationToken != null && Object.hasOwnProperty.call(message, "confirmationToken"))
                        if (!(message.confirmationToken && typeof message.confirmationToken.length === "number" || $util.isString(message.confirmationToken)))
                            return "confirmationToken: buffer expected";
                    return null;
                };

                /**
                 * Creates a RemoveFolderRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RemoveFolderRequest} RemoveFolderRequest
                 */
                RemoveFolderRequest.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RemoveFolderRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RemoveFolderRequest: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RemoveFolderRequest();
                    switch (object.action) {
                    default:
                        if (typeof object.action === "number") {
                            message.action = object.action;
                            break;
                        }
                        break;
                    case "REMOVE_ACTION_PREVIEW":
                    case 0:
                        message.action = 0;
                        break;
                    case "REMOVE_ACTION_CONFIRM":
                    case 1:
                        message.action = 1;
                        break;
                    }
                    if (object.folders) {
                        if (!Array.isArray(object.folders))
                            throw TypeError(".folder.v3.remove.RemoveFolderRequest.folders: array expected");
                        message.folders = [];
                        for (let i = 0; i < object.folders.length; ++i) {
                            if (!$util.isObject(object.folders[i]))
                                throw TypeError(".folder.v3.remove.RemoveFolderRequest.folders: object expected");
                            message.folders[i] = $root.folder.v3.remove.FolderRemoval.fromObject(object.folders[i], long + 1);
                        }
                    }
                    if (object.confirmationToken != null)
                        if (typeof object.confirmationToken === "string")
                            $util.base64.decode(object.confirmationToken, message.confirmationToken = $util.newBuffer($util.base64.length(object.confirmationToken)), 0);
                        else if (object.confirmationToken.length >= 0)
                            message.confirmationToken = object.confirmationToken;
                    return message;
                };

                /**
                 * Creates a plain object from a RemoveFolderRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @static
                 * @param {folder.v3.remove.RemoveFolderRequest} message RemoveFolderRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RemoveFolderRequest.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.folders = [];
                    if (options.defaults) {
                        object.action = options.enums === String ? "REMOVE_ACTION_PREVIEW" : 0;
                        if (options.bytes === String)
                            object.confirmationToken = "";
                        else {
                            object.confirmationToken = [];
                            if (options.bytes !== Array)
                                object.confirmationToken = $util.newBuffer(object.confirmationToken);
                        }
                    }
                    if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                        object.action = options.enums === String ? $root.folder.v3.remove.RemoveAction[message.action] === undefined ? message.action : $root.folder.v3.remove.RemoveAction[message.action] : message.action;
                    if (message.folders && message.folders.length) {
                        object.folders = [];
                        for (let j = 0; j < message.folders.length; ++j)
                            object.folders[j] = $root.folder.v3.remove.FolderRemoval.toObject(message.folders[j], options, q + 1);
                    }
                    if (message.confirmationToken != null && Object.hasOwnProperty.call(message, "confirmationToken"))
                        object.confirmationToken = options.bytes === String ? $util.base64.encode(message.confirmationToken, 0, message.confirmationToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.confirmationToken) : message.confirmationToken;
                    return object;
                };

                /**
                 * Converts this RemoveFolderRequest to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RemoveFolderRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RemoveFolderRequest
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RemoveFolderRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RemoveFolderRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RemoveFolderRequest";
                };

                return RemoveFolderRequest;
            })();

            remove.RemoveResponse = (function() {

                /**
                 * Properties of a RemoveResponse.
                 * @memberof folder.v3.remove
                 * @interface IRemoveResponse
                 * @property {Uint8Array|null} [confirmationToken] RemoveResponse confirmationToken
                 * @property {number|null} [tokenExpiresAt] RemoveResponse tokenExpiresAt
                 * @property {Array.<folder.v3.remove.IRemoveResult>|null} [results] RemoveResponse results
                 * @property {string|null} [errorMessage] RemoveResponse errorMessage
                 */

                /**
                 * Constructs a new RemoveResponse.
                 * @memberof folder.v3.remove
                 * @classdesc Response for remove operations (both record and folder).
                 * 
                 * For PREVIEW: Contains confirmation_token and per-item results with impact.
                 * For CONFIRM: Contains per-item results with execution status.
                 * @implements IRemoveResponse
                 * @constructor
                 * @param {folder.v3.remove.IRemoveResponse=} [properties] Properties to set
                 */
                function RemoveResponse(properties) {
                    this.results = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RemoveResponse confirmationToken.
                 * @member {Uint8Array} confirmationToken
                 * @memberof folder.v3.remove.RemoveResponse
                 * @instance
                 */
                RemoveResponse.prototype.confirmationToken = $util.newBuffer([]);

                /**
                 * RemoveResponse tokenExpiresAt.
                 * @member {number} tokenExpiresAt
                 * @memberof folder.v3.remove.RemoveResponse
                 * @instance
                 */
                RemoveResponse.prototype.tokenExpiresAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * RemoveResponse results.
                 * @member {Array.<folder.v3.remove.IRemoveResult>} results
                 * @memberof folder.v3.remove.RemoveResponse
                 * @instance
                 */
                RemoveResponse.prototype.results = $util.emptyArray;

                /**
                 * RemoveResponse errorMessage.
                 * @member {string} errorMessage
                 * @memberof folder.v3.remove.RemoveResponse
                 * @instance
                 */
                RemoveResponse.prototype.errorMessage = "";

                /**
                 * Creates a new RemoveResponse instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RemoveResponse
                 * @static
                 * @param {folder.v3.remove.IRemoveResponse=} [properties] Properties to set
                 * @returns {folder.v3.remove.RemoveResponse} RemoveResponse instance
                 */
                RemoveResponse.create = function create(properties) {
                    return new RemoveResponse(properties);
                };

                /**
                 * Encodes the specified RemoveResponse message. Does not implicitly {@link folder.v3.remove.RemoveResponse.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RemoveResponse
                 * @static
                 * @param {folder.v3.remove.IRemoveResponse} message RemoveResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RemoveResponse.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.confirmationToken != null && Object.hasOwnProperty.call(message, "confirmationToken"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.confirmationToken);
                    if (message.tokenExpiresAt != null && Object.hasOwnProperty.call(message, "tokenExpiresAt"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int64(message.tokenExpiresAt);
                    if (message.results != null && message.results.length)
                        for (let i = 0; i < message.results.length; ++i)
                            $root.folder.v3.remove.RemoveResult.encode(message.results[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.errorMessage);
                    return writer;
                };

                /**
                 * Encodes the specified RemoveResponse message, length delimited. Does not implicitly {@link folder.v3.remove.RemoveResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RemoveResponse
                 * @static
                 * @param {folder.v3.remove.IRemoveResponse} message RemoveResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RemoveResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RemoveResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RemoveResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RemoveResponse} RemoveResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RemoveResponse.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RemoveResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.confirmationToken = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.tokenExpiresAt = reader.int64();
                                break;
                            }
                        case 3: {
                                if (!(message.results && message.results.length))
                                    message.results = [];
                                message.results.push($root.folder.v3.remove.RemoveResult.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 4: {
                                message.errorMessage = reader.string();
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
                 * Decodes a RemoveResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RemoveResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RemoveResponse} RemoveResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RemoveResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RemoveResponse message.
                 * @function verify
                 * @memberof folder.v3.remove.RemoveResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RemoveResponse.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.confirmationToken != null && Object.hasOwnProperty.call(message, "confirmationToken"))
                        if (!(message.confirmationToken && typeof message.confirmationToken.length === "number" || $util.isString(message.confirmationToken)))
                            return "confirmationToken: buffer expected";
                    if (message.tokenExpiresAt != null && Object.hasOwnProperty.call(message, "tokenExpiresAt"))
                        if (!$util.isInteger(message.tokenExpiresAt) && !(message.tokenExpiresAt && $util.isInteger(message.tokenExpiresAt.low) && $util.isInteger(message.tokenExpiresAt.high)))
                            return "tokenExpiresAt: integer|Long expected";
                    if (message.results != null && Object.hasOwnProperty.call(message, "results")) {
                        if (!Array.isArray(message.results))
                            return "results: array expected";
                        for (let i = 0; i < message.results.length; ++i) {
                            let error = $root.folder.v3.remove.RemoveResult.verify(message.results[i], long + 1);
                            if (error)
                                return "results." + error;
                        }
                    }
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                        if (!$util.isString(message.errorMessage))
                            return "errorMessage: string expected";
                    return null;
                };

                /**
                 * Creates a RemoveResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RemoveResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RemoveResponse} RemoveResponse
                 */
                RemoveResponse.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RemoveResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RemoveResponse: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RemoveResponse();
                    if (object.confirmationToken != null)
                        if (typeof object.confirmationToken === "string")
                            $util.base64.decode(object.confirmationToken, message.confirmationToken = $util.newBuffer($util.base64.length(object.confirmationToken)), 0);
                        else if (object.confirmationToken.length >= 0)
                            message.confirmationToken = object.confirmationToken;
                    if (object.tokenExpiresAt != null)
                        if ($util.Long)
                            message.tokenExpiresAt = $util.Long.fromValue(object.tokenExpiresAt, false);
                        else if (typeof object.tokenExpiresAt === "string")
                            message.tokenExpiresAt = parseInt(object.tokenExpiresAt, 10);
                        else if (typeof object.tokenExpiresAt === "number")
                            message.tokenExpiresAt = object.tokenExpiresAt;
                        else if (typeof object.tokenExpiresAt === "object")
                            message.tokenExpiresAt = new $util.LongBits(object.tokenExpiresAt.low >>> 0, object.tokenExpiresAt.high >>> 0).toNumber();
                    if (object.results) {
                        if (!Array.isArray(object.results))
                            throw TypeError(".folder.v3.remove.RemoveResponse.results: array expected");
                        message.results = [];
                        for (let i = 0; i < object.results.length; ++i) {
                            if (!$util.isObject(object.results[i]))
                                throw TypeError(".folder.v3.remove.RemoveResponse.results: object expected");
                            message.results[i] = $root.folder.v3.remove.RemoveResult.fromObject(object.results[i], long + 1);
                        }
                    }
                    if (object.errorMessage != null)
                        message.errorMessage = String(object.errorMessage);
                    return message;
                };

                /**
                 * Creates a plain object from a RemoveResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RemoveResponse
                 * @static
                 * @param {folder.v3.remove.RemoveResponse} message RemoveResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RemoveResponse.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.results = [];
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.confirmationToken = "";
                        else {
                            object.confirmationToken = [];
                            if (options.bytes !== Array)
                                object.confirmationToken = $util.newBuffer(object.confirmationToken);
                        }
                        if ($util.Long) {
                            let long = new $util.Long(0, 0, false);
                            object.tokenExpiresAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                        } else
                            object.tokenExpiresAt = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                        object.errorMessage = "";
                    }
                    if (message.confirmationToken != null && Object.hasOwnProperty.call(message, "confirmationToken"))
                        object.confirmationToken = options.bytes === String ? $util.base64.encode(message.confirmationToken, 0, message.confirmationToken.length) : options.bytes === Array ? Array.prototype.slice.call(message.confirmationToken) : message.confirmationToken;
                    if (message.tokenExpiresAt != null && Object.hasOwnProperty.call(message, "tokenExpiresAt"))
                        if (typeof BigInt !== "undefined" && options.longs === BigInt)
                            object.tokenExpiresAt = typeof message.tokenExpiresAt === "number" ? BigInt(message.tokenExpiresAt) : $util.Long.fromBits(message.tokenExpiresAt.low >>> 0, message.tokenExpiresAt.high >>> 0, false).toBigInt();
                        else if (typeof message.tokenExpiresAt === "number")
                            object.tokenExpiresAt = options.longs === String ? String(message.tokenExpiresAt) : message.tokenExpiresAt;
                        else
                            object.tokenExpiresAt = options.longs === String ? $util.Long.prototype.toString.call(message.tokenExpiresAt) : options.longs === Number ? new $util.LongBits(message.tokenExpiresAt.low >>> 0, message.tokenExpiresAt.high >>> 0).toNumber() : message.tokenExpiresAt;
                    if (message.results && message.results.length) {
                        object.results = [];
                        for (let j = 0; j < message.results.length; ++j)
                            object.results[j] = $root.folder.v3.remove.RemoveResult.toObject(message.results[j], options, q + 1);
                    }
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                        object.errorMessage = message.errorMessage;
                    return object;
                };

                /**
                 * Converts this RemoveResponse to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RemoveResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RemoveResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RemoveResponse
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RemoveResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RemoveResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RemoveResponse";
                };

                return RemoveResponse;
            })();

            remove.RemoveResult = (function() {

                /**
                 * Properties of a RemoveResult.
                 * @memberof folder.v3.remove
                 * @interface IRemoveResult
                 * @property {Uint8Array|null} [itemUid] RemoveResult itemUid
                 * @property {Uint8Array|null} [folderUid] RemoveResult folderUid
                 * @property {folder.v3.remove.RemoveStatus|null} [status] RemoveResult status
                 * @property {folder.v3.remove.IImpact|null} [impact] RemoveResult impact
                 * @property {folder.v3.remove.IItemError|null} [error] RemoveResult error
                 */

                /**
                 * Constructs a new RemoveResult.
                 * @memberof folder.v3.remove
                 * @classdesc Per-item result for a single record or folder.
                 * @implements IRemoveResult
                 * @constructor
                 * @param {folder.v3.remove.IRemoveResult=} [properties] Properties to set
                 */
                function RemoveResult(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RemoveResult itemUid.
                 * @member {Uint8Array} itemUid
                 * @memberof folder.v3.remove.RemoveResult
                 * @instance
                 */
                RemoveResult.prototype.itemUid = $util.newBuffer([]);

                /**
                 * RemoveResult folderUid.
                 * @member {Uint8Array} folderUid
                 * @memberof folder.v3.remove.RemoveResult
                 * @instance
                 */
                RemoveResult.prototype.folderUid = $util.newBuffer([]);

                /**
                 * RemoveResult status.
                 * @member {folder.v3.remove.RemoveStatus} status
                 * @memberof folder.v3.remove.RemoveResult
                 * @instance
                 */
                RemoveResult.prototype.status = 0;

                /**
                 * RemoveResult impact.
                 * @member {folder.v3.remove.IImpact|null|undefined} impact
                 * @memberof folder.v3.remove.RemoveResult
                 * @instance
                 */
                RemoveResult.prototype.impact = null;

                /**
                 * RemoveResult error.
                 * @member {folder.v3.remove.IItemError|null|undefined} error
                 * @memberof folder.v3.remove.RemoveResult
                 * @instance
                 */
                RemoveResult.prototype.error = null;

                /**
                 * Creates a new RemoveResult instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RemoveResult
                 * @static
                 * @param {folder.v3.remove.IRemoveResult=} [properties] Properties to set
                 * @returns {folder.v3.remove.RemoveResult} RemoveResult instance
                 */
                RemoveResult.create = function create(properties) {
                    return new RemoveResult(properties);
                };

                /**
                 * Encodes the specified RemoveResult message. Does not implicitly {@link folder.v3.remove.RemoveResult.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RemoveResult
                 * @static
                 * @param {folder.v3.remove.IRemoveResult} message RemoveResult message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RemoveResult.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.itemUid != null && Object.hasOwnProperty.call(message, "itemUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.itemUid);
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.folderUid);
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
                    if (message.impact != null && Object.hasOwnProperty.call(message, "impact"))
                        $root.folder.v3.remove.Impact.encode(message.impact, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
                    if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                        $root.folder.v3.remove.ItemError.encode(message.error, writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified RemoveResult message, length delimited. Does not implicitly {@link folder.v3.remove.RemoveResult.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RemoveResult
                 * @static
                 * @param {folder.v3.remove.IRemoveResult} message RemoveResult message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RemoveResult.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RemoveResult message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RemoveResult
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RemoveResult} RemoveResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RemoveResult.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RemoveResult();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.itemUid = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.folderUid = reader.bytes();
                                break;
                            }
                        case 3: {
                                message.status = reader.int32();
                                break;
                            }
                        case 4: {
                                message.impact = $root.folder.v3.remove.Impact.decode(reader, reader.uint32(), undefined, long + 1);
                                break;
                            }
                        case 5: {
                                message.error = $root.folder.v3.remove.ItemError.decode(reader, reader.uint32(), undefined, long + 1);
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
                 * Decodes a RemoveResult message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RemoveResult
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RemoveResult} RemoveResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RemoveResult.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RemoveResult message.
                 * @function verify
                 * @memberof folder.v3.remove.RemoveResult
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RemoveResult.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.itemUid != null && Object.hasOwnProperty.call(message, "itemUid"))
                        if (!(message.itemUid && typeof message.itemUid.length === "number" || $util.isString(message.itemUid)))
                            return "itemUid: buffer expected";
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        if (!(message.folderUid && typeof message.folderUid.length === "number" || $util.isString(message.folderUid)))
                            return "folderUid: buffer expected";
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
                    if (message.impact != null && Object.hasOwnProperty.call(message, "impact")) {
                        let error = $root.folder.v3.remove.Impact.verify(message.impact, long + 1);
                        if (error)
                            return "impact." + error;
                    }
                    if (message.error != null && Object.hasOwnProperty.call(message, "error")) {
                        let error = $root.folder.v3.remove.ItemError.verify(message.error, long + 1);
                        if (error)
                            return "error." + error;
                    }
                    return null;
                };

                /**
                 * Creates a RemoveResult message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RemoveResult
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RemoveResult} RemoveResult
                 */
                RemoveResult.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RemoveResult)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RemoveResult: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RemoveResult();
                    if (object.itemUid != null)
                        if (typeof object.itemUid === "string")
                            $util.base64.decode(object.itemUid, message.itemUid = $util.newBuffer($util.base64.length(object.itemUid)), 0);
                        else if (object.itemUid.length >= 0)
                            message.itemUid = object.itemUid;
                    if (object.folderUid != null)
                        if (typeof object.folderUid === "string")
                            $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                        else if (object.folderUid.length >= 0)
                            message.folderUid = object.folderUid;
                    switch (object.status) {
                    default:
                        if (typeof object.status === "number") {
                            message.status = object.status;
                            break;
                        }
                        break;
                    case "REMOVE_STATUS_UNKNOWN":
                    case 0:
                        message.status = 0;
                        break;
                    case "REMOVE_STATUS_SUCCESS":
                    case 1:
                        message.status = 1;
                        break;
                    case "REMOVE_STATUS_STALE_PREVIEW":
                    case 2:
                        message.status = 2;
                        break;
                    case "REMOVE_STATUS_TOKEN_EXPIRED":
                    case 3:
                        message.status = 3;
                        break;
                    case "REMOVE_STATUS_TOKEN_INVALID":
                    case 4:
                        message.status = 4;
                        break;
                    case "REMOVE_STATUS_ACCESS_DENIED":
                    case 5:
                        message.status = 5;
                        break;
                    case "REMOVE_STATUS_VALIDATION_ERROR":
                    case 6:
                        message.status = 6;
                        break;
                    }
                    if (object.impact != null) {
                        if (!$util.isObject(object.impact))
                            throw TypeError(".folder.v3.remove.RemoveResult.impact: object expected");
                        message.impact = $root.folder.v3.remove.Impact.fromObject(object.impact, long + 1);
                    }
                    if (object.error != null) {
                        if (!$util.isObject(object.error))
                            throw TypeError(".folder.v3.remove.RemoveResult.error: object expected");
                        message.error = $root.folder.v3.remove.ItemError.fromObject(object.error, long + 1);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a RemoveResult message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RemoveResult
                 * @static
                 * @param {folder.v3.remove.RemoveResult} message RemoveResult
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RemoveResult.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.itemUid = "";
                        else {
                            object.itemUid = [];
                            if (options.bytes !== Array)
                                object.itemUid = $util.newBuffer(object.itemUid);
                        }
                        if (options.bytes === String)
                            object.folderUid = "";
                        else {
                            object.folderUid = [];
                            if (options.bytes !== Array)
                                object.folderUid = $util.newBuffer(object.folderUid);
                        }
                        object.status = options.enums === String ? "REMOVE_STATUS_UNKNOWN" : 0;
                        object.impact = null;
                        object.error = null;
                    }
                    if (message.itemUid != null && Object.hasOwnProperty.call(message, "itemUid"))
                        object.itemUid = options.bytes === String ? $util.base64.encode(message.itemUid, 0, message.itemUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.itemUid) : message.itemUid;
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        object.status = options.enums === String ? $root.folder.v3.remove.RemoveStatus[message.status] === undefined ? message.status : $root.folder.v3.remove.RemoveStatus[message.status] : message.status;
                    if (message.impact != null && Object.hasOwnProperty.call(message, "impact"))
                        object.impact = $root.folder.v3.remove.Impact.toObject(message.impact, options, q + 1);
                    if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                        object.error = $root.folder.v3.remove.ItemError.toObject(message.error, options, q + 1);
                    return object;
                };

                /**
                 * Converts this RemoveResult to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RemoveResult
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RemoveResult.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RemoveResult
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RemoveResult
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RemoveResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RemoveResult";
                };

                return RemoveResult;
            })();

            remove.Impact = (function() {

                /**
                 * Properties of an Impact.
                 * @memberof folder.v3.remove
                 * @interface IImpact
                 * @property {number|null} [foldersCount] Impact foldersCount
                 * @property {number|null} [recordsCount] Impact recordsCount
                 * @property {number|null} [affectedUsersCount] Impact affectedUsersCount
                 * @property {number|null} [affectedTeamsCount] Impact affectedTeamsCount
                 * @property {Array.<folder.v3.remove.IRecordInfo>|null} [recordInfo] Impact recordInfo
                 * @property {Array.<string>|null} [warnings] Impact warnings
                 */

                /**
                 * Constructs a new Impact.
                 * @memberof folder.v3.remove
                 * @classdesc Impact metrics for a single item (record or folder tree).
                 * @implements IImpact
                 * @constructor
                 * @param {folder.v3.remove.IImpact=} [properties] Properties to set
                 */
                function Impact(properties) {
                    this.recordInfo = [];
                    this.warnings = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Impact foldersCount.
                 * @member {number} foldersCount
                 * @memberof folder.v3.remove.Impact
                 * @instance
                 */
                Impact.prototype.foldersCount = 0;

                /**
                 * Impact recordsCount.
                 * @member {number} recordsCount
                 * @memberof folder.v3.remove.Impact
                 * @instance
                 */
                Impact.prototype.recordsCount = 0;

                /**
                 * Impact affectedUsersCount.
                 * @member {number} affectedUsersCount
                 * @memberof folder.v3.remove.Impact
                 * @instance
                 */
                Impact.prototype.affectedUsersCount = 0;

                /**
                 * Impact affectedTeamsCount.
                 * @member {number} affectedTeamsCount
                 * @memberof folder.v3.remove.Impact
                 * @instance
                 */
                Impact.prototype.affectedTeamsCount = 0;

                /**
                 * Impact recordInfo.
                 * @member {Array.<folder.v3.remove.IRecordInfo>} recordInfo
                 * @memberof folder.v3.remove.Impact
                 * @instance
                 */
                Impact.prototype.recordInfo = $util.emptyArray;

                /**
                 * Impact warnings.
                 * @member {Array.<string>} warnings
                 * @memberof folder.v3.remove.Impact
                 * @instance
                 */
                Impact.prototype.warnings = $util.emptyArray;

                /**
                 * Creates a new Impact instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.Impact
                 * @static
                 * @param {folder.v3.remove.IImpact=} [properties] Properties to set
                 * @returns {folder.v3.remove.Impact} Impact instance
                 */
                Impact.create = function create(properties) {
                    return new Impact(properties);
                };

                /**
                 * Encodes the specified Impact message. Does not implicitly {@link folder.v3.remove.Impact.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.Impact
                 * @static
                 * @param {folder.v3.remove.IImpact} message Impact message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Impact.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.foldersCount != null && Object.hasOwnProperty.call(message, "foldersCount"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.foldersCount);
                    if (message.recordsCount != null && Object.hasOwnProperty.call(message, "recordsCount"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.recordsCount);
                    if (message.affectedUsersCount != null && Object.hasOwnProperty.call(message, "affectedUsersCount"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.affectedUsersCount);
                    if (message.affectedTeamsCount != null && Object.hasOwnProperty.call(message, "affectedTeamsCount"))
                        writer.uint32(/* id 4, wireType 0 =*/32).int32(message.affectedTeamsCount);
                    if (message.recordInfo != null && message.recordInfo.length)
                        for (let i = 0; i < message.recordInfo.length; ++i)
                            $root.folder.v3.remove.RecordInfo.encode(message.recordInfo[i], writer.uint32(/* id 5, wireType 2 =*/42).fork(), q + 1).ldelim();
                    if (message.warnings != null && message.warnings.length)
                        for (let i = 0; i < message.warnings.length; ++i)
                            writer.uint32(/* id 6, wireType 2 =*/50).string(message.warnings[i]);
                    return writer;
                };

                /**
                 * Encodes the specified Impact message, length delimited. Does not implicitly {@link folder.v3.remove.Impact.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.Impact
                 * @static
                 * @param {folder.v3.remove.IImpact} message Impact message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Impact.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes an Impact message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.Impact
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.Impact} Impact
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Impact.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.Impact();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.foldersCount = reader.int32();
                                break;
                            }
                        case 2: {
                                message.recordsCount = reader.int32();
                                break;
                            }
                        case 3: {
                                message.affectedUsersCount = reader.int32();
                                break;
                            }
                        case 4: {
                                message.affectedTeamsCount = reader.int32();
                                break;
                            }
                        case 5: {
                                if (!(message.recordInfo && message.recordInfo.length))
                                    message.recordInfo = [];
                                message.recordInfo.push($root.folder.v3.remove.RecordInfo.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 6: {
                                if (!(message.warnings && message.warnings.length))
                                    message.warnings = [];
                                message.warnings.push(reader.string());
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
                 * Decodes an Impact message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.Impact
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.Impact} Impact
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Impact.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Impact message.
                 * @function verify
                 * @memberof folder.v3.remove.Impact
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Impact.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.foldersCount != null && Object.hasOwnProperty.call(message, "foldersCount"))
                        if (!$util.isInteger(message.foldersCount))
                            return "foldersCount: integer expected";
                    if (message.recordsCount != null && Object.hasOwnProperty.call(message, "recordsCount"))
                        if (!$util.isInteger(message.recordsCount))
                            return "recordsCount: integer expected";
                    if (message.affectedUsersCount != null && Object.hasOwnProperty.call(message, "affectedUsersCount"))
                        if (!$util.isInteger(message.affectedUsersCount))
                            return "affectedUsersCount: integer expected";
                    if (message.affectedTeamsCount != null && Object.hasOwnProperty.call(message, "affectedTeamsCount"))
                        if (!$util.isInteger(message.affectedTeamsCount))
                            return "affectedTeamsCount: integer expected";
                    if (message.recordInfo != null && Object.hasOwnProperty.call(message, "recordInfo")) {
                        if (!Array.isArray(message.recordInfo))
                            return "recordInfo: array expected";
                        for (let i = 0; i < message.recordInfo.length; ++i) {
                            let error = $root.folder.v3.remove.RecordInfo.verify(message.recordInfo[i], long + 1);
                            if (error)
                                return "recordInfo." + error;
                        }
                    }
                    if (message.warnings != null && Object.hasOwnProperty.call(message, "warnings")) {
                        if (!Array.isArray(message.warnings))
                            return "warnings: array expected";
                        for (let i = 0; i < message.warnings.length; ++i)
                            if (!$util.isString(message.warnings[i]))
                                return "warnings: string[] expected";
                    }
                    return null;
                };

                /**
                 * Creates an Impact message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.Impact
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.Impact} Impact
                 */
                Impact.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.Impact)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.Impact: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.Impact();
                    if (object.foldersCount != null)
                        message.foldersCount = object.foldersCount | 0;
                    if (object.recordsCount != null)
                        message.recordsCount = object.recordsCount | 0;
                    if (object.affectedUsersCount != null)
                        message.affectedUsersCount = object.affectedUsersCount | 0;
                    if (object.affectedTeamsCount != null)
                        message.affectedTeamsCount = object.affectedTeamsCount | 0;
                    if (object.recordInfo) {
                        if (!Array.isArray(object.recordInfo))
                            throw TypeError(".folder.v3.remove.Impact.recordInfo: array expected");
                        message.recordInfo = [];
                        for (let i = 0; i < object.recordInfo.length; ++i) {
                            if (!$util.isObject(object.recordInfo[i]))
                                throw TypeError(".folder.v3.remove.Impact.recordInfo: object expected");
                            message.recordInfo[i] = $root.folder.v3.remove.RecordInfo.fromObject(object.recordInfo[i], long + 1);
                        }
                    }
                    if (object.warnings) {
                        if (!Array.isArray(object.warnings))
                            throw TypeError(".folder.v3.remove.Impact.warnings: array expected");
                        message.warnings = [];
                        for (let i = 0; i < object.warnings.length; ++i)
                            message.warnings[i] = String(object.warnings[i]);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an Impact message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.Impact
                 * @static
                 * @param {folder.v3.remove.Impact} message Impact
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Impact.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults) {
                        object.recordInfo = [];
                        object.warnings = [];
                    }
                    if (options.defaults) {
                        object.foldersCount = 0;
                        object.recordsCount = 0;
                        object.affectedUsersCount = 0;
                        object.affectedTeamsCount = 0;
                    }
                    if (message.foldersCount != null && Object.hasOwnProperty.call(message, "foldersCount"))
                        object.foldersCount = message.foldersCount;
                    if (message.recordsCount != null && Object.hasOwnProperty.call(message, "recordsCount"))
                        object.recordsCount = message.recordsCount;
                    if (message.affectedUsersCount != null && Object.hasOwnProperty.call(message, "affectedUsersCount"))
                        object.affectedUsersCount = message.affectedUsersCount;
                    if (message.affectedTeamsCount != null && Object.hasOwnProperty.call(message, "affectedTeamsCount"))
                        object.affectedTeamsCount = message.affectedTeamsCount;
                    if (message.recordInfo && message.recordInfo.length) {
                        object.recordInfo = [];
                        for (let j = 0; j < message.recordInfo.length; ++j)
                            object.recordInfo[j] = $root.folder.v3.remove.RecordInfo.toObject(message.recordInfo[j], options, q + 1);
                    }
                    if (message.warnings && message.warnings.length) {
                        object.warnings = [];
                        for (let j = 0; j < message.warnings.length; ++j)
                            object.warnings[j] = message.warnings[j];
                    }
                    return object;
                };

                /**
                 * Converts this Impact to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.Impact
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Impact.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Impact
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.Impact
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Impact.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.Impact";
                };

                return Impact;
            })();

            remove.RecordInfo = (function() {

                /**
                 * Properties of a RecordInfo.
                 * @memberof folder.v3.remove
                 * @interface IRecordInfo
                 * @property {Uint8Array|null} [recordUid] RecordInfo recordUid
                 * @property {number|null} [locationsCount] RecordInfo locationsCount
                 */

                /**
                 * Constructs a new RecordInfo.
                 * @memberof folder.v3.remove
                 * @classdesc Additional info for a record being removed.
                 * Only populated for MOVE_TO_OWNER_TRASH to show "also in X other folders".
                 * @implements IRecordInfo
                 * @constructor
                 * @param {folder.v3.remove.IRecordInfo=} [properties] Properties to set
                 */
                function RecordInfo(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RecordInfo recordUid.
                 * @member {Uint8Array} recordUid
                 * @memberof folder.v3.remove.RecordInfo
                 * @instance
                 */
                RecordInfo.prototype.recordUid = $util.newBuffer([]);

                /**
                 * RecordInfo locationsCount.
                 * @member {number} locationsCount
                 * @memberof folder.v3.remove.RecordInfo
                 * @instance
                 */
                RecordInfo.prototype.locationsCount = 0;

                /**
                 * Creates a new RecordInfo instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RecordInfo
                 * @static
                 * @param {folder.v3.remove.IRecordInfo=} [properties] Properties to set
                 * @returns {folder.v3.remove.RecordInfo} RecordInfo instance
                 */
                RecordInfo.create = function create(properties) {
                    return new RecordInfo(properties);
                };

                /**
                 * Encodes the specified RecordInfo message. Does not implicitly {@link folder.v3.remove.RecordInfo.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RecordInfo
                 * @static
                 * @param {folder.v3.remove.IRecordInfo} message RecordInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RecordInfo.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
                    if (message.locationsCount != null && Object.hasOwnProperty.call(message, "locationsCount"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.locationsCount);
                    return writer;
                };

                /**
                 * Encodes the specified RecordInfo message, length delimited. Does not implicitly {@link folder.v3.remove.RecordInfo.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RecordInfo
                 * @static
                 * @param {folder.v3.remove.IRecordInfo} message RecordInfo message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RecordInfo.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RecordInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RecordInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RecordInfo} RecordInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RecordInfo.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RecordInfo();
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
                                message.locationsCount = reader.int32();
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
                 * Decodes a RecordInfo message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RecordInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RecordInfo} RecordInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RecordInfo.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RecordInfo message.
                 * @function verify
                 * @memberof folder.v3.remove.RecordInfo
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RecordInfo.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                            return "recordUid: buffer expected";
                    if (message.locationsCount != null && Object.hasOwnProperty.call(message, "locationsCount"))
                        if (!$util.isInteger(message.locationsCount))
                            return "locationsCount: integer expected";
                    return null;
                };

                /**
                 * Creates a RecordInfo message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RecordInfo
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RecordInfo} RecordInfo
                 */
                RecordInfo.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RecordInfo)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RecordInfo: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RecordInfo();
                    if (object.recordUid != null)
                        if (typeof object.recordUid === "string")
                            $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                        else if (object.recordUid.length >= 0)
                            message.recordUid = object.recordUid;
                    if (object.locationsCount != null)
                        message.locationsCount = object.locationsCount | 0;
                    return message;
                };

                /**
                 * Creates a plain object from a RecordInfo message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RecordInfo
                 * @static
                 * @param {folder.v3.remove.RecordInfo} message RecordInfo
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RecordInfo.toObject = function toObject(message, options, q) {
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
                        object.locationsCount = 0;
                    }
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
                    if (message.locationsCount != null && Object.hasOwnProperty.call(message, "locationsCount"))
                        object.locationsCount = message.locationsCount;
                    return object;
                };

                /**
                 * Converts this RecordInfo to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RecordInfo
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RecordInfo.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RecordInfo
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RecordInfo
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RecordInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RecordInfo";
                };

                return RecordInfo;
            })();

            remove.ItemError = (function() {

                /**
                 * Properties of an ItemError.
                 * @memberof folder.v3.remove
                 * @interface IItemError
                 * @property {folder.v3.remove.RemoveErrorCode|null} [code] ItemError code
                 * @property {string|null} [message] ItemError message
                 */

                /**
                 * Constructs a new ItemError.
                 * @memberof folder.v3.remove
                 * @classdesc Error details for a failed item.
                 * @implements IItemError
                 * @constructor
                 * @param {folder.v3.remove.IItemError=} [properties] Properties to set
                 */
                function ItemError(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ItemError code.
                 * @member {folder.v3.remove.RemoveErrorCode} code
                 * @memberof folder.v3.remove.ItemError
                 * @instance
                 */
                ItemError.prototype.code = 0;

                /**
                 * ItemError message.
                 * @member {string} message
                 * @memberof folder.v3.remove.ItemError
                 * @instance
                 */
                ItemError.prototype.message = "";

                /**
                 * Creates a new ItemError instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.ItemError
                 * @static
                 * @param {folder.v3.remove.IItemError=} [properties] Properties to set
                 * @returns {folder.v3.remove.ItemError} ItemError instance
                 */
                ItemError.create = function create(properties) {
                    return new ItemError(properties);
                };

                /**
                 * Encodes the specified ItemError message. Does not implicitly {@link folder.v3.remove.ItemError.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.ItemError
                 * @static
                 * @param {folder.v3.remove.IItemError} message ItemError message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ItemError.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                    return writer;
                };

                /**
                 * Encodes the specified ItemError message, length delimited. Does not implicitly {@link folder.v3.remove.ItemError.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.ItemError
                 * @static
                 * @param {folder.v3.remove.IItemError} message ItemError message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ItemError.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes an ItemError message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.ItemError
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.ItemError} ItemError
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ItemError.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.ItemError();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.code = reader.int32();
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
                 * Decodes an ItemError message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.ItemError
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.ItemError} ItemError
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ItemError.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an ItemError message.
                 * @function verify
                 * @memberof folder.v3.remove.ItemError
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ItemError.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        switch (message.code) {
                        default:
                            return "code: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        }
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        if (!$util.isString(message.message))
                            return "message: string expected";
                    return null;
                };

                /**
                 * Creates an ItemError message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.ItemError
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.ItemError} ItemError
                 */
                ItemError.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.ItemError)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.ItemError: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.ItemError();
                    switch (object.code) {
                    default:
                        if (typeof object.code === "number") {
                            message.code = object.code;
                            break;
                        }
                        break;
                    case "REMOVE_ERROR_UNKNOWN":
                    case 0:
                        message.code = 0;
                        break;
                    case "REMOVE_ERROR_NOT_FOUND":
                    case 1:
                        message.code = 1;
                        break;
                    case "REMOVE_ERROR_ACCESS_DENIED":
                    case 2:
                        message.code = 2;
                        break;
                    case "REMOVE_ERROR_TRASHCAN_FOLDER":
                    case 3:
                        message.code = 3;
                        break;
                    case "REMOVE_ERROR_ROOT_FOLDER":
                    case 4:
                        message.code = 4;
                        break;
                    case "REMOVE_ERROR_DESCENDANT_DENIED":
                    case 5:
                        message.code = 5;
                        break;
                    }
                    if (object.message != null)
                        message.message = String(object.message);
                    return message;
                };

                /**
                 * Creates a plain object from an ItemError message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.ItemError
                 * @static
                 * @param {folder.v3.remove.ItemError} message ItemError
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ItemError.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        object.code = options.enums === String ? "REMOVE_ERROR_UNKNOWN" : 0;
                        object.message = "";
                    }
                    if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                        object.code = options.enums === String ? $root.folder.v3.remove.RemoveErrorCode[message.code] === undefined ? message.code : $root.folder.v3.remove.RemoveErrorCode[message.code] : message.code;
                    if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                        object.message = message.message;
                    return object;
                };

                /**
                 * Converts this ItemError to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.ItemError
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ItemError.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ItemError
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.ItemError
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ItemError.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.ItemError";
                };

                return ItemError;
            })();

            remove.RemovalTokenPayload = (function() {

                /**
                 * Properties of a RemovalTokenPayload.
                 * @memberof folder.v3.remove
                 * @interface IRemovalTokenPayload
                 * @property {Array.<folder.v3.remove.IItemFingerprint>|null} [itemFingerprints] RemovalTokenPayload itemFingerprints
                 * @property {number|null} [userId] RemovalTokenPayload userId
                 * @property {number|null} [deviceId] RemovalTokenPayload deviceId
                 * @property {Uint8Array|null} [sessionUid] RemovalTokenPayload sessionUid
                 * @property {number|null} [expiresAtMillis] RemovalTokenPayload expiresAtMillis
                 */

                /**
                 * Constructs a new RemovalTokenPayload.
                 * @memberof folder.v3.remove
                 * @classdesc Internal token payload (not exposed in API, just for serialization)
                 * @implements IRemovalTokenPayload
                 * @constructor
                 * @param {folder.v3.remove.IRemovalTokenPayload=} [properties] Properties to set
                 */
                function RemovalTokenPayload(properties) {
                    this.itemFingerprints = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RemovalTokenPayload itemFingerprints.
                 * @member {Array.<folder.v3.remove.IItemFingerprint>} itemFingerprints
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @instance
                 */
                RemovalTokenPayload.prototype.itemFingerprints = $util.emptyArray;

                /**
                 * RemovalTokenPayload userId.
                 * @member {number} userId
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @instance
                 */
                RemovalTokenPayload.prototype.userId = 0;

                /**
                 * RemovalTokenPayload deviceId.
                 * @member {number} deviceId
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @instance
                 */
                RemovalTokenPayload.prototype.deviceId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * RemovalTokenPayload sessionUid.
                 * @member {Uint8Array} sessionUid
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @instance
                 */
                RemovalTokenPayload.prototype.sessionUid = $util.newBuffer([]);

                /**
                 * RemovalTokenPayload expiresAtMillis.
                 * @member {number} expiresAtMillis
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @instance
                 */
                RemovalTokenPayload.prototype.expiresAtMillis = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new RemovalTokenPayload instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @static
                 * @param {folder.v3.remove.IRemovalTokenPayload=} [properties] Properties to set
                 * @returns {folder.v3.remove.RemovalTokenPayload} RemovalTokenPayload instance
                 */
                RemovalTokenPayload.create = function create(properties) {
                    return new RemovalTokenPayload(properties);
                };

                /**
                 * Encodes the specified RemovalTokenPayload message. Does not implicitly {@link folder.v3.remove.RemovalTokenPayload.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @static
                 * @param {folder.v3.remove.IRemovalTokenPayload} message RemovalTokenPayload message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RemovalTokenPayload.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.itemFingerprints != null && message.itemFingerprints.length)
                        for (let i = 0; i < message.itemFingerprints.length; ++i)
                            $root.folder.v3.remove.ItemFingerprint.encode(message.itemFingerprints[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                    if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.userId);
                    if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int64(message.deviceId);
                    if (message.sessionUid != null && Object.hasOwnProperty.call(message, "sessionUid"))
                        writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.sessionUid);
                    if (message.expiresAtMillis != null && Object.hasOwnProperty.call(message, "expiresAtMillis"))
                        writer.uint32(/* id 5, wireType 0 =*/40).int64(message.expiresAtMillis);
                    return writer;
                };

                /**
                 * Encodes the specified RemovalTokenPayload message, length delimited. Does not implicitly {@link folder.v3.remove.RemovalTokenPayload.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @static
                 * @param {folder.v3.remove.IRemovalTokenPayload} message RemovalTokenPayload message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RemovalTokenPayload.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RemovalTokenPayload message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RemovalTokenPayload} RemovalTokenPayload
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RemovalTokenPayload.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RemovalTokenPayload();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.itemFingerprints && message.itemFingerprints.length))
                                    message.itemFingerprints = [];
                                message.itemFingerprints.push($root.folder.v3.remove.ItemFingerprint.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 2: {
                                message.userId = reader.int32();
                                break;
                            }
                        case 3: {
                                message.deviceId = reader.int64();
                                break;
                            }
                        case 4: {
                                message.sessionUid = reader.bytes();
                                break;
                            }
                        case 5: {
                                message.expiresAtMillis = reader.int64();
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
                 * Decodes a RemovalTokenPayload message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RemovalTokenPayload} RemovalTokenPayload
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RemovalTokenPayload.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RemovalTokenPayload message.
                 * @function verify
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RemovalTokenPayload.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.itemFingerprints != null && Object.hasOwnProperty.call(message, "itemFingerprints")) {
                        if (!Array.isArray(message.itemFingerprints))
                            return "itemFingerprints: array expected";
                        for (let i = 0; i < message.itemFingerprints.length; ++i) {
                            let error = $root.folder.v3.remove.ItemFingerprint.verify(message.itemFingerprints[i], long + 1);
                            if (error)
                                return "itemFingerprints." + error;
                        }
                    }
                    if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                        if (!$util.isInteger(message.userId))
                            return "userId: integer expected";
                    if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                        if (!$util.isInteger(message.deviceId) && !(message.deviceId && $util.isInteger(message.deviceId.low) && $util.isInteger(message.deviceId.high)))
                            return "deviceId: integer|Long expected";
                    if (message.sessionUid != null && Object.hasOwnProperty.call(message, "sessionUid"))
                        if (!(message.sessionUid && typeof message.sessionUid.length === "number" || $util.isString(message.sessionUid)))
                            return "sessionUid: buffer expected";
                    if (message.expiresAtMillis != null && Object.hasOwnProperty.call(message, "expiresAtMillis"))
                        if (!$util.isInteger(message.expiresAtMillis) && !(message.expiresAtMillis && $util.isInteger(message.expiresAtMillis.low) && $util.isInteger(message.expiresAtMillis.high)))
                            return "expiresAtMillis: integer|Long expected";
                    return null;
                };

                /**
                 * Creates a RemovalTokenPayload message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RemovalTokenPayload} RemovalTokenPayload
                 */
                RemovalTokenPayload.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RemovalTokenPayload)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RemovalTokenPayload: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RemovalTokenPayload();
                    if (object.itemFingerprints) {
                        if (!Array.isArray(object.itemFingerprints))
                            throw TypeError(".folder.v3.remove.RemovalTokenPayload.itemFingerprints: array expected");
                        message.itemFingerprints = [];
                        for (let i = 0; i < object.itemFingerprints.length; ++i) {
                            if (!$util.isObject(object.itemFingerprints[i]))
                                throw TypeError(".folder.v3.remove.RemovalTokenPayload.itemFingerprints: object expected");
                            message.itemFingerprints[i] = $root.folder.v3.remove.ItemFingerprint.fromObject(object.itemFingerprints[i], long + 1);
                        }
                    }
                    if (object.userId != null)
                        message.userId = object.userId | 0;
                    if (object.deviceId != null)
                        if ($util.Long)
                            message.deviceId = $util.Long.fromValue(object.deviceId, false);
                        else if (typeof object.deviceId === "string")
                            message.deviceId = parseInt(object.deviceId, 10);
                        else if (typeof object.deviceId === "number")
                            message.deviceId = object.deviceId;
                        else if (typeof object.deviceId === "object")
                            message.deviceId = new $util.LongBits(object.deviceId.low >>> 0, object.deviceId.high >>> 0).toNumber();
                    if (object.sessionUid != null)
                        if (typeof object.sessionUid === "string")
                            $util.base64.decode(object.sessionUid, message.sessionUid = $util.newBuffer($util.base64.length(object.sessionUid)), 0);
                        else if (object.sessionUid.length >= 0)
                            message.sessionUid = object.sessionUid;
                    if (object.expiresAtMillis != null)
                        if ($util.Long)
                            message.expiresAtMillis = $util.Long.fromValue(object.expiresAtMillis, false);
                        else if (typeof object.expiresAtMillis === "string")
                            message.expiresAtMillis = parseInt(object.expiresAtMillis, 10);
                        else if (typeof object.expiresAtMillis === "number")
                            message.expiresAtMillis = object.expiresAtMillis;
                        else if (typeof object.expiresAtMillis === "object")
                            message.expiresAtMillis = new $util.LongBits(object.expiresAtMillis.low >>> 0, object.expiresAtMillis.high >>> 0).toNumber();
                    return message;
                };

                /**
                 * Creates a plain object from a RemovalTokenPayload message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @static
                 * @param {folder.v3.remove.RemovalTokenPayload} message RemovalTokenPayload
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RemovalTokenPayload.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.itemFingerprints = [];
                    if (options.defaults) {
                        object.userId = 0;
                        if ($util.Long) {
                            let long = new $util.Long(0, 0, false);
                            object.deviceId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                        } else
                            object.deviceId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                        if (options.bytes === String)
                            object.sessionUid = "";
                        else {
                            object.sessionUid = [];
                            if (options.bytes !== Array)
                                object.sessionUid = $util.newBuffer(object.sessionUid);
                        }
                        if ($util.Long) {
                            let long = new $util.Long(0, 0, false);
                            object.expiresAtMillis = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                        } else
                            object.expiresAtMillis = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                    }
                    if (message.itemFingerprints && message.itemFingerprints.length) {
                        object.itemFingerprints = [];
                        for (let j = 0; j < message.itemFingerprints.length; ++j)
                            object.itemFingerprints[j] = $root.folder.v3.remove.ItemFingerprint.toObject(message.itemFingerprints[j], options, q + 1);
                    }
                    if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                        object.userId = message.userId;
                    if (message.deviceId != null && Object.hasOwnProperty.call(message, "deviceId"))
                        if (typeof BigInt !== "undefined" && options.longs === BigInt)
                            object.deviceId = typeof message.deviceId === "number" ? BigInt(message.deviceId) : $util.Long.fromBits(message.deviceId.low >>> 0, message.deviceId.high >>> 0, false).toBigInt();
                        else if (typeof message.deviceId === "number")
                            object.deviceId = options.longs === String ? String(message.deviceId) : message.deviceId;
                        else
                            object.deviceId = options.longs === String ? $util.Long.prototype.toString.call(message.deviceId) : options.longs === Number ? new $util.LongBits(message.deviceId.low >>> 0, message.deviceId.high >>> 0).toNumber() : message.deviceId;
                    if (message.sessionUid != null && Object.hasOwnProperty.call(message, "sessionUid"))
                        object.sessionUid = options.bytes === String ? $util.base64.encode(message.sessionUid, 0, message.sessionUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sessionUid) : message.sessionUid;
                    if (message.expiresAtMillis != null && Object.hasOwnProperty.call(message, "expiresAtMillis"))
                        if (typeof BigInt !== "undefined" && options.longs === BigInt)
                            object.expiresAtMillis = typeof message.expiresAtMillis === "number" ? BigInt(message.expiresAtMillis) : $util.Long.fromBits(message.expiresAtMillis.low >>> 0, message.expiresAtMillis.high >>> 0, false).toBigInt();
                        else if (typeof message.expiresAtMillis === "number")
                            object.expiresAtMillis = options.longs === String ? String(message.expiresAtMillis) : message.expiresAtMillis;
                        else
                            object.expiresAtMillis = options.longs === String ? $util.Long.prototype.toString.call(message.expiresAtMillis) : options.longs === Number ? new $util.LongBits(message.expiresAtMillis.low >>> 0, message.expiresAtMillis.high >>> 0).toNumber() : message.expiresAtMillis;
                    return object;
                };

                /**
                 * Converts this RemovalTokenPayload to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RemovalTokenPayload.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RemovalTokenPayload
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RemovalTokenPayload
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RemovalTokenPayload.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RemovalTokenPayload";
                };

                return RemovalTokenPayload;
            })();

            remove.ItemFingerprint = (function() {

                /**
                 * Properties of an ItemFingerprint.
                 * @memberof folder.v3.remove
                 * @interface IItemFingerprint
                 * @property {folder.v3.remove.IRecordTarget|null} [record] ItemFingerprint record
                 * @property {folder.v3.remove.IFolderTarget|null} [folder] ItemFingerprint folder
                 * @property {Uint8Array|null} [fingerprint] ItemFingerprint fingerprint
                 */

                /**
                 * Constructs a new ItemFingerprint.
                 * @memberof folder.v3.remove
                 * @classdesc Represents an ItemFingerprint.
                 * @implements IItemFingerprint
                 * @constructor
                 * @param {folder.v3.remove.IItemFingerprint=} [properties] Properties to set
                 */
                function ItemFingerprint(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ItemFingerprint record.
                 * @member {folder.v3.remove.IRecordTarget|null|undefined} record
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @instance
                 */
                ItemFingerprint.prototype.record = null;

                /**
                 * ItemFingerprint folder.
                 * @member {folder.v3.remove.IFolderTarget|null|undefined} folder
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @instance
                 */
                ItemFingerprint.prototype.folder = null;

                /**
                 * ItemFingerprint fingerprint.
                 * @member {Uint8Array} fingerprint
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @instance
                 */
                ItemFingerprint.prototype.fingerprint = $util.newBuffer([]);

                // OneOf field names bound to virtual getters and setters
                let $oneOfFields;

                /**
                 * ItemFingerprint target.
                 * @member {"record"|"folder"|undefined} target
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @instance
                 */
                Object.defineProperty(ItemFingerprint.prototype, "target", {
                    get: $util.oneOfGetter($oneOfFields = ["record", "folder"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new ItemFingerprint instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @static
                 * @param {folder.v3.remove.IItemFingerprint=} [properties] Properties to set
                 * @returns {folder.v3.remove.ItemFingerprint} ItemFingerprint instance
                 */
                ItemFingerprint.create = function create(properties) {
                    return new ItemFingerprint(properties);
                };

                /**
                 * Encodes the specified ItemFingerprint message. Does not implicitly {@link folder.v3.remove.ItemFingerprint.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @static
                 * @param {folder.v3.remove.IItemFingerprint} message ItemFingerprint message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ItemFingerprint.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.record != null && Object.hasOwnProperty.call(message, "record"))
                        $root.folder.v3.remove.RecordTarget.encode(message.record, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                    if (message.folder != null && Object.hasOwnProperty.call(message, "folder"))
                        $root.folder.v3.remove.FolderTarget.encode(message.folder, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                    if (message.fingerprint != null && Object.hasOwnProperty.call(message, "fingerprint"))
                        writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.fingerprint);
                    return writer;
                };

                /**
                 * Encodes the specified ItemFingerprint message, length delimited. Does not implicitly {@link folder.v3.remove.ItemFingerprint.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @static
                 * @param {folder.v3.remove.IItemFingerprint} message ItemFingerprint message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ItemFingerprint.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes an ItemFingerprint message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.ItemFingerprint} ItemFingerprint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ItemFingerprint.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.ItemFingerprint();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.record = $root.folder.v3.remove.RecordTarget.decode(reader, reader.uint32(), undefined, long + 1);
                                break;
                            }
                        case 2: {
                                message.folder = $root.folder.v3.remove.FolderTarget.decode(reader, reader.uint32(), undefined, long + 1);
                                break;
                            }
                        case 10: {
                                message.fingerprint = reader.bytes();
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
                 * Decodes an ItemFingerprint message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.ItemFingerprint} ItemFingerprint
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ItemFingerprint.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an ItemFingerprint message.
                 * @function verify
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ItemFingerprint.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    let properties = {};
                    if (message.record != null && Object.hasOwnProperty.call(message, "record")) {
                        properties.target = 1;
                        {
                            let error = $root.folder.v3.remove.RecordTarget.verify(message.record, long + 1);
                            if (error)
                                return "record." + error;
                        }
                    }
                    if (message.folder != null && Object.hasOwnProperty.call(message, "folder")) {
                        if (properties.target === 1)
                            return "target: multiple values";
                        properties.target = 1;
                        {
                            let error = $root.folder.v3.remove.FolderTarget.verify(message.folder, long + 1);
                            if (error)
                                return "folder." + error;
                        }
                    }
                    if (message.fingerprint != null && Object.hasOwnProperty.call(message, "fingerprint"))
                        if (!(message.fingerprint && typeof message.fingerprint.length === "number" || $util.isString(message.fingerprint)))
                            return "fingerprint: buffer expected";
                    return null;
                };

                /**
                 * Creates an ItemFingerprint message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.ItemFingerprint} ItemFingerprint
                 */
                ItemFingerprint.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.ItemFingerprint)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.ItemFingerprint: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.ItemFingerprint();
                    if (object.record != null) {
                        if (!$util.isObject(object.record))
                            throw TypeError(".folder.v3.remove.ItemFingerprint.record: object expected");
                        message.record = $root.folder.v3.remove.RecordTarget.fromObject(object.record, long + 1);
                    }
                    if (object.folder != null) {
                        if (!$util.isObject(object.folder))
                            throw TypeError(".folder.v3.remove.ItemFingerprint.folder: object expected");
                        message.folder = $root.folder.v3.remove.FolderTarget.fromObject(object.folder, long + 1);
                    }
                    if (object.fingerprint != null)
                        if (typeof object.fingerprint === "string")
                            $util.base64.decode(object.fingerprint, message.fingerprint = $util.newBuffer($util.base64.length(object.fingerprint)), 0);
                        else if (object.fingerprint.length >= 0)
                            message.fingerprint = object.fingerprint;
                    return message;
                };

                /**
                 * Creates a plain object from an ItemFingerprint message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @static
                 * @param {folder.v3.remove.ItemFingerprint} message ItemFingerprint
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ItemFingerprint.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults)
                        if (options.bytes === String)
                            object.fingerprint = "";
                        else {
                            object.fingerprint = [];
                            if (options.bytes !== Array)
                                object.fingerprint = $util.newBuffer(object.fingerprint);
                        }
                    if (message.record != null && Object.hasOwnProperty.call(message, "record")) {
                        object.record = $root.folder.v3.remove.RecordTarget.toObject(message.record, options, q + 1);
                        if (options.oneofs)
                            object.target = "record";
                    }
                    if (message.folder != null && Object.hasOwnProperty.call(message, "folder")) {
                        object.folder = $root.folder.v3.remove.FolderTarget.toObject(message.folder, options, q + 1);
                        if (options.oneofs)
                            object.target = "folder";
                    }
                    if (message.fingerprint != null && Object.hasOwnProperty.call(message, "fingerprint"))
                        object.fingerprint = options.bytes === String ? $util.base64.encode(message.fingerprint, 0, message.fingerprint.length) : options.bytes === Array ? Array.prototype.slice.call(message.fingerprint) : message.fingerprint;
                    return object;
                };

                /**
                 * Converts this ItemFingerprint to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ItemFingerprint.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ItemFingerprint
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.ItemFingerprint
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ItemFingerprint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.ItemFingerprint";
                };

                return ItemFingerprint;
            })();

            remove.RecordTarget = (function() {

                /**
                 * Properties of a RecordTarget.
                 * @memberof folder.v3.remove
                 * @interface IRecordTarget
                 * @property {Uint8Array|null} [folderUid] RecordTarget folderUid
                 * @property {Uint8Array|null} [recordUid] RecordTarget recordUid
                 * @property {folder.v3.remove.RecordOperationType|null} [operationType] RecordTarget operationType
                 */

                /**
                 * Constructs a new RecordTarget.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a RecordTarget.
                 * @implements IRecordTarget
                 * @constructor
                 * @param {folder.v3.remove.IRecordTarget=} [properties] Properties to set
                 */
                function RecordTarget(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RecordTarget folderUid.
                 * @member {Uint8Array} folderUid
                 * @memberof folder.v3.remove.RecordTarget
                 * @instance
                 */
                RecordTarget.prototype.folderUid = $util.newBuffer([]);

                /**
                 * RecordTarget recordUid.
                 * @member {Uint8Array} recordUid
                 * @memberof folder.v3.remove.RecordTarget
                 * @instance
                 */
                RecordTarget.prototype.recordUid = $util.newBuffer([]);

                /**
                 * RecordTarget operationType.
                 * @member {folder.v3.remove.RecordOperationType} operationType
                 * @memberof folder.v3.remove.RecordTarget
                 * @instance
                 */
                RecordTarget.prototype.operationType = 0;

                /**
                 * Creates a new RecordTarget instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RecordTarget
                 * @static
                 * @param {folder.v3.remove.IRecordTarget=} [properties] Properties to set
                 * @returns {folder.v3.remove.RecordTarget} RecordTarget instance
                 */
                RecordTarget.create = function create(properties) {
                    return new RecordTarget(properties);
                };

                /**
                 * Encodes the specified RecordTarget message. Does not implicitly {@link folder.v3.remove.RecordTarget.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RecordTarget
                 * @static
                 * @param {folder.v3.remove.IRecordTarget} message RecordTarget message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RecordTarget.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.folderUid);
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.recordUid);
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.operationType);
                    return writer;
                };

                /**
                 * Encodes the specified RecordTarget message, length delimited. Does not implicitly {@link folder.v3.remove.RecordTarget.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RecordTarget
                 * @static
                 * @param {folder.v3.remove.IRecordTarget} message RecordTarget message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RecordTarget.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RecordTarget message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RecordTarget
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RecordTarget} RecordTarget
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RecordTarget.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RecordTarget();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.folderUid = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.recordUid = reader.bytes();
                                break;
                            }
                        case 3: {
                                message.operationType = reader.int32();
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
                 * Decodes a RecordTarget message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RecordTarget
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RecordTarget} RecordTarget
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RecordTarget.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RecordTarget message.
                 * @function verify
                 * @memberof folder.v3.remove.RecordTarget
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RecordTarget.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        if (!(message.folderUid && typeof message.folderUid.length === "number" || $util.isString(message.folderUid)))
                            return "folderUid: buffer expected";
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                            return "recordUid: buffer expected";
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        switch (message.operationType) {
                        default:
                            return "operationType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a RecordTarget message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RecordTarget
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RecordTarget} RecordTarget
                 */
                RecordTarget.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RecordTarget)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RecordTarget: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RecordTarget();
                    if (object.folderUid != null)
                        if (typeof object.folderUid === "string")
                            $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                        else if (object.folderUid.length >= 0)
                            message.folderUid = object.folderUid;
                    if (object.recordUid != null)
                        if (typeof object.recordUid === "string")
                            $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                        else if (object.recordUid.length >= 0)
                            message.recordUid = object.recordUid;
                    switch (object.operationType) {
                    default:
                        if (typeof object.operationType === "number") {
                            message.operationType = object.operationType;
                            break;
                        }
                        break;
                    case "RECORD_OPERATION_UNKNOWN":
                    case 0:
                        message.operationType = 0;
                        break;
                    case "UNLINK_FROM_FOLDER":
                    case 1:
                        message.operationType = 1;
                        break;
                    case "MOVE_TO_FOLDER_TRASH":
                    case 2:
                        message.operationType = 2;
                        break;
                    case "MOVE_TO_OWNER_TRASH":
                    case 3:
                        message.operationType = 3;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a RecordTarget message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RecordTarget
                 * @static
                 * @param {folder.v3.remove.RecordTarget} message RecordTarget
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RecordTarget.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.folderUid = "";
                        else {
                            object.folderUid = [];
                            if (options.bytes !== Array)
                                object.folderUid = $util.newBuffer(object.folderUid);
                        }
                        if (options.bytes === String)
                            object.recordUid = "";
                        else {
                            object.recordUid = [];
                            if (options.bytes !== Array)
                                object.recordUid = $util.newBuffer(object.recordUid);
                        }
                        object.operationType = options.enums === String ? "RECORD_OPERATION_UNKNOWN" : 0;
                    }
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        object.operationType = options.enums === String ? $root.folder.v3.remove.RecordOperationType[message.operationType] === undefined ? message.operationType : $root.folder.v3.remove.RecordOperationType[message.operationType] : message.operationType;
                    return object;
                };

                /**
                 * Converts this RecordTarget to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RecordTarget
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RecordTarget.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RecordTarget
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RecordTarget
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RecordTarget.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RecordTarget";
                };

                return RecordTarget;
            })();

            remove.FolderTarget = (function() {

                /**
                 * Properties of a FolderTarget.
                 * @memberof folder.v3.remove
                 * @interface IFolderTarget
                 * @property {Uint8Array|null} [folderUid] FolderTarget folderUid
                 * @property {folder.v3.remove.FolderOperationType|null} [operationType] FolderTarget operationType
                 */

                /**
                 * Constructs a new FolderTarget.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a FolderTarget.
                 * @implements IFolderTarget
                 * @constructor
                 * @param {folder.v3.remove.IFolderTarget=} [properties] Properties to set
                 */
                function FolderTarget(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * FolderTarget folderUid.
                 * @member {Uint8Array} folderUid
                 * @memberof folder.v3.remove.FolderTarget
                 * @instance
                 */
                FolderTarget.prototype.folderUid = $util.newBuffer([]);

                /**
                 * FolderTarget operationType.
                 * @member {folder.v3.remove.FolderOperationType} operationType
                 * @memberof folder.v3.remove.FolderTarget
                 * @instance
                 */
                FolderTarget.prototype.operationType = 0;

                /**
                 * Creates a new FolderTarget instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.FolderTarget
                 * @static
                 * @param {folder.v3.remove.IFolderTarget=} [properties] Properties to set
                 * @returns {folder.v3.remove.FolderTarget} FolderTarget instance
                 */
                FolderTarget.create = function create(properties) {
                    return new FolderTarget(properties);
                };

                /**
                 * Encodes the specified FolderTarget message. Does not implicitly {@link folder.v3.remove.FolderTarget.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.FolderTarget
                 * @static
                 * @param {folder.v3.remove.IFolderTarget} message FolderTarget message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FolderTarget.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.folderUid);
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.operationType);
                    return writer;
                };

                /**
                 * Encodes the specified FolderTarget message, length delimited. Does not implicitly {@link folder.v3.remove.FolderTarget.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.FolderTarget
                 * @static
                 * @param {folder.v3.remove.IFolderTarget} message FolderTarget message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                FolderTarget.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a FolderTarget message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.FolderTarget
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.FolderTarget} FolderTarget
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FolderTarget.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.FolderTarget();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.folderUid = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.operationType = reader.int32();
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
                 * Decodes a FolderTarget message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.FolderTarget
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.FolderTarget} FolderTarget
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                FolderTarget.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a FolderTarget message.
                 * @function verify
                 * @memberof folder.v3.remove.FolderTarget
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                FolderTarget.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        if (!(message.folderUid && typeof message.folderUid.length === "number" || $util.isString(message.folderUid)))
                            return "folderUid: buffer expected";
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        switch (message.operationType) {
                        default:
                            return "operationType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a FolderTarget message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.FolderTarget
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.FolderTarget} FolderTarget
                 */
                FolderTarget.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.FolderTarget)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.FolderTarget: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.FolderTarget();
                    if (object.folderUid != null)
                        if (typeof object.folderUid === "string")
                            $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                        else if (object.folderUid.length >= 0)
                            message.folderUid = object.folderUid;
                    switch (object.operationType) {
                    default:
                        if (typeof object.operationType === "number") {
                            message.operationType = object.operationType;
                            break;
                        }
                        break;
                    case "FOLDER_OPERATION_UNKNOWN":
                    case 0:
                        message.operationType = 0;
                        break;
                    case "FOLDER_MOVE_TO_FOLDER_TRASH":
                    case 1:
                        message.operationType = 1;
                        break;
                    case "FOLDER_MOVE_TO_OWNER_TRASH":
                    case 2:
                        message.operationType = 2;
                        break;
                    case "FOLDER_DELETE_PERMANENT":
                    case 3:
                        message.operationType = 3;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a FolderTarget message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.FolderTarget
                 * @static
                 * @param {folder.v3.remove.FolderTarget} message FolderTarget
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                FolderTarget.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.folderUid = "";
                        else {
                            object.folderUid = [];
                            if (options.bytes !== Array)
                                object.folderUid = $util.newBuffer(object.folderUid);
                        }
                        object.operationType = options.enums === String ? "FOLDER_OPERATION_UNKNOWN" : 0;
                    }
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
                    if (message.operationType != null && Object.hasOwnProperty.call(message, "operationType"))
                        object.operationType = options.enums === String ? $root.folder.v3.remove.FolderOperationType[message.operationType] === undefined ? message.operationType : $root.folder.v3.remove.FolderOperationType[message.operationType] : message.operationType;
                    return object;
                };

                /**
                 * Converts this FolderTarget to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.FolderTarget
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                FolderTarget.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for FolderTarget
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.FolderTarget
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                FolderTarget.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.FolderTarget";
                };

                return FolderTarget;
            })();

            /**
             * RestoreStatus enum.
             * @name folder.v3.remove.RestoreStatus
             * @enum {number}
             * @property {number} RESTORE_STATUS_UNKNOWN=0 RESTORE_STATUS_UNKNOWN value
             * @property {number} RS_SUCCESS=1 RS_SUCCESS value
             * @property {number} RS_NOT_IN_TRASHCAN=2 RS_NOT_IN_TRASHCAN value
             * @property {number} RS_ACCESS_DENIED=3 RS_ACCESS_DENIED value
             * @property {number} RS_TARGET_FOLDER_NOT_FOUND=4 RS_TARGET_FOLDER_NOT_FOUND value
             * @property {number} RS_ALREADY_EXISTS_IN_TARGET=5 RS_ALREADY_EXISTS_IN_TARGET value
             * @property {number} RS_FAIL=6 RS_FAIL value
             */
            remove.RestoreStatus = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "RESTORE_STATUS_UNKNOWN"] = 0;
                values[valuesById[1] = "RS_SUCCESS"] = 1;
                values[valuesById[2] = "RS_NOT_IN_TRASHCAN"] = 2;
                values[valuesById[3] = "RS_ACCESS_DENIED"] = 3;
                values[valuesById[4] = "RS_TARGET_FOLDER_NOT_FOUND"] = 4;
                values[valuesById[5] = "RS_ALREADY_EXISTS_IN_TARGET"] = 5;
                values[valuesById[6] = "RS_FAIL"] = 6;
                return values;
            })();

            /**
             * RestoreItemType enum.
             * @name folder.v3.remove.RestoreItemType
             * @enum {number}
             * @property {number} RESTORE_ITEM_UNKNOWN=0 RESTORE_ITEM_UNKNOWN value
             * @property {number} RESTORE_ITEM_RECORD=1 RESTORE_ITEM_RECORD value
             * @property {number} RESTORE_ITEM_FOLDER=2 RESTORE_ITEM_FOLDER value
             */
            remove.RestoreItemType = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "RESTORE_ITEM_UNKNOWN"] = 0;
                values[valuesById[1] = "RESTORE_ITEM_RECORD"] = 1;
                values[valuesById[2] = "RESTORE_ITEM_FOLDER"] = 2;
                return values;
            })();

            remove.RestoreResult = (function() {

                /**
                 * Properties of a RestoreResult.
                 * @memberof folder.v3.remove
                 * @interface IRestoreResult
                 * @property {Uint8Array|null} [itemUid] RestoreResult itemUid
                 * @property {folder.v3.remove.RestoreItemType|null} [itemType] RestoreResult itemType
                 * @property {folder.v3.remove.RestoreStatus|null} [status] RestoreResult status
                 * @property {string|null} [errorMessage] RestoreResult errorMessage
                 */

                /**
                 * Constructs a new RestoreResult.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a RestoreResult.
                 * @implements IRestoreResult
                 * @constructor
                 * @param {folder.v3.remove.IRestoreResult=} [properties] Properties to set
                 */
                function RestoreResult(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RestoreResult itemUid.
                 * @member {Uint8Array} itemUid
                 * @memberof folder.v3.remove.RestoreResult
                 * @instance
                 */
                RestoreResult.prototype.itemUid = $util.newBuffer([]);

                /**
                 * RestoreResult itemType.
                 * @member {folder.v3.remove.RestoreItemType} itemType
                 * @memberof folder.v3.remove.RestoreResult
                 * @instance
                 */
                RestoreResult.prototype.itemType = 0;

                /**
                 * RestoreResult status.
                 * @member {folder.v3.remove.RestoreStatus} status
                 * @memberof folder.v3.remove.RestoreResult
                 * @instance
                 */
                RestoreResult.prototype.status = 0;

                /**
                 * RestoreResult errorMessage.
                 * @member {string} errorMessage
                 * @memberof folder.v3.remove.RestoreResult
                 * @instance
                 */
                RestoreResult.prototype.errorMessage = "";

                /**
                 * Creates a new RestoreResult instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RestoreResult
                 * @static
                 * @param {folder.v3.remove.IRestoreResult=} [properties] Properties to set
                 * @returns {folder.v3.remove.RestoreResult} RestoreResult instance
                 */
                RestoreResult.create = function create(properties) {
                    return new RestoreResult(properties);
                };

                /**
                 * Encodes the specified RestoreResult message. Does not implicitly {@link folder.v3.remove.RestoreResult.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RestoreResult
                 * @static
                 * @param {folder.v3.remove.IRestoreResult} message RestoreResult message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RestoreResult.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.itemUid != null && Object.hasOwnProperty.call(message, "itemUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.itemUid);
                    if (message.itemType != null && Object.hasOwnProperty.call(message, "itemType"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.itemType);
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        writer.uint32(/* id 3, wireType 0 =*/24).int32(message.status);
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                        writer.uint32(/* id 4, wireType 2 =*/34).string(message.errorMessage);
                    return writer;
                };

                /**
                 * Encodes the specified RestoreResult message, length delimited. Does not implicitly {@link folder.v3.remove.RestoreResult.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RestoreResult
                 * @static
                 * @param {folder.v3.remove.IRestoreResult} message RestoreResult message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RestoreResult.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RestoreResult message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RestoreResult
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RestoreResult} RestoreResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RestoreResult.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RestoreResult();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.itemUid = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.itemType = reader.int32();
                                break;
                            }
                        case 3: {
                                message.status = reader.int32();
                                break;
                            }
                        case 4: {
                                message.errorMessage = reader.string();
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
                 * Decodes a RestoreResult message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RestoreResult
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RestoreResult} RestoreResult
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RestoreResult.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RestoreResult message.
                 * @function verify
                 * @memberof folder.v3.remove.RestoreResult
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RestoreResult.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.itemUid != null && Object.hasOwnProperty.call(message, "itemUid"))
                        if (!(message.itemUid && typeof message.itemUid.length === "number" || $util.isString(message.itemUid)))
                            return "itemUid: buffer expected";
                    if (message.itemType != null && Object.hasOwnProperty.call(message, "itemType"))
                        switch (message.itemType) {
                        default:
                            return "itemType: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                            break;
                        }
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
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                        if (!$util.isString(message.errorMessage))
                            return "errorMessage: string expected";
                    return null;
                };

                /**
                 * Creates a RestoreResult message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RestoreResult
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RestoreResult} RestoreResult
                 */
                RestoreResult.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RestoreResult)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RestoreResult: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RestoreResult();
                    if (object.itemUid != null)
                        if (typeof object.itemUid === "string")
                            $util.base64.decode(object.itemUid, message.itemUid = $util.newBuffer($util.base64.length(object.itemUid)), 0);
                        else if (object.itemUid.length >= 0)
                            message.itemUid = object.itemUid;
                    switch (object.itemType) {
                    default:
                        if (typeof object.itemType === "number") {
                            message.itemType = object.itemType;
                            break;
                        }
                        break;
                    case "RESTORE_ITEM_UNKNOWN":
                    case 0:
                        message.itemType = 0;
                        break;
                    case "RESTORE_ITEM_RECORD":
                    case 1:
                        message.itemType = 1;
                        break;
                    case "RESTORE_ITEM_FOLDER":
                    case 2:
                        message.itemType = 2;
                        break;
                    }
                    switch (object.status) {
                    default:
                        if (typeof object.status === "number") {
                            message.status = object.status;
                            break;
                        }
                        break;
                    case "RESTORE_STATUS_UNKNOWN":
                    case 0:
                        message.status = 0;
                        break;
                    case "RS_SUCCESS":
                    case 1:
                        message.status = 1;
                        break;
                    case "RS_NOT_IN_TRASHCAN":
                    case 2:
                        message.status = 2;
                        break;
                    case "RS_ACCESS_DENIED":
                    case 3:
                        message.status = 3;
                        break;
                    case "RS_TARGET_FOLDER_NOT_FOUND":
                    case 4:
                        message.status = 4;
                        break;
                    case "RS_ALREADY_EXISTS_IN_TARGET":
                    case 5:
                        message.status = 5;
                        break;
                    case "RS_FAIL":
                    case 6:
                        message.status = 6;
                        break;
                    }
                    if (object.errorMessage != null)
                        message.errorMessage = String(object.errorMessage);
                    return message;
                };

                /**
                 * Creates a plain object from a RestoreResult message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RestoreResult
                 * @static
                 * @param {folder.v3.remove.RestoreResult} message RestoreResult
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RestoreResult.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.itemUid = "";
                        else {
                            object.itemUid = [];
                            if (options.bytes !== Array)
                                object.itemUid = $util.newBuffer(object.itemUid);
                        }
                        object.itemType = options.enums === String ? "RESTORE_ITEM_UNKNOWN" : 0;
                        object.status = options.enums === String ? "RESTORE_STATUS_UNKNOWN" : 0;
                        object.errorMessage = "";
                    }
                    if (message.itemUid != null && Object.hasOwnProperty.call(message, "itemUid"))
                        object.itemUid = options.bytes === String ? $util.base64.encode(message.itemUid, 0, message.itemUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.itemUid) : message.itemUid;
                    if (message.itemType != null && Object.hasOwnProperty.call(message, "itemType"))
                        object.itemType = options.enums === String ? $root.folder.v3.remove.RestoreItemType[message.itemType] === undefined ? message.itemType : $root.folder.v3.remove.RestoreItemType[message.itemType] : message.itemType;
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        object.status = options.enums === String ? $root.folder.v3.remove.RestoreStatus[message.status] === undefined ? message.status : $root.folder.v3.remove.RestoreStatus[message.status] : message.status;
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                        object.errorMessage = message.errorMessage;
                    return object;
                };

                /**
                 * Converts this RestoreResult to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RestoreResult
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RestoreResult.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RestoreResult
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RestoreResult
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RestoreResult.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RestoreResult";
                };

                return RestoreResult;
            })();

            remove.TrashcanRestoreResponse = (function() {

                /**
                 * Properties of a TrashcanRestoreResponse.
                 * @memberof folder.v3.remove
                 * @interface ITrashcanRestoreResponse
                 * @property {Array.<folder.v3.remove.IRestoreResult>|null} [results] TrashcanRestoreResponse results
                 * @property {string|null} [errorMessage] TrashcanRestoreResponse errorMessage
                 */

                /**
                 * Constructs a new TrashcanRestoreResponse.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a TrashcanRestoreResponse.
                 * @implements ITrashcanRestoreResponse
                 * @constructor
                 * @param {folder.v3.remove.ITrashcanRestoreResponse=} [properties] Properties to set
                 */
                function TrashcanRestoreResponse(properties) {
                    this.results = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TrashcanRestoreResponse results.
                 * @member {Array.<folder.v3.remove.IRestoreResult>} results
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @instance
                 */
                TrashcanRestoreResponse.prototype.results = $util.emptyArray;

                /**
                 * TrashcanRestoreResponse errorMessage.
                 * @member {string} errorMessage
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @instance
                 */
                TrashcanRestoreResponse.prototype.errorMessage = "";

                /**
                 * Creates a new TrashcanRestoreResponse instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @static
                 * @param {folder.v3.remove.ITrashcanRestoreResponse=} [properties] Properties to set
                 * @returns {folder.v3.remove.TrashcanRestoreResponse} TrashcanRestoreResponse instance
                 */
                TrashcanRestoreResponse.create = function create(properties) {
                    return new TrashcanRestoreResponse(properties);
                };

                /**
                 * Encodes the specified TrashcanRestoreResponse message. Does not implicitly {@link folder.v3.remove.TrashcanRestoreResponse.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @static
                 * @param {folder.v3.remove.ITrashcanRestoreResponse} message TrashcanRestoreResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TrashcanRestoreResponse.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.results != null && message.results.length)
                        for (let i = 0; i < message.results.length; ++i)
                            $root.folder.v3.remove.RestoreResult.encode(message.results[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.errorMessage);
                    return writer;
                };

                /**
                 * Encodes the specified TrashcanRestoreResponse message, length delimited. Does not implicitly {@link folder.v3.remove.TrashcanRestoreResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @static
                 * @param {folder.v3.remove.ITrashcanRestoreResponse} message TrashcanRestoreResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TrashcanRestoreResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a TrashcanRestoreResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.TrashcanRestoreResponse} TrashcanRestoreResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TrashcanRestoreResponse.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.TrashcanRestoreResponse();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.results && message.results.length))
                                    message.results = [];
                                message.results.push($root.folder.v3.remove.RestoreResult.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 2: {
                                message.errorMessage = reader.string();
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
                 * Decodes a TrashcanRestoreResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.TrashcanRestoreResponse} TrashcanRestoreResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TrashcanRestoreResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TrashcanRestoreResponse message.
                 * @function verify
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TrashcanRestoreResponse.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.results != null && Object.hasOwnProperty.call(message, "results")) {
                        if (!Array.isArray(message.results))
                            return "results: array expected";
                        for (let i = 0; i < message.results.length; ++i) {
                            let error = $root.folder.v3.remove.RestoreResult.verify(message.results[i], long + 1);
                            if (error)
                                return "results." + error;
                        }
                    }
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                        if (!$util.isString(message.errorMessage))
                            return "errorMessage: string expected";
                    return null;
                };

                /**
                 * Creates a TrashcanRestoreResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.TrashcanRestoreResponse} TrashcanRestoreResponse
                 */
                TrashcanRestoreResponse.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.TrashcanRestoreResponse)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.TrashcanRestoreResponse: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.TrashcanRestoreResponse();
                    if (object.results) {
                        if (!Array.isArray(object.results))
                            throw TypeError(".folder.v3.remove.TrashcanRestoreResponse.results: array expected");
                        message.results = [];
                        for (let i = 0; i < object.results.length; ++i) {
                            if (!$util.isObject(object.results[i]))
                                throw TypeError(".folder.v3.remove.TrashcanRestoreResponse.results: object expected");
                            message.results[i] = $root.folder.v3.remove.RestoreResult.fromObject(object.results[i], long + 1);
                        }
                    }
                    if (object.errorMessage != null)
                        message.errorMessage = String(object.errorMessage);
                    return message;
                };

                /**
                 * Creates a plain object from a TrashcanRestoreResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @static
                 * @param {folder.v3.remove.TrashcanRestoreResponse} message TrashcanRestoreResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TrashcanRestoreResponse.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.results = [];
                    if (options.defaults)
                        object.errorMessage = "";
                    if (message.results && message.results.length) {
                        object.results = [];
                        for (let j = 0; j < message.results.length; ++j)
                            object.results[j] = $root.folder.v3.remove.RestoreResult.toObject(message.results[j], options, q + 1);
                    }
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                        object.errorMessage = message.errorMessage;
                    return object;
                };

                /**
                 * Converts this TrashcanRestoreResponse to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TrashcanRestoreResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TrashcanRestoreResponse
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.TrashcanRestoreResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TrashcanRestoreResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.TrashcanRestoreResponse";
                };

                return TrashcanRestoreResponse;
            })();

            remove.RestoreRecord = (function() {

                /**
                 * Properties of a RestoreRecord.
                 * @memberof folder.v3.remove
                 * @interface IRestoreRecord
                 * @property {Uint8Array|null} [recordUid] RestoreRecord recordUid
                 * @property {Uint8Array|null} [encryptedRecordKey] RestoreRecord encryptedRecordKey
                 * @property {Uint8Array|null} [sourceFolderUid] RestoreRecord sourceFolderUid
                 */

                /**
                 * Constructs a new RestoreRecord.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a RestoreRecord.
                 * @implements IRestoreRecord
                 * @constructor
                 * @param {folder.v3.remove.IRestoreRecord=} [properties] Properties to set
                 */
                function RestoreRecord(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RestoreRecord recordUid.
                 * @member {Uint8Array} recordUid
                 * @memberof folder.v3.remove.RestoreRecord
                 * @instance
                 */
                RestoreRecord.prototype.recordUid = $util.newBuffer([]);

                /**
                 * RestoreRecord encryptedRecordKey.
                 * @member {Uint8Array} encryptedRecordKey
                 * @memberof folder.v3.remove.RestoreRecord
                 * @instance
                 */
                RestoreRecord.prototype.encryptedRecordKey = $util.newBuffer([]);

                /**
                 * RestoreRecord sourceFolderUid.
                 * @member {Uint8Array} sourceFolderUid
                 * @memberof folder.v3.remove.RestoreRecord
                 * @instance
                 */
                RestoreRecord.prototype.sourceFolderUid = $util.newBuffer([]);

                /**
                 * Creates a new RestoreRecord instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RestoreRecord
                 * @static
                 * @param {folder.v3.remove.IRestoreRecord=} [properties] Properties to set
                 * @returns {folder.v3.remove.RestoreRecord} RestoreRecord instance
                 */
                RestoreRecord.create = function create(properties) {
                    return new RestoreRecord(properties);
                };

                /**
                 * Encodes the specified RestoreRecord message. Does not implicitly {@link folder.v3.remove.RestoreRecord.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RestoreRecord
                 * @static
                 * @param {folder.v3.remove.IRestoreRecord} message RestoreRecord message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RestoreRecord.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.recordUid);
                    if (message.encryptedRecordKey != null && Object.hasOwnProperty.call(message, "encryptedRecordKey"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.encryptedRecordKey);
                    if (message.sourceFolderUid != null && Object.hasOwnProperty.call(message, "sourceFolderUid"))
                        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.sourceFolderUid);
                    return writer;
                };

                /**
                 * Encodes the specified RestoreRecord message, length delimited. Does not implicitly {@link folder.v3.remove.RestoreRecord.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RestoreRecord
                 * @static
                 * @param {folder.v3.remove.IRestoreRecord} message RestoreRecord message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RestoreRecord.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RestoreRecord message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RestoreRecord
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RestoreRecord} RestoreRecord
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RestoreRecord.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RestoreRecord();
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
                                message.encryptedRecordKey = reader.bytes();
                                break;
                            }
                        case 3: {
                                message.sourceFolderUid = reader.bytes();
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
                 * Decodes a RestoreRecord message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RestoreRecord
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RestoreRecord} RestoreRecord
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RestoreRecord.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RestoreRecord message.
                 * @function verify
                 * @memberof folder.v3.remove.RestoreRecord
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RestoreRecord.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        if (!(message.recordUid && typeof message.recordUid.length === "number" || $util.isString(message.recordUid)))
                            return "recordUid: buffer expected";
                    if (message.encryptedRecordKey != null && Object.hasOwnProperty.call(message, "encryptedRecordKey"))
                        if (!(message.encryptedRecordKey && typeof message.encryptedRecordKey.length === "number" || $util.isString(message.encryptedRecordKey)))
                            return "encryptedRecordKey: buffer expected";
                    if (message.sourceFolderUid != null && Object.hasOwnProperty.call(message, "sourceFolderUid"))
                        if (!(message.sourceFolderUid && typeof message.sourceFolderUid.length === "number" || $util.isString(message.sourceFolderUid)))
                            return "sourceFolderUid: buffer expected";
                    return null;
                };

                /**
                 * Creates a RestoreRecord message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RestoreRecord
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RestoreRecord} RestoreRecord
                 */
                RestoreRecord.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RestoreRecord)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RestoreRecord: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RestoreRecord();
                    if (object.recordUid != null)
                        if (typeof object.recordUid === "string")
                            $util.base64.decode(object.recordUid, message.recordUid = $util.newBuffer($util.base64.length(object.recordUid)), 0);
                        else if (object.recordUid.length >= 0)
                            message.recordUid = object.recordUid;
                    if (object.encryptedRecordKey != null)
                        if (typeof object.encryptedRecordKey === "string")
                            $util.base64.decode(object.encryptedRecordKey, message.encryptedRecordKey = $util.newBuffer($util.base64.length(object.encryptedRecordKey)), 0);
                        else if (object.encryptedRecordKey.length >= 0)
                            message.encryptedRecordKey = object.encryptedRecordKey;
                    if (object.sourceFolderUid != null)
                        if (typeof object.sourceFolderUid === "string")
                            $util.base64.decode(object.sourceFolderUid, message.sourceFolderUid = $util.newBuffer($util.base64.length(object.sourceFolderUid)), 0);
                        else if (object.sourceFolderUid.length >= 0)
                            message.sourceFolderUid = object.sourceFolderUid;
                    return message;
                };

                /**
                 * Creates a plain object from a RestoreRecord message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RestoreRecord
                 * @static
                 * @param {folder.v3.remove.RestoreRecord} message RestoreRecord
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RestoreRecord.toObject = function toObject(message, options, q) {
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
                            object.encryptedRecordKey = "";
                        else {
                            object.encryptedRecordKey = [];
                            if (options.bytes !== Array)
                                object.encryptedRecordKey = $util.newBuffer(object.encryptedRecordKey);
                        }
                        if (options.bytes === String)
                            object.sourceFolderUid = "";
                        else {
                            object.sourceFolderUid = [];
                            if (options.bytes !== Array)
                                object.sourceFolderUid = $util.newBuffer(object.sourceFolderUid);
                        }
                    }
                    if (message.recordUid != null && Object.hasOwnProperty.call(message, "recordUid"))
                        object.recordUid = options.bytes === String ? $util.base64.encode(message.recordUid, 0, message.recordUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.recordUid) : message.recordUid;
                    if (message.encryptedRecordKey != null && Object.hasOwnProperty.call(message, "encryptedRecordKey"))
                        object.encryptedRecordKey = options.bytes === String ? $util.base64.encode(message.encryptedRecordKey, 0, message.encryptedRecordKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedRecordKey) : message.encryptedRecordKey;
                    if (message.sourceFolderUid != null && Object.hasOwnProperty.call(message, "sourceFolderUid"))
                        object.sourceFolderUid = options.bytes === String ? $util.base64.encode(message.sourceFolderUid, 0, message.sourceFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.sourceFolderUid) : message.sourceFolderUid;
                    return object;
                };

                /**
                 * Converts this RestoreRecord to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RestoreRecord
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RestoreRecord.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RestoreRecord
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RestoreRecord
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RestoreRecord.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RestoreRecord";
                };

                return RestoreRecord;
            })();

            remove.RestoreFolder = (function() {

                /**
                 * Properties of a RestoreFolder.
                 * @memberof folder.v3.remove
                 * @interface IRestoreFolder
                 * @property {Uint8Array|null} [folderUid] RestoreFolder folderUid
                 * @property {Uint8Array|null} [encryptedFolderKey] RestoreFolder encryptedFolderKey
                 */

                /**
                 * Constructs a new RestoreFolder.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a RestoreFolder.
                 * @implements IRestoreFolder
                 * @constructor
                 * @param {folder.v3.remove.IRestoreFolder=} [properties] Properties to set
                 */
                function RestoreFolder(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * RestoreFolder folderUid.
                 * @member {Uint8Array} folderUid
                 * @memberof folder.v3.remove.RestoreFolder
                 * @instance
                 */
                RestoreFolder.prototype.folderUid = $util.newBuffer([]);

                /**
                 * RestoreFolder encryptedFolderKey.
                 * @member {Uint8Array} encryptedFolderKey
                 * @memberof folder.v3.remove.RestoreFolder
                 * @instance
                 */
                RestoreFolder.prototype.encryptedFolderKey = $util.newBuffer([]);

                /**
                 * Creates a new RestoreFolder instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.RestoreFolder
                 * @static
                 * @param {folder.v3.remove.IRestoreFolder=} [properties] Properties to set
                 * @returns {folder.v3.remove.RestoreFolder} RestoreFolder instance
                 */
                RestoreFolder.create = function create(properties) {
                    return new RestoreFolder(properties);
                };

                /**
                 * Encodes the specified RestoreFolder message. Does not implicitly {@link folder.v3.remove.RestoreFolder.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.RestoreFolder
                 * @static
                 * @param {folder.v3.remove.IRestoreFolder} message RestoreFolder message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RestoreFolder.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.folderUid);
                    if (message.encryptedFolderKey != null && Object.hasOwnProperty.call(message, "encryptedFolderKey"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.encryptedFolderKey);
                    return writer;
                };

                /**
                 * Encodes the specified RestoreFolder message, length delimited. Does not implicitly {@link folder.v3.remove.RestoreFolder.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.RestoreFolder
                 * @static
                 * @param {folder.v3.remove.IRestoreFolder} message RestoreFolder message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RestoreFolder.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a RestoreFolder message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.RestoreFolder
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.RestoreFolder} RestoreFolder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RestoreFolder.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.RestoreFolder();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.folderUid = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.encryptedFolderKey = reader.bytes();
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
                 * Decodes a RestoreFolder message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.RestoreFolder
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.RestoreFolder} RestoreFolder
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RestoreFolder.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a RestoreFolder message.
                 * @function verify
                 * @memberof folder.v3.remove.RestoreFolder
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                RestoreFolder.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        if (!(message.folderUid && typeof message.folderUid.length === "number" || $util.isString(message.folderUid)))
                            return "folderUid: buffer expected";
                    if (message.encryptedFolderKey != null && Object.hasOwnProperty.call(message, "encryptedFolderKey"))
                        if (!(message.encryptedFolderKey && typeof message.encryptedFolderKey.length === "number" || $util.isString(message.encryptedFolderKey)))
                            return "encryptedFolderKey: buffer expected";
                    return null;
                };

                /**
                 * Creates a RestoreFolder message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.RestoreFolder
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.RestoreFolder} RestoreFolder
                 */
                RestoreFolder.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.RestoreFolder)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.RestoreFolder: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.RestoreFolder();
                    if (object.folderUid != null)
                        if (typeof object.folderUid === "string")
                            $util.base64.decode(object.folderUid, message.folderUid = $util.newBuffer($util.base64.length(object.folderUid)), 0);
                        else if (object.folderUid.length >= 0)
                            message.folderUid = object.folderUid;
                    if (object.encryptedFolderKey != null)
                        if (typeof object.encryptedFolderKey === "string")
                            $util.base64.decode(object.encryptedFolderKey, message.encryptedFolderKey = $util.newBuffer($util.base64.length(object.encryptedFolderKey)), 0);
                        else if (object.encryptedFolderKey.length >= 0)
                            message.encryptedFolderKey = object.encryptedFolderKey;
                    return message;
                };

                /**
                 * Creates a plain object from a RestoreFolder message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.RestoreFolder
                 * @static
                 * @param {folder.v3.remove.RestoreFolder} message RestoreFolder
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                RestoreFolder.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.folderUid = "";
                        else {
                            object.folderUid = [];
                            if (options.bytes !== Array)
                                object.folderUid = $util.newBuffer(object.folderUid);
                        }
                        if (options.bytes === String)
                            object.encryptedFolderKey = "";
                        else {
                            object.encryptedFolderKey = [];
                            if (options.bytes !== Array)
                                object.encryptedFolderKey = $util.newBuffer(object.encryptedFolderKey);
                        }
                    }
                    if (message.folderUid != null && Object.hasOwnProperty.call(message, "folderUid"))
                        object.folderUid = options.bytes === String ? $util.base64.encode(message.folderUid, 0, message.folderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.folderUid) : message.folderUid;
                    if (message.encryptedFolderKey != null && Object.hasOwnProperty.call(message, "encryptedFolderKey"))
                        object.encryptedFolderKey = options.bytes === String ? $util.base64.encode(message.encryptedFolderKey, 0, message.encryptedFolderKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedFolderKey) : message.encryptedFolderKey;
                    return object;
                };

                /**
                 * Converts this RestoreFolder to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.RestoreFolder
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                RestoreFolder.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for RestoreFolder
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.RestoreFolder
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                RestoreFolder.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.RestoreFolder";
                };

                return RestoreFolder;
            })();

            remove.TrashcanRestoreRequest = (function() {

                /**
                 * Properties of a TrashcanRestoreRequest.
                 * @memberof folder.v3.remove
                 * @interface ITrashcanRestoreRequest
                 * @property {Array.<folder.v3.remove.IRestoreRecord>|null} [records] TrashcanRestoreRequest records
                 * @property {Array.<folder.v3.remove.IRestoreFolder>|null} [folders] TrashcanRestoreRequest folders
                 * @property {Uint8Array|null} [targetFolderUid] TrashcanRestoreRequest targetFolderUid
                 */

                /**
                 * Constructs a new TrashcanRestoreRequest.
                 * @memberof folder.v3.remove
                 * @classdesc Represents a TrashcanRestoreRequest.
                 * @implements ITrashcanRestoreRequest
                 * @constructor
                 * @param {folder.v3.remove.ITrashcanRestoreRequest=} [properties] Properties to set
                 */
                function TrashcanRestoreRequest(properties) {
                    this.records = [];
                    this.folders = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * TrashcanRestoreRequest records.
                 * @member {Array.<folder.v3.remove.IRestoreRecord>} records
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @instance
                 */
                TrashcanRestoreRequest.prototype.records = $util.emptyArray;

                /**
                 * TrashcanRestoreRequest folders.
                 * @member {Array.<folder.v3.remove.IRestoreFolder>} folders
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @instance
                 */
                TrashcanRestoreRequest.prototype.folders = $util.emptyArray;

                /**
                 * TrashcanRestoreRequest targetFolderUid.
                 * @member {Uint8Array} targetFolderUid
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @instance
                 */
                TrashcanRestoreRequest.prototype.targetFolderUid = $util.newBuffer([]);

                /**
                 * Creates a new TrashcanRestoreRequest instance using the specified properties.
                 * @function create
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @static
                 * @param {folder.v3.remove.ITrashcanRestoreRequest=} [properties] Properties to set
                 * @returns {folder.v3.remove.TrashcanRestoreRequest} TrashcanRestoreRequest instance
                 */
                TrashcanRestoreRequest.create = function create(properties) {
                    return new TrashcanRestoreRequest(properties);
                };

                /**
                 * Encodes the specified TrashcanRestoreRequest message. Does not implicitly {@link folder.v3.remove.TrashcanRestoreRequest.verify|verify} messages.
                 * @function encode
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @static
                 * @param {folder.v3.remove.ITrashcanRestoreRequest} message TrashcanRestoreRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TrashcanRestoreRequest.encode = function encode(message, writer, q) {
                    if (!writer)
                        writer = $Writer.create();
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    if (message.records != null && message.records.length)
                        for (let i = 0; i < message.records.length; ++i)
                            $root.folder.v3.remove.RestoreRecord.encode(message.records[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
                    if (message.folders != null && message.folders.length)
                        for (let i = 0; i < message.folders.length; ++i)
                            $root.folder.v3.remove.RestoreFolder.encode(message.folders[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
                    if (message.targetFolderUid != null && Object.hasOwnProperty.call(message, "targetFolderUid"))
                        writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.targetFolderUid);
                    return writer;
                };

                /**
                 * Encodes the specified TrashcanRestoreRequest message, length delimited. Does not implicitly {@link folder.v3.remove.TrashcanRestoreRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @static
                 * @param {folder.v3.remove.ITrashcanRestoreRequest} message TrashcanRestoreRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TrashcanRestoreRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
                };

                /**
                 * Decodes a TrashcanRestoreRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {folder.v3.remove.TrashcanRestoreRequest} TrashcanRestoreRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TrashcanRestoreRequest.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.folder.v3.remove.TrashcanRestoreRequest();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.records && message.records.length))
                                    message.records = [];
                                message.records.push($root.folder.v3.remove.RestoreRecord.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 2: {
                                if (!(message.folders && message.folders.length))
                                    message.folders = [];
                                message.folders.push($root.folder.v3.remove.RestoreFolder.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        case 3: {
                                message.targetFolderUid = reader.bytes();
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
                 * Decodes a TrashcanRestoreRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {folder.v3.remove.TrashcanRestoreRequest} TrashcanRestoreRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TrashcanRestoreRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a TrashcanRestoreRequest message.
                 * @function verify
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                TrashcanRestoreRequest.verify = function verify(message, long) {
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
                            let error = $root.folder.v3.remove.RestoreRecord.verify(message.records[i], long + 1);
                            if (error)
                                return "records." + error;
                        }
                    }
                    if (message.folders != null && Object.hasOwnProperty.call(message, "folders")) {
                        if (!Array.isArray(message.folders))
                            return "folders: array expected";
                        for (let i = 0; i < message.folders.length; ++i) {
                            let error = $root.folder.v3.remove.RestoreFolder.verify(message.folders[i], long + 1);
                            if (error)
                                return "folders." + error;
                        }
                    }
                    if (message.targetFolderUid != null && Object.hasOwnProperty.call(message, "targetFolderUid"))
                        if (!(message.targetFolderUid && typeof message.targetFolderUid.length === "number" || $util.isString(message.targetFolderUid)))
                            return "targetFolderUid: buffer expected";
                    return null;
                };

                /**
                 * Creates a TrashcanRestoreRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {folder.v3.remove.TrashcanRestoreRequest} TrashcanRestoreRequest
                 */
                TrashcanRestoreRequest.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.folder.v3.remove.TrashcanRestoreRequest)
                        return object;
                    if (!$util.isObject(object))
                        throw TypeError(".folder.v3.remove.TrashcanRestoreRequest: object expected");
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.folder.v3.remove.TrashcanRestoreRequest();
                    if (object.records) {
                        if (!Array.isArray(object.records))
                            throw TypeError(".folder.v3.remove.TrashcanRestoreRequest.records: array expected");
                        message.records = [];
                        for (let i = 0; i < object.records.length; ++i) {
                            if (!$util.isObject(object.records[i]))
                                throw TypeError(".folder.v3.remove.TrashcanRestoreRequest.records: object expected");
                            message.records[i] = $root.folder.v3.remove.RestoreRecord.fromObject(object.records[i], long + 1);
                        }
                    }
                    if (object.folders) {
                        if (!Array.isArray(object.folders))
                            throw TypeError(".folder.v3.remove.TrashcanRestoreRequest.folders: array expected");
                        message.folders = [];
                        for (let i = 0; i < object.folders.length; ++i) {
                            if (!$util.isObject(object.folders[i]))
                                throw TypeError(".folder.v3.remove.TrashcanRestoreRequest.folders: object expected");
                            message.folders[i] = $root.folder.v3.remove.RestoreFolder.fromObject(object.folders[i], long + 1);
                        }
                    }
                    if (object.targetFolderUid != null)
                        if (typeof object.targetFolderUid === "string")
                            $util.base64.decode(object.targetFolderUid, message.targetFolderUid = $util.newBuffer($util.base64.length(object.targetFolderUid)), 0);
                        else if (object.targetFolderUid.length >= 0)
                            message.targetFolderUid = object.targetFolderUid;
                    return message;
                };

                /**
                 * Creates a plain object from a TrashcanRestoreRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @static
                 * @param {folder.v3.remove.TrashcanRestoreRequest} message TrashcanRestoreRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                TrashcanRestoreRequest.toObject = function toObject(message, options, q) {
                    if (!options)
                        options = {};
                    if (q === undefined)
                        q = 0;
                    if (q > $util.recursionLimit)
                        throw Error("max depth exceeded");
                    let object = {};
                    if (options.arrays || options.defaults) {
                        object.records = [];
                        object.folders = [];
                    }
                    if (options.defaults)
                        if (options.bytes === String)
                            object.targetFolderUid = "";
                        else {
                            object.targetFolderUid = [];
                            if (options.bytes !== Array)
                                object.targetFolderUid = $util.newBuffer(object.targetFolderUid);
                        }
                    if (message.records && message.records.length) {
                        object.records = [];
                        for (let j = 0; j < message.records.length; ++j)
                            object.records[j] = $root.folder.v3.remove.RestoreRecord.toObject(message.records[j], options, q + 1);
                    }
                    if (message.folders && message.folders.length) {
                        object.folders = [];
                        for (let j = 0; j < message.folders.length; ++j)
                            object.folders[j] = $root.folder.v3.remove.RestoreFolder.toObject(message.folders[j], options, q + 1);
                    }
                    if (message.targetFolderUid != null && Object.hasOwnProperty.call(message, "targetFolderUid"))
                        object.targetFolderUid = options.bytes === String ? $util.base64.encode(message.targetFolderUid, 0, message.targetFolderUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.targetFolderUid) : message.targetFolderUid;
                    return object;
                };

                /**
                 * Converts this TrashcanRestoreRequest to JSON.
                 * @function toJSON
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                TrashcanRestoreRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for TrashcanRestoreRequest
                 * @function getTypeUrl
                 * @memberof folder.v3.remove.TrashcanRestoreRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                TrashcanRestoreRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/folder.v3.remove.TrashcanRestoreRequest";
                };

                return TrashcanRestoreRequest;
            })();

            return remove;
        })();

        return v3;
    })();

    return folder;
})();

export { $root as default };

/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import { $protobuf, $Reader, $Writer, $util, $root } from './root.js';

export const Workflow = $root.Workflow = (() => {

    /**
     * Namespace Workflow.
     * @exports Workflow
     * @namespace
     */
    const Workflow = {};

    Workflow.WorkflowApprover = (function() {

        /**
         * Properties of a WorkflowApprover.
         * @memberof Workflow
         * @interface IWorkflowApprover
         * @property {string|null} [user] WorkflowApprover user
         * @property {number|null} [userId] WorkflowApprover userId
         * @property {Uint8Array|null} [teamUid] WorkflowApprover teamUid
         * @property {boolean|null} [escalation] WorkflowApprover escalation
         * @property {number|null} [escalationAfterMs] WorkflowApprover escalationAfterMs
         */

        /**
         * Constructs a new WorkflowApprover.
         * @memberof Workflow
         * @classdesc Represents a WorkflowApprover.
         * @implements IWorkflowApprover
         * @constructor
         * @param {Workflow.IWorkflowApprover=} [properties] Properties to set
         */
        function WorkflowApprover(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkflowApprover user.
         * @member {string|null|undefined} user
         * @memberof Workflow.WorkflowApprover
         * @instance
         */
        WorkflowApprover.prototype.user = null;

        /**
         * WorkflowApprover userId.
         * @member {number|null|undefined} userId
         * @memberof Workflow.WorkflowApprover
         * @instance
         */
        WorkflowApprover.prototype.userId = null;

        /**
         * WorkflowApprover teamUid.
         * @member {Uint8Array|null|undefined} teamUid
         * @memberof Workflow.WorkflowApprover
         * @instance
         */
        WorkflowApprover.prototype.teamUid = null;

        /**
         * WorkflowApprover escalation.
         * @member {boolean} escalation
         * @memberof Workflow.WorkflowApprover
         * @instance
         */
        WorkflowApprover.prototype.escalation = false;

        /**
         * WorkflowApprover escalationAfterMs.
         * @member {number} escalationAfterMs
         * @memberof Workflow.WorkflowApprover
         * @instance
         */
        WorkflowApprover.prototype.escalationAfterMs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * WorkflowApprover approver.
         * @member {"user"|"userId"|"teamUid"|undefined} approver
         * @memberof Workflow.WorkflowApprover
         * @instance
         */
        Object.defineProperty(WorkflowApprover.prototype, "approver", {
            get: $util.oneOfGetter($oneOfFields = ["user", "userId", "teamUid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new WorkflowApprover instance using the specified properties.
         * @function create
         * @memberof Workflow.WorkflowApprover
         * @static
         * @param {Workflow.IWorkflowApprover=} [properties] Properties to set
         * @returns {Workflow.WorkflowApprover} WorkflowApprover instance
         */
        WorkflowApprover.create = function create(properties) {
            return new WorkflowApprover(properties);
        };

        /**
         * Encodes the specified WorkflowApprover message. Does not implicitly {@link Workflow.WorkflowApprover.verify|verify} messages.
         * @function encode
         * @memberof Workflow.WorkflowApprover
         * @static
         * @param {Workflow.IWorkflowApprover} message WorkflowApprover message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkflowApprover.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.user);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.userId);
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.teamUid);
            if (message.escalation != null && Object.hasOwnProperty.call(message, "escalation"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.escalation);
            if (message.escalationAfterMs != null && Object.hasOwnProperty.call(message, "escalationAfterMs"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.escalationAfterMs);
            return writer;
        };

        /**
         * Decodes a WorkflowApprover message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.WorkflowApprover
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.WorkflowApprover} WorkflowApprover
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkflowApprover.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.WorkflowApprover();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.user = reader.string();
                        break;
                    }
                case 2: {
                        message.userId = reader.int32();
                        break;
                    }
                case 3: {
                        message.teamUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.escalation = reader.bool();
                        break;
                    }
                case 5: {
                        message.escalationAfterMs = reader.int64();
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
         * Creates a WorkflowApprover message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.WorkflowApprover
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.WorkflowApprover} WorkflowApprover
         */
        WorkflowApprover.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.WorkflowApprover)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.WorkflowApprover: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.WorkflowApprover();
            if (object.user != null)
                message.user = String(object.user);
            if (object.userId != null)
                message.userId = object.userId | 0;
            if (object.teamUid != null)
                if (typeof object.teamUid === "string")
                    $util.base64.decode(object.teamUid, message.teamUid = $util.newBuffer($util.base64.length(object.teamUid)), 0);
                else if (object.teamUid.length >= 0)
                    message.teamUid = object.teamUid;
            if (object.escalation != null)
                message.escalation = Boolean(object.escalation);
            if (object.escalationAfterMs != null)
                if ($util.Long)
                    message.escalationAfterMs = $util.Long.fromValue(object.escalationAfterMs, false);
                else if (typeof object.escalationAfterMs === "string")
                    message.escalationAfterMs = parseInt(object.escalationAfterMs, 10);
                else if (typeof object.escalationAfterMs === "number")
                    message.escalationAfterMs = object.escalationAfterMs;
                else if (typeof object.escalationAfterMs === "object")
                    message.escalationAfterMs = new $util.LongBits(object.escalationAfterMs.low >>> 0, object.escalationAfterMs.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a WorkflowApprover message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.WorkflowApprover
         * @static
         * @param {Workflow.WorkflowApprover} message WorkflowApprover
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkflowApprover.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.escalation = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.escalationAfterMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.escalationAfterMs = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.user != null && Object.hasOwnProperty.call(message, "user")) {
                object.user = message.user;
                if (options.oneofs)
                    object.approver = "user";
            }
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId")) {
                object.userId = message.userId;
                if (options.oneofs)
                    object.approver = "userId";
            }
            if (message.teamUid != null && Object.hasOwnProperty.call(message, "teamUid")) {
                object.teamUid = options.bytes === String ? $util.base64.encode(message.teamUid, 0, message.teamUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.teamUid) : message.teamUid;
                if (options.oneofs)
                    object.approver = "teamUid";
            }
            if (message.escalation != null && Object.hasOwnProperty.call(message, "escalation"))
                object.escalation = message.escalation;
            if (message.escalationAfterMs != null && Object.hasOwnProperty.call(message, "escalationAfterMs"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.escalationAfterMs = typeof message.escalationAfterMs === "number" ? BigInt(message.escalationAfterMs) : $util.Long.fromBits(message.escalationAfterMs.low >>> 0, message.escalationAfterMs.high >>> 0, false).toBigInt();
                else if (typeof message.escalationAfterMs === "number")
                    object.escalationAfterMs = options.longs === String ? String(message.escalationAfterMs) : message.escalationAfterMs;
                else
                    object.escalationAfterMs = options.longs === String ? $util.Long.prototype.toString.call(message.escalationAfterMs) : options.longs === Number ? new $util.LongBits(message.escalationAfterMs.low >>> 0, message.escalationAfterMs.high >>> 0).toNumber() : message.escalationAfterMs;
            return object;
        };

        /**
         * Converts this WorkflowApprover to JSON.
         * @function toJSON
         * @memberof Workflow.WorkflowApprover
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkflowApprover.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkflowApprover
         * @function getTypeUrl
         * @memberof Workflow.WorkflowApprover
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkflowApprover.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.WorkflowApprover";
        };

        return WorkflowApprover;
    })();

    Workflow.WorkflowParameters = (function() {

        /**
         * Properties of a WorkflowParameters.
         * @memberof Workflow
         * @interface IWorkflowParameters
         * @property {GraphSync.IGraphSyncRef|null} [resource] WorkflowParameters resource
         * @property {number|null} [approvalsNeeded] WorkflowParameters approvalsNeeded
         * @property {boolean|null} [checkoutNeeded] WorkflowParameters checkoutNeeded
         * @property {boolean|null} [startAccessOnApproval] WorkflowParameters startAccessOnApproval
         * @property {boolean|null} [requireReason] WorkflowParameters requireReason
         * @property {boolean|null} [requireTicket] WorkflowParameters requireTicket
         * @property {boolean|null} [requireMFA] WorkflowParameters requireMFA
         * @property {number|null} [accessLength] WorkflowParameters accessLength
         * @property {Workflow.ITemporalAccessFilter|null} [allowedTimes] WorkflowParameters allowedTimes
         */

        /**
         * Constructs a new WorkflowParameters.
         * @memberof Workflow
         * @classdesc Represents a WorkflowParameters.
         * @implements IWorkflowParameters
         * @constructor
         * @param {Workflow.IWorkflowParameters=} [properties] Properties to set
         */
        function WorkflowParameters(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkflowParameters resource.
         * @member {GraphSync.IGraphSyncRef|null|undefined} resource
         * @memberof Workflow.WorkflowParameters
         * @instance
         */
        WorkflowParameters.prototype.resource = null;

        /**
         * WorkflowParameters approvalsNeeded.
         * @member {number} approvalsNeeded
         * @memberof Workflow.WorkflowParameters
         * @instance
         */
        WorkflowParameters.prototype.approvalsNeeded = 0;

        /**
         * WorkflowParameters checkoutNeeded.
         * @member {boolean} checkoutNeeded
         * @memberof Workflow.WorkflowParameters
         * @instance
         */
        WorkflowParameters.prototype.checkoutNeeded = false;

        /**
         * WorkflowParameters startAccessOnApproval.
         * @member {boolean} startAccessOnApproval
         * @memberof Workflow.WorkflowParameters
         * @instance
         */
        WorkflowParameters.prototype.startAccessOnApproval = false;

        /**
         * WorkflowParameters requireReason.
         * @member {boolean} requireReason
         * @memberof Workflow.WorkflowParameters
         * @instance
         */
        WorkflowParameters.prototype.requireReason = false;

        /**
         * WorkflowParameters requireTicket.
         * @member {boolean} requireTicket
         * @memberof Workflow.WorkflowParameters
         * @instance
         */
        WorkflowParameters.prototype.requireTicket = false;

        /**
         * WorkflowParameters requireMFA.
         * @member {boolean} requireMFA
         * @memberof Workflow.WorkflowParameters
         * @instance
         */
        WorkflowParameters.prototype.requireMFA = false;

        /**
         * WorkflowParameters accessLength.
         * @member {number} accessLength
         * @memberof Workflow.WorkflowParameters
         * @instance
         */
        WorkflowParameters.prototype.accessLength = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WorkflowParameters allowedTimes.
         * @member {Workflow.ITemporalAccessFilter|null|undefined} allowedTimes
         * @memberof Workflow.WorkflowParameters
         * @instance
         */
        WorkflowParameters.prototype.allowedTimes = null;

        /**
         * Creates a new WorkflowParameters instance using the specified properties.
         * @function create
         * @memberof Workflow.WorkflowParameters
         * @static
         * @param {Workflow.IWorkflowParameters=} [properties] Properties to set
         * @returns {Workflow.WorkflowParameters} WorkflowParameters instance
         */
        WorkflowParameters.create = function create(properties) {
            return new WorkflowParameters(properties);
        };

        /**
         * Encodes the specified WorkflowParameters message. Does not implicitly {@link Workflow.WorkflowParameters.verify|verify} messages.
         * @function encode
         * @memberof Workflow.WorkflowParameters
         * @static
         * @param {Workflow.IWorkflowParameters} message WorkflowParameters message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkflowParameters.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                $root.GraphSync.GraphSyncRef.encode(message.resource, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.approvalsNeeded != null && Object.hasOwnProperty.call(message, "approvalsNeeded"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.approvalsNeeded);
            if (message.checkoutNeeded != null && Object.hasOwnProperty.call(message, "checkoutNeeded"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.checkoutNeeded);
            if (message.startAccessOnApproval != null && Object.hasOwnProperty.call(message, "startAccessOnApproval"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.startAccessOnApproval);
            if (message.requireReason != null && Object.hasOwnProperty.call(message, "requireReason"))
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.requireReason);
            if (message.requireTicket != null && Object.hasOwnProperty.call(message, "requireTicket"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.requireTicket);
            if (message.requireMFA != null && Object.hasOwnProperty.call(message, "requireMFA"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.requireMFA);
            if (message.accessLength != null && Object.hasOwnProperty.call(message, "accessLength"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.accessLength);
            if (message.allowedTimes != null && Object.hasOwnProperty.call(message, "allowedTimes"))
                $root.Workflow.TemporalAccessFilter.encode(message.allowedTimes, writer.uint32(/* id 9, wireType 2 =*/74).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a WorkflowParameters message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.WorkflowParameters
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.WorkflowParameters} WorkflowParameters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkflowParameters.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.WorkflowParameters();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.resource = $root.GraphSync.GraphSyncRef.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        message.approvalsNeeded = reader.int32();
                        break;
                    }
                case 3: {
                        message.checkoutNeeded = reader.bool();
                        break;
                    }
                case 4: {
                        message.startAccessOnApproval = reader.bool();
                        break;
                    }
                case 5: {
                        message.requireReason = reader.bool();
                        break;
                    }
                case 6: {
                        message.requireTicket = reader.bool();
                        break;
                    }
                case 7: {
                        message.requireMFA = reader.bool();
                        break;
                    }
                case 8: {
                        message.accessLength = reader.int64();
                        break;
                    }
                case 9: {
                        message.allowedTimes = $root.Workflow.TemporalAccessFilter.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates a WorkflowParameters message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.WorkflowParameters
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.WorkflowParameters} WorkflowParameters
         */
        WorkflowParameters.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.WorkflowParameters)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.WorkflowParameters: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.WorkflowParameters();
            if (object.resource != null) {
                if (!$util.isObject(object.resource))
                    throw TypeError(".Workflow.WorkflowParameters.resource: object expected");
                message.resource = $root.GraphSync.GraphSyncRef.fromObject(object.resource, long + 1);
            }
            if (object.approvalsNeeded != null)
                message.approvalsNeeded = object.approvalsNeeded | 0;
            if (object.checkoutNeeded != null)
                message.checkoutNeeded = Boolean(object.checkoutNeeded);
            if (object.startAccessOnApproval != null)
                message.startAccessOnApproval = Boolean(object.startAccessOnApproval);
            if (object.requireReason != null)
                message.requireReason = Boolean(object.requireReason);
            if (object.requireTicket != null)
                message.requireTicket = Boolean(object.requireTicket);
            if (object.requireMFA != null)
                message.requireMFA = Boolean(object.requireMFA);
            if (object.accessLength != null)
                if ($util.Long)
                    message.accessLength = $util.Long.fromValue(object.accessLength, false);
                else if (typeof object.accessLength === "string")
                    message.accessLength = parseInt(object.accessLength, 10);
                else if (typeof object.accessLength === "number")
                    message.accessLength = object.accessLength;
                else if (typeof object.accessLength === "object")
                    message.accessLength = new $util.LongBits(object.accessLength.low >>> 0, object.accessLength.high >>> 0).toNumber();
            if (object.allowedTimes != null) {
                if (!$util.isObject(object.allowedTimes))
                    throw TypeError(".Workflow.WorkflowParameters.allowedTimes: object expected");
                message.allowedTimes = $root.Workflow.TemporalAccessFilter.fromObject(object.allowedTimes, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a WorkflowParameters message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.WorkflowParameters
         * @static
         * @param {Workflow.WorkflowParameters} message WorkflowParameters
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkflowParameters.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.resource = null;
                object.approvalsNeeded = 0;
                object.checkoutNeeded = false;
                object.startAccessOnApproval = false;
                object.requireReason = false;
                object.requireTicket = false;
                object.requireMFA = false;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.accessLength = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.accessLength = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.allowedTimes = null;
            }
            if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                object.resource = $root.GraphSync.GraphSyncRef.toObject(message.resource, options, q + 1);
            if (message.approvalsNeeded != null && Object.hasOwnProperty.call(message, "approvalsNeeded"))
                object.approvalsNeeded = message.approvalsNeeded;
            if (message.checkoutNeeded != null && Object.hasOwnProperty.call(message, "checkoutNeeded"))
                object.checkoutNeeded = message.checkoutNeeded;
            if (message.startAccessOnApproval != null && Object.hasOwnProperty.call(message, "startAccessOnApproval"))
                object.startAccessOnApproval = message.startAccessOnApproval;
            if (message.requireReason != null && Object.hasOwnProperty.call(message, "requireReason"))
                object.requireReason = message.requireReason;
            if (message.requireTicket != null && Object.hasOwnProperty.call(message, "requireTicket"))
                object.requireTicket = message.requireTicket;
            if (message.requireMFA != null && Object.hasOwnProperty.call(message, "requireMFA"))
                object.requireMFA = message.requireMFA;
            if (message.accessLength != null && Object.hasOwnProperty.call(message, "accessLength"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.accessLength = typeof message.accessLength === "number" ? BigInt(message.accessLength) : $util.Long.fromBits(message.accessLength.low >>> 0, message.accessLength.high >>> 0, false).toBigInt();
                else if (typeof message.accessLength === "number")
                    object.accessLength = options.longs === String ? String(message.accessLength) : message.accessLength;
                else
                    object.accessLength = options.longs === String ? $util.Long.prototype.toString.call(message.accessLength) : options.longs === Number ? new $util.LongBits(message.accessLength.low >>> 0, message.accessLength.high >>> 0).toNumber() : message.accessLength;
            if (message.allowedTimes != null && Object.hasOwnProperty.call(message, "allowedTimes"))
                object.allowedTimes = $root.Workflow.TemporalAccessFilter.toObject(message.allowedTimes, options, q + 1);
            return object;
        };

        /**
         * Converts this WorkflowParameters to JSON.
         * @function toJSON
         * @memberof Workflow.WorkflowParameters
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkflowParameters.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkflowParameters
         * @function getTypeUrl
         * @memberof Workflow.WorkflowParameters
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkflowParameters.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.WorkflowParameters";
        };

        return WorkflowParameters;
    })();

    Workflow.WorkflowConfig = (function() {

        /**
         * Properties of a WorkflowConfig.
         * @memberof Workflow
         * @interface IWorkflowConfig
         * @property {Workflow.IWorkflowParameters|null} [parameters] WorkflowConfig parameters
         * @property {Array.<Workflow.IWorkflowApprover>|null} [approvers] WorkflowConfig approvers
         * @property {number|null} [createdOn] WorkflowConfig createdOn
         */

        /**
         * Constructs a new WorkflowConfig.
         * @memberof Workflow
         * @classdesc Represents a WorkflowConfig.
         * @implements IWorkflowConfig
         * @constructor
         * @param {Workflow.IWorkflowConfig=} [properties] Properties to set
         */
        function WorkflowConfig(properties) {
            this.approvers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkflowConfig parameters.
         * @member {Workflow.IWorkflowParameters|null|undefined} parameters
         * @memberof Workflow.WorkflowConfig
         * @instance
         */
        WorkflowConfig.prototype.parameters = null;

        /**
         * WorkflowConfig approvers.
         * @member {Array.<Workflow.IWorkflowApprover>} approvers
         * @memberof Workflow.WorkflowConfig
         * @instance
         */
        WorkflowConfig.prototype.approvers = $util.emptyArray;

        /**
         * WorkflowConfig createdOn.
         * @member {number} createdOn
         * @memberof Workflow.WorkflowConfig
         * @instance
         */
        WorkflowConfig.prototype.createdOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new WorkflowConfig instance using the specified properties.
         * @function create
         * @memberof Workflow.WorkflowConfig
         * @static
         * @param {Workflow.IWorkflowConfig=} [properties] Properties to set
         * @returns {Workflow.WorkflowConfig} WorkflowConfig instance
         */
        WorkflowConfig.create = function create(properties) {
            return new WorkflowConfig(properties);
        };

        /**
         * Encodes the specified WorkflowConfig message. Does not implicitly {@link Workflow.WorkflowConfig.verify|verify} messages.
         * @function encode
         * @memberof Workflow.WorkflowConfig
         * @static
         * @param {Workflow.IWorkflowConfig} message WorkflowConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkflowConfig.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.parameters != null && Object.hasOwnProperty.call(message, "parameters"))
                $root.Workflow.WorkflowParameters.encode(message.parameters, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.approvers != null && message.approvers.length)
                for (let i = 0; i < message.approvers.length; ++i)
                    $root.Workflow.WorkflowApprover.encode(message.approvers[i], writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.createdOn != null && Object.hasOwnProperty.call(message, "createdOn"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.createdOn);
            return writer;
        };

        /**
         * Decodes a WorkflowConfig message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.WorkflowConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.WorkflowConfig} WorkflowConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkflowConfig.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.WorkflowConfig();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.parameters = $root.Workflow.WorkflowParameters.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        if (!(message.approvers && message.approvers.length))
                            message.approvers = [];
                        message.approvers.push($root.Workflow.WorkflowApprover.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 3: {
                        message.createdOn = reader.int64();
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
         * Creates a WorkflowConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.WorkflowConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.WorkflowConfig} WorkflowConfig
         */
        WorkflowConfig.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.WorkflowConfig)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.WorkflowConfig: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.WorkflowConfig();
            if (object.parameters != null) {
                if (!$util.isObject(object.parameters))
                    throw TypeError(".Workflow.WorkflowConfig.parameters: object expected");
                message.parameters = $root.Workflow.WorkflowParameters.fromObject(object.parameters, long + 1);
            }
            if (object.approvers) {
                if (!Array.isArray(object.approvers))
                    throw TypeError(".Workflow.WorkflowConfig.approvers: array expected");
                message.approvers = [];
                for (let i = 0; i < object.approvers.length; ++i) {
                    if (!$util.isObject(object.approvers[i]))
                        throw TypeError(".Workflow.WorkflowConfig.approvers: object expected");
                    message.approvers[i] = $root.Workflow.WorkflowApprover.fromObject(object.approvers[i], long + 1);
                }
            }
            if (object.createdOn != null)
                if ($util.Long)
                    message.createdOn = $util.Long.fromValue(object.createdOn, false);
                else if (typeof object.createdOn === "string")
                    message.createdOn = parseInt(object.createdOn, 10);
                else if (typeof object.createdOn === "number")
                    message.createdOn = object.createdOn;
                else if (typeof object.createdOn === "object")
                    message.createdOn = new $util.LongBits(object.createdOn.low >>> 0, object.createdOn.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a WorkflowConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.WorkflowConfig
         * @static
         * @param {Workflow.WorkflowConfig} message WorkflowConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkflowConfig.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.approvers = [];
            if (options.defaults) {
                object.parameters = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.createdOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.createdOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.parameters != null && Object.hasOwnProperty.call(message, "parameters"))
                object.parameters = $root.Workflow.WorkflowParameters.toObject(message.parameters, options, q + 1);
            if (message.approvers && message.approvers.length) {
                object.approvers = [];
                for (let j = 0; j < message.approvers.length; ++j)
                    object.approvers[j] = $root.Workflow.WorkflowApprover.toObject(message.approvers[j], options, q + 1);
            }
            if (message.createdOn != null && Object.hasOwnProperty.call(message, "createdOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.createdOn = typeof message.createdOn === "number" ? BigInt(message.createdOn) : $util.Long.fromBits(message.createdOn.low >>> 0, message.createdOn.high >>> 0, false).toBigInt();
                else if (typeof message.createdOn === "number")
                    object.createdOn = options.longs === String ? String(message.createdOn) : message.createdOn;
                else
                    object.createdOn = options.longs === String ? $util.Long.prototype.toString.call(message.createdOn) : options.longs === Number ? new $util.LongBits(message.createdOn.low >>> 0, message.createdOn.high >>> 0).toNumber() : message.createdOn;
            return object;
        };

        /**
         * Converts this WorkflowConfig to JSON.
         * @function toJSON
         * @memberof Workflow.WorkflowConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkflowConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkflowConfig
         * @function getTypeUrl
         * @memberof Workflow.WorkflowConfig
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkflowConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.WorkflowConfig";
        };

        return WorkflowConfig;
    })();

    /**
     * WorkflowStage enum.
     * @name Workflow.WorkflowStage
     * @enum {number}
     * @property {number} WS_READY_TO_START=0 WS_READY_TO_START value
     * @property {number} WS_STARTED=1 WS_STARTED value
     * @property {number} WS_NEEDS_ACTION=2 WS_NEEDS_ACTION value
     * @property {number} WS_WAITING=3 WS_WAITING value
     */
    Workflow.WorkflowStage = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "WS_READY_TO_START"] = 0;
        values[valuesById[1] = "WS_STARTED"] = 1;
        values[valuesById[2] = "WS_NEEDS_ACTION"] = 2;
        values[valuesById[3] = "WS_WAITING"] = 3;
        return values;
    })();

    /**
     * AccessCondition enum.
     * @name Workflow.AccessCondition
     * @enum {number}
     * @property {number} AC_APPROVAL=0 AC_APPROVAL value
     * @property {number} AC_CHECKIN=1 AC_CHECKIN value
     * @property {number} AC_MFA=2 AC_MFA value
     * @property {number} AC_TIME=3 AC_TIME value
     * @property {number} AC_REASON=4 AC_REASON value
     * @property {number} AC_TICKET=5 AC_TICKET value
     */
    Workflow.AccessCondition = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "AC_APPROVAL"] = 0;
        values[valuesById[1] = "AC_CHECKIN"] = 1;
        values[valuesById[2] = "AC_MFA"] = 2;
        values[valuesById[3] = "AC_TIME"] = 3;
        values[valuesById[4] = "AC_REASON"] = 4;
        values[valuesById[5] = "AC_TICKET"] = 5;
        return values;
    })();

    Workflow.WorkflowStatus = (function() {

        /**
         * Properties of a WorkflowStatus.
         * @memberof Workflow
         * @interface IWorkflowStatus
         * @property {Workflow.WorkflowStage|null} [stage] WorkflowStatus stage
         * @property {Array.<Workflow.AccessCondition>|null} [conditions] WorkflowStatus conditions
         * @property {Array.<Workflow.IWorkflowApproval>|null} [approvedBy] WorkflowStatus approvedBy
         * @property {number|null} [startedOn] WorkflowStatus startedOn
         * @property {number|null} [expiresOn] WorkflowStatus expiresOn
         * @property {boolean|null} [escalated] WorkflowStatus escalated
         * @property {string|null} [checkedOutBy] WorkflowStatus checkedOutBy
         * @property {boolean|null} [canForceCheckIn] WorkflowStatus canForceCheckIn
         */

        /**
         * Constructs a new WorkflowStatus.
         * @memberof Workflow
         * @classdesc Represents a WorkflowStatus.
         * @implements IWorkflowStatus
         * @constructor
         * @param {Workflow.IWorkflowStatus=} [properties] Properties to set
         */
        function WorkflowStatus(properties) {
            this.conditions = [];
            this.approvedBy = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkflowStatus stage.
         * @member {Workflow.WorkflowStage} stage
         * @memberof Workflow.WorkflowStatus
         * @instance
         */
        WorkflowStatus.prototype.stage = 0;

        /**
         * WorkflowStatus conditions.
         * @member {Array.<Workflow.AccessCondition>} conditions
         * @memberof Workflow.WorkflowStatus
         * @instance
         */
        WorkflowStatus.prototype.conditions = $util.emptyArray;

        /**
         * WorkflowStatus approvedBy.
         * @member {Array.<Workflow.IWorkflowApproval>} approvedBy
         * @memberof Workflow.WorkflowStatus
         * @instance
         */
        WorkflowStatus.prototype.approvedBy = $util.emptyArray;

        /**
         * WorkflowStatus startedOn.
         * @member {number} startedOn
         * @memberof Workflow.WorkflowStatus
         * @instance
         */
        WorkflowStatus.prototype.startedOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WorkflowStatus expiresOn.
         * @member {number} expiresOn
         * @memberof Workflow.WorkflowStatus
         * @instance
         */
        WorkflowStatus.prototype.expiresOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WorkflowStatus escalated.
         * @member {boolean} escalated
         * @memberof Workflow.WorkflowStatus
         * @instance
         */
        WorkflowStatus.prototype.escalated = false;

        /**
         * WorkflowStatus checkedOutBy.
         * @member {string} checkedOutBy
         * @memberof Workflow.WorkflowStatus
         * @instance
         */
        WorkflowStatus.prototype.checkedOutBy = "";

        /**
         * WorkflowStatus canForceCheckIn.
         * @member {boolean} canForceCheckIn
         * @memberof Workflow.WorkflowStatus
         * @instance
         */
        WorkflowStatus.prototype.canForceCheckIn = false;

        /**
         * Creates a new WorkflowStatus instance using the specified properties.
         * @function create
         * @memberof Workflow.WorkflowStatus
         * @static
         * @param {Workflow.IWorkflowStatus=} [properties] Properties to set
         * @returns {Workflow.WorkflowStatus} WorkflowStatus instance
         */
        WorkflowStatus.create = function create(properties) {
            return new WorkflowStatus(properties);
        };

        /**
         * Encodes the specified WorkflowStatus message. Does not implicitly {@link Workflow.WorkflowStatus.verify|verify} messages.
         * @function encode
         * @memberof Workflow.WorkflowStatus
         * @static
         * @param {Workflow.IWorkflowStatus} message WorkflowStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkflowStatus.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.stage != null && Object.hasOwnProperty.call(message, "stage"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.stage);
            if (message.conditions != null && message.conditions.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.conditions.length; ++i)
                    writer.int32(message.conditions[i]);
                writer.ldelim();
            }
            if (message.approvedBy != null && message.approvedBy.length)
                for (let i = 0; i < message.approvedBy.length; ++i)
                    $root.Workflow.WorkflowApproval.encode(message.approvedBy[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.startedOn != null && Object.hasOwnProperty.call(message, "startedOn"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.startedOn);
            if (message.expiresOn != null && Object.hasOwnProperty.call(message, "expiresOn"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.expiresOn);
            if (message.escalated != null && Object.hasOwnProperty.call(message, "escalated"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.escalated);
            if (message.checkedOutBy != null && Object.hasOwnProperty.call(message, "checkedOutBy"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.checkedOutBy);
            if (message.canForceCheckIn != null && Object.hasOwnProperty.call(message, "canForceCheckIn"))
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.canForceCheckIn);
            return writer;
        };

        /**
         * Decodes a WorkflowStatus message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.WorkflowStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.WorkflowStatus} WorkflowStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkflowStatus.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.WorkflowStatus();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.stage = reader.int32();
                        break;
                    }
                case 2: {
                        if (!(message.conditions && message.conditions.length))
                            message.conditions = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.conditions.push(reader.int32());
                        } else
                            message.conditions.push(reader.int32());
                        break;
                    }
                case 3: {
                        if (!(message.approvedBy && message.approvedBy.length))
                            message.approvedBy = [];
                        message.approvedBy.push($root.Workflow.WorkflowApproval.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 4: {
                        message.startedOn = reader.int64();
                        break;
                    }
                case 5: {
                        message.expiresOn = reader.int64();
                        break;
                    }
                case 6: {
                        message.escalated = reader.bool();
                        break;
                    }
                case 7: {
                        message.checkedOutBy = reader.string();
                        break;
                    }
                case 8: {
                        message.canForceCheckIn = reader.bool();
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
         * Creates a WorkflowStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.WorkflowStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.WorkflowStatus} WorkflowStatus
         */
        WorkflowStatus.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.WorkflowStatus)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.WorkflowStatus: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.WorkflowStatus();
            switch (object.stage) {
            default:
                if (typeof object.stage === "number") {
                    message.stage = object.stage;
                    break;
                }
                break;
            case "WS_READY_TO_START":
            case 0:
                message.stage = 0;
                break;
            case "WS_STARTED":
            case 1:
                message.stage = 1;
                break;
            case "WS_NEEDS_ACTION":
            case 2:
                message.stage = 2;
                break;
            case "WS_WAITING":
            case 3:
                message.stage = 3;
                break;
            }
            if (object.conditions) {
                if (!Array.isArray(object.conditions))
                    throw TypeError(".Workflow.WorkflowStatus.conditions: array expected");
                message.conditions = [];
                for (let i = 0; i < object.conditions.length; ++i)
                    switch (object.conditions[i]) {
                    default:
                        if (typeof object.conditions[i] === "number") {
                            message.conditions[i] = object.conditions[i];
                            break;
                        }
                    case "AC_APPROVAL":
                    case 0:
                        message.conditions[i] = 0;
                        break;
                    case "AC_CHECKIN":
                    case 1:
                        message.conditions[i] = 1;
                        break;
                    case "AC_MFA":
                    case 2:
                        message.conditions[i] = 2;
                        break;
                    case "AC_TIME":
                    case 3:
                        message.conditions[i] = 3;
                        break;
                    case "AC_REASON":
                    case 4:
                        message.conditions[i] = 4;
                        break;
                    case "AC_TICKET":
                    case 5:
                        message.conditions[i] = 5;
                        break;
                    }
            }
            if (object.approvedBy) {
                if (!Array.isArray(object.approvedBy))
                    throw TypeError(".Workflow.WorkflowStatus.approvedBy: array expected");
                message.approvedBy = [];
                for (let i = 0; i < object.approvedBy.length; ++i) {
                    if (!$util.isObject(object.approvedBy[i]))
                        throw TypeError(".Workflow.WorkflowStatus.approvedBy: object expected");
                    message.approvedBy[i] = $root.Workflow.WorkflowApproval.fromObject(object.approvedBy[i], long + 1);
                }
            }
            if (object.startedOn != null)
                if ($util.Long)
                    message.startedOn = $util.Long.fromValue(object.startedOn, false);
                else if (typeof object.startedOn === "string")
                    message.startedOn = parseInt(object.startedOn, 10);
                else if (typeof object.startedOn === "number")
                    message.startedOn = object.startedOn;
                else if (typeof object.startedOn === "object")
                    message.startedOn = new $util.LongBits(object.startedOn.low >>> 0, object.startedOn.high >>> 0).toNumber();
            if (object.expiresOn != null)
                if ($util.Long)
                    message.expiresOn = $util.Long.fromValue(object.expiresOn, false);
                else if (typeof object.expiresOn === "string")
                    message.expiresOn = parseInt(object.expiresOn, 10);
                else if (typeof object.expiresOn === "number")
                    message.expiresOn = object.expiresOn;
                else if (typeof object.expiresOn === "object")
                    message.expiresOn = new $util.LongBits(object.expiresOn.low >>> 0, object.expiresOn.high >>> 0).toNumber();
            if (object.escalated != null)
                message.escalated = Boolean(object.escalated);
            if (object.checkedOutBy != null)
                message.checkedOutBy = String(object.checkedOutBy);
            if (object.canForceCheckIn != null)
                message.canForceCheckIn = Boolean(object.canForceCheckIn);
            return message;
        };

        /**
         * Creates a plain object from a WorkflowStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.WorkflowStatus
         * @static
         * @param {Workflow.WorkflowStatus} message WorkflowStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkflowStatus.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.conditions = [];
                object.approvedBy = [];
            }
            if (options.defaults) {
                object.stage = options.enums === String ? "WS_READY_TO_START" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.startedOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.startedOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expiresOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.expiresOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.escalated = false;
                object.checkedOutBy = "";
                object.canForceCheckIn = false;
            }
            if (message.stage != null && Object.hasOwnProperty.call(message, "stage"))
                object.stage = options.enums === String ? $root.Workflow.WorkflowStage[message.stage] === undefined ? message.stage : $root.Workflow.WorkflowStage[message.stage] : message.stage;
            if (message.conditions && message.conditions.length) {
                object.conditions = [];
                for (let j = 0; j < message.conditions.length; ++j)
                    object.conditions[j] = options.enums === String ? $root.Workflow.AccessCondition[message.conditions[j]] === undefined ? message.conditions[j] : $root.Workflow.AccessCondition[message.conditions[j]] : message.conditions[j];
            }
            if (message.approvedBy && message.approvedBy.length) {
                object.approvedBy = [];
                for (let j = 0; j < message.approvedBy.length; ++j)
                    object.approvedBy[j] = $root.Workflow.WorkflowApproval.toObject(message.approvedBy[j], options, q + 1);
            }
            if (message.startedOn != null && Object.hasOwnProperty.call(message, "startedOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.startedOn = typeof message.startedOn === "number" ? BigInt(message.startedOn) : $util.Long.fromBits(message.startedOn.low >>> 0, message.startedOn.high >>> 0, false).toBigInt();
                else if (typeof message.startedOn === "number")
                    object.startedOn = options.longs === String ? String(message.startedOn) : message.startedOn;
                else
                    object.startedOn = options.longs === String ? $util.Long.prototype.toString.call(message.startedOn) : options.longs === Number ? new $util.LongBits(message.startedOn.low >>> 0, message.startedOn.high >>> 0).toNumber() : message.startedOn;
            if (message.expiresOn != null && Object.hasOwnProperty.call(message, "expiresOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.expiresOn = typeof message.expiresOn === "number" ? BigInt(message.expiresOn) : $util.Long.fromBits(message.expiresOn.low >>> 0, message.expiresOn.high >>> 0, false).toBigInt();
                else if (typeof message.expiresOn === "number")
                    object.expiresOn = options.longs === String ? String(message.expiresOn) : message.expiresOn;
                else
                    object.expiresOn = options.longs === String ? $util.Long.prototype.toString.call(message.expiresOn) : options.longs === Number ? new $util.LongBits(message.expiresOn.low >>> 0, message.expiresOn.high >>> 0).toNumber() : message.expiresOn;
            if (message.escalated != null && Object.hasOwnProperty.call(message, "escalated"))
                object.escalated = message.escalated;
            if (message.checkedOutBy != null && Object.hasOwnProperty.call(message, "checkedOutBy"))
                object.checkedOutBy = message.checkedOutBy;
            if (message.canForceCheckIn != null && Object.hasOwnProperty.call(message, "canForceCheckIn"))
                object.canForceCheckIn = message.canForceCheckIn;
            return object;
        };

        /**
         * Converts this WorkflowStatus to JSON.
         * @function toJSON
         * @memberof Workflow.WorkflowStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkflowStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkflowStatus
         * @function getTypeUrl
         * @memberof Workflow.WorkflowStatus
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkflowStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.WorkflowStatus";
        };

        return WorkflowStatus;
    })();

    Workflow.WorkflowProcess = (function() {

        /**
         * Properties of a WorkflowProcess.
         * @memberof Workflow
         * @interface IWorkflowProcess
         * @property {Uint8Array|null} [flowUid] WorkflowProcess flowUid
         * @property {number|null} [userId] WorkflowProcess userId
         * @property {GraphSync.IGraphSyncRef|null} [resource] WorkflowProcess resource
         * @property {number|null} [startedOn] WorkflowProcess startedOn
         * @property {number|null} [expiresOn] WorkflowProcess expiresOn
         * @property {Uint8Array|null} [reason] WorkflowProcess reason
         * @property {boolean|null} [mfaVerified] WorkflowProcess mfaVerified
         * @property {Uint8Array|null} [externalRef] WorkflowProcess externalRef
         * @property {string|null} [user] WorkflowProcess user
         * @property {Array.<NotificationCenter.INotificationParameter>|null} [workflowParameters] WorkflowProcess workflowParameters
         * @property {boolean|null} [escalated] WorkflowProcess escalated
         * @property {boolean|null} [ephemeral] WorkflowProcess ephemeral
         */

        /**
         * Constructs a new WorkflowProcess.
         * @memberof Workflow
         * @classdesc Represents a WorkflowProcess.
         * @implements IWorkflowProcess
         * @constructor
         * @param {Workflow.IWorkflowProcess=} [properties] Properties to set
         */
        function WorkflowProcess(properties) {
            this.workflowParameters = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkflowProcess flowUid.
         * @member {Uint8Array} flowUid
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.flowUid = $util.newBuffer([]);

        /**
         * WorkflowProcess userId.
         * @member {number} userId
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.userId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WorkflowProcess resource.
         * @member {GraphSync.IGraphSyncRef|null|undefined} resource
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.resource = null;

        /**
         * WorkflowProcess startedOn.
         * @member {number} startedOn
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.startedOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WorkflowProcess expiresOn.
         * @member {number} expiresOn
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.expiresOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WorkflowProcess reason.
         * @member {Uint8Array} reason
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.reason = $util.newBuffer([]);

        /**
         * WorkflowProcess mfaVerified.
         * @member {boolean} mfaVerified
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.mfaVerified = false;

        /**
         * WorkflowProcess externalRef.
         * @member {Uint8Array} externalRef
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.externalRef = $util.newBuffer([]);

        /**
         * WorkflowProcess user.
         * @member {string} user
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.user = "";

        /**
         * WorkflowProcess workflowParameters.
         * @member {Array.<NotificationCenter.INotificationParameter>} workflowParameters
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.workflowParameters = $util.emptyArray;

        /**
         * WorkflowProcess escalated.
         * @member {boolean} escalated
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.escalated = false;

        /**
         * WorkflowProcess ephemeral.
         * @member {boolean} ephemeral
         * @memberof Workflow.WorkflowProcess
         * @instance
         */
        WorkflowProcess.prototype.ephemeral = false;

        /**
         * Creates a new WorkflowProcess instance using the specified properties.
         * @function create
         * @memberof Workflow.WorkflowProcess
         * @static
         * @param {Workflow.IWorkflowProcess=} [properties] Properties to set
         * @returns {Workflow.WorkflowProcess} WorkflowProcess instance
         */
        WorkflowProcess.create = function create(properties) {
            return new WorkflowProcess(properties);
        };

        /**
         * Encodes the specified WorkflowProcess message. Does not implicitly {@link Workflow.WorkflowProcess.verify|verify} messages.
         * @function encode
         * @memberof Workflow.WorkflowProcess
         * @static
         * @param {Workflow.IWorkflowProcess} message WorkflowProcess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkflowProcess.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.flowUid != null && Object.hasOwnProperty.call(message, "flowUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.flowUid);
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.userId);
            if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                $root.GraphSync.GraphSyncRef.encode(message.resource, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.startedOn != null && Object.hasOwnProperty.call(message, "startedOn"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.startedOn);
            if (message.expiresOn != null && Object.hasOwnProperty.call(message, "expiresOn"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.expiresOn);
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.reason);
            if (message.mfaVerified != null && Object.hasOwnProperty.call(message, "mfaVerified"))
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.mfaVerified);
            if (message.externalRef != null && Object.hasOwnProperty.call(message, "externalRef"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.externalRef);
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.user);
            if (message.workflowParameters != null && message.workflowParameters.length)
                for (let i = 0; i < message.workflowParameters.length; ++i)
                    $root.NotificationCenter.NotificationParameter.encode(message.workflowParameters[i], writer.uint32(/* id 10, wireType 2 =*/82).fork(), q + 1).ldelim();
            if (message.escalated != null && Object.hasOwnProperty.call(message, "escalated"))
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.escalated);
            if (message.ephemeral != null && Object.hasOwnProperty.call(message, "ephemeral"))
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.ephemeral);
            return writer;
        };

        /**
         * Decodes a WorkflowProcess message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.WorkflowProcess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.WorkflowProcess} WorkflowProcess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkflowProcess.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.WorkflowProcess();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.flowUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.userId = reader.int64();
                        break;
                    }
                case 3: {
                        message.resource = $root.GraphSync.GraphSyncRef.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 4: {
                        message.startedOn = reader.int64();
                        break;
                    }
                case 5: {
                        message.expiresOn = reader.int64();
                        break;
                    }
                case 6: {
                        message.reason = reader.bytes();
                        break;
                    }
                case 7: {
                        message.mfaVerified = reader.bool();
                        break;
                    }
                case 8: {
                        message.externalRef = reader.bytes();
                        break;
                    }
                case 9: {
                        message.user = reader.string();
                        break;
                    }
                case 10: {
                        if (!(message.workflowParameters && message.workflowParameters.length))
                            message.workflowParameters = [];
                        message.workflowParameters.push($root.NotificationCenter.NotificationParameter.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 11: {
                        message.escalated = reader.bool();
                        break;
                    }
                case 12: {
                        message.ephemeral = reader.bool();
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
         * Creates a WorkflowProcess message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.WorkflowProcess
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.WorkflowProcess} WorkflowProcess
         */
        WorkflowProcess.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.WorkflowProcess)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.WorkflowProcess: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.WorkflowProcess();
            if (object.flowUid != null)
                if (typeof object.flowUid === "string")
                    $util.base64.decode(object.flowUid, message.flowUid = $util.newBuffer($util.base64.length(object.flowUid)), 0);
                else if (object.flowUid.length >= 0)
                    message.flowUid = object.flowUid;
            if (object.userId != null)
                if ($util.Long)
                    message.userId = $util.Long.fromValue(object.userId, false);
                else if (typeof object.userId === "string")
                    message.userId = parseInt(object.userId, 10);
                else if (typeof object.userId === "number")
                    message.userId = object.userId;
                else if (typeof object.userId === "object")
                    message.userId = new $util.LongBits(object.userId.low >>> 0, object.userId.high >>> 0).toNumber();
            if (object.resource != null) {
                if (!$util.isObject(object.resource))
                    throw TypeError(".Workflow.WorkflowProcess.resource: object expected");
                message.resource = $root.GraphSync.GraphSyncRef.fromObject(object.resource, long + 1);
            }
            if (object.startedOn != null)
                if ($util.Long)
                    message.startedOn = $util.Long.fromValue(object.startedOn, false);
                else if (typeof object.startedOn === "string")
                    message.startedOn = parseInt(object.startedOn, 10);
                else if (typeof object.startedOn === "number")
                    message.startedOn = object.startedOn;
                else if (typeof object.startedOn === "object")
                    message.startedOn = new $util.LongBits(object.startedOn.low >>> 0, object.startedOn.high >>> 0).toNumber();
            if (object.expiresOn != null)
                if ($util.Long)
                    message.expiresOn = $util.Long.fromValue(object.expiresOn, false);
                else if (typeof object.expiresOn === "string")
                    message.expiresOn = parseInt(object.expiresOn, 10);
                else if (typeof object.expiresOn === "number")
                    message.expiresOn = object.expiresOn;
                else if (typeof object.expiresOn === "object")
                    message.expiresOn = new $util.LongBits(object.expiresOn.low >>> 0, object.expiresOn.high >>> 0).toNumber();
            if (object.reason != null)
                if (typeof object.reason === "string")
                    $util.base64.decode(object.reason, message.reason = $util.newBuffer($util.base64.length(object.reason)), 0);
                else if (object.reason.length >= 0)
                    message.reason = object.reason;
            if (object.mfaVerified != null)
                message.mfaVerified = Boolean(object.mfaVerified);
            if (object.externalRef != null)
                if (typeof object.externalRef === "string")
                    $util.base64.decode(object.externalRef, message.externalRef = $util.newBuffer($util.base64.length(object.externalRef)), 0);
                else if (object.externalRef.length >= 0)
                    message.externalRef = object.externalRef;
            if (object.user != null)
                message.user = String(object.user);
            if (object.workflowParameters) {
                if (!Array.isArray(object.workflowParameters))
                    throw TypeError(".Workflow.WorkflowProcess.workflowParameters: array expected");
                message.workflowParameters = [];
                for (let i = 0; i < object.workflowParameters.length; ++i) {
                    if (!$util.isObject(object.workflowParameters[i]))
                        throw TypeError(".Workflow.WorkflowProcess.workflowParameters: object expected");
                    message.workflowParameters[i] = $root.NotificationCenter.NotificationParameter.fromObject(object.workflowParameters[i], long + 1);
                }
            }
            if (object.escalated != null)
                message.escalated = Boolean(object.escalated);
            if (object.ephemeral != null)
                message.ephemeral = Boolean(object.ephemeral);
            return message;
        };

        /**
         * Creates a plain object from a WorkflowProcess message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.WorkflowProcess
         * @static
         * @param {Workflow.WorkflowProcess} message WorkflowProcess
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkflowProcess.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.workflowParameters = [];
            if (options.defaults) {
                if (options.bytes === String)
                    object.flowUid = "";
                else {
                    object.flowUid = [];
                    if (options.bytes !== Array)
                        object.flowUid = $util.newBuffer(object.flowUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.userId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.userId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.resource = null;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.startedOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.startedOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.expiresOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.expiresOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                if (options.bytes === String)
                    object.reason = "";
                else {
                    object.reason = [];
                    if (options.bytes !== Array)
                        object.reason = $util.newBuffer(object.reason);
                }
                object.mfaVerified = false;
                if (options.bytes === String)
                    object.externalRef = "";
                else {
                    object.externalRef = [];
                    if (options.bytes !== Array)
                        object.externalRef = $util.newBuffer(object.externalRef);
                }
                object.user = "";
                object.escalated = false;
                object.ephemeral = false;
            }
            if (message.flowUid != null && Object.hasOwnProperty.call(message, "flowUid"))
                object.flowUid = options.bytes === String ? $util.base64.encode(message.flowUid, 0, message.flowUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.flowUid) : message.flowUid;
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.userId = typeof message.userId === "number" ? BigInt(message.userId) : $util.Long.fromBits(message.userId.low >>> 0, message.userId.high >>> 0, false).toBigInt();
                else if (typeof message.userId === "number")
                    object.userId = options.longs === String ? String(message.userId) : message.userId;
                else
                    object.userId = options.longs === String ? $util.Long.prototype.toString.call(message.userId) : options.longs === Number ? new $util.LongBits(message.userId.low >>> 0, message.userId.high >>> 0).toNumber() : message.userId;
            if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                object.resource = $root.GraphSync.GraphSyncRef.toObject(message.resource, options, q + 1);
            if (message.startedOn != null && Object.hasOwnProperty.call(message, "startedOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.startedOn = typeof message.startedOn === "number" ? BigInt(message.startedOn) : $util.Long.fromBits(message.startedOn.low >>> 0, message.startedOn.high >>> 0, false).toBigInt();
                else if (typeof message.startedOn === "number")
                    object.startedOn = options.longs === String ? String(message.startedOn) : message.startedOn;
                else
                    object.startedOn = options.longs === String ? $util.Long.prototype.toString.call(message.startedOn) : options.longs === Number ? new $util.LongBits(message.startedOn.low >>> 0, message.startedOn.high >>> 0).toNumber() : message.startedOn;
            if (message.expiresOn != null && Object.hasOwnProperty.call(message, "expiresOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.expiresOn = typeof message.expiresOn === "number" ? BigInt(message.expiresOn) : $util.Long.fromBits(message.expiresOn.low >>> 0, message.expiresOn.high >>> 0, false).toBigInt();
                else if (typeof message.expiresOn === "number")
                    object.expiresOn = options.longs === String ? String(message.expiresOn) : message.expiresOn;
                else
                    object.expiresOn = options.longs === String ? $util.Long.prototype.toString.call(message.expiresOn) : options.longs === Number ? new $util.LongBits(message.expiresOn.low >>> 0, message.expiresOn.high >>> 0).toNumber() : message.expiresOn;
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                object.reason = options.bytes === String ? $util.base64.encode(message.reason, 0, message.reason.length) : options.bytes === Array ? Array.prototype.slice.call(message.reason) : message.reason;
            if (message.mfaVerified != null && Object.hasOwnProperty.call(message, "mfaVerified"))
                object.mfaVerified = message.mfaVerified;
            if (message.externalRef != null && Object.hasOwnProperty.call(message, "externalRef"))
                object.externalRef = options.bytes === String ? $util.base64.encode(message.externalRef, 0, message.externalRef.length) : options.bytes === Array ? Array.prototype.slice.call(message.externalRef) : message.externalRef;
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                object.user = message.user;
            if (message.workflowParameters && message.workflowParameters.length) {
                object.workflowParameters = [];
                for (let j = 0; j < message.workflowParameters.length; ++j)
                    object.workflowParameters[j] = $root.NotificationCenter.NotificationParameter.toObject(message.workflowParameters[j], options, q + 1);
            }
            if (message.escalated != null && Object.hasOwnProperty.call(message, "escalated"))
                object.escalated = message.escalated;
            if (message.ephemeral != null && Object.hasOwnProperty.call(message, "ephemeral"))
                object.ephemeral = message.ephemeral;
            return object;
        };

        /**
         * Converts this WorkflowProcess to JSON.
         * @function toJSON
         * @memberof Workflow.WorkflowProcess
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkflowProcess.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkflowProcess
         * @function getTypeUrl
         * @memberof Workflow.WorkflowProcess
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkflowProcess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.WorkflowProcess";
        };

        return WorkflowProcess;
    })();

    Workflow.WorkflowApproval = (function() {

        /**
         * Properties of a WorkflowApproval.
         * @memberof Workflow
         * @interface IWorkflowApproval
         * @property {number|null} [userId] WorkflowApproval userId
         * @property {string|null} [user] WorkflowApproval user
         * @property {Uint8Array|null} [flowUid] WorkflowApproval flowUid
         * @property {number|null} [approvedOn] WorkflowApproval approvedOn
         */

        /**
         * Constructs a new WorkflowApproval.
         * @memberof Workflow
         * @classdesc Represents a WorkflowApproval.
         * @implements IWorkflowApproval
         * @constructor
         * @param {Workflow.IWorkflowApproval=} [properties] Properties to set
         */
        function WorkflowApproval(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkflowApproval userId.
         * @member {number} userId
         * @memberof Workflow.WorkflowApproval
         * @instance
         */
        WorkflowApproval.prototype.userId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * WorkflowApproval user.
         * @member {string} user
         * @memberof Workflow.WorkflowApproval
         * @instance
         */
        WorkflowApproval.prototype.user = "";

        /**
         * WorkflowApproval flowUid.
         * @member {Uint8Array} flowUid
         * @memberof Workflow.WorkflowApproval
         * @instance
         */
        WorkflowApproval.prototype.flowUid = $util.newBuffer([]);

        /**
         * WorkflowApproval approvedOn.
         * @member {number} approvedOn
         * @memberof Workflow.WorkflowApproval
         * @instance
         */
        WorkflowApproval.prototype.approvedOn = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new WorkflowApproval instance using the specified properties.
         * @function create
         * @memberof Workflow.WorkflowApproval
         * @static
         * @param {Workflow.IWorkflowApproval=} [properties] Properties to set
         * @returns {Workflow.WorkflowApproval} WorkflowApproval instance
         */
        WorkflowApproval.create = function create(properties) {
            return new WorkflowApproval(properties);
        };

        /**
         * Encodes the specified WorkflowApproval message. Does not implicitly {@link Workflow.WorkflowApproval.verify|verify} messages.
         * @function encode
         * @memberof Workflow.WorkflowApproval
         * @static
         * @param {Workflow.IWorkflowApproval} message WorkflowApproval message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkflowApproval.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.userId);
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.user);
            if (message.flowUid != null && Object.hasOwnProperty.call(message, "flowUid"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.flowUid);
            if (message.approvedOn != null && Object.hasOwnProperty.call(message, "approvedOn"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.approvedOn);
            return writer;
        };

        /**
         * Decodes a WorkflowApproval message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.WorkflowApproval
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.WorkflowApproval} WorkflowApproval
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkflowApproval.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.WorkflowApproval();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.userId = reader.int64();
                        break;
                    }
                case 2: {
                        message.user = reader.string();
                        break;
                    }
                case 3: {
                        message.flowUid = reader.bytes();
                        break;
                    }
                case 4: {
                        message.approvedOn = reader.int64();
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
         * Creates a WorkflowApproval message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.WorkflowApproval
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.WorkflowApproval} WorkflowApproval
         */
        WorkflowApproval.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.WorkflowApproval)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.WorkflowApproval: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.WorkflowApproval();
            if (object.userId != null)
                if ($util.Long)
                    message.userId = $util.Long.fromValue(object.userId, false);
                else if (typeof object.userId === "string")
                    message.userId = parseInt(object.userId, 10);
                else if (typeof object.userId === "number")
                    message.userId = object.userId;
                else if (typeof object.userId === "object")
                    message.userId = new $util.LongBits(object.userId.low >>> 0, object.userId.high >>> 0).toNumber();
            if (object.user != null)
                message.user = String(object.user);
            if (object.flowUid != null)
                if (typeof object.flowUid === "string")
                    $util.base64.decode(object.flowUid, message.flowUid = $util.newBuffer($util.base64.length(object.flowUid)), 0);
                else if (object.flowUid.length >= 0)
                    message.flowUid = object.flowUid;
            if (object.approvedOn != null)
                if ($util.Long)
                    message.approvedOn = $util.Long.fromValue(object.approvedOn, false);
                else if (typeof object.approvedOn === "string")
                    message.approvedOn = parseInt(object.approvedOn, 10);
                else if (typeof object.approvedOn === "number")
                    message.approvedOn = object.approvedOn;
                else if (typeof object.approvedOn === "object")
                    message.approvedOn = new $util.LongBits(object.approvedOn.low >>> 0, object.approvedOn.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a WorkflowApproval message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.WorkflowApproval
         * @static
         * @param {Workflow.WorkflowApproval} message WorkflowApproval
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkflowApproval.toObject = function toObject(message, options, q) {
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
                    object.userId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.userId = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
                object.user = "";
                if (options.bytes === String)
                    object.flowUid = "";
                else {
                    object.flowUid = [];
                    if (options.bytes !== Array)
                        object.flowUid = $util.newBuffer(object.flowUid);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.approvedOn = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.approvedOn = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.userId != null && Object.hasOwnProperty.call(message, "userId"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.userId = typeof message.userId === "number" ? BigInt(message.userId) : $util.Long.fromBits(message.userId.low >>> 0, message.userId.high >>> 0, false).toBigInt();
                else if (typeof message.userId === "number")
                    object.userId = options.longs === String ? String(message.userId) : message.userId;
                else
                    object.userId = options.longs === String ? $util.Long.prototype.toString.call(message.userId) : options.longs === Number ? new $util.LongBits(message.userId.low >>> 0, message.userId.high >>> 0).toNumber() : message.userId;
            if (message.user != null && Object.hasOwnProperty.call(message, "user"))
                object.user = message.user;
            if (message.flowUid != null && Object.hasOwnProperty.call(message, "flowUid"))
                object.flowUid = options.bytes === String ? $util.base64.encode(message.flowUid, 0, message.flowUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.flowUid) : message.flowUid;
            if (message.approvedOn != null && Object.hasOwnProperty.call(message, "approvedOn"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.approvedOn = typeof message.approvedOn === "number" ? BigInt(message.approvedOn) : $util.Long.fromBits(message.approvedOn.low >>> 0, message.approvedOn.high >>> 0, false).toBigInt();
                else if (typeof message.approvedOn === "number")
                    object.approvedOn = options.longs === String ? String(message.approvedOn) : message.approvedOn;
                else
                    object.approvedOn = options.longs === String ? $util.Long.prototype.toString.call(message.approvedOn) : options.longs === Number ? new $util.LongBits(message.approvedOn.low >>> 0, message.approvedOn.high >>> 0).toNumber() : message.approvedOn;
            return object;
        };

        /**
         * Converts this WorkflowApproval to JSON.
         * @function toJSON
         * @memberof Workflow.WorkflowApproval
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkflowApproval.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkflowApproval
         * @function getTypeUrl
         * @memberof Workflow.WorkflowApproval
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkflowApproval.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.WorkflowApproval";
        };

        return WorkflowApproval;
    })();

    Workflow.WorkflowContext = (function() {

        /**
         * Properties of a WorkflowContext.
         * @memberof Workflow
         * @interface IWorkflowContext
         * @property {Workflow.IWorkflowConfig|null} [workflowConfig] WorkflowContext workflowConfig
         * @property {Workflow.IWorkflowProcess|null} [workflow] WorkflowContext workflow
         * @property {Array.<Workflow.IWorkflowApproval>|null} [approvals] WorkflowContext approvals
         * @property {Workflow.IWorkflowProcess|null} [blocker] WorkflowContext blocker
         */

        /**
         * Constructs a new WorkflowContext.
         * @memberof Workflow
         * @classdesc Represents a WorkflowContext.
         * @implements IWorkflowContext
         * @constructor
         * @param {Workflow.IWorkflowContext=} [properties] Properties to set
         */
        function WorkflowContext(properties) {
            this.approvals = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkflowContext workflowConfig.
         * @member {Workflow.IWorkflowConfig|null|undefined} workflowConfig
         * @memberof Workflow.WorkflowContext
         * @instance
         */
        WorkflowContext.prototype.workflowConfig = null;

        /**
         * WorkflowContext workflow.
         * @member {Workflow.IWorkflowProcess|null|undefined} workflow
         * @memberof Workflow.WorkflowContext
         * @instance
         */
        WorkflowContext.prototype.workflow = null;

        /**
         * WorkflowContext approvals.
         * @member {Array.<Workflow.IWorkflowApproval>} approvals
         * @memberof Workflow.WorkflowContext
         * @instance
         */
        WorkflowContext.prototype.approvals = $util.emptyArray;

        /**
         * WorkflowContext blocker.
         * @member {Workflow.IWorkflowProcess|null|undefined} blocker
         * @memberof Workflow.WorkflowContext
         * @instance
         */
        WorkflowContext.prototype.blocker = null;

        /**
         * Creates a new WorkflowContext instance using the specified properties.
         * @function create
         * @memberof Workflow.WorkflowContext
         * @static
         * @param {Workflow.IWorkflowContext=} [properties] Properties to set
         * @returns {Workflow.WorkflowContext} WorkflowContext instance
         */
        WorkflowContext.create = function create(properties) {
            return new WorkflowContext(properties);
        };

        /**
         * Encodes the specified WorkflowContext message. Does not implicitly {@link Workflow.WorkflowContext.verify|verify} messages.
         * @function encode
         * @memberof Workflow.WorkflowContext
         * @static
         * @param {Workflow.IWorkflowContext} message WorkflowContext message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkflowContext.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.workflowConfig != null && Object.hasOwnProperty.call(message, "workflowConfig"))
                $root.Workflow.WorkflowConfig.encode(message.workflowConfig, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.workflow != null && Object.hasOwnProperty.call(message, "workflow"))
                $root.Workflow.WorkflowProcess.encode(message.workflow, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.approvals != null && message.approvals.length)
                for (let i = 0; i < message.approvals.length; ++i)
                    $root.Workflow.WorkflowApproval.encode(message.approvals[i], writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            if (message.blocker != null && Object.hasOwnProperty.call(message, "blocker"))
                $root.Workflow.WorkflowProcess.encode(message.blocker, writer.uint32(/* id 4, wireType 2 =*/34).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a WorkflowContext message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.WorkflowContext
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.WorkflowContext} WorkflowContext
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkflowContext.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.WorkflowContext();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.workflowConfig = $root.Workflow.WorkflowConfig.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        message.workflow = $root.Workflow.WorkflowProcess.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        if (!(message.approvals && message.approvals.length))
                            message.approvals = [];
                        message.approvals.push($root.Workflow.WorkflowApproval.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 4: {
                        message.blocker = $root.Workflow.WorkflowProcess.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates a WorkflowContext message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.WorkflowContext
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.WorkflowContext} WorkflowContext
         */
        WorkflowContext.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.WorkflowContext)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.WorkflowContext: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.WorkflowContext();
            if (object.workflowConfig != null) {
                if (!$util.isObject(object.workflowConfig))
                    throw TypeError(".Workflow.WorkflowContext.workflowConfig: object expected");
                message.workflowConfig = $root.Workflow.WorkflowConfig.fromObject(object.workflowConfig, long + 1);
            }
            if (object.workflow != null) {
                if (!$util.isObject(object.workflow))
                    throw TypeError(".Workflow.WorkflowContext.workflow: object expected");
                message.workflow = $root.Workflow.WorkflowProcess.fromObject(object.workflow, long + 1);
            }
            if (object.approvals) {
                if (!Array.isArray(object.approvals))
                    throw TypeError(".Workflow.WorkflowContext.approvals: array expected");
                message.approvals = [];
                for (let i = 0; i < object.approvals.length; ++i) {
                    if (!$util.isObject(object.approvals[i]))
                        throw TypeError(".Workflow.WorkflowContext.approvals: object expected");
                    message.approvals[i] = $root.Workflow.WorkflowApproval.fromObject(object.approvals[i], long + 1);
                }
            }
            if (object.blocker != null) {
                if (!$util.isObject(object.blocker))
                    throw TypeError(".Workflow.WorkflowContext.blocker: object expected");
                message.blocker = $root.Workflow.WorkflowProcess.fromObject(object.blocker, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a WorkflowContext message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.WorkflowContext
         * @static
         * @param {Workflow.WorkflowContext} message WorkflowContext
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkflowContext.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.approvals = [];
            if (options.defaults) {
                object.workflowConfig = null;
                object.workflow = null;
                object.blocker = null;
            }
            if (message.workflowConfig != null && Object.hasOwnProperty.call(message, "workflowConfig"))
                object.workflowConfig = $root.Workflow.WorkflowConfig.toObject(message.workflowConfig, options, q + 1);
            if (message.workflow != null && Object.hasOwnProperty.call(message, "workflow"))
                object.workflow = $root.Workflow.WorkflowProcess.toObject(message.workflow, options, q + 1);
            if (message.approvals && message.approvals.length) {
                object.approvals = [];
                for (let j = 0; j < message.approvals.length; ++j)
                    object.approvals[j] = $root.Workflow.WorkflowApproval.toObject(message.approvals[j], options, q + 1);
            }
            if (message.blocker != null && Object.hasOwnProperty.call(message, "blocker"))
                object.blocker = $root.Workflow.WorkflowProcess.toObject(message.blocker, options, q + 1);
            return object;
        };

        /**
         * Converts this WorkflowContext to JSON.
         * @function toJSON
         * @memberof Workflow.WorkflowContext
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkflowContext.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkflowContext
         * @function getTypeUrl
         * @memberof Workflow.WorkflowContext
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkflowContext.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.WorkflowContext";
        };

        return WorkflowContext;
    })();

    Workflow.WorkflowState = (function() {

        /**
         * Properties of a WorkflowState.
         * @memberof Workflow
         * @interface IWorkflowState
         * @property {Uint8Array|null} [flowUid] WorkflowState flowUid
         * @property {GraphSync.IGraphSyncRef|null} [resource] WorkflowState resource
         * @property {Workflow.IWorkflowStatus|null} [status] WorkflowState status
         */

        /**
         * Constructs a new WorkflowState.
         * @memberof Workflow
         * @classdesc Represents a WorkflowState.
         * @implements IWorkflowState
         * @constructor
         * @param {Workflow.IWorkflowState=} [properties] Properties to set
         */
        function WorkflowState(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkflowState flowUid.
         * @member {Uint8Array} flowUid
         * @memberof Workflow.WorkflowState
         * @instance
         */
        WorkflowState.prototype.flowUid = $util.newBuffer([]);

        /**
         * WorkflowState resource.
         * @member {GraphSync.IGraphSyncRef|null|undefined} resource
         * @memberof Workflow.WorkflowState
         * @instance
         */
        WorkflowState.prototype.resource = null;

        /**
         * WorkflowState status.
         * @member {Workflow.IWorkflowStatus|null|undefined} status
         * @memberof Workflow.WorkflowState
         * @instance
         */
        WorkflowState.prototype.status = null;

        /**
         * Creates a new WorkflowState instance using the specified properties.
         * @function create
         * @memberof Workflow.WorkflowState
         * @static
         * @param {Workflow.IWorkflowState=} [properties] Properties to set
         * @returns {Workflow.WorkflowState} WorkflowState instance
         */
        WorkflowState.create = function create(properties) {
            return new WorkflowState(properties);
        };

        /**
         * Encodes the specified WorkflowState message. Does not implicitly {@link Workflow.WorkflowState.verify|verify} messages.
         * @function encode
         * @memberof Workflow.WorkflowState
         * @static
         * @param {Workflow.IWorkflowState} message WorkflowState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkflowState.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.flowUid != null && Object.hasOwnProperty.call(message, "flowUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.flowUid);
            if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                $root.GraphSync.GraphSyncRef.encode(message.resource, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                $root.Workflow.WorkflowStatus.encode(message.status, writer.uint32(/* id 3, wireType 2 =*/26).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a WorkflowState message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.WorkflowState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.WorkflowState} WorkflowState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkflowState.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.WorkflowState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.flowUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.resource = $root.GraphSync.GraphSyncRef.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.status = $root.Workflow.WorkflowStatus.decode(reader, reader.uint32(), undefined, long + 1);
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
         * Creates a WorkflowState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.WorkflowState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.WorkflowState} WorkflowState
         */
        WorkflowState.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.WorkflowState)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.WorkflowState: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.WorkflowState();
            if (object.flowUid != null)
                if (typeof object.flowUid === "string")
                    $util.base64.decode(object.flowUid, message.flowUid = $util.newBuffer($util.base64.length(object.flowUid)), 0);
                else if (object.flowUid.length >= 0)
                    message.flowUid = object.flowUid;
            if (object.resource != null) {
                if (!$util.isObject(object.resource))
                    throw TypeError(".Workflow.WorkflowState.resource: object expected");
                message.resource = $root.GraphSync.GraphSyncRef.fromObject(object.resource, long + 1);
            }
            if (object.status != null) {
                if (!$util.isObject(object.status))
                    throw TypeError(".Workflow.WorkflowState.status: object expected");
                message.status = $root.Workflow.WorkflowStatus.fromObject(object.status, long + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a WorkflowState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.WorkflowState
         * @static
         * @param {Workflow.WorkflowState} message WorkflowState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkflowState.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.flowUid = "";
                else {
                    object.flowUid = [];
                    if (options.bytes !== Array)
                        object.flowUid = $util.newBuffer(object.flowUid);
                }
                object.resource = null;
                object.status = null;
            }
            if (message.flowUid != null && Object.hasOwnProperty.call(message, "flowUid"))
                object.flowUid = options.bytes === String ? $util.base64.encode(message.flowUid, 0, message.flowUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.flowUid) : message.flowUid;
            if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                object.resource = $root.GraphSync.GraphSyncRef.toObject(message.resource, options, q + 1);
            if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                object.status = $root.Workflow.WorkflowStatus.toObject(message.status, options, q + 1);
            return object;
        };

        /**
         * Converts this WorkflowState to JSON.
         * @function toJSON
         * @memberof Workflow.WorkflowState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkflowState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkflowState
         * @function getTypeUrl
         * @memberof Workflow.WorkflowState
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkflowState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.WorkflowState";
        };

        return WorkflowState;
    })();

    Workflow.WorkflowAccessRequest = (function() {

        /**
         * Properties of a WorkflowAccessRequest.
         * @memberof Workflow
         * @interface IWorkflowAccessRequest
         * @property {GraphSync.IGraphSyncRef|null} [resource] WorkflowAccessRequest resource
         * @property {Uint8Array|null} [reason] WorkflowAccessRequest reason
         * @property {Uint8Array|null} [ticket] WorkflowAccessRequest ticket
         */

        /**
         * Constructs a new WorkflowAccessRequest.
         * @memberof Workflow
         * @classdesc Represents a WorkflowAccessRequest.
         * @implements IWorkflowAccessRequest
         * @constructor
         * @param {Workflow.IWorkflowAccessRequest=} [properties] Properties to set
         */
        function WorkflowAccessRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkflowAccessRequest resource.
         * @member {GraphSync.IGraphSyncRef|null|undefined} resource
         * @memberof Workflow.WorkflowAccessRequest
         * @instance
         */
        WorkflowAccessRequest.prototype.resource = null;

        /**
         * WorkflowAccessRequest reason.
         * @member {Uint8Array} reason
         * @memberof Workflow.WorkflowAccessRequest
         * @instance
         */
        WorkflowAccessRequest.prototype.reason = $util.newBuffer([]);

        /**
         * WorkflowAccessRequest ticket.
         * @member {Uint8Array} ticket
         * @memberof Workflow.WorkflowAccessRequest
         * @instance
         */
        WorkflowAccessRequest.prototype.ticket = $util.newBuffer([]);

        /**
         * Creates a new WorkflowAccessRequest instance using the specified properties.
         * @function create
         * @memberof Workflow.WorkflowAccessRequest
         * @static
         * @param {Workflow.IWorkflowAccessRequest=} [properties] Properties to set
         * @returns {Workflow.WorkflowAccessRequest} WorkflowAccessRequest instance
         */
        WorkflowAccessRequest.create = function create(properties) {
            return new WorkflowAccessRequest(properties);
        };

        /**
         * Encodes the specified WorkflowAccessRequest message. Does not implicitly {@link Workflow.WorkflowAccessRequest.verify|verify} messages.
         * @function encode
         * @memberof Workflow.WorkflowAccessRequest
         * @static
         * @param {Workflow.IWorkflowAccessRequest} message WorkflowAccessRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkflowAccessRequest.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                $root.GraphSync.GraphSyncRef.encode(message.resource, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.reason);
            if (message.ticket != null && Object.hasOwnProperty.call(message, "ticket"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.ticket);
            return writer;
        };

        /**
         * Decodes a WorkflowAccessRequest message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.WorkflowAccessRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.WorkflowAccessRequest} WorkflowAccessRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkflowAccessRequest.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.WorkflowAccessRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.resource = $root.GraphSync.GraphSyncRef.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        message.reason = reader.bytes();
                        break;
                    }
                case 3: {
                        message.ticket = reader.bytes();
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
         * Creates a WorkflowAccessRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.WorkflowAccessRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.WorkflowAccessRequest} WorkflowAccessRequest
         */
        WorkflowAccessRequest.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.WorkflowAccessRequest)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.WorkflowAccessRequest: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.WorkflowAccessRequest();
            if (object.resource != null) {
                if (!$util.isObject(object.resource))
                    throw TypeError(".Workflow.WorkflowAccessRequest.resource: object expected");
                message.resource = $root.GraphSync.GraphSyncRef.fromObject(object.resource, long + 1);
            }
            if (object.reason != null)
                if (typeof object.reason === "string")
                    $util.base64.decode(object.reason, message.reason = $util.newBuffer($util.base64.length(object.reason)), 0);
                else if (object.reason.length >= 0)
                    message.reason = object.reason;
            if (object.ticket != null)
                if (typeof object.ticket === "string")
                    $util.base64.decode(object.ticket, message.ticket = $util.newBuffer($util.base64.length(object.ticket)), 0);
                else if (object.ticket.length >= 0)
                    message.ticket = object.ticket;
            return message;
        };

        /**
         * Creates a plain object from a WorkflowAccessRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.WorkflowAccessRequest
         * @static
         * @param {Workflow.WorkflowAccessRequest} message WorkflowAccessRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkflowAccessRequest.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.resource = null;
                if (options.bytes === String)
                    object.reason = "";
                else {
                    object.reason = [];
                    if (options.bytes !== Array)
                        object.reason = $util.newBuffer(object.reason);
                }
                if (options.bytes === String)
                    object.ticket = "";
                else {
                    object.ticket = [];
                    if (options.bytes !== Array)
                        object.ticket = $util.newBuffer(object.ticket);
                }
            }
            if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                object.resource = $root.GraphSync.GraphSyncRef.toObject(message.resource, options, q + 1);
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                object.reason = options.bytes === String ? $util.base64.encode(message.reason, 0, message.reason.length) : options.bytes === Array ? Array.prototype.slice.call(message.reason) : message.reason;
            if (message.ticket != null && Object.hasOwnProperty.call(message, "ticket"))
                object.ticket = options.bytes === String ? $util.base64.encode(message.ticket, 0, message.ticket.length) : options.bytes === Array ? Array.prototype.slice.call(message.ticket) : message.ticket;
            return object;
        };

        /**
         * Converts this WorkflowAccessRequest to JSON.
         * @function toJSON
         * @memberof Workflow.WorkflowAccessRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkflowAccessRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkflowAccessRequest
         * @function getTypeUrl
         * @memberof Workflow.WorkflowAccessRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkflowAccessRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.WorkflowAccessRequest";
        };

        return WorkflowAccessRequest;
    })();

    Workflow.WorkflowApprovalOrDenial = (function() {

        /**
         * Properties of a WorkflowApprovalOrDenial.
         * @memberof Workflow
         * @interface IWorkflowApprovalOrDenial
         * @property {Uint8Array|null} [flowUid] WorkflowApprovalOrDenial flowUid
         * @property {boolean|null} [deny] WorkflowApprovalOrDenial deny
         * @property {Uint8Array|null} [denialReason] WorkflowApprovalOrDenial denialReason
         */

        /**
         * Constructs a new WorkflowApprovalOrDenial.
         * @memberof Workflow
         * @classdesc Represents a WorkflowApprovalOrDenial.
         * @implements IWorkflowApprovalOrDenial
         * @constructor
         * @param {Workflow.IWorkflowApprovalOrDenial=} [properties] Properties to set
         */
        function WorkflowApprovalOrDenial(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WorkflowApprovalOrDenial flowUid.
         * @member {Uint8Array} flowUid
         * @memberof Workflow.WorkflowApprovalOrDenial
         * @instance
         */
        WorkflowApprovalOrDenial.prototype.flowUid = $util.newBuffer([]);

        /**
         * WorkflowApprovalOrDenial deny.
         * @member {boolean} deny
         * @memberof Workflow.WorkflowApprovalOrDenial
         * @instance
         */
        WorkflowApprovalOrDenial.prototype.deny = false;

        /**
         * WorkflowApprovalOrDenial denialReason.
         * @member {Uint8Array} denialReason
         * @memberof Workflow.WorkflowApprovalOrDenial
         * @instance
         */
        WorkflowApprovalOrDenial.prototype.denialReason = $util.newBuffer([]);

        /**
         * Creates a new WorkflowApprovalOrDenial instance using the specified properties.
         * @function create
         * @memberof Workflow.WorkflowApprovalOrDenial
         * @static
         * @param {Workflow.IWorkflowApprovalOrDenial=} [properties] Properties to set
         * @returns {Workflow.WorkflowApprovalOrDenial} WorkflowApprovalOrDenial instance
         */
        WorkflowApprovalOrDenial.create = function create(properties) {
            return new WorkflowApprovalOrDenial(properties);
        };

        /**
         * Encodes the specified WorkflowApprovalOrDenial message. Does not implicitly {@link Workflow.WorkflowApprovalOrDenial.verify|verify} messages.
         * @function encode
         * @memberof Workflow.WorkflowApprovalOrDenial
         * @static
         * @param {Workflow.IWorkflowApprovalOrDenial} message WorkflowApprovalOrDenial message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WorkflowApprovalOrDenial.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.flowUid != null && Object.hasOwnProperty.call(message, "flowUid"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.flowUid);
            if (message.deny != null && Object.hasOwnProperty.call(message, "deny"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.deny);
            if (message.denialReason != null && Object.hasOwnProperty.call(message, "denialReason"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.denialReason);
            return writer;
        };

        /**
         * Decodes a WorkflowApprovalOrDenial message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.WorkflowApprovalOrDenial
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.WorkflowApprovalOrDenial} WorkflowApprovalOrDenial
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WorkflowApprovalOrDenial.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.WorkflowApprovalOrDenial();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.flowUid = reader.bytes();
                        break;
                    }
                case 2: {
                        message.deny = reader.bool();
                        break;
                    }
                case 3: {
                        message.denialReason = reader.bytes();
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
         * Creates a WorkflowApprovalOrDenial message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.WorkflowApprovalOrDenial
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.WorkflowApprovalOrDenial} WorkflowApprovalOrDenial
         */
        WorkflowApprovalOrDenial.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.WorkflowApprovalOrDenial)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.WorkflowApprovalOrDenial: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.WorkflowApprovalOrDenial();
            if (object.flowUid != null)
                if (typeof object.flowUid === "string")
                    $util.base64.decode(object.flowUid, message.flowUid = $util.newBuffer($util.base64.length(object.flowUid)), 0);
                else if (object.flowUid.length >= 0)
                    message.flowUid = object.flowUid;
            if (object.deny != null)
                message.deny = Boolean(object.deny);
            if (object.denialReason != null)
                if (typeof object.denialReason === "string")
                    $util.base64.decode(object.denialReason, message.denialReason = $util.newBuffer($util.base64.length(object.denialReason)), 0);
                else if (object.denialReason.length >= 0)
                    message.denialReason = object.denialReason;
            return message;
        };

        /**
         * Creates a plain object from a WorkflowApprovalOrDenial message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.WorkflowApprovalOrDenial
         * @static
         * @param {Workflow.WorkflowApprovalOrDenial} message WorkflowApprovalOrDenial
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WorkflowApprovalOrDenial.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.flowUid = "";
                else {
                    object.flowUid = [];
                    if (options.bytes !== Array)
                        object.flowUid = $util.newBuffer(object.flowUid);
                }
                object.deny = false;
                if (options.bytes === String)
                    object.denialReason = "";
                else {
                    object.denialReason = [];
                    if (options.bytes !== Array)
                        object.denialReason = $util.newBuffer(object.denialReason);
                }
            }
            if (message.flowUid != null && Object.hasOwnProperty.call(message, "flowUid"))
                object.flowUid = options.bytes === String ? $util.base64.encode(message.flowUid, 0, message.flowUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.flowUid) : message.flowUid;
            if (message.deny != null && Object.hasOwnProperty.call(message, "deny"))
                object.deny = message.deny;
            if (message.denialReason != null && Object.hasOwnProperty.call(message, "denialReason"))
                object.denialReason = options.bytes === String ? $util.base64.encode(message.denialReason, 0, message.denialReason.length) : options.bytes === Array ? Array.prototype.slice.call(message.denialReason) : message.denialReason;
            return object;
        };

        /**
         * Converts this WorkflowApprovalOrDenial to JSON.
         * @function toJSON
         * @memberof Workflow.WorkflowApprovalOrDenial
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WorkflowApprovalOrDenial.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WorkflowApprovalOrDenial
         * @function getTypeUrl
         * @memberof Workflow.WorkflowApprovalOrDenial
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WorkflowApprovalOrDenial.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.WorkflowApprovalOrDenial";
        };

        return WorkflowApprovalOrDenial;
    })();

    Workflow.UserAccessState = (function() {

        /**
         * Properties of a UserAccessState.
         * @memberof Workflow
         * @interface IUserAccessState
         * @property {Array.<Workflow.IWorkflowState>|null} [workflows] UserAccessState workflows
         */

        /**
         * Constructs a new UserAccessState.
         * @memberof Workflow
         * @classdesc Represents a UserAccessState.
         * @implements IUserAccessState
         * @constructor
         * @param {Workflow.IUserAccessState=} [properties] Properties to set
         */
        function UserAccessState(properties) {
            this.workflows = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserAccessState workflows.
         * @member {Array.<Workflow.IWorkflowState>} workflows
         * @memberof Workflow.UserAccessState
         * @instance
         */
        UserAccessState.prototype.workflows = $util.emptyArray;

        /**
         * Creates a new UserAccessState instance using the specified properties.
         * @function create
         * @memberof Workflow.UserAccessState
         * @static
         * @param {Workflow.IUserAccessState=} [properties] Properties to set
         * @returns {Workflow.UserAccessState} UserAccessState instance
         */
        UserAccessState.create = function create(properties) {
            return new UserAccessState(properties);
        };

        /**
         * Encodes the specified UserAccessState message. Does not implicitly {@link Workflow.UserAccessState.verify|verify} messages.
         * @function encode
         * @memberof Workflow.UserAccessState
         * @static
         * @param {Workflow.IUserAccessState} message UserAccessState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserAccessState.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.workflows != null && message.workflows.length)
                for (let i = 0; i < message.workflows.length; ++i)
                    $root.Workflow.WorkflowState.encode(message.workflows[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes a UserAccessState message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.UserAccessState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.UserAccessState} UserAccessState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserAccessState.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.UserAccessState();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.workflows && message.workflows.length))
                            message.workflows = [];
                        message.workflows.push($root.Workflow.WorkflowState.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates a UserAccessState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.UserAccessState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.UserAccessState} UserAccessState
         */
        UserAccessState.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.UserAccessState)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.UserAccessState: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.UserAccessState();
            if (object.workflows) {
                if (!Array.isArray(object.workflows))
                    throw TypeError(".Workflow.UserAccessState.workflows: array expected");
                message.workflows = [];
                for (let i = 0; i < object.workflows.length; ++i) {
                    if (!$util.isObject(object.workflows[i]))
                        throw TypeError(".Workflow.UserAccessState.workflows: object expected");
                    message.workflows[i] = $root.Workflow.WorkflowState.fromObject(object.workflows[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a UserAccessState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.UserAccessState
         * @static
         * @param {Workflow.UserAccessState} message UserAccessState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserAccessState.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.workflows = [];
            if (message.workflows && message.workflows.length) {
                object.workflows = [];
                for (let j = 0; j < message.workflows.length; ++j)
                    object.workflows[j] = $root.Workflow.WorkflowState.toObject(message.workflows[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this UserAccessState to JSON.
         * @function toJSON
         * @memberof Workflow.UserAccessState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserAccessState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for UserAccessState
         * @function getTypeUrl
         * @memberof Workflow.UserAccessState
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        UserAccessState.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.UserAccessState";
        };

        return UserAccessState;
    })();

    Workflow.ApprovalRequests = (function() {

        /**
         * Properties of an ApprovalRequests.
         * @memberof Workflow
         * @interface IApprovalRequests
         * @property {Array.<Workflow.IWorkflowProcess>|null} [workflows] ApprovalRequests workflows
         */

        /**
         * Constructs a new ApprovalRequests.
         * @memberof Workflow
         * @classdesc Represents an ApprovalRequests.
         * @implements IApprovalRequests
         * @constructor
         * @param {Workflow.IApprovalRequests=} [properties] Properties to set
         */
        function ApprovalRequests(properties) {
            this.workflows = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApprovalRequests workflows.
         * @member {Array.<Workflow.IWorkflowProcess>} workflows
         * @memberof Workflow.ApprovalRequests
         * @instance
         */
        ApprovalRequests.prototype.workflows = $util.emptyArray;

        /**
         * Creates a new ApprovalRequests instance using the specified properties.
         * @function create
         * @memberof Workflow.ApprovalRequests
         * @static
         * @param {Workflow.IApprovalRequests=} [properties] Properties to set
         * @returns {Workflow.ApprovalRequests} ApprovalRequests instance
         */
        ApprovalRequests.create = function create(properties) {
            return new ApprovalRequests(properties);
        };

        /**
         * Encodes the specified ApprovalRequests message. Does not implicitly {@link Workflow.ApprovalRequests.verify|verify} messages.
         * @function encode
         * @memberof Workflow.ApprovalRequests
         * @static
         * @param {Workflow.IApprovalRequests} message ApprovalRequests message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApprovalRequests.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.workflows != null && message.workflows.length)
                for (let i = 0; i < message.workflows.length; ++i)
                    $root.Workflow.WorkflowProcess.encode(message.workflows[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            return writer;
        };

        /**
         * Decodes an ApprovalRequests message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.ApprovalRequests
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.ApprovalRequests} ApprovalRequests
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApprovalRequests.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.ApprovalRequests();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.workflows && message.workflows.length))
                            message.workflows = [];
                        message.workflows.push($root.Workflow.WorkflowProcess.decode(reader, reader.uint32(), undefined, long + 1));
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
         * Creates an ApprovalRequests message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.ApprovalRequests
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.ApprovalRequests} ApprovalRequests
         */
        ApprovalRequests.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.ApprovalRequests)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.ApprovalRequests: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.ApprovalRequests();
            if (object.workflows) {
                if (!Array.isArray(object.workflows))
                    throw TypeError(".Workflow.ApprovalRequests.workflows: array expected");
                message.workflows = [];
                for (let i = 0; i < object.workflows.length; ++i) {
                    if (!$util.isObject(object.workflows[i]))
                        throw TypeError(".Workflow.ApprovalRequests.workflows: object expected");
                    message.workflows[i] = $root.Workflow.WorkflowProcess.fromObject(object.workflows[i], long + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an ApprovalRequests message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.ApprovalRequests
         * @static
         * @param {Workflow.ApprovalRequests} message ApprovalRequests
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApprovalRequests.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.workflows = [];
            if (message.workflows && message.workflows.length) {
                object.workflows = [];
                for (let j = 0; j < message.workflows.length; ++j)
                    object.workflows[j] = $root.Workflow.WorkflowProcess.toObject(message.workflows[j], options, q + 1);
            }
            return object;
        };

        /**
         * Converts this ApprovalRequests to JSON.
         * @function toJSON
         * @memberof Workflow.ApprovalRequests
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApprovalRequests.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApprovalRequests
         * @function getTypeUrl
         * @memberof Workflow.ApprovalRequests
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApprovalRequests.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.ApprovalRequests";
        };

        return ApprovalRequests;
    })();

    Workflow.TimeOfDayRange = (function() {

        /**
         * Properties of a TimeOfDayRange.
         * @memberof Workflow
         * @interface ITimeOfDayRange
         * @property {number|null} [startTime] TimeOfDayRange startTime
         * @property {number|null} [endTime] TimeOfDayRange endTime
         */

        /**
         * Constructs a new TimeOfDayRange.
         * @memberof Workflow
         * @classdesc Represents a TimeOfDayRange.
         * @implements ITimeOfDayRange
         * @constructor
         * @param {Workflow.ITimeOfDayRange=} [properties] Properties to set
         */
        function TimeOfDayRange(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TimeOfDayRange startTime.
         * @member {number} startTime
         * @memberof Workflow.TimeOfDayRange
         * @instance
         */
        TimeOfDayRange.prototype.startTime = 0;

        /**
         * TimeOfDayRange endTime.
         * @member {number} endTime
         * @memberof Workflow.TimeOfDayRange
         * @instance
         */
        TimeOfDayRange.prototype.endTime = 0;

        /**
         * Creates a new TimeOfDayRange instance using the specified properties.
         * @function create
         * @memberof Workflow.TimeOfDayRange
         * @static
         * @param {Workflow.ITimeOfDayRange=} [properties] Properties to set
         * @returns {Workflow.TimeOfDayRange} TimeOfDayRange instance
         */
        TimeOfDayRange.create = function create(properties) {
            return new TimeOfDayRange(properties);
        };

        /**
         * Encodes the specified TimeOfDayRange message. Does not implicitly {@link Workflow.TimeOfDayRange.verify|verify} messages.
         * @function encode
         * @memberof Workflow.TimeOfDayRange
         * @static
         * @param {Workflow.ITimeOfDayRange} message TimeOfDayRange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TimeOfDayRange.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.startTime);
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.endTime);
            return writer;
        };

        /**
         * Decodes a TimeOfDayRange message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.TimeOfDayRange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.TimeOfDayRange} TimeOfDayRange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TimeOfDayRange.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.TimeOfDayRange();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.startTime = reader.int32();
                        break;
                    }
                case 2: {
                        message.endTime = reader.int32();
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
         * Creates a TimeOfDayRange message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.TimeOfDayRange
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.TimeOfDayRange} TimeOfDayRange
         */
        TimeOfDayRange.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.TimeOfDayRange)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.TimeOfDayRange: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.TimeOfDayRange();
            if (object.startTime != null)
                message.startTime = object.startTime | 0;
            if (object.endTime != null)
                message.endTime = object.endTime | 0;
            return message;
        };

        /**
         * Creates a plain object from a TimeOfDayRange message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.TimeOfDayRange
         * @static
         * @param {Workflow.TimeOfDayRange} message TimeOfDayRange
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TimeOfDayRange.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.startTime = 0;
                object.endTime = 0;
            }
            if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
                object.startTime = message.startTime;
            if (message.endTime != null && Object.hasOwnProperty.call(message, "endTime"))
                object.endTime = message.endTime;
            return object;
        };

        /**
         * Converts this TimeOfDayRange to JSON.
         * @function toJSON
         * @memberof Workflow.TimeOfDayRange
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TimeOfDayRange.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TimeOfDayRange
         * @function getTypeUrl
         * @memberof Workflow.TimeOfDayRange
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TimeOfDayRange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.TimeOfDayRange";
        };

        return TimeOfDayRange;
    })();

    /**
     * DayOfWeek enum.
     * @name Workflow.DayOfWeek
     * @enum {number}
     * @property {number} DAY_OF_WEEK_UNSPECIFIED=0 DAY_OF_WEEK_UNSPECIFIED value
     * @property {number} MONDAY=1 MONDAY value
     * @property {number} TUESDAY=2 TUESDAY value
     * @property {number} WEDNESDAY=3 WEDNESDAY value
     * @property {number} THURSDAY=4 THURSDAY value
     * @property {number} FRIDAY=5 FRIDAY value
     * @property {number} SATURDAY=6 SATURDAY value
     * @property {number} SUNDAY=7 SUNDAY value
     */
    Workflow.DayOfWeek = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DAY_OF_WEEK_UNSPECIFIED"] = 0;
        values[valuesById[1] = "MONDAY"] = 1;
        values[valuesById[2] = "TUESDAY"] = 2;
        values[valuesById[3] = "WEDNESDAY"] = 3;
        values[valuesById[4] = "THURSDAY"] = 4;
        values[valuesById[5] = "FRIDAY"] = 5;
        values[valuesById[6] = "SATURDAY"] = 6;
        values[valuesById[7] = "SUNDAY"] = 7;
        return values;
    })();

    /**
     * ApprovalQueueKind enum.
     * @name Workflow.ApprovalQueueKind
     * @enum {number}
     * @property {number} AQK_APPROVAL=0 AQK_APPROVAL value
     * @property {number} AQK_ESCALATION=1 AQK_ESCALATION value
     */
    Workflow.ApprovalQueueKind = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "AQK_APPROVAL"] = 0;
        values[valuesById[1] = "AQK_ESCALATION"] = 1;
        return values;
    })();

    Workflow.ApprovalQueueEntry = (function() {

        /**
         * Properties of an ApprovalQueueEntry.
         * @memberof Workflow
         * @interface IApprovalQueueEntry
         * @property {GraphSync.IGraphSyncRef|null} [flowRef] ApprovalQueueEntry flowRef
         * @property {GraphSync.IGraphSyncRef|null} [approverRef] ApprovalQueueEntry approverRef
         * @property {Workflow.ApprovalQueueKind|null} [kind] ApprovalQueueEntry kind
         * @property {number|null} [notifyAtMs] ApprovalQueueEntry notifyAtMs
         * @property {number|null} [requesterUserId] ApprovalQueueEntry requesterUserId
         * @property {Uint8Array|null} [predefinedNotificationUid] ApprovalQueueEntry predefinedNotificationUid
         */

        /**
         * Constructs a new ApprovalQueueEntry.
         * @memberof Workflow
         * @classdesc Represents an ApprovalQueueEntry.
         * @implements IApprovalQueueEntry
         * @constructor
         * @param {Workflow.IApprovalQueueEntry=} [properties] Properties to set
         */
        function ApprovalQueueEntry(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ApprovalQueueEntry flowRef.
         * @member {GraphSync.IGraphSyncRef|null|undefined} flowRef
         * @memberof Workflow.ApprovalQueueEntry
         * @instance
         */
        ApprovalQueueEntry.prototype.flowRef = null;

        /**
         * ApprovalQueueEntry approverRef.
         * @member {GraphSync.IGraphSyncRef|null|undefined} approverRef
         * @memberof Workflow.ApprovalQueueEntry
         * @instance
         */
        ApprovalQueueEntry.prototype.approverRef = null;

        /**
         * ApprovalQueueEntry kind.
         * @member {Workflow.ApprovalQueueKind} kind
         * @memberof Workflow.ApprovalQueueEntry
         * @instance
         */
        ApprovalQueueEntry.prototype.kind = 0;

        /**
         * ApprovalQueueEntry notifyAtMs.
         * @member {number} notifyAtMs
         * @memberof Workflow.ApprovalQueueEntry
         * @instance
         */
        ApprovalQueueEntry.prototype.notifyAtMs = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ApprovalQueueEntry requesterUserId.
         * @member {number|null|undefined} requesterUserId
         * @memberof Workflow.ApprovalQueueEntry
         * @instance
         */
        ApprovalQueueEntry.prototype.requesterUserId = null;

        /**
         * ApprovalQueueEntry predefinedNotificationUid.
         * @member {Uint8Array|null|undefined} predefinedNotificationUid
         * @memberof Workflow.ApprovalQueueEntry
         * @instance
         */
        ApprovalQueueEntry.prototype.predefinedNotificationUid = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(ApprovalQueueEntry.prototype, "_requesterUserId", {
            get: $util.oneOfGetter($oneOfFields = ["requesterUserId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        Object.defineProperty(ApprovalQueueEntry.prototype, "_predefinedNotificationUid", {
            get: $util.oneOfGetter($oneOfFields = ["predefinedNotificationUid"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ApprovalQueueEntry instance using the specified properties.
         * @function create
         * @memberof Workflow.ApprovalQueueEntry
         * @static
         * @param {Workflow.IApprovalQueueEntry=} [properties] Properties to set
         * @returns {Workflow.ApprovalQueueEntry} ApprovalQueueEntry instance
         */
        ApprovalQueueEntry.create = function create(properties) {
            return new ApprovalQueueEntry(properties);
        };

        /**
         * Encodes the specified ApprovalQueueEntry message. Does not implicitly {@link Workflow.ApprovalQueueEntry.verify|verify} messages.
         * @function encode
         * @memberof Workflow.ApprovalQueueEntry
         * @static
         * @param {Workflow.IApprovalQueueEntry} message ApprovalQueueEntry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ApprovalQueueEntry.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.flowRef != null && Object.hasOwnProperty.call(message, "flowRef"))
                $root.GraphSync.GraphSyncRef.encode(message.flowRef, writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.approverRef != null && Object.hasOwnProperty.call(message, "approverRef"))
                $root.GraphSync.GraphSyncRef.encode(message.approverRef, writer.uint32(/* id 2, wireType 2 =*/18).fork(), q + 1).ldelim();
            if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.kind);
            if (message.notifyAtMs != null && Object.hasOwnProperty.call(message, "notifyAtMs"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.notifyAtMs);
            if (message.requesterUserId != null && Object.hasOwnProperty.call(message, "requesterUserId"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.requesterUserId);
            if (message.predefinedNotificationUid != null && Object.hasOwnProperty.call(message, "predefinedNotificationUid"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.predefinedNotificationUid);
            return writer;
        };

        /**
         * Decodes an ApprovalQueueEntry message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.ApprovalQueueEntry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.ApprovalQueueEntry} ApprovalQueueEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ApprovalQueueEntry.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.ApprovalQueueEntry();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.flowRef = $root.GraphSync.GraphSyncRef.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 2: {
                        message.approverRef = $root.GraphSync.GraphSyncRef.decode(reader, reader.uint32(), undefined, long + 1);
                        break;
                    }
                case 3: {
                        message.kind = reader.int32();
                        break;
                    }
                case 4: {
                        message.notifyAtMs = reader.int64();
                        break;
                    }
                case 5: {
                        message.requesterUserId = reader.int64();
                        break;
                    }
                case 6: {
                        message.predefinedNotificationUid = reader.bytes();
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
         * Creates an ApprovalQueueEntry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.ApprovalQueueEntry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.ApprovalQueueEntry} ApprovalQueueEntry
         */
        ApprovalQueueEntry.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.ApprovalQueueEntry)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.ApprovalQueueEntry: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.ApprovalQueueEntry();
            if (object.flowRef != null) {
                if (!$util.isObject(object.flowRef))
                    throw TypeError(".Workflow.ApprovalQueueEntry.flowRef: object expected");
                message.flowRef = $root.GraphSync.GraphSyncRef.fromObject(object.flowRef, long + 1);
            }
            if (object.approverRef != null) {
                if (!$util.isObject(object.approverRef))
                    throw TypeError(".Workflow.ApprovalQueueEntry.approverRef: object expected");
                message.approverRef = $root.GraphSync.GraphSyncRef.fromObject(object.approverRef, long + 1);
            }
            switch (object.kind) {
            default:
                if (typeof object.kind === "number") {
                    message.kind = object.kind;
                    break;
                }
                break;
            case "AQK_APPROVAL":
            case 0:
                message.kind = 0;
                break;
            case "AQK_ESCALATION":
            case 1:
                message.kind = 1;
                break;
            }
            if (object.notifyAtMs != null)
                if ($util.Long)
                    message.notifyAtMs = $util.Long.fromValue(object.notifyAtMs, false);
                else if (typeof object.notifyAtMs === "string")
                    message.notifyAtMs = parseInt(object.notifyAtMs, 10);
                else if (typeof object.notifyAtMs === "number")
                    message.notifyAtMs = object.notifyAtMs;
                else if (typeof object.notifyAtMs === "object")
                    message.notifyAtMs = new $util.LongBits(object.notifyAtMs.low >>> 0, object.notifyAtMs.high >>> 0).toNumber();
            if (object.requesterUserId != null)
                if ($util.Long)
                    message.requesterUserId = $util.Long.fromValue(object.requesterUserId, false);
                else if (typeof object.requesterUserId === "string")
                    message.requesterUserId = parseInt(object.requesterUserId, 10);
                else if (typeof object.requesterUserId === "number")
                    message.requesterUserId = object.requesterUserId;
                else if (typeof object.requesterUserId === "object")
                    message.requesterUserId = new $util.LongBits(object.requesterUserId.low >>> 0, object.requesterUserId.high >>> 0).toNumber();
            if (object.predefinedNotificationUid != null)
                if (typeof object.predefinedNotificationUid === "string")
                    $util.base64.decode(object.predefinedNotificationUid, message.predefinedNotificationUid = $util.newBuffer($util.base64.length(object.predefinedNotificationUid)), 0);
                else if (object.predefinedNotificationUid.length >= 0)
                    message.predefinedNotificationUid = object.predefinedNotificationUid;
            return message;
        };

        /**
         * Creates a plain object from an ApprovalQueueEntry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.ApprovalQueueEntry
         * @static
         * @param {Workflow.ApprovalQueueEntry} message ApprovalQueueEntry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ApprovalQueueEntry.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.flowRef = null;
                object.approverRef = null;
                object.kind = options.enums === String ? "AQK_APPROVAL" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.notifyAtMs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : typeof BigInt !== "undefined" && options.longs === BigInt ? long.toBigInt() : long;
                } else
                    object.notifyAtMs = options.longs === String ? "0" : typeof BigInt !== "undefined" && options.longs === BigInt ? BigInt("0") : 0;
            }
            if (message.flowRef != null && Object.hasOwnProperty.call(message, "flowRef"))
                object.flowRef = $root.GraphSync.GraphSyncRef.toObject(message.flowRef, options, q + 1);
            if (message.approverRef != null && Object.hasOwnProperty.call(message, "approverRef"))
                object.approverRef = $root.GraphSync.GraphSyncRef.toObject(message.approverRef, options, q + 1);
            if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                object.kind = options.enums === String ? $root.Workflow.ApprovalQueueKind[message.kind] === undefined ? message.kind : $root.Workflow.ApprovalQueueKind[message.kind] : message.kind;
            if (message.notifyAtMs != null && Object.hasOwnProperty.call(message, "notifyAtMs"))
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.notifyAtMs = typeof message.notifyAtMs === "number" ? BigInt(message.notifyAtMs) : $util.Long.fromBits(message.notifyAtMs.low >>> 0, message.notifyAtMs.high >>> 0, false).toBigInt();
                else if (typeof message.notifyAtMs === "number")
                    object.notifyAtMs = options.longs === String ? String(message.notifyAtMs) : message.notifyAtMs;
                else
                    object.notifyAtMs = options.longs === String ? $util.Long.prototype.toString.call(message.notifyAtMs) : options.longs === Number ? new $util.LongBits(message.notifyAtMs.low >>> 0, message.notifyAtMs.high >>> 0).toNumber() : message.notifyAtMs;
            if (message.requesterUserId != null && Object.hasOwnProperty.call(message, "requesterUserId")) {
                if (typeof BigInt !== "undefined" && options.longs === BigInt)
                    object.requesterUserId = typeof message.requesterUserId === "number" ? BigInt(message.requesterUserId) : $util.Long.fromBits(message.requesterUserId.low >>> 0, message.requesterUserId.high >>> 0, false).toBigInt();
                else if (typeof message.requesterUserId === "number")
                    object.requesterUserId = options.longs === String ? String(message.requesterUserId) : message.requesterUserId;
                else
                    object.requesterUserId = options.longs === String ? $util.Long.prototype.toString.call(message.requesterUserId) : options.longs === Number ? new $util.LongBits(message.requesterUserId.low >>> 0, message.requesterUserId.high >>> 0).toNumber() : message.requesterUserId;
                if (options.oneofs)
                    object._requesterUserId = "requesterUserId";
            }
            if (message.predefinedNotificationUid != null && Object.hasOwnProperty.call(message, "predefinedNotificationUid")) {
                object.predefinedNotificationUid = options.bytes === String ? $util.base64.encode(message.predefinedNotificationUid, 0, message.predefinedNotificationUid.length) : options.bytes === Array ? Array.prototype.slice.call(message.predefinedNotificationUid) : message.predefinedNotificationUid;
                if (options.oneofs)
                    object._predefinedNotificationUid = "predefinedNotificationUid";
            }
            return object;
        };

        /**
         * Converts this ApprovalQueueEntry to JSON.
         * @function toJSON
         * @memberof Workflow.ApprovalQueueEntry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ApprovalQueueEntry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ApprovalQueueEntry
         * @function getTypeUrl
         * @memberof Workflow.ApprovalQueueEntry
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ApprovalQueueEntry.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.ApprovalQueueEntry";
        };

        return ApprovalQueueEntry;
    })();

    Workflow.TemporalAccessFilter = (function() {

        /**
         * Properties of a TemporalAccessFilter.
         * @memberof Workflow
         * @interface ITemporalAccessFilter
         * @property {Array.<Workflow.ITimeOfDayRange>|null} [timeRanges] TemporalAccessFilter timeRanges
         * @property {Array.<Workflow.DayOfWeek>|null} [allowedDays] TemporalAccessFilter allowedDays
         * @property {string|null} [timeZone] TemporalAccessFilter timeZone
         */

        /**
         * Constructs a new TemporalAccessFilter.
         * @memberof Workflow
         * @classdesc Represents a TemporalAccessFilter.
         * @implements ITemporalAccessFilter
         * @constructor
         * @param {Workflow.ITemporalAccessFilter=} [properties] Properties to set
         */
        function TemporalAccessFilter(properties) {
            this.timeRanges = [];
            this.allowedDays = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TemporalAccessFilter timeRanges.
         * @member {Array.<Workflow.ITimeOfDayRange>} timeRanges
         * @memberof Workflow.TemporalAccessFilter
         * @instance
         */
        TemporalAccessFilter.prototype.timeRanges = $util.emptyArray;

        /**
         * TemporalAccessFilter allowedDays.
         * @member {Array.<Workflow.DayOfWeek>} allowedDays
         * @memberof Workflow.TemporalAccessFilter
         * @instance
         */
        TemporalAccessFilter.prototype.allowedDays = $util.emptyArray;

        /**
         * TemporalAccessFilter timeZone.
         * @member {string} timeZone
         * @memberof Workflow.TemporalAccessFilter
         * @instance
         */
        TemporalAccessFilter.prototype.timeZone = "";

        /**
         * Creates a new TemporalAccessFilter instance using the specified properties.
         * @function create
         * @memberof Workflow.TemporalAccessFilter
         * @static
         * @param {Workflow.ITemporalAccessFilter=} [properties] Properties to set
         * @returns {Workflow.TemporalAccessFilter} TemporalAccessFilter instance
         */
        TemporalAccessFilter.create = function create(properties) {
            return new TemporalAccessFilter(properties);
        };

        /**
         * Encodes the specified TemporalAccessFilter message. Does not implicitly {@link Workflow.TemporalAccessFilter.verify|verify} messages.
         * @function encode
         * @memberof Workflow.TemporalAccessFilter
         * @static
         * @param {Workflow.ITemporalAccessFilter} message TemporalAccessFilter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TemporalAccessFilter.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.timeRanges != null && message.timeRanges.length)
                for (let i = 0; i < message.timeRanges.length; ++i)
                    $root.Workflow.TimeOfDayRange.encode(message.timeRanges[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), q + 1).ldelim();
            if (message.allowedDays != null && message.allowedDays.length) {
                writer.uint32(/* id 2, wireType 2 =*/18).fork();
                for (let i = 0; i < message.allowedDays.length; ++i)
                    writer.int32(message.allowedDays[i]);
                writer.ldelim();
            }
            if (message.timeZone != null && Object.hasOwnProperty.call(message, "timeZone"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.timeZone);
            return writer;
        };

        /**
         * Decodes a TemporalAccessFilter message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.TemporalAccessFilter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.TemporalAccessFilter} TemporalAccessFilter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TemporalAccessFilter.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.TemporalAccessFilter();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.timeRanges && message.timeRanges.length))
                            message.timeRanges = [];
                        message.timeRanges.push($root.Workflow.TimeOfDayRange.decode(reader, reader.uint32(), undefined, long + 1));
                        break;
                    }
                case 2: {
                        if (!(message.allowedDays && message.allowedDays.length))
                            message.allowedDays = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.allowedDays.push(reader.int32());
                        } else
                            message.allowedDays.push(reader.int32());
                        break;
                    }
                case 3: {
                        message.timeZone = reader.string();
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
         * Creates a TemporalAccessFilter message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.TemporalAccessFilter
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.TemporalAccessFilter} TemporalAccessFilter
         */
        TemporalAccessFilter.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.TemporalAccessFilter)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.TemporalAccessFilter: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.TemporalAccessFilter();
            if (object.timeRanges) {
                if (!Array.isArray(object.timeRanges))
                    throw TypeError(".Workflow.TemporalAccessFilter.timeRanges: array expected");
                message.timeRanges = [];
                for (let i = 0; i < object.timeRanges.length; ++i) {
                    if (!$util.isObject(object.timeRanges[i]))
                        throw TypeError(".Workflow.TemporalAccessFilter.timeRanges: object expected");
                    message.timeRanges[i] = $root.Workflow.TimeOfDayRange.fromObject(object.timeRanges[i], long + 1);
                }
            }
            if (object.allowedDays) {
                if (!Array.isArray(object.allowedDays))
                    throw TypeError(".Workflow.TemporalAccessFilter.allowedDays: array expected");
                message.allowedDays = [];
                for (let i = 0; i < object.allowedDays.length; ++i)
                    switch (object.allowedDays[i]) {
                    default:
                        if (typeof object.allowedDays[i] === "number") {
                            message.allowedDays[i] = object.allowedDays[i];
                            break;
                        }
                    case "DAY_OF_WEEK_UNSPECIFIED":
                    case 0:
                        message.allowedDays[i] = 0;
                        break;
                    case "MONDAY":
                    case 1:
                        message.allowedDays[i] = 1;
                        break;
                    case "TUESDAY":
                    case 2:
                        message.allowedDays[i] = 2;
                        break;
                    case "WEDNESDAY":
                    case 3:
                        message.allowedDays[i] = 3;
                        break;
                    case "THURSDAY":
                    case 4:
                        message.allowedDays[i] = 4;
                        break;
                    case "FRIDAY":
                    case 5:
                        message.allowedDays[i] = 5;
                        break;
                    case "SATURDAY":
                    case 6:
                        message.allowedDays[i] = 6;
                        break;
                    case "SUNDAY":
                    case 7:
                        message.allowedDays[i] = 7;
                        break;
                    }
            }
            if (object.timeZone != null)
                message.timeZone = String(object.timeZone);
            return message;
        };

        /**
         * Creates a plain object from a TemporalAccessFilter message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.TemporalAccessFilter
         * @static
         * @param {Workflow.TemporalAccessFilter} message TemporalAccessFilter
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TemporalAccessFilter.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults) {
                object.timeRanges = [];
                object.allowedDays = [];
            }
            if (options.defaults)
                object.timeZone = "";
            if (message.timeRanges && message.timeRanges.length) {
                object.timeRanges = [];
                for (let j = 0; j < message.timeRanges.length; ++j)
                    object.timeRanges[j] = $root.Workflow.TimeOfDayRange.toObject(message.timeRanges[j], options, q + 1);
            }
            if (message.allowedDays && message.allowedDays.length) {
                object.allowedDays = [];
                for (let j = 0; j < message.allowedDays.length; ++j)
                    object.allowedDays[j] = options.enums === String ? $root.Workflow.DayOfWeek[message.allowedDays[j]] === undefined ? message.allowedDays[j] : $root.Workflow.DayOfWeek[message.allowedDays[j]] : message.allowedDays[j];
            }
            if (message.timeZone != null && Object.hasOwnProperty.call(message, "timeZone"))
                object.timeZone = message.timeZone;
            return object;
        };

        /**
         * Converts this TemporalAccessFilter to JSON.
         * @function toJSON
         * @memberof Workflow.TemporalAccessFilter
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TemporalAccessFilter.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TemporalAccessFilter
         * @function getTypeUrl
         * @memberof Workflow.TemporalAccessFilter
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TemporalAccessFilter.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.TemporalAccessFilter";
        };

        return TemporalAccessFilter;
    })();

    Workflow.AuthorizedUsers = (function() {

        /**
         * Properties of an AuthorizedUsers.
         * @memberof Workflow
         * @interface IAuthorizedUsers
         * @property {Array.<string>|null} [username] AuthorizedUsers username
         */

        /**
         * Constructs a new AuthorizedUsers.
         * @memberof Workflow
         * @classdesc Represents an AuthorizedUsers.
         * @implements IAuthorizedUsers
         * @constructor
         * @param {Workflow.IAuthorizedUsers=} [properties] Properties to set
         */
        function AuthorizedUsers(properties) {
            this.username = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AuthorizedUsers username.
         * @member {Array.<string>} username
         * @memberof Workflow.AuthorizedUsers
         * @instance
         */
        AuthorizedUsers.prototype.username = $util.emptyArray;

        /**
         * Creates a new AuthorizedUsers instance using the specified properties.
         * @function create
         * @memberof Workflow.AuthorizedUsers
         * @static
         * @param {Workflow.IAuthorizedUsers=} [properties] Properties to set
         * @returns {Workflow.AuthorizedUsers} AuthorizedUsers instance
         */
        AuthorizedUsers.create = function create(properties) {
            return new AuthorizedUsers(properties);
        };

        /**
         * Encodes the specified AuthorizedUsers message. Does not implicitly {@link Workflow.AuthorizedUsers.verify|verify} messages.
         * @function encode
         * @memberof Workflow.AuthorizedUsers
         * @static
         * @param {Workflow.IAuthorizedUsers} message AuthorizedUsers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AuthorizedUsers.encode = function encode(message, writer, q) {
            if (!writer)
                writer = $Writer.create();
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            if (message.username != null && message.username.length)
                for (let i = 0; i < message.username.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.username[i]);
            return writer;
        };

        /**
         * Decodes an AuthorizedUsers message from the specified reader or buffer.
         * @function decode
         * @memberof Workflow.AuthorizedUsers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Workflow.AuthorizedUsers} AuthorizedUsers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AuthorizedUsers.decode = function decode(reader, length, error, long) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (long === undefined)
                long = 0;
            if (long > $Reader.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.Workflow.AuthorizedUsers();
            while (reader.pos < end) {
                let tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.username && message.username.length))
                            message.username = [];
                        message.username.push(reader.string());
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
         * Creates an AuthorizedUsers message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Workflow.AuthorizedUsers
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Workflow.AuthorizedUsers} AuthorizedUsers
         */
        AuthorizedUsers.fromObject = function fromObject(object, long) {
            if (object instanceof $root.Workflow.AuthorizedUsers)
                return object;
            if (!$util.isObject(object))
                throw TypeError(".Workflow.AuthorizedUsers: object expected");
            if (long === undefined)
                long = 0;
            if (long > $util.recursionLimit)
                throw Error("maximum nesting depth exceeded");
            let message = new $root.Workflow.AuthorizedUsers();
            if (object.username) {
                if (!Array.isArray(object.username))
                    throw TypeError(".Workflow.AuthorizedUsers.username: array expected");
                message.username = [];
                for (let i = 0; i < object.username.length; ++i)
                    message.username[i] = String(object.username[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from an AuthorizedUsers message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Workflow.AuthorizedUsers
         * @static
         * @param {Workflow.AuthorizedUsers} message AuthorizedUsers
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AuthorizedUsers.toObject = function toObject(message, options, q) {
            if (!options)
                options = {};
            if (q === undefined)
                q = 0;
            if (q > $util.recursionLimit)
                throw Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.username = [];
            if (message.username && message.username.length) {
                object.username = [];
                for (let j = 0; j < message.username.length; ++j)
                    object.username[j] = message.username[j];
            }
            return object;
        };

        /**
         * Converts this AuthorizedUsers to JSON.
         * @function toJSON
         * @memberof Workflow.AuthorizedUsers
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AuthorizedUsers.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AuthorizedUsers
         * @function getTypeUrl
         * @memberof Workflow.AuthorizedUsers
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AuthorizedUsers.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/Workflow.AuthorizedUsers";
        };

        return AuthorizedUsers;
    })();

    return Workflow;
})();

